import type { techStack } from "@/app/admin/marca/_data/components";

export function TechStackTable({ stack }: { stack: typeof techStack }) {
  return (
    <div className="rounded-2xl border border-brand-gold/15 overflow-hidden bg-white/[0.02]">
      <div className="px-6 py-4 border-b border-brand-gold/15">
        <div className="text-[10px] font-semibold tracking-[0.2em] uppercase text-brand-gold">
          · Stack técnico
        </div>
      </div>
      <table className="w-full text-sm">
        <thead>
          <tr className="text-[10px] uppercase tracking-[0.15em] text-brand-gray bg-white/[0.02]">
            <th className="text-left px-6 py-3 font-semibold">Dependencia</th>
            <th className="text-left px-6 py-3 font-semibold">Versión</th>
            <th className="text-left px-6 py-3 font-semibold">Uso</th>
          </tr>
        </thead>
        <tbody>
          {stack.map((row) => (
            <tr key={row.dep} className="border-t border-brand-gold/10">
              <td className="px-6 py-3 text-white font-semibold">{row.dep}</td>
              <td className="px-6 py-3 text-brand-yellow font-mono">{row.version}</td>
              <td className="px-6 py-3 text-brand-gray">{row.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
