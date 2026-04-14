"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown, Check } from "lucide-react";
import { useCurrency } from "@/components/providers/CurrencyProvider";
import {
  CURRENCY_META,
  SUPPORTED_CURRENCIES,
  type Currency,
} from "@/lib/pricing/currency-config";
import { trackEvent } from "@/lib/tracking/events";
import { cn } from "@/lib/utils";

function FlagBadge({ code }: { code: Currency }) {
  const colors =
    code === "COP"
      ? "bg-gradient-to-b from-brand-yellow via-blue-600 to-red-600"
      : "bg-gradient-to-b from-white via-white to-red-600";
  return (
    <span
      aria-hidden
      className={cn(
        "inline-block w-4 h-3 rounded-sm ring-1 ring-white/20",
        colors,
      )}
    />
  );
}

export function CurrencySwitcher({ className }: { className?: string }) {
  const { currency, setCurrency } = useCurrency();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, [open]);

  const handleSelect = (next: Currency) => {
    if (next !== currency) {
      setCurrency(next);
      trackEvent({
        event: "currency_change",
        category: "engagement",
        label: `${currency}_to_${next}`,
      });
    }
    setOpen(false);
  };

  const active = CURRENCY_META[currency];

  return (
    <div ref={ref} className={cn("relative", className)}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5",
          "text-xs font-sans font-semibold text-brand-gray",
          "hover:text-white hover:bg-white/8 transition-colors",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold",
          "min-h-[36px]",
        )}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`Cambiar moneda. Actual: ${active.name}`}
      >
        <FlagBadge code={currency} />
        <span>{active.code}</span>
        <ChevronDown
          className={cn(
            "h-3 w-3 opacity-70 transition-transform",
            open && "rotate-180",
          )}
          aria-hidden
        />
      </button>

      {open && (
        <ul
          role="listbox"
          aria-label="Seleccionar moneda"
          className="absolute right-0 top-full mt-2 min-w-[200px] rounded-xl border border-brand-graphite/60 bg-black/95 backdrop-blur-md shadow-lg p-1 z-50"
        >
          {SUPPORTED_CURRENCIES.map((code) => {
            const meta = CURRENCY_META[code];
            const isActive = code === currency;
            return (
              <li key={code}>
                <button
                  type="button"
                  role="option"
                  aria-selected={isActive}
                  onClick={() => handleSelect(code)}
                  className={cn(
                    "flex items-center gap-2.5 w-full px-3 py-2 rounded-lg text-left text-sm",
                    "transition-colors",
                    isActive
                      ? "bg-brand-yellow/10 text-brand-yellow"
                      : "text-white/85 hover:bg-white/8",
                  )}
                >
                  <FlagBadge code={code} />
                  <span className="flex-1">{meta.name}</span>
                  {isActive && (
                    <Check
                      className="h-3.5 w-3.5 text-brand-yellow"
                      strokeWidth={3}
                      aria-hidden
                    />
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
