export interface ConsentState {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
}

export interface TrackingEvent {
  event: string;
  category?: string;
  label?: string;
  value?: number;
  [key: string]: unknown;
}

export interface UTMParams {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  timestamp: number;
}
