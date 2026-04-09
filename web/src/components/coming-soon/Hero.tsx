"use client";

import { motion } from "motion/react";

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

export function Hero() {
  return (
    <section
      className="flex flex-col items-center justify-center gap-8 px-4 py-12 sm:py-16 text-center"
      aria-labelledby="hero-headline"
    >
      {/* Logo animado */}
      <div className="w-full max-w-[320px] sm:max-w-[480px] lg:max-w-[600px] mx-auto">
        <video
          src="/logo-animation.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="w-full h-auto"
          aria-label="Logo animado de UGC Colombia"
        />
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
