import { SectionHero } from "../_components/SectionHero";
import { AssetGallery } from "../_components/AssetGallery";
import { deckAssets, imageryAssets } from "../_data/assets";

const deckStructure = [
  { num: "01", title: "Portada", content: "Logo, tagline oficial, nombre del prospecto" },
  { num: "02", title: "Problema", content: "Pain point — ads genéricos, content fatigue" },
  { num: "03", title: "Solución", content: "Boutique con estrategia integrada + Kreoon" },
  { num: "04", title: "Servicios", content: "UGC Ads, estrategia, producción, consultoría, talent" },
  { num: "05", title: "Pricing", content: "Starter / Growth / Scale / Enterprise" },
  { num: "06", title: "CTA", content: "Agenda una llamada, Kreoon demo" },
];

export default function DecksPage() {
  return (
    <>
      <SectionHero
        eyebrow="06 — Kit Presentaciones"
        title="Pitch deck UGC Colombia"
        subtitle="6 slides modelo para propuestas comerciales. 16:9, paleta oficial, tipografía Anton + Inter."
      />

      <section className="mt-14">
        <h2 className="font-display uppercase text-2xl text-white mb-5">Estructura</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3 mb-12">
          {deckStructure.map((s) => (
            <div
              key={s.num}
              className="p-5 rounded border border-brand-gray-dark/60 flex gap-4"
            >
              <p className="font-display text-3xl text-brand-yellow">{s.num}</p>
              <div>
                <p className="font-display uppercase text-base text-white">
                  {s.title}
                </p>
                <p className="font-sans text-xs text-brand-gray-light mt-1">
                  {s.content}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="font-display uppercase text-3xl text-white mb-6 pb-3 border-b border-brand-gray-dark/60">
          Backgrounds generados
        </h2>
        <AssetGallery assets={deckAssets} columns={3} />
      </section>

      <section className="mt-16">
        <h2 className="font-display uppercase text-3xl text-white mb-6 pb-3 border-b border-brand-gray-dark/60">
          Brand Imagery
        </h2>
        <p className="font-sans text-sm text-brand-gray-light max-w-3xl mb-6">
          Imágenes generales de marca para decks, web, landing pages, y posts orgánicos.
          Combinan con las plantillas sociales.
        </p>
        <AssetGallery assets={imageryAssets} columns={3} />
      </section>
    </>
  );
}
