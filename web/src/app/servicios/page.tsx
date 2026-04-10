import type { Metadata } from "next";
import { Navbar } from "@/components/home/Navbar";
import { Footer } from "@/components/home/Footer";
import { ServiciosHero } from "@/components/servicios/ServiciosHero";
import { ServiciosDetalle } from "@/components/servicios/ServiciosDetalle";
import { ServiciosFAQ } from "@/components/servicios/ServiciosFAQ";

export const metadata: Metadata = {
  title: "Servicios UGC | UGC Colombia × KREOON",
  description:
    "Producción UGC, estrategia, audiovisual premium, consultoría, creadores, IA + automatización + dev a medida, contenido generativo, diseño web y landing pages. Nueve líneas integradas de una agencia 360 desde Colombia.",
  openGraph: {
    title: "Servicios | UGC Colombia",
    description:
      "Nueve líneas de servicio integradas: UGC, estrategia, audiovisual, consultoría, creadores, IA + dev a medida, contenido IA, diseño web y landing pages.",
    type: "website",
  },
};

export default function ServiciosPage() {
  return (
    <>
      <a href="#main-content" className="skip-link">
        Saltar al contenido principal
      </a>
      <Navbar />
      <main id="main-content" className="relative bg-brand-black text-white">
        <ServiciosHero />
        <ServiciosDetalle />
        <ServiciosFAQ />
      </main>
      <Footer />
    </>
  );
}
