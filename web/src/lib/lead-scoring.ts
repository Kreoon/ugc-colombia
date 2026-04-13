import type { BrandAudit, BrandInfo } from "./validations/lead-audit";

// ─── Score weights ─────────────────────────────────────────────

const AD_BUDGET_SCORE: Record<string, number> = {
  nada: 0,
  menos_500: 8,
  "500_1000": 16,
  "1000_3000": 24,
  "3000_5000": 30,
  mas_5000: 35,
};

const CONTENT_BUDGET_SCORE: Record<string, number> = {
  nada: 0,
  menos_500: 5,
  "500_1000": 10,
  "1000_3000": 15,
  "3000_5000": 18,
  mas_5000: 20,
};

const URGENCY_SCORE: Record<string, number> = {
  inmediata: 15,
  este_mes: 10,
  proximo_trimestre: 5,
  explorando: 2,
};

const PRIORITY_INDUSTRIES = [
  "ecommerce",
  "marca_productos",
  "servicios",
  "saas",
  "dropshipping",
] as const;

const PAIN_SCORE: Record<string, number> = {
  no_tengo_contenido: 8,
  contenido_no_convierte: 10,
  muy_caro: 6,
  no_encuentro_creadores: 9,
  inconsistencia: 7,
  no_se_que_hacer: 4,
};

// ─── Main scoring function ─────────────────────────────────────

export interface LeadScore {
  total: number;
  temperature: "hot" | "warm" | "cold";
  breakdown: {
    ad_budget: number;
    content_budget: number;
    urgency: number;
    industry: number;
    pain: number;
    ads_active: number;
    creative_fatigue: number;
    website: number;
  };
}

export function calculateBrandScore(
  info: BrandInfo,
  audit: BrandAudit
): LeadScore {
  const breakdown = {
    ad_budget: AD_BUDGET_SCORE[audit.ad_budget] ?? 0,
    content_budget: CONTENT_BUDGET_SCORE[audit.content_budget] ?? 0,
    urgency: URGENCY_SCORE[audit.urgency] ?? 0,
    industry: (PRIORITY_INDUSTRIES as readonly string[]).includes(info.industry) ? 8 : 3,
    pain: PAIN_SCORE[audit.biggest_pain] ?? 0,
    ads_active: audit.has_active_ads ? 5 : 0,
    creative_fatigue:
      audit.creative_age_weeks === "mas_8" ? 7 :
      audit.creative_age_weeks === "4_8" ? 5 :
      audit.creative_age_weeks === "no_tengo" ? 3 : 0,
    website: info.website ? 2 : 0,
  };

  const total = Object.values(breakdown).reduce((a, b) => a + b, 0);
  const temperature: "hot" | "warm" | "cold" =
    total >= 70 ? "hot" : total >= 40 ? "warm" : "cold";

  return { total, temperature, breakdown };
}

// ─── AI Diagnosis generator ────────────────────────────────────

export interface AIDiagnosis {
  headline: string;
  score_label: string;
  gaps: string[];
  recommendations: string[];
  urgency_message: string;
  cta_message: string;
}

export function generateDiagnosis(
  info: BrandInfo,
  audit: BrandAudit,
  score: LeadScore,
  askedFields?: Set<string>
): AIDiagnosis {
  const gaps: string[] = [];
  const recommendations: string[] = [];
  // Only generate gaps for fields that were actually asked in the quiz
  const asked = askedFields || new Set(["ad_budget", "content_budget", "current_ctr", "creative_age_weeks", "monthly_content_pieces", "has_active_ads", "biggest_pain", "urgency"]);

  // Detect gaps — only for fields the user actually answered
  if (asked.has("ad_budget") && (audit.ad_budget === "nada" || audit.ad_budget === "menos_500")) {
    gaps.push("Tu inversión en publicidad es baja o nula — sin distribución, incluso el mejor contenido pasa desapercibido.");
  }

  if (asked.has("content_budget") && audit.content_budget === "nada") {
    gaps.push("No estás invirtiendo en producción de contenido — tu marca depende de lo que ya tienes, y el mercado se mueve rápido.");
  }

  if (asked.has("current_ctr") && audit.current_ctr === "menos_1") {
    gaps.push("Tu CTR está por debajo del 1% — señal clara de fatiga creativa o targeting desalineado.");
    recommendations.push("Necesitas creativos frescos con hooks que capten atención en los primeros 2 segundos. UGC es el formato con mayor CTR en Meta Ads.");
  }

  if (asked.has("creative_age_weeks") && (audit.creative_age_weeks === "mas_8" || audit.creative_age_weeks === "4_8")) {
    gaps.push("Llevas más de un mes sin producir contenido nuevo — tus anuncios están perdiendo efectividad cada día.");
    recommendations.push("La regla de oro: rota creativos cada 2-3 semanas. Con un pack mensual de UGC, nunca te quedas sin munición.");
  }

  if (asked.has("creative_age_weeks") && audit.creative_age_weeks === "no_tengo") {
    gaps.push("No tienes creativos de video — estás compitiendo con las manos atadas frente a marcas que sí los tienen.");
    recommendations.push("El 92% de los consumidores confía más en contenido generado por personas reales que en anuncios de marca. Empieza con un pack de 4-6 videos UGC.");
  }

  if (asked.has("monthly_content_pieces") && (audit.monthly_content_pieces === "0" || audit.monthly_content_pieces === "1_3")) {
    gaps.push("Tu producción de contenido es mínima — necesitas consistencia para alimentar tanto orgánico como paid.");
  }

  if (audit.has_active_ads && audit.current_ctr === "menos_1") {
    recommendations.push("Estás gastando en ads pero con bajo rendimiento. Antes de aumentar presupuesto, necesitas mejores creativos — es donde UGC marca la diferencia.");
  }

  if (audit.biggest_pain === "contenido_no_convierte") {
    recommendations.push("El contenido que no convierte generalmente carece de prueba social auténtica. Los videos UGC con testimoniales reales tienen 4x más conversión.");
  }

  if (audit.biggest_pain === "no_encuentro_creadores") {
    recommendations.push("Encontrar creadores confiables es difícil. Nosotros tenemos una red curada de +50 creators en LATAM, listos para producir en 7 días.");
  }

  if (audit.biggest_pain === "inconsistencia") {
    recommendations.push("La inconsistencia mata tu alcance orgánico y agota tu inversión en ads. Un plan mensual de contenido UGC resuelve esto de raíz.");
  }

  // Default recommendations if few detected
  if (recommendations.length < 2) {
    recommendations.push(`Con tu inversión actual en ads (${formatBudget(audit.ad_budget)}), optimizar tus creativos con UGC puede mejorar tu ROAS entre 2x-4x.`);
    recommendations.push("Te recomendamos empezar con un pack de diagnóstico para mapear exactamente qué tipo de contenido necesita tu marca.");
  }

  // Score label
  const score_label =
    score.temperature === "hot"
      ? "Tu marca tiene alto potencial de crecimiento con UGC"
      : score.temperature === "warm"
        ? "Tu marca puede beneficiarse significativamente del UGC"
        : "Tienes oportunidad de dar tus primeros pasos en contenido UGC";

  // Urgency message
  const urgency_message =
    audit.urgency === "inmediata"
      ? "Necesitas actuar ahora — cada semana sin contenido fresco es dinero que pierdes en ads."
      : audit.urgency === "este_mes"
        ? "Tienes un buen timing. Arrancando este mes, puedes tener contenido listo antes de que termine el próximo."
        : "Aunque no es urgente, planificar ahora te pone por delante de tu competencia.";

  // CTA message based on temperature
  const cta_message =
    score.temperature === "hot"
      ? "Agenda tu llamada estratégica prioritaria — tenemos slots esta semana para marcas como la tuya."
      : score.temperature === "warm"
        ? "Agenda una llamada de diagnóstico gratuita y te mostramos exactamente cómo mejorar tus resultados."
        : "Déjanos tus datos y un especialista te contactará con un plan personalizado para tu marca.";

  const headline = `Diagnóstico de ${info.company_name || "tu marca"}`;

  return {
    headline,
    score_label,
    gaps,
    recommendations,
    urgency_message,
    cta_message,
  };
}

function formatBudget(budget: string): string {
  const labels: Record<string, string> = {
    nada: "$0",
    menos_500: "menos de $500/mes",
    "500_1000": "$500-$1,000/mes",
    "1000_3000": "$1,000-$3,000/mes",
    "3000_5000": "$3,000-$5,000/mes",
    mas_5000: "más de $5,000/mes",
  };
  return labels[budget] ?? budget;
}
