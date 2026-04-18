import { createMetadata } from "@/lib/seo/metadata";
import { getDefaultJsonLd } from "@/lib/seo/page-config";
import { PRECIOS_FAQS } from "@/lib/data/precios-faq";
import { PageShell } from "@/components/PageShell";
import { PreciosHero } from "@/components/precios/PreciosHero";
import { PreciosPlans } from "@/components/precios/PreciosPlans";
import { GuaranteeSection } from "@/components/precios/GuaranteeSection";
import { PreciosComparison } from "@/components/precios/PreciosComparison";
import { PreciosCalculator } from "@/components/precios/PreciosCalculator";
import { PreciosTestimonial } from "@/components/precios/PreciosTestimonial";
import { PreciosFAQ } from "@/components/precios/PreciosFAQ";
import { PreciosCTA } from "@/components/precios/PreciosCTA";

export const metadata = createMetadata({
  title: "Precios UGC",
  description:
    "Paquetes UGC con garantía de performance: Inicio desde $590 USD ($1.590.000 COP), Crecimiento, Escala y A la Medida. Si tus videos no rinden en publicidad pagada, los reemplazamos. Detección automática de moneda por país.",
  path: "/precios",
  keywords: [
    "precios UGC",
    "paquetes UGC Colombia",
    "costos contenido UGC",
    "planes agencia UGC",
    "garantía UGC",
  ],
});

const jsonLd = getDefaultJsonLd("pricing", {
  name: "Precios UGC — UGC Colombia",
  description:
    "Paquetes UGC con garantía de performance. Si tus videos no logran CTR ≥ 1.5% y Hook Rate ≥ 25% en anuncios pagados, los reemplazamos.",
  url: "/precios",
  faqs: PRECIOS_FAQS,
  products: [
    {
      name: "UGC Inicio",
      description:
        "6 videos UGC/mes, hasta 2 creadores, investigación básica, edición profesional, garantía de performance, licencia de publicidad 12 meses.",
      price: 590,
    },
    {
      name: "UGC Crecimiento",
      description:
        "10 videos UGC/mes, 3 variantes por video, hasta 5 creadores, investigación V2, parrilla mensual, garantía de performance, licencia de publicidad 12 meses.",
      price: 890,
    },
    {
      name: "UGC Escala",
      description:
        "30 videos UGC/mes, 3 variantes por video, hasta 10 creadores, investigación V3 Plus + scraping de competidores, estrategia omnicanal, garantía de performance, licencia de publicidad 12 meses.",
      price: 1890,
    },
  ],
});

export default function PreciosPage() {
  return (
    <PageShell
      breadcrumbs={[
        { label: "Inicio", href: "/" },
        { label: "Precios", href: "/precios" },
      ]}
      jsonLd={jsonLd}
    >
      <PreciosHero />
      <PreciosPlans />
      <GuaranteeSection />
      <PreciosComparison />
      <PreciosCalculator />
      <PreciosTestimonial />
      <PreciosFAQ />
      <PreciosCTA />
    </PageShell>
  );
}
