/**
 * UGC Colombia — Mapeo de variantes de logo
 *
 * Las variantes oficiales hoy existen solo como PNGs (no hay .ai/.svg maestro).
 * Las que existen se extraen del Manual de Marca original (deck en /brand/legacy-deck/).
 * Las que faltan se generarán en Fase 3 con prompts específicos de Nanobanana.
 *
 * Anatomía del logo oficial (para reconstrucciones precisas):
 *   - Isotipo: 3 glyphs "UGC" en sans-serif condensed alto (Anton-like) sobre fondo
 *   - Dentro de la "U" izquierda: palabra "AGENCIA" en vertical, pequeña
 *   - Cada glyph tiene un "test tube" amarillo (#F9B334) dentro, como indicador de nivel
 *   - Al lado derecho: wordmark "COLOMBIA" en gris oscuro #3D3D3C, peso regular
 *   - Debajo de COLOMBIA: barra horizontal amarilla
 *   - Al final de la barra: 3 marcas diagonales pequeñas amarillas (acento dinámico)
 */

export type LogoVariant = {
  id: string;
  name: string;
  file: string;
  status: "official" | "generated" | "pending";
  format: "png" | "svg" | "webp";
  orientation: "horizontal" | "stacked" | "isotype";
  background: "color" | "light" | "dark" | "yellow" | "transparent";
  colorTreatment: "color" | "mono-gray" | "mono-black" | "mono-white" | "inverse";
  minWidthPx: number;
  clearspacePx: number;
  usage: string;
};

export const logoVariants: LogoVariant[] = [
  {
    id: "horizontal-color",
    name: "Horizontal — Color oficial",
    file: "/brand/logos/v2/logo-horizontal-color.png",
    status: "official",
    format: "png",
    orientation: "horizontal",
    background: "light",
    colorTreatment: "color",
    minWidthPx: 240,
    clearspacePx: 32,
    usage: "Primary lockup sobre fondos claros y crema. Uso default en web, email, decks, ads.",
  },
  {
    id: "horizontal-mono-gray",
    name: "Horizontal — Monocromo gris",
    file: "/brand/logos/v2/logo-horizontal-mono-gray.png",
    status: "official",
    format: "png",
    orientation: "horizontal",
    background: "light",
    colorTreatment: "mono-gray",
    minWidthPx: 240,
    clearspacePx: 32,
    usage: "Aplicaciones donde el color no suma (impresión B/N, documentación técnica).",
  },
  {
    id: "horizontal-white",
    name: "Horizontal — Blanco sobre transparente",
    file: "/brand/logos/v2/logo-horizontal-white-on-transparent.png",
    status: "official",
    format: "png",
    orientation: "horizontal",
    background: "dark",
    colorTreatment: "mono-white",
    minWidthPx: 240,
    clearspacePx: 32,
    usage: "Uso sobre fondos negros, oscuros, fotos con overlay. Versión web dark mode.",
  },
  {
    id: "horizontal-yellow-bg",
    name: "Horizontal — Blanco sobre amarillo",
    file: "/brand/logos/v2/logo-horizontal-on-yellow.png",
    status: "pending",
    format: "png",
    orientation: "horizontal",
    background: "yellow",
    colorTreatment: "mono-white",
    minWidthPx: 240,
    clearspacePx: 32,
    usage: "Badges promocionales, etiquetas destacadas, stickers sobre fondo amarillo.",
  },
  {
    id: "stacked-color",
    name: "Stacked — Color",
    file: "/brand/logos/v2/logo-stacked-color.png",
    status: "pending",
    format: "png",
    orientation: "stacked",
    background: "light",
    colorTreatment: "color",
    minWidthPx: 160,
    clearspacePx: 24,
    usage: "Formatos cuadrados y verticales: avatares, IG profile, app icons de tamaño medio.",
  },
  {
    id: "stacked-white",
    name: "Stacked — Blanco",
    file: "/brand/logos/v2/logo-stacked-white.png",
    status: "pending",
    format: "png",
    orientation: "stacked",
    background: "dark",
    colorTreatment: "mono-white",
    minWidthPx: 160,
    clearspacePx: 24,
    usage: "Favicon dark, avatar oscuro, watermarks sobre imagen.",
  },
  {
    id: "isotype-color",
    name: "Isotipo — Color",
    file: "/brand/logos/v2/isotype-color.png",
    status: "pending",
    format: "png",
    orientation: "isotype",
    background: "light",
    colorTreatment: "color",
    minWidthPx: 64,
    clearspacePx: 16,
    usage: "Favicon, social profile small, reducciones extremas. Solo UGC sin wordmark.",
  },
  {
    id: "isotype-white",
    name: "Isotipo — Blanco",
    file: "/brand/logos/v2/isotype-white.png",
    status: "pending",
    format: "png",
    orientation: "isotype",
    background: "dark",
    colorTreatment: "mono-white",
    minWidthPx: 64,
    clearspacePx: 16,
    usage: "Watermarks sobre foto oscura, stickers UGC simples, loader states.",
  },
  {
    id: "isotype-black",
    name: "Isotipo — Negro",
    file: "/brand/logos/v2/isotype-black.png",
    status: "pending",
    format: "png",
    orientation: "isotype",
    background: "light",
    colorTreatment: "mono-black",
    minWidthPx: 64,
    clearspacePx: 16,
    usage: "Impresión B/N, embossing, documentos oficiales.",
  },
];

export const officialLogo = logoVariants.find((l) => l.id === "horizontal-color")!;

export const clearspaceRule = {
  unit: "height of the UGC cap-letter",
  minimum: "2× cap-height around all sides",
  guidance: "Nunca pegar otro elemento o texto dentro del clearspace del logo.",
};

export const minSizeRules = {
  horizontal: {
    digital: "240px wide minimum",
    print: "30mm wide minimum",
  },
  stacked: {
    digital: "160px wide minimum",
    print: "20mm wide minimum",
  },
  isotype: {
    digital: "32px wide minimum (favicon extremo)",
    print: "10mm wide minimum",
  },
};

export const dontRules = [
  "No alterar proporciones ni estirar el lockup",
  "No cambiar los colores oficiales (#F9B334 amarillo, #3D3D3C gris, #000000 negro)",
  "No aplicar efectos: drop shadow, glow, outlines, gradientes",
  "No rotar el logo",
  "No colocar el lockup color sobre fondos de bajo contraste (gris medio, amarillo saturado)",
  "No reemplazar la tipografía del wordmark",
  "No agregar texto o claims tocando el logo sin respetar el clearspace",
  "No usar el logo en tamaños inferiores al mínimo declarado",
];

export const doRules = [
  "Usar variante horizontal color como default sobre fondos claros",
  "Usar variante blanco sobre fondos oscuros y fotos con overlay negro",
  "Respetar clearspace de 2× cap-height en todos los lados",
  "Elegir la variante stacked cuando el espacio sea más vertical que horizontal",
  "Usar el isotipo solo cuando el wordmark no quepa legiblemente",
  "Mantener la variante monocromo para comunicaciones donde el color distraiga",
];
