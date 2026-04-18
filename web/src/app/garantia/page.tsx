import type { Metadata } from "next";
import Link from "next/link";
import {
  ShieldCheck,
  Target,
  TrendingUp,
  RefreshCcw,
  ArrowRight,
} from "lucide-react";
import { Navbar } from "@/components/home/Navbar";
import { Footer } from "@/components/home/Footer";
import {
  PERFORMANCE_GUARANTEE,
  GUARANTEE_RULES,
} from "@/lib/guarantee-policy";
import { PLANES_RECURRENTES } from "@/lib/pricing-plans";

export const metadata: Metadata = {
  title: "Garantía de performance — UGC Colombia",
  description:
    "Si tus videos UGC no llegan a CTR ≥ 1.5% y Hook Rate ≥ 25% en publicidad pagada, los reemplazamos sin costo hasta cubrir el 30% de tu paquete.",
  alternates: { canonical: "https://ugccolombia.co/garantia" },
};

const SUMMARY_CARDS = [
  {
    icon: Target,
    label: "CTR mínimo",
    value: `≥ ${PERFORMANCE_GUARANTEE.minCtrPercent}%`,
    desc: "Tasa de clics por video en anuncios pagados",
  },
  {
    icon: TrendingUp,
    label: "Hook Rate mínimo",
    value: `≥ ${PERFORMANCE_GUARANTEE.minHookRatePercent}%`,
    desc: "Personas que pasan los primeros 3 segundos del video",
  },
  {
    icon: RefreshCcw,
    label: "Reemplazo cubierto",
    value: `${PERFORMANCE_GUARANTEE.replacementCapPercent}%`,
    desc: "Del paquete contratado, sin costo extra",
  },
];

export default function GarantiaPage() {
  return (
    <>
      <Navbar />
      <main className="relative bg-brand-black text-white min-h-screen">
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 30% at 50% 10%, rgba(16,185,129,0.10), transparent 60%)",
          }}
        />

        <article className="relative max-w-3xl mx-auto pt-28 pb-20 px-4 sm:px-6">
          {/* Hero */}
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[10px] font-semibold text-emerald-400 tracking-[0.25em] uppercase mb-5">
              <ShieldCheck className="w-3.5 h-3.5" />
              Garantía de performance
            </span>
            <h1 className="font-display text-[clamp(2rem,5vw,3.5rem)] leading-[1] text-white tracking-tight uppercase">
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
            </h1>
            <p className="mt-6 text-base text-brand-gray leading-relaxed max-w-xl mx-auto">
              Producir contenido UGC no es un acto de fe. Garantizamos que tus
              videos cumplan métricas de desempeño reales en publicidad pagada
              — y si no las cumplen, los reemplazamos.
            </p>
          </div>

          {/* Cards de resumen */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            {SUMMARY_CARDS.map((c) => {
              const Icon = c.icon;
              return (
                <div
                  key={c.label}
                  className="rounded-2xl border border-emerald-500/25 bg-emerald-500/[0.04] p-5 text-center"
                >
                  <div className="w-10 h-10 mx-auto rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center mb-3">
                    <Icon
                      className="w-5 h-5 text-emerald-400"
                      aria-hidden
                    />
                  </div>
                  <p className="text-[10px] font-bold tracking-[0.25em] uppercase text-emerald-400/80 mb-1">
                    {c.label}
                  </p>
                  <p className="font-display text-3xl sm:text-4xl text-white leading-none">
                    {c.value}
                  </p>
                  <p className="text-[11px] text-brand-gray mt-2 leading-relaxed">
                    {c.desc}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Cobertura por plan */}
          <section className="mb-12">
            <h2 className="font-display text-2xl text-white uppercase tracking-tight mb-4">
              Cobertura por plan
            </h2>
            <p className="text-sm text-brand-gray leading-relaxed mb-6">
              La garantía se aplica al{" "}
              {PERFORMANCE_GUARANTEE.replacementCapPercent}% del paquete
              contratado. Cuanto más grande tu plan, más videos pueden
              reemplazarse sin costo:
            </p>
            <div className="rounded-2xl border border-brand-graphite/60 bg-white/[0.025] overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-brand-graphite/60 text-left text-[11px] uppercase tracking-widest text-brand-gold/70">
                    <th className="px-4 py-3 font-semibold">Plan</th>
                    <th className="px-4 py-3 font-semibold">Videos del paquete</th>
                    <th className="px-4 py-3 font-semibold text-emerald-400">
                      Reemplazos cubiertos
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {PLANES_RECURRENTES.map((plan) => (
                    <tr
                      key={plan.id}
                      className="border-b border-brand-graphite/30 last:border-0"
                    >
                      <td className="px-4 py-3 text-white font-semibold">
                        {plan.name}
                      </td>
                      <td className="px-4 py-3 text-brand-gray">
                        {plan.videosCount} videos
                      </td>
                      <td className="px-4 py-3 text-emerald-400 font-bold">
                        {plan.guarantee.shortLabel}
                      </td>
                    </tr>
                  ))}
                  <tr>
                    <td className="px-4 py-3 text-white font-semibold">
                      A LA MEDIDA
                    </td>
                    <td className="px-4 py-3 text-brand-gray">60+ videos</td>
                    <td className="px-4 py-3 text-emerald-400 font-bold">
                      Personalizada por contrato
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Reglas */}
          <section className="mb-12">
            <h2 className="font-display text-2xl text-white uppercase tracking-tight mb-6">
              Reglas claras del juego
            </h2>
            <ol className="space-y-4">
              {GUARANTEE_RULES.map((rule, idx) => (
                <li
                  key={rule.title}
                  className="rounded-xl border border-brand-graphite/60 bg-white/[0.02] p-5"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold text-sm">
                      {idx + 1}
                    </div>
                    <div>
                      <p className="text-white font-semibold text-sm">
                        {rule.title}
                      </p>
                      <p className="text-brand-gray text-xs mt-1.5 leading-relaxed">
                        {rule.body}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          {/* Ejemplo */}
          <section className="mb-12 rounded-2xl border border-brand-gold/30 bg-brand-yellow/5 p-6 sm:p-7">
            <p className="text-[10px] font-bold tracking-[0.25em] uppercase text-brand-gold/70 mb-3">
              Ejemplo en plan Crecimiento
            </p>
            <p className="text-white text-sm leading-relaxed mb-3">
              Contratas el plan{" "}
              <strong className="text-brand-yellow">Crecimiento</strong> (10
              videos · 3 variantes cada uno).
            </p>
            <ul className="text-sm text-brand-gray space-y-2 mb-3">
              <li>
                · Subes los 10 videos a anuncios pagados de Meta o TikTok.
              </li>
              <li>
                · Después de 14 días con gasto activo, revisamos las métricas
                con acceso a tu cuenta publicitaria.
              </li>
              <li>
                · Si <strong className="text-white">5 videos</strong> no logran
                ni 1.5% de tasa de clics ni 25% de tasa de retención en ninguna
                de sus 3 variantes → te reemplazamos hasta 3 (el 30% del
                paquete) sin costo extra.
              </li>
              <li>
                · Si{" "}
                <strong className="text-white">
                  8 o más videos sí cumplen
                </strong>{" "}
                los umbrales (80%) → la garantía se anula porque tu campaña
                está vendiendo.
              </li>
            </ul>
          </section>

          <div className="text-center">
            <Link
              href="/precios"
              className="inline-flex items-center gap-2 px-6 py-4 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-black font-bold text-sm transition-colors"
            >
              Ver planes con garantía
              <ArrowRight className="w-4 h-4" />
            </Link>
            <p className="text-[11px] text-brand-gray/60 mt-4">
              ¿Dudas? Escríbenos por WhatsApp y te explicamos cómo aplica a tu
              caso específico.
            </p>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
