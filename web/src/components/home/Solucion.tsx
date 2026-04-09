"use client";

import { motion } from "motion/react";
import { useIntersection } from "@/hooks/use-intersection";
import { Target, Users, Film, BarChart3 } from "lucide-react";

const PASOS = [
  {
    icon: Target,
    step: "01",
    title: "Estrategia",
    description:
      "Definimos tu buyer persona, ángulos de mensaje y territorios creativos antes de grabar un solo segundo. El brief estratégico que la mayoría de agencias omite.",
  },
  {
    icon: Users,
    step: "02",
    title: "Casting curado",
    description:
      "Seleccionamos creadores de nuestra red verificada que ya conocen tu nicho. Latinos reales, acentos reales, que conectan con tu audiencia objetivo.",
  },
  {
    icon: Film,
    step: "03",
    title: "Producción en lote",
    description:
      "Producimos todos los videos en ciclos coordinados. Revisión, corrección y entrega en 7 días con guiones aprobados. Sin sorpresas, sin perseguir a nadie.",
  },
  {
    icon: BarChart3,
    step: "04",
    title: "Iteración con data",
    description:
      "Medimos CTR, hook rate y ROAS de cada video. Los ganadores se escalan, los perdedores se reemplazan. Tu presupuesto de ads siempre con el mejor creative.",
  },
] as const;

export function Solucion() {
  const { ref, isIntersecting } = useIntersection<HTMLDivElement>({
    threshold: 0.08,
  });

  return (
    <section
      id="solucion"
      aria-labelledby="solucion-title"
      className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8"
      style={{
        background:
          "linear-gradient(180deg, #000000 0%, #0a0800 50%, #000000 100%)",
      }}
    >
      {/* Glow central */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 40% at 50% 50%, rgba(212,160,23,0.05) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-6xl mx-auto" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isIntersecting ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-14 sm:mb-20"
        >
          <p className="sr-only">Metodología</p>
          <h2
            id="solucion-title"
            className="font-display text-4xl sm:text-5xl lg:text-6xl text-white leading-tight"
          >
            Así trabajamos contigo.
          </h2>
          <p className="mt-4 text-brand-gray max-w-xl mx-auto text-base sm:text-lg leading-relaxed">
            Cuatro pasos probados que convierten tu inversión en creative en
            resultados medibles.
          </p>
        </motion.div>

        {/* Grid 2×2 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {PASOS.map((paso, i) => {
            const Icon = paso.icon;
            return (
              <motion.div
                key={paso.step}
                initial={{ opacity: 0, y: 36 }}
                animate={isIntersecting ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.6,
                  delay: 0.1 + i * 0.12,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="group relative rounded-2xl border border-brand-graphite/50 bg-white/3 p-7 sm:p-8 overflow-hidden transition-all duration-300 hover:border-brand-gold/25 hover:bg-white/5 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(212,160,23,0.08)]"
              >
                {/* Corner glow */}
                <div
                  aria-hidden="true"
                  className="absolute top-0 right-0 w-32 h-32 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(ellipse at 100% 0%, rgba(212,160,23,0.12), transparent 70%)",
                  }}
                />

                {/* Icon box */}
                <div className="flex items-center gap-4 mb-5">
                  <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-brand-yellow/10 border border-brand-yellow/20 flex items-center justify-center group-hover:bg-brand-yellow/20 group-hover:border-brand-yellow/40 transition-colors duration-300">
                    <Icon
                      className="h-5 w-5 text-brand-yellow"
                      aria-hidden="true"
                    />
                  </div>
                  <span className="font-display text-brand-graphite text-3xl leading-none">
                    {paso.step}
                  </span>
                </div>

                <h3 className="font-display text-xl sm:text-2xl text-white mb-3">
                  {paso.title}
                </h3>
                <p className="text-brand-gray text-sm sm:text-base leading-relaxed">
                  {paso.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
