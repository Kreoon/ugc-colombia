import type Stripe from "stripe";
import { getStripe } from "./server";
import { createSupabaseServiceRole } from "@/lib/supabase-server";

type SupabaseService = ReturnType<typeof createSupabaseServiceRole>;

export interface CustomerSeed {
  email: string;
  name: string;
  metadata: Record<string, string | undefined>;
}

function isResourceMissing(err: unknown): boolean {
  if (!err || typeof err !== "object") return false;
  const e = err as { code?: string; statusCode?: number };
  return e.code === "resource_missing" || e.statusCode === 404;
}

/**
 * Resuelve un Stripe Customer reutilizable para un email dado.
 *
 * Estrategia:
 *   1. Busca en Supabase `stripe_customers` por email.
 *   2. Si encuentra una fila, valida que el customer todavía exista en Stripe
 *      (puede haber sido borrado manualmente desde el dashboard tras un
 *      smoke test, lo que dejaría la fila local apuntando a un ID muerto).
 *   3. Si el customer no existe o está marcado deleted, crea uno nuevo y
 *      actualiza la fila de Supabase con el ID nuevo.
 *   4. Si la fila no existe, crea customer + inserta fila.
 *
 * Esto previene errores 500 "No such customer" en checkout cuando la DB
 * local tiene un ID stale que Stripe ya no reconoce.
 */
export async function getOrCreateStripeCustomer(
  supabase: SupabaseService,
  seed: CustomerSeed,
): Promise<string> {
  const stripe = getStripe();
  const sanitizedMetadata: Record<string, string> = Object.fromEntries(
    Object.entries(seed.metadata).filter(([, v]) => v !== undefined && v !== ""),
  ) as Record<string, string>;

  const { data: existing } = await supabase
    .from("stripe_customers")
    .select("stripe_customer_id")
    .eq("email", seed.email)
    .maybeSingle();

  if (existing?.stripe_customer_id) {
    try {
      const customer = (await stripe.customers.retrieve(
        existing.stripe_customer_id,
      )) as Stripe.Customer | Stripe.DeletedCustomer;
      if (!("deleted" in customer && customer.deleted === true)) {
        return existing.stripe_customer_id;
      }
      // Cae al recreate flow más abajo.
    } catch (err) {
      if (!isResourceMissing(err)) {
        throw err;
      }
      // Customer ya no existe en Stripe — recrear.
    }
  }

  const customer = await stripe.customers.create({
    email: seed.email,
    name: seed.name,
    metadata: sanitizedMetadata,
  });

  if (existing) {
    await supabase
      .from("stripe_customers")
      .update({
        stripe_customer_id: customer.id,
        metadata: sanitizedMetadata,
      })
      .eq("email", seed.email);
  } else {
    await supabase.from("stripe_customers").insert({
      stripe_customer_id: customer.id,
      email: seed.email,
      metadata: sanitizedMetadata,
    });
  }

  return customer.id;
}
