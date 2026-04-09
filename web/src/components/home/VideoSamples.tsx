"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { Volume2, VolumeX } from "lucide-react";
import { useIntersection } from "@/hooks/use-intersection";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";

type VideoKind = "file" | "iframe";

interface VideoSample {
  id: number;
  src: string;
  poster: string;
  tag: string;
  kind: VideoKind;
}

const FALLBACK_SAMPLES: VideoSample[] = [
  { id: 1, src: "/videos/samples/sample-1.mp4", poster: "/videos/samples/sample-1-poster.jpg", tag: "Skincare · LATAM", kind: "file" },
  { id: 2, src: "/videos/samples/sample-2.mp4", poster: "/videos/samples/sample-2-poster.jpg", tag: "Moda · Colombia", kind: "file" },
  { id: 3, src: "/videos/samples/sample-3.mp4", poster: "/videos/samples/sample-3-poster.jpg", tag: "Lifestyle · UGC", kind: "file" },
  { id: 4, src: "/videos/samples/sample-4.mp4", poster: "/videos/samples/sample-4-poster.jpg", tag: "Fitness · LATAM", kind: "file" },
  { id: 5, src: "/videos/samples/sample-5.mp4", poster: "/videos/samples/sample-5-poster.jpg", tag: "Beauty · UGC", kind: "file" },
  { id: 6, src: "/videos/samples/sample-6.mp4", poster: "/videos/samples/sample-6-poster.jpg", tag: "Tech · Colombia", kind: "file" },
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
 * Bunny Stream embed URL → embed con autoplay/loop/muted para preview tipo video nativo.
 * Si ya es .mp4/.webm/.mov la dejamos como video directo.
 */
function isBunnyStreamEmbed(url: string): boolean {
  return /iframe\.mediadelivery\.net\/(?:embed|play)\//i.test(url);
}

function isDirectVideoFile(url: string): boolean {
  return /\.(mp4|webm|mov)(\?|$)/i.test(url);
}

function toBunnyAutoplayEmbed(url: string): string {
  // Normaliza /play/ → /embed/ y agrega params de autoplay loop muted preview.
  // controls=false esconde la barra de Bunny para que la card quede 100% limpia.
  const normalized = url.replace("/play/", "/embed/");
  const sep = normalized.includes("?") ? "&" : "?";
  return `${normalized}${sep}autoplay=true&loop=true&muted=true&preload=true&responsive=true&controls=false&showHeatmap=false&playsinline=true`;
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
async function loadKreoonSamples(limit = 12): Promise<VideoSample[]> {
  try {
    // cache: "no-store" + seed por timestamp → bypass total de caches
    // (Vercel CDN, browser cache, Supabase CDN). KREOON ya barajea
    // server-side, así que cada recarga trae un orden distinto.
    const seed = Date.now();
    const res = await fetch(
      `/api/showcase?action=videos&limit=${limit * 3}&_=${seed}`,
      { cache: "no-store" }
    );
    if (!res.ok) return FALLBACK_SAMPLES;
    const json = (await res.json()) as { success: boolean; data: KreoonVideoDTO[] | null };
    if (!json.success || !json.data || json.data.length === 0) return FALLBACK_SAMPLES;

    const valid: VideoSample[] = [];
    for (const v of json.data) {
      if (!v.video_url) continue;
      let src: string;
      let kind: VideoKind;
      if (isDirectVideoFile(v.video_url)) {
        src = v.video_url;
        kind = "file";
      } else if (isBunnyStreamEmbed(v.video_url)) {
        src = toBunnyAutoplayEmbed(v.video_url);
        kind = "iframe";
      } else {
        continue;
      }
      valid.push({
        id: valid.length + 1,
        src,
        poster: v.thumbnail_url ?? "",
        tag: buildTag(v),
        kind,
      });
      if (valid.length >= limit) break;
    }

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

  // Autoplay cuando entra viewport (solo para <video> nativo; los iframes
  // de Bunny Stream ya hacen autoplay vía query params).
  useEffect(() => {
    if (sample.kind !== "file") return;
    const video = videoRef.current;
    if (!video) return;
    if (isIntersecting) {
      video.play().catch(() => {/* autoplay blocked */});
    } else {
      video.pause();
    }
  }, [isIntersecting, sample.kind]);

  return (
    <>
      <motion.div
        ref={intersectionRef}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="group relative cursor-pointer w-full"
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
        {/* Card minimal: solo el video, sin badges, sin gradients, sin iconos */}
        <div
          className="relative overflow-hidden rounded-xl bg-black"
          style={{
            aspectRatio: "9/16",
            boxShadow: hovered
              ? "0 12px 32px rgba(0,0,0,0.5)"
              : "0 4px 16px rgba(0,0,0,0.35)",
            transform: hovered ? "translateY(-2px)" : "translateY(0)",
            transition: "transform 0.25s ease, box-shadow 0.25s ease",
          }}
        >
          {sample.kind === "iframe" ? (
            <iframe
              src={sample.src}
              loading="lazy"
              allow="autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full pointer-events-none"
              style={{ border: 0 }}
              aria-hidden="true"
            />
          ) : (
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
          )}
        </div>
      </motion.div>

      {/* Dialog fullscreen con audio */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-sm w-full p-0 overflow-hidden bg-black border-brand-gold/30">
          <DialogTitle className="sr-only">
            Video UGC: {sample.tag}
          </DialogTitle>
          <div className="relative" style={{ aspectRatio: "9/16" }}>
            <VideoDialogPlayer sample={sample} />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

/** Player con audio dentro del dialog */
function VideoDialogPlayer({ sample }: { sample: VideoSample }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    if (sample.kind !== "file") return;
    videoRef.current?.play().catch(() => {});
  }, [sample.kind]);

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setMuted(videoRef.current.muted);
  };

  if (sample.kind === "iframe") {
    // En el dialog queremos audio activado: quitamos &muted=true
    const dialogSrc = sample.src.replace("&muted=true", "").replace("muted=true&", "").replace("muted=true", "");
    return (
      <iframe
        src={dialogSrc}
        allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
        allowFullScreen
        className="w-full h-full"
        style={{ border: 0 }}
        title="Video UGC"
      />
    );
  }

  return (
    <>
      <video
        ref={videoRef}
        src={sample.src}
        poster={sample.poster}
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
    loadKreoonSamples(12).then(data => {
      if (!cancelled) setSamples(data);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  // Divide en 2 filas para el layout desktop (6 + 6 si hay 12)
  const half = Math.ceil(samples.length / 2);
  const row1 = samples.slice(0, half);
  const row2 = samples.slice(half);

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

        {/* 2 filas centradas dentro del container max-w-7xl.
            Desktop (lg+): grid de 7 columnas, todas las cards calzan dentro del container.
            Mobile/tablet: scroll horizontal con snap. */}
        <div
          className="flex flex-col gap-3 sm:gap-4"
          role="list"
          aria-label="Muestras de videos UGC"
        >
          {[row1, row2].map((row, rowIdx) => (
            <div
              key={rowIdx}
              className="flex gap-3 sm:gap-4 overflow-x-auto snap-x snap-mandatory pb-2 lg:overflow-visible lg:grid lg:grid-cols-7 lg:gap-3"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {row.map((sample) => (
                <div
                  key={sample.id}
                  role="listitem"
                  className="snap-start flex-shrink-0 w-[42vw] sm:w-[28vw] md:w-[20vw] lg:w-auto lg:flex-shrink"
                >
                  <VideoCard sample={sample} />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
