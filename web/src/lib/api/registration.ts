import type { RegistrationPayload } from "@/lib/validations/registration";

const FUNCTIONS_URL =
  process.env.NEXT_PUBLIC_SUPABASE_FUNCTIONS_URL ??
  "https://wjkbqcrxwsmvtxmqgiqc.functions.supabase.co";

export async function registerUser(payload: RegistrationPayload) {
  const body = {
    email: payload.email,
    password: payload.password,
    full_name: payload.full_name,
    phone: payload.phone,
    legal_accepted: true,
  };
  const res = await fetch(`${FUNCTIONS_URL}/public-registration`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data?.error || "No pudimos completar tu registro");
  }
  return data;
}
