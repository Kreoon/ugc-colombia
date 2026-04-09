/**
 * tokens.ts — Design Tokens de UGC Colombia
 * Fuente: brand/design-tokens.md
 * Paleta: Negro Editorial + Dorado Colombia + Crema Boutique
 */

// ─── Colores ────────────────────────────────────────────────────────────────

export const colors = {
  // Paleta principal
  black: "#0A0A0A",
  gold: "#FFD60A",
  goldHover: "#E6C000",
  cream: "#F5F5F0",
  ink: "#1A1A1A",
  red: "#DC2626",
  redHover: "#B91C1C",
  white: "#FFFFFF",

  // Escala de grises
  gray950: "#0A0A0A",
  gray900: "#111111",
  gray800: "#1F1F1F",
  gray700: "#333333",
  gray600: "#4D4D4D",
  gray500: "#737373",
  gray400: "#9CA3AF",
  gray200: "#E5E5E5",
  gray100: "#F0F0EB",

  // Semánticos
  bgPrimary: "#0A0A0A",
  bgSecondary: "#111111",
  bgSurface: "#1F1F1F",
  bgLight: "#F5F5F0",
  textOnDark: "#FFFFFF",
  textOnLight: "#1A1A1A",
  textMuted: "#737373",
  accent: "#FFD60A",
  border: "#333333",
  borderLight: "#E5E5E5",
} as const;

// ─── Tipografía ──────────────────────────────────────────────────────────────

export const fonts = {
  display: '"Fraunces", "GT Super", Georgia, serif',
  body: '"Inter", "Geist", -apple-system, sans-serif',
} as const;

export const fontSizes = {
  xs: 10,
  sm: 12,
  base: 16,
  md: 18,
  lg: 20,
  xl: 24,
  "2xl": 30,
  "3xl": 36,
  "4xl": 48,
  "5xl": 60,
  "6xl": 72,
  "7xl": 96,
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

export const lineHeights = {
  tight: 1.1,
  snug: 1.25,
  normal: 1.5,
  relaxed: 1.625,
  loose: 2.0,
} as const;

export const letterSpacing = {
  tighter: "-0.05em",
  tight: "-0.025em",
  normal: "0em",
  wide: "0.05em",
  wider: "0.1em",
  widest: "0.2em",
} as const;

// ─── Espaciado ───────────────────────────────────────────────────────────────

export const spacing = {
  0: 0,
  1: 4,
  2: 8,
  3: 12,
  4: 16,
  5: 20,
  6: 24,
  8: 32,
  10: 40,
  12: 48,
  16: 64,
  20: 80,
  24: 96,
  32: 128,
  40: 160,
  48: 192,
} as const;

// ─── Border Radius ───────────────────────────────────────────────────────────

export const radius = {
  none: 0,
  sm: 2,
  base: 4,
  md: 8,
  lg: 12,
  xl: 16,
  "2xl": 24,
  full: 9999,
} as const;

// ─── Sombras ─────────────────────────────────────────────────────────────────

export const shadows = {
  none: "none",
  xs: "0 1px 2px rgba(0,0,0,0.40)",
  sm: "0 2px 8px rgba(0,0,0,0.50)",
  base: "0 4px 16px rgba(0,0,0,0.60)",
  md: "0 8px 24px rgba(0,0,0,0.65)",
  lg: "0 16px 40px rgba(0,0,0,0.70)",
  xl: "0 24px 64px rgba(0,0,0,0.75)",
  gold: "0 0 24px rgba(255,214,10,0.25)",
  goldSm: "0 0 8px rgba(255,214,10,0.15)",
  inset: "inset 0 1px 0 rgba(255,255,255,0.06)",
} as const;

// ─── Formatos de video ───────────────────────────────────────────────────────

export const videoFormats = {
  reels: { width: 1080, height: 1920, label: "Reels / TikTok / Shorts" },
  youtube: { width: 1920, height: 1080, label: "YouTube 16:9" },
  square: { width: 1080, height: 1080, label: "LinkedIn / Feed cuadrado" },
} as const;

export type VideoFormat = keyof typeof videoFormats;

// ─── Constantes de animación ─────────────────────────────────────────────────

export const animation = {
  springConfig: {
    damping: 15,
    stiffness: 100,
    mass: 1,
  },
  springConfigFast: {
    damping: 20,
    stiffness: 180,
    mass: 0.8,
  },
  springConfigBouncy: {
    damping: 10,
    stiffness: 80,
    mass: 1.2,
  },
} as const;

// ─── Safe zones (10% mínimo en cada borde) ───────────────────────────────────

export const safeZone = {
  reels: { horizontal: 108, vertical: 192 },   // 10% de 1080 / 1920
  youtube: { horizontal: 192, vertical: 108 },  // 10% de 1920 / 1080
  square: { horizontal: 108, vertical: 108 },   // 10% de 1080 / 1080
} as const;
