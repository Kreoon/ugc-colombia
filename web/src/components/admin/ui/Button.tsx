import Link from "next/link";
import type { LucideIcon } from "lucide-react";

type ButtonVariant = "default" | "outline" | "ghost" | "danger";
type ButtonSize = "sm" | "md" | "lg";

interface BaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: LucideIcon;
  iconRight?: LucideIcon;
  children: React.ReactNode;
  className?: string;
}

const styles: Record<ButtonVariant, string> = {
  default:
    "bg-brand-yellow text-black hover:bg-brand-yellow-hover shadow-[0_0_20px_rgba(249,179,52,0.25)] hover:shadow-[0_0_28px_rgba(249,179,52,0.45)]",
  outline:
    "border border-brand-gold text-brand-gold hover:bg-brand-gold/10",
  ghost: "text-brand-gray hover:text-white hover:bg-white/5",
  danger: "bg-red-500/90 text-white hover:bg-red-500",
};

const sizes: Record<ButtonSize, string> = {
  sm: "px-3 py-1.5 text-xs",
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3.5 text-base",
};

function Inner({
  icon: Icon,
  iconRight: IconRight,
  children,
}: {
  icon?: LucideIcon;
  iconRight?: LucideIcon;
  children: React.ReactNode;
}) {
  return (
    <>
      {Icon && <Icon className="w-4 h-4 flex-shrink-0" aria-hidden />}
      <span>{children}</span>
      {IconRight && <IconRight className="w-4 h-4 flex-shrink-0" aria-hidden />}
    </>
  );
}

export function AdminButton({
  variant = "default",
  size = "md",
  icon,
  iconRight,
  children,
  className = "",
  ...rest
}: BaseProps & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={`inline-flex items-center gap-2 rounded-xl font-bold uppercase tracking-wider transition-all ${styles[variant]} ${sizes[size]} ${className}`}
      {...rest}
    >
      <Inner icon={icon} iconRight={iconRight}>
        {children}
      </Inner>
    </button>
  );
}

interface LinkProps extends BaseProps {
  href: string;
}

export function AdminButtonLink({
  variant = "default",
  size = "md",
  icon,
  iconRight,
  href,
  children,
  className = "",
}: LinkProps) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center gap-2 rounded-xl font-bold uppercase tracking-wider transition-all ${styles[variant]} ${sizes[size]} ${className}`}
    >
      <Inner icon={icon} iconRight={iconRight}>
        {children}
      </Inner>
    </Link>
  );
}
