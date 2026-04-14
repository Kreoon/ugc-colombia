import { NextResponse } from "next/server";
import { requireRole } from "@/lib/auth";
import { createSupabaseServer } from "@/lib/supabase-server";

interface InviteBody {
  email: string;
  fullName?: string;
  role: string;
}

export async function POST(req: Request) {
  const user = await requireRole(["founder", "manager"]);

  const body = (await req.json().catch(() => ({}))) as Partial<InviteBody>;
  const { email, fullName, role } = body;

  if (!email || !role) {
    return NextResponse.json(
      { error: "Email y rol son requeridos" },
      { status: 400 }
    );
  }

  const validRoles = ["founder", "manager", "coordinator", "sales", "creative"];
  if (!validRoles.includes(role)) {
    return NextResponse.json({ error: "Rol inválido" }, { status: 400 });
  }

  const supabase = await createSupabaseServer();

  // Verificar que no exista invitación activa pendiente
  const { data: existingInvite } = await supabase
    .from("invitations")
    .select("id")
    .eq("email", email)
    .is("accepted_at", null)
    .maybeSingle();

  if (existingInvite) {
    return NextResponse.json(
      { error: "Ya hay una invitación pendiente para este email" },
      { status: 400 }
    );
  }

  // Verificar que no exista un miembro con ese email
  const { data: existingMember } = await supabase
    .from("admin_users")
    .select("id")
    .eq("email", email)
    .maybeSingle();

  if (existingMember) {
    return NextResponse.json(
      { error: "Ya existe un usuario con este email" },
      { status: 400 }
    );
  }

  // Crear invitación (token generado por DB con gen_random_uuid())
  const { data: invitation, error: insertErr } = await supabase
    .from("invitations")
    .insert({
      email,
      full_name: fullName ?? null,
      role,
      invited_by: user.id,
    })
    .select("token")
    .single();

  if (insertErr || !invitation) {
    return NextResponse.json(
      { error: insertErr?.message ?? "Error al crear invitación" },
      { status: 500 }
    );
  }

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const inviteUrl = `${siteUrl}/admin/invitacion/${invitation.token as string}`;

  // TODO: Enviar email con Resend cuando RESEND_API_KEY esté configurado.
  // Por ahora se devuelve el link para que el admin lo comparta manualmente.

  return NextResponse.json({ ok: true, inviteUrl });
}
