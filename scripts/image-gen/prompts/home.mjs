// Prompts para imágenes editoriales del Home de UGC Colombia
// Todas heredan la base de marca (brand-system.mjs)

import { buildPrompt } from "../brand-system.mjs";

export const HOME_PROMPTS = [
  {
    id: "hero",
    filename: "hero.png",
    aspectRatio: "16:9",
    prompt: buildPrompt({
      concept:
        "cinematic wide shot of an authentic latin american UGC video production set at golden hour, a professional ring light creating warm halo on the left side, a tripod silhouette and camera operator hands barely visible adjusting a gimbal, out-of-focus dark studio in the background, single warm golden light source raking across dust particles in the air, behind-the-scenes documentary photography, colombian creative agency aesthetic",
      composition:
        "wide cinematic 16:9 framing, key lighting and equipment occupy left-center, right 40% soft dark negative space for copy overlay, horizon line in upper third",
      extra:
        "inspired by Apple and Aesop cinematic product films, 35mm film grain, anamorphic lens flares, no people faces visible, no branded equipment logos",
    }),
  },
  {
    id: "problema",
    filename: "problema.png",
    aspectRatio: "16:9",
    prompt: buildPrompt({
      concept:
        "moody editorial still life representing creative fatigue in digital marketing, a cluttered dark desk surface at night, dim amber desk lamp casting single warm pool of light, scattered unbranded printed ad storyboard frames crumpled at the edges, a cold coffee mug silhouette, faint golden light bleeding in from upper-right corner, sense of exhaustion and ad fatigue, documentary interior photography",
      composition:
        "desk surface fills lower 70%, dark ambient space above, warm light pool slightly left of center, right third darker for copy",
      extra:
        "think early morning after long night, cinematic mood, no screens visible, no readable text on any paper, no people, no brand names",
    }),
  },
  {
    id: "solucion",
    filename: "solucion.png",
    aspectRatio: "16:9",
    prompt: buildPrompt({
      concept:
        "editorial behind-the-scenes wide shot of an organized premium production workspace, three empty minimalist workstations in a dark studio, each with warm golden desk lamps lit in sequence creating a rhythmic line of light receding into the background, clean matte black desks, subtle brass details, sense of systematized process and craft, latin american boutique studio aesthetic",
      composition:
        "lights receding from foreground-left to background-right in a diagonal, generous dark space above and below, cinematic wide framing",
      extra:
        "think Japanese minimalism meets colombian editorial, no monitors turned on, no visible UI, no people, no corporate stock look",
    }),
  },
  {
    id: "servicios",
    filename: "servicios.png",
    aspectRatio: "4:3",
    prompt: buildPrompt({
      concept:
        "editorial overhead flat-lay of authentic UGC production kit on a dark matte surface, an unbranded phone with black case face-down, a compact ring light ring visible at edge, a small wireless lavalier mic coiled neatly, a single golden coin-sized brass color checker, warm single light source from upper-right creating long directional shadows, tactile premium production gear aesthetic",
      composition:
        "objects arranged in loose triangular composition occupying middle 70%, generous dark border, shadows falling diagonally to lower-left",
      extra:
        "inspired by Monocle magazine product photography, crushed shadow blacks, warm gold highlights, no screens on, no brand logos visible, no readable text",
    }),
  },
];
