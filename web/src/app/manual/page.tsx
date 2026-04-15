import Link from "next/link";
import { SectionHero } from "./_components/SectionHero";
import { taglines, brandIdentity } from "./_data/guidelines";

const sections = [
  {
    href: "/manual/guidelines",
    number: "01",
    title: "Guidelines",
    description: "Identidad, arquetipos, tonalidad, voz institucional, frases core y slogans.",
  },
  {
    href: "/manual/tokens",
    number: "02",
    title: "Design Tokens",
    description: "Paleta oficial, tipografía Anton + Inter, escala modular, spacing, radii.",
  },
  {
    href: "/manual/logo",
    number: "03",
    title: "Logo",
    description: "Variantes oficiales, clearspace, tamaños mínimos, usos prohibidos.",
  },
  {
    href: "/manual/social",
    number: "04",
    title: "Plantillas Sociales",
    description: "Instagram, TikTok, LinkedIn y YouTube: especificaciones + ejemplos reales.",
  },
  {
    href: "/manual/ads",
    number: "05",
    title: "Assets de Ads",
    description: "Specs Meta, Google y TikTok con visuales generados para A/B testing.",
  },
  {
    href: "/manual/decks",
    number: "06",
    title: "Kit Presentaciones",
    description: "Pitch deck de 6 slides: portada, problema, solución, servicios, pricing, CTA.",
  },
  {
    href: "/manual/prompts",
    number: "07",
    title: "Prompts IA",
    description: "Biblioteca de prompts Nanobanana para generar assets consistentes.",
  },
];

export default function ManualHome() {
  return (
    <>
      <SectionHero
        eyebrow="Manual de Marca · v2"
        title={brandIdentity.name}
        subtitle={`${taglines.oficial} · ${brandIdentity.oneLiner}`}
      />

      <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {sections.map((s) => (
          <Link
            key={s.href}
            href={s.href}
            className="group relative p-8 rounded-md border border-brand-gray-dark/60 hover:border-brand-yellow transition-all bg-brand-black/40 hover:bg-brand-black/80"
          >
            <p className="font-display text-brand-yellow text-xs tracking-widest mb-4">
              {s.number}
            </p>
            <h2 className="font-display uppercase text-2xl text-white tracking-wide mb-3 group-hover:text-brand-yellow transition-colors">
              {s.title}
            </h2>
            <p className="font-sans text-sm text-brand-gray-light leading-relaxed">
              {s.description}
            </p>
            <p className="mt-5 font-sans text-[10px] uppercase tracking-widest text-brand-yellow opacity-0 group-hover:opacity-100 transition-opacity">
              Explorar →
            </p>
          </Link>
        ))}
      </section>

      <section className="mt-16 pt-10 border-t border-brand-gray-dark/60">
        <p className="font-sans text-[11px] uppercase tracking-[0.2em] text-brand-yellow mb-4">
          Cómo usar este manual
        </p>
        <div className="grid md:grid-cols-3 gap-6 text-sm text-brand-gray-light leading-relaxed">
          <div>
            <p className="font-display uppercase text-white mb-2">1. Identidad primero</p>
            <p>
              Si estás creando contenido nuevo, empieza en Guidelines para alinear el tono
              y la voz antes de tocar un pixel.
            </p>
          </div>
          <div>
            <p className="font-display uppercase text-white mb-2">2. Tokens como fuente</p>
            <p>
              Los colores y tipografías oficiales están en Design Tokens. No inventes
              variantes — copia el HEX o la variable Tailwind.
            </p>
          </div>
          <div>
            <p className="font-display uppercase text-white mb-2">3. Genera con IA</p>
            <p>
              Para crear nuevos assets de forma consistente, usa la biblioteca de Prompts
              — todos heredan la paleta oficial.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
