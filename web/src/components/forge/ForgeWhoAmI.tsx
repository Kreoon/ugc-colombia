import Link from "next/link";

/**
 * ForgeWhoAmI — Bio breve de UGC Colombia × Alexander Cast.
 * Voz agencia ("nosotros") pero firma individual al final.
 */
export function ForgeWhoAmI() {
  return (
    <section className="bg-brand-black py-20 md:py-28 border-t border-white/5">
      <div className="max-w-5xl mx-auto px-6 md:px-10">
        <div className="grid md:grid-cols-[auto_1fr] gap-8 md:gap-12 items-start">
          <div className="md:sticky md:top-10">
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-2xl overflow-hidden border border-brand-yellow/30 bg-gradient-to-br from-brand-yellow/10 to-transparent">
              <img
                src="/brand/team/alexander.jpg"
                alt="Alexander Cast"
                className="w-full h-full object-cover"
                loading="lazy"
                onError={(e) => {
                  // Fallback si la imagen no existe aún
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
            </div>
          </div>

          <div className="flex flex-col gap-5">
            <span className="text-[10px] uppercase tracking-widest font-bold text-brand-yellow">
              Quién lo regala
            </span>

            <h2 className="font-display text-4xl md:text-5xl uppercase text-white leading-[0.95] tracking-tight">
              Hecho por nosotros en UGC Colombia
            </h2>

            <div className="flex flex-col gap-4 text-base md:text-lg text-brand-gray-light leading-relaxed">
              <p>
                Somos <strong className="text-white">UGC Colombia</strong> — una agencia boutique que produce contenido estratégico para marcas D2C en LATAM y USA Hispanic. Operamos con sistemas, IA propia y procesos auditables. No somos un marketplace, somos un equipo.
              </p>
              <p>
                Construimos Content Forge porque lo necesitábamos nosotros mismos. Lo usamos todos los días en el estudio para producir los carruseles, reels y posts que publican nuestros clientes. Y funciona.
              </p>
              <p>
                Lo liberamos como regalo porque cuando empezamos, no existía algo así. Si tú lo aprovechas y construyes algo top con él, eso es parte de la misión: elevar el estándar del contenido en la región.
              </p>
            </div>

            <div className="flex flex-col gap-1 pt-2">
              <p className="text-sm text-brand-yellow font-semibold">
                — Alexander Cast
              </p>
              <p className="text-xs text-brand-gray-light">
                Fundador · UGC Colombia × Kreoon · Bogotá
              </p>
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              <Link
                href="https://ugccolombia.co"
                className="text-sm text-brand-yellow hover:underline font-medium"
              >
                ugccolombia.co
              </Link>
              <span className="text-brand-gray-light/40">·</span>
              <Link
                href="https://kreoon.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-brand-yellow hover:underline font-medium"
              >
                kreoon.com
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
