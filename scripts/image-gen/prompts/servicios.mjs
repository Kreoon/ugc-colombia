// Prompts para la página /servicios de UGC Colombia
// 1 hero (16:9) + 7 imágenes cuadradas (1:1), una por línea de servicio.

import { buildPrompt } from "../brand-system.mjs";

export const SERVICIOS_PROMPTS = [
  {
    id: "hero",
    filename: "hero.png",
    aspectRatio: "16:9",
    prompt: buildPrompt({
      concept:
        "cinematic ultra-wide editorial still of a premium boutique production studio in operation, multiple soft warm golden light sources in the background creating bokeh, a minimalist matte black desk in sharp focus foreground with a single unbranded film clapperboard and a brass accent object, slight atmospheric haze catching the light, rich anamorphic mood, boutique latin american content agency aesthetic",
      composition:
        "wide 16:9 cinematic framing, foreground objects lower-left, bokeh lights diagonal receding right, right 40% soft dark negative space for copy",
      extra:
        "inspired by Apple WWDC film stills and A24 studio photography, 35mm grain, crushed shadow blacks, no screens, no visible faces, no readable text on clapperboard",
    }),
  },
  {
    id: "ugc-ads",
    filename: "ugc-ads.png",
    aspectRatio: "1:1",
    prompt: buildPrompt({
      concept:
        "overhead flat-lay editorial shot of a single unbranded phone in a matte black case propped on a small tripod filming an unbranded cosmetic tube on a dark textured surface, a compact ring light at the edge of frame casting warm golden halo, authentic UGC filming moment from creator point of view",
      composition:
        "square centered composition, phone and product forming a diagonal, generous dark negative space around, light source upper-left",
      extra:
        "think authentic UGC behind-the-scenes, no screens on, no product labels, no brands visible, warm cinematic mood",
    }),
  },
  {
    id: "estrategia",
    filename: "estrategia.png",
    aspectRatio: "1:1",
    prompt: buildPrompt({
      concept:
        "editorial overhead shot of a premium matte black editorial planning board, unbranded blank index cards arranged in an organized grid, brass thumbtacks catching warm golden light from upper-right, a single fine gold pen resting diagonally, sense of intentional systematized content strategy, boutique editorial planning aesthetic",
      composition:
        "grid of cards fills middle 70%, square centered, warm raking light from upper-right creating long shadows",
      extra:
        "think Kinfolk magazine editorial flat-lay, no visible text or words on any card, no logos, no digital screens",
    }),
  },
  {
    id: "produccion",
    filename: "produccion.png",
    aspectRatio: "1:1",
    prompt: buildPrompt({
      concept:
        "cinematic close-up of a high-end cinema camera silhouette from behind with warm golden rim light along its edges, out-of-focus professional softbox light in background creating large golden bokeh, dark premium film set atmosphere, sense of broadcast-quality production",
      composition:
        "camera occupies center-left of square frame, bokeh lights upper-right, deep black foreground",
      extra:
        "inspired by RED and Arri product photography, no visible brand logos or markings, no people, ultra premium cinematic mood",
    }),
  },
  {
    id: "consultoria",
    filename: "consultoria.png",
    aspectRatio: "1:1",
    prompt: buildPrompt({
      concept:
        "editorial still of a premium matte black desk with a single open unbranded leather-bound notebook, a vintage brass fountain pen resting on the page, a small stone paperweight, warm golden afternoon light raking from the left across the textured page, intellectual strategic consulting atmosphere, latin american boutique advisor aesthetic",
      composition:
        "notebook and pen centered slightly right, square framing, light source from left creating directional shadows",
      extra:
        "think Harvard Business Review editorial photography, no readable text on notebook pages, pages appear blank or abstract, no logos",
    }),
  },
  {
    id: "talento",
    filename: "talento.png",
    aspectRatio: "1:1",
    prompt: buildPrompt({
      concept:
        "editorial grid of abstract dark silhouetted portraits, three out-of-focus figures suggesting diverse latin american creators in warm golden rim lighting, each figure on a separate dark panel separated by thin golden lines, minimal triptych composition, premium talent agency aesthetic",
      composition:
        "three vertical panels filling square frame, rim light from left on each silhouette, no identifiable faces",
      extra:
        "think Annie Leibovitz silhouette portraits, no faces visible, no skin detail, pure shape and light, no text",
    }),
  },
  {
    id: "ia-automatizacion",
    filename: "ia-automatizacion.png",
    aspectRatio: "1:1",
    prompt: buildPrompt({
      concept:
        "abstract dark editorial visualization representing AI agents, custom software development and automation infrastructure, thin luminous golden lines forming a layered architecture of interconnected nodes and modules against deep black space, one brighter golden core element suggesting a central AI agent, faint terminal-like monospace geometric shapes dissolving into particles, minimal brutalist tech art with a developer craft feel",
      composition:
        "architecture fills middle 75% of square frame, fades to pure black at edges, focal brightest core slightly off-center upper-right",
      extra:
        "think Linear engineering blog header, Vercel dark editorial visuals and Arc browser launch aesthetic, no UI elements, no screen mockups, no readable labels, no code text",
    }),
  },
  {
    id: "diseno-web",
    filename: "diseno-web.png",
    aspectRatio: "1:1",
    prompt: buildPrompt({
      concept:
        "editorial architectural still of a premium minimalist matte black laptop open on a dark stone surface, the screen glowing with a soft warm golden light but showing only an abstract dark gradient (no interface visible), warm directional light from upper-left raking across the laptop edge, a single brass paperweight beside it, premium boutique web design atelier aesthetic",
      composition:
        "laptop centered slightly lower in square frame, warm light from upper-left, crushed shadows, generous negative space above",
      extra:
        "think Framer and Linear brand photography, no UI on screen, no text, no logos, no cables, no stock laptop look",
    }),
  },
  {
    id: "landing-pages",
    filename: "landing-pages.png",
    aspectRatio: "1:1",
    prompt: buildPrompt({
      concept:
        "abstract editorial composition of a single tall vertical warm golden light shaft against deep black space, suggesting the focused verticality of a conversion landing page, subtle fine horizontal golden lines segmenting the shaft like page sections, a small bright rising arrow of light at the top, premium conversion optimization aesthetic",
      composition:
        "vertical light shaft centered in square frame, top-third brightest, fades to black at edges and bottom",
      extra:
        "think A24 poster design and Linear changelog visuals, no UI elements, no text, no buttons, no screen mockups, no readable numbers",
    }),
  },
  {
    id: "contenido-ia",
    filename: "contenido-ia.png",
    aspectRatio: "1:1",
    prompt: buildPrompt({
      concept:
        "abstract editorial collage of warm golden light fragments and particles coalescing into an emerging organic form against deep black space, suggesting AI generative creativity, soft golden glow with volumetric light rays, particles drifting with motion blur, premium generative art aesthetic",
      composition:
        "particles converging toward center of square, brightest concentration slightly upper-center, fades to black at corners",
      extra:
        "think Refik Anadol generative art with a cinematic editorial twist, no recognizable objects, no faces, no text, pure abstract light and form",
    }),
  },
];
