import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { requireAuth } from '@/lib/auth';

interface Mes {
  slug: string;
  label: string;
  desc: string;
}

const meses: Mes[] = [
  {
    slug: 'julio',
    label: 'Julio 2026',
    desc: 'Preparación Q3 + Back to School',
  },
  {
    slug: 'agosto',
    label: 'Agosto 2026',
    desc: 'Halloween prep + escala UGC',
  },
  {
    slug: 'septiembre',
    label: 'Septiembre 2026',
    desc: 'Black Friday ready + Q4 planning',
  },
];

export default async function CalendariosPage() {
  await requireAuth();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-center mb-8">
        <Link
          href="/admin/viralidad"
          className="inline-flex items-center gap-2 text-sm text-brand-gray hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          Volver a Viralidad
        </Link>
      </div>

      <div className="mb-8">
        <div className="text-brand-yellow text-xs font-semibold tracking-[0.2em] uppercase mb-3">
          · Calendarios
        </div>
        <h1 className="font-display text-4xl uppercase text-white mb-2">
          Calendarios Q3 2026
        </h1>
        <p className="text-brand-gray">Calendarios editoriales mes a mes.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {meses.map((m) => (
          <Link
            key={m.slug}
            href={`/admin/viralidad/calendarios/${m.slug}`}
            className="block p-6 rounded-2xl bg-white/[0.04] border border-brand-gold/15 hover:border-brand-yellow/50 hover:bg-white/[0.06] transition-all group"
          >
            <div className="font-display text-2xl uppercase text-brand-yellow group-hover:text-white transition-colors mb-1">
              {m.label}
            </div>
            <div className="text-sm text-brand-gray">{m.desc}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
