import Link from 'next/link';
import { ArrowLeft, Scissors, Clock, Radio, Archive } from 'lucide-react';
import { requireAuth } from '@/lib/auth';
import {
  listScripts,
  listPublications,
  listActiveTeamMembers,
} from '@/lib/admin/content-dal';
import { ScriptCard } from '@/components/admin/ScriptCard';
import { SCRIPT_PLATFORM_LABEL } from '@/lib/admin/script-status';

export const dynamic = 'force-dynamic';

export default async function ValentinaPage() {
  await requireAuth();

  const team = await listActiveTeamMembers();
  const valentina = team.find((t) => t.email === 'valentina@ugccolombia.co');

  if (!valentina) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <Link
          href="/admin/contenido"
          className="inline-flex items-center gap-2 text-brand-gray hover:text-brand-yellow transition-colors text-sm mb-6"
        >
          <ArrowLeft className="w-4 h-4" aria-hidden />
          Volver a Contenido
        </Link>
        <div className="rounded-2xl bg-white/[0.03] border border-brand-gold/10 p-12 text-center">
          <Scissors
            className="w-12 h-12 text-brand-yellow/40 mx-auto mb-4"
            aria-hidden
          />
          <h2 className="font-display text-2xl uppercase text-white mb-2">
            Valentina aún no está registrada
          </h2>
          <p className="text-brand-gray text-sm max-w-md mx-auto">
            Aplica la migración{' '}
            <code className="text-brand-yellow">20260415120000_content_system.sql</code>{' '}
            para cargar el seed del team_member.
          </p>
        </div>
      </div>
    );
  }

  const [allScripts, myPublications] = await Promise.all([
    listScripts({}),
    listPublications({ editorId: valentina.id }),
  ]);

  const inQueue = allScripts.filter(
    (s) =>
      s.assigned_editor === valentina.id &&
      !s.archived &&
      ['grabado', 'editando'].includes(s.status),
  );
  const delivered = allScripts.filter(
    (s) =>
      s.assigned_editor === valentina.id &&
      !s.archived &&
      ['entregado', 'publicado'].includes(s.status),
  );
  const archive = allScripts.filter(
    (s) => s.assigned_editor === valentina.id && s.archived,
  );

  const totalViews = myPublications.reduce((a, p) => a + (p.views ?? 0), 0);
  const avgER =
    myPublications.length > 0
      ? myPublications.reduce(
          (a, p) => a + Number(p.engagement_rate ?? 0),
          0,
        ) / myPublications.length
      : 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Link
        href="/admin/contenido"
        className="inline-flex items-center gap-2 text-brand-gray hover:text-brand-yellow transition-colors text-sm mb-6"
      >
        <ArrowLeft className="w-4 h-4" aria-hidden />
        Volver a Contenido
      </Link>

      <header className="mb-10 flex items-center gap-5 flex-wrap">
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-brand-yellow to-brand-gold flex items-center justify-center text-black font-display text-3xl flex-shrink-0">
          VG
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-brand-yellow text-xs font-semibold tracking-[0.2em] uppercase mb-2">
            · Editora de planta
          </div>
          <h1 className="font-display text-4xl md:text-5xl uppercase text-white leading-tight">
            Vale{' '}
            <span className="bg-gradient-to-r from-[#f9b334] via-[#d4a017] to-[#f9b334] bg-clip-text text-transparent">
              Giraldo.
            </span>
          </h1>
          <p className="text-brand-gray mt-2 max-w-xl">
            Tu cola, tus entregas y tu archivo. El pack operativo completo vive
            en{' '}
            <Link
              href="/admin/packs/valentina"
              className="text-brand-yellow hover:underline"
            >
              /admin/packs/valentina
            </Link>
            .
          </p>
        </div>
      </header>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-10">
        <Stat label="En cola" value={String(inQueue.length)} icon={Clock} />
        <Stat
          label="Entregados"
          value={String(delivered.length)}
          icon={Radio}
        />
        <Stat
          label="Views acumuladas"
          value={fmtNumber(totalViews)}
          icon={Radio}
        />
        <Stat
          label="ER promedio"
          value={avgER > 0 ? avgER.toFixed(1) + '%' : '—'}
          icon={Radio}
        />
      </div>

      {/* Cola de edición */}
      <Section
        title="Cola de edición"
        subtitle={`${inQueue.length} video(s) esperando tu mano`}
        icon={Scissors}
      >
        {inQueue.length === 0 ? (
          <Empty text="Sin pendientes. Buen momento para documentar cortes o explorar referentes." />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {inQueue.map((s) => (
              <ScriptCard key={s.id} script={s} editorName="Vale" />
            ))}
          </div>
        )}
      </Section>

      {/* Entregados esta semana */}
      <Section
        title="Mis entregas recientes"
        subtitle="Lo que salió de tu banco de trabajo"
        icon={Radio}
      >
        {delivered.length === 0 ? (
          <Empty text="Aún no hay entregas registradas a tu nombre." />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {delivered.slice(0, 9).map((s) => (
              <ScriptCard key={s.id} script={s} editorName="Vale" />
            ))}
          </div>
        )}
      </Section>

      {/* Mis publicaciones */}
      <Section
        title="Publicaciones con tu edición"
        subtitle="Métricas manuales · alimentadas por el equipo"
        icon={Radio}
      >
        {myPublications.length === 0 ? (
          <Empty text="Aún no se ha registrado ninguna publicación con tu crédito de edición." />
        ) : (
          <ul className="space-y-2">
            {myPublications.slice(0, 10).map((p) => (
              <li
                key={p.id}
                className="rounded-xl bg-white/[0.04] border border-brand-gold/15 p-4 flex items-center gap-4 flex-wrap"
              >
                <div className="flex-1 min-w-0">
                  <div className="text-xs text-brand-gray mb-1 uppercase tracking-wider">
                    {SCRIPT_PLATFORM_LABEL[p.platform] ?? p.platform} ·{' '}
                    {p.published_at
                      ? new Date(p.published_at).toLocaleDateString('es-CO')
                      : '—'}
                  </div>
                  {p.url && (
                    <a
                      href={p.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-white hover:text-brand-yellow truncate block"
                    >
                      {p.url}
                    </a>
                  )}
                </div>
                <div className="flex gap-2 text-xs">
                  <Pill label="Views" value={fmtNumber(p.views ?? 0)} />
                  <Pill label="Saves" value={fmtNumber(p.saves ?? 0)} />
                  {p.engagement_rate != null && (
                    <Pill
                      label="ER"
                      value={Number(p.engagement_rate).toFixed(1) + '%'}
                      highlight
                    />
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </Section>

      {/* Archivo personal */}
      {archive.length > 0 && (
        <Section
          title="Mi archivo"
          subtitle={`${archive.length} guion(es) archivados históricos`}
          icon={Archive}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {archive.slice(0, 6).map((s) => (
              <ScriptCard key={s.id} script={s} editorName="Vale" />
            ))}
          </div>
        </Section>
      )}
    </div>
  );
}

function Section({
  title,
  subtitle,
  icon: Icon,
  children,
}: {
  title: string;
  subtitle: string;
  icon: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-10">
      <header className="flex items-center gap-3 mb-4">
        <Icon className="w-5 h-5 text-brand-yellow" aria-hidden />
        <div>
          <h2 className="font-display text-xl uppercase text-white">{title}</h2>
          <p className="text-xs text-brand-gray">{subtitle}</p>
        </div>
      </header>
      {children}
    </section>
  );
}

function Stat({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: string;
  icon: React.ComponentType<{ className?: string }>;
}) {
  return (
    <div className="rounded-2xl bg-white/[0.04] border border-brand-gold/15 p-5">
      <Icon className="w-5 h-5 text-brand-yellow mb-3" aria-hidden />
      <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-brand-yellow/80 mb-1">
        {label}
      </div>
      <div className="font-display text-3xl text-white">{value}</div>
    </div>
  );
}

function Empty({ text }: { text: string }) {
  return (
    <div className="rounded-2xl bg-white/[0.02] border border-white/8 p-8 text-center text-brand-gray text-sm">
      {text}
    </div>
  );
}

function Pill({
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

function fmtNumber(n: number): string {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + 'M';
  if (n >= 1_000) return (n / 1_000).toFixed(1) + 'K';
  return String(n);
}
