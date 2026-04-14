import Link from "next/link";
import { ExternalLink } from "lucide-react";
import type { LeadDetail } from "../LeadDetailClient";

interface Props {
  lead: LeadDetail;
}

interface AIDiagnosis {
  overall_score?: number;
  scores?: Record<string, number>;
  executive_summary?: string;
  quick_wins?: unknown[];
  next_steps?: unknown[];
  service_proposal?: Record<string, unknown>;
  ig_profile?: Record<string, unknown>;
  content_audit?: {
    whats_failing?: Array<{ insight?: string; evidence?: string }>;
    whats_working?: Array<{ insight?: string; evidence?: string }>;
    ad_analysis?: { summary?: string; recommendation?: string };
  };
  buyer_persona?: Record<string, unknown>;
  brand_identity?: Record<string, unknown>;
}

export function DiagnosisTab({ lead }: Props) {
  const ai = lead.aiDiagnosis as AIDiagnosis | null;

  if (!ai) {
    return (
      <div className="text-center py-12 text-brand-gray">
        Este lead no tiene diagnóstico IA generado.
      </div>
    );
  }

  const audit = ai.content_audit;
  const failing = audit?.whats_failing ?? [];
  const working = audit?.whats_working ?? [];

  return (
    <div className="space-y-5">
      {lead.diagnosisPublic && lead.diagnosisSlug && (
        <Link
          href={`/diagnostico/${lead.diagnosisSlug}`}
          target="_blank"
          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold hover:bg-emerald-500/20"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          Ver página pública del diagnóstico
        </Link>
      )}

      {/* Scores */}
      {ai.scores && (
        <section className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
          <h3 className="font-display text-lg uppercase tracking-tight text-white mb-3">
            Scores
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {Object.entries(ai.scores).map(([key, value]) => (
              <div key={key} className="rounded-lg border border-white/5 bg-black/30 p-3">
                <p className="text-[10px] uppercase tracking-widest text-brand-gray">
                  {key.replace(/_/g, " ")}
                </p>
                <p className="text-2xl font-display text-brand-yellow mt-1">
                  {value}/100
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Executive summary */}
      {ai.executive_summary && (
        <section className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
          <h3 className="font-display text-lg uppercase tracking-tight text-white mb-3">
            Resumen ejecutivo
          </h3>
          <p className="text-sm text-white/90 leading-relaxed">
            {ai.executive_summary}
          </p>
        </section>
      )}

      {/* Lo que falla */}
      {failing.length > 0 && (
        <section className="rounded-2xl border border-red-500/20 bg-red-500/[0.04] p-5">
          <h3 className="font-display text-lg uppercase tracking-tight text-red-400 mb-3">
            ❌ Lo que está fallando
          </h3>
          <ul className="space-y-3">
            {failing.map((item, i) => (
              <li key={i} className="text-sm">
                <p className="text-white/90 font-semibold">{item.insight}</p>
                {item.evidence && (
                  <p className="text-brand-gray text-xs mt-1 italic">
                    Evidencia: {item.evidence}
                  </p>
                )}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Lo que funciona */}
      {working.length > 0 && (
        <section className="rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.04] p-5">
          <h3 className="font-display text-lg uppercase tracking-tight text-emerald-400 mb-3">
            ✅ Lo que está funcionando
          </h3>
          <ul className="space-y-3">
            {working.map((item, i) => (
              <li key={i} className="text-sm">
                <p className="text-white/90 font-semibold">{item.insight}</p>
                {item.evidence && (
                  <p className="text-brand-gray text-xs mt-1 italic">
                    Evidencia: {item.evidence}
                  </p>
                )}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Quick wins + Next steps */}
      <div className="grid md:grid-cols-2 gap-4">
        {Array.isArray(ai.quick_wins) && ai.quick_wins.length > 0 && (
          <section className="rounded-2xl border border-brand-gold/25 bg-brand-yellow/[0.04] p-5">
            <h3 className="font-display text-base uppercase tracking-tight text-brand-yellow mb-3">
              ⚡ Quick Wins
            </h3>
            <ol className="space-y-2 text-sm text-white/90 list-decimal list-inside">
              {ai.quick_wins.map((qw, i) => {
                const text =
                  typeof qw === "string"
                    ? qw
                    : (qw as { action?: string })?.action ?? JSON.stringify(qw);
                return <li key={i}>{text}</li>;
              })}
            </ol>
          </section>
        )}

        {Array.isArray(ai.next_steps) && ai.next_steps.length > 0 && (
          <section className="rounded-2xl border border-blue-500/25 bg-blue-500/[0.04] p-5">
            <h3 className="font-display text-base uppercase tracking-tight text-blue-400 mb-3">
              🎯 Next Steps
            </h3>
            <ol className="space-y-2 text-sm text-white/90 list-decimal list-inside">
              {ai.next_steps.map((ns, i) => (
                <li key={i}>{typeof ns === "string" ? ns : JSON.stringify(ns)}</li>
              ))}
            </ol>
          </section>
        )}
      </div>

      {/* Service proposal */}
      {ai.service_proposal && Object.keys(ai.service_proposal).length > 0 && (
        <section className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
          <h3 className="font-display text-lg uppercase tracking-tight text-white mb-3">
            Propuesta de servicio
          </h3>
          <pre className="text-xs text-brand-gray whitespace-pre-wrap font-mono bg-black/30 p-3 rounded-lg overflow-x-auto">
            {JSON.stringify(ai.service_proposal, null, 2)}
          </pre>
        </section>
      )}
    </div>
  );
}
