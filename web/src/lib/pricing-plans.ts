import { Zap, Sparkles, Rocket, Crown, type LucideIcon } from "lucide-react";

export type CtaType = "stripe" | "agenda";

export interface Plan {
  id: string;
  name: string;
  icon: LucideIcon;
  videos: string;
  /** Cantidad numérica de videos/mes — usada para calcular precio por video. */
  videosCount: number;
  variants: string;
  description: string;
  features: string[];
  ctaLabel: string;
  ctaType: CtaType;
  ctaHref: string;
  highlight?: boolean;
  badge?: string;
}

/**
 * Planes UGC recurrentes — fuente de verdad compartida entre home Pricing
 * y la página dedicada /precios. Los precios nativos por moneda viven en
 * `@/lib/pricing/currency-config` (PLAN_PRICES) para permitir multi-moneda
 * con precios psicológicamente redondeados por país.
 */
export const PLANES_RECURRENTES: Plan[] = [
  {
    id: "starter",
    name: "INICIO",
    icon: Zap,
    videos: "6 videos UGC",
    videosCount: 6,
    variants: "+ 2 variantes = 18 entregables",
    description: "Para marcas que quieren probar sin complicarse.",
    features: [
      "6 videos UGC + 2 variantes cada uno",
      "Investigación de mercado básica",
      "Hasta 2 creadores distintos",
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
  },
  {
    id: "growth",
    name: "CRECIMIENTO",
    icon: Sparkles,
    videos: "10 videos UGC",
    videosCount: 10,
    variants: "+ 2 variantes = 30 entregables",
    description: "El más popular: para marcas que ya saben lo que funciona.",
    features: [
      "10 videos UGC + 2 variantes cada uno",
      "Investigación de mercado V2 (continua)",
      "Parrilla de contenido mensual planificada",
      "Hasta 5 creadores distintos",
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
  },
  {
    id: "scale",
    name: "ESCALA",
    icon: Rocket,
    videos: "30 videos UGC",
    videosCount: 30,
    variants: "+ 3 variantes = 120 entregables",
    description:
      "Para marcas que ya entendieron que el contenido es su mayor ventaja.",
    features: [
      "30 videos UGC + 3 variantes cada uno",
      "Investigación V3 Plus (deep market research)",
      "Scraping automatizado de competidores",
      "Scraping de productos similares en el mercado",
      "Estrategia V3 Plus (omnicanal + funnels)",
      "Hasta 10 creadores distintos",
      "Consultoría estratégica mensual con Alexander",
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
  },
];

export const ENTERPRISE_FEATURES = [
  "60+ videos UGC al mes (escalable)",
  "3 variantes por video",
  "Estrategia 360° con tu equipo",
  "Director creativo asignado",
  "Equipo dedicado nivel premium exclusivo",
  "Videos de ventas, videos principales y campañas premium",
  "Posproducción cinematográfica ilimitada",
  "Integración directa con tu equipo de publicidad",
  "Panel en tiempo real",
  "Slack/Teams compartido",
  "Acuerdos de servicio garantizados por contrato",
  "Publicación con tu marca (negociable según engagement y seguidores del creador)",
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
 * Matriz de comparación feature-by-feature para /precios.
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
  {
    category: "Producción",
    feature: "Videos UGC al mes",
    inicio: "6",
    crecimiento: "10",
    escala: "30",
    enterprise: "60+",
  },
  {
    category: "Producción",
    feature: "Variantes por video",
    inicio: "2",
    crecimiento: "2",
    escala: "3",
    enterprise: "3",
  },
  {
    category: "Producción",
    feature: "Entregables totales/mes",
    inicio: "18",
    crecimiento: "30",
    escala: "120",
    enterprise: "200+",
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
  {
    category: "Estrategia",
    feature: "Investigación de mercado",
    inicio: "Básica",
    crecimiento: "V2 continua",
    escala: "V3 Plus (deep)",
    enterprise: "360° con tu equipo",
  },
  {
    category: "Estrategia",
    feature: "Parrilla de contenido mensual",
    inicio: false,
    crecimiento: "Mensual planificada",
    escala: "Mensual + calendarios por ángulo",
    enterprise: "Director creativo asignado",
  },
  {
    category: "Estrategia",
    feature: "Scraping de competidores",
    inicio: false,
    crecimiento: false,
    escala: "Automatizado",
    enterprise: "Continuo + insights",
  },
  {
    category: "Estrategia",
    feature: "Scraping de productos similares",
    inicio: false,
    crecimiento: false,
    escala: true,
    enterprise: true,
  },
  {
    category: "Estrategia",
    feature: "Estrategia general",
    inicio: "Básica",
    crecimiento: "Mensual documentada",
    escala: "V3 Plus (omnicanal + funnels)",
    enterprise: "360° con director creativo",
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
  {
    category: "Creadores",
    feature: "Creadores máximos",
    inicio: "Hasta 2",
    crecimiento: "Hasta 5",
    escala: "Hasta 10",
    enterprise: "Equipo dedicado",
  },
  {
    category: "Creadores",
    feature: "Nivel de selección",
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
    inicio: "Negociable",
    crecimiento: "Negociable",
    escala: "Negociable",
    enterprise: "Negociable",
  },
  {
    category: "Derechos",
    feature: "Exclusividad por nicho",
    inicio: false,
    crecimiento: false,
    escala: false,
    enterprise: true,
  },
  {
    category: "Soporte",
    feature: "Acuerdos de servicio garantizados (SLA)",
    inicio: false,
    crecimiento: false,
    escala: false,
    enterprise: true,
  },
];
