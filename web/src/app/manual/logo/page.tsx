import { SectionHero } from "../_components/SectionHero";
import { LogoViewer } from "../_components/LogoViewer";
import { DoDontCard } from "../_components/DoDontCard";
import {
  logoVariants,
  clearspaceRule,
  minSizeRules,
  doRules,
  dontRules,
} from "../_data/logos";

export default function LogoPage() {
  const available = logoVariants.filter((l) => l.status === "official");
  const pending = logoVariants.filter((l) => l.status === "pending");

  return (
    <>
      <SectionHero
        eyebrow="03 — Logo"
        title="Sistema de logo"
        subtitle="Anatomía, variantes, clearspace, tamaños mínimos. El logo es intocable — no lo re-dibujes, úsalo."
      />

      <Block title="Anatomía del logo">
        <div className="p-8 rounded bg-brand-cream text-brand-black grid md:grid-cols-[1fr_360px] gap-8 items-center">
          <div>
            <p className="font-sans text-[10px] uppercase tracking-widest text-brand-gray-dark mb-3">
              Logo oficial
            </p>
            <ul className="space-y-2 text-sm">
              <li>· 3 glyphs "UGC" en sans-serif condensed alto</li>
              <li>· Palabra "AGENCIA" vertical dentro de la U izquierda</li>
              <li>· Cada glyph contiene un "test tube" amarillo como indicador</li>
              <li>· Wordmark "COLOMBIA" en gris oscuro al lado derecho</li>
              <li>· Barra horizontal amarilla debajo de COLOMBIA</li>
              <li>· 3 marcas diagonales amarillas al final de la barra</li>
            </ul>
          </div>
          <div>
            <LogoViewer logos={available} />
          </div>
        </div>
      </Block>

      <Block title="Variantes oficiales disponibles">
        <div className="grid md:grid-cols-3 gap-4">
          {available.map((logo) => (
            <div
              key={logo.id}
              className="rounded border border-brand-gray-dark/60 p-5"
            >
              <div
                className={`aspect-[4/3] flex items-center justify-center mb-3 rounded ${
                  logo.background === "dark"
                    ? "bg-brand-black"
                    : "bg-brand-cream"
                }`}
              >
                <img
                  src={logo.file}
                  alt={logo.name}
                  className="max-w-[75%] max-h-[70%] object-contain"
                />
              </div>
              <p className="font-display uppercase text-base text-white mb-1">
                {logo.name}
              </p>
              <p className="font-sans text-xs text-brand-gray-light">{logo.usage}</p>
              <p className="font-mono text-[10px] text-brand-yellow mt-2">
                min {logo.minWidthPx}px · clearspace {logo.clearspacePx}px
              </p>
            </div>
          ))}
        </div>
      </Block>

      <Block title="Variantes en generación (Fase 3)">
        <p className="font-sans text-sm text-brand-gray-light mb-4 max-w-3xl">
          Las siguientes variantes se están generando con Nanobanana a partir de la
          anatomía oficial. Estarán disponibles como PNG y SVG.
        </p>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
          {pending.map((logo) => (
            <div
              key={logo.id}
              className="p-4 rounded border border-brand-yellow/30 bg-brand-yellow/5"
            >
              <p className="font-display uppercase text-sm text-brand-yellow">
                {logo.name}
              </p>
              <p className="font-sans text-xs text-white/80 mt-1">{logo.usage}</p>
            </div>
          ))}
        </div>
      </Block>

      <Block title="Clearspace">
        <div className="p-8 rounded bg-brand-cream">
          <div className="max-w-2xl mx-auto">
            <div className="relative inline-block border-2 border-dashed border-brand-yellow p-16">
              <img
                src={available[0].file}
                alt="Clearspace demo"
                className="w-full h-auto max-h-20 object-contain"
              />
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand-cream px-2 font-mono text-[10px] text-brand-gray-dark">
                2× cap-height
              </span>
            </div>
          </div>
          <p className="font-sans text-sm text-brand-black text-center mt-6">
            {clearspaceRule.guidance}
          </p>
        </div>
      </Block>

      <Block title="Tamaños mínimos">
        <div className="grid md:grid-cols-3 gap-4">
          {Object.entries(minSizeRules).map(([key, vals]) => (
            <div
              key={key}
              className="p-5 rounded border border-brand-gray-dark/60"
            >
              <p className="font-display uppercase text-lg text-white mb-3">{key}</p>
              <p className="font-sans text-xs text-brand-gray-light mb-1">
                <span className="text-brand-yellow font-mono">Digital:</span> {vals.digital}
              </p>
              <p className="font-sans text-xs text-brand-gray-light">
                <span className="text-brand-yellow font-mono">Print:</span> {vals.print}
              </p>
            </div>
          ))}
        </div>
      </Block>

      <Block title="Reglas de uso">
        <div className="grid md:grid-cols-2 gap-6">
          <DoDontCard type="do" items={doRules} />
          <DoDontCard type="dont" items={dontRules} />
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
