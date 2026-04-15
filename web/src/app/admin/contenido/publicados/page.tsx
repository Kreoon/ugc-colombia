import Link from 'next/link';
import { ArrowLeft, Archive } from 'lucide-react';
import { requireAuth } from '@/lib/auth';
import {
  listPublications,
  listScripts,
  listActiveTeamMembers,
} from '@/lib/admin/content-dal';
import { SCRIPT_PLATFORM_LABEL } from '@/lib/admin/script-status';
import { PageHero, StatBlock, StatsRow, EmptyState } from '@/components/admin/ui';

export const dynamic = 'force-dynamic';

function fmtNumber(n: number): string {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + 'M';
  if (n >= 1_000) return (n / 1_000).toFixed(1) + 'K';
  return String(n);
}

export default async function PublicadosPage() {
  await requireAuth();

  const [publications, scripts, team] = await Promise.all([
    listPublications(),
    listScripts({}),
    listActiveTeamMembers(),
  ]);

  const scriptById = new Map(scripts.map((s) => [s.id, s]));
  const teamById = new Map(team.map((t) => [t.id, t.full_name]));

  // Stats del mes actual
  const now = new Date();
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();
  const monthPubs = publications.filter(
    (p) => p.published_at && p.published_at >= monthStart,
  );
  const totalViewsMonth = monthPubs.reduce((a, p) => a + (p.views ?? 0), 0);
  const avgERMonth =
    monthPubs.length > 0
      ? monthPubs.reduce((a, p) => a + Number(p.engagement_rate ?? 0), 0) /
        monthPubs.length
      : 0;
  const topPerformer = [...publications].sort(
    (a, b) => (b.views ?? 0) - (a.views ?? 0),
  )[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
      <div className="mb-6">
        <Link
          href="/admin/contenido"
          className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase text-brand-gray hover:text-brand-yellow transition-colors"
        >
          <ArrowLeft className="w-3 h-3" aria-hidden />
          Volver a Contenido
        </Link>
      </div>

      <PageHero
        eyebrow="Archivo de publicaciones"
        title="Lo que sale"
        highlight="al mundo."
        lead="Historial completo con métricas. Cada row es un momento de distribución registrado por el equipo."
      />

      {/* Stats del mes */}
      <div className="mb-10">
        <StatsRow>
          <StatBlock
            label="Publicaciones del mes"
            value={String(monthPubs.length)}
          />
          <StatBlock
            label="Views acumuladas (mes)"
            value={fmtNumber(totalViewsMonth)}
          />
          <StatBlock
            label="ER promedio (mes)"
            value={avgERMonth > 0 ? avgERMonth.toFixed(1) + '%' : '—'}
            highlight={avgERMonth > 0}
          />
          <StatBlock
            label="Top performer"
            value={topPerformer ? fmtNumber(topPerformer.views ?? 0) + ' views' : '—'}
            sub={
              topPerformer && scriptById.has(topPerformer.script_id)
                ? scriptById.get(topPerformer.script_id)!.slug
                : undefined
            }
          />
        </StatsRow>
      </div>

      {/* Lista */}
      {publications.length === 0 ? (
        <EmptyState
          icon={Archive}
          title="Sin publicaciones registradas"
          desc="Registra la primera desde el detalle de cualquier guion → tab Publicaciones → Registrar publicación."
        />
      ) : (
        <ul className="space-y-2">
          {publications.map((p) => {
            const script = scriptById.get(p.script_id);
            return (
              <li
                key={p.id}
                className="rounded-xl bg-white/[0.04] border border-brand-gold/15 p-4 flex items-start gap-4 flex-wrap hover:border-brand-yellow/40 transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 text-xs text-brand-gray mb-1 flex-wrap">
                    <span className="font-mono uppercase tracking-wider text-brand-yellow">
                      {SCRIPT_PLATFORM_LABEL[p.platform] ?? p.platform}
                    </span>
                    {p.published_at && (
                      <>
                        <span>·</span>
                        <span>
                          {new Date(p.published_at).toLocaleDateString('es-CO', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                          })}
                        </span>
                      </>
                    )}
                    {p.editor_id && teamById.get(p.editor_id) && (
                      <>
                        <span>·</span>
                        <span>Edición: {teamById.get(p.editor_id)}</span>
                      </>
                    )}
                  </div>
                  {script ? (
                    <Link
                      href={`/admin/contenido/guiones/${script.slug}`}
                      className="text-sm font-semibold text-white hover:text-brand-yellow transition-colors"
                    >
                      {script.slug} · {script.title}
                    </Link>
                  ) : (
                    <span className="text-sm text-brand-gray">Guion eliminado</span>
                  )}
                  {p.url && (
                    <a
                      href={p.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-xs text-brand-gray hover:text-brand-yellow truncate mt-1"
                    >
                      {p.url}
                    </a>
                  )}
                </div>
                <div className="flex flex-wrap gap-2 text-xs">
                  <Metric label="Views" value={fmtNumber(p.views ?? 0)} />
                  <Metric label="Likes" value={fmtNumber(p.likes ?? 0)} />
                  <Metric label="Com" value={fmtNumber(p.comments ?? 0)} />
                  <Metric label="Saves" value={fmtNumber(p.saves ?? 0)} />
                  <Metric label="Shr" value={fmtNumber(p.shares ?? 0)} />
                  {p.engagement_rate != null && (
                    <Metric
                      label="ER"
                      value={Number(p.engagement_rate).toFixed(1) + '%'}
                      highlight
                    />
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

function Metric({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`flex flex-col items-center justify-center min-w-[52px] rounded-lg border px-2 py-1 ${
        highlight
          ? 'bg-brand-yellow/10 border-brand-yellow/30'
          : 'bg-white/5 border-white/8'
      }`}
    >
      <div className="text-[9px] uppercase tracking-widest text-brand-gray">
        {label}
      </div>
      <div
        className={`text-sm font-semibold ${highlight ? 'text-brand-yellow' : 'text-white'}`}
      >
        {value}
      </div>
    </div>
  );
}
