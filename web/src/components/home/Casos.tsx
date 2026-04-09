"use client";

import { motion } from "motion/react";
import { useIntersection } from "@/hooks/use-intersection";
import { TrendingUp, Lock } from "lucide-react";

const METRICAS = [
  { label: "CTR", value: "+146%", desc: "Click-through rate" },
  { label: "CPA", value: "-55%", desc: "Costo por adquisición" },
  { label: "ROAS", value: "+217%", desc: "Retorno en ads" },
] as const;

export function Casos() {
  const { ref, isIntersecting } = useIntersection<HTMLDivElement>({
    threshold: 0.1,
  });

  return (
    <section
      id="casos"
      aria-labelledby="casos-title"
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
          <p className="text-brand-gold text-sm font-sans font-semibold tracking-widest uppercase mb-3">
            Resultados reales
          </p>
          <h2
            id="casos-title"
            className="font-display text-4xl sm:text-5xl lg:text-6xl text-white leading-tight"
          >
            Los números hablan.
          </h2>
        </motion.div>

        {/* Caso destacado */}
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          animate={isIntersecting ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-3xl overflow-hidden border border-brand-gold/25 bg-gradient-to-br from-brand-yellow/4 to-transparent mb-5"
        >
          {/* Glow corner */}
          <div
            aria-hidden="true"
            className="absolute top-0 right-0 w-80 h-80 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at 100% 0%, rgba(249,179,52,0.12), transparent 65%)",
            }}
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            {/* Imagen placeholder */}
            <div
              className="relative min-h-[260px] lg:min-h-full flex items-center justify-center overflow-hidden"
              style={{
                background:
                  "linear-gradient(135deg, #1a1200 0%, #0d0900 50%, #000000 100%)",
              }}
            >
              {/* Pattern decorativo */}
              <div
                aria-hidden="true"
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d4a017' fill-opacity='0.3'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                }}
              />
              <div className="relative z-10 text-center px-8 py-12">
                <div
                  className="w-20 h-20 rounded-2xl mx-auto mb-4 flex items-center justify-center"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(249,179,52,0.2), rgba(212,160,23,0.1))",
                    border: "1px solid rgba(212,160,23,0.3)",
                  }}
                >
                  <TrendingUp className="h-9 w-9 text-brand-yellow" aria-hidden="true" />
                </div>
                <p className="text-brand-gray text-sm font-sans">
                  Imagen del caso próximamente
                </p>
              </div>
            </div>

            {/* Contenido */}
            <div className="p-8 sm:p-10 lg:p-12 flex flex-col justify-center">
              {/* Badge */}
              <span className="inline-flex self-start items-center mb-6 text-xs font-sans font-bold tracking-widest uppercase bg-brand-yellow/12 text-brand-yellow border border-brand-yellow/25 px-3 py-1.5 rounded-full">
                SKINCARE PREMIUM · LATAM
              </span>

              <h3 className="font-display text-3xl sm:text-4xl text-white leading-tight mb-3">
                De 1.2x a{" "}
                <span
                  style={{
                    background: "linear-gradient(90deg, #f9b334, #d4a017)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  3.8x ROAS
                </span>{" "}
                en 8 semanas.
              </h3>

              <p className="text-brand-gray text-sm sm:text-base leading-relaxed mb-8">
                Framework C.O.N.V.E.R.T. aplicado durante 8 semanas. 32 videos
                UGC producidos. 68% del ROAS final vino de solo 3 hooks
                ganadores.
              </p>

              {/* Métricas */}
              <div className="grid grid-cols-3 gap-3 sm:gap-4">
                {METRICAS.map((m) => (
                  <div
                    key={m.label}
                    className="rounded-xl bg-white/4 border border-brand-gold/15 p-3 sm:p-4 text-center"
                  >
                    <p
                      className="font-display text-xl sm:text-2xl leading-tight mb-0.5"
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
                    <p className="text-xs text-brand-gray font-sans">
                      {m.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* 2 upcoming placeholders */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
          {["Ecommerce · Moda", "SaaS · Fintech"].map((tag, i) => (
            <motion.div
              key={tag}
              initial={{ opacity: 0, y: 24 }}
              animate={isIntersecting ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.5,
                delay: 0.2 + i * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative rounded-2xl border border-brand-graphite/50 bg-white/2 p-8 overflow-hidden flex flex-col items-center justify-center text-center min-h-[180px]"
            >
              {/* Blur overlay */}
              <div
                aria-hidden="true"
                className="absolute inset-0 backdrop-blur-[2px] bg-black/30 rounded-2xl"
              />
              <div className="relative z-10 flex flex-col items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/8 border border-white/15 flex items-center justify-center">
                  <Lock className="h-4 w-4 text-brand-gray" aria-hidden="true" />
                </div>
                <span className="text-xs font-sans font-semibold text-brand-gold tracking-widest uppercase">
                  {tag}
                </span>
                <p className="text-sm text-brand-gray font-sans">
                  Caso próximamente
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
