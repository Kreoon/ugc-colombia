// Sistema base de prompts — UGC Colombia
// Fuente: manual de marca oficial interno (slides en /brand/legacy-deck/).
// Todos los prompts nuevos deben partir de esta base para mantener consistencia visual.
//
// Paleta oficial:
//   #000000 negro  |  #3D3D3C gris oscuro  |  #BDBCBC gris claro  |  #F9B334 amarillo  |  #F5F5F0 crema

export const BRAND_BASE = `
UGC Colombia brand aesthetic: dark editorial boutique, authority without coldness.
Background color: pure #000000 editorial black, or #F5F5F0 boutique cream for light compositions.
Accent color: #F9B334 warm amber yellow (used as deliberate highlight, never overwhelming).
Secondary neutrals: #3D3D3C dark graphite, #BDBCBC soft gray.
Mood: cinematic, documentary, systematized, human, premium, Latin American with USA-grade craft.
Lighting: warm directional natural light, amber rim light, crushed deep black shadows, preserved highlights.
Color grade: slight warm cast, -15% saturation, medium-high contrast, fine film grain.
Composition: minimal, intentional, editorial magazine style, generous negative space.
Texture: matte finish, subtle grain, premium print sensibility.
`.trim();

export const BRAND_NEGATIVE = `
no text, no labels, no readable words, no UI text, no numbers, no logos, no watermarks,
no stock photo style, no corporate handshakes, no generic office imagery,
no bright white backgrounds, no vivid saturated colors, no instagram filters,
no 3D render look, no cartoon, no illustration style, no emoji,
no curved organic decorative shapes, no gradient rainbow backgrounds,
no AI-generated fake-looking faces, no oversharpened edges.
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

export const BRAND_COLORS = {
  black: "#000000",
  grayDark: "#3D3D3C",
  grayLight: "#BDBCBC",
  yellow: "#F9B334",
  cream: "#F5F5F0",
  white: "#FFFFFF",
};

export const BRAND_FONTS = {
  display: "Anton",
  sans: "Inter",
};
