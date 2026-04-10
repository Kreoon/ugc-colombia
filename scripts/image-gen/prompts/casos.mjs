// Prompts para los 3 casos de la sección "Casos" en la home.
// Cada caso representa visualmente el nicho sin mostrar marcas reales ni texto.

import { buildPrompt } from "../brand-system.mjs";

export const CASOS_PROMPTS = [
  {
    id: "caso-skincare",
    filename: "caso-skincare.png",
    aspectRatio: "4:3",
    prompt: buildPrompt({
      concept:
        "extreme close-up macro shot of a single unbranded premium amber glass skincare serum dropper bottle on a dark wet stone surface, a single drop of translucent serum suspended mid-fall catching a warm golden rim light, shallow depth of field, water droplets on surface reflecting gold highlights, editorial cosmetic photography for luxury latin american skincare brand",
      composition:
        "product centered slightly left, right 35% clean negative space for copy overlay, primary subject in upper-center, bottom 25% fades to pure black",
      extra:
        "think Aesop or Byredo campaign photography, documentary macro, no product labels visible",
    }),
  },
  {
    id: "caso-moda",
    filename: "caso-moda.png",
    aspectRatio: "4:3",
    prompt: buildPrompt({
      concept:
        "editorial fashion still life, draped unbranded dark linen fabric flowing over a raw concrete plinth, warm golden afternoon light raking across the fabric texture from camera-left, single brass metallic accent detail catching the light, minimal latin american editorial fashion aesthetic, ultra tactile material photography",
      composition:
        "fabric diagonal leading the eye from bottom-left to upper-right, right side darker negative space, subject occupies middle 60%",
      extra:
        "inspired by The Row and Studio Nicholson editorial shoots, documentary texture focus, no mannequins, no models, no clothing tags",
    }),
  },
  {
    id: "caso-saas",
    filename: "caso-saas.png",
    aspectRatio: "4:3",
    prompt: buildPrompt({
      concept:
        "abstract dark architectural visualization representing fintech infrastructure, a single thin golden horizontal light beam cutting across a deep black volumetric space, subtle geometric grid pattern barely visible in shadow tones, one small rising golden particle trail on the right side suggesting growth, minimal brutalist tech aesthetic, long exposure light painting look",
      composition:
        "golden light beam at vertical center, anchor the eye left-of-center, right 40% pure black negative space for copy, ultra wide cinematic framing",
      extra:
        "think Linear or Arc browser launch visuals, editorial minimal tech, no dashboards, no charts, no UI elements, no interface mockups",
    }),
  },
];
