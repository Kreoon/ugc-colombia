import Image from "next/image";
import type { LogoVariant } from "@/app/admin/marca/_data/logo";

const bgClasses: Record<LogoVariant["bg"], string> = {
  black: "bg-brand-black",
  cream: "bg-[#F5F5F0]",
  yellow: "bg-brand-yellow",
  graphite: "bg-brand-graphite",
  white: "bg-white",
};

export function LogoCard({ variant }: { variant: LogoVariant }) {
  const isBlackLogo = variant.id === "inverso" || variant.id === "mono-yellow";

  return (
    <div className="rounded-2xl border border-brand-gold/15 overflow-hidden bg-white/[0.02]">
      <div
        className={`${bgClasses[variant.bg]} aspect-[16/10] flex items-center justify-center p-8 relative`}
      >
        {isBlackLogo ? (
          <div className="bg-white rounded-xl p-6 flex items-center justify-center max-w-[80%]">
            <Image
              src={variant.src}
              alt={`${variant.title} — ${variant.subtitle}`}
              width={400}
              height={172}
              className="w-auto h-auto max-h-16 opacity-100"
              style={{ filter: "invert(1) brightness(0)" }}
            />
          </div>
        ) : (
          <Image
            src={variant.src}
            alt={`${variant.title} — ${variant.subtitle}`}
            width={400}
            height={172}
            className="w-auto h-auto max-h-20"
          />
        )}

        {isBlackLogo && (
          <span className="absolute top-3 right-3 text-[9px] font-semibold tracking-[0.15em] uppercase text-black bg-white/90 rounded-full px-2 py-1">
            Fondo blanco obligatorio
          </span>
        )}
      </div>

      <div className="p-5">
        <div className="flex items-baseline justify-between mb-3">
          <div>
            <div className="text-[10px] font-semibold tracking-[0.2em] uppercase text-brand-gold">
              · {variant.subtitle}
            </div>
            <div className="font-display uppercase text-white text-xl">
              {variant.title}
            </div>
          </div>
          <span className="text-xs font-mono text-brand-gray">#{variant.id}</span>
        </div>

        <dl className="text-xs space-y-1.5 mb-3">
          <div>
            <dt className="text-brand-gray">Fondo requerido</dt>
            <dd className="text-white">{variant.bgRequired}</dd>
          </div>
        </dl>

        <p className="text-sm text-brand-gray leading-relaxed">{variant.notes}</p>
      </div>
    </div>
  );
}
