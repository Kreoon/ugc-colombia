import Link from 'next/link';
import { ArrowLeft, Film } from 'lucide-react';
import { requireAuth } from '@/lib/auth';
import { listScripts, listActiveTeamMembers } from '@/lib/admin/content-dal';
import { ScriptCard } from '@/components/admin/ScriptCard';
import { SCRIPT_STATUS_META, SCRIPT_STATUSES } from '@/lib/admin/script-status';

export const dynamic = 'force-dynamic';

interface PageProps {
  searchParams: Promise<{ creator?: string; status?: string }>;
}

export default async function GuionesPage({ searchParams }: PageProps) {
  await requireAuth();
  const params = await searchParams;

  const [scripts, team] = await Promise.all([
    listScripts({
      archived: false,
      assigned_creator: params.creator ?? undefined,
    }),
    listActiveTeamMembers(),
  ]);

  const teamById = new Map(team.map((t) => [t.id, t.full_name]));

  const grouped = SCRIPT_STATUSES.map((status) => ({
    status,
    meta: SCRIPT_STATUS_META[status],
    scripts: scripts.filter((s) => s.status === status),
  }));

  const total = scripts.length;
  const currentCreator = params.creator
    ? team.find((t) => t.id === params.creator) ?? null
    : null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Link
        href="/admin/contenido"
        className="inline-flex items-center gap-2 text-brand-gray hover:text-brand-yellow transition-colors text-sm mb-6"
      >
        <ArrowLeft className="w-4 h-4" aria-hidden />
        Volver a Contenido
      </Link>

      <div className="flex items-end justify-between gap-4 mb-8 flex-wrap">
        <div>
          <div className="text-brand-yellow text-xs font-semibold tracking-[0.2em] uppercase mb-3">
            · Pipeline Editorial
          </div>
          <h1 className="font-display text-5xl uppercase text-white">
            Guiones{' '}
            <span className="bg-gradient-to-r from-[#f9b334] via-[#d4a017] to-[#f9b334] bg-clip-text text-transparent">
              activos.
            </span>
          </h1>
          <p className="text-brand-gray mt-3 max-w-2xl">
            {total} guiones en producción
            {currentCreator ? ` · asignados a ${currentCreator.full_name}` : ''}.
            Abre cualquiera para ver las 9 pestañas.
          </p>
        </div>
      </div>

      {/* Filtro por creator */}
      <div className="flex items-center gap-2 flex-wrap mb-8">
        <Link
          href="/admin/contenido/guiones"
          className={`px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider border transition-all ${
            !params.creator
              ? 'bg-brand-yellow text-black border-brand-yellow'
              : 'bg-white/5 text-brand-gray border-white/10 hover:border-brand-yellow/40 hover:text-white'
          }`}
        >
          Todos
        </Link>
        {team
          .filter((t) => t.role === 'founder' || t.role === 'creative' || t.role === 'manager')
          .map((t) => {
            const active = params.creator === t.id;
            return (
              <Link
                key={t.id}
                href={`/admin/contenido/guiones?creator=${t.id}`}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider border transition-all ${
                  active
                    ? 'bg-brand-yellow text-black border-brand-yellow'
                    : 'bg-white/5 text-brand-gray border-white/10 hover:border-brand-yellow/40 hover:text-white'
                }`}
              >
                {t.full_name}
              </Link>
            );
          })}
      </div>

      {total === 0 ? (
        <EmptyScripts />
      ) : (
        <div className="space-y-10">
          {grouped
            .filter((g) => g.scripts.length > 0)
            .map((g) => (
              <section key={g.status}>
                <header className="flex items-center gap-3 mb-4">
                  <span
                    className={`inline-flex items-center gap-1 px-3 py-1 rounded-full border text-xs font-semibold uppercase tracking-wider ${g.meta.bgColor} ${g.meta.borderColor} ${g.meta.color}`}
                  >
                    <span aria-hidden>{g.meta.icon}</span>
                    {g.meta.label}
                  </span>
                  <span className="text-brand-gray text-sm">
                    {g.scripts.length} guiones
                  </span>
                </header>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {g.scripts.map((s) => (
                    <ScriptCard
                      key={s.id}
                      script={s}
                      editorName={
                        s.assigned_editor
                          ? teamById.get(s.assigned_editor) ?? null
                          : null
                      }
                    />
                  ))}
                </div>
              </section>
            ))}
        </div>
      )}
    </div>
  );
}

function EmptyScripts() {
  return (
    <div className="text-center py-20 rounded-2xl bg-white/[0.03] border border-brand-gold/10">
      <Film className="w-12 h-12 text-brand-yellow/40 mx-auto mb-4" aria-hidden />
      <h2 className="font-display text-xl uppercase text-white mb-2">
        No hay guiones aún
      </h2>
      <p className="text-brand-gray text-sm max-w-md mx-auto">
        Para cargar los guiones corre el seed:
        <br />
        <code className="text-brand-yellow">/api/admin/seed-scripts?scope=all</code>
      </p>
    </div>
  );
}
