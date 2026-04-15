import { weeklyGrid, platformCadence, scheduleSummary } from "../../_data/schedule";
import { SectionTitle } from "@/components/admin/marca/SectionTitle";
import { WeeklyGrid, PlatformCadenceTable } from "@/components/admin/marca/WeeklyGrid";

export default function Parrilla() {
  return (
    <div className="space-y-12">
      <section>
        <SectionTitle
          eyebrow="Parrilla semanal"
          title="Lunes a domingo."
          desc={scheduleSummary}
        />
        <WeeklyGrid days={weeklyGrid} />
      </section>

      <section>
        <SectionTitle eyebrow="Cadencia" title="Rol por plataforma." />
        <PlatformCadenceTable items={platformCadence} />
      </section>
    </div>
  );
}
