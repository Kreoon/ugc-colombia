import { templates, universalRules } from "../../_data/templates";
import { SectionTitle } from "@/components/admin/marca/SectionTitle";
import { TemplateCard, UniversalRulesTable } from "@/components/admin/marca/TemplateCard";

export default function Plantillas() {
  return (
    <div className="space-y-12">
      <section>
        <SectionTitle
          eyebrow="Plantillas por formato"
          title="Specs por plataforma."
          desc="Dimensiones, ratios y estructura base para cada canal. Cada pieza respeta paleta, tipografía y reglas universales."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {templates.map((t) => (
            <TemplateCard key={t.id} template={t} />
          ))}
        </div>
      </section>

      <section>
        <SectionTitle eyebrow="Reglas universales" title="Aplican a todo formato." />
        <UniversalRulesTable rules={universalRules} />
      </section>
    </div>
  );
}
