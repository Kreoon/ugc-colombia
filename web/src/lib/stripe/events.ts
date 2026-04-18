import type Stripe from "stripe";

export const RELEVANT_STRIPE_EVENTS = new Set<Stripe.Event.Type>([
  "checkout.session.completed",
  "checkout.session.expired",
  "invoice.paid",
  "invoice.payment_failed",
  "customer.subscription.created",
  "customer.subscription.updated",
  "customer.subscription.deleted",
]);

export function isRelevantEvent(type: string): type is Stripe.Event.Type {
  return RELEVANT_STRIPE_EVENTS.has(type as Stripe.Event.Type);
}

/**
 * Normaliza el status de la subscription al enum que usamos en Supabase.
 * Stripe y Postgres comparten los mismos valores, pero si Stripe agrega uno
 * nuevo que el CHECK no conoce, cae a 'incomplete' en vez de romper el insert.
 */
const ALLOWED_SUB_STATUSES = new Set([
  "trialing",
  "active",
  "past_due",
  "canceled",
  "incomplete",
  "incomplete_expired",
  "unpaid",
  "paused",
]);

export function normalizeSubscriptionStatus(status: string): string {
  return ALLOWED_SUB_STATUSES.has(status) ? status : "incomplete";
}
