import type {
  BrandPayload,
  CreatorPayload,
  RegistrationPayload,
} from "@/lib/validations/registration";

const FUNCTIONS_URL =
  process.env.NEXT_PUBLIC_SUPABASE_FUNCTIONS_URL ??
  "https://wjkbqcrxwsmvtxmqgiqc.functions.supabase.co";

function toBackendPayload(values: CreatorPayload | BrandPayload) {
  const base = {
    type: values.type,
    email: values.email,
    password: values.password,
    full_name: values.full_name,
    phone: values.phone,
    legal_accepted: true,
  };
  if (values.type === "brand") {
    return { ...base, company_name: values.company_name };
  }
  return base;
}

export async function registerUser(payload: RegistrationPayload) {
  const body = toBackendPayload(payload);
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
