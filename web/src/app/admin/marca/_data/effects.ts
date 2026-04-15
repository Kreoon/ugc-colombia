export interface EffectSpec {
  id: string;
  name: string;
  subtitle: string;
  css: string;
  duration: string;
  loop: string;
  easing: string;
  use: string;
}

export const effects: EffectSpec[] = [
  {
    id: "glow-pulse",
    name: "Glow Pulse",
    subtitle: "CTAs premium",
    css: `@keyframes glow-pulse {
  0%, 100% { box-shadow: 0 0 8px rgba(212,160,23,0.4); }
  50%      { box-shadow: 0 0 20px 4px rgba(212,160,23,0.7); }
}`,
    duration: "2.5s",
    loop: "infinite",
    easing: "ease-in-out",
    use: "Botón CTA cierre de página, badges signature.",
  },
  {
    id: "text-reveal",
    name: "Text Reveal",
    subtitle: "Entrada de headlines",
    css: `initial:   { opacity: 0, y: 32 }
animate:   { opacity: 1, y: 0 }
transition: { delay: i * 0.12, duration: 0.65, ease: [0.22, 1, 0.36, 1] }`,
    duration: "650–700ms",
    loop: "one-shot",
    easing: "[0.22, 1, 0.36, 1]",
    use: "Hero headlines, section titles al entrar al viewport.",
  },
  {
    id: "marquee",
    name: "Marquee Logos",
    subtitle: "Carrusel infinito",
    css: `@keyframes marquee {
  0%   { transform: translateX(0%); }
  100% { transform: translateX(-50%); }
}
animation: marquee 40s linear infinite;`,
    duration: "40s",
    loop: "infinite",
    easing: "linear",
    use: "Banner de logos de marcas que confiaron en nosotros.",
  },
  {
    id: "logo-shine",
    name: "Logo Shine",
    subtitle: "Barrido premium",
    css: `mix-blend-mode: screen;
animation: logo-shine-sweep 5s ease-in-out infinite;
mask-image: url("/brand/logo-dark-bg.png");`,
    duration: "5s",
    loop: "infinite",
    easing: "ease-in-out",
    use: "Logo en hero y navbar — delay 2s antes del primer sweep.",
  },
];

export const transitions = [
  { element: "Botones hover", duration: "200ms", easing: "ease", use: "Color + glow" },
  { element: "Navbar scroll", duration: "300ms", easing: "ease", use: "Bg + border" },
  {
    element: "Fade in secciones",
    duration: "600ms",
    easing: "[0.22, 1, 0.36, 1]",
    use: "Entrada viewport",
  },
  {
    element: "Text reveal",
    duration: "650–700ms",
    easing: "[0.22, 1, 0.36, 1]",
    use: "Hero headlines",
  },
  { element: "Glow pulse", duration: "2.5s loop", easing: "ease-in-out", use: "CTAs premium" },
  { element: "Marquee logos", duration: "40s loop", easing: "linear", use: "Carrusel marcas" },
  { element: "Logo shine", duration: "5s loop", easing: "ease-in-out", use: "Delay 2s" },
];
