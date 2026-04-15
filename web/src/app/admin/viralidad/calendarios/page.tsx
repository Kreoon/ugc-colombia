import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { requireAuth } from '@/lib/auth';
import { PageHero, AdminCard, AdminGrid } from '@/components/admin/ui';

const meses = [
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
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
      <div className="mb-6">
        <Link
          href="/admin/viralidad"
          className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase text-brand-gray hover:text-brand-yellow transition-colors"
        >
          <ArrowLeft className="w-3 h-3" aria-hidden="true" />
          Volver a Viralidad
        </Link>
      </div>

      <PageHero
        eyebrow="Calendarios editoriales"
        title="Calendarios"
        highlight="Q3 2026."
        lead="Temas por semana, fechas clave y alineación con campañas del negocio, mes a mes."
      />

      <AdminGrid cols={3}>
        {meses.map((m) => (
          <AdminCard
            key={m.slug}
            href={`/admin/viralidad/calendarios/${m.slug}`}
            title={m.label}
            desc={m.desc}
          />
        ))}
      </AdminGrid>
    </div>
  );
}
