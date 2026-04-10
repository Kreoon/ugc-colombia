"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CalendarDays, ShieldCheck, Users } from "lucide-react";

const RECENT_CLIENTS = [
  { initials: "ME", name: "Michel E." },
  { initials: "CM", name: "Carolina M." },
  { initials: "JP", name: "Juan P." },
  { initials: "LS", name: "Laura S." },
];

export function PreciosCTA() {
  return (
    <section
      id="cta-precios"
      className="relative py-20 sm:py-28 lg:py-32 px-4 sm:px-6 lg:px-8 bg-brand-black overflow-hidden"
      aria-labelledby="cta-precios-title"
    >
      {/* Background glow — mejorado */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(212,160,23,0.15) 0%, transparent 65%)",
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
      {/* Secondary glow */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 40% 30% at 50% 70%, rgba(249,179,52,0.08) 0%, transparent 100%)",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative max-w-4xl mx-auto text-center"
      >
        {/* Badge urgencia */}
        <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full border border-brand-gold/30 bg-brand-yellow/[0.06]">
          <Users className="h-3.5 w-3.5 text-brand-yellow" aria-hidden />
          <span className="text-[11px] sm:text-xs font-sans font-semibold text-brand-yellow tracking-wide">
            Solo quedan 3 espacios para Abril 2026
          </span>
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
            diagnostico gratuito
          </span>
          .
        </h2>

        <p className="text-base sm:text-lg text-brand-gray leading-relaxed mb-8 max-w-2xl mx-auto">
          30 minutos por video llamada. Revisamos tu marca, tus ads y tus
          objetivos. Salimos con una recomendacion clara del paquete que calza
          —{" "}
          <span className="text-white font-semibold">
            sin venta forzada, sin compromiso
          </span>
          .
        </p>

        {/* Guarantee badge */}
        <div className="inline-flex items-center gap-2.5 mb-8 px-5 py-3 rounded-xl border border-brand-gold/25 bg-white/[0.03]">
          <ShieldCheck
            className="h-5 w-5 text-brand-yellow flex-shrink-0"
            aria-hidden
          />
          <div className="text-left">
            <p className="text-xs font-bold text-white">
              Garantia de 7 dias
            </p>
            <p className="text-[10px] text-brand-gray">
              100% de devolucion si no encajamos
            </p>
          </div>
        </div>

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

        {/* Avatar stack */}
        <div className="mt-8 flex flex-col items-center gap-3">
          <div className="flex items-center -space-x-2.5">
            {RECENT_CLIENTS.map((client) => (
              <div
                key={client.initials}
                className="w-9 h-9 rounded-full bg-gradient-to-br from-brand-yellow/20 to-brand-gold/10 border-2 border-brand-black flex items-center justify-center"
                title={client.name}
              >
                <span className="text-[10px] font-bold text-brand-yellow/80 font-sans">
                  {client.initials}
                </span>
              </div>
            ))}
            <div className="w-9 h-9 rounded-full bg-brand-yellow/10 border-2 border-brand-black flex items-center justify-center">
              <span className="text-[10px] font-bold text-brand-yellow/60 font-sans">
                +129
              </span>
            </div>
          </div>
          <p className="text-xs text-brand-gray">
            133+ marcas ya confian en UGC Colombia
          </p>
        </div>

        <p className="mt-6 text-xs text-brand-graphite tracking-wide">
          30 min · Gratis · Sin compromiso
        </p>
      </motion.div>
    </section>
  );
}
