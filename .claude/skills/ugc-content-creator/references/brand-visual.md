# Brand Visual — UGC Colombia (reference rapida)

> Extracto operativo para uso dentro de la skill. Fuente canonica: `brand/design-tokens.md` y `scripts/image-gen/brand-system.mjs` (campo `BRAND_COLORS`, `BRAND_FONTS`).

## Paleta oficial (sin excepciones)

| Token              | HEX        | Uso principal                           |
|--------------------|-----------|------------------------------------------|
| `brand-black`      | `#000000` | Fondo primario, texto principal          |
| `brand-gray-dark`  | `#3D3D3C` | Texto sobre claro, bordes, dividers      |
| `brand-gray-light` | `#BDBCBC` | Superficies muted, separadores           |
| `brand-yellow`     | `#F9B334` | Acento unico + CTA primario              |
| `brand-cream`      | `#F5F5F0` | Fondo claro secundario, cards            |
| `brand-white`      | `#FFFFFF` | Texto sobre oscuro                       |
| `red-urgent`       | `#DC2626` | Alertas, errores, CTAs criticos          |

**Proporciones por pieza:** Negro 60% · Blanco/Crema 25% · Amarillo 8% · Rojo/Gris 7%. El amarillo nunca es el color dominante — es el highlight deliberado.

## Colores prohibidos

- `#FFD60A` (amarillo brillante) — DESCARTADO en reconciliacion 2026-04-15.
- `#D4A017` (oro profundo) — DESCARTADO.
- Cualquier gradient arcoiris o color vivido fuera de la paleta.
- Blancos puros `#FFFFFF` como fondo para composiciones (usar `#F5F5F0` crema).

## Tipografia

```
font-display  = Anton      (H1, H2, titulares display, numeros impactantes, CTAs grandes)
font-sans     = Inter      (H3-H6, parrafos, UI, labels, botones pequenos)
```

**Fuentes prohibidas en piezas oficiales:** Fraunces, GT Super, cualquier serif editorial. Un spec antiguo las menciono pero quedaron descartadas. Si una referencia a Fraunces aparece en docs viejos, ignorar.

**Escala (base 16px, ratio 1.25):** text-xs 10 · sm 12 · base 16 · md 18 · lg 20 · xl 24 · 2xl 30 · 3xl 36 · 4xl 48 · 5xl 60 · 6xl 72 · 7xl 96.

**Pesos:** Anton 400 unico. Inter 400/500/600/700.

## Logo

- **Isotipo:** "UGC" en 3 glyphs estilo Anton + test tube amarillo `#F9B334` en interior.
- **Wordmark:** "COLOMBIA" en gris `#3D3D3C` con barra horizontal dorada + 3 marcas diagonales amarillas.
- **Versiones:** horizontal-color (default), monocromo gris, blanco-sobre-transparente.
- **Clearspace:** 1x la altura de "U" en todos los lados. Minimo digital: 24px.
- **Tamano minimo digital:** 120px ancho (version horizontal).

**Regla dura del logo (memory del usuario):**
- Logo **negro** SIEMPRE sobre cuadro blanco solido (o crema). Nunca directo sobre foto.
- Logo **blanco** SIEMPRE cuando el fondo es oscuro o es una foto con negros dominantes.
- Ubicacion por pieza: ver `format-specs.md`.

## Estilo de imagen (Nanobanana / Gemini)

Aesthetic: `dark editorial boutique, authority without coldness`.

- Fondos: `#000000` puro o `#F5F5F0` crema. Evitar blanco `#FFFFFF` saturado.
- Iluminacion: luz direccional calida, rim light amber, sombras crushed, highlights preservados.
- Color grade: warm cast sutil, -15% saturacion, contraste medio-alto, grano de pelicula fino.
- Composicion: minimal, editorial magazine, espacio negativo generoso.
- Textura: mate, grain sutil, premium print sensibility.
- Cultura: LATAM con craft USA-grade.

**Prohibido en prompts (lista negra, ya en `BRAND_NEGATIVE`):**
- Stock photos, corporate handshakes, oficinas genericas.
- Fondos blancos brillantes, colores vividos saturados, filtros instagram.
- Look 3D render, cartoon, ilustracion, emojis.
- Rostros AI obvios, oversharpened edges, curvas organicas decorativas.
- Texto, labels, palabras legibles, numeros, logos, watermarks (el texto va en Canva/CapCut, no en la imagen generada).

## Bordes, sombras y radios

- **Border radius por defecto:** `base 4px` (cards compactas, inputs) o `md 8px` (cards estandar). Editorial → preferir radios pequenos.
- **Sombras:** negras profundas (`0 4px 16px rgba(0,0,0,0.60)` base). Para glow amarillo deliberado: `0 0 24px rgba(249,179,52,0.30)`.

---

## Checklist visual antes de publicar

- [ ] Amarillo es `#F9B334` (no `#FFD60A`).
- [ ] Fondo negro puro o crema (no blanco brillante).
- [ ] Logo en version correcta segun fondo (negro/blanco).
- [ ] Clearspace del logo respetado (>= 24px).
- [ ] Tipografia: Anton display + Inter body. Fraunces no aparece.
- [ ] Captions activos si es video (fuente bold, blanco con stroke negro o negro con fondo amarillo).
- [ ] Grain y mate — no look plastico, no oversharpened.

---

## Fuente de verdad

- `brand/design-tokens.md` — paleta, tipografia, spacing, sombras (reconciliado 2026-04-15).
- `scripts/image-gen/brand-system.mjs` — `BRAND_BASE`, `BRAND_NEGATIVE`, `buildPrompt()`, `BRAND_COLORS`, `BRAND_FONTS`.
- `brand/brand-guidelines.md` — guias de uso del logo.
- Si hay conflicto: gana `brand/design-tokens.md`.
