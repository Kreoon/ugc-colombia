# Design Tokens — UGC Colombia

> Fuente canónica en código: [`web/src/app/manual/_data/tokens.ts`](../web/src/app/manual/_data/tokens.ts).
> Este documento es el mirror humano-leíble; cualquier cambio aquí debe reflejarse en `tokens.ts` y viceversa.
>
> **Paleta extraída del Manual de Marca oficial interno** (10 slides originales en `/brand/legacy-deck/`).
> Histórico: durante 2026-Q1 un spec paralelo introdujo `#FFD60A` (amarillo brillante) y `#D4A017` (oro profundo). Ambos se descartan. El amarillo oficial y único es `#F9B334`.

---

## 1. Paleta de colores

### Oficial (slide "Identidad Visual")

| Token          | HEX        | RGB                 | HSL                 | Nombre        | Uso                                  |
|----------------|-----------|---------------------|---------------------|---------------|--------------------------------------|
| `brand-black`  | `#000000` | `rgb(0,0,0)`        | `hsl(0 0% 0%)`      | Negro         | Fondo primario, tipografía principal |
| `brand-gray-dark` | `#3D3D3C` | `rgb(61,61,60)`  | `hsl(60 1% 24%)`    | Gris oscuro   | Tipografía sobre claro, bordes       |
| `brand-gray-light` | `#BDBCBC` | `rgb(189,188,188)` | `hsl(0 1% 74%)` | Gris claro   | Superficies, separadores, muted text |
| `brand-yellow` | `#F9B334` | `rgb(249,179,52)`   | `hsl(36 94% 59%)`   | Amarillo      | Acento + CTA único primario          |
| `brand-cream`  | `#F5F5F0` | `rgb(245,245,240)`  | `hsl(60 17% 95%)`   | Crema boutique| Fondo claro secundario, cards        |
| `brand-white`  | `#FFFFFF` | `rgb(255,255,255)`  | `hsl(0 0% 100%)`    | Blanco        | Tipografía sobre oscuro              |

### Estados

| Token          | HEX        | Uso                         |
|----------------|-----------|------------------------------|
| `yellow-hover` | `#E89F1F` | Hover del CTA amarillo       |
| `yellow-soft`  | `#FFC66B` | Glow amarillo suave          |
| `red`          | `#DC2626` | Alert, urgencia, error       |
| `red-hover`    | `#B91C1C` | Hover alert                  |
| `green`        | `#16A34A` | Éxito, confirmación          |

### Escala de grises (para UI)

```
950 #000000   |  500 #737373
900 #0F0F0F   |  400 #9CA3AF
800 #1F1F1F   |  300 #BDBCBC  (brand-gray-light)
700 #2A2A29   |  200 #D4D4D2
600 #3D3D3C   |  100 #ECECE8
              |   50 #F5F5F0  (brand-cream)
```

---

## 2. Tipografía

### Familias oficiales (slide "Tipografías")

```
font-display = Anton
  Uso: H1, H2, titulares display, números impactantes, CTAs grandes
  Carácter: condensado, alto, sólido. Voz "autoridad disruptiva"
  Google Fonts: Anton (single weight 400, uppercase-friendly)

font-sans    = Inter
  Uso: H3-H6, párrafos, UI, labels, botones pequeños
  Carácter: neutro geométrico, excelente legibilidad pantalla
  Google Fonts: Inter (variable, pesos 400/500/600/700)
```

### Escala modular (base 16px, ratio 1.25 Major Third)

| Token | rem | px | Uso |
|-------|-----|----|----|
| `text-xs` | 0.64 | 10px | Micro-copy, legal |
| `text-sm` | 0.75 | 12px | Captions, metadata |
| `text-base` | 1.00 | 16px | Body text |
| `text-md` | 1.125 | 18px | Lead paragraph |
| `text-lg` | 1.25 | 20px | H5 |
| `text-xl` | 1.5 | 24px | H4 |
| `text-2xl` | 1.875 | 30px | H3 |
| `text-3xl` | 2.25 | 36px | H2 |
| `text-4xl` | 3.0 | 48px | H1 |
| `text-5xl` | 3.75 | 60px | Hero display |
| `text-6xl` | 4.5 | 72px | Portada |
| `text-7xl` | 6.0 | 96px | Statement OOH |

### Pesos

```
400 Regular    — Body, UI
500 Medium     — Labels
600 SemiBold   — Subtítulos
700 Bold       — Headlines sans
(Anton solo existe en 400)
```

---

## 3. Spacing

Base: 4px. Escala Tailwind estándar.

| Token | px | Uso |
|-------|-----|----|
| `space-1` | 4 | Gap mínimo |
| `space-2` | 8 | Padding chips |
| `space-4` | 16 | Padding cards pequeñas |
| `space-6` | 24 | Margen entre bloques |
| `space-8` | 32 | Padding de sección |
| `space-12` | 48 | Hero padding |
| `space-16` | 64 | Separación de módulos |
| `space-24` | 96 | Márgenes de página |
| `space-32` | 128 | Editorial generoso |

---

## 4. Border Radius

Estética editorial → preferir radios pequeños.

```
none  0px    — Cortes editoriales
sm    2px    — Chips micro
base  4px    — Cards compactas, inputs
md    8px    — Cards estándar
lg    12px   — Cards premium
xl    16px   — Hero cards
2xl   24px   — Banners, pills
full  9999px — Badges, avatares
```

---

## 5. Sombras

```
xs        0 1px 2px  rgba(0,0,0,0.40)
sm        0 2px 8px  rgba(0,0,0,0.50)
base      0 4px 16px rgba(0,0,0,0.60)
md        0 8px 24px rgba(0,0,0,0.65)
lg        0 16px 40px rgba(0,0,0,0.70)
xl        0 24px 64px rgba(0,0,0,0.75)
yellow    0 0 24px rgba(249,179,52,0.30)   — glow amarillo
yellow-sm 0 0 8px  rgba(249,179,52,0.18)   — micro-glow hover
inset     inset 0 1px 0 rgba(255,255,255,0.06)
```

---

## 6. Voz de marca (slide "Introducción")

**Tagline oficial:** *Contenido real, resultados reales.*
**Tagline campaña:** *UGC latino con estándar USA.*

**Tonalidad:**
- Profesional, disruptiva y cercana
- Innovadora pero sencilla
- Experta, sin arrogancia
- Auténtica, sin filtros innecesarios

**Tono por canal:**
- Instagram/TikTok: cercano, retador, educativo, inspirador
- LinkedIn: corporativo, aspiracional, centrado en resultados
- YouTube: práctico, directo, formativo

**Voz institucional (slide "Lineamientos"):**
- "Nosotros" cuando se habla desde la agencia
- "Tú" cuando se habla a marcas o creadores

**Normas de redacción:**
- Evitar jerga técnica innecesaria
- Siempre escribir claro, directo y accionable

**Frases core:**
- *Donde los creadores se vuelven pro y las marcas convierten más.*
- *No necesitas fama. Necesitas contenido que venda.*
- *Creamos contenido con humanos, potenciado por IA.*
- *Tu historia, nuestra estrategia, resultados garantizados.*

**Slogans ads/bio (slide "Slogans"):**
- UGC + IA + Live Shopping = ventas reales
- Crea. Factura. Repite.
- Somos la agencia del contenido que vende.
- Deja de pagar por likes. Empieza a pagar por resultados.
- UGC Colombia. Contenido hecho por humanos, diseñado por estrategas.

---

_Versión 2.0 — UGC Colombia Brand System · Reconciliado 2026-04-15_
