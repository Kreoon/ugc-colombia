import {
  Film,
  CalendarRange,
  Camera,
  Compass,
  Users,
  Bot,
  Sparkles,
  Globe,
  LayoutTemplate,
  type LucideIcon,
} from "lucide-react";
import type { Currency } from "@/lib/pricing/currency-config";

/**
 * Valor localizado por moneda. Si el dato no depende de la moneda
 * (ej. descripciones sin precios), se puede pasar como valor plano;
 * el helper `resolveLocalized()` lo devuelve intacto.
 */
export type L10n<T> = T | Record<Currency, T>;

export function resolveLocalized<T>(value: L10n<T>, currency: Currency): T {
  if (
    value &&
    typeof value === "object" &&
    !Array.isArray(value) &&
    "USD" in (value as Record<string, unknown>)
  ) {
    return (value as Record<Currency, T>)[currency];
  }
  return value as T;
}

export type ServiceLine = {
  id: string;
  icon: LucideIcon;
  image: string;
  imageAlt: string;
  eyebrow: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  deliverables: L10n<string[]>;
  target: string;
  priceRange: Record<Currency, string>;
  example: L10n<string>;
};

export const SERVICE_LINES: ServiceLine[] = [
  {
    id: "ugc-ads",
    icon: Film,
    image: "/brand/servicios/ugc-ads.png",
    imageAlt: "Teléfono filmando producto con ring light dorado",
    eyebrow: "Línea 01",
    title: "UGC Ads Pack",
    shortDescription:
      "5, 10 o 30 videos UGC al mes con 3 variantes cada uno, listos para Meta y TikTok.",
    longDescription:
      "Plan recurrente de producción UGC con tres niveles (Inicio, Crecimiento, Escala). Cada video se entrega con 3 variantes para multiplicar tus pruebas creativas en Meta y TikTok. Incluye estrategia, guiones, selección curada de creadores, edición profesional, asesora de cuenta y licencia de publicidad por 12 meses.",
    deliverables: [
      "5, 10 o 30 videos UGC al mes con 3 variantes cada uno (hasta 90 entregables)",
      "Estrategia editorial e investigación de mercado",
      "Análisis de competencia recurrente",
      "Guiones escritos por nuestro equipo con marcos ganadores",
      "Selección curada de creadores verificados",
      "Edición profesional + gráficos y subtítulos animados",
      "Hasta revisiones ilimitadas en plan Escala",
      "Entrega en 7 días desde aprobación del brief",
      "Asesora de cuenta dedicada y reportes de resultados",
      "Licencia de publicidad pagada por 12 meses",
    ],
    target:
      "Marcas ecommerce, dropshipping y DTC en LATAM que ya facturan o quieren empezar a facturar con contenido que vende. Desde proyectos que arrancan hasta marcas escalando a 6 cifras mensuales, sin necesidad de montar un equipo interno.",
    priceRange: {
      USD: "$400 – $1.500 USD / mes (Inicio · Crecimiento · Escala)",
      COP: "$1.590.000 – $5.890.000 COP / mes (Inicio · Crecimiento · Escala)",
    },
    example: {
      USD: "Una marca de skincare en Colombia que toma el plan Crecimiento ($700/mes) y recibe 10 videos × 3 variantes = 30 entregables listos para escalar Meta Ads.",
      COP: "Una marca de skincare en Colombia que toma el plan Crecimiento ($2.590.000/mes) y recibe 10 videos × 3 variantes = 30 entregables listos para escalar Meta Ads.",
    },
  },
  {
    id: "estrategia",
    icon: CalendarRange,
    image: "/brand/servicios/estrategia.png",
    imageAlt: "Tablero editorial con fichas de estrategia en luz dorada",
    eyebrow: "Línea 02",
    title: "Estrategia de Contenido & Redes",
    shortDescription:
      "Estrategia editorial integrada para Instagram, TikTok y YouTube Shorts.",
    longDescription:
      "Diseño y ejecución de estrategia editorial mensual que cubre Instagram, TikTok y YouTube Shorts con calendario, pilares, ángulos y briefs para creadores. Articulamos contenido orgánico y paid en una misma narrativa coherente con la voz de tu marca, con reportes de performance y optimización continua.",
    deliverables: [
      "Estrategia mensual documentada con pilares y temas",
      "Calendario editorial planificado",
      "Briefs detallados para cada creador",
      "Reporte de performance mensual con KPIs claros",
      "Coordinación entre contenido orgánico y paid",
      "Actualizaciones según tendencias y comportamiento de audiencia",
      "Acompañamiento estratégico continuo",
    ],
    target:
      "Marcas de consumo masivo y emprendedores con presupuesto establecido que buscan consistencia narrativa y reducir distancia con su audiencia.",
    priceRange: {
      USD: "$800 – $1.200 USD / mes",
      COP: "$3.190.000 – $4.790.000 COP / mes",
    },
    example:
      "Una marca de cosmética en Ecuador que integra su estrategia de Instagram con presupuesto paid en Meta para mantener coherencia y aumentar conversiones.",
  },
  {
    id: "produccion",
    icon: Camera,
    image: "/brand/servicios/produccion.png",
    imageAlt: "Cámara de cine con rim light dorado en set premium",
    eyebrow: "Línea 03",
    title: "Producción Audiovisual Premium",
    shortDescription:
      "VSL, brand films y reels de alto estándar con producción profesional.",
    longDescription:
      "Producción audiovisual de alto estándar más allá del UGC crudo: Video Sales Letters, brand films y reels con equipo técnico profesional. Pre-producción completa, rodaje, edición avanzada con color grading y sonido pro, y entrega en múltiples formatos para ads y orgánico. Ideal para lanzamientos y campañas de alto presupuesto.",
    deliverables: [
      "Pre-producción con concepto creativo y storyboard",
      "Rodaje profesional con equipo técnico especializado",
      "Edición de nivel broadcast con color grading y sonido pro",
      "Versión optimizada para ads pagados",
      "Versión para contenido orgánico",
      "Formatos múltiples por plataforma (YouTube, TikTok, Instagram)",
      "Revisiones hasta aprobación final",
    ],
    target:
      "Marcas en fase de lanzamiento con presupuesto significativo, empresas B2B y SaaS que requieren VSL para adquisición, agencias de publicidad que buscan producción premium en white label.",
    priceRange: {
      USD: "$1.500 – $5.000 USD / proyecto",
      COP: "$5.990.000 – $19.900.000 COP / proyecto",
    },
    example:
      "Una startup SaaS de LATAM lanzando oficialmente necesita un VSL de 3 minutos con producción cinematográfica para YouTube y Google Ads.",
  },
  {
    id: "consultoria",
    icon: Compass,
    image: "/brand/servicios/consultoria.png",
    imageAlt: "Libreta de cuero y pluma en luz dorada editorial",
    eyebrow: "Línea 04",
    title: "Consultoría de Marketing Digital",
    shortDescription:
      "Auditoría, plan 90 días y acompañamiento estratégico con Alexander.",
    longDescription:
      "Servicio de auditoría estratégica integral con acompañamiento directo de Alexander como estratega principal. Analizamos funnels, paid media y posicionamiento competitivo, generamos diagnóstico completo, plan de acción a 90 días y sesiones de seguimiento con reportes detallados de progreso y optimización.",
    deliverables: [
      "Auditoría completa de funnels, ads y posicionamiento",
      "Plan estratégico estructurado para 90 días",
      "Identificación de gaps y oportunidades de crecimiento",
      "Recomendaciones de optimización de paid media",
      "Sesiones de acompañamiento mensual con liderazgo",
      "Reportes de seguimiento y ajustes estratégicos",
      "Acceso a benchmarks de mercado e insights competitivos",
    ],
    target:
      "Fundadores de startups y SaaS en crecimiento, marcas USA expandiendo a LATAM, empresas con PMF que necesitan escalar ingresos recurrentes.",
    priceRange: {
      USD: "$1.200 – $3.000 USD / mes o proyecto",
      COP: "$4.790.000 – $11.990.000 COP / mes o proyecto",
    },
    example:
      "Una fintech con PMF en México que necesita estrategia para penetrar Colombia con CAC optimizado y proyección de 100K usuarios en 12 meses.",
  },
  {
    id: "talento",
    icon: Users,
    image: "/brand/servicios/talento.png",
    imageAlt: "Siluetas editoriales de creadores en luz dorada",
    eyebrow: "Línea 05",
    title: "Agencia de Creadores",
    shortDescription:
      "Talent management con red de +30 creadores UGC verificados.",
    longDescription:
      "Plataforma de matching y gestión de creadores UGC verificados por nicho, estética y audiencia objetivo. Acceso a red de más de 30 creadores activos con coordinación, control de calidad y entrega integrada. Escalable para agencias de publicidad y grandes marcas con demandas de volumen.",
    deliverables: [
      "Selección estratégica de 2-3 creadores ideales por brief",
      "Coordinación completa de la producción",
      "Aprobación de creadores por parte del cliente",
      "Quality Assurance interno por Diana Mile",
      "Gestión de entregas y tiempos",
      "Acceso a red verificada por categoría",
      "Escalabilidad para proyectos de alto volumen",
    ],
    target:
      "Agencias de publicidad sin capacidad interna de producción UGC que buscan white label, grandes marcas con volumen y plataformas de influencer marketing especializadas.",
    priceRange: {
      USD: "Comisión 20-30% + tarifa de gestión",
      COP: "Comisión 20-30% + tarifa de gestión",
    },
    example:
      "Una agencia en Bogotá con 5 clientes ecommerce demandando UGC contrata para hacer white label y ofertarlo como servicio propio.",
  },
  {
    id: "ia-automatizacion",
    icon: Bot,
    image: "/brand/servicios/ia-automatizacion.png",
    imageAlt: "Red abstracta de nodos dorados conectados",
    eyebrow: "Línea 06",
    title: "IA, Automatización & Dev a Medida",
    shortDescription:
      "Agentes IA propios, workflows n8n y dev real con código, integraciones y soporte continuo.",
    longDescription:
      "Una sola línea que cubre desde la automatización rápida con plantillas hasta el desarrollo a medida con código real. Diseñamos e implementamos agentes IA propios, workflows n8n que conectan tu stack, integraciones API complejas, chatbots con lógica de negocio, dashboards custom y arquitecturas productivas con monitoreo 24/7. Usamos la misma stack que corre en nuestra operación interna — incluyendo KREOON como plataforma IA propia — y la aplicamos a clientes con handoff completo y soporte post-implementación.",
    deliverables: [
      "Auditoría de procesos y mapa de oportunidades de IA y automatización",
      "Diseño de arquitectura (n8n, Supabase, APIs, modelos LLM)",
      "Agentes IA a medida para ventas, soporte, reporting y operación",
      "Workflows n8n desde plantillas probadas hasta sistemas multi-etapa",
      "Integraciones API custom (WhatsApp Cloud, Meta, HubSpot, Gmail, CRMs)",
      "Dashboards custom e interfaces de administración",
      "Monitoreo, alertas y mantenimiento continuo (retainer opcional)",
      "Handoff técnico completo: código, credenciales, diagramas y runbook",
    ],
    target:
      "Empresas y agencias que quieren liberar horas de su equipo, escalar atención al cliente, construir agentes IA propios o implementar procesos inteligentes con código real. Desde startups que arrancan con un flujo único hasta operaciones consolidadas que necesitan dev team on-demand y soporte 24/7.",
    priceRange: {
      USD: "Desde $550 USD/flujo · $1.400 USD/sistema · $1.800 USD/mes retainer dev · setups complejos $1.500 – $6.000 USD",
      COP: "Desde $2.190.000 COP/flujo · $5.590.000 COP/sistema · $7.190.000 COP/mes retainer dev · setups complejos $5.990.000 – $23.990.000 COP",
    },
    example:
      "Una clínica estética en Medellín automatiza agendamiento, recordatorios y postventa por WhatsApp con un agente IA conectado a su CRM, ahorrando 25 horas semanales al equipo administrativo. Luego escala a un retainer de dev mensual para iterar nuevos flujos y mantener el sistema en producción.",
  },
  {
    id: "contenido-ia",
    icon: Sparkles,
    image: "/brand/servicios/contenido-ia.png",
    imageAlt: "Partículas de luz dorada formando arte generativo",
    eyebrow: "Línea 07",
    title: "Contenido con IA",
    shortDescription:
      "Imágenes, videos, voiceovers y copy generados con IA a escala.",
    longDescription:
      "Producción de contenido apoyada en IA generativa: imágenes con Midjourney/FLUX, videos con Veo 3 y Runway, voiceovers con ElevenLabs, guiones y copy con GPT/Claude. Combinamos creatividad humana con velocidad de máquina para entregar volumen sin perder calidad ni el ADN de tu marca.",
    deliverables: [
      "Banco mensual de imágenes generadas con IA (carruseles, posts, banners)",
      "Videos cortos con IA (talking heads, B-roll, demos animadas)",
      "Voiceovers con voces clonadas o premium (ElevenLabs)",
      "Guiones y copy generados y editados por humanos",
      "Subtítulos automáticos y traducciones",
      "Adaptaciones por plataforma (Reels, TikTok, Shorts, Ads)",
      "Pipeline de generación documentado y reutilizable",
    ],
    target:
      "Marcas y creadores que necesitan volumen alto de contenido sin presupuesto de productora tradicional. Empresas que quieren probar IA generativa con un equipo experto en lugar de improvisar internamente.",
    priceRange: {
      USD: "$600 – $2.500 USD/mes · proyectos puntuales desde $400",
      COP: "$2.390.000 – $9.990.000 COP/mes · proyectos puntuales desde $1.590.000",
    },
    example:
      "Una marca de e-learning en Bogotá produce 30 imágenes IA, 8 videos cortos y 12 voiceovers cada mes para sus campañas de Meta y TikTok, escalando sin contratar un equipo audiovisual.",
  },
  {
    id: "diseno-web",
    icon: Globe,
    image: "/brand/servicios/diseno-web.png",
    imageAlt:
      "Laptop editorial premium con pantalla dorada sobre superficie oscura",
    eyebrow: "Línea 08",
    title: "Diseño Web Premium",
    shortDescription:
      "Sitios corporativos con CMS, SEO técnico y Core Web Vitals 90+.",
    longDescription:
      "Construimos sitios web que son parte activa de tu embudo de ventas, no adornos corporativos. Next.js o WordPress headless, CMS para que edites tú mismo, arquitectura de información pensada en conversión, SEO técnico, schema markup y Core Web Vitals 90+. Tres tiers (Corporate Básico, Pro y Premium) para acompañarte desde el lanzamiento hasta la operación multi-idioma con e-commerce.",
    deliverables: {
      USD: [
        "Corporate Básico ($1.200): 5 páginas, CMS, SEO on-page, mobile-first, entrega 3 semanas",
        "Corporate Pro ($2.500): 7-10 páginas + blog, integraciones HubSpot / Calendly, animaciones, schema",
        "Corporate Premium ($4.800): multi-idioma, e-commerce hasta 50 SKU, dashboard admin y CRM propio",
        "Arquitectura Next.js o WordPress headless según stack del cliente",
        "Core Web Vitals 90+ medidos y garantizados",
        "Documentación técnica y capacitación al equipo",
        "2 meses de soporte post-lanzamiento (tier Premium)",
      ],
      COP: [
        "Corporate Básico ($4.790.000): 5 páginas, CMS, SEO on-page, mobile-first, entrega 3 semanas",
        "Corporate Pro ($9.990.000): 7-10 páginas + blog, integraciones HubSpot / Calendly, animaciones, schema",
        "Corporate Premium ($19.190.000): multi-idioma, e-commerce hasta 50 SKU, dashboard admin y CRM propio",
        "Arquitectura Next.js o WordPress headless según stack del cliente",
        "Core Web Vitals 90+ medidos y garantizados",
        "Documentación técnica y capacitación al equipo",
        "2 meses de soporte post-lanzamiento (tier Premium)",
      ],
    },
    target:
      "Marcas que quieren dejar el sitio hecho en plantilla y construir una casa digital real donde cada campaña aterriza. Startups listas para levantar capital, empresas B2B con ciclos de venta largos y marcas DTC escalando a multi-mercado.",
    priceRange: {
      USD: "$1.200 – $4.800 USD / proyecto",
      COP: "$4.790.000 – $19.190.000 COP / proyecto",
    },
    example: {
      USD: "Una marca DTC de suplementos en Bogotá migra su Shopify a un corporate Pro ($2.500) con blog editorial y landing integradas para bajar el CAC en Meta Ads un 30%.",
      COP: "Una marca DTC de suplementos en Bogotá migra su Shopify a un corporate Pro ($9.990.000) con blog editorial y landing integradas para bajar el CAC en Meta Ads un 30%.",
    },
  },
  {
    id: "landing-pages",
    icon: LayoutTemplate,
    image: "/brand/servicios/landing-pages.png",
    imageAlt:
      "Haz vertical de luz dorada segmentado sobre fondo editorial negro",
    eyebrow: "Línea 09",
    title: "Landing Pages de Conversión",
    shortDescription:
      "Single pages optimizadas para ads con tracking server-side y A/B test.",
    longDescription:
      "Una sola página, una sola misión: convertir tráfico pagado en clientes. Copy persuasivo, diseño mobile-first, Meta Pixel + GA4 + tracking server-side, eventos de conversión personalizados y A/B test listos desde el día uno. Tres tiers (Esencial, Performance y Premium) según la madurez de tu cuenta publicitaria.",
    deliverables: {
      USD: [
        "Esencial ($450): single page, copy, mobile-first, formulario conectado, entrega 7 días",
        "Performance ($850): Meta Pixel + GA4 + tracking server-side, eventos custom, A/B test, heatmaps",
        "Premium ($1.500): video hero, animaciones custom, integración CRM, 2 variantes A/B, 1 mes de optimización",
        "Copy persuasivo basado en frameworks PAS / StoryBrand",
        "Optimización para Core Web Vitals y LCP < 2.5s",
        "Setup de eventos para Meta Ads, TikTok Ads y Google Ads",
        "Handoff con documentación técnica para tu equipo de media",
      ],
      COP: [
        "Esencial ($1.790.000): single page, copy, mobile-first, formulario conectado, entrega 7 días",
        "Performance ($3.390.000): Meta Pixel + GA4 + tracking server-side, eventos custom, A/B test, heatmaps",
        "Premium ($5.990.000): video hero, animaciones custom, integración CRM, 2 variantes A/B, 1 mes de optimización",
        "Copy persuasivo basado en frameworks PAS / StoryBrand",
        "Optimización para Core Web Vitals y LCP < 2.5s",
        "Setup de eventos para Meta Ads, TikTok Ads y Google Ads",
        "Handoff con documentación técnica para tu equipo de media",
      ],
    },
    target:
      "Marcas con ads activos que necesitan dejar de mandar tráfico a la home y empezar a testear. Advertisers con presupuesto +$3K/mes en paid que buscan bajar CAC con landings dedicadas por campaña.",
    priceRange: {
      USD: "$450 – $1.500 USD / landing",
      COP: "$1.790.000 – $5.990.000 COP / landing",
    },
    example: {
      USD: "Una marca de cosmética en México lanza una Landing Performance ($850) para su campaña Black Friday con tracking server-side y 2 variantes A/B, reduciendo el CPA un 42% vs. su home.",
      COP: "Una marca de cosmética en México lanza una Landing Performance ($3.390.000) para su campaña Black Friday con tracking server-side y 2 variantes A/B, reduciendo el CPA un 42% vs. su home.",
    },
  },
];
