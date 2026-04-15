import { Check, AlertTriangle } from "lucide-react";

interface ChecklistBlockProps {
  title: string;
  items: string[];
  variant?: "default" | "warning";
}

export function ChecklistBlock({ title, items, variant = "default" }: ChecklistBlockProps) {
  const isWarning = variant === "warning";

  return (
    <div
      className={`rounded-2xl border p-6 ${
        isWarning
          ? "border-red-500/30 bg-red-500/5"
          : "border-brand-gold/15 bg-white/[0.02]"
      }`}
    >
      <div className="flex items-center gap-2 mb-4">
        {isWarning ? (
          <AlertTriangle className="w-5 h-5 text-red-400" aria-hidden />
        ) : (
          <Check className="w-5 h-5 text-brand-yellow" aria-hidden />
        )}
        <div className="font-display uppercase text-white text-xl">{title}</div>
      </div>
      <ul className="space-y-2">
        {items.map((item) => (
          <li
            key={item}
            className="flex items-start gap-2 text-sm text-white/90 leading-relaxed"
          >
            <span
              className={`flex-shrink-0 mt-0.5 ${
                isWarning ? "text-red-400" : "text-brand-yellow"
              }`}
            >
              {isWarning ? "⚠" : "☐"}
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function ClosingStatement({ line1, line2 }: { line1: string; line2: string }) {
  return (
    <div className="rounded-2xl border border-brand-yellow/40 bg-gradient-to-br from-brand-yellow/10 to-brand-gold/5 p-8 sm:p-12 text-center">
      <div className="font-display uppercase text-white text-2xl sm:text-3xl lg:text-4xl leading-tight mb-2">
        <span
          className="bg-clip-text text-transparent"
          style={{
            backgroundImage:
              "linear-gradient(90deg, #F9B334 0%, #D4A017 50%, #F9B334 100%)",
          }}
        >
          {line1}
        </span>
      </div>
      <div className="font-display uppercase text-white text-2xl sm:text-3xl lg:text-4xl leading-tight">
        {line2}
      </div>
    </div>
  );
}
