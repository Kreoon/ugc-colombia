"use client";

import { motion } from "motion/react";

export function PorEsoExistimos() {
  return (
    <section
      aria-labelledby="por-eso-heading"
      className="relative py-20 sm:py-28 lg:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none -z-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(212,160,23,0.08) 0%, transparent 70%)",
        }}
      />
      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="inline-block px-3 py-1 rounded-full text-[11px] font-sans font-bold tracking-widest uppercase mb-5 bg-brand-yellow/15 text-brand-yellow border border-brand-yellow/40">
            Por eso existimos
          </span>
          <h2
            id="por-eso-heading"
            className="font-display text-[clamp(2.5rem,6vw,5rem)] leading-[0.95] text-white tracking-tight uppercase mb-6"
          >
            Tú haces la marca. <br className="hidden sm:block" />
            <span className="text-brand-yellow">Nosotros hacemos el contenido.</span>
          </h2>
          <p className="text-base sm:text-lg text-brand-gray leading-relaxed mb-10 max-w-2xl mx-auto">
            UGC Colombia nació para sacarte de ese ciclo. Estrategia, creadores, producción,
            resultados y automatización con IA — todo con un solo equipo, que entiende que
            el contenido es operación, no improvisación.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
