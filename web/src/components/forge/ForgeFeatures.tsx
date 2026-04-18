/**
 * ForgeFeatures — Grid de 6 features clave del pipeline.
 */

const FEATURES = [
  {
    title: "Imágenes editoriales",
    body: "Generadas con Gemini 2.5 Flash Image. Paleta y composición controladas por tu manual de marca.",
    icon: "🎨",
  },
  {
    title: "Consistencia de personaje",
    body: "Subes 3-10 fotos tuyas. Apareces tú en cada carrusel con ~85% de fidelidad facial.",
    icon: "🧬",
  },
  {
    title: "Voz configurable",
    body: "Amiga que sabe, autoridad, provocador o educador calmado. Captions en tu tono, no 'ChatGPT genérico'.",
    icon: "✍️",
  },
  {
    title: "Layout image-aware",
    body: "Analiza cada imagen y decide sombra, glow, scrim y posición del logo slide a slide. No templates ciegos.",
    icon: "📐",
  },
  {
    title: "Calendario editorial",
    body: "Agenda cada pieza en tu timezone según los días y horas óptimos que tú configuraste.",
    icon: "📅",
  },
  {
    title: "Todo en tu máquina",
    body: "Tu API key, tus archivos, tu control. Sin SaaS, sin límites de 'creditos'. MIT license.",
    icon: "🔒",
  },
];

export function ForgeFeatures() {
  return (
    <section className="bg-brand-black py-20 md:py-28 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="flex flex-col gap-4 items-center text-center mb-12 md:mb-16">
          <span className="text-[10px] uppercase tracking-widest font-bold text-brand-yellow">
            Qué recibes
          </span>
          <h2 className="font-display text-5xl md:text-6xl uppercase text-white leading-[0.95] tracking-tight max-w-3xl">
            Calidad de agencia, sin agencia.
          </h2>
          <p className="text-lg text-brand-gray-light max-w-2xl leading-relaxed">
            Todo lo que necesitas para construir una marca coherente, publicar con frecuencia y no sonar genérico. Ya configurado al estándar editorial que usamos en UGC Colombia.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {FEATURES.map((f) => (
            <article
              key={f.title}
              className="flex flex-col gap-3 p-6 rounded-2xl border border-white/10 bg-gradient-to-br from-brand-yellow/5 via-transparent to-transparent hover:border-brand-yellow/40 transition-colors"
            >
              <div className="text-3xl" aria-hidden>{f.icon}</div>
              <h3 className="font-display text-2xl uppercase text-white tracking-tight leading-none">
                {f.title}
              </h3>
              <p className="text-sm text-brand-gray-light leading-relaxed">{f.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
