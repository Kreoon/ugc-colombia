import Link from 'next/link';
import { Clock, Play, Check } from 'lucide-react';
import type { ContentScript } from '@/lib/admin/content-dal';
import {
  scriptStatusMeta,
  SCRIPT_PILLAR_LABEL,
  SCRIPT_PLATFORM_LABEL,
} from '@/lib/admin/script-status';

interface ScriptCardProps {
  script: ContentScript;
  editorName?: string | null;
}

function formatDuration(seconds: number | null): string {
  if (!seconds) return '—';
  if (seconds < 60) return `${seconds}s`;
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return s ? `${m}m ${s}s` : `${m}m`;
}

export function ScriptCard({ script, editorName }: ScriptCardProps) {
  const meta = scriptStatusMeta(script.status);

  return (
    <Link
      href={`/admin/contenido/guiones/${script.slug}`}
      className="group block rounded-2xl bg-white/[0.04] border border-brand-gold/15 hover:border-brand-yellow/50 hover:bg-white/[0.06] transition-all p-5"
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-2 min-w-0">
          <span className="font-mono text-[10px] uppercase tracking-widest text-brand-yellow/80">
            {script.slug}
          </span>
          {script.pillar && (
            <span className="px-2 py-0.5 rounded-full bg-brand-yellow/10 border border-brand-yellow/30 text-[10px] uppercase tracking-wider text-brand-yellow truncate">
              {SCRIPT_PILLAR_LABEL[script.pillar]}
            </span>
          )}
        </div>
        <span
          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full border text-[10px] font-semibold uppercase tracking-wider flex-shrink-0 ${meta.bgColor} ${meta.borderColor} ${meta.color}`}
          title={meta.description}
        >
          <span aria-hidden>{meta.icon}</span>
          {meta.label}
        </span>
      </div>

      <h3 className="font-display text-lg uppercase text-white group-hover:text-brand-yellow transition-colors leading-tight mb-2">
        {script.title}
      </h3>

      {script.hook && (
        <p className="text-sm text-brand-gray line-clamp-2 mb-4 italic">
          “{script.hook}”
        </p>
      )}

      <div className="flex items-center gap-4 text-xs text-brand-gray mb-3">
        <span className="inline-flex items-center gap-1">
          <Clock className="w-3 h-3" aria-hidden />
          {formatDuration(script.duration_seconds)}
        </span>
        {script.platform && (
          <span className="inline-flex items-center gap-1">
            <Play className="w-3 h-3" aria-hidden />
            {SCRIPT_PLATFORM_LABEL[script.platform]}
          </span>
        )}
        {editorName && (
          <span className="ml-auto truncate text-brand-yellow/80">
            {editorName}
          </span>
        )}
      </div>

      <div className="flex items-center gap-2 pt-3 border-t border-white/5">
        <Flag label="Grabado" on={script.recorded} />
        <Flag label="Editado" on={script.edited} />
        <Flag label="Publicado" on={script.published} />
        {script.archived && <Flag label="Archivado" on muted />}
      </div>
    </Link>
  );
}

function Flag({
  label,
  on,
  muted,
}: {
  label: string;
  on: boolean;
  muted?: boolean;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full border ${
        on
          ? muted
            ? 'text-brand-gray border-brand-gray/30 bg-brand-gray/10'
            : 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10'
          : 'text-brand-gray/50 border-white/10 bg-white/5'
      }`}
      aria-label={`${label}: ${on ? 'sí' : 'no'}`}
    >
      {on && <Check className="w-2.5 h-2.5" aria-hidden />}
      {label}
    </span>
  );
}
