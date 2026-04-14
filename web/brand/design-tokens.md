# Design Tokens — UGC Colombia

> Fuente de verdad visual. Compatible con Tailwind CSS v3/v4 y CSS custom properties.
> Paleta: Negro editorial + Dorado Colombia + Crema boutique.

---

## 1. Color Tokens

### Paleta principal

| Token              | Nombre          | HEX       | HSL                  | RGB               | Uso                          |
|--------------------|-----------------|-----------|----------------------|-------------------|------------------------------|
| `color-black`      | Black Editorial | `#0A0A0A` | `hsl(0 0% 4%)`       | `rgb(10,10,10)`   | Fondos primarios, tipografía |
| `color-gold`       | Gold Colombia   | `#FFD60A` | `hsl(49 100% 52%)`   | `rgb(255,214,10)` | Acento, CTAs, highlights     |
| `color-cream`      | Cream Boutique  | `#F5F5F0` | `hsl(60 17% 95%)`    | `rgb(245,245,240)`| Fondos secundarios, tarjetas |
| `color-ink`        | Ink             | `#1A1A1A` | `hsl(0 0% 10%)`      | `rgb(26,26,26)`   | Texto corrido, párrafos      |
| `color-red`        | Alert Red       | `#DC2626` | `hsl(0 72% 51%)`     | `rgb(220,38,38)`  | CTA urgente, alertas, badges |

### Escala de grises (neutros)

| Token              | HEX       | HSL               | Uso                             |
|--------------------|-----------|-------------------|---------------------------------|
| `color-gray-950`   | `#0A0A0A` | `hsl(0 0% 4%)`    | = color-black                   |
| `color-gray-900`   | `#111111` | `hsl(0 0% 7%)`    | Secciones oscuras               |
| `color-gray-800`   | `#1F1F1F` | `hsl(0 0% 12%)`   | Cards sobre negro               |
| `color-gray-700`   | `#333333` | `hsl(0 0% 20%)`   | Bordes en modo oscuro           |
| `color-gray-600`   | `#4D4D4D` | `hsl(0 0% 30%)`   | Texto secundario sobre negro    |
| `color-gray-500`   | `#737373` | `hsl(0 0% 45%)`   | Placeholders, disabled          |
| `color-gray-400`   | `#9CA3AF` | `hsl(220 9% 65%)` | Metadata, timestamps            |
| `color-gray-200`   | `#E5E5E5` | `hsl(0 0% 90%)`   | Bordes en modo claro            |
| `color-gray-100`   | `#F0F0EB` | `hsl(60 14% 93%)` | Hover sobre crema               |
| `color-white`      | `#FFFFFF` | `hsl(0 0% 100%)`  | Texto sobre negro, íconos       |

### Semánticos (aliases)

```
color-bg-primary      = color-black       (#0A0A0A)
color-bg-secondary    = color-gray-900    (#111111)
color-bg-surface      = color-gray-800    (#1F1F1F)
color-bg-light        = color-cream       (#F5F5F0)
color-text-primary    = color-white       (#FFFFFF)  — sobre fondos oscuros
color-text-body       = color-ink         (#1A1A1A)  — sobre fondos claros
color-text-muted      = color-gray-500    (#737373)
color-accent          = color-gold        (#FFD60A)
color-accent-hover    = #E6C000           — gold oscurecido 10%
color-cta             = color-red         (#DC2626)
color-cta-hover       = #B91C1C           — red oscurecido
color-border          = color-gray-700    (#333333)  — sobre negro
color-border-light    = color-gray-200    (#E5E5E5)  — sobre crema
```

---

## 2. Typography Scale

### Familias

```
font-display   = "Fraunces", "GT Super", Georgia, serif
               — Uso: H1, H2, quotes, hero headlines, editorial pull-quotes
               — Google Fonts: Fraunces (variable, wght 100-900, ital)
               — CDN: https://fonts.google.com/specimen/Fraunces

font-body      = "Inter", "Geist", -apple-system, sans-serif
               — Uso: H3-H6, párrafos, UI, botones, labels
               — Google Fonts: Inter (variable)
```

### Escala modular (base 16px, ratio 1.25 — Major Third)

| Token            | rem    | px   | Uso canónico                         |
|------------------|--------|------|--------------------------------------|
| `text-xs`        | 0.64   | 10px | Legal, micro-copy                    |
| `text-sm`        | 0.75   | 12px | Captions, metadata, labels           |
| `text-base`      | 1.00   | 16px | Body text estándar                   |
| `text-md`        | 1.125  | 18px | Lead paragraph, intro texto          |
| `text-lg`        | 1.25   | 20px | H5, subtítulos de sección            |
| `text-xl`        | 1.5    | 24px | H4, card headlines                   |
| `text-2xl`       | 1.875  | 30px | H3, subheadlines de módulo           |
| `text-3xl`       | 2.25   | 36px | H2, section titles                   |
| `text-4xl`       | 3.0    | 48px | H1, page headers                     |
| `text-5xl`       | 3.75   | 60px | Hero displays                        |
| `text-6xl`       | 4.5    | 72px | Hero grandes, portadas               |
| `text-7xl`       | 6.0    | 96px | Statement displays, OOH              |

### Pesos tipográficos

```
font-light     = 300   — Display decorativo, quotes estilizadas
font-regular   = 400   — Body text, párrafos
font-medium    = 500   — UI labels, navegación
font-semibold  = 600   — Subtítulos, card heads
font-bold      = 700   — Headlines H2-H3
font-extrabold = 800   — H1, hero copy
font-black     = 900   — Display statements, claims
```

### Line heights

```
leading-tight    = 1.1   — Headlines display grandes
leading-snug     = 1.25  — H1, H2
leading-normal   = 1.5   — Body text estándar
leading-relaxed  = 1.625 — Long-form, artículos
leading-loose    = 2.0   — Listas espaciadas, legal
```

### Letter spacing

```
tracking-tighter = -0.05em  — Display serif, titulares grandes
tracking-tight   = -0.025em — H1, H2 display
tracking-normal  = 0em      — Body sans
tracking-wide    = 0.05em   — Labels, caps
tracking-wider   = 0.1em    — Overlines, tags ALL CAPS
tracking-widest  = 0.2em    — Monogramas, badges premium
```

---

## 3. Spacing Scale

Base: 4px (0.25rem). Escala Tailwind estándar extendida.

| Token     | rem     | px    | Uso típico                       |
|-----------|---------|-------|----------------------------------|
| `space-0` | 0       | 0px   |                                  |
| `space-1` | 0.25rem | 4px   | Gap mínimo, padding inline       |
| `space-2` | 0.5rem  | 8px   | Padding interno chips/badges     |
| `space-3` | 0.75rem | 12px  | Gap entre elementos inline       |
| `space-4` | 1rem    | 16px  | Padding interno cards pequeñas   |
| `space-5` | 1.25rem | 20px  | Gap entre elementos de lista     |
| `space-6` | 1.5rem  | 24px  | Margen entre secciones menores   |
| `space-8` | 2rem    | 32px  | Padding de secciones             |
| `space-10`| 2.5rem  | 40px  | Margen entre bloques de contenido|
| `space-12`| 3rem    | 48px  | Padding de hero sections         |
| `space-16`| 4rem    | 64px  | Separación de módulos principales|
| `space-20`| 5rem    | 80px  | Secciones grandes                |
| `space-24`| 6rem    | 96px  | Márgenes de página               |
| `space-32`| 8rem    | 128px | Espaciado editorial generoso     |
| `space-40`| 10rem   | 160px | Secciones hero fullscreen        |
| `space-48`| 12rem   | 192px | Espaciado de landing premium     |

---

## 4. Border Radius

```
radius-none   = 0px      — Elementos editoriales, cortes duros
radius-sm     = 2px      — Micro-elementos, chips
radius-base   = 4px      — Cards compactas, inputs
radius-md     = 8px      — Cards estándar
radius-lg     = 12px     — Cards premium, modales
radius-xl     = 16px     — Hero cards, highlights
radius-2xl    = 24px     — Pills grandes, banners
radius-full   = 9999px   — Badges, avatares, tags pill
```

Nota de identidad: UGC Colombia usa preferentemente `radius-none` y `radius-sm` para reforzar la estética editorial/angular. Los radios grandes se reservan para elementos de UI funcionales (formularios, avatares).

---

## 5. Shadows

```
shadow-none     = none
shadow-xs       = 0 1px 2px rgba(0,0,0,0.40)
shadow-sm       = 0 2px 8px rgba(0,0,0,0.50)
shadow-base     = 0 4px 16px rgba(0,0,0,0.60)
shadow-md       = 0 8px 24px rgba(0,0,0,0.65)
shadow-lg       = 0 16px 40px rgba(0,0,0,0.70)
shadow-xl       = 0 24px 64px rgba(0,0,0,0.75)
shadow-gold     = 0 0 24px rgba(255,214,10,0.25)   — glow premium en acento
shadow-gold-sm  = 0 0 8px rgba(255,214,10,0.15)    — micro-glow para hover
shadow-inset    = inset 0 1px 0 rgba(255,255,255,0.06) — separadores sutiles
```

---

## 6. Tailwind Config (tailwind.config.js)

```js
const { fontFamily } = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        black:    '#0A0A0A',
        gold:     '#FFD60A',
        cream:    '#F5F5F0',
        ink:      '#1A1A1A',
        red:      '#DC2626',
        gray: {
          950: '#0A0A0A',
          900: '#111111',
          800: '#1F1F1F',
          700: '#333333',
          600: '#4D4D4D',
          500: '#737373',
          400: '#9CA3AF',
          200: '#E5E5E5',
          100: '#F0F0EB',
        },
      },
      fontFamily: {
        display: ['Fraunces', 'GT Super', 'Georgia', ...fontFamily.serif],
        body:    ['Inter', 'Geist', ...fontFamily.sans],
      },
      fontSize: {
        'xs':   ['0.64rem',  { lineHeight: '1.5' }],
        'sm':   ['0.75rem',  { lineHeight: '1.5' }],
        'base': ['1rem',     { lineHeight: '1.5' }],
        'md':   ['1.125rem', { lineHeight: '1.625' }],
        'lg':   ['1.25rem',  { lineHeight: '1.375' }],
        'xl':   ['1.5rem',   { lineHeight: '1.3' }],
        '2xl':  ['1.875rem', { lineHeight: '1.25' }],
        '3xl':  ['2.25rem',  { lineHeight: '1.2' }],
        '4xl':  ['3rem',     { lineHeight: '1.1' }],
        '5xl':  ['3.75rem',  { lineHeight: '1.05' }],
        '6xl':  ['4.5rem',   { lineHeight: '1.0' }],
        '7xl':  ['6rem',     { lineHeight: '0.95' }],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '26': '6.5rem',
        '30': '7.5rem',
      },
      borderRadius: {
        'none': '0px',
        'sm':   '2px',
        'base': '4px',
        'md':   '8px',
        'lg':   '12px',
        'xl':   '16px',
        '2xl':  '24px',
        'full': '9999px',
      },
      boxShadow: {
        'xs':      '0 1px 2px rgba(0,0,0,0.40)',
        'sm':      '0 2px 8px rgba(0,0,0,0.50)',
        'base':    '0 4px 16px rgba(0,0,0,0.60)',
        'md':      '0 8px 24px rgba(0,0,0,0.65)',
        'lg':      '0 16px 40px rgba(0,0,0,0.70)',
        'xl':      '0 24px 64px rgba(0,0,0,0.75)',
        'gold':    '0 0 24px rgba(255,214,10,0.25)',
        'gold-sm': '0 0 8px rgba(255,214,10,0.15)',
        'inset':   'inset 0 1px 0 rgba(255,255,255,0.06)',
      },
    },
  },
  plugins: [],
}
```

---

## 7. CSS Custom Properties (variables globales)

```css
:root {
  /* Colors */
  --color-black:    #0A0A0A;
  --color-gold:     #FFD60A;
  --color-cream:    #F5F5F0;
  --color-ink:      #1A1A1A;
  --color-red:      #DC2626;

  /* Gray scale */
  --color-gray-950: #0A0A0A;
  --color-gray-900: #111111;
  --color-gray-800: #1F1F1F;
  --color-gray-700: #333333;
  --color-gray-600: #4D4D4D;
  --color-gray-500: #737373;
  --color-gray-400: #9CA3AF;
  --color-gray-200: #E5E5E5;
  --color-gray-100: #F0F0EB;
  --color-white:    #FFFFFF;

  /* Semantic */
  --bg-primary:     var(--color-black);
  --bg-secondary:   var(--color-gray-900);
  --bg-surface:     var(--color-gray-800);
  --bg-light:       var(--color-cream);
  --text-on-dark:   var(--color-white);
  --text-on-light:  var(--color-ink);
  --text-muted:     var(--color-gray-500);
  --accent:         var(--color-gold);
  --accent-hover:   #E6C000;
  --cta:            var(--color-red);
  --border-dark:    var(--color-gray-700);
  --border-light:   var(--color-gray-200);

  /* Typography */
  --font-display: 'Fraunces', 'GT Super', Georgia, serif;
  --font-body:    'Inter', 'Geist', -apple-system, sans-serif;

  /* Spacing base */
  --space-unit: 4px;

  /* Radius */
  --radius-none: 0px;
  --radius-sm:   2px;
  --radius-base: 4px;
  --radius-md:   8px;
  --radius-lg:   12px;
  --radius-xl:   16px;
  --radius-2xl:  24px;
  --radius-full: 9999px;
}
```

---

_Versión 1.0 — UGC Colombia Brand System_
