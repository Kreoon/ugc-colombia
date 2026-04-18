# Prompt — Carrusel Instagram (10 slides, 1080x1350, 4:5)

Aplicar cuando Tanya pida: "carrusel IG sobre X", "carrusel educativo", "10 slides de Y", "carrusel para LinkedIn" (mismo formato, adaptar copy).

## Workflow

1. **Detectar pilar** a partir del tema (ver `references/pillars-by-platform.md`).
2. **Elegir hook** de `references/hooks-library.md` segun el pilar.
3. **Redactar 10 slides** siguiendo la anatomia de abajo.
4. **Generar prompts de imagen** por slide con `buildPrompt()` de `scripts/image-gen/brand-system.mjs`.
5. **Proponer** copy del caption + hashtags.
6. **Preguntar** a Tanya si dispara `generate-social.mjs`.

## Anatomia (10 slides)

### Slide 1 — Portada

- **Headline:** promesa en max 6 palabras (Anton 60-80px).
- **Sub:** modificador (Inter 20-24px): "(template incluido)", "(con datos)", "(robalo)", "(parte 1/3)".
- **Fondo:** negro `#000000` + foto BTS con -15% sat + overlay 70%, **o** fondo crema `#F5F5F0` + una palabra en amarillo.
- **Logo:** discreto, top-right, color negro sobre cuadro blanco o version blanca sobre foto oscura.
- **Hook visual:** un elemento que rompe el patron (objeto fuera de contexto, highlight amarillo en una palabra clave).

**Prompt Nanobanana (ejemplo):**
```
scene: editorial magazine cover composition for social carousel, centered bold headline area,
moody documentary photograph of a Latin American creator on set behind the camera in soft rim light,
dark #000000 environmental background with subtle warm amber #F9B334 backlight glow,
deep shadows, matte grain finish, editorial premium feel, leave top 30% and bottom 20% as negative space for typography overlay.
```

### Slide 2 — Contexto / Problema

- Un dato impactante, historia de 2 lineas, o error comun.
- **Copy:** 1 headline (Anton 42-52px) + 2-3 lineas de body (Inter 18-22px).
- **Visual:** elemento grafico simple (numero en amarillo, icono minimalista) o fondo crema con texto.

### Slides 3-8 — Valor (una idea por slide)

Formato por slide:
```
[NUMERO grande en amarillo — Anton 72-96px]
[TITULO CORTO — Anton 36-48px]
[1-2 LINEAS DE EXPLICACION — Inter 18-22px]
[EJEMPLO CONCRETO / DATO — Inter 16-18px en gris claro]
```

Regla: si el slide no aporta algo nuevo, se elimina. Densidad > cantidad.

**Prompt Nanobanana por slide (ejemplo):**
```
scene: minimalist editorial composition for IG carousel slide,
close-up of relevant object in documentary style (e.g. tripod, phone rig, lighting),
dark editorial background gradient from #000000 to #3D3D3C,
warm amber #F9B334 rim light accent on the subject,
crushed shadows, preserved highlights, cinematic grade,
generous empty space on the right 60% for text overlay.
```

### Slide 9 — Resumen / insight meta

- Lista visual de los 6 puntos anteriores, **o**
- Un framework mini-visual que conecta todo, **o**
- La idea "meta" en una frase fuerte.
- Formato: mas texto, menos foto. Crema `#F5F5F0` como fondo puede funcionar bien.

### Slide 10 — Triple CTA

```
1. FOLLOW — "sigueme para mas @agenciaugccolombia"
2. SAVE — "guarda esto antes de tu proxima campana"
3. SHARE — "envialo al founder de tu equipo"
```

- **Background:** negro puro.
- **CTA principal** en amarillo `#F9B334` (ej. "GUARDA ESTE POST").
- **Logo:** version blanca, prominente.

## Caption del post

**Estructura (max 2200 caracteres, pero aim 400-800):**

```
[Hook de 1 linea pre-fold — lo que aparece antes del "Ver mas"]

[2-3 lineas de contexto / promesa concreta]

Lo que vas a aprender:
- Punto 1
- Punto 2
- Punto 3

[Parrafo corto de insight / cierre de la promesa]

Comenta "[PALABRA]" y te mando el [recurso bonus] al DM.

.
.
.
#hashtag1 #hashtag2 #hashtag3
```

## Hashtags

Mix recomendado (5-10 hashtags, nunca 30):

- **Brand:** #UGCColombia #AgenciaUGCColombia
- **Pilar:** #UGCTips (educativo) · #OpinionUGC (debate) · #EstrategiaUGC (estrategico) · #CaseStudyUGC (casos) · #BTSAgencia (bts)
- **Geo:** #Colombia #LATAM #MarketingLatino
- **Nicho:** #Ecommerce #DTC #MetaAds (si aplica al tema)
- **Evitar:** hashtags genericos (#love #life #instagood), hashtags de mas de 1M posts.

## Checklist antes de enviar a Tanya

- [ ] Los 10 slides tienen rol claro (ninguno es relleno).
- [ ] Slide 1 promete + genera curiosidad en 6 palabras.
- [ ] Logo UGC en version correcta segun fondo.
- [ ] Amarillo es `#F9B334` (nunca `#FFD60A`).
- [ ] Fonts: Anton display + Inter body (nunca Fraunces).
- [ ] Proporciones: Negro 60% / Blanco-crema 25% / Amarillo 8%.
- [ ] Slide 10 tiene triple CTA.
- [ ] Caption tiene hook pre-fold + micro-transaccion en el CTA.
- [ ] Hashtags: 5-10, mezcla brand + pilar + geo.

## Salida esperada de Claude

Claude devuelve en el chat:

1. **Pilar detectado** + justificacion (1 linea).
2. **Hook de portada** elegido + por que.
3. **Tabla de 10 slides** con headline, body y nota visual.
4. **10 prompts Nanobanana** (uno por slide) listos para ejecutar.
5. **Caption completo** listo para IG.
6. **Lista de hashtags**.
7. **Comando para generar:** `node .claude/skills/ugc-content-creator/scripts/generate-social.mjs --platform=ig-carousel --concept=<slug>` (o, si Tanya aprueba, se ejecuta directamente).
