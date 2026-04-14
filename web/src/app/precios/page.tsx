import { createMetadata } from "@/lib/seo/metadata";
import { getDefaultJsonLd } from "@/lib/seo/page-config";
import { PRECIOS_FAQS } from "@/lib/data/precios-faq";
import { PageShell } from "@/components/PageShell";
import { PreciosHero } from "@/components/precios/PreciosHero";
import { PreciosPlans } from "@/components/precios/PreciosPlans";
import { PreciosComparison } from "@/components/precios/PreciosComparison";
import { PreciosCalculator } from "@/components/precios/PreciosCalculator";
import { PreciosTestimonial } from "@/components/precios/PreciosTestimonial";
import { PreciosFAQ } from "@/components/precios/PreciosFAQ";
import { PreciosCTA } from "@/components/precios/PreciosCTA";

export const metadata = createMetadata({
  title: "Precios UGC",
  description:
    "4 paquetes UGC con precios claros: Inicio desde $400 USD ($1.590.000 COP), Crecimiento, Escala y A la Medida. Precios detectan tu país automáticamente. Todos incluyen estrategia, creadores verificados, edición profesional y licencia de publicidad 12 meses.",
  path: "/precios",
  keywords: [
    "precios UGC",
    "paquetes UGC Colombia",
    "costos contenido UGC",
    "planes agencia UGC",
  ],
});

const jsonLd = getDefaultJsonLd("pricing", {
  name: "Precios UGC — UGC Colombia",
  description:
    "4 paquetes UGC con precios claros. Invierte una vez, vende durante meses.",
  url: "/precios",
  faqs: PRECIOS_FAQS,
  products: [
    {
      name: "UGC Inicio",
      description:
        "5 videos UGC/mes, 1 creador, estrategia básica, edición profesional, licencia de publicidad 12 meses.",
      price: 400,
    },
    {
      name: "UGC Crecimiento",
      description:
        "10 videos UGC/mes, 2 creadores, estrategia avanzada, A/B testing, edición profesional, licencia de publicidad 12 meses.",
      price: 700,
    },
    {
      name: "UGC Escala",
      description:
        "20 videos UGC/mes, 3+ creadores, estrategia full, dirección creativa, edición premium, licencia de publicidad 12 meses.",
      price: 1500,
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
      <PreciosComparison />
      <PreciosCalculator />
      <PreciosTestimonial />
      <PreciosFAQ />
      <PreciosCTA />
    </PageShell>
  );
}
