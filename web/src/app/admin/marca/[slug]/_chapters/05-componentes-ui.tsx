import { buttons, badges, cardSpec, techStack } from "../../_data/components";
import { SectionTitle } from "@/components/admin/marca/SectionTitle";
import {
  ButtonShowcase,
  BadgeShowcase,
  CardShowcase,
} from "@/components/admin/marca/ComponentShowcase";
import { TechStackTable } from "@/components/admin/marca/TechStackTable";

export default function ComponentesUI() {
  return (
    <div className="space-y-12">
      <section>
        <SectionTitle
          eyebrow="Componentes listos"
          title="Sistema en código."
          desc="Componentes en /web/src/components/ui/ basados en shadcn/ui + Radix UI."
        />
        <ButtonShowcase buttons={buttons} />
      </section>

      <section>
        <SectionTitle eyebrow="Badges" title="Etiquetas breves." />
        <BadgeShowcase badges={badges} />
      </section>

      <section>
        <SectionTitle eyebrow="Cards" title="Border gold/15 + bg white/4." />
        <CardShowcase />
        <p className="text-sm text-brand-gray mt-4 leading-relaxed">{cardSpec.description}</p>
      </section>

      <section>
        <SectionTitle eyebrow="Stack técnico" title="Dependencias clave." />
        <TechStackTable stack={techStack} />
      </section>
    </div>
  );
}
