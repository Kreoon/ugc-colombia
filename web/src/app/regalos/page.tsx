import type { Metadata } from "next";
import Link from "next/link";
import { ProjectCard } from "@/components/shared/ProjectCard";
import { PROJECTS_CATALOG } from "@/components/shared/projects-catalog";
import { SocialLinks } from "@/components/shared/SocialLinks";

export const metadata: Metadata = {
  title: "Regalos · Proyectos open-source de UGC Colombia × Kreoon",
  description:
    "Todos los proyectos que liberamos como regalo a la comunidad de creadores y marcas. Pipelines, agentes, templates. Gratis, MIT, listos para clonar.",
  openGraph: {
    title: "Regalos · UGC Colombia × Kreoon",
    description:
      "Proyectos open-source liberados por UGC Colombia. Pipelines de contenido con IA, agentes de Claude Code, templates y más.",
    url: "https://ugccolombia.co/regalos",
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
  alternates: { canonical: "https://ugccolombia.co/regalos" },
};

export default function RegalosPage() {
  const featured = PROJECTS_CATALOG.filter((p) => p.featured);
  const rest = PROJECTS_CATALOG.filter((p) => !p.featured);

  return (
    <main className="bg-brand-black min-h-screen">
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-white/5">
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(249,179,52,0.10),transparent_55%)]" />
        <div className="relative max-w-5xl mx-auto px-6 md:px-10 py-20 md:py-28 text-center">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase bg-brand-yellow/15 text-brand-yellow border border-brand-yellow/40 mb-6">
            OPEN SOURCE · MIT
          </span>
          <h1 className="font-display text-6xl md:text-7xl lg:text-8xl uppercase text-white leading-[0.9] tracking-tight mb-6">
            Regalos para la comunidad
          </h1>
          <p className="text-lg md:text-xl text-brand-gray-light max-w-2xl mx-auto leading-relaxed">
            Liberamos los pipelines, agentes y templates que usamos todos los días en{" "}
            <strong className="text-white">UGC Colombia</strong>. Son tuyos. Sin SaaS, sin límites, sin trampas.
          </p>
        </div>
      </section>

      {/* FEATURED (Content Forge) */}
      {featured.length > 0 ? (
        <section className="bg-brand-black py-16 md:py-20 border-b border-white/5">
          <div className="max-w-5xl mx-auto px-6 md:px-10">
            <div className="flex items-center gap-3 mb-8">
              <span className="text-[10px] uppercase tracking-widest font-bold text-brand-yellow">
                ★ Destacado
              </span>
              <div className="flex-1 h-px bg-brand-yellow/20" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {featured.map((p) => (
                <ProjectCard key={p.slug} {...p} />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* EL RESTO */}
      <section className="bg-brand-black py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="flex items-center gap-3 mb-8">
            <span className="text-[10px] uppercase tracking-widest font-bold text-brand-gray-light">
              Todos los proyectos
            </span>
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-xs text-brand-gray-light">{PROJECTS_CATALOG.length} totales</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {rest.map((p) => (
              <ProjectCard key={p.slug} {...p} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA a seguir */}
      <section className="bg-brand-black py-20 border-t border-white/5">
        <div className="max-w-3xl mx-auto px-6 md:px-10 text-center">
          <h2 className="font-display text-4xl md:text-5xl uppercase text-white leading-tight mb-4">
            No te pierdas los próximos
          </h2>
          <p className="text-base text-brand-gray-light mb-8 max-w-xl mx-auto">
            Estamos construyendo más herramientas para creadores y marcas. Síguenos para enterarte cuando salgan.
          </p>
          <SocialLinks variant="iconic" align="center" />

          <div className="mt-10 pt-8 border-t border-white/5">
            <p className="text-sm text-brand-gray-light mb-3">¿Querés proponernos qué liberemos a continuación?</p>
            <Link
              href="mailto:founder@kreoon.com?subject=Sugerencia para Regalos UGC Colombia"
              className="inline-flex items-center gap-2 text-brand-yellow hover:text-white font-semibold"
            >
              Escríbenos a founder@kreoon.com →
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
