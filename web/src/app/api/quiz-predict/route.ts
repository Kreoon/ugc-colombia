import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { industry, biggest_pain, ad_budget } = await req.json();

    const key = process.env.GEMINI_API_KEY;
    if (!key) return NextResponse.json({ predicted_need: "estrategia_contenido", confidence: 0.5, hook_message: "" });

    const prompt = `Eres un consultor experto en UGC y marketing digital para marcas en LATAM.

Una marca de la industria "${industry || "no especificada"}" tiene este dolor principal: "${biggest_pain}".
Su inversión en ads es: "${ad_budget}".

Basándote en esto, predice qué necesita esta marca. Responde SOLO en JSON:
{
  "predicted_need": "ugc_para_ads" | "estrategia_contenido" | "produccion_completa" | "optimizacion_ads",
  "confidence": <0.0-1.0>,
  "hook_message": "<mensaje de 1 línea que le diga al usuario que ya entendemos su situación, máximo 80 caracteres>"
}`;

    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${key}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { temperature: 0.3, maxOutputTokens: 200 },
        }),
        signal: AbortSignal.timeout(5000),
      }
    );

    const data = await res.json();
    let text = data?.candidates?.[0]?.content?.parts?.[0]?.text ?? "";
    text = text.trim().replace(/^```(?:json)?\n?/, "").replace(/\n?```$/, "");

    const parsed = JSON.parse(text);
    return NextResponse.json(parsed);
  } catch {
    return NextResponse.json({
      predicted_need: "estrategia_contenido",
      confidence: 0.5,
      hook_message: "",
    });
  }
}
