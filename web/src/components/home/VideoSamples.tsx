/**
 * VideoSamples — Server Component wrapper.
 *
 * Hace el fetch de los videos aprobados de KREOON en el servidor (con
 * `cache: "no-store"` para garantizar un orden aleatorio por request) y
 * pasa los datos pre-resueltos al Client Component, que se encarga solo
 * de la UI interactiva (toggle de audio, snap scroll, etc.).
 *
 * Beneficios vs el enfoque anterior client-side:
 *  - El HTML inicial ya trae los iframes Bunny Stream de KREOON → no hay
 *    flash de los videos de fallback.
 *  - Un solo roundtrip (server → KREOON) en vez de dos (client → proxy
 *    Next → KREOON).
 *  - Aleatoriedad preservada: cada SSR pide a KREOON con no-store.
 */

import { getShowcaseSamples } from "@/lib/showcase-samples";
import { VideoSamplesClient } from "./VideoSamplesClient";

export async function VideoSamples() {
  // Sin signals dinámicos (no headers, no cookies, no random per-request).
  // getShowcaseSamples usa un shuffle con seed diario y fetch cacheado 24h,
  // así Next marca la página como ISR y el HTML se sirve desde el CDN de
  // Vercel. A medianoche UTC rota el orden para todos los usuarios.
  const samples = await getShowcaseSamples(12);
  return <VideoSamplesClient initialSamples={samples} />;
}
