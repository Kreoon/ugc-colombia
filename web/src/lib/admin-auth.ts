import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

const COOKIE_NAME = "ugc_admin_auth";
const COOKIE_MAX_AGE = 60 * 60 * 12; // 12 horas

function getSecret(): string {
  const s = process.env.ADMIN_SECRET;
  if (!s || s.length < 16) {
    throw new Error("ADMIN_SECRET env var missing or too short (min 16 chars)");
  }
  return s;
}

function getExpectedPassword(): string {
  const p = process.env.ADMIN_PASSWORD;
  if (!p || p.length < 6) {
    throw new Error("ADMIN_PASSWORD env var missing or too short");
  }
  return p;
}

function sign(payload: string): string {
  return createHmac("sha256", getSecret()).update(payload).digest("hex");
}

export function verifyPassword(input: string): boolean {
  try {
    const expected = getExpectedPassword();
    if (input.length !== expected.length) return false;
    return timingSafeEqual(Buffer.from(input), Buffer.from(expected));
  } catch {
    return false;
  }
}

export async function setAdminSession(): Promise<void> {
  const token = sign("admin-authenticated");
  const jar = await cookies();
  jar.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: COOKIE_MAX_AGE,
  });
}

export async function clearAdminSession(): Promise<void> {
  const jar = await cookies();
  jar.delete(COOKIE_NAME);
}

export async function isAdminAuthenticated(): Promise<boolean> {
  try {
    const jar = await cookies();
    const token = jar.get(COOKIE_NAME)?.value;
    if (!token) return false;
    const expected = sign("admin-authenticated");
    if (token.length !== expected.length) return false;
    return timingSafeEqual(Buffer.from(token), Buffer.from(expected));
  } catch {
    return false;
  }
}
