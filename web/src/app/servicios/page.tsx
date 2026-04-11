import { createMetadata } from "@/lib/seo/metadata";
import { getDefaultJsonLd } from "@/lib/seo/page-config";
import { SERVICIOS_FAQS } from "@/lib/data/servicios-faq";
import { PageShell } from "@/components/PageShell";
import { ServiciosHero } from "@/components/servicios/ServiciosHero";
import { ServiciosDetalle } from "@/components/servicios/ServiciosDetalle";
import { ServiciosFAQ } from "@/components/servicios/ServiciosFAQ";

export const metadata = createMetadata({
  title: "Servicios UGC",
  description:
    "Producción UGC, estrategia, audiovisual premium, consultoría, creadores, IA + automatización + dev a medida, contenido generativo, diseño web y landing pages. Nueve líneas integradas de una agencia 360 desde Colombia.",
  path: "/servicios",
  keywords: [
    "servicios UGC",
    "producción audiovisual",
    "estrategia de contenido",
    "automatización IA",
    "diseño web Colombia",
  ],
});

const jsonLd = getDefaultJsonLd("service", {
  name: "Servicios UGC — UGC Colombia",
  description:
    "Nueve líneas de servicio integradas: UGC, estrategia, audiovisual, consultoría, creadores, IA + dev a medida, contenido IA, diseño web y landing pages.",
  url: "/servicios",
  faqs: SERVICIOS_FAQS,
});

export default function ServiciosPage() {
  return (
    <PageShell
      breadcrumbs={[
        { label: "Inicio", href: "/" },
        { label: "Servicios", href: "/servicios" },
      ]}
      jsonLd={jsonLd}
    >
      <ServiciosHero />
      <ServiciosDetalle />
      <ServiciosFAQ />
    </PageShell>
  );
}
