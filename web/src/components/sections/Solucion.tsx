import { Search, Users, Video, TrendingUp } from "lucide-react";

// Copy del funnel-maestro.md — Solution Section
const pasos = [
  {
    numero: "01",
    icono: Search,
    titulo: "Estrategia",
    descripcion:
      "Auditamos tu marca, tus ads actuales y definimos los 4 ángulos de contenido que van a convertir en tu nicho.",
  },
  {
    numero: "02",
    icono: Users,
    titulo: "Casting curado",
    descripcion:
      "Seleccionamos creators de nuestra red de +300 perfiles verificados en Colombia, México, Argentina, Chile y USA Hispanic.",
  },
  {
    numero: "03",
    icono: Video,
    titulo: "Producción en lote",
    descripcion:
      "Cada mes entregamos entre 20 y 60 videos editados, listos para subir a Meta, TikTok y orgánico.",
  },
  {
    numero: "04",
    icono: TrendingUp,
    titulo: "Iteración con data",
    descripcion:
      "Analizamos qué hooks y ángulos ganan y duplicamos lo que funciona. Sin adivinar.",
  },
];

// Diferenciadores del brand-profile.json
const diferenciadores = [
  {
    titulo: "Tech propia (Kreoon)",
    descripcion:
      "Brief, casting, review y delivery en una plataforma — no Drive disperso ni WhatsApp caos.",
  },
  {
    titulo: "Casting curado colombiano",
    descripcion: "Creadores pre-validados, no marketplace abierto.",
  },
  {
    titulo: "Bilingüe real",
    descripcion:
      "Contenido nativo ES y EN para USA Hispanic sin sonar traducido.",
  },
];

export function Solucion() {
  return (
    <section
      className="bg-brand-black py-24 lg:py-32"
      aria-labelledby="solucion-heading"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20">
          <p className="font-sans text-sm font-semibold uppercase tracking-widest text-brand-gold mb-4">
            Cómo trabajamos
          </p>
          <h2
            id="solucion-heading"
            className="font-serif text-display-md text-brand-cream leading-tight max-w-2xl mx-auto"
          >
            Así trabajamos con vos
          </h2>
        </div>

        {/* Pasos del proceso */}
        <ol className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24" role="list">
          {pasos.map((paso) => {
            const Icono = paso.icono;
            return (
              <li
                key={paso.numero}
                className="relative flex flex-col gap-4 rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6"
              >
                {/* Número decorativo */}
                <span
                  className="font-serif text-5xl font-bold text-brand-gold/20 select-none"
                  aria-hidden="true"
                >
                  {paso.numero}
                </span>
                {/* Icono */}
                <div className="w-10 h-10 rounded-lg bg-brand-gold/10 flex items-center justify-center">
                  <Icono className="h-5 w-5 text-brand-gold" aria-hidden="true" />
                </div>
                {/* Contenido */}
                <h3 className="font-serif text-xl font-semibold text-brand-cream">
                  {paso.titulo}
                </h3>
                <p className="font-sans text-sm text-zinc-400 leading-relaxed">
                  {paso.descripcion}
                </p>
              </li>
            );
          })}
        </ol>

        {/* Diferenciadores */}
        <div className="border-t border-zinc-800 pt-16">
          <p className="font-sans text-sm font-semibold uppercase tracking-widest text-brand-gold mb-8 text-center">
            Por qué somos diferentes
          </p>
          <dl className="grid md:grid-cols-3 gap-8">
            {diferenciadores.map((item) => (
              <div
                key={item.titulo}
                className="rounded-xl border border-zinc-800 p-6 hover:border-brand-gold/30 transition-colors"
              >
                <dt className="font-serif text-lg font-semibold text-brand-cream mb-2">
                  {item.titulo}
                </dt>
                <dd className="font-sans text-sm text-zinc-400 leading-relaxed">
                  {item.descripcion}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
