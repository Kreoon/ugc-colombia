"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { SERVICE_LINES } from "./service-lines";

export function ServiciosOverview() {
  return (
    <section
      id="overview"
      aria-labelledby="overview-heading"
      className="relative py-20 sm:py-28 lg:py-32 px-4 sm:px-6 lg:px-8 bg-brand-black overflow-hidden scroll-mt-20 sm:scroll-mt-24"
    >
      {/* Background glow dorado sutil (matches home Servicios.tsx) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-50"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(249,179,52,0.06) 0%, transparent 60%)",
        }}
      />

      <div className="relative max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-14 sm:mb-20 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="sr-only">Resumen de servicios</p>
          <h2
            id="overview-heading"
            className="font-display text-[clamp(2.5rem,6vw,5rem)] leading-[0.95] text-white tracking-tight uppercase"
          >
            Diez líneas.
            <br />
            <span
              style={{
                background: "linear-gradient(90deg, #f9b334, #d4a017)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Una sola estrategia.
            </span>
          </h2>
          <p className="mt-6 text-base sm:text-lg text-brand-gray leading-relaxed">
            Contenido, estrategia, producción, consultoría, creadores, IA, web y
            dev. Cada línea se integra para acompañarte desde la idea hasta el
            resultado.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
          {SERVICE_LINES.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
              >
                <Link
                  href={`#${s.id}`}
                  className={cn(
                    "group relative block h-full p-5 sm:p-6 lg:p-7 rounded-2xl",
                    "border border-brand-graphite/60 bg-white/[0.025]",
                    "hover:border-brand-gold/40 hover:bg-white/[0.04]",
                    "hover:shadow-[0_12px_40px_-12px_rgba(212,160,23,0.25)]",
                    "transition-all duration-300 hover:-translate-y-1"
                  )}
                >
                  {/* Gradient border on hover — matches home Servicios.tsx */}
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
                  <div className="relative w-11 h-11 rounded-xl bg-brand-yellow/10 border border-brand-yellow/25 flex items-center justify-center mb-4 group-hover:bg-brand-yellow/20 group-hover:border-brand-yellow/50 transition-colors">
                    <Icon className="h-5 w-5 text-brand-yellow" aria-hidden="true" />
                  </div>
                  <h3 className="font-display text-lg text-white tracking-wide uppercase leading-tight mb-2">
                    {s.title}
                  </h3>
                  <p className="text-sm text-brand-gray font-sans leading-snug mb-4">
                    {s.shortDescription}
                  </p>
                  <span className="inline-flex items-center gap-1 text-xs font-sans font-semibold text-brand-yellow group-hover:gap-2 transition-all">
                    Ver detalle <ArrowRight className="w-3.5 h-3.5" />
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
