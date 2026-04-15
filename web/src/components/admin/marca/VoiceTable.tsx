import { Check, X } from "lucide-react";

interface Props {
  somos: string[];
  noSomos: string[];
}

export function VoiceTable({ somos, noSomos }: Props) {
  return (
    <div className="grid sm:grid-cols-2 gap-4">
      <div className="rounded-2xl border border-brand-yellow/40 bg-brand-yellow/5 p-6">
        <div className="flex items-center gap-2 mb-4">
          <Check className="w-5 h-5 text-brand-yellow" aria-hidden />
          <span className="font-display uppercase text-white text-xl">SOMOS</span>
        </div>
        <ul className="space-y-2">
          {somos.map((w) => (
            <li key={w} className="text-white font-semibold text-lg">
              {w}
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
        <div className="flex items-center gap-2 mb-4">
          <X className="w-5 h-5 text-brand-gray" aria-hidden />
          <span className="font-display uppercase text-white text-xl">NO SOMOS</span>
        </div>
        <ul className="space-y-2">
          {noSomos.map((w) => (
            <li key={w} className="text-brand-gray text-lg line-through decoration-red-500/40">
              {w}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
