---
name: ugc-content-creator
description: Genera contenido on-brand para redes sociales de UGC Colombia (carruseles IG, reels, stories, posts LinkedIn, shorts, thumbnails YouTube, broadcasts WhatsApp) combinando los 5 pilares de viralidad + brand guidelines + prompts de Nanobanana listos para ejecutar. Usar siempre que Tanya (community manager) o alguien del equipo pida producir piezas para IG, TikTok, LinkedIn, YouTube o WhatsApp Business.
model: claude-sonnet-4-5
allowed-tools:
  - Read
  - Glob
  - Grep
  - Write
  - Bash
---

# UGC Content Creator

Skill operativa para el equipo de contenido de UGC Colombia. Tanya es la usuaria principal, pero cualquier miembro puede invocarla. Convierte una peticion en lenguaje natural en: pilar + hook + copy + prompts Nanobanana + comando de generacion, respetando branding y estrategia viral.

## Cuando activarse

Se activa cuando el mensaje del usuario incluye alguno de estos patrones:

- "carrusel", "carrusel IG", "carrusel LinkedIn", "10 slides"
- "reel", "tiktok", "short", "video vertical"
- "story", "stories", "frames de story"
- "post LinkedIn", "articulo LinkedIn"
- "thumbnail YouTube", "miniatura de [video]"
- "broadcast WhatsApp", "mensaje para creadores"
- Peticiones de contenido en general para las plataformas soportadas

Si no encaja ninguno, preguntar a la persona cual es el formato objetivo antes de asumir.

## Workflow de 5 pasos

Para cualquier pieza de contenido, seguir este orden:

1. **Detectar formato + pilar.** Usar `references/pillars-by-platform.md` para validar que el pilar elegido encaja con la plataforma (p.ej. Stories = 60% BTS por default).
2. **Elegir hook.** Buscar en `references/hooks-library.md` el hook por pilar que mejor encaje con el tema. Adaptar las variables `[X]`, `[marca]`, etc.
3. **Redactar estructura + copy.** Cargar el prompt correspondiente de `prompts/` (carousel-ig, reel-tiktok, story-ig, linkedin-post, youtube-thumbnail, whatsapp-broadcast).
4. **Generar prompts Nanobanana** por cada imagen necesaria. Usar como base `scripts/image-gen/brand-system.mjs` — su helper `buildPrompt()` y su `BRAND_BASE`/`BRAND_NEGATIVE` son obligatorios para consistencia.
5. **Proponer ejecucion.** Mostrar el comando listo:
   `node .claude/skills/ugc-content-creator/scripts/generate-social.mjs --concept=<slug> --platform=<plataforma> --brief=<path_al_brief.json>`
   Preguntar antes de ejecutar.

## Progressive disclosure — que leer segun el caso

NO leer todo `references/` siempre. Solo lo que aplica:

| Peticion                              | Archivos a cargar                                              |
|---------------------------------------|-----------------------------------------------------------------|
| Carrusel IG                           | `prompts/carousel-ig.md` + `references/brand-visual.md` + `references/hooks-library.md` (seccion del pilar) + `references/format-specs.md` |
| Reel / TikTok / YouTube Short         | `prompts/reel-tiktok.md` + `references/viral-anatomy.md` + `references/hooks-library.md` + `references/format-specs.md` |
| Story IG                              | `prompts/story-ig.md` + `references/format-specs.md`            |
| Post LinkedIn                         | `prompts/linkedin-post.md` + `references/brand-voice.md`        |
| Thumbnail YouTube                     | `prompts/youtube-thumbnail.md` + `references/format-specs.md`   |
| Broadcast WhatsApp                    | `prompts/whatsapp-broadcast.md`                                 |
| Planificacion semanal / mix check     | `references/pillars-by-platform.md`                             |
| Voz correcta por pilar                | `references/brand-voice.md`                                     |

Si el usuario pide algo fuera de esa tabla, preguntar antes de cargar archivos.

## Reglas duras (NO negociables)

1. **Amarillo oficial es `#F9B334`.** NUNCA `#FFD60A`. Si detectas `#FFD60A` en un prompt o texto, corregir automaticamente y avisar.
2. **Tipografia oficial: Anton (display) + Inter (sans).** NUNCA Fraunces, GT Super ni serif editorial. Si un doc antiguo los menciona, usar Anton/Inter.
3. **Logo:** negro sobre cuadro blanco/crema solo. Blanco sobre fondos oscuros o fotos. Clearspace minimo 24px.
4. **Captions en video son obligatorios** — blanco con stroke negro, o negro con fondo amarillo `#F9B334`, max 4 palabras por linea, sincronizados palabra por palabra.
5. **Loop perfecto** en todo video corto: ultimo frame conecta con el primero.
6. **Mix por plataforma:** respetar la tabla de `references/pillars-by-platform.md`. Si el mix se rompe, notificar.
7. **Sin stock photos.** Todo visual es BTS real o generado con Nanobanana siguiendo `BRAND_BASE`.
8. **Sin jerga influencer generica** ("hola familia", "te va a encantar"). Ver DO/DON'T en `references/brand-voice.md`.
9. **No atacar competidores por nombre.** Criticar practicas, no personas.
10. **No usar IA para la voz principal de Alexander.** El contenido donde Alexander es el rostro lo graba el real.

## Voz por persona (quien firma que)

Antes de redactar, validar que la voz encaja con la firma:

- **Tanya:** Educativo (30%), BTS (25%), Debate ligero (20%), Casos (15%), Estrategico (10%). Voz "amiga que sabe". Formatos cortos y diarios.
- **Alexander:** Estrategico, Debate fuerte, thought leadership. LinkedIn personal, YouTube Long, X. No delegar su voz a otros.
- **Brian:** Operaciones, sistemas, gestion, build-in-public. LinkedIn personal, X, YouTube.
- **Diana:** Educativo operativo, QA de creadores, casos. IG, LinkedIn empresa.
- **Samuel:** Demos tecnicas, IA, Kreoon. YouTube, LinkedIn empresa, X.

Si Tanya pide contenido que deberia ir firmado por otro, notificar: *"Este tema suena para la voz de [X]. ¿Quieres que lo adapte para tu voz o lo dejo como draft para [X]?"*.

## Pipeline end-to-end (NUEVO — 2026-04-17)

Para entregar contenido 100% terminado (imágenes + overlay + logo + caption + calendar entry), usar el orquestador `scripts/ship-content.mjs` que encadena 6 etapas:

```
node scripts/ship-content.mjs --brief=drafts/YYYYMMDD-<slug>-brief.json
```

Etapas del pipeline:

| # | Etapa | Script / Agente | Output |
|---|---|---|---|
| 1 | Generar PNGs base | `generate-social.mjs` (Nanobanana) | `slide-XX.png` + `manifest.json` |
| 2 | Visual QA | sub-agente `ugc-visual-qa` | `qa-report.json` |
| **2.5** | **Layout analysis (image-aware)** | **sub-agente `ugc-layout-architect`** | **`layout-plan.json`** |
| 3 | Copy overlay | sub-agente `ugc-copy-overlay` | `overlay-copy.json` |
| 4 | Compose overlay + logo | `compose-overlay.mjs` (sharp + resvg-js) | `slide-XX-final.png` + `raw/` |
| 5 | Caption + hashtags | sub-agente `ugc-caption-writer` | `caption.md` |
| 6 | Calendar entry | sub-agente `ugc-calendar-publisher` | `content/calendar/YYYY-MM/...md` |

El orquestador pausa entre etapas que requieren IA (2, 2.5, 3, 5, 6) para que el agente correspondiente corra. Reanudas con `--from=N`.

### Sub-agentes (en `.claude/agents/`)

- `ugc-visual-qa` — valida brand compliance de PNGs con Claude vision
- `ugc-layout-architect` — **NUEVO.** Analiza cada imagen (luminancia, sujeto, zonas limpias, color dominante) y decide por slide: posición, color del texto, sombra/glow/scrim, tamaños autosize, ubicación del logo. Emite `layout-plan.json` que consume el compositor
- `ugc-copy-overlay` — redacta headlines/body por slide respetando safe zones del layout-plan
- `ugc-caption-writer` — caption IG + hashtags mix 5+10+5 en voz de la firma
- `ugc-calendar-publisher` — agenda en calendario editorial según cadencia

### Por qué el layout analysis es crítico

Sin este agente, el compositor aplicaba una plantilla ciega sobre las imágenes y podía (a) tapar al sujeto principal, (b) poner texto blanco sobre zonas claras donde no se lee, (c) poner eyebrow amber sobre luz amber de la imagen (cero contraste), (d) usar tamaño de headline que no cabe.

Con `ugc-layout-architect` el compositor recibe instrucciones específicas para cada PNG: sombra blur 18 en slide-01 porque hay ring light brillante, scrim transparent-to-dark en la base para separar el texto del piso texturizado, glow amber en la CTA final para dar peso editorial, etc. Cada slide se compone con intención editorial, no con template.

### Wrapper de generación base (etapa 1 sola)

Si solo necesitas imágenes sin el pipeline completo:

```
node .claude/skills/ugc-content-creator/scripts/generate-social.mjs \
  --concept=<slug-kebab-case> \
  --platform=<ig-carousel|reel|story|linkedin|youtube-thumb|whatsapp> \
  --brief=<ruta-al-brief-json>
```

### Compositor de overlay + logo (etapa 4 sola)

Si ya tienes PNGs base y `overlay-copy.json`:

```
node scripts/image-gen/compose-overlay.mjs --dir=web/public/brand/social/<folder>
```

Aplica overlay tipográfico (Anton + Inter desde `scripts/image-gen/fonts/*.woff2`) y logo oficial (`web/public/brand/logos/v2/*`) según reglas de `brand/logo-specs.md`.

**Requisitos:**
- `GEMINI_API_KEY` en `web/.env.local` (cada miembro tiene su propia key).
- `npm install` dentro de `scripts/image-gen/` (dependencias: `@google/genai`, `sharp`, `@resvg/resvg-js`, `@fontsource/anton`, `@fontsource/inter`).

## Formato de salida al usuario

Cuando Claude entrega el resultado al usuario, estructurarlo asi:

```
## [Pieza solicitada] — [Pilar detectado] en [Plataforma]

### 1. Pilar + firma
- Pilar: [X] (porcentaje del mix de Tanya: Y%)
- Firma: [Tanya / Alexander / Brian / Diana / Samuel]
- Por que: [1 linea de justificacion]

### 2. Hook elegido
"[Hook exacto]"
Tipo: [educativo/debate/etc] · Formula #[N] del hooks-library

### 3. Estructura / Guion / Slides
[Detalle segun el formato — tabla de slides, timing de video, frames de story, etc]

### 4. Copy final
[Caption + hashtags + CTA listos para copiar y pegar]

### 5. Prompts Nanobanana
[Uno por imagen, numerados]

### 6. Brief JSON sugerido
[Path: drafts/YYYYMMDD-<slug>-brief.json]
\`\`\`json
{ ... }
\`\`\`

### 7. Comando de generacion
node .claude/skills/ugc-content-creator/scripts/generate-social.mjs --concept=<slug> --platform=<x> --brief=drafts/YYYYMMDD-<slug>-brief.json

¿Lo ejecuto?
```

## Errores comunes a evitar

- **Asumir plataforma sin preguntar** si es ambiguo.
- **Redactar copy con jerga influencer** aunque el pilar sea BTS.
- **Usar `#FFD60A` por inercia** (viene del JSON viejo).
- **Olvidar los captions** en videos.
- **Proponer carrusel de 15 slides** (max 10).
- **Hashtag stuffing** en LinkedIn (max 5).
- **Firmar con Tanya** un debate estrategico que deberia ser de Alexander.
- **Generar antes de confirmar** — siempre proponer, esperar "si".

## Referencias cruzadas

- `references/brand-visual.md` — paleta, fonts, logo, estilo de imagen.
- `references/brand-voice.md` — voz por pilar, voz de Tanya, taglines.
- `references/viral-anatomy.md` — 7 reglas de video + carrusel + YouTube long.
- `references/pillars-by-platform.md` — mix % y cadencia.
- `references/hooks-library.md` — 50 hooks por pilar + 20 ideas always-on.
- `references/format-specs.md` — dimensiones, zonas seguras, aspect ratios.
- `prompts/*.md` — guias operativas por formato.
- `templates/content-brief.md` — template para el brief JSON.
- `scripts/generate-social.mjs` — wrapper de Nanobanana.
- `scripts/validate-spec.mjs` — validador de dimensiones post-generacion.

Fuentes externas (no duplicar — solo referenciar):

- `scripts/image-gen/brand-system.mjs` — BRAND_BASE, BRAND_NEGATIVE, buildPrompt, BRAND_COLORS, BRAND_FONTS.
- `scripts/image-gen/generate.mjs` — orquestador original (no modificar).
- `content/viralidad/00-modelo-maestro-viralidad.md` — fuente de verdad de viralidad.
- `content/sistemas/marca/brand-profile.json` — valores, avatares, servicios.
- `brand/design-tokens.md` — paleta y tipografia oficial (reconciliado 2026-04-15).
- `04-PACK-TANYA-COMMUNITY.md` — pack operativo de Tanya.
