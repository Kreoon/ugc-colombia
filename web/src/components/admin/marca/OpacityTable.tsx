interface Overlay {
  class: string;
  use: string;
  example: string;
}

export function OpacityTable({ items }: { items: Overlay[] }) {
  return (
    <div className="rounded-2xl border border-brand-gold/15 overflow-hidden bg-white/[0.02]">
      <div className="px-6 py-4 border-b border-brand-gold/15">
        <div className="text-[10px] font-semibold tracking-[0.2em] uppercase text-brand-gold">
          · Opacity overlays usados en web
        </div>
      </div>
      <table className="w-full text-sm">
        <thead>
          <tr className="text-[10px] uppercase tracking-[0.15em] text-brand-gray bg-white/[0.02]">
            <th className="text-left px-6 py-3 font-semibold">Clase Tailwind</th>
            <th className="text-left px-6 py-3 font-semibold">Uso</th>
            <th className="text-left px-6 py-3 font-semibold">Ejemplo</th>
          </tr>
        </thead>
        <tbody>
          {items.map((row) => (
            <tr key={row.class} className="border-t border-brand-gold/10">
              <td className="px-6 py-3">
                <code className="text-xs font-mono text-brand-yellow">{row.class}</code>
              </td>
              <td className="px-6 py-3 text-white">{row.use}</td>
              <td className="px-6 py-3 text-brand-gray">{row.example}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
