import { Check, X } from "lucide-react";

interface Props {
  doList: string[];
  dontList: string[];
}

export function DoDontList({ doList, dontList }: Props) {
  return (
    <div className="grid sm:grid-cols-2 gap-4">
      <div className="rounded-2xl border border-green-500/30 bg-green-500/5 p-6">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center">
            <Check className="w-4 h-4" aria-hidden />
          </div>
          <span className="font-display uppercase text-white text-lg">DO</span>
        </div>
        <ul className="space-y-2">
          {doList.map((item) => (
            <li key={item} className="flex items-start gap-2 text-sm text-white/90">
              <span className="text-green-400 flex-shrink-0">+</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-2xl border border-red-500/30 bg-red-500/5 p-6">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center">
            <X className="w-4 h-4" aria-hidden />
          </div>
          <span className="font-display uppercase text-white text-lg">DON&apos;T</span>
        </div>
        <ul className="space-y-2">
          {dontList.map((item) => (
            <li key={item} className="flex items-start gap-2 text-sm text-white/90">
              <span className="text-red-400 flex-shrink-0">×</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
