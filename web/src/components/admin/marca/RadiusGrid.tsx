interface RadiusItem {
  token: string;
  px: string;
}

export function RadiusGrid({ items, rule }: { items: RadiusItem[]; rule: string }) {
  return (
    <div className="rounded-2xl border border-brand-gold/15 p-6 bg-white/[0.02]">
      <div className="text-[10px] font-semibold tracking-[0.2em] uppercase text-brand-gold mb-4">
        · Border radius (Tailwind)
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-5">
        {items.map((item) => (
          <div key={item.token} className="flex flex-col items-center gap-2">
            <div
              className="w-20 h-20 bg-brand-yellow/20 border border-brand-yellow/50"
              style={{
                borderRadius: item.token === "rounded-full" ? "9999px" : item.px,
              }}
            />
            <code className="text-xs font-mono text-brand-yellow">{item.token}</code>
            <span className="text-[10px] font-mono text-brand-gray">{item.px}</span>
          </div>
        ))}
      </div>
      <p className="text-sm text-brand-gray leading-relaxed pt-4 border-t border-brand-gold/10">
        {rule}
      </p>
    </div>
  );
}
