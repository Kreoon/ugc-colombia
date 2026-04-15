import type { Pillar } from "@/app/admin/marca/_data/pillars";

export function PillarCard({ pillar }: { pillar: Pillar }) {
  return (
    <div className="rounded-2xl border border-brand-gold/15 p-6 bg-white/[0.02] relative overflow-hidden">
      <div className="absolute top-0 right-0 font-display text-[6rem] leading-none text-brand-yellow/10 select-none pointer-events-none">
        {pillar.number}
      </div>

      <div className="relative">
        <div className="text-[10px] font-semibold tracking-[0.2em] uppercase text-brand-gold mb-2">
          · {pillar.category}
        </div>
        <div className="font-display uppercase text-white text-2xl mb-3">
          {pillar.name}
        </div>
        <p className="text-sm text-brand-gray leading-relaxed mb-5">{pillar.desc}</p>

        <div className="flex items-end justify-between pt-4 border-t border-brand-gold/10">
          <div>
            <div className="text-[10px] uppercase tracking-[0.15em] text-brand-gray">
              % semanal
            </div>
            <div className="font-display text-4xl text-brand-yellow">{pillar.percent}%</div>
          </div>
          <div className="text-right">
            <div className="text-[10px] uppercase tracking-[0.15em] text-brand-gray">
              Foco
            </div>
            <div className="text-white font-semibold">{pillar.focus}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
