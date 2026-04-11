import { CONSENT_STORAGE_KEY } from "./constants";
import type { ConsentState } from "./types";

// Modelo "opt-out": activo por defecto (legal en Colombia y USA).
// Si necesitas cumplir GDPR estricto, cambia analytics y marketing a false.
const DEFAULT_CONSENT: ConsentState = {
  necessary: true,
  analytics: true,
  marketing: true,
};

export function getConsent(): ConsentState {
  if (typeof window === "undefined") return DEFAULT_CONSENT;
  try {
    const raw = localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!raw) return DEFAULT_CONSENT;
    return JSON.parse(raw) as ConsentState;
  } catch {
    return DEFAULT_CONSENT;
  }
}

export function setConsent(state: ConsentState): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(state));
  window.dispatchEvent(new CustomEvent("consent-updated", { detail: state }));
}

export function hasConsent(category: "analytics" | "marketing"): boolean {
  return getConsent()[category];
}

export function hasStoredConsent(): boolean {
  if (typeof window === "undefined") return true;
  return localStorage.getItem(CONSENT_STORAGE_KEY) !== null;
}
