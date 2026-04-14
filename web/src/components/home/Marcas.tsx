"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
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

const SCROLL_AMOUNT = 280;

export function Marcas() {
  const { ref, isIntersecting } = useIntersection<HTMLDivElement>({
    threshold: 0.2,
    once: true,
  });

  const scrollerRef = useRef<HTMLUListElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    function update() {
      if (!el) return;
      const { scrollLeft, scrollWidth, clientWidth } = el;
      setCanScrollLeft(scrollLeft > 4);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 4);
    }

    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  function scrollBy(direction: 1 | -1) {
    scrollerRef.current?.scrollBy({
      left: SCROLL_AMOUNT * direction,
      behavior: "smooth",
    });
  }

  return (
    <section
      ref={ref}
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

        {/* Carousel interactivo */}
        <div className="relative rounded-2xl border border-brand-gold/15 bg-white/[0.015] py-10 sm:py-12">
          {/* Botón izquierda */}
          <button
            type="button"
            onClick={() => scrollBy(-1)}
            aria-label="Marcas anteriores"
            className={[
              "absolute left-3 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-11 sm:h-11 rounded-full",
              "bg-brand-black/85 backdrop-blur border border-brand-gold/30 text-brand-yellow",
              "flex items-center justify-center transition-all duration-200",
              "hover:bg-brand-yellow/15 hover:border-brand-gold hover:scale-110",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold",
              canScrollLeft
                ? "opacity-100 pointer-events-auto"
                : "opacity-0 pointer-events-none",
            ].join(" ")}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Fade lateral izquierdo */}
          <div
            aria-hidden="true"
            className={[
              "absolute inset-y-0 left-0 w-20 sm:w-28 z-20 pointer-events-none transition-opacity duration-300",
              "bg-gradient-to-r from-brand-black via-brand-black/80 to-transparent rounded-l-2xl",
              canScrollLeft ? "opacity-100" : "opacity-0",
            ].join(" ")}
          />

          {/* Scroller */}
          <ul
            ref={scrollerRef}
            className="flex items-center gap-12 sm:gap-20 overflow-x-auto scroll-smooth scrollbar-hide snap-x snap-mandatory px-14 sm:px-16"
            style={{ scrollbarWidth: "none" }}
          >
            {MARCAS.map((m, i) => (
              <li
                key={m.label}
                className="flex items-center justify-center shrink-0 snap-center"
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={isIntersecting ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.2 + i * 0.06 }}
                  whileHover={{ scale: 1.18 }}
                  className="group/brand relative inline-flex items-center justify-center cursor-default"
                  title={m.label}
                >
                  {m.logo ? (
                    <img
                      src={m.logo}
                      alt={m.label}
                      draggable={false}
                      className={[
                        "h-10 sm:h-12 lg:h-14 w-auto object-contain select-none",
                        "brightness-0 invert opacity-55",
                        "transition-all duration-300 ease-out",
                        "group-hover/brand:opacity-100 group-hover/brand:brightness-100 group-hover/brand:invert-0",
                        "group-hover/brand:drop-shadow-[0_0_22px_rgba(249,179,52,0.5)]",
                      ].join(" ")}
                    />
                  ) : (
                    <span
                      className={[
                        m.font,
                        m.className,
                        "text-2xl sm:text-3xl lg:text-[2.25rem] leading-none select-none",
                        "text-white/50 transition-all duration-300 ease-out",
                        "group-hover/brand:text-brand-yellow",
                        "group-hover/brand:drop-shadow-[0_0_22px_rgba(249,179,52,0.5)]",
                      ].join(" ")}
                    >
                      {m.label}
                    </span>
                  )}

                  {/* Tooltip premium */}
                  <span
                    className={[
                      "pointer-events-none absolute -bottom-9 left-1/2 -translate-x-1/2 whitespace-nowrap",
                      "rounded-md bg-brand-black/95 px-2.5 py-1 text-[10px] font-sans font-medium uppercase tracking-wider text-brand-yellow",
                      "border border-brand-gold/40 shadow-[0_4px_12px_-2px_rgba(249,179,52,0.4)]",
                      "opacity-0 translate-y-1 group-hover/brand:opacity-100 group-hover/brand:translate-y-0",
                      "transition-all duration-200",
                    ].join(" ")}
                    aria-hidden="true"
                  >
                    {m.label}
                  </span>
                </motion.div>
              </li>
            ))}
          </ul>

          {/* Fade lateral derecho */}
          <div
            aria-hidden="true"
            className={[
              "absolute inset-y-0 right-0 w-20 sm:w-28 z-20 pointer-events-none transition-opacity duration-300",
              "bg-gradient-to-l from-brand-black via-brand-black/80 to-transparent rounded-r-2xl",
              canScrollRight ? "opacity-100" : "opacity-0",
            ].join(" ")}
          />

          {/* Botón derecha */}
          <button
            type="button"
            onClick={() => scrollBy(1)}
            aria-label="Siguientes marcas"
            className={[
              "absolute right-3 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-11 sm:h-11 rounded-full",
              "bg-brand-black/85 backdrop-blur border border-brand-gold/30 text-brand-yellow",
              "flex items-center justify-center transition-all duration-200",
              "hover:bg-brand-yellow/15 hover:border-brand-gold hover:scale-110",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold",
              canScrollRight
                ? "opacity-100 pointer-events-auto"
                : "opacity-0 pointer-events-none",
            ].join(" ")}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Disclaimer discreto */}
        <p className="mt-6 text-center text-[11px] sm:text-xs text-brand-gray/70 font-sans tracking-wide">
          Ecosistema Infiny Group · Clientes UGC LATAM
        </p>
      </div>
    </section>
  );
}
