import { typography, hierarchy } from "../../_data/typography";
import { SectionTitle } from "@/components/admin/marca/SectionTitle";
import { FamilyCard, HierarchyRow } from "@/components/admin/marca/TypographyPreview";

export default function Tipografia() {
  return (
    <div className="space-y-12">
      <section>
        <SectionTitle
          eyebrow="Dos familias"
          title="Un ritmo."
          desc="Anton para impacto, Inter para claridad. Nunca mezclar más de 2 tipografías en una pieza."
        />
        <div className="grid md:grid-cols-2 gap-4">
          <FamilyCard family="display" {...typography.display} />
          <FamilyCard family="body" {...typography.body} />
        </div>
      </section>

      <section>
        <SectionTitle eyebrow="Jerarquía" title="Escalera tipográfica." />
        <div className="space-y-4">
          {hierarchy.map((entry) => (
            <HierarchyRow key={entry.level} entry={entry} />
          ))}
        </div>
      </section>
    </div>
  );
}
