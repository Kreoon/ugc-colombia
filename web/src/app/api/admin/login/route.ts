import { NextResponse } from "next/server";
import { setAdminSession, verifyPassword } from "@/lib/admin-auth";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as { password?: string };
  const password = body.password ?? "";

  if (!verifyPassword(password)) {
    return NextResponse.json(
      { error: "Contraseña incorrecta" },
      { status: 401 },
    );
  }

  await setAdminSession();
  return NextResponse.json({ ok: true });
}
