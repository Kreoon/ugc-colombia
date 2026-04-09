# Image Generation Prompts — UGC Colombia

> Prompts listos para ejecutar con generate_image.py.
> Paleta: #0A0A0A fondo, #FFD60A acento, #F5F5F0 cream.
> Todos los prompts ya están preprocesados según las Prompt Preprocessing Rules.
> No se incluyó GOOGLE_API_KEY en este entorno — ejecutar cuando esté disponible.

---

## Cómo ejecutar

```bash
# Verificar API key
export GOOGLE_API_KEY="tu-key-aquí"

# Ejecutar cada prompt
python ~/.claude/skills/ads/scripts/generate_image.py \
  "[PROMPT]" \
  --size [WxH] \
  --output [OUTPUT_PATH] \
  --json
```

---

## Image Generation Briefs

---

### Brief 01 — Hero Feed IG (Pain Point Hook)

**Concepto:** Pain Point — fatiga creativa del fundador

**Prompt:**
```
#0A0A0A dark background, #FFD60A accent glow, dark editorial split composition, left half: solitary blinking cursor in empty void on near-black surface, right half: abstract rising data curve silhouette, stark contrast, minimal composition, no text, no labels, no readable words, no UI text, no data labels anywhere in image, primary visual in upper 65%, bottom 30% minimal for copy overlay, editorial boutique documental sistematizado humano atmosphere, no stock photos, no corporate imagery, no bright white backgrounds
```

**Dimensions:** 1080x1350

**Safe zone notes:** Bottom 30% clear for headline overlay

**Output:** `./ad-assets/meta/pain-point-hook/feed-1080x1350-v1.png`
**Output v2:** `./ad-assets/meta/pain-point-hook/feed-1080x1350-v2.png`

---

### Brief 02 — Story IG / TikTok (Behind the Scenes)

**Concepto:** Autenticidad — set real de grabación

**Prompt:**
```
#0A0A0A dark background, #FFD60A accent glow, documentary photography style, interior of a real video production set in Colombia, professional ring light creating warm golden rim light on a minimalist dark background, camera equipment silhouettes, authentic Latin American production atmosphere, warm natural light, medium-high contrast, desaturated shadows, no people visible, no text, no labels, no readable words, no UI text, no data labels anywhere in image, active visual centered in middle 70%, top 15% and bottom 20% minimal, editorial boutique documental atmosphere, no stock photos, no fake studio mockups
```

**Dimensions:** 1080x1920

**Safe zone notes:** Middle 70% active, top 15% and bottom 20% minimal

**Output:** `./ad-assets/meta/behind-the-scenes/story-1080x1920-v1.png`
**Output v2:** `./ad-assets/meta/behind-the-scenes/story-1080x1920-v2.png`

---

### Brief 03 — LinkedIn (Proof/Authority)

**Concepto:** Autoridad — dashboard y resultados

**Prompt:**
```
#0A0A0A dark background, #FFD60A accent glow, dark minimal tech editorial, abstract performance dashboard visualization with anonymous rising chart lines in gold tones, clean geometric data shapes, dark surface with subtle blue-gold glow, professional authority aesthetic, no text, no labels, no readable words, no UI text, no data labels anywhere in image, centered composition with generous 20% margin all sides, editorial sistematizado atmosphere, no stock photos, no generic dashboard screenshots, no colorful infographics
```

**Dimensions:** 1200x628

**Safe zone notes:** Centered composition, 20% margin all sides

**Output:** `./ad-assets/linkedin/authority-proof/post-1200x628-v1.png`
**Output v2:** `./ad-assets/linkedin/authority-proof/post-1200x628-v2.png`

---

### Brief 04 — YouTube Thumbnail (Results Hook)

**Concepto:** Resultado — ROAS impactante

**Prompt:**
```
#0A0A0A dark background, #FFD60A accent glow, dark editorial portrait photography, confident young Colombian creative professional, warm natural side lighting, dark minimal background, authentic expression, editorial magazine style, medium shot framing, subject on left third, right side clean for text overlay, slight warm color grade, no text, no labels, no readable words, no UI text, no data labels anywhere in image, main subject left-center, right 40% clean for copy overlay, editorial boutique humano atmosphere, no stock photo style, no overly bright or cheerful lighting
```

**Dimensions:** 1280x720

**Safe zone notes:** Subject left-center, right 40% clean for YouTube title

**Output:** `./ad-assets/youtube/results-hook/thumbnail-1280x720-v1.png`
**Output v2:** `./ad-assets/youtube/results-hook/thumbnail-1280x720-v2.png`

---

### Brief 05 — TikTok Ad (Diferenciación UGC vs Generic)

**Concepto:** Diferenciación — boutique vs commodity

**Prompt:**
```
#0A0A0A dark background, #FFD60A accent glow, dark editorial abstract split visual, left side: chaotic overlapping generic content silhouettes, blurred and gray, right side: single precise golden frame with clean composition and intentional lighting, stark visual contrast between chaos and precision, minimal abstract forms, no text, no labels, no readable words, no UI text, no data labels anywhere in image, active visual centered in middle 70%, top 15% and bottom 20% minimal, editorial boutique sistematizado atmosphere, no stock photos, no colorful social media aesthetic
```

**Dimensions:** 1080x1920

**Safe zone notes:** Middle 70% active for TikTok

**Output:** `./ad-assets/tiktok/diferenciacion/vertical-1080x1920-v1.png`
**Output v2:** `./ad-assets/tiktok/diferenciacion/vertical-1080x1920-v2.png`

---

### Brief 06 — Meta Feed 1:1 (Equipo / Humano)

**Concepto:** Humanidad — equipo real detrás de la marca

**Prompt:**
```
#0A0A0A dark background, #FFD60A accent glow, documentary portrait photography style, authentic workspace scene in Colombia, warm directional natural light from side window, dark editorial aesthetic, organic professional environment, leather chair and minimal desk visible, warm amber tones in highlights, cool deep shadows, cinematic color grade, no people, focus on empty authentic creative workspace, no text, no labels, no readable words, no UI text, no data labels anywhere in image, primary visual in upper 65%, bottom 30% minimal for copy overlay, editorial boutique humano documental atmosphere, no generic office stock photos
```

**Dimensions:** 1080x1080

**Safe zone notes:** Bottom 30% minimal for Meta feed copy zone

**Output:** `./ad-assets/meta/equipo-humano/feed-1080x1080-v1.png`
**Output v2:** `./ad-assets/meta/equipo-humano/feed-1080x1080-v2.png`

---

### Brief 07 — X Header (Brand Statement)

**Concepto:** Header de Twitter/X — declaración de marca

**Prompt:**
```
#0A0A0A dark background, #FFD60A accent glow, wide cinematic editorial banner, abstract dark landscape with warm golden horizontal light streak across center, deep shadow in upper and lower thirds, minimal texture on dark surface, slight film grain, editorial precision, no text, no labels, no readable words, no UI text, no data labels anywhere in image, focal point left-center, right third lighter for text overlay, editorial boutique sistematizado atmosphere, no stock photography, no generic abstract backgrounds, no vivid colors
```

**Dimensions:** 1500x500

**Safe zone notes:** Left-center focal point, right third lighter for handle/bio visibility

**Output:** `./ad-assets/x/brand-header/header-1500x500-v1.png`
**Output v2:** `./ad-assets/x/brand-header/header-1500x500-v2.png`

---

### Brief 08 — YouTube Banner (Channel Art)

**Concepto:** Banner de canal — presencia premium

**Prompt:**
```
#0A0A0A dark background, #FFD60A accent glow, ultra-wide cinematic dark editorial, minimal dark abstract composition with subtle warm golden center glow fading to pure black edges, fine grid pattern barely visible in dark tones, deep shadow vignette, premium minimal aesthetic, horizontal band of warm golden light at center-bottom third, no text, no labels, no readable words, no UI text, no data labels anywhere in image, centered composition with generous 20% margin all sides, editorial boutique atmosphere, no stock backgrounds, no gradients with vivid colors
```

**Dimensions:** 2560x1440

**Safe zone notes:** Center 1546x423px is the safe zone — keep key visual elements centered

**Output:** `./ad-assets/youtube/channel-banner/banner-2560x1440-v1.png`
**Output v2:** `./ad-assets/youtube/channel-banner/banner-2560x1440-v2.png`

---

## Comando batch para ejecutar todos los briefs

```bash
#!/bin/bash
# Ejecutar desde el directorio de trabajo del proyecto

OUTPUT_BASE="F:/Users/SICOMMER SAS/Documents/GitHub/UGC Colombia/ad-assets"
SCRIPT="~/.claude/skills/ads/scripts/generate_image.py"

# Brief 01 — Pain Point IG Feed
python3 "$SCRIPT" \
  "#0A0A0A dark background, #FFD60A accent glow, dark editorial split composition, left half: solitary blinking cursor in empty void, right half: abstract rising data curve silhouette, stark contrast, no text, no labels, no readable words, no UI text, no data labels anywhere in image, primary visual in upper 65%, bottom 30% minimal for copy overlay, editorial boutique documental atmosphere, no stock photos" \
  --size 1080x1350 \
  --output "$OUTPUT_BASE/meta/pain-point-hook/feed-1080x1350-v1.png" \
  --json

python3 "$SCRIPT" \
  "#0A0A0A dark background, #FFD60A accent glow, dark editorial split composition, left half: solitary blinking cursor in empty void, right half: abstract rising data curve silhouette, stark contrast, no text, no labels, no readable words, no UI text, no data labels anywhere in image, primary visual in upper 65%, bottom 30% minimal for copy overlay, editorial boutique documental atmosphere, no stock photos, alternative composition angle" \
  --size 1080x1350 \
  --output "$OUTPUT_BASE/meta/pain-point-hook/feed-1080x1350-v2.png" \
  --json

# [Repetir para briefs 02–08]
# Ver prompts individuales arriba
```

---

## Estructura de carpetas esperada

```
/ad-assets/
  meta/
    pain-point-hook/
      feed-1080x1350-v1.png
      feed-1080x1350-v2.png
    behind-the-scenes/
      story-1080x1920-v1.png
      story-1080x1920-v2.png
    equipo-humano/
      feed-1080x1080-v1.png
      feed-1080x1080-v2.png
  tiktok/
    diferenciacion/
      vertical-1080x1920-v1.png
      vertical-1080x1920-v2.png
  linkedin/
    authority-proof/
      post-1200x628-v1.png
      post-1200x628-v2.png
  youtube/
    results-hook/
      thumbnail-1280x720-v1.png
      thumbnail-1280x720-v2.png
    channel-banner/
      banner-2560x1440-v1.png
      banner-2560x1440-v2.png
  x/
    brand-header/
      header-1500x500-v1.png
      header-1500x500-v2.png
```

---

_Versión 1.0 — UGC Colombia Brand System_
_Pendiente: configurar GOOGLE_API_KEY y ejecutar generate_image.py_
