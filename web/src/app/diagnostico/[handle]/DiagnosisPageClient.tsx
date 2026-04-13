"use client";

import { motion } from "motion/react";
import {
  AlertTriangle,
  CheckCircle2,
  Flame,
  Thermometer,
  Snowflake,
  ArrowRight,
  BarChart3,
  Target,
  Zap,
  TrendingUp,
  Instagram,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAudit } from "@/components/lead-audit/AuditContext";
import { Navbar } from "@/components/home/Navbar";
import { Footer } from "@/components/home/Footer";

interface Props {
  handle: string;
  companyName: string;
  industry: string;
  instagramHandle: string;
  diagnosis: Record<string, any>;
  qualificationScore: number;
  temperature: string;
}

function scoreColor(temp: string) {
  if (temp === "hot") return "text-orange-400";
  if (temp === "warm") return "text-brand-yellow";
  return "text-blue-400";
}

function scoreBg(temp: string) {
  if (temp === "hot") return "from-orange-500/20 to-red-500/10 border-orange-500/30";
  if (temp === "warm") return "from-brand-yellow/20 to-brand-gold/10 border-brand-yellow/30";
  return "from-blue-500/20 to-cyan-500/10 border-blue-500/30";
}

function ScoreIcon({ temp }: { temp: string }) {
  if (temp === "hot") return <Flame className="w-8 h-8" />;
  if (temp === "warm") return <Thermometer className="w-8 h-8" />;
  return <Snowflake className="w-8 h-8" />;
}

export function DiagnosisPageClient({
  handle,
  companyName,
  industry,
  instagramHandle,
  diagnosis,
  qualificationScore,
  temperature,
}: Props) {
  const { openAudit } = useAudit();
  const overallScore = diagnosis?.overall_score ?? qualificationScore ?? 0;
  const scores = diagnosis?.scores ?? {};
  const igProfile = diagnosis?.ig_profile;
  const contentAudit = diagnosis?.content_audit ?? {};
  const contentStrategy = diagnosis?.content_strategy ?? {};
  const quickWins = diagnosis?.quick_wins ?? [];
  const executiveSummary = diagnosis?.executive_summary ?? "";
  const serviceProposal = diagnosis?.service_proposal ?? {};

  return (
    <>
      <Navbar />
      <main className="relative bg-brand-black text-white min-h-screen">
        {/* Hero */}
        <section className="relative pt-28 pb-16 px-4 sm:px-6 lg:px-8">
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background: "radial-gradient(ellipse 60% 40% at 50% 20%, rgba(212,160,23,0.12), transparent 60%)",
            }}
          />
          <div className="relative max-w-4xl mx-auto">
            {/* Breadcrumb */}
            <p className="text-[11px] text-brand-gray/50 uppercase tracking-wider mb-6">
              <a href="/" className="hover:text-brand-gray transition-colors">UGC Colombia</a>
              {" / "}
              <span>Diagnóstico</span>
              {" / "}
              <span className="text-brand-yellow">@{instagramHandle || handle}</span>
            </p>

            {/* Score card */}
            <motion.div
              className={`relative rounded-2xl border p-6 sm:p-8 mb-8 bg-gradient-to-br ${scoreBg(temperature)}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h1 className="font-sans text-2xl sm:text-3xl font-bold text-white mb-1">
                    {companyName || `@${handle}`}
                  </h1>
                  <p className="text-sm text-brand-gray mb-4">
                    {industry ? industry.replace(/_/g, " ") : ""}
                    {instagramHandle && (
                      <span className="ml-2">
                        <Instagram className="w-3.5 h-3.5 inline mr-1" />
                        @{instagramHandle}
                      </span>
                    )}
                    {igProfile && (
                      <span className="ml-2">· {igProfile.followers?.toLocaleString()} seguidores · {igProfile.engagement_rate}% ER</span>
                    )}
                  </p>
                  <div className="flex items-baseline gap-3">
                    <span className={`font-display text-6xl ${scoreColor(temperature)}`}>
                      {overallScore}
                    </span>
                    <span className="text-brand-gray text-lg">/100</span>
                  </div>
                </div>
                <div className={`p-3 rounded-xl bg-black/30 ${scoreColor(temperature)}`}>
                  <ScoreIcon temp={temperature} />
                </div>
              </div>

              {/* Score bar */}
              <div className="mt-4 h-2.5 w-full bg-black/30 rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-blue-500 via-brand-yellow to-orange-500"
                  initial={{ width: 0 }}
                  animate={{ width: `${overallScore}%` }}
                  transition={{ delay: 0.3, duration: 1.2, ease: "easeOut" }}
                />
              </div>
            </motion.div>

            {/* Executive summary */}
            {executiveSummary && (
              <motion.div
                className="mb-8 p-6 rounded-2xl border border-white/10 bg-white/[0.02]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <h2 className="flex items-center gap-2 text-sm font-semibold text-brand-gray uppercase tracking-wider mb-3">
                  <BarChart3 className="w-4 h-4 text-brand-yellow" />
                  Resumen ejecutivo
                </h2>
                <p className="text-brand-gray text-sm leading-relaxed">{executiveSummary}</p>
              </motion.div>
            )}

            {/* 5 Scores grid */}
            {Object.keys(scores).length > 0 && (
              <motion.div
                className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                {Object.entries(scores).map(([key, val]) => (
                  <div key={key} className="p-4 rounded-xl border border-white/8 bg-white/[0.02] text-center">
                    <p className="text-2xl font-bold text-white">{val as number}</p>
                    <p className="text-[10px] text-brand-gray uppercase tracking-wider mt-1">
                      {key.replace(/_/g, " ")}
                    </p>
                  </div>
                ))}
              </motion.div>
            )}

            {/* What's failing */}
            {contentAudit.whats_failing?.length > 0 && (
              <motion.div className="mb-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
                <h2 className="flex items-center gap-2 text-sm font-semibold text-brand-gray uppercase tracking-wider mb-3">
                  <AlertTriangle className="w-4 h-4 text-orange-400" />
                  Brechas detectadas
                </h2>
                <div className="space-y-2">
                  {contentAudit.whats_failing.map((item: any, i: number) => (
                    <div key={i} className="flex gap-3 p-4 rounded-xl bg-orange-500/5 border border-orange-500/15">
                      <span className="text-orange-400 font-bold text-sm">{i + 1}</span>
                      <div>
                        <p className="text-sm text-white font-medium">{item.insight}</p>
                        {item.evidence && <p className="text-xs text-brand-gray mt-1">{item.evidence}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* What's working */}
            {contentAudit.whats_working?.length > 0 && (
              <motion.div className="mb-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.55 }}>
                <h2 className="flex items-center gap-2 text-sm font-semibold text-brand-gray uppercase tracking-wider mb-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  Lo que funciona
                </h2>
                <div className="space-y-2">
                  {contentAudit.whats_working.map((item: any, i: number) => (
                    <div key={i} className="flex gap-3 p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/15">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm text-white font-medium">{item.insight}</p>
                        {item.evidence && <p className="text-xs text-brand-gray mt-1">{item.evidence}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Content pillars */}
            {contentStrategy.pillars?.length > 0 && (
              <motion.div className="mb-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
                <h2 className="flex items-center gap-2 text-sm font-semibold text-brand-gray uppercase tracking-wider mb-3">
                  <Target className="w-4 h-4 text-brand-yellow" />
                  Pilares de contenido recomendados
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {contentStrategy.pillars.map((p: any, i: number) => (
                    <div key={i} className="p-4 rounded-xl border border-white/8 bg-white/[0.02]">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-bold text-white">{p.name}</span>
                        <span className="text-xs text-brand-yellow font-semibold">{p.percentage}%</span>
                      </div>
                      <p className="text-xs text-brand-gray">{p.description}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Quick wins */}
            {quickWins.length > 0 && (
              <motion.div className="mb-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.65 }}>
                <h2 className="flex items-center gap-2 text-sm font-semibold text-brand-gray uppercase tracking-wider mb-3">
                  <Zap className="w-4 h-4 text-brand-yellow" />
                  Acciones inmediatas
                </h2>
                <div className="space-y-2">
                  {quickWins.map((qw: any, i: number) => (
                    <div key={i} className="flex gap-3 p-4 rounded-xl bg-brand-yellow/5 border border-brand-yellow/15">
                      <Zap className="w-4 h-4 text-brand-yellow flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm text-white font-medium">{qw.action}</p>
                        <p className="text-xs text-brand-gray mt-1">{qw.expected_impact}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* CTA */}
            <motion.div
              className="mt-12 p-8 rounded-2xl border border-brand-gold/20 bg-gradient-to-br from-brand-yellow/8 to-transparent text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <h2 className="font-sans text-xl sm:text-2xl font-bold text-white mb-2">
                ¿Quieres implementar estas mejoras?
              </h2>
              <p className="text-sm text-brand-gray mb-6 max-w-md mx-auto">
                {serviceProposal.recommended
                  ? `Te recomendamos nuestro plan "${serviceProposal.recommended}". Agenda una llamada y te explicamos cómo.`
                  : "Agenda tu diagnóstico gratuito y te mostramos exactamente cómo mejorar tus resultados."}
              </p>
              <Button size="xl" onClick={openAudit} className="gap-2">
                <TrendingUp className="w-5 h-5" />
                Agenda tu diagnóstico gratis
                <ArrowRight className="w-5 h-5" />
              </Button>
            </motion.div>

            {/* Footer note */}
            <p className="text-center text-[11px] text-brand-gray/30 mt-8">
              Diagnóstico generado por IA — UGC Colombia · ugccolombia.co
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
