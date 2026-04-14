import Link from 'next/link';
import {
  Palette,
  Type,
  ImageIcon,
  Layout,
  Megaphone,
  Presentation,
  Sparkles,
} from 'lucide-react';
import { requireAuth } from '@/lib/auth';

interface MarcaSection {
  slug: string;
  title: string;
  desc: string;
  icon: React.ComponentType<{ className?: string }>;
}

const sections: MarcaSection[] = [
  {
    slug: 'brand-guidelines',
    title: 'Guidelines',
    desc: 'Identidad, tono, usos de marca',
    icon: Palette,
  },
  {
    slug: 'design-tokens',
    title: 'Design Tokens',
    desc: 'Colores, tipografía, spacing',
    icon: Type,
  },
  {
    slug: 'logo-specs',
    title: 'Logo',
    desc: 'Versiones, clearspace, aplicaciones',
    icon: ImageIcon,
  },
  {
    slug: 'social-templates-spec',
    title: 'Plantillas Sociales',
    desc: 'IG, TikTok, LinkedIn, YouTube',
    icon: Layout,
  },
  {
    slug: 'ad-assets-spec',
    title: 'Assets de Ads',
    desc: 'Specs Meta, Google, TikTok Ads',
    icon: Megaphone,
  },
  {
    slug: 'presentation-kit-spec',
    title: 'Kit Presentaciones',
    desc: 'Plantillas decks y propuestas',
    icon: Presentation,
  },
  {
    slug: 'image-prompts',
    title: 'Prompts de Imagen',
    desc: 'Prompts para IA generativa',
    icon: Sparkles,
  },
];

export default async function MarcaIndexPage() {
  await requireAuth();

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-10">
        <div className="text-brand-yellow text-xs font-semibold tracking-[0.2em] uppercase mb-3">
          · Manual de Marca
        </div>
        <h1 className="font-display text-5xl uppercase text-white">
          Sistema{' '}
          <span className="bg-gradient-to-r from-[#f9b334] via-[#d4a017] to-[#f9b334] bg-clip-text text-transparent">
            visual.
          </span>
        </h1>
        <p className="text-brand-gray mt-3 max-w-2xl">
          Todas las reglas y specs para que cualquier miembro del equipo pueda
          producir marca consistente en cualquier canal.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {sections.map((s) => {
          const Icon = s.icon;
          return (
            <Link
              key={s.slug}
              href={`/admin/marca/${s.slug}`}
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
