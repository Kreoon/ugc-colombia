interface SectionTitleProps {
  eyebrow?: string;
  title: string;
  desc?: string;
  action?: React.ReactNode;
  className?: string;
}

export function SectionTitle({
  eyebrow,
  title,
  desc,
  action,
  className = "",
}: SectionTitleProps) {
  return (
    <div className={`mb-6 flex items-start justify-between gap-4 ${className}`}>
      <div className="flex-1 min-w-0">
        {eyebrow && (
          <div className="text-[10px] font-semibold tracking-[0.2em] uppercase text-brand-gold mb-2">
            · {eyebrow}
          </div>
        )}
        <h2 className="font-display uppercase text-white text-2xl sm:text-3xl leading-tight">
          {title}
        </h2>
        {desc && (
          <p className="text-brand-gray mt-2 max-w-3xl leading-relaxed">{desc}</p>
        )}
      </div>
      {action && <div className="flex-shrink-0">{action}</div>}
    </div>
  );
}
