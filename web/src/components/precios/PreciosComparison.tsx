"use client";

import { motion } from "motion/react";
import { useIntersection } from "@/hooks/use-intersection";
import { Check, X } from "lucide-react";
import { COMPARISON_ROWS, type ComparisonRow } from "@/lib/pricing-plans";
import { useCurrency } from "@/components/providers/CurrencyProvider";
import { PLAN_PRICES } from "@/lib/pricing/currency-config";
import { cn } from "@/lib/utils";

type PlanColumnKey = "inicio" | "crecimiento" | "escala" | "enterprise";

interface PlanColumn {
  key: PlanColumnKey;
  name: string;
  price: string;
  highlight?: boolean;
}

function CellValue({
  value,
  highlight,
}: {
  value: string | boolean;
  highlight?: boolean;
}) {
  if (value === true) {
    return (
      <span
        className={cn(
          "inline-flex w-5 h-5 rounded-full items-center justify-center",
          highlight
            ? "bg-brand-yellow text-black"
            : "bg-brand-yellow/15 border border-brand-yellow/40 text-brand-yellow"
        )}
        aria-label="Si incluido"
      >
        <Check className="h-3 w-3" strokeWidth={3} aria-hidden />
      </span>
    );
  }
  if (value === false) {
    return (
      <span
        className="inline-flex w-5 h-5 rounded-full items-center justify-center bg-brand-graphite/20 border border-brand-graphite/50 text-brand-graphite"
        aria-label="No incluido"
      >
        <X className="h-3 w-3" strokeWidth={2.5} aria-hidden />
      </span>
    );
  }
  return (
    <span
      className={cn(
        "text-xs sm:text-sm font-sans",
        highlight ? "text-brand-yellow font-semibold" : "text-white/85"
      )}
    >
      {value}
    </span>
  );
}

function groupByCategory(rows: ComparisonRow[]) {
  const groups = new Map<string, ComparisonRow[]>();
  for (const row of rows) {
    const list = groups.get(row.category) ?? [];
    list.push(row);
    groups.set(row.category, list);
  }
  return Array.from(groups.entries()).map(([category, items]) => ({
    category,
    items,
  }));
}

export function PreciosComparison() {
  const { ref, isIntersecting } = useIntersection<HTMLDivElement>({
    threshold: 0.05,
  });
  const { currency, format } = useCurrency();
  const grouped = groupByCategory(COMPARISON_ROWS);

  const PLAN_COLUMNS: PlanColumn[] = [
    {
      key: "inicio",
      name: "Inicio",
      price: `${format(PLAN_PRICES.starter[currency].amount)}/mes`,
    },
    {
      key: "crecimiento",
      name: "Crecimiento",
      price: `${format(PLAN_PRICES.growth[currency].amount)}/mes`,
      highlight: true,
    },
    {
      key: "escala",
      name: "Escala",
      price: `${format(PLAN_PRICES.scale[currency].amount)}/mes`,
    },
    { key: "enterprise", name: "A la medida", price: "Custom" },
  ];

  return (
    <section
      id="comparativa"
      aria-labelledby="comparativa-title"
      className="relative py-20 sm:py-28 lg:py-32 px-4 sm:px-6 lg:px-8 bg-brand-black overflow-hidden scroll-mt-20 sm:scroll-mt-24"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-50"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(249,179,52,0.06) 0%, transparent 60%)",
        }}
      />

      <div className="relative max-w-7xl mx-auto" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isIntersecting ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-14 sm:mb-18 max-w-3xl mx-auto"
        >
          <span className="inline-block px-3 py-1 rounded-full text-[11px] font-sans font-bold tracking-widest uppercase mb-5 bg-brand-yellow/15 text-brand-yellow border border-brand-yellow/40">
            Compara en detalle
          </span>
          <h2
            id="comparativa-title"
            className="font-display text-[clamp(2.25rem,5vw,4rem)] leading-[0.95] text-white tracking-tight uppercase"
          >
            Todo lo que{" "}
            <span
              style={{
                background: "linear-gradient(90deg, #f9b334, #d4a017)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              incluye cada plan
            </span>
            .
          </h2>
          <p className="mt-6 text-base sm:text-lg text-brand-gray leading-relaxed">
            22 variables comparadas lado a lado. Sin asteriscos, sin letra
            pequena.
          </p>
        </motion.div>

        {/* Tabla desktop */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isIntersecting ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="hidden lg:block rounded-2xl border border-brand-graphite/60 bg-white/[0.015] overflow-hidden"
        >
          {/* Sticky header */}
          <div className="grid grid-cols-[2fr_1fr_1.1fr_1fr_1fr] bg-gradient-to-b from-white/[0.05] to-white/[0.02] border-b border-brand-graphite/60 sticky top-0 z-20 backdrop-blur-md">
            <div className="p-5 text-[10px] font-bold tracking-[0.25em] uppercase text-brand-gold/70">
              Caracteristica
            </div>
            {PLAN_COLUMNS.map((col) => (
              <div
                key={col.key}
                className={cn(
                  "p-5 text-center border-l border-brand-graphite/40",
                  col.highlight && "bg-brand-yellow/[0.08]"
                )}
              >
                <p
                  className={cn(
                    "font-display text-sm tracking-[0.2em] uppercase mb-1",
                    col.highlight ? "text-brand-yellow" : "text-white"
                  )}
                >
                  {col.name}
                </p>
                <p className="text-[11px] text-brand-gray">{col.price}</p>
              </div>
            ))}
          </div>

          {/* Rows por categoria */}
          {grouped.map((group) => (
            <div key={group.category}>
              {/* Category header */}
              <div className="grid grid-cols-[2fr_1fr_1.1fr_1fr_1fr] border-b border-brand-graphite/40 bg-white/[0.01]">
                <div className="col-span-5 px-5 py-2.5 text-[10px] font-bold tracking-[0.25em] uppercase text-brand-gold/80">
                  {group.category}
                </div>
              </div>
              {group.items.map((row) => (
                <div
                  key={row.feature}
                  className="grid grid-cols-[2fr_1fr_1.1fr_1fr_1fr] border-b border-brand-graphite/30 last:border-b-0 hover:bg-brand-yellow/[0.02] hover:shadow-[inset_0_0_30px_rgba(212,160,23,0.03)] transition-all duration-200"
                >
                  <div className="px-5 py-3.5 text-sm text-white/90 font-sans">
                    {row.feature}
                  </div>
                  <div className="px-5 py-3.5 text-center border-l border-brand-graphite/30">
                    <CellValue value={row.inicio} />
                  </div>
                  <div className="px-5 py-3.5 text-center border-l border-brand-graphite/30 bg-brand-yellow/[0.04]">
                    <CellValue value={row.crecimiento} highlight />
                  </div>
                  <div className="px-5 py-3.5 text-center border-l border-brand-graphite/30">
                    <CellValue value={row.escala} />
                  </div>
                  <div className="px-5 py-3.5 text-center border-l border-brand-graphite/30">
                    <CellValue value={row.enterprise} />
                  </div>
                </div>
              ))}
            </div>
          ))}
        </motion.div>

        {/* Mobile: stacked por plan */}
        <div className="lg:hidden space-y-6">
          {PLAN_COLUMNS.map((col) => (
            <motion.div
              key={col.key}
              initial={{ opacity: 0, y: 24 }}
              animate={isIntersecting ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className={cn(
                "rounded-2xl border p-5 sm:p-6",
                col.highlight
                  ? "border-2 border-brand-gold bg-brand-yellow/5 shadow-[0_0_40px_-20px_rgba(212,160,23,0.4)]"
                  : "border-brand-graphite/60 bg-white/[0.025]"
              )}
            >
              <div className="flex items-baseline justify-between mb-5 pb-3 border-b border-brand-graphite/40">
                <p
                  className={cn(
                    "font-display text-xl tracking-[0.15em] uppercase",
                    col.highlight ? "text-brand-yellow" : "text-white"
                  )}
                >
                  {col.name}
                </p>
                <p className="text-xs text-brand-gray">{col.price}</p>
              </div>

              {grouped.map((group) => (
                <div key={group.category} className="mb-5 last:mb-0">
                  <p className="text-[10px] font-bold tracking-[0.25em] uppercase text-brand-gold/80 mb-2.5">
                    {group.category}
                  </p>
                  <ul className="space-y-2">
                    {group.items.map((row) => (
                      <li
                        key={row.feature}
                        className="flex items-center justify-between gap-3 py-1.5 border-b border-brand-graphite/20 last:border-b-0"
                      >
                        <span className="text-xs text-white/80 flex-1">
                          {row.feature}
                        </span>
                        <CellValue
                          value={row[col.key]}
                          highlight={col.highlight}
                        />
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
