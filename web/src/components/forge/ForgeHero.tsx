import { ForgeLeadForm } from "./ForgeLeadForm";
import { PrioritySlotsCounter } from "./PrioritySlotsCounter";

/**
 * Hero de la landing /forge — split layout izq: pitch, der: formulario.
 */
export function ForgeHero() {
  return (
    <section className="relative overflow-hidden bg-brand-black">
      {/* Decorative backdrop */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(249,179,52,0.10),transparent_55%)]"
      />
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,transparent_0%,rgba(0,0,0,0.6)_80%)]" />

      <div className="relative max-w-7xl mx-auto px-6 md:px-10 py-16 md:py-24 lg:py-28">
        <div className="grid lg:grid-cols-[1.1fr_1fr] gap-10 lg:gap-16 items-start">
          {/* LEFT · pitch */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase bg-brand-yellow/15 text-brand-yellow border border-brand-yellow/40">
                REGALO · GRATIS
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase bg-green-500/15 text-green-400 border border-green-500/40">
                NUEVO
              </span>
            </div>

            <h1 className="font-display text-6xl md:text-7xl lg:text-8xl uppercase leading-[0.9] tracking-tight text-white">
              Un estudio editorial en tu terminal
            </h1>

            <p className="text-xl md:text-2xl text-brand-yellow/90 font-medium leading-snug">
              Content Forge: el mismo pipeline que usamos todos los días en UGC Colombia para producir contenido premium. Ahora es tuyo.
            </p>

            <p className="text-base md:text-lg text-brand-gray-light leading-relaxed max-w-[58ch]">
              Clonas, configuras tu marca en 3 minutos, y empiezas a publicar carruseles, reels y posts con calidad de agencia — desde tu propia marca, tu propia voz, tu propio rostro si eres marca personal.
            </p>

            <ul className="flex flex-col gap-2 text-sm text-brand-gray-light">
              <li className="flex items-start gap-2">
                <CheckIcon /> Imágenes generadas con Gemini 2.5 Flash Image
              </li>
              <li className="flex items-start gap-2">
                <CheckIcon /> Consistencia de personaje con 3-10 fotos tuyas
              </li>
              <li className="flex items-start gap-2">
                <CheckIcon /> Caption + hashtags en tu voz configurada
              </li>
              <li className="flex items-start gap-2">
                <CheckIcon /> Calendario editorial automático
              </li>
              <li className="flex items-start gap-2">
                <CheckIcon /> Todo corre en tu máquina · tu API key · MIT license
              </li>
            </ul>

            <div className="mt-2">
              <PrioritySlotsCounter />
            </div>
          </div>

          {/* RIGHT · formulario */}
          <div className="lg:sticky lg:top-10">
            <ForgeLeadForm variant="hero" />
          </div>
        </div>
      </div>
    </section>
  );
}

function CheckIcon() {
  return (
    <svg className="w-5 h-5 flex-shrink-0 text-brand-yellow mt-0.5" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
    </svg>
  );
}
