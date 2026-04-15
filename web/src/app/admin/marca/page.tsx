import Link from "next/link";
import { requireAuth } from "@/lib/auth";
import { chapters } from "./_data/chapters";

export default async function MarcaIndexPage() {
  await requireAuth();

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
      {/* Hero */}
      <div className="mb-12 pb-10 border-b border-brand-gold/15">
        <div className="text-[10px] font-semibold tracking-[0.2em] uppercase text-brand-yellow mb-3">
          · Manual de marca · Vol. 01 · 2026
        </div>
        <h1 className="font-display uppercase text-white text-5xl sm:text-6xl lg:text-7xl leading-[0.95] mb-5">
          IDENTIDAD,
          <br />
          SISTEMA
          <br />
          Y{" "}
          <span
            className="bg-clip-text text-transparent"
            style={{
              backgroundImage:
                "linear-gradient(90deg, #F9B334 0%, #D4A017 50%, #F9B334 100%)",
            }}
          >
            PARRILLA.
          </span>
        </h1>
        <p className="text-brand-gray text-lg max-w-2xl leading-relaxed">
          La guía visual y operativa que gobierna cómo UGC Colombia se presenta,
          se publica y se recuerda. Un solo sistema, todos los canales.
        </p>

        <div className="mt-8 inline-flex items-baseline gap-4 rounded-full border border-brand-gold/30 bg-brand-gold/5 px-5 py-2">
          <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-brand-gold">
            · Tagline oficial
          </span>
          <span className="font-display uppercase text-white text-lg">
            HACEMOS CRECER MARCAS.
          </span>
        </div>
      </div>

      {/* Índice */}
      <div className="mb-8">
        <div className="text-[10px] font-semibold tracking-[0.2em] uppercase text-brand-gold mb-2">
          · Índice del manual
        </div>
        <h2 className="font-display uppercase text-white text-3xl sm:text-4xl">
          Doce capítulos, un sistema.
        </h2>
        <p className="text-brand-gray mt-2 max-w-2xl">
          Todo lo que el equipo necesita para producir marca consistente en cualquier canal.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {chapters.map((c) => {
          const Icon = c.icon;
          return (
            <Link
              key={c.slug}
              href={`/admin/marca/${c.slug}`}
              className="group block p-6 rounded-2xl bg-white/[0.04] border border-brand-gold/15 hover:border-brand-yellow/50 hover:bg-white/[0.06] transition-all relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 font-display text-[5rem] leading-none text-brand-yellow/10 select-none pointer-events-none">
                {c.number}
              </div>

              <div className="relative">
                <Icon
                  className="w-7 h-7 text-brand-yellow mb-4 group-hover:scale-110 transition-transform"
                  aria-hidden
                />
                <div className="text-[10px] font-semibold tracking-[0.2em] uppercase text-brand-gold mb-1">
                  · {c.eyebrow}
                </div>
                <div className="font-display uppercase text-white text-2xl group-hover:text-brand-yellow transition-colors mb-2">
                  {c.title}
                </div>
                <p className="text-sm text-brand-gray leading-relaxed mb-4">{c.desc}</p>
                <div className="text-[10px] font-mono uppercase tracking-[0.15em] text-brand-gray/60 pt-3 border-t border-brand-gold/10">
                  P. {String(c.pdfPage).padStart(2, "0")}
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Footer */}
      <div className="mt-16 pt-8 border-t border-brand-gold/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="text-[10px] uppercase tracking-[0.2em] text-brand-gray">
          UGC Colombia · Brand System v.1 · 2026
        </div>
        <a
          href="/pdfs/MANUAL-DE-MARCA.pdf"
          target="_blank"
          rel="noreferrer"
          className="text-xs font-semibold tracking-[0.15em] uppercase text-brand-yellow hover:text-brand-yellow-hover transition-colors"
        >
          Descargar PDF original →
        </a>
      </div>
    </div>
  );
}
