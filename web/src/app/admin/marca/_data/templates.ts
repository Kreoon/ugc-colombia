export interface Template {
  id: string;
  name: string;
  platform: string;
  size: string;
  ratio: string;
  sampleHeadline: string;
  sampleSubcopy?: string;
  preview: {
    w: number;
    h: number;
    bg: "black" | "yellow" | "cream" | "graphite";
    accent: "yellow" | "gold" | "white" | "black";
  };
}

export const templates: Template[] = [
  {
    id: "ig-feed",
    name: "Instagram Feed",
    platform: "Instagram",
    size: "1080 × 1350",
    ratio: "4:5",
    sampleHeadline: "EL FRAMEWORK UGC",
    sampleSubcopy: "CONTENIDO QUE CONVIERTE.",
    preview: { w: 216, h: 270, bg: "black", accent: "yellow" },
  },
  {
    id: "ig-story",
    name: "IG Story / TikTok",
    platform: "Instagram / TikTok",
    size: "1080 × 1920",
    ratio: "9:16",
    sampleHeadline: "5 ERRORES QUE MATAN TU UGC",
    preview: { w: 180, h: 320, bg: "yellow", accent: "black" },
  },
  {
    id: "ig-carousel",
    name: "Carrusel IG",
    platform: "Instagram",
    size: "1080 × 1350",
    ratio: "4:5",
    sampleHeadline: "01 / 08",
    sampleSubcopy: "AGENDAR CALL",
    preview: { w: 216, h: 270, bg: "black", accent: "yellow" },
  },
  {
    id: "linkedin-post",
    name: "LinkedIn Post",
    platform: "LinkedIn",
    size: "1200 × 628",
    ratio: "1.91:1",
    sampleHeadline: "4.2× ROAS EN 60 DÍAS.",
    sampleSubcopy: "STAT 1 · STAT 2",
    preview: { w: 300, h: 157, bg: "black", accent: "yellow" },
  },
  {
    id: "yt-thumb",
    name: "YouTube Thumbnail",
    platform: "YouTube",
    size: "1280 × 720",
    ratio: "16:9",
    sampleHeadline: "CASO REAL 4.2×",
    preview: { w: 288, h: 162, bg: "black", accent: "yellow" },
  },
  {
    id: "yt-banner",
    name: "YouTube Banner",
    platform: "YouTube",
    size: "2560 × 1440",
    ratio: "Zona segura 1546 × 423",
    sampleHeadline: "UGC COLOMBIA · BRAND",
    sampleSubcopy: "AGENCY · BOUTIQUE",
    preview: { w: 320, h: 180, bg: "graphite", accent: "yellow" },
  },
];

export const universalRules = [
  { element: "Zona segura", rule: "5% inset en todos los lados (mínimo)" },
  { element: "Font display", rule: "Anton 400 · UPPERCASE siempre" },
  { element: "Font body", rule: "Inter SemiBold 600 (labels) · Regular 400 (copy)" },
  {
    element: "Colores por pieza",
    rule: "Máximo 3 visibles (negro + amarillo + blanco/gris)",
  },
  { element: "Logo / handle", rule: "Esquina definida, nunca ausente" },
  { element: "Acento gradient", rule: "Solo 1 palabra/dato principal por pieza" },
];
