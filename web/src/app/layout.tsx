import type { Metadata, Viewport } from "next";
import { Anton, Inter } from "next/font/google";
import "./globals.css";
import { PageLoader } from "@/components/PageLoader";
import { TrackingScripts } from "@/components/tracking/TrackingScripts";
import { CookieConsent } from "@/components/tracking/CookieConsent";
import { AuditProvider } from "@/components/lead-audit/AuditContext";
import { AuditModal } from "@/components/lead-audit/AuditModal";
import { UrgencyBanner } from "@/components/marketing/UrgencyBanner";
import { CurrencyProvider } from "@/components/providers/CurrencyProvider";
import { JsonLd } from "@/components/seo/JsonLd";
import { organizationSchema } from "@/lib/seo/json-ld";
import { getCurrencyFromHeaders } from "@/lib/geo/server";
import { GTM_ID } from "@/lib/tracking/constants";

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-anton",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "UGC Colombia — Contenido real, resultados reales.",
  description:
    "La agencia UGC que está cambiando el juego en LATAM. Contenido con humanos, potenciado por IA. Marcas que convierten más, creadores que se vuelven pro.",
  metadataBase: new URL("https://ugccolombia.co"),
  openGraph: {
    title: "UGC Colombia — Contenido real, resultados reales.",
    description:
      "La agencia UGC que está cambiando el juego en LATAM. Muy pronto.",
    url: "https://ugccolombia.co",
    siteName: "UGC Colombia",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "UGC Colombia — Contenido real, resultados reales.",
      },
    ],
    locale: "es_CO",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "UGC Colombia — Contenido real, resultados reales.",
    description:
      "La agencia UGC que está cambiando el juego en LATAM. Muy pronto.",
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  keywords: [
    "UGC Colombia",
    "agencia UGC",
    "contenido UGC",
    "creadores de contenido",
    "marketing de contenido",
    "LATAM",
    "ventas en vivo",
    "contenido real",
  ],
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { currency, country } = await getCurrencyFromHeaders();

  return (
    <html
      lang="es"
      className={`${anton.variable} ${inter.variable} dark`}
      suppressHydrationWarning
    >
      <head>
        {/* Google Tag Manager — debe ir lo más arriba posible en <head> */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`,
          }}
        />
        {/* Resource hints para acelerar carga del showcase (Bunny Stream + KREOON). */}
        <link rel="preconnect" href="https://iframe.mediadelivery.net" crossOrigin="" />
        <link rel="dns-prefetch" href="https://iframe.mediadelivery.net" />
        <link rel="preconnect" href="https://wjkbqcrxwsmvtxmqgiqc.functions.supabase.co" crossOrigin="" />
        <link rel="dns-prefetch" href="https://wjkbqcrxwsmvtxmqgiqc.functions.supabase.co" />
        <link rel="dns-prefetch" href="https://cdn.kreoon.com" />
        <link rel="dns-prefetch" href="https://kreoon-images.b-cdn.net" />
      </head>
      <body className="bg-brand-black text-white font-sans antialiased">
        {/* Google Tag Manager (noscript) — debe ir justo después de <body> */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <a href="#main-content" className="skip-link">
          Saltar al contenido principal
        </a>
        <UrgencyBanner />
        <PageLoader />
        <CurrencyProvider initialCurrency={currency} initialCountry={country}>
          <AuditProvider>
            {children}
            <AuditModal />
          </AuditProvider>
        </CurrencyProvider>
        <TrackingScripts />
        <CookieConsent />
        <JsonLd data={organizationSchema()} />
      </body>
    </html>
  );
}
