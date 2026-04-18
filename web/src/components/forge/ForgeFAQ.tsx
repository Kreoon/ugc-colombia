"use client";

/**
 * ForgeFAQ — 6 preguntas frecuentes con accordion nativo.
 */

import { useState } from "react";

const FAQS = [
  {
    q: "¿De verdad es gratis? ¿Cuál es el truco?",
    a: "Sí es gratis. No hay truco, no hay freemium, no hay upsell obligatorio. Es MIT license — puedes usarlo comercialmente, modificarlo, incluso revenderlo integrado en algo tuyo. Lo liberamos porque cuando empezamos necesitábamos algo así y no existía.",
  },
  {
    q: "¿Necesito saber código para usarlo?",
    a: "Necesitas saber pegar 3-4 comandos en una terminal y abrir una app. El setup te lleva 15-20 minutos la primera vez. Después, todo se hace en Claude Code escribiendo pedidos en español natural. Si nunca has usado una terminal, la guía te lleva paso a paso.",
  },
  {
    q: "¿Funciona en Mac y Windows?",
    a: "Sí, ambos. La guía tiene secciones específicas para cada uno. También funciona en Linux aunque no está explícitamente probado. Lo único que no soporta es iPad o móvil.",
  },
  {
    q: "¿Qué es Gemini y cuánto cuesta?",
    a: "Gemini 2.5 Flash Image (nano-banana) es el modelo de generación de imágenes de Google. El API tiene un tier gratuito generoso — suficiente para 50-100 carruseles al mes sin pagar nada. Si lo usas mucho más, son ~$5 USD/mes de uso típico. Mucho más barato que Canva Pro.",
  },
  {
    q: "¿Qué tan consistente queda mi rostro si soy marca personal?",
    a: "~85% de fidelidad facial. Se reconoce que eres tú: tus rasgos, tu complexión, tu estilo general. Lo que no replica al 100% es un outfit exacto o detalles únicos como lunares o tatuajes. Para la mayoría de marcas personales es más que suficiente. Si necesitas 100% pixel-perfect, puedes entrenar un LoRA propio (guía incluida).",
  },
  {
    q: "¿Publica automáticamente a Instagram?",
    a: "No, y es deliberado. Publicar automático rompe autenticidad, Meta lo detecta, y las métricas caen. Content Forge genera todo listo — imágenes, caption, hashtags, hora sugerida — y tú los copias a Instagram cuando quieras publicar. Te lleva 30 segundos vs. las 2-3 horas que tomaba antes.",
  },
];

export function ForgeFAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="bg-brand-black py-20 md:py-28 border-t border-white/5">
      <div className="max-w-3xl mx-auto px-6 md:px-10">
        <div className="flex flex-col gap-3 items-center text-center mb-10">
          <span className="text-[10px] uppercase tracking-widest font-bold text-brand-yellow">
            Preguntas frecuentes
          </span>
          <h2 className="font-display text-5xl md:text-6xl uppercase text-white leading-[0.95] tracking-tight">
            Lo que más preguntan
          </h2>
        </div>

        <div className="flex flex-col gap-3">
          {FAQS.map((f, i) => (
            <article
              key={f.q}
              className="rounded-xl border border-white/10 bg-black/40 overflow-hidden"
            >
              <button
                type="button"
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between gap-4 p-5 text-left"
                aria-expanded={open === i}
              >
                <h3 className="text-base md:text-lg font-semibold text-white leading-snug">
                  {f.q}
                </h3>
                <span
                  className={`flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-brand-yellow/20 text-brand-yellow transition-transform ${
                    open === i ? "rotate-45" : ""
                  }`}
                  aria-hidden
                >
                  +
                </span>
              </button>
              {open === i ? (
                <div className="px-5 pb-5 text-sm md:text-base text-brand-gray-light leading-relaxed">
                  {f.a}
                </div>
              ) : null}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
