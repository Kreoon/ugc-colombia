// Quiz engine — ramificación inteligente según respuestas
// Cada dolor lleva por un camino diferente de preguntas

export interface QuizQuestion {
  key: string;
  question: string;
  hint?: string;
  options: Array<{
    value: string;
    label: string;
    sublabel?: string;
  }>;
}

// ─── Preguntas disponibles ───────────────────────────────────────────────────

const Q: Record<string, QuizQuestion> = {
  biggest_pain: {
    key: "biggest_pain",
    question: "¿Cuál es tu mayor frustración con el contenido de tu marca?",
    hint: "Esto define el enfoque de tu diagnóstico.",
    options: [
      { value: "no_tengo_contenido", label: "No tengo contenido de calidad", sublabel: "Necesito empezar desde cero" },
      { value: "contenido_no_convierte", label: "Mi contenido no genera ventas", sublabel: "Publico pero no veo resultados" },
      { value: "muy_caro", label: "Producir contenido es muy caro", sublabel: "Los costos se comen mi margen" },
      { value: "no_encuentro_creadores", label: "No encuentro buenos creadores", sublabel: "Es un dolor encontrar gente confiable" },
      { value: "inconsistencia", label: "No soy consistente publicando", sublabel: "Empiezo con fuerza y luego me pierdo" },
      { value: "no_se_que_hacer", label: "No sé por dónde empezar", sublabel: "Estoy perdido/a con tantas opciones" },
    ],
  },
  ad_budget: {
    key: "ad_budget",
    question: "¿Cuánto inviertes en publicidad digital al mes?",
    hint: "Meta Ads, Google Ads, TikTok Ads — todo cuenta.",
    options: [
      { value: "nada", label: "$0 — No invierto en ads" },
      { value: "menos_500", label: "Menos de $500 USD/mes" },
      { value: "500_1000", label: "$500 - $1,000 USD/mes" },
      { value: "1000_3000", label: "$1,000 - $3,000 USD/mes" },
      { value: "3000_5000", label: "$3,000 - $5,000 USD/mes" },
      { value: "mas_5000", label: "Más de $5,000 USD/mes" },
    ],
  },
  content_budget: {
    key: "content_budget",
    question: "¿Y cuánto inviertes en producción de contenido?",
    hint: "Videos, fotos, diseño, creadores — lo que sea.",
    options: [
      { value: "nada", label: "$0 — No invierto en contenido" },
      { value: "menos_500", label: "Menos de $500 USD/mes" },
      { value: "500_1000", label: "$500 - $1,000 USD/mes" },
      { value: "1000_3000", label: "$1,000 - $3,000 USD/mes" },
      { value: "3000_5000", label: "$3,000 - $5,000 USD/mes" },
      { value: "mas_5000", label: "Más de $5,000 USD/mes" },
    ],
  },
  has_active_ads: {
    key: "has_active_ads",
    question: "¿Tienes anuncios activos corriendo ahora mismo?",
    options: [
      { value: "true", label: "Sí, tengo ads corriendo", sublabel: "En Meta, Google, TikTok u otra plataforma" },
      { value: "false", label: "No, no tengo ads activos" },
    ],
  },
  current_ctr: {
    key: "current_ctr",
    question: "¿Cuál es tu CTR promedio en anuncios?",
    hint: "Si no lo sabes, eso ya nos dice algo importante.",
    options: [
      { value: "no_se", label: "No sé / No mido", sublabel: "No tengo claro este dato" },
      { value: "menos_1", label: "Menos de 1%", sublabel: "La gente no hace clic en mis ads" },
      { value: "1_2", label: "Entre 1% y 2%" },
      { value: "mas_2", label: "Más de 2%", sublabel: "Mis ads funcionan bien" },
    ],
  },
  creative_age_weeks: {
    key: "creative_age_weeks",
    question: "¿Hace cuánto produjiste tu último video para ads o redes?",
    hint: "La frescura del contenido impacta directamente en resultados.",
    options: [
      { value: "menos_2", label: "Menos de 2 semanas" },
      { value: "2_4", label: "2 a 4 semanas" },
      { value: "4_8", label: "1 a 2 meses" },
      { value: "mas_8", label: "Más de 2 meses", sublabel: "Tus creativos probablemente están fatigados" },
      { value: "no_tengo", label: "Nunca he producido video" },
    ],
  },
  monthly_content_pieces: {
    key: "monthly_content_pieces",
    question: "¿Cuántas piezas de contenido produces al mes?",
    hint: "Reels, posts, carruseles — todo cuenta.",
    options: [
      { value: "0", label: "Ninguna" },
      { value: "1_3", label: "1 a 3 piezas" },
      { value: "4_8", label: "4 a 8 piezas" },
      { value: "9_15", label: "9 a 15 piezas" },
      { value: "mas_15", label: "Más de 15 piezas" },
    ],
  },
  urgency: {
    key: "urgency",
    question: "¿Qué tan urgente es resolver tu contenido?",
    hint: "Esto nos ayuda a priorizar tu diagnóstico.",
    options: [
      { value: "inmediata", label: "Lo necesito ya", sublabel: "Cada semana sin contenido nuevo cuesta dinero" },
      { value: "este_mes", label: "Quiero arrancar este mes", sublabel: "Tengo la decisión tomada" },
      { value: "proximo_trimestre", label: "En el próximo trimestre" },
      { value: "explorando", label: "Solo estoy explorando" },
    ],
  },
  competitor_awareness: {
    key: "competitor_awareness",
    question: "¿Tu competencia publica contenido de video regularmente?",
    hint: "Esto nos dice qué tan atrás o adelante vas.",
    options: [
      { value: "si_mucho", label: "Sí, publican bastante", sublabel: "Y se nota que les funciona" },
      { value: "si_poco", label: "Sí, pero no mucho" },
      { value: "no", label: "No, casi no publican video" },
      { value: "no_se", label: "No he revisado" },
    ],
  },
  conversion_goal: {
    key: "conversion_goal",
    question: "¿Qué resultado te haría sentir que valió la pena?",
    hint: "Sé honesto — esto personaliza tu diagnóstico.",
    options: [
      { value: "mas_ventas", label: "Más ventas directas", sublabel: "Quiero ver impacto en ingresos" },
      { value: "mas_alcance", label: "Más alcance y seguidores", sublabel: "Quiero que más gente conozca mi marca" },
      { value: "mejor_branding", label: "Mejor imagen de marca", sublabel: "Quiero verme más profesional" },
      { value: "reducir_costos", label: "Reducir costos de producción", sublabel: "Gastar menos por el mismo resultado" },
    ],
  },
  team_resources: {
    key: "team_resources",
    question: "¿Tienes alguien en tu equipo que maneje el contenido?",
    options: [
      { value: "nadie", label: "No, yo hago todo solo/a" },
      { value: "freelancer", label: "Tengo un freelancer ocasional" },
      { value: "equipo_pequeno", label: "Tengo 1-2 personas dedicadas" },
      { value: "agencia", label: "Tengo una agencia pero no estoy satisfecho/a" },
    ],
  },
};

// ─── Caminos de ramificación ─────────────────────────────────────────────────

// Cada dolor lleva por un camino diferente optimizado para entender la necesidad
const PATHS: Record<string, string[]> = {
  // No tiene contenido → necesita empezar → entender competencia y recursos
  no_tengo_contenido: [
    "biggest_pain", "competitor_awareness", "ad_budget", "conversion_goal", "team_resources", "urgency",
  ],
  // Contenido no convierte → problema de performance → deep dive en ads
  contenido_no_convierte: [
    "biggest_pain", "has_active_ads", "current_ctr", "creative_age_weeks", "ad_budget", "urgency",
  ],
  // Muy caro → problema de eficiencia → entender volumen y presupuesto
  muy_caro: [
    "biggest_pain", "monthly_content_pieces", "content_budget", "ad_budget", "team_resources", "urgency",
  ],
  // No encuentra creadores → problema de sourcing → entender qué necesita
  no_encuentro_creadores: [
    "biggest_pain", "monthly_content_pieces", "content_budget", "conversion_goal", "urgency",
  ],
  // Inconsistencia → problema de operaciones → entender equipo y recursos
  inconsistencia: [
    "biggest_pain", "team_resources", "monthly_content_pieces", "ad_budget", "content_budget", "urgency",
  ],
  // No sabe → problema de estrategia → entender objetivos
  no_se_que_hacer: [
    "biggest_pain", "conversion_goal", "competitor_awareness", "ad_budget", "content_budget", "urgency",
  ],
};

// Default path si no hay match
const DEFAULT_PATH = [
  "biggest_pain", "ad_budget", "content_budget", "has_active_ads",
  "current_ctr", "creative_age_weeks", "monthly_content_pieces", "urgency",
];

// ─── Engine ──────────────────────────────────────────────────────────────────

export function getQuizPath(answers: Record<string, string>): string[] {
  const pain = answers.biggest_pain;
  if (pain && PATHS[pain]) return PATHS[pain];
  return DEFAULT_PATH;
}

export function getNextQuestion(
  answers: Record<string, string>,
  currentIndex: number
): QuizQuestion | null {
  const path = getQuizPath(answers);
  if (currentIndex >= path.length) return null;
  const key = path[currentIndex];
  return Q[key] || null;
}

export function getTotalQuestions(answers: Record<string, string>): number {
  return getQuizPath(answers).length;
}

export function getProgressLabel(index: number, total: number): string {
  const pct = (index + 1) / total;
  if (pct <= 0.33) return "Entendiendo tu marca...";
  if (pct <= 0.66) return "Analizando tus brechas...";
  if (pct < 1) return "Casi listo...";
  return "Generando tu diagnóstico...";
}

export function isQuizComplete(answers: Record<string, string>): boolean {
  const path = getQuizPath(answers);
  return path.every((key) => answers[key] !== undefined);
}

// Build audit data — fields not in the quiz path get neutral defaults
// Also returns which fields were actually asked (for diagnosis accuracy)
export function buildAuditFromQuiz(answers: Record<string, string>) {
  const path = getQuizPath(answers);
  const asked = new Set(path);

  return {
    ad_budget: answers.ad_budget || "nada",
    content_budget: answers.content_budget || "nada",
    has_active_ads: answers.has_active_ads === "true",
    current_ctr: answers.current_ctr || "no_se",
    creative_age_weeks: answers.creative_age_weeks || "no_tengo",
    monthly_content_pieces: answers.monthly_content_pieces || "0",
    biggest_pain: answers.biggest_pain || "no_se_que_hacer",
    urgency: answers.urgency || "explorando",
    // Extra: which fields were actually asked (not sent to backend, used for diagnosis)
    _asked_fields: asked,
  };
}

// Get which fields were actually asked in the quiz
export function getAskedFields(answers: Record<string, string>): Set<string> {
  return new Set(getQuizPath(answers));
}
