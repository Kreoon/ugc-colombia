import type { Metadata } from "next";
import Link from "next/link";
import { ProjectCard } from "@/components/shared/ProjectCard";
import { PROJECTS_CATALOG } from "@/components/shared/projects-catalog";
import { SocialLinks } from "@/components/shared/SocialLinks";

export const metadata: Metadata = {
  title: "¡Gracias! Tu regalo está listo — Content Forge · UGC Colombia",
  description: "Te entregamos Content Forge y otros regalos de la comunidad UGC Colombia × Kreoon.",
  robots: { index: false, follow: false },
};

// Forzar dinámico para poder leer searchParams
export const dynamic = "force-dynamic";

type Props = {
  searchParams: Promise<{ name?: string; priority?: string }>;
};

const REPO_URL = "https://github.com/AlexanderKast/content-forge";
const GUIDE_URL = `${REPO_URL}/blob/main/docs/getting-started.md`;
const CALENDLY_URL = process.env.NEXT_PUBLIC_FORGE_CALENDLY_URL || "https://calendly.com/alexanderkast/content-forge-1a1";

export default async function ForgeThankYouPage({ searchParams }: Props) {
  const params = await searchParams;
  const name = (params.name || "").split(" ")[0] || "amigo/a";
  const hasPriority = params.priority === "true";

  return (
    <main className="bg-brand-black min-h-screen">
      {/* HERO gracias */}
      <section className="relative overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(249,179,52,0.12),transparent_55%)]" />
        <div className="relative max-w-5xl mx-auto px-6 md:px-10 py-16 md:py-24 text-center">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase bg-green-500/15 text-green-400 border border-green-500/40 mb-6">
            ✓ REGISTRO EXITOSO
          </span>

          <h1 className="font-display text-5xl md:text-7xl uppercase text-white leading-[0.9] tracking-tight mb-4">
            ¡Gracias {name}!
          </h1>
          <p className="text-xl md:text-2xl text-brand-yellow/90 font-medium mb-3">
            Content Forge ya es tuyo.
          </p>
          <p className="text-base md:text-lg text-brand-gray-light max-w-2xl mx-auto leading-relaxed mb-10">
            También te enviamos el resumen completo a tu correo. Si no llega en 2 minutos, revisa tu carpeta de spam o escríbenos a <a href="mailto:founder@kreoon.com" className="text-brand-yellow hover:underline">founder@kreoon.com</a>.
          </p>

          {/* CTAs principales */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-2xl mx-auto">
            <Link
              href={REPO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-2 bg-brand-yellow hover:bg-brand-yellow-hover text-brand-black font-bold px-6 py-4 rounded-xl text-base transition-colors"
            >
              Abrir en GitHub →
            </Link>
            <Link
              href={GUIDE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-2 text-brand-yellow hover:text-white font-semibold px-6 py-4 rounded-xl text-base border border-brand-yellow/40 hover:border-brand-yellow transition-colors"
            >
              Guía de instalación
            </Link>
          </div>
        </div>
      </section>

      {/* BONUS: Priority call */}
      {hasPriority ? (
        <section className="py-12 border-y border-brand-yellow/30 bg-gradient-to-br from-brand-yellow/10 via-transparent to-transparent">
          <div className="max-w-4xl mx-auto px-6 md:px-10 text-center">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase bg-brand-yellow/20 text-brand-yellow border border-brand-yellow mb-4">
              ⭐ BONUS DESBLOQUEADO
            </span>
            <h2 className="font-display text-4xl md:text-5xl uppercase text-white leading-tight mb-4">
              Entraste en los primeros 50
            </h2>
            <p className="text-lg text-brand-gray-light max-w-2xl mx-auto mb-8">
              Te regalamos una llamada de 15 minutos con Alexander para configurar Content Forge directamente a tu marca y resolver dudas en vivo. Agenda en los próximos 7 días — los slots se acaban.
            </p>
            <Link
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-brand-yellow hover:bg-brand-yellow-hover text-brand-black font-bold px-8 py-4 rounded-xl text-base transition-colors"
            >
              Reservar mi llamada de 15 min →
            </Link>
          </div>
        </section>
      ) : null}

      {/* CÓMO EMPEZAR · 4 pasos */}
      <section className="bg-brand-black py-20 md:py-24 border-t border-white/5">
        <div className="max-w-5xl mx-auto px-6 md:px-10">
          <div className="text-center mb-12">
            <span className="text-[10px] uppercase tracking-widest font-bold text-brand-yellow">
              Cómo empezar
            </span>
            <h2 className="font-display text-4xl md:text-5xl uppercase text-white leading-tight tracking-tight mt-3">
              4 pasos · 20 minutos
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {STEPS.map((s, i) => (
              <article key={s.title} className="flex gap-4 p-5 rounded-2xl border border-white/10 bg-black/40">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-brand-yellow/20 text-brand-yellow font-bold flex items-center justify-center text-base">
                  {i + 1}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-white text-base mb-1">{s.title}</h3>
                  <p className="text-sm text-brand-gray-light leading-relaxed mb-2">{s.body}</p>
                  {s.code ? (
                    <code className="block font-mono text-xs text-brand-yellow bg-black/60 border border-white/10 rounded px-3 py-2">
                      {s.code}
                    </code>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* HUB de otros regalos */}
      <section className="bg-brand-black py-20 md:py-28 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="flex flex-col gap-3 items-center text-center mb-12">
            <span className="text-[10px] uppercase tracking-widest font-bold text-brand-yellow">
              Otros regalos
            </span>
            <h2 className="font-display text-5xl md:text-6xl uppercase text-white leading-[0.95] tracking-tight">
              Todo lo que compartimos con la comunidad
            </h2>
            <p className="text-base text-brand-gray-light max-w-2xl leading-relaxed">
              Estos son los proyectos que liberamos como regalo. Algunos ya están disponibles, otros vienen pronto. Síguenos para no perdértelos.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {PROJECTS_CATALOG.map((p) => (
              <ProjectCard key={p.slug} {...p} />
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/regalos"
              className="inline-flex items-center gap-2 text-brand-yellow hover:text-white font-semibold"
            >
              Ver todos los regalos en ugccolombia.co/regalos →
            </Link>
          </div>
        </div>
      </section>

      {/* REDES */}
      <section className="bg-brand-black py-16 border-t border-white/5">
        <div className="max-w-3xl mx-auto px-6 md:px-10 text-center">
          <h3 className="font-display text-3xl md:text-4xl uppercase text-white leading-tight mb-3">
            Síguenos y aprende más
          </h3>
          <p className="text-sm text-brand-gray-light mb-8 max-w-lg mx-auto">
            Contenido real sobre UGC, marca personal y pipelines de IA. Sin relleno. Tres veces por semana.
          </p>
          <SocialLinks variant="iconic" align="center" />
        </div>
      </section>
    </main>
  );
}

const STEPS = [
  {
    title: "Clona el repositorio",
    body: "Abre tu terminal y copia el repo a tu carpeta de proyectos.",
    code: "git clone https://github.com/AlexanderKast/content-forge.git",
  },
  {
    title: "Instala las dependencias",
    body: "Dentro de la carpeta, corre npm install. Tarda 1-2 minutos.",
    code: "cd content-forge && npm install",
  },
  {
    title: "Configura tu marca (10 preguntas)",
    body: "El wizard te pide nombre, colores, logo, tu API de Gemini (gratis) y si eres marca personal, tus fotos.",
    code: "npm run setup",
  },
  {
    title: "Pide tu primer carrusel",
    body: "Abre Claude Code apuntando a la carpeta y escribe en el chat: 'hazme un carrusel educativo sobre [tu tema]'.",
    code: "",
  },
];
