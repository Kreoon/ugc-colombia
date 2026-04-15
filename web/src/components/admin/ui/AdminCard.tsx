import Link from "next/link";
import type { LucideIcon } from "lucide-react";

interface AdminCardProps {
  href?: string;
  number?: string;
  icon?: LucideIcon;
  eyebrow?: string;
  title: string;
  desc?: string;
  footer?: React.ReactNode;
  children?: React.ReactNode;
  highlight?: boolean;
}

export function AdminCard({
  href,
  number,
  icon: Icon,
  eyebrow,
  title,
  desc,
  footer,
  children,
  highlight = false,
}: AdminCardProps) {
  const base =
    "group block p-6 rounded-2xl transition-all relative overflow-hidden";
  const variant = highlight
    ? "bg-brand-yellow/5 border-2 border-brand-yellow/40 hover:border-brand-yellow"
    : "bg-white/[0.04] border border-brand-gold/15 hover:border-brand-yellow/50 hover:bg-white/[0.06]";

  const inner = (
    <>
      {number && (
        <div className="absolute top-0 right-0 font-display text-[5rem] leading-none text-brand-yellow/10 select-none pointer-events-none">
          {number}
        </div>
      )}
      <div className="relative">
        {Icon && (
          <Icon
            className="w-7 h-7 text-brand-yellow mb-4 group-hover:scale-110 transition-transform"
            aria-hidden
          />
        )}
        {eyebrow && (
          <div className="text-[10px] font-semibold tracking-[0.2em] uppercase text-brand-gold mb-1">
            · {eyebrow}
          </div>
        )}
        <div className="font-display uppercase text-white text-xl sm:text-2xl group-hover:text-brand-yellow transition-colors mb-2 leading-tight">
          {title}
        </div>
        {desc && (
          <p className="text-sm text-brand-gray leading-relaxed">{desc}</p>
        )}
        {children}
        {footer && (
          <div className="text-[10px] font-mono uppercase tracking-[0.15em] text-brand-gray/60 pt-3 mt-4 border-t border-brand-gold/10">
            {footer}
          </div>
        )}
      </div>
    </>
  );

  return href ? (
    <Link href={href} className={`${base} ${variant}`}>
      {inner}
    </Link>
  ) : (
    <div className={`${base} ${variant}`}>{inner}</div>
  );
}

export function AdminGrid({
  children,
  cols = 3,
}: {
  children: React.ReactNode;
  cols?: 2 | 3 | 4;
}) {
  const colsClass = {
    2: "sm:grid-cols-2",
    3: "sm:grid-cols-2 lg:grid-cols-3",
    4: "sm:grid-cols-2 lg:grid-cols-4",
  }[cols];

  return <div className={`grid grid-cols-1 ${colsClass} gap-4`}>{children}</div>;
}
