import { NextResponse } from "next/server";
import { requireRole } from "@/lib/auth";
import { createSupabaseServer } from "@/lib/supabase-server";

export async function POST(req: Request) {
  const user = await requireRole(["founder", "manager"]);

  const body: unknown = await req.json();
  if (
    typeof body !== "object" ||
    body === null ||
    !("filePath" in body) ||
    !("content" in body)
  ) {
    return NextResponse.json(
      { error: "filePath y content requeridos" },
      { status: 400 }
    );
  }

  const { filePath, content } = body as { filePath: unknown; content: unknown };

  if (typeof filePath !== "string" || typeof content !== "string") {
    return NextResponse.json(
      { error: "filePath y content deben ser strings" },
      { status: 400 }
    );
  }

  const supabase = await createSupabaseServer();

  const { data, error } = await supabase
    .from("content_overrides")
    .upsert(
      {
        file_path: filePath,
        content,
        edited_by: user.id,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "file_path" }
    )
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Log de actividad — ignoramos error si el RPC no existe aún
  try {
    await supabase.rpc("log_admin_activity", {
      p_action: "content_edit",
      p_resource_type: "content",
      p_resource_id: filePath,
      p_metadata: { bytes: content.length },
    });
  } catch {
    // RPC opcional — no bloquea la respuesta
  }

  return NextResponse.json({ ok: true, override: data });
}

export async function DELETE(req: Request) {
  const user = await requireRole(["founder", "manager"]);

  const body: unknown = await req.json();
  if (typeof body !== "object" || body === null || !("filePath" in body)) {
    return NextResponse.json({ error: "filePath requerido" }, { status: 400 });
  }

  const { filePath } = body as { filePath: unknown };

  if (typeof filePath !== "string") {
    return NextResponse.json(
      { error: "filePath debe ser string" },
      { status: 400 }
    );
  }

  const supabase = await createSupabaseServer();

  const { error } = await supabase
    .from("content_overrides")
    .delete()
    .eq("file_path", filePath);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Log de actividad — ignoramos error si el RPC no existe aún
  try {
    await supabase.rpc("log_admin_activity", {
      p_action: "content_revert",
      p_resource_type: "content",
      p_resource_id: filePath,
      p_metadata: { reverted_by: user.id },
    });
  } catch {
    // RPC opcional — no bloquea la respuesta
  }

  return NextResponse.json({ ok: true });
}
