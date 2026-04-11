import { hasConsent } from "./consent";
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

  // GTM dataLayer
  if (hasConsent("analytics") && window.dataLayer) {
    window.dataLayer.push(event);
  }

  // GA4 standalone
  if (hasConsent("analytics") && window.gtag) {
    window.gtag("event", event.event, {
      event_category: event.category,
      event_label: event.label,
      value: event.value,
    });
  }

  // Meta Pixel
  if (hasConsent("marketing") && window.fbq) {
    window.fbq("trackCustom", event.event, {
      category: event.category,
      label: event.label,
      value: event.value,
    });
  }

  // TikTok Pixel
  if (hasConsent("marketing") && window.ttq) {
    window.ttq.track(event.event, {
      content_name: event.label,
      value: event.value,
    });
  }

  // Bing UET
  if (hasConsent("marketing") && window.uetq) {
    window.uetq.push({
      ea: event.event,
      ec: event.category,
      el: event.label,
      ev: event.value,
    });
  }
}

export function trackCTAClick(label: string): void {
  trackEvent({ event: "cta_click", category: "engagement", label });
}

export function trackFormSubmission(formName: string): void {
  trackEvent({ event: "form_submit", category: "conversion", label: formName });
}

export function trackVideoView(videoId: string): void {
  trackEvent({ event: "video_view", category: "engagement", label: videoId });
}

export function trackScrollDepth(percentage: number): void {
  trackEvent({
    event: "scroll_depth",
    category: "engagement",
    label: `${percentage}%`,
    value: percentage,
  });
}
