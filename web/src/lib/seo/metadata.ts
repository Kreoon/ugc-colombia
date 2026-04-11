import type { Metadata } from "next";
import { SITE_URL, BRAND } from "@/lib/tracking/constants";

const BASE_KEYWORDS = [
  "UGC Colombia",
  "agencia UGC",
  "contenido UGC",
  "creadores de contenido",
  "marketing de contenido",
  "LATAM",
  "ventas en vivo",
  "contenido real",
];

export interface PageMetadataOptions {
  title: string;
  description: string;
  path: string;
  noIndex?: boolean;
  ogImage?: string;
  ogType?: "website" | "article";
  keywords?: string[];
}

export function createMetadata(options: PageMetadataOptions): Metadata {
  const {
    title,
    description,
    path,
    noIndex = false,
    ogImage = "/opengraph-image",
    ogType = "website",
    keywords = [],
  } = options;

  const fullTitle =
    path === "/" ? `${BRAND.name} — ${title}` : `${title} | ${BRAND.name}`;
  const canonicalUrl = `${SITE_URL}${path}`;

  return {
    title: fullTitle,
    description,
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: fullTitle,
      description,
      url: canonicalUrl,
      siteName: BRAND.name,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
      locale: "es_CO",
      type: ogType,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [ogImage],
    },
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: { index: true, follow: true },
        },
    keywords: [...BASE_KEYWORDS, ...keywords],
  };
}
