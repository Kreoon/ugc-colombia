import type { LeadDetail } from "../LeadDetailClient";

function formatDate(iso: string | null): string {
  if (!iso) return "—";
  return new Date(iso).toLocaleString("es-CO", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatBudget(b: string | null): string {
  if (!b) return "—";
  const map: Record<string, string> = {
    nada: "Sin presupuesto",
    menos_500: "< $500 USD/mes",
    "500_1000": "$500-1k USD/mes",
    "1000_3000": "$1k-3k USD/mes",
    "3000_5000": "$3k-5k USD/mes",
    mas_5000: "+$5k USD/mes",
  };
  return map[b] ?? b;
}

function MetricCard({
  label,
  value,
  hint,
}: {
  label: string;
  value: string | number;
  hint?: string;
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
      <p className="text-[10px] font-bold uppercase tracking-widest text-brand-gray mb-1">
        {label}
      </p>
      <p className="text-2xl font-display text-white">{value}</p>
      {hint && <p className="text-xs text-brand-gray mt-1">{hint}</p>}
    </div>
  );
}

interface Props {
  lead: LeadDetail;
}

export function OverviewTab({ lead }: Props) {
  const ai = lead.aiDiagnosis as
    | { overall_score?: number; executive_summary?: string; quick_wins?: unknown[] }
    | null;

  const aiScore = ai?.overall_score ?? null;
  const summary = ai?.executive_summary ?? null;
  const quickWins = Array.isArray(ai?.quick_wins) ? ai?.quick_wins : null;

  return (
    <div className="space-y-6">
      {/* Métricas */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <MetricCard
          label="AI Score"
          value={aiScore !== null ? `${aiScore}/100` : "—"}
        />
        <MetricCard
          label="Lead Score"
          value={`${lead.qualificationScore}/100`}
        />
        <MetricCard label="Budget Ads" value={formatBudget(lead.adBudget)} />
        <MetricCard
          label="Industria"
          value={lead.industry ? lead.industry : "—"}
        />
      </div>

      {/* Executive summary */}
      {summary && (
        <section className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
          <h3 className="font-display text-lg uppercase tracking-tight text-white mb-3">
            Resumen ejecutivo (IA)
          </h3>
          <p className="text-sm text-brand-gray leading-relaxed">{summary}</p>
        </section>
      )}

      {/* Quick wins */}
      {quickWins && quickWins.length > 0 && (
        <section className="rounded-2xl border border-brand-gold/25 bg-brand-yellow/[0.04] p-5">
          <h3 className="font-display text-lg uppercase tracking-tight text-white mb-3">
            ⚡ Quick wins
          </h3>
          <ul className="space-y-2">
            {quickWins.slice(0, 5).map((qw, i) => {
              const text =
                typeof qw === "string"
                  ? qw
                  : (qw as { action?: string })?.action ?? JSON.stringify(qw);
              return (
                <li
                  key={i}
                  className="flex items-start gap-2 text-sm text-white/90"
                >
                  <span className="text-brand-yellow font-bold">{i + 1}.</span>
                  <span>{text}</span>
                </li>
              );
            })}
          </ul>
        </section>
      )}

      {/* Datos adicionales */}
      <section className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 space-y-3">
        <h3 className="font-display text-lg uppercase tracking-tight text-white">
          Datos del lead
        </h3>
        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
          <div>
            <dt className="text-[10px] uppercase tracking-widest text-brand-gray">Empresa</dt>
            <dd className="text-white mt-0.5">{lead.company || "—"}</dd>
          </div>
          <div>
            <dt className="text-[10px] uppercase tracking-widest text-brand-gray">Urgencia</dt>
            <dd className="text-white mt-0.5">{lead.urgency || "—"}</dd>
          </div>
          <div>
            <dt className="text-[10px] uppercase tracking-widest text-brand-gray">Tiene website</dt>
            <dd className="text-white mt-0.5">{lead.hasWebsite ? "Sí" : "No"}</dd>
          </div>
          <div>
            <dt className="text-[10px] uppercase tracking-widest text-brand-gray">Ads activos</dt>
            <dd className="text-white mt-0.5">{lead.hasActiveAds ? "Sí" : "No"}</dd>
          </div>
          {lead.biggestPain && (
            <div className="sm:col-span-2">
              <dt className="text-[10px] uppercase tracking-widest text-brand-gray">Principal dolor</dt>
              <dd className="text-white mt-0.5">{lead.biggestPain}</dd>
            </div>
          )}
          {lead.creatorNiche && (
            <div>
              <dt className="text-[10px] uppercase tracking-widest text-brand-gray">Nicho creador</dt>
              <dd className="text-white mt-0.5">{lead.creatorNiche}</dd>
            </div>
          )}
          {lead.creatorFollowers !== null && (
            <div>
              <dt className="text-[10px] uppercase tracking-widest text-brand-gray">Followers</dt>
              <dd className="text-white mt-0.5">
                {lead.creatorFollowers.toLocaleString("es-CO")}
              </dd>
            </div>
          )}
          <div>
            <dt className="text-[10px] uppercase tracking-widest text-brand-gray">Creado</dt>
            <dd className="text-white mt-0.5">{formatDate(lead.createdAt)}</dd>
          </div>
          <div>
            <dt className="text-[10px] uppercase tracking-widest text-brand-gray">Último contacto</dt>
            <dd className="text-white mt-0.5">{formatDate(lead.lastContactedAt)}</dd>
          </div>
        </dl>
      </section>
    </div>
  );
}
