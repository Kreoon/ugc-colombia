interface Column<T> {
  key: string;
  header: string;
  render: (row: T) => React.ReactNode;
  className?: string;
  headerClassName?: string;
}

interface AdminTableProps<T> {
  columns: Column<T>[];
  rows: T[];
  eyebrow?: string;
  empty?: React.ReactNode;
  rowKey: (row: T) => string;
  onRowHref?: (row: T) => string;
}

export function AdminTable<T>({
  columns,
  rows,
  eyebrow,
  empty,
  rowKey,
}: AdminTableProps<T>) {
  return (
    <div className="rounded-2xl border border-brand-gold/15 overflow-hidden bg-white/[0.02]">
      {eyebrow && (
        <div className="px-6 py-4 border-b border-brand-gold/15">
          <div className="text-[10px] font-semibold tracking-[0.2em] uppercase text-brand-gold">
            · {eyebrow}
          </div>
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-[10px] uppercase tracking-[0.15em] text-brand-gray bg-white/[0.02]">
              {columns.map((c) => (
                <th
                  key={c.key}
                  className={`text-left px-6 py-3 font-semibold ${c.headerClassName ?? ""}`}
                >
                  {c.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-6 py-12 text-center text-brand-gray"
                >
                  {empty ?? "Sin registros"}
                </td>
              </tr>
            ) : (
              rows.map((row) => (
                <tr
                  key={rowKey(row)}
                  className="border-t border-brand-gold/10 hover:bg-white/[0.02] transition-colors"
                >
                  {columns.map((c) => (
                    <td key={c.key} className={`px-6 py-3 ${c.className ?? ""}`}>
                      {c.render(row)}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
