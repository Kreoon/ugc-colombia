import type { HeadlineFormula } from "@/app/admin/marca/_data/voice";

export function HeadlineFormulas({ formulas }: { formulas: HeadlineFormula[] }) {
  return (
    <div className="space-y-4">
      {formulas.map((f) => (
        <div
          key={f.pattern}
          className="rounded-2xl border border-brand-gold/15 p-6 bg-white/[0.02]"
        >
          <div className="text-[10px] font-semibold tracking-[0.2em] uppercase text-brand-gold mb-3">
            · {f.pattern}
          </div>
          <div className="font-display uppercase text-white text-2xl sm:text-3xl leading-tight">
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(90deg, #F9B334 0%, #D4A017 50%, #F9B334 100%)",
              }}
            >
              {f.example}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

export function CopyRulesTable({
  rules,
}: {
  rules: { element: string; limit: string }[];
}) {
  return (
    <div className="rounded-2xl border border-brand-gold/15 overflow-hidden bg-white/[0.02]">
      <div className="px-6 py-4 border-b border-brand-gold/15">
        <div className="text-[10px] font-semibold tracking-[0.2em] uppercase text-brand-gold">
          · Reglas de copy
        </div>
      </div>
      <ul>
        {rules.map((r) => (
          <li
            key={r.element}
            className="px-6 py-3 flex items-center justify-between border-t border-brand-gold/10 first:border-t-0 text-sm"
          >
            <span className="font-semibold uppercase tracking-wide text-white">
              {r.element}
            </span>
            <span className="font-mono text-brand-yellow">{r.limit}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
