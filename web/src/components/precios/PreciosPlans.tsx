"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { useIntersection } from "@/hooks/use-intersection";
import {
  Check,
  Sparkles,
  Crown,
  ChevronDown,
  ChevronUp,
  CalendarDays,
  ShieldCheck,
  Infinity,
  Target,
  CreditCard,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  PLANES_RECURRENTES,
  ENTERPRISE_FEATURES,
  ENTERPRISE_PLAN,
  type Plan,
} from "@/lib/pricing-plans";

const MAX_VISIBLE_FEATURES = 10;

/** Calcula precio por video basado en precio y cantidad de videos */
function getPricePerVideo(plan: Plan): string | null {
  const priceNum = parseInt(plan.price.replace(/[$.,]/g, ""), 10);
  const videoMatch = plan.videos.match(/(\d+)/);
  if (!priceNum || !videoMatch) return null;
  const videos = parseInt(videoMatch[1], 10);
  return `$${Math.round(priceNum / videos)}`;
}

function PlanCard({
  plan,
  index,
  isIntersecting,
}: {
  plan: Plan;
  index: number;
  isIntersecting: boolean;
}) {
  const Icon = plan.icon;
  const [expanded, setExpanded] = useState(false);
  const pricePerVideo = getPricePerVideo(plan);

  const visibleFeatures = expanded
    ? plan.features
    : plan.features.slice(0, MAX_VISIBLE_FEATURES);
  const hiddenCount = plan.features.length - MAX_VISIBLE_FEATURES;

  return (
    <motion.article
      initial={{ opacity: 0, y: 36 }}
      animate={isIntersecting ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.6,
        delay: 0.1 + index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={cn(
        "relative flex flex-col rounded-2xl p-5 sm:p-6 lg:p-7 overflow-hidden h-full transition-all duration-300",
        plan.highlight
          ? [
              "border-2 border-brand-gold",
              "bg-gradient-to-b from-brand-yellow/8 to-black",
              "shadow-[0_0_60px_-20px_rgba(212,160,23,0.45)]",
              "hover:shadow-[0_0_80px_-15px_rgba(212,160,23,0.6)]",
              "lg:-mt-4 lg:mb-4",
            ]
          : [
              "border border-brand-graphite/60 bg-white/[0.025]",
              "hover:border-brand-gold/40 hover:bg-white/[0.04]",
              "hover:shadow-[0_12px_40px_-12px_rgba(212,160,23,0.25)]",
              "hover:-translate-y-1",
            ]
      )}
    >
      {/* Shimmer border animation for highlighted plan */}
      {plan.highlight && (
        <div
          aria-hidden
          className="absolute inset-0 rounded-2xl pointer-events-none overflow-hidden"
        >
          <div
            className="absolute -inset-[1px] rounded-2xl"
            style={{
              background:
                "conic-gradient(from 0deg, transparent 0%, rgba(249,179,52,0.4) 10%, transparent 20%)",
              animation: "shimmer-spin 4s linear infinite",
            }}
          />
          <div className="absolute inset-[2px] rounded-[14px] bg-gradient-to-b from-brand-yellow/8 to-black" />
        </div>
      )}

      {plan.highlight && (
        <div
          aria-hidden
          className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-brand-gold to-transparent"
        />
      )}

      {plan.badge && (
        <div className="relative z-10 flex justify-center mb-4 -mt-1">
          <span className="inline-flex items-center gap-1.5 text-[10px] font-sans font-bold tracking-[0.2em] uppercase bg-brand-yellow text-black px-4 py-1.5 rounded-full shadow-[0_4px_20px_-4px_rgba(249,179,52,0.6)] whitespace-nowrap">
            <Sparkles className="h-3 w-3" aria-hidden />
            {plan.badge}
          </span>
        </div>
      )}

      {/* Header */}
      <div className="relative z-10 flex items-start justify-between mb-4 mt-1">
        <div
          className={cn(
            "w-10 h-10 rounded-xl flex items-center justify-center",
            plan.highlight
              ? "bg-brand-yellow text-black shadow-[0_0_20px_rgba(249,179,52,0.5)]"
              : "bg-brand-yellow/10 border border-brand-yellow/25 text-brand-yellow"
          )}
        >
          <Icon className="h-5 w-5" aria-hidden />
        </div>
        <p
          className={cn(
            "font-display text-xs tracking-[0.25em]",
            plan.highlight ? "text-brand-yellow" : "text-brand-gold/80"
          )}
        >
          {plan.name}
        </p>
      </div>

      {/* Precio */}
      <div className="relative z-10 mb-3">
        <div className="flex items-baseline gap-2">
          <span className="font-display text-4xl sm:text-5xl leading-none text-white">
            {plan.price}
          </span>
          <span className="text-brand-gray font-sans text-sm">
            {plan.priceUnit}
          </span>
        </div>
        {pricePerVideo && (
          <p className="text-[11px] text-brand-gold/70 font-sans mt-1.5">
            {pricePerVideo}/video · todo incluido
          </p>
        )}
      </div>

      {/* Videos highlight */}
      <div
        className={cn(
          "relative z-10 mt-3 mb-3 rounded-xl px-3 py-2.5 border",
          plan.highlight
            ? "border-brand-gold/50 bg-brand-yellow/8"
            : "border-brand-graphite/60 bg-white/[0.02]"
        )}
      >
        <p
          className={cn(
            "font-display text-lg sm:text-xl leading-tight",
            plan.highlight ? "text-brand-yellow" : "text-white"
          )}
        >
          {plan.videos}
        </p>
        <p className="text-[11px] text-brand-gray mt-0.5">{plan.variants}</p>
      </div>

      {/* Description */}
      <p className="relative z-10 text-xs sm:text-sm text-brand-gray leading-relaxed mb-4">
        {plan.description}
      </p>

      {/* Ahorro */}
      {plan.saving && (
        <div className="relative z-10 mb-4 inline-flex items-center gap-2 self-start rounded-lg border border-emerald-500/30 bg-emerald-500/8 px-3 py-1.5">
          <span className="text-xs font-semibold text-emerald-400">
            {plan.saving}
          </span>
        </div>
      )}

      {/* Features */}
      <ul
        className="relative z-10 space-y-2 mb-4 flex-1"
        aria-label={`Caracteristicas del plan ${plan.name}`}
      >
        {visibleFeatures.map((feature) => (
          <li key={feature} className="flex items-start gap-2">
            <span
              className={cn(
                "flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center mt-0.5",
                plan.highlight
                  ? "bg-brand-yellow text-black"
                  : "bg-brand-yellow/15 border border-brand-yellow/35 text-brand-yellow"
              )}
            >
              <Check className="h-2.5 w-2.5" strokeWidth={3} aria-hidden />
            </span>
            <span className="text-xs text-white/85 leading-relaxed">
              {feature}
            </span>
          </li>
        ))}
      </ul>

      {hiddenCount > 0 && (
        <button
          onClick={() => setExpanded((v) => !v)}
          className={cn(
            "relative z-10 self-start flex items-center gap-1.5 text-xs font-semibold mb-4 transition-colors",
            plan.highlight
              ? "text-brand-yellow hover:text-brand-gold"
              : "text-brand-gold/70 hover:text-brand-yellow",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold rounded"
          )}
          aria-expanded={expanded}
        >
          {expanded ? (
            <>
              <ChevronUp className="h-3.5 w-3.5" aria-hidden />
              Ver menos
            </>
          ) : (
            <>
              <ChevronDown className="h-3.5 w-3.5" aria-hidden />+{hiddenCount}{" "}
              mas incluido
            </>
          )}
        </button>
      )}

      {/* CTA */}
      <a
        href={plan.ctaHref}
        className={cn(
          "relative z-10 group/cta flex items-center justify-center gap-2 w-full px-5 py-3.5 rounded-xl font-sans font-bold text-sm tracking-wide transition-all min-h-[44px]",
          plan.highlight
            ? "bg-brand-yellow text-black hover:bg-brand-gold hover:shadow-[0_10px_40px_-10px_rgba(249,179,52,0.6)]"
            : "bg-white/[0.04] border border-brand-gold/40 text-brand-yellow hover:bg-brand-yellow/10 hover:border-brand-gold/70",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-2 focus-visible:ring-offset-black"
        )}
        aria-label={`${plan.ctaLabel} — Plan ${plan.name}`}
      >
        {plan.ctaLabel}
        <span
          aria-hidden
          className="transition-transform group-hover/cta:translate-x-1"
        >
          →
        </span>
      </a>

      <p className="relative z-10 text-[10px] text-center text-brand-gray/60 mt-2.5">
        Pago seguro con Stripe · Cancela cuando quieras
      </p>
    </motion.article>
  );
}

function EnterpriseCard({
  index,
  isIntersecting,
}: {
  index: number;
  isIntersecting: boolean;
}) {
  const Icon = ENTERPRISE_PLAN.icon;
  return (
    <motion.article
      initial={{ opacity: 0, y: 36 }}
      animate={isIntersecting ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.6,
        delay: 0.1 + index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={cn(
        "relative flex flex-col rounded-2xl p-5 sm:p-6 lg:p-7 overflow-hidden h-full transition-all duration-300",
        "border border-brand-graphite/60 bg-gradient-to-b from-white/[0.04] to-black",
        "hover:border-brand-gold/40 hover:shadow-[0_12px_40px_-12px_rgba(212,160,23,0.25)] hover:-translate-y-1"
      )}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4 mt-1">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-yellow to-brand-gold-dark text-black flex items-center justify-center shadow-[0_0_20px_rgba(249,179,52,0.4)]">
          <Icon className="h-5 w-5" aria-hidden />
        </div>
        <p className="font-display text-xs tracking-[0.25em] text-brand-gold/80">
          {ENTERPRISE_PLAN.name}
        </p>
      </div>

      {/* Precio */}
      <div className="mb-3">
        <span className="font-display text-3xl sm:text-4xl leading-none text-white">
          A la medida
        </span>
      </div>

      {/* Videos highlight */}
      <div className="mt-3 mb-3 rounded-xl px-3 py-2.5 border border-brand-gold/40 bg-brand-yellow/5">
        <p className="font-display text-lg sm:text-xl leading-tight text-brand-yellow">
          60+ videos / mes
        </p>
        <p className="text-[11px] text-brand-gray mt-0.5">
          Variantes ilimitadas · SLA garantizado
        </p>
      </div>

      {/* Description */}
      <p className="text-xs sm:text-sm text-brand-gray leading-relaxed mb-4">
        {ENTERPRISE_PLAN.tagline}
      </p>

      {/* Features */}
      <ul
        className="space-y-2 mb-4 flex-1"
        aria-label="Caracteristicas del plan A la medida"
      >
        {ENTERPRISE_FEATURES.slice(0, 10).map((feature) => (
          <li key={feature} className="flex items-start gap-2">
            <span className="flex-shrink-0 w-4 h-4 rounded-full bg-brand-gold/20 border border-brand-gold/50 flex items-center justify-center mt-0.5">
              <Check
                className="h-2.5 w-2.5 text-brand-gold"
                strokeWidth={3}
                aria-hidden
              />
            </span>
            <span className="text-xs text-white/85 leading-relaxed">
              {feature}
            </span>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <a
        href="#contacto"
        className="group/cta flex items-center justify-center gap-2 w-full px-5 py-3.5 rounded-xl font-sans font-bold text-sm tracking-wide transition-all min-h-[44px] bg-gradient-to-r from-brand-yellow to-brand-gold-dark text-black hover:shadow-[0_10px_40px_-10px_rgba(212,160,23,0.55)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-2 focus-visible:ring-offset-black"
      >
        <CalendarDays className="h-4 w-4" aria-hidden />
        Hablemos
        <span
          aria-hidden
          className="transition-transform group-hover/cta:translate-x-1"
        >
          →
        </span>
      </a>

      <p className="text-[10px] text-center text-brand-gray/60 mt-2.5">
        Llamada 30 min · Cotizacion personalizada
      </p>
    </motion.article>
  );
}

export function PreciosPlans() {
  const { ref, isIntersecting } = useIntersection<HTMLDivElement>({
    threshold: 0.04,
  });

  return (
    <section
      id="planes"
      aria-labelledby="planes-title"
      className="relative py-20 sm:py-28 lg:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden scroll-mt-20 sm:scroll-mt-24"
      style={{
        background:
          "linear-gradient(180deg, #000000 0%, #080604 50%, #000000 100%)",
      }}
    >
      {/* Shimmer keyframe for highlighted card */}
      <style>{`
        @keyframes shimmer-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>

      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 40%, rgba(212,160,23,0.08) 0%, transparent 60%)",
        }}
      />

      <div className="relative max-w-7xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isIntersecting ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-14 sm:mb-18 max-w-3xl mx-auto"
        >
          <p className="sr-only">Planes y precios</p>
          <h2
            id="planes-title"
            className="font-display text-[clamp(2.5rem,6vw,5rem)] leading-[0.95] text-white tracking-tight uppercase"
          >
            4 paquetes.
            <br />
            <span
              style={{
                background: "linear-gradient(90deg, #f9b334, #d4a017)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Uno por cada etapa.
            </span>
          </h2>
          <p className="mt-6 text-base sm:text-lg text-brand-gray leading-relaxed">
            Todos los planes incluyen estrategia, guiones, creadores
            verificados, edicion profesional y licencia de publicidad por 12
            meses. Elige el volumen que calce con tu presupuesto hoy y escala
            cuando quieras.
          </p>
        </motion.div>

        {/* Grid 4 planes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 items-stretch">
          {PLANES_RECURRENTES.map((plan, i) => (
            <PlanCard
              key={plan.id}
              plan={plan}
              index={i}
              isIntersecting={isIntersecting}
            />
          ))}
          <EnterpriseCard index={3} isIntersecting={isIntersecting} />
        </div>

        {/* Trust row — iconos profesionales */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isIntersecting ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-sm text-brand-gray"
        >
          <div className="flex items-center gap-2">
            <CreditCard
              className="h-4 w-4 text-brand-gold/70 flex-shrink-0"
              aria-hidden
            />
            Pago seguro con Stripe
          </div>
          <div
            className="hidden sm:block w-1 h-1 rounded-full bg-brand-graphite"
            aria-hidden
          />
          <div className="flex items-center gap-2">
            <ShieldCheck
              className="h-4 w-4 text-brand-gold/70 flex-shrink-0"
              aria-hidden
            />
            Garantia de 7 dias
          </div>
          <div
            className="hidden sm:block w-1 h-1 rounded-full bg-brand-graphite"
            aria-hidden
          />
          <div className="flex items-center gap-2">
            <Infinity
              className="h-4 w-4 text-brand-gold/70 flex-shrink-0"
              aria-hidden
            />
            Sin permanencia forzada
          </div>
          <div
            className="hidden sm:block w-1 h-1 rounded-full bg-brand-graphite"
            aria-hidden
          />
          <div className="flex items-center gap-2">
            <Target
              className="h-4 w-4 text-brand-gold/70 flex-shrink-0"
              aria-hidden
            />
            Licencia ads 12 meses
          </div>
        </motion.div>
      </div>
    </section>
  );
}
