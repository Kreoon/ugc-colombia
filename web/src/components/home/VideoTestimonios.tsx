"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { Quote, Volume2, VolumeX } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useAudit } from "@/components/lead-audit/AuditContext";

type Testimonial = {
  id: string;
  src: string;
  poster: string;
  name: string;
  role: string;
  brand: string;
  quote: string;
  tag: string;
};

const TESTIMONIOS: Testimonial[] = [
  {
    id: "tokio",
    src: "/videos/testimonios/testimonio-1.mp4",
    poster: "/videos/testimonios/testimonio-1.jpg",
    name: "Tokio",
    role: "Lencería para el hogar & Dropshipping",
    brand: "Cliente desde hace +1 año",
    quote:
      "Llevamos más de un año trabajando con UGC Colombia y la experiencia ha sido excelente. Los videos están muy bien elaborados y trabajados. Los recomendamos ampliamente.",
    tag: "Lencería",
  },
  {
    id: "equi",
    src: "/videos/testimonios/testimonio-2.mp4",
    poster: "/videos/testimonios/testimonio-2.jpg",
    name: "Equi Mayoristas",
    role: "Tienda mayorista",
    brand: "Colombia",
    quote:
      "Nos sentimos súper contentos de trabajar con UGC Colombia. La colaboración, la atención y sobre todo los tiempos de entrega son increíbles. Han conectado a la perfección con nuestra visión.",
    tag: "Mayoristas",
  },
  {
    id: "smartbeemo",
    src: "/videos/testimonios/testimonio-3.mp4",
    poster: "/videos/testimonios/testimonio-3.jpg",
    name: "Michel Edery",
    role: "CEO · smartBeemo",
    brand: "+$18M invertidos en pauta",
    quote:
      "Con más de 18 millones de dólares invertidos en pauta, garantizamos el trabajo de UGC Colombia. Son muy rápidos, súper creativos y su contenido está completamente enfocado hacia la venta.",
    tag: "smartBeemo",
  },
];

function VideoCard({ t, idx }: { t: Testimonial; idx: number }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [muted, setMuted] = useState(true);
  const [inView, setInView] = useState(false);

  // Lazy autoplay: solo cuando >=50% visible, pausa al salir.
  useEffect(() => {
    const el = containerRef.current;
    const video = videoRef.current;
    if (!el || !video) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
        if (entry.isIntersecting) {
          video.play().catch(() => { /* autoplay bloqueado */ });
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
    if (!video.muted) video.play().catch(() => {});
  };

  return (
    <motion.article
      ref={containerRef}
      className="group relative rounded-2xl overflow-hidden"
      style={{ aspectRatio: "9 / 16" }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6 }}
      aria-label={`Video testimonio — ${t.brand}`}
    >
      {/* Video */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        src={t.src}
        poster={t.poster}
        muted
        loop
        playsInline
        preload="metadata"
        aria-label={`Testimonio de ${t.brand}`}
      />

      {/* Gradient overlay para legibilidad */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0) 25%, rgba(0,0,0,0) 55%, rgba(0,0,0,0.85) 100%)",
        }}
      />

      {/* Border gradient dorado */}
      <div
        aria-hidden
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{
          padding: "1px",
          background:
            "linear-gradient(135deg, rgba(249,179,52,0.5), rgba(212,160,23,0.2) 50%, transparent 100%)",
          WebkitMask:
            "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
      />

      {/* Content overlay */}
      <div className="relative h-full flex flex-col justify-between p-5 sm:p-6">
        {/* Top — tag + mute */}
        <div className="flex items-start justify-between">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/50 backdrop-blur-md border border-brand-yellow/40 text-[10px] font-semibold text-brand-yellow tracking-wider uppercase">
            {t.tag}
          </span>
          <button
            type="button"
            onClick={toggleMute}
            aria-label={muted ? "Activar sonido" : "Silenciar"}
            aria-pressed={!muted}
            className="w-9 h-9 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-brand-yellow/20 hover:border-brand-yellow/60 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold"
          >
            {muted ? (
              <VolumeX className="w-4 h-4" aria-hidden />
            ) : (
              <Volume2 className="w-4 h-4" aria-hidden />
            )}
          </button>
        </div>

        {/* Bottom — quote + autor */}
        <div className="space-y-3">
          <div>
            <Quote className="w-4 h-4 text-brand-gold/80 mb-2" aria-hidden />
            <p className="text-sm text-white leading-snug italic line-clamp-3 drop-shadow-lg">
              &ldquo;{t.quote}&rdquo;
            </p>
          </div>
          <div className="flex items-center gap-2.5 pt-2 border-t border-white/10">
            <div className="relative w-9 h-9 rounded-full overflow-hidden bg-gradient-to-br from-brand-yellow/30 to-brand-graphite flex items-center justify-center border border-brand-gold/40 flex-shrink-0">
              <span className="font-display text-sm text-brand-yellow">
                {t.name.charAt(0)}
              </span>
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-white truncate">{t.name}</p>
              <p className="text-[10px] text-brand-gray truncate">
                {t.role} · {t.brand}
              </p>
            </div>
            {inView && (
              <span
                aria-hidden
                className="ml-auto w-1.5 h-1.5 rounded-full bg-brand-yellow animate-pulse"
              />
            )}
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export function VideoTestimonios() {
  const { openAudit } = useAudit();

  return (
    <section
      id="testimonios"
      className="relative py-20 sm:py-28 lg:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden scroll-mt-20 sm:scroll-mt-24"
      aria-labelledby="testimonios-heading"
    >
      {/* Imagen editorial de fondo */}
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <Image src="/brand/home/testimonios.png" alt="" fill sizes="100vw" className="object-cover opacity-[0.18]" />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-black/80 via-brand-black/70 to-brand-black" />
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 40% at center top, rgba(212,160,23,0.07) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          className="flex flex-col items-start gap-4 mb-14 sm:mb-20"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="inline-block px-3 py-1 rounded-full text-[11px] font-sans font-bold tracking-widest uppercase mb-5 bg-brand-yellow/15 text-brand-yellow border border-brand-yellow/40">
            Clientes reales
          </span>
          <h2
            id="testimonios-heading"
            className="font-display text-[clamp(2.5rem,6vw,5rem)] leading-[0.95] text-white tracking-tight uppercase"
          >
            Lo que dicen <br />
            <span className="text-brand-yellow">nuestros clientes.</span>
          </h2>
          <p className="max-w-2xl text-base sm:text-lg text-brand-gray mt-2">
            Marcas reales contando, en video, cómo UGC Colombia movió sus métricas.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-8">
          {TESTIMONIOS.map((t, idx) => (
            <VideoCard key={t.id} t={t} idx={idx} />
          ))}
        </div>

        <motion.p
          className="text-center text-sm text-brand-gray/60 mt-10 sm:mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          ¿Ya eres cliente y quieres compartir tu historia?{" "}
          <button
            type="button"
            onClick={() => openAudit("video_testimonios")}
            className="text-brand-yellow hover:text-brand-gold underline underline-offset-4 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold rounded-sm"
          >
            Cuéntanos →
          </button>
        </motion.p>
      </div>
    </section>
  );
}
