"use client";

import { motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Users } from "lucide-react";
import { ClientLogoBar } from "./ClientLogoBar";

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.12,
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
};
const fadeUpReduced = {
  hidden: { opacity: 0 },
  visible: () => ({ opacity: 1, transition: { duration: 0.3 } }),
};

const STATS = [
  { value: "133+", label: "marcas" },
  { value: "4.2x", label: "ROAS promedio" },
  { value: "2,000+", label: "videos entregados" },
];

export function PreciosHero() {
  const reduced = useReducedMotion();
  const variants = reduced ? fadeUpReduced : fadeUp;

  return (
    <section
      aria-label="Precios — UGC Colombia"
      className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-brand-black pt-24"
    >
      {/* Grid SVG de fondo */}
      <div
        aria-hidden
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
      {/* Glow dorado */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 55%, rgba(212,160,23,0.12) 0%, transparent 70%)",
        }}
      />
      {/* Grain texture overlay */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "128px 128px",
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-16 sm:py-20">
        {/* Badge de urgencia */}
        <motion.div
          custom={0}
          variants={variants}
          initial="hidden"
          animate="visible"
          className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full border border-brand-gold/30 bg-brand-yellow/[0.06]"
        >
          <Users className="h-3.5 w-3.5 text-brand-yellow" aria-hidden />
          <span className="text-[11px] sm:text-xs font-sans font-semibold text-brand-yellow tracking-wide">
            Solo 3 espacios disponibles en Abril
          </span>
        </motion.div>

        {/* Titulo */}
        <motion.h1
          custom={1}
          variants={variants}
          initial="hidden"
          animate="visible"
          className="font-display leading-none mb-6"
        >
          <span className="block text-white text-[clamp(2.4rem,7vw,6rem)] leading-[0.92] uppercase">
            Invierte una vez.
          </span>
          <span
            className="block text-[clamp(1.6rem,5vw,4.5rem)] leading-[0.95] mt-2 uppercase"
            style={{
              background:
                "linear-gradient(90deg, #f9b334 0%, #d4a017 50%, #f9b334 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Vende durante meses.
          </span>
        </motion.h1>

        {/* Subtitulo */}
        <motion.p
          custom={2}
          variants={variants}
          initial="hidden"
          animate="visible"
          className="max-w-2xl mx-auto text-brand-gray text-base sm:text-lg leading-relaxed mb-10"
        >
          Cuatro paquetes disenados por etapa de negocio. Precios claros, sin
          letra pequena y con{" "}
          <span className="text-white font-semibold">
            licencia de publicidad por 12 meses incluida
          </span>
          . Escoge el que calce con tu presupuesto hoy — el resto lo ajustamos
          contigo.
        </motion.p>

        {/* CTAs */}
        <motion.div
          custom={3}
          variants={variants}
          initial="hidden"
          animate="visible"
          className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 px-2 sm:px-0"
        >
          <Button
            asChild
            size="lg"
            className="w-full sm:w-auto text-sm sm:text-base font-bold tracking-wide min-h-[52px] shadow-[0_0_28px_rgba(249,179,52,0.35)] hover:shadow-[0_0_40px_rgba(249,179,52,0.55)]"
          >
            <a href="#planes">VER LOS 4 PAQUETES →</a>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="w-full sm:w-auto text-sm sm:text-base min-h-[52px]"
          >
            <Link href="/#contacto">AGENDA TU DIAGNOSTICO</Link>
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

        {/* Stat ribbon */}
        <motion.div
          custom={5}
          variants={variants}
          initial="hidden"
          animate="visible"
          className="mt-10 flex flex-wrap items-center justify-center gap-6 sm:gap-10"
        >
          {STATS.map((stat, i) => (
            <div key={i} className="flex items-baseline gap-2">
              <span
                className="font-display text-2xl sm:text-3xl"
                style={{
                  background:
                    "linear-gradient(135deg, #f9b334 0%, #d4a017 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {stat.value}
              </span>
              <span className="text-xs sm:text-sm text-brand-gray">
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>

        {/* Logo bar clientes */}
        <motion.div
          custom={6}
          variants={variants}
          initial="hidden"
          animate="visible"
          className="mt-12"
        >
          <ClientLogoBar />
        </motion.div>
      </div>
    </section>
  );
}
