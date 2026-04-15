import { notFound } from "next/navigation";
import { requireAuth } from "@/lib/auth";
import { chapterBySlug, chapters, VALID_CHAPTER_SLUGS } from "../_data/chapters";
import { ChapterHero } from "@/components/admin/marca/ChapterHero";

import Identidad from "./_chapters/01-identidad";
import Color from "./_chapters/02-color";
import Tipografia from "./_chapters/03-tipografia";
import Logo from "./_chapters/04-logo";
import ComponentesUI from "./_chapters/05-componentes-ui";
import Sistema from "./_chapters/06-sistema";
import Voz from "./_chapters/07-voz";
import Efectos from "./_chapters/08-efectos";
import Pilares from "./_chapters/09-pilares";
import Parrilla from "./_chapters/10-parrilla";
import Plantillas from "./_chapters/11-plantillas";
import Checklist from "./_chapters/12-checklist";

const chapterMap: Record<string, React.ComponentType> = {
  "01-identidad": Identidad,
  "02-color": Color,
  "03-tipografia": Tipografia,
  "04-logo": Logo,
  "05-componentes-ui": ComponentesUI,
  "06-sistema": Sistema,
  "07-voz": Voz,
  "08-efectos": Efectos,
  "09-pilares": Pilares,
  "10-parrilla": Parrilla,
  "11-plantillas": Plantillas,
  "12-checklist": Checklist,
};

export default async function ChapterPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  await requireAuth();
  const { slug } = await params;

  if (!VALID_CHAPTER_SLUGS.has(slug)) notFound();

  const chapter = chapterBySlug(slug)!;
  const Chapter = chapterMap[slug];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
      <ChapterHero
        number={chapter.number}
        eyebrow={chapter.eyebrow}
        title={chapter.title.toUpperCase()}
        lead={chapter.desc}
        pdfPage={chapter.pdfPage}
      />
      <Chapter />
      <ChapterFooter currentSlug={slug} />
    </div>
  );
}

export function generateStaticParams() {
  return chapters.map((c) => ({ slug: c.slug }));
}

function ChapterFooter({ currentSlug }: { currentSlug: string }) {
  const idx = chapters.findIndex((c) => c.slug === currentSlug);
  const prev = idx > 0 ? chapters[idx - 1] : null;
  const next = idx < chapters.length - 1 ? chapters[idx + 1] : null;

  return (
    <nav className="mt-20 pt-8 border-t border-brand-gold/15 grid sm:grid-cols-2 gap-3">
      {prev ? (
        <a
          href={`/admin/marca/${prev.slug}`}
          className="rounded-2xl border border-brand-gold/15 p-5 hover:border-brand-yellow/50 hover:bg-white/5 transition-all group"
        >
          <div className="text-[10px] uppercase tracking-[0.2em] text-brand-gray mb-1">
            ← Anterior · {prev.number}
          </div>
          <div className="font-display uppercase text-white text-xl group-hover:text-brand-yellow transition-colors">
            {prev.title}
          </div>
        </a>
      ) : (
        <div />
      )}
      {next ? (
        <a
          href={`/admin/marca/${next.slug}`}
          className="rounded-2xl border border-brand-gold/15 p-5 hover:border-brand-yellow/50 hover:bg-white/5 transition-all group text-right"
        >
          <div className="text-[10px] uppercase tracking-[0.2em] text-brand-gray mb-1">
            Siguiente · {next.number} →
          </div>
          <div className="font-display uppercase text-white text-xl group-hover:text-brand-yellow transition-colors">
            {next.title}
          </div>
        </a>
      ) : (
        <a
          href="/admin/marca"
          className="rounded-2xl border border-brand-yellow/40 bg-brand-yellow/5 p-5 hover:bg-brand-yellow/10 transition-all group text-right"
        >
          <div className="text-[10px] uppercase tracking-[0.2em] text-brand-yellow mb-1">
            Volver al índice
          </div>
          <div className="font-display uppercase text-white text-xl">
            Manual completo
          </div>
        </a>
      )}
    </nav>
  );
}
