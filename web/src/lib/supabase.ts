import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let adminClient: SupabaseClient | null = null;

/**
 * Retorna un cliente Supabase con service role key.
 * Retorna null si las variables de entorno no están configuradas o son placeholders.
 * Uso: solo en server-side (API routes, Server Actions).
 */
export function getSupabaseAdmin(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key || url.includes("placeholder") || key.includes("placeholder")) {
    return null;
  }

  // Singleton para reutilizar la misma instancia
  if (!adminClient) {
    adminClient = createClient(url, key, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });
  }

  return adminClient;
}

/**
 * Retorna un cliente Supabase público (anon key).
 * Seguro para usar en client components.
 */
export function getSupabasePublic(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key || url.includes("placeholder") || key.includes("placeholder")) {
    return null;
  }

  return createClient(url, key);
}
