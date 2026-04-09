"use client";

import { motion } from "motion/react";
import { useIntersection } from "@/hooks/use-intersection";
import { ArrowRight, Play, Lightbulb, Star, Users, Briefcase } from "lucide-react";
import { cn } from "@/lib/utils";

interface ServicioCard {
  id: string;
  icon: React.ElementType;
  tag?: string;
  title: string;
  price: string;
  description: string;
  highlight?: boolean;
  large?: boolean;
}

const SERVICIOS: ServicioCard[] = [
  {
    id: "ugc-ads",
    icon: Play,
    tag: "MÁS POPULAR",
    title: "UGC Ads Pack",
    price: "$500–$1.500 / mes",
    description:
      "El paquete completo: brief estratégico, casting, producción y entrega de videos UGC listos para lanzar en Meta y TikTok Ads. Escala desde 5 hasta 100+ videos.",
    highlight: true,
    large: true,
  },
  {
    id: "estrategia",
    icon: Lightbulb,
    title: "Estrategia Editorial",
    price: "$800–$1.200 / mes",
    description:
      "Calendario de contenido, ángulos de mensaje, hooks ganadores y brief creativo mensual. Para marcas que quieren dirección antes de producción.",
  },
  {
    id: "produccion",
    icon: Star,
    title: "Producción Premium",
    price: "$1.500–$5.000 / proyecto",
    description:
      "Producción cinematográfica de contenido UGC de alta gama. Para lanzamientos de producto, héroe videos y campañas de temporada.",
  },
  {
    id: "consultoria",
    icon: Briefcase,
    title: "Consultoría Creative",
    price: "$1.200–$3.000 / mes",
    description:
      "Acompañamiento estratégico para tu equipo interno: auditoría de creative, frameworks de testing y capacitación en producción UGC.",
  },
  {
    id: "talent",
    icon: Users,
    title: "Talent Network",
    price: "Comisión 20–30%",
    description:
      "Acceso a nuestra red de +30 creadores latinos verificados. Matching por nicho, audiencia y estilo. Para marcas que quieren manejar producción internamente.",
  },
];

function ServicioItem({ servicio, index, isIntersecting }: {
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
        delay: 0.08 + index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={cn(
        "group relative rounded-2xl p-6 sm:p-7 overflow-hidden",
        "transition-all duration-300",
        "hover:-translate-y-1",
        servicio.large
          ? "sm:col-span-2 lg:col-span-1 lg:row-span-2"
          : "",
        servicio.highlight
          ? [
              "border-2 border-brand-gold/40",
              "bg-gradient-to-br from-brand-yellow/6 to-brand-gold/3",
              "hover:border-brand-gold/60 hover:shadow-[0_8px_40px_rgba(212,160,23,0.18)]",
            ]
          : [
              "border border-brand-graphite/60 bg-white/3",
              "hover:border-brand-gold/25 hover:bg-white/5 hover:shadow-[0_8px_24px_rgba(212,160,23,0.08)]",
            ]
      )}
    >
      {/* Glow corner para el card destacado */}
      {servicio.highlight && (
        <div
          aria-hidden="true"
          className="absolute top-0 right-0 w-48 h-48 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 100% 0%, rgba(249,179,52,0.15), transparent 70%)",
          }}
        />
      )}

      {/* Tag badge */}
      {servicio.tag && (
        <span className="inline-flex items-center mb-4 text-xs font-sans font-bold tracking-widest uppercase bg-brand-yellow text-black px-3 py-1 rounded-full">
          {servicio.tag}
        </span>
      )}

      {/* Icon */}
      <div
        className={cn(
          "w-11 h-11 rounded-xl flex items-center justify-center mb-5",
          "transition-all duration-300",
          servicio.highlight
            ? "bg-brand-yellow text-black group-hover:shadow-[0_0_16px_rgba(249,179,52,0.5)]"
            : "bg-brand-yellow/10 border border-brand-yellow/20 group-hover:bg-brand-yellow/20"
        )}
      >
        <Icon className="h-5 w-5" aria-hidden="true" />
      </div>

      {/* Title */}
      <h3
        className={cn(
          "font-display leading-tight mb-2",
          servicio.large ? "text-2xl sm:text-3xl" : "text-xl sm:text-2xl",
          "text-white"
        )}
      >
        {servicio.title}
      </h3>

      {/* Price */}
      <p
        className={cn(
          "font-sans font-semibold text-sm mb-3",
          servicio.highlight ? "text-brand-yellow" : "text-brand-gold"
        )}
      >
        {servicio.price}
      </p>

      {/* Description */}
      <p className="text-brand-gray text-sm leading-relaxed mb-5">
        {servicio.description}
      </p>

      {/* Link */}
      <button
        className={cn(
          "inline-flex items-center gap-1.5 text-sm font-sans font-semibold",
          "transition-all duration-200 group/link",
          servicio.highlight
            ? "text-brand-yellow hover:text-white"
            : "text-brand-gold hover:text-brand-yellow"
        )}
        aria-label={`Ver detalles de ${servicio.title}`}
      >
        Ver detalles
        <ArrowRight
          className="h-3.5 w-3.5 transition-transform duration-200 group-hover/link:translate-x-1"
          aria-hidden="true"
        />
      </button>
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
        </motion.div>

        {/* Bento grid: 1 grande izq + 4 medianas der */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 auto-rows-auto">
          {SERVICIOS.map((servicio, i) => (
            <ServicioItem
              key={servicio.id}
              servicio={servicio}
              index={i}
              isIntersecting={isIntersecting}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
