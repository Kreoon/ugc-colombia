// Prompts para la suite de 40 assets del Manual de Marca UGC Colombia v2.
// Organizados por categoría: social, ads, decks, imagery, icons.
// Todos heredan de brand-system.mjs (paleta oficial #F9B334 sobre #000000).

import { buildPrompt } from "../brand-system.mjs";

const SOCIAL = [
  {
    id: "ig-feed-hero",
    filename: "social/ig-feed-hero.png",
    aspectRatio: "4:5",
    prompt: buildPrompt({
      concept:
        "editorial hero composition for Instagram feed, dark boutique studio atmosphere, single amber ring light creating warm rim lighting on a matte dark surface, abstract subject suggesting authentic content creation without showing any person or product, deep negative space in lower third",
      composition:
        "primary visual in upper 65%, bottom 30% clean dark space for headline overlay, centered balance",
      extra: "evokes premium UGC studio precision, documentary editorial mood",
    }),
  },
  {
    id: "ig-feed-split",
    filename: "social/ig-feed-split.png",
    aspectRatio: "4:5",
    prompt: buildPrompt({
      concept:
        "dark editorial split composition for Instagram feed, left half shows chaotic overlapping blurred silhouettes in deep gray suggesting generic content, right half shows one precise amber-lit golden frame with minimal intentional object, stark visual contrast between chaos and precision",
      composition: "50/50 vertical split, middle 70% active, top 15% and bottom 15% minimal",
      extra: "symbolic of boutique vs commodity, no text",
    }),
  },
  {
    id: "ig-feed-quote",
    filename: "social/ig-feed-quote.png",
    aspectRatio: "4:5",
    prompt: buildPrompt({
      concept:
        "minimal dark quote-style Instagram feed visual, single amber horizontal line slicing across a pure black surface with soft film grain, golden glow fading diagonally, one subtle amber geometric accent shape in lower corner",
      composition:
        "center composition with 25% margin, large black negative space for pull-quote overlay",
      extra: "designed as pull-quote template, print editorial feel",
    }),
  },
  {
    id: "ig-story-hook",
    filename: "social/ig-story-hook.png",
    aspectRatio: "9:16",
    prompt: buildPrompt({
      concept:
        "vertical Instagram Story hook composition, tall amber spotlight creating warm glow from top-center fading to deep black at bottom, minimal abstract suggestion of an unseen creator setup, hints of matte studio equipment silhouettes",
      composition: "active middle 70%, top 15% reserved for profile/sticker, bottom 15% for swipe-up",
      extra: "cinematic documentary vertical still",
    }),
  },
  {
    id: "ig-story-behind",
    filename: "social/ig-story-behind.png",
    aspectRatio: "9:16",
    prompt: buildPrompt({
      concept:
        "documentary vertical still from inside an authentic Colombian video production set, professional ring light creating warm amber rim light on minimal dark equipment silhouettes, no people visible, preserve sense of in-progress craft",
      composition: "active center 70%, top 15% and bottom 20% minimal for UI overlays",
      extra: "authentic BTS reportage, no stock photo feel",
    }),
  },
  {
    id: "ig-reel-cover",
    filename: "social/ig-reel-cover.png",
    aspectRatio: "9:16",
    prompt: buildPrompt({
      concept:
        "premium Instagram Reels cover, vertical dark boutique portrait lighting setup without showing a face, amber backlight creating halo silhouette against deep black, subtle golden light beams, cinematic",
      composition: "centered vertical subject zone, title-safe top 20%, CTA-safe bottom 25%",
      extra: "first-frame reel hook energy, no text",
    }),
  },
];

const TIKTOK = [
  {
    id: "tiktok-tutorial",
    filename: "social/tiktok-tutorial.png",
    aspectRatio: "9:16",
    prompt: buildPrompt({
      concept:
        "vertical tiktok cover frame, minimal dark workspace from above, amber desk lamp pool of warm light on a matte black surface, subtle hint of a creator's workflow props (no faces, no brands), deep shadows around edges",
      composition: "active middle 70%, safe zones top 18% and bottom 20%",
      extra: "authentic creator workspace, documentary precision",
    }),
  },
  {
    id: "tiktok-testimonial",
    filename: "social/tiktok-testimonial.png",
    aspectRatio: "9:16",
    prompt: buildPrompt({
      concept:
        "vertical tiktok testimonial-style cover, soft amber rim light on minimal dark background suggesting a documentary interview setup, tall shallow depth of field, sense of pause and honesty",
      composition: "vertical subject centered, safe zones top 18% and bottom 20%",
      extra: "honest testimonial vibe, no faces visible, no product",
    }),
  },
];

const LINKEDIN = [
  {
    id: "linkedin-post",
    filename: "social/linkedin-post.png",
    aspectRatio: "1:1",
    prompt: buildPrompt({
      concept:
        "LinkedIn square B2B post visual, dark minimal tech editorial, abstract rising performance chart lines in amber tones on matte black surface, clean geometric data suggestion without any text or numbers",
      composition: "centered with generous 20% margin on all sides, balanced",
      extra: "professional authority aesthetic, corporate but warm",
    }),
  },
  {
    id: "linkedin-banner",
    filename: "social/linkedin-banner.png",
    aspectRatio: "16:9",
    prompt: buildPrompt({
      concept:
        "LinkedIn profile banner, wide cinematic dark landscape with horizontal amber light streak at center, deep matte black top and bottom thirds, minimal editorial tension, soft film grain",
      composition: "focal at center, left 40% darker for profile-image area overlay, right 60% lighter for handle visibility",
      extra: "executive premium look, no logos or text",
    }),
  },
];

const YOUTUBE = [
  {
    id: "youtube-thumb",
    filename: "social/youtube-thumb.png",
    aspectRatio: "16:9",
    prompt: buildPrompt({
      concept:
        "YouTube 16:9 thumbnail background, dark editorial portrait environment with amber side lighting creating warm rim on the right, authentic content creation studio mood, no face, no text, no logos",
      composition:
        "main visual left-center occupying 55% of frame, right 40% clean dark for bold thumbnail title overlay",
      extra: "magazine editorial style, premium click-worthy but not clickbait",
    }),
  },
  {
    id: "youtube-banner",
    filename: "social/youtube-banner.png",
    aspectRatio: "16:9",
    prompt: buildPrompt({
      concept:
        "ultra-wide YouTube channel banner, minimal dark editorial composition with soft amber center glow fading to pure black at edges, fine grid pattern barely visible in dark tones, deep shadow vignette, horizontal band of warm amber light",
      composition:
        "centered composition with 20% margin all sides, safe zone at center 1546x423px for all devices",
      extra: "premium minimal aesthetic, no logos, no stock backgrounds",
    }),
  },
];

const ADS_META = [
  {
    id: "meta-ad-1x1",
    filename: "ads/meta-1x1.png",
    aspectRatio: "1:1",
    prompt: buildPrompt({
      concept:
        "dark editorial Meta ad 1:1, amber spotlight on a single minimalist object suggesting authentic content creation (unbranded microphone silhouette or camera stand), warm golden highlight, cinematic boutique atmosphere",
      composition: "centered subject in middle 70%, top 15% and bottom 15% minimal for overlay copy",
      extra: "first-frame stopping power, no text",
    }),
  },
  {
    id: "meta-ad-4x5",
    filename: "ads/meta-4x5.png",
    aspectRatio: "4:5",
    prompt: buildPrompt({
      concept:
        "Meta ad feed 4:5, editorial split composition, left half: a solitary blinking cursor concept in empty black void, right half: abstract rising amber curve suggesting revenue growth without labels, stark contrast",
      composition: "primary in upper 65%, bottom 30% clean for headline",
      extra: "pain-point to aspiration visual metaphor, no readable text",
    }),
  },
  {
    id: "meta-ad-9x16",
    filename: "ads/meta-9x16.png",
    aspectRatio: "9:16",
    prompt: buildPrompt({
      concept:
        "vertical Meta story/reel ad, dark cinematic documentary frame of a content creation setup with warm amber ring light halo, minimal silhouettes suggesting authentic production, deep shadow edges",
      composition: "active middle 70%, top and bottom 15% safe zones",
      extra: "thumb-stopping authenticity, no faces, no logos",
    }),
  },
];

const ADS_GOOGLE = [
  {
    id: "google-display-1200x628",
    filename: "ads/google-1200x628.png",
    aspectRatio: "16:9",
    prompt: buildPrompt({
      concept:
        "wide Google display ad 1200x628, dark editorial horizontal banner with amber center glow and minimal abstract geometric accents on left third, clean gradient into deep black on right, no readable numbers",
      composition: "focal point left-third, right 40% clean negative space for copy+CTA",
      extra: "performance banner energy, magazine editorial restraint",
    }),
  },
  {
    id: "google-mrec-300x250",
    filename: "ads/google-300x250.png",
    aspectRatio: "4:5",
    prompt: buildPrompt({
      concept:
        "compact Google mrec 300x250 display ad, dark square-ish format, single amber diagonal accent line slicing across matte black surface, minimal editorial elegance",
      composition: "diagonal accent from lower-left to upper-right, center 70% breathable",
      extra: "small ad high impact, no text, no logos",
    }),
  },
];

const ADS_TIKTOK = [
  {
    id: "tiktok-ad-hook",
    filename: "ads/tiktok-hook.png",
    aspectRatio: "9:16",
    prompt: buildPrompt({
      concept:
        "vertical TikTok ad first-frame hook, cinematic close-up of an unbranded authentic product in warm amber directional light on matte black surface, shallow depth of field, pause-scroll energy",
      composition: "product centered in middle 70%, top 18% and bottom 22% safe",
      extra: "boutique commercial for UGC ads package",
    }),
  },
  {
    id: "tiktok-ad-social-proof",
    filename: "ads/tiktok-social-proof.png",
    aspectRatio: "9:16",
    prompt: buildPrompt({
      concept:
        "vertical tiktok ad frame suggesting social proof without any text or visible ratings, abstract amber stars glow trails on dark textured surface, sense of momentum and trust",
      composition: "central subject in middle 70%, safe zones top 18% and bottom 22%",
      extra: "no readable numbers or stars count, just abstract glow",
    }),
  },
  {
    id: "tiktok-ad-cta",
    filename: "ads/tiktok-cta.png",
    aspectRatio: "9:16",
    prompt: buildPrompt({
      concept:
        "vertical TikTok ad closing frame, single amber spotlight circle in center-bottom third on deep black, minimal clean canvas ready for 'apply now' style CTA, editorial restraint",
      composition: "focal in lower-center 60%, top 40% clean for overlay copy",
      extra: "premium ending frame, no text built-in",
    }),
  },
];

const DECKS = [
  {
    id: "deck-portada",
    filename: "decks/01-portada.png",
    aspectRatio: "16:9",
    prompt: buildPrompt({
      concept:
        "presentation cover slide 16:9, deep black editorial background with one large amber diagonal light ray from upper-right to lower-left, minimal abstract texture, premium boutique opening frame",
      composition: "diagonal composition, left 45% darker for title area, right 55% amber glow",
      extra: "corporate elegance, no text, pitch deck portada for UGC agency",
    }),
  },
  {
    id: "deck-problema",
    filename: "decks/02-problema.png",
    aspectRatio: "16:9",
    prompt: buildPrompt({
      concept:
        "deck slide visualizing the 'problem' section, dark chaotic overlapping gray rectangles suggesting generic content oversaturation, minimal amber accent barely visible as hope spot",
      composition: "layout asymmetric, left 40% text-safe, right 60% chaos visual",
      extra: "subtle symbolism of content fatigue",
    }),
  },
  {
    id: "deck-solucion",
    filename: "decks/03-solucion.png",
    aspectRatio: "16:9",
    prompt: buildPrompt({
      concept:
        "deck slide for 'solution', clean precise amber spotlight illuminating a single minimal geometric frame on matte black, sense of order and intention emerging from darkness",
      composition: "right 55% visual, left 45% dark negative space for bullet copy",
      extra: "represents boutique systematized approach",
    }),
  },
  {
    id: "deck-servicios",
    filename: "decks/04-servicios.png",
    aspectRatio: "16:9",
    prompt: buildPrompt({
      concept:
        "deck slide for services overview, 5 abstract amber geometric icons silhouetted in a horizontal row on matte black surface with warm rim light, each shape distinct minimal tool",
      composition: "5 icon shapes evenly spaced along horizontal center band, clean bottom and top for text",
      extra: "no readable icons, just abstract silhouettes suggesting tools/services",
    }),
  },
  {
    id: "deck-pricing",
    filename: "decks/05-pricing.png",
    aspectRatio: "16:9",
    prompt: buildPrompt({
      concept:
        "deck pricing slide 16:9, three tall minimal amber-outlined rectangular columns on deep black with a center column slightly brighter amber fill suggesting the recommended plan, editorial restraint",
      composition: "three-column symmetric layout with middle column highlighted, top and bottom clean for copy",
      extra: "no readable prices, no text, just structure",
    }),
  },
  {
    id: "deck-cta",
    filename: "decks/06-cta.png",
    aspectRatio: "16:9",
    prompt: buildPrompt({
      concept:
        "deck closing CTA slide, deep black canvas with single amber horizontal line across lower third and a soft amber glow dot on right suggesting a button, minimal and bold",
      composition: "horizontal line at 70% vertical, glow dot lower-right 25% margin, top 60% for statement copy",
      extra: "pitch deck ending, no text, pure composition",
    }),
  },
];

const IMAGERY = [
  {
    id: "imagery-hero-lifestyle",
    filename: "imagery/hero-lifestyle.png",
    aspectRatio: "16:9",
    prompt: buildPrompt({
      concept:
        "hero lifestyle editorial wide shot, interior of a boutique creator studio in Medellín or Bogotá, warm amber afternoon light through large window, matte dark walls, minimal professional camera gear arranged intentionally on wooden table, no people visible, documentary realism",
      composition: "wide symmetric interior, focal on gear composition center-right, window light left",
      extra: "Wes Anderson meets Apple editorial restraint",
    }),
  },
  {
    id: "imagery-bts-estudio",
    filename: "imagery/bts-estudio.png",
    aspectRatio: "3:2",
    prompt: buildPrompt({
      concept:
        "behind-the-scenes documentary frame of an authentic Colombian video production set, professional ring light in foreground (slightly out of focus), dark soft-box silhouettes behind, sense of in-progress craft, no people, no brands",
      composition: "shallow depth, foreground amber ring light dominant, midground dark equipment layers",
      extra: "real production BTS, not staged",
    }),
  },
  {
    id: "imagery-creators-pool",
    filename: "imagery/creators-pool.png",
    aspectRatio: "16:9",
    prompt: buildPrompt({
      concept:
        "editorial grid concept image suggesting a collective of creators without showing faces, amber-lit silhouettes against matte black wall in an authentic production hallway, sense of community and depth",
      composition: "wide horizontal with multiple depth layers, center-right focal, left for overlay copy",
      extra: "no visible faces, suggests network of 30+ creators",
    }),
  },
  {
    id: "imagery-mesa-trabajo",
    filename: "imagery/mesa-trabajo.png",
    aspectRatio: "3:2",
    prompt: buildPrompt({
      concept:
        "top-down editorial still life of a creator workdesk, warm amber pool of light from lamp on matte black wooden surface, minimal props: notebook, pen, small camera, coffee cup, all unbranded, documentary realism",
      composition: "top-down 90° angle, props grouped center, clean negative space on right 35%",
      extra: "Aesop/Kinfolk sensibility, premium craft tools",
    }),
  },
  {
    id: "imagery-equipo-boutique",
    filename: "imagery/equipo-boutique.png",
    aspectRatio: "16:9",
    prompt: buildPrompt({
      concept:
        "editorial image of an empty boutique agency meeting room at golden hour, warm amber light through window, minimal matte dark furniture, sense of intentional small team culture, no people visible",
      composition: "wide interior architectural, window left third, furniture arrangement right two-thirds",
      extra: "represents 5-person boutique team, quiet premium culture",
    }),
  },
  {
    id: "imagery-producto-en-uso",
    filename: "imagery/producto-en-uso.png",
    aspectRatio: "4:5",
    prompt: buildPrompt({
      concept:
        "vertical editorial still of a simple matte ceramic object resting on dark textured surface, warm amber directional light from camera-left, soft shadow spreading to the right, shallow depth of field, museum-quality still life",
      composition: "subject occupies upper 60%, bottom 30% fades into deep shadow for copy overlay",
      extra: "editorial boutique product shot, no people, no visible brand, ceramic or leather material",
    }),
  },
];

const ICONS = [
  {
    id: "icon-strategy",
    filename: "icons/strategy.png",
    aspectRatio: "1:1",
    prompt: buildPrompt({
      concept:
        "minimal line-art icon of a strategy compass, single amber stroke on matte black square background, editorial line-art weight, perfectly symmetric",
      composition: "centered in 30% of square, large black padding around",
      extra: "SVG-ready aesthetic, monoline, no fill except amber stroke",
    }),
  },
  {
    id: "icon-performance",
    filename: "icons/performance.png",
    aspectRatio: "1:1",
    prompt: buildPrompt({
      concept:
        "minimal line-art icon of a performance chart rising, single amber stroke on matte black square, clean editorial",
      composition: "centered icon 30%, generous black padding",
      extra: "monoline, SVG ready",
    }),
  },
  {
    id: "icon-creators",
    filename: "icons/creators.png",
    aspectRatio: "1:1",
    prompt: buildPrompt({
      concept:
        "minimal line-art icon suggesting creators network: three overlapping circles in amber stroke on matte black",
      composition: "centered 30%, black padding",
      extra: "monoline SVG ready",
    }),
  },
  {
    id: "icon-matching",
    filename: "icons/matching.png",
    aspectRatio: "1:1",
    prompt: buildPrompt({
      concept:
        "minimal line-art icon of matching arrows exchanging, amber stroke on matte black",
      composition: "centered 30%, padding",
      extra: "monoline",
    }),
  },
  {
    id: "icon-production",
    filename: "icons/production.png",
    aspectRatio: "1:1",
    prompt: buildPrompt({
      concept: "minimal line-art icon of a film clapperboard, amber stroke on matte black",
      composition: "centered 30%, padding",
      extra: "monoline",
    }),
  },
  {
    id: "icon-ads",
    filename: "icons/ads.png",
    aspectRatio: "1:1",
    prompt: buildPrompt({
      concept:
        "minimal line-art icon of a megaphone, amber stroke on matte black",
      composition: "centered 30%, padding",
      extra: "monoline",
    }),
  },
  {
    id: "icon-platform",
    filename: "icons/platform.png",
    aspectRatio: "1:1",
    prompt: buildPrompt({
      concept:
        "minimal line-art icon representing a proprietary platform: stacked geometric layers, amber stroke on matte black",
      composition: "centered 30%, padding",
      extra: "monoline SVG ready, represents Kreoon platform",
    }),
  },
  {
    id: "icon-quality",
    filename: "icons/quality.png",
    aspectRatio: "1:1",
    prompt: buildPrompt({
      concept:
        "minimal line-art icon of a quality checkmark inside a circle, amber stroke on matte black",
      composition: "centered 30%, padding",
      extra: "monoline SVG ready",
    }),
  },
];

export const MANUAL_ASSETS = [
  ...SOCIAL,
  ...TIKTOK,
  ...LINKEDIN,
  ...YOUTUBE,
  ...ADS_META,
  ...ADS_GOOGLE,
  ...ADS_TIKTOK,
  ...DECKS,
  ...IMAGERY,
  ...ICONS,
];
