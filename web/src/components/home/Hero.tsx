"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Button } from "@/components/ui/button";
import { ParticlesBg } from "@/components/home/ParticlesBg";

const STAGGER_DELAY = 0.12;

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * STAGGER_DELAY,
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

const fadeUpReduced = {
  hidden: { opacity: 0 },
  visible: () => ({
    opacity: 1,
    transition: { duration: 0.3 },
  }),
};

export function Hero() {
  const [mounted, setMounted] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => setMounted(true), []);

  const variants = shouldReduceMotion ? fadeUpReduced : fadeUp;

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      aria-label="Hero — UGC Colombia"
      className="relative min-h-[90vh] lg:min-h-[820px] flex items-center justify-center overflow-hidden bg-brand-black pt-16"
    >
      {/* Partículas — solo en desktop/tablets donde no hay impacto de performance notable */}
      <ParticlesBg />

      {/* Grid SVG pattern con radial mask */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(61,61,60,0.18) 1px, transparent 1px),
            linear-gradient(90deg, rgba(61,61,60,0.18) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
          maskImage:
            "radial-gradient(ellipse 80% 70% at 50% 50%, black 30%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 70% at 50% 50%, black 30%, transparent 100%)",
        }}
      />

      {/* Radial glow dorado central */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 60%, rgba(212,160,23,0.08) 0%, transparent 70%)",
        }}
      />

      {/* Contenido */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-16 sm:py-24 lg:py-28">
        {mounted && (
          <>
            {/* Headline */}
            <motion.h1
              custom={1}
              variants={variants}
              initial="hidden"
              animate="visible"
              className="font-display leading-none mb-6"
            >
              <span className="block text-white text-[clamp(2.4rem,8vw,8rem)] leading-[0.92]">
                HACEMOS CRECER MARCAS
              </span>
              <span
                className="block text-[clamp(1.6rem,5.5vw,5.2rem)] leading-[0.95] mt-2"
                style={{
                  background:
                    "linear-gradient(90deg, #f9b334 0%, #d4a017 50%, #f9b334 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                CON CONTENIDO QUE DE
                <br className="hidden xs:block sm:hidden" />
                {" VERDAD VENDE."}
              </span>
            </motion.h1>

            {/* Subheadline — max width reducido en mobile para evitar líneas largas */}
            <motion.p
              custom={2}
              variants={variants}
              initial="hidden"
              animate="visible"
              className="max-w-md sm:max-w-xl lg:max-w-2xl mx-auto text-brand-gray text-sm sm:text-base lg:text-lg leading-relaxed mb-10"
            >
              De 5 a 300+ videos UGC al mes, hechos por creadores latinos
              verificados, listos para Meta y TikTok en{" "}
              <span className="text-white font-semibold">7 días</span>.
              Estrategia, selección de creadores y producción bajo un mismo techo.
            </motion.p>

            {/* CTAs — full width stacked en mobile, side by side en sm+ */}
            <motion.div
              custom={3}
              variants={variants}
              initial="hidden"
              animate="visible"
              className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 px-2 sm:px-0"
            >
              <Button
                size="lg"
                onClick={() => scrollTo("contacto")}
                className="w-full sm:w-auto text-sm sm:text-base font-bold tracking-wide min-h-[52px] shadow-[0_0_28px_rgba(249,179,52,0.35)] hover:shadow-[0_0_40px_rgba(249,179,52,0.55)] focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                aria-label="Agendar llamada inicial con UGC Colombia"
              >
                AGENDA TU LLAMADA INICIAL →
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => scrollTo("muestras")}
                className="w-full sm:w-auto text-sm sm:text-base min-h-[52px] focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                aria-label="Ver muestras de videos UGC"
              >
                VER MUESTRAS DE VIDEOS
              </Button>
            </motion.div>

            {/* Trust micro-copy */}
            <motion.p
              custom={4}
              variants={variants}
              initial="hidden"
              animate="visible"
              className="mt-5 text-xs text-brand-graphite tracking-wide"
            >
              30 min · Gratis · Sin compromiso
            </motion.p>
          </>
        )}
      </div>

      {/* Gradient bottom fade */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, transparent, rgba(0,0,0,0.8))",
        }}
      />
    </section>
  );
}
