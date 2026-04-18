# Prompt — LinkedIn Post (imagen 1200x628, 1.91:1 — texto hasta 3000 chars)

Aplicar cuando Tanya pida: "post de LinkedIn sobre X", "articulo corto LinkedIn", "carrusel PDF LinkedIn".

## Quien firma

| Pilar                  | Firma preferida         |
|------------------------|-------------------------|
| Educativo tactical     | Tanya (cuenta empresa)  |
| Debate ligero          | Tanya o Alexander       |
| Estrategico profundo   | Alexander (personal)    |
| Debate fuerte industria| Alexander (personal)    |
| Casos & resultados     | Alexander o Brian       |
| BTS                    | Tanya o equipo          |
| Operaciones / sistemas | Brian                   |

Si Tanya pide un post que por su tono deberia ir firmado por Alexander o Brian, la skill debe notificarlo: *"Este tema suena mas para la voz de [Alexander/Brian]. ¿Quieres que lo adapte para voz de Tanya o mejor lo dejas como draft para Alexander?"*

## Workflow

1. **Detectar pilar** + firma apropiada.
2. **Elegir hook** de `hooks-library.md`.
3. **Redactar post** con anatomia de abajo.
4. **Generar imagen** 1200x628 si no es carrusel PDF.
5. **Si es carrusel PDF:** generar 8-10 slides 1080x1350 → se convierten a PDF despues.
6. **Proponer** copy completo + hashtags (max 5 en LinkedIn).

## Anatomia del post LinkedIn (texto)

```
[HOOK LINEA 1 — pre-fold, las primeras 3 lineas deciden si hay "ver mas"]
[LINEA 2 — ampliar el gancho]
[LINEA 3 — promesa concreta o dato]

[Parrafo de contexto — 2-3 lineas, espacios entre parrafos son obligatorios en LI]

[Punto 1 — con numero o guion]
[Punto 2]
[Punto 3]
(maximo 5-7 puntos)

[Parrafo de cierre — insight final o reflexion]

[CTA — pregunta abierta o invitacion a comentar]

#UGCColombia #MarketingLatino #Performance #UGCads #DTC
```

**Reglas LinkedIn-specific:**
- **Primeros 210 caracteres** son criticos (pre-fold).
- Usar **espacios entre parrafos** — LI premia legibilidad.
- Sin emojis excesivos. Max 2-3 puntuales si aportan.
- **No enlaces externos** en el texto principal (LI penaliza). Enlace va en el primer comentario.
- CTA = pregunta genuina. LI premia comentarios largos.

## Imagen del post (1200x628)

### Tipo A — Post con imagen unica

**Estructura visual:**
- Fondo negro `#000000` o crema `#F5F5F0`.
- Overline (Inter 14-16px uppercase) arriba-izquierda: "UGC COLOMBIA · ESTRATEGIA"
- Headline (Anton 52-64px) ocupando 50-60% del ancho.
- Subhead o dato (Inter 20-28px) debajo.
- Elemento visual (foto BTS, grafico minimalista, numero grande en amarillo).
- Logo top-right o bottom-left.

**Prompt Nanobanana ejemplo (pilar estrategico):**
```
scene: horizontal 1.91:1 editorial composition for LinkedIn,
clean studio photograph of a Latin American executive at a desk reviewing metrics on a laptop,
dark #000000 environment with warm amber #F9B334 desk lamp lighting from the right,
documentary cinematic quality, shallow depth of field, matte grain,
subject occupies left 40%, right 60% is clean negative space for typography overlay,
premium editorial boutique feel, authority without coldness.
```

### Tipo B — Carrusel PDF LinkedIn

- 8-10 slides 1080x1350 (mismo ratio que carrusel IG — ver `carousel-ig.md`).
- Se exporta como PDF y se sube a LinkedIn con sticker "Document".
- Permite lectura lineal + saves + shares corporativos.
- Ideal para contenido estrategico o educativo profundo.

## Hashtags LinkedIn

Max 5 (LI no premia stuffing):
- `#UGCColombia` (brand)
- `#MarketingDigital` o `#Performance` (nicho)
- `#ContenidoUGC` o `#Creators` (industria)
- `#LATAM` (geo)
- 1 trending si aplica (ej. `#IAEnMarketing`)

## Checklist

- [ ] Primeros 210 chars del texto enganchan sin necesidad de "ver mas".
- [ ] Parrafos separados con espacios en blanco.
- [ ] CTA es pregunta abierta (no "sigueme").
- [ ] Imagen 1200x628 con zona segura 60px interna.
- [ ] Headline Anton 52-64px legible en movil.
- [ ] Amarillo `#F9B334` (no `#FFD60A`).
- [ ] Logo en posicion correcta segun fondo.
- [ ] Max 5 hashtags.
- [ ] Si hay link, va al primer comentario, no en el post.
- [ ] Firma apropiada al pilar (Tanya vs Alexander vs Brian).

## Salida esperada de Claude

1. **Pilar + firma recomendada**.
2. **Texto completo** con hook pre-fold marcado.
3. **Prompt Nanobanana** del visual (Tipo A) **o** tabla de 8-10 slides (Tipo B).
4. **Hashtags**.
5. **Copy del primer comentario** si hay enlace.
6. **Comando de generacion** si Tanya aprueba.
