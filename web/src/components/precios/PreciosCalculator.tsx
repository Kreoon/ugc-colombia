"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "motion/react";
import { useIntersection } from "@/hooks/use-intersection";
import { Calculator, TrendingDown, ArrowRight, Users } from "lucide-react";
import { cn } from "@/lib/utils";

const SOLO_SCRIPT = 90;
const SOLO_EDIT = 65;
const SOLO_CREATOR = 150;
const SOLO_STRATEGY = 450;

function recommendPlan(videos: number) {
  if (videos <= 7) return { name: "INICIO", price: 400, href: "#planes" };
  if (videos <= 15) return { name: "CRECIMIENTO", price: 700, href: "#planes" };
  if (videos <= 35) return { name: "ESCALA", price: 1500, href: "#planes" };
  return { name: "A LA MEDIDA", price: null, href: "#contacto" };
}

/** Hook para animar un numero de 0 a target */
function useCountUp(target: number, duration = 600) {
  const [current, setCurrent] = useState(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const start = performance.now();
    const from = current;
    const animate = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCurrent(Math.round(from + (target - from) * eased));
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      }
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target, duration]);

  return current;
}

export function PreciosCalculator() {
  const { ref, isIntersecting } = useIntersection<HTMLDivElement>({
    threshold: 0.1,
  });
  const [videos, setVideos] = useState(10);

  const { soloCost, packagePrice, savings, savingsPct, plan } = useMemo(() => {
    const soloCost =
      videos * (SOLO_SCRIPT + SOLO_EDIT + SOLO_CREATOR) + SOLO_STRATEGY;
    const plan = recommendPlan(videos);
    const packagePrice = plan.price ?? soloCost * 0.7;
    const savings = Math.max(0, soloCost - packagePrice);
    const savingsPct = Math.round((savings / soloCost) * 100);
    return { soloCost, packagePrice, savings, savingsPct, plan };
  }, [videos]);

  const animatedSavings = useCountUp(savings);
  const animatedSoloCost = useCountUp(soloCost);

  const sliderPct = ((videos - 3) / 57) * 100;

  return (
    <section
      id="calculadora"
      aria-labelledby="calculadora-title"
      className="relative py-20 sm:py-28 lg:py-32 px-4 sm:px-6 lg:px-8 bg-brand-black overflow-hidden scroll-mt-20 sm:scroll-mt-24"
    >
      {/* Custom slider thumb styles */}
      <style>{`
        .pricing-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: linear-gradient(135deg, #f9b334, #d4a017);
          cursor: pointer;
          border: 3px solid #000;
          box-shadow: 0 0 16px rgba(249,179,52,0.5), 0 0 4px rgba(249,179,52,0.3);
          transition: box-shadow 0.2s;
        }
        .pricing-slider::-webkit-slider-thumb:hover {
          box-shadow: 0 0 24px rgba(249,179,52,0.7), 0 0 8px rgba(249,179,52,0.5);
        }
        .pricing-slider::-moz-range-thumb {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: linear-gradient(135deg, #f9b334, #d4a017);
          cursor: pointer;
          border: 3px solid #000;
          box-shadow: 0 0 16px rgba(249,179,52,0.5);
        }
      `}</style>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(16,185,129,0.05), transparent 60%)",
        }}
      />

      <div className="relative max-w-5xl mx-auto" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isIntersecting ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-12 sm:mb-14 max-w-2xl mx-auto"
        >
          <div className="inline-flex items-center gap-3 mb-5">
            <span
              aria-hidden
              className="h-px w-8 bg-gradient-to-r from-transparent to-brand-gold/60"
            />
            <span className="text-[11px] sm:text-xs uppercase tracking-[0.35em] text-brand-gold/80 font-sans">
              Calculadora de ahorro
            </span>
            <span
              aria-hidden
              className="h-px w-8 bg-gradient-to-l from-transparent to-brand-gold/60"
            />
          </div>
          <h2
            id="calculadora-title"
            className="font-display text-[clamp(2rem,4.5vw,3.5rem)] leading-[1] text-white tracking-tight uppercase"
          >
            Cuanto te{" "}
            <span
              style={{
                background: "linear-gradient(90deg, #f9b334, #d4a017)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              ahorras
            </span>
            ?
          </h2>
          <p className="mt-5 text-sm sm:text-base text-brand-gray leading-relaxed">
            Mueve el slider segun los videos que necesitas al mes. Te mostramos
            cuanto te costaria contratarlos por separado vs. nuestro paquete.
          </p>
        </motion.div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={isIntersecting ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-3xl border border-brand-graphite/60 bg-gradient-to-b from-white/[0.04] to-transparent p-6 sm:p-10 lg:p-12 overflow-hidden"
        >
          {/* Glow corner */}
          <div
            aria-hidden
            className="absolute top-0 right-0 w-80 h-80 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at 100% 0%, rgba(16,185,129,0.14), transparent 65%)",
            }}
          />
          {/* Gradient border */}
          <div
            aria-hidden
            className="absolute inset-0 rounded-3xl pointer-events-none"
            style={{
              padding: "1.5px",
              background:
                "linear-gradient(135deg, rgba(249,179,52,0.5) 0%, rgba(16,185,129,0.25) 50%, transparent 100%)",
              WebkitMask:
                "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
              WebkitMaskComposite: "xor",
              maskComposite: "exclude",
            }}
          />

          <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Izquierda: slider */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-11 h-11 rounded-xl bg-brand-yellow/10 border border-brand-yellow/25 flex items-center justify-center">
                  <Calculator
                    className="h-5 w-5 text-brand-yellow"
                    aria-hidden
                  />
                </div>
                <div>
                  <p className="text-[10px] font-bold tracking-[0.25em] uppercase text-brand-gold/70">
                    Videos al mes
                  </p>
                  <p className="font-display text-5xl sm:text-6xl text-white leading-none mt-1">
                    {videos}
                  </p>
                </div>
              </div>

              <label htmlFor="video-slider" className="sr-only">
                Cantidad de videos al mes
              </label>
              <input
                id="video-slider"
                type="range"
                min={3}
                max={60}
                step={1}
                value={videos}
                onChange={(e) => setVideos(parseInt(e.target.value, 10))}
                className="pricing-slider w-full h-2 rounded-full appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(90deg, #f9b334 0%, #d4a017 ${sliderPct}%, rgba(61,61,60,0.6) ${sliderPct}%, rgba(61,61,60,0.6) 100%)`,
                }}
              />
              <div className="flex justify-between mt-3 text-[11px] text-brand-gray/70">
                <span>3</span>
                <span>15</span>
                <span>30</span>
                <span>60+</span>
              </div>

              <div className="mt-6 p-4 rounded-xl border border-brand-graphite/60 bg-white/[0.02]">
                <p className="text-[10px] font-bold tracking-[0.25em] uppercase text-brand-gray mb-1">
                  Te recomendamos
                </p>
                <p className="font-display text-2xl text-brand-yellow tracking-wide">
                  PLAN {plan.name}
                </p>
              </div>
            </div>

            {/* Derecha: comparacion de costos */}
            <div className="space-y-4">
              {/* Sin paquete */}
              <div className="rounded-xl border border-brand-graphite/60 bg-white/[0.015] p-5">
                <p className="text-[10px] font-bold tracking-[0.25em] uppercase text-brand-gray mb-2">
                  Contratando por separado
                </p>
                <p className="font-display text-3xl sm:text-4xl text-white/70 line-through decoration-brand-graphite">
                  ${animatedSoloCost.toLocaleString("en-US")}
                </p>
                <p className="text-[11px] text-brand-gray/70 mt-1">
                  Guiones + edicion + creadores + estrategia
                </p>
              </div>

              {/* Con paquete */}
              <div className="rounded-xl border-2 border-brand-gold bg-brand-yellow/5 p-5 shadow-[0_0_40px_-20px_rgba(212,160,23,0.5)]">
                <p className="text-[10px] font-bold tracking-[0.25em] uppercase text-brand-yellow mb-2">
                  Con plan {plan.name}
                </p>
                <p className="font-display text-4xl sm:text-5xl text-white">
                  {plan.price
                    ? `$${plan.price.toLocaleString("en-US")}`
                    : "A la medida"}
                </p>
                <p className="text-[11px] text-brand-gray mt-1">
                  {plan.price ? "USD / mes · todo incluido" : "Hablemos"}
                </p>
              </div>

              {/* Ahorro */}
              {savings > 0 && (
                <div className="rounded-xl border border-emerald-500/40 bg-emerald-500/8 p-5">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-[10px] font-bold tracking-[0.25em] uppercase text-emerald-400 flex items-center gap-1.5">
                      <TrendingDown className="h-3 w-3" aria-hidden />
                      Tu ahorro
                    </p>
                    <span className="text-[11px] font-bold text-emerald-400">
                      -{savingsPct}%
                    </span>
                  </div>
                  <p className="font-display text-4xl sm:text-5xl text-emerald-400">
                    ${animatedSavings.toLocaleString("en-US")}
                  </p>
                  <p className="text-[11px] text-emerald-400/80 mt-1">
                    USD al mes
                  </p>
                </div>
              )}

              {/* CTA */}
              <a
                href={plan.href}
                className={cn(
                  "group/cta flex items-center justify-center gap-2 w-full px-6 py-4 rounded-xl bg-brand-yellow text-black font-sans font-bold text-base tracking-wide transition-all min-h-[52px]",
                  "hover:bg-brand-gold hover:shadow-[0_10px_40px_-10px_rgba(249,179,52,0.55)]",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                )}
              >
                Quiero este plan
                <ArrowRight
                  className="h-5 w-5 transition-transform group-hover/cta:translate-x-1"
                  aria-hidden
                />
              </a>

              {/* Micro-copy CRO */}
              <p className="flex items-center justify-center gap-1.5 text-xs text-brand-gray/70">
                <Users className="h-3 w-3" aria-hidden />
                Unete a 133+ marcas que ya ahorran
              </p>
            </div>
          </div>
        </motion.div>

        <p className="mt-6 text-center text-xs text-brand-gray/60">
          * Estimacion basada en tarifas promedio de freelance en LATAM: $90
          guion, $65 edicion, $150 por creador, $450 estrategia base.
        </p>
      </div>
    </section>
  );
}
