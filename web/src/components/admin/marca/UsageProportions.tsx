interface Proportion {
  name: string;
  value: number;
  color: string;
}

interface Props {
  proportions: Proportion[];
  note: string;
}

export function UsageProportions({ proportions, note }: Props) {
  const max = Math.max(...proportions.map((p) => p.value));

  return (
    <div className="rounded-2xl border border-brand-gold/15 p-6 bg-white/[0.02]">
      <div className="text-[10px] font-semibold tracking-[0.2em] uppercase text-brand-gold mb-4">
        · Proporciones de uso (frecuencia real en código)
      </div>
      <div className="space-y-3">
        {proportions.map((p) => {
          const pct = (p.value / max) * 100;
          const darkText = ["#F9B334", "#BDBCBC"].includes(p.color.toUpperCase());
          return (
            <div key={p.name} className="flex items-center gap-4">
              <div className="w-24 font-display uppercase text-white text-sm">
                {p.name}
              </div>
              <div className="flex-1 h-8 bg-white/5 rounded overflow-hidden relative">
                <div
                  className="h-full flex items-center px-3 text-xs font-bold"
                  style={{
                    width: `${pct}%`,
                    background: p.color,
                    color: darkText ? "#000" : "#fff",
                  }}
                >
                  {p.value}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <p className="text-sm text-brand-gray mt-5 leading-relaxed">{note}</p>
    </div>
  );
}
