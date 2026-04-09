import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/types/supabase";

// ─── Variables de entorno ────────────────────────────────────────────────────
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "Faltan variables de entorno de Supabase. " +
      "Verifica NEXT_PUBLIC_SUPABASE_URL y NEXT_PUBLIC_SUPABASE_ANON_KEY en .env.local"
  );
}

// ─── Cliente público (browser + Server Components de solo lectura) ───────────
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

// ─── Cliente admin (solo Server — nunca exponer al browser) ──────────────────
export function createAdminClient() {
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!serviceKey) {
    throw new Error(
      "SUPABASE_SERVICE_ROLE_KEY no está definida. " +
        "Este cliente solo debe usarse en Server Actions o Route Handlers."
    );
  }
  return createClient<Database>(supabaseUrl!, serviceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
