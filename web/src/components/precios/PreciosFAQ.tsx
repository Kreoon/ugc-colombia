"use client";

import { motion } from "motion/react";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { PRECIOS_FAQS } from "@/lib/data/precios-faq";

export function PreciosFAQ() {
  return (
    <section
      id="faq-precios"
      className="relative py-20 sm:py-28 lg:py-32 px-4 sm:px-6 lg:px-8 scroll-mt-20 sm:scroll-mt-24"
      aria-labelledby="faq-precios-heading"
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="flex flex-col items-start gap-4 mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="sr-only">Preguntas sobre precios</span>
          <h2
            id="faq-precios-heading"
            className="font-display text-[clamp(2.5rem,6vw,5rem)] leading-[0.95] text-white tracking-tight uppercase"
          >
            Preguntas sobre{" "}
            <span className="text-brand-yellow">precios.</span>
          </h2>
          <p className="max-w-2xl text-base sm:text-lg text-brand-gray mt-2">
            Todo sobre pagos, permanencia, cambios de plan y facturacion. Si
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
            {PRECIOS_FAQS.map((item, idx) => {
              const Icon = item.icon;
              return (
                <AccordionItem
                  key={idx}
                  value={`item-${idx}`}
                  className="border border-brand-graphite/60 rounded-xl bg-white/[0.02] hover:border-brand-gold/40 transition-colors overflow-hidden data-[state=open]:border-brand-gold/30 data-[state=open]:bg-white/[0.03]"
                >
                  <AccordionTrigger className="px-5 sm:px-6 py-4 sm:py-5 text-left hover:no-underline min-h-[52px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-inset">
                    <span className="flex items-center gap-3 text-sm sm:text-base font-semibold text-white pr-4 leading-snug">
                      <Icon
                        className="h-4 w-4 text-brand-gold/60 flex-shrink-0"
                        aria-hidden
                      />
                      {item.question}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="px-5 sm:px-6 pb-5 pt-0">
                    <p className="text-sm sm:text-base text-brand-gray leading-relaxed pl-7">
                      {item.answer}
                    </p>
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>

          {/* CTA inline */}
          <div className="mt-8 rounded-xl border border-brand-gold/25 bg-brand-yellow/[0.04] p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <p className="text-sm sm:text-base font-semibold text-white">
                Tienes otra pregunta?
              </p>
              <p className="text-xs sm:text-sm text-brand-gray mt-1">
                Agenda una llamada gratuita de 30 min y la resolvemos contigo.
              </p>
            </div>
            <Link
              href="/#contacto"
              className="flex-shrink-0 inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-brand-yellow text-black font-sans font-bold text-sm tracking-wide transition-all hover:bg-brand-gold hover:shadow-[0_8px_30px_-8px_rgba(249,179,52,0.5)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            >
              Agenda tu llamada →
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
