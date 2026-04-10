import type { Metadata } from "next";
import { Navbar } from "@/components/home/Navbar";
import { Footer } from "@/components/home/Footer";
import { PreciosHero } from "@/components/precios/PreciosHero";
import { PreciosPlans } from "@/components/precios/PreciosPlans";
import { PreciosComparison } from "@/components/precios/PreciosComparison";
import { PreciosCalculator } from "@/components/precios/PreciosCalculator";
import { PreciosTestimonial } from "@/components/precios/PreciosTestimonial";
import { PreciosFAQ } from "@/components/precios/PreciosFAQ";
import { PreciosCTA } from "@/components/precios/PreciosCTA";

export const metadata: Metadata = {
  title: "Precios UGC | UGC Colombia × KREOON",
  description:
    "4 paquetes UGC con precios claros: Inicio $400, Crecimiento $700, Escala $1.500 y A la Medida. Todos incluyen estrategia, creadores verificados, edición profesional y licencia de publicidad 12 meses.",
  openGraph: {
    title: "Precios UGC | 4 paquetes por etapa",
    description:
      "Invierte una vez, vende durante meses. Compara los 4 paquetes UGC, calcula tu ahorro y elige el que calza con tu negocio.",
    type: "website",
  },
};

export default function PreciosPage() {
  return (
    <>
      <a href="#main-content" className="skip-link">
        Saltar al contenido principal
      </a>
      <Navbar />
      <main id="main-content" className="relative bg-brand-black text-white">
        <PreciosHero />
        <PreciosPlans />
        <PreciosComparison />
        <PreciosCalculator />
        <PreciosTestimonial />
        <PreciosFAQ />
        <PreciosCTA />
      </main>
      <Footer />
    </>
  );
}
