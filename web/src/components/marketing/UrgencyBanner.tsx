"use client";

import { useEffect, useState } from "react";
import { X, Clock, Flame } from "lucide-react";
import { useAudit } from "@/components/lead-audit/AuditContext";
import { useOfferCountdown, pad2 } from "@/hooks/use-offer-countdown";
import {
  OFFER_COOKIE_BANNER_DISMISSED,
  OFFER_COPY,
  OPEN_SLOTS,
  DISCOUNT_PCT,
} from "@/lib/offer-config";
import { trackOfferApply } from "@/lib/tracking/events";
import { cn } from "@/lib/utils";

const BANNER_HEIGHT_PX = 44;

function readDismissed(): boolean {
  if (typeof document === "undefined") return false;
  return document.cookie.includes(`${OFFER_COOKIE_BANNER_DISMISSED}=1`);
}

function persistDismissed(): void {
  if (typeof document === "undefined") return;
  document.cookie = `${OFFER_COOKIE_BANNER_DISMISSED}=1; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Lax`;
}

export function UrgencyBanner() {
  const { openAudit } = useAudit();
  const countdown = useOfferCountdown();
  const [dismissed, setDismissed] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setDismissed(readDismissed());
    setHydrated(true);
  }, []);

  const visible = hydrated && !dismissed && !countdown.isExpired;

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.body.style.setProperty(
      "--banner-h",
      visible ? `${BANNER_HEIGHT_PX}px` : "0px",
    );
    return () => {
      document.body.style.setProperty("--banner-h", "0px");
    };
  }, [visible]);

  if (!visible) return null;

  const handleApply = () => {
    trackOfferApply("urgency_banner", {
      hoursLeft: countdown.hoursLeft,
      slotsLeft: OPEN_SLOTS,
    });
    openAudit("urgency_banner");
  };

  const handleDismiss = () => {
    persistDismissed();
    setDismissed(true);
  };

  return (
    <aside
      role="region"
      aria-label="Oferta limitada"
      style={{ height: `${BANNER_HEIGHT_PX}px` }}
      className={cn(
        "fixed top-0 left-0 right-0 z-[60] flex items-center",
        "bg-gradient-to-r from-brand-gold-dark via-brand-yellow to-brand-gold-dark",
        "text-brand-black border-b border-brand-black/20",
        "shadow-[0_4px_20px_-6px_rgba(212,160,23,0.5)]",
      )}
    >
      <div className="relative w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 flex items-center justify-between gap-2 sm:gap-4">
        <div className="flex items-center gap-2 sm:gap-4 min-w-0 flex-1">
          <Flame
            className="h-4 w-4 flex-shrink-0 hidden sm:block"
            aria-hidden
          />
          <p className="text-[11px] sm:text-xs font-sans font-bold tracking-tight min-w-0 truncate">
            <span className="hidden sm:inline">
              Solo {OPEN_SLOTS} cupos · {DISCOUNT_PCT}% si aplicas hoy
            </span>
            <span className="sm:hidden">
              {OPEN_SLOTS} cupos · {DISCOUNT_PCT}% off
            </span>
          </p>
          <div
            aria-live="polite"
            aria-atomic="true"
            className="flex items-center gap-1.5 flex-shrink-0 font-mono text-[11px] sm:text-xs font-bold tabular-nums bg-brand-black/15 rounded-md px-2 py-1"
          >
            <Clock className="h-3 w-3" aria-hidden />
            <span>
              {pad2(countdown.hoursLeft)}:{pad2(countdown.minutesLeft)}:
              {pad2(countdown.secondsLeft)}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
          <button
            type="button"
            onClick={handleApply}
            className={cn(
              "inline-flex items-center gap-1 rounded-md px-2.5 sm:px-4 py-1.5",
              "bg-brand-black text-brand-yellow text-[11px] sm:text-xs font-sans font-bold tracking-wide uppercase",
              "hover:bg-brand-black/90 transition-colors",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-black focus-visible:ring-offset-2 focus-visible:ring-offset-brand-yellow",
              "min-h-[32px]",
            )}
            aria-label={OFFER_COPY.apply_cta}
          >
            {OFFER_COPY.apply_cta}
          </button>
          <button
            type="button"
            onClick={handleDismiss}
            className={cn(
              "p-1.5 rounded-md text-brand-black/70 hover:text-brand-black hover:bg-brand-black/10 transition-colors",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-black",
              "min-w-[32px] min-h-[32px] flex items-center justify-center",
            )}
            aria-label="Cerrar oferta"
          >
            <X className="h-3.5 w-3.5" aria-hidden />
          </button>
        </div>
      </div>
    </aside>
  );
}
