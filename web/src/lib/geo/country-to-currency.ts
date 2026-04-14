import { DEFAULT_CURRENCY, type Currency } from "../pricing/currency-config";

const COUNTRY_TO_CURRENCY: Record<string, Currency> = {
  CO: "COP",
};

export function currencyFromCountry(countryCode?: string | null): Currency {
  if (!countryCode) return DEFAULT_CURRENCY;
  return COUNTRY_TO_CURRENCY[countryCode.toUpperCase()] ?? DEFAULT_CURRENCY;
}
