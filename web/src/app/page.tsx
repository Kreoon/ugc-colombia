import { Suspense } from "react";
import { createMetadata } from "@/lib/seo/metadata";
import { getDefaultJsonLd } from "@/lib/seo/page-config";
import { HOME_FAQS } from "@/lib/data/home-faq";
import { PageShell } from "@/components/PageShell";
import { Hero } from "@/components/home/Hero";
import { SocialProofBar } from "@/components/home/SocialProofBar";
import { Marcas } from "@/components/home/Marcas";
import { Problema } from "@/components/home/Problema";
import { Solucion } from "@/components/home/Solucion";
import { Servicios } from "@/components/home/Servicios";
import { VideoSamples } from "@/components/home/VideoSamples";
import { VideoSamplesSkeleton } from "@/components/home/VideoSamplesSkeleton";
import { Casos } from "@/components/home/Casos";
import { Aliados } from "@/components/home/Aliados";
import { Pricing } from "@/components/home/Pricing";
import { VideoTestimonios } from "@/components/home/VideoTestimonios";
import { FAQ } from "@/components/home/FAQ";
import { CTAFinal } from "@/components/home/CTAFinal";

export const metadata = createMetadata({
  title: "Contenido real, resultados reales",
  description:
    "La agencia UGC que está cambiando el juego en LATAM. Contenido con humanos, potenciado por IA. Marcas que convierten más, creadores que se vuelven pro.",
  path: "/",
  keywords: [
    "agencia UGC Colombia",
    "contenido para ads",
    "creadores UGC LATAM",
    "video marketing Colombia",
  ],
});

const jsonLd = getDefaultJsonLd("home", {
  name: "UGC Colombia — Contenido real, resultados reales",
  description:
    "La agencia UGC que está cambiando el juego en LATAM. Contenido con humanos, potenciado por IA.",
  url: "/",
  faqs: HOME_FAQS,
});

export default function HomePage() {
  return (
    <PageShell jsonLd={jsonLd}>
      <Hero />
      <SocialProofBar />
      <Marcas />
      <Problema />
      <Solucion />
      <Servicios />
      <Suspense fallback={<VideoSamplesSkeleton />}>
        <VideoSamples />
      </Suspense>
      <Casos />
      <Aliados />
      <Pricing />
      <VideoTestimonios />
      <FAQ />
      <CTAFinal />
    </PageShell>
  );
}
