/**
 * UGC Colombia — Design Tokens (fuente única de verdad)
 *
 * Paleta y tipografía extraídas del Manual de Marca oficial interno
 * (10 slides originales conservados en /brand/legacy-deck/).
 *
 * Paleta oficial (slide 10 "Identidad Visual"):
 *   Color 1: #BDBCBC Gris claro
 *   Color 2: #3D3D3C Gris oscuro
 *   Color 3: #F9B334 Amarillo  ← único acento primario
 *   Color 4: #000000 Negro
 *
 * Tipografía oficial (slide 09 "Tipografías"):
 *   Display: Anton (headlines, statements)
 *   Body:    Inter (párrafos, UI)
 *
 * Cream #F5F5F0 se mantiene como superficie secundaria boutique.
 */

export const brandColors = {
  black: "#000000",
  grayDark: "#3D3D3C",
  grayLight: "#BDBCBC",
  yellow: "#F9B334",
  cream: "#F5F5F0",
  white: "#FFFFFF",
  yellowHover: "#E89F1F",
  yellowSoft: "#FFC66B",
  red: "#DC2626",
  redHover: "#B91C1C",
  green: "#16A34A",
  ink: "#1A1A1A",
} as const;

export const graysScale = {
  950: "#000000",
  900: "#0F0F0F",
  800: "#1F1F1F",
  700: "#2A2A29",
  600: "#3D3D3C",
  500: "#737373",
  400: "#9CA3AF",
  300: "#BDBCBC",
  200: "#D4D4D2",
  100: "#ECECE8",
  50: "#F5F5F0",
} as const;

export const semanticColors = {
  bgPrimary: brandColors.black,
  bgSecondary: graysScale[900],
  bgSurface: graysScale[800],
  bgLight: brandColors.cream,
  textOnDark: brandColors.white,
  textOnLight: brandColors.black,
  textMuted: brandColors.grayLight,
  textBody: brandColors.grayDark,
  accent: brandColors.yellow,
  accentHover: brandColors.yellowHover,
  cta: brandColors.yellow,
  ctaHover: brandColors.yellowHover,
  alert: brandColors.red,
  borderDark: graysScale[700],
  borderLight: graysScale[200],
} as const;

export const fonts = {
  display: "Anton, Impact, sans-serif",
  sans: "Inter, Geist, -apple-system, sans-serif",
  body: "Inter, Geist, -apple-system, sans-serif",
} as const;

export const typeScale = {
  xs: { rem: "0.64rem", px: "10px", leading: "1.5" },
  sm: { rem: "0.75rem", px: "12px", leading: "1.5" },
  base: { rem: "1rem", px: "16px", leading: "1.5" },
  md: { rem: "1.125rem", px: "18px", leading: "1.625" },
  lg: { rem: "1.25rem", px: "20px", leading: "1.375" },
  xl: { rem: "1.5rem", px: "24px", leading: "1.3" },
  "2xl": { rem: "1.875rem", px: "30px", leading: "1.25" },
  "3xl": { rem: "2.25rem", px: "36px", leading: "1.2" },
  "4xl": { rem: "3rem", px: "48px", leading: "1.1" },
  "5xl": { rem: "3.75rem", px: "60px", leading: "1.05" },
  "6xl": { rem: "4.5rem", px: "72px", leading: "1.0" },
  "7xl": { rem: "6rem", px: "96px", leading: "0.95" },
} as const;

export const fontWeights = {
  light: 300,
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
  extrabold: 800,
  black: 900,
} as const;

export const radii = {
  none: "0px",
  sm: "2px",
  base: "4px",
  md: "8px",
  lg: "12px",
  xl: "16px",
  "2xl": "24px",
  full: "9999px",
} as const;

export const shadows = {
  none: "none",
  xs: "0 1px 2px rgba(0,0,0,0.40)",
  sm: "0 2px 8px rgba(0,0,0,0.50)",
  base: "0 4px 16px rgba(0,0,0,0.60)",
  md: "0 8px 24px rgba(0,0,0,0.65)",
  lg: "0 16px 40px rgba(0,0,0,0.70)",
  xl: "0 24px 64px rgba(0,0,0,0.75)",
  yellow: "0 0 24px rgba(249,179,52,0.30)",
  yellowSm: "0 0 8px rgba(249,179,52,0.18)",
  inset: "inset 0 1px 0 rgba(255,255,255,0.06)",
} as const;

export const spacing = {
  0: "0px",
  1: "4px",
  2: "8px",
  3: "12px",
  4: "16px",
  5: "20px",
  6: "24px",
  8: "32px",
  10: "40px",
  12: "48px",
  16: "64px",
  20: "80px",
  24: "96px",
  32: "128px",
  40: "160px",
  48: "192px",
} as const;

export const breakpoints = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
} as const;

export const brandVoice = {
  tagline: "Contenido real, resultados reales.",
  taglineCampaign: "UGC latino con estándar USA.",
  tonalidad: [
    "Profesional, disruptiva y cercana",
    "Innovadora pero sencilla",
    "Experta, sin arrogancia",
    "Auténtica, sin filtros innecesarios",
  ],
  tonoPorCanal: {
    instagram: "Cercano, retador, educativo, inspirador",
    tiktok: "Cercano, retador, educativo, inspirador",
    linkedin: "Corporativo, aspiracional, centrado en resultados",
    youtube: "Práctico, directo, formativo",
  },
  vozInstitucional: {
    nosotros: "Al hablar desde la agencia",
    tu: "Al hablar a marcas o creadores",
  },
  frasesCore: [
    "Donde los creadores se vuelven pro y las marcas convierten más.",
    "No necesitas fama. Necesitas contenido que venda.",
    "Creamos contenido con humanos, potenciado por IA.",
    "Tu historia, nuestra estrategia, resultados garantizados.",
  ],
  slogansAds: [
    "UGC + IA + Live Shopping = ventas reales",
    "Crea. Factura. Repite.",
    "Somos la agencia del contenido que vende",
    "Deja de pagar por likes. Empieza a pagar por resultados.",
    "UGC Colombia. Contenido hecho por humanos, diseñado por estrategas.",
  ],
  normasRedaccion: [
    "Evitar jerga técnica innecesaria",
    "Siempre escribir claro, directo y accionable",
  ],
} as const;

export const designTokens = {
  brand: brandColors,
  grays: graysScale,
  semantic: semanticColors,
  fonts,
  typeScale,
  fontWeights,
  radii,
  shadows,
  spacing,
  breakpoints,
  voice: brandVoice,
} as const;

export type DesignTokens = typeof designTokens;
