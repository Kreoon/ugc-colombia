import Link from 'next/link';
import { requireAuth } from '@/lib/auth';

interface Pack {
  slug: string;
  name: string;
  role: string;
  desc: string;
  pieces: string;
  color: string;
}

const packs: Pack[] = [
  {
    slug: 'alexander',
    name: 'Alexander Cast',
    role: 'CEO · Founder',
    desc: '12 YouTube largos + 30 Reels + LinkedIn + threads',
    pieces: '60+ guiones',
    color: 'from-[#f9b334] to-[#d4a017]',
  },
  {
    slug: 'brian',
    name: 'Brian Velásquez',
    role: 'COO · Mano Derecha',
    desc: 'Operaciones, sistemas, build-in-public',
    pieces: '50+ guiones',
    color: 'from-[#d4a017] to-[#c9940a]',
  },
  {
    slug: 'diana',
    name: 'Diana Mile',
    role: 'Head of Creators',
    desc: 'Casting, briefs, QA, onboarding clientes',
    pieces: '45+ guiones',
    color: 'from-[#f9b334] via-[#d4a017] to-[#f9b334]',
  },
  {
    slug: 'samuel',
    name: 'Samuel',
    role: 'Tech Lead',
    desc: 'Kreoon, IA aplicada, automatización',
    pieces: '35+ guiones',
    color: 'from-[#c9940a] to-[#f9b334]',
  },
  {
    slug: 'tanya',
    name: 'Tanya',
    role: 'Community & Content',
    desc: '50 Reels + 15 Shorts + 20 carruseles',
    pieces: '85+ guiones',
    color: 'from-[#f9b334] to-[#d4a017]',
  },
];

export default async function PacksIndexPage() {
  await requireAuth();

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-10">
        <div className="text-brand-yellow text-xs font-semibold tracking-[0.2em] uppercase mb-3">
          · Packs Virales
        </div>
        <h1 className="font-display text-5xl uppercase text-white">
          Contenido por{' '}
          <span className="bg-gradient-to-r from-[#f9b334] via-[#d4a017] to-[#f9b334] bg-clip-text text-transparent">
            persona.
          </span>
        </h1>
        <p className="text-brand-gray mt-3 max-w-2xl">
          Los 5 packs operativos con guiones, hooks y scripts para cada miembro del equipo.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {packs.map((p) => (
          <Link
            key={p.slug}
            href={`/admin/packs/${p.slug}`}
            className="group block p-6 rounded-2xl bg-white/[0.04] border border-brand-gold/15 hover:border-brand-yellow/50 hover:bg-white/[0.06] transition-all"
          >
            <div
              className={`inline-block text-xs font-semibold tracking-[0.2em] uppercase bg-gradient-to-r ${p.color} bg-clip-text text-transparent mb-3`}
            >
              {p.role}
            </div>
            <div className="font-display text-2xl uppercase text-white group-hover:text-brand-yellow transition-colors mb-2">
              {p.name}
            </div>
            <div className="text-sm text-brand-gray mb-4">{p.desc}</div>
            <div className="text-xs text-brand-yellow font-semibold">
              {p.pieces} &rarr;
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
