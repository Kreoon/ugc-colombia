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
 * Fisher-Yates shuffle in-place. O(n), criptográficamente NO seguro
 * pero más que suficiente para un showcase visual.
 */
function shuffle<T>(arr: T[]): T[] {
  const out = arr.slice();
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

/**
 * Server Component entry point. Estrategia de cache:
 *
 * 1. `fetchApprovedVideos(40)` hace un fetch cacheado en Vercel Data
 *    Cache con `revalidate: 60`. El primer request del minuto regenera
 *    el pool de 40 videos desde KREOON; el resto del minuto sirve
 *    desde cache (TTFB ~10-30ms en vez de 500-800ms).
 * 2. Shuffle server-side los 40 videos y slice los primeros 12. Esto
 *    garantiza orden distinto en cada request aunque el fetch esté
 *    cacheado — el shuffle corre en cada SSR.
 * 3. Si el transform reduce el pool (ej. muchas URLs inválidas), la
 *    lista puede ser menor a 12.
 *
 * Con force-dynamic en page.tsx, la página se renderiza por request
 * pero el fetch a KREOON está cacheado, así que el overhead es
 * solamente el shuffle + render (~5-20ms).
 */
export async function getShowcaseSamples(limit = 12): Promise<VideoSample[]> {
  try {
    const pool = await fetchApprovedVideos(40);
    const transformed = transformVideos(pool);
    if (transformed.length === 0) return FALLBACK_SAMPLES;
    const shuffled = shuffle(transformed).slice(0, limit);
    // Reasigna IDs secuenciales para que las keys de React sean estables
    // dentro del mismo render pero distintas entre renders.
    return shuffled.map((s, i) => ({ ...s, id: i + 1 }));
  } catch (err) {
    console.error("[showcase-samples] Error fetching KREOON:", err);
    return FALLBACK_SAMPLES;
  }
}
