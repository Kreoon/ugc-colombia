import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Trailing slash desactivado (SEO canónico limpio)
  trailingSlash: false,

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
