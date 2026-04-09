"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "motion/react";
import { Volume2, VolumeX } from "lucide-react";
import { useIntersection } from "@/hooks/use-intersection";
import { FALLBACK_SAMPLES, type VideoSample } from "@/lib/showcase-samples";

/**
 * Envía un comando player.js al iframe Bunny Stream vía postMessage.
 * Bunny soporta el protocolo player.js (https://github.com/embedly/player.js)
 * para mute/unmute/setVolume sin recargar el iframe.
 */
function sendBunnyCommand(
  iframe: HTMLIFrameElement | null,
  method: "mute" | "unmute" | "setVolume",
  value?: number
) {
  if (!iframe?.contentWindow) return;
  try {
    const message = JSON.stringify({
      context: "player.js",
      version: "0.0.12",
      method,
      ...(value !== undefined ? { value } : {}),
    });
    iframe.contentWindow.postMessage(message, "*");
  } catch {
    // silencioso — si falla, el usuario puede reintentar
  }
}

/**
 * Fuerza volumen al máximo en el iframe Bunny. Envía tanto value=1
 * (rango 0-1) como value=100 (rango 0-100) porque distintas versiones
 * del player.js interpretan setVolume de forma diferente.
 */
function forceMaxVolume(iframe: HTMLIFrameElement | null) {
  sendBunnyCommand(iframe, "unmute");
  sendBunnyCommand(iframe, "setVolume", 1);
  sendBunnyCommand(iframe, "setVolume", 100);
}

interface VideoCardProps {
  sample: VideoSample;
  unmuted: boolean;
  onToggleAudio: () => void;
}

function VideoCard({ sample, unmuted, onToggleAudio }: VideoCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Intersección play/pause del <video> nativo
  const { ref: intersectionRef, isIntersecting } = useIntersection<HTMLDivElement>({
    threshold: 0.4,
    once: false,
  });

  // Intersección lazy-mount del iframe Bunny (una sola vez, con 400px de
  // precarga para que llegue listo antes de entrar al viewport). Evita
  // cargar los 12 players simultáneos al paint inicial.
  const { ref: mountRef, isIntersecting: shouldMount } = useIntersection<HTMLDivElement>({
    threshold: 0,
    rootMargin: "400px",
    once: true,
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

  // Toggle de audio para iframe Bunny: usa postMessage player.js SIN
  // recargar el iframe. El video sigue reproduciéndose en el mismo frame.
  // Volumen siempre al máximo cuando se activa — el usuario controla el
  // volumen desde su dispositivo, no desde el player.
  //
  // IMPORTANTE: el effect depende tambien de shouldMount para que cuando
  // el iframe aparezca por lazy-mount, se dispare el mute inicial. Si no,
  // el iframe confia solo en el query param muted=true (que Bunny a veces
  // ignora) y el video arranca con audio aunque el boton este apagado.
  useEffect(() => {
    if (sample.kind !== "iframe" || !shouldMount) return;
    const iframe = iframeRef.current;
    if (!iframe) return;

    if (unmuted) {
      forceMaxVolume(iframe);
      // Reintentos escalonados: player.js a veces tarda en inicializar.
      const t1 = setTimeout(() => forceMaxVolume(iframe), 250);
      const t2 = setTimeout(() => forceMaxVolume(iframe), 800);
      return () => { clearTimeout(t1); clearTimeout(t2); };
    } else {
      // Mute agresivo con reintentos — garantiza que el video no suene
      // aunque player.js todavía no estuviera listo al primer comando.
      sendBunnyCommand(iframe, "mute");
      sendBunnyCommand(iframe, "setVolume", 0);
      const t1 = setTimeout(() => {
        sendBunnyCommand(iframe, "mute");
        sendBunnyCommand(iframe, "setVolume", 0);
      }, 250);
      const t2 = setTimeout(() => {
        sendBunnyCommand(iframe, "mute");
        sendBunnyCommand(iframe, "setVolume", 0);
      }, 800);
      return () => { clearTimeout(t1); clearTimeout(t2); };
    }
  }, [unmuted, sample.kind, shouldMount]);

  // onLoad del iframe: cuando Bunny termina de cargar su player.js,
  // re-enviamos el estado actual. Es la capa mas confiable porque
  // garantiza que el comando llega despues de que el reproductor
  // este listo para recibirlo.
  const handleIframeLoad = () => {
    const iframe = iframeRef.current;
    if (!iframe) return;
    if (unmuted) {
      forceMaxVolume(iframe);
    } else {
      sendBunnyCommand(iframe, "mute");
      sendBunnyCommand(iframe, "setVolume", 0);
    }
  };

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
        ref={mountRef}
        className="relative overflow-hidden rounded-xl bg-black shadow-[0_4px_16px_rgba(0,0,0,0.35)]"
        style={{ aspectRatio: "9/16" }}
      >
        {sample.kind === "iframe" ? (
          shouldMount ? (
            // Scale 103% + translate -50% para cropear los 1-2px de borde
            // claro que pinta Bunny Stream en los edges del embed.
            <iframe
              ref={iframeRef}
              src={sample.src}
              loading="lazy"
              onLoad={handleIframeLoad}
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              className="absolute left-1/2 top-1/2 pointer-events-none"
              style={{
                border: 0,
                outline: 0,
                width: "103%",
                height: "103%",
                transform: "translate(-50%, -50%)",
              }}
              aria-hidden="true"
            />
          ) : (
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-br from-neutral-900 to-black"
            />
          )
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

export function VideoSamplesClient({ initialSamples }: { initialSamples: VideoSample[] }) {
  const { ref, isIntersecting } = useIntersection<HTMLDivElement>({
    threshold: 0.05,
  });
  // Los samples llegan pre-fetcheados desde el Server Component. No hay
  // fetch client-side ni flash de fallback: el HTML inicial ya trae los
  // iframes de KREOON con sus URLs finales.
  const samples = initialSamples.length > 0 ? initialSamples : FALLBACK_SAMPLES;
  // Solo un video puede tener audio activo a la vez; null = todos en mute.
  const [unmutedId, setUnmutedId] = useState<number | null>(null);

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
              className="no-scrollbar flex gap-3 sm:gap-4 overflow-x-auto snap-x snap-mandatory pb-2 lg:overflow-visible lg:grid lg:grid-cols-6 lg:gap-4 lg:pb-0 lg:justify-items-stretch"
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
