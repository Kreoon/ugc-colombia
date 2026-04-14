"use client";

import { useEffect, useRef, type PointerEvent as ReactPointerEvent } from "react";
import { motion } from "motion/react";
import { useIntersection } from "@/hooks/use-intersection";

const MARCAS: { label: string; logo?: string; font?: string; className?: string }[] = [
  { label: "Beemo", logo: "https://beemo.tv/img/logo_smartbeemo.svg" },
  { label: "Unlocked Academy", logo: "https://lwfiles.mycourse.app/68dc04362e776ced248cac8e-public/b5b23fe7d48093ee532a2206f6cd2049.png" },
  { label: "Altevo", logo: "https://altevo.com.co/cdn/shop/files/Altevo_Logo.png?v=1758591345&width=150" },
  { label: "Vitalcom", logo: "/brand/logos/vitalcom.png" },
  { label: "Shop Tokio", logo: "https://shoptokio.co/cdn/shop/files/gempages_513541607190955198-297e6fa2-f0e0-455a-bdf4-12a9388c792d.webp?v=1728089603&width=260" },
  { label: "Soluna", logo: "https://laboratoriosoluna.com/cdn/shop/files/Diseno_sin_titulo_1.png?v=1738769608&width=300" },
  { label: "Bioboosters", logo: "https://bioboosters.co/cdn/shop/files/Logo_Blanco.png?v=1758762956&width=290" },
];

// Triplicamos para tener buffer suficiente al wrap del loop infinito
const LOOP = [...MARCAS, ...MARCAS, ...MARCAS];

// pixels por milisegundo. ~90 px/seg (más rápido que el marquee anterior)
const AUTO_SPEED = 0.09;

export function Marcas() {
  const { ref: sectionRef, isIntersecting } = useIntersection<HTMLDivElement>({
    threshold: 0.2,
    once: true,
  });

  const trackRef = useRef<HTMLUListElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const offsetRef = useRef(0);
  const trackWidthRef = useRef(0);
  const draggingRef = useRef(false);
  const hoveringRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragStartOffsetRef = useRef(0);
  const lastTimeRef = useRef<number>(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    // Ancho del primer "set" (un tercio porque triplicamos)
    function measure() {
      if (!track) return;
      trackWidthRef.current = track.scrollWidth / 3;
    }
    measure();
    window.addEventListener("resize", measure);

    function tick(time: number) {
      if (!lastTimeRef.current) lastTimeRef.current = time;
      const dt = Math.min(time - lastTimeRef.current, 64); // cap a ~15fps mínimo
      lastTimeRef.current = time;

      if (!draggingRef.current && !hoveringRef.current && trackWidthRef.current > 0) {
        offsetRef.current -= AUTO_SPEED * dt;
      }

      // Wrap infinito
      if (trackWidthRef.current > 0) {
        while (offsetRef.current <= -trackWidthRef.current * 2) {
          offsetRef.current += trackWidthRef.current;
        }
        while (offsetRef.current >= 0) {
          offsetRef.current -= trackWidthRef.current;
        }
      }

      if (track) {
        track.style.transform = `translate3d(${offsetRef.current}px, 0, 0)`;
      }
      rafRef.current = requestAnimationFrame(tick);
    }

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("resize", measure);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  function onPointerDown(e: ReactPointerEvent<HTMLDivElement>) {
    draggingRef.current = true;
    dragStartXRef.current = e.clientX;
    dragStartOffsetRef.current = offsetRef.current;
    e.currentTarget.setPointerCapture(e.pointerId);
  }

  function onPointerMove(e: ReactPointerEvent<HTMLDivElement>) {
    if (!draggingRef.current) return;
    const dx = e.clientX - dragStartXRef.current;
    offsetRef.current = dragStartOffsetRef.current + dx;
  }

  function onPointerUp(e: ReactPointerEvent<HTMLDivElement>) {
    if (!draggingRef.current) return;
    draggingRef.current = false;
    lastTimeRef.current = 0;
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
  }

  return (
    <section
      ref={sectionRef}
      aria-labelledby="marcas-title"
      className="relative py-20 sm:py-24 px-4 sm:px-6 lg:px-8 bg-brand-black overflow-hidden"
    >
      {/* Glow ambient */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(249,179,52,0.06), transparent 60%)",
        }}
      />

      <div className="relative max-w-6xl mx-auto">
        {/* Eyebrow + titulo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isIntersecting ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-12 sm:mb-14"
        >
          <div className="inline-flex items-center gap-3 mb-5">
            <span
              aria-hidden="true"
              className="h-px w-8 bg-gradient-to-r from-transparent to-brand-gold/60"
            />
            <span className="text-[11px] sm:text-xs uppercase tracking-[0.35em] text-brand-gold/80 font-sans">
              Marcas que confiaron
            </span>
            <span
              aria-hidden="true"
              className="h-px w-8 bg-gradient-to-l from-transparent to-brand-gold/60"
            />
          </div>
          <h2
            id="marcas-title"
            className="font-display text-[clamp(1.75rem,4vw,2.75rem)] leading-[1.05] text-white tracking-tight"
          >
            Marcas con las que hemos{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #f9b334 0%, #d4a017 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              trabajado
            </span>
            .
          </h2>
        </motion.div>

        {/* Marquee infinito + draggable */}
        <div className="relative">
          {/* Fades laterales */}
          <div
            aria-hidden="true"
            className="absolute inset-y-0 left-0 w-24 sm:w-32 z-10 pointer-events-none bg-gradient-to-r from-brand-black to-transparent"
          />
          <div
            aria-hidden="true"
            className="absolute inset-y-0 right-0 w-24 sm:w-32 z-10 pointer-events-none bg-gradient-to-l from-brand-black to-transparent"
          />

          <div
            ref={wrapperRef}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
            onMouseEnter={() => {
              hoveringRef.current = true;
            }}
            onMouseLeave={() => {
              hoveringRef.current = false;
              lastTimeRef.current = 0;
            }}
            className="relative overflow-hidden rounded-2xl border border-brand-gold/15 bg-white/[0.015] py-10 sm:py-12 cursor-grab active:cursor-grabbing select-none touch-pan-x"
          >
            <ul
              ref={trackRef}
              className="flex items-center gap-12 sm:gap-20 whitespace-nowrap will-change-transform"
              style={{ transform: "translate3d(0,0,0)" }}
            >
              {LOOP.map((m, i) => (
                <li
                  key={`${m.label}-${i}`}
                  className="flex items-center justify-center shrink-0"
                  aria-hidden={i >= MARCAS.length ? "true" : undefined}
                >
                  <div
                    className="group/brand relative inline-flex items-center justify-center transition-transform duration-300 ease-out hover:scale-[1.18]"
                    title={m.label}
                  >
                    {m.logo ? (
                      <img
                        src={m.logo}
                        alt={m.label}
                        draggable={false}
                        className="h-8 sm:h-10 lg:h-12 w-auto object-contain select-none brightness-0 invert opacity-50 group-hover/brand:opacity-100 transition-opacity duration-300"
                      />
                    ) : (
                      <span
                        className={[
                          m.font,
                          m.className,
                          "text-2xl sm:text-3xl lg:text-[2rem] leading-none select-none",
                          "text-white/45 group-hover/brand:text-white/100 transition-colors duration-300",
                        ].join(" ")}
                      >
                        {m.label}
                      </span>
                    )}

                    {/* Tooltip */}
                    <span
                      className={[
                        "pointer-events-none absolute -bottom-9 left-1/2 -translate-x-1/2 whitespace-nowrap",
                        "rounded-md bg-brand-black/95 px-2.5 py-1 text-[10px] font-sans font-medium uppercase tracking-wider text-brand-yellow",
                        "border border-brand-gold/30 shadow-[0_4px_12px_-2px_rgba(249,179,52,0.3)]",
                        "opacity-0 translate-y-1 group-hover/brand:opacity-100 group-hover/brand:translate-y-0",
                        "transition-all duration-200",
                      ].join(" ")}
                      aria-hidden="true"
                    >
                      {m.label}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Disclaimer discreto */}
        <p className="mt-6 text-center text-[11px] sm:text-xs text-brand-gray/70 font-sans tracking-wide">
          Ecosistema Infiny Group · Clientes UGC LATAM
        </p>
      </div>
    </section>
  );
}
