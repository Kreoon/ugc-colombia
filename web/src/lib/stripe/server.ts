import Stripe from "stripe";

/**
 * Singleton server-side Stripe client.
 * NUNCA importar desde Client Components: STRIPE_SECRET_KEY no debe llegar al navegador.
 */
let _stripe: Stripe | null = null;

export function getStripe(): Stripe {
  if (_stripe) return _stripe;

  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    throw new Error(
      "STRIPE_SECRET_KEY no está definido. Copia web/.env.example → web/.env.local y configura las claves.",
    );
  }

  _stripe = new Stripe(secretKey, {
    // Usa la apiVersion por defecto del SDK (pinneada por la versión del paquete).
    // Evita pin explícito: un string incorrecto rompe el build en TypeScript.
    typescript: true,
    appInfo: {
      name: "UGC Colombia Web",
      version: "0.1.0",
    },
  });

  return _stripe;
}
