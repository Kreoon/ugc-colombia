import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { renderForgeWelcomeEmail, renderForgeTeamNotification } from "@/lib/email/forge-welcome";

// ─── Constantes del regalo ─────────────────────────────────────────────
const PROJECT_SLUG = "content-forge";
const PROJECT_NAME = "Content Forge";
const REPO_URL = "https://github.com/AlexanderKast/content-forge";
const GUIDE_URL = `${REPO_URL}/blob/main/docs/getting-started.md`;
const CALENDLY_URL = process.env.NEXT_PUBLIC_FORGE_CALENDLY_URL || "https://calendly.com/alexanderkast/content-forge-1a1";
const PRIORITY_SLOTS_LIMIT = 50;

// ─── Rate limit simple en memoria ──────────────────────────────────────
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

// ─── Schema ────────────────────────────────────────────────────────────
const forgeLeadSchema = z.object({
  name: z.string().min(1, "El nombre es obligatorio").max(100),
  company: z.string().min(1, "La empresa es obligatoria").max(100),
  email: z.string().email("Correo inválido"),
  phone: z.string().min(7, "Teléfono inválido").max(25),
  howHeard: z.string().max(60).optional(),
});

type ForgeLeadInput = z.infer<typeof forgeLeadSchema>;

// ─── GET · contador de priority slots usados ───────────────────────────
export async function GET() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseKey || supabaseUrl.includes("placeholder")) {
    // Mock para dev local
    return NextResponse.json({
      prioritySlotsTotal: PRIORITY_SLOTS_LIMIT,
      prioritySlotsTaken: 0,
      prioritySlotsRemaining: PRIORITY_SLOTS_LIMIT,
    });
  }

  try {
    const { createClient } = await import("@supabase/supabase-js");
    const supabase = createClient(supabaseUrl, supabaseKey);
    const { count } = await supabase
      .from("leads")
      .select("*", { count: "exact", head: true })
      .eq("forge_project_slug", PROJECT_SLUG)
      .eq("forge_priority_slot", true);

    const taken = count ?? 0;
    return NextResponse.json({
      prioritySlotsTotal: PRIORITY_SLOTS_LIMIT,
      prioritySlotsTaken: taken,
      prioritySlotsRemaining: Math.max(0, PRIORITY_SLOTS_LIMIT - taken),
    });
  } catch (err) {
    console.error("[lead-forge] GET count error:", err);
    return NextResponse.json({
      prioritySlotsTotal: PRIORITY_SLOTS_LIMIT,
      prioritySlotsTaken: 0,
      prioritySlotsRemaining: PRIORITY_SLOTS_LIMIT,
    });
  }
}

// ─── POST · registrar lead + email ─────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      req.headers.get("x-real-ip") ??
      "unknown";

    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: "Demasiadas solicitudes. Intenta en 1 minuto." },
        { status: 429 }
      );
    }

    const body: unknown = await req.json();
    const parsed = forgeLeadSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? "Datos inválidos." },
        { status: 400 }
      );
    }

    const data: ForgeLeadInput = parsed.data;
    const firstName = data.name.split(" ")[0] || data.name;

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    let leadId: string | null = null;
    let hasPrioritySlot = false;

    if (
      supabaseUrl &&
      supabaseKey &&
      !supabaseUrl.includes("placeholder") &&
      !supabaseKey.includes("placeholder")
    ) {
      try {
        const { createClient } = await import("@supabase/supabase-js");
        const supabase = createClient(supabaseUrl, supabaseKey);

        // 1. Determinar si entra en priority 50 (por fecha de creación).
        const { count: priorityCount } = await supabase
          .from("leads")
          .select("*", { count: "exact", head: true })
          .eq("forge_project_slug", PROJECT_SLUG)
          .eq("forge_priority_slot", true);

        hasPrioritySlot = (priorityCount ?? 0) < PRIORITY_SLOTS_LIMIT;

        // 2. Insertar lead
        const row = {
          full_name: data.name,
          email: data.email,
          phone: data.phone,
          company: data.company,
          source: "forge_landing",
          status: "new",
          industry: null,
          notes: data.howHeard ? `Nos conoció por: ${data.howHeard}` : null,
          how_heard: data.howHeard || null,
          forge_priority_slot: hasPrioritySlot,
          forge_project_slug: PROJECT_SLUG,
        };

        const { data: inserted, error } = await supabase
          .from("leads")
          .insert(row)
          .select("id")
          .single();

        if (error) {
          console.error("[lead-forge] Supabase insert error:", error);
        }
        if (inserted) leadId = inserted.id;

        // 3. Upsert a newsletter
        if (leadId) {
          await supabase
            .from("newsletter_subscribers")
            .upsert(
              {
                email: data.email,
                full_name: data.name,
                lead_id: leadId,
                status: "active",
              },
              { onConflict: "email" }
            );
        }
      } catch (dbErr) {
        console.error("[lead-forge] DB error:", dbErr);
      }
    } else {
      console.log("[lead-forge] Mock insert:", JSON.stringify(data, null, 2));
    }

    // ─── Email al lead + notificación al equipo ───────────────────────
    const resendKey = process.env.RESEND_API_KEY;
    if (resendKey && !resendKey.includes("placeholder")) {
      try {
        const { Resend } = await import("resend");
        const resend = new Resend(resendKey);
        const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://ugccolombia.co";

        const emailPayload = {
          firstName,
          email: data.email,
          company: data.company,
          repoUrl: REPO_URL,
          guideUrl: GUIDE_URL,
          hasPrioritySlot,
          calendlyUrl: hasPrioritySlot ? CALENDLY_URL : undefined,
          projectName: PROJECT_NAME,
          siteUrl,
        };

        // Email al lead
        await resend.emails.send({
          from: "UGC Colombia · Regalos <regalos@ugccolombia.co>",
          to: data.email,
          subject: `${firstName}, acá tienes ${PROJECT_NAME} 🎁`,
          html: renderForgeWelcomeEmail(emailPayload),
          replyTo: "founder@kreoon.com",
        });

        // Notificación al equipo
        await resend.emails.send({
          from: "UGC Colombia Sistema <noreply@ugccolombia.co>",
          to: "founder@kreoon.com",
          subject: `🎁 Nuevo lead /forge: ${data.company}${hasPrioritySlot ? " · PRIORITY 50" : ""}`,
          html: renderForgeTeamNotification(emailPayload),
        });

        console.log(`[lead-forge] Emails sent for ${data.email} (priority=${hasPrioritySlot})`);
      } catch (emailErr) {
        console.error("[lead-forge] Resend error:", emailErr);
        // No fallar la request si el email falla — el lead ya está guardado.
      }
    }

    return NextResponse.json(
      {
        success: true,
        leadId,
        repoUrl: REPO_URL,
        guideUrl: GUIDE_URL,
        hasPrioritySlot,
        calendlyUrl: hasPrioritySlot ? CALENDLY_URL : null,
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("[lead-forge] Unexpected:", err);
    return NextResponse.json(
      { error: "Error interno del servidor." },
      { status: 500 }
    );
  }
}
