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
    a: "La primera tanda de videos está en tus manos en 7 días hábiles desde el kickoff. Después del primer mes operamos con batches semanales para garantizar flujo constante y testeo rápido de hooks.",
  },
  {
    q: "¿Puedo ver el perfil del creator antes de producir?",
    a: "Sí, siempre. Después del kickoff hacemos matching y te enviamos 3-5 perfiles de creadores pre-seleccionados con ficha, scoring A/B/C y videos previos del nicho. Vos aprobás antes de que grabemos un solo segundo.",
  },
  {
    q: "¿Los videos tienen derechos para paid media?",
    a: "Sí. Todos nuestros contratos incluyen derechos de uso comercial para paid media (Meta, TikTok, Google) por 12 meses. Si necesitás whitelisting, perpetual rights o exclusividad por nicho, lo cotizamos como add-on.",
  },
  {
    q: "¿Trabajan con nichos regulados (salud, finanzas, beauty)?",
    a: "Sí. Tenemos briefs compliance-ready para categorías sensibles. Cada claim se valida con el cliente antes de producir. Skincare, suplementos, fintech y seguros son parte de nuestro pool activo.",
  },
  {
    q: "¿Hay permanencia mínima en los planes?",
    a: "Mínimo 3 meses en planes recurrentes. Después queda mes a mes, cancelable con 30 días de aviso. Los proyectos únicos (producción premium, consultoría) no tienen permanencia.",
  },
  {
    q: "¿Puedo pedir reshoots si algo no me gusta?",
    a: "Sí. Incluimos 1 reshoot gratuito por video si no cumple el brief aprobado. Rondas adicionales de revisión: hasta 2 por video sin costo en planes Growth y Scale. Más allá es cotizable.",
  },
  {
    q: "¿Cómo es la comunicación durante el proyecto?",
    a: "Grupo de WhatsApp dedicado con tu account manager, Diana Mile (líder de creadores) y Alexander cuando es estratégico. Respuesta en horario hábil < 4 horas. Reportes semanales. Reunión mensual de 30 min.",
  },
  {
    q: "¿Qué los diferencia de Billo o Insense?",
    a: "Billo e Insense son marketplaces self-serve: vos hacés todo. Nosotros somos una agencia boutique con estrategia integrada, casting curado, dirección creativa y medición de performance. Mismo ticket, resultado distinto. Ideal si valorás tiempo sobre DIY.",
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
          <span className="sr-only">FAQ</span>
          <h2
            id="faq-heading"
            className="font-display text-[clamp(2.5rem,6vw,5rem)] leading-[0.95] text-white tracking-tight uppercase"
          >
            Preguntas{" "}
            <span className="text-brand-yellow">frecuentes.</span>
          </h2>
          <p className="max-w-2xl text-base sm:text-lg text-brand-gray mt-2">
            Todo lo que querés saber antes de agendar tu discovery call. Si
            falta algo,{" "}
            <a
              href="https://wa.me/573001234567"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-yellow hover:text-brand-gold underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold rounded-sm"
            >
              preguntanos por WhatsApp
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
