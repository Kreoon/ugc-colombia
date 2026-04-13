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
  Calendar,
  Instagram,
  TrendingUp,
  Users,
  Eye,
  MessageCircle,
  Lightbulb,
  PieChart,
  Clock,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
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

function scoreColor(s: number) {
  if (s >= 70) return "#F97316";
  if (s >= 40) return "#F9B334";
  return "#3B82F6";
}

function tempIcon(t: string) {
  if (t === "hot") return <Flame className="w-8 h-8" />;
  if (t === "warm") return <Thermometer className="w-8 h-8" />;
  return <Snowflake className="w-8 h-8" />;
}

function ScoreBar({ label, score }: { label: string; score: number }) {
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-xs">
        <span className="text-brand-gray capitalize">{label.replace(/_/g, " ")}</span>
        <span className="text-white font-bold">{score}</span>
      </div>
      <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ background: scoreColor(score) }}
          initial={{ width: 0 }}
          animate={{ width: `${score}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}

function Section({ icon: Icon, title, children, delay = 0 }: { icon: any; title: string; children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      className="mb-8"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
    >
      <h2 className="flex items-center gap-2 text-sm font-semibold text-brand-gray uppercase tracking-wider mb-4">
        <Icon className="w-4 h-4 text-brand-yellow" />
        {title}
      </h2>
      {children}
    </motion.div>
  );
}

const COMMUNITY_URL = "https://chat.whatsapp.com/F5QDgl4imsjBjW1KL2DhRE";

export function DiagnosisPageClient({
  handle, companyName, industry, instagramHandle, diagnosis, qualificationScore, temperature,
}: Props) {
  const score = diagnosis?.overall_score ?? qualificationScore ?? 0;
  const scores = diagnosis?.scores ?? {};
  const ig = diagnosis?.ig_profile;
  const audit = diagnosis?.content_audit ?? {};
  const strategy = diagnosis?.content_strategy ?? {};
  const quickWins = diagnosis?.quick_wins ?? [];
  const summary = diagnosis?.executive_summary ?? "";
  const proposal = diagnosis?.service_proposal ?? {};
  const nextSteps = diagnosis?.next_steps ?? [];
  const avatar = diagnosis?.avatar_ideal ?? {};
  const persona = diagnosis?.buyer_persona ?? {};
  const position = diagnosis?.market_position ?? {};
  const identity = diagnosis?.brand_identity ?? {};
  const color = scoreColor(score);

  return (
    <>
      <Navbar />
      <main className="relative bg-brand-black text-white min-h-screen">
        <section className="relative pt-28 pb-16 px-4 sm:px-6 lg:px-8">
          <div aria-hidden className="absolute inset-0" style={{ background: `radial-gradient(ellipse 60% 40% at 50% 20%, ${color}15, transparent 60%)` }} />
          <div className="relative max-w-4xl mx-auto">

            {/* Breadcrumb */}
            <p className="text-[11px] text-brand-gray/50 uppercase tracking-wider mb-6">
              <a href="/" className="hover:text-brand-gray transition-colors">UGC Colombia</a> / Diagnóstico / <span className="text-brand-yellow">@{instagramHandle || handle}</span>
            </p>

            {/* ─── SCORE HERO ─── */}
            <motion.div
              className="relative rounded-2xl border p-6 sm:p-8 mb-8 bg-gradient-to-br from-white/[0.04] to-transparent"
              style={{ borderColor: `${color}30` }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h1 className="font-sans text-2xl sm:text-3xl font-bold text-white mb-1">{companyName || `@${handle}`}</h1>
                  <p className="text-sm text-brand-gray flex items-center gap-2 flex-wrap">
                    {industry && <span>{industry.replace(/_/g, " ")}</span>}
                    {instagramHandle && <><span className="text-brand-gray/30">·</span><Instagram className="w-3.5 h-3.5 inline" /> @{instagramHandle}</>}
                    {ig && <><span className="text-brand-gray/30">·</span>{ig.followers?.toLocaleString()} seg · {ig.engagement_rate}% ER</>}
                  </p>
                  <div className="flex items-baseline gap-3 mt-4">
                    <span className="font-display text-6xl" style={{ color }}>{score}</span>
                    <span className="text-brand-gray text-lg">/100</span>
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-black/30" style={{ color }}>{tempIcon(temperature)}</div>
              </div>
              <div className="mt-4 h-2.5 w-full bg-black/30 rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-blue-500 via-brand-yellow to-orange-500"
                  initial={{ width: 0 }}
                  animate={{ width: `${score}%` }}
                  transition={{ delay: 0.3, duration: 1.2, ease: "easeOut" }}
                />
              </div>
            </motion.div>

            {/* ─── 5 SCORES ─── */}
            {Object.keys(scores).length > 0 && (
              <Section icon={BarChart3} title="Scores detallados" delay={0.2}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-5 rounded-2xl border border-white/8 bg-white/[0.02]">
                  {Object.entries(scores).map(([key, val]) => (
                    <ScoreBar key={key} label={key} score={val as number} />
                  ))}
                </div>
              </Section>
            )}

            {/* ─── EXECUTIVE SUMMARY ─── */}
            {summary && (
              <Section icon={Eye} title="Resumen ejecutivo" delay={0.3}>
                <div className="p-5 rounded-2xl border border-white/10 bg-white/[0.02]">
                  <p className="text-brand-gray text-sm leading-relaxed">{summary}</p>
                </div>
              </Section>
            )}

            {/* ─── WHAT'S FAILING ─── */}
            {audit.whats_failing?.length > 0 && (
              <Section icon={AlertTriangle} title="Brechas detectadas" delay={0.35}>
                <div className="space-y-2">
                  {audit.whats_failing.map((item: any, i: number) => (
                    <div key={i} className="flex gap-3 p-4 rounded-xl bg-orange-500/5 border border-orange-500/15">
                      <span className="text-orange-400 font-bold text-sm mt-0.5">{i + 1}</span>
                      <div>
                        <p className="text-sm text-white font-medium">{item.insight}</p>
                        {item.evidence && <p className="text-xs text-brand-gray mt-1">{item.evidence}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              </Section>
            )}

            {/* ─── WHAT'S WORKING ─── */}
            {audit.whats_working?.length > 0 && (
              <Section icon={CheckCircle2} title="Lo que funciona" delay={0.4}>
                <div className="space-y-2">
                  {audit.whats_working.map((item: any, i: number) => (
                    <div key={i} className="flex gap-3 p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/15">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm text-white font-medium">{item.insight}</p>
                        {item.evidence && <p className="text-xs text-brand-gray mt-1">{item.evidence}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              </Section>
            )}

            {/* ─── AD ANALYSIS ─── */}
            {audit.ad_analysis?.summary && (
              <Section icon={TrendingUp} title="Análisis de publicidad" delay={0.42}>
                <div className="p-5 rounded-2xl border border-white/8 bg-white/[0.02]">
                  <p className="text-sm text-brand-gray leading-relaxed">{audit.ad_analysis.summary}</p>
                  {audit.ad_analysis.recommendation && (
                    <p className="text-sm text-brand-yellow mt-3 font-medium">{audit.ad_analysis.recommendation}</p>
                  )}
                </div>
              </Section>
            )}

            {/* ─── AVATAR + BUYER PERSONA ─── */}
            {(avatar.demographics || persona.name) && (
              <Section icon={Users} title="Tu cliente ideal" delay={0.45}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {avatar.demographics && (
                    <div className="p-5 rounded-2xl border border-white/8 bg-white/[0.02]">
                      <p className="text-xs text-brand-yellow font-semibold uppercase tracking-wider mb-2">Avatar</p>
                      <p className="text-sm text-brand-gray">{avatar.demographics}</p>
                      {avatar.pain_points?.length > 0 && (
                        <div className="mt-3">
                          <p className="text-[11px] text-brand-gray/60 uppercase mb-1">Dolores</p>
                          <ul className="text-xs text-brand-gray space-y-1">
                            {avatar.pain_points.map((p: string, i: number) => <li key={i}>• {p}</li>)}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
                  {persona.name && (
                    <div className="p-5 rounded-2xl border border-white/8 bg-white/[0.02]">
                      <p className="text-xs text-brand-yellow font-semibold uppercase tracking-wider mb-2">Buyer Persona</p>
                      <p className="text-sm text-white font-medium">{persona.name}, {persona.age} años</p>
                      <p className="text-xs text-brand-gray mt-1">{persona.occupation}</p>
                      {persona.how_discovers_brands && <p className="text-xs text-brand-gray mt-2">Descubre marcas: {persona.how_discovers_brands}</p>}
                    </div>
                  )}
                </div>
              </Section>
            )}

            {/* ─── BRAND IDENTITY ─── */}
            {identity.archetype && (
              <Section icon={Star} title="Identidad de marca" delay={0.48}>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {identity.current_tone && (
                    <div className="p-4 rounded-xl border border-white/8 bg-white/[0.02]">
                      <p className="text-[10px] text-brand-gray/60 uppercase">Tono actual</p>
                      <p className="text-sm text-white mt-1">{identity.current_tone}</p>
                    </div>
                  )}
                  {identity.recommended_tone && (
                    <div className="p-4 rounded-xl border border-brand-yellow/15 bg-brand-yellow/[0.03]">
                      <p className="text-[10px] text-brand-yellow/60 uppercase">Tono recomendado</p>
                      <p className="text-sm text-white mt-1">{identity.recommended_tone}</p>
                    </div>
                  )}
                  {identity.archetype && (
                    <div className="p-4 rounded-xl border border-white/8 bg-white/[0.02]">
                      <p className="text-[10px] text-brand-gray/60 uppercase">Arquetipo</p>
                      <p className="text-sm text-white mt-1">{identity.archetype}</p>
                    </div>
                  )}
                  {identity.differentiator && (
                    <div className="p-4 rounded-xl border border-white/8 bg-white/[0.02]">
                      <p className="text-[10px] text-brand-gray/60 uppercase">Diferenciador</p>
                      <p className="text-sm text-white mt-1">{identity.differentiator}</p>
                    </div>
                  )}
                </div>
              </Section>
            )}

            {/* ─── CONTENT PILLARS ─── */}
            {strategy.pillars?.length > 0 && (
              <Section icon={Target} title="Pilares de contenido recomendados" delay={0.5}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {strategy.pillars.map((p: any, i: number) => (
                    <div key={i} className="p-4 rounded-xl border border-white/8 bg-white/[0.02]">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-bold text-white">{p.name}</span>
                        <span className="text-xs text-brand-yellow font-bold">{p.percentage}%</span>
                      </div>
                      <p className="text-xs text-brand-gray">{p.description}</p>
                      {p.example_posts?.length > 0 && (
                        <div className="mt-2 space-y-1">
                          {p.example_posts.slice(0, 2).map((ex: string, j: number) => (
                            <p key={j} className="text-[11px] text-brand-gray/60">• {ex}</p>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </Section>
            )}

            {/* ─── FUNNEL ─── */}
            {strategy.funnel?.tofu && (
              <Section icon={PieChart} title="Estrategia de funnel" delay={0.52}>
                <div className="grid grid-cols-3 gap-3">
                  {["tofu", "mofu", "bofu"].map((stage) => {
                    const data = strategy.funnel[stage];
                    if (!data) return null;
                    const labels = { tofu: "TOFU", mofu: "MOFU", bofu: "BOFU" };
                    const colors = { tofu: "text-blue-400 border-blue-400/20 bg-blue-400/5", mofu: "text-brand-yellow border-brand-yellow/20 bg-brand-yellow/5", bofu: "text-emerald-400 border-emerald-400/20 bg-emerald-400/5" };
                    return (
                      <div key={stage} className={`p-4 rounded-xl border ${colors[stage as keyof typeof colors]}`}>
                        <p className="text-lg font-bold">{data.percentage}%</p>
                        <p className="text-xs font-semibold uppercase">{labels[stage as keyof typeof labels]}</p>
                        {data.goal && <p className="text-[11px] text-brand-gray mt-2">{data.goal}</p>}
                      </div>
                    );
                  })}
                </div>
              </Section>
            )}

            {/* ─── HOOK FORMULAS ─── */}
            {strategy.hook_formulas?.length > 0 && (
              <Section icon={Lightbulb} title="Fórmulas de hooks" delay={0.55}>
                <div className="space-y-2">
                  {strategy.hook_formulas.map((hook: string, i: number) => (
                    <div key={i} className="flex gap-3 p-3 rounded-xl border border-white/8 bg-white/[0.02]">
                      <span className="text-brand-yellow font-bold text-sm">{i + 1}</span>
                      <p className="text-sm text-brand-gray">{hook}</p>
                    </div>
                  ))}
                </div>
              </Section>
            )}

            {/* ─── BEST TIMES ─── */}
            {strategy.best_times?.days && (
              <Section icon={Clock} title="Mejores horarios para publicar" delay={0.57}>
                <div className="p-5 rounded-2xl border border-white/8 bg-white/[0.02]">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-[10px] text-brand-gray/60 uppercase mb-1">Días</p>
                      <p className="text-sm text-white">{Array.isArray(strategy.best_times.days) ? strategy.best_times.days.join(", ") : strategy.best_times.days}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-brand-gray/60 uppercase mb-1">Horas</p>
                      <p className="text-sm text-white">{Array.isArray(strategy.best_times.hours) ? strategy.best_times.hours.join(", ") : strategy.best_times.hours}</p>
                    </div>
                  </div>
                  {strategy.best_times.reason && <p className="text-xs text-brand-gray mt-3">{strategy.best_times.reason}</p>}
                </div>
              </Section>
            )}

            {/* ─── QUICK WINS ─── */}
            {quickWins.length > 0 && (
              <Section icon={Zap} title="Acciones inmediatas" delay={0.6}>
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
              </Section>
            )}

            {/* ─── SERVICE PROPOSAL ─── */}
            {proposal.recommended && (
              <Section icon={Star} title="Paquete recomendado" delay={0.65}>
                <div className="p-5 rounded-2xl border border-brand-gold/25 bg-gradient-to-br from-brand-yellow/8 to-transparent">
                  <p className="text-lg text-white font-bold mb-1">{proposal.recommended}</p>
                  {proposal.pricing_note && <p className="text-sm text-brand-gray">{proposal.pricing_note}</p>}
                  {proposal.estimated_roi && <p className="text-sm text-brand-yellow font-medium mt-2">ROI estimado: {proposal.estimated_roi}</p>}
                </div>
              </Section>
            )}

            {/* ─── NEXT STEPS ─── */}
            {nextSteps.length > 0 && (
              <Section icon={ArrowRight} title="Siguientes pasos" delay={0.7}>
                <div className="space-y-2">
                  {nextSteps.map((step: string, i: number) => (
                    <div key={i} className="flex gap-3 p-3 rounded-xl border border-white/8 bg-white/[0.02]">
                      <span className="w-6 h-6 rounded-full bg-brand-yellow/20 flex items-center justify-center text-[11px] text-brand-yellow font-bold flex-shrink-0">{i + 1}</span>
                      <p className="text-sm text-brand-gray">{step}</p>
                    </div>
                  ))}
                </div>
              </Section>
            )}

            {/* ─── CTA ─── */}
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
                30 minutos gratis con un estratega de contenido. Sin compromiso.
              </p>
              <Button size="xl" asChild className="gap-2 mb-4">
                <a href="/agendar">
                  <Calendar className="w-5 h-5" />
                  Agendar mi llamada gratis de 30 min
                  <ArrowRight className="w-5 h-5" />
                </a>
              </Button>
              <br />
              <a
                href={COMMUNITY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-emerald-400 hover:text-emerald-300 transition-colors mt-2"
              >
                <MessageCircle className="w-4 h-4" />
                Unirme a la comunidad de WhatsApp
              </a>
            </motion.div>

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
