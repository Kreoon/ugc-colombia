import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createBooking } from "@/lib/google-calendar";

const bookSchema = z.object({
  start: z.string(),
  end: z.string(),
  host_key: z.string(),
  name: z.string().min(1),
  email: z.string().email(),
  company: z.string().nullish(),
  score: z.number().nullish(),
  lead_id: z.string().nullish(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = bookSchema.parse(body);

    const result = await createBooking(
      { start: data.start, end: data.end, host_key: data.host_key },
      { name: data.name, email: data.email, company: data.company ?? undefined, score: data.score ?? undefined }
    );

    // Update lead in Supabase
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (data.lead_id && supabaseUrl && supabaseKey && !supabaseUrl.includes("placeholder")) {
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

    // Send confirmation email via Resend
    const resendKey = process.env.RESEND_API_KEY;
    if (resendKey && !resendKey.includes("placeholder")) {
      try {
        const { Resend } = await import("resend");
        const resend = new Resend(resendKey);

        const meetDate = new Date(data.start);
        const cotDate = new Date(meetDate.getTime() - 5 * 60 * 60 * 1000);
        const dayNames = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
        const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
        const hours = cotDate.getUTCHours();
        const mins = cotDate.getUTCMinutes();
        const ampm = hours >= 12 ? "PM" : "AM";
        const h12 = hours > 12 ? hours - 12 : hours === 0 ? 12 : hours;
        const dateStr = `${dayNames[cotDate.getUTCDay()]} ${cotDate.getUTCDate()} de ${monthNames[cotDate.getUTCMonth()]}`;
        const timeStr = `${h12}:${mins.toString().padStart(2, "0")} ${ampm}`;

        await resend.emails.send({
          from: "UGC Colombia <noreply@ugccolombia.co>",
          to: data.email,
          subject: `Llamada confirmada — ${dateStr} a las ${timeStr}`,
          html: `
<div style="font-family:'Inter',Helvetica,Arial,sans-serif;background:#000;color:#fff;max-width:520px;margin:0 auto;padding:0;">
  <div style="background:linear-gradient(135deg,#0a0a0a,#1a1a1a);padding:32px 24px;border-bottom:2px solid #D4A01740;">
    <p style="color:#10B981;font-size:13px;margin:0 0 4px;">✓ Llamada confirmada</p>
    <h1 style="color:#fff;font-size:24px;margin:0;">Llamada de Diagnóstico Estratégico con UGC Colombia</h1>
  </div>
  <div style="padding:24px;">
    <table style="width:100%;border-collapse:collapse;font-size:14px;">
      <tr><td style="padding:8px 0;color:#D4A017;width:80px;">Fecha</td><td style="color:#fff;font-weight:700;">${dateStr}</td></tr>
      <tr><td style="padding:8px 0;color:#D4A017;">Hora</td><td style="color:#fff;font-weight:700;">${timeStr} (Colombia)</td></tr>
      <tr><td style="padding:8px 0;color:#D4A017;">Duración</td><td style="color:#fff;">30 minutos</td></tr>
      <tr><td style="padding:8px 0;color:#D4A017;">Con</td><td style="color:#fff;">${result.host_name} — UGC Colombia</td></tr>
      ${result.meet_link ? `<tr><td style="padding:8px 0;color:#D4A017;">Link</td><td><a href="${result.meet_link}" style="color:#F9B334;">${result.meet_link}</a></td></tr>` : ""}
    </table>
    <div style="margin:24px 0;padding:16px;border:1px solid #D4A01730;border-radius:12px;background:#D4A01708;">
      <p style="color:#BDBCBC;font-size:13px;margin:0;line-height:1.6;">
        <strong style="color:#D4A017;">Prepárate para la llamada:</strong><br>
        Ten a mano ejemplos de contenido que hayas usado o que te gusten. También es útil tener claras tus métricas actuales (ads, ventas, seguidores).
      </p>
    </div>
    ${result.meet_link ? `<a href="${result.meet_link}" style="display:block;text-align:center;background:#D4A017;color:#000;font-weight:700;padding:14px;border-radius:12px;text-decoration:none;font-size:15px;margin-top:16px;">UNIRSE A LA LLAMADA →</a>` : ""}
  </div>
  <div style="padding:16px 24px;border-top:1px solid #222;">
    <p style="color:#3D3D3C;font-size:11px;margin:0;text-align:center;">UGC Colombia · <a href="https://ugccolombia.co" style="color:#D4A017;">ugccolombia.co</a></p>
  </div>
</div>`,
        });

        // Notify team
        await resend.emails.send({
          from: "UGC Colombia <noreply@ugccolombia.co>",
          to: "founder@kreoon.com",
          subject: `📅 Nueva cita: ${data.company || data.name} — ${dateStr} ${timeStr} con ${result.host_name}`,
          html: `
<div style="font-family:Inter,sans-serif;background:#000;color:#fff;padding:24px;max-width:520px;margin:0 auto;">
  <h2 style="color:#D4A017;margin:0 0 16px;">Nueva cita agendada</h2>
  <table style="font-size:13px;color:#BDBCBC;line-height:2;">
    <tr><td style="color:#D4A017;padding-right:12px;">Lead</td><td>${data.name}</td></tr>
    <tr><td style="color:#D4A017;padding-right:12px;">Empresa</td><td>${data.company || "N/A"}</td></tr>
    <tr><td style="color:#D4A017;padding-right:12px;">Email</td><td>${data.email}</td></tr>
    <tr><td style="color:#D4A017;padding-right:12px;">Score</td><td>${data.score || "N/A"}/100</td></tr>
    <tr><td style="color:#D4A017;padding-right:12px;">Fecha</td><td><strong>${dateStr} ${timeStr}</strong></td></tr>
    <tr><td style="color:#D4A017;padding-right:12px;">Host</td><td>${result.host_name} (${result.host_email})</td></tr>
    ${result.meet_link ? `<tr><td style="color:#D4A017;padding-right:12px;">Meet</td><td><a href="${result.meet_link}" style="color:#F9B334;">${result.meet_link}</a></td></tr>` : ""}
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
    });
  } catch (err) {
    console.error("[book] Error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Error al agendar" },
      { status: 500 }
    );
  }
}
