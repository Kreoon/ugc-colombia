import { NextRequest, NextResponse } from "next/server";

// OAuth callback — receives the authorization code from Google
// and exchanges it for a refresh token.
// This is a one-time setup endpoint.

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get("code");
  const error = req.nextUrl.searchParams.get("error");

  if (error) {
    return new NextResponse(`Error: ${error}`, { status: 400 });
  }

  if (!code) {
    return new NextResponse("No code received", { status: 400 });
  }

  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  const redirectUri = `${process.env.NEXT_PUBLIC_SITE_URL || "https://ugccolombia.co"}/api/auth/callback`;

  if (!clientId || !clientSecret) {
    return new NextResponse("Google OAuth not configured", { status: 500 });
  }

  try {
    const res = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
        grant_type: "authorization_code",
      }),
    });

    const data = await res.json();

    if (data.error) {
      return new NextResponse(
        `<pre>Error: ${JSON.stringify(data, null, 2)}</pre>`,
        { headers: { "Content-Type": "text/html" } }
      );
    }

    // Show the refresh token so it can be saved as env var
    return new NextResponse(
      `<!DOCTYPE html>
<html><head><title>Google OAuth — UGC Colombia</title></head>
<body style="background:#000;color:#fff;font-family:Inter,sans-serif;padding:40px;max-width:600px;margin:0 auto;">
  <h1 style="color:#D4A017;">Token generado exitosamente</h1>
  <p style="color:#BDBCBC;">Copia este refresh token y guárdalo como variable de entorno en Vercel:</p>
  <div style="background:#111;border:1px solid #333;border-radius:8px;padding:16px;margin:16px 0;word-break:break-all;">
    <code style="color:#10B981;font-size:14px;">${data.refresh_token || "NO REFRESH TOKEN — ya fue usado o prompt=consent faltó"}</code>
  </div>
  <p style="color:#BDBCBC;font-size:13px;">Variable: <code style="color:#F9B334;">GOOGLE_REFRESH_TOKEN_FOUNDER</code></p>
  <p style="color:#666;font-size:11px;margin-top:24px;">Access token (temporal): ${data.access_token?.slice(0, 20)}...</p>
</body></html>`,
      { headers: { "Content-Type": "text/html" } }
    );
  } catch (err) {
    return new NextResponse(`Error: ${err}`, { status: 500 });
  }
}
