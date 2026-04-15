export interface LogoVariant {
  id: string;
  title: string;
  subtitle: string;
  src: string;
  bg: "black" | "cream" | "yellow" | "graphite" | "white";
  bgRequired: string;
  notes: string;
}

export const logoOfficial = {
  primary: "/brand/logo-dark-bg.png",
  light: "/brand/logo-light-bg.png",
  size: "814 × 351 px — PNG RGBA",
  path: "/public/brand/logo-dark-bg.png",
};

export const logoVariants: LogoVariant[] = [
  {
    id: "principal",
    title: "Principal",
    subtitle: "Sobre negro",
    src: "/brand/logo-dark-bg.png",
    bg: "black",
    bgRequired: "Fondo negro #000000",
    notes:
      "Versión default en web, headers, redes oscuras. Efecto shine activo solo en pantalla.",
  },
  {
    id: "inverso",
    title: "Inverso",
    subtitle: "Sobre claro",
    src: "/brand/logo-light-bg.png",
    bg: "cream",
    bgRequired: "Fondo blanco o cream #F5F5F0",
    notes:
      "Documentos formales, mailing, propuestas impresas. OBLIGATORIO fondo blanco si el logo queda en negro.",
  },
  {
    id: "mono-yellow",
    title: "Monocromo negro",
    subtitle: "Sobre yellow",
    src: "/brand/logo-light-bg.png",
    bg: "yellow",
    bgRequired: "Bloque amarillo #F9B334",
    notes:
      "Usos signature: banners, stories destacadas. El logo debe ir dentro de un cuadro/contenedor blanco o directamente sobre amarillo — nunca amarillo sobre foto.",
  },
  {
    id: "graphite",
    title: "Sobre graphite",
    subtitle: "Superficie neutra",
    src: "/brand/logo-dark-bg.png",
    bg: "graphite",
    bgRequired: "Fondo #3D3D3C",
    notes:
      "Secciones secundarias, footers, UI editorial. Mantener clearspace 1× isotipo.",
  },
];

export const logoShineCSS = `animation: logo-shine-sweep 5s ease-in-out infinite;
background: linear-gradient(115deg,
  transparent 30%,
  rgba(255,255,255,0.15) 44%,
  rgba(249,179,52,0.55) 48%,
  rgba(255,255,255,0.9) 50%,
  rgba(249,179,52,0.55) 52%,
  rgba(255,255,255,0.15) 56%,
  transparent 70%);
mix-blend-mode: screen;`;

export const logoShineNote =
  "Barrido dorado que cruza el logo cada 5s. Da premium sin ser intrusivo. Solo en pantalla — nunca en impresiones.";

export const logoDo = [
  "Usar logo-dark-bg.png sobre fondo negro (#000)",
  "Mantener clearspace = altura del isotipo",
  "Escalar siempre proporcionalmente",
  "Mínimo digital: 120px de ancho",
  "Usar efecto shine solo en web/video",
];

export const logoDont = [
  "No rotar, inclinar ni distorsionar",
  "No añadir sombras, biseles ni 3D",
  "No cambiar colores del logo",
  "No usar sobre fondos sin contraste",
  "No recrear con tipografías similares",
];

export const logoBackgroundRule = {
  title: "Regla innegociable — Fondo del logo negro",
  body:
    "Cualquier uso del logo en variante negra (mono-black o full color sobre fondo claro) DEBE ir sobre un cuadro blanco sólido de fondo. Nunca colocar el logo negro directamente sobre fondos de color, fotos o gradientes. Si el background es oscuro o foto, usar la variante blanca.",
  rationale:
    "Preservar contraste y legibilidad del isotipo + evitar que los detalles finos se pierdan visualmente.",
};

export const clearspaceRule =
  "Clearspace mínimo = altura del isotipo (X) en todos los lados. En digital: 20px mínimo para logo horizontal, 24px para principal, 12px para isotipo.";

export const minSizes = {
  digital: [
    { variant: "Logo horizontal", min: "120px", recomendado: "200px+" },
    { variant: "Logo principal", min: "100px", recomendado: "180px+" },
    { variant: "Isotipo", min: "24px", recomendado: "40px+" },
  ],
  print: [
    { variant: "Logo horizontal", min: "30mm" },
    { variant: "Logo principal", min: "25mm" },
    { variant: "Isotipo", min: "8mm" },
  ],
};
