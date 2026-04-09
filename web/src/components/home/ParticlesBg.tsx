"use client";

import { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

/**
 * Particles doradas de fondo — reutilizable en hero y otras secciones.
 * zIndex: -1 para que quede detrás del contenido.
 */
export function ParticlesBg() {
  const [engineReady, setEngineReady] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (reducedMotion) return;
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setEngineReady(true));
  }, [reducedMotion]);

  if (reducedMotion || !engineReady) return null;

  return (
    <Particles
      id="ugc-particles-home"
      className="absolute inset-0"
      options={{
        fullScreen: { enable: false },
        background: { color: { value: "transparent" } },
        fpsLimit: 60,
        particles: {
          number: { value: 50, density: { enable: true } },
          color: { value: ["#D4A017", "#f9b334", "#c9940a"] },
          opacity: {
            value: { min: 0.1, max: 0.4 },
            animation: { enable: true, speed: 0.4, sync: false },
          },
          size: { value: { min: 1, max: 2.5 } },
          move: {
            enable: true,
            speed: 0.35,
            direction: "none",
            random: true,
            outModes: { default: "out" },
          },
          links: { enable: false },
        },
        detectRetina: true,
        interactivity: {
          events: { onHover: { enable: false }, onClick: { enable: false } },
        },
      }}
    />
  );
}
