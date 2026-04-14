/**
 * Configuración central de la oferta de urgencia + exclusividad.
 *
 * Actualización manual:
 *   - Bajar `OPEN_SLOTS` cuando se cierre un cupo (o subir si se abren más).
 *   - Cambiar `DISCOUNT_PCT` si se ajusta el incentivo.
 *
 * TODO mensual: revisar este archivo para que los cupos reflejen la realidad.
 */

export const OPEN_SLOTS = 3;
export const DISCOUNT_PCT = 30;
export const COUNTDOWN_HOURS = 24;

export const OFFER_COOKIE_DEADLINE = "ugc_offer_deadline";
export const OFFER_COOKIE_BANNER_DISMISSED = "ugc_offer_banner_dismissed";

export const OFFER_COPY = {
  slots_text: `Solo ${OPEN_SLOTS} cupos abiertos este mes para escalar con nosotros`,
  slots_short: `${OPEN_SLOTS} cupos abiertos`,
  discount_text: `${DISCOUNT_PCT}% de descuento si aplicas en las próximas ${COUNTDOWN_HOURS}h`,
  discount_short: `${DISCOUNT_PCT}% off si aplicas hoy`,
  banner_headline: `${OPEN_SLOTS} cupos · ${DISCOUNT_PCT}% si aplicas hoy`,
  apply_cta: "Aplica ahora →",
  application_note:
    "Revisamos cada aplicación en 24h · 30% de descuento si completas tu aplicación hoy",
  expired_text: "La ventana se cerró. Déjanos tu info y te avisamos cuando abramos nuevos cupos.",
} as const;
