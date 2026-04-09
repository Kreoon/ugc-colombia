import { Navbar } from "@/components/home/Navbar";
import { Hero } from "@/components/home/Hero";
import { SocialProofBar } from "@/components/home/SocialProofBar";
import { Problema } from "@/components/home/Problema";
import { Solucion } from "@/components/home/Solucion";
import { Servicios } from "@/components/home/Servicios";
import { VideoSamples } from "@/components/home/VideoSamples";
import { Casos } from "@/components/home/Casos";
import { Pricing } from "@/components/home/Pricing";
import { VideoTestimonios } from "@/components/home/VideoTestimonios";
import { FAQ } from "@/components/home/FAQ";
import { CTAFinal } from "@/components/home/CTAFinal";
import { Footer } from "@/components/home/Footer";

export default function HomePage() {
  return (
    <>
      {/* Skip link de accesibilidad */}
      <a href="#main-content" className="skip-link">
        Saltar al contenido principal
      </a>

      <Navbar />

      <main id="main-content" className="relative bg-brand-black text-white">
        <Hero />
        <SocialProofBar />
        <Problema />
        <Solucion />
        <Servicios />
        <VideoSamples />
        <Casos />
        <Pricing />
        <VideoTestimonios />
        <FAQ />
        <CTAFinal />
      </main>
      <Footer />
    </>
  );
}
