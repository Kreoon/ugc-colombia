import { hasConsent } from "./consent";
import { getUTMParams } from "./utm";
import type { TrackingEvent } from "./types";
import {
  DEFAULT_CURRENCY,
  SUPPORTED_CURRENCIES,
  priceInUSD,
  type Currency,
} from "@/lib/pricing/currency-config";
import { currencyFromCountry } from "@/lib/geo/country-to-currency";

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
    ttq?: { track: (...args: unknown[]) => void };
    uetq?: Record<string, unknown>[];
  }
}

const TIKTOK_STANDARD_EVENTS: Record<string, string> = {
  lead: "SubmitForm",
  booking_complete: "Schedule",
  registration: "CompleteRegistration",
  waitlist_submit: "Subscribe",
  booking_start: "Contact",
  whatsapp_click: "Contact",
  plan_click: "AddToCart",
  diagnosis_view: "ViewContent",
  video_view: "ViewContent",
};

const META_STANDARD_EVENTS: Record<string, string> = {
  lead: "Lead",
  booking_complete: "Schedule",
  registration: "CompleteRegistration",
  waitlist_submit: "Subscribe",
  booking_start: "Schedule",
  whatsapp_click: "Contact",
  plan_click: "AddToCart",
  diagnosis_view: "ViewContent",
  video_view: "ViewContent",
};

function mapToTiktokStandardEvent(eventName: string): string {
  return TIKTOK_STANDARD_EVENTS[eventName] ?? eventName;
}

function mapToMetaStandardEvent(eventName: string): {
  name: string;
  isStandard: boolean;
} {
  const standard = META_STANDARD_EVENTS[eventName];
  return standard
    ? { name: standard, isStandard: true }
    : { name: eventName, isStandard: false };
}

function readCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const pattern = new RegExp(`(?:^|; )${name}=([^;]*)`);
  const match = document.cookie.match(pattern);
  return match ? decodeURIComponent(match[1]) : null;
}

function isSupportedCurrency(value: string | null): value is Currency {
  return !!value && (SUPPORTED_CURRENCIES as readonly string[]).includes(value);
}

/** Lee país y moneda activa desde cookies seteadas por middleware + CurrencyProvider. */
function getTrackingContext(): { country: string | null; currency: Currency } {
  const country = readCookie("ugc_country");
  const override = readCookie("ugc_currency");
  const currency = isSupportedCurrency(override)
    ? override
    : currencyFromCountry(country) ?? DEFAULT_CURRENCY;
  return { country, currency };
}

export function trackEvent(event: TrackingEvent): void {
  if (typeof window === "undefined") return;

  const utm = getUTMParams();
  const { country, currency } = getTrackingContext();
  const priceUSD = typeof event.price_usd === "number" ? event.price_usd : undefined;
  const priceLocal =
    typeof event.price_local === "number" ? event.price_local : undefined;

  const enriched = {
    ...event,
    ...utm,
    country,
    local_currency: currency,
  };

  if (hasConsent("analytics") && window.dataLayer) {
    window.dataLayer.push(enriched);
  }

  if (hasConsent("analytics") && window.gtag) {
    window.gtag("event", event.event, {
      event_category: event.category,
      event_label: event.label,
      value: priceUSD ?? event.value,
      currency: "USD",
      country,
      local_currency: currency,
      price_local: priceLocal,
      ...utm,
    });
  }

  if (hasConsent("marketing") && window.fbq) {
    const meta = mapToMetaStandardEvent(event.event);
    const params: Record<string, unknown> = {
      content_name: event.label ?? event.event,
      content_category: event.category,
      value: priceUSD ?? event.value ?? 0,
      currency: "USD",
      country,
      local_currency: currency,
    };
    if (priceLocal !== undefined) params.price_local = priceLocal;
    window.fbq(meta.isStandard ? "track" : "trackCustom", meta.name, params);
  }

  if (hasConsent("marketing") && window.ttq) {
    const tiktokStandardEvent = mapToTiktokStandardEvent(event.event);
    const params: Record<string, unknown> = {
      content_name: event.label ?? event.event,
      value: priceUSD ?? event.value ?? 0,
      currency: "USD",
      country,
      local_currency: currency,
    };
    if (priceLocal !== undefined) params.price_local = priceLocal;
    window.ttq.track(tiktokStandardEvent, params);
  }

  if (hasConsent("marketing") && window.uetq) {
    window.uetq.push({
      ea: event.event,
      ec: event.category,
      el: event.label,
      ev: priceUSD ?? event.value,
    });
  }
}

// ─────────── Helpers de conversión (funnel UGC Colombia) ───────────

export function trackCTAClick(label: string): void {
  trackEvent({ event: "cta_click", category: "engagement", label });
}

export function trackFormSubmission(formName: string): void {
  trackEvent({ event: "form_submit", category: "conversion", label: formName });
}

export function trackVideoView(videoId: string): void {
  trackEvent({ event: "video_view", category: "engagement", label: videoId });
}

export function trackVideoPlay(videoId: string): void {
  trackEvent({ event: "video_play", category: "engagement", label: videoId });
}

export function trackScrollDepth(percentage: number): void {
  trackEvent({
    event: "scroll_depth",
    category: "engagement",
    label: `${percentage}%`,
    value: percentage,
  });
}

export function trackWhatsappClick(source: string): void {
  trackEvent({
    event: "whatsapp_click",
    category: "contact",
    label: source,
  });
}

export function trackSocialClick(
  network: "instagram" | "tiktok" | "linkedin" | "youtube",
  source: string,
): void {
  trackEvent({
    event: "social_click",
    category: "social",
    label: `${network}_${source}`,
    network,
  });
}

export function trackNavClick(label: string): void {
  trackEvent({ event: "nav_click", category: "navigation", label });
}

// ─── Audit Modal / Quiz IA ───
export function trackAuditOpen(source: string): void {
  trackEvent({
    event: "audit_open",
    category: "funnel",
    label: source,
    funnel_step: "audit_start",
  });
}

export function trackAuditTypeSelect(type: "marca" | "creador"): void {
  trackEvent({
    event: "audit_type_select",
    category: "funnel",
    label: type,
    funnel_step: "type_selection",
    audit_type: type,
  });
}

export function trackQuizAnswer(questionIndex: number, answer: string): void {
  trackEvent({
    event: "quiz_answer",
    category: "funnel",
    label: `q${questionIndex}_${answer}`,
    funnel_step: "quiz_in_progress",
    question_index: questionIndex,
  });
}

export function trackQuizComplete(type: "marca" | "creador"): void {
  trackEvent({
    event: "quiz_complete",
    category: "conversion",
    label: type,
    funnel_step: "quiz_completed",
    audit_type: type,
  });
}

export function trackLeadCapture(params: {
  type: "marca" | "creador";
  email: string;
  source: string;
}): void {
  trackEvent({
    event: "lead_capture",
    category: "conversion",
    label: params.source,
    funnel_step: "lead_captured",
    audit_type: params.type,
  });
}

export function trackDiagnosisView(type: "marca" | "creador"): void {
  trackEvent({
    event: "diagnosis_view",
    category: "funnel",
    label: type,
    funnel_step: "diagnosis_ready",
    audit_type: type,
  });
}

export function trackBookingStart(source: string): void {
  trackEvent({
    event: "booking_start",
    category: "funnel",
    label: source,
    funnel_step: "booking_started",
  });
  trackEvent({
    event: "lead",
    category: "conversion",
    label: `booking_intent_${source}`,
    funnel_step: "booking_as_lead",
  });
}

export function trackBookingComplete(source: string): void {
  trackEvent({
    event: "booking_complete",
    category: "conversion",
    label: source,
    funnel_step: "booking_completed",
    value: 1,
  });
  trackEvent({
    event: "lead",
    category: "conversion",
    label: `booking_confirmed_${source}`,
    funnel_step: "booking_confirmed_as_lead",
    value: 1,
  });
  trackEvent({
    event: "registration",
    category: "conversion",
    label: `booking_confirmed_${source}`,
    funnel_step: "booking_confirmed_as_registration",
    value: 1,
  });
}

// ─── Offer (urgencia + exclusividad) ───
export interface OfferContext {
  hoursLeft: number;
  slotsLeft: number;
}

export function trackOfferApply(source: string, context: OfferContext): void {
  trackEvent({
    event: "offer_apply_click",
    category: "conversion",
    label: source,
    offer_source: source,
    offer_hours_left: context.hoursLeft,
    offer_slots_left: context.slotsLeft,
  });
}

// ─── Pricing ───
export interface PlanPriceInfo {
  priceUSD?: number;
  priceLocal?: number;
  currency?: Currency;
}

export function trackPlanClick(
  plan: string,
  location: string,
  priceInfo?: PlanPriceInfo,
): void {
  trackEvent({
    event: "plan_click",
    category: "conversion",
    label: `${plan}_${location}`,
    plan_name: plan,
    plan_location: location,
    price_usd: priceInfo?.priceUSD,
    price_local: priceInfo?.priceLocal,
    plan_currency: priceInfo?.currency,
  });
}

// ─── Registro ───
export function trackRegistrationStart(): void {
  trackEvent({
    event: "registration_start",
    category: "funnel",
    label: "registro_form",
  });
}

export function trackRegistrationComplete(): void {
  trackEvent({
    event: "registration_complete",
    category: "conversion",
    label: "registro_form",
    value: 1,
  });
}

// ─── Purchase (evento crítico post-pago Stripe) ───
export interface PurchaseEvent {
  transactionId: string;
  value: number;
  currency: Currency;
  planId: string;
  planLabel?: string;
  videosPerMonth?: number;
  /** Duración del ciclo en meses (1/3/6/12). */
  billingIntervalCount?: number;
}

/**
 * Dispara el evento Purchase/CompletePayment/purchase en todos los pixels
 * instalados (Meta, TikTok, GA4, Bing UET). Usa sessionStorage con
 * transactionId para deduplicar — si el user refresca /gracias-pago,
 * no se cuenta dos veces la compra.
 *
 * El value se envía en USD (convertido desde la moneda local con la tasa
 * aproximada de `priceInUSD`) para que las plataformas publicitarias usen
 * una moneda consistente al optimizar campañas.
 */
export function trackPurchase(purchase: PurchaseEvent): void {
  if (typeof window === "undefined") return;

  const dedupeKey = `ugc_tracked_purchase_${purchase.transactionId}`;
  try {
    if (window.sessionStorage.getItem(dedupeKey)) return;
    window.sessionStorage.setItem(dedupeKey, "1");
  } catch {
    // sessionStorage puede fallar en incógnito estricto — seguimos sin dedupe
  }

  const valueUSD = priceInUSD(purchase.value, purchase.currency);
  const utm = getUTMParams();
  const { country, currency: activeCurrency } = getTrackingContext();

  const commonPayload = {
    transaction_id: purchase.transactionId,
    plan_id: purchase.planId,
    plan_label: purchase.planLabel,
    videos_per_month: purchase.videosPerMonth,
    billing_interval_count: purchase.billingIntervalCount,
    price_local: purchase.value,
    local_currency: purchase.currency,
    country,
    ...utm,
  };

  if (hasConsent("analytics") && window.dataLayer) {
    window.dataLayer.push({
      event: "purchase",
      ...commonPayload,
      value: valueUSD,
      currency: "USD",
    });
  }

  if (hasConsent("analytics") && window.gtag) {
    window.gtag("event", "purchase", {
      transaction_id: purchase.transactionId,
      value: valueUSD,
      currency: "USD",
      items: [
        {
          item_id: purchase.planId,
          item_name: purchase.planLabel ?? purchase.planId,
          item_category: "subscription",
          price: valueUSD,
          quantity: 1,
        },
      ],
      price_local: purchase.value,
      local_currency: purchase.currency,
      country,
      ...utm,
    });
  }

  if (hasConsent("marketing") && window.fbq) {
    window.fbq("track", "Purchase", {
      value: valueUSD,
      currency: "USD",
      content_ids: [purchase.planId],
      content_name: purchase.planLabel ?? purchase.planId,
      content_category: "subscription",
      content_type: "product",
      num_items: 1,
      price_local: purchase.value,
      local_currency: purchase.currency,
      country,
    });
  }

  if (hasConsent("marketing") && window.ttq) {
    window.ttq.track("CompletePayment", {
      value: valueUSD,
      currency: "USD",
      content_id: purchase.planId,
      content_name: purchase.planLabel ?? purchase.planId,
      content_type: "product",
      quantity: 1,
      price_local: purchase.value,
      local_currency: purchase.currency,
    });
  }

  if (hasConsent("marketing") && window.uetq) {
    window.uetq.push("event", "purchase", {
      revenue_value: valueUSD,
      currency: "USD",
      event_category: "ecommerce",
      event_label: purchase.planId,
      transaction_id: purchase.transactionId,
    });
  }
  // activeCurrency referenced to avoid unused warning
  void activeCurrency;
}

// ─── Waitlist ───
export function trackWaitlistSubmit(): void {
  trackEvent({
    event: "waitlist_submit",
    category: "conversion",
    label: "coming_soon",
    value: 1,
  });
}
