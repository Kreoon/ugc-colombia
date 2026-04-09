"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "motion/react";
import { Volume2, VolumeX } from "lucide-react";
import { useIntersection } from "@/hooks/use-intersection";

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

/**
 * Quita el flag muted del query string para construir la URL "con audio".
 */
function withAudio(src: string): string {
  return src
    .replace(/[?&]muted=true/g, (m) => (m.startsWith("?") ? "?" : ""))
    .replace(/\?&/, "?")
    .replace(/&&/g, "&")
    .replace(/[?&]$/, "");
}

interface VideoCardProps {
  sample: VideoSample;
  unmuted: boolean;
  onToggleAudio: () => void;
}

function VideoCard({ sample, unmuted, onToggleAudio }: VideoCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { ref: intersectionRef, isIntersecting } = useIntersection<HTMLDivElement>({
    threshold: 0.4,
    once: false,
  });

  // Autoplay nativo cuando entra al viewport (solo file). Iframes Bunny
  // ya autoplay via query params.
  useEffect(() => {
    if (sample.kind !== "file") return;
    const video = videoRef.current;
    if (!video) return;
    video.muted = !unmuted;
    if (isIntersecting) {
      video.play().catch(() => {/* autoplay bloqueado */});
    } else {
      video.pause();
    }
  }, [isIntersecting, sample.kind, unmuted]);

  // Para Bunny Stream iframe, alternamos entre src con/sin muted.
  // Esto recarga el iframe pero es la forma simple sin postMessage.
  const iframeSrc = unmuted ? withAudio(sample.src) : sample.src;

  const handleAudioClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleAudio();
  };

  return (
    <motion.div
      ref={intersectionRef}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="relative w-full"
    >
      <div
        className="relative overflow-hidden rounded-xl bg-black shadow-[0_4px_16px_rgba(0,0,0,0.35)]"
        style={{ aspectRatio: "9/16" }}
      >
        {sample.kind === "iframe" ? (
          // Trick: el iframe se escala al 118% y se traslada para que
          // las barras superior e inferior de Bunny queden fuera del
          // crop del overflow-hidden del padre. Resultado: card 100%
          // limpia, solo el video.
          <div className="absolute inset-0 overflow-hidden">
            <iframe
              key={iframeSrc}
              src={iframeSrc}
              loading="lazy"
              allow="autoplay; encrypted-media; picture-in-picture"
              className="absolute left-1/2 top-1/2 pointer-events-none"
              style={{
                border: 0,
                width: "118%",
                height: "118%",
                transform: "translate(-50%, -50%)",
              }}
              aria-hidden="true"
            />
          </div>
        ) : (
          <video
            ref={videoRef}
            src={sample.src}
            poster={sample.poster}
            muted={!unmuted}
            loop
            playsInline
            preload="metadata"
            className="absolute inset-0 w-full h-full object-cover pointer-events-none"
            aria-hidden="true"
          />
        )}

        {/* Único control: botón de audio */}
        <button
          type="button"
          onClick={handleAudioClick}
          className="absolute top-2 right-2 z-10 p-1.5 rounded-full bg-black/60 backdrop-blur-sm text-white hover:bg-black/80 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold"
          aria-label={unmuted ? "Silenciar video" : "Activar sonido"}
        >
          {unmuted ? (
            <Volume2 className="h-3.5 w-3.5" aria-hidden="true" />
          ) : (
            <VolumeX className="h-3.5 w-3.5" aria-hidden="true" />
          )}
        </button>
      </div>
    </motion.div>
  );
}

export function VideoSamples() {
  const { ref, isIntersecting } = useIntersection<HTMLDivElement>({
    threshold: 0.05,
  });
  const [samples, setSamples] = useState<VideoSample[]>(FALLBACK_SAMPLES);
  // Solo un video puede tener audio activo a la vez; null = todos en mute.
  const [unmutedId, setUnmutedId] = useState<number | null>(null);

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
            Activa el sonido en el video que quieras escuchar.
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
                  <VideoCard
                    sample={sample}
                    unmuted={unmutedId === sample.id}
                    onToggleAudio={() =>
                      setUnmutedId(prev => (prev === sample.id ? null : sample.id))
                    }
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
