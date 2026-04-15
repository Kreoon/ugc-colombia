type Props = {
  type: "do" | "dont";
  items: readonly string[];
};

export function DoDontCard({ type, items }: Props) {
  const isDo = type === "do";
  return (
    <div
      className={`rounded-md p-6 border ${
        isDo
          ? "border-brand-green/40 bg-brand-green/5"
          : "border-brand-red/40 bg-brand-red/5"
      }`}
    >
      <p
        className={`font-display text-xl uppercase tracking-wider mb-4 ${
          isDo ? "text-brand-green" : "text-brand-red"
        }`}
      >
        {isDo ? "Sí hacer" : "No hacer"}
      </p>
      <ul className="space-y-2">
        {items.map((item) => (
          <li
            key={item}
            className="font-sans text-sm text-white/90 flex items-start gap-2"
          >
            <span
              className={`mt-1 text-xs ${
                isDo ? "text-brand-green" : "text-brand-red"
              }`}
            >
              {isDo ? "✓" : "✗"}
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
