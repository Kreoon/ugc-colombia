"use client";

import { motion } from "motion/react";
import { useIntersection } from "@/hooks/use-intersection";

/**
 * Aliados estrategicos del ecosistema UGC Colombia.
 * Wordmarks tipograficos (sin assets) en marquee inverso para diferenciarse
 * del bloque de Marcas. Para reemplazar por logos reales:
 * cambia el <span> por <Image src="/brand/aliados/xxx.svg" .../>.
 */
const ALIADOS = [
  { label: "Feria Effix", font: "font-display", className: "tracking-tight" },
  { label: "Los Reyes del Contenido", font: "font-sans", className: "tracking-[0.2em] font-bold uppercase" },
  { label: "KREOON", font: "font-display", className: "tracking-tight" },
  { label: "Infiny Latam", font: "font-display", className: "italic tracking-tight" },
  { label: "Alexander Cast", font: "font-display", className: "tracking-tight" },
  { label: "Buha", font: "font-sans", className: "tracking-[0.25em] font-semibold uppercase" },
] as const;

// Duplicamos para loop infinito sin corte visible.
const LOOP = [...ALIADOS, ...ALIADOS];

export function Aliados() {
  const { ref, isIntersecting } = useIntersection<HTMLDivElement>({
    threshold: 0.2,
    once: true,
  });

  return (
    <section
      ref={ref}
      aria-labelledby="aliados-title"
      className="relative py-20 sm:py-24 px-4 sm:px-6 lg:px-8 bg-brand-black overflow-hidden"
    >
      {/* Glow ambient sutil blanco */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(255,255,255,0.04), transparent 60%)",
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
              className="h-px w-8 bg-gradient-to-r from-transparent to-white/50"
            />
            <span className="text-[11px] sm:text-xs uppercase tracking-[0.35em] text-white/70 font-sans">
              Aliados estratégicos
            </span>
            <span
              aria-hidden="true"
              className="h-px w-8 bg-gradient-to-l from-transparent to-white/50"
            />
          </div>
          <h2
            id="aliados-title"
            className="font-display text-[clamp(1.75rem,4vw,2.75rem)] leading-[1.05] text-white tracking-tight"
          >
            Construimos con los{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #f9b334 0%, #d4a017 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              mejores
            </span>
            .
          </h2>
        </motion.div>

        {/* Marquee premium inverso */}
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

          <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] py-10 sm:py-12">
            <ul className="flex items-center gap-12 sm:gap-20 whitespace-nowrap animate-marquee [animation-direction:reverse] [animation-duration:35s] group-hover:[animation-play-state:paused] will-change-transform">
              {LOOP.map((a, i) => (
                <li
                  key={`${a.label}-${i}`}
                  className="flex items-center justify-center shrink-0"
                  aria-hidden={i >= ALIADOS.length ? "true" : undefined}
                >
                  <span
                    className={[
                      a.font,
                      a.className,
                      "text-2xl sm:text-3xl lg:text-[2rem] leading-none select-none",
                      "text-white/45 hover:text-white transition-colors duration-300",
                    ].join(" ")}
                  >
                    {a.label}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Disclaimer discreto */}
        <p className="mt-6 text-center text-[11px] sm:text-xs text-brand-gray/70 font-sans tracking-wide">
          Partners de producto, comunidad, eventos y autoridad
        </p>
      </div>
    </section>
  );
}
