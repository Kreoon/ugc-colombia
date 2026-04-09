"use client";

import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useRef, type PointerEvent } from "react";

const LINE_ONE_WORDS = ["CONTENIDO", "REAL,"];
const LINE_TWO_WORDS = ["RESULTADOS", "REALES."];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.4,
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
 * Hero con logo animado 3D interactivo.
 * - Video .webm con canal alpha (fondo transparente)
 * - Fallback a .mp4 con mix-blend-mode: screen para navegadores sin soporte webm-alpha
 * - Wrapper con perspective + rotateX/rotateY via mouse parallax
 * - Idle float animation
 * - Drop shadow dorado para profundidad
 */
export function Hero() {
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  // Motion values para el tilt 3D
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smoothing con spring para que el movimiento sea natural
  const springConfig = { stiffness: 120, damping: 18, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Transform: rotación sutil (-12 a +12 grados)
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-12, 12]);
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [10, -10]);

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const el = wrapperRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const relX = (event.clientX - rect.left) / rect.width - 0.5;
    const relY = (event.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(relX);
    mouseY.set(relY);
  };

  const handlePointerLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section
      className="flex flex-col items-center justify-center gap-8 px-4 py-12 sm:py-16 text-center"
      aria-labelledby="hero-headline"
    >
      {/* Logo 3D con parallax */}
      <div
        ref={wrapperRef}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        className="w-full max-w-[320px] sm:max-w-[480px] lg:max-w-[560px] mx-auto"
        style={{ perspective: "1200px" }}
      >
        <motion.div
          style={{
            rotateX,
            rotateY,
            transformStyle: "preserve-3d",
          }}
          animate={{
            y: [0, -8, 0],
          }}
          transition={{
            y: {
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
          className="relative"
        >
          {/* Glow dorado detrás del logo */}
          <div
            aria-hidden
            className="absolute inset-0 -z-10 blur-3xl opacity-40"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(212,160,23,0.45) 0%, rgba(249,179,52,0.2) 30%, transparent 60%)",
              transform: "translateZ(-40px) scale(0.95)",
            }}
          />

          {/* Video transparente (webm con alpha) + fallback mp4 */}
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster="/logo-poster.png"
            className="w-full h-auto drop-shadow-[0_20px_40px_rgba(212,160,23,0.35)]"
            style={{
              filter:
                "drop-shadow(0 0 28px rgba(212,160,23,0.25)) drop-shadow(0 0 60px rgba(249,179,52,0.15))",
            }}
            aria-label="Logo animado de UGC Colombia"
          >
            <source src="/logo-animation.webm" type="video/webm" />
            <source src="/logo-animation.mp4" type="video/mp4" />
          </video>
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
          {/* Línea 1 */}
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

          {/* Línea 2 */}
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
        transition={{ delay: 1.1, duration: 0.7, ease: "easeOut" }}
      >
        Estamos construyendo algo grande. Muy pronto la agencia UGC que está
        cambiando el juego en LATAM.
      </motion.p>
    </section>
  );
}
