import { cn } from "@/lib/utils";
import { statusMeta } from "@/lib/admin/lead-status";

interface Props {
  status: string | null | undefined;
  size?: "sm" | "md";
  className?: string;
}

export function StatusPill({ status, size = "sm", className }: Props) {
  const meta = statusMeta(status);
  const sizeClass =
    size === "md" ? "px-3 py-1 text-xs" : "px-2 py-0.5 text-[10px]";

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full font-bold uppercase tracking-wider border",
        meta.bgColor,
        meta.color,
        meta.borderColor,
        sizeClass,
        className,
      )}
    >
      <span aria-hidden>{meta.icon}</span>
      {meta.label}
    </span>
  );
}
