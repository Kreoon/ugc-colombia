"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import {
  Sparkles,
  Clock,
  CheckCircle2,
  Brain,
  Target,
  TrendingUp,
  Shield,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAudit } from "@/components/lead-audit/AuditContext";

const BENEFITS = [
  {
    icon: Brain,
    title: "Análisis con IA",
    text: "Gemini 2.5 analiza tu marca, tus ads y tus redes en tiempo real",
  },
  {
    icon: Target,
    title: "Plan accionable",
    text: "Te decimos exactamente qué cambiar para que tus ads conviertan",
  },
  {
    icon: TrendingUp,
    title: "Sin compromiso",
    text: "Si no te gusta, no pasa nada. Te quedas con el diagnóstico igual",
  },
];

const TRUST = [
  "+200 marcas ya lo hicieron",
  "5 minutos · 100% gratis",
  "Resultados al instante",
];

export function DiagnosticoClient() {
  const { openAudit } = useAudit();
  const hasOpened = useRef(false);

  // Auto-abre el quiz al cargar con tipo "marca" preseleccionado.
  useEffect(() => {
    if (hasOpened.current) return;
    hasOpened.current = true;
    const t = setTimeout(() => {
      openAudit({ source: "landing_diagnostico", prefillType: "marca" });
    }, 800);
    return () => clearTimeout(t);
  }, [openAudit]);

  function reopenAudit() {
    openAudit({ source: "landing_diagnostico_cta", prefillType: "marca" });
  }

  return (
    <main className="relative min-h-screen bg-brand-black text-white overflow-hidden">
      {/* Ambient glow */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 20%, rgba(212,160,23,0.12) 0%, transparent 60%)",
        }}
      />

      {/* Logo bar (sin navbar completo para mantener foco) */}
      <header className="relative z-10 border-b border-white/5">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <Image
            src="/brand/logo-dark-bg.png"
            alt="UGC Colombia"
            width={140}
            height={42}
            className="h-9 w-auto"
            priority
          />
          <div className="hidden sm:flex items-center gap-2 text-xs text-brand-gray">
            <Shield className="w-3.5 h-3.5 text-emerald-400" />
            100% gratis · Sin tarjeta
          </div>
        </div>
      </header>

      <section className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 pt-14 sm:pt-20 pb-16 text-center">
        <motion.span
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-sans font-bold tracking-widest uppercase mb-5 bg-brand-yellow/15 text-brand-yellow border border-brand-yellow/40"
        >
          <Sparkles className="w-3.5 h-3.5" />
          Diagnóstico con IA · Gratis
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="font-display text-4xl sm:text-5xl lg:text-6xl leading-[1.05] tracking-tight uppercase mb-5"
        >
          Tus ads no venden?{" "}
          <span className="text-brand-yellow">Descubre qué falta</span> en 5
          minutos
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-base sm:text-lg text-brand-gray max-w-xl mx-auto mb-8 leading-relaxed"
        >
          Nuestra IA analiza tu marca, tus creativos y tu estrategia. Te entrega
          un diagnóstico claro con el problema exacto y cómo resolverlo — más
          una llamada gratuita con nuestro equipo si quieres profundizar.
        </motion.p>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 mb-8"
        >
          {TRUST.map((t) => (
            <span
              key={t}
              className="inline-flex items-center gap-1.5 text-xs text-brand-gray"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              {t}
            </span>
          ))}
        </motion.div>

        {/* CTA principal */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Button
            size="lg"
            onClick={reopenAudit}
            className="min-h-[56px] px-8 text-base font-bold tracking-wide shadow-[0_0_40px_rgba(249,179,52,0.45)] hover:shadow-[0_0_50px_rgba(249,179,52,0.6)]"
          >
            <Sparkles className="w-5 h-5 mr-2" />
            Empezar mi diagnóstico gratis →
          </Button>
          <p className="mt-3 text-xs text-brand-gray/60 flex items-center justify-center gap-1.5">
            <Clock className="w-3.5 h-3.5" />5 minutos · Sin tarjeta · Sin
            spam
          </p>
        </motion.div>
      </section>

      {/* Benefits */}
      <section className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 pb-20">
        <div className="grid sm:grid-cols-3 gap-4">
          {BENEFITS.map((b, i) => {
            const Icon = b.icon;
            return (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className="p-5 rounded-2xl border border-brand-gold/15 bg-white/[0.02]"
              >
                <div className="w-10 h-10 rounded-xl bg-brand-yellow/10 border border-brand-yellow/25 flex items-center justify-center mb-3">
                  <Icon className="w-5 h-5 text-brand-yellow" />
                </div>
                <h3 className="font-sans font-bold text-white mb-1.5 text-sm tracking-wide uppercase">
                  {b.title}
                </h3>
                <p className="text-sm text-brand-gray leading-relaxed">
                  {b.text}
                </p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* CTA final (por si cerraron el modal) */}
      <section className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 pb-20 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="p-6 sm:p-8 rounded-2xl border border-brand-gold/25 bg-gradient-to-br from-brand-yellow/[0.06] to-transparent"
        >
          <p className="font-display text-2xl sm:text-3xl uppercase tracking-tight mb-3">
            ¿Listo para saber qué te falta?
          </p>
          <p className="text-sm text-brand-gray mb-5 max-w-md mx-auto">
            Solo toma 5 minutos. Responde algunas preguntas y recibe tu
            diagnóstico personalizado — más un slot para agendar llamada si lo
            necesitas.
          </p>
          <Button
            size="lg"
            onClick={reopenAudit}
            className="min-h-[52px] font-bold tracking-wide"
          >
            Empezar diagnóstico →
          </Button>
        </motion.div>
      </section>

      <footer className="relative z-10 border-t border-white/5 py-5 text-center">
        <p className="text-xs text-brand-gray/50">
          UGC Colombia · Diagnóstico gratis con IA · 100% remoto
        </p>
      </footer>
    </main>
  );
}
