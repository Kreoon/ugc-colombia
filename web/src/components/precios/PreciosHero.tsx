"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Users } from "lucide-react";
import { useAudit } from "@/components/lead-audit/AuditContext";
import { ClientLogoBar } from "./ClientLogoBar";

interface KreoonStatsDTO {
  creators_count: number;
  brands_count: number;
  campaigns_completed: number;
  videos_approved: number;
}

const STAGGER = 0.12;
const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * STAGGER,
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
};
const fadeUpReduced = {
  hidden: { opacity: 0 },
  visible: () => ({ opacity: 1, transition: { duration: 0.3 } }),
};

// Fallback stats si KREOON no responde
const FALLBACK_STATS = [
  { value: "+30", label: "Creadores activos" },
  { value: "38%", label: "Hook rate promedio" },
  { value: "2.8%", label: "CTR Meta Ads" },
];

export function PreciosHero() {
  const reduced = useReducedMotion();
  const variants = reduced ? fadeUpReduced : fadeUp;
  const { openAudit } = useAudit();

  const [stats, setStats] = useState(FALLBACK_STATS);

  useEffect(() => {
    fetch("/api/showcase?action=stats", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : null))
      .then(
        (json: { success: boolean; data: KreoonStatsDTO | null } | null) => {
          if (!json?.success || !json.data) return;
          const { creators_count, videos_approved, campaigns_completed } =
            json.data;
          setStats([
            creators_count > 0
              ? { value: `+${creators_count}`, label: "Creadores en la red" }
              : FALLBACK_STATS[0],
            videos_approved > 0
              ? { value: `${videos_approved}`, label: "Videos producidos" }
              : { value: "38%", label: "Hook rate promedio" },
            campaigns_completed > 0
              ? {
                  value: `${campaigns_completed}`,
                  label: "Campañas entregadas",
                }
              : { value: "2.8%", label: "CTR Meta Ads" },
          ]);
        }
      )
      .catch(() => {});
  }, []);

  return (
    <section
      aria-label="Precios — UGC Colombia"
      className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-brand-black pt-24"
    >
      {/* Imagen editorial de fondo */}
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <Image
          src="/brand/precios/hero.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-black/75 via-brand-black/65 to-brand-black" />
      </div>

      {/* Grid SVG pattern */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(61,61,60,0.18) 1px, transparent 1px),
            linear-gradient(90deg, rgba(61,61,60,0.18) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
          maskImage:
            "radial-gradient(ellipse 80% 70% at 50% 50%, black 30%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 70% at 50% 50%, black 30%, transparent 100%)",
        }}
      />
      {/* Radial glow dorado */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 60%, rgba(212,160,23,0.10) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-16 sm:py-20">
        {/* Eyebrow pill badge — mismo patrón que ServiciosHero */}
        <motion.span
          custom={0}
          variants={variants}
          initial="hidden"
          animate="visible"
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-sans font-bold tracking-widest uppercase mb-6 bg-brand-yellow/15 text-brand-yellow border border-brand-yellow/40"
        >
          <Users className="h-3 w-3" aria-hidden />
          Solo 3 espacios en Abril
        </motion.span>

        {/* Título — mismos clamp que ServiciosHero */}
        <motion.h1
          custom={1}
          variants={variants}
          initial="hidden"
          animate="visible"
          className="font-display leading-none mb-6"
        >
          <span className="block text-white text-[clamp(2.4rem,7vw,6rem)] leading-[0.92]">
            INVIERTE UNA VEZ.
          </span>
          <span
            className="block text-[clamp(1.6rem,5vw,4.5rem)] leading-[0.95] mt-2"
            style={{
              background:
                "linear-gradient(90deg, #f9b334 0%, #d4a017 50%, #f9b334 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            VENDE DURANTE MESES.
          </span>
        </motion.h1>

        {/* Subtítulo */}
        <motion.p
          custom={2}
          variants={variants}
          initial="hidden"
          animate="visible"
          className="max-w-2xl mx-auto text-brand-gray text-base sm:text-lg leading-relaxed mb-10"
        >
          Cuatro paquetes diseñados por etapa de negocio. Precios claros, sin
          letra pequeña y con{" "}
          <span className="text-white font-semibold">
            licencia de publicidad por 12 meses incluida
          </span>
          . Escoge el que calce con tu presupuesto hoy — el resto lo ajustamos
          contigo.
        </motion.p>

        {/* CTAs */}
        <motion.div
          custom={3}
          variants={variants}
          initial="hidden"
          animate="visible"
          className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 px-2 sm:px-0"
        >
          <Button
            asChild
            size="lg"
            className="w-full sm:w-auto text-sm sm:text-base font-bold tracking-wide min-h-[52px] shadow-[0_0_28px_rgba(249,179,52,0.35)] hover:shadow-[0_0_40px_rgba(249,179,52,0.55)]"
          >
            <a href="#planes">VER LOS 4 PAQUETES →</a>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="w-full sm:w-auto text-sm sm:text-base min-h-[52px]"
            onClick={() => openAudit("precios_hero")}
          >
            AGENDA TU DIAGNÓSTICO
          </Button>
        </motion.div>

        <motion.p
          custom={4}
          variants={variants}
          initial="hidden"
          animate="visible"
          className="mt-5 text-xs text-brand-graphite tracking-wide"
        >
          30 min · Gratis · Sin compromiso
        </motion.p>

        {/* Stat ribbon */}
        <motion.div
          custom={5}
          variants={variants}
          initial="hidden"
          animate="visible"
          className="mt-10 flex flex-wrap items-center justify-center gap-6 sm:gap-10"
        >
          {stats.map((stat: { value: string; label: string }, i: number) => (
            <div key={i} className="flex items-baseline gap-2">
              <span
                className="font-display text-2xl sm:text-3xl"
                style={{
                  background:
                    "linear-gradient(135deg, #f9b334 0%, #d4a017 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {stat.value}
              </span>
              <span className="text-xs sm:text-sm text-brand-gray">
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>

        {/* Logo bar clientes */}
        <motion.div
          custom={6}
          variants={variants}
          initial="hidden"
          animate="visible"
          className="mt-12"
        >
          <ClientLogoBar />
        </motion.div>
      </div>
    </section>
  );
}
