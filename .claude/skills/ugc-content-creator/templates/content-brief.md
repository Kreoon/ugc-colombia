# Template — Brief de contenido (JSON para generate-social.mjs)

Cuando la skill va a generar imagenes, escribe primero un brief JSON en `drafts/YYYYMMDD-<slug>-brief.json` con esta estructura. Luego lo pasa al wrapper.

## Estructura minima

```json
{
  "concept": "3-errores-mata-ugc",
  "platform": "ig-carousel",
  "aspectRatio": "4:5",
  "pillar": "educativo",
  "firma": "Tanya",
  "images": [
    {
      "id": "slide-01",
      "filename": "slide-01-portada.png",
      "concept": "editorial magazine cover composition for IG carousel slide 1, minimal hero image of a Colombian creator filming a product demo on a phone rig, dark #000000 environment with warm amber #F9B334 rim light from the right, documentary cinematic quality, matte grain, top 30% and bottom 20% empty for typography overlay",
      "composition": "rule of thirds, subject on left third, negative space on right 2/3",
      "extra": "slight warm cast, preserved highlights"
    },
    {
      "id": "slide-02",
      "filename": "slide-02-problema.png",
      "concept": "minimalist editorial composition with a large amber #F9B334 numeral in the center, cream #F5F5F0 background with subtle paper grain texture, generous negative space around the number"
    }
  ]
}
```

## Campos

| Campo                   | Tipo    | Obligatorio | Descripcion                                                    |
|-------------------------|---------|-------------|----------------------------------------------------------------|
| `concept`               | string  | si          | Slug kebab-case del contenido (usado para nombre de carpeta)   |
| `platform`              | string  | si          | Plataforma objetivo — ver `prompts/*.md` para opciones validas |
| `aspectRatio`           | string  | no          | Override del aspect ratio default de la plataforma             |
| `pillar`                | string  | si          | educativo / debate / estrategico / casos / bts                 |
| `firma`                 | string  | si          | Tanya / Alexander / Brian / Diana / Samuel                     |
| `images`                | array   | si          | Lista de imagenes a generar (una por slide/frame)              |
| `images[].id`           | string  | si          | Identificador unico dentro del batch                            |
| `images[].filename`     | string  | si          | Nombre del archivo output (con extension `.png`)                |
| `images[].concept`      | string  | si          | Descripcion del visual buscado (se pasa a buildPrompt)          |
| `images[].composition`  | string  | no          | Notas de composicion adicionales                                |
| `images[].extra`        | string  | no          | Refuerzos extra (ej. color grade especifico)                    |
| `images[].aspectRatio`  | string  | no          | Override por imagen individual                                  |

## Plataformas validas

- `ig-carousel` (1080x1350, 4:5)
- `ig-feed` (1080x1350, 4:5)
- `ig-square` (1080x1080, 1:1)
- `reel` (1080x1920, 9:16)
- `story` (1080x1920, 9:16)
- `tiktok` (1080x1920, 9:16)
- `youtube-short` (1080x1920, 9:16)
- `youtube-thumb` (1280x720, 16:9)
- `linkedin` (1200x628, 1.91:1)
- `linkedin-pdf` (1080x1350, 4:5 — para slides de carrusel PDF)
- `whatsapp` (1080x1080, 1:1)
- `x-post` (1600x900, 16:9)
- `newsletter` (1200x600, 2:1)

## Reglas de contenido para el campo `concept` (dentro de `images`)

**SI incluir:**
- Descripcion del sujeto y su accion.
- Paleta `#000000`, `#F9B334`, `#F5F5F0` explicita cuando aplica.
- Iluminacion (direccion, intensidad, color temperature).
- Mood: "editorial", "documentary", "boutique", "matte grain".
- Espacio negativo reservado para tipografia overlay.

**NO incluir:**
- Texto, palabras legibles, numeros, logos, watermarks.
- Colores fuera de paleta (especialmente `#FFD60A`).
- Estilo 3D, cartoon, ilustracion, stock photo, corporate.
- Emojis o decoraciones superfluas.

El script ya agrega `BRAND_BASE` y `BRAND_NEGATIVE` automaticamente via `buildPrompt()`. No hay que repetirlos en cada concept.

## Ejemplo completo — Story BTS

```json
{
  "concept": "bts-grabacion-camila-martes",
  "platform": "story",
  "aspectRatio": "9:16",
  "pillar": "bts",
  "firma": "Tanya",
  "images": [
    {
      "id": "frame-01",
      "filename": "frame-01-intro.png",
      "concept": "vertical 9:16 behind the scenes moment of a Colombian creator adjusting a ring light in a small home studio, warm natural afternoon window light filtered through sheer curtains, cream and wood tones in the background, documentary cinematic quality, shallow depth of field, matte grain, top 250px and bottom 350px left empty for handle and sticker overlays"
    },
    {
      "id": "frame-02",
      "filename": "frame-02-detalle.png",
      "concept": "macro close-up of a phone on a tripod framing a product on a textured background, warm amber #F9B334 reflection on the phone screen, dark #000000 environment edges, editorial premium boutique feel"
    },
    {
      "id": "frame-03",
      "filename": "frame-03-cta.png",
      "concept": "cream #F5F5F0 background with a small yellow #F9B334 arrow symbol centered, minimalist editorial composition, ample negative space for overlay text and link sticker at bottom"
    }
  ]
}
```

## Como lo usa la skill

Cuando Claude, via esta skill, prepara la generacion:

1. Redacta el brief en JSON y lo escribe en `drafts/YYYYMMDD-<slug>-brief.json` (ruta permitida).
2. Muestra al usuario el JSON y el comando listo:
   ```
   node .claude/skills/ugc-content-creator/scripts/generate-social.mjs \
     --concept=<slug> --platform=<x> --brief=drafts/YYYYMMDD-<slug>-brief.json
   ```
3. Solo ejecuta si el usuario aprueba.

El output final vive en `web/public/brand/social/YYYYMMDD-<slug>/`. Tanya puede acceder a esos PNGs directamente para armar el contenido final en Canva/CapCut o subirlo con Buffer.
