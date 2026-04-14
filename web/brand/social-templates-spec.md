# Social Media Templates Spec — UGC Colombia

> Especificaciones técnicas de templates para producción en Canva, Figma o After Effects.
> Sistema: Negro + Dorado + Crema. Arquetipo premium editorial.

---

## Sistema de Zonas Seguras

Todos los templates siguen la regla de **zonas seguras** para evitar cortes en distintos dispositivos:

```
Zona activa (contenido):  inset 5% en todos los lados
Zona de logo:             esquina definida por template
Zona de texto:            nunca en el 10% exterior del canvas
```

---

## 1. Instagram Feed — 1080 × 1350px (4:5)

### Especificación base

```
Canvas:       1080 × 1350px, 72dpi, sRGB
Margen seguro: 54px (5%) en todos los lados
Fondo base:   #0A0A0A
Ratio:        4:5 (óptimo para feed — mayor real estate)
```

### Zonas de composición

```
┌────────────────────────────────────┐  px 0
│  [OVERLINE / TAG]     [LOGO]       │  → fila 54–108px
│                                    │
│                                    │
│        IMAGEN / VISUAL PRINCIPAL   │  → zona 108–810px
│              (65% del canvas)      │
│                                    │
│  ─────────────────────────────     │  → línea dorada separadora
│  [HEADLINE PRINCIPAL]              │  → zona 840–1020px
│  Inter o Fraunces Bold/ExtraBold   │
│                                    │
│  [Subhead o CTA]   [@handle]       │  → fila 1020–1296px
└────────────────────────────────────┘  px 1350
```

### Elementos fijos

| Elemento        | Posición            | Tipografía                    | Color     |
|-----------------|---------------------|-------------------------------|-----------|
| Logo isotipo    | Top right, 54×54px  | —                             | #FFD60A   |
| Overline/tag    | Top left, y=54px    | Inter Medium 500, 11px, caps  | #FFD60A   |
| Headline        | Bottom 30%          | Fraunces ExtraBold, 42–52px   | #FFFFFF   |
| Subhead         | Bajo headline       | Inter Regular, 16px           | #9CA3AF   |
| Handle          | Bottom right        | Inter Medium, 13px            | #737373   |
| Línea separadora| Sobre headline      | 1px, ancho 60%                | #FFD60A   |

### Variantes del template

**Feed 1 — Hero Visual:**
- Visual ocupa 100% del canvas con overlay negro 70%
- Texto centrado, grande
- Ideal: testimonios, stats, claims

**Feed 2 — Split (50/50):**
- Mitad superior: imagen
- Mitad inferior: fondo negro + texto
- Separación: línea dorada de 2px
- Ideal: antes/después, comparativos

**Feed 3 — Solo Texto (Editorial):**
- Fondo negro o cream
- Solo tipografía, sin imágenes
- Headline en Fraunces, grande
- Ideal: frases, datos, microcopy poderoso

**Feed 4 — Carrusel (slides 2–10):**
- Mismo sistema pero con numeración: "01 / 07" en esquina superior derecha
- Arrow indicator en borde derecho
- Último slide: CTA + logo prominente

---

## 2. Instagram Story — 1080 × 1920px (9:16)

### Especificación base

```
Canvas:       1080 × 1920px, 72dpi, sRGB
Margen seguro: 96px (5%) horizontal / 192px (10%) vertical (UI de Instagram)
Fondo base:   #0A0A0A
Ratio:        9:16 vertical
```

### Zonas de composición

```
┌────────────────────────────────────┐  px 0
│  [ZONA UI INSTAGRAM — NO USAR]     │  → 0–192px (top UI: notificaciones)
│  ─────────────────────────────     │
│  [LOGO + HANDLE]                   │  → 192–288px
│                                    │
│                                    │
│        IMAGEN / VISUAL PRINCIPAL   │  → zona 288–1344px
│              (55% del canvas)      │
│              centrada verticalmente│
│                                    │
│  ─────────────────────────────     │
│  [HEADLINE]                        │  → zona 1344–1600px
│  [Subhead / body]                  │
│  [BOTÓN CTA o Swipe Up]            │  → zona 1600–1728px
│                                    │
│  [ZONA UI INSTAGRAM — NO USAR]     │  → 1728–1920px (bottom UI)
└────────────────────────────────────┘  px 1920
```

### Elementos fijos

| Elemento        | Posición              | Tipografía                   | Color   |
|-----------------|-----------------------|------------------------------|---------|
| Logo horizontal | Top center, y=210px   | —                            | #FFD60A + #FFFFFF |
| Headline        | Zona inferior, 48px   | Fraunces ExtraBold           | #FFFFFF |
| CTA button      | y=1640px, centrado    | Inter SemiBold 600, 16px     | fondo #DC2626 |
| Sticker area    | Zona media superior   | — (para elementos nativos IG)| —       |

### Variantes

**Story 1 — Anuncio de servicio:** Visual + copy + botón CTA rojo
**Story 2 — Testimonio:** Quote en Fraunces + nombre de cliente + logo empresa
**Story 3 — Behind the scenes:** Foto full-screen + overlay mínimo + logo pequeño
**Story 4 — Countdown/urgencia:** Timer + oferta + CTA rojo prominente

---

## 3. TikTok — 1080 × 1920px (9:16)

### Especificación base

```
Canvas:       1080 × 1920px, 72dpi, sRGB
Ratio:        9:16 vertical
Margen seguro UI TikTok:
  - Top:    200px (búsqueda + perfil)
  - Bottom: 380px (controles de like/share + caption)
  - Left:   80px (zona activa)
  - Right:  200px (botones de acción verticales)
```

### Zona activa de contenido TikTok

```
┌────────────────────────────────────┐  px 0
│  [UI TIKTOK — NO USAR]             │  → 0–200px
│  ─────────────────────────────     │
│                                    │
│                                    │
│   ZONA ACTIVA DE CONTENIDO         │  → 200–1540px
│   (izquierda hasta px 880)         │
│   Texto, visual principal          │
│                │ [botones TikTok]  │  → 880–1080px
│                                    │
│  ─────────────────────────────     │
│  [UI TIKTOK — CAPTIONS + BOTONES]  │  → 1540–1920px
└────────────────────────────────────┘  px 1920
```

### Para thumbnails de TikTok (cover)

```
Zona del título nativo: franja inferior 400px
Texto del cover debe quedar en: zona 200–1300px
Logo: esquina superior izquierda, x=80px, y=220px
```

### Variantes

**TikTok 1 — Hook visual (primeros 3 segundos):** Texto grande en zona superior, imagen de impacto
**TikTok 2 — Tutorial template:** Numeración de pasos, fondo negro, texto limpio
**TikTok 3 — Stat/claim:** Solo tipografía, animable, sin imágenes complejas

---

## 4. LinkedIn Post — 1200 × 628px (1.91:1)

### Especificación base

```
Canvas:       1200 × 628px, 72dpi, sRGB
Margen seguro: 60px en todos los lados
Fondo base:   #0A0A0A
Ratio:        1.91:1 (landscape, link preview)
```

### Zonas de composición

```
┌────────────────────────────────────────────────┐
│  [OVERLINE]                    [LOGO]          │  → fila 60–100px
│                                                │
│  [HEADLINE — máx 2 líneas]                    │  → zona 100–360px
│  Fraunces Bold 52–64px                        │
│                                                │
│  [SUBHEAD — máx 1 línea]                      │  → zona 360–450px
│  Inter Regular 22px                           │
│                                                │
│  [Stat 1]    [Stat 2]    [Stat 3]             │  → zona 450–568px
│  Dorado / gris                                │
│                                                │
└────────────────────────────────────────────────┘
```

### Variantes

**LinkedIn 1 — Post de pensamiento (thought leadership):** Texto dominante, dato central en dorado
**LinkedIn 2 — Anuncio de logro/cliente:** Logo cliente + claim + número resultado
**LinkedIn 3 — Contenido visual (behind-the-scenes):** Foto ocupa 50% derecho, copy en 50% izquierdo

---

## 5. YouTube Thumbnail — 1280 × 720px (16:9)

### Especificación base

```
Canvas:       1280 × 720px, 72dpi, sRGB
Margen seguro: 64px todos los lados
Fondo base:   variable (foto de impacto o negro)
Ratio:        16:9
Tamaño máx:   2MB (restricción YouTube)
```

### Regla de los tercios para YouTube

```
┌──────────────────────────────────────────────┐
│          │              │                    │
│  SUJETO  │     ZONA     │  TEXTO PRINCIPAL   │
│  (foto)  │   NEUTRA     │  Fraunces Bold     │
│  izq 40% │   centro     │  der 40%           │
│          │              │                    │
│          │              │  [stat o claim]    │
│          │              │  Inter, más pequeño│
└──────────────────────────────────────────────┘
```

### Tipografía de thumbnails

```
Texto principal: Fraunces ExtraBold 900, 72–96px
Color:           #FFFFFF con stroke negro de 3px (legibilidad en cualquier fondo)
Acento:          #FFD60A para la palabra/número más importante
Máx palabras:    5 palabras visibles
```

### Elementos

| Elemento      | Especificación                              |
|---------------|---------------------------------------------|
| Cara/sujeto   | Expresión de alto impacto, recortada         |
| Fondo         | Negro #0A0A0A o foto con crush de sombras   |
| Texto         | Alto contraste, legible en miniatura (44px) |
| Logo          | No incluir — YouTube muestra el avatar      |
| Badge/pill    | Opcional: "CASO REAL", "NUEVO", etc.        |

---

## 6. YouTube Banner — 2560 × 1440px

### Especificación base

```
Canvas:       2560 × 1440px, 72dpi, sRGB
Zona segura (visible en todos los dispositivos): 1546 × 423px centrada
Ratio:        16:9
Tamaño máx:   6MB (restricción YouTube)
```

### Zonas por dispositivo

```
Total canvas:  2560 × 1440px
TV (1400px+):  zona exterior visible
Desktop:       1546 × 423px (zona segura)
Tablet:        centro recortado
Mobile:        1060 × 175px (extremo centro)
```

### Composición (basada en zona segura 1546 × 423px)

```
[LOGO HORIZONTAL]    [TAGLINE]    [CTA / URL]
   izquierda          centro      ugccolombia.co
   dorado             Fraunces    Inter Medium
                      blanco      gris claro
```

### Elementos decorativos (zona exterior — solo visible en TV)
- Patrón de puntos en #1F1F1F (sutil)
- Gradiente de negro a negro (sin cambio visible pero da profundidad)
- No colocar información crítica en la zona exterior

---

## 7. X (Twitter) Header — 1500 × 500px (3:1)

### Especificación base

```
Canvas:       1500 × 500px, 72dpi, sRGB
Zona recortada en móvil: top y bottom 60px (zona segura: 380px de alto central)
Fondo:        #0A0A0A
Ratio:        3:1
```

### Composición

```
┌──────────────────────────────────────────────────────┐
│  [zona recortada en mobile — solo decorativa]        │  0–60px
│  ────────────────────────────────────────────────    │
│                                                      │
│  [HEADLINE / CLAIM]          [LÍNEA DORADA + INFO]   │  60–440px
│  Fraunces ExtraBold          "Agencia UGC boutique"  │
│  64px, izquierda             "ugccolombia.co"        │
│                              Inter Regular 18px      │
│  [Visual de producto/        [Stat 1] [Stat 2]       │
│   creadores — 40% izq]                               │
│                                                      │
│  ────────────────────────────────────────────────    │
│  [zona recortada en mobile — solo decorativa]        │  440–500px
└──────────────────────────────────────────────────────┘
```

---

## Resumen de Dimensiones

| Plataforma          | Dimensiones    | Ratio   | Fondo base  |
|---------------------|----------------|---------|-------------|
| IG Feed             | 1080 × 1350px  | 4:5     | #0A0A0A     |
| IG Story / TikTok   | 1080 × 1920px  | 9:16    | #0A0A0A     |
| LinkedIn Post       | 1200 × 628px   | 1.91:1  | #0A0A0A     |
| YouTube Thumbnail   | 1280 × 720px   | 16:9    | Variable    |
| YouTube Banner      | 2560 × 1440px  | 16:9    | #0A0A0A     |
| X Header            | 1500 × 500px   | 3:1     | #0A0A0A     |

---

## Checklist de calidad para cada template

Antes de publicar cualquier template:

- [ ] Logo correcto (versión y color apropiado para el fondo)
- [ ] Clearspace del logo respetado (mín. 24px)
- [ ] Tipografía: solo Fraunces e Inter
- [ ] Texto en zona segura (sin cortes)
- [ ] Contraste de texto: mínimo 4.5:1
- [ ] No más de 3 colores visibles en la pieza
- [ ] Handle o URL incluido
- [ ] Sin imágenes stock corporativas
- [ ] Revisión en miniatura (50% del tamaño) — ¿se lee bien?

---

_Versión 1.0 — UGC Colombia Brand System_
