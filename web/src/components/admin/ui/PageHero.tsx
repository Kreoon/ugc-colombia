interface PageHeroProps {
  eyebrow: string;
  title: React.ReactNode;
  highlight?: string;
  lead?: React.ReactNode;
  meta?: React.ReactNode;
}

export function PageHero({ eyebrow, title, highlight, lead, meta }: PageHeroProps) {
  return (
    <div className="mb-12 pb-10 border-b border-brand-gold/15">
      <div className="text-[10px] font-semibold tracking-[0.2em] uppercase text-brand-yellow mb-3">
        · {eyebrow}
      </div>
      <h1 className="font-display uppercase text-white text-4xl sm:text-5xl lg:text-6xl leading-[0.95]">
        {title}
        {highlight && (
          <>
            {" "}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(90deg, #F9B334 0%, #D4A017 50%, #F9B334 100%)",
              }}
            >
              {highlight}
            </span>
          </>
        )}
      </h1>
      {lead && (
        <p className="text-brand-gray mt-4 max-w-2xl leading-relaxed">{lead}</p>
      )}
      {meta && <div className="mt-5">{meta}</div>}
    </div>
  );
}
