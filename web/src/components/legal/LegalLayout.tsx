interface LegalLayoutProps {
  title: string;
  subtitle?: string;
  updatedAt: string;
  children: React.ReactNode;
}

export function LegalLayout({
  title,
  subtitle,
  updatedAt,
  children,
}: LegalLayoutProps) {
  return (
    <section className="relative px-4 pb-24 pt-24 sm:px-6 lg:px-8">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-0"
        style={{
          background:
            "radial-gradient(ellipse at top, rgba(212,160,23,0.12) 0%, rgba(0,0,0,0) 55%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-3xl">
        <div className="mb-12 border-b border-white/10 pb-8">
          <span className="inline-block rounded-full border border-brand-yellow/40 bg-brand-yellow/10 px-3 py-1 text-[11px] font-sans font-bold uppercase tracking-widest text-brand-yellow">
            Legal
          </span>
          <h1 className="mt-4 font-display text-[clamp(2.25rem,5vw,4rem)] uppercase leading-[0.95] tracking-tight text-white">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-4 max-w-2xl text-base text-brand-gray sm:text-lg">
              {subtitle}
            </p>
          )}
          <p className="mt-4 text-xs text-brand-gray/70">
            Última actualización: {updatedAt}
          </p>
        </div>

        <div className="legal-content prose prose-invert max-w-none text-brand-gray">
          {children}
        </div>
      </div>

      <style>{`
        .legal-content h2 {
          font-family: var(--font-anton);
          color: white;
          font-size: 1.5rem;
          text-transform: uppercase;
          letter-spacing: -0.01em;
          margin-top: 2.5rem;
          margin-bottom: 1rem;
          line-height: 1.1;
        }
        .legal-content h3 {
          color: #F9B334;
          font-size: 1.1rem;
          font-weight: 600;
          margin-top: 1.75rem;
          margin-bottom: 0.75rem;
        }
        .legal-content p {
          margin-bottom: 1rem;
          line-height: 1.7;
          font-size: 0.95rem;
        }
        .legal-content ul {
          list-style: none;
          padding-left: 0;
          margin-bottom: 1.25rem;
        }
        .legal-content ul li {
          position: relative;
          padding-left: 1.25rem;
          margin-bottom: 0.5rem;
          line-height: 1.65;
          font-size: 0.95rem;
        }
        .legal-content ul li::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0.6rem;
          width: 0.35rem;
          height: 0.35rem;
          border-radius: 9999px;
          background: #F9B334;
        }
        .legal-content a {
          color: #F9B334;
          text-decoration: underline;
          text-underline-offset: 3px;
          transition: color 0.2s;
        }
        .legal-content a:hover {
          color: #D4A017;
        }
        .legal-content strong {
          color: white;
          font-weight: 600;
        }
        .legal-content table {
          width: 100%;
          border-collapse: collapse;
          margin: 1.5rem 0;
          font-size: 0.875rem;
        }
        .legal-content th, .legal-content td {
          border: 1px solid rgba(255,255,255,0.1);
          padding: 0.75rem 1rem;
          text-align: left;
        }
        .legal-content th {
          background: rgba(249,179,52,0.08);
          color: white;
          font-weight: 600;
        }
      `}</style>
    </section>
  );
}
