interface EyebrowProps {
  children: React.ReactNode;
  variant?: "gold" | "yellow" | "gray";
  className?: string;
}

export function Eyebrow({ children, variant = "gold", className = "" }: EyebrowProps) {
  const color = {
    gold: "text-brand-gold",
    yellow: "text-brand-yellow",
    gray: "text-brand-gray",
  }[variant];

  return (
    <div
      className={`text-[10px] font-semibold tracking-[0.2em] uppercase ${color} ${className}`}
    >
      · {children}
    </div>
  );
}
