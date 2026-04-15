import type { ColorToken } from "@/app/admin/marca/_data/colors";

const darkText = new Set(["#F9B334", "#BDBCBC", "#F5F5F0", "#FFFFFF"]);

export function ColorSwatch({ token }: { token: ColorToken }) {
  const onDark = !darkText.has(token.hex.toUpperCase());

  return (
    <div className="rounded-2xl overflow-hidden border border-brand-gold/15 bg-white/[0.02]">
      <div
        className="aspect-[16/10] w-full flex items-end p-5"
        style={{ background: token.hex }}
      >
        <div
          className="font-display uppercase text-2xl tracking-tight"
          style={{ color: onDark ? "#ffffff" : "#000000" }}
        >
          {token.hex}
        </div>
      </div>
      <div className="p-5">
        <div className="text-[10px] font-semibold tracking-[0.2em] uppercase text-brand-gold mb-1">
          · {token.role}
        </div>
        <div className="font-display uppercase text-white text-xl mb-3">
          {token.name}
        </div>
        <dl className="text-xs space-y-1.5">
          <div className="flex justify-between gap-2">
            <dt className="text-brand-gray">RGB</dt>
            <dd className="text-white font-mono">{token.rgb}</dd>
          </div>
          <div className="flex justify-between gap-2">
            <dt className="text-brand-gray">CSS var</dt>
            <dd className="text-brand-yellow font-mono">{token.cssVar}</dd>
          </div>
          {token.usageFrequency !== undefined && (
            <div className="flex justify-between gap-2">
              <dt className="text-brand-gray">Uso en código</dt>
              <dd className="text-white font-mono">{token.usageFrequency} instancias</dd>
            </div>
          )}
        </dl>
      </div>
    </div>
  );
}
