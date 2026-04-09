"use client";

import { motion } from "motion/react";
import { useIntersection } from "@/hooks/use-intersection";

/**
 * Marcas con las que hemos trabajado.
 * Wordmarks tipograficos (sin assets) para un look premium editorial.
 * Para reemplazar por logos reales: cambia `label` por <Image src="/brand/logos/xxx.svg" .../>.
 */
const MARCAS = [
  { label: "KREOON", font: "font-display", className: "tracking-tight" },
  { label: "Infiny Group", font: "font-display", className: "italic tracking-tight" },
  { label: "EFFICOMMERCE", font: "font-sans", className: "tracking-[0.2em] font-semibold" },
  { label: "Atomic CRM", font: "font-display", className: "tracking-tight" },
  { label: "Legacy", font: "font-display", className: "tracking-tight" },
  { label: "LOS REYES", font: "font-sans", className: "tracking-[0.25em] font-bold" },
  { label: "Jarvis AI", font: "font-display", className: "italic tracking-tight" },
  { label: "Alexander Cast", font: "font-display", className: "tracking-tight" },
] as const;

// Duplicamos para loop infinito sin corte visible.
const LOOP = [...MARCAS, ...MARCAS];

export function Marcas() {
  const { ref, isIntersecting } = useIntersection<HTMLDivElement>({
    threshold: 0.2,
    once: true,
  });

  return (
    <section
      ref={ref}
      aria-labelledby="marcas-title"
      className="relative py-20 sm:py-24 px-4 sm:px-6 lg:px-8 bg-brand-black overflow-hidden"
    >
      {/* Glow ambient */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(249,179,52,0.06), transparent 60%)",
        }}
      />

      <div className="relative max-w-6xl mx-auto">
        {/* Eyebrow + titulo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isIntersecting ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-12 sm:mb-14"
        >
          <div className="inline-flex items-center gap-3 mb-5">
            <span
              aria-hidden="true"
              className="h-px w-8 bg-gradient-to-r from-transparent to-brand-gold/60"
            />
            <span className="text-[11px] sm:text-xs uppercase tracking-[0.35em] text-brand-gold/80 font-sans">
              Marcas que confiaron
            </span>
            <span
              aria-hidden="true"
              className="h-px w-8 bg-gradient-to-l from-transparent to-brand-gold/60"
            />
          </div>
          <h2
            id="marcas-title"
            className="font-display text-[clamp(1.75rem,4vw,2.75rem)] leading-[1.05] text-white tracking-tight"
          >
            Marcas con las que hemos{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #f9b334 0%, #d4a017 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              trabajado
            </span>
            .
          </h2>
        </motion.div>

        {/* Marquee premium */}
        <div className="relative">
          {/* Fades laterales */}
          <div
            aria-hidden="true"
            className="absolute inset-y-0 left-0 w-24 sm:w-32 z-10 pointer-events-none bg-gradient-to-r from-brand-black to-transparent"
          />
          <div
            aria-hidden="true"
            className="absolute inset-y-0 right-0 w-24 sm:w-32 z-10 pointer-events-none bg-gradient-to-l from-brand-black to-transparent"
          />

          <div className="group relative overflow-hidden rounded-2xl border border-brand-gold/15 bg-white/[0.015] py-10 sm:py-12">
            <ul className="flex items-center gap-12 sm:gap-20 whitespace-nowrap animate-marquee group-hover:[animation-play-state:paused] will-change-transform">
              {LOOP.map((m, i) => (
                <li
                  key={`${m.label}-${i}`}
                  className="flex items-center justify-center shrink-0"
                  aria-hidden={i >= MARCAS.length ? "true" : undefined}
                >
                  <span
                    className={[
                      m.font,
                      m.className,
                      "text-2xl sm:text-3xl lg:text-[2rem] leading-none select-none",
                      "text-white/45 hover:text-white transition-colors duration-300",
                    ].join(" ")}
                    style={{
                      textShadow: "0 0 24px rgba(249,179,52,0.0)",
                    }}
                  >
                    {m.label}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Disclaimer discreto */}
        <p className="mt-6 text-center text-[11px] sm:text-xs text-brand-gray/70 font-sans tracking-wide">
          Ecosistema Infiny Group · Clientes UGC LATAM + USA
        </p>
      </div>
    </section>
  );
}
