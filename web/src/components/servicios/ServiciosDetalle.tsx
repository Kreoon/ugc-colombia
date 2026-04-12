"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { Check, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useAudit } from "@/components/lead-audit/AuditContext";
import { SERVICE_LINES, type ServiceLine } from "./service-lines";

export function ServiciosDetalle() {
  return (
    <section
      aria-label="Detalle de servicios"
      className="relative bg-brand-black"
    >
      {SERVICE_LINES.map((line, i) => (
        <ServiceBlock key={line.id} line={line} index={i} />
      ))}
    </section>
  );
}

function ServiceBlock({ line, index }: { line: ServiceLine; index: number }) {
  const Icon = line.icon;
  const reverse = index % 2 === 1;
  const { openAudit } = useAudit();

  return (
    <div
      id={line.id}
      className="relative py-20 sm:py-24 lg:py-28 px-4 sm:px-6 lg:px-8 scroll-mt-20 sm:scroll-mt-24 border-b border-brand-graphite/40 last:border-b-0"
    >
      {/* gradient corner glow */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none -z-0"
        style={{
          background: reverse
            ? "radial-gradient(ellipse 50% 60% at 90% 50%, rgba(212,160,23,0.07) 0%, transparent 70%)"
            : "radial-gradient(ellipse 50% 60% at 10% 50%, rgba(212,160,23,0.07) 0%, transparent 70%)",
        }}
      />
      <div className="relative z-10 max-w-7xl mx-auto grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        {/* Visual */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className={cn("order-1", reverse ? "lg:order-2" : "lg:order-1")}
        >
          <div className="relative aspect-square max-w-md mx-auto rounded-3xl border border-brand-gold/25 overflow-hidden bg-brand-black shadow-[0_20px_60px_-20px_rgba(212,160,23,0.3)]">
            <Image
              src={line.image}
              alt={line.imageAlt}
              fill
              sizes="(max-width: 1024px) 90vw, 448px"
              className="object-cover"
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-t from-brand-black/80 via-brand-black/10 to-transparent"
            />
            <div className="absolute top-4 left-4 w-12 h-12 rounded-xl bg-brand-black/60 backdrop-blur-md border border-brand-yellow/40 flex items-center justify-center">
              <Icon className="w-6 h-6 text-brand-yellow" strokeWidth={1.5} aria-hidden />
            </div>
          </div>
        </motion.div>

        {/* Texto */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className={cn("order-2", reverse ? "lg:order-1" : "lg:order-2")}
        >
          <h2 className="font-display text-[clamp(1.8rem,4vw,3rem)] leading-[1] text-white tracking-tight uppercase mb-4">
            {line.title}
          </h2>
          <p className="text-base sm:text-lg text-brand-gray leading-relaxed mb-6">
            {line.longDescription}
          </p>

          {/* Deliverables */}
          <div className="mb-6">
            <p className="flex items-center gap-2 text-[11px] font-sans font-bold tracking-widest uppercase text-brand-gold mb-3">
              <Sparkles className="w-3.5 h-3.5" /> Qué incluye
            </p>
            <ul className="grid sm:grid-cols-2 gap-2">
              {line.deliverables.map((d) => (
                <li key={d} className="flex items-start gap-2 text-sm text-white/90 font-sans">
                  <Check className="w-4 h-4 text-brand-yellow flex-shrink-0 mt-0.5" />
                  <span>{d}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Target + Precio */}
          <div className="grid sm:grid-cols-2 gap-4 mb-6">
            <div className="p-4 rounded-xl border border-brand-graphite/60 bg-white/[0.02]">
              <p className="text-[10px] font-sans font-bold tracking-widest uppercase text-brand-gray mb-1">
                Para quién es
              </p>
              <p className="text-sm text-white/90 font-sans leading-relaxed">{line.target}</p>
            </div>
            <div className="p-4 rounded-xl border border-brand-gold/40 bg-brand-yellow/5">
              <p className="text-[10px] font-sans font-bold tracking-widest uppercase text-brand-gold mb-1">
                Inversión
              </p>
              <p className="text-sm text-brand-yellow font-sans font-bold leading-relaxed">{line.priceRange}</p>
            </div>
          </div>

          <p className="text-xs text-brand-gray italic mb-6 leading-relaxed">
            <span className="text-brand-gold not-italic font-semibold">Ejemplo:</span> {line.example}
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button size="lg" className="font-bold tracking-wide" onClick={openAudit}>
              Solicitar propuesta →
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/#pricing">Ver planes</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
