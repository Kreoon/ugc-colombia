// Sistema base de prompts — UGC Colombia
// Extraído de brand/brand-guidelines.md
// Todos los prompts generados deben partir de esta base para mantener consistencia visual.

export const BRAND_BASE = `
UGC Colombia brand aesthetic: dark editorial boutique, authority without coldness.
Background color: pure #0A0A0A editorial black.
Accent color: #FFD60A gold glow (use sparingly, as editorial highlight).
Mood: cinematic, documentary, systematized, human, premium.
Lighting: warm directional natural light, golden rim light, crushed deep black shadows, preserved highlights.
Color grade: slight warm cast, -15% saturation, medium-high contrast.
Composition: minimal, intentional, editorial magazine style, generous negative space.
Texture: fine film grain, subtle matte finish.
`.trim();

export const BRAND_NEGATIVE = `
no text, no labels, no readable words, no UI text, no numbers, no logos, no watermarks,
no stock photo style, no corporate handshakes, no generic office imagery,
no bright white backgrounds, no vivid saturated colors, no instagram filters,
no 3D render look, no cartoon, no illustration style, no emoji,
no curved organic decorative shapes, no gradient rainbow backgrounds.
`.trim();

/**
 * Construye un prompt final combinando base de marca + concepto específico + negative.
 * @param {object} opts
 * @param {string} opts.concept - Descripción específica del visual buscado
 * @param {string} [opts.composition] - Notas de composición/safe zones
 * @param {string} [opts.extra] - Refuerzos adicionales
 */
export function buildPrompt({ concept, composition = "", extra = "" }) {
  return [
    BRAND_BASE,
    "",
    "Scene: " + concept,
    composition && "Composition: " + composition,
    extra,
    "",
    "Negative: " + BRAND_NEGATIVE,
  ]
    .filter(Boolean)
    .join("\n");
}
