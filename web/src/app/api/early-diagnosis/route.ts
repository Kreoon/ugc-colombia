import { NextRequest, NextResponse } from "next/server";
import { after } from "next/server";
import { scrapeInstagram, scrapeAds } from "@/lib/brand-diagnosis/apify";
import { searchWeb, parseSocialProfiles, parseIndustry } from "@/lib/brand-diagnosis/perplexity";
import { runPromptChain } from "@/lib/brand-diagnosis/prompt-chain";
import { buildLeadEmail, buildTeamEmail } from "@/lib/brand-diagnosis/emails";

export const maxDuration = 300;

// Early diagnosis — triggered from StepBrandInfo before the user finishes the form.
// Saves result keyed by instagram_handle so it can be retrieved later.
// When the lead is created in /api/leads, it will update the existing diagnosis.

const diagnosisCache = new Map<string, { result: any; createdAt: number }>();

export async function POST(req: NextRequest) {
  try {
    const { brand_name, instagram_handle, website, industry } = await req.json();

    if (!brand_name) {
      return NextResponse.json({ error: "brand_name required" }, { status: 400 });
    }

    const handle = (instagram_handle || "").replace(/^@/, "").trim();
    const cacheKey = handle || brand_name.toLowerCase().replace(/\s+/g, "-");

    // Check if already processing/done
    const cached = diagnosisCache.get(cacheKey);
    if (cached && Date.now() - cached.createdAt < 600_000) {
      return NextResponse.json({ status: "already_running", key: cacheKey });
    }

    // Mark as processing
    diagnosisCache.set(cacheKey, { result: null, createdAt: Date.now() });

    // Run pipeline in background using after()
    after(async () => {
      try {
        console.log(`[early-diagnosis] Starting for ${brand_name} (@${handle || "N/A"})`);

        // Step 1: Scrape IG + Ads in parallel
        const [igProfile, ads] = await Promise.all([
          handle ? scrapeInstagram(handle) : Promise.resolve(null),
          scrapeAds(brand_name),
        ]);

        console.log(`[early-diagnosis] IG: ${igProfile?.followers ?? "N/A"} | Ads: ${ads.length}`);

        // Step 2: Enrich with Perplexity
        let brandDescription = "";
        let brandIndustry = industry || "No identificada";
        let socialProfiles: any[] = [];

        try {
          const bioCtx = igProfile?.bio ? ` Bio: "${igProfile.bio.slice(0, 200)}".` : "";
          const handleCtx = handle ? ` Instagram: @${handle}.` : "";
          const query = `Busca información sobre la marca "${brand_name}".${handleCtx}${bioCtx} ¿Qué hace? Industria, website, perfiles sociales.`;
          const { result, citations } = await searchWeb(query);
          brandDescription = result.slice(0, 500);
          if (brandIndustry === "No identificada") brandIndustry = parseIndustry(result);
          socialProfiles = parseSocialProfiles(result + "\n" + citations.join("\n"));
        } catch {
          brandDescription = `${brand_name} — ${industry || "marca"}`;
        }

        // Step 3: Gemini prompt chain
        const diagnosis = await runPromptChain({
          brandName: brand_name,
          brandDescription,
          brandIndustry,
          brandWebsite: website || null,
          igProfile,
          socialProfiles,
          ads,
        });

        // Cache result
        diagnosisCache.set(cacheKey, {
          result: {
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
          createdAt: Date.now(),
        });

        console.log(`[early-diagnosis] Complete for ${brand_name}: score ${diagnosis.overall_score}/100`);
      } catch (err) {
        console.error(`[early-diagnosis] Failed for ${brand_name}:`, err);
        diagnosisCache.delete(cacheKey);
      }
    });

    return NextResponse.json({ status: "started", key: cacheKey });
  } catch (err) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}

// GET — check if diagnosis is ready (polling from frontend)
export async function GET(req: NextRequest) {
  const key = req.nextUrl.searchParams.get("key");
  if (!key) return NextResponse.json({ status: "error" }, { status: 400 });

  const cached = diagnosisCache.get(key);
  if (!cached) return NextResponse.json({ status: "not_found" });
  if (!cached.result) return NextResponse.json({ status: "processing" });

  return NextResponse.json({ status: "ready", diagnosis: cached.result });
}
