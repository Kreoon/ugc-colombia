"use client";

import { motion } from "motion/react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type FAQItem = {
  q: string;
  a: string;
};

const FAQS: FAQItem[] = [
  {
    q: "¿Cuánto tardan en entregar?",
    a: "La primera tanda de videos está en tus manos en 7 días hábiles desde el arranque inicial. Después del primer mes operamos con entregas semanales para garantizar un flujo constante y experimentación rápida con los ganchos.",
  },
  {
    q: "¿Puedo ver el perfil del creador antes de producir?",
    a: "Sí, siempre. Después del arranque inicial hacemos selección y te enviamos 3-5 perfiles de creadores pre-seleccionados con ficha, puntuación y videos previos del nicho. Tú apruebas antes de que grabemos un solo segundo.",
  },
  {
    q: "¿Los videos tienen derechos para publicidad pagada?",
    a: "Sí. Todos nuestros contratos incluyen derechos de uso comercial para medios pagados (Meta, TikTok, Google) por 12 meses. Si necesitas publicación con tu marca, derechos perpetuos o exclusividad por nicho, lo cotizamos como complemento.",
  },
  {
    q: "¿Trabajan con nichos regulados (salud, finanzas, belleza)?",
    a: "Sí. Tenemos instrucciones listas para categorías sensibles. Cada afirmación se valida con el cliente antes de producir. Skincare, suplementos, fintech y seguros son parte de nuestra red activa.",
  },
  {
    q: "¿Hay permanencia mínima en los planes?",
    a: "Mínimo 3 meses en planes recurrentes. Después queda mes a mes, cancelable con 30 días de aviso. Los proyectos únicos (producción premium, consultoría) no tienen permanencia.",
  },
  {
    q: "¿Puedo pedir regrabaciones si algo no me gusta?",
    a: "Sí. Incluimos 1 regrabación gratuita por video si no cumple las instrucciones aprobadas. Rondas adicionales de revisión: hasta 2 por video sin costo en los planes Crecimiento y Escala. Más allá es cotizable.",
  },
  {
    q: "¿Cómo es la comunicación durante el proyecto?",
    a: "Grupo de WhatsApp dedicado con tu asesora de cuenta, Diana Mile (líder de creadores) y Alexander cuando es estratégico. Respuesta en horario hábil en menos de 4 horas. Reportes semanales. Reunión mensual de 30 min.",
  },
  {
    q: "¿Qué los diferencia de Billo o Insense?",
    a: "Billo e Insense son plataformas de autogestión: tú haces todo. Nosotros somos una agencia boutique con estrategia integrada, selección curada de creadores, dirección creativa y medición de resultados. Mismo precio, resultado diferente. Ideal si valoras tu tiempo.",
  },
];

export function FAQ() {
  return (
    <section
      id="faq"
      className="relative py-20 sm:py-28 lg:py-32 px-4 sm:px-6 lg:px-8 scroll-mt-20 sm:scroll-mt-24"
      aria-labelledby="faq-heading"
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
            id="faq-heading"
            className="font-display text-[clamp(2.5rem,6vw,5rem)] leading-[0.95] text-white tracking-tight uppercase"
          >
            Preguntas{" "}
            <span className="text-brand-yellow">frecuentes.</span>
          </h2>
          <p className="max-w-2xl text-base sm:text-lg text-brand-gray mt-2">
            Todo lo que quieres saber antes de agendar tu llamada inicial. Si
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
                  <p className="text-sm sm:text-base text-brand-gray leading-relaxed">
                    {item.a}
                  </p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
