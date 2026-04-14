"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const CLIENT_LOGOS: {
  name: string;
  letters: string;
  logo?: string;
}[] = [
  { name: "Beemo", letters: "Be", logo: "https://beemo.tv/img/logo_smartbeemo.svg" },
  { name: "Unlocked Academy", letters: "UA", logo: "https://lwfiles.mycourse.app/68dc04362e776ced248cac8e-public/b5b23fe7d48093ee532a2206f6cd2049.png" },
  { name: "Altevo", letters: "Al", logo: "https://altevo.com.co/cdn/shop/files/Altevo_Logo.png?v=1758591345&width=150" },
  { name: "Vitalcom", letters: "Vi", logo: "/brand/logos/vitalcom.png" },
  { name: "Shop Tokio", letters: "ST", logo: "https://shoptokio.co/cdn/shop/files/gempages_513541607190955198-297e6fa2-f0e0-455a-bdf4-12a9388c792d.webp?v=1728089603&width=260" },
  { name: "Soluna", letters: "So", logo: "https://laboratoriosoluna.com/cdn/shop/files/Diseno_sin_titulo_1.png?v=1738769608&width=300" },
  { name: "Bioboosters", letters: "Bi", logo: "https://bioboosters.co/cdn/shop/files/Logo_Blanco.png?v=1758762956&width=290" },
];

const SCROLL_AMOUNT = 240;

export function ClientLogoBar({ className }: { className?: string }) {
  const scrollerRef = useRef<HTMLDivElement>(null);
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
    <div className={cn("w-full", className)}>
      <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.3em] text-brand-graphite text-center mb-5 font-sans">
        Confían en nosotros
      </p>

      <div className="relative">
        {/* Botón izquierda */}
        <button
          type="button"
          onClick={() => scrollBy(-1)}
          aria-label="Anterior"
          className={cn(
            "absolute left-0 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-9 sm:h-9 rounded-full",
            "bg-brand-black/80 backdrop-blur border border-white/15 text-brand-gray",
            "flex items-center justify-center transition-all duration-200",
            "hover:text-brand-yellow hover:border-brand-gold/50 hover:scale-110",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold",
            canScrollLeft
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none",
          )}
        >
          <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        {/* Fade lateral izquierdo */}
        <div
          aria-hidden
          className={cn(
            "absolute left-0 top-0 bottom-0 w-12 sm:w-16 z-10 pointer-events-none transition-opacity duration-300",
            "bg-gradient-to-r from-brand-black to-transparent",
            canScrollLeft ? "opacity-100" : "opacity-0",
          )}
        />

        {/* Scroller horizontal */}
        <div
          ref={scrollerRef}
          className="flex items-center gap-8 sm:gap-12 overflow-x-auto scroll-smooth scrollbar-hide snap-x snap-mandatory px-10 sm:px-12 py-2"
          style={{ scrollbarWidth: "none" }}
        >
          {CLIENT_LOGOS.map((client, i) => (
            <motion.div
              key={client.name}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 + i * 0.06 }}
              whileHover={{ scale: 1.18 }}
              className="group flex-shrink-0 snap-center cursor-default"
              title={client.name}
            >
              {client.logo ? (
                <img
                  src={client.logo}
                  alt={client.name}
                  draggable={false}
                  className={cn(
                    "h-8 sm:h-9 w-auto object-contain select-none",
                    "brightness-0 invert opacity-50",
                    "transition-all duration-300 ease-out",
                    "group-hover:opacity-100 group-hover:brightness-100 group-hover:invert-0",
                    "group-hover:drop-shadow-[0_0_18px_rgba(249,179,52,0.45)]",
                  )}
                />
              ) : (
                <div className="flex items-center gap-2">
                  <span
                    className={cn(
                      "w-8 h-8 sm:w-9 sm:h-9 rounded-md bg-white/[0.06] border border-white/[0.08]",
                      "flex items-center justify-center text-[11px] font-bold text-white/50 font-sans tracking-tight",
                      "transition-all duration-300",
                      "group-hover:bg-brand-yellow/15 group-hover:text-brand-yellow group-hover:border-brand-gold/40",
                    )}
                  >
                    {client.letters}
                  </span>
                  <span className="text-xs sm:text-sm font-sans font-medium text-white/40 tracking-wide hidden sm:inline group-hover:text-white transition-colors">
                    {client.name}
                  </span>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Fade lateral derecho */}
        <div
          aria-hidden
          className={cn(
            "absolute right-0 top-0 bottom-0 w-12 sm:w-16 z-10 pointer-events-none transition-opacity duration-300",
            "bg-gradient-to-l from-brand-black to-transparent",
            canScrollRight ? "opacity-100" : "opacity-0",
          )}
        />

        {/* Botón derecha */}
        <button
          type="button"
          onClick={() => scrollBy(1)}
          aria-label="Siguiente"
          className={cn(
            "absolute right-0 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-9 sm:h-9 rounded-full",
            "bg-brand-black/80 backdrop-blur border border-white/15 text-brand-gray",
            "flex items-center justify-center transition-all duration-200",
            "hover:text-brand-yellow hover:border-brand-gold/50 hover:scale-110",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold",
            canScrollRight
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none",
          )}
        >
          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      </div>
    </div>
  );
}
