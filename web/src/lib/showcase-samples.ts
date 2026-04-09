/**
 * showcase-samples.ts — Transformación de KreoonVideo → VideoSample
 *
 * Se usa tanto en el Server Component (VideoSamples) como en el tipado
 * del Client Component (VideoSamplesClient). Todo server-safe.
 */

import { fetchApprovedVideos, type KreoonVideo } from "@/lib/integrations/kreoon";

export type VideoKind = "file" | "iframe";

export interface VideoSample {
  id: number;
  src: string;
  poster: string;
  tag: string;
  kind: VideoKind;
}

export const FALLBACK_SAMPLES: VideoSample[] = [
  { id: 1, src: "/videos/samples/sample-1.mp4", poster: "/videos/samples/sample-1-poster.jpg", tag: "Skincare · LATAM", kind: "file" },
  { id: 2, src: "/videos/samples/sample-2.mp4", poster: "/videos/samples/sample-2-poster.jpg", tag: "Moda · Colombia", kind: "file" },
  { id: 3, src: "/videos/samples/sample-3.mp4", poster: "/videos/samples/sample-3-poster.jpg", tag: "Lifestyle · UGC", kind: "file" },
  { id: 4, src: "/videos/samples/sample-4.mp4", poster: "/videos/samples/sample-4-poster.jpg", tag: "Fitness · LATAM", kind: "file" },
  { id: 5, src: "/videos/samples/sample-5.mp4", poster: "/videos/samples/sample-5-poster.jpg", tag: "Beauty · UGC", kind: "file" },
  { id: 6, src: "/videos/samples/sample-6.mp4", poster: "/videos/samples/sample-6-poster.jpg", tag: "Tech · Colombia", kind: "file" },
];

function isBunnyStreamEmbed(url: string): boolean {
  return /iframe\.mediadelivery\.net\/(?:embed|play)\//i.test(url);
}

function isDirectVideoFile(url: string): boolean {
  return /\.(mp4|webm|mov)(\?|$)/i.test(url);
}

function toBunnyAutoplayEmbed(url: string): string {
  const normalized = url.replace("/play/", "/embed/");
  const sep = normalized.includes("?") ? "&" : "?";
  return `${normalized}${sep}autoplay=true&loop=true&muted=true&preload=true&responsive=true&controls=false&showHeatmap=false&playsinline=true`;
}

function buildTag(v: KreoonVideo): string {
  const handle = v.creator_handle && v.creator_handle !== "creador" ? `@${v.creator_handle}` : "";
  const brand = v.brand_name && v.brand_name !== "Marca" ? v.brand_name : "";
  if (brand && handle) return `${brand} · ${handle}`;
  if (brand) return brand;
  if (handle) return handle;
  return "UGC";
}

function transformVideos(videos: KreoonVideo[]): VideoSample[] {
  const out: VideoSample[] = [];
  for (const v of videos) {
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
    out.push({
      id: out.length + 1,
      src,
      poster: v.thumbnail_url ?? "",
      tag: buildTag(v),
      kind,
    });
  }
  return out;
}

/**
 * Hash determinístico de una fecha YYYY-MM-DD en un entero.
 * Se usa como seed del shuffle diario.
 */
function dailySeed(): number {
  const today = new Date().toISOString().slice(0, 10); // "2026-04-09"
  let h = 2166136261;
  for (let i = 0; i < today.length; i++) {
    h ^= today.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

/**
 * LCG (Linear Congruential Generator) — RNG seedable simple y suficiente
 * para barajar un array visual. No criptográfico.
 */
function mulberry32(seed: number) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Fisher-Yates shuffle con seed determinístico. Dado el mismo seed,
 * produce siempre el mismo orden.
 */
function seededShuffle<T>(arr: T[], seed: number): T[] {
  const out = arr.slice();
  const rand = mulberry32(seed);
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

/**
 * Server Component entry point. Estrategia de cache:
 *
 * 1. `fetchApprovedVideos(40)` cacheado en Vercel Data Cache con
 *    `revalidate: 86400` (24h). El primer render del día pega a KREOON,
 *    el resto del día sirve desde cache (TTFB ~5-15ms).
 * 2. Shuffle con seed = hash(YYYY-MM-DD) → todos los usuarios del mismo
 *    día ven el MISMO orden. A medianoche UTC rota automáticamente.
 * 3. Como no hay signals dinámicos (no headers, no cookies, no random
 *    per-request), Next marca la página como ISR y el HTML completo se
 *    cachea en el CDN de Vercel — TTFB de edge (~5ms) para todos los
 *    usuarios del día.
 */
export async function getShowcaseSamples(limit = 12): Promise<VideoSample[]> {
  try {
    const pool = await fetchApprovedVideos(40);
    const transformed = transformVideos(pool);
    if (transformed.length === 0) return FALLBACK_SAMPLES;
    const shuffled = seededShuffle(transformed, dailySeed()).slice(0, limit);
    return shuffled.map((s, i) => ({ ...s, id: i + 1 }));
  } catch (err) {
    console.error("[showcase-samples] Error fetching KREOON:", err);
    return FALLBACK_SAMPLES;
  }
}
