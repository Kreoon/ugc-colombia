import {
  Building2,
  Briefcase,
  Target,
  Users2,
  TrendingUp,
} from 'lucide-react';
import { requireAuth } from '@/lib/auth';
import { PageHero, AdminCard, AdminGrid } from '@/components/admin/ui';

const sections = [
  {
    slug: 'identidad',
    title: 'Identidad Corporativa',
    desc: 'Misión, visión, valores, PUV, tagline',
    icon: Building2,
  },
  {
    slug: 'modelo-negocio',
    title: 'Modelo de Negocio',
    desc: 'Servicios, pricing, ICP, diferenciadores',
    icon: Briefcase,
  },
  {
    slug: 'estrategia',
    title: 'Estrategia & OKRs',
    desc: 'Posicionamiento, OKRs 2026, roadmap, KPIs',
    icon: Target,
  },
  {
    slug: 'equipo',
    title: 'Equipo & Organigrama',
    desc: 'Roles, responsabilidades, proveedores',
    icon: Users2,
  },
  {
    slug: 'mercado',
    title: 'Mercado & Competencia',
    desc: 'Tamaño, tendencias, benchmarks, posicionamiento',
    icon: TrendingUp,
  },
];

export default async function EmpresaIndexPage() {
  await requireAuth();

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
      <PageHero
        eyebrow="Estructura empresarial"
        title="UGC Colombia"
        highlight="por dentro."
        lead="La estructura completa del negocio — misión, modelo operativo, estrategia y equipo — en un solo lugar, siempre actualizada."
      />

      <AdminGrid cols={3}>
        {sections.map((s) => (
          <AdminCard
            key={s.slug}
            href={`/admin/empresa/${s.slug}`}
            icon={s.icon}
            title={s.title}
            desc={s.desc}
          />
        ))}
      </AdminGrid>
    </div>
  );
}
