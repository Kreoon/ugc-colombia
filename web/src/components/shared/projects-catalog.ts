/**
 * Catálogo de regalos públicos de UGC Colombia × Kreoon.
 *
 * Cada proyecto alimenta las tarjetas de /forge/gracias y /regalos.
 * Añadir uno nuevo: agregar entry aquí, sin tocar ningún componente.
 */

import type { ProjectCardProps } from "./ProjectCard";

export const PROJECTS_CATALOG: ProjectCardProps[] = [
  {
    slug: "content-forge",
    name: "Content Forge",
    tagline: "Un estudio editorial en tu terminal",
    description:
      "Pipeline end-to-end para generar carruseles, reels y posts con calidad de agencia. Consistencia de personaje para marca personal, voz configurable, logo oficial, layout image-aware. Funciona desde Claude Code.",
    status: "new",
    stackBadges: ["Node.js", "Gemini 2.5", "Claude Code", "MIT"],
    repoUrl: "https://github.com/AlexanderKast/content-forge",
    guideUrl: "https://github.com/AlexanderKast/content-forge/blob/main/docs/getting-started.md",
    leadFormUrl: "/forge",
    featured: true,
  },
  {
    slug: "proximamente-1",
    name: "Next Release",
    tagline: "En construcción",
    description:
      "Estamos trabajando en el próximo regalo. Déjanos tus datos en Content Forge y te avisamos primero cuando lo liberemos.",
    status: "soon",
    stackBadges: [],
  },
  {
    slug: "proximamente-2",
    name: "Coming Soon",
    tagline: "En construcción",
    description:
      "Más herramientas open-source para creadores y marcas. Sigue nuestras redes para no perderte el lanzamiento.",
    status: "soon",
    stackBadges: [],
  },
];
