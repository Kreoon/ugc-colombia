import { Clock, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  action: string | null | undefined;
  at: string | null | undefined;
  className?: string;
}

function formatRelative(date: Date): string {
  const now = new Date();
  const diffMs = date.getTime() - now.getTime();
  const diffH = Math.round(diffMs / (1000 * 60 * 60));
  const diffD = Math.round(diffMs / (1000 * 60 * 60 * 24));

  if (diffMs < 0) {
    if (diffH > -24) return `vencido hace ${Math.abs(diffH)}h`;
    return `vencido hace ${Math.abs(diffD)}d`;
  }
  if (diffH < 24) {
    if (diffH < 1) return "ahora";
    return `en ${diffH}h`;
  }
  if (diffD < 7) return `en ${diffD}d`;
  return date.toLocaleDateString("es-CO", { day: "numeric", month: "short" });
}

export function NextActionBadge({ action, at, className }: Props) {
  if (!action) return null;

  const date = at ? new Date(at) : null;
  const isOverdue = date ? date.getTime() < Date.now() : false;
  const isSoon = date
    ? !isOverdue && date.getTime() - Date.now() < 48 * 60 * 60 * 1000
    : false;

  const colorClass = isOverdue
    ? "bg-red-500/10 text-red-400 border-red-500/30"
    : isSoon
      ? "bg-amber-500/10 text-amber-400 border-amber-500/30"
      : "bg-white/[0.04] text-brand-gray border-white/10";

  const Icon = isOverdue ? AlertCircle : Clock;

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs",
        colorClass,
        className,
      )}
    >
      <Icon className="w-3.5 h-3.5 flex-shrink-0" />
      <span className="truncate max-w-[180px] font-medium">{action}</span>
      {date && (
        <span className="font-mono text-[10px] opacity-80 whitespace-nowrap">
          · {formatRelative(date)}
        </span>
      )}
    </div>
  );
}
