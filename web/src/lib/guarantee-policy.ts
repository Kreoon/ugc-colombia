/**
 * Política oficial de "Garantía de performance" UGC Colombia.
 *
 * Centralizada aquí para que UI pública, página /garantia, admin operativo
 * (Brian) y eventualmente la lógica de validación automática (que lee la
 * cuenta publicitaria del cliente) consuman los mismos umbrales y reglas.
 *
 * Cambios a la política deben ocurrir SOLO en este archivo.
 */

export const PERFORMANCE_GUARANTEE = {
  /** CTR mínimo para considerar que un video cumple. (Click-Through Rate, %.) */
  minCtrPercent: 1.5,

  /** Hook Rate mínimo. (Porcentaje del audience que ve más de 3s.) */
  minHookRatePercent: 25,

  /** Porcentaje del paquete que es reemplazable cuando aplica la garantía. */
  replacementCapPercent: 30,

  /** Si este % o más del paquete cumple umbrales, la garantía completa se anula. */
  voidThresholdPercent: 80,

  /** Días después de publicación a partir de los cuales se mide el desempeño. */
  evaluationWindowDays: 14,
} as const;

export interface PlanGuarantee {
  /** Cuántos videos del paquete son reemplazables como máximo. */
  maxReplacements: number;
  /** Texto corto para card. Ej: "Hasta 3 videos reemplazables". */
  shortLabel: string;
}

/**
 * Calcula la garantía aplicada a un paquete según su número de videos.
 *
 * Reemplazos = redondeo arriba de (videos × 30%) para favorecer al cliente
 * en paquetes pequeños.
 */
export function computeGuaranteeForPlan(videosCount: number): PlanGuarantee {
  const cap = PERFORMANCE_GUARANTEE.replacementCapPercent / 100;
  const max = Math.max(1, Math.ceil(videosCount * cap));
  const noun = max === 1 ? "video reemplazable" : "videos reemplazables";
  return {
    maxReplacements: max,
    shortLabel: `Hasta ${max} ${noun}`,
  };
}

/** Reglas en lenguaje claro para mostrar al cliente. */
export const GUARANTEE_RULES: ReadonlyArray<{
  title: string;
  body: string;
}> = [
  {
    title: "Se mide por video, no por variante",
    body: "Cada video del paquete se entrega con varias variantes. Si UNA sola variante de ese video supera los umbrales (CTR ≥ 1.5% y Hook Rate ≥ 25%), el video se considera ganador y no aplica la garantía sobre él.",
  },
  {
    title: "Solo aplica si los videos están en publicidad pagada",
    body: "La garantía cubre el desempeño en anuncios pagados de venta (Meta Ads, TikTok Ads o Google Ads). Si los videos solo se publican como contenido orgánico, no se puede medir CTR ni Hook Rate y la garantía no aplica.",
  },
  {
    title: "Necesitamos acceso a tu cuenta publicitaria",
    body: "Para validar las métricas debemos poder ver el desempeño en tu Business Manager (Meta), TikTok Ads Manager o Google Ads. Damos las instrucciones de acceso seguro al momento del kickoff.",
  },
  {
    title: "Reemplazo cubierto: hasta el 30% del paquete",
    body: "Si los videos no llegan a los umbrales, los reemplazamos sin costo hasta cubrir el 30% del paquete. Por ejemplo: en el plan Crecimiento (10 videos), hasta 3 videos son reemplazables.",
  },
  {
    title: "Si el 80% del paquete cumple, la garantía se anula",
    body: "Si la mayoría del contenido (80% o más) supera los umbrales, significa que la campaña está funcionando — la garantía completa se desactiva sobre los videos restantes.",
  },
  {
    title: "Ventana de evaluación: 14 días después de publicación",
    body: "Cada video debe acumular al menos 14 días de gasto publicitario activo para considerar su desempeño. Antes de eso, los datos no son representativos.",
  },
];
