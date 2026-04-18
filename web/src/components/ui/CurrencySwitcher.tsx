/**
 * @deprecated
 *
 * Este componente fue removido: la moneda ahora se determina 100% por la IP
 * del visitante (Vercel geo) y no es cambiable desde la UI. Si alguien
 * intenta importar este símbolo en el futuro, este stub rompe el build
 * con un error claro en vez de silenciosamente renderizar nada.
 */
export function CurrencySwitcher(): never {
  throw new Error(
    "CurrencySwitcher fue removido — la moneda se detecta por IP y no es cambiable manualmente.",
  );
}
