import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createBooking, type BookingPurpose } from "@/lib/google-calendar";

const bookSchema = z.object({
  start: z.string(),
  end: z.string(),
  host_key: z.string(),
  name: z.string().min(1),
  email: z.string().email(),
  company: z.string().nullish(),
  score: z.number().nullish(),
  lead_id: z.string().nullish(),
  purpose: z.enum(["discovery", "kickoff"]).optional(),
});

const NOTIFY_EMAIL_BY_PURPOSE: Record<BookingPurpose, string> = {
  discovery: "founder@kreoon.com",
  kickoff: "operaciones@kreoon.com",
};

const COPY_BY_PURPOSE: Record<
  BookingPurpose,
  {
    eyebrowAttendee: string;
    titleAttendee: string;
    subjectAttendee: (date: string, time: string) => string;
    prepTip: string;
    notifySubject: (
      who: string,
      date: string,
      time: string,
      host: string,
    ) => string;
    notifyTitle: string;
  }
> = {
  discovery: {
    eyebrowAttendee: "✓ Llamada confirmada",
    titleAttendee: "Llamada de Diagnóstico Estratégico con UGC Colombia",
    subjectAttendee: (date, time) =>
      `Llamada confirmada — ${date} a las ${time}`,
    prepTip:
      "Ten a mano ejemplos de contenido que hayas usado o que te gusten. También es útil tener claras tus métricas actuales (ads, ventas, seguidores).",
    notifySubject: (who, date, time, host) =>
      `📅 Nueva cita: ${who} — ${date} ${time} con ${host}`,
    notifyTitle: "Nueva cita agendada",
  },
  kickoff: {
    eyebrowAttendee: "🚀 Onboarding agendado",
    titleAttendee: "Onboarding de inicio con UGC Colombia",
    subjectAttendee: (date, time) =>
      `Onboarding confirmado — ${date} a las ${time}`,
    prepTip:
      "Trae los assets de tu marca a mano: logo, paleta, productos prioritarios, links a tus redes y a publicaciones que te hayan funcionado bien. Esto acelera el arranque de producción.",
    notifySubject: (who, date, time, host) =>
      `🚀 Kickoff agendado: ${who} — ${date} ${time} con ${host}`,
    notifyTitle: "Nuevo kickoff agendado",
  },
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = bookSchema.parse(body);
    const purpose: BookingPurpose = data.purpose ?? "discovery";

    const result = await createBooking(
      { start: data.start, end: data.end, host_key: data.host_key },
      {
        name: data.name,
        email: data.email,
        company: data.company ?? undefined,
        score: data.score ?? undefined,
      },
      { purpose },
    );

    // Update lead in Supabase (solo aplica al flow discovery)
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (
      purpose === "discovery" &&
      data.lead_id &&
      supabaseUrl &&
      supabaseKey &&
      !supabaseUrl.includes("placeholder")
    ) {
      try {
        const { createClient } = await import("@supabase/supabase-js");
        const supabase = createClient(supabaseUrl, supabaseKey);

        await supabase
          .from("leads")
          .update({
            booking_status: "scheduled",
            google_calendar_event_id: result.event_id,
            last_contact_at: new Date().toISOString(),
            next_followup_at: data.start,
          })
          .eq("id", data.lead_id);
      } catch (dbErr) {
        console.error("[book] Supabase update failed:", dbErr);
      }
    }

    // Email de confirmación + notificación interna via Resend
    const resendKey = process.env.RESEND_API_KEY;
    if (resendKey && !resendKey.includes("placeholder")) {
      try {
        const { Resend } = await import("resend");
        const resend = new Resend(resendKey);

        const meetDate = new Date(data.start);
        const cotDate = new Date(meetDate.getTime() - 5 * 60 * 60 * 1000);
        const dayNames = [
          "Domingo",
          "Lunes",
          "Martes",
          "Miércoles",
          "Jueves",
          "Viernes",
          "Sábado",
        ];
        const monthNames = [
          "Enero",
          "Febrero",
          "Marzo",
          "Abril",
          "Mayo",
          "Junio",
          "Julio",
          "Agosto",
          "Septiembre",
          "Octubre",
          "Noviembre",
          "Diciembre",
        ];
        const hours = cotDate.getUTCHours();
        const mins = cotDate.getUTCMinutes();
        const ampm = hours >= 12 ? "PM" : "AM";
        const h12 = hours > 12 ? hours - 12 : hours === 0 ? 12 : hours;
        const dateStr = `${dayNames[cotDate.getUTCDay()]} ${cotDate.getUTCDate()} de ${monthNames[cotDate.getUTCMonth()]}`;
        const timeStr = `${h12}:${mins.toString().padStart(2, "0")} ${ampm}`;

        const copy = COPY_BY_PURPOSE[purpose];
        const accent = purpose === "kickoff" ? "#10B981" : "#10B981";
        const accentDeep = purpose === "kickoff" ? "#047857" : "#D4A017";

        // Email al cliente
        await resend.emails.send({
          from: "UGC Colombia <noreply@ugccolombia.co>",
          to: data.email,
          subject: copy.subjectAttendee(dateStr, timeStr),
          html: `
<div style="font-family:'Inter',Helvetica,Arial,sans-serif;background:#000;color:#fff;max-width:520px;margin:0 auto;padding:0;">
  <div style="background:linear-gradient(135deg,#0a0a0a,#1a1a1a);padding:32px 24px;border-bottom:2px solid ${accent}40;">
    <p style="color:${accent};font-size:13px;margin:0 0 4px;">${copy.eyebrowAttendee}</p>
    <h1 style="color:#fff;font-size:24px;margin:0;">${copy.titleAttendee}</h1>
  </div>
  <div style="padding:24px;">
    <table style="width:100%;border-collapse:collapse;font-size:14px;">
      <tr><td style="padding:8px 0;color:${accentDeep};width:80px;">Fecha</td><td style="color:#fff;font-weight:700;">${dateStr}</td></tr>
      <tr><td style="padding:8px 0;color:${accentDeep};">Hora</td><td style="color:#fff;font-weight:700;">${timeStr} (Colombia)</td></tr>
      <tr><td style="padding:8px 0;color:${accentDeep};">Duración</td><td style="color:#fff;">30 minutos</td></tr>
      <tr><td style="padding:8px 0;color:${accentDeep};">Con</td><td style="color:#fff;">${result.host_name} — UGC Colombia</td></tr>
      ${result.meet_link ? `<tr><td style="padding:8px 0;color:${accentDeep};">Link</td><td><a href="${result.meet_link}" style="color:#F9B334;">${result.meet_link}</a></td></tr>` : ""}
    </table>
    <div style="margin:24px 0;padding:16px;border:1px solid ${accentDeep}30;border-radius:12px;background:${accentDeep}08;">
      <p style="color:#BDBCBC;font-size:13px;margin:0;line-height:1.6;">
        <strong style="color:${accentDeep};">Prepárate para la llamada:</strong><br>
        ${copy.prepTip}
      </p>
    </div>
    ${result.meet_link ? `<a href="${result.meet_link}" style="display:block;text-align:center;background:${accent};color:#000;font-weight:700;padding:14px;border-radius:12px;text-decoration:none;font-size:15px;margin-top:16px;">UNIRSE A LA LLAMADA →</a>` : ""}
  </div>
  <div style="padding:16px 24px;border-top:1px solid #222;">
    <p style="color:#3D3D3C;font-size:11px;margin:0;text-align:center;">UGC Colombia · <a href="https://ugccolombia.co" style="color:#D4A017;">ugccolombia.co</a></p>
  </div>
</div>`,
        });

        // Notificación interna (a Brian si kickoff, a founder si discovery; CC founder en kickoff)
        const internalTo = NOTIFY_EMAIL_BY_PURPOSE[purpose];
        const internalCc =
          purpose === "kickoff" ? ["founder@kreoon.com"] : undefined;

        await resend.emails.send({
          from: "UGC Colombia <noreply@ugccolombia.co>",
          to: internalTo,
          ...(internalCc ? { cc: internalCc } : {}),
          subject: copy.notifySubject(
            data.company || data.name,
            dateStr,
            timeStr,
            result.host_name,
          ),
          html: `
<div style="font-family:Inter,sans-serif;background:#000;color:#fff;padding:24px;max-width:520px;margin:0 auto;">
  <h2 style="color:${accentDeep};margin:0 0 16px;">${copy.notifyTitle}</h2>
  <table style="font-size:13px;color:#BDBCBC;line-height:2;">
    <tr><td style="color:${accentDeep};padding-right:12px;">${purpose === "kickoff" ? "Cliente" : "Lead"}</td><td>${data.name}</td></tr>
    <tr><td style="color:${accentDeep};padding-right:12px;">Empresa</td><td>${data.company || "N/A"}</td></tr>
    <tr><td style="color:${accentDeep};padding-right:12px;">Email</td><td>${data.email}</td></tr>
    ${purpose === "discovery" ? `<tr><td style="color:${accentDeep};padding-right:12px;">Score</td><td>${data.score || "N/A"}/100</td></tr>` : ""}
    <tr><td style="color:${accentDeep};padding-right:12px;">Fecha</td><td><strong>${dateStr} ${timeStr}</strong></td></tr>
    <tr><td style="color:${accentDeep};padding-right:12px;">Host</td><td>${result.host_name} (${result.host_email})</td></tr>
    ${result.meet_link ? `<tr><td style="color:${accentDeep};padding-right:12px;">Meet</td><td><a href="${result.meet_link}" style="color:#F9B334;">${result.meet_link}</a></td></tr>` : ""}
  </table>
</div>`,
        });
      } catch (emailErr) {
        console.error("[book] Email error:", emailErr);
      }
    }

    return NextResponse.json({
      success: true,
      event_id: result.event_id,
      host_name: result.host_name,
      meet_link: result.meet_link,
      start: result.start,
      purpose,
    });
  } catch (err) {
    console.error("[book] Error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Error al agendar" },
      { status: 500 },
    );
  }
}
