export const gridSpec = {
  columns: 12,
  container: "responsive · Tailwind default",
  gap: "8px (space-2)",
  sectionPadding: "py-20 sm:py-28 lg:py-32 · px-4 sm:px-6 lg:px-8",
};

export const spacingScale = [
  { token: "py-4", px: "16px" },
  { token: "py-6", px: "24px" },
  { token: "py-10", px: "40px" },
  { token: "py-12", px: "48px" },
  { token: "py-20", px: "80px" },
  { token: "py-28", px: "112px" },
  { token: "py-32", px: "128px" },
];

export const radiiScale = [
  { token: "rounded-lg", px: "8px" },
  { token: "rounded-xl", px: "12px" },
  { token: "rounded-2xl", px: "16px" },
  { token: "rounded-full", px: "pill" },
];

export const radiiRule =
  "Botones y cards usan rounded-xl a rounded-2xl. Badges usan rounded-full. Elementos decorativos pueden ir a rounded-3xl.";

export const shadowsList = [
  { name: "Navbar", value: "shadow dark", use: "Navbar scrolled" },
  { name: "Button glow", value: "yellow/35", use: "CTAs primarios" },
  { name: "CTA hover", value: "yellow/55", use: "Hover state" },
  { name: "CTA Final", value: "double glow", use: "CTA cierre de página" },
];

export const opacityOverlays = [
  {
    class: "bg-white/4",
    use: "Fondo de card",
    example: "Cards sobre negro",
  },
  {
    class: "bg-white/8",
    use: "Hover en ghost buttons",
    example: "Navbar hover",
  },
  {
    class: "bg-black/60",
    use: "Navbar default",
    example: "Backdrop blur",
  },
  {
    class: "bg-black/92",
    use: "Navbar scrolled",
    example: "Más opaco al scroll",
  },
  {
    class: "border-brand-gold/15",
    use: "Bordes de card",
    example: "Sutil, editorial",
  },
  {
    class: "border-brand-gold/20",
    use: "Navbar scrolled border",
    example: "Acento dorado",
  },
];
