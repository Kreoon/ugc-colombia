import { SectionHero } from "../_components/SectionHero";
import { DoDontCard } from "../_components/DoDontCard";
import {
  taglines,
  archetypes,
  tonalidadEjes,
  tonalidadCualidades,
  tonoPorCanal,
  vozInstitucional,
  normasRedaccion,
  frasesCore,
  slogansAds,
  valores,
  diferenciadores,
  buyerPersonas,
  servicios,
  planesRetencion,
  equipo,
} from "../_data/guidelines";

export default function GuidelinesPage() {
  return (
    <>
      <SectionHero
        eyebrow="01 — Guidelines"
        title="Identidad y tono"
        subtitle="La base de todo: quiénes somos, cómo hablamos, a quién le hablamos, qué prometemos."
      />

      <section className="mb-20">
        <Block title="Taglines">
          <div className="space-y-4">
            <Quote label="Oficial">{taglines.oficial}</Quote>
            <Quote label="Campaña">{taglines.campana}</Quote>
            <Quote label="Alternativo profesional">{taglines.alternativoProfesional}</Quote>
          </div>
        </Block>

        <Block title="Arquetipos de marca">
          <div className="grid md:grid-cols-2 gap-6">
            <ArchetypeCard
              type="Primario"
              name={archetypes.primario.nombre}
              desc={archetypes.primario.descripcion}
              explain={archetypes.primario.explicacion}
            />
            <ArchetypeCard
              type="Secundario"
              name={archetypes.secundario.nombre}
              desc={archetypes.secundario.descripcion}
              explain={archetypes.secundario.explicacion}
            />
          </div>
        </Block>

        <Block title="Tonalidad">
          <p className="font-sans text-sm text-brand-gray-light mb-6 max-w-3xl">
            Cuatro cualidades que deben estar en cualquier pieza:
          </p>
          <ul className="grid sm:grid-cols-2 gap-3 mb-8">
            {tonalidadCualidades.map((c) => (
              <li
                key={c}
                className="p-4 rounded border border-brand-gray-dark/60 font-sans text-sm text-white"
              >
                {c}
              </li>
            ))}
          </ul>
          <div className="space-y-3 max-w-2xl">
            {tonalidadEjes.map((e) => (
              <div key={e.eje}>
                <div className="flex items-center justify-between text-xs font-sans mb-1.5">
                  <span className="text-white">{e.eje}</span>
                  <span className="text-brand-yellow font-mono">{e.valor}/10 · {e.label}</span>
                </div>
                <div className="h-1 bg-brand-gray-dark/60 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-brand-yellow"
                    style={{ width: `${e.valor * 10}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Block>

        <Block title="Tono por canal">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {tonoPorCanal.map((c) => (
              <div
                key={c.canal}
                className="p-5 rounded border border-brand-gray-dark/60"
              >
                <p className="font-display uppercase text-lg text-brand-yellow mb-3">
                  {c.canal}
                </p>
                <p className="font-sans text-xs text-white/90 mb-3">{c.tono}</p>
                <p className="font-sans text-[10px] uppercase tracking-widest text-brand-gray-light">
                  {c.frecuencia}
                </p>
                <p className="font-sans text-[10px] text-brand-gray-light mt-1">
                  {c.formato}
                </p>
              </div>
            ))}
          </div>
        </Block>

        <Block title="Voz institucional">
          <div className="grid sm:grid-cols-2 gap-4">
            <VoiceCard
              label="Primera persona"
              pronombre={vozInstitucional.primeraPersona.uso}
              cuando={vozInstitucional.primeraPersona.cuando}
              ejemplo={vozInstitucional.primeraPersona.ejemplo}
            />
            <VoiceCard
              label="Segunda persona"
              pronombre={vozInstitucional.segundaPersona.uso}
              cuando={vozInstitucional.segundaPersona.cuando}
              ejemplo={vozInstitucional.segundaPersona.ejemplo}
            />
          </div>
        </Block>

        <Block title="Normas de redacción">
          <div className="grid md:grid-cols-2 gap-6">
            <DoDontCard type="do" items={normasRedaccion.do} />
            <DoDontCard type="dont" items={normasRedaccion.dont} />
          </div>
        </Block>

        <Block title="Frases core">
          <div className="space-y-3">
            {frasesCore.map((f) => (
              <Quote key={f}>{f}</Quote>
            ))}
          </div>
        </Block>

        <Block title="Slogans para ads y bio">
          <ul className="grid sm:grid-cols-2 gap-3">
            {slogansAds.map((s) => (
              <li
                key={s}
                className="p-4 rounded border border-brand-yellow/30 bg-brand-yellow/5 font-sans text-sm text-white"
              >
                {s}
              </li>
            ))}
          </ul>
        </Block>

        <Block title="Valores">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {valores.map((v) => (
              <div key={v.nombre} className="p-5 rounded border border-brand-gray-dark/60">
                <p className="font-display uppercase text-lg text-brand-yellow mb-2">
                  {v.nombre}
                </p>
                <p className="font-sans text-sm text-white/90 mb-2">{v.definicion}</p>
                <p className="font-sans text-xs text-brand-gray-light italic">
                  {v.comoLoVivimos}
                </p>
              </div>
            ))}
          </div>
        </Block>

        <Block title="Diferenciadores">
          <ol className="space-y-3">
            {diferenciadores.map((d, i) => (
              <li
                key={d.titulo}
                className="p-5 rounded border border-brand-gray-dark/60 flex gap-5"
              >
                <span className="font-display text-3xl text-brand-yellow shrink-0">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <p className="font-display uppercase text-lg text-white mb-1">
                    {d.titulo}
                  </p>
                  <p className="font-sans text-sm text-brand-gray-light">{d.detalle}</p>
                </div>
              </li>
            ))}
          </ol>
        </Block>

        <Block title="Buyer Personas">
          <div className="grid md:grid-cols-2 gap-4">
            {buyerPersonas.map((p) => (
              <div key={p.nombre} className="p-5 rounded border border-brand-gray-dark/60">
                <p className="font-display uppercase text-base text-brand-yellow mb-1">
                  {p.nombre}
                </p>
                <p className="font-sans text-xs text-brand-gray-light mb-3">
                  {p.alias} · {p.edad} · {p.ubicacion}
                </p>
                <p className="font-sans text-xs text-white/90 mb-2">
                  <span className="text-brand-gray-light">Dolor:</span> {p.dolor}
                </p>
                <p className="font-sans text-xs text-white/90 mb-2">
                  <span className="text-brand-gray-light">Deseo:</span> {p.deseo}
                </p>
                <p className="font-sans text-[10px] uppercase tracking-widest text-brand-yellow">
                  {p.ticket}
                </p>
              </div>
            ))}
          </div>
        </Block>

        <Block title="Servicios">
          <div className="space-y-3">
            {servicios.map((s) => (
              <div
                key={s.nombre}
                className="p-5 rounded border border-brand-gray-dark/60 grid md:grid-cols-[200px_1fr_160px] gap-4 items-start"
              >
                <p className="font-display uppercase text-sm text-brand-yellow">
                  {s.nombre}
                  {"core" in s && s.core && (
                    <span className="block font-sans text-[10px] text-white/60 mt-1">
                      CORE
                    </span>
                  )}
                </p>
                <div>
                  <p className="font-sans text-sm text-white/90 mb-1">
                    {s.descripcion}
                  </p>
                  <p className="font-sans text-xs text-brand-gray-light">
                    Ideal para: {s.idealPara}
                  </p>
                </div>
                <p className="font-sans text-xs font-mono text-brand-gray-light text-right">
                  {s.precio}
                </p>
              </div>
            ))}
          </div>
        </Block>

        <Block title="Planes de retención">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {planesRetencion.map((p) => (
              <div
                key={p.plan}
                className="p-5 rounded border border-brand-gray-dark/60"
              >
                <p className="font-display uppercase text-lg text-white mb-2">
                  {p.plan}
                </p>
                <p className="font-display text-3xl text-brand-yellow mb-3">
                  ${p.precioUsd}
                  <span className="font-sans text-xs text-brand-gray-light ml-1">
                    /mes
                  </span>
                </p>
                <p className="font-sans text-xs text-brand-gray-light leading-relaxed">
                  {p.incluye}
                </p>
              </div>
            ))}
          </div>
        </Block>

        <Block title="Equipo">
          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-3">
            {equipo.map((e) => (
              <div
                key={e.nombre}
                className="p-4 rounded border border-brand-gray-dark/60"
              >
                <p className="font-display uppercase text-sm text-white">
                  {e.nombre}
                </p>
                <p className="font-sans text-[10px] uppercase tracking-widest text-brand-yellow mt-1">
                  {e.rol}
                </p>
                <p className="font-sans text-xs text-brand-gray-light mt-2 leading-relaxed">
                  {e.responsabilidades}
                </p>
              </div>
            ))}
          </div>
        </Block>
      </section>
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

function Quote({ label, children }: { label?: string; children: React.ReactNode }) {
  return (
    <blockquote className="pl-5 border-l-2 border-brand-yellow">
      {label && (
        <p className="font-sans text-[10px] uppercase tracking-widest text-brand-yellow mb-1">
          {label}
        </p>
      )}
      <p className="font-display text-xl text-white leading-snug">{children}</p>
    </blockquote>
  );
}

function ArchetypeCard({
  type,
  name,
  desc,
  explain,
}: {
  type: string;
  name: string;
  desc: string;
  explain: string;
}) {
  return (
    <div className="p-6 rounded border border-brand-gray-dark/60">
      <p className="font-sans text-[10px] uppercase tracking-widest text-brand-yellow mb-2">
        {type}
      </p>
      <p className="font-display text-3xl uppercase text-white mb-1">{name}</p>
      <p className="font-sans text-sm text-brand-gray-light italic mb-4">{desc}</p>
      <p className="font-sans text-sm text-white/90 leading-relaxed">{explain}</p>
    </div>
  );
}

function VoiceCard({
  label,
  pronombre,
  cuando,
  ejemplo,
}: {
  label: string;
  pronombre: string;
  cuando: string;
  ejemplo: string;
}) {
  return (
    <div className="p-5 rounded border border-brand-gray-dark/60">
      <p className="font-sans text-[10px] uppercase tracking-widest text-brand-yellow mb-2">
        {label}
      </p>
      <p className="font-display text-4xl uppercase text-white mb-2">{pronombre}</p>
      <p className="font-sans text-xs text-brand-gray-light mb-3">{cuando}</p>
      <p className="font-sans text-sm text-white/80 italic">"{ejemplo}"</p>
    </div>
  );
}
