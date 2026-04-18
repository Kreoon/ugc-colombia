/**
 * ForgeProofGallery — 3 slides reales generados por el pipeline.
 * Usa los assets ya publicados de la serie "3-errores-matan-ugc-hook" (v3).
 */

const SLIDES = [
  {
    src: "/brand/social/20260417-3-errores-matan-ugc-hook/slide-01-portada-final.png",
    alt: "Portada editorial: 3 errores que matan tu UGC antes del hook",
    caption: "Portada hero · overlay + logo",
  },
  {
    src: "/brand/social/20260417-3-errores-matan-ugc-hook/slide-05-error-2-final.png",
    alt: "Slide: Grabar todo desde la misma silla",
    caption: "Retrato editorial · ERROR 02",
  },
  {
    src: "/brand/social/20260417-3-errores-matan-ugc-hook/slide-08-fix-3-final.png",
    alt: "Slide: Hero shot con luz direccional cálida",
    caption: "Hero shot · producto ámbar",
  },
];

export function ForgeProofGallery() {
  return (
    <section className="bg-brand-black py-20 md:py-28 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="flex flex-col gap-4 items-center text-center mb-12">
          <span className="text-[10px] uppercase tracking-widest font-bold text-brand-yellow">
            Así se ven los outputs
          </span>
          <h2 className="font-display text-5xl md:text-6xl uppercase text-white leading-[0.95] tracking-tight max-w-3xl">
            3 slides reales. Generados por el pipeline. Sin retocar.
          </h2>
          <p className="text-lg text-brand-gray-light max-w-2xl leading-relaxed">
            Estos fueron producidos end-to-end por Content Forge el 17 de abril. El carrusel completo de 10 slides se generó en 5 minutos desde un pedido en lenguaje natural.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {SLIDES.map((s) => (
            <figure
              key={s.src}
              className="flex flex-col gap-3 rounded-2xl overflow-hidden border border-white/10 bg-black/40"
            >
              <div className="relative aspect-[4/5] bg-gradient-to-br from-brand-yellow/5 via-transparent to-transparent">
                <img src={s.src} alt={s.alt} className="w-full h-full object-cover" loading="lazy" />
              </div>
              <figcaption className="px-4 pb-4 text-xs text-brand-gray-light uppercase tracking-wider font-semibold">
                {s.caption}
              </figcaption>
            </figure>
          ))}
        </div>

        <p className="text-center text-sm text-brand-gray-light/70 mt-8">
          Ver los 10 slides completos en{" "}
          <a
            href="https://github.com/Kreoon/ugc-colombia/tree/main/web/public/brand/social/20260417-3-errores-matan-ugc-hook"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-yellow hover:underline"
          >
            el repo de UGC Colombia
          </a>
          .
        </p>
      </div>
    </section>
  );
}
