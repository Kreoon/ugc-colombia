"use client";

import { motion } from "motion/react";
import { useIntersection } from "@/hooks/use-intersection";

const PROBLEMAS = [
  {
    num: "01",
    text: "Contrataste 3 creators por DM y ninguno entregó a tiempo.",
  },
  {
    num: "02",
    text: "Tu CPA en Meta subió 40% y los ads con modelos de stock ya no convierten.",
  },
  {
    num: "03",
    text: "Tu equipo interno grabó contenido pero parece ad, no UGC real.",
  },
  {
    num: "04",
    text: "Pagaste una plataforma gringa y los videos suenan 'traducidos del inglés'.",
  },
] as const;

export function Problema() {
  const { ref, isIntersecting } = useIntersection<HTMLDivElement>({
    threshold: 0.1,
  });

  return (
    <section
      id="problema"
      aria-labelledby="problema-title"
      className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-brand-black overflow-hidden"
    >
      {/* Noise texture overlay sutil */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "128px 128px",
        }}
      />

      <div className="max-w-6xl mx-auto" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isIntersecting ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12 sm:mb-16"
        >
          <p className="text-brand-gold text-sm font-sans font-semibold tracking-widest uppercase mb-3">
            El problema
          </p>
          <h2
            id="problema-title"
            className="font-display text-4xl sm:text-5xl lg:text-6xl text-white leading-tight"
          >
            ¿Te suena familiar?
          </h2>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
          {PROBLEMAS.map((item, i) => (
            <motion.div
              key={item.num}
              initial={{ opacity: 0, y: 32 }}
              animate={isIntersecting ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.55,
                delay: 0.1 + i * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group relative rounded-2xl border border-brand-graphite/60 bg-white/3 p-6 sm:p-8 overflow-hidden transition-all duration-300 hover:border-brand-gold/30 hover:bg-white/5 hover:-translate-y-0.5"
            >
              {/* Gradient hover glow */}
              <div
                aria-hidden="true"
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl"
                style={{
                  background:
                    "radial-gradient(ellipse 60% 50% at 0% 0%, rgba(212,160,23,0.06), transparent)",
                }}
              />

              {/* Número */}
              <span
                className="font-display text-5xl sm:text-6xl leading-none mb-4 block"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(249,179,52,0.7) 0%, rgba(212,160,23,0.3) 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
                aria-hidden="true"
              >
                {item.num}
              </span>

              {/* Texto */}
              <p className="text-white text-base sm:text-lg leading-snug font-sans font-medium">
                {item.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
