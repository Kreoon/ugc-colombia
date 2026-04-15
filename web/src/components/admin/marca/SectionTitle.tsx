interface SectionTitleProps {
  eyebrow?: string;
  title: string;
  desc?: string;
  className?: string;
}

export function SectionTitle({ eyebrow, title, desc, className = "" }: SectionTitleProps) {
  return (
    <div className={`mb-8 ${className}`}>
      {eyebrow && (
        <div className="text-[10px] font-semibold tracking-[0.2em] uppercase text-brand-gold mb-2">
          · {eyebrow}
        </div>
      )}
      <h2 className="font-display uppercase text-white text-3xl sm:text-4xl lg:text-5xl leading-tight">
        {title}
      </h2>
      {desc && (
        <p className="text-brand-gray mt-3 max-w-3xl leading-relaxed">{desc}</p>
      )}
    </div>
  );
}
