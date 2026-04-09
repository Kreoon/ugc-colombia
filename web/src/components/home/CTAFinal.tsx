"use client";

import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";

export function CTAFinal() {
  return (
    <section
      id="cta"
      className="relative py-24 sm:py-32 lg:py-40 px-4 sm:px-6 lg:px-8"
      aria-labelledby="cta-heading"
    >
      <motion.div
        className="relative max-w-6xl mx-auto rounded-3xl overflow-hidden"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Background layers */}
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #0a0a0a 100%)",
          }}
        />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 30% 20%, rgba(249,179,52,0.25) 0%, transparent 50%), radial-gradient(ellipse 70% 50% at 80% 80%, rgba(212,160,23,0.2) 0%, transparent 55%)",
          }}
        />

        {/* Gradient border */}
        <div
          aria-hidden
          className="absolute inset-0 rounded-3xl pointer-events-none"
          style={{
            padding: "2px",
            background:
              "linear-gradient(135deg, rgba(249,179,52,0.7), rgba(212,160,23,0.4) 40%, rgba(212,160,23,0.15) 70%, transparent 100%)",
            WebkitMask:
              "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
          }}
        />

        {/* Noise grid pattern */}
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
            maskImage:
              "radial-gradient(ellipse at center, black 20%, transparent 70%)",
          }}
        />

        {/* Content */}
        <div className="relative px-8 sm:px-16 lg:px-24 py-20 sm:py-24 lg:py-32">
          <div className="flex flex-col items-start gap-8 max-w-4xl">
            {/* Badge */}
            <motion.span
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-yellow/10 border border-brand-yellow/30 text-xs font-semibold text-brand-yellow tracking-[0.2em] uppercase"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-brand-yellow animate-pulse" />
              Cupos limitados este mes
            </motion.span>

            {/* Headline */}
            <motion.h2
              id="cta-heading"
              className="font-display text-[clamp(2.5rem,8vw,6.5rem)] leading-[0.9] text-white tracking-tight uppercase"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.7 }}
            >
              Dejá de perseguir
              <br />
              <span className="text-brand-yellow">creators por DM.</span>
            </motion.h2>

            {/* Subheadline */}
            <motion.p
              className="max-w-2xl text-lg sm:text-xl text-brand-gray leading-relaxed"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              Escalá tu contenido con un equipo que ya lo hizo cientos de veces.
              Estrategia, casting y producción bajo un solo techo.
            </motion.p>

            {/* CTA Button */}
            <motion.div
              className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mt-2"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <motion.a
                href="#discovery-call"
                className="group relative inline-flex items-center gap-3 px-8 py-5 rounded-xl bg-brand-yellow text-brand-black font-semibold text-base sm:text-lg tracking-wide overflow-hidden"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                style={{
                  boxShadow:
                    "0 10px 40px -10px rgba(249,179,52,0.5), 0 0 80px -20px rgba(212,160,23,0.4)",
                }}
              >
                <span className="relative z-10">AGENDAR DISCOVERY CALL</span>
                <ArrowRight
                  className="relative z-10 w-5 h-5 transition-transform group-hover:translate-x-1"
                  aria-hidden
                />
                {/* Shine effect */}
                <span
                  aria-hidden
                  className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-out"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)",
                  }}
                />
              </motion.a>

              <div className="flex items-center gap-3 text-sm text-brand-gray">
                <span className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  30 min
                </span>
                <span className="w-1 h-1 rounded-full bg-brand-graphite" />
                <span>Gratis</span>
                <span className="w-1 h-1 rounded-full bg-brand-graphite" />
                <span>Sin compromiso</span>
              </div>
            </motion.div>

            {/* Trust line */}
            <motion.p
              className="text-sm text-brand-gray/60 mt-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7, duration: 0.6 }}
            >
              Garantía de 14 días: si el primer batch no cumple el brief,
              devolvemos el mes completo.
            </motion.p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
