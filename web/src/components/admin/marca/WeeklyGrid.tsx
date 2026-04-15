import type { ScheduleDay, PlatformCadence } from "@/app/admin/marca/_data/schedule";

export function WeeklyGrid({ days }: { days: ScheduleDay[] }) {
  return (
    <div className="rounded-2xl border border-brand-gold/15 overflow-hidden bg-white/[0.02]">
      <div className="px-6 py-4 border-b border-brand-gold/15">
        <div className="text-[10px] font-semibold tracking-[0.2em] uppercase text-brand-gold">
          · Parrilla semanal
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 divide-x divide-brand-gold/10">
        {days.map((d) => (
          <div key={d.day} className="p-4 min-h-[200px]">
            <div className="text-center pb-3 mb-3 border-b border-brand-gold/10">
              <div className="font-display uppercase text-brand-yellow text-lg">
                {d.shortDay}
              </div>
              <div className="text-[10px] uppercase tracking-[0.15em] text-brand-gray">
                {d.day}
              </div>
            </div>
            <ul className="space-y-2">
              {d.slots.map((s, i) => (
                <li
                  key={i}
                  className="text-xs leading-relaxed"
                >
                  <div className="text-[9px] font-mono uppercase text-brand-gold/70">
                    {s.slot}
                  </div>
                  <div className="text-white font-semibold">{s.platform}</div>
                  <div className="text-brand-gray">{s.type}</div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export function PlatformCadenceTable({ items }: { items: PlatformCadence[] }) {
  return (
    <div className="rounded-2xl border border-brand-gold/15 overflow-hidden bg-white/[0.02]">
      <div className="px-6 py-4 border-b border-brand-gold/15">
        <div className="text-[10px] font-semibold tracking-[0.2em] uppercase text-brand-gold">
          · Cadencia por plataforma
        </div>
      </div>
      <table className="w-full text-sm">
        <thead>
          <tr className="text-[10px] uppercase tracking-[0.15em] text-brand-gray bg-white/[0.02]">
            <th className="text-left px-6 py-3 font-semibold">Plataforma</th>
            <th className="text-left px-6 py-3 font-semibold">Semana</th>
            <th className="text-left px-6 py-3 font-semibold">Mes</th>
            <th className="text-left px-6 py-3 font-semibold">Rol estratégico</th>
          </tr>
        </thead>
        <tbody>
          {items.map((row) => (
            <tr key={row.platform} className="border-t border-brand-gold/10">
              <td className="px-6 py-3 text-white font-semibold">{row.platform}</td>
              <td className="px-6 py-3 font-mono text-brand-yellow">{row.weekly}</td>
              <td className="px-6 py-3 font-mono text-white">{row.monthly}</td>
              <td className="px-6 py-3 text-brand-gray">{row.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
