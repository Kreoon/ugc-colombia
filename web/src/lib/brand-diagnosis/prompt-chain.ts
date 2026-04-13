// 5-step prompt chain — ported from Jarvis brand-researcher/prompt-chain.ts

import type { InstagramProfile, ApifyAd } from "./apify";
import type { SocialProfile } from "./perplexity";

// ─── Gemini caller ───────────────────────────────────────────────────────────

async function callGemini(system: string, user: string): Promise<any> {
  const key = process.env.GEMINI_API_KEY;
  if (!key) throw new Error("GEMINI_API_KEY not configured");

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${key}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        system_instruction: { parts: [{ text: system }] },
        contents: [{ parts: [{ text: user }] }],
        generationConfig: { temperature: 0.4, maxOutputTokens: 3000 },
      }),
      signal: AbortSignal.timeout(30_000),
    }
  );

  const data = await res.json();
  let text = data?.candidates?.[0]?.content?.parts?.[0]?.text ?? "";
  text = text.trim().replace(/^```(?:json)?\n?/, "").replace(/\n?```$/, "");

  try {
    return JSON.parse(text);
  } catch {
    return {};
  }
}

// ─── Prompts (same as Jarvis) ────────────────────────────────────────────────

const P1_SYSTEM = `Eres un investigador de mercado senior especializado en marcas digitales en LATAM.
Analiza la marca y construye el AVATAR IDEAL del cliente + posicionamiento.
Responde SOLO en JSON valido (sin markdown):
{"avatar_ideal":{"demographics":"","pain_points":[""],"desires":[""],"objections":[""],"buying_triggers":[""]},"buyer_persona":{"name":"","age":0,"occupation":"","how_discovers_brands":""},"market_position":{"current_position":"","ideal_position":"","market_trends":[""]},"brand_identity":{"current_tone":"","recommended_tone":"","archetype":"","differentiator":""}}`;

const P3_SYSTEM = `Eres un auditor de contenido digital senior. Analizas cada post con ojo critico.
Responde SOLO en JSON valido:
{"content_scores":{"content_quality":{"score":0,"justification":""},"strategy":{"score":0,"justification":""},"consistency":{"score":0,"justification":""},"engagement":{"score":0,"justification":""},"branding":{"score":0,"justification":""}},"whats_working":[{"insight":"","evidence":""}],"whats_failing":[{"insight":"","evidence":""}],"ad_analysis":{"has_ads":false,"summary":"","recommendation":""}}`;

const P4_SYSTEM = `Eres un estratega de contenido senior para marcas en Instagram/TikTok en LATAM.
Crea una ESTRATEGIA DE CONTENIDO completa.
Responde SOLO en JSON valido:
{"content_pillars":[{"name":"","percentage":0,"description":"","example_posts":[""]}],"funnel_strategy":{"tofu":{"percentage":0,"formats":[""],"goal":""},"mofu":{"percentage":0,"formats":[""],"goal":""},"bofu":{"percentage":0,"formats":[""],"goal":""}},"hook_formulas":["","","","",""],"best_times":{"days":[""],"hours":[""],"reason":""}}`;

const P5_SYSTEM = `Eres un consultor senior de UGC Colombia, agencia de UGC y estrategia de contenido en Colombia.
Genera la propuesta comercial final basada en el analisis.
PAQUETES:
1. "Inicio" — 4 videos UGC/mes ($400 USD/mes)
2. "Crecimiento" — 8 videos UGC + estrategia ($700 USD/mes)
3. "Escala" — 15 videos + estrategia + paid creative ($1,500 USD/mes)
4. "Enterprise" — Operación completa personalizada (desde $3,000 USD/mes)
Responde SOLO en JSON valido:
{"overall_score":0,"executive_summary":"","quick_wins":[{"action":"","expected_impact":""}],"service_proposal":{"recommended":"","pricing_note":"","estimated_roi":""},"next_steps":[""]}`;

// ─── Main chain ──────────────────────────────────────────────────────────────

export interface DiagnosisResult {
  overall_score: number;
  scores: {
    content_quality: number;
    strategy: number;
    consistency: number;
    engagement: number;
    branding: number;
  };
  executive_summary: string;
  avatar_ideal: Record<string, any>;
  buyer_persona: Record<string, any>;
  market_position: Record<string, any>;
  brand_identity: Record<string, any>;
  content_audit: {
    scores_detail: Record<string, any>;
    whats_working: Array<{ insight: string; evidence: string }>;
    whats_failing: Array<{ insight: string; evidence: string }>;
    ad_analysis: Record<string, any>;
  };
  content_strategy: {
    pillars: Array<{ name: string; percentage: number; description: string; example_posts: string[] }>;
    funnel: Record<string, any>;
    hook_formulas: string[];
    best_times: Record<string, any>;
  };
  quick_wins: Array<{ action: string; expected_impact: string }>;
  service_proposal: Record<string, any>;
  next_steps: string[];
}

export async function runPromptChain(input: {
  brandName: string;
  brandDescription: string;
  brandIndustry: string;
  brandWebsite: string | null;
  igProfile: InstagramProfile | null;
  socialProfiles: SocialProfile[];
  ads: ApifyAd[];
  clientChallenge?: string;
}): Promise<DiagnosisResult> {
  const brandCtx = `Marca: ${input.brandName}
Industria: ${input.brandIndustry}
Website: ${input.brandWebsite || "No disponible"}
Descripcion: ${input.brandDescription}
Desafio: ${input.clientChallenge || "No especificado"}`;

  const igCtx = input.igProfile
    ? `Instagram: @${input.igProfile.username} | ${input.igProfile.followers} seguidores | ER: ${input.igProfile.engagement_rate}% | Bio: ${input.igProfile.bio}`
    : "Sin datos de Instagram";

  const postsCtx = input.igProfile?.recent_posts
    .map((p, i) => `Post ${i + 1}: ${p.url} | ${p.content_type} | ${p.likes} likes, ${p.comments} comments | Caption: ${p.caption.slice(0, 120)}`)
    .join("\n") || "Sin posts";

  const adsCtx = input.ads.length
    ? `${input.ads.length} ads (${input.ads.filter(a => a.status === "active").length} activos):\n` +
      input.ads.slice(0, 5).map(a => `- [${a.status}] ${a.ad_text.slice(0, 100)}`).join("\n")
    : "No se encontraron ads en Meta Ad Library";

  // P1 + P3 in parallel
  const [p1, p3] = await Promise.all([
    callGemini(P1_SYSTEM, `${brandCtx}\n\nPRESENCIA:\n${igCtx}`),
    callGemini(P3_SYSTEM, `${brandCtx}\n\nPOSTS (${input.igProfile?.recent_posts.length ?? 0}):\n${postsCtx}\n\nPUBLICIDAD:\n${adsCtx}`),
  ]);

  // P4 needs P1 + P3
  const p4 = await callGemini(P4_SYSTEM,
    `${brandCtx}\n\nAVATAR:\n${JSON.stringify(p1.avatar_ideal || {})}\n\nQUE FUNCIONA:\n${JSON.stringify(p3.whats_working || [])}\nQUE FALLA:\n${JSON.stringify(p3.whats_failing || [])}`
  );

  // P5 needs all
  const scores = p3.content_scores || {};
  const p5 = await callGemini(P5_SYSTEM,
    `${brandCtx}\n\nSCORES:\n${JSON.stringify(scores)}\n\nAVATAR:\n${JSON.stringify(p1.buyer_persona || {})}\n\nESTRATEGIA:\nPilares: ${(p4.content_pillars || []).map((p: any) => p.name).join(", ")}\n\nQUICK WINS:\n${JSON.stringify(p3.whats_working || [])}`
  );

  const overall = p5.overall_score || Math.round(
    ((scores.content_quality?.score || 50) +
     (scores.strategy?.score || 50) +
     (scores.consistency?.score || 50) +
     (scores.engagement?.score || 50) +
     (scores.branding?.score || 50)) / 5
  );

  return {
    overall_score: overall,
    scores: {
      content_quality: scores.content_quality?.score || 50,
      strategy: scores.strategy?.score || 50,
      consistency: scores.consistency?.score || 50,
      engagement: scores.engagement?.score || 50,
      branding: scores.branding?.score || 50,
    },
    executive_summary: p5.executive_summary || "",
    avatar_ideal: p1.avatar_ideal || {},
    buyer_persona: p1.buyer_persona || {},
    market_position: p1.market_position || {},
    brand_identity: p1.brand_identity || {},
    content_audit: {
      scores_detail: p3.content_scores || {},
      whats_working: p3.whats_working || [],
      whats_failing: p3.whats_failing || [],
      ad_analysis: p3.ad_analysis || {},
    },
    content_strategy: {
      pillars: p4.content_pillars || [],
      funnel: p4.funnel_strategy || {},
      hook_formulas: p4.hook_formulas || [],
      best_times: p4.best_times || {},
    },
    quick_wins: p5.quick_wins || [],
    service_proposal: p5.service_proposal || {},
    next_steps: p5.next_steps || [],
  };
}
