"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { useIntersection } from "@/hooks/use-intersection";
import { Quote, Volume2, VolumeX } from "lucide-react";

const TESTIMONIALS = [
  {
    video: "/videos/testimonios/testimonio-1.mp4",
    poster: "/videos/testimonios/testimonio-1.jpg",
    name: "Tokio",
    title: "Lencería para el hogar & Dropshipping",
    quote:
      "Llevamos más de un año trabajando con UGC Colombia y la experiencia ha sido excelente. Los videos están muy bien elaborados y trabajados. Los recomendamos ampliamente.",
    highlight: "muy bien elaborados y trabajados.",
  },
  {
    video: "/videos/testimonios/testimonio-2.mp4",
    poster: "/videos/testimonios/testimonio-2.jpg",
    name: "Equi Mayoristas",
    title: "Tienda mayorista",
    quote:
      "Nos sentimos súper contentos de trabajar con UGC Colombia. La colaboración, la atención y sobre todo los tiempos de entrega son increíbles. Han conectado a la perfección con nuestra visión.",
    highlight: "los tiempos de entrega son increíbles.",
  },
  {
    video: "/videos/testimonios/testimonio-3.mp4",
    poster: "/videos/testimonios/testimonio-3.jpg",
    name: "Michel Edery",
    title: "CEO · smartBeemo — +$18M en pauta",
    quote:
      "Con más de 18 millones de dólares invertidos en pauta, garantizamos el trabajo de UGC Colombia. Son muy rápidos, súper creativos y su contenido está completamente enfocado hacia la venta.",
    highlight: "completamente enfocado hacia la venta.",
  },
];

function TestimonialVideo({
  testimonial,
  index,
  isIntersecting,
}: {
  testimonial: (typeof TESTIMONIALS)[0];
  index: number;
  isIntersecting: boolean;
}) {
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

  // Separar la cita para resaltar la parte highlight
  const parts = testimonial.quote.split(testimonial.highlight);

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, y: 32 }}
      animate={isIntersecting ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.7,
        delay: 0.15 + index * 0.12,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="relative grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8 items-center rounded-2xl border border-brand-gold/20 bg-gradient-to-br from-white/[0.03] to-transparent p-5 sm:p-8 overflow-hidden"
    >
      {/* Video vertical */}
      <div className="relative lg:col-span-2 mx-auto w-full max-w-[240px] lg:max-w-none">
        <div
          className="relative rounded-xl overflow-hidden border border-brand-gold/25 shadow-[0_0_30px_-12px_rgba(212,160,23,0.25)]"
          style={{ aspectRatio: "9 / 16" }}
        >
          <video
            ref={videoRef}
            className="absolute inset-0 w-full h-full object-cover"
            src={testimonial.video}
            poster={testimonial.poster}
            muted
            loop
            playsInline
            preload="metadata"
            aria-label={`Testimonio de ${testimonial.name}`}
          />
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(180deg, rgba(0,0,0,0.4) 0%, transparent 20%, transparent 55%, rgba(0,0,0,0.8) 100%)",
            }}
          />
          <button
            type="button"
            onClick={toggleMute}
            aria-label={muted ? "Activar sonido" : "Silenciar"}
            aria-pressed={!muted}
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-brand-yellow/20 hover:border-brand-yellow/60 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold"
          >
            {muted ? (
              <VolumeX className="h-3.5 w-3.5" aria-hidden />
            ) : (
              <Volume2 className="h-3.5 w-3.5" aria-hidden />
            )}
          </button>
          <div className="absolute bottom-3 left-3 right-3 text-white">
            <p className="text-xs font-semibold drop-shadow-lg">
              {testimonial.name}
            </p>
            <p className="text-[10px] text-brand-gray drop-shadow-lg">
              {testimonial.title}
            </p>
          </div>
        </div>
      </div>

      {/* Quote */}
      <div className="lg:col-span-3 relative">
        <Quote
          className="absolute -top-1 -left-1 h-8 w-8 text-brand-gold/20"
          aria-hidden
        />
        <p className="font-display text-lg sm:text-xl lg:text-2xl text-white/95 leading-snug italic pl-4 lg:pl-5">
          &ldquo;{parts[0]}
          <span className="text-brand-yellow not-italic">
            {testimonial.highlight}
          </span>
          {parts[1]}&rdquo;
        </p>
        <div className="mt-4 pl-4 lg:pl-5">
          <p className="text-sm font-semibold text-white">
            {testimonial.name}
          </p>
          <p className="text-xs text-brand-gray">{testimonial.title}</p>
        </div>
      </div>
    </motion.div>
  );
}

export function PreciosTestimonial() {
  const { ref, isIntersecting } = useIntersection<HTMLDivElement>({
    threshold: 0.15,
    once: true,
  });

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
            Clientes reales
          </span>
          <h2
            id="testimonio-pricing-title"
            className="font-display text-[clamp(2rem,4.5vw,3.5rem)] leading-[1] text-white tracking-tight uppercase"
          >
            Lo que dicen{" "}
            <span
              style={{
                background: "linear-gradient(90deg, #f9b334, #d4a017)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              nuestros clientes
            </span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-brand-gray">
            3 testimonios en video de clientes activos que trabajan con nosotros.
          </p>
        </motion.div>

        {/* 3 testimonios con video */}
        <div className="space-y-6">
          {TESTIMONIALS.map((t, i) => (
            <TestimonialVideo
              key={t.name}
              testimonial={t}
              index={i}
              isIntersecting={isIntersecting}
            />
          ))}
        </div>

        {/* Métricas de contenido */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isIntersecting ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 grid grid-cols-3 gap-3 sm:gap-4 max-w-2xl mx-auto"
        >
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
        </motion.div>
      </div>
    </section>
  );
}
