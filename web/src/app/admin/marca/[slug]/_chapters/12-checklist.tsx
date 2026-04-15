import {
  checklistContenido,
  checklistTecnico,
  reglasInnegociables,
  closingStatement,
  checklistIntro,
} from "../../_data/checklist";
import { SectionTitle } from "@/components/admin/marca/SectionTitle";
import { ChecklistBlock, ClosingStatement } from "@/components/admin/marca/ChecklistBlock";

export default function Checklist() {
  return (
    <div className="space-y-12">
      <section>
        <SectionTitle
          eyebrow="Antes de publicar"
          title="Checklist obligatorio."
          desc={checklistIntro}
        />
        <div className="grid md:grid-cols-2 gap-4">
          <ChecklistBlock title="Contenido" items={checklistContenido} />
          <ChecklistBlock title="Técnico y visual" items={checklistTecnico} />
        </div>
      </section>

      <section>
        <SectionTitle eyebrow="Jamás" title="Reglas innegociables." />
        <ChecklistBlock title="Nunca hacer" items={reglasInnegociables} variant="warning" />
      </section>

      <section>
        <ClosingStatement line1={closingStatement.line1} line2={closingStatement.line2} />
      </section>
    </div>
  );
}
