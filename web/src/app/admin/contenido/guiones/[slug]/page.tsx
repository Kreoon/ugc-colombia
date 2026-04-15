import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { requireAuth } from '@/lib/auth';
import {
  getScriptBySlug,
  listScriptEvents,
  listPublications,
  listActiveTeamMembers,
} from '@/lib/admin/content-dal';
import { readContentFile } from '@/lib/content';
import { ScriptTabs } from '@/components/admin/ScriptTabs';
import type { Scene } from '@/components/admin/ScenesTable';
import { scriptStatusMeta } from '@/lib/admin/script-status';

export const dynamic = 'force-dynamic';

export default async function ScriptDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  await requireAuth();
  const { slug } = await params;

  const script = await getScriptBySlug(slug);
  if (!script) notFound();

  const [events, publications, team] = await Promise.all([
    listScriptEvents(script.id),
    listPublications({ scriptId: script.id }),
    listActiveTeamMembers(),
  ]);

  const originalRead = script.md_file_path
    ? await readContentFile(script.md_file_path)
    : null;
  const originalMd = originalRead?.raw ?? null;
  const frontmatter = originalRead?.frontmatter ?? {};

  const humanizedMd = script.humanized_md_file_path
    ? (await readContentFile(script.humanized_md_file_path))?.raw ?? null
    : null;

  // Parser tolerante — acepta variaciones de nomenclatura entre agentes.
  const rawScenes = frontmatter.scenes;
  const scenes: Scene[] = Array.isArray(rawScenes)
    ? rawScenes.map((raw: unknown, idx: number): Scene => {
        const s = (raw ?? {}) as Record<string, unknown>;
        const tStart = s.t_start ?? s.start ?? null;
        const tEnd = s.t_end ?? s.end ?? null;
        const timeCombined =
          s.time ??
          (tStart !== null && tEnd !== null
            ? `${tStart}-${tEnd}s`
            : tStart !== null
            ? `${tStart}s`
            : '');
        const editingParts: string[] = [];
        if (s.editing) editingParts.push(String(s.editing));
        if (s.sfx) editingParts.push(`SFX: ${String(s.sfx)}`);
        if (s.overlay_notes) editingParts.push(`Overlay: ${String(s.overlay_notes)}`);
        if (s.dopamine) editingParts.push(`🎯 ${String(s.dopamine)}`);
        return {
          id: (s.id as string | number | undefined) ?? idx + 1,
          time: String(timeCombined),
          visual: String(s.visual ?? s.beat ?? ''),
          voice: String(s.voice ?? s.audio ?? ''),
          creator_action: s.creator_action
            ? String(s.creator_action)
            : undefined,
          editing: editingParts.join(' · '),
          broll: Array.isArray(s.broll)
            ? (s.broll as unknown[]).map(String)
            : typeof s.broll === 'string'
            ? [s.broll]
            : undefined,
        };
      })
    : [];

  const meta = scriptStatusMeta(script.status);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Link
        href="/admin/contenido/guiones"
        className="inline-flex items-center gap-2 text-brand-gray hover:text-brand-yellow transition-colors text-sm mb-6"
      >
        <ArrowLeft className="w-4 h-4" aria-hidden />
        Volver a Guiones
      </Link>

      <header className="mb-8">
        <div className="flex items-center gap-3 mb-3 flex-wrap">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-brand-yellow/80">
            {script.slug}
          </span>
          <span
            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full border text-[10px] font-semibold uppercase tracking-wider ${meta.bgColor} ${meta.borderColor} ${meta.color}`}
          >
            <span aria-hidden>{meta.icon}</span>
            {meta.label}
          </span>
        </div>
        <h1 className="font-display text-4xl md:text-5xl uppercase text-white leading-tight mb-3">
          {script.title}
        </h1>
        {script.hook && (
          <p className="text-brand-gray italic text-lg max-w-3xl">
            “{script.hook}”
          </p>
        )}
      </header>

      <ScriptTabs
        script={script}
        publications={publications}
        events={events}
        team={team}
        originalMd={originalMd}
        humanizedMd={humanizedMd}
        scenes={scenes}
      />
    </div>
  );
}
