"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { useIntersection } from "@/hooks/use-intersection";
import {
  TrendingDown,
  Repeat,
  PackageX,
  Sparkles,
  Compass,
  Globe2,
  Timer,
  DollarSign,
} from "lucide-react";

type Problema = {
  num: string;
  icon: React.ElementType;
  title: string;
  text: string;
};

/**
 * Dolores reales del mercado DTC/ecommerce con UGC en 2026.
 * Basado en investigación del mercado + testimonios de clientes.
 */
const PROBLEMAS: Problema[] = [
  {
    num: "01",
    icon: TrendingDown,
    title: "Tus anuncios se queman en 2 semanas",
    text: "La fatiga creativa ahora llega en 2-3 semanas (antes eran 4+). Tu mejor anuncio se convierte en tu mayor riesgo sin darte cuenta.",
  },
  {
    num: "02",
    icon: Repeat,
    title: "Necesitas 20+ variaciones al mes",
    text: "Meta recomienda 3 a 5 piezas nuevas por semana para evitar la caída. Tú produces 4 al mes con suerte. El algoritmo te castiga sin piedad.",
  },
  {
    num: "03",
    icon: PackageX,
    title: "Mandaste el producto y nunca más lo viste",
    text: "Le enviaste muestras a 3 creadores por mensaje privado. Uno desapareció, otro no entregó a tiempo y el tercero mandó algo que no podías usar.",
  },
  {
    num: "04",
    icon: Sparkles,
    title: "Tu contenido se ve bonito pero no vende",
    text: "Inviertes en producción cinematográfica, luces y drones, pero los números no suben. Contenido precioso que nadie compra.",
  },
  {
    num: "05",
    icon: Compass,
    title: "Cada video es una lotería sin estrategia",
    text: "Grabas sin plan: sin ganchos probados, sin pilares editoriales, sin medición. Cada publicación es adivinar y rezar.",
  },
  {
    num: "06",
    icon: Globe2,
    title: "Las plataformas extranjeras no conectan",
    text: "Pagaste una plataforma gringa, los creadores no entienden tu marca, suenan traducidos y el acento no encaja con tu audiencia latina.",
  },
  {
    num: "07",
    icon: Timer,
    title: "Tu equipo interno no da abasto",
    text: "Tu marketer se volvió guionista, casting, director y editor al mismo tiempo. Las ideas se acumulan y la ejecución se estanca.",
  },
  {
    num: "08",
    icon: DollarSign,
    title: "Tu CPA en Meta sube cada mes",
    text: "El costo de adquirir un cliente subió 40% en el último año y tus anuncios con modelos genéricos de banco de imágenes ya no convierten como antes.",
  },
];

export function Problema() {
  const { ref, isIntersecting } = useIntersection<HTMLDivElement>({
    threshold: 0.08,
  });

  return (
    <section
      id="problema"
      aria-labelledby="problema-title"
      className="relative py-20 sm:py-28 lg:py-32 px-4 sm:px-6 lg:px-8 bg-brand-black overflow-hidden scroll-mt-20 sm:scroll-mt-24"
    >
      {/* Noise texture overlay sutil */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "128px 128px",
        }}
      />

      {/* Red glow sutil de fondo para contexto emocional */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 50% 30% at 50% 0%, rgba(220,38,38,0.05) 0%, transparent 60%)",
        }}
      />

      {/* Imagen editorial de fatiga creativa — fondo derecho */}
      <div
        aria-hidden="true"
        className="absolute top-0 right-0 w-full lg:w-1/2 h-[50%] lg:h-full pointer-events-none opacity-[0.18]"
      >
        <Image
          src="/brand/home/problema.png"
          alt=""
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover object-right"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-transparent via-brand-black/60 to-brand-black" />
      </div>

      <div className="max-w-7xl mx-auto relative" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isIntersecting ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl mb-14 sm:mb-20"
        >
          <span className="inline-block px-3 py-1 rounded-full text-[11px] font-sans font-bold tracking-widest uppercase mb-5 bg-brand-yellow/15 text-brand-yellow border border-brand-yellow/40">
            ¿Te suena familiar?
          </span>
          <h2
            id="problema-title"
            className="font-display text-[clamp(2.5rem,6vw,5rem)] leading-[0.95] text-white tracking-tight"
          >
            ¿Te suena familiar?
          </h2>
          <p className="mt-5 text-base sm:text-lg text-brand-gray leading-relaxed">
            Los 8 dolores más comunes de las marcas que invierten en publicidad
            digital hoy. Si al menos 3 te resuenan, estás en el lugar
            correcto.
          </p>
        </motion.div>

        {/* Grid de 8 dolores: 1 col mobile / 2 tablet / 4 desktop (2 rows) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {PROBLEMAS.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.num}
                initial={{ opacity: 0, y: 32 }}
                animate={isIntersecting ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.55,
                  delay: 0.08 + i * 0.06,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="group relative rounded-2xl border border-brand-graphite/60 bg-white/[0.025] p-5 sm:p-6 lg:p-7 overflow-hidden transition-all duration-300 hover:border-brand-gold/40 hover:bg-white/[0.04] hover:-translate-y-1 hover:shadow-[0_12px_32px_-12px_rgba(212,160,23,0.25)] flex flex-col h-full"
              >
                {/* Gradient border on hover */}
                <div
                  aria-hidden
                  className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    padding: "1px",
                    background:
                      "linear-gradient(135deg, rgba(249,179,52,0.5), rgba(212,160,23,0.15), transparent 60%)",
                    WebkitMask:
                      "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                    WebkitMaskComposite: "xor",
                    maskComposite: "exclude",
                  }}
                />

                {/* Header: número + icono */}
                <div className="flex items-start justify-between mb-4">
                  <span
                    className="font-display text-3xl sm:text-4xl leading-none"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(249,179,52,0.9) 0%, rgba(212,160,23,0.4) 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                    aria-hidden="true"
                  >
                    {item.num}
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-white/[0.03] border border-brand-graphite/60 flex items-center justify-center group-hover:bg-brand-yellow/10 group-hover:border-brand-yellow/40 transition-colors">
                    <Icon
                      className="h-4 w-4 text-brand-gray group-hover:text-brand-yellow transition-colors"
                      aria-hidden="true"
                    />
                  </div>
                </div>

                {/* Título */}
                <h3 className="text-white text-base sm:text-lg leading-tight font-sans font-semibold mb-2">
                  {item.title}
                </h3>

                {/* Texto descriptivo */}
                <p className="text-sm text-brand-gray leading-relaxed flex-grow">
                  {item.text}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Stats bar — datos reales del mercado */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isIntersecting ? { opacity: 1, y: 0 } : {}}
          transition={{
            duration: 0.6,
            delay: 0.7,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mt-10 sm:mt-12 rounded-2xl border border-brand-gold/25 bg-gradient-to-br from-brand-graphite/20 via-black to-brand-black overflow-hidden"
        >
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none opacity-40"
            style={{
              background:
                "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(212,160,23,0.1), transparent 70%)",
            }}
          />
          <div className="relative p-6 sm:p-8 lg:p-10 grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8 text-center">
            <div>
              <p
                className="font-display text-4xl sm:text-5xl leading-none mb-2"
                style={{
                  background:
                    "linear-gradient(135deg, #f9b334, #d4a017)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                45%
              </p>
              <p className="text-xs sm:text-sm text-brand-gray leading-snug">
                caída de rendimiento después de 4 impresiones al mismo anuncio
              </p>
            </div>
            <div>
              <p
                className="font-display text-4xl sm:text-5xl leading-none mb-2"
                style={{
                  background:
                    "linear-gradient(135deg, #f9b334, #d4a017)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                2-3
              </p>
              <p className="text-xs sm:text-sm text-brand-gray leading-snug">
                semanas hasta que un anuncio pierde efectividad (antes 4+)
              </p>
            </div>
            <div>
              <p
                className="font-display text-4xl sm:text-5xl leading-none mb-2"
                style={{
                  background:
                    "linear-gradient(135deg, #f9b334, #d4a017)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                +200%
              </p>
              <p className="text-xs sm:text-sm text-brand-gray leading-snug">
                subida del costo de contratar creadores desde 2023
              </p>
            </div>
            <div>
              <p
                className="font-display text-4xl sm:text-5xl leading-none mb-2"
                style={{
                  background:
                    "linear-gradient(135deg, #f9b334, #d4a017)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                20+
              </p>
              <p className="text-xs sm:text-sm text-brand-gray leading-snug">
                variaciones mensuales mínimas para escalar en Meta Ads
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
