import { NextRequest, NextResponse } from "next/server";
import { after } from "next/server";
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

    // Check if early-diagnosis already completed (from StepBrandInfo)
    if (isBrand && data.brand_info && leadId && supabaseUrl && supabaseKey) {
      const handle = (data.brand_info.instagram_handle || "").replace(/^@/, "").trim();
      const earlyKey = handle || data.brand_info.company_name.toLowerCase().replace(/\s+/g, "-");
      const baseUrlCheck = process.env.NEXT_PUBLIC_SITE_URL
        || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

      try {
        const earlyRes = await fetch(`${baseUrlCheck}/api/early-diagnosis?key=${earlyKey}`);
        const earlyData = await earlyRes.json();
        if (earlyData.status === "ready" && earlyData.diagnosis) {
          const { createClient } = await import("@supabase/supabase-js");
          const supabase = createClient(supabaseUrl, supabaseKey);
          const slug = handle || data.brand_info.company_name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
          await supabase.from("leads").update({
            ai_diagnosis: earlyData.diagnosis,
            diagnosis_slug: slug,
            diagnosis_public: true,
          }).eq("id", leadId);
          console.log(`[leads] Early diagnosis saved for ${data.brand_info.company_name}`);
        }
      } catch {
        // Will fall through to full pipeline below
      }
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

      // Use after() so the pipeline survives after response is sent
      const baseUrl = process.env.NEXT_PUBLIC_SITE_URL
        || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

      after(async () => {
        try {
          console.log(`[leads] Starting brand diagnosis pipeline for ${data.brand_info!.company_name}`);
          await fetch(`${baseUrl}/api/brand-diagnosis`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "x-internal-key": process.env.INTERNAL_API_KEY || "ugc-diagnosis-2026",
            },
            body: JSON.stringify(diagnosisPayload),
          });
          console.log(`[leads] Brand diagnosis pipeline completed for ${data.brand_info!.company_name}`);
        } catch (err) {
          console.error("[leads] Failed to trigger diagnosis pipeline:", err);
        }
      });
    }

    // ── IMMEDIATE EMAIL: confirmación + notificación al equipo ──
    const resendKey = process.env.RESEND_API_KEY;
    if (resendKey && !resendKey.includes("placeholder")) {
      try {
        const { Resend } = await import("resend");
        const resend = new Resend(resendKey);
        const leadName = info?.full_name || "amigo/a";
        const companyName = isBrand ? data.brand_info?.company_name : "Creador/a";
        const communityUrl = process.env.NEXT_PUBLIC_WHATSAPP_COMMUNITY_URL || "https://chat.whatsapp.com/ugccolombia";

        // Email al lead — confirmación inmediata
        await resend.emails.send({
          from: "UGC Colombia <noreply@ugccolombia.co>",
          to: data.contact.email,
          subject: `${leadName}, tu análisis de marca está en camino`,
          html: `
<div style="font-family:'Inter',Helvetica,Arial,sans-serif;background:#000;color:#fff;max-width:560px;margin:0 auto;padding:0;">
  <div style="background:linear-gradient(135deg,#0a0a0a,#1a1a1a);padding:32px 24px;border-bottom:2px solid #D4A01740;">
    <p style="color:#10B981;font-size:13px;margin:0 0 4px;">✓ Datos recibidos</p>
    <h1 style="color:#fff;font-size:24px;margin:0;">Estamos analizando tu marca con IA</h1>
  </div>
  <div style="padding:24px;">
    <p style="color:#BDBCBC;font-size:14px;line-height:1.7;">
      Hola ${leadName.split(" ")[0]},<br><br>
      Nuestra IA está analizando ${companyName}: scrapeando tu Instagram, revisando tus ads en Meta y estudiando tu competencia.
      En unos minutos recibirás un diagnóstico completo con:
    </p>
    <ul style="color:#BDBCBC;font-size:14px;line-height:2;padding-left:20px;">
      <li><strong style="color:#fff;">Score de tu marca</strong> — qué tan bien está tu contenido</li>
      <li><strong style="color:#fff;">Brechas detectadas</strong> — dónde estás perdiendo oportunidades</li>
      <li><strong style="color:#fff;">Plan de acción</strong> — qué hacer esta semana para mejorar</li>
      <li><strong style="color:#fff;">Paquete recomendado</strong> — cómo UGC Colombia puede ayudarte</li>
    </ul>

    <div style="margin:24px 0;padding:16px;border:1px solid #D4A01730;border-radius:12px;background:#D4A01708;">
      <p style="color:#D4A017;font-size:14px;font-weight:700;margin:0 0 4px;">Mientras tanto, tienes 2 regalos más:</p>
      <p style="color:#BDBCBC;font-size:13px;margin:0 0 8px;">📞 Llamada estratégica de 30 min gratis — agéndala en <a href="https://ugccolombia.co" style="color:#F9B334;">ugccolombia.co</a></p>
      <p style="color:#BDBCBC;font-size:13px;margin:0;">💬 Comunidad de WhatsApp — <a href="${communityUrl}" style="color:#10B981;">Unirte gratis aquí</a></p>
    </div>
  </div>
  <div style="padding:16px 24px;border-top:1px solid #222;">
    <p style="color:#3D3D3C;font-size:11px;margin:0;text-align:center;">UGC Colombia · <a href="https://ugccolombia.co" style="color:#D4A017;">ugccolombia.co</a></p>
  </div>
</div>`,
        });

        // Email al equipo — notificación inmediata
        const tempEmoji = data.temperature === "hot" ? "🔥" : data.temperature === "warm" ? "🟡" : "🔵";
        await resend.emails.send({
          from: "UGC Colombia <noreply@ugccolombia.co>",
          to: "founder@kreoon.com",
          subject: `${tempEmoji} Nuevo lead: ${companyName} — Score ${data.qualification_score}/100`,
          html: `
<div style="font-family:Inter,sans-serif;background:#000;color:#fff;padding:24px;max-width:520px;margin:0 auto;">
  <h2 style="color:#D4A017;margin:0 0 16px;">${tempEmoji} Nuevo lead en el sistema</h2>
  <table style="font-size:13px;color:#BDBCBC;line-height:2;width:100%;">
    <tr><td style="color:#D4A017;width:100px;">Nombre</td><td>${leadName}</td></tr>
    <tr><td style="color:#D4A017;">Empresa</td><td>${companyName}</td></tr>
    <tr><td style="color:#D4A017;">Email</td><td><a href="mailto:${data.contact.email}" style="color:#F9B334;">${data.contact.email}</a></td></tr>
    <tr><td style="color:#D4A017;">WhatsApp</td><td><a href="https://wa.me/57${data.contact.whatsapp}" style="color:#F9B334;">+57${data.contact.whatsapp}</a></td></tr>
    <tr><td style="color:#D4A017;">Score</td><td><strong>${data.qualification_score}/100 (${data.temperature})</strong></td></tr>
    <tr><td style="color:#D4A017;">Tipo</td><td>${data.lead_type}</td></tr>
    ${isBrand ? `<tr><td style="color:#D4A017;">Industria</td><td>${data.brand_info?.industry}</td></tr>` : ""}
    ${isBrand && data.brand_info?.instagram_handle ? `<tr><td style="color:#D4A017;">Instagram</td><td>@${data.brand_info.instagram_handle}</td></tr>` : ""}
    ${isBrand ? `<tr><td style="color:#D4A017;">Dolor</td><td>${(data.brand_audit as Record<string, unknown>)?.biggest_pain || "N/A"}</td></tr>` : ""}
    ${isBrand ? `<tr><td style="color:#D4A017;">Ads/mes</td><td>${(data.brand_audit as Record<string, unknown>)?.ad_budget || "N/A"}</td></tr>` : ""}
    ${isBrand ? `<tr><td style="color:#D4A017;">Urgencia</td><td>${(data.brand_audit as Record<string, unknown>)?.urgency || "N/A"}</td></tr>` : ""}
  </table>
  <p style="color:#3D3D3C;font-size:11px;margin-top:20px;">El diagnóstico IA se está generando. Recibirás otro email cuando esté listo.</p>
</div>`,
        });

        console.log(`[leads] Immediate emails sent: lead (${data.contact.email}) + team`);
      } catch (emailErr) {
        console.error("[leads] Resend immediate email error:", emailErr);
      }
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
