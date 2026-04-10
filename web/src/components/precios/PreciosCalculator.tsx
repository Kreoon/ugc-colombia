"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { useIntersection } from "@/hooks/use-intersection";
import { Calculator, TrendingDown, ArrowRight, Users } from "lucide-react";
import { cn } from "@/lib/utils";

// Tarifas individuales UGC Colombia (para comparación de ahorro vs paquete)
const SOLO_SCRIPT = 45;
const SOLO_EDIT = 33;
const SOLO_CREATOR = 75;
const SOLO_STRATEGY = 225;

/** Calcula el precio del paquete UGC Colombia según volumen */
function getPackagePrice(videos: number): {
  name: string;
  price: number;
  priceLabel: string;
  href: string;
} {
  if (videos <= 5)
    return { name: "INICIO", price: 400, priceLabel: "$400", href: "#planes" };
  if (videos <= 10)
    return {
      name: "CRECIMIENTO",
      price: 700,
      priceLabel: "$700",
      href: "#planes",
    };
  if (videos <= 30)
    return {
      name: "ESCALA",
      price: 1500,
      priceLabel: "$1,500",
      href: "#planes",
    };
  if (videos <= 50)
    return {
      name: "VOLUMEN 50",
      price: 2200,
      priceLabel: "$2,200",
      href: "#contacto",
    };
  if (videos <= 99) {
    const price = videos * 40;
    return {
      name: "A LA MEDIDA",
      price,
      priceLabel: `$${price.toLocaleString("en-US")}`,
      href: "#contacto",
    };
  }
  if (videos <= 200) {
    const price = videos * 35;
    return {
      name: "A LA MEDIDA",
      price,
      priceLabel: `$${price.toLocaleString("en-US")}`,
      href: "#contacto",
    };
  }
  const price = videos * 29;
  return {
    name: "A LA MEDIDA",
    price,
    priceLabel: `$${price.toLocaleString("en-US")}`,
    href: "#contacto",
  };
}

/** Precio por video para mostrar */
function getPricePerVideo(videos: number, totalPrice: number): string {
  return `$${Math.round(totalPrice / videos)}`;
}

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

/**
 * Escalas fijas para planes (5, 10, 30, 50).
 * Después de 50, el slider se mueve de 1 en 1 hasta 300.
 * Internamente el slider va de 0 a 253 (4 escalones fijos + 250 valores libres).
 */
const FIXED_STOPS = [5, 10, 30, 50];
const FREE_MIN = 51;
const FREE_MAX = 300;
const SLIDER_MAX = FIXED_STOPS.length - 1 + (FREE_MAX - FREE_MIN + 1); // 3 + 250 = 253

function sliderToVideos(pos: number): number {
  if (pos <= 3) return FIXED_STOPS[pos];
  return FREE_MIN + (pos - FIXED_STOPS.length);
}

function videosToSlider(v: number): number {
  const idx = FIXED_STOPS.indexOf(v);
  if (idx !== -1) return idx;
  if (v >= FREE_MIN) return FIXED_STOPS.length + (v - FREE_MIN);
  // Snap to nearest fixed stop
  for (let i = FIXED_STOPS.length - 1; i >= 0; i--) {
    if (v >= FIXED_STOPS[i]) return i;
  }
  return 0;
}

const LABEL_STOPS = [
  { videos: 5, label: "5" },
  { videos: 10, label: "10" },
  { videos: 30, label: "30" },
  { videos: 50, label: "50" },
  { videos: 100, label: "100" },
  { videos: 200, label: "200" },
  { videos: 300, label: "300" },
];

export function PreciosCalculator() {
  const { ref, isIntersecting } = useIntersection<HTMLDivElement>({
    threshold: 0.1,
  });
  const [videos, setVideos] = useState(10);

  const sliderPos = videosToSlider(videos);

  const handleSlider = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVideos(sliderToVideos(parseInt(e.target.value, 10)));
  };

  const { soloCost, plan, savings, savingsPct } = useMemo(() => {
    const soloCost =
      videos * (SOLO_SCRIPT + SOLO_EDIT + SOLO_CREATOR) + SOLO_STRATEGY;
    const plan = getPackagePrice(videos);
    const savings = Math.max(0, soloCost - plan.price);
    const savingsPct = Math.round((savings / soloCost) * 100);
    return { soloCost, plan, savings, savingsPct };
  }, [videos]);

  const animatedSavings = useCountUp(savings);
  const animatedSoloCost = useCountUp(soloCost);
  const perVideo = getPricePerVideo(videos, plan.price);

  const sliderPct = (sliderPos / SLIDER_MAX) * 100;

  return (
    <section
      id="calculadora"
      aria-labelledby="calculadora-title"
      className="relative py-20 sm:py-28 lg:py-32 px-4 sm:px-6 lg:px-8 bg-brand-black overflow-hidden scroll-mt-20 sm:scroll-mt-24"
    >
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

      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <Image
          src="/brand/precios/calculadora.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-18"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-black/80 via-brand-black/70 to-brand-black" />
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(16,185,129,0.05), transparent 60%)",
        }}
      />

      <div className="relative max-w-5xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isIntersecting ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-12 sm:mb-14 max-w-2xl mx-auto"
        >
          <span className="inline-block px-3 py-1 rounded-full text-[11px] font-sans font-bold tracking-widest uppercase mb-5 bg-brand-yellow/15 text-brand-yellow border border-brand-yellow/40">
            Calculadora de ahorro
          </span>
          <h2
            id="calculadora-title"
            className="font-display text-[clamp(2rem,4.5vw,3.5rem)] leading-[1] text-white tracking-tight uppercase"
          >
            ¿Cuánto te{" "}
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
            Mueve el slider según los videos que necesitas al mes. Te mostramos
            cuánto te costaría contratarlos por separado vs. nuestro paquete.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={isIntersecting ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-3xl border border-brand-graphite/60 bg-gradient-to-b from-white/[0.04] to-transparent p-6 sm:p-10 lg:p-12 overflow-hidden"
        >
          <div
            aria-hidden
            className="absolute top-0 right-0 w-80 h-80 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at 100% 0%, rgba(16,185,129,0.14), transparent 65%)",
            }}
          />
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
                min={0}
                max={SLIDER_MAX}
                step={1}
                value={sliderPos}
                onChange={handleSlider}
                className="pricing-slider w-full h-2 rounded-full appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(90deg, #f9b334 0%, #d4a017 ${sliderPct}%, rgba(61,61,60,0.6) ${sliderPct}%, rgba(61,61,60,0.6) 100%)`,
                }}
              />
              <div className="flex justify-between mt-3 text-[11px] text-brand-gray/70">
                {LABEL_STOPS.map((stop) => (
                  <button
                    key={stop.videos}
                    type="button"
                    onClick={() => setVideos(stop.videos)}
                    className={cn(
                      "transition-colors hover:text-brand-yellow",
                      videos === stop.videos && "text-brand-yellow font-bold"
                    )}
                  >
                    {stop.label}
                  </button>
                ))}
              </div>

              <div className="mt-6 p-4 rounded-xl border border-brand-graphite/60 bg-white/[0.02]">
                <p className="text-[10px] font-bold tracking-[0.25em] uppercase text-brand-gray mb-1">
                  Te recomendamos
                </p>
                <p className="font-display text-2xl text-brand-yellow tracking-wide">
                  PLAN {plan.name}
                </p>
                <p className="text-[11px] text-brand-gold/60 mt-1">
                  {perVideo}/video · todo incluido
                </p>
              </div>
            </div>

            {/* Derecha: comparación de costos */}
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
                  Guiones + edición + creadores + estrategia
                </p>
              </div>

              {/* Con paquete */}
              <div className="rounded-xl border-2 border-brand-gold bg-brand-yellow/5 p-5 shadow-[0_0_40px_-20px_rgba(212,160,23,0.5)]">
                <p className="text-[10px] font-bold tracking-[0.25em] uppercase text-brand-yellow mb-2">
                  Con plan {plan.name}
                </p>
                <p className="font-display text-4xl sm:text-5xl text-white">
                  {plan.priceLabel}
                </p>
                <p className="text-[11px] text-brand-gray mt-1">
                  USD / mes · todo incluido
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

              <p className="flex items-center justify-center gap-1.5 text-xs text-brand-gray/70">
                <Users className="h-3 w-3" aria-hidden />
                Únete a las marcas que ya ahorran
              </p>
            </div>
          </div>
        </motion.div>

        {/* Tabla de precios por volumen */}
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto">
          {[
            { range: "5–50", price: "Desde $80", note: "por video" },
            { range: "50–99", price: "$40", note: "por video" },
            { range: "100–200", price: "$35", note: "por video" },
            { range: "200+", price: "$29", note: "por video" },
          ].map((tier) => (
            <div
              key={tier.range}
              className="rounded-xl border border-brand-graphite/40 bg-white/[0.02] p-3 text-center"
            >
              <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-brand-gray mb-1">
                {tier.range} videos
              </p>
              <p
                className="font-display text-lg"
                style={{
                  background:
                    "linear-gradient(135deg, #f9b334, #d4a017)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {tier.price}
              </p>
              <p className="text-[10px] text-brand-gray/60">{tier.note}</p>
            </div>
          ))}
        </div>

        <p className="mt-6 text-center text-xs text-brand-gray/60">
          * Comparación basada en tarifas individuales UGC Colombia: $45
          guión, $33 edición, $75 por creador, $225 estrategia base.
        </p>
      </div>
    </section>
  );
}
