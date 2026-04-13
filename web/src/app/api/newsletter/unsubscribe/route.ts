import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const email = req.nextUrl.searchParams.get("email");
  if (!email) {
    return new NextResponse(html("Email no proporcionado."), { headers: { "Content-Type": "text/html" } });
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (supabaseUrl && supabaseKey && !supabaseUrl.includes("placeholder")) {
    try {
      const { createClient } = await import("@supabase/supabase-js");
      const supabase = createClient(supabaseUrl, supabaseKey);

      await supabase
        .from("newsletter_subscribers")
        .update({ status: "unsubscribed", unsubscribed_at: new Date().toISOString() })
        .eq("email", email);

      // Also cancel pending nurturing emails
      const { data: lead } = await supabase
        .from("leads")
        .select("id")
        .eq("email", email)
        .single();

      if (lead) {
        await supabase
          .from("email_sequences")
          .update({ status: "skipped" })
          .eq("lead_id", lead.id)
          .eq("status", "pending");
      }
    } catch {
      // Silently fail
    }
  }

  return new NextResponse(html("Te has desuscrito exitosamente. No recibirás más emails de nuestra parte."), {
    headers: { "Content-Type": "text/html" },
  });
}

function html(message: string): string {
  return `<!DOCTYPE html>
<html lang="es">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>UGC Colombia</title></head>
<body style="background:#000;color:#fff;font-family:Inter,sans-serif;display:flex;align-items:center;justify-content:center;min-height:100vh;margin:0;">
  <div style="text-align:center;padding:40px;">
    <h1 style="color:#D4A017;font-size:24px;">UGC Colombia</h1>
    <p style="color:#BDBCBC;font-size:16px;margin-top:16px;">${message}</p>
    <a href="https://ugccolombia.co" style="color:#D4A017;font-size:14px;margin-top:24px;display:inline-block;">← Volver al sitio</a>
  </div>
</body>
</html>`;
}
