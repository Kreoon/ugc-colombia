"use client";

import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useRef, type PointerEvent } from "react";

const LINE_ONE_WORDS = ["CONTENIDO", "REAL,"];
const LINE_TWO_WORDS = ["RESULTADOS", "REALES."];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.8,
    },
  },
};

const wordVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

/**
 * Hero con logo PNG oficial + animaciones premium:
 * - Entrance: scale + blur → 1 con spring
 * - 3D mouse parallax (rotateX/rotateY)
 * - Idle float animation
 * - Gold glow pulse respirando
 * - Shine sweep (franja de luz diagonal cada 5s)
 * - Gold orbit particles (4 dots rotando alrededor)
 */
export function Hero() {
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  // Motion values para tilt 3D
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 120, damping: 18, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-15, 15]);
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [12, -12]);

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const el = wrapperRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    mouseX.set((event.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((event.clientY - rect.top) / rect.height - 0.5);
  };

  const handlePointerLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section
      className="flex flex-col items-center justify-center gap-16 sm:gap-20 lg:gap-24 px-4 py-16 sm:py-20 lg:py-24 text-center"
      aria-labelledby="hero-headline"
    >
      {/* Logo PNG con animaciones premium */}
      <div
        ref={wrapperRef}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        className="relative w-full max-w-[480px] sm:max-w-[640px] lg:max-w-[760px] mx-auto mb-4 sm:mb-6 lg:mb-8"
        style={{ perspective: "1400px" }}
      >
        {/* Container 3D con tilt + float + entrance */}
        <motion.div
          style={{
            rotateX,
            rotateY,
            transformStyle: "preserve-3d",
          }}
          initial={{ opacity: 0, scale: 0.6, filter: "blur(12px)" }}
          animate={{
            opacity: 1,
            scale: 1,
            filter: "blur(0px)",
            y: [0, -10, 0],
          }}
          transition={{
            opacity: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
            scale: { duration: 1, ease: [0.22, 1, 0.36, 1] },
            filter: { duration: 0.9, ease: "easeOut" },
            y: {
              duration: 4.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            },
          }}
          className="relative"
        >
          {/* Glow dorado pulsante detrás */}
          <motion.div
            aria-hidden
            className="absolute inset-0 -z-10 rounded-full blur-3xl"
            style={{
              background:
                "radial-gradient(ellipse 70% 60% at center, rgba(212,160,23,0.6) 0%, rgba(249,179,52,0.3) 40%, transparent 75%)",
              transform: "translateZ(-60px)",
            }}
            animate={{
              opacity: [0.4, 0.75, 0.4],
              scale: [0.95, 1.08, 0.95],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Particles orbitando (4 dots dorados) */}
          <motion.div
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            {[0, 90, 180, 270].map((angle) => (
              <div
                key={angle}
                className="absolute top-1/2 left-1/2 w-2 h-2 rounded-full bg-brand-gold shadow-[0_0_12px_rgba(212,160,23,0.8)]"
                style={{
                  transform: `rotate(${angle}deg) translateX(min(260px,38vw)) translateY(-4px)`,
                }}
              />
            ))}
          </motion.div>

          {/* Logo wrapper con shine sweep */}
          <div className="relative logo-shine-wrap">
            <Image
              src="/brand/logo-dark-bg.png"
              alt="UGC Colombia"
              width={1640}
              height={580}
              priority
              className="w-full h-auto relative z-10"
              style={{
                filter:
                  "drop-shadow(0 0 24px rgba(212,160,23,0.45)) drop-shadow(0 0 60px rgba(249,179,52,0.2)) drop-shadow(0 10px 30px rgba(0,0,0,0.5))",
              }}
            />
            {/* Franja de luz diagonal que barre el logo */}
            <div
              aria-hidden
              className="logo-shine pointer-events-none absolute inset-0 z-20"
            />
          </div>
        </motion.div>
      </div>

      {/* Headline principal */}
      <div id="hero-headline">
        <motion.div
          className="overflow-hidden"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-0">
            {LINE_ONE_WORDS.map((word) => (
              <motion.span
                key={word}
                variants={wordVariants}
                className="font-display text-[clamp(3rem,10vw,7.5rem)] leading-none tracking-tight text-white uppercase block"
              >
                {word}
              </motion.span>
            ))}
          </div>

          <div className="flex flex-wrap justify-center gap-x-4 gap-y-0 mt-1">
            {LINE_TWO_WORDS.map((word) => (
              <motion.span
                key={word}
                variants={wordVariants}
                className="font-display text-[clamp(3rem,10vw,7.5rem)] leading-none tracking-tight text-brand-gold uppercase block"
              >
                {word}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Subheadline */}
      <motion.p
        className="max-w-xl text-[clamp(1rem,2.5vw,1.5rem)] leading-relaxed text-brand-gray font-sans"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.6, duration: 0.7, ease: "easeOut" }}
      >
        Estamos construyendo algo grande. Muy pronto la agencia UGC que está
        cambiando el juego en LATAM.
      </motion.p>
    </section>
  );
}
