import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface ChapterHeroProps {
  number: string;
  eyebrow: string;
  title: string;
  lead?: string;
  pdfPage?: number;
}

export function ChapterHero({ number, eyebrow, title, lead, pdfPage }: ChapterHeroProps) {
  return (
    <div className="mb-12 pb-8 border-b border-brand-gold/15">
      <Link
        href="/admin/marca"
        className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase text-brand-gray hover:text-brand-yellow transition-colors mb-6"
      >
        <ArrowLeft className="w-3 h-3" aria-hidden />
        Volver al Manual
      </Link>

      <div className="flex items-baseline gap-4 mb-4">
        <span className="font-display text-brand-yellow text-5xl">{number}</span>
        <span className="text-xs font-semibold tracking-[0.2em] uppercase text-brand-gold">
          · {eyebrow}
        </span>
      </div>

      <h1 className="font-display uppercase text-white text-5xl sm:text-6xl lg:text-7xl leading-[0.95]">
        {title}
      </h1>

      {lead && (
        <p className="text-brand-gray mt-5 max-w-2xl text-lg leading-relaxed">
          {lead}
        </p>
      )}

      {pdfPage && (
        <div className="mt-6 text-[10px] uppercase tracking-[0.2em] text-brand-gray">
          Fuente · Manual de Marca v1 · p. {String(pdfPage).padStart(2, "0")}
        </div>
      )}
    </div>
  );
}
