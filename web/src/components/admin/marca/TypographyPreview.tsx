import type { TypeHierarchyEntry } from "@/app/admin/marca/_data/typography";

interface FamilyCardProps {
  name: string;
  role: string;
  desc: string;
  source: string;
  weights: number[];
  cssVar: string;
  sample: string;
  family: "display" | "body";
}

export function FamilyCard({
  name,
  role,
  desc,
  source,
  weights,
  cssVar,
  sample,
  family,
}: FamilyCardProps) {
  return (
    <div className="rounded-2xl border border-brand-gold/15 p-6 bg-white/[0.02]">
      <div className="text-[10px] font-semibold tracking-[0.2em] uppercase text-brand-gold mb-2">
        · {role}
      </div>
      <div
        className={`${
          family === "display" ? "font-display uppercase text-5xl" : "font-sans text-2xl"
        } text-white mb-4`}
      >
        {name}
      </div>
      <p className="text-brand-gray text-sm leading-relaxed mb-4">{desc}</p>
      <div className="flex items-center gap-3 text-xs text-brand-gray mb-4">
        <span className="font-mono text-brand-yellow">{cssVar}</span>
        <span>·</span>
        <span>{source}</span>
        <span>·</span>
        <span>weights {weights.join("–")}</span>
      </div>
      <div
        className={`${
          family === "display" ? "font-display uppercase text-3xl" : "font-sans text-base"
        } text-white border-t border-brand-gold/10 pt-4`}
      >
        {sample}
      </div>
    </div>
  );
}

export function HierarchyRow({ entry }: { entry: TypeHierarchyEntry }) {
  const fontClass = entry.family === "Anton" ? "font-display" : "font-sans";
  const caseClass = entry.transform === "uppercase" ? "uppercase" : "";

  return (
    <div className="rounded-2xl border border-brand-gold/15 p-6 bg-white/[0.02]">
      <div className="text-[10px] font-semibold tracking-[0.2em] uppercase text-brand-gold mb-3">
        · {entry.level}
      </div>

      <div
        className={`${fontClass} ${caseClass} text-white mb-4`}
        style={{
          fontWeight: entry.weight,
          fontSize:
            entry.level.includes("Hero") || entry.level.includes("H2")
              ? "clamp(2rem, 5vw, 4rem)"
              : entry.level.includes("H3")
              ? "1.25rem"
              : entry.level.includes("Label")
              ? "0.75rem"
              : "1rem",
          lineHeight: entry.leading ?? "1.2",
          letterSpacing: entry.level.includes("Label") ? "0.2em" : "normal",
        }}
      >
        {entry.sample}
      </div>

      <dl className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs pt-4 border-t border-brand-gold/10">
        <div>
          <dt className="text-brand-gray mb-0.5">Familia</dt>
          <dd className="text-white font-mono">{entry.family}</dd>
        </div>
        <div>
          <dt className="text-brand-gray mb-0.5">Peso</dt>
          <dd className="text-white font-mono">{entry.weight}</dd>
        </div>
        <div>
          <dt className="text-brand-gray mb-0.5">Tamaño</dt>
          <dd className="text-white font-mono break-all">{entry.size}</dd>
        </div>
        {entry.leading && (
          <div>
            <dt className="text-brand-gray mb-0.5">Leading</dt>
            <dd className="text-white font-mono">{entry.leading}</dd>
          </div>
        )}
        {entry.tracking && (
          <div className="col-span-2 sm:col-span-4">
            <dt className="text-brand-gray mb-0.5">Tracking</dt>
            <dd className="text-white font-mono">{entry.tracking}</dd>
          </div>
        )}
      </dl>

      <p className="text-sm text-brand-gray mt-4 leading-relaxed">{entry.description}</p>
    </div>
  );
}
