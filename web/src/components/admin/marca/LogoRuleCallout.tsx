import { AlertCircle } from "lucide-react";
import type { logoBackgroundRule } from "@/app/admin/marca/_data/logo";

interface Props {
  rule: typeof logoBackgroundRule;
}

export function LogoRuleCallout({ rule }: Props) {
  return (
    <div className="rounded-2xl border-2 border-brand-yellow bg-brand-yellow/10 p-6">
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 rounded-full bg-brand-yellow text-black flex items-center justify-center flex-shrink-0">
          <AlertCircle className="w-5 h-5" aria-hidden />
        </div>
        <div>
          <div className="font-display uppercase text-white text-xl mb-2">
            {rule.title}
          </div>
          <p className="text-white/90 leading-relaxed mb-3">{rule.body}</p>
          <div className="text-xs text-brand-yellow border-t border-brand-yellow/30 pt-3">
            <strong className="uppercase tracking-[0.15em]">Racional:</strong>{" "}
            {rule.rationale}
          </div>
        </div>
      </div>
    </div>
  );
}
