import Link from "next/link";
import { ArrowRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// Social proof bar — números del funnel-maestro.md
const socialProofItems = [
  { value: "+120", label: "marcas activas" },
  { value: "3.400+", label: "videos producidos" },
  { value: "8", label: "países" },
  { value: "92%", label: "retención mensual" },
];

export function Hero() {
  return (
    <section
      className="relative min-h-screen bg-brand-black overflow-hidden"
      aria-label="Hero — UGC Colombia"
    >
      {/* Gradiente decorativo dorado */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
      >
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-gold/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/4" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand-gold/5 rounded-full blur-3xl -translate-x-1/2 translate-y-1/4" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8 pt-32 pb-20 flex flex-col items-start justify-center min-h-screen">
        {/* Badge superior */}
        <div className="mb-8">
          <Badge variant="gold" className="text-sm px-4 py-1.5">
            UGC latino con estándar USA
          </Badge>
        </div>

        {/* Headline principal — H1 con keyword target */}
        <h1 className="font-serif text-display-xl lg:text-display-2xl text-brand-cream max-w-4xl leading-[1.05] mb-8">
          Videos UGC que venden.{" "}
          <span className="text-brand-gold">Hechos por creators</span>{" "}
          reales de LATAM.
        </h1>

        {/* Subheadline */}
        <p className="font-sans text-xl text-zinc-400 max-w-2xl leading-relaxed mb-12">
          Producimos entre 20 y 60 videos UGC al mes para marcas de e-commerce,
          SaaS y DTC. Sin castings eternos. Sin briefs confusos. Sin sorpresas
          en facturación.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 mb-20">
          <Button variant="gold" size="lg" asChild>
            <Link href="/discovery-call">
              Agendar Discovery Call
              <ArrowRight className="ml-1 h-5 w-5" />
            </Link>
          </Button>
          <Button variant="outline-cream" size="lg" asChild>
            <Link href="/recursos/kit-ugc-2026">
              <Play className="mr-1 h-5 w-5" />
              Descargar Kit UGC 2026 gratis
            </Link>
          </Button>
        </div>

        {/* Social proof bar */}
        <div
          className="w-full border-t border-zinc-800 pt-10"
          aria-label="Cifras clave de UGC Colombia"
        >
          <dl className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {socialProofItems.map((item) => (
              <div key={item.label} className="flex flex-col">
                <dt className="font-serif text-3xl font-semibold text-brand-gold">
                  {item.value}
                </dt>
                <dd className="font-sans text-sm text-zinc-500 mt-1">
                  {item.label}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
