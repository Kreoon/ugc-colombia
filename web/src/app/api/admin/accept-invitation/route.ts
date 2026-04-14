import { NextResponse } from "next/server";
import { createSupabaseServiceRole } from "@/lib/supabase-server";

interface AcceptInvitationBody {
  token: string;
  password: string;
  fullName: string;
}

export async function POST(req: Request) {
  const body = (await req.json().catch(() => ({}))) as Partial<AcceptInvitationBody>;
  const { token, password, fullName } = body;

  if (!token || !password || !fullName) {
    return NextResponse.json(
      { error: "token, password y fullName son requeridos" },
      { status: 400 }
    );
  }

  const supabase = createSupabaseServiceRole();

  const { data: invitation } = await supabase
    .from("invitations")
    .select("id, email, role, expires_at, accepted_at")
    .eq("token", token)
    .single();

  if (!invitation) {
    return NextResponse.json(
      { error: "Invitación no encontrada" },
      { status: 404 }
    );
  }

  if (invitation.accepted_at) {
    return NextResponse.json(
      { error: "Invitación ya usada" },
      { status: 400 }
    );
  }

  if (new Date(invitation.expires_at as string) < new Date()) {
    return NextResponse.json(
      { error: "Invitación expirada" },
      { status: 400 }
    );
  }

  // Crear usuario en Supabase Auth
  const { data: authData, error: authErr } =
    await supabase.auth.admin.createUser({
      email: invitation.email as string,
      password,
      email_confirm: true,
      user_metadata: {
        full_name: fullName,
        role: invitation.role,
      },
    });

  if (authErr || !authData.user) {
    return NextResponse.json(
      { error: authErr?.message ?? "Error al crear usuario" },
      { status: 500 }
    );
  }

  // Crear registro en admin_users
  const { error: memberErr } = await supabase.from("admin_users").insert({
    auth_user_id: authData.user.id,
    email: invitation.email,
    full_name: fullName,
    role: invitation.role,
    is_active: true,
    invitation_accepted_at: new Date().toISOString(),
  });

  if (memberErr) {
    // Revertir usuario creado si falla la inserción
    await supabase.auth.admin.deleteUser(authData.user.id);
    return NextResponse.json(
      { error: "Error al crear perfil de equipo" },
      { status: 500 }
    );
  }

  // Marcar invitación como aceptada
  await supabase
    .from("invitations")
    .update({ accepted_at: new Date().toISOString() })
    .eq("id", invitation.id);

  return NextResponse.json({ ok: true });
}
