import type { MetadataRoute } from "next";

const BASE_URL = "https://ugccolombia.co";

// Slugs de servicios (alineados con seo-strategy.md)
const serviciosSlugs = [
  "ugc-creators",
  "ugc-para-meta-ads",
  "video-testimoniales",
  "estrategia-contenido-redes",
  "gestion-creadores-tiktok",
];

// Casos de éxito (se expandirá con datos de Supabase en producción)
const casosSlugs = [
  "skincare-dtc-mexico-cpa-9-usd",
  "saas-b2b-colombia-80m-views-tiktok",
  "ecommerce-moda-usa-hispanic-180k-mes",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // ─── Rutas estáticas prioritarias ───────────────────────────────────────
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
      alternates: {
        languages: {
          "es-CO": `${BASE_URL}`,
          "es-419": `${BASE_URL}`,
          "en-US": `${BASE_URL}/en`,
        },
      },
    },
    {
      url: `${BASE_URL}/discovery-call`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.95,
    },
    {
      url: `${BASE_URL}/servicios`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/casos`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${BASE_URL}/precios`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${BASE_URL}/sobre`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/recursos`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: `${BASE_URL}/creators`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/contacto`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/legal/privacidad`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.2,
    },
    {
      url: `${BASE_URL}/legal/terminos`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.2,
    },
    // Espejo EN
    {
      url: `${BASE_URL}/en`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];

  // ─── Servicios dinámicos ─────────────────────────────────────────────────
  const serviciosRoutes: MetadataRoute.Sitemap = serviciosSlugs.map((slug) => ({
    url: `${BASE_URL}/servicios/${slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));

  // ─── Casos dinámicos ─────────────────────────────────────────────────────
  const casosRoutes: MetadataRoute.Sitemap = casosSlugs.map((slug) => ({
    url: `${BASE_URL}/casos/${slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...staticRoutes, ...serviciosRoutes, ...casosRoutes];
}
