import Link from 'next/link';
import {
  Film,
  Calendar,
  Sparkles,
  Archive,
  Scissors,
  TrendingUp,
  BookOpen,
} from 'lucide-react';
import { requireAuth } from '@/lib/auth';

interface ContenidoSection {
  slug: string;
  href: string;
  title: string;
  desc: string;
  icon: React.ComponentType<{ className?: string }>;
}

const sections: ContenidoSection[] = [
  {
    slug: 'guiones',
    href: '/admin/contenido/guiones',
    title: 'Guiones',
    desc: 'Una tarjeta por guion · 9 tabs · estados grabado/editado/publicado',
    icon: Film,
  },
  {
    slug: 'parrilla',
    href: '/admin/viralidad/parrilla',
    title: 'Parrilla',
    desc: 'IG + TikTok + LinkedIn con frecuencia diaria',
    icon: Calendar,
  },
  {
    slug: 'modelo',
    href: '/admin/viralidad/modelo',
    title: 'Modelo de Viralidad',
    desc: 'Framework AURA · hooks que convierten',
    icon: TrendingUp,
  },
  {
    slug: 'hooks',
    href: '/admin/contenido/hooks',
    title: 'Banco de Hooks',
    desc: '50+ hooks testeados por vertical',
    icon: Sparkles,
  },
  {
    slug: 'calendarios',
    href: '/admin/viralidad/calendarios',
    title: 'Calendarios Q3',
    desc: 'Julio · Agosto · Septiembre',
    icon: Calendar,
  },
  {
    slug: 'benchmark',
    href: '/admin/viralidad/benchmark',
    title: 'Benchmark',
    desc: '25 referentes virales + top 10 deep dive',
    icon: BookOpen,
  },
  {
    slug: 'calendario-editorial',
    href: '/admin/contenido/calendario',
    title: 'Calendario Editorial',
    desc: 'Frecuencia y mix TOFU/MOFU/BOFU',
    icon: Calendar,
  },
  {
    slug: 'publicados',
    href: '/admin/contenido/publicados',
    title: 'Archivo de Publicaciones',
    desc: 'Historial + métricas + filtros',
    icon: Archive,
  },
  {
    slug: 'valentina',
    href: '/admin/contenido/valentina',
    title: 'Cola Valentina',
    desc: 'Edición en progreso · entregas · archivo personal',
    icon: Scissors,
  },
];

export default async function ContenidoIndexPage() {
  await requireAuth();

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-10">
        <div className="text-brand-yellow text-xs font-semibold tracking-[0.2em] uppercase mb-3">
          · Contenido & Viralidad
        </div>
        <h1 className="font-display text-5xl uppercase text-white">
          El estudio{' '}
          <span className="bg-gradient-to-r from-[#f9b334] via-[#d4a017] to-[#f9b334] bg-clip-text text-transparent">
            por dentro.
          </span>
        </h1>
        <p className="text-brand-gray mt-3 max-w-2xl">
          Guiones, producción, parrilla, modelo de viralidad, packs por persona,
          y archivo de lo publicado. Todo vive acá.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {sections.map((s) => {
          const Icon = s.icon;
          return (
            <Link
              key={s.slug}
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
