"use client";

import { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

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
    }).then(() => {
      setEngineReady(true);
    });
  }, [reducedMotion]);

  if (reducedMotion || !engineReady) return null;

  return (
    <Particles
      id="ugc-particles"
      options={{
        fullScreen: { enable: true, zIndex: -1 },
        background: { color: { value: "transparent" } },
        fpsLimit: 60,
        particles: {
          number: { value: 40, density: { enable: true } },
          color: { value: "#D4A017" },
          opacity: {
            value: 0.3,
            animation: {
              enable: true,
              speed: 0.5,
              sync: false,
            },
          },
          size: { value: { min: 1, max: 3 } },
          move: {
            enable: true,
            speed: 0.4,
            direction: "none",
            random: true,
            outModes: { default: "out" },
          },
          links: { enable: false },
        },
        detectRetina: true,
        interactivity: {
          events: {
            onHover: { enable: false },
            onClick: { enable: false },
          },
        },
      }}
    />
  );
}
