"use client";

import { motion } from "motion/react";
import { useIntersection } from "@/hooks/use-intersection";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Plan {
  id: string;
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  highlight?: boolean;
  badge?: string;
  ctaLabel: string;
}

const PLANES: Plan[] = [
  {
    id: "starter",
    name: "STARTER",
    price: "$500",
    period: "/ mes",
    description: "Para marcas que quieren probar UGC con bajo riesgo.",
    features: [
      "5 videos UGC al mes",
      "Brief estratégico incluido",
      "Matching de creator",
      "1 ronda de revisión",
      "Entrega en 14 días",
      "Licencia completa para ads",
    ],
    ctaLabel: "Empezar con Starter →",
  },
  {
    id: "growth",
    name: "GROWTH",
    price: "$900",
    period: "/ mes",
    description: "El favorito de marcas que ya probaron UGC y quieren escalar.",
    features: [
      "10 videos UGC al mes",
      "Estrategia editorial mensual",
      "2 rondas de revisión",
      "Reporte de performance",
      "Account manager dedicado",
      "Entrega en 14 días",
      "Licencia completa para ads",
    ],
    highlight: true,
    badge: "MÁS POPULAR",
    ctaLabel: "Empezar con Growth →",
  },
  {
    id: "scale",
    name: "SCALE",
    price: "$1.500",
    period: "/ mes",
    description: "Para marcas que ya saben que el creative es su ventaja competitiva.",
    features: [
      "20 videos UGC al mes",
      "Estrategia + consultoría",
      "Revisiones ilimitadas",
      "Reporte avanzado con data",
      "Account manager dedicado",
      "Priority delivery (10 días)",
      "Licencia completa para ads",
    ],
    ctaLabel: "Empezar con Scale →",
  },
];

function PlanCard({ plan, index, isIntersecting }: {
  plan: Plan;
  index: number;
  isIntersecting: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 36 }}
      animate={isIntersecting ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.6,
        delay: 0.1 + index * 0.12,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={cn(
        "relative flex flex-col rounded-2xl p-7 sm:p-8 overflow-hidden",
        "transition-all duration-300",
        plan.highlight
          ? [
              "border-2 border-brand-gold",
              "bg-gradient-to-b from-brand-yellow/6 to-black",
              "shadow-[0_0_50px_rgba(212,160,23,0.2)]",
              "hover:shadow-[0_0_70px_rgba(212,160,23,0.3)]",
              "-mt-2 sm:-mt-4",
            ]
          : [
              "border border-brand-graphite/60 bg-white/3",
              "hover:border-brand-gold/30 hover:shadow-[0_8px_30px_rgba(212,160,23,0.08)]",
            ]
      )}
    >
      {/* Glow top para plan highlight */}
      {plan.highlight && (
        <div
          aria-hidden="true"
          className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-brand-gold to-transparent"
        />
      )}

      {/* Badge popular */}
      {plan.badge && (
        <div className="flex justify-center mb-5">
          <span className="inline-flex items-center text-xs font-sans font-bold tracking-widest uppercase bg-brand-yellow text-black px-4 py-1.5 rounded-full">
            {plan.badge}
          </span>
        </div>
      )}

      {/* Plan name */}
      <p
        className={cn(
          "font-display text-sm tracking-widest mb-2",
          plan.highlight ? "text-brand-yellow" : "text-brand-gold"
        )}
      >
        {plan.name}
      </p>

      {/* Price */}
      <div className="flex items-end gap-1 mb-3">
        <span
          className="font-display text-5xl sm:text-6xl leading-none text-white"
        >
          {plan.price}
        </span>
        <span className="text-brand-gray font-sans text-sm mb-2">
          {plan.period}
        </span>
      </div>

      {/* Description */}
      <p className="text-brand-gray text-sm leading-relaxed mb-6">
        {plan.description}
      </p>

      {/* Features */}
      <ul className="space-y-3 mb-8 flex-1" aria-label={`Características del plan ${plan.name}`}>
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-start gap-3">
            <div
              className={cn(
                "flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5",
                plan.highlight
                  ? "bg-brand-yellow text-black"
                  : "bg-brand-gold/15 text-brand-gold"
              )}
            >
              <Check className="h-3 w-3" aria-hidden="true" />
            </div>
            <span className="text-sm text-brand-gray font-sans">{feature}</span>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <Button
        size="default"
        variant={plan.highlight ? "default" : "outline"}
        className={cn(
          "w-full font-semibold",
          plan.highlight &&
            "shadow-[0_0_20px_rgba(249,179,52,0.3)] hover:shadow-[0_0_32px_rgba(249,179,52,0.5)]"
        )}
        aria-label={`${plan.ctaLabel} — Plan ${plan.name} a ${plan.price} por mes`}
      >
        {plan.ctaLabel}
      </Button>
    </motion.div>
  );
}

export function Pricing() {
  const { ref, isIntersecting } = useIntersection<HTMLDivElement>({
    threshold: 0.06,
  });

  return (
    <section
      id="pricing"
      aria-labelledby="pricing-title"
      className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8"
      style={{
        background:
          "linear-gradient(180deg, #000000 0%, #060402 50%, #000000 100%)",
      }}
    >
      {/* Radial glow */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 50%, rgba(212,160,23,0.06) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-6xl mx-auto" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isIntersecting ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-12 sm:mb-16"
        >
          <p className="text-brand-gold text-sm font-sans font-semibold tracking-widest uppercase mb-3">
            Planes y precios
          </p>
          <h2
            id="pricing-title"
            className="font-display text-4xl sm:text-5xl lg:text-6xl text-white leading-tight"
          >
            Precios transparentes.
            <br />
            <span
              style={{
                background: "linear-gradient(90deg, #f9b334, #d4a017)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Sin sorpresas.
            </span>
          </h2>
          <p className="mt-4 text-brand-gray text-base sm:text-lg max-w-xl mx-auto">
            Todos los planes incluyen brief estratégico, casting curado y
            licencia completa de uso en ads.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 items-start">
          {PLANES.map((plan, i) => (
            <PlanCard
              key={plan.id}
              plan={plan}
              index={i}
              isIntersecting={isIntersecting}
            />
          ))}
        </div>

        {/* Enterprise mention */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isIntersecting ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 text-center"
        >
          <p className="text-brand-gray text-sm font-sans">
            ¿Necesitas 300+ videos al mes?{" "}
            <button className="text-brand-yellow font-semibold hover:text-brand-gold transition-colors underline underline-offset-2">
              Pregunta por Enterprise desde $3.000
            </button>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
