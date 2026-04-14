import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { getSupabaseAdmin } from "@/lib/supabase";
import { resolveLogoUrl } from "@/lib/admin/logo-resolver";
import { logActivity } from "@/lib/admin/activity-logger";

interface Body {
  leadId?: string;
  instagramHandle?: string;
  website?: string;
}

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await request.json().catch(() => ({}))) as Body;
  if (!body.leadId) {
    return NextResponse.json({ error: "Missing leadId" }, { status: 400 });
  }

  const logoUrl = await resolveLogoUrl({
    instagramHandle: body.instagramHandle,
    website: body.website,
  });

  if (!logoUrl) {
    return NextResponse.json(
      { ok: true, logoUrl: null, message: "No se pudo resolver logo" },
      { status: 200 },
    );
  }

  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return NextResponse.json({ error: "Supabase not configured" }, { status: 500 });
  }

  await supabase
    .from("leads")
    .update({ logo_url: logoUrl, updated_at: new Date().toISOString() })
    .eq("id", body.leadId);

  await logActivity({
    leadId: body.leadId,
    type: "logo_updated",
    description: "Logo auto-fetcheado",
    metadata: { source: "auto", url: logoUrl },
  });

  return NextResponse.json({ ok: true, logoUrl });
}
