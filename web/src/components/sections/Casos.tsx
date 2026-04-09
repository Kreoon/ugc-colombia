import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// Casos del funnel-maestro.md — Social Proof Section
const casos = [
  {
    slug: "skincare-dtc-mexico-cpa-9-usd",
    pais: "México",
    industria: "DTC Skincare",
    resultado: "CPA: de $24 a $9 USD en 45 días",
    descripcion:
      "Marca DTC de skincare con $18K/mes de inversión en Meta. Implementamos 20 videos UGC/mes con 3 ángulos en paralelo. El resultado: escalaron de $30K a $180K/mes en ventas.",
    metricas: [
      { label: "Reducción CPA", valor: "62%" },
      { label: "Crecimiento ventas", valor: "6x" },
      { label: "Videos/mes", valor: "20" },
    ],
  },
  {
    slug: "saas-b2b-colombia-80m-views-tiktok",
    pais: "Colombia",
    industria: "SaaS B2B",
    resultado: "De 0 a 80M views en TikTok",
    descripcion:
      "SaaS B2B colombiano que necesitaba educación de mercado. UGC tutorial + screen-recording. Alcance orgánico masivo sin presupuesto de pauta inicial.",
    metricas: [
      { label: "Views orgánicos", valor: "80M+" },
      { label: "Seguidores ganados", valor: "280K" },
      { label: "Tiempo", valor: "6 meses" },
    ],
  },
  {
    slug: "ecommerce-moda-usa-hispanic-180k-mes",
    pais: "USA Hispanic",
    industria: "E-commerce Moda",
    resultado: "De $30K a $180K/mes en ventas",
    descripcion:
      "Marca de moda para el mercado hispano en USA. UGC bilingüe con creators colombianos. Autenticidad cultural que las agencias gringas no podían replicar.",
    metricas: [
      { label: "Crecimiento MRR", valor: "500%" },
      { label: "ROAS promedio", valor: "4.2x" },
      { label: "Videos producidos", valor: "180+" },
    ],
  },
];

export function Casos() {
  return (
    <section
      className="bg-brand-cream py-24 lg:py-32"
      aria-labelledby="casos-heading"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div>
            <p className="font-sans text-sm font-semibold uppercase tracking-widest text-brand-gold mb-4">
              Casos de éxito
            </p>
            <h2
              id="casos-heading"
              className="font-serif text-display-md text-brand-black leading-tight max-w-xl"
            >
              Resultados que hablan por sí solos
            </h2>
          </div>
          <Button variant="outline" asChild>
            <Link href="/casos">
              Ver todos los casos
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>

        {/* Grid de casos */}
        <div className="grid md:grid-cols-3 gap-8">
          {casos.map((caso) => (
            <article
              key={caso.slug}
              className="group rounded-2xl border border-zinc-200 bg-white overflow-hidden hover:shadow-lg transition-shadow"
            >
              {/* Header del caso */}
              <div className="bg-brand-black p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant="gold" className="text-xs">{caso.pais}</Badge>
                  <Badge variant="cream" className="text-xs">{caso.industria}</Badge>
                </div>
                <p className="font-serif text-xl font-semibold text-brand-cream leading-tight">
                  &ldquo;{caso.resultado}&rdquo;
                </p>
              </div>

              {/* Cuerpo */}
              <div className="p-6">
                <p className="font-sans text-sm text-zinc-600 leading-relaxed mb-6">
                  {caso.descripcion}
                </p>

                {/* Métricas */}
                <dl className="grid grid-cols-3 gap-3 mb-6">
                  {caso.metricas.map((metrica) => (
                    <div key={metrica.label} className="text-center">
                      <dt className="font-serif text-xl font-bold text-brand-black">
                        {metrica.valor}
                      </dt>
                      <dd className="font-sans text-xs text-zinc-500 mt-0.5">
                        {metrica.label}
                      </dd>
                    </div>
                  ))}
                </dl>

                <Link
                  href={`/casos/${caso.slug}`}
                  className="inline-flex items-center gap-1 text-sm font-medium text-brand-black hover:text-brand-gold transition-colors group-hover:gap-2"
                  aria-label={`Ver caso completo: ${caso.resultado}`}
                >
                  Ver caso completo
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
