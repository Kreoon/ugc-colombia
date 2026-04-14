import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Trailing slash desactivado (SEO canónico limpio)
  trailingSlash: false,

  // Excluir assets pesados del bundle de serverless functions.
  // public/ ya es servido como estático por Vercel, no necesita estar en las funciones.
  // IMPORTANTE: NO excluir node_modules/@next/swc-* ni @esbuild — Next los usa en runtime.
  outputFileTracingExcludes: {
    "*": [
      "public/brand/**/*",
      "public/videos/**/*",
      "public/images/**/*",
      ".next/cache/**/*",
    ],
  },

  // Incluir explícitamente los .md que cada ruta admin necesita leer del filesystem.
  // Sin esto, Next no los incluye en el bundle de la función y getContentWithOverrides falla.
  outputFileTracingIncludes: {
    "/admin/marca/[slug]": ["./brand/**/*.md"],
    "/admin/viralidad/modelo": ["./content/viralidad/*.md"],
    "/admin/viralidad/benchmark": ["./content/viralidad/*.md"],
    "/admin/viralidad/parrilla": ["./content/viralidad/*.md"],
    "/admin/viralidad/calendarios/[mes]": ["./content/viralidad/*.md"],
    "/admin/packs/[slug]": ["./content/viralidad/packs/**/*.md"],
    "/admin/editor/[...path]": [
      "./brand/**/*.md",
      "./content/**/*.md",
    ],
  },

  // Optimización de imágenes
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.supabase.co",
      },
      {
        protocol: "https",
        hostname: "ugccolombia.co",
      },
    ],
  },

  // Headers de seguridad y SEO
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },

  // Redirects 301 para rutas legacy
  async redirects() {
    return [
      // Agregar redirects de migración aquí cuando aplique
    ];
  },
};

export default nextConfig;
