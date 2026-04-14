"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { Check, X, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useAudit } from "@/components/lead-audit/AuditContext";
import { DOLOR_BLOCKS, type DolorBlock as DolorBlockType } from "./dolores-data";

export function DoloresList() {
  return (
    <section aria-label="Dolores" className="relative bg-brand-black">
      {DOLOR_BLOCKS.map((d, i) => (
        <DolorBlockSection key={d.id} block={d} index={i} />
      ))}

      {/* Disclaimer metodológico */}
      <div className="px-4 sm:px-6 lg:px-8 pt-8 pb-4">
        <p className="text-center text-[11px] sm:text-xs text-brand-gray/70 font-sans max-w-3xl mx-auto leading-relaxed">
          Las metas están basadas en referencias públicas de la industria 2025-2026
          (Motion, Triple Whale, Dash Social, Billo). No reportamos retorno ni ventas
          como meta nuestra: esas cifras dependen de tu oferta, tus precios, tu página
          y tu pasarela de pago.
        </p>
      </div>
    </section>
  );
}

function DolorBlockSection({ block, index }: { block: DolorBlockType; index: number }) {
  const Icon = block.icon;
  const reverse = index % 2 === 1;
  const { openAudit } = useAudit();

  return (
    <div
      id={block.id}
      className="relative py-20 sm:py-28 lg:py-32 px-4 sm:px-6 lg:px-8 scroll-mt-20 sm:scroll-mt-24 border-b border-brand-graphite/40 last:border-b-0"
    >
      {/* Imagen editorial de fondo */}
      <div aria-hidden className="absolute inset-0 pointer-events-none -z-0 opacity-[0.18]">
        <Image
          src={block.image}
          alt=""
          fill
          sizes="100vw"
          className={cn("object-cover", reverse ? "object-left" : "object-right")}
        />
        <div
          className={cn(
            "absolute inset-0",
            reverse
              ? "bg-gradient-to-r from-transparent via-brand-black/70 to-brand-black"
              : "bg-gradient-to-l from-transparent via-brand-black/70 to-brand-black"
          )}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-black/50 via-transparent to-brand-black/80" />
      </div>
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none -z-0"
        style={{
          background: reverse
            ? "radial-gradient(ellipse 50% 60% at 90% 50%, rgba(212,160,23,0.08) 0%, transparent 70%)"
            : "radial-gradient(ellipse 50% 60% at 10% 50%, rgba(212,160,23,0.08) 0%, transparent 70%)",
        }}
      />
      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl mx-auto text-center mb-14 sm:mb-20"
        >
          <div className="inline-flex items-center justify-center mb-6">
            <div className="w-12 h-12 rounded-xl bg-white/[0.03] border border-brand-graphite/60 flex items-center justify-center">
              <Icon className="h-6 w-6 text-brand-yellow" />
            </div>
          </div>
          <h2 className="font-display text-[clamp(2.5rem,6vw,5rem)] leading-[0.95] text-white tracking-tight uppercase mb-5">
            {block.titulo}
          </h2>
          <p className="text-base sm:text-lg text-brand-gray leading-relaxed">{block.subtitulo}</p>
        </motion.div>

        {/* Lista de dolores */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="grid sm:grid-cols-2 gap-3 sm:gap-4 mb-10 sm:mb-14"
        >
          {block.dolores.map((d) => (
            <div
              key={d.titulo}
              className="flex items-start gap-3 p-5 sm:p-6 rounded-2xl border border-brand-graphite/60 bg-white/[0.025] hover:border-brand-gold/40 hover:bg-white/[0.04] hover:-translate-y-1 hover:shadow-[0_12px_32px_-12px_rgba(212,160,23,0.25)] transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-xl bg-white/[0.03] border border-brand-graphite/60 flex items-center justify-center flex-shrink-0">
                <X className="h-5 w-5 text-red-400" strokeWidth={2.5} />
              </div>
              <div>
                <p className="text-base sm:text-lg font-sans font-semibold text-white leading-snug">
                  {d.titulo}
                </p>
                <p className="text-sm sm:text-base text-brand-gray font-sans leading-relaxed mt-1.5">
                  {d.descripcion}
                </p>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Solución */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className={cn(
            "max-w-3xl mx-auto p-6 sm:p-8 lg:p-10 rounded-3xl",
            "bg-white/[0.025] border border-brand-gold/40",
            "shadow-[0_20px_60px_-20px_rgba(212,160,23,0.3)]"
          )}
        >
          <div className="flex items-start gap-4 mb-5">
            <div className="w-10 h-10 rounded-xl bg-brand-yellow/10 border border-brand-yellow/20 flex items-center justify-center flex-shrink-0">
              <ShieldCheck className="h-5 w-5 text-brand-yellow" />
            </div>
            <p className="font-display text-xl sm:text-2xl text-white tracking-wide uppercase leading-tight">
              Esto es lo que hacemos por ti
            </p>
          </div>
          <p className="text-base sm:text-lg text-brand-gray leading-relaxed font-sans mb-6 sm:pl-14">
            <Check className="inline w-4 h-4 text-brand-yellow mr-1 -ml-1 align-[-2px]" />
            {block.solucion}
          </p>

          {/* Métricas target — patrón del home Casos */}
          <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-6 sm:pl-14">
            {block.metricas.map((m) => (
              <div
                key={m.label}
                className="rounded-lg bg-white/[0.04] border border-brand-gold/15 p-3 text-center"
              >
                <p
                  className="font-display text-base sm:text-xl leading-tight mb-1"
                  style={{
                    background: "linear-gradient(135deg, #f9b334, #d4a017)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {m.value}
                </p>
                <p className="text-[9px] sm:text-[10px] text-brand-gray font-sans leading-tight tracking-wide uppercase">
                  {m.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-3 sm:pl-14">
            <Button asChild size="lg" className="font-bold tracking-wide min-h-[52px]">
              <Link href={`/servicios#${block.servicioId}`}>{block.servicioLabel} →</Link>
            </Button>
            <Button size="lg" variant="outline" className="min-h-[52px]" onClick={() => openAudit(`casos_dolor_${block.servicioId}`)}>
              Agendar diagnóstico
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
