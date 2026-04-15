interface Spacing {
  token: string;
  px: string;
}

export function SpacingScale({ items }: { items: Spacing[] }) {
  const maxPx = Math.max(...items.map((i) => parseInt(i.px)));

  return (
    <div className="rounded-2xl border border-brand-gold/15 p-6 bg-white/[0.02]">
      <div className="text-[10px] font-semibold tracking-[0.2em] uppercase text-brand-gold mb-4">
        · Escala de spacing
      </div>
      <div className="space-y-3">
        {items.map((item) => {
          const px = parseInt(item.px);
          const width = (px / maxPx) * 100;
          return (
            <div key={item.token} className="flex items-center gap-4">
              <code className="w-20 text-xs font-mono text-brand-yellow flex-shrink-0">
                {item.token}
              </code>
              <div className="flex-1 h-6 bg-white/5 rounded overflow-hidden">
                <div
                  className="h-full bg-brand-yellow"
                  style={{ width: `${width}%` }}
                />
              </div>
              <code className="w-14 text-xs font-mono text-white text-right flex-shrink-0">
                {item.px}
              </code>
            </div>
          );
        })}
      </div>
    </div>
  );
}
