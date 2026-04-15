import {
  gridSpec,
  spacingScale,
  radiiScale,
  radiiRule,
  shadowsList,
  opacityOverlays,
} from "../../_data/system";
import { SectionTitle } from "@/components/admin/marca/SectionTitle";
import { SpacingScale } from "@/components/admin/marca/SpacingScale";
import { RadiusGrid } from "@/components/admin/marca/RadiusGrid";
import { OpacityTable } from "@/components/admin/marca/OpacityTable";

export default function Sistema() {
  return (
    <div className="space-y-12">
      <section>
        <SectionTitle
          eyebrow="Grid"
          title="12 columnas, responsive."
          desc={`Container: ${gridSpec.container} · Gap: ${gridSpec.gap} · Padding secciones: ${gridSpec.sectionPadding}`}
        />
        <div className="rounded-2xl border border-brand-gold/15 p-6 bg-white/[0.02]">
          <div className="grid grid-cols-12 gap-2">
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={i}
                className="h-20 bg-brand-yellow/10 border border-brand-yellow/30 rounded flex items-center justify-center"
              >
                <span className="text-[10px] font-mono text-brand-yellow">{i + 1}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <SectionTitle eyebrow="Spacing" title="Escala completa." />
        <SpacingScale items={spacingScale} />
      </section>

      <section>
        <SectionTitle eyebrow="Border radius" title="Curvaturas del sistema." />
        <RadiusGrid items={radiiScale} rule={radiiRule} />
      </section>

      <section>
        <SectionTitle eyebrow="Sombras y glows" title="Profundidad editorial." />
        <div className="rounded-2xl border border-brand-gold/15 overflow-hidden bg-white/[0.02]">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-[10px] uppercase tracking-[0.15em] text-brand-gray bg-white/[0.02]">
                <th className="text-left px-6 py-3 font-semibold">Nombre</th>
                <th className="text-left px-6 py-3 font-semibold">Valor</th>
                <th className="text-left px-6 py-3 font-semibold">Uso</th>
              </tr>
            </thead>
            <tbody>
              {shadowsList.map((row) => (
                <tr key={row.name} className="border-t border-brand-gold/10">
                  <td className="px-6 py-3 text-white font-semibold">{row.name}</td>
                  <td className="px-6 py-3 font-mono text-brand-yellow">{row.value}</td>
                  <td className="px-6 py-3 text-brand-gray">{row.use}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <SectionTitle eyebrow="Overlays" title="Opacidad en producción." />
        <OpacityTable items={opacityOverlays} />
      </section>
    </div>
  );
}
