import type { identity } from "@/app/admin/marca/_data/identity";

type Identity = typeof identity;

interface PropuestaBlockProps {
  propuestaDeValor: string;
  propuestaDeValorDesc: string;
  propuesta: string;
  tagline: string;
}

export function PropuestaBlock({
  propuestaDeValor,
  propuestaDeValorDesc,
  propuesta,
  tagline,
}: PropuestaBlockProps) {
  return (
    <div className="space-y-4">
      {/* Propuesta de valor — el propósito central */}
      <div className="rounded-2xl border-2 border-brand-yellow/60 bg-gradient-to-br from-brand-yellow/10 to-brand-gold/5 p-8">
        <div className="text-[10px] font-semibold tracking-[0.2em] uppercase text-brand-yellow mb-4">
          · Propuesta de valor · Propósito oficial
        </div>
        <div className="font-display uppercase text-3xl sm:text-4xl lg:text-5xl leading-[1.05] mb-4">
          <span
            className="bg-clip-text text-transparent"
            style={{
              backgroundImage:
                "linear-gradient(90deg, #F9B334 0%, #D4A017 50%, #F9B334 100%)",
            }}
          >
            {propuestaDeValor}
          </span>
        </div>
        <p className="text-sm text-brand-gray leading-relaxed">
          {propuestaDeValorDesc}
        </p>
      </div>

      {/* Descriptor + tagline complementarios */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="rounded-2xl border border-brand-gold/15 p-6 bg-white/[0.02]">
          <div className="text-[10px] font-semibold tracking-[0.2em] uppercase text-brand-gold mb-3">
            · Descriptor boutique
          </div>
          <p className="text-white leading-relaxed">{propuesta}</p>
        </div>

        <div className="rounded-2xl border border-brand-gold/15 p-6 bg-white/[0.02]">
          <div className="text-[10px] font-semibold tracking-[0.2em] uppercase text-brand-gold mb-3">
            · Tagline oficial
          </div>
          <div className="font-display uppercase text-3xl sm:text-4xl leading-tight">
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(90deg, #F9B334 0%, #D4A017 50%, #F9B334 100%)",
              }}
            >
              {tagline}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ArquetipoPromesa({
  arquetipo,
  promesa,
}: {
  arquetipo: Identity["arquetipo"];
  promesa: string;
}) {
  return (
    <div className="grid sm:grid-cols-2 gap-4">
      <div className="rounded-2xl border border-brand-gold/15 p-6 bg-white/[0.02]">
        <div className="text-[10px] font-semibold tracking-[0.2em] uppercase text-brand-gold mb-2">
          · Arquetipo
        </div>
        <div className="font-display uppercase text-white text-2xl mb-3">
          {arquetipo.name}
        </div>
        <p className="text-sm text-brand-gray leading-relaxed">{arquetipo.desc}</p>
      </div>
      <div className="rounded-2xl border border-brand-gold/15 p-6 bg-white/[0.02]">
        <div className="text-[10px] font-semibold tracking-[0.2em] uppercase text-brand-gold mb-2">
          · Promesa
        </div>
        <p className="text-white leading-relaxed">{promesa}</p>
      </div>
    </div>
  );
}

export function ValoresGrid({ valores }: { valores: Identity["valores"] }) {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-3">
      {valores.map((v) => (
        <div
          key={v.name}
          className="rounded-2xl border border-brand-gold/15 p-5 bg-white/[0.02]"
        >
          <div className="font-display uppercase text-brand-yellow text-lg mb-2">
            {v.name}
          </div>
          <p className="text-xs text-brand-gray leading-relaxed">{v.desc}</p>
        </div>
      ))}
    </div>
  );
}

export function StatsRow({ stats }: { stats: Identity["stats"] }) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      {stats.map((s) => (
        <div
          key={s.label}
          className="rounded-2xl border border-brand-gold/15 p-6 bg-white/[0.02] text-center"
        >
          <div className="font-display text-4xl sm:text-5xl mb-1">
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(90deg, #F9B334 0%, #D4A017 50%, #F9B334 100%)",
              }}
            >
              {s.value}
            </span>
            {"sub" in s && s.sub ? (
              <span className="text-sm text-brand-gray font-sans ml-1">{s.sub}</span>
            ) : null}
          </div>
          <div className="text-[10px] uppercase tracking-[0.2em] text-brand-gray mt-2">
            {s.label}
          </div>
        </div>
      ))}
    </div>
  );
}
