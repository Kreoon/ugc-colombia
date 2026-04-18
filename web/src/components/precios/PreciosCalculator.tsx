"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { useIntersection } from "@/hooks/use-intersection";
import { Calculator, TrendingDown, ArrowRight, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCurrency } from "@/components/providers/CurrencyProvider";
import {
  CURRENCY_META,
  PLAN_PRICES,
  SOLO_RATES,
  VOLUME_50_PRICE,
  VOLUME_TIERS,
  type Currency,
} from "@/lib/pricing/currency-config";
import { formatPrice } from "@/lib/pricing/format";
import {
  BILLING_DURATIONS,
  DURATION_DISCOUNT,
  DURATION_LABEL,
  applyDurationDiscount,
} from "@/lib/stripe/plans";

/** Calcula el precio mensual base del paquete UGC Colombia según volumen y moneda. */
function getBasePackage(
  videos: number,
  currency: Currency,
): { name: string; monthlyPrice: number; slug: "starter" | "growth" | "scale" | "custom" } {
  if (videos <= 5)
    return {
      name: "INICIO",
      monthlyPrice: PLAN_PRICES.starter[currency].amount,
      slug: "starter",
    };
  if (videos <= 10)
    return {
      name: "CRECIMIENTO",
      monthlyPrice: PLAN_PRICES.growth[currency].amount,
      slug: "growth",
    };
  if (videos <= 30)
    return {
      name: "ESCALA",
      monthlyPrice: PLAN_PRICES.scale[currency].amount,
      slug: "scale",
    };
  if (videos <= 50)
    return {
      name: "VOLUMEN 50",
      monthlyPrice: VOLUME_50_PRICE[currency],
      slug: "custom",
    };
  const tier = VOLUME_TIERS[currency].find(
    (t) =>
      videos >= t.minVideos && (t.maxVideos === null || videos <= t.maxVideos),
  );
  const monthlyPrice = tier ? videos * tier.perVideo : 0;
  return { name: "A LA MEDIDA", monthlyPrice, slug: "custom" };
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

const FIXED_STOPS = [5, 10, 30, 50];
const FREE_MIN = 51;
const FREE_MAX = 300;
const SLIDER_MAX = FIXED_STOPS.length - 1 + (FREE_MAX - FREE_MIN + 1);

function sliderToVideos(pos: number): number {
  if (pos <= 3) return FIXED_STOPS[pos];
  return FREE_MIN + (pos - FIXED_STOPS.length);
}

function videosToSlider(v: number): number {
  const idx = FIXED_STOPS.indexOf(v);
  if (idx !== -1) return idx;
  if (v >= FREE_MIN) return FIXED_STOPS.length + (v - FREE_MIN);
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
  const { currency, format, duration, setDuration } = useCurrency();
  const [videos, setVideos] = useState(10);

  const sliderPos = videosToSlider(videos);

  const handleSlider = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVideos(sliderToVideos(parseInt(e.target.value, 10)));
  };

  const { soloCost, plan, cycleTotal, monthlyEquivalent, savings, savingsPct, commitmentSavings } =
    useMemo(() => {
      const rates = SOLO_RATES[currency];
      const soloCost =
        videos * (rates.script + rates.edit + rates.creator) + rates.strategy;
      const plan = getBasePackage(videos, currency);
      const cycle = applyDurationDiscount(plan.monthlyPrice, duration);
      const equivalent = duration > 0 ? Math.round(cycle / duration) : plan.monthlyPrice;
      // Ahorro vs contratar por separado, comparando mes vs mes.
      const savings = Math.max(0, soloCost - equivalent);
      const savingsPct = soloCost > 0 ? Math.round((savings / soloCost) * 100) : 0;
      const commitmentSavings = plan.monthlyPrice * duration - cycle;
      return {
        soloCost,
        plan,
        cycleTotal: cycle,
        monthlyEquivalent: equivalent,
        savings,
        savingsPct,
        commitmentSavings,
      };
    }, [videos, currency, duration]);

  const animatedSavings = useCountUp(savings);
  const animatedSoloCost = useCountUp(soloCost);
  const perVideoAmount = videos > 0 ? Math.round(plan.monthlyPrice / videos) : 0;
  const perVideo = format(perVideoAmount);
  const unitLabel = CURRENCY_META[currency].unitLabel;
  const localeLabel = `${currency} al mes`;
  const rates = SOLO_RATES[currency];

  const sliderPct = (sliderPos / SLIDER_MAX) * 100;

  const checkoutHref =
    plan.slug === "custom"
      ? `/checkout/custom?videos=${videos}&currency=${currency}&duration=${duration}`
      : `/checkout/${plan.slug}?duration=${duration}&currency=${currency}`;

  const cycleLabel = duration === 1 ? "al mes" : `cada ${duration} meses`;

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
            Mueve el slider según los videos que necesitas al mes y elige cuánto
            te comprometes. Más meses = más descuento.
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
            {/* Izquierda: slider + selector */}
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
                      videos === stop.videos && "text-brand-yellow font-bold",
                    )}
                  >
                    {stop.label}
                  </button>
                ))}
              </div>

              {/* Selector de compromiso */}
              <div className="mt-8">
                <p className="text-[10px] font-bold tracking-[0.25em] uppercase text-brand-gold/70 mb-3">
                  Compromiso
                </p>
                <div className="grid grid-cols-4 gap-2">
                  {BILLING_DURATIONS.map((d) => {
                    const pct = Math.round(DURATION_DISCOUNT[d] * 100);
                    const active = duration === d;
                    return (
                      <button
                        key={d}
                        type="button"
                        onClick={() => setDuration(d)}
                        className={cn(
                          "relative px-2 py-3 rounded-lg border text-center transition-all",
                          active
                            ? "border-brand-gold bg-brand-yellow/10 shadow-[0_0_20px_-8px_rgba(249,179,52,0.5)]"
                            : "border-brand-graphite/60 hover:border-brand-gold/40",
                        )}
                      >
                        <p
                          className={cn(
                            "text-[11px] font-bold uppercase tracking-wider",
                            active ? "text-brand-yellow" : "text-white",
                          )}
                        >
                          {DURATION_LABEL[d]}
                        </p>
                        <p className="text-[10px] text-brand-gray mt-0.5">
                          {d === 1 ? "1 mes" : `${d} m`}
                        </p>
                        {pct > 0 && (
                          <span className="block mt-1 text-[10px] font-bold text-emerald-400">
                            -{pct}%
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
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
                  {formatPrice(animatedSoloCost, currency)}
                </p>
                <p className="text-[11px] text-brand-gray/70 mt-1">
                  Guiones + edición + creadores + estrategia
                </p>
              </div>

              {/* Con paquete */}
              <div className="rounded-xl border-2 border-brand-gold bg-brand-yellow/5 p-5 shadow-[0_0_40px_-20px_rgba(212,160,23,0.5)]">
                <p className="text-[10px] font-bold tracking-[0.25em] uppercase text-brand-yellow mb-2">
                  Con plan {plan.name} · {DURATION_LABEL[duration]}
                </p>
                <div className="flex items-end gap-2 flex-wrap">
                  <p className="font-display text-4xl sm:text-5xl text-white leading-none">
                    {format(cycleTotal)}
                  </p>
                  <p className="text-[11px] text-brand-gray pb-1">{cycleLabel}</p>
                </div>
                {duration > 1 && (
                  <p className="text-[11px] text-brand-gray mt-2">
                    Equivalente a{" "}
                    <strong className="text-white">
                      {format(monthlyEquivalent)}/mes
                    </strong>
                    {commitmentSavings > 0 && (
                      <>
                        {" · "}
                        <span className="text-emerald-400 font-semibold">
                          ahorras {format(commitmentSavings)} por prepago
                        </span>
                      </>
                    )}
                  </p>
                )}
                {duration === 1 && (
                  <p className="text-[11px] text-brand-gray mt-2">
                    {unitLabel} · todo incluido
                  </p>
                )}
              </div>

              {/* Ahorro vs contratar por separado */}
              {savings > 0 && (
                <div className="rounded-xl border border-emerald-500/40 bg-emerald-500/8 p-5">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-[10px] font-bold tracking-[0.25em] uppercase text-emerald-400 flex items-center gap-1.5">
                      <TrendingDown className="h-3 w-3" aria-hidden />
                      Tu ahorro mensual
                    </p>
                    <span className="text-[11px] font-bold text-emerald-400">
                      -{savingsPct}%
                    </span>
                  </div>
                  <p className="font-display text-4xl sm:text-5xl text-emerald-400">
                    {formatPrice(animatedSavings, currency)}
                  </p>
                  <p className="text-[11px] text-emerald-400/80 mt-1">
                    {localeLabel} · vs contratar por separado
                  </p>
                </div>
              )}

              {/* CTA */}
              <a
                href={checkoutHref}
                className={cn(
                  "group/cta flex items-center justify-center gap-2 w-full px-6 py-4 rounded-xl bg-brand-yellow text-black font-sans font-bold text-base tracking-wide transition-all min-h-[52px]",
                  "hover:bg-brand-gold hover:shadow-[0_10px_40px_-10px_rgba(249,179,52,0.55)]",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-2 focus-visible:ring-offset-black",
                )}
              >
                Comprar este plan
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
          {VOLUME_TIERS[currency].map((tier) => (
            <div
              key={tier.label}
              className="rounded-xl border border-brand-graphite/40 bg-white/[0.02] p-3 text-center"
            >
              <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-brand-gray mb-1">
                {tier.label} videos
              </p>
              <p
                className="font-display text-lg"
                style={{
                  background: "linear-gradient(135deg, #f9b334, #d4a017)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {tier.displayPrefix ? `${tier.displayPrefix} ` : ""}
                {format(tier.perVideo)}
              </p>
              <p className="text-[10px] text-brand-gray/60">por video</p>
            </div>
          ))}
        </div>

        <p className="mt-6 text-center text-xs text-brand-gray/60">
          * Comparación basada en tarifas individuales UGC Colombia:{" "}
          {format(rates.script)} guión, {format(rates.edit)} edición,{" "}
          {format(rates.creator)} por creador, {format(rates.strategy)}{" "}
          estrategia base.
        </p>
      </div>
    </section>
  );
}
