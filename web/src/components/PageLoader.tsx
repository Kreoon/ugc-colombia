"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";

const SPLASH_DURATION_MS = 2200;

/**
 * PageLoader — splash animado de marca que cubre la pantalla durante
 * ~2.2s al cargar la página y en cada cambio de ruta.
 *
 * - Primera carga: se muestra al hidratar y desaparece tras SPLASH_DURATION_MS.
 * - Navegación: al cambiar pathname se vuelve a mostrar el splash.
 * - Fade in/out con scale y glow dorado.
 * - `pointer-events-none` cuando está oculto para no bloquear clicks.
 * - Respeta `prefers-reduced-motion` acortando la animación a 400ms.
 */
export function PageLoader() {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin") ?? false;
  const [visible, setVisible] = useState(!isAdmin);

  useEffect(() => {
    if (isAdmin) {
      setVisible(false);
      return;
    }
    setVisible(true);
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const duration = reduceMotion ? 400 : SPLASH_DURATION_MS;
    const timer = setTimeout(() => setVisible(false), duration);
    return () => clearTimeout(timer);
  }, [pathname, isAdmin]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="page-loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-brand-black"
          role="status"
          aria-live="polite"
          aria-label="Cargando UGC Colombia"
        >
          {/* Glow dorado ambiental */}
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 60% 40% at 50% 50%, rgba(212,160,23,0.18) 0%, transparent 70%)",
            }}
          />

          {/* Partícula dorada animada detrás del logo */}
          <motion.div
            aria-hidden="true"
            className="absolute"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: [0.8, 1.15, 0.95], opacity: [0, 0.6, 0.3] }}
            transition={{ duration: 1.8, ease: "easeInOut", repeat: Infinity }}
            style={{
              width: 260,
              height: 260,
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(249,179,52,0.25) 0%, transparent 70%)",
              filter: "blur(20px)",
            }}
          />

          {/* Logo animado */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 flex flex-col items-center gap-6"
          >
            <Image
              src="/brand/logo-dark-bg.png"
              alt="UGC Colombia"
              width={220}
              height={80}
              priority
              className="select-none"
              draggable={false}
            />
            {/* Barra de progreso sutil debajo del logo */}
            <div className="relative w-36 h-[2px] bg-white/10 rounded-full overflow-hidden">
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{
                  duration: 1.2,
                  ease: "easeInOut",
                  repeat: Infinity,
                }}
                className="absolute inset-y-0 w-1/2 rounded-full"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, #d4a017, #f9b334, #d4a017, transparent)",
                }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
