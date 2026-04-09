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

function transformVideos(videos: KreoonVideo[], limit: number): VideoSample[] {
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
    if (out.length >= limit) break;
  }
  return out;
}

/**
 * Se llama desde el Server Component. Hace un solo fetch (sin pasar por
 * el proxy /api/showcase) directo a la Edge Function de KREOON con
 * `cache: "no-store"` para que cada request SSR traiga un orden distinto.
 * Si algo falla, devuelve el fallback estático.
 */
export async function getShowcaseSamples(limit = 12): Promise<VideoSample[]> {
  try {
    const videos = await fetchApprovedVideos(limit * 3);
    const samples = transformVideos(videos, limit);
    return samples.length > 0 ? samples : FALLBACK_SAMPLES;
  } catch (err) {
    console.error("[showcase-samples] Error fetching KREOON:", err);
    return FALLBACK_SAMPLES;
  }
}
