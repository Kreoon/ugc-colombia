import type { ButtonVariant, BadgeVariant } from "@/app/admin/marca/_data/components";

export function ButtonShowcase({ buttons }: { buttons: ButtonVariant[] }) {
  return (
    <div className="rounded-2xl border border-brand-gold/15 p-6 bg-white/[0.02]">
      <div className="text-[10px] font-semibold tracking-[0.2em] uppercase text-brand-gold mb-4">
        · Button · 3 variantes
      </div>
      <div className="grid sm:grid-cols-3 gap-6">
        {buttons.map((b) => (
          <div key={b.id} className="flex flex-col items-start gap-3">
            <button
              className={`px-6 py-3 rounded-xl font-bold uppercase text-sm tracking-wider transition-all ${b.classes}`}
            >
              {b.label}
            </button>
            <div className="text-xs text-brand-gray leading-relaxed">
              {b.description}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function BadgeShowcase({ badges }: { badges: BadgeVariant[] }) {
  return (
    <div className="rounded-2xl border border-brand-gold/15 p-6 bg-white/[0.02]">
      <div className="text-[10px] font-semibold tracking-[0.2em] uppercase text-brand-gold mb-4">
        · Badge · 4 variantes
      </div>
      <div className="flex flex-wrap gap-3">
        {badges.map((b) => (
          <span
            key={b.id}
            className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider ${b.classes}`}
          >
            {b.label}
          </span>
        ))}
      </div>
    </div>
  );
}

export function CardShowcase() {
  return (
    <div className="grid md:grid-cols-2 gap-4">
      <div className="p-6 rounded-2xl bg-white/[0.04] border border-brand-gold/15">
        <div className="text-[10px] font-semibold tracking-[0.2em] uppercase text-brand-gold mb-2">
          · CASO
        </div>
        <div className="font-display uppercase text-white text-2xl mb-2">
          De $3K a $14K/mes
        </div>
        <p className="text-sm text-brand-gray mb-4">
          Marca skincare colombiana, 90 días de contenido UGC sistematizado con nuestro framework.
        </p>
        <button className="text-sm font-semibold text-brand-yellow hover:text-brand-yellow-hover transition-colors">
          VER CASO →
        </button>
      </div>

      <div className="p-6 rounded-2xl bg-white/[0.04] border border-brand-gold/15 flex flex-col items-center justify-center text-center">
        <div className="font-display text-6xl sm:text-7xl text-transparent bg-clip-text"
          style={{
            backgroundImage:
              "linear-gradient(90deg, #F9B334 0%, #D4A017 50%, #F9B334 100%)",
          }}
        >
          4.2×
        </div>
        <div className="text-[10px] font-semibold tracking-[0.2em] uppercase text-brand-gray mt-2">
          ROAS en 60 días
        </div>
      </div>
    </div>
  );
}
