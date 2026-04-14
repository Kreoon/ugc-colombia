import Link from 'next/link';
import { TrendingUp, Target, Calendar, BookOpen, Users } from 'lucide-react';
import { requireAuth } from '@/lib/auth';

interface ViralidadSection {
  href: string;
  title: string;
  desc: string;
  icon: React.ComponentType<{ className?: string }>;
}

const sections: ViralidadSection[] = [
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
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-10">
        <div className="text-brand-yellow text-xs font-semibold tracking-[0.2em] uppercase mb-3">
          · Viralidad
        </div>
        <h1 className="font-display text-5xl uppercase text-white">
          Contenido{' '}
          <span className="bg-gradient-to-r from-[#f9b334] via-[#d4a017] to-[#f9b334] bg-clip-text text-transparent">
            masivo.
          </span>
        </h1>
        <p className="text-brand-gray mt-3 max-w-2xl">
          El sistema operativo de contenido viral. Todo lo que el equipo
          necesita para producir y publicar.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {sections.map((s) => {
          const Icon = s.icon;
          return (
            <Link
              key={s.href}
              href={s.href}
              className="block p-6 rounded-2xl bg-white/[0.04] border border-brand-gold/15 hover:border-brand-yellow/50 hover:bg-white/[0.06] transition-all group"
            >
              <Icon className="w-8 h-8 text-brand-yellow mb-4" aria-hidden="true" />
              <div className="font-display text-xl uppercase text-white group-hover:text-brand-yellow transition-colors mb-1">
                {s.title}
              </div>
              <div className="text-sm text-brand-gray">{s.desc}</div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
