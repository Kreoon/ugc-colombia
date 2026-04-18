import type { Currency } from "@/lib/pricing/currency-config";

export type StripePlanId = "starter" | "growth" | "scale";

/**
 * Duración del compromiso. Define a qué price mapeo consumir y cuánto
 * descuento se aplicó por prepago.
 *   1  = mensual (sin descuento)
 *   3  = trimestral (-20%)
 *   6  = semestral (-30%)
 *   12 = anual (-40%)
 */
export type BillingDuration = 1 | 3 | 6 | 12;

export const BILLING_DURATIONS: readonly BillingDuration[] = [1, 3, 6, 12] as const;
export const DEFAULT_BILLING_DURATION: BillingDuration = 1;

export const DURATION_DISCOUNT: Record<BillingDuration, number> = {
  1: 0,
  3: 0.2,
  6: 0.3,
  12: 0.4,
};

export const DURATION_LABEL: Record<BillingDuration, string> = {
  1: "Mensual",
  3: "Trimestral",
  6: "Semestral",
  12: "Anual",
};

export function isValidBillingDuration(value: unknown): value is BillingDuration {
  return value === 1 || value === 3 || value === 6 || value === 12;
}

/**
 * Resuelve el Price ID de Stripe para un plan+moneda+duración. Los valores
 * viven en env (STRIPE_PRICE_<PLAN>_<CURRENCY>_<DURATION>M) para permitir
 * rotar claves test/live sin recompilar ni exponer IDs en el bundle.
 *
 * Si no hay variable específica para la duración (ej. 12M), cae en la
 * variable legacy sin sufijo (STRIPE_PRICE_<PLAN>_<CURRENCY>) para mantener
 * compatibilidad con setups antiguos.
 */
export function getStripePriceId(
  planId: StripePlanId,
  currency: Currency,
  duration: BillingDuration = DEFAULT_BILLING_DURATION,
): string {
  const suffix = `${duration}M`;
  const key = `STRIPE_PRICE_${planId.toUpperCase()}_${currency}_${suffix}`;
  const legacyKey = `STRIPE_PRICE_${planId.toUpperCase()}_${currency}`;
  const priceId = process.env[key] ?? process.env[legacyKey];
  if (!priceId) {
    throw new Error(
      `Price ID no configurado para ${planId}/${currency}/${duration}m. Define ${key} en .env.local`,
    );
  }
  return priceId;
}

/**
 * Multiplicadores para convertir entre unidad mayor (USD, COP) y unidad
 * menor (cents / minor units) que espera Stripe.
 *
 * COP NO es zero-decimal en Stripe: usa 100 minor units por COP.
 * Zero-decimal currencies: BIF, CLP, DJF, GNF, JPY, KMF, KRW, MGA, PYG,
 * RWF, UGX, VND, VUV, XAF, XOF, XPF.
 * Fuente: https://docs.stripe.com/currencies#zero-decimal
 */
export const STRIPE_CURRENCY_MULTIPLIER: Record<Currency, number> = {
  USD: 100,
  COP: 100,
};

export function toStripeAmount(amount: number, currency: Currency): number {
  return Math.round(amount * STRIPE_CURRENCY_MULTIPLIER[currency]);
}

export function fromStripeAmount(amount: number, currency: Currency): number {
  return amount / STRIPE_CURRENCY_MULTIPLIER[currency];
}

export function isValidStripePlan(id: string): id is StripePlanId {
  return id === "starter" || id === "growth" || id === "scale";
}

/**
 * Calcula el monto total del ciclo (no mensual) con el descuento de la
 * duración aplicado. Usado por /api/checkout/custom para generar price_data
 * inline con el mismo modelo de descuentos que los planes predeterminados.
 *
 * Ejemplo: monthlyAmount=590 USD, duration=3 → 590 × 3 × 0.80 = 1416 USD
 */
export function applyDurationDiscount(
  monthlyAmount: number,
  duration: BillingDuration,
): number {
  const discount = DURATION_DISCOUNT[duration];
  const total = monthlyAmount * duration * (1 - discount);
  return Math.round(total);
}
