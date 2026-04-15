type BadgeVariant = "default" | "gold" | "outline" | "solid" | "success" | "warning" | "danger";

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

export function Badge({ children, variant = "default", className = "" }: BadgeProps) {
  const styles: Record<BadgeVariant, string> = {
    default: "bg-white/10 text-white border border-white/20",
    gold: "bg-brand-gold/15 text-brand-gold border border-brand-gold/30",
    outline: "border border-brand-gray text-brand-gray",
    solid: "bg-brand-yellow text-black",
    success: "bg-green-500/15 text-green-300 border border-green-500/30",
    warning: "bg-brand-yellow/15 text-brand-yellow border border-brand-yellow/30",
    danger: "bg-red-500/15 text-red-300 border border-red-500/30",
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider ${styles[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
