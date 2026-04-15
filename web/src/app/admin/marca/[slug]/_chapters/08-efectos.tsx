import { effects, transitions } from "../../_data/effects";
import { SectionTitle } from "@/components/admin/marca/SectionTitle";
import { EffectCard, TransitionsTable } from "@/components/admin/marca/EffectShowcase";

export default function Efectos() {
  return (
    <div className="space-y-12">
      <section>
        <SectionTitle
          eyebrow="Movimiento"
          title="La marca se siente viva."
          desc="Motion sutil, glows doradas, transiciones de 600–700ms con easing [0.22, 1, 0.36, 1]."
        />
        <div className="grid md:grid-cols-2 gap-4">
          {effects.map((e) => (
            <EffectCard key={e.id} effect={e} />
          ))}
        </div>
      </section>

      <section>
        <SectionTitle eyebrow="Transiciones" title="Tabla de referencia." />
        <TransitionsTable items={transitions} />
      </section>
    </div>
  );
}
