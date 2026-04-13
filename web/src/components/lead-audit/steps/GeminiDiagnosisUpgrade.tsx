"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Target,
  Zap,
  ExternalLink,
} from "lucide-react";

interface Props {
  leadId: string;
  instagramHandle?: string;
}

interface GeminiDiagnosis {
  overall_score: number;
  executive_summary: string;
  scores: Record<string, number>;
  content_audit: {
    whats_working: Array<{ insight: string; evidence?: string }>;
    whats_failing: Array<{ insight: string; evidence?: string }>;
  };
  content_strategy: {
    pillars: Array<{ name: string; percentage: number; description: string }>;
    hook_formulas: string[];
  };
  quick_wins: Array<{ action: string; expected_impact: string }>;
  service_proposal: { recommended?: string; estimated_roi?: string };
  ig_profile?: { username: string; followers: number; engagement_rate: number };
}

export function GeminiDiagnosisUpgrade({ leadId, instagramHandle }: Props) {
  const [status, setStatus] = useState<"polling" | "ready" | "timeout">("polling");
  const [diagnosis, setDiagnosis] = useState<GeminiDiagnosis | null>(null);
  const [diagnosisSlug, setDiagnosisSlug] = useState<string | null>(null);
  const attemptsRef = useRef(0);
  const maxAttempts = 30; // 30 * 10s = 5 min max

  useEffect(() => {
    if (!leadId || status !== "polling") return;

    const interval = setInterval(async () => {
      attemptsRef.current++;
      if (attemptsRef.current > maxAttempts) {
        setStatus("timeout");
        clearInterval(interval);
        return;
      }

      try {
        const res = await fetch(`/api/diagnosis-status?lead_id=${leadId}`);
        const data = await res.json();

        if (data.status === "ready" && data.diagnosis) {
          setDiagnosis(data.diagnosis);
          setDiagnosisSlug(data.diagnosis_slug);
          setStatus("ready");
          clearInterval(interval);
        }
      } catch {
        // Silently retry
      }
    }, 10_000);

    return () => clearInterval(interval);
  }, [leadId, status]);

  // Polling state
  if (status === "polling") {
    return (
      <motion.div
        className="mt-6 p-4 rounded-xl border border-brand-yellow/20 bg-brand-yellow/[0.03]"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center gap-3">
          <div className="relative">
            <Sparkles className="w-5 h-5 text-brand-yellow" />
            <motion.div
              className="absolute inset-0"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <Sparkles className="w-5 h-5 text-brand-yellow" />
            </motion.div>
          </div>
          <div>
            <p className="text-sm text-white font-medium">
              Analizando {instagramHandle ? `@${instagramHandle}` : "tu marca"} con IA...
            </p>
            <p className="text-[11px] text-brand-gray/60 mt-0.5">
              Scrapeando Instagram, ads, y competencia. Esto toma ~2 minutos.
            </p>
          </div>
        </div>
        <div className="mt-3 h-1 w-full bg-white/5 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-brand-yellow/40 rounded-full"
            animate={{ width: ["5%", "70%"] }}
            transition={{ duration: 120, ease: "easeOut" }}
          />
        </div>
      </motion.div>
    );
  }

  // Timeout
  if (status === "timeout") {
    return (
      <div className="mt-6 p-4 rounded-xl border border-white/10 bg-white/[0.02]">
        <p className="text-sm text-brand-gray">
          El análisis profundo con IA se está procesando. Recibirás el resultado completo por email.
        </p>
      </div>
    );
  }

  // Ready — show Gemini results
  if (!diagnosis) return null;

  const slug = diagnosisSlug || instagramHandle;

  return (
    <AnimatePresence>
      <motion.div
        className="mt-6 space-y-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-brand-yellow/10 border border-brand-yellow/20">
          <Sparkles className="w-4 h-4 text-brand-yellow" />
          <p className="text-xs text-brand-yellow font-semibold">
            Análisis con IA completado — Score: {diagnosis.overall_score}/100
          </p>
        </div>

        {/* Executive summary */}
        {diagnosis.executive_summary && (
          <div className="p-4 rounded-xl bg-white/[0.03] border border-white/8">
            <p className="text-sm text-brand-gray leading-relaxed">{diagnosis.executive_summary}</p>
          </div>
        )}

        {/* IG profile real data */}
        {diagnosis.ig_profile && (
          <div className="flex items-center gap-4 p-3 rounded-xl bg-white/[0.02] border border-white/8 text-xs text-brand-gray">
            <span>@{diagnosis.ig_profile.username}</span>
            <span>{diagnosis.ig_profile.followers.toLocaleString()} seguidores</span>
            <span>{diagnosis.ig_profile.engagement_rate}% ER</span>
          </div>
        )}

        {/* Top failing + working */}
        {diagnosis.content_audit.whats_failing?.slice(0, 2).map((item, i) => (
          <div key={`f-${i}`} className="flex gap-2 p-3 rounded-xl bg-orange-500/5 border border-orange-500/15 text-sm text-brand-gray">
            <AlertTriangle className="w-4 h-4 text-orange-400 flex-shrink-0 mt-0.5" />
            <span>{item.insight}</span>
          </div>
        ))}

        {diagnosis.content_audit.whats_working?.slice(0, 2).map((item, i) => (
          <div key={`w-${i}`} className="flex gap-2 p-3 rounded-xl bg-emerald-500/5 border border-emerald-500/15 text-sm text-brand-gray">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
            <span>{item.insight}</span>
          </div>
        ))}

        {/* Pillars */}
        {diagnosis.content_strategy.pillars?.length > 0 && (
          <div>
            <p className="flex items-center gap-1.5 text-[11px] text-brand-gray uppercase tracking-wider font-semibold mb-2">
              <Target className="w-3.5 h-3.5 text-brand-yellow" />
              Pilares recomendados
            </p>
            <div className="flex flex-wrap gap-2">
              {diagnosis.content_strategy.pillars.slice(0, 4).map((p, i) => (
                <span key={i} className="px-3 py-1.5 rounded-lg bg-brand-yellow/10 border border-brand-yellow/20 text-xs text-brand-yellow font-medium">
                  {p.name} ({p.percentage}%)
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Quick wins */}
        {diagnosis.quick_wins?.slice(0, 2).map((qw, i) => (
          <div key={`qw-${i}`} className="flex gap-2 p-3 rounded-xl bg-brand-yellow/5 border border-brand-yellow/15 text-sm text-brand-gray">
            <Zap className="w-4 h-4 text-brand-yellow flex-shrink-0 mt-0.5" />
            <div>
              <span className="text-white font-medium">{qw.action}</span>
              <span className="text-brand-gray/60 ml-1">— {qw.expected_impact}</span>
            </div>
          </div>
        ))}

        {/* Link to full page */}
        {slug && (
          <a
            href={`/diagnostico/${slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 text-sm text-brand-yellow hover:text-white transition-colors py-2"
          >
            <ExternalLink className="w-4 h-4" />
            Ver diagnóstico completo
          </a>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
