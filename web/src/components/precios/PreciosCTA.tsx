"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CalendarDays } from "lucide-react";

export function PreciosCTA() {
  return (
    <section
      id="cta-precios"
      className="relative py-20 sm:py-28 lg:py-32 px-4 sm:px-6 lg:px-8 bg-brand-black overflow-hidden"
      aria-labelledby="cta-precios-title"
    >
      {/* Background glow */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(212,160,23,0.12) 0%, transparent 70%)",
        }}
      />
      {/* Grid pattern */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-[0.05]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(249,179,52,0.6) 1px, transparent 1px),
            linear-gradient(90deg, rgba(249,179,52,0.6) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
          maskImage:
            "radial-gradient(ellipse at center, black 25%, transparent 75%)",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative max-w-4xl mx-auto text-center"
      >
        <div className="inline-flex items-center gap-3 mb-6">
          <span
            aria-hidden
            className="h-px w-8 bg-gradient-to-r from-transparent to-brand-gold/60"
          />
          <span className="text-[11px] sm:text-xs uppercase tracking-[0.35em] text-brand-gold/80 font-sans">
            ¿Listo para empezar?
          </span>
          <span
            aria-hidden
            className="h-px w-8 bg-gradient-to-l from-transparent to-brand-gold/60"
          />
        </div>

        <h2
          id="cta-precios-title"
          className="font-display text-[clamp(2.25rem,5.5vw,4.5rem)] leading-[0.95] text-white tracking-tight uppercase mb-6"
        >
          Agenda tu{" "}
          <span
            style={{
              background: "linear-gradient(90deg, #f9b334, #d4a017)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            diagnóstico gratuito
          </span>
          .
        </h2>

        <p className="text-base sm:text-lg text-brand-gray leading-relaxed mb-10 max-w-2xl mx-auto">
          30 minutos por video llamada. Revisamos tu marca, tus ads y tus
          objetivos. Salimos con una recomendación clara del paquete que calza
          —{" "}
          <span className="text-white font-semibold">
            sin venta forzada, sin compromiso
          </span>
          .
        </p>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4">
          <Button
            asChild
            size="lg"
            className="w-full sm:w-auto text-sm sm:text-base font-bold tracking-wide min-h-[52px] shadow-[0_0_28px_rgba(249,179,52,0.35)] hover:shadow-[0_0_40px_rgba(249,179,52,0.55)]"
          >
            <Link href="/#contacto">
              <CalendarDays className="h-5 w-5 mr-2" aria-hidden />
              AGENDA TU LLAMADA →
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="w-full sm:w-auto text-sm sm:text-base min-h-[52px]"
          >
            <a href="#planes">VER PAQUETES</a>
          </Button>
        </div>

        <p className="mt-6 text-xs text-brand-graphite tracking-wide">
          30 min · Gratis · Sin compromiso
        </p>
      </motion.div>
    </section>
  );
}
