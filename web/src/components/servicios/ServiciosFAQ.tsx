"use client";

import { motion } from "motion/react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQS = [
  // ─── Generales ─────────────────────────────────────────────
  {
    q: "¿Cuál es el modelo de pago de todos los servicios?",
    a: "Todos nuestros servicios son con pago anticipado. Los servicios mensuales (UGC Ads Pack, Estrategia, Consultoría, Automatización con IA, Contenido con IA, Retainer Dev) se cobran al inicio de cada periodo con permanencia mínima de 3 meses. Los proyectos únicos (Producción Audiovisual Premium, Diseño Web, Landing Pages, Flujos y Sistemas de Dev) se pagan 100% al arranque antes de iniciar producción. Talent Management opera con comisión sobre producción + tarifa de gestión, también cobrada por anticipado.",
  },
  {
    q: "¿En qué países operan y en qué idiomas entregan?",
    a: "Por el momento operamos 100% desde Colombia, con red activa de creadores y dev team locales. Tenemos la capacidad de escalar a talento en otros países de LATAM (México, Ecuador, Perú, Chile, Argentina) bajo demanda cuando el proyecto lo requiere. Servimos marcas en Colombia, resto de LATAM y USA Hispanic. Todos los servicios se entregan en español neutro o español Colombia por defecto, e inglés bajo solicitud. Diseño web y landings soportan multi-idioma ES/EN.",
  },
  {
    q: "¿Qué incluye la sesión de diagnóstico inicial?",
    a: "30 minutos por video llamada con Alexander o el estratega asignado. Revisamos tu marca, estado actual de contenido, ads, web y operaciones, objetivos y restricciones. Salimos con recomendación clara de qué línea(s) de servicio encajan y una propuesta inicial. Es gratis, sin compromiso y sin venta forzada.",
  },
  {
    q: "¿Cómo es la comunicación durante los proyectos?",
    a: "Grupo de WhatsApp dedicado por cliente con tu asesora de cuenta, los leads técnicos (Diana Mile para creadores, el dev lead para web y automatizaciones) y Alexander cuando es estratégico. Respuesta en horario hábil en menos de 4 horas. Reportes semanales en proyectos recurrentes y reunión de seguimiento mensual.",
  },

  // ─── UGC Ads Pack · Estrategia · Creadores ────────────────
  {
    q: "¿Cuánto tarda la primera entrega de videos UGC?",
    a: "La primera tanda de UGC Ads Pack está en tus manos en 7-10 días hábiles desde la aprobación del brief. Después del primer mes operamos con entregas semanales para garantizar un flujo constante y experimentación rápida con los ganchos. Agencia de Creadores en modo white-label tiene el mismo SLA.",
  },
  {
    q: "¿Puedo ver el perfil del creador antes de producir?",
    a: "Siempre. Después del arranque inicial hacemos selección curada y te enviamos 3-5 perfiles con ficha, puntuación, nicho y videos previos. Tú apruebas por escrito antes de que grabemos un solo segundo.",
  },
  {
    q: "¿Los videos tienen derechos para publicidad pagada?",
    a: "Sí. Todos nuestros contratos incluyen derechos de uso comercial para medios pagados (Meta, TikTok, Google, YouTube) por 12 meses. Si necesitas derechos perpetuos, exclusividad por nicho o publicación en orgánico con el @ de tu marca, lo cotizamos como complemento.",
  },
  {
    q: "¿Puedo pedir regrabaciones si algo no me gusta?",
    a: "Sí. Incluimos 1 regrabación gratuita por video si no cumple el brief aprobado. Rondas adicionales de revisión: hasta 2 por video sin costo en los planes Crecimiento y Escala. Más allá es cotizable. En Producción Premium las revisiones se pactan en pre-producción.",
  },

  // ─── Producción Audiovisual ────────────────────────────────
  {
    q: "¿Qué diferencia hay entre UGC Ads Pack y Producción Audiovisual Premium?",
    a: "UGC Ads Pack es contenido generado por creadores reales grabado con sus teléfonos en tono conversacional — perfecto para escalar ads a bajo costo. Producción Audiovisual Premium es VSL, brand films y reels con equipo técnico profesional, color grading, sonido pro y entrega broadcast-ready. Se paga por proyecto ($1.500 – $5.000 USD) y tiene su propio timeline de pre-producción, rodaje y post.",
  },

  // ─── IA y Dev ──────────────────────────────────────────────
  {
    q: "¿Realmente usan IA en sus propios procesos?",
    a: "Sí, somos una agencia AI-first. Construimos nuestros propios agentes de IA a medida para tareas específicas del día a día (ventas, soporte, producción, reporting) y los operamos en producción. Tenemos a KREOON, nuestra plataforma propia de IA para creación y gestión de contenido, como pieza central del stack. Además usamos Remotion para videos programáticos, ElevenLabs para voiceovers, n8n para automatizaciones internas y modelos Claude/GPT vía API integrados a nuestro flujo diario. La misma stack y los mismos agentes que corren en nuestra operación son los que implementamos a clientes.",
  },
  {
    q: "¿Mi data y la de mis clientes está segura cuando usan IA?",
    a: "Trabajamos con modelos enterprise (Claude, GPT vía API, modelos auto-hospedados cuando aplica) con cero retención de datos. Cumplimos Ley 1581 de Colombia para tratamiento de datos personales, firmamos NDA por proyecto y manejamos credenciales con vault (1Password o Bitwarden). Tu información nunca se usa para entrenar modelos públicos.",
  },
  {
    q: "¿El código de las automatizaciones y el dev es mío?",
    a: "100%. Te entregamos todo el código (workflows n8n exportados, repos Git, credenciales, variables de entorno, schemas de Supabase, runbooks) en un handoff documentado. Si decides que otro equipo continúe, lo hacen sin depender de nosotros. En el Retainer Dev mantenemos el acceso activo para poder dar soporte, pero la propiedad sigue siendo tuya.",
  },
  {
    q: "¿Qué pasa si un workflow falla en producción?",
    a: "Si tienes Retainer Dev ($1.800/mes): monitoreo 24/7 con alertas automáticas, tiempo de respuesta crítico < 2h en horario hábil y hot-fixes incluidos en las 20h mensuales. Si tomaste solo Flujo Único o Sistema Conectado: tienes 2 semanas de ajustes post-entrega incluidos; pasado ese plazo se cotiza como soporte por hora.",
  },

  // ─── Web y Landing ─────────────────────────────────────────
  {
    q: "¿Con qué tecnología construyen los sitios web y las landings?",
    a: "Por defecto usamos Next.js (el framework detrás de esta misma web) desplegado en Vercel — es lo más rápido, SEO-friendly y escalable. Para clientes que necesitan un CMS visual ofrecemos WordPress headless con Next.js en el frontend. Para landings de performance puro usamos Next.js + Vercel Analytics + tracking server-side. Si tu stack ya es otro (Webflow, Framer, Shopify), evaluamos en el diagnóstico cuál es la mejor ruta.",
  },
  {
    q: "¿Incluyen hosting, dominio y mantenimiento del sitio web?",
    a: "Hosting en Vercel está incluido en el primer año para los tiers Pro y Premium. El dominio lo compras tú a tu nombre (~$15 USD/año en Namecheap o Cloudflare) y nosotros lo configuramos. Mantenimiento: el tier Premium incluye 2 meses de soporte post-lanzamiento; después ofrecemos un retainer de mantenimiento web desde $250 USD/mes (actualizaciones, monitoreo, mejoras menores).",
  },
  {
    q: "¿Qué tracking ponen en las landing pages?",
    a: "Todas las landings Performance y Premium incluyen: Meta Pixel, GA4, Google Tag Manager y tracking server-side vía Conversions API para Meta. Eventos de conversión personalizados por acción (lead, purchase, scroll, tiempo). En Premium añadimos heatmaps con Hotjar o Microsoft Clarity y Vercel Analytics. Todo entregado con documentación para que tu equipo de media lo use.",
  },

  // ─── Consultoría y permanencia ─────────────────────────────
  {
    q: "¿Qué incluye la Consultoría de Marketing Digital con Alexander?",
    a: "Auditoría completa de funnels, paid media y posicionamiento + plan estratégico a 90 días + sesiones mensuales de seguimiento. En cada sesión revisamos métricas, ajustamos plan y priorizamos las siguientes acciones. El formato es $1.200 – $3.000 USD/mes dependiendo de la complejidad del negocio y la cantidad de horas mensuales con el estratega principal.",
  },
  {
    q: "¿Hay permanencia mínima? ¿Puedo negociar un mejor precio?",
    a: "Por defecto todos los servicios operan mes a mes o por entregable, sin permanencia obligatoria — pagas lo que usas. Pero sí hacemos negociaciones: si te comprometes a un contrato mínimo de 3 meses te bajamos el precio (entre 8% y 15% según el servicio y el volumen), y en contratos de 6 o 12 meses el descuento escala más. Esto aplica tanto a los servicios mensuales (UGC Ads Pack, Estrategia, Consultoría, IA, Contenido IA, Retainer Dev) como a paquetes combinados de varios entregables. Si tu negocio ya validó el modelo y quieres amarrar el precio, conviene hablarlo en el diagnóstico inicial.",
  },
];

export function ServiciosFAQ() {
  return (
    <section
      id="faq-servicios"
      className="relative py-20 sm:py-28 lg:py-32 px-4 sm:px-6 lg:px-8 scroll-mt-20 sm:scroll-mt-24"
      aria-labelledby="faq-servicios-heading"
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="flex flex-col items-start gap-4 mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="inline-block px-3 py-1 rounded-full text-[11px] font-sans font-bold tracking-widest uppercase mb-5 bg-brand-yellow/15 text-brand-yellow border border-brand-yellow/40">
            Preguntas frecuentes
          </span>
          <h2
            id="faq-servicios-heading"
            className="font-display text-[clamp(2.5rem,6vw,5rem)] leading-[0.95] text-white tracking-tight uppercase"
          >
            Preguntas sobre{" "}
            <span className="text-brand-yellow">servicios.</span>
          </h2>
          <p className="max-w-2xl text-base sm:text-lg text-brand-gray mt-2">
            Todo lo que quieres saber antes de elegir una línea de servicio. Si
            falta algo,{" "}
            <a
              href="https://wa.me/573001234567"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-yellow hover:text-brand-gold underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold rounded-sm"
            >
              pregúntanos por WhatsApp
            </a>
            .
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          <Accordion type="single" collapsible className="flex flex-col gap-3">
            {FAQS.map((item, idx) => (
              <AccordionItem
                key={idx}
                value={`item-${idx}`}
                className="border border-brand-graphite/60 rounded-xl bg-white/[0.02] hover:border-brand-gold/40 transition-colors overflow-hidden"
              >
                <AccordionTrigger className="px-5 sm:px-6 py-4 sm:py-5 text-left hover:no-underline min-h-[52px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-inset">
                  <span className="text-sm sm:text-base font-semibold text-white pr-4 leading-snug">
                    {item.q}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="px-5 sm:px-6 pb-5 pt-0">
                  <p className="text-sm sm:text-base text-brand-gray leading-relaxed">{item.a}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
