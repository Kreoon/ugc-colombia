"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { useIntersection } from "@/hooks/use-intersection";
import {
  ShieldCheck,
  Target,
  TrendingUp,
  RefreshCcw,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
} from "lucide-react";
import { PERFORMANCE_GUARANTEE } from "@/lib/guarantee-policy";

const METRICS = [
  {
    icon: Target,
    label: "CTR mínimo",
    value: `≥ ${PERFORMANCE_GUARANTEE.minCtrPercent}%`,
    desc: "Click-Through Rate por video",
  },
  {
    icon: TrendingUp,
    label: "Hook Rate mínimo",
    value: `≥ ${PERFORMANCE_GUARANTEE.minHookRatePercent}%`,
    desc: "Audiencia que ve más de 3 segundos",
  },
  {
    icon: RefreshCcw,
    label: "Reemplazo cubierto",
    value: `${PERFORMANCE_GUARANTEE.replacementCapPercent}%`,
    desc: "Del paquete contratado",
  },
];

export function GuaranteeSection() {
  const { ref, isIntersecting } = useIntersection<HTMLDivElement>({
    threshold: 0.05,
  });

  return (
    <section
      id="garantia"
      aria-labelledby="garantia-title"
      className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8 scroll-mt-20 sm:scroll-mt-24"
      style={{
        background:
          "linear-gradient(180deg, #000000 0%, #050a07 50%, #000000 100%)",
      }}
    >
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 45% at 50% 35%, rgba(16,185,129,0.10) 0%, transparent 60%)",
        }}
      />

      <div className="relative max-w-5xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isIntersecting ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-12 max-w-2xl mx-auto"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-sans font-bold tracking-widest uppercase mb-5 bg-emerald-500/15 text-emerald-400 border border-emerald-500/40">
            <ShieldCheck className="w-3.5 h-3.5" />
            Garantía de performance
          </span>
          <h2
            id="garantia-title"
            className="font-display text-[clamp(2rem,4.5vw,3.5rem)] leading-[1] text-white tracking-tight uppercase"
          >
            Si no rinde,
            <br />
            <span
              style={{
                background: "linear-gradient(90deg, #10b981, #34d399)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              te lo reemplazamos.
            </span>
          </h2>
          <p className="mt-5 text-sm sm:text-base text-brand-gray leading-relaxed">
            Si tus videos no llegan a CTR mínimo y Hook Rate mínimo dentro de
            anuncios pagados, los reemplazamos sin costo hasta cubrir el{" "}
            {PERFORMANCE_GUARANTEE.replacementCapPercent}% de tu paquete.
          </p>
        </motion.div>

        {/* Métricas */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isIntersecting ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10"
        >
          {METRICS.map((m) => {
            const Icon = m.icon;
            return (
              <div
                key={m.label}
                className="rounded-2xl border border-emerald-500/25 bg-emerald-500/[0.04] p-5 text-center"
              >
                <div className="w-10 h-10 mx-auto rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center mb-3">
                  <Icon className="w-5 h-5 text-emerald-400" aria-hidden />
                </div>
                <p className="text-[10px] font-bold tracking-[0.25em] uppercase text-emerald-400/80 mb-1">
                  {m.label}
                </p>
                <p className="font-display text-3xl sm:text-4xl text-white leading-none">
                  {m.value}
                </p>
                <p className="text-[11px] text-brand-gray mt-2">{m.desc}</p>
              </div>
            );
          })}
        </motion.div>

        {/* Cómo funciona */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isIntersecting ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-2xl border border-brand-graphite/60 bg-white/[0.025] p-6 sm:p-8 mb-6"
        >
          <p className="text-[10px] font-bold tracking-[0.25em] uppercase text-brand-gold/70 mb-5">
            Cómo funciona
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 text-sm">
            <Rule
              icon={CheckCircle2}
              tone="emerald"
              title="Se mide por video, no por variante."
              body="Si UNA sola variante del video supera los umbrales, ese video se considera ganador y no aplica la garantía sobre él."
            />
            <Rule
              icon={CheckCircle2}
              tone="emerald"
              title="Solo en publicidad pagada."
              body="La garantía cubre desempeño en Meta Ads, TikTok Ads o Google Ads. Contenido orgánico no aplica."
            />
            <Rule
              icon={CheckCircle2}
              tone="emerald"
              title="Acceso a tu cuenta publicitaria."
              body="Necesitamos lectura de tu Business Manager para validar las métricas. Te damos las instrucciones de acceso seguro."
            />
            <Rule
              icon={CheckCircle2}
              tone="emerald"
              title="Ventana de evaluación: 14 días."
              body="Cada video debe acumular al menos 14 días con gasto publicitario activo para considerar su desempeño."
            />
            <Rule
              icon={AlertCircle}
              tone="amber"
              title={`Si el ${PERFORMANCE_GUARANTEE.voidThresholdPercent}% del paquete cumple, se anula.`}
              body="Si la mayoría de los videos están funcionando, significa que la campaña está viva — la garantía se desactiva sobre los videos restantes."
            />
            <Rule
              icon={AlertCircle}
              tone="amber"
              title="Cap del 30% del paquete."
              body="Reemplazamos hasta el 30% de tus videos. Para Crecimiento (10 videos) son hasta 3, para Escala (30 videos) hasta 9."
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isIntersecting ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="text-center"
        >
          <Link
            href="/garantia"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-emerald-500/40 bg-emerald-500/10 text-sm font-semibold text-emerald-400 hover:bg-emerald-500/15 transition-colors"
          >
            Ver condiciones completas
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

function Rule({
  icon: Icon,
  tone,
  title,
  body,
}: {
  icon: typeof CheckCircle2;
  tone: "emerald" | "amber";
  title: string;
  body: string;
}) {
  const color =
    tone === "emerald"
      ? "text-emerald-400"
      : "text-amber-400";
  return (
    <div className="flex items-start gap-3">
      <Icon className={`w-4 h-4 ${color} flex-shrink-0 mt-0.5`} aria-hidden />
      <div>
        <p className="text-white font-semibold text-sm leading-snug">{title}</p>
        <p className="text-brand-gray text-xs mt-1 leading-relaxed">{body}</p>
      </div>
    </div>
  );
}
