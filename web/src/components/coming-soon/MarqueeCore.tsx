"use client";

const PHRASES = [
  "Donde los creadores se vuelven pro y las marcas convierten más.",
  "No necesitas fama. Necesitas contenido que venda.",
  "Creamos contenido con humanos, potenciado por IA.",
  "Tu historia, nuestra estrategia, resultados garantizados.",
  "UGC + IA + Live Shopping = ventas reales.",
];

/**
 * Marquee horizontal infinito con las frases core de UGC Colombia.
 * Tailwind v4 no lee keyframes del config.ts, la clase animate-marquee
 * está definida directamente en globals.css.
 */
export function MarqueeCore() {
  // Duplicamos el array para que el loop sea seamless al hacer translateX(-50%)
  const items = [...PHRASES, ...PHRASES];

  return (
    <div
      className="group relative w-full overflow-hidden border-y border-brand-gold/30 py-5 sm:py-6"
      style={{
        background:
          "linear-gradient(90deg, rgba(212,160,23,0.08) 0%, rgba(249,179,52,0.12) 50%, rgba(212,160,23,0.08) 100%)",
      }}
      aria-label="Mensajes de UGC Colombia"
    >
      {/* Fade edges para efecto premium */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-24 z-10"
        style={{
          background: "linear-gradient(90deg, #000 0%, transparent 100%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-24 z-10"
        style={{
          background: "linear-gradient(270deg, #000 0%, transparent 100%)",
        }}
      />

      {/* Track */}
      <div
        className="flex whitespace-nowrap animate-marquee will-change-transform group-hover:[animation-play-state:paused]"
      >
        {items.map((phrase, index) => (
          <span
            key={index}
            className="inline-flex items-center shrink-0"
          >
            <span className="font-display text-xl sm:text-2xl md:text-3xl uppercase tracking-wider text-white px-6 sm:px-8">
              {phrase}
            </span>
            <span
              className="text-brand-yellow text-2xl sm:text-3xl md:text-4xl shrink-0 select-none"
              aria-hidden="true"
            >
              ◆
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
