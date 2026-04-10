"use client";

import { motion } from "motion/react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQS = [
  {
    q: "¿Cuál es el modelo de pago?",
    a: "Todos los planes son con pago anticipado. Los planes mensuales (Inicio, Crecimiento, Escala) se cobran al inicio de cada periodo vía Stripe. El plan A la Medida se factura según acuerdo comercial (pago único, mensual o por hito). Aceptamos tarjeta internacional, transferencia USD/COP y facturación electrónica LATAM.",
  },
  {
    q: "¿Hay permanencia mínima?",
    a: "Por defecto operan mes a mes, sin permanencia obligatoria. Si te comprometes a un contrato mínimo de 3 meses bajamos el precio entre 8% y 15% según el plan. Contratos de 6 o 12 meses escalan el descuento. Se habla en la llamada inicial.",
  },
  {
    q: "¿Puedo cambiar de plan a mitad de mes?",
    a: "Sí. Si subes de plan (por ejemplo de Inicio a Crecimiento), el cambio es inmediato y pagas la diferencia prorrateada. Si bajas de plan, el cambio aplica al siguiente ciclo de facturación. Sin penalidades.",
  },
  {
    q: "¿Puedo cancelar cuando quiera?",
    a: "Sí. Cancelas con 30 días de aviso y no te volvemos a cobrar. Conservas todos los videos producidos hasta esa fecha, con sus derechos de publicidad pagada por 12 meses. No retenemos contenido ni hacemos clawback.",
  },
  {
    q: "¿Ofrecen garantía de devolución?",
    a: "Sí. Tienes 7 días de garantía desde el primer pago. Si durante la primera semana consideras que no encajamos con tu marca, te devolvemos el 100% del pago. Pasada esa ventana no hay reembolso, pero puedes cancelar al siguiente ciclo sin penalidad.",
  },
  {
    q: "¿En qué moneda se factura?",
    a: "Los precios publicados son en USD. Facturamos en USD para marcas fuera de Colombia (pago con tarjeta internacional o transferencia). Para marcas colombianas facturamos en COP a la TRM del día o USD a tu elección, con factura electrónica DIAN. Todos los impuestos se manejan según el país de origen.",
  },
  {
    q: "¿Qué pasa si necesito más videos un mes específico?",
    a: "En los planes mensuales puedes comprar 'extras' del mismo plan a precio unitario (por ejemplo, 5 videos extra en Crecimiento = $350 adicionales ese mes). Si necesitas un volumen mayor recurrente, conviene subir de tier. En llamada ajustamos.",
  },
  {
    q: "¿Qué incluye la licencia de publicidad de 12 meses?",
    a: "Uso comercial para medios pagados (Meta Ads, TikTok Ads, Google Ads, YouTube Ads) por 12 meses desde la entrega del video. Si necesitas derechos perpetuos, exclusividad por nicho o publicación orgánica con el handle de tu marca, se cotiza como complemento y queda en contrato.",
  },
  {
    q: "¿Puedo empezar con un paquete y escalar después?",
    a: "Sí — de hecho es lo más común. La mayoría de marcas arranca con Inicio o Crecimiento por 1-3 meses para validar que el flujo funciona con su producto, y luego escala. El histórico de briefs, creadores aprobados y aprendizaje queda dentro de la cuenta.",
  },
  {
    q: "¿Qué hace diferente al plan A la Medida?",
    a: "Equipo dedicado exclusivo, director creativo propio, SLA garantizado por contrato, entrega sin límites de variantes, integración directa con tu equipo de paid media, panel en tiempo real y arranque ejecutivo con Alexander Cast. Es para empresas con presupuesto de paid +$20K/mes que necesitan una máquina de contenido corriendo todo el año.",
  },
];

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
            Todo sobre pagos, permanencia, cambios de plan y facturación. Si
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
