import Link from 'next/link';
import { requireAuth } from '@/lib/auth';
import { PageHero, Eyebrow } from '@/components/admin/ui';

interface Pack {
  slug: string;
  name: string;
  role: string;
  desc: string;
  pieces: string;
}

const packs: Pack[] = [
  {
    slug: 'alexander',
    name: 'Alexander Cast',
    role: 'CEO · Founder',
    desc: '12 YouTube largos + 30 Reels + LinkedIn + threads',
    pieces: '60+ guiones',
  },
  {
    slug: 'brian',
    name: 'Brian Velásquez',
    role: 'COO · Mano Derecha',
    desc: 'Operaciones, sistemas, build-in-public',
    pieces: '50+ guiones',
  },
  {
    slug: 'diana',
    name: 'Diana Mile',
    role: 'Head of Creators',
    desc: 'Casting, briefs, QA, onboarding clientes',
    pieces: '45+ guiones',
  },
  {
    slug: 'samuel',
    name: 'Samuel',
    role: 'Tech Lead',
    desc: 'Kreoon, IA aplicada, automatización',
    pieces: '35+ guiones',
  },
  {
    slug: 'tanya',
    name: 'Tanya',
    role: 'Community & Content',
    desc: '50 Reels + 15 Shorts + 20 carruseles',
    pieces: '85+ guiones',
  },
  {
    slug: 'valentina',
    name: 'Valentina Giraldo',
    role: 'Editora de Planta',
    desc: 'Workflow de edición, QA, referentes y SLA',
    pieces: '6 documentos operativos',
  },
];

export default async function PacksIndexPage() {
  await requireAuth();

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
      <PageHero
        eyebrow="Packs virales"
        title="Contenido por"
        highlight="persona."
        lead="Los 6 packs operativos con guiones, hooks y scripts para cada miembro del equipo."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {packs.map((p) => (
          <Link
            key={p.slug}
            href={`/admin/packs/${p.slug}`}
            className="group block p-6 rounded-2xl bg-white/[0.04] border border-brand-gold/15 hover:border-brand-yellow/50 hover:bg-white/[0.06] transition-all"
          >
            <Eyebrow variant="gold" className="mb-3">
              {p.role}
            </Eyebrow>
            <div className="font-display text-2xl uppercase text-white group-hover:text-brand-yellow transition-colors mb-2 leading-tight">
              {p.name}
            </div>
            <p className="text-sm text-brand-gray leading-relaxed mb-4">{p.desc}</p>
            <div className="text-xs font-semibold uppercase tracking-[0.15em] text-brand-yellow pt-3 border-t border-brand-gold/10">
              {p.pieces} →
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
