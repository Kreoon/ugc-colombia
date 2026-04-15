# Logo Specs — UGC Colombia

> **Reconciliado 2026-04-15.** Fuente canónica en código: [`web/src/app/manual/_data/logos.ts`](../web/src/app/manual/_data/logos.ts).
>
> **Anatomía real del logo oficial** (slide 02 del Manual de Marca interno, preservado en `/brand/legacy-deck/slide-02-logo-horizontal-color.png`):
>
> - Isotipo: 3 glyphs "UGC" en sans-serif condensed (Anton-like), con una palabra "AGENCIA" en vertical dentro de la U izquierda
> - Cada glyph "UGC" tiene un pequeño "test tube" amarillo `#F9B334` en su interior (como indicador de nivel químico)
> - Al lado derecho: wordmark "COLOMBIA" en gris oscuro `#3D3D3C`
> - Debajo de "COLOMBIA": barra horizontal amarilla `#F9B334`
> - Al final de la barra: 3 marcas diagonales pequeñas amarillas (acento dinámico)
> - Paleta oficial: `#000000` negro · `#3D3D3C` gris oscuro · `#BDBCBC` gris claro · `#F9B334` amarillo · `#F5F5F0` crema
>
> **Archivos PNG oficiales disponibles:**
> - `/web/public/brand/logos/v2/logo-horizontal-color.png` — versión default (color sobre claro)
> - `/web/public/brand/logos/v2/logo-horizontal-mono-gray.png` — monocromo gris
> - `/web/public/brand/logos/v2/logo-horizontal-white-on-transparent.png` — blanco sobre oscuro
>
> **Pendiente de generar en Fase 3 (Nanobanana):** stacked-color, stacked-white, isotype-color, isotype-white, isotype-black, horizontal-yellow-bg.
>
> El texto histórico que sigue describía un logo especulativo distinto al oficial y se mantiene solo como referencia de la etapa exploratoria.

---

## [Histórico — no oficial]

---

## 1. Concepto del Logo

### Racional de diseño

El logo de UGC Colombia comunica la tensión productiva entre lo analógico y lo digital — entre el talento humano y el sistema tecnológico.

**Wordmark:** "UGC COLOMBIA" en tipografía sans geométrica (Inter/Geist) con tracking amplio (`0.15em`). Las letras "UGC" en peso Extra Bold (`800`) y "COLOMBIA" en Regular (`400`) debajo — creando jerarquía y diferenciando la categoría del origen.

**Isotipo:** Una "U" estilizada que contiene un encuadre de cámara (rectángulo interior con cortes angulares en las esquinas). La "U" representa tanto la inicial de UGC como la forma de un visor de cámara visto desde arriba. Los cortes angulares en las esquinas evocan las marcas de registro de video y el encuadre editorial.

**Color base:** Isotipo en dorado `#FFD60A` + wordmark en blanco `#FFFFFF` sobre negro `#0A0A0A`.

**Tagline (opcional):** "UGC latino con estándar USA." — Inter Regular, 10px, tracking `0.08em`, gris `#737373`. Solo se incluye en versión completa cuando el espacio lo permite.

---

## 2. Variantes del Logo

### Variante 1: Logo Principal (Stacked)
```
Composición: Isotipo arriba + Wordmark centrado debajo
Fondo:        Negro (#0A0A0A)
Isotipo:      Dorado (#FFD60A)
Wordmark:     Blanco (#FFFFFF)
Dimensiones:  320 × 200px (canvas recomendado)
Uso:          Portadas, centros de pantalla, redes sociales
```

### Variante 2: Logo Horizontal (Inline)
```
Composición: Isotipo izquierda + Wordmark a la derecha
Fondo:        Negro (#0A0A0A)
Isotipo:      Dorado (#FFD60A)
Wordmark:     Blanco (#FFFFFF)
Dimensiones:  400 × 80px (canvas recomendado)
Uso:          Headers web, email signatures, documentos, apresentações
```

### Variante 3: Isotipo (Solo icono)
```
Composición: Solo la "U" con encuadre de cámara
Fondo:        Negro (#0A0A0A)
Isotipo:      Dorado (#FFD60A)
Dimensiones:  80 × 80px (cuadrado)
Uso:          Favicon (16px, 32px), perfil RRSS, app icon, badge
```

### Variante 4: Logo Inverso (Sobre claro)
```
Composición: Igual que principal, colores invertidos
Fondo:        Cream (#F5F5F0) o Blanco (#FFFFFF)
Isotipo:      Negro (#0A0A0A)
Wordmark:     Negro (#1A1A1A)
Dimensiones:  320 × 200px (canvas)
Uso:          Documentos en papel, propuestas formales, mailing
```

### Variante 5: Monocromo Blanco
```
Composición: Todo en blanco
Fondo:        Cualquier fondo oscuro no-negro (fotos oscuras, negro profundo)
Color:        Blanco (#FFFFFF)
Uso:          Bordados, grabados, serigrafia, fondos con foto
```

### Variante 6: Monocromo Dorado
```
Composición: Todo en dorado
Fondo:        Negro (#0A0A0A) o fondos muy oscuros
Color:        Dorado (#FFD60A)
Uso:          Packaging premium, sellos de calidad, edición especial
```

---

## 3. Clearspace (Zona de respeto)

La zona de respeto es el espacio mínimo libre de otros elementos alrededor del logo.

### Unidad de medida: X
Donde `X = altura de la letra "U" mayúscula en el wordmark`.

```
         ┌─────────────────────────────┐
         │            X                │
         │   ┌─────────────────────┐   │
         │   │                     │   │
       X │   │   [LOGO AQUÍ]       │ X │
         │   │                     │   │
         │   └─────────────────────┘   │
         │            X                │
         └─────────────────────────────┘
```

| Versión del logo       | Clearspace mínimo |
|------------------------|-------------------|
| Logo principal         | 1× en todos los lados |
| Logo horizontal        | 1× en todos los lados |
| Isotipo solo           | 0.75× en todos los lados |

En medios digitales, el clearspace mínimo equivale a:
- Logo principal: 24px a cada lado
- Logo horizontal: 20px a cada lado
- Isotipo: 12px a cada lado

---

## 4. Tamaños Mínimos

### Digital

| Versión         | Ancho mínimo | Ancho recomendado |
|-----------------|--------------|-------------------|
| Logo horizontal | 120px        | 200px+            |
| Logo principal  | 100px        | 180px+            |
| Isotipo         | 24px         | 40px+             |

Nunca usar el logo horizontal debajo de 120px de ancho — a esa escala, usar solo el isotipo.

### Impresión

| Versión         | Ancho mínimo |
|-----------------|--------------|
| Logo horizontal | 30mm         |
| Logo principal  | 25mm         |
| Isotipo         | 8mm          |

---

## 5. Archivos Requeridos

Para cada variante del logo, entregar en los siguientes formatos:

### Vectores (obligatorios)
```
/brand/assets/logo/
  ugccolombia-logo-principal.svg
  ugccolombia-logo-principal.eps
  ugccolombia-logo-horizontal.svg
  ugccolombia-logo-horizontal.eps
  ugccolombia-isotipo.svg
  ugccolombia-isotipo.eps
  ugccolombia-logo-inverso.svg
  ugccolombia-logo-monocromo-blanco.svg
  ugccolombia-logo-monocromo-dorado.svg
```

### Raster para uso digital
```
/brand/assets/logo/png/
  ugccolombia-logo-principal-2x.png      (640×400px, fondo transparente)
  ugccolombia-logo-principal-1x.png      (320×200px, fondo transparente)
  ugccolombia-logo-horizontal-2x.png     (800×160px, fondo transparente)
  ugccolombia-logo-horizontal-1x.png     (400×80px, fondo transparente)
  ugccolombia-isotipo-512.png            (512×512px, fondo transparente)
  ugccolombia-isotipo-256.png            (256×256px, fondo transparente)
  ugccolombia-isotipo-128.png            (128×128px, fondo transparente)
  ugccolombia-isotipo-64.png             (64×64px, fondo transparente)
  ugccolombia-isotipo-32.png             (32×32px, fondo transparente)
  ugccolombia-isotipo-16.png             (16×16px, fondo transparente)
  ugccolombia-logo-sobre-negro-2x.png    (640×400px, fondo negro sólido)
  ugccolombia-logo-inverso-2x.png        (640×400px, fondo cream sólido)
```

### Para redes sociales
```
/brand/assets/logo/social/
  profile-instagram.png    (1080×1080px — isotipo centrado, fondo negro)
  profile-tiktok.png       (200×200px — isotipo, fondo negro)
  profile-linkedin.png     (400×400px — isotipo, fondo negro)
  favicon.ico              (multi-resolución: 16, 32, 48px)
  favicon-192.png          (192×192px — PWA)
  favicon-512.png          (512×512px — PWA)
```

---

## 6. Construcción del Wordmark (Especificación tipográfica)

```
"UGC"      — Inter ExtraBold (800), tracking: 0.15em, size relativo: 100%
"COLOMBIA" — Inter Regular (400), tracking: 0.20em, size relativo: 45%
             Centrado respecto a "UGC"
             Margen superior: 0.3em

Color sobre negro:
  "UGC"      → #FFFFFF
  "COLOMBIA" → #FFFFFF (o #9CA3AF para mayor contraste de jerarquía)
```

### Separador / tagline (versión completa)
```
Línea:    1px, color #FFD60A, ancho = ancho de "COLOMBIA"
Tagline:  "UGC latino con estándar USA."
          Inter Regular 400, 9px, tracking: 0.06em
          Color: #737373
          Margen sobre la línea: 6px
```

---

## 7. Construcción del Isotipo (Especificación geométrica)

```
Canvas:   80 × 80px (cuadrado)
Forma base: "U" — construida con:
  - Dos rectángulos verticales: 18px ancho × 50px alto
  - Radio inferior: 26px (semicírculo que une las bases)
  - Grosor del trazo: 6px
  - Color: #FFD60A

Encuadre interior (visor de cámara):
  - Rectángulo: 36px × 28px, centrado en la parte superior
  - Sin relleno, solo borde 1.5px en #FFD60A
  - Cortes angulares en las 4 esquinas: 4px × 4px, a 45°
    (el borde se corta, simulando marcas de registro de video)

Proporción de la U respecto al canvas: ocupa 75% del espacio disponible
Centrado vertical: ligeramente desplazado hacia arriba (2px) para equilibrio óptico
```

---

_Versión 1.0 — UGC Colombia Brand System_
