import type { Metadata } from "next";
import { Navbar } from "@/components/home/Navbar";
import { Footer } from "@/components/home/Footer";
import { CasosHero } from "@/components/casos/CasosHero";
import { DoloresList } from "@/components/casos/DolorBlock";
import { PorEsoExistimos } from "@/components/casos/PorEsoExistimos";
import { CasosCTAFinal } from "@/components/casos/CasosCTAFinal";

export const metadata: Metadata = {
  title: "Casos & Dolores Reales | UGC Colombia × KREOON",
  description:
    "Por qué crear contenido cada semana te está matando. 7 dolores reales del marketing UGC, ads y contratación de creadores — y cómo los resolvemos en UGC Colombia.",
  openGraph: {
    title: "Por qué nos contratan — UGC Colombia",
    description:
      "Dolores reales de creación de contenido, ads, métricas, fatiga creativa y contratación de creadores. Lee y aplica.",
    type: "website",
  },
};

export default function CasosPage() {
  return (
    <>
      <a href="#main-content" className="skip-link">
        Saltar al contenido principal
      </a>
      <Navbar />
      <main id="main-content" className="relative bg-brand-black text-white">
        <CasosHero />
        <DoloresList />
        <PorEsoExistimos />
        <CasosCTAFinal />
      </main>
      <Footer />
    </>
  );
}
