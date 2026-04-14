"use client";

import { Clock, Sparkles, Users } from "lucide-react";
import { useAudit } from "@/components/lead-audit/AuditContext";
import { useOfferCountdown, pad2 } from "@/hooks/use-offer-countdown";
import { OFFER_COPY, OPEN_SLOTS, DISCOUNT_PCT } from "@/lib/offer-config";
import { trackOfferApply } from "@/lib/tracking/events";
import { cn } from "@/lib/utils";

interface ApplicationCardProps {
  source: string;
  className?: string;
  compact?: boolean;
}

export function ApplicationCard({
  source,
  className,
  compact = false,
}: ApplicationCardProps) {
  const { openAudit } = useAudit();
  const countdown = useOfferCountdown();

  const handleApply = () => {
    trackOfferApply(source, {
      hoursLeft: countdown.hoursLeft,
      slotsLeft: OPEN_SLOTS,
    });
    openAudit(source);
  };

  if (countdown.isExpired) {
    return (
      <div
        className={cn(
          "inline-flex items-center gap-2 px-3 py-1 rounded-full",
          "bg-white/5 border border-white/10 text-brand-gray text-[11px] font-sans",
          className,
        )}
      >
        <Clock className="h-3 w-3" aria-hidden />
        {OFFER_COPY.expired_text}
      </div>
    );
  }

  const countdownLabel = countdown.isLoading
    ? "--:--:--"
    : `${pad2(countdown.hoursLeft)}:${pad2(countdown.minutesLeft)}:${pad2(countdown.secondsLeft)}`;

  return (
    <div
      role="region"
      aria-label="Aplicación a cupo exclusivo"
      className={cn(
        "relative inline-flex flex-col sm:flex-row items-center gap-3 sm:gap-4",
        "px-4 py-2.5 sm:py-2 rounded-full",
        "bg-gradient-to-r from-brand-yellow/15 via-brand-yellow/10 to-brand-yellow/15",
        "border border-brand-gold/50",
        "shadow-[0_0_30px_-12px_rgba(212,160,23,0.45)]",
        "backdrop-blur-sm",
        className,
      )}
    >
      <div className="inline-flex items-center gap-2 flex-shrink-0">
        <span
          aria-hidden
          className="w-1.5 h-1.5 rounded-full bg-brand-yellow animate-pulse"
        />
        <span className="inline-flex items-center gap-1.5 text-[10px] sm:text-[11px] font-sans font-bold tracking-[0.18em] uppercase text-brand-yellow">
          <Users className="h-3 w-3" aria-hidden />
          {OPEN_SLOTS} cupos este mes
        </span>
      </div>

      <span aria-hidden className="hidden sm:block w-px h-4 bg-brand-gold/40" />

      <div className="inline-flex items-center gap-1.5 flex-shrink-0">
        <Sparkles className="h-3 w-3 text-brand-yellow" aria-hidden />
        <span className="text-[10px] sm:text-[11px] font-sans font-semibold text-white/90 tracking-wide">
          {DISCOUNT_PCT}% si aplicas en
        </span>
        <span
          aria-live="polite"
          className="font-mono text-[11px] sm:text-xs font-bold tabular-nums text-brand-yellow"
        >
          {countdownLabel}
        </span>
      </div>

      {!compact && (
        <>
          <span
            aria-hidden
            className="hidden sm:block w-px h-4 bg-brand-gold/40"
          />
          <button
            type="button"
            onClick={handleApply}
            className={cn(
              "inline-flex items-center gap-1 px-3 py-1 rounded-full",
              "bg-brand-yellow text-brand-black text-[11px] font-sans font-bold tracking-wide uppercase",
              "hover:bg-brand-gold transition-colors",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-2 focus-visible:ring-offset-black",
            )}
          >
            {OFFER_COPY.apply_cta}
          </button>
        </>
      )}
    </div>
  );
}
