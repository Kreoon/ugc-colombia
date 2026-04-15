interface StatBlockProps {
  label: string;
  value: string | number;
  sub?: string;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
  highlight?: boolean;
}

export function StatBlock({
  label,
  value,
  sub,
  trend,
  trendValue,
  highlight = false,
}: StatBlockProps) {
  const trendColor = {
    up: "text-green-400",
    down: "text-red-400",
    neutral: "text-brand-gray",
  };

  return (
    <div
      className={`rounded-2xl p-6 ${
        highlight
          ? "bg-brand-yellow/5 border-2 border-brand-yellow/40"
          : "bg-white/[0.02] border border-brand-gold/15"
      }`}
    >
      <div className="text-[10px] font-semibold tracking-[0.2em] uppercase text-brand-gray mb-2">
        · {label}
      </div>
      <div className="flex items-baseline gap-2 mb-1">
        <div className="font-display text-3xl sm:text-4xl text-white">
          {highlight ? (
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(90deg, #F9B334 0%, #D4A017 50%, #F9B334 100%)",
              }}
            >
              {value}
            </span>
          ) : (
            value
          )}
        </div>
        {sub && <span className="text-sm text-brand-gray font-sans">{sub}</span>}
      </div>
      {trend && trendValue && (
        <div className={`text-xs font-semibold ${trendColor[trend]}`}>
          {trend === "up" ? "↑" : trend === "down" ? "↓" : "→"} {trendValue}
        </div>
      )}
    </div>
  );
}

export function StatsRow({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">{children}</div>
  );
}
