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
import { PageHero, AdminCard, AdminGrid } from '@/components/admin/ui';

const sections = [
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
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
      <PageHero
        eyebrow="Contenido & Viralidad"
        title="El estudio"
        highlight="por dentro."
        lead="Guiones, producción, parrilla, modelo de viralidad, packs por persona, y archivo de lo publicado. Todo vive acá."
      />

      <AdminGrid cols={3}>
        {sections.map((s) => (
          <AdminCard
            key={s.slug}
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
