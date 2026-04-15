import { SectionHero } from "../_components/SectionHero";
import { SwatchCard } from "../_components/SwatchCard";
import {
  brandColors,
  graysScale,
  typeScale,
  fontWeights,
  radii,
  shadows,
  spacing,
} from "../_data/tokens";
import { paletaOficial } from "../_data/guidelines";

export default function TokensPage() {
  return (
    <>
      <SectionHero
        eyebrow="02 — Design Tokens"
        title="Colores y tipografía"
        subtitle="Fuente única de verdad. Exportada desde web/src/app/manual/_data/tokens.ts, consumida por tailwind.config.ts."
      />

      <Block title="Paleta oficial">
        <p className="font-sans text-sm text-brand-gray-light mb-6 max-w-3xl">
          Cuatro colores base + dos tonos de soporte. El amarillo{" "}
          <span className="text-brand-yellow font-mono">#F9B334</span> es el único acento
          de marca — no inventes variantes.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {paletaOficial.map((p) => (
            <SwatchCard key={p.hex} hex={p.hex} name={p.nombre} uso={p.uso} />
          ))}
        </div>
      </Block>

      <Block title="Escala de grises (UI)">
        <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-11 gap-0">
          {Object.entries(graysScale).map(([k, hex]) => (
            <div
              key={k}
              className="aspect-square flex flex-col items-center justify-end p-2 text-center border border-brand-black"
              style={{ backgroundColor: hex }}
            >
              <span
                className={`text-[9px] font-mono ${
                  parseInt(k) <= 400 ? "text-white" : "text-black"
                }`}
              >
                {k}
              </span>
              <span
                className={`text-[8px] font-mono ${
                  parseInt(k) <= 400 ? "text-white" : "text-black"
                }`}
              >
                {hex}
              </span>
            </div>
          ))}
        </div>
      </Block>

      <Block title="Tipografía">
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="p-6 rounded border border-brand-gray-dark/60 bg-brand-black/60">
            <p className="font-sans text-[10px] uppercase tracking-widest text-brand-yellow mb-3">
              Display · Anton
            </p>
            <p className="font-display uppercase text-6xl text-white leading-none mb-3">
              Contenido real
            </p>
            <p className="font-sans text-xs text-brand-gray-light">
              Uso: H1, H2, statements, números impactantes. Condensed bold.
            </p>
            <p className="font-mono text-[10px] text-brand-gray-light mt-3">
              font-display · var(--font-anton)
            </p>
          </div>
          <div className="p-6 rounded border border-brand-gray-dark/60 bg-brand-black/60">
            <p className="font-sans text-[10px] uppercase tracking-widest text-brand-yellow mb-3">
              Sans · Inter
            </p>
            <p className="font-sans font-semibold text-2xl text-white mb-1">
              The quick brown fox jumps
            </p>
            <p className="font-sans text-base text-white/80 mb-1">
              over the lazy dog 0123456789
            </p>
            <p className="font-sans text-xs text-brand-gray-light mt-3">
              Uso: H3–H6, párrafos, UI, labels, botones.
            </p>
            <p className="font-mono text-[10px] text-brand-gray-light mt-2">
              font-sans · var(--font-inter)
            </p>
          </div>
        </div>

        <h3 className="font-display uppercase text-xl text-white mb-4">Escala tipográfica</h3>
        <div className="space-y-3">
          {Object.entries(typeScale)
            .reverse()
            .map(([key, spec]) => (
              <div
                key={key}
                className="flex items-baseline gap-6 pb-3 border-b border-brand-gray-dark/30"
              >
                <span className="font-mono text-xs text-brand-gray-light w-20 shrink-0">
                  text-{key}
                </span>
                <span className="font-mono text-xs text-brand-yellow w-24 shrink-0">
                  {spec.px}
                </span>
                <span
                  className="font-display uppercase text-white truncate"
                  style={{ fontSize: spec.rem, lineHeight: spec.leading }}
                >
                  Aa
                </span>
              </div>
            ))}
        </div>
      </Block>

      <Block title="Pesos tipográficos">
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
          {Object.entries(fontWeights).map(([name, val]) => (
            <div
              key={name}
              className="p-4 rounded border border-brand-gray-dark/60 text-center"
            >
              <p
                className="font-sans text-3xl text-white mb-2"
                style={{ fontWeight: val }}
              >
                Aa
              </p>
              <p className="font-sans text-xs uppercase tracking-widest text-brand-yellow">
                {name}
              </p>
              <p className="font-mono text-[10px] text-brand-gray-light mt-1">{val}</p>
            </div>
          ))}
        </div>
      </Block>

      <Block title="Spacing">
        <div className="space-y-2">
          {Object.entries(spacing).slice(1).map(([key, val]) => (
            <div key={key} className="flex items-center gap-4">
              <span className="font-mono text-xs text-brand-gray-light w-16">
                space-{key}
              </span>
              <span className="font-mono text-xs text-brand-yellow w-16">{val}</span>
              <div
                className="h-3 bg-brand-yellow rounded-sm"
                style={{ width: val }}
              />
            </div>
          ))}
        </div>
      </Block>

      <Block title="Border Radius">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Object.entries(radii).map(([key, val]) => (
            <div
              key={key}
              className="p-5 border border-brand-gray-dark/60 flex flex-col items-center gap-2"
              style={{ borderRadius: val }}
            >
              <div
                className="w-16 h-16 bg-brand-yellow"
                style={{ borderRadius: val }}
              />
              <span className="font-mono text-xs text-white">rounded-{key}</span>
              <span className="font-mono text-[10px] text-brand-gray-light">{val}</span>
            </div>
          ))}
        </div>
      </Block>

      <Block title="Sombras">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 bg-brand-cream/5 p-8 rounded-md">
          {Object.entries(shadows).filter(([k]) => k !== "none" && k !== "inset").map(([key, val]) => (
            <div
              key={key}
              className="aspect-square bg-brand-black rounded flex items-center justify-center"
              style={{ boxShadow: val }}
            >
              <span className="font-mono text-xs text-white">{key}</span>
            </div>
          ))}
        </div>
      </Block>
    </>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-14">
      <h2 className="font-display uppercase text-3xl text-white mb-6 pb-3 border-b border-brand-gray-dark/60">
        {title}
      </h2>
      {children}
    </section>
  );
}
