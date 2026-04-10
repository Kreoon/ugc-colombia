import { Zap, Sparkles, Rocket, Crown, type LucideIcon } from "lucide-react";

export type CtaType = "stripe" | "agenda";

export interface Plan {
  id: string;
  name: string;
  icon: LucideIcon;
  price: string;
  priceUnit: string;
  videos: string;
  variants: string;
  description: string;
  features: string[];
  ctaLabel: string;
  ctaType: CtaType;
  ctaHref: string;
  highlight?: boolean;
  badge?: string;
  saving?: string;
}

/**
 * Planes UGC recurrentes — fuente de verdad compartida entre home Pricing
 * y la pagina dedicada /precios.
 */
export const PLANES_RECURRENTES: Plan[] = [
  {
    id: "starter",
    name: "INICIO",
    icon: Zap,
    price: "$400",
    priceUnit: "USD / mes",
    videos: "5 videos UGC",
    variants: "+ 3 variantes = 15 entregables",
    description: "Para marcas que quieren probar sin complicarse.",
    features: [
      "5 videos UGC + 3 variantes cada uno",
      "Resumen estratégico incluido",
      "Investigación de mercado",
      "Análisis de competencia",
      "Guiones escritos por nuestro equipo",
      "Selección curada de creadores",
      "Edición profesional lista para publicar",
      "1 ronda de revisión por video",
      "Entrega en 7 días",
      "Licencia de publicidad 12 meses",
    ],
    ctaLabel: "Quiero empezar",
    ctaType: "stripe",
    ctaHref: "/checkout/starter",
    saving: "Ahorras ~$2.200/mes",
  },
  {
    id: "growth",
    name: "CRECIMIENTO",
    icon: Sparkles,
    price: "$700",
    priceUnit: "USD / mes",
    videos: "10 videos UGC",
    variants: "+ 3 variantes = 30 entregables",
    description: "El más popular: para marcas que ya saben lo que funciona.",
    features: [
      "10 videos UGC + 3 variantes cada uno",
      "Estrategia editorial mensual",
      "Investigación de mercado continua",
      "Análisis de competencia trimestral",
      "Guiones con marcos ganadores",
      "Selección nivel premium de nuestra red",
      "Edición profesional + gráficos animados",
      "2 rondas de revisión por video",
      "Reporte mensual de resultados",
      "Asesora de cuenta dedicada",
      "Entrega en 7 días",
      "Licencia de publicidad 12 meses",
    ],
    ctaLabel: "Quiero crecer",
    ctaType: "stripe",
    ctaHref: "/checkout/growth",
    highlight: true,
    badge: "MÁS POPULAR",
    saving: "Ahorras ~$4.000/mes",
  },
  {
    id: "scale",
    name: "ESCALA",
    icon: Rocket,
    price: "$1.500",
    priceUnit: "USD / mes",
    videos: "30 videos UGC",
    variants: "+ 3 variantes = 90 entregables",
    description:
      "Para marcas que ya entendieron que el contenido es su mayor ventaja.",
    features: [
      "30 videos UGC + 3 variantes cada uno",
      "Estrategia de marketing completa",
      "Consultoría estratégica mensual con Alexander",
      "Investigación + análisis continuo",
      "Banco de guiones por ángulo ganador",
      "Grupo de creadores nivel premium exclusivo",
      "Edición cinematográfica + subtítulos animados",
      "Revisiones ilimitadas",
      "Reportes semanales con datos accionables",
      "Asesora de cuenta senior dedicada",
      "Entrega prioritaria",
      "Licencia de publicidad 12 meses",
    ],
    ctaLabel: "Quiero escalar",
    ctaType: "stripe",
    ctaHref: "/checkout/scale",
    saving: "Ahorras ~$5.500/mes",
  },
];

export const ENTERPRISE_FEATURES = [
  "60+ videos UGC al mes (escalable)",
  "Variantes ilimitadas por video",
  "Estrategia 360° con tu equipo",
  "Director creativo asignado",
  "Equipo dedicado nivel premium exclusivo",
  "Videos de ventas, videos principales y campañas premium",
  "Posproducción cinematográfica ilimitada",
  "Integración directa con tu equipo de publicidad",
  "Panel en tiempo real",
  "Slack/Teams compartido",
  "Acuerdos de servicio garantizados por contrato",
  "Derechos a medida (publicación con tu marca, exclusividad)",
  "Arranque ejecutivo con Alexander Cast",
];

export const ENTERPRISE_PLAN = {
  id: "enterprise",
  name: "A LA MEDIDA",
  icon: Crown,
  price: "A la medida",
  priceUnit: "60+ videos / mes · escalable",
  tagline: "Para empresas con alto volumen que necesitan equipo dedicado y SLAs.",
};

/**
 * Matriz de comparacion feature-by-feature para /precios.
 * Cada fila define la feature y su valor (boolean | string) por plan.
 */
export type ComparisonRow = {
  feature: string;
  category: string;
  inicio: string | boolean;
  crecimiento: string | boolean;
  escala: string | boolean;
  enterprise: string | boolean;
};

export const COMPARISON_ROWS: ComparisonRow[] = [
  // ─── Producción ──────────────────────────
  {
    category: "Producción",
    feature: "Videos UGC al mes",
    inicio: "5",
    crecimiento: "10",
    escala: "30",
    enterprise: "60+",
  },
  {
    category: "Producción",
    feature: "Variantes por video",
    inicio: "3",
    crecimiento: "3",
    escala: "3",
    enterprise: "Ilimitadas",
  },
  {
    category: "Producción",
    feature: "Entregables totales/mes",
    inicio: "15",
    crecimiento: "30",
    escala: "90",
    enterprise: "180+",
  },
  {
    category: "Producción",
    feature: "Tiempo de primera entrega",
    inicio: "7 días",
    crecimiento: "7 días",
    escala: "Prioritaria",
    enterprise: "SLA custom",
  },
  {
    category: "Producción",
    feature: "Rondas de revisión por video",
    inicio: "1",
    crecimiento: "2",
    escala: "Ilimitadas",
    enterprise: "Ilimitadas",
  },
  // ─── Estrategia ──────────────────────────
  {
    category: "Estrategia",
    feature: "Investigación de mercado",
    inicio: "One-shot",
    crecimiento: "Continua",
    escala: "Continua",
    enterprise: "360° con tu equipo",
  },
  {
    category: "Estrategia",
    feature: "Estrategia editorial",
    inicio: "Resumen",
    crecimiento: "Mensual documentada",
    escala: "Completa + consultoría",
    enterprise: "Director creativo asignado",
  },
  {
    category: "Estrategia",
    feature: "Análisis de competencia",
    inicio: "One-shot",
    crecimiento: "Trimestral",
    escala: "Continuo",
    enterprise: "Continuo + insights",
  },
  {
    category: "Estrategia",
    feature: "Consultoría con Alexander",
    inicio: false,
    crecimiento: false,
    escala: "Mensual",
    enterprise: "Arranque ejecutivo",
  },
  // ─── Creadores ──────────────────────────
  {
    category: "Creadores",
    feature: "Selección de creadores",
    inicio: "Curada",
    crecimiento: "Premium",
    escala: "Premium exclusivo",
    enterprise: "Equipo dedicado",
  },
  {
    category: "Creadores",
    feature: "Aprobación previa del creador",
    inicio: true,
    crecimiento: true,
    escala: true,
    enterprise: true,
  },
  // ─── Edición ──────────────────────────
  {
    category: "Edición",
    feature: "Edición profesional",
    inicio: true,
    crecimiento: true,
    escala: true,
    enterprise: true,
  },
  {
    category: "Edición",
    feature: "Gráficos animados",
    inicio: false,
    crecimiento: true,
    escala: true,
    enterprise: true,
  },
  {
    category: "Edición",
    feature: "Subtítulos animados",
    inicio: false,
    crecimiento: true,
    escala: true,
    enterprise: true,
  },
  {
    category: "Edición",
    feature: "Color grading cinematográfico",
    inicio: false,
    crecimiento: false,
    escala: true,
    enterprise: true,
  },
  // ─── Reporte y cuenta ──────────────────────────
  {
    category: "Cuenta & reportes",
    feature: "Asesora de cuenta",
    inicio: "Compartida",
    crecimiento: "Dedicada",
    escala: "Senior dedicada",
    enterprise: "Equipo dedicado",
  },
  {
    category: "Cuenta & reportes",
    feature: "Reportes de resultados",
    inicio: "Al cierre",
    crecimiento: "Mensual",
    escala: "Semanal",
    enterprise: "Panel en tiempo real",
  },
  {
    category: "Cuenta & reportes",
    feature: "Canal Slack / Teams compartido",
    inicio: false,
    crecimiento: false,
    escala: false,
    enterprise: true,
  },
  // ─── Derechos ──────────────────────────
  {
    category: "Derechos",
    feature: "Licencia de publicidad pagada",
    inicio: "12 meses",
    crecimiento: "12 meses",
    escala: "12 meses",
    enterprise: "A la medida",
  },
  {
    category: "Derechos",
    feature: "Publicación con tu marca",
    inicio: false,
    crecimiento: false,
    escala: false,
    enterprise: true,
  },
  {
    category: "Derechos",
    feature: "Exclusividad por nicho",
    inicio: false,
    crecimiento: false,
    escala: false,
    enterprise: true,
  },
  // ─── Soporte ──────────────────────────
  {
    category: "Soporte",
    feature: "Acuerdos de servicio garantizados (SLA)",
    inicio: false,
    crecimiento: false,
    escala: false,
    enterprise: true,
  },
];
