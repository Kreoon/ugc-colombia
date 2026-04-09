import type { RegistrationPayload } from "@/lib/validations/registration";

const FUNCTIONS_URL =
  process.env.NEXT_PUBLIC_SUPABASE_FUNCTIONS_URL ??
  "https://wjkbqcrxwsmvtxmqgiqc.functions.supabase.co";

export async function registerUser(payload: RegistrationPayload) {
  // Strip empty strings so Zod optionals don't reach the backend
  const clean = Object.fromEntries(
    Object.entries(payload).filter(([, v]) => v !== "" && v !== undefined)
  );

  const res = await fetch(`${FUNCTIONS_URL}/public-registration`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(clean),
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data?.error || "No pudimos completar tu registro");
  }
  return data;
}
