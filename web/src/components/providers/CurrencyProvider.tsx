"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  DEFAULT_CURRENCY,
  type Currency,
} from "@/lib/pricing/currency-config";
import { formatPrice } from "@/lib/pricing/format";

const COOKIE_NAME = "ugc_currency";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

interface CurrencyContextValue {
  currency: Currency;
  country: string | null;
  setCurrency: (next: Currency) => void;
  format: (amount: number) => string;
}

const CurrencyContext = createContext<CurrencyContextValue | null>(null);

export function CurrencyProvider({
  children,
  initialCurrency,
  initialCountry,
}: {
  children: ReactNode;
  initialCurrency: Currency;
  initialCountry: string | null;
}) {
  const [currency, setCurrencyState] = useState<Currency>(
    initialCurrency ?? DEFAULT_CURRENCY,
  );

  const setCurrency = useCallback((next: Currency) => {
    setCurrencyState(next);
    if (typeof document !== "undefined") {
      document.cookie = `${COOKIE_NAME}=${next}; path=/; max-age=${COOKIE_MAX_AGE}; SameSite=Lax`;
    }
  }, []);

  const value = useMemo<CurrencyContextValue>(
    () => ({
      currency,
      country: initialCountry,
      setCurrency,
      format: (amount: number) => formatPrice(amount, currency),
    }),
    [currency, initialCountry, setCurrency],
  );

  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency(): CurrencyContextValue {
  const ctx = useContext(CurrencyContext);
  if (!ctx) {
    throw new Error("useCurrency must be used within CurrencyProvider");
  }
  return ctx;
}
