// supabase/functions/public-showcase/index.ts
//
// Edge Function pública de KREOON para alimentar ugccolombia.co.
// - GET ?action=videos&limit=12   → videos aprobados en orden aleatorio
// - GET ?action=stats             → métricas públicas (creadores, marcas, etc.)
//
// Despliegue:
//   supabase functions deploy public-showcase --no-verify-jwt --project-ref wjkbqcrxwsmvtxmqgiqc
//
// Importa este archivo a:  supabase/functions/public-showcase/index.ts  del repo kreoon

import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.4";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

const ALLOWED_ORIGINS = new Set([
  "https://ugccolombia.co",
  "https://www.ugccolombia.co",
  "http://localhost:3000",
]);

function corsHeaders(origin: string | null): HeadersInit {
  const allow = origin && (ALLOWED_ORIGINS.has(origin) || origin.endsWith(".vercel.app"))
    ? origin
    : "https://ugccolombia.co";
  return {
    "Access-Control-Allow-Origin": allow,
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Vary": "Origin",
  };
}

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
  auth: { persistSession: false, autoRefreshToken: false },
});

interface VideoRow {
  id: string;
  title: string | null;
  video_url: string;
  thumbnail_url: string | null;
  creators?: { handle: string | null } | null;
  brands?: { name: string | null } | null;
}

async function getVideos(limit: number) {
  // Ajusta nombres reales de tablas/columnas a tu schema KREOON.
  // Asume tablas: videos(id, title, video_url, thumbnail_url, status, is_public, creator_id, brand_id)
  //               creators(id, handle, status)
  //               brands(id, name)
  const { data, error } = await supabase
    .from("videos")
    .select("id, title, video_url, thumbnail_url, creators(handle), brands(name)")
    .eq("status", "approved")
    .eq("is_public", true)
    .limit(Math.max(limit * 4, 24)); // sobre-pedimos y barajamos en memoria
  if (error) throw error;

  const rows = (data ?? []) as unknown as VideoRow[];
  // Fisher-Yates shuffle
  for (let i = rows.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [rows[i], rows[j]] = [rows[j], rows[i]];
  }
  return rows.slice(0, limit).map((v) => ({
    id: v.id,
    title: v.title ?? "",
    video_url: v.video_url,
    thumbnail_url: v.thumbnail_url ?? "",
    creator_handle: v.creators?.handle ?? "",
    brand_name: v.brands?.name ?? "",
  }));
}

async function getStats() {
  const [creators, brands, campaigns, videos] = await Promise.all([
    supabase.from("creators").select("id", { count: "exact", head: true }).eq("status", "active"),
    supabase.from("brands").select("id", { count: "exact", head: true }),
    supabase.from("campaigns").select("id", { count: "exact", head: true }).eq("status", "completed"),
    supabase.from("videos").select("id", { count: "exact", head: true }).eq("status", "approved"),
  ]);

  return {
    creators_count: creators.count ?? 0,
    brands_count: brands.count ?? 0,
    campaigns_completed: campaigns.count ?? 0,
    videos_approved: videos.count ?? 0,
    updated_at: new Date().toISOString(),
  };
}

serve(async (req) => {
  const origin = req.headers.get("origin");
  const headers = corsHeaders(origin);

  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers });
  }

  if (req.method !== "GET") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...headers, "Content-Type": "application/json" },
    });
  }

  const url = new URL(req.url);
  const action = url.searchParams.get("action");
  const limit = Math.min(Math.max(1, parseInt(url.searchParams.get("limit") ?? "12", 10)), 24);

  try {
    let body: unknown;
    if (action === "videos") body = await getVideos(limit);
    else if (action === "stats") body = await getStats();
    else {
      return new Response(JSON.stringify({ error: "action requerida: videos | stats" }), {
        status: 400,
        headers: { ...headers, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify(body), {
      status: 200,
      headers: {
        ...headers,
        "Content-Type": "application/json",
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
      },
    });
  } catch (err) {
    console.error("[public-showcase] error:", err);
    return new Response(JSON.stringify({ error: "Internal error" }), {
      status: 500,
      headers: { ...headers, "Content-Type": "application/json" },
    });
  }
});
