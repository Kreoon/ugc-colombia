import { TrendingUp, Target, Calendar, BookOpen, Users } from 'lucide-react';
import { requireAuth } from '@/lib/auth';
import { PageHero, AdminCard, AdminGrid } from '@/components/admin/ui';

const sections = [
  {
    href: '/admin/viralidad/modelo',
    title: 'Modelo de Viralidad',
    desc: '5 pilares, anatomía de video viral, hooks',
    icon: TrendingUp,
  },
  {
    href: '/admin/viralidad/parrilla',
    title: 'Parrilla IG + TikTok',
    desc: 'Parrilla masiva con roles por miembro',
    icon: Target,
  },
  {
    href: '/admin/viralidad/calendarios',
    title: 'Calendarios Q3',
    desc: 'Julio · Agosto · Septiembre 2026',
    icon: Calendar,
  },
  {
    href: '/admin/viralidad/benchmark',
    title: 'Benchmark',
    desc: '25 referentes virales analizados',
    icon: BookOpen,
  },
  {
    href: '/admin/packs',
    title: 'Packs por persona',
    desc: 'Guiones para Alexander, Brian, Diana, Samuel, Tanya',
    icon: Users,
  },
];

export default async function ViralidadIndexPage() {
  await requireAuth();

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
      <PageHero
        eyebrow="Viralidad"
        title="Contenido"
        highlight="masivo."
        lead="El sistema operativo de contenido viral. Todo lo que el equipo necesita para producir y publicar."
      />

      <AdminGrid cols={2}>
        {sections.map((s) => (
          <AdminCard
            key={s.href}
            href={s.href}
            icon={s.icon}
            title={s.title}
            desc={s.desc}
          />
        ))}
      </AdminGrid>
    </div>
  );
}
