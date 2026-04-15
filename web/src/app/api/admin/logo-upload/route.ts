import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { getSupabaseAdmin } from "@/lib/supabase";
import { logActivity } from "@/lib/admin/activity-logger";

const BUCKET = "lead-logos";
const MAX_SIZE = 3 * 1024 * 1024; // 3MB
const ALLOWED_TYPES = ["image/png", "image/jpeg", "image/webp", "image/gif"];

export const runtime = "nodejs";

export async function POST(request: Request) {
  if (!(await getCurrentUser())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return NextResponse.json({ error: "Supabase not configured" }, { status: 500 });
  }

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json({ error: "Invalid form data" }, { status: 400 });
  }

  const leadId = formData.get("leadId");
  const file = formData.get("file");

  if (typeof leadId !== "string" || !leadId) {
    return NextResponse.json({ error: "Missing leadId" }, { status: 400 });
  }

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Missing file" }, { status: 400 });
  }

  if (!ALLOWED_TYPES.includes(file.type)) {
    return NextResponse.json(
      { error: "Tipo no permitido. Usa PNG, JPG, WebP o GIF" },
      { status: 400 },
    );
  }

  if (file.size > MAX_SIZE) {
    return NextResponse.json(
      { error: "Archivo muy grande. Máximo 3MB" },
      { status: 400 },
    );
  }

  const ext = file.name.split(".").pop()?.toLowerCase() ?? "png";
  const safeExt = ["png", "jpg", "jpeg", "webp", "gif"].includes(ext) ? ext : "png";
  const path = `${leadId}/${Date.now()}.${safeExt}`;

  const buffer = await file.arrayBuffer();

  // Asegurar que el bucket exista (crea como público si no)
  await supabase.storage
    .createBucket(BUCKET, { public: true, fileSizeLimit: MAX_SIZE })
    .catch(() => {
      /* si ya existe, ignorar */
    });

  const { error: upErr } = await supabase.storage
    .from(BUCKET)
    .upload(path, buffer, {
      contentType: file.type,
      upsert: true,
    });

  if (upErr) {
    return NextResponse.json(
      { error: `Upload falló: ${upErr.message}` },
      { status: 500 },
    );
  }

  const { data: pub } = supabase.storage.from(BUCKET).getPublicUrl(path);
  const logoUrl = pub.publicUrl;

  await supabase
    .from("leads")
    .update({ logo_url: logoUrl, updated_at: new Date().toISOString() })
    .eq("id", leadId);

  await logActivity({
    leadId,
    type: "logo_updated",
    description: "Logo subido manualmente",
    metadata: { source: "manual_upload", path, size: file.size },
  });

  return NextResponse.json({ ok: true, logoUrl });
}
