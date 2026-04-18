# Format Specs — dimensiones, zonas seguras, aspect ratios

> Fuente: `brand/social-templates-spec.md` + reconciliacion con `brand/design-tokens.md`.
> Las dimensiones son oficiales. Cuando un template antiguo mencione Fraunces, sustituir por Anton (ver `brand-visual.md`).

## Matriz de formatos

| Plataforma / Formato    | Dimensiones (px)  | Aspect      | Extension | Notas                                   |
|-------------------------|-------------------|-------------|-----------|-----------------------------------------|
| IG Feed Post (vertical) | 1080 x 1350       | 4:5         | PNG/JPG   | Ratio preferido de feed actual          |
| IG Feed Post (cuadrado) | 1080 x 1080       | 1:1         | PNG/JPG   | Retro, usar solo si el diseno lo pide   |
| IG Carrusel (slide)     | 1080 x 1350       | 4:5         | PNG/JPG   | Mismo ratio en todas las slides         |
| IG Stories              | 1080 x 1920       | 9:16        | PNG/JPG   | Zona segura: margen 96px horizontal / 192px vertical |
| IG Reel (cover)         | 1080 x 1920       | 9:16        | PNG/JPG   | Cover que aparece en grid               |
| TikTok (cover / ad)     | 1080 x 1920       | 9:16        | PNG/JPG   | Zona activa 200-1540px vertical         |
| YouTube Short           | 1080 x 1920       | 9:16        | PNG/JPG   | Mismo spec que TikTok                   |
| YouTube Thumbnail       | 1280 x 720        | 16:9        | PNG/JPG   | Regla de tercios                        |
| YouTube Banner          | 2560 x 1440       | 16:9        | PNG/JPG   | Zona segura 1546 x 423 centrada         |
| LinkedIn Post           | 1200 x 628        | 1.91:1      | PNG/JPG   | Headline 52-64px en display             |
| LinkedIn Carrusel PDF   | 1080 x 1350 por slide | 4:5     | PDF       | Convertir carrusel IG a PDF             |
| WhatsApp Broadcast Img  | 1080 x 1080       | 1:1         | JPG       | Compresion agresiva por WA              |
| X / Twitter Post Img    | 1600 x 900        | 16:9        | PNG/JPG   | Standard de X para preview              |
| Newsletter Header       | 1200 x 600        | 2:1         | PNG/JPG   | Beehiiv header                          |

## Zona segura por plataforma

| Plataforma      | Zona segura                                                     |
|-----------------|------------------------------------------------------------------|
| IG Feed 4:5     | 5% margen interior en todos los lados (54px en 1080px)          |
| IG Stories      | 250px superior (para header/handle) + 350px inferior (para stickers/CTA) |
| IG Reel cover   | Mismo que Stories + considerar que 300px inferior queda bajo UI |
| TikTok          | 80px izquierda + 200px superior + 500px inferior (ratings/UI)   |
| YouTube Thumb   | Reloj y timestamp quedan inferior derecha — dejar libre 25% esq |
| LinkedIn        | Margen interno de 60px en todos los lados                        |

## Posicion del logo

| Formato        | Posicion logo                             | Version              |
|----------------|-------------------------------------------|----------------------|
| IG Feed        | Top-right (discreto, amarillo)            | horizontal color     |
| IG Stories     | Top-center (alineado al centro)           | horizontal color     |
| Reel cover     | Top-left o top-right                      | horizontal color     |
| TikTok cover   | Top-left esquina                          | horizontal color     |
| YouTube Thumb  | Bottom-right o integrado en texto         | monocromo o color    |
| LinkedIn       | Top-left con overline + stats             | horizontal color     |

**Regla dura:**
- Logo negro → SIEMPRE sobre cuadro blanco o crema.
- Logo blanco → sobre fondos oscuros o fotos con negros dominantes.
- Clearspace: minimo 24px (1x altura de "U") en todos los lados.
- Tamano minimo: 120px ancho en version horizontal.

## Tipografia por formato (escalas recomendadas)

| Formato           | Headline (Anton)      | Body (Inter)         |
|-------------------|-----------------------|----------------------|
| IG Feed           | 42-52px               | 18-22px              |
| IG Stories        | 72-96px               | 24-32px              |
| Reel/TikTok cover | 60-80px               | 20-28px              |
| YouTube Thumb     | 80-120px              | no body              |
| LinkedIn Post     | 52-64px               | 20-28px              |
| Carrusel slide    | 48-60px (slides 3-8)  | 18-24px              |

## Captions en video (obligatorios)

- Font: bold, sans (Inter Bold 700).
- Color: blanco `#FFFFFF` con stroke/borde negro 4-6px, **o** negro `#000000` con fondo amarillo `#F9B334`.
- Posicion: tercio inferior del frame, sobre la zona de UI de la plataforma.
- Tamano: ocupa 60-70% del ancho utilizable.
- Max 4 palabras por linea visible.
- Sincronizado palabra por palabra (estilo MrBeast, Hormozi).

## Proporciones de color por pieza

- Negro `#000000`: ~60% del area visible
- Blanco/Crema: ~25%
- Amarillo `#F9B334`: ~8% (solo acentos deliberados — nunca dominante)
- Rojo `#DC2626`: ~5% (solo urgencia o CTA critico)
- Gris: resto

---

## Aspect ratios validos para Nanobanana

`generate.mjs` soporta aspect ratio via `imageConfig.aspectRatio`. Valores validos que se usan en este repo:

| Ratio   | Uso                                           |
|---------|-----------------------------------------------|
| `1:1`   | IG cuadrado, WhatsApp                          |
| `4:5`   | IG Feed vertical, Carrusel (recomendado)       |
| `9:16`  | Reel, TikTok, Stories, Shorts                  |
| `16:9`  | YouTube thumbnail, X post, LinkedIn           |
| `3:4`   | Alternativa retrato para prints                |
| `21:9`  | Banner ultra-ancho (raro)                      |

El wrapper `generate-social.mjs` mapea automaticamente plataforma → aspect ratio correcto.

---

## Nomenclatura de archivos

Para que los assets queden organizados y rastreables:

```
YYYYMMDD-[plataforma]-[pilar]-[slug].png
```

Ejemplos:
- `20260416-ig-carrusel-educativo-hooks-reels-slide-01.png`
- `20260416-tiktok-debate-marketplaces-cover.png`
- `20260416-stories-bts-grabacion-camila.png`

---

## Fuente de verdad

- `brand/social-templates-spec.md` — templates originales por plataforma.
- `brand/design-tokens.md` — tipografia y proporciones.
- `scripts/image-gen/generate.mjs` — aspect ratios soportados.
