import { createMetadata } from "@/lib/seo/metadata";
import { getDefaultJsonLd } from "@/lib/seo/page-config";
import { PageShell } from "@/components/PageShell";
import { CasosHero } from "@/components/casos/CasosHero";
import { DoloresList } from "@/components/casos/DolorBlock";
import { PorEsoExistimos } from "@/components/casos/PorEsoExistimos";
import { CasosCTAFinal } from "@/components/casos/CasosCTAFinal";

export const metadata = createMetadata({
  title: "Casos & Dolores Reales",
  description:
    "Por qué crear contenido cada semana te está matando. 7 dolores reales del marketing UGC, ads y contratación de creadores — y cómo los resolvemos en UGC Colombia.",
  path: "/casos",
  keywords: [
    "casos UGC",
    "problemas marketing contenido",
    "dolor creación de contenido",
    "soluciones UGC LATAM",
  ],
});

const jsonLd = getDefaultJsonLd("cases", {
  name: "Casos & Dolores Reales — UGC Colombia",
  description:
    "Dolores reales de creación de contenido, ads, métricas, fatiga creativa y contratación de creadores.",
  url: "/casos",
});

export default function CasosPage() {
  return (
    <PageShell
      breadcrumbs={[
        { label: "Inicio", href: "/" },
        { label: "Casos", href: "/casos" },
      ]}
      jsonLd={jsonLd}
    >
      <CasosHero />
      <DoloresList />
      <PorEsoExistimos />
      <CasosCTAFinal />
    </PageShell>
  );
}
