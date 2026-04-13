import { NextResponse } from "next/server";

export async function GET() {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  const refreshToken = process.env.GOOGLE_REFRESH_TOKEN_FOUNDER;

  const status: Record<string, unknown> = {
    has_client_id: !!clientId,
    has_client_secret: !!clientSecret,
    has_refresh_token: !!refreshToken,
    client_id_preview: clientId?.slice(0, 15) + "...",
  };

  if (!clientId || !clientSecret || !refreshToken) {
    return NextResponse.json({ ...status, error: "Missing Google credentials" });
  }

  // Step 1: Get access token
  try {
    const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        refresh_token: refreshToken,
        grant_type: "refresh_token",
      }),
    });
    const tokenData = await tokenRes.json();

    if (!tokenData.access_token) {
      return NextResponse.json({ ...status, token_error: tokenData });
    }

    status.token_ok = true;

    // Step 2: Query FreeBusy
    const now = new Date();
    const timeMin = new Date(now);
    const timeMax = new Date(now);
    timeMax.setDate(timeMax.getDate() + 3);

    const fbRes = await fetch("https://www.googleapis.com/calendar/v3/freeBusy", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        timeMin: timeMin.toISOString(),
        timeMax: timeMax.toISOString(),
        items: [{ id: "primary" }],
      }),
    });
    const fbData = await fbRes.json();

    status.freebusy_ok = true;
    status.busy_slots = fbData.calendars?.primary?.busy || [];
    status.busy_count = (fbData.calendars?.primary?.busy || []).length;
    status.freebusy_errors = fbData.calendars?.primary?.errors;

    return NextResponse.json(status);
  } catch (err) {
    return NextResponse.json({
      ...status,
      error: err instanceof Error ? err.message : "Unknown error",
    });
  }
}
