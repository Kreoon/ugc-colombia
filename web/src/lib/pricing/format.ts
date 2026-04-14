import { CURRENCY_META, type Currency } from "./currency-config";

export function formatPrice(amount: number, currency: Currency): string {
  const meta = CURRENCY_META[currency];
  return new Intl.NumberFormat(meta.locale, {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  }).format(amount);
}

export function formatPriceNumber(amount: number, currency: Currency): string {
  const meta = CURRENCY_META[currency];
  return new Intl.NumberFormat(meta.locale, {
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  }).format(amount);
}
