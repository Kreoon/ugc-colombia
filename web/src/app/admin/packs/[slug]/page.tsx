import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { requireAuth } from '@/lib/auth';
import { getContentWithOverrides } from '@/lib/content';
import { PackTabs } from './PackTabs';

interface PackDef {
  name: string;
  role: string;
  tabs: { label: string; filePath: string }[];
}

const PACK_MAP: Record<string, PackDef> = {
  alexander: {
    name: 'Alexander Cast',
    role: 'CEO · Founder',
    tabs: [
      {
        label: 'Posicionamiento + YouTube EP01-06',
        filePath: 'content/viralidad/packs/PACK-VIRAL-ALEXANDER-P1.md',
      },
      {
        label: 'YouTube EP07-12',
        filePath: 'content/viralidad/packs/PACK-VIRAL-ALEXANDER-P2.md',
      },
      {
        label: 'TikTok / Reels',
        filePath: 'content/viralidad/packs/PACK-VIRAL-ALEXANDER-P3.md',
      },
      {
        label: 'LinkedIn + X + Stories',
        filePath: 'content/viralidad/packs/PACK-VIRAL-ALEXANDER-P4.md',
      },
      {
        label: 'Reglas de ejecución',
        filePath: 'content/viralidad/packs/PACK-VIRAL-ALEXANDER-P5.md',
      },
    ],
  },
  brian: {
    name: 'Brian Velásquez',
    role: 'COO · Mano Derecha',
    tabs: [
      {
        label: 'Posicionamiento + Guiones 1-15',
        filePath: 'content/viralidad/packs/PACK-VIRAL-BRIAN-COO-P1A.md',
      },
      {
        label: 'Guiones 16-25 + Carruseles',
        filePath: 'content/viralidad/packs/PACK-VIRAL-BRIAN-COO-P1B.md',
      },
      {
        label: 'LinkedIn + YouTube + Reglas',
        filePath: 'content/viralidad/packs/PACK-VIRAL-BRIAN-COO-P2.md',
      },
    ],
  },
  diana: {
    name: 'Diana Mile',
    role: 'Head of Creators',
    tabs: [
      {
        label: 'Posicionamiento + Guiones 1-13',
        filePath: 'content/viralidad/packs/PACK-VIRAL-DIANA-P1.md',
      },
      {
        label: 'Guiones 14-25',
        filePath: 'content/viralidad/packs/PACK-VIRAL-DIANA-P1-G14-25.md',
      },
      {
        label: 'Carruseles LinkedIn',
        filePath: 'content/viralidad/packs/PACK-VIRAL-DIANA-P1-CARRUSELES.md',
      },
      {
        label: 'LinkedIn + YouTube + Reglas',
        filePath: 'content/viralidad/packs/PACK-VIRAL-DIANA-P2.md',
      },
    ],
  },
  samuel: {
    name: 'Samuel',
    role: 'Tech Lead',
    tabs: [
      {
        label: 'Índice',
        filePath: 'content/viralidad/packs/PACK-VIRAL-SAMUEL.md',
      },
      {
        label: 'Posicionamiento + Guiones 01-10',
        filePath: 'content/viralidad/packs/PACK-VIRAL-SAMUEL-parte1.md',
      },
      {
        label: 'Guiones 11-20 + Carruseles',
        filePath: 'content/viralidad/packs/PACK-VIRAL-SAMUEL-parte2.md',
      },
      {
        label: 'LinkedIn + YouTube + Threads',
        filePath: 'content/viralidad/packs/PACK-VIRAL-SAMUEL-parte3.md',
      },
      {
        label: 'Demos + Reglas',
        filePath: 'content/viralidad/packs/PACK-VIRAL-SAMUEL-parte4.md',
      },
    ],
  },
  tanya: {
    name: 'Tanya',
    role: 'Community & Content',
    tabs: [
      {
        label: 'Posicionamiento + Guiones 1-30',
        filePath: 'content/viralidad/packs/PACK-VIRAL-TANYA.md',
      },
      {
        label: 'Guiones 31-50 + YouTube + Carruseles',
        filePath: 'content/viralidad/packs/PACK-VIRAL-TANYA-P2.md',
      },
    ],
  },
  valentina: {
    name: 'Valentina Giraldo',
    role: 'Editora de Planta',
    tabs: [
      {
        label: 'Rol y responsabilidades',
        filePath: 'content/packs/valentina/00-rol-y-responsabilidades.md',
      },
      {
        label: 'Workflow de edición',
        filePath: 'content/packs/valentina/01-workflow-edicion.md',
      },
      {
        label: 'Checklist de calidad',
        filePath: 'content/packs/valentina/02-checklist-calidad.md',
      },
      {
        label: 'Tools y templates',
        filePath: 'content/packs/valentina/03-tools-y-templates.md',
      },
      {
        label: 'Referentes editoriales',
        filePath: 'content/packs/valentina/04-referentes-editoriales.md',
      },
      {
        label: 'SLA y tiempos',
        filePath: 'content/packs/valentina/05-sla-y-tiempos.md',
      },
    ],
  },
};

export function generateStaticParams() {
  return Object.keys(PACK_MAP).map((slug) => ({ slug }));
}

export default async function PackPersonPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  await requireAuth();
  const { slug } = await params;
  const pack = PACK_MAP[slug];

  if (!pack) notFound();

  const tabsData = await Promise.all(
    pack.tabs.map(async (tab) => {
      const content = await getContentWithOverrides(tab.filePath);
      return {
        label: tab.label,
        filePath: tab.filePath,
        content: content?.current ?? '# Contenido no encontrado',
        isOverridden: content?.isOverridden ?? false,
        overrideUpdatedAt: content?.overrideUpdatedAt,
      };
    })
  );

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
      <div className="mb-6">
        <Link
          href="/admin/packs"
          className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase text-brand-gray hover:text-brand-yellow transition-colors"
        >
          <ArrowLeft className="w-3 h-3" aria-hidden="true" />
          Volver a Packs
        </Link>
      </div>
      <div className="mb-10 pb-8 border-b border-brand-gold/15">
        <div className="text-[10px] font-semibold tracking-[0.2em] uppercase text-brand-yellow mb-3">
          · {pack.role}
        </div>
        <h1 className="font-display uppercase text-white text-5xl sm:text-6xl lg:text-7xl leading-[0.95]">
          {pack.name.split(" ")[0]}{" "}
          <span
            className="bg-clip-text text-transparent"
            style={{
              backgroundImage:
                "linear-gradient(90deg, #F9B334 0%, #D4A017 50%, #F9B334 100%)",
            }}
          >
            {pack.name.split(" ").slice(1).join(" ")}.
          </span>
        </h1>
      </div>

      <PackTabs tabs={tabsData} />
    </div>
  );
}
