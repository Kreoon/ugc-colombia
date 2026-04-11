"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { useIntersection } from "@/hooks/use-intersection";
import { Quote, Volume2, VolumeX, BadgeCheck } from "lucide-react";

export function PreciosTestimonial() {
  const { ref, isIntersecting } = useIntersection<HTMLDivElement>({
    threshold: 0.2,
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
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isIntersecting ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-12 max-w-3xl mx-auto"
        >
          <span className="inline-block px-3 py-1 rounded-full text-[11px] font-sans font-bold tracking-widest uppercase mb-5 bg-brand-yellow/15 text-brand-yellow border border-brand-yellow/40">
            Validado por referentes
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
          <p className="mt-4 text-sm sm:text-base text-brand-gray max-w-xl mx-auto">
            CEO de smartBeemo, la plataforma de e-commerce más grande de LATAM
            con +60K estudiantes y +$18M invertidos en pauta digital.
          </p>
        </motion.div>

        {/* Testimonial card premium */}
        <motion.div
          ref={containerRef}
          initial={{ opacity: 0, y: 32 }}
          animate={isIntersecting ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="relative grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-center rounded-3xl overflow-hidden"
        >
          {/* Background premium */}
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(135deg, #0c0c0c 0%, #141208 40%, #0a0900 100%)",
            }}
          />
          {/* Gradient border dorado */}
          <div
            aria-hidden
            className="absolute inset-0 rounded-3xl pointer-events-none"
            style={{
              padding: "1.5px",
              background:
                "linear-gradient(135deg, rgba(249,179,52,0.7) 0%, rgba(212,160,23,0.4) 30%, rgba(212,160,23,0.15) 60%, transparent 100%)",
              WebkitMask:
                "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
              WebkitMaskComposite: "xor",
              maskComposite: "exclude",
            }}
          />
          {/* Glow corner */}
          <div
            aria-hidden
            className="absolute top-0 right-0 w-96 h-96 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at 100% 0%, rgba(249,179,52,0.18), transparent 65%)",
            }}
          />
          <div
            aria-hidden
            className="absolute bottom-0 left-0 w-80 h-80 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at 0% 100%, rgba(212,160,23,0.1), transparent 65%)",
            }}
          />

          {/* Video vertical */}
          <div className="relative lg:col-span-2 p-6 sm:p-8 lg:p-10 lg:pr-0">
            <div className="mx-auto w-full max-w-[280px] lg:max-w-none">
              <div
                className="relative rounded-2xl overflow-hidden border-2 border-brand-gold/40 shadow-[0_0_60px_-15px_rgba(212,160,23,0.4)]"
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
                  aria-label="Testimonio de Michel Edery, CEO de smartBeemo"
                />
                {/* Gradient overlay */}
                <div
                  aria-hidden
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(0,0,0,0.4) 0%, transparent 20%, transparent 55%, rgba(0,0,0,0.85) 100%)",
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
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <p className="text-sm font-bold drop-shadow-lg">
                      Michel Edery
                    </p>
                    <BadgeCheck
                      className="h-4 w-4 text-brand-yellow drop-shadow-lg"
                      aria-label="Verificado"
                    />
                  </div>
                  <p className="text-[11px] text-white/80 drop-shadow-lg">
                    CEO · smartBeemo
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Quote + credenciales */}
          <div className="relative lg:col-span-3 p-6 sm:p-8 lg:p-10 lg:pl-0">
            {/* Quote icon */}
            <Quote
              className="h-12 w-12 text-brand-gold/20 mb-4"
              aria-hidden
            />

            {/* Cita principal */}
            <p className="font-display text-xl sm:text-2xl lg:text-[1.75rem] xl:text-3xl text-white leading-snug italic mb-8">
              &ldquo;Con más de 18 millones de dólares invertidos en pauta,{" "}
              <span
                className="not-italic"
                style={{
                  background:
                    "linear-gradient(90deg, #f9b334 0%, #d4a017 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                garantizamos el trabajo de UGC Colombia.
              </span>{" "}
              Son muy rápidos, súper creativos y su contenido está completamente
              enfocado hacia la venta.&rdquo;
            </p>

            {/* Autor con credenciales */}
            <div className="flex items-center gap-4 mb-8 pb-8 border-b border-brand-gold/15">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-brand-yellow to-brand-gold-dark flex items-center justify-center shadow-[0_0_24px_rgba(249,179,52,0.4)] flex-shrink-0">
                <span className="font-display text-xl text-black font-bold">
                  ME
                </span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <p className="text-base font-bold text-white">
                    Michel Edery
                  </p>
                  <BadgeCheck
                    className="h-4 w-4 text-brand-yellow"
                    aria-hidden
                  />
                </div>
                <p className="text-sm text-brand-gray">
                  CEO & Co-Founder · smartBeemo
                </p>
                <p className="text-xs text-brand-gold/60 mt-0.5">
                  CommerceTech LATAM · +60K estudiantes · +$18M en pauta
                </p>
              </div>
            </div>

            {/* Credenciales en grid */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4">
              {[
                { value: "+$18M", label: "Invertidos en pauta" },
                { value: "+60K", label: "Estudiantes LATAM" },
                { value: "#1", label: "CommerceTech LATAM" },
              ].map((m) => (
                <div
                  key={m.label}
                  className="rounded-xl border border-brand-gold/25 bg-brand-yellow/[0.03] p-3 sm:p-4 text-center"
                >
                  <p
                    className="font-display text-xl sm:text-2xl"
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
      </div>
    </section>
  );
}
