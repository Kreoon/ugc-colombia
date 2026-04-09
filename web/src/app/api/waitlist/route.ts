import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

// Rate limiting simple en memoria (no apto para multi-instancia en prod)
const ipRequestMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 5;
const WINDOW_MS = 60 * 1000; // 1 minuto

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = ipRequestMap.get(ip);

  if (!entry || entry.resetAt < now) {
    ipRequestMap.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return true;
  }

  if (entry.count >= RATE_LIMIT) {
    return false;
  }

  entry.count++;
  return true;
}

const waitlistSchema = z.object({
  email: z.string().email("Email inválido."),
});

export async function POST(req: NextRequest) {
  try {
    // Rate limiting por IP
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      req.headers.get("x-real-ip") ??
      "unknown";

    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { success: false, message: "Demasiadas solicitudes. Intenta más tarde." },
        { status: 429 }
      );
    }

    // Validar body
    const body: unknown = await req.json();
    const parsed = waitlistSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, message: parsed.error.issues[0]?.message ?? "Datos inválidos." },
        { status: 400 }
      );
    }

    const { email } = parsed.data;

    // Supabase: insertar si las variables de entorno están configuradas
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (
      supabaseUrl &&
      supabaseKey &&
      !supabaseUrl.includes("placeholder") &&
      !supabaseKey.includes("placeholder")
    ) {
      try {
        const { createClient } = await import("@supabase/supabase-js");
        const supabase = createClient(supabaseUrl, supabaseKey);

        const { error } = await supabase.from("leads").insert({
          email,
          source: "coming-soon",
          stage: "waitlist",
          created_at: new Date().toISOString(),
        });

        if (error && error.code !== "23505") {
          // 23505 = duplicate key (ya está en la lista)
          console.error("[waitlist] Supabase error:", error);
        }
      } catch (dbErr) {
        console.error("[waitlist] DB error:", dbErr);
        // No falla el request — el usuario igual queda registrado en logs
      }
    } else {
      // Dev mode: solo log
      console.log(`[waitlist] Mock register: ${email}`);
    }

    // Resend: enviar email de bienvenida si las keys están configuradas
    const resendKey = process.env.RESEND_API_KEY;

    if (resendKey && !resendKey.includes("placeholder")) {
      try {
        const { Resend } = await import("resend");
        const resend = new Resend(resendKey);

        await resend.emails.send({
          from: "UGC Colombia <noreply@ugccolombia.co>",
          to: email,
          subject: "Ya estás en la lista — UGC Colombia",
          html: `
            <div style="font-family: Inter, sans-serif; background: #000; color: #fff; padding: 40px; max-width: 520px; margin: 0 auto;">
              <h1 style="font-size: 28px; color: #D4A017; margin-bottom: 16px;">Ya estás dentro.</h1>
              <p style="color: #BDBCBC; line-height: 1.6;">
                Gracias por unirte a la waitlist de UGC Colombia. Serás de los primeros en saber cuando lancemos.
              </p>
              <p style="color: #BDBCBC; line-height: 1.6; margin-top: 24px;">
                Mientras tanto, síguenos en Instagram:
                <a href="https://instagram.com/agenciaugccolombia" style="color: #F9B334;">@agenciaugccolombia</a>
              </p>
              <p style="color: #3D3D3C; font-size: 12px; margin-top: 40px;">
                Contenido real, resultados reales. — UGC Colombia
              </p>
            </div>
          `,
        });
      } catch (emailErr) {
        console.error("[waitlist] Resend error:", emailErr);
      }
    }

    return NextResponse.json(
      { success: true, message: "Bienvenido a la waitlist" },
      { status: 200 }
    );
  } catch (err) {
    console.error("[waitlist] Unexpected error:", err);
    return NextResponse.json(
      { success: false, message: "Error interno del servidor." },
      { status: 500 }
    );
  }
}
