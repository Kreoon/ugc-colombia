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
    window.fbq("trackCustom", event.event, {
      category: event.category,
      label: event.label,
      value: event.value,
    });
  }

  if (hasConsent("marketing") && window.ttq) {
    window.ttq.track(event.event, {
      content_name: event.label,
      value: event.value,
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

export function trackBookingStart(source: string): void {
  trackEvent({
    event: "booking_start",
    category: "funnel",
    label: source,
    funnel_step: "booking_started",
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
