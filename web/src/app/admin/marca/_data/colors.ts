export interface ColorToken {
  name: string;
  role: string;
  hex: string;
  rgb: string;
  cssVar: string;
  usageFrequency?: number;
}

export const palette: ColorToken[] = [
  {
    name: "Brand Black",
    role: "Primary · Background",
    hex: "#000000",
    rgb: "0, 0, 0",
    cssVar: "--brand-black",
  },
  {
    name: "Brand Yellow",
    role: "CTA · Acento principal",
    hex: "#F9B334",
    rgb: "249, 179, 52",
    cssVar: "--brand-yellow",
    usageFrequency: 460,
  },
  {
    name: "Brand Gold",
    role: "Acento premium",
    hex: "#D4A017",
    rgb: "212, 160, 23",
    cssVar: "--brand-gold",
    usageFrequency: 270,
  },
  {
    name: "Brand Graphite",
    role: "Bordes · Neutral",
    hex: "#3D3D3C",
    rgb: "61, 61, 60",
    cssVar: "--brand-graphite",
    usageFrequency: 114,
  },
  {
    name: "Brand Gray",
    role: "Texto secundario",
    hex: "#BDBCBC",
    rgb: "189, 188, 188",
    cssVar: "--brand-gray",
    usageFrequency: 357,
  },
  {
    name: "Gold Dark",
    role: "Hover states",
    hex: "#C9940A",
    rgb: "201, 148, 10",
    cssVar: "--brand-gold-dark",
  },
];

export const signatureGradient = {
  css: "linear-gradient(90deg, #F9B334 0%, #D4A017 50%, #F9B334 100%)",
  description:
    "Úsalo para headlines destacados (con WebkitBackgroundClip: text), acentos en métricas y elementos signature. Está en Hero, Casos y CTAs finales de la web.",
};

export const usageProportions = [
  { name: "Yellow", value: 460, color: "#F9B334" },
  { name: "Gray", value: 357, color: "#BDBCBC" },
  { name: "Gold", value: 270, color: "#D4A017" },
  { name: "Black", value: 114, color: "#000000" },
  { name: "Graphite", value: 84, color: "#3D3D3C" },
];

export const proportionsNote =
  "Instancias reales contadas en el código de web/src/. El amarillo domina como acento, el gris es la segunda voz del texto, el oro es el toque premium.";
