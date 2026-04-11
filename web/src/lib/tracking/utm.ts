import { UTM_STORAGE_KEY, UTM_EXPIRY_DAYS } from "./constants";
import type { UTMParams } from "./types";

const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
] as const;

export function captureUTMParams(): void {
  if (typeof window === "undefined") return;
  const params = new URLSearchParams(window.location.search);
  const hasUTM = UTM_KEYS.some((key) => params.has(key));
  if (!hasUTM) return;

  const utm: UTMParams = { timestamp: Date.now() };
  for (const key of UTM_KEYS) {
    const val = params.get(key);
    if (val) utm[key] = val;
  }
  localStorage.setItem(UTM_STORAGE_KEY, JSON.stringify(utm));
}

export function getUTMParams(): UTMParams | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(UTM_STORAGE_KEY);
    if (!raw) return null;
    const utm = JSON.parse(raw) as UTMParams;
    const age = Date.now() - utm.timestamp;
    if (age > UTM_EXPIRY_DAYS * 24 * 60 * 60 * 1000) {
      localStorage.removeItem(UTM_STORAGE_KEY);
      return null;
    }
    return utm;
  } catch {
    return null;
  }
}
