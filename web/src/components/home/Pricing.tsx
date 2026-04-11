"use client";

import { motion } from "motion/react";
import { useIntersection } from "@/hooks/use-intersection";
import {
  Check,
  Sparkles,
  Crown,
  CalendarDays,
  ChevronDown,
  ChevronUp,
  ShieldCheck,
  Infinity,
  Target,
  CreditCard,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import {
  PLANES_RECURRENTES,
  ENTERPRISE_FEATURES,
  type Plan,
} from "@/lib/pricing-plans";

// Máx 8 features visibles — el resto en "ver más"
const MAX_VISIBLE_FEATURES = 8;

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
        "relative flex flex-col rounded-2xl p-5 sm:p-6 lg:p-7 overflow-hidden h-full",
        "transition-all duration-300",
        plan.highlight
          ? [
              "border-2 border-brand-gold",
              "bg-gradient-to-b from-brand-yellow/8 to-black",
              "shadow-[0_0_60px_-20px_rgba(212,160,23,0.4)]",
              "hover:shadow-[0_0_80px_-15px_rgba(212,160,23,0.55)]",
              "md:-mt-4 md:mb-4",
            ]
          : [
              "border border-brand-graphite/60 bg-white/[0.025]",
              "hover:border-brand-gold/35 hover:bg-white/[0.04]",
              "hover:shadow-[0_10px_30px_-10px_rgba(212,160,23,0.15)]",
            ]
      )}
    >
      {/* Top glow bar para el destacado */}
      {plan.highlight && (
        <div
          aria-hidden
          className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-brand-gold to-transparent"
        />
      )}

      {/* Badge inline (dentro del card para no quedar clippeado por overflow-hidden) */}
      {plan.badge && (
        <div className="flex justify-center mb-4 -mt-1">
          <span className="inline-flex items-center gap-1.5 text-[10px] font-sans font-bold tracking-[0.2em] uppercase bg-brand-yellow text-black px-4 py-1.5 rounded-full shadow-[0_4px_20px_-4px_rgba(249,179,52,0.6)] whitespace-nowrap">
            <Sparkles className="h-3 w-3" aria-hidden />
            {plan.badge}
          </span>
        </div>
      )}

      {/* Header: icon + name */}
      <div className="flex items-start justify-between mb-4 mt-1">
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
      <div className="mb-3">
        <div className="flex items-baseline gap-2">
          <span className="font-display text-4xl sm:text-5xl leading-none text-white">
            {plan.price}
          </span>
          <span className="text-brand-gray font-sans text-sm">
            {plan.priceUnit}
          </span>
        </div>
      </div>

      {/* Videos highlight */}
      <div
        className={cn(
          "mt-3 mb-3 rounded-xl px-3 py-2.5 border",
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
      <p className="text-xs sm:text-sm text-brand-gray leading-relaxed mb-4">
        {plan.description}
      </p>

      {/* Ahorro */}
      {plan.saving && (
        <div className="mb-4 inline-flex items-center gap-2 self-start rounded-lg border border-emerald-500/30 bg-emerald-500/8 px-3 py-1.5">
          <span aria-hidden className="text-xs text-emerald-400">
            ✓
          </span>
          <span className="text-xs font-semibold text-emerald-400">
            {plan.saving}
          </span>
        </div>
      )}

      {/* Features */}
      <ul
        className="space-y-2 mb-4 flex-1"
        aria-label={`Características del plan ${plan.name}`}
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

      {/* Toggle ver más / ver menos */}
      {hiddenCount > 0 && (
        <button
          onClick={() => setExpanded((v) => !v)}
          className={cn(
            "self-start flex items-center gap-1.5 text-xs font-semibold mb-4 transition-colors",
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
              más incluido
            </>
          )}
        </button>
      )}

      {/* CTA */}
      <a
        href={plan.ctaHref}
        className={cn(
          "group/cta flex items-center justify-center gap-2 w-full px-5 py-3.5 rounded-xl font-sans font-bold text-sm tracking-wide transition-all min-h-[44px]",
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

      {/* Hint pago */}
      <p className="text-[10px] text-center text-brand-gray/60 mt-2.5">
        Pago seguro con Stripe · Cancela cuando quieras
      </p>
    </motion.article>
  );
}

function EnterpriseBanner({ isIntersecting }: { isIntersecting: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={isIntersecting ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="relative mt-6 rounded-2xl overflow-hidden"
    >
      {/* Background */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, #0c0c0c 0%, #141208 40%, #0a0900 100%)",
        }}
      />
      {/* Radial glow */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 80% at 10% 50%, rgba(212,160,23,0.14) 0%, transparent 55%), radial-gradient(ellipse 50% 60% at 90% 50%, rgba(249,179,52,0.08) 0%, transparent 60%)",
        }}
      />
      {/* Grid pattern decorativo */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(249,179,52,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(249,179,52,0.5) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          maskImage:
            "radial-gradient(ellipse at 20% 50%, black 20%, transparent 70%)",
        }}
      />
      {/* Gradient border dorado */}
      <div
        aria-hidden
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{
          padding: "1.5px",
          background:
            "linear-gradient(135deg, rgba(249,179,52,0.7) 0%, rgba(212,160,23,0.4) 30%, rgba(212,160,23,0.15) 60%, transparent 100%)",
          WebkitMask:
            "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
      />

      <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 p-7 sm:p-10 lg:p-12">
        {/* Columna izquierda — info */}
        <div className="flex flex-col">
          {/* Badge */}
          <div className="inline-flex self-start items-center gap-2 px-4 py-1.5 rounded-full bg-brand-yellow/10 border border-brand-yellow/40 mb-5">
            <Crown className="h-3.5 w-3.5 text-brand-yellow" aria-hidden />
            <span className="text-[11px] font-bold tracking-[0.25em] uppercase text-brand-yellow">
              A la Medida · Personalizado
            </span>
          </div>

          {/* Headline */}
          <h3 className="font-display text-[clamp(2rem,4vw,3.5rem)] leading-[0.95] text-white tracking-tight uppercase mb-4">
            ¿Necesitas{" "}
            <span
              style={{
                background: "linear-gradient(90deg, #f9b334, #d4a017)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              algo a tu medida?
            </span>
          </h3>

          <p className="text-sm sm:text-base text-brand-gray leading-relaxed mb-6 max-w-lg">
            Para empresas con alto volumen de publicidad que necesitan un equipo
            dedicado, director creativo propio, entrega sin límites y acuerdos de
            servicio garantizados por contrato.
          </p>

          {/* Features grid — 2 columnas */}
          <ul
            className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5"
            aria-label="Características del plan a la medida"
          >
            {ENTERPRISE_FEATURES.map((f) => (
              <li key={f} className="flex items-start gap-2.5">
                <span className="flex-shrink-0 w-4 h-4 rounded-full bg-brand-gold/20 border border-brand-gold/50 flex items-center justify-center mt-0.5">
                  <Check
                    className="h-2.5 w-2.5 text-brand-gold"
                    strokeWidth={3}
                    aria-hidden
                  />
                </span>
                <span className="text-xs sm:text-sm text-white/80 leading-relaxed">
                  {f}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Columna derecha — CTA */}
        <div className="flex flex-col justify-center gap-6">
          {/* Price card */}
          <div className="rounded-2xl border-2 border-brand-gold/50 bg-brand-yellow/5 p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-yellow to-brand-gold-dark flex items-center justify-center shadow-[0_0_20px_rgba(249,179,52,0.4)]">
                <Crown className="h-6 w-6 text-black" aria-hidden />
              </div>
              <div>
                <p className="font-display text-3xl sm:text-4xl text-white leading-none">
                  A la medida
                </p>
                <p className="text-xs text-brand-gray mt-0.5">
                  60+ videos / mes · Escalable
                </p>
              </div>
            </div>

            <p className="text-sm text-brand-gray mb-5">
              Cotización personalizada según volumen, verticales y acuerdos de servicio requeridos.
            </p>

            <a
              href="#discovery-call"
              className={cn(
                "group/ent flex items-center justify-center gap-2.5 w-full px-6 py-4 rounded-xl",
                "bg-gradient-to-r from-brand-yellow to-brand-gold-dark text-black",
                "font-sans font-bold text-base tracking-wide transition-all min-h-[44px]",
                "hover:shadow-[0_10px_40px_-10px_rgba(212,160,23,0.55)]",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-2 focus-visible:ring-offset-black"
              )}
              aria-label="Agendar llamada con UGC Colombia para plan a la medida"
            >
              <CalendarDays className="h-5 w-5" aria-hidden />
              Hablemos
              <span
                aria-hidden
                className="transition-transform group-hover/ent:translate-x-1"
              >
                →
              </span>
            </a>

            <p className="text-[10px] text-center text-brand-gray/60 mt-3">
              Llamada 30 min · Cotización personalizada · Sin compromiso
            </p>
          </div>

          {/* Diferenciadores clave */}
          <div className="flex flex-col gap-3">
            {[
              "Equipo dedicado exclusivo para tu marca",
              "Acuerdos de servicio garantizados por contrato",
              "Integración directa con tu equipo",
            ].map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 rounded-xl border border-brand-gold/20 bg-brand-yellow/3 px-4 py-3"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-brand-yellow flex-shrink-0" />
                <span className="text-sm text-white/85">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function Pricing() {
  const { ref, isIntersecting } = useIntersection<HTMLDivElement>({
    threshold: 0.04,
  });

  return (
    <section
      id="pricing"
      aria-labelledby="pricing-title"
      className="relative py-20 sm:py-28 lg:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden scroll-mt-20 sm:scroll-mt-24"
      style={{
        background:
          "linear-gradient(180deg, #000000 0%, #080604 50%, #000000 100%)",
      }}
    >
      {/* Radial glow */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 40%, rgba(212,160,23,0.08) 0%, transparent 60%)",
        }}
      />

      <div className="relative max-w-6xl mx-auto" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isIntersecting ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-14 sm:mb-18 max-w-3xl mx-auto"
        >
          <span className="inline-block px-3 py-1 rounded-full text-[11px] font-sans font-bold tracking-widest uppercase mb-5 bg-brand-yellow/15 text-brand-yellow border border-brand-yellow/40">
            Precios claros
          </span>
          <h2
            id="pricing-title"
            className="font-display text-[clamp(2.5rem,6vw,5rem)] leading-[0.95] text-white tracking-tight uppercase"
          >
            Precios claros.
            <br />
            <span
              style={{
                background: "linear-gradient(90deg, #f9b334, #d4a017)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Sin letra pequeña.
            </span>
          </h2>
          <p className="mt-6 text-base sm:text-lg text-brand-gray leading-relaxed">
            Cada plan incluye los 8 servicios del Paquete Completo UGC + 3 variantes por
            video para que tengas munición ilimitada para pruebas en Meta y
            TikTok Ads.
          </p>
        </motion.div>

        {/* Grid 3 planes recurrentes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-stretch">
          {PLANES_RECURRENTES.map((plan, i) => (
            <PlanCard
              key={plan.id}
              plan={plan}
              index={i}
              isIntersecting={isIntersecting}
            />
          ))}
        </div>

        {/* Banner Enterprise full-width */}
        <EnterpriseBanner isIntersecting={isIntersecting} />

        {/* Trust row */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isIntersecting ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-sm text-brand-gray"
        >
          <div className="flex items-center gap-2">
            <CreditCard className="h-4 w-4 text-brand-gold/70 flex-shrink-0" aria-hidden />
            Pago seguro con Stripe
          </div>
          <div
            className="hidden sm:block w-1 h-1 rounded-full bg-brand-graphite"
            aria-hidden
          />
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-brand-gold/70 flex-shrink-0" aria-hidden />
            Garantía de 7 días
          </div>
          <div
            className="hidden sm:block w-1 h-1 rounded-full bg-brand-graphite"
            aria-hidden
          />
          <div className="flex items-center gap-2">
            <Infinity className="h-4 w-4 text-brand-gold/70 flex-shrink-0" aria-hidden />
            Sin permanencia forzada
          </div>
          <div
            className="hidden sm:block w-1 h-1 rounded-full bg-brand-graphite"
            aria-hidden
          />
          <div className="flex items-center gap-2">
            <Target className="h-4 w-4 text-brand-gold/70 flex-shrink-0" aria-hidden />
            Licencia de publicidad 12 meses
          </div>
        </motion.div>
      </div>
    </section>
  );
}
