/**
 * UGC Colombia — Design Tokens (fuente única de verdad)
 *
 * Reconciliado con el Manual de Marca oficial (pdfs/MANUAL-DE-MARCA.pdf).
 * Consumido por tailwind.config.ts y por /admin/marca.
 *
 * Paleta oficial (cap. 02 del manual):
 *   #000000 Brand Black       — background primary
 *   #F9B334 Brand Yellow      — CTA / acento principal
 *   #D4A017 Brand Gold        — acento premium (bordes, detalles editoriales)
 *   #C9940A Brand Gold Dark   — hover states sobre gold
 *   #3D3D3C Brand Graphite    — bordes, neutral
 *   #BDBCBC Brand Gray        — texto secundario
 *   #F5F5F0 Brand Cream       — superficie boutique
 *   #FFFFFF Brand White       — fondo obligatorio para logo negro
 *
 * Tipografía:
 *   Display: Anton 400 (único peso, UPPERCASE)
 *   Body:    Inter 400/500/600/700
 */

export const brandColors = {
  black: "#000000",
  ink: "#1A1A1A",
  graphite: "#3D3D3C",
  grayDark: "#3D3D3C",
  grayLight: "#BDBCBC",
  cream: "#F5F5F0",
  white: "#FFFFFF",
  yellow: "#F9B334",
  yellowHover: "#E89F1F",
  yellowSoft: "#FFC66B",
  gold: "#D4A017",
  goldDark: "#C9940A",
  red: "#DC2626",
  redHover: "#B91C1C",
  green: "#16A34A",
} as const;

export const brandGradient = {
  signature:
    "linear-gradient(90deg, #F9B334 0%, #D4A017 50%, #F9B334 100%)",
  signatureDescription:
    "Gradiente signature. Uso: headlines con WebkitBackgroundClip text, acentos en métricas, elementos signature (Hero, Casos, CTAs finales).",
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
  bgLogoBlack: brandColors.white,
  textOnDark: brandColors.white,
  textOnLight: brandColors.black,
  textMuted: brandColors.grayLight,
  textBody: brandColors.grayDark,
  accent: brandColors.yellow,
  accentHover: brandColors.yellowHover,
  accentPremium: brandColors.gold,
  accentPremiumHover: brandColors.goldDark,
  cta: brandColors.yellow,
  ctaHover: brandColors.yellowHover,
  alert: brandColors.red,
  borderDark: graysScale[700],
  borderLight: graysScale[200],
  borderGold: brandColors.gold,
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
  "3xl": "32px",
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
  gold: "0 0 24px rgba(212,160,23,0.30)",
  goldSm: "0 0 8px rgba(212,160,23,0.18)",
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
  28: "112px",
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

export const designTokens = {
  brand: brandColors,
  gradient: brandGradient,
  grays: graysScale,
  semantic: semanticColors,
  fonts,
  typeScale,
  fontWeights,
  radii,
  shadows,
  spacing,
  breakpoints,
} as const;

export type DesignTokens = typeof designTokens;
