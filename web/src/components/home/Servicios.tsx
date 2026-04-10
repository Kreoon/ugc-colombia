"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { useIntersection } from "@/hooks/use-intersection";
import {
  ArrowRight,
  Compass,
  TrendingUp,
  BookOpen,
  FileText,
  Search,
  Eye,
  Film,
  BadgeCheck,
  Check,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

type Servicio = {
  id: string;
  icon: React.ElementType;
  title: string;
  description: string;
  priceFrom: string;
  priceUnit: string;
};

const SERVICIOS: Servicio[] = [
  {
    id: "consultoria",
    icon: Compass,
    title: "Consultoría Estratégica",
    description:
      "Sesiones 1-a-1 con Alexander para auditar tu contenido actual y construir la hoja de ruta de los próximos 90 días.",
    priceFrom: "$200",
    priceUnit: "USD / sesión",
  },
  {
    id: "marketing",
    icon: TrendingUp,
    title: "Estrategia de Marketing",
    description:
      "Plan completo de adquisición, embudo de ventas, precios, canales y presupuesto para hacer crecer tu marca con intención.",
    priceFrom: "$325",
    priceUnit: "USD / mes",
  },
  {
    id: "contenido",
    icon: BookOpen,
    title: "Estrategia de Contenido",
    description:
      "Pilares editoriales, calendario mensual, ángulos ganadores y marcos de ganchos probados por vertical.",
    priceFrom: "$225",
    priceUnit: "USD / mes",
  },
  {
    id: "guiones",
    icon: FileText,
    title: "Guiones UGC",
    description:
      "Guiones conversacionales escritos con acento latino real. Ganchos, transiciones y llamadas a la acción listos para grabar.",
    priceFrom: "$45",
    priceUnit: "USD / guion",
  },
  {
    id: "research",
    icon: Search,
    title: "Investigación de Mercado",
    description:
      "Análisis de audiencia, dolores, hallazgos culturales y tendencias LATAM + USA Hispanic con datos reales.",
    priceFrom: "$225",
    priceUnit: "USD / proyecto",
  },
  {
    id: "competencia",
    icon: Eye,
    title: "Análisis de Competencia",
    description:
      "Auditoría de tus competidores directos: contenido creativo, precios, posicionamiento y oportunidades de mercado.",
    priceFrom: "$175",
    priceUnit: "USD / proyecto",
  },
  {
    id: "edicion",
    icon: Film,
    title: "Edición Profesional",
    description:
      "Posproducción cinematográfica: corrección de color, gráficos animados, subtítulos animados y exportaciones listas para publicar.",
    priceFrom: "$33",
    priceUnit: "USD / video",
  },
  {
    id: "creadores",
    icon: BadgeCheck,
    title: "Creadores Verificados",
    description:
      "Acceso a nuestra red de +30 creadores latinos pre-verificados. Selección por nicho, audiencia y estilo de marca.",
    priceFrom: "$75",
    priceUnit: "USD / video",
  },
];

const PACKAGE_INCLUDES = [
  "Consultoría estratégica mensual",
  "Estrategia de marketing completa",
  "Estrategia de contenido editorial",
  "Guiones UGC por campaña",
  "Investigación de mercado continua",
  "Análisis de competencia trimestral",
  "Edición profesional ilimitada",
  "Red de creadores verificados",
  "Asesora de cuenta dedicada",
  "Reportes semanales de resultados",
  "Derechos de publicidad 12 meses",
  "Garantía de 7 días",
];

function ServicioCard({
  servicio,
  index,
  isIntersecting,
}: {
  servicio: Servicio;
  index: number;
  isIntersecting: boolean;
}) {
  const Icon = servicio.icon;

  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      animate={isIntersecting ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.55,
        delay: 0.06 + index * 0.06,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={cn(
        "group relative rounded-2xl p-5 sm:p-6 lg:p-7",
        "border border-brand-graphite/60 bg-white/[0.025]",
        "hover:border-brand-gold/40 hover:bg-white/[0.04]",
        "hover:shadow-[0_12px_40px_-12px_rgba(212,160,23,0.25)]",
        "transition-all duration-300 hover:-translate-y-1",
        "flex flex-col h-full"
      )}
    >
      {/* Gradient border on hover */}
      <div
        aria-hidden
        className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          padding: "1px",
          background:
            "linear-gradient(135deg, rgba(249,179,52,0.6), rgba(212,160,23,0.2), transparent 60%)",
          WebkitMask:
            "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
      />

      {/* Icon */}
      <div className="relative w-11 h-11 rounded-xl bg-brand-yellow/10 border border-brand-yellow/25 flex items-center justify-center mb-4 group-hover:bg-brand-yellow/20 group-hover:border-brand-yellow/50 transition-colors">
        <Icon className="h-5 w-5 text-brand-yellow" aria-hidden="true" />
      </div>

      {/* Title */}
      <h3 className="font-display text-lg sm:text-xl lg:text-2xl text-white leading-tight mb-3">
        {servicio.title}
      </h3>

      {/* Description */}
      <p className="text-sm text-brand-gray leading-relaxed mb-5 flex-grow">
        {servicio.description}
      </p>

      {/* Price */}
      <div className="pt-4 border-t border-brand-graphite/50">
        <div className="flex items-baseline justify-between gap-2">
          <div>
            <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-brand-gold/70 mb-1">
              Desde
            </p>
            <div className="flex items-baseline gap-2">
              <span className="font-display text-2xl sm:text-3xl text-brand-yellow">
                {servicio.priceFrom}
              </span>
              <span className="text-xs text-brand-gray/80">
                {servicio.priceUnit}
              </span>
            </div>
          </div>
          <ArrowRight
            className="h-5 w-5 text-brand-gold/60 group-hover:text-brand-yellow group-hover:translate-x-1 transition-all flex-shrink-0"
            aria-hidden
          />
        </div>
      </div>
    </motion.article>
  );
}

export function Servicios() {
  const { ref, isIntersecting } = useIntersection<HTMLDivElement>({
    threshold: 0.04,
  });

  return (
    <section
      id="servicios"
      aria-labelledby="servicios-title"
      className="relative py-20 sm:py-28 lg:py-32 px-4 sm:px-6 lg:px-8 bg-brand-black overflow-hidden scroll-mt-20 sm:scroll-mt-24"
    >
      {/* Background decoration */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-50"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(249,179,52,0.06) 0%, transparent 60%)",
        }}
      />

      <div className="relative max-w-7xl mx-auto" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isIntersecting ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-14 sm:mb-20 max-w-4xl mx-auto"
        >
          <p className="sr-only">Servicios</p>
          <h2
            id="servicios-title"
            className="font-display text-[clamp(2.5rem,6vw,5rem)] leading-[0.95] text-white tracking-tight uppercase"
          >
            Servicios a la medida.
            <br />
            <span
              style={{
                background: "linear-gradient(90deg, #f9b334, #d4a017)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              O todo el paquete.
            </span>
          </h2>
          <p className="mt-6 text-base sm:text-lg text-brand-gray leading-relaxed">
            8 servicios independientes diseñados para marcas que quieren dominar
            su categoría. Cada uno se cotiza por separado —{" "}
            <span className="text-white font-semibold">
              o los combinas todos
            </span>{" "}
            en el Paquete Completo UGC y ahorras hasta{" "}
            <span className="text-emerald-400 font-semibold">
              $4.000 USD/mes
            </span>
            .
          </p>
        </motion.div>

        {/* Grid 8 servicios individuales */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {SERVICIOS.map((s, i) => (
            <ServicioCard
              key={s.id}
              servicio={s}
              index={i}
              isIntersecting={isIntersecting}
            />
          ))}
        </div>


        {/* ─── Paquete Completo — el héroe ────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isIntersecting ? { opacity: 1, y: 0 } : {}}
          transition={{
            duration: 0.8,
            delay: 0.6,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="relative mt-14 sm:mt-20 rounded-3xl overflow-hidden"
        >
          {/* Background layers */}
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(135deg, #0a0a0a 0%, #141414 40%, #1a1a1a 100%)",
            }}
          />
          {/* Imagen editorial del kit UGC */}
          <div aria-hidden className="absolute inset-0 opacity-[0.28]">
            <Image
              src="/brand/home/servicios.png"
              alt=""
              fill
              sizes="100vw"
              className="object-cover object-right"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-brand-black via-brand-black/80 to-brand-black/40" />
          </div>
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 60% 80% at 10% 0%, rgba(249,179,52,0.18) 0%, transparent 50%), radial-gradient(ellipse 60% 70% at 100% 100%, rgba(212,160,23,0.14) 0%, transparent 55%)",
            }}
          />

          {/* Gradient border */}
          <div
            aria-hidden
            className="absolute inset-0 rounded-3xl pointer-events-none"
            style={{
              padding: "2px",
              background:
                "linear-gradient(135deg, rgba(249,179,52,0.7) 0%, rgba(212,160,23,0.35) 40%, rgba(212,160,23,0.1) 70%, transparent 100%)",
              WebkitMask:
                "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
              WebkitMaskComposite: "xor",
              maskComposite: "exclude",
            }}
          />

          {/* Grid pattern decorativo */}
          <div
            aria-hidden
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
              backgroundSize: "50px 50px",
              maskImage:
                "radial-gradient(ellipse at center, black 30%, transparent 75%)",
            }}
          />

          <div className="relative grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-10 p-6 sm:p-10 lg:p-14 xl:p-16">
            {/* Left: Paquete info */}
            <div className="lg:col-span-3 flex flex-col">
              {/* Badge */}
              <div className="inline-flex self-start items-center gap-2 px-4 py-2 rounded-full bg-brand-yellow/10 border border-brand-yellow/40 mb-6">
                <Sparkles
                  className="h-3.5 w-3.5 text-brand-yellow"
                  aria-hidden
                />
                <span className="text-[11px] font-bold tracking-[0.25em] uppercase text-brand-yellow">
                  Paquete Completo · Más Popular
                </span>
              </div>

              {/* Title */}
              <h3 className="font-display text-[clamp(2rem,5vw,4.5rem)] leading-[0.95] text-white tracking-tight uppercase mb-5">
                Paquete Completo UGC.
                <br />
                <span
                  style={{
                    background: "linear-gradient(90deg, #f9b334, #d4a017)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Todo incluido.
                </span>
              </h3>

              <p className="text-sm sm:text-base lg:text-lg text-brand-gray max-w-xl leading-relaxed mb-8">
                Los 8 servicios críticos de marketing y producción UGC bajo un
                solo techo, un solo contrato, un solo equipo. Pensado para
                marcas que valoran su tiempo.
              </p>

              {/* Includes grid */}
              <div className="mb-8">
                <p className="text-[11px] font-bold tracking-[0.25em] uppercase text-brand-yellow mb-4">
                  Incluye todo lo siguiente
                </p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5">
                  {PACKAGE_INCLUDES.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-sm text-white/90"
                    >
                      <span className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-brand-yellow/15 border border-brand-yellow/50 flex items-center justify-center">
                        <Check
                          className="h-3 w-3 text-brand-yellow"
                          strokeWidth={3}
                          aria-hidden
                        />
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right: Price + CTA + comparison */}
            <div className="lg:col-span-2 flex flex-col gap-5">
              {/* Price card */}
              <div className="rounded-2xl border-2 border-brand-yellow/60 bg-brand-yellow/5 p-5 sm:p-7">
                <p className="text-[11px] font-bold tracking-[0.25em] uppercase text-brand-gold mb-3">
                  Desde
                </p>
                <div className="flex items-baseline gap-3 mb-2">
                  <span className="font-display text-5xl sm:text-6xl text-white">
                    $400
                  </span>
                  <span className="text-sm text-brand-gray">USD / mes</span>
                </div>
                <p className="text-sm text-brand-gray mb-6">
                  Escala desde 5 hasta 30+ videos al mes con 3 variantes cada
                  uno.
                </p>

                {/* CTA */}
                <a
                  href="#pricing"
                  className="group/cta flex items-center justify-center gap-2 w-full px-6 py-4 rounded-xl bg-brand-yellow text-black font-sans font-bold text-base tracking-wide hover:bg-brand-gold transition-all hover:shadow-[0_10px_40px_-10px_rgba(249,179,52,0.5)] min-h-[52px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                >
                  Ver planes
                  <ArrowRight
                    className="h-5 w-5 transition-transform group-hover/cta:translate-x-1"
                    aria-hidden
                  />
                </a>

                <p className="text-[11px] text-center text-brand-gray/70 mt-4">
                  Garantía de 7 días · Sin permanencia forzada
                </p>
              </div>

              {/* Savings breakdown */}
              <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-5 sm:p-6">
                <p className="text-[11px] font-bold tracking-[0.25em] uppercase text-emerald-400 mb-4 flex items-center gap-2">
                  <span aria-hidden>💰</span>
                  Tu ahorro
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-white/75">
                    <span>Contratando por separado</span>
                    <span className="line-through opacity-70">~$4.700/mes</span>
                  </div>
                  <div className="flex justify-between text-white font-semibold">
                    <span>Paquete Completo UGC - Crecimiento</span>
                    <span>$700/mes</span>
                  </div>
                  <div className="border-t border-emerald-500/30 pt-3 mt-3 flex justify-between items-baseline">
                    <span className="text-emerald-400 font-bold">Ahorras</span>
                    <span className="font-display text-2xl text-emerald-400">
                      $4.000
                    </span>
                  </div>
                  <p className="text-[11px] text-emerald-400/80 text-right">
                    USD / mes · 85% menos
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
