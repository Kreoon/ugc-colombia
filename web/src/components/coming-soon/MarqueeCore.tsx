"use client";

const PHRASES = [
  "Donde los creadores se vuelven pro y las marcas convierten más.",
  "No necesitas fama. Necesitas contenido que venda.",
  "Creamos contenido con humanos, potenciado por IA.",
  "Tu historia, nuestra estrategia, resultados garantizados.",
  "UGC + IA + Live Shopping = ventas reales.",
];

const SEPARATOR = (
  <span className="text-brand-gold mx-4" aria-hidden="true">
    •
  </span>
);

export function MarqueeCore() {
  // Duplicamos el array para el efecto seamless
  const items = [...PHRASES, ...PHRASES];

  return (
    <div
      className="w-full overflow-hidden bg-brand-graphite/30 border-y border-brand-graphite/50 py-3"
      aria-label="Frases de UGC Colombia"
      role="marquee"
    >
      <div
        className="flex whitespace-nowrap animate-marquee will-change-transform"
        style={{
          // Pausa si prefers-reduced-motion (el CSS global ya lo maneja, pero por seguridad)
          animationPlayState: "running",
        }}
      >
        {items.map((phrase, index) => (
          <span key={index} className="inline-flex items-center">
            <span className="font-display text-sm sm:text-base uppercase tracking-wider text-brand-gray">
              {phrase}
            </span>
            {SEPARATOR}
          </span>
        ))}
      </div>
    </div>
  );
}
