import { SectionHero } from "../_components/SectionHero";
import { AssetGallery } from "../_components/AssetGallery";
import { socialAssets } from "../_data/assets";
import { tonoPorCanal } from "../_data/guidelines";

export default function SocialPage() {
  const byPlatform = {
    Instagram: socialAssets.filter((a) => a.platform === "Instagram"),
    TikTok: socialAssets.filter((a) => a.platform === "TikTok"),
    LinkedIn: socialAssets.filter((a) => a.platform === "LinkedIn"),
    YouTube: socialAssets.filter((a) => a.platform === "YouTube"),
  };

  return (
    <>
      <SectionHero
        eyebrow="04 — Plantillas sociales"
        title="Instagram · TikTok · LinkedIn · YouTube"
        subtitle="Specs, frecuencia recomendada y assets reales generados según la paleta oficial. Descarga, adapta y publica."
      />

      <section className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-16">
        {tonoPorCanal.map((c) => (
          <div
            key={c.canal}
            className="p-5 rounded border border-brand-gray-dark/60"
          >
            <p className="font-display uppercase text-xl text-brand-yellow mb-2">
              {c.canal}
            </p>
            <p className="font-sans text-xs text-white/90 mb-2">{c.tono}</p>
            <p className="font-mono text-[10px] text-brand-gray-light">
              {c.frecuencia}
            </p>
            <p className="font-mono text-[10px] text-brand-gray-light mt-1">
              {c.formato}
            </p>
          </div>
        ))}
      </section>

      {(Object.entries(byPlatform) as [string, typeof socialAssets][]).map(
        ([platform, assets]) =>
          assets.length === 0 ? null : (
            <section key={platform} className="mt-12">
              <h2 className="font-display uppercase text-3xl text-white mb-6 pb-3 border-b border-brand-gray-dark/60">
                {platform}
              </h2>
              <AssetGallery assets={assets} columns={3} />
            </section>
          )
      )}
    </>
  );
}
