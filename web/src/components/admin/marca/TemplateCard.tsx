import type { Template } from "@/app/admin/marca/_data/templates";

const bgMap: Record<Template["preview"]["bg"], string> = {
  black: "#000000",
  yellow: "#F9B334",
  cream: "#F5F5F0",
  graphite: "#3D3D3C",
};

const accentMap: Record<Template["preview"]["accent"], string> = {
  yellow: "#F9B334",
  gold: "#D4A017",
  white: "#FFFFFF",
  black: "#000000",
};

export function TemplateCard({ template }: { template: Template }) {
  const bg = bgMap[template.preview.bg];
  const accent = accentMap[template.preview.accent];
  const textColor = template.preview.bg === "yellow" || template.preview.bg === "cream" ? "#000" : "#fff";

  return (
    <div className="rounded-2xl border border-brand-gold/15 p-6 bg-white/[0.02]">
      <div className="flex items-center justify-center mb-5">
        <div
          className="rounded-lg overflow-hidden shadow-lg flex flex-col justify-between p-4 relative"
          style={{
            width: template.preview.w,
            height: template.preview.h,
            background: bg,
            maxWidth: "100%",
          }}
        >
          <div className="absolute inset-0 border-2 border-dashed border-white/10 rounded-lg m-2 pointer-events-none" />
          <div
            className="text-[8px] font-semibold tracking-[0.2em] uppercase relative"
            style={{ color: accent }}
          >
            · {template.platform}
          </div>
          <div
            className="font-display uppercase leading-tight relative"
            style={{ color: textColor, fontSize: template.preview.w / 14 }}
          >
            {template.sampleHeadline}
          </div>
          {template.sampleSubcopy && (
            <div
              className="text-[9px] font-semibold uppercase tracking-wider relative"
              style={{ color: accent }}
            >
              {template.sampleSubcopy}
            </div>
          )}
        </div>
      </div>

      <div className="text-[10px] font-semibold tracking-[0.2em] uppercase text-brand-gold mb-1">
        · {template.platform}
      </div>
      <div className="font-display uppercase text-white text-xl mb-3">
        {template.name}
      </div>
      <dl className="text-xs space-y-1">
        <div className="flex justify-between">
          <dt className="text-brand-gray">Tamaño</dt>
          <dd className="text-white font-mono">{template.size}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-brand-gray">Ratio</dt>
          <dd className="text-white font-mono">{template.ratio}</dd>
        </div>
      </dl>
    </div>
  );
}

export function UniversalRulesTable({
  rules,
}: {
  rules: { element: string; rule: string }[];
}) {
  return (
    <div className="rounded-2xl border border-brand-gold/15 overflow-hidden bg-white/[0.02]">
      <div className="px-6 py-4 border-b border-brand-gold/15">
        <div className="text-[10px] font-semibold tracking-[0.2em] uppercase text-brand-gold">
          · Reglas universales
        </div>
      </div>
      <table className="w-full text-sm">
        <tbody>
          {rules.map((row) => (
            <tr key={row.element} className="border-t border-brand-gold/10 first:border-t-0">
              <td className="px-6 py-3 text-white font-semibold uppercase text-xs tracking-wide w-1/3">
                {row.element}
              </td>
              <td className="px-6 py-3 text-brand-gray">{row.rule}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
