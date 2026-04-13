import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { scrapeInstagram, scrapeAds } from "@/lib/brand-diagnosis/apify";
import { searchWeb, parseSocialProfiles, parseIndustry } from "@/lib/brand-diagnosis/perplexity";
import { runPromptChain } from "@/lib/brand-diagnosis/prompt-chain";
import { buildLeadEmail, buildTeamEmail } from "@/lib/brand-diagnosis/emails";

const requestSchema = z.object({
  lead_id: z.string().optional(),
  brand_name: z.string().min(1),
  instagram_handle: z.string().optional(),
  website: z.string().optional(),
  industry: z.string().optional(),
  biggest_pain: z.string().optional(),
  // Lead contact info for emails
  full_name: z.string().min(1),
  email: z.string().email(),
  whatsapp: z.string().min(7),
  // Scoring from form
  qualification_score: z.number().default(0),
  temperature: z.string().default("warm"),
});

export const maxDuration = 300; // 5 min for Vercel (Apify + Gemini chain)

export async function POST(req: NextRequest) {
  // Verify internal secret to prevent abuse
  const authHeader = req.headers.get("x-internal-key");
  const internalKey = process.env.INTERNAL_API_KEY || "ugc-diagnosis-2026";
  if (authHeader !== internalKey) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const data = requestSchema.parse(body);

    console.log(`[brand-diagnosis] Starting pipeline for ${data.brand_name} (@${data.instagram_handle || "N/A"})`);

    // ── Step 1: Scrape IG + Ads in parallel ──
    const handle = data.instagram_handle?.replace(/^@/, "") || "";

    const [igProfile, ads] = await Promise.all([
      handle ? scrapeInstagram(handle) : Promise.resolve(null),
      scrapeAds(data.brand_name),
    ]);

    console.log(`[brand-diagnosis] IG: ${igProfile?.followers ?? "N/A"} followers, ${igProfile?.recent_posts.length ?? 0} posts | Ads: ${ads.length}`);

    // ── Step 2: Enrich brand via Perplexity ──
    let brandDescription = "";
    let brandIndustry = data.industry || "No identificada";
    let socialProfiles: any[] = [];

    try {
      const bioCtx = igProfile?.bio ? ` Bio: "${igProfile.bio.slice(0, 200)}".` : "";
      const handleCtx = handle ? ` Instagram: @${handle}.` : "";
      const query = `Busca información sobre la marca "${data.brand_name}".${handleCtx}${bioCtx} IMPORTANTE: Identifica EXACTAMENTE esta marca. ¿Qué hace? Industria, website, perfiles de Instagram, TikTok, YouTube.`;

      const { result, citations } = await searchWeb(query);
      brandDescription = result.slice(0, 500);
      if (brandIndustry === "No identificada") brandIndustry = parseIndustry(result);
      socialProfiles = parseSocialProfiles(result + "\n" + citations.join("\n"));
    } catch (err) {
      console.log(`[brand-diagnosis] Perplexity enrichment failed: ${err}`);
      brandDescription = `${data.brand_name} — ${data.industry || "marca"}`;
    }

    // ── Step 3: Run 5-step prompt chain ──
    const diagnosis = await runPromptChain({
      brandName: data.brand_name,
      brandDescription,
      brandIndustry,
      brandWebsite: data.website || null,
      igProfile,
      socialProfiles,
      ads,
      clientChallenge: data.biggest_pain,
    });

    console.log(`[brand-diagnosis] Diagnosis complete: score ${diagnosis.overall_score}/100`);

    // ── Step 4: Save to Supabase ──
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (data.lead_id && supabaseUrl && supabaseKey && !supabaseUrl.includes("placeholder")) {
      try {
        const { createClient } = await import("@supabase/supabase-js");
        const supabase = createClient(supabaseUrl, supabaseKey);

        const slug = handle || data.brand_name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

        await supabase
          .from("leads")
          .update({
            ai_diagnosis: {
              ...diagnosis,
              ig_profile: igProfile ? {
                username: igProfile.username,
                followers: igProfile.followers,
                engagement_rate: igProfile.engagement_rate,
                bio: igProfile.bio,
                posts_count: igProfile.posts_count,
              } : null,
              ads_found: ads.length,
              generated_at: new Date().toISOString(),
            },
            diagnosis_slug: slug,
            diagnosis_public: true,
          })
          .eq("id", data.lead_id);

        console.log(`[brand-diagnosis] Saved to Supabase lead ${data.lead_id}`);
      } catch (dbErr) {
        console.error("[brand-diagnosis] Supabase update failed:", dbErr);
      }
    }

    // ── Step 5: Send emails via Resend ──
    const resendKey = process.env.RESEND_API_KEY;

    if (resendKey && !resendKey.includes("placeholder")) {
      try {
        const { Resend } = await import("resend");
        const resend = new Resend(resendKey);

        const leadInfo = {
          full_name: data.full_name,
          email: data.email,
          whatsapp: data.whatsapp,
          company_name: data.brand_name,
          industry: brandIndustry,
          instagram_handle: handle || undefined,
          website: data.website || undefined,
        };

        // Email to lead
        const leadEmail = buildLeadEmail(leadInfo, diagnosis, igProfile);
        await resend.emails.send({
          from: "UGC Colombia <noreply@ugccolombia.co>",
          to: data.email,
          subject: leadEmail.subject,
          html: leadEmail.html,
        });

        // Email to team
        const teamEmail = buildTeamEmail(leadInfo, diagnosis, igProfile, data.qualification_score, data.temperature);
        await resend.emails.send({
          from: "UGC Colombia <noreply@ugccolombia.co>",
          to: "founder@kreoon.com",
          subject: teamEmail.subject,
          html: teamEmail.html,
        });

        console.log(`[brand-diagnosis] Emails sent: lead (${data.email}) + team`);
      } catch (emailErr) {
        console.error("[brand-diagnosis] Resend error:", emailErr);
      }
    }

    return NextResponse.json({
      success: true,
      overall_score: diagnosis.overall_score,
      diagnosis,
      ig_profile: igProfile ? {
        username: igProfile.username,
        followers: igProfile.followers,
        engagement_rate: igProfile.engagement_rate,
      } : null,
    });
  } catch (err) {
    console.error("[brand-diagnosis] Pipeline error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Pipeline failed" },
      { status: 500 }
    );
  }
}
