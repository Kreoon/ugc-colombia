import type { Metadata } from "next";
import { Fraunces, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// ─── Fuentes ───────────────────────────────────────────────────────────────
const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

// ─── Metadata global ───────────────────────────────────────────────────────
export const metadata: Metadata = {
  metadataBase: new URL("https://ugccolombia.co"),
  title: {
    default: "Agencia UGC en Colombia para Marcas LATAM y US Hispanic | UGC Colombia",
    template: "%s | UGC Colombia",
  },
  description:
    "Agencia boutique de UGC y estrategia integrada. Producimos 20–60 videos al mes para marcas de e-commerce, SaaS y DTC en LATAM y USA Hispanic. Tecnología propia Kreoon.",
  keywords: [
    "agencia ugc colombia",
    "ugc creators colombia",
    "agencia ugc latam",
    "ugc para meta ads",
    "contenido generado por usuarios",
    "hispanic ugc creators",
    "ugc agency latino market",
  ],
  authors: [{ name: "Alexander Cast", url: "https://ugccolombia.co/sobre" }],
  creator: "UGC Colombia",
  publisher: "UGC Colombia",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: {
    canonical: "/",
    languages: {
      "es-CO": "/",
      "es-419": "/",
      "en-US": "/en",
    },
  },
  openGraph: {
    type: "website",
    locale: "es_CO",
    alternateLocale: ["en_US"],
    url: "https://ugccolombia.co",
    siteName: "UGC Colombia",
    title: "Agencia UGC en Colombia para Marcas LATAM y US Hispanic",
    description:
      "La única agencia UGC latina con tecnología propia que entrega contenido al estándar de agencias USA. Creadores verificados, estrategia integrada, procesos auditables.",
    images: [
      {
        url: "/og/default.png",
        width: 1200,
        height: 630,
        alt: "UGC Colombia — Agencia boutique UGC LATAM",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Agencia UGC en Colombia para Marcas LATAM y US Hispanic",
    description:
      "Producimos 20–60 videos UGC al mes para marcas DTC, e-commerce y SaaS. Estándar USA, talento colombiano, tecnología propia.",
    images: ["/og/default.png"],
    creator: "@agenciaugccolombia",
  },
  verification: {
    // Agregar tokens de Google Search Console y Bing Webmaster aquí
    // google: "xxxx",
    // other: { "msvalidate.01": "xxxx" },
  },
};

// ─── Schema JSON-LD — Organization global ──────────────────────────────────
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "UGC Colombia",
  alternateName: "Agencia UGC Colombia",
  url: "https://ugccolombia.co",
  logo: "https://ugccolombia.co/logo.png",
  founder: {
    "@type": "Person",
    name: "Alexander Cast",
    sameAs: [
      "https://www.linkedin.com/in/alexandercast",
      "https://instagram.com/infiny",
    ],
  },
  foundingDate: "2024",
  areaServed: ["CO", "MX", "AR", "CL", "PE", "US"],
  sameAs: [
    "https://instagram.com/agenciaugccolombia",
    "https://tiktok.com/@agenciaugccolombia",
    "https://linkedin.com/company/ugc-colombia",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    email: "founder@kreoon.com",
    contactType: "sales",
    availableLanguage: ["Spanish", "English"],
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "UGC Colombia",
  url: "https://ugccolombia.co",
  potentialAction: {
    "@type": "SearchAction",
    target: "https://ugccolombia.co/blog?q={search_term_string}",
    "query-input": "required name=search_term_string",
  },
};

// ─── Root Layout ────────────────────────────────────────────────────────────
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="es"
      className={`${fraunces.variable} ${geistSans.variable} ${geistMono.variable}`}
    >
      <head>
        {/* Schema Organization + WebSite — inyectados en todas las páginas */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema),
          }}
        />
        {/* Analytics placeholder — activar con NEXT_PUBLIC_GA4_ID en prod */}
        {process.env.NEXT_PUBLIC_GA4_ID && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA4_ID}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${process.env.NEXT_PUBLIC_GA4_ID}');
                `,
              }}
            />
          </>
        )}
      </head>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
