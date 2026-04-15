import { ReactNode } from "react";

type Props = {
  eyebrow: string;
  title: string;
  subtitle?: string;
  children?: ReactNode;
};

export function SectionHero({ eyebrow, title, subtitle, children }: Props) {
  return (
    <header className="border-b border-brand-gray-dark/60 pb-10 mb-12">
      <p className="font-sans text-[11px] tracking-[0.2em] uppercase text-brand-yellow mb-4">
        {eyebrow}
      </p>
      <h1 className="font-display text-5xl sm:text-6xl md:text-7xl uppercase leading-[0.95] text-white">
        {title}
      </h1>
      {subtitle && (
        <p className="mt-6 max-w-3xl text-lg text-brand-gray-light font-sans leading-relaxed">
          {subtitle}
        </p>
      )}
      {children}
    </header>
  );
}
