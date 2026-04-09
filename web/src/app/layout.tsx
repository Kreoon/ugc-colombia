import type { Metadata, Viewport } from "next";
import { Anton, Inter } from "next/font/google";
import "./globals.css";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${anton.variable} ${inter.variable} dark`}
      suppressHydrationWarning
    >
      <body className="bg-brand-black text-white font-sans antialiased">
        <a href="#main-content" className="skip-link">
          Saltar al contenido principal
        </a>
        {children}
        {/* Analytics: agregar aquí cuando estén disponibles las keys */}
      </body>
    </html>
  );
}
