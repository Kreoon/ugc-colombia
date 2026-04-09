import { XCircle } from "lucide-react";

// Copy directo del funnel-maestro.md — Problem Section
const problemas = [
  "Contrataste 3 creators por DM y ninguno entregó a tiempo.",
  "Tu CPA en Meta subió 40% y los ads con modelos de stock ya no convierten.",
  "Tu equipo interno grabó contenido pero parece ad, no UGC real.",
  "Pagaste una plataforma gringa y los videos suenan «traducidos del inglés».",
];

export function Problema() {
  return (
    <section
      className="bg-brand-cream py-24 lg:py-32"
      aria-labelledby="problema-heading"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Columna izquierda — texto */}
          <div>
            <p className="font-sans text-sm font-semibold uppercase tracking-widest text-brand-gold mb-4">
              El problema
            </p>
            <h2
              id="problema-heading"
              className="font-serif text-display-md text-brand-black leading-tight mb-8"
            >
              Si estás aquí, probablemente ya intentaste esto:
            </h2>
            <p className="font-sans text-lg text-zinc-600 leading-relaxed">
              El UGC que convierte en LATAM no se resuelve con apps. Se resuelve
              con un equipo que entiende el acento, el contexto cultural y las
              objeciones reales del comprador hispano.
            </p>
          </div>

          {/* Columna derecha — lista de dolores */}
          <ul className="flex flex-col gap-4" role="list" aria-label="Problemas comunes con UGC">
            {problemas.map((problema, index) => (
              <li
                key={index}
                className="flex items-start gap-4 rounded-xl border border-zinc-200 bg-white p-5 shadow-sm"
              >
                <XCircle
                  className="h-5 w-5 text-brand-red shrink-0 mt-0.5"
                  aria-hidden="true"
                />
                <span className="font-sans text-base text-brand-text">
                  {problema}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
