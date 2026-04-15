import { SectionHero } from "../_components/SectionHero";
import { AssetGallery } from "../_components/AssetGallery";
import { adsAssets } from "../_data/assets";

const platforms = [
  {
    name: "Meta",
    filter: "Meta",
    specs: [
      { format: "Feed 1:1", size: "1080×1080", note: "Fallback universal; funciona en feed y reels" },
      { format: "Feed 4:5", size: "1080×1350", note: "Formato dominante en mobile, más real estate" },
      { format: "Story/Reel 9:16", size: "1080×1920", note: "Safe zones top 14% y bottom 20%" },
    ],
  },
  {
    name: "Google",
    filter: "Google",
    specs: [
      { format: "Display 1200×628", size: "1200×628", note: "Responsive display, banner ancho" },
      { format: "MREC 300×250", size: "300×250", note: "Display pequeño, alta rotación" },
    ],
  },
  {
    name: "TikTok",
    filter: "TikTok",
    specs: [
      { format: "9:16 full-screen", size: "1080×1920", note: "Safe zones top 18% y bottom 22%" },
    ],
  },
];

export default function AdsPage() {
  return (
    <>
      <SectionHero
        eyebrow="05 — Assets de Ads"
        title="Creatives production-ready"
        subtitle="Todos los visuals están generados con Nanobanana respetando safe zones y paleta oficial. Listos para A/B testing."
      />

      {platforms.map((p) => {
        const assets = adsAssets.filter((a) => a.platform === p.filter);
        return (
          <section key={p.name} className="mt-14">
            <div className="flex flex-col md:flex-row gap-6 md:items-end md:justify-between pb-4 mb-6 border-b border-brand-gray-dark/60">
              <h2 className="font-display uppercase text-3xl text-white">{p.name}</h2>
              <div className="flex flex-wrap gap-3">
                {p.specs.map((s) => (
                  <div
                    key={s.format}
                    className="px-3 py-1.5 rounded border border-brand-gray-dark/60 text-xs"
                  >
                    <span className="font-display uppercase text-brand-yellow">
                      {s.format}
                    </span>
                    <span className="font-mono text-brand-gray-light ml-2">
                      {s.size}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            {assets.length > 0 ? (
              <AssetGallery assets={assets} columns={3} />
            ) : (
              <p className="font-sans text-sm text-brand-gray-light">
                Sin assets todavía para esta plataforma.
              </p>
            )}
          </section>
        );
      })}

      <section className="mt-16 p-6 rounded border border-brand-yellow/30 bg-brand-yellow/5">
        <p className="font-display uppercase text-lg text-brand-yellow mb-3">
          Guía rápida de copy para ads
        </p>
        <ul className="font-sans text-sm text-white/90 space-y-2 list-disc list-inside">
          <li>Hook en primeras 3 palabras (headline &lt; 40 caracteres).</li>
          <li>Siempre con CTA claro: "Agenda una llamada", "Pide tu pack", "Aplica hoy".</li>
          <li>Usa uno de los 5 slogans oficiales cuando el espacio lo permita.</li>
          <li>Evita promesas de viralidad; habla de resultados medibles.</li>
        </ul>
      </section>
    </>
  );
}
