import Link from 'next/link';
import {
  Building2,
  Briefcase,
  Target,
  Users2,
  TrendingUp,
} from 'lucide-react';
import { requireAuth } from '@/lib/auth';

interface EmpresaSection {
  slug: string;
  title: string;
  desc: string;
  icon: React.ComponentType<{ className?: string }>;
}

const sections: EmpresaSection[] = [
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
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-10">
        <div className="text-brand-yellow text-xs font-semibold tracking-[0.2em] uppercase mb-3">
          · Estructura Empresarial
        </div>
        <h1 className="font-display text-5xl uppercase text-white">
          UGC Colombia{' '}
          <span className="bg-gradient-to-r from-[#f9b334] via-[#d4a017] to-[#f9b334] bg-clip-text text-transparent">
            por dentro.
          </span>
        </h1>
        <p className="text-brand-gray mt-3 max-w-2xl">
          La estructura completa del negocio — misión, modelo operativo,
          estrategia y equipo — en un solo lugar, siempre actualizada.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {sections.map((s) => {
          const Icon = s.icon;
          return (
            <Link
              key={s.slug}
              href={`/admin/empresa/${s.slug}`}
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
