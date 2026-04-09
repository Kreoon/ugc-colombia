"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { Volume2, VolumeX, Maximize2 } from "lucide-react";
import { useIntersection } from "@/hooks/use-intersection";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";

interface VideoSample {
  id: number;
  src: string;
  poster: string;
  tag: string;
}

const FALLBACK_SAMPLES: VideoSample[] = [
  { id: 1, src: "/videos/samples/sample-1.mp4", poster: "/videos/samples/sample-1-poster.jpg", tag: "Skincare · LATAM" },
  { id: 2, src: "/videos/samples/sample-2.mp4", poster: "/videos/samples/sample-2-poster.jpg", tag: "Moda · Colombia" },
  { id: 3, src: "/videos/samples/sample-3.mp4", poster: "/videos/samples/sample-3-poster.jpg", tag: "Lifestyle · UGC" },
  { id: 4, src: "/videos/samples/sample-4.mp4", poster: "/videos/samples/sample-4-poster.jpg", tag: "Fitness · LATAM" },
  { id: 5, src: "/videos/samples/sample-5.mp4", poster: "/videos/samples/sample-5-poster.jpg", tag: "Beauty · UGC" },
  { id: 6, src: "/videos/samples/sample-6.mp4", poster: "/videos/samples/sample-6-poster.jpg", tag: "Tech · Colombia" },
];

interface KreoonVideoDTO {
  id: string;
  title?: string;
  video_url: string;
  thumbnail_url: string | null;
  creator_handle?: string;
  brand_name?: string;
  tag?: string;
}

/**
 * Solo aceptamos videos reproducibles directamente con <video src>:
 * .mp4, .webm, .mov sirven; los embed iframes (Bunny Stream
 * iframe.mediadelivery.net) no, porque rompen el reproductor nativo.
 */
function isPlayableVideoUrl(url: string): boolean {
  if (!url) return false;
  if (url.includes("iframe.mediadelivery.net")) return false;
  return /\.(mp4|webm|mov)(\?|$)/i.test(url);
}

function buildTag(v: KreoonVideoDTO): string {
  if (v.tag) return v.tag;
  const handle = v.creator_handle && v.creator_handle !== "creador" ? `@${v.creator_handle}` : "";
  const brand = v.brand_name && v.brand_name !== "Marca" ? v.brand_name : "";
  if (brand && handle) return `${brand} · ${handle}`;
  if (brand) return brand;
  if (handle) return handle;
  return "UGC";
}

/**
 * Pide videos aprobados a /api/showcase (proxy a KREOON).
 * Filtra a solo URLs reproducibles y con thumbnail. Si no hay suficientes
 * válidos, completa o cae al fallback estático.
 */
async function loadKreoonSamples(limit = 6): Promise<VideoSample[]> {
  try {
    // cache: "no-store" para que cada recarga reciba un orden distinto
    // (la Edge Function de KREOON ya barajea server-side).
    const res = await fetch(`/api/showcase?action=videos&limit=${limit * 4}`, {
      cache: "no-store",
    });
    if (!res.ok) return FALLBACK_SAMPLES;
    const json = (await res.json()) as { success: boolean; data: KreoonVideoDTO[] | null };
    if (!json.success || !json.data || json.data.length === 0) return FALLBACK_SAMPLES;

    const valid = json.data
      .filter(v => isPlayableVideoUrl(v.video_url) && v.thumbnail_url)
      .slice(0, limit)
      .map<VideoSample>((v, i) => ({
        id: i + 1,
        src: v.video_url,
        poster: v.thumbnail_url as string,
        tag: buildTag(v),
      }));

    if (valid.length === 0) return FALLBACK_SAMPLES;
    return valid;
  } catch {
    return FALLBACK_SAMPLES;
  }
}

function VideoCard({ sample }: { sample: VideoSample }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { ref: intersectionRef, isIntersecting } = useIntersection<HTMLDivElement>({
    threshold: 0.4,
    once: false,
  });
  const [dialogOpen, setDialogOpen] = useState(false);
  const [hovered, setHovered] = useState(false);

  // Autoplay cuando entra viewport, pausa cuando sale
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (isIntersecting) {
      video.play().catch(() => {/* autoplay blocked */});
    } else {
      video.pause();
    }
  }, [isIntersecting]);

  return (
    <>
      <motion.div
        ref={intersectionRef}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="group relative cursor-pointer flex-shrink-0 w-[200px] sm:w-auto"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() => setDialogOpen(true)}
        role="button"
        tabIndex={0}
        aria-label={`Ver video UGC: ${sample.tag}. Click para expandir con audio`}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setDialogOpen(true);
          }
        }}
      >
        {/* Card container 9:16 */}
        <div
          className="relative overflow-hidden rounded-2xl transition-all duration-300"
          style={{
            aspectRatio: "9/16",
            boxShadow: hovered
              ? "0 0 0 2px rgba(212,160,23,0.7), 0 16px 40px rgba(212,160,23,0.2)"
              : "0 4px 20px rgba(0,0,0,0.4)",
            transform: hovered ? "scale(1.03) translateY(-4px)" : "scale(1)",
            transition: "all 0.3s cubic-bezier(0.22,1,0.36,1)",
          }}
        >
          {/* Video */}
          <video
            ref={videoRef}
            src={sample.src}
            poster={sample.poster}
            muted
            loop
            playsInline
            preload="metadata"
            className="absolute inset-0 w-full h-full object-cover"
            aria-hidden="true"
          />

          {/* Overlay gradient bottom */}
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.85) 100%)",
            }}
          />

          {/* Badge tag */}
          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
            <span className="text-xs font-sans font-semibold text-white bg-black/60 backdrop-blur-sm px-2.5 py-1 rounded-full border border-white/10">
              {sample.tag}
            </span>
            <span className="text-xs font-sans text-brand-gray bg-black/60 backdrop-blur-sm px-2.5 py-1 rounded-full border border-white/10 flex items-center gap-1">
              <VolumeX className="h-3 w-3" aria-hidden="true" />
              Tap
            </span>
          </div>

          {/* Expand icon on hover */}
          <div
            aria-hidden="true"
            className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          >
            <div className="bg-black/60 backdrop-blur-sm p-1.5 rounded-lg border border-white/10">
              <Maximize2 className="h-3.5 w-3.5 text-white" />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Dialog fullscreen con audio */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-sm w-full p-0 overflow-hidden bg-black border-brand-gold/30">
          <DialogTitle className="sr-only">
            Video UGC: {sample.tag}
          </DialogTitle>
          <div className="relative" style={{ aspectRatio: "9/16" }}>
            <VideoDialogPlayer src={sample.src} poster={sample.poster} />
            <div
              aria-hidden="true"
              className="absolute bottom-0 left-0 right-0 p-4"
              style={{
                background:
                  "linear-gradient(to top, rgba(0,0,0,0.8), transparent)",
              }}
            >
              <span className="text-xs font-sans font-semibold text-brand-yellow tracking-wide">
                {sample.tag}
              </span>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

/** Player con audio dentro del dialog */
function VideoDialogPlayer({ src, poster }: { src: string; poster: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    videoRef.current?.play().catch(() => {});
  }, []);

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setMuted(videoRef.current.muted);
  };

  return (
    <>
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        loop
        playsInline
        autoPlay
        className="w-full h-full object-cover"
        aria-label="Video UGC de muestra"
      />
      <button
        onClick={toggleMute}
        className="absolute top-4 left-4 bg-black/60 backdrop-blur-sm p-2 rounded-full border border-white/10 text-white hover:bg-black/80 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold"
        aria-label={muted ? "Activar sonido" : "Silenciar video"}
      >
        {muted ? (
          <VolumeX className="h-4 w-4" aria-hidden="true" />
        ) : (
          <Volume2 className="h-4 w-4" aria-hidden="true" />
        )}
      </button>
    </>
  );
}

export function VideoSamples() {
  const { ref, isIntersecting } = useIntersection<HTMLDivElement>({
    threshold: 0.05,
  });
  const [samples, setSamples] = useState<VideoSample[]>(FALLBACK_SAMPLES);

  useEffect(() => {
    let cancelled = false;
    loadKreoonSamples(6).then(data => {
      if (!cancelled) setSamples(data);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section
      id="muestras"
      aria-labelledby="muestras-title"
      className="relative py-20 sm:py-28 overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, #000000 0%, #060504 50%, #000000 100%)",
      }}
    >
      {/* Glow ambiental */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 50%, rgba(212,160,23,0.04) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isIntersecting ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-12 sm:mb-16"
        >
          <p className="sr-only">Muestras</p>
          <h2
            id="muestras-title"
            className="font-display text-4xl sm:text-5xl lg:text-6xl text-white leading-tight"
          >
            Videos UGC reales,
            <br />
            <span
              style={{
                background: "linear-gradient(90deg, #f9b334, #d4a017)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              hechos por creadores reales.
            </span>
          </h2>
          <p className="mt-4 text-brand-gray text-base sm:text-lg">
            Click en cualquier video para ver con audio.
          </p>
        </motion.div>

        {/* Grid horizontal scrolleable en mobile, 3-col en desktop */}
        <div
          className="flex gap-4 overflow-x-auto pb-4 sm:grid sm:grid-cols-3 sm:overflow-visible sm:pb-0 lg:grid-cols-6 snap-x snap-mandatory sm:snap-none"
          role="list"
          aria-label="Muestras de videos UGC"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {samples.map((sample) => (
            <div
              key={sample.id}
              role="listitem"
              className="snap-center sm:snap-none"
            >
              <VideoCard sample={sample} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
