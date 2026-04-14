import { cookies, headers } from "next/headers";
import {
  DEFAULT_CURRENCY,
  SUPPORTED_CURRENCIES,
  type Currency,
} from "../pricing/currency-config";
import { currencyFromCountry } from "./country-to-currency";

export const CURRENCY_COOKIE = "ugc_currency";
export const COUNTRY_COOKIE = "ugc_country";
export const COUNTRY_HEADER = "x-ugc-country";

function isSupportedCurrency(value: string): value is Currency {
  return (SUPPORTED_CURRENCIES as readonly string[]).includes(value);
}

export async function getCurrencyFromHeaders(): Promise<{
  currency: Currency;
  country: string | null;
}> {
  const cookieStore = await cookies();
  const headerStore = await headers();

  const cookieValue = cookieStore.get(CURRENCY_COOKIE)?.value;
  const override =
    cookieValue && isSupportedCurrency(cookieValue) ? cookieValue : null;

  const country =
    headerStore.get(COUNTRY_HEADER) ??
    headerStore.get("x-vercel-ip-country") ??
    cookieStore.get(COUNTRY_COOKIE)?.value ??
    null;

  return {
    country,
    currency: override ?? currencyFromCountry(country),
  };
}
