import { hasConsent } from "./consent";
import { getUTMParams } from "./utm";
import type { TrackingEvent } from "./types";

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
    ttq?: { track: (...args: unknown[]) => void };
    uetq?: Record<string, unknown>[];
  }
}

// Mapeo a eventos estándar de TikTok para mejor optimización del algoritmo.
// Eventos no mapeados se envían con su nombre original (evento custom).
const TIKTOK_STANDARD_EVENTS: Record<string, string> = {
  lead: "SubmitForm",
  lead_capture: "SubmitForm",
  form_submit: "SubmitForm",
  quiz_complete: "CompleteRegistration",
  registration_complete: "CompleteRegistration",
  waitlist_submit: "Subscribe",
  booking_start: "Contact",
  booking_complete: "CompletePayment",
  whatsapp_click: "Contact",
  plan_click: "AddToCart",
  diagnosis_view: "ViewContent",
  video_view: "ViewContent",
};

// Mapeo a eventos estándar de Meta Pixel. Eventos estándar permiten
// optimización de campañas y coincidencia automática de conversiones.
const META_STANDARD_EVENTS: Record<string, string> = {
  lead: "Lead",
  lead_capture: "Lead",
  form_submit: "Lead",
  quiz_complete: "Lead",
  registration_complete: "CompleteRegistration",
  waitlist_submit: "Subscribe",
  booking_start: "Schedule",
  booking_complete: "Schedule",
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

export function trackEvent(event: TrackingEvent): void {
  if (typeof window === "undefined") return;

  const utm = getUTMParams();
  const enriched = { ...event, ...utm };

  if (hasConsent("analytics") && window.dataLayer) {
    window.dataLayer.push(enriched);
  }

  if (hasConsent("analytics") && window.gtag) {
    window.gtag("event", event.event, {
      event_category: event.category,
      event_label: event.label,
      value: event.value,
      ...utm,
    });
  }

  if (hasConsent("marketing") && window.fbq) {
    const meta = mapToMetaStandardEvent(event.event);
    const params = {
      content_name: event.label ?? event.event,
      content_category: event.category,
      value: event.value ?? 0,
      currency: "COP",
    };
    window.fbq(meta.isStandard ? "track" : "trackCustom", meta.name, params);
  }

  if (hasConsent("marketing") && window.ttq) {
    const tiktokStandardEvent = mapToTiktokStandardEvent(event.event);
    window.ttq.track(tiktokStandardEvent, {
      content_name: event.label ?? event.event,
      value: event.value ?? 0,
      currency: "COP",
    });
  }

  if (hasConsent("marketing") && window.uetq) {
    window.uetq.push({
      ea: event.event,
      ec: event.category,
      el: event.label,
      ev: event.value,
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

export function trackAuditTypeSelect(
  type: "marca" | "creador",
): void {
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

// Al iniciar agendamiento dispara DOS eventos:
// 1. booking_start → campañas de venta/booking (mapea a Schedule/Contact)
// 2. lead → campañas de lead generation (mapea a Lead/SubmitForm)
// Así el mismo disparo sirve para optimizar ambos tipos de campaña.
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

// Al confirmar el agendamiento dispara DOS eventos:
// 1. booking_complete → conversión de venta confirmada
// 2. lead → lead de alta calidad confirmado
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
}

// ─── Pricing ───
export function trackPlanClick(plan: string, location: string): void {
  trackEvent({
    event: "plan_click",
    category: "conversion",
    label: `${plan}_${location}`,
    plan_name: plan,
    plan_location: location,
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

// ─── Waitlist ───
export function trackWaitlistSubmit(): void {
  trackEvent({
    event: "waitlist_submit",
    category: "conversion",
    label: "coming_soon",
    value: 1,
  });
}
