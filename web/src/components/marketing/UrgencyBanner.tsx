"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { X, Clock } from "lucide-react";
import { useOfferCountdown, pad2 } from "@/hooks/use-offer-countdown";
import {
  OFFER_COOKIE_BANNER_DISMISSED,
  OPEN_SLOTS,
  DISCOUNT_PCT,
} from "@/lib/offer-config";
import { cn } from "@/lib/utils";

const BANNER_HEIGHT_PX = 44;

const MARQUEE_MESSAGES = [
  `Solo ${OPEN_SLOTS} cupos disponibles este mes`,
  `${DISCOUNT_PCT}% de descuento exclusivo — termina pronto`,
  `Acceso únicamente por aplicación · Agencia por invitación`,
  `+50 marcas LATAM & USA ya confiaron en nosotros`,
  `Agencia UGC #1 de Colombia · Ecosistema Infiny Group`,
  `Diagnóstico estratégico incluido · Sin costo adicional`,
  `No dejes tu crecimiento al azar · Cupos limitados`,
  `Las marcas top de LATAM ya están dentro`,
  `Última oportunidad del mes · El precio sube al cerrar`,
];

const LOOP_MESSAGES = [...MARQUEE_MESSAGES, ...MARQUEE_MESSAGES];

function readDismissed(): boolean {
  if (typeof document === "undefined") return false;
  return document.cookie.includes(`${OFFER_COOKIE_BANNER_DISMISSED}=1`);
}

function persistDismissed(): void {
  if (typeof document === "undefined") return;
  document.cookie = `${OFFER_COOKIE_BANNER_DISMISSED}=1; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Lax`;
}

export function UrgencyBanner() {
  const pathname = usePathname();
  const countdown = useOfferCountdown();
  const [dismissed, setDismissed] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setDismissed(readDismissed());
    setHydrated(true);
  }, []);

  const isAdmin = pathname?.startsWith("/admin") ?? false;
  const visible = hydrated && !dismissed && !countdown.isExpired && !isAdmin;

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
      {/* Sheen premium */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          background:
            "linear-gradient(115deg, transparent 30%, rgba(255,255,255,0.4) 50%, transparent 70%)",
        }}
      />

      <div className="relative w-full flex items-center h-full">
        {/* Countdown fijo (izquierda) */}
        <div
          aria-live="polite"
          aria-atomic="true"
          className={cn(
            "flex items-center gap-1.5 flex-shrink-0 z-20",
            "font-mono text-[11px] sm:text-xs font-bold tabular-nums",
            "bg-brand-black text-brand-yellow rounded-md px-2 sm:px-2.5 py-1",
            "ml-3 sm:ml-6",
            "shadow-[0_2px_8px_-2px_rgba(0,0,0,0.4)]",
          )}
        >
          <Clock className="h-3 w-3" aria-hidden />
          <span>
            {pad2(countdown.hoursLeft)}:{pad2(countdown.minutesLeft)}:
            {pad2(countdown.secondsLeft)}
          </span>
        </div>

        {/* Marquee premium (centro) */}
        <div className="relative flex-1 overflow-hidden mx-2 sm:mx-4 h-full flex items-center">
          {/* Fades laterales para smoothness */}
          <div
            aria-hidden="true"
            className="absolute inset-y-0 left-0 w-8 sm:w-12 z-10 pointer-events-none"
            style={{
              background:
                "linear-gradient(to right, rgb(212,160,23) 0%, rgba(212,160,23,0) 100%)",
            }}
          />
          <div
            aria-hidden="true"
            className="absolute inset-y-0 right-0 w-8 sm:w-12 z-10 pointer-events-none"
            style={{
              background:
                "linear-gradient(to left, rgb(212,160,23) 0%, rgba(212,160,23,0) 100%)",
            }}
          />

          <ul className="flex items-center gap-6 sm:gap-10 whitespace-nowrap animate-marquee will-change-transform">
            {LOOP_MESSAGES.map((msg, i) => (
              <li
                key={`${msg}-${i}`}
                className="flex items-center gap-6 sm:gap-10 shrink-0"
                aria-hidden={i >= MARQUEE_MESSAGES.length ? "true" : undefined}
              >
                <span className="text-[11px] sm:text-xs font-sans font-bold tracking-tight text-brand-black uppercase">
                  {msg}
                </span>
                <span
                  aria-hidden="true"
                  className="text-brand-black/40 text-[10px] sm:text-xs select-none"
                >
                  ◆
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Close (derecha) */}
        <button
          type="button"
          onClick={handleDismiss}
          className={cn(
            "flex-shrink-0 z-20 mr-2 sm:mr-4",
            "p-1.5 rounded-md text-brand-black/70 hover:text-brand-black hover:bg-brand-black/10 transition-colors",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-black",
            "min-w-[32px] min-h-[32px] flex items-center justify-center",
          )}
          aria-label="Cerrar oferta"
        >
          <X className="h-3.5 w-3.5" aria-hidden />
        </button>
      </div>
    </aside>
  );
}
