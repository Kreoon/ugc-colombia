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
import {
  DEFAULT_BILLING_DURATION,
  isValidBillingDuration,
  type BillingDuration,
} from "@/lib/stripe/plans";

const CURRENCY_COOKIE = "ugc_currency";
const DURATION_COOKIE = "ugc_billing_duration";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

interface CurrencyContextValue {
  currency: Currency;
  country: string | null;
  duration: BillingDuration;
  setCurrency: (next: Currency) => void;
  setDuration: (next: BillingDuration) => void;
  format: (amount: number) => string;
}

const CurrencyContext = createContext<CurrencyContextValue | null>(null);

export function CurrencyProvider({
  children,
  initialCurrency,
  initialCountry,
  initialDuration,
}: {
  children: ReactNode;
  initialCurrency: Currency;
  initialCountry: string | null;
  initialDuration?: BillingDuration;
}) {
  const [currency, setCurrencyState] = useState<Currency>(
    initialCurrency ?? DEFAULT_CURRENCY,
  );
  const [duration, setDurationState] = useState<BillingDuration>(
    isValidBillingDuration(initialDuration)
      ? initialDuration
      : DEFAULT_BILLING_DURATION,
  );

  const setCurrency = useCallback((next: Currency) => {
    setCurrencyState(next);
    if (typeof document !== "undefined") {
      document.cookie = `${CURRENCY_COOKIE}=${next}; path=/; max-age=${COOKIE_MAX_AGE}; SameSite=Lax`;
    }
  }, []);

  const setDuration = useCallback((next: BillingDuration) => {
    setDurationState(next);
    if (typeof document !== "undefined") {
      document.cookie = `${DURATION_COOKIE}=${next}; path=/; max-age=${COOKIE_MAX_AGE}; SameSite=Lax`;
    }
  }, []);

  const value = useMemo<CurrencyContextValue>(
    () => ({
      currency,
      country: initialCountry,
      duration,
      setCurrency,
      setDuration,
      format: (amount: number) => formatPrice(amount, currency),
    }),
    [currency, duration, initialCountry, setCurrency, setDuration],
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
