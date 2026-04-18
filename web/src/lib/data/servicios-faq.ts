import type { FAQItem } from "./home-faq";

export const SERVICIOS_FAQS: FAQItem[] = [
  {
    question: "¿Cuál es el modelo de pago de todos los servicios?",
    answer:
      "Todos nuestros servicios son con pago anticipado. Los servicios mensuales (UGC Ads Pack, Estrategia, Consultoría, Automatización con IA, Contenido con IA, Desarrollo Recurrente) se cobran al inicio de cada periodo con permanencia mínima de 3 meses. Los proyectos únicos (Producción Audiovisual Premium, Diseño Web, Páginas de Aterrizaje, Flujos y Sistemas de Desarrollo) se pagan 100% al arranque antes de iniciar producción. La gestión de talento opera con comisión sobre producción + tarifa de gestión, también cobrada por anticipado.",
  },
  {
    question: "¿En qué países operan y en qué idiomas entregan?",
    answer:
      "Por el momento operamos 100% desde Colombia, con red activa de creadores y equipo de desarrollo locales. Tenemos la capacidad de sumar talento en otros países de LATAM (México, Ecuador, Perú, Chile, Argentina) bajo demanda cuando el proyecto lo requiere. Servimos marcas en Colombia y el resto de LATAM. Todos los servicios se entregan en español neutro o español Colombia por defecto. El diseño web y las páginas de aterrizaje soportan varios idiomas en español.",
  },
  {
    question: "¿Qué incluye la sesión de diagnóstico inicial?",
    answer:
      "30 minutos por video llamada con Alexander o el estratega asignado. Revisamos tu marca, estado actual de contenido, ads, web y operaciones, objetivos y restricciones. Salimos con recomendación clara de qué línea(s) de servicio encajan y una propuesta inicial. Es gratis, sin compromiso y sin venta forzada.",
  },
  {
    question: "¿Cómo es la comunicación durante los proyectos?",
    answer:
      "Grupo de WhatsApp dedicado por cliente con tu coordinador de cuenta, los responsables técnicos (Diana Mile para creadores, el responsable de desarrollo para web y automatizaciones) y Alexander cuando se necesita una decisión estratégica. Respuesta en horario hábil en menos de 4 horas. Reportes semanales en proyectos recurrentes y reunión de seguimiento mensual.",
  },
  {
    question: "¿Cuánto tarda la primera entrega de videos UGC?",
    answer:
      "La primera tanda de UGC Ads Pack está en tus manos en 7 a 10 días hábiles desde la aprobación del instructivo. Después del primer mes operamos con entregas semanales para garantizar un flujo constante y prueba rápida de ganchos. Agencia de Creadores en modo marca blanca tiene los mismos acuerdos de servicio.",
  },
  {
    question: "¿Puedo ver el perfil del creador antes de producir?",
    answer:
      "Siempre. Después del arranque inicial hacemos selección curada y te enviamos 3-5 perfiles con ficha, puntuación, nicho y videos previos. Tú apruebas por escrito antes de que grabemos un solo segundo.",
  },
  {
    question: "¿Los videos tienen derechos para publicidad pagada?",
    answer:
      "Sí. Todos nuestros contratos incluyen derechos de uso comercial para medios pagados (Meta, TikTok, Google, YouTube) por 12 meses. Si necesitas derechos perpetuos, exclusividad por nicho o publicación en orgánico con el @ de tu marca, lo cotizamos como complemento.",
  },
  {
    question: "¿Puedo pedir regrabaciones si algo no me gusta?",
    answer:
      "Sí. Incluimos 1 regrabación gratuita por video si no cumple con el instructivo aprobado. Rondas adicionales de revisión: hasta 2 por video sin costo en los planes Crecimiento y Escala. Más allá es cotizable. En Producción Premium las revisiones se pactan en preproducción.",
  },
  {
    question:
      "¿Qué diferencia hay entre UGC Ads Pack y Producción Audiovisual Premium?",
    answer:
      "UGC Ads Pack es contenido grabado por creadores reales con sus teléfonos en tono conversacional — perfecto para escalar publicidad a bajo costo. Producción Audiovisual Premium son videos de venta extensos, piezas de marca y reels con equipo técnico profesional, corrección de color, sonido profesional y entrega lista para emisión. Se paga por proyecto ($1.500 a $5.000 USD · $5.990.000 a $19.900.000 COP) y tiene su propio cronograma de preproducción, rodaje y posproducción.",
  },
  {
    question: "¿Realmente usan IA en sus propios procesos?",
    answer:
      "Sí, somos una agencia centrada en IA. Construimos nuestros propios agentes de IA a medida para tareas específicas del día a día (ventas, soporte, producción, reportes) y los operamos en producción. Tenemos a KREOON, nuestra plataforma propia de IA para creación y gestión de contenido, como pieza central de nuestras herramientas. Además usamos Remotion para videos programáticos, ElevenLabs para locuciones, n8n para automatizaciones internas y modelos Claude/GPT vía API integrados a nuestro flujo diario. Las mismas herramientas y los mismos agentes que corren en nuestra operación son los que implementamos a clientes.",
  },
  {
    question:
      "¿Mi data y la de mis clientes está segura cuando usan IA?",
    answer:
      "Trabajamos con modelos para empresas (Claude, GPT vía API, modelos auto-alojados cuando aplica) con cero retención de datos. Cumplimos la Ley 1581 de Colombia para tratamiento de datos personales, firmamos acuerdo de confidencialidad por proyecto y manejamos credenciales con bóveda segura (1Password o Bitwarden). Tu información nunca se usa para entrenar modelos públicos.",
  },
  {
    question: "¿El código de las automatizaciones y el dev es mío?",
    answer:
      "100%. Te entregamos todo el código (flujos n8n exportados, repositorios Git, credenciales, variables de entorno, esquemas de Supabase, manuales de operación) en una entrega documentada. Si decides que otro equipo continúe, lo hacen sin depender de nosotros. En el plan de Desarrollo Recurrente mantenemos el acceso activo para poder dar soporte, pero la propiedad sigue siendo tuya.",
  },
  {
    question: "¿Qué pasa si un workflow falla en producción?",
    answer:
      "Si tienes Desarrollo Recurrente ($1.800 USD / $7.190.000 COP al mes): monitoreo 24/7 con alertas automáticas, tiempo de respuesta crítico menor a 2 horas en horario hábil y correcciones urgentes incluidas en las 20 horas mensuales. Si tomaste solo Flujo Único o Sistema Conectado: tienes 2 semanas de ajustes posteriores a la entrega incluidos; pasado ese plazo se cotiza como soporte por hora.",
  },
  {
    question:
      "¿Con qué tecnología construyen los sitios web y las landings?",
    answer:
      "Por defecto usamos Next.js (el framework detrás de esta misma web) desplegado en Vercel — es lo más rápido, optimizado para buscadores y escalable. Para clientes que necesitan un gestor de contenido visual ofrecemos WordPress desacoplado con Next.js en el lado visual. Para páginas de aterrizaje de alto rendimiento usamos Next.js + Vercel Analytics + seguimiento desde servidor. Si ya tienes otra tecnología (Webflow, Framer, Shopify), evaluamos en el diagnóstico cuál es la mejor ruta.",
  },
  {
    question:
      "¿Incluyen hosting, dominio y mantenimiento del sitio web?",
    answer:
      "El alojamiento en Vercel está incluido en el primer año para los niveles Pro y Premium. El dominio lo compras tú a tu nombre (~$15 USD / ~$59.000 COP al año en Namecheap o Cloudflare) y nosotros lo configuramos. Mantenimiento: el nivel Premium incluye 2 meses de soporte después del lanzamiento; luego ofrecemos un plan de mantenimiento web recurrente desde $250 USD / $990.000 COP al mes (actualizaciones, monitoreo, mejoras menores).",
  },
  {
    question: "¿Qué seguimiento ponen en las páginas de aterrizaje?",
    answer:
      "Todas las páginas de aterrizaje de los niveles Rendimiento y Premium incluyen: Meta Pixel, GA4, Google Tag Manager y seguimiento desde servidor vía la API de conversiones de Meta. Eventos de conversión personalizados por acción (prospecto, compra, desplazamiento, tiempo). En Premium añadimos mapas de calor con Hotjar o Microsoft Clarity y Vercel Analytics. Todo entregado con documentación para que tu equipo de medios lo use.",
  },
  {
    question:
      "¿Qué incluye la Consultoría de Marketing Digital con Alexander?",
    answer:
      "Auditoría completa de embudos de venta, publicidad pagada y posicionamiento + plan estratégico a 90 días + sesiones mensuales de seguimiento. En cada sesión revisamos métricas, ajustamos el plan y priorizamos las siguientes acciones. El formato es $1.200 a $3.000 USD / $4.790.000 a $11.990.000 COP al mes dependiendo de la complejidad del negocio y la cantidad de horas mensuales con el estratega principal.",
  },
  {
    question:
      "¿Hay permanencia mínima? ¿Puedo negociar un mejor precio?",
    answer:
      "Por defecto todos los servicios operan mes a mes o por entregable, sin permanencia obligatoria — pagas lo que usas. Pero sí hacemos negociaciones: si te comprometes a un contrato mínimo de 3 meses te bajamos el precio (entre 8% y 15% según el servicio y el volumen), y en contratos de 6 o 12 meses el descuento es aún mayor. Esto aplica tanto a los servicios mensuales (UGC Ads Pack, Estrategia, Consultoría, IA, Contenido IA, Desarrollo Recurrente) como a paquetes combinados de varios entregables. Si tu negocio ya validó el modelo y quieres asegurar el precio, conviene hablarlo en el diagnóstico inicial.",
  },
];
