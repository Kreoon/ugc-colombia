"use client";

import { motion } from "motion/react";
import { useIntersection } from "@/hooks/use-intersection";
import {
  ArrowRight,
  Play,
  Lightbulb,
  Star,
  Users,
  Briefcase,
  Check,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ServicioCard {
  id: string;
  icon: React.ElementType;
  tag?: string;
  title: string;
  price: string;
  description: string;
  includes?: string[];
  savings?: string;
  availableAlone?: string;
  highlight?: boolean;
  large?: boolean;
}

const SERVICIOS: ServicioCard[] = [
  {
    id: "ugc-ads",
    icon: Play,
    tag: "PAQUETE COMPLETO · MÁS POPULAR",
    title: "UGC Ads Pack",
    price: "$500–$1.500",
    description:
      "Todo lo que necesitas para escalar tu creative en Meta y TikTok Ads, bajo un solo techo. Estrategia, casting, producción y entrega de 5 a 100+ videos listos para lanzar.",
    includes: [
      "Estrategia editorial incluida",
      "Casting curado de creadores",
      "Producción y edición completa",
      "Derechos paid media 12 meses",
      "Account manager dedicado",
      "Reporte mensual de performance",
    ],
    savings: "Ahorras hasta $2.500 USD/mes vs. contratar por separado",
    highlight: true,
    large: true,
  },
  {
    id: "estrategia",
    icon: Lightbulb,
    title: "Estrategia Editorial",
    price: "$800–$1.200",
    description:
      "Calendario de contenido, ángulos de mensaje, hooks ganadores y brief creativo mensual. Para marcas que quieren dirección antes de producir.",
    availableAlone: "Ya incluido en el UGC Ads Pack",
  },
  {
    id: "produccion",
    icon: Star,
    title: "Producción Premium",
    price: "$1.500–$5.000",
    description:
      "Producción cinematográfica de alto estándar. Para lanzamientos de producto, hero videos y campañas de temporada.",
    availableAlone: "Proyecto puntual · no recurrente",
  },
  {
    id: "consultoria",
    icon: Briefcase,
    title: "Consultoría Creative",
    price: "$1.200–$3.000",
    description:
      "Acompañamiento estratégico para tu equipo interno: auditoría de creative, frameworks de testing y capacitación UGC.",
    availableAlone: "Mensual · para equipos internos",
  },
  {
    id: "talent",
    icon: Users,
    title: "Talent Network",
    price: "Comisión 20–30%",
    description:
      "Acceso a nuestra red de +30 creadores latinos verificados. Matching por nicho, audiencia y estilo para quienes producen in-house.",
    availableAlone: "Ya incluido en el UGC Ads Pack",
  },
];

function ServicioItem({
  servicio,
  index,
  isIntersecting,
}: {
  servicio: ServicioCard;
  index: number;
  isIntersecting: boolean;
}) {
  const Icon = servicio.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={isIntersecting ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.55,
        delay: 0.08 + index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={cn(
        "group relative rounded-2xl p-6 sm:p-7 overflow-hidden",
        "transition-all duration-300 hover:-translate-y-1 flex flex-col",
        servicio.large ? "sm:col-span-2 lg:col-span-2 lg:row-span-2" : "",
        servicio.highlight
          ? [
              "border-2 border-brand-gold/50",
              "bg-gradient-to-br from-brand-yellow/8 to-brand-gold/4",
              "hover:border-brand-gold/70 hover:shadow-[0_12px_48px_rgba(212,160,23,0.22)]",
            ]
          : [
              "border border-brand-graphite/60 bg-white/[0.03]",
              "hover:border-brand-gold/30 hover:bg-white/[0.05] hover:shadow-[0_8px_24px_rgba(212,160,23,0.08)]",
            ]
      )}
    >
      {/* Glow corner para el card destacado */}
      {servicio.highlight && (
        <div
          aria-hidden="true"
          className="absolute top-0 right-0 w-64 h-64 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 100% 0%, rgba(249,179,52,0.18), transparent 70%)",
          }}
        />
      )}

      {/* Tag badge */}
      {servicio.tag && (
        <span className="inline-flex items-center gap-1.5 self-start mb-4 text-[10px] sm:text-xs font-sans font-bold tracking-widest uppercase bg-brand-yellow text-black px-3 py-1.5 rounded-full">
          <Sparkles className="h-3 w-3" aria-hidden />
          {servicio.tag}
        </span>
      )}

      {/* Icon */}
      <div
        className={cn(
          "rounded-xl flex items-center justify-center mb-5",
          "transition-all duration-300",
          servicio.highlight
            ? "w-14 h-14 bg-brand-yellow text-black group-hover:shadow-[0_0_24px_rgba(249,179,52,0.55)]"
            : "w-11 h-11 bg-brand-yellow/10 border border-brand-yellow/20 text-brand-yellow group-hover:bg-brand-yellow/20"
        )}
      >
        <Icon
          className={servicio.highlight ? "h-6 w-6" : "h-5 w-5"}
          aria-hidden="true"
        />
      </div>

      {/* Title */}
      <h3
        className={cn(
          "font-display leading-tight mb-2 text-white",
          servicio.large ? "text-3xl sm:text-4xl lg:text-5xl" : "text-xl sm:text-2xl"
        )}
      >
        {servicio.title}
      </h3>

      {/* Price */}
      <div className="flex items-baseline gap-2 mb-3">
        <p
          className={cn(
            "font-sans font-semibold",
            servicio.large ? "text-2xl sm:text-3xl" : "text-sm sm:text-base",
            servicio.highlight ? "text-brand-yellow" : "text-brand-gold"
          )}
        >
          {servicio.price}
        </p>
        <span
          className={cn(
            "text-brand-gray/70",
            servicio.large ? "text-sm" : "text-xs"
          )}
        >
          USD / mes
        </span>
      </div>

      {/* Description */}
      <p
        className={cn(
          "text-brand-gray leading-relaxed mb-5",
          servicio.large ? "text-base sm:text-lg" : "text-sm"
        )}
      >
        {servicio.description}
      </p>

      {/* INCLUDES list — solo en el card destacado */}
      {servicio.includes && servicio.includes.length > 0 && (
        <div className="mb-5 rounded-xl border border-brand-gold/25 bg-brand-black/40 p-4">
          <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-brand-yellow mb-3">
            Incluye todo lo siguiente
          </p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2.5">
            {servicio.includes.map((item) => (
              <li
                key={item}
                className="flex items-start gap-2 text-sm text-white/90"
              >
                <span className="mt-0.5 flex-shrink-0 w-4 h-4 rounded-full bg-brand-yellow/15 border border-brand-yellow/40 flex items-center justify-center">
                  <Check
                    className="h-2.5 w-2.5 text-brand-yellow"
                    strokeWidth={3}
                    aria-hidden
                  />
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Savings callout */}
      {servicio.savings && (
        <div className="mb-5 inline-flex items-center gap-2 self-start rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-2">
          <span className="text-xs" aria-hidden>
            💰
          </span>
          <span className="text-xs sm:text-sm font-semibold text-emerald-400">
            {servicio.savings}
          </span>
        </div>
      )}

      {/* Available alone hint */}
      {servicio.availableAlone && (
        <p className="mt-auto mb-4 text-[11px] font-sans text-brand-gold/70 italic">
          {servicio.availableAlone}
        </p>
      )}

      {/* CTA */}
      <div className={servicio.large ? "mt-auto" : ""}>
        {servicio.highlight ? (
          <a
            href="#pricing"
            className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3.5 rounded-xl bg-brand-yellow text-black font-sans font-bold text-sm sm:text-base tracking-wide hover:bg-brand-gold transition-colors group/cta"
          >
            Empezar con el paquete
            <ArrowRight
              className="h-4 w-4 transition-transform group-hover/cta:translate-x-1"
              aria-hidden="true"
            />
          </a>
        ) : (
          <button
            className="inline-flex items-center gap-1.5 text-sm font-sans font-semibold text-brand-gold hover:text-brand-yellow transition-colors group/link"
            aria-label={`Ver detalles de ${servicio.title}`}
          >
            Ver detalles
            <ArrowRight
              className="h-3.5 w-3.5 transition-transform duration-200 group-hover/link:translate-x-1"
              aria-hidden="true"
            />
          </button>
        )}
      </div>
    </motion.div>
  );
}

export function Servicios() {
  const { ref, isIntersecting } = useIntersection<HTMLDivElement>({
    threshold: 0.06,
  });

  return (
    <section
      id="servicios"
      aria-labelledby="servicios-title"
      className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-brand-black"
    >
      <div className="max-w-6xl mx-auto" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isIntersecting ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-12 sm:mb-16"
        >
          <p className="sr-only">Servicios</p>
          <h2
            id="servicios-title"
            className="font-display text-4xl sm:text-5xl lg:text-6xl text-white leading-tight"
          >
            5 servicios, 1 resultado:
            <br />
            <span
              style={{
                background: "linear-gradient(90deg, #f9b334, #d4a017)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              contenido que vende.
            </span>
          </h2>
          <p className="max-w-2xl mx-auto mt-5 text-base sm:text-lg text-brand-gray">
            Cada servicio funciona por separado, pero el{" "}
            <span className="text-white font-semibold">UGC Ads Pack</span>{" "}
            combina los 4 críticos y te ahorra hasta{" "}
            <span className="text-emerald-400 font-semibold">
              $2.500 USD/mes
            </span>
            .
          </p>
        </motion.div>

        {/* Bento grid: 1 grande (UGC Ads) + 4 medianas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 auto-rows-fr">
          {SERVICIOS.map((servicio, i) => (
            <ServicioItem
              key={servicio.id}
              servicio={servicio}
              index={i}
              isIntersecting={isIntersecting}
            />
          ))}
        </div>

        {/* Savings comparison banner */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isIntersecting ? { opacity: 1, y: 0 } : {}}
          transition={{
            duration: 0.6,
            delay: 0.5,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mt-10 sm:mt-12 relative rounded-2xl border border-brand-gold/25 bg-gradient-to-br from-brand-black via-brand-graphite/20 to-brand-black overflow-hidden"
        >
          <div
            aria-hidden
            className="absolute inset-0 opacity-30 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 50% 80% at 0% 50%, rgba(249,179,52,0.12), transparent 60%), radial-gradient(ellipse 50% 80% at 100% 50%, rgba(16,185,129,0.1), transparent 60%)",
            }}
          />
          <div className="relative p-6 sm:p-8 lg:p-10 grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-center">
            {/* Left: separate */}
            <div>
              <p className="text-xs font-bold tracking-[0.2em] uppercase text-brand-gray mb-3">
                Por separado
              </p>
              <div className="space-y-1.5 text-sm text-white/75">
                <div className="flex justify-between">
                  <span>Estrategia editorial</span>
                  <span className="text-brand-gray">~$1.000</span>
                </div>
                <div className="flex justify-between">
                  <span>Producción premium</span>
                  <span className="text-brand-gray">~$2.500</span>
                </div>
                <div className="flex justify-between">
                  <span>Consultoría creative</span>
                  <span className="text-brand-gray">~$1.500</span>
                </div>
                <div className="flex justify-between">
                  <span>Talent network (10 vids)</span>
                  <span className="text-brand-gray">~$500</span>
                </div>
                <div className="border-t border-brand-graphite/60 pt-2 mt-2 flex justify-between font-semibold text-white">
                  <span>Total</span>
                  <span className="line-through opacity-70">~$5.500/mes</span>
                </div>
              </div>
            </div>

            {/* Middle: arrow */}
            <div className="hidden lg:flex items-center justify-center">
              <div className="flex flex-col items-center gap-2">
                <ArrowRight
                  className="h-10 w-10 text-brand-yellow"
                  strokeWidth={1.5}
                  aria-hidden
                />
                <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-brand-yellow">
                  O elige
                </span>
              </div>
            </div>

            {/* Right: package */}
            <div className="rounded-xl border-2 border-brand-yellow/50 bg-brand-yellow/5 p-5 sm:p-6">
              <p className="text-xs font-bold tracking-[0.2em] uppercase text-brand-yellow mb-3 flex items-center gap-2">
                <Sparkles className="h-3.5 w-3.5" aria-hidden />
                UGC Ads Pack
              </p>
              <div className="mb-3">
                <span className="font-display text-4xl sm:text-5xl text-white">
                  $1.500
                </span>
                <span className="text-sm text-brand-gray ml-2">USD / mes</span>
              </div>
              <p className="text-sm text-white/85 mb-4">
                Todo incluido, un solo equipo, un solo contrato.
              </p>
              <div className="inline-flex items-center gap-2 rounded-lg bg-emerald-500/15 border border-emerald-500/40 px-3 py-2">
                <span aria-hidden>💰</span>
                <span className="text-sm font-bold text-emerald-400">
                  Ahorras ~$4.000/mes
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
