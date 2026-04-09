"use client";

import { useIntersection } from "@/hooks/use-intersection";
import { useCountUp } from "@/hooks/use-count-up";

interface MetricProps {
  prefix?: string;
  value: number;
  suffix?: string;
  label: string;
  decimals?: number;
  trigger: boolean;
}

function Metric({ prefix, value, suffix, label, decimals = 0, trigger }: MetricProps) {
  const count = useCountUp({ end: value, duration: 1800, trigger, decimals });

  return (
    <div className="flex flex-col items-center gap-1.5 px-6 py-5 flex-1 min-w-0">
      <span
        className="font-display text-4xl sm:text-5xl leading-none"
        style={{
          background: "linear-gradient(135deg, #f9b334 0%, #d4a017 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
        aria-label={`${prefix ?? ""}${count}${suffix ?? ""}`}
      >
        {prefix}
        {count}
        {suffix}
      </span>
      <span className="text-xs sm:text-sm text-brand-gray tracking-wide text-center font-sans">
        {label}
      </span>
    </div>
  );
}

const METRICS = [
  { prefix: "+", value: 30, suffix: "", label: "Creadores activos", decimals: 0 },
  { prefix: "", value: 14, suffix: " días", label: "Primera entrega", decimals: 0 },
  { prefix: "", value: 100, suffix: "K", label: "Meta MRR 2026 USD", decimals: 0 },
] as const;

const TEXT_METRICS = ["LATAM + USA"];

export function SocialProofBar() {
  const { ref, isIntersecting } = useIntersection<HTMLDivElement>({
    threshold: 0.3,
    once: true,
  });

  return (
    <section
      ref={ref}
      aria-label="Métricas clave"
      className="relative border-y border-brand-gold/15 bg-white/2 overflow-hidden"
    >
      {/* Glow line top */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-brand-gold/40 to-transparent"
      />

      <div className="max-w-5xl mx-auto">
        <div className="flex flex-wrap sm:flex-nowrap divide-y sm:divide-y-0 sm:divide-x divide-brand-gold/15">
          {METRICS.map((m) => (
            <Metric key={m.label} {...m} trigger={isIntersecting} />
          ))}

          {/* Métrica de texto estática */}
          <div className="flex flex-col items-center gap-1.5 px-6 py-5 flex-1 min-w-0">
            <span
              className="font-display text-3xl sm:text-4xl leading-none"
              style={{
                background: "linear-gradient(135deg, #f9b334 0%, #d4a017 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {TEXT_METRICS[0]}
            </span>
            <span className="text-xs sm:text-sm text-brand-gray tracking-wide text-center font-sans">
              Cobertura geográfica
            </span>
          </div>
        </div>
      </div>

      {/* Glow line bottom */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-brand-gold/40 to-transparent"
      />
    </section>
  );
}
