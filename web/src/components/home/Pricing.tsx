"use client";

import { motion } from "motion/react";
import { useIntersection } from "@/hooks/use-intersection";
import { Check, Sparkles, Zap, Crown, Rocket } from "lucide-react";
import { cn } from "@/lib/utils";

type CtaType = "stripe" | "agenda";

interface Plan {
  id: string;
  name: string;
  icon: React.ElementType;
  price: string;
  priceUnit: string;
  videos: string;
  variants: string;
  description: string;
  features: string[];
  ctaLabel: string;
  ctaType: CtaType;
  ctaHref: string;
  highlight?: boolean;
  badge?: string;
  saving?: string;
}

const PLANES: Plan[] = [
  {
    id: "starter",
    name: "STARTER",
    icon: Zap,
    price: "$400",
    priceUnit: "USD / mes",
    videos: "5 videos UGC",
    variants: "+ 3 variantes por video = 15 deliverables",
    description: "Para marcas que quieren probar UGC con bajo riesgo y ver resultados rápido.",
    features: [
      "5 videos UGC + 3 variantes cada uno",
      "Brief estratégico incluido",
      "Investigación de mercado",
      "Análisis de competencia",
      "Guiones escritos por nuestro equipo",
      "Casting curado de creadores",
      "Edición profesional ad-ready",
      "1 ronda de revisión por video",
      "Entrega en 7 días",
      "Licencia paid media 12 meses",
    ],
    ctaLabel: "Empezar con Starter",
    ctaType: "stripe",
    ctaHref: "/checkout/starter",
    saving: "Ahorras ~$2.200/mes",
  },
  {
    id: "growth",
    name: "GROWTH",
    icon: Sparkles,
    price: "$700",
    priceUnit: "USD / mes",
    videos: "10 videos UGC",
    variants: "+ 3 variantes por video = 30 deliverables",
    description: "El favorito de marcas que ya probaron UGC y están listas para escalar con intención.",
    features: [
      "10 videos UGC + 3 variantes cada uno",
      "Estrategia editorial mensual",
      "Investigación de mercado continua",
      "Análisis de competencia trimestral",
      "Guiones con frameworks ganadores",
      "Casting premium de nuestra red",
      "Edición profesional + motion graphics",
      "2 rondas de revisión por video",
      "Reporte mensual de performance",
      "Account manager dedicado",
      "Entrega en 7 días",
      "Licencia paid media 12 meses",
    ],
    ctaLabel: "Empezar con Growth",
    ctaType: "stripe",
    ctaHref: "/checkout/growth",
    highlight: true,
    badge: "MÁS POPULAR",
    saving: "Ahorras ~$4.000/mes",
  },
  {
    id: "scale",
    name: "SCALE",
    icon: Rocket,
    price: "$1.500",
    priceUnit: "USD / mes",
    videos: "30 videos UGC",
    variants: "+ 3 variantes por video = 90 deliverables",
    description: "Para marcas que saben que el creative es su ventaja competitiva y quieren dominar sus ads.",
    features: [
      "30 videos UGC + 3 variantes cada uno",
      "Estrategia de marketing completa",
      "Consultoría estratégica mensual con Alexander",
      "Research + análisis de competencia continuo",
      "Banco de guiones por ángulo ganador",
      "Pool de creadores premium Tier A",
      "Edición cinematográfica + subtítulos dinámicos",
      "Revisiones ilimitadas",
      "Reportes semanales con data accionable",
      "Account manager senior dedicado",
      "Priority delivery",
      "Licencia paid media 12 meses",
    ],
    ctaLabel: "Empezar con Scale",
    ctaType: "stripe",
    ctaHref: "/checkout/scale",
    saving: "Ahorras ~$5.500/mes",
  },
  {
    id: "enterprise",
    name: "ENTERPRISE",
    icon: Crown,
    price: "Custom",
    priceUnit: "Hablemos",
    videos: "60+ videos / mes",
    variants: "Variantes ilimitadas · contenido a medida",
    description: "Para empresas escalables con alto volumen de ads que necesitan creative a medida, equipo dedicado y delivery sin límites.",
    features: [
      "60+ videos UGC al mes (escalable)",
      "Variantes ilimitadas por video",
      "Estrategia 360° integrada con tu equipo",
      "Creative director asignado",
      "Squad dedicado de creadores Tier A exclusivos",
      "Producción premium: VSLs, hero videos, campañas",
      "Post-producción cinematográfica ilimitada",
      "Integración directa con tu equipo de performance",
      "Dashboard en tiempo real de métricas",
      "Slack/Teams compartido con nuestro equipo",
      "SLAs garantizados por contrato",
      "Derechos de uso custom (whitelisting, exclusividad)",
      "Onboarding ejecutivo con Alexander Cast",
    ],
    ctaLabel: "Agendar consulta",
    ctaType: "agenda",
    ctaHref: "#discovery-call",
  },
];

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
  const isEnterprise = plan.id === "enterprise";

  return (
    <motion.article
      initial={{ opacity: 0, y: 36 }}
      animate={isIntersecting ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.6,
        delay: 0.1 + index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={cn(
        "relative flex flex-col rounded-2xl p-6 sm:p-7 overflow-hidden h-full",
        "transition-all duration-300",
        plan.highlight
          ? [
              "border-2 border-brand-gold",
              "bg-gradient-to-b from-brand-yellow/8 to-black",
              "shadow-[0_0_60px_-20px_rgba(212,160,23,0.4)]",
              "hover:shadow-[0_0_80px_-15px_rgba(212,160,23,0.55)]",
              "lg:-mt-4 lg:mb-4",
            ]
          : isEnterprise
          ? [
              "border border-brand-gold/40",
              "bg-gradient-to-br from-brand-graphite/20 via-black to-brand-black",
              "hover:border-brand-gold/70 hover:shadow-[0_12px_40px_-12px_rgba(212,160,23,0.3)]",
            ]
          : [
              "border border-brand-graphite/60 bg-white/[0.025]",
              "hover:border-brand-gold/35 hover:bg-white/[0.04]",
              "hover:shadow-[0_10px_30px_-10px_rgba(212,160,23,0.15)]",
            ]
      )}
    >
      {/* Top glow bar for highlighted */}
      {plan.highlight && (
        <div
          aria-hidden
          className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-brand-gold to-transparent"
        />
      )}

      {/* Enterprise crown pattern */}
      {isEnterprise && (
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(249,179,52,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(249,179,52,0.5) 1px, transparent 1px)",
            backgroundSize: "30px 30px",
            maskImage:
              "radial-gradient(ellipse at top, black 30%, transparent 80%)",
          }}
        />
      )}

      {/* Badge */}
      {plan.badge && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="inline-flex items-center gap-1.5 text-[10px] font-sans font-bold tracking-[0.2em] uppercase bg-brand-yellow text-black px-4 py-1.5 rounded-full shadow-lg">
            <Sparkles className="h-3 w-3" aria-hidden />
            {plan.badge}
          </span>
        </div>
      )}

      {/* Header: icon + name */}
      <div className="flex items-start justify-between mb-5">
        <div
          className={cn(
            "w-11 h-11 rounded-xl flex items-center justify-center",
            plan.highlight
              ? "bg-brand-yellow text-black shadow-[0_0_20px_rgba(249,179,52,0.5)]"
              : isEnterprise
              ? "bg-gradient-to-br from-brand-yellow to-brand-gold-dark text-black"
              : "bg-brand-yellow/10 border border-brand-yellow/25 text-brand-yellow"
          )}
        >
          <Icon className="h-5 w-5" aria-hidden />
        </div>
        <p
          className={cn(
            "font-display text-xs tracking-[0.25em]",
            plan.highlight
              ? "text-brand-yellow"
              : isEnterprise
              ? "text-brand-gold"
              : "text-brand-gold/80"
          )}
        >
          {plan.name}
        </p>
      </div>

      {/* Price */}
      <div className="mb-2">
        {isEnterprise ? (
          <div className="flex items-baseline gap-2">
            <span className="font-display text-4xl sm:text-5xl leading-none text-white">
              Custom
            </span>
          </div>
        ) : (
          <div className="flex items-baseline gap-2">
            <span className="font-display text-5xl sm:text-6xl leading-none text-white">
              {plan.price}
            </span>
            <span className="text-brand-gray font-sans text-sm">
              {plan.priceUnit}
            </span>
          </div>
        )}
      </div>

      {/* Videos highlight */}
      <div
        className={cn(
          "mt-4 mb-4 rounded-xl px-4 py-3 border",
          plan.highlight
            ? "border-brand-gold/50 bg-brand-yellow/8"
            : isEnterprise
            ? "border-brand-gold/35 bg-brand-yellow/5"
            : "border-brand-graphite/60 bg-white/[0.02]"
        )}
      >
        <p
          className={cn(
            "font-display text-xl sm:text-2xl leading-tight",
            plan.highlight || isEnterprise ? "text-brand-yellow" : "text-white"
          )}
        >
          {plan.videos}
        </p>
        <p className="text-[11px] text-brand-gray mt-0.5">{plan.variants}</p>
      </div>

      {/* Description */}
      <p className="text-sm text-brand-gray leading-relaxed mb-5">
        {plan.description}
      </p>

      {/* Savings badge */}
      {plan.saving && (
        <div className="mb-5 inline-flex items-center gap-2 self-start rounded-lg border border-emerald-500/30 bg-emerald-500/8 px-3 py-1.5">
          <span aria-hidden className="text-xs">
            💰
          </span>
          <span className="text-xs font-semibold text-emerald-400">
            {plan.saving}
          </span>
        </div>
      )}

      {/* Features */}
      <ul
        className="space-y-2.5 mb-6 flex-1"
        aria-label={`Características del plan ${plan.name}`}
      >
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-start gap-2.5">
            <span
              className={cn(
                "flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center mt-0.5",
                plan.highlight
                  ? "bg-brand-yellow text-black"
                  : isEnterprise
                  ? "bg-brand-gold/20 border border-brand-gold/50 text-brand-gold"
                  : "bg-brand-yellow/15 border border-brand-yellow/35 text-brand-yellow"
              )}
            >
              <Check className="h-2.5 w-2.5" strokeWidth={3} aria-hidden />
            </span>
            <span className="text-xs sm:text-sm text-white/85 leading-relaxed">
              {feature}
            </span>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <a
        href={plan.ctaHref}
        className={cn(
          "group/cta flex items-center justify-center gap-2 w-full px-6 py-3.5 rounded-xl font-sans font-bold text-sm sm:text-base tracking-wide transition-all",
          plan.highlight
            ? "bg-brand-yellow text-black hover:bg-brand-gold hover:shadow-[0_10px_40px_-10px_rgba(249,179,52,0.6)]"
            : isEnterprise
            ? "bg-gradient-to-r from-brand-yellow to-brand-gold-dark text-black hover:shadow-[0_10px_40px_-10px_rgba(212,160,23,0.5)]"
            : "bg-white/[0.04] border border-brand-gold/40 text-brand-yellow hover:bg-brand-yellow/10 hover:border-brand-gold/70"
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

      {/* Payment method hint */}
      <p className="text-[10px] text-center text-brand-gray/60 mt-3">
        {plan.ctaType === "stripe"
          ? "Pago seguro con Stripe · Cancela cuando quieras"
          : "Llamada 30 min · Cotización a medida"}
      </p>
    </motion.article>
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
      className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden"
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

      <div className="relative max-w-7xl mx-auto" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isIntersecting ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16 sm:mb-20 max-w-3xl mx-auto"
        >
          <p className="sr-only">Pricing</p>
          <h2
            id="pricing-title"
            className="font-display text-[clamp(2.5rem,6vw,5rem)] leading-[0.95] text-white tracking-tight uppercase"
          >
            Precios transparentes.
            <br />
            <span
              style={{
                background: "linear-gradient(90deg, #f9b334, #d4a017)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Sin sorpresas.
            </span>
          </h2>
          <p className="mt-6 text-base sm:text-lg text-brand-gray leading-relaxed">
            Cada plan incluye los 8 servicios del UGC Ads Pack + 3 variantes por
            video para que tengas munición ilimitada para A/B testing en Meta y
            TikTok Ads.
          </p>
        </motion.div>

        {/* Cards — 4 columns on large */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 items-stretch">
          {PLANES.map((plan, i) => (
            <PlanCard
              key={plan.id}
              plan={plan}
              index={i}
              isIntersecting={isIntersecting}
            />
          ))}
        </div>

        {/* Trust row */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isIntersecting ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10 text-sm text-brand-gray"
        >
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Pago seguro con Stripe
          </div>
          <div className="hidden sm:block w-1 h-1 rounded-full bg-brand-graphite" />
          <div className="flex items-center gap-2">
            <span aria-hidden>🛡️</span>
            Garantía de 7 días
          </div>
          <div className="hidden sm:block w-1 h-1 rounded-full bg-brand-graphite" />
          <div className="flex items-center gap-2">
            <span aria-hidden>♾️</span>
            Sin permanencia forzada
          </div>
          <div className="hidden sm:block w-1 h-1 rounded-full bg-brand-graphite" />
          <div className="flex items-center gap-2">
            <span aria-hidden>🎯</span>
            Licencia paid media 12m
          </div>
        </motion.div>
      </div>
    </section>
  );
}
