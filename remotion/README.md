# UGC Colombia — Remotion Video System

Composiciones programáticas para @agenciaugccolombia.
Stack: Remotion 4.x · TypeScript · ElevenLabs (voz Cristian Sanchez).

---

## Setup

```bash
cd remotion
npm install
npx remotion studio
```

Abre `http://localhost:3000` para previsualizar todas las composiciones.

---

## Composiciones

### 1. LogoReveal — Intro brandeada (3s)

Entrada animada con logo UGC Colombia + tagline. Paleta negro + dorado.

| Composición | Formato | Resolución |
|---|---|---|
| `LogoReveal-Reels` | 9:16 | 1080×1920 |
| `LogoReveal-YouTube` | 16:9 | 1920×1080 |
| `LogoReveal-Square` | 1:1 | 1080×1080 |

**Render:**
```bash
# Reels / TikTok / Shorts
npx remotion render LogoReveal-Reels out/logo-reels.mp4

# YouTube / LinkedIn Header
npx remotion render LogoReveal-YouTube out/logo-youtube.mp4

# Feed cuadrado
npx remotion render LogoReveal-Square out/logo-square.mp4

# Con tagline personalizado
npx remotion render LogoReveal-Reels out/logo-custom.mp4 \
  --props='{"format":"reels","tagline":"UGC que convierte en LATAM.","showTagline":true}'
```

---

### 2. CaseStudyCard — Caso de estudio animado (15s)

Tarjeta con cliente, métrica antes/después, ROAS multiplier y ROI stats.
Formato: 1080×1920 (Reels).

**Props:**
```typescript
{
  client: string,         // "Suplementos Andina"
  industry: string,       // "Suplementos deportivos · DTC Colombia"
  metricBefore: string,   // "1.1x"
  metricAfter: string,    // "4.2x"
  metricLabel: string,    // "ROAS"
  roasMultiplier: string, // "3.8x"
  daysToResult: string,   // "21 días"
  budgetSpent: string,    // "$800"
  revenueGen: string,     // "$12,000"
}
```

**Render:**
```bash
# Con defaults de preview
npx remotion render CaseStudyCard out/case-study.mp4

# Con datos reales
npx remotion render CaseStudyCard out/caso-andina.mp4 \
  --props='{
    "client":"Suplementos Andina",
    "industry":"Suplementos deportivos",
    "metricBefore":"1.1x",
    "metricAfter":"4.2x",
    "metricLabel":"ROAS",
    "roasMultiplier":"3.8x",
    "daysToResult":"21 días",
    "budgetSpent":"$800",
    "revenueGen":"$12,000"
  }'

# Caso de skincare
npx remotion render CaseStudyCard out/caso-skincare.mp4 \
  --props='{
    "client":"Marca Skincare CO",
    "industry":"Skincare · DTC Colombia",
    "metricBefore":"1.2x",
    "metricAfter":"3.4x",
    "metricLabel":"ROAS",
    "roasMultiplier":"2.8x",
    "daysToResult":"60 días",
    "budgetSpent":"$1,200",
    "revenueGen":"$28,000"
  }'
```

---

### 3. QuoteCard — Testimonial premium (8s)

Testimonial card con foto/avatar placeholder, quote, autor, empresa y resultado.
Formato: 1080×1920 (Reels).

**Props:**
```typescript
{
  quote: string,          // texto del testimonial
  authorName: string,     // "Valentina Ríos"
  authorRole: string,     // "Head of Growth"
  company: string,        // "Marca DTC · Skincare Colombia"
  avatarUrl?: string,     // URL foto (opcional — usa iniciales si no se pasa)
  resultStat?: string,    // "3.4x" (opcional)
  resultLabel?: string,   // "ROAS final" (opcional)
  rating?: number,        // 1-5 (default: 5)
}
```

**Render:**
```bash
# Con defaults
npx remotion render QuoteCard out/quote-valentina.mp4

# Con foto y datos personalizados
npx remotion render QuoteCard out/quote-custom.mp4 \
  --props='{
    "quote":"Pasamos de 1.2 a 3.4 de ROAS en dos meses. Solo cambiamos el creativo.",
    "authorName":"Valentina Ríos",
    "authorRole":"Head of Growth",
    "company":"Skincare DTC Colombia",
    "resultStat":"3.4x",
    "resultLabel":"ROAS en 60 días",
    "rating":5
  }'

# Sin result stat (solo testimonial)
npx remotion render QuoteCard out/quote-simple.mp4 \
  --props='{
    "quote":"El UGC de UGC Colombia convierte diferente. Sistema, no suerte.",
    "authorName":"Camilo Herrera",
    "authorRole":"Fundador",
    "company":"E-commerce Colombia",
    "rating":5
  }'
```

---

### 4. StatsReveal — Secuencia de números animados (10s)

Counter animation con múltiples stats en secuencia. Optimizado para LinkedIn.

| Composición | Formato | Uso recomendado |
|---|---|---|
| `StatsReveal-YouTube` | 16:9 | LinkedIn video, YouTube |
| `StatsReveal-Square` | 1:1 | LinkedIn feed, Instagram |
| `StatsReveal-Reels` | 9:16 | TikTok, Reels, Shorts |

**Props:**
```typescript
{
  stats: Array<{
    value: number,      // valor numérico final del counter
    label: string,      // "Clientes activos"
    prefix?: string,    // "$" (opcional)
    suffix?: string,    // "+" o "x" (opcional)
    accent?: boolean,   // resaltar en dorado (default: false)
  }>,
  title?: string,       // Título principal
  subtitle?: string,    // Contexto/subtítulo
  format?: "youtube" | "square" | "reels",
  showProgression?: boolean,  // flechas entre stats (default: true)
}
```

**Render:**
```bash
# Ejemplo: crecimiento de clientes (LinkedIn 16:9)
npx remotion render StatsReveal-YouTube out/stats-clientes-linkedin.mp4 \
  --props='{
    "title":"12 → 35 → 110 clientes",
    "subtitle":"Crecimiento UGC Colombia · 2024–2026",
    "format":"youtube",
    "showProgression":true,
    "stats":[
      {"value":12,"label":"Clientes Q1 2024"},
      {"value":35,"label":"Clientes Q3 2024"},
      {"value":110,"label":"Hoy","suffix":"+","accent":true}
    ]
  }'

# Ejemplo: métricas de resultado (cuadrado)
npx remotion render StatsReveal-Square out/stats-resultados.mp4 \
  --props='{
    "title":"Resultados reales",
    "subtitle":"Promedio de clientes UGC Colombia",
    "format":"square",
    "stats":[
      {"value":800,"label":"Inversión UGC","prefix":"$"},
      {"value":3400,"label":"Revenue generado","prefix":"$","accent":false},
      {"value":425,"label":"ROAS promedio","suffix":"%","accent":true}
    ]
  }'

# Ejemplo: Reels verticales
npx remotion render StatsReveal-Reels out/stats-reels.mp4 \
  --props='{
    "title":"El UGC que convierte",
    "format":"reels",
    "stats":[
      {"value":4200000,"label":"Views orgánicas generadas"},
      {"value":340,"label":"ROAS promedio","suffix":"%","accent":true},
      {"value":21,"label":"Días al primer resultado","suffix":"d"}
    ]
  }'
```

---

### 5. ScriptedReelTemplate — Template de Reel completo con audio (variable)

Template principal que toma un guion del array `reelScripts`, sincroniza overlays
de texto con el audio de ElevenLabs y renderiza el video completo.

Estructura del video:
- `0–3s` : Logo reveal animado
- `3s+`  : Escenas del guion con overlays sincronizados
- Últimos `3s` : CTA card con handle

**Props:**
```typescript
{
  script: ReelScript,       // objeto de src/data/scripts.ts
  audioSrc: string,         // "/audio/g01-voiceover.mp3"
  showCaptions?: boolean,   // mostrar overlays de texto (default: true)
  showHandle?: boolean,     // @handle en esquina (default: true)
  accentColor?: string,     // color de acento (default: según hookType)
}
```

**Flujo de trabajo completo:**

```bash
# Paso 1: Generar voiceover con ElevenLabs
ELEVENLABS_API_KEY=tu_key npx tsx scripts/generate-voiceovers.js --only=1

# Paso 2: Previsualizar en Remotion Studio
npx remotion studio
# Abrir: http://localhost:3000 → seleccionar "Reel-G01-..."

# Paso 3: Renderizar
npx remotion render "Reel-G01-El-problema-con-tu-UGC" out/reels/g01-el-problema.mp4
```

**Render de guiones individuales:**
```bash
# Guion 1 — El problema con tu UGC (60s)
npx remotion render "Reel-G01-El-problema-con-tu-UGC" out/reels/g01.mp4

# Guion 4 — Hot take influencers (30s)
npx remotion render "Reel-G04-Dejen-de-contratar-influen" out/reels/g04.mp4

# Guion 5 — Caso $800 → $12,000 (45s)
npx remotion render "Reel-G05-UGC-de--800-que-gener--" out/reels/g05.mp4

# Guion 6 — ROAS 1.2x → 3.4x (60s)
npx remotion render "Reel-G06-De-1-2x-a-3-4x-ROAS-en-6" out/reels/g06.mp4

# Guion 10 — Presentación UGC Colombia (60s)
npx remotion render "Reel-G10-Qu--hace-diferente-UGC-Col" out/reels/g10.mp4
```

**Renderizar todos los reels:**
```bash
# Generar todos los voiceovers primero
ELEVENLABS_API_KEY=tu_key npx tsx scripts/generate-voiceovers.js

# Renderizar todos (secuencial)
node scripts/render-all.js

# Solo algunos
node scripts/render-all.js --only=1,4,5

# Alta calidad (para entrega)
node scripts/render-all.js --quality=high
```

**Props en render con guion personalizado:**
```bash
# Cambiar solo el audio (mismo guion G1, audio diferente)
npx remotion render "Reel-G01-El-problema-con-tu-UGC" out/g01-v2.mp4 \
  --props='{"audioSrc":"/audio/g01-v2-voiceover.mp3","showCaptions":true}'

# Sin captions (solo audio + hook visual)
npx remotion render "Reel-G01-El-problema-con-tu-UGC" out/g01-sin-captions.mp4 \
  --props='{"audioSrc":"/audio/g01-voiceover.mp3","showCaptions":false}'
```

---

## Workflow ElevenLabs → Remotion

```
1. Editar voiceoverText en src/data/scripts.ts
2. ELEVENLABS_API_KEY=xxx npx tsx scripts/generate-voiceovers.js --only=N
3. Audio se guarda en public/audio/gNN-voiceover.mp3
4. npx remotion studio → previsualizar
5. npx remotion render "Reel-GNN-..." out/reels/gNN.mp4
```

### Voz ElevenLabs
- **Nombre:** Cristian Sanchez
- **Acento:** Paisa colombiano
- **Modelo:** eleven_multilingual_v2
- **Stability:** 0.55 | **Similarity:** 0.80 | **Style:** 0.20

---

## Estructura de archivos

```
remotion/
├── src/
│   ├── Root.tsx                    → Composiciones registradas
│   ├── compositions/
│   │   ├── LogoReveal.tsx          → Intro 3s multi-formato
│   │   ├── CaseStudyCard.tsx       → Caso de estudio 15s
│   │   ├── QuoteCard.tsx           → Testimonial 8s
│   │   ├── StatsReveal.tsx         → Counter animation 10s
│   │   └── ScriptedReelTemplate.tsx → Template Reel completo
│   ├── lib/
│   │   └── tokens.ts               → Design tokens (negro+dorado+crema)
│   └── data/
│       └── scripts.ts              → 10 guiones de lanzamiento
├── public/
│   └── audio/                      → MP3s generados por ElevenLabs
│       ├── g01-voiceover.mp3
│       └── ...
├── scripts/
│   ├── generate-voiceovers.js      → Genera audio con ElevenLabs API
│   └── render-all.js               → Renderiza todos los reels
├── out/
│   └── reels/                      → Videos renderizados
├── package.json
├── remotion.config.ts
└── tsconfig.json
```

---

## Formatos de salida

| Composición | Resolución | Aspect | Plataformas |
|---|---|---|---|
| `*-Reels` | 1080×1920 | 9:16 | Instagram Reels, TikTok, YouTube Shorts |
| `*-YouTube` | 1920×1080 | 16:9 | YouTube, LinkedIn video |
| `*-Square` | 1080×1080 | 1:1 | LinkedIn feed, Instagram feed |

---

## Design Tokens

Los tokens de color, tipografía y espaciado están en `src/lib/tokens.ts`,
derivados del brand kit oficial en `../brand/design-tokens.md`.

| Token | Valor | Uso |
|---|---|---|
| `colors.black` | `#0A0A0A` | Fondo primario |
| `colors.gold` | `#FFD60A` | Acento, CTAs, highlights |
| `colors.cream` | `#F5F5F0` | Fondos secundarios |
| `colors.white` | `#FFFFFF` | Texto sobre negro |
| `fonts.display` | Fraunces, serif | Headlines, quotes |
| `fonts.body` | Inter, sans-serif | UI, subtítulos, labels |

---

## Tips de producción

- **Safe zone:** mantener texto importante a 80px mínimo de los bordes en formato 9:16.
- **Audio sync:** los overlays de texto se calculan desde `scene.startSec` y `scene.endSec` del script. Ajustar en `scripts.ts` si el audio difiere.
- **Re-usar LogoReveal:** usar `<Sequence from={0} durationInFrames={90}>` para encadenarlo antes de cualquier composición.
- **Versionar audio:** guardar los MP3 con sufijo de versión (`g01-v2-voiceover.mp3`) antes de sobreescribir.
- **LinkedIn:** `StatsReveal-YouTube` (16:9) tiene mejor desempeño orgánico en LinkedIn que el formato cuadrado.
