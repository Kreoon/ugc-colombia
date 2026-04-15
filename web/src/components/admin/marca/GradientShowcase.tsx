interface GradientShowcaseProps {
  css: string;
  description: string;
}

export function GradientShowcase({ css, description }: GradientShowcaseProps) {
  return (
    <div className="rounded-2xl overflow-hidden border border-brand-gold/15">
      <div
        className="h-24 w-full"
        style={{ background: css }}
        aria-hidden
      />
      <div className="p-5 bg-white/[0.02]">
        <div className="text-[10px] font-semibold tracking-[0.2em] uppercase text-brand-gold mb-2">
          · Gradiente signature
        </div>
        <div className="font-display uppercase text-white text-xl mb-3">
          <span
            className="bg-clip-text text-transparent"
            style={{ backgroundImage: css }}
          >
            HACEMOS CRECER MARCAS.
          </span>
        </div>
        <code className="block text-xs font-mono text-brand-gray bg-black/40 rounded-lg p-3 break-all">
          {css}
        </code>
        <p className="text-sm text-brand-gray mt-3 leading-relaxed">{description}</p>
      </div>
    </div>
  );
}
