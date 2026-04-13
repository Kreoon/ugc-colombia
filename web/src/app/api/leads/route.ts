import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

// Rate limiting simple en memoria
const ipRequestMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 3;
const WINDOW_MS = 60 * 1000;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = ipRequestMap.get(ip);

  if (!entry || entry.resetAt < now) {
    ipRequestMap.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return true;
  }

  if (entry.count >= RATE_LIMIT) return false;
  entry.count++;
  return true;
}

const leadSchema = z.object({
  lead_type: z.enum(["marca", "creador"]),
  brand_info: z
    .object({
      full_name: z.string().min(1),
      company_name: z.string().min(1),
      website: z.string().optional(),
      industry: z.string(),
      instagram_handle: z.string().optional(),
    })
    .optional(),
  creator_info: z
    .object({
      full_name: z.string().min(1),
      creator_niche: z.string(),
      creator_platforms: z.array(z.string()),
      creator_portfolio_url: z.string().optional(),
      creator_followers: z.string(),
      creator_experience_years: z.string(),
    })
    .optional(),
  brand_audit: z.record(z.unknown()).optional(),
  creator_audit: z.record(z.unknown()).optional(),
  contact: z.object({
    email: z.string().email(),
    whatsapp: z.string().min(7),
    country: z.string().optional(),
  }),
  qualification_score: z.number().min(0).max(100),
  temperature: z.enum(["hot", "warm", "cold"]),
  ai_diagnosis: z.record(z.unknown()),
});

export async function POST(req: NextRequest) {
  try {
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      req.headers.get("x-real-ip") ??
      "unknown";

    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: "Demasiadas solicitudes. Intenta más tarde." },
        { status: 429 }
      );
    }

    const body: unknown = await req.json();
    const parsed = leadSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? "Datos inválidos." },
        { status: 400 }
      );
    }

    const data = parsed.data;
    const isBrand = data.lead_type === "marca";
    const info = isBrand ? data.brand_info : data.creator_info;

    // Build Supabase row
    const row: Record<string, unknown> = {
      full_name: info?.full_name ?? null,
      email: data.contact.email,
      whatsapp: data.contact.whatsapp,
      country: data.contact.country || null,
      source: "sitio_web",
      stage: "nuevo",
      lead_type: data.lead_type,
      qualification_score: data.qualification_score,
      temperature: data.temperature,
      ai_diagnosis: data.ai_diagnosis,
      audit_completed_at: new Date().toISOString(),
      raw_form_data: data,
    };

    if (isBrand && data.brand_info) {
      row.company_name = data.brand_info.company_name;
      row.website = data.brand_info.website || null;
      row.industry = data.brand_info.industry;
      row.instagram_handle = data.brand_info.instagram_handle || null;
    }

    if (isBrand && data.brand_audit) {
      const audit = data.brand_audit as Record<string, unknown>;
      row.ad_budget = audit.ad_budget;
      row.content_budget = audit.content_budget;
      row.has_active_ads = audit.has_active_ads;
      row.current_ctr = audit.current_ctr as string;
      row.creative_age_weeks = typeof audit.creative_age_weeks === "string"
        ? parseCreativeWeeks(audit.creative_age_weeks)
        : null;
      row.monthly_content_pieces = typeof audit.monthly_content_pieces === "string"
        ? parseMonthlyPieces(audit.monthly_content_pieces)
        : null;
      row.biggest_pain = audit.biggest_pain as string;
      row.urgency = audit.urgency;
    }

    if (!isBrand && data.creator_info) {
      row.creator_niche = data.creator_info.creator_niche;
      row.creator_platforms = data.creator_info.creator_platforms;
      row.creator_portfolio_url = data.creator_info.creator_portfolio_url || null;
      row.creator_followers = parseFollowers(data.creator_info.creator_followers);
      row.creator_experience_years = parseExperience(data.creator_info.creator_experience_years);
    }

    // Auto-qualify hot leads
    if (data.temperature === "hot") {
      row.stage = "calificado";
    }

    // Insert into Supabase
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    let leadId: string | null = null;

    if (
      supabaseUrl &&
      supabaseKey &&
      !supabaseUrl.includes("placeholder") &&
      !supabaseKey.includes("placeholder")
    ) {
      try {
        const { createClient } = await import("@supabase/supabase-js");
        const supabase = createClient(supabaseUrl, supabaseKey);

        const { data: inserted, error } = await supabase
          .from("leads")
          .insert(row)
          .select("id")
          .single();

        if (error && error.code !== "23505") {
          console.error("[leads] Supabase error:", error);
        }
        if (inserted) leadId = inserted.id;

        // Enqueue nurturing email sequence
        if (leadId) {
          const steps = [
            { key: "day_3_case_study", days: 3 },
            { key: "day_8_tips", days: 8 },
            { key: "day_15_contrafactual", days: 15 },
            { key: "day_22_trends", days: 22 },
            { key: "day_30_offer", days: 30 },
          ];
          const seqRows = steps.map((s) => ({
            lead_id: leadId,
            sequence_key: "nurturing",
            step_key: s.key,
            scheduled_at: new Date(Date.now() + s.days * 86400000).toISOString(),
            status: "pending",
          }));
          await supabase.from("email_sequences").insert(seqRows);
        }

        // Auto-subscribe to newsletter
        if (data.contact.email) {
          await supabase.from("newsletter_subscribers").upsert({
            email: data.contact.email,
            full_name: info?.full_name || null,
            industry: isBrand ? data.brand_info?.industry : null,
            lead_id: leadId,
            status: "active",
          }, { onConflict: "email" });
        }
      } catch (dbErr) {
        console.error("[leads] DB error:", dbErr);
      }
    } else {
      console.log("[leads] Mock insert:", JSON.stringify(row, null, 2));
    }

    // Fire brand diagnosis pipeline in background for brands with IG handle
    if (isBrand && data.brand_info) {
      const diagnosisPayload = {
        lead_id: leadId,
        brand_name: data.brand_info.company_name,
        instagram_handle: data.brand_info.instagram_handle || undefined,
        website: data.brand_info.website || undefined,
        industry: data.brand_info.industry,
        biggest_pain: (data.brand_audit as Record<string, unknown>)?.biggest_pain as string | undefined,
        full_name: data.brand_info.full_name,
        email: data.contact.email,
        whatsapp: data.contact.whatsapp,
        qualification_score: data.qualification_score,
        temperature: data.temperature,
      };

      // Fire and forget — don't block the response
      const baseUrl = process.env.NEXT_PUBLIC_SITE_URL
        || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

      fetch(`${baseUrl}/api/brand-diagnosis`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-internal-key": process.env.INTERNAL_API_KEY || "ugc-diagnosis-2026",
        },
        body: JSON.stringify(diagnosisPayload),
      }).catch((err) => {
        console.error("[leads] Failed to trigger diagnosis pipeline:", err);
      });

      console.log(`[leads] Brand diagnosis pipeline triggered for ${data.brand_info.company_name}`);
    }

    return NextResponse.json({ success: true, lead_id: leadId }, { status: 200 });
  } catch (err) {
    console.error("[leads] Unexpected error:", err);
    return NextResponse.json(
      { error: "Error interno del servidor." },
      { status: 500 }
    );
  }
}

function parseCreativeWeeks(val: string): number | null {
  const map: Record<string, number> = {
    menos_2: 1,
    "2_4": 3,
    "4_8": 6,
    mas_8: 12,
    no_tengo: 0,
  };
  return map[val] ?? null;
}

function parseMonthlyPieces(val: string): number | null {
  const map: Record<string, number> = {
    "0": 0,
    "1_3": 2,
    "4_8": 6,
    "9_15": 12,
    mas_15: 20,
  };
  return map[val] ?? null;
}

function parseFollowers(val: string): number | null {
  const map: Record<string, number> = {
    menos_1k: 500,
    "1k_10k": 5000,
    "10k_50k": 30000,
    "50k_100k": 75000,
    mas_100k: 150000,
  };
  return map[val] ?? null;
}

function parseExperience(val: string): number | null {
  const map: Record<string, number> = {
    menos_1: 0,
    "1_2": 1,
    "3_5": 3,
    mas_5: 6,
  };
  return map[val] ?? null;
}
