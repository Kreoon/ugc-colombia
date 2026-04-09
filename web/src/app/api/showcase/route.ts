import { NextRequest, NextResponse } from "next/server";
import { fetchApprovedVideos, fetchPublicStats } from "@/lib/integrations/kreoon";

/**
 * GET /api/showcase?action=videos&limit=12
 * GET /api/showcase?action=stats
 *
 * Proxy server-side a la Edge Function pública de KREOON.
 * - Evita exponer la URL interna de KREOON al cliente.
 * - Permite cachear en CDN de Vercel con stale-while-revalidate.
 * - Devuelve `null` data si KREOON está caído (el cliente cae a fallback estático).
 */
export async function GET(req: NextRequest) {
  const action = req.nextUrl.searchParams.get("action");
  const limitParam = req.nextUrl.searchParams.get("limit");

  try {
    if (action === "stats") {
      const stats = await fetchPublicStats();
      return NextResponse.json(
        { success: true, data: stats },
        {
          headers: {
            "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
          },
        }
      );
    }

    if (action === "videos") {
      const limit = limitParam ? Number.parseInt(limitParam, 10) : 12;
      const videos = await fetchApprovedVideos(limit);
      return NextResponse.json(
        { success: true, data: videos },
        {
          headers: {
            // 60s en CDN, hasta 5 min sirviendo stale mientras revalida
            "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
          },
        }
      );
    }

    return NextResponse.json(
      { success: false, message: "action requerida: videos | stats" },
      { status: 400 }
    );
  } catch (err) {
    console.error("[/api/showcase] Error consultando KREOON:", err);
    return NextResponse.json(
      { success: false, data: null, message: "KREOON no disponible" },
      { status: 200 } // 200 con data:null para que el cliente caiga a fallback
    );
  }
}
