"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { useIntersection } from "@/hooks/use-intersection";
import { Quote, Volume2, VolumeX } from "lucide-react";

export function PreciosTestimonial() {
  const { ref, isIntersecting } = useIntersection<HTMLDivElement>({
    threshold: 0.3,
    once: true,
  });
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [muted, setMuted] = useState(true);

  // Lazy autoplay
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
          <div className="inline-flex items-center gap-3 mb-5">
            <span
              aria-hidden
              className="h-px w-8 bg-gradient-to-r from-transparent to-brand-gold/60"
            />
            <span className="text-[11px] sm:text-xs uppercase tracking-[0.35em] text-brand-gold/80 font-sans">
              Caso real
            </span>
            <span
              aria-hidden
              className="h-px w-8 bg-gradient-to-l from-transparent to-brand-gold/60"
            />
          </div>
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
              className="relative rounded-2xl overflow-hidden border border-brand-gold/30"
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
              {/* Gradient overlay */}
              <div
                aria-hidden
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(0,0,0,0.35) 0%, transparent 25%, transparent 55%, rgba(0,0,0,0.75) 100%)",
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
              generación de e-commerce necesita:{" "}
              <span className="text-brand-yellow not-italic">
                contenido real que vende.
              </span>
              &rdquo;
            </p>

            {/* Metrics */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4 mt-8">
              {[
                { value: "+217%", label: "ROAS promedio" },
                { value: "-55%", label: "CPA" },
                { value: "+146%", label: "CTR" },
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
      </div>
    </section>
  );
}
