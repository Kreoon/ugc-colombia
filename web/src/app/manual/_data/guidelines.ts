/**
 * UGC Colombia — Modelo de comunicación consolidado
 *
 * Fuentes:
 *  - brand/legacy-deck/slide-05, 06, 07, 08 (manual de marca original)
 *  - content/sistemas/marca/brand-profile.json
 *  - content/sistemas/marca/posicionamiento-premium.md
 *  - 05-documento-maestro-alexander.md
 *
 * Esta es la fuente canónica del modelo de comunicación usada por
 * /manual/guidelines/ y también referencia para los prompts de generación.
 */

export const brandIdentity = {
  name: "UGC Colombia",
  legal: "Agencia UGC Colombia",
  website: "ugccolombia.co",
  market: "LATAM + USA Hispanic",
  handles: {
    instagram: "@agenciaugccolombia",
    tiktok: "@agenciaugccolombia",
    target: "@ugccolombia",
  },
  oneLiner:
    "Agencia boutique de contenido UGC y estrategia integrada, impulsada por Kreoon (plataforma propia), que conecta marcas de LATAM y USA Hispanic con creadores verificados.",
  mision:
    "Conectar marcas con audiencias reales a través de contenido auténtico, estratégico y medible. Somos el puente entre la creatividad humana y los resultados comerciales, democratizando el acceso a contenido de alto impacto para empresas de todos los tamaños en el mercado hispano.",
  vision:
    "Ser la agencia boutique de contenido UGC y estrategia digital más influyente y reconocida del mercado hispano para 2028.",
} as const;

export const taglines = {
  oficial: "Contenido real, resultados reales.",
  alternativoProfesional: "Contenido que Convierte. Resultados que Perduran.",
  campana: "UGC latino con estándar USA.",
} as const;

export const archetypes = {
  primario: {
    nombre: "Creator",
    descripcion: "El Creador",
    explicacion:
      "Obsesión por el craft del contenido auténtico. El Creator nos da la sensibilidad editorial, la atención al detalle y el rechazo a lo genérico.",
  },
  secundario: {
    nombre: "Ruler",
    descripcion: "El Soberano",
    explicacion:
      "Autoridad premium, orden y sistemas. El Ruler nos diferencia de la granja de freelancers: somos boutique seria, con procesos y garantías.",
  },
} as const;

export const tonalidadEjes = [
  { eje: "Formal ↔ Casual", valor: 6, label: "Formal-neutral, accesible" },
  { eje: "Serio ↔ Divertido", valor: 5, label: "Equilibrado" },
  { eje: "Respetuoso ↔ Irreverente", valor: 4, label: "Boutique formal" },
  { eje: "Entusiasta ↔ Moderado", valor: 7, label: "Confiado, enérgico" },
  { eje: "Autoridad ↔ Cercanía", valor: 6, label: "Experto accesible" },
] as const;

export const tonalidadCualidades = [
  "Profesional, disruptiva y cercana",
  "Innovadora pero sencilla",
  "Experta, sin arrogancia",
  "Auténtica, sin filtros innecesarios",
] as const;

export const tonoPorCanal = [
  {
    canal: "Instagram",
    tono: "Cercano, retador, educativo, inspirador",
    formato: "Reels 9:16 · carruseles · hooks visuales",
    frecuencia: "5 publicaciones por semana",
  },
  {
    canal: "TikTok",
    tono: "Cercano, retador, educativo, inspirador",
    formato: "Vertical 9:16 · menos de 30 seg · tendencias adaptadas",
    frecuencia: "5 publicaciones por semana",
  },
  {
    canal: "YouTube Shorts",
    tono: "Práctico, directo, formativo",
    formato: "Shorts 9:16 · tips, hacks, casos",
    frecuencia: "2 por semana",
  },
  {
    canal: "LinkedIn",
    tono: "Corporativo, aspiracional, centrado en resultados",
    formato: "Post cuadrado + carruseles B2B · foco en cifras y casos",
    frecuencia: "3 por semana",
  },
] as const;

export const vozInstitucional = {
  primeraPersona: {
    uso: "Nosotros",
    cuando: "Cuando hablamos desde la agencia",
    ejemplo: "Nosotros conectamos marcas con creadores verificados.",
  },
  segundaPersona: {
    uso: "Tú",
    cuando: "Cuando nos dirigimos a marcas o creadores",
    ejemplo: "Tu marca necesita contenido que venda, no likes.",
  },
} as const;

export const normasRedaccion = {
  do: [
    "Evitar jerga técnica innecesaria",
    "Escribir claro, directo y accionable",
    "Hablar en datos y casos reales",
    "Mostrar behind-the-scenes del proceso",
    "Usar español neutro con toques colombianos sutiles",
    "Nombrar al equipo — humanos detrás de la marca",
    "Usar vocabulario de industria (performance, hooks, retention, ROAS) cuando suma",
  ],
  dont: [
    "Jerga influencer genérica",
    "Promesas vacías de viralidad",
    "Mencionar stock photos corporativos",
    "Competir por precio",
    "Frases tipo 'viraliza en 24 horas'",
    "Promesas de fama o millones de views",
    "Tono condescendiente con fundadores no-marketers",
  ],
} as const;

export const frasesCore = [
  "Donde los creadores se vuelven pro y las marcas convierten más.",
  "No necesitas fama. Necesitas contenido que venda.",
  "Creamos contenido con humanos, potenciado por IA.",
  "Tu historia, nuestra estrategia, resultados garantizados.",
] as const;

export const slogansAds = [
  "UGC + IA + Live Shopping = ventas reales",
  "Crea. Factura. Repite.",
  "Somos la agencia del contenido que vende.",
  "Deja de pagar por likes. Empieza a pagar por resultados.",
  "UGC Colombia. Contenido hecho por humanos, diseñado por estrategas.",
] as const;

export const valores = [
  {
    nombre: "Autenticidad",
    definicion: "Contenido real que conecta",
    comoLoVivimos: "Creadores verificados, historias reales, sin artificios",
  },
  {
    nombre: "Resultados",
    definicion: "Cada pieza tiene un propósito medible",
    comoLoVivimos: "KPIs claros, reportes transparentes, optimización continua",
  },
  {
    nombre: "Servicio",
    definicion: "El éxito del cliente es nuestro éxito",
    comoLoVivimos: "Estrategia integrada, no solo entrega de contenido",
  },
  {
    nombre: "Innovación",
    definicion: "Siempre un paso adelante en tendencias",
    comoLoVivimos: "Kreoon como plataforma propia, IA integrada en procesos",
  },
  {
    nombre: "Integridad",
    definicion: "Relaciones basadas en confianza real",
    comoLoVivimos: "Contratos claros, comunicación honesta, cumplimiento garantizado",
  },
  {
    nombre: "Comunidad",
    definicion: "Creadores y marcas como aliados",
    comoLoVivimos: "Red de más de 30 creadores formados y respaldados",
  },
] as const;

export const diferenciadores = [
  {
    titulo: "Tecnología propia (Kreoon)",
    detalle:
      "Ningún competidor local tiene infraestructura tecnológica propia. Reduce costos y escala sin perder calidad.",
  },
  {
    titulo: "Estrategia integrada",
    detalle:
      "No solo producimos: diseñamos la estrategia completa. El contenido ya viene optimizado para Meta y TikTok Ads.",
  },
  {
    titulo: "Red de creadores verificados",
    detalle:
      "+30 creadores activos en Colombia. Conocemos sus capacidades, nichos y estética. Matching en horas, no semanas.",
  },
  {
    titulo: "Equipo multidisciplinario",
    detalle:
      "CEO/Estratega, Financiero, Líder de Creadores, Líder de Tecnología y Líder de Comunidades en una sola agencia.",
  },
  {
    titulo: "ADN ecommerce",
    detalle:
      "Venimos del dropshipping y ecommerce. Sabemos qué contenido convierte porque lo probamos con dinero real.",
  },
] as const;

export const buyerPersonas = [
  {
    nombre: "Emprendedor Ecommerce",
    alias: "Camilo / Valentina",
    edad: "28–38",
    ubicacion: "Bogotá, Medellín, Cali, CDMX",
    situacion:
      "Tienda DTC o dropshipping generando $10K–$100K USD/mes. Necesita escalar con contenido de calidad.",
    dolor: "Ads se desgastan rápido; no tiene tiempo ni equipo para producir volumen de creativos frescos.",
    deseo: "Flujo constante de UGC ads para escalar sin preocuparse por el contenido.",
    ticket: "$800–$1.500 / mes retención",
    canal: "LinkedIn, Instagram, referidos ecommerce",
  },
  {
    nombre: "Director de Marketing de Marca",
    alias: "Daniela / Andrés",
    edad: "30–45",
    ubicacion: "Colombia, Ecuador, México, Miami",
    situacion: "Marca de consumo masivo o FMCG con presupuesto establecido. Busca autenticidad.",
    dolor: "Su contenido de agencias tradicionales se ve artificial y no convierte en redes.",
    deseo: "Contenido que parezca orgánico, conecte emocionalmente y genere UGC real.",
    ticket: "$1.500–$3.000 / mes o proyecto",
    canal: "LinkedIn outreach, eventos de marketing, referidos corporativos",
  },
  {
    nombre: "Agencia White Label",
    alias: "Felipe / Mariana",
    edad: "32–50",
    ubicacion: "LATAM o USA Hispanic",
    situacion: "Agencia digital con clientes que piden UGC pero sin capacidad interna.",
    dolor: "Perder clientes por no tener capacidad de producción UGC de calidad y velocidad.",
    deseo: "Proveedor confiable que entregue a tiempo, con calidad, para ofrecer a sus clientes.",
    ticket: "Proyectos $2.000+ / relación volumétrica",
    canal: "LinkedIn, comunidades de agencias, networking directo",
  },
  {
    nombre: "Fundador Startup / SaaS",
    alias: "Santiago / Paula",
    edad: "25–38",
    ubicacion: "Bogotá, Medellín, CDMX, Miami",
    situacion: "Startup con product-market fit. Necesita contenido simple y auténtico que explique el producto.",
    dolor: "Su producto es bueno pero el contenido se ve técnico y frío.",
    deseo: "Videos testimoniales, demos UGC y contenido que acelere adquisición a menor CAC.",
    ticket: "$1.200–$2.500 / mes",
    canal: "LinkedIn, aceleradoras, comunidades de fundadores",
  },
] as const;

export const servicios = [
  {
    nombre: "UGC Ads Pack",
    core: true,
    descripcion: "Videos UGC para Meta y TikTok Ads: testimoniales, unboxings, reviews, demos.",
    precio: "$500 – $1.500 / paquete o retención mensual",
    idealPara: "Marcas ecommerce, dropshipping, DTC",
  },
  {
    nombre: "Estrategia de Contenido & Redes",
    descripcion: "Diseño editorial completo para Instagram, TikTok, YouTube Shorts.",
    precio: "$800 – $1.200 / mes",
    idealPara: "Marcas que quieren consistencia orgánico + paid",
  },
  {
    nombre: "Producción Audiovisual Premium",
    descripcion: "VSL, brand films, reels con producción profesional.",
    precio: "$1.500 – $5.000 / proyecto",
    idealPara: "Lanzamientos, campañas grandes, B2B",
  },
  {
    nombre: "Consultoría de Marketing Digital",
    descripcion: "Auditoría y estrategia completa con Alexander como lead.",
    precio: "$1.200 – $3.000 / mes o proyecto",
    idealPara: "Startups, SaaS, marcas en expansión LATAM",
  },
  {
    nombre: "Talent Management (Creadores)",
    descripcion: "Matching y gestión de creadores verificados por nicho y estética.",
    precio: "Comisión 20–30% + tarifa de gestión",
    idealPara: "Agencias que necesitan volumen",
  },
] as const;

export const planesRetencion = [
  { plan: "Starter", incluye: "5 videos UGC + brief + matching + 1 revisión", precioUsd: 500 },
  {
    plan: "Growth",
    incluye: "10 videos UGC + estrategia editorial mensual + 2 revisiones + reporte",
    precioUsd: 900,
  },
  {
    plan: "Scale",
    incluye:
      "20 videos UGC + estrategia + consultoría mensual + reporte avanzado + gestión de creadores",
    precioUsd: 1500,
  },
  {
    plan: "Enterprise",
    incluye: "Volumen personalizado + white label + account manager dedicado",
    precioUsd: "desde 3000",
  },
] as const;

export const equipo = [
  {
    nombre: "Alexander Cast",
    rol: "CEO & Estratega",
    responsabilidades: "Dirección estratégica, adquisición premium, posicionamiento, alianzas",
  },
  {
    nombre: "Brian Velásquez",
    rol: "Líder Administrativo & Financiero",
    responsabilidades: "Finanzas, contratos, facturación, operaciones",
  },
  {
    nombre: "Diana Mile",
    rol: "Líder de Creadores",
    responsabilidades: "Red de creadores, onboarding, QA de producción",
  },
  {
    nombre: "Samuel",
    rol: "Líder de Tecnología",
    responsabilidades: "Kreoon, infraestructura, automatizaciones",
  },
  {
    nombre: "Tanya",
    rol: "Líder de Comunidades",
    responsabilidades: "Community management, redes, captación de creadores",
  },
] as const;

export const paletaOficial = [
  { hex: "#000000", nombre: "Negro", uso: "Fondo primario, tipografía principal" },
  { hex: "#3D3D3C", nombre: "Gris oscuro", uso: "Tipografía sobre claro, bordes" },
  { hex: "#BDBCBC", nombre: "Gris claro", uso: "Superficies, separadores, muted" },
  { hex: "#F9B334", nombre: "Amarillo", uso: "Acento + CTA único primario" },
  { hex: "#F5F5F0", nombre: "Crema boutique", uso: "Fondo claro secundario" },
  { hex: "#FFFFFF", nombre: "Blanco", uso: "Tipografía sobre oscuro" },
] as const;
