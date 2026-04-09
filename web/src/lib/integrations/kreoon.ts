/**
 * kreoon.ts — Cliente para la Edge Function pública de KREOON.
 *
 * KREOON es una plataforma independiente con su propio Supabase. Para no
 * acoplar el schema interno al sitio público de UGC Colombia, exponemos
 * los datos vía una Edge Function (`public-showcase`) que actúa como API
 * estable. Este cliente solo hace `fetch()` HTTP — no requiere keys.
 *
 * Env vars:
 *   KREOON_PUBLIC_FN_URL — URL de la Edge Function (sin query string).
 *     ej: https://wjkbqcrxwsmvtxmqgiqc.functions.supabase.co/public-showcase
 */

const DEFAULT_KREOON_FN_URL =
  "https://wjkbqcrxwsmvtxmqgiqc.functions.supabase.co/public-showcase";

const REQUEST_TIMEOUT_MS = 8_000;
const MAX_RETRIES = 3;
const BASE_DELAY_MS = 500;
const RETRYABLE_STATUSES = [429, 500, 502, 503, 504];

export interface KreoonVideo {
  id: string;
  title: string;
  video_url: string;
  thumbnail_url: string;
  creator_handle: string;
  brand_name: string;
  tag?: string;
}

export interface KreoonStats {
  creators_count: number;
  brands_count: number;
  campaigns_completed: number;
  videos_approved: number;
  updated_at: string;
}

function getFnUrl(): string {
  return process.env.KREOON_PUBLIC_FN_URL ?? DEFAULT_KREOON_FN_URL;
}

async function kreoonFetch<T>(action: "videos" | "stats", params: Record<string, string> = {}): Promise<T> {
  const url = new URL(getFnUrl());
  url.searchParams.set("action", action);
  for (const [k, v] of Object.entries(params)) url.searchParams.set(k, v);

  let lastError: unknown;

  for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

    try {
      // Videos: cache 24h (refresca 1 vez al día, shuffle server-side
      //   con seed diario → mismo orden para todos los usuarios del día).
      // Stats: cache 60s (los conteos sí queremos frescos).
      const revalidate = action === "videos" ? 86_400 : 60;
      const response = await fetch(url.toString(), {
        method: "GET",
        headers: {
          "Accept": "application/json",
          "User-Agent": "ugccolombia-app/1.0",
        },
        signal: controller.signal,
        next: { revalidate, tags: [`kreoon-${action}`] },
      });

      clearTimeout(timeoutId);

      if (response.ok) {
        return (await response.json()) as T;
      }

      const body = await response.text();

      if (RETRYABLE_STATUSES.includes(response.status)) {
        const delay = BASE_DELAY_MS * Math.pow(2, attempt) * (0.5 + Math.random());
        console.warn(
          `[kreoon] HTTP ${response.status} en ${action} — intento ${attempt + 1}/${MAX_RETRIES}, reintento en ${Math.round(delay)}ms`
        );
        lastError = new Error(`[kreoon] ${response.status}: ${body.slice(0, 200)}`);
        await new Promise<void>(r => setTimeout(r, delay));
        continue;
      }

      throw new Error(`[kreoon] ${response.status} en ${action}: ${body.slice(0, 200)}`);
    } catch (error) {
      clearTimeout(timeoutId);

      const isAbort = error instanceof Error && error.name === "AbortError";
      const isNetwork = error instanceof TypeError;

      if (!isAbort && !isNetwork) throw error;

      console.error(
        `[kreoon] ${isAbort ? "Timeout" : "NetworkError"} en ${action} — intento ${attempt + 1}/${MAX_RETRIES}`,
        error
      );

      lastError = isAbort
        ? new Error(`[kreoon] Timeout tras ${REQUEST_TIMEOUT_MS / 1000}s en ${action}`)
        : error;

      if (attempt < MAX_RETRIES - 1) {
        const delay = BASE_DELAY_MS * Math.pow(2, attempt) * (0.5 + Math.random());
        await new Promise<void>(r => setTimeout(r, delay));
      }
    }
  }

  throw lastError ?? new Error(`[kreoon] Max reintentos alcanzados en ${action}`);
}

/**
 * Obtiene N videos aprobados de KREOON en orden aleatorio (random server-side).
 * @param limit  1–24, default 12.
 */
export async function fetchApprovedVideos(limit = 12): Promise<KreoonVideo[]> {
  const safeLimit = Math.min(Math.max(1, Math.floor(limit)), 24);
  return kreoonFetch<KreoonVideo[]>("videos", { limit: String(safeLimit) });
}

/**
 * Obtiene métricas públicas de KREOON: creadores, marcas, campañas, videos.
 */
export async function fetchPublicStats(): Promise<KreoonStats> {
  return kreoonFetch<KreoonStats>("stats");
}
