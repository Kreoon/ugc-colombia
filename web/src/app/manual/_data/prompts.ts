/**
 * Biblioteca de prompts Nanobanana para UGC Colombia.
 * Cada uno parametrizable y probado en Fase 3. Copia-pega y genera.
 */

export type PromptItem = {
  id: string;
  title: string;
  usage: string;
  prompt: string;
  aspectRatio: string;
  exampleSrc?: string;
  category: "brand" | "social" | "ads" | "deck" | "icon" | "imagery";
};

const BASE_TAIL = `
Paleta: #000000 negro, #F9B334 amarillo amber, #3D3D3C gris oscuro, #BDBCBC gris claro, #F5F5F0 crema.
Mood: cinematic, documental, boutique, sistematizado, humano, premium latino con estándar USA.
Luz: cálida direccional, amber rim light, sombras profundas, highlights preservados.
Grano: matte finish, film grain sutil.
Negative: no text, no labels, no stock photo, no bright white backgrounds, no vivid saturated colors, no AI-fake faces.
`.trim();

export const promptLibrary: PromptItem[] = [
  {
    id: "hero-lifestyle-editorial",
    title: "Hero Lifestyle Editorial",
    usage: "Para landings, headers web, decks. Interior boutique studio con luz amber.",
    aspectRatio: "16:9",
    category: "imagery",
    exampleSrc: "/brand/manual-assets/imagery/hero-lifestyle.png",
    prompt: `Editorial wide shot, interior of a boutique creator studio in {ciudad}, warm amber afternoon light through large window, matte dark walls, minimal professional camera gear on wooden table, no people. Documentary realism. ${BASE_TAIL}`,
  },
  {
    id: "bts-produccion",
    title: "BTS Producción Auténtica",
    usage: "Behind the scenes para redes y ads de autenticidad.",
    aspectRatio: "3:2",
    category: "imagery",
    exampleSrc: "/brand/manual-assets/imagery/bts-estudio.png",
    prompt: `Behind-the-scenes documentary frame of a real video production set, professional ring light in foreground (soft focus), dark soft-box silhouettes behind, sense of in-progress craft, no people. ${BASE_TAIL}`,
  },
  {
    id: "creator-plato-minimal",
    title: "Creator en plató minimalista",
    usage: "Posts orgánicos y carruseles sobre creators sin mostrar caras.",
    aspectRatio: "4:5",
    category: "social",
    exampleSrc: "/brand/manual-assets/social/ig-reel-cover.png",
    prompt: `Vertical boutique portrait lighting setup without showing a face, amber backlight creating halo silhouette against deep black, subtle golden light beams, cinematic. ${BASE_TAIL}`,
  },
  {
    id: "flatlay-producto",
    title: "Flatlay Producto + Props",
    usage: "Top-down de workspace creator, testimonios UGC.",
    aspectRatio: "3:2",
    category: "imagery",
    exampleSrc: "/brand/manual-assets/imagery/mesa-trabajo.png",
    prompt: `Top-down 90° editorial still of a creator workdesk, warm amber pool of light from lamp on matte black wooden surface, minimal props: notebook, pen, small camera, coffee cup, all unbranded. ${BASE_TAIL}`,
  },
  {
    id: "testimonio-pull-quote",
    title: "Testimonio Pull-Quote Card",
    usage: "Card para IG feed con espacio vacío para cita.",
    aspectRatio: "4:5",
    category: "social",
    exampleSrc: "/brand/manual-assets/social/ig-feed-quote.png",
    prompt: `Minimal dark quote-style visual, single amber horizontal line slicing across pure black surface with soft film grain, golden glow fading diagonally, subtle amber geometric accent in lower corner. Large black negative space for pull-quote overlay. ${BASE_TAIL}`,
  },
  {
    id: "data-viz-premium",
    title: "Data Viz Premium (performance)",
    usage: "LinkedIn B2B, decks de resultados. Sin números visibles.",
    aspectRatio: "1:1",
    category: "social",
    exampleSrc: "/brand/manual-assets/social/linkedin-post.png",
    prompt: `LinkedIn square B2B visual, dark minimal tech editorial, abstract rising performance chart lines in amber tones on matte black surface, clean geometric data suggestion without readable numbers. Professional authority aesthetic. ${BASE_TAIL}`,
  },
  {
    id: "carrusel-educativo",
    title: "Carrusel Educativo (slide 1–5)",
    usage: "Serie de posts educativos IG.",
    aspectRatio: "4:5",
    category: "social",
    exampleSrc: "/brand/manual-assets/social/ig-feed-hero.png",
    prompt: `Editorial hero composition for IG feed, dark boutique atmosphere, amber ring light creating warm rim on matte dark surface, abstract subject suggesting {tema}, negative space in lower third for copy. ${BASE_TAIL}`,
  },
  {
    id: "ad-hook-first-frame",
    title: "Ad Hook First-Frame",
    usage: "Primer frame de video ads Meta/TikTok.",
    aspectRatio: "9:16",
    category: "ads",
    exampleSrc: "/brand/manual-assets/ads/tiktok-hook.png",
    prompt: `Vertical TikTok ad first-frame hook, cinematic close-up of an unbranded authentic {producto} in warm amber directional light on matte black surface, shallow depth of field, pause-scroll energy. ${BASE_TAIL}`,
  },
  {
    id: "deck-portada-sobria",
    title: "Deck Portada Sobria",
    usage: "Apertura de pitch deck, propuesta comercial.",
    aspectRatio: "16:9",
    category: "deck",
    exampleSrc: "/brand/manual-assets/decks/01-portada.png",
    prompt: `Presentation cover 16:9, deep black editorial background with large amber diagonal light ray upper-right to lower-left, minimal abstract texture, premium boutique opening frame. Left 45% darker for title area. ${BASE_TAIL}`,
  },
  {
    id: "icono-line-art-amber",
    title: "Icono Line-Art con acento oro",
    usage: "Íconos para features, servicios, pilares.",
    aspectRatio: "1:1",
    category: "icon",
    exampleSrc: "/brand/manual-assets/icons/strategy.png",
    prompt: `Minimal line-art icon of {concepto}, single amber stroke on matte black square background, editorial line-art weight, monoline SVG-ready aesthetic, centered in 30% of square, generous black padding. ${BASE_TAIL}`,
  },
];
