// Prompts para la página /casos de UGC Colombia
// 1 hero (16:9) + 7 dolores (16:9) como ambient background por sección

import { buildPrompt } from "../brand-system.mjs";

export const CASOS_PAGE_PROMPTS = [
  {
    id: "hero",
    filename: "hero.png",
    aspectRatio: "16:9",
    prompt: buildPrompt({
      concept:
        "cinematic editorial wide shot of an abandoned dark editing suite at night, a single large matte black monitor turned off on a premium desk, warm golden desk lamp casting a cone of light, scattered unbranded printed storyboard frames and a half-empty coffee mug silhouette, sense of burnout and unfinished creative work, documentary mood",
      composition:
        "wide 16:9 cinematic framing, desk and lamp occupy lower-left, deep dark space above and right for copy overlay",
      extra:
        "think moody editorial magazine cover, no screens on, no readable text on storyboards, no people, no brand logos, crushed shadow blacks",
    }),
  },
  {
    id: "creacion-contenido",
    filename: "creacion-contenido.png",
    aspectRatio: "16:9",
    prompt: buildPrompt({
      concept:
        "cinematic editorial wide shot of a chaotic content creation scene, an unbranded phone on a small tripod abandoned mid-shot, scattered unbranded product samples on a dark surface, a single warm golden key light from camera-left, subtle motion blur suggesting rushed improvised work, documentary behind-the-scenes mood of burnout",
      composition:
        "wide 16:9 framing, objects scattered across lower 60%, generous dark space above for copy, warm light source upper-left",
      extra:
        "think A24 film stills, no visible brand labels, no faces, no readable text, crushed shadows, fine film grain",
    }),
  },
  {
    id: "fatiga-creativa",
    filename: "fatiga-creativa.png",
    aspectRatio: "16:9",
    prompt: buildPrompt({
      concept:
        "editorial still of an abstract visual metaphor for creative fatigue, a repeating pattern of identical dark film frames receding into deep black space, each successive frame slightly dimmer and more desaturated than the last, warm golden light source only on the nearest frame fading to pure black at the vanishing point, minimal brutalist editorial",
      composition:
        "frames receding diagonally from foreground-left to background-right, wide 16:9 cinematic framing, vanishing point right of center",
      extra:
        "think Chris Nolan Interstellar film grain aesthetic, no readable content in frames, abstract shapes only, pure editorial mood",
    }),
  },
  {
    id: "contratar-creadores",
    filename: "contratar-creadores.png",
    aspectRatio: "16:9",
    prompt: buildPrompt({
      concept:
        "editorial still life of an abandoned matte black desk with an unbranded phone face-down showing no interface, several unread message envelope silhouettes floating abstractly in warm golden light around it, sense of ghosted freelance outreach and unanswered messages, moody documentary interior",
      composition:
        "phone centered slightly left, abstract envelope shapes floating around it, wide 16:9 framing, warm light raking from upper-right",
      extra:
        "think editorial magazine feature photography, no visible UI, no text on envelopes, no readable messages, moody mood",
    }),
  },
  {
    id: "estrategia-organica",
    filename: "estrategia-organica.png",
    aspectRatio: "16:9",
    prompt: buildPrompt({
      concept:
        "cinematic still of an editorial wall covered in randomly scattered unbranded dark paper fragments and cards with no clear structure, a single warm golden light raking across from the right revealing the chaos, some fragments half-falling to the floor, sense of content strategy without direction or pillars, documentary editorial mood",
      composition:
        "wall fills most of 16:9 frame, light from right creating long shadows, dark floor line in lower fifth",
      extra:
        "think editorial documentary of an abandoned war room, no readable text on any fragment, no logos, no pins with text, crushed shadows",
    }),
  },
  {
    id: "metricas-ads",
    filename: "metricas-ads.png",
    aspectRatio: "16:9",
    prompt: buildPrompt({
      concept:
        "abstract editorial visualization of confused data analysis, a single dark surface with multiple conflicting abstract wavy line forms rising and falling in golden tones, lines crossing and tangling at the center, suggesting contradictory KPI signals, warm rim light from the right, minimal brutalist data art",
      composition:
        "wavy lines occupy middle 60% of 16:9 frame, tangled convergence slightly off-center, deep black at edges",
      extra:
        "think Refik Anadol data art with a frustrated editorial twist, no numbers, no chart axes, no readable labels, pure abstract form",
    }),
  },
  {
    id: "produccion-cara",
    filename: "produccion-cara.png",
    aspectRatio: "16:9",
    prompt: buildPrompt({
      concept:
        "cinematic still of an over-engineered expensive film production setup, multiple professional studio lights and a large cinema camera on a crane rig silhouetted against deep black space, dramatic warm golden rim lighting, sense of beautiful but overkill premium production, moody editorial atmosphere",
      composition:
        "equipment occupies middle 70% of 16:9 frame, diagonal crane arm rising from lower-left to upper-right, deep black negative space around",
      extra:
        "think Hollywood BTS photography, no people, no brand logos on equipment, no readable text, pure cinematic silhouette mood",
    }),
  },
  {
    id: "procesos-manuales",
    filename: "procesos-manuales.png",
    aspectRatio: "16:9",
    prompt: buildPrompt({
      concept:
        "editorial still life of manual repetitive office work metaphor, a dark desk with multiple unbranded paper stacks precariously piled, an old mechanical stamp or typewriter silhouette on the side, warm golden desk lamp creating a small pool of light, abstract suggestion of human bottleneck work that should be automated",
      composition:
        "paper stacks dominate lower 60%, lamp pool of light slightly left of center, wide 16:9 framing, dark space above",
      extra:
        "think moody industrial editorial of an office at 2am, no readable text on any paper, no logos, no computer screens, crushed shadows",
    }),
  },
];
