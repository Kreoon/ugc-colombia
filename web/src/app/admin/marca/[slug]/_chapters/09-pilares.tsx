import { pillars, pillarsRule } from "../../_data/pillars";
import { SectionTitle } from "@/components/admin/marca/SectionTitle";
import { PillarCard } from "@/components/admin/marca/PillarCard";

export default function Pilares() {
  const total = pillars.reduce((sum, p) => sum + p.percent, 0);

  return (
    <div className="space-y-12">
      <section>
        <SectionTitle
          eyebrow="5 pilares"
          title="Todo lo que publicamos."
          desc="Cada pieza que sale cae en uno de estos 5 pilares. Cada uno con objetivo, voz y KPI propios."
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {pillars.map((p) => (
            <PillarCard key={p.number} pillar={p} />
          ))}
        </div>
      </section>

      <section>
        <div className="rounded-2xl border border-brand-yellow/40 bg-brand-yellow/5 p-8 text-center">
          <div className="text-[10px] font-semibold tracking-[0.2em] uppercase text-brand-gold mb-3">
            · Total semanal
          </div>
          <div className="font-display uppercase text-6xl sm:text-7xl mb-3">
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(90deg, #F9B334 0%, #D4A017 50%, #F9B334 100%)",
              }}
            >
              {total}%
            </span>
          </div>
          <p className="text-brand-gray max-w-2xl mx-auto leading-relaxed">{pillarsRule}</p>
        </div>
      </section>
    </div>
  );
}
