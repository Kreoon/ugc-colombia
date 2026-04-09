"use client";

import { motion } from "motion/react";
import { Play, Quote } from "lucide-react";

type Testimonial = {
  id: string;
  name: string;
  role: string;
  brand: string;
  quote: string;
  tag: string;
};

const PLACEHOLDER_TESTIMONIOS: Testimonial[] = [
  {
    id: "t1",
    name: "Próximamente",
    role: "CEO & Founder",
    brand: "Skincare LATAM",
    quote: "Pasamos de 1.2x a 3.8x ROAS en 60 días sin aumentar el presupuesto.",
    tag: "Skincare Premium",
  },
  {
    id: "t2",
    name: "Próximamente",
    role: "Growth Lead",
    brand: "DTC Fitness",
    quote: "El primer batch superó lo que 3 freelancers nos entregaron en 2 meses.",
    tag: "Fitness DTC",
  },
  {
    id: "t3",
    name: "Próximamente",
    role: "Head of Marketing",
    brand: "SaaS B2B",
    quote: "Bajamos el CPA un 55% con los primeros 10 videos UGC.",
    tag: "SaaS B2B",
  },
];

export function VideoTestimonios() {
  return (
    <section
      id="testimonios"
      className="relative py-24 sm:py-32 lg:py-40 px-4 sm:px-6 lg:px-8 overflow-hidden"
      aria-labelledby="testimonios-heading"
    >
      {/* Glow de fondo dorado sutil */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 80% 40% at center top, rgba(212,160,23,0.07) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="flex flex-col items-start gap-4 mb-16 sm:mb-20"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="sr-only">Testimonios</span>
          <h2
            id="testimonios-heading"
            className="font-display text-[clamp(2.5rem,6vw,5rem)] leading-[0.95] text-white tracking-tight uppercase"
          >
            Lo que dicen <br />
            <span className="text-brand-yellow">nuestros clientes.</span>
          </h2>
          <p className="max-w-2xl text-base sm:text-lg text-brand-gray mt-2">
            Videos testimonios de marcas reales que ya escalaron con UGC Colombia.
            Muy pronto disponibles.
          </p>
        </motion.div>

        {/* Grid de 3 cards testimonio vertical 9:16 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {PLACEHOLDER_TESTIMONIOS.map((t, idx) => (
            <motion.article
              key={t.id}
              className="group relative rounded-2xl overflow-hidden cursor-pointer"
              style={{ aspectRatio: "9 / 16" }}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.7,
                delay: idx * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{ y: -6 }}
            >
              {/* Gradient background */}
              <div
                aria-hidden
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, #1a1a1a 0%, #0a0a0a 100%)",
                }}
              />
              <div
                aria-hidden
                className="absolute inset-0 opacity-60"
                style={{
                  background:
                    "radial-gradient(ellipse at center top, rgba(212,160,23,0.25) 0%, transparent 60%)",
                }}
              />

              {/* Border gradient */}
              <div
                aria-hidden
                className="absolute inset-0 rounded-2xl pointer-events-none"
                style={{
                  padding: "1px",
                  background:
                    "linear-gradient(135deg, rgba(249,179,52,0.4), rgba(212,160,23,0.15) 50%, transparent 100%)",
                  WebkitMask:
                    "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                  WebkitMaskComposite: "xor",
                  maskComposite: "exclude",
                }}
              />

              {/* Content */}
              <div className="relative h-full flex flex-col justify-between p-6 sm:p-7">
                {/* Top — badge */}
                <div className="flex items-start justify-between">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-yellow/10 border border-brand-yellow/30 text-[10px] font-semibold text-brand-yellow tracking-wider uppercase">
                    {t.tag}
                  </span>
                  <span className="text-[10px] font-semibold text-brand-gold/60 tracking-wider uppercase">
                    Próximamente
                  </span>
                </div>

                {/* Middle — play button + quote */}
                <div className="flex flex-col items-center justify-center gap-6 my-auto">
                  <motion.div
                    className="relative w-20 h-20 rounded-full flex items-center justify-center bg-brand-yellow/10 border border-brand-yellow/40 backdrop-blur-sm group-hover:bg-brand-yellow/20 group-hover:border-brand-yellow/60 transition-colors"
                    whileHover={{ scale: 1.08 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <Play
                      className="w-7 h-7 text-brand-yellow fill-brand-yellow ml-1"
                      aria-hidden
                    />
                    {/* Pulse ring */}
                    <span
                      aria-hidden
                      className="absolute inset-0 rounded-full border border-brand-yellow/30 animate-ping"
                      style={{ animationDuration: "2.5s" }}
                    />
                  </motion.div>

                  <div className="text-center">
                    <Quote
                      className="w-6 h-6 text-brand-gold/60 mx-auto mb-3"
                      aria-hidden
                    />
                    <p className="text-sm sm:text-base text-white/85 leading-relaxed italic line-clamp-4">
                      &ldquo;{t.quote}&rdquo;
                    </p>
                  </div>
                </div>

                {/* Bottom — autor */}
                <div className="flex items-center gap-3">
                  <div className="relative w-11 h-11 rounded-full overflow-hidden bg-gradient-to-br from-brand-yellow/30 to-brand-graphite flex items-center justify-center border border-brand-gold/40">
                    <span className="font-display text-base text-brand-yellow">
                      {t.name.charAt(0)}
                    </span>
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-white truncate">
                      {t.name}
                    </p>
                    <p className="text-xs text-brand-gray truncate">
                      {t.role} · {t.brand}
                    </p>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Footer note */}
        <motion.p
          className="text-center text-sm text-brand-gray/60 mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          ¿Ya eres cliente y quieres compartir tu historia?{" "}
          <a
            href="#contacto"
            className="text-brand-yellow hover:text-brand-gold underline underline-offset-4 transition-colors"
          >
            Cuéntanos →
          </a>
        </motion.p>
      </div>
    </section>
  );
}
