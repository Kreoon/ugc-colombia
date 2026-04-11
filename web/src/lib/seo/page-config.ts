import {
  organizationSchema,
  localBusinessSchema,
  webPageSchema,
  faqPageSchema,
  productOfferSchema,
} from "./json-ld";
import type { FAQItem } from "@/lib/data/home-faq";

export type PageType =
  | "home"
  | "service"
  | "pricing"
  | "cases"
  | "auth"
  | "generic";

export function getDefaultJsonLd(
  pageType: PageType,
  options: {
    name: string;
    description: string;
    url: string;
    faqs?: FAQItem[];
    products?: { name: string; description: string; price: number }[];
  },
): Record<string, unknown>[] {
  const schemas: Record<string, unknown>[] = [];

  // Todas las páginas públicas tienen WebPage
  if (pageType !== "auth") {
    schemas.push(
      webPageSchema({
        name: options.name,
        description: options.description,
        url: options.url,
      }),
    );
  }

  // Home incluye Organization + LocalBusiness
  if (pageType === "home") {
    schemas.push(organizationSchema());
    schemas.push(localBusinessSchema());
  }

  // FAQs si existen
  if (options.faqs?.length) {
    schemas.push(
      faqPageSchema(
        options.faqs.map((f) => ({ question: f.question, answer: f.answer })),
      ),
    );
  }

  // Productos para pricing
  if (options.products?.length) {
    for (const product of options.products) {
      schemas.push(productOfferSchema(product));
    }
  }

  return schemas;
}
