import { SITE_URL, BRAND } from "@/lib/tracking/constants";

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: BRAND.name,
    url: BRAND.url,
    logo: BRAND.logo,
    sameAs: [BRAND.instagram, BRAND.tiktok],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      availableLanguage: ["Spanish"],
    },
  };
}

export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: BRAND.name,
    url: BRAND.url,
    logo: BRAND.logo,
    image: BRAND.logo,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Bogotá",
      addressCountry: "CO",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 4.711,
      longitude: -74.0721,
    },
    sameAs: [BRAND.instagram, BRAND.tiktok],
    priceRange: "$$",
  };
}

export function webPageSchema(options: {
  name: string;
  description: string;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: options.name,
    description: options.description,
    url: `${SITE_URL}${options.url}`,
    isPartOf: {
      "@type": "WebSite",
      name: BRAND.name,
      url: BRAND.url,
    },
  };
}

export function faqPageSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function productOfferSchema(plan: {
  name: string;
  description: string;
  price: number;
  currency?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: plan.name,
    description: plan.description,
    brand: { "@type": "Organization", name: BRAND.name },
    offers: {
      "@type": "Offer",
      price: plan.price,
      priceCurrency: plan.currency ?? "USD",
      availability: "https://schema.org/InStock",
      url: `${SITE_URL}/precios`,
    },
  };
}

export function videoObjectSchema(options: {
  name: string;
  description: string;
  thumbnailUrl: string;
  contentUrl?: string;
  uploadDate?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: options.name,
    description: options.description,
    thumbnailUrl: options.thumbnailUrl,
    uploadDate: options.uploadDate ?? new Date().toISOString(),
    ...(options.contentUrl && { contentUrl: options.contentUrl }),
  };
}

export function breadcrumbSchema(
  items: { name: string; url: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.url}`,
    })),
  };
}
