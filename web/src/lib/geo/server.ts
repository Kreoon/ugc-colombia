import { cookies, headers } from "next/headers";
import { type Currency } from "../pricing/currency-config";
import { currencyFromCountry } from "./country-to-currency";

export const COUNTRY_COOKIE = "ugc_country";
export const COUNTRY_HEADER = "x-ugc-country";

/**
 * Detección de moneda y país por IP (Vercel geo headers).
 *
 * Reglas:
 *   - Si el país detectado es CO → COP.
 *   - Cualquier otro país → USD.
 *   - NO se permite override manual (ni cookie, ni query param). La moneda es
 *     siempre reflejo de la IP del request para evitar que alguien desde
 *     Colombia pague en USD o viceversa.
 *
 * El cookie `ugc_country` es fallback por si el middleware lo siembra para
 * clientes que pegan caché entre regiones — pero en prod confiamos en el
 * header `x-vercel-ip-country` que Vercel Edge siempre pobla.
 */
export async function getCurrencyFromHeaders(): Promise<{
  currency: Currency;
  country: string | null;
}> {
  const cookieStore = await cookies();
  const headerStore = await headers();

  const country =
    headerStore.get(COUNTRY_HEADER) ??
    headerStore.get("x-vercel-ip-country") ??
    cookieStore.get(COUNTRY_COOKIE)?.value ??
    null;

  return {
    country,
    currency: currencyFromCountry(country),
  };
}
