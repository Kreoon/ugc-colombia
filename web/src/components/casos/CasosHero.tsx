"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { Button } from "@/components/ui/button";
import { useAudit } from "@/components/lead-audit/AuditContext";

const STAGGER = 0.12;
const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * STAGGER, duration: 0.65, ease: [0.22, 1, 0.36, 1] as const },
  }),
};
const fadeUpReduced = {
  hidden: { opacity: 0 },
  visible: () => ({ opacity: 1, transition: { duration: 0.3 } }),
};

export function CasosHero() {
  const reduced = useReducedMotion();
  const variants = reduced ? fadeUpReduced : fadeUp;
  const { openAudit } = useAudit();

  return (
    <section
      aria-label="Casos — UGC Colombia"
      className="relative min-h-[90vh] lg:min-h-[820px] flex items-center justify-center overflow-hidden bg-brand-black pt-16"
    >
      {/* Imagen editorial de fondo */}
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <Image
          src="/brand/casos-page/hero.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-black/75 via-brand-black/65 to-brand-black" />
      </div>

      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(61,61,60,0.18) 1px, transparent 1px),
            linear-gradient(90deg, rgba(61,61,60,0.18) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
          maskImage: "radial-gradient(ellipse 80% 70% at 50% 50%, black 30%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 70% at 50% 50%, black 30%, transparent 100%)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 60%, rgba(212,160,23,0.08) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-16 sm:py-20">
        <motion.span
          custom={0}
          variants={variants}
          initial="hidden"
          animate="visible"
          className="inline-block px-3 py-1 rounded-full text-[11px] font-sans font-bold tracking-widest uppercase mb-6 bg-brand-yellow/15 text-brand-yellow border border-brand-yellow/40"
        >
          Por qué nos contratan
        </motion.span>

        <motion.h1
          custom={1}
          variants={variants}
          initial="hidden"
          animate="visible"
          className="font-display leading-none mb-6"
        >
          <span className="block text-white text-[clamp(2.4rem,8vw,8rem)] leading-[0.92]">
            CREAR CONTENIDO
          </span>
          <span
            className="block text-[clamp(1.6rem,5.5vw,5.2rem)] leading-[0.95] mt-2"
            style={{
              background: "linear-gradient(90deg, #f9b334 0%, #d4a017 50%, #f9b334 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            NO DEBERÍA DOLER TANTO.
          </span>
        </motion.h1>

        <motion.p
          custom={2}
          variants={variants}
          initial="hidden"
          animate="visible"
          className="max-w-2xl mx-auto text-brand-gray text-base sm:text-lg leading-relaxed mb-10"
        >
          Cada semana decides qué grabar, contratas creadores que desaparecen,
          ruegas por revisiones, mides resultados sin saber qué falla y vuelves
          a empezar. Esta página es para ti — para que dejes de hacer todo eso solo.
        </motion.p>

        <motion.div
          custom={3}
          variants={variants}
          initial="hidden"
          animate="visible"
        >
          <Button
            size="lg"
            className="font-bold tracking-wide min-h-[52px] shadow-[0_0_28px_rgba(249,179,52,0.35)] hover:shadow-[0_0_40px_rgba(249,179,52,0.55)]"
            onClick={openAudit}
          >
            AGENDAR DIAGNÓSTICO GRATIS →
          </Button>
        </motion.div>

        <motion.p
          custom={4}
          variants={variants}
          initial="hidden"
          animate="visible"
          className="mt-5 text-xs text-brand-graphite tracking-wide"
        >
          30 min · Gratis · Sin compromiso
        </motion.p>
      </div>
    </section>
  );
}
