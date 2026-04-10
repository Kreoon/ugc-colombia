"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { DOLOR_BLOCKS } from "./dolores-data";

export function CasosOverview() {
  return (
    <section
      id="overview"
      aria-labelledby="overview-heading"
      className="relative py-20 sm:py-28 lg:py-32 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-14 sm:mb-20"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2
            id="overview-heading"
            className="font-display text-[clamp(2.5rem,6vw,5rem)] leading-[0.95] text-white tracking-tight uppercase mb-4"
          >
            Si te suena <span className="text-brand-yellow">familiar...</span>
          </h2>
          <p className="max-w-2xl mx-auto text-base sm:text-lg text-brand-gray mb-3">
            Estos son los 7 dolores reales que escuchamos cada semana. Toca el que más te duela.
          </p>
          <p className="text-center text-brand-gray text-sm sm:text-base font-sans max-w-2xl mx-auto leading-relaxed">
            Medimos lo que el video <span className="text-white font-semibold">sí controla</span>:
            atención en los primeros segundos, retención y clics. No prometemos
            retorno (ROAS) — eso depende de tu oferta, precios y embudo.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {DOLOR_BLOCKS.map((d, i) => {
            const Icon = d.icon;
            return (
              <motion.div
                key={d.id}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.55, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
              >
                <Link
                  href={`#${d.id}`}
                  className={cn(
                    "group block h-full p-5 sm:p-6 rounded-2xl",
                    "border border-brand-graphite/60 bg-white/[0.025]",
                    "hover:border-brand-gold/40 hover:bg-white/[0.04] hover:-translate-y-1",
                    "shadow-none hover:shadow-[0_12px_32px_-12px_rgba(212,160,23,0.25)]",
                    "transition-all duration-300"
                  )}
                >
                  <div className="w-10 h-10 rounded-xl bg-white/[0.03] border border-brand-graphite/60 flex items-center justify-center mb-4 group-hover:border-brand-gold/40 transition-colors">
                    <Icon className="h-5 w-5 text-brand-yellow" />
                  </div>
                  <p className="text-[10px] font-sans font-bold tracking-widest uppercase text-brand-gold mb-1">
                    {d.eyebrow}
                  </p>
                  <h3 className="font-display text-base text-white tracking-wide uppercase leading-tight mb-3">
                    {d.titulo}
                  </h3>
                  <span className="inline-flex items-center gap-1 text-xs font-sans font-semibold text-brand-yellow group-hover:gap-2 transition-all">
                    Leer dolor <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
