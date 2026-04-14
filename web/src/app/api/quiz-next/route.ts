import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { aiQuizResponseSchema } from "@/lib/quiz-ai";

const requestSchema = z.object({
  brand_name: z.string(),
  industry: z.string(),
  instagram_handle: z.string().optional(),
  website: z.string().optional(),
  answers_so_far: z.array(z.object({
    question_number: z.number(),
    question: z.string(),
    answer_value: z.string(),
    answer_label: z.string(),
    maps_to: z.string(),
  })),
  question_number: z.number().min(2).max(7),
});

const SYSTEM_PROMPT = `Eres un setter de ventas experto de UGC Colombia, una agencia de UGC y estrategia de contenido en LATAM.
Tu trabajo: hacer preguntas estratégicas que descubran los dolores del cliente y lo lleven naturalmente a querer agendar una llamada de diagnóstico gratuita.

CONTEXTO DEL NEGOCIO:
- UGC Colombia produce contenido UGC (video, fotos) para marcas
- Paquetes: Inicio $400 USD / $1.590.000 COP al mes (5 videos), Crecimiento $700 USD / $2.790.000 COP al mes (10 videos), Escala $1.500 USD / $5.990.000 COP al mes (30 videos), Enterprise a la medida (desde $3.000 USD / $11.990.000 COP al mes). Menciona la moneda apropiada según el país del lead cuando puedas inferirlo.
- Valor: contenido auténtico que convierte mejor que branded content, 2-4x mejor ROAS

CAMPOS DE DATOS — usa estos valores EXACTOS en maps_to y maps_value:
- ad_budget: "nada" | "menos_500" | "500_1000" | "1000_3000" | "3000_5000" | "mas_5000"
- content_budget: "nada" | "menos_500" | "500_1000" | "1000_3000" | "3000_5000" | "mas_5000"
- has_active_ads: "true" | "false"
- current_ctr: "no_se" | "menos_1" | "1_2" | "mas_2"
- creative_age_weeks: "menos_2" | "2_4" | "4_8" | "mas_8" | "no_tengo"
- monthly_content_pieces: "0" | "1_3" | "4_8" | "9_15" | "mas_15"
- urgency: "inmediata" | "este_mes" | "proximo_trimestre" | "explorando"
- competitor_awareness: "si_mucho" | "si_poco" | "no" | "no_se"
- conversion_goal: "mas_ventas" | "mas_alcance" | "mejor_branding" | "reducir_costos"
- team_resources: "nadie" | "freelancer" | "equipo_pequeno" | "agencia"

REGLAS:
1. Cada pregunta DEBE mapear a exactamente uno de los campos de arriba
2. NO repitas campos ya cubiertos
3. Cada opción DEBE tener maps_to y maps_value con valores EXACTOS de la lista
4. Genera 3-5 opciones máximo
5. Tono conversacional, empático, como un amigo experto — NO como formulario
6. Las sublabels deben tocar el dolor suavemente y educar
7. El insight_for_previous es un dato estadístico o verdad que valida la respuesta anterior y posiciona a UGC como solución
8. Si es pregunta 5+, orienta hacia cerrar (pregunta urgency o conversion_goal)
9. Si detectas alto presupuesto (1000_3000+) Y respuestas que indican urgencia, marca is_last=true
10. Prioriza: dolor → presupuesto ads → estado del contenido → urgencia

Responde SOLO en JSON válido, sin markdown ni backticks.`;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = requestSchema.parse(body);

    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      return NextResponse.json({ error: "AI not configured" }, { status: 500 });
    }

    const coveredFields = data.answers_so_far.map(a => a.maps_to);
    const allFields = ["ad_budget", "content_budget", "has_active_ads", "current_ctr",
      "creative_age_weeks", "monthly_content_pieces", "urgency",
      "competitor_awareness", "conversion_goal", "team_resources"];
    const pendingFields = allFields.filter(f => !coveredFields.includes(f));

    const answersText = data.answers_so_far
      .map(a => `  Q${a.question_number}: "${a.question}" → "${a.answer_label}" (${a.maps_to}=${a.answer_value})`)
      .join("\n");

    const userPrompt = `Marca: ${data.brand_name}
Industria: ${data.industry}
Instagram: @${data.instagram_handle || "N/A"}
Website: ${data.website || "N/A"}
Pregunta número: ${data.question_number} de máximo 6

Respuestas anteriores:
${answersText}

Campos ya cubiertos: ${coveredFields.join(", ")}
Campos pendientes: ${pendingFields.join(", ")}

Genera la siguiente pregunta. JSON:
{"question":"","hint":"","options":[{"value":"","label":"","sublabel":"","maps_to":"","maps_value":""}],"insight_for_previous":{"text":"","emoji":""},"is_last":false,"pain_level":"medium"}`;

    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${key}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
          contents: [{ parts: [{ text: userPrompt }] }],
          generationConfig: { temperature: 0.5, maxOutputTokens: 800 },
        }),
        signal: AbortSignal.timeout(5000),
      }
    );

    const geminiData = await res.json();
    let text = geminiData?.candidates?.[0]?.content?.parts?.[0]?.text ?? "";
    text = text.trim().replace(/^```(?:json)?\n?/, "").replace(/\n?```$/, "");

    const parsed = aiQuizResponseSchema.parse(JSON.parse(text));

    return NextResponse.json(parsed);
  } catch (err) {
    console.error("[quiz-next] Error:", err);
    return NextResponse.json(
      { error: "Failed to generate question" },
      { status: 500 }
    );
  }
}
