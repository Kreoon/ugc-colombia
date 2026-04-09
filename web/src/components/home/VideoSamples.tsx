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

import { headers } from "next/headers";
import { getShowcaseSamples } from "@/lib/showcase-samples";
import { VideoSamplesClient } from "./VideoSamplesClient";

export async function VideoSamples() {
  // Lee headers para marcar este componente como dinámico (el shuffle
  // server-side corre en cada request), pero el fetch interno a KREOON
  // se mantiene cacheado en Vercel Data Cache via `next: { revalidate: 60 }`.
  // Resultado: TTFB bajo + orden aleatorio por pageview.
  await headers();
  const samples = await getShowcaseSamples(12);
  return <VideoSamplesClient initialSamples={samples} />;
}
