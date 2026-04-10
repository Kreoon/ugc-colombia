"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { useIntersection } from "@/hooks/use-intersection";
import { TrendingUp, Sparkles, ShoppingBag, Layers } from "lucide-react";

type Metrica = { label: string; value: string; desc: string };
type Caso = {
  id: string;
  tag: string;
  icon: typeof TrendingUp;
  image: string;
  imageAlt: string;
  title: React.ReactNode;
  desc: string;
  metricas: readonly Metrica[];
};

const CASOS: readonly Caso[] = [
  {
    id: "skincare",
    tag: "SKINCARE PREMIUM · LATAM",
    icon: Sparkles,
    image: "/brand/casos/caso-skincare.png",
    imageAlt: "Gota de sérum premium en luz editorial dorada",
    title: (
      <>
        Del 22% al{" "}
        <span
          style={{
            background: "linear-gradient(90deg, #f9b334, #d4a017)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          38% de hook rate
        </span>
        .
      </>
    ),
    desc: "Target del marco C.O.N.V.E.R.T. aplicado a skincare: sacar el creativo del promedio de industria (20-25%) y llevarlo al top-cuartil de Meta (30%+). Foco en los primeros 2 segundos.",
    metricas: [
      { label: "HOOK", value: "38%", desc: "Hook rate Meta (3s)" },
      { label: "HOLD", value: "62%", desc: "Retención a 15s" },
      { label: "CTR", value: "2.8%", desc: "Click-through rate" },
    ],
  },
  {
    id: "moda",
    tag: "E-COMMERCE · MODA",
    icon: ShoppingBag,
    image: "/brand/casos/caso-moda.png",
    imageAlt: "Tela editorial drapeada en luz cálida diagonal",
    title: (
      <>
        CTR de{" "}
        <span
          style={{
            background: "linear-gradient(90deg, #f9b334, #d4a017)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          3.4% en TikTok
        </span>
        .
      </>
    ),
    desc: "Target en Spark Ads nativos: superar el 3% de CTR (vs 0.84% del promedio de TikTok Ads). Foco en ganchos visuales de producto en contexto real, no en foto de estudio.",
    metricas: [
      { label: "HOOK", value: "42%", desc: "Hook rate TikTok (2s)" },
      { label: "CTR", value: "3.4%", desc: "Spark Ads nativos" },
      { label: "CPM", value: "-38%", desc: "vs creativo de marca" },
    ],
  },
  {
    id: "saas",
    tag: "SAAS · FINTECH",
    icon: Layers,
    image: "/brand/casos/caso-saas.png",
    imageAlt: "Haz de luz dorado cinematográfico sobre espacio oscuro",
    title: (
      <>
        Hold rate del{" "}
        <span
          style={{
            background: "linear-gradient(90deg, #f9b334, #d4a017)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          64% en frío
        </span>
        .
      </>
    ),
    desc: "Target en audiencias frías B2B: llevar el hold rate al top-cuartil (60%+) explicando el producto en 15 segundos. Medimos costo por visita cualificada, no ROAS.",
    metricas: [
      { label: "HOLD", value: "64%", desc: "Retención a 15s" },
      { label: "HOOK", value: "34%", desc: "Hook rate Meta (3s)" },
      { label: "CPV", value: "-47%", desc: "Costo por visita cualif." },
    ],
  },
] as const;

export function Casos() {
  const { ref, isIntersecting } = useIntersection<HTMLDivElement>({
    threshold: 0.1,
  });

  const [destacado, ...resto] = CASOS;
  const IconoDestacado = destacado.icon;

  return (
    <section
      id="casos"
      aria-labelledby="casos-title"
      className="relative py-20 sm:py-28 lg:py-32 px-4 sm:px-6 lg:px-8 bg-brand-black scroll-mt-20 sm:scroll-mt-24"
    >
      <div className="max-w-6xl mx-auto" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isIntersecting ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-5"
        >
          <p className="sr-only">Casos de éxito</p>
          <h2
            id="casos-title"
            className="font-display text-[clamp(2.5rem,6vw,5rem)] leading-[0.95] text-white tracking-tight"
          >
            Que los resultados hablen por nosotros.
          </h2>
        </motion.div>

        {/* Subtítulo metodológico */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={isIntersecting ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="text-center text-brand-gray text-sm sm:text-base font-sans max-w-2xl mx-auto mb-12 sm:mb-16 leading-relaxed"
        >
          Medimos lo que el video <span className="text-white font-semibold">sí controla</span>:
          hook rate, hold rate y CTR. No ROAS — eso depende de oferta, pricing y funnel.
        </motion.p>

        {/* Caso destacado */}
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          animate={isIntersecting ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-3xl overflow-hidden border border-brand-gold/25 bg-gradient-to-br from-brand-yellow/4 to-transparent mb-5"
        >
          <div
            aria-hidden="true"
            className="absolute top-0 right-0 w-80 h-80 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at 100% 0%, rgba(249,179,52,0.12), transparent 65%)",
            }}
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            <div className="relative min-h-[240px] sm:min-h-[280px] lg:min-h-full overflow-hidden bg-brand-black">
              <Image
                src={destacado.image}
                alt={destacado.imageAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                priority
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-brand-black/60"
              />
              <div
                aria-hidden="true"
                className="absolute top-3 left-3 w-10 h-10 rounded-xl flex items-center justify-center backdrop-blur-md"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(249,179,52,0.25), rgba(212,160,23,0.1))",
                  border: "1px solid rgba(212,160,23,0.35)",
                }}
              >
                <IconoDestacado
                  className="h-5 w-5 text-brand-yellow"
                  aria-hidden="true"
                />
              </div>
            </div>

            <div className="p-6 sm:p-8 lg:p-12 flex flex-col justify-center">
              <span className="inline-flex self-start items-center mb-5 text-xs font-sans font-bold tracking-widest uppercase bg-brand-yellow/12 text-brand-yellow border border-brand-yellow/25 px-3 py-1.5 rounded-full">
                {destacado.tag}
              </span>

              <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl text-white leading-tight mb-3">
                {destacado.title}
              </h3>

              <p className="text-brand-gray text-sm sm:text-base leading-relaxed mb-7">
                {destacado.desc}
              </p>

              <div className="grid grid-cols-3 gap-2 sm:gap-4">
                {destacado.metricas.map((m) => (
                  <div
                    key={m.label}
                    className="rounded-xl bg-white/4 border border-brand-gold/15 p-3 sm:p-4 text-center"
                  >
                    <p
                      className="font-display text-lg sm:text-2xl leading-tight mb-0.5"
                      style={{
                        background:
                          "linear-gradient(135deg, #f9b334, #d4a017)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                      }}
                    >
                      {m.value}
                    </p>
                    <p className="text-[10px] sm:text-xs text-brand-gray font-sans leading-tight">
                      {m.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Casos secundarios */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
          {resto.map((caso, i) => {
            const Icono = caso.icon;
            return (
              <motion.article
                key={caso.id}
                initial={{ opacity: 0, y: 24 }}
                animate={isIntersecting ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.5,
                  delay: 0.2 + i * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="relative rounded-2xl border border-brand-gold/20 bg-brand-black overflow-hidden flex flex-col min-h-[380px]"
              >
                <Image
                  src={caso.image}
                  alt={caso.imageAlt}
                  fill
                  sizes="(max-width: 640px) 100vw, 50vw"
                  className="object-cover opacity-55"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/85 to-brand-black/40"
                />
                <div
                  aria-hidden="true"
                  className="absolute top-0 right-0 w-40 h-40 pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(ellipse at 100% 0%, rgba(249,179,52,0.12), transparent 70%)",
                  }}
                />

                <div className="relative z-10 flex flex-col h-full p-6 sm:p-7">
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                      style={{
                        background:
                          "linear-gradient(135deg, rgba(249,179,52,0.18), rgba(212,160,23,0.08))",
                        border: "1px solid rgba(212,160,23,0.25)",
                      }}
                    >
                      <Icono
                        className="h-5 w-5 text-brand-yellow"
                        aria-hidden="true"
                      />
                    </div>
                    <span className="text-[10px] sm:text-xs font-sans font-bold tracking-widest uppercase text-brand-gold">
                      {caso.tag}
                    </span>
                  </div>

                  <h3 className="font-display text-xl sm:text-2xl text-white leading-tight mb-2">
                    {caso.title}
                  </h3>

                  <p className="text-brand-gray text-xs sm:text-sm leading-relaxed mb-5">
                    {caso.desc}
                  </p>

                  <div className="grid grid-cols-3 gap-2 mt-auto">
                    {caso.metricas.map((m) => (
                      <div
                        key={m.label}
                        className="rounded-lg bg-white/4 border border-brand-gold/15 p-2.5 text-center"
                      >
                        <p
                          className="font-display text-base sm:text-lg leading-tight mb-0.5"
                          style={{
                            background:
                              "linear-gradient(135deg, #f9b334, #d4a017)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            backgroundClip: "text",
                          }}
                        >
                          {m.value}
                        </p>
                        <p className="text-[9px] sm:text-[10px] text-brand-gray font-sans leading-tight">
                          {m.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* Disclaimer metodológico */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isIntersecting ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center text-[11px] sm:text-xs text-brand-gray/70 font-sans max-w-3xl mx-auto mt-10 leading-relaxed"
        >
          Targets basados en benchmarks públicos de industria 2025-2026 (Motion, Triple Whale,
          Dash Social, Billo). No reportamos ROAS ni ventas como KPI propio: esas métricas
          dependen de variables ajenas al video — oferta, pricing, landing y checkout.
        </motion.p>
      </div>
    </section>
  );
}
