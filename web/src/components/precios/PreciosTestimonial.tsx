"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { useIntersection } from "@/hooks/use-intersection";
import { Quote, Volume2, VolumeX, Star } from "lucide-react";

const SECOND_TESTIMONIAL = {
  quote:
    "Pasamos de producir 2 videos al mes internamente a tener 30 listos para ads. El equipo de UGC Colombia nos devolvio el tiempo para enfocarnos en escalar.",
  name: "Carolina Mejia",
  title: "CMO · FitLab LATAM",
  initials: "CM",
};

export function PreciosTestimonial() {
  const { ref, isIntersecting } = useIntersection<HTMLDivElement>({
    threshold: 0.3,
    once: true,
  });
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    const el = containerRef.current;
    const video = videoRef.current;
    if (!el || !video) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.5 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setMuted(video.muted);
  };

  return (
    <section
      ref={ref}
      id="testimonio-pricing"
      aria-labelledby="testimonio-pricing-title"
      className="relative py-20 sm:py-28 lg:py-32 px-4 sm:px-6 lg:px-8 bg-brand-black overflow-hidden"
    >
      {/* Imagen editorial de fondo */}
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <Image
          src="/brand/precios/testimonial.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-18"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-black/80 via-brand-black/70 to-brand-black" />
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 50% 60% at 50% 50%, rgba(212,160,23,0.08), transparent 70%)",
        }}
      />

      <div className="relative max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isIntersecting ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-12 max-w-2xl mx-auto"
        >
          <span className="inline-block px-3 py-1 rounded-full text-[11px] font-sans font-bold tracking-widest uppercase mb-5 bg-brand-yellow/15 text-brand-yellow border border-brand-yellow/40">
            Caso real
          </span>
          <h2
            id="testimonio-pricing-title"
            className="font-display text-[clamp(2rem,4.5vw,3.5rem)] leading-[1] text-white tracking-tight uppercase"
          >
            Lo que dice{" "}
            <span
              style={{
                background: "linear-gradient(90deg, #f9b334, #d4a017)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Michel Edery
            </span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-brand-gray">
            CEO & Co-Founder de smartBeemo — CommerceTech LATAM con +60K
            estudiantes.
          </p>
        </motion.div>

        {/* Testimonial principal con video */}
        <motion.div
          ref={containerRef}
          initial={{ opacity: 0, y: 32 }}
          animate={isIntersecting ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="relative grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-10 items-center rounded-3xl border border-brand-gold/25 bg-gradient-to-br from-white/[0.03] to-transparent p-6 sm:p-10 lg:p-12 overflow-hidden"
        >
          {/* Glow corner */}
          <div
            aria-hidden
            className="absolute top-0 right-0 w-96 h-96 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at 100% 0%, rgba(249,179,52,0.14), transparent 65%)",
            }}
          />

          {/* Video vertical */}
          <div className="relative lg:col-span-2 mx-auto w-full max-w-[280px] lg:max-w-none">
            <div
              className="relative rounded-2xl overflow-hidden border border-brand-gold/30 shadow-[0_0_40px_-15px_rgba(212,160,23,0.3)]"
              style={{ aspectRatio: "9 / 16" }}
            >
              <video
                ref={videoRef}
                className="absolute inset-0 w-full h-full object-cover"
                src="/videos/testimonios/testimonio-3.mp4"
                poster="/videos/testimonios/testimonio-3.jpg"
                muted
                loop
                playsInline
                preload="metadata"
                aria-label="Testimonio de Michel Edery"
              />
              {/* Gradient overlay mejorado */}
              <div
                aria-hidden
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(0,0,0,0.45) 0%, transparent 20%, transparent 50%, rgba(0,0,0,0.85) 100%)",
                }}
              />
              {/* Mute toggle */}
              <button
                type="button"
                onClick={toggleMute}
                aria-label={muted ? "Activar sonido" : "Silenciar"}
                aria-pressed={!muted}
                className="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-brand-yellow/20 hover:border-brand-yellow/60 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold"
              >
                {muted ? (
                  <VolumeX className="h-4 w-4" aria-hidden />
                ) : (
                  <Volume2 className="h-4 w-4" aria-hidden />
                )}
              </button>
              {/* Name bottom */}
              <div className="absolute bottom-3 left-3 right-3 text-white">
                <p className="text-xs font-semibold drop-shadow-lg">
                  Michel Edery
                </p>
                <p className="text-[10px] text-brand-gray drop-shadow-lg">
                  CEO · smartBeemo
                </p>
              </div>
            </div>
          </div>

          {/* Quote */}
          <div className="lg:col-span-3 relative">
            <Quote
              className="absolute -top-2 -left-2 h-10 w-10 text-brand-gold/25"
              aria-hidden
            />
            <p className="font-display text-xl sm:text-2xl lg:text-3xl text-white/95 leading-snug italic mb-6 pl-4 lg:pl-6">
              &ldquo;Lo que hace UGC Colombia es exactamente lo que la nueva
              generacion de e-commerce necesita:{" "}
              <span className="text-brand-yellow not-italic">
                contenido real que vende.
              </span>
              &rdquo;
            </p>

            {/* Metrics — métricas reales de contenido */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4 mt-8">
              {[
                { value: "38%", label: "Hook rate (3s)" },
                { value: "2.8%", label: "CTR Meta Ads" },
                { value: "60%+", label: "Hold rate" },
              ].map((m) => (
                <div
                  key={m.label}
                  className="rounded-xl border border-brand-gold/30 bg-white/[0.02] p-3 sm:p-4 text-center"
                >
                  <p
                    className="font-display text-2xl sm:text-3xl"
                    style={{
                      background:
                        "linear-gradient(135deg, #f9b334 0%, #d4a017 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    {m.value}
                  </p>
                  <p className="text-[10px] sm:text-xs text-brand-gray mt-1 tracking-wide">
                    {m.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Segundo testimonial — solo texto */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isIntersecting ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 rounded-2xl border border-brand-graphite/50 bg-white/[0.02] p-6 sm:p-8 max-w-4xl mx-auto"
        >
          <div className="flex items-start gap-4 sm:gap-6">
            {/* Avatar */}
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-brand-yellow/20 to-brand-gold/10 border border-brand-gold/30 flex items-center justify-center">
              <span className="font-display text-sm text-brand-yellow">
                {SECOND_TESTIMONIAL.initials}
              </span>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-1 mb-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-3.5 w-3.5 fill-brand-yellow text-brand-yellow"
                    aria-hidden
                  />
                ))}
              </div>
              <p className="text-sm sm:text-base text-white/90 leading-relaxed italic mb-3">
                &ldquo;{SECOND_TESTIMONIAL.quote}&rdquo;
              </p>
              <div>
                <p className="text-xs font-semibold text-white">
                  {SECOND_TESTIMONIAL.name}
                </p>
                <p className="text-[11px] text-brand-gray">
                  {SECOND_TESTIMONIAL.title}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
