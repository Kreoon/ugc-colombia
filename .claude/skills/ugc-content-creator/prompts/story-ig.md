# Prompt — Instagram Stories (9:16, 1080x1920, 3-5 frames)

Aplicar cuando Tanya pida: "stories de X", "una storie sobre Y", "secuencia de stories BTS".

## Workflow

1. **Detectar pilar** (Stories = 60% BTS por default, pero puede ser educativo, debate, etc).
2. **Definir cuantos frames** (3-5 maximo — mas se pierde retencion).
3. **Redactar copy** por frame (max 2 lineas cortas por frame).
4. **Generar prompts Nanobanana** si se necesita imagen generada (muchas stories son foto real tomada con iPhone — en ese caso solo se genera el overlay o graficos).
5. **Proponer** stickers + polls + CTAs.
6. **Preguntar** a Tanya si dispara generacion.

## Zona segura en Stories

```
|---------------- 1080px ----------------|
|  96px              |              96px |
|  margen            |          margen   |
|                                        |
|      ZONA PARA HEADER / HANDLE         |  <- top 250px (reservar)
|                                        |
|                                        |
|                                        |
|       CONTENIDO VISUAL CENTRAL         |
|       Y TEXTO PRINCIPAL                |  <- zona activa
|                                        |
|                                        |
|                                        |
|     ZONA PARA STICKERS Y CTA           |  <- bottom 350px (reservar)
|                                        |
|                                        |
|                                        |
|  192px margen inferior                 |
|----------------------------------------|
```

**Regla dura:** nunca poner texto o elemento crucial en los ultimos 350px inferiores (la UI de IG tapa link sticker, barras de respuesta, etc).

## Tipos de Stories tipicas

### Tipo 1 — BTS (60% del mix)

Frames 1-2: foto/video del momento + caption corto.
Frame 3: sticker o pregunta ("¿que opinas?").
Frame 4 (opcional): CTA ("hoy va al feed, activa notifs").

**Prompt (si la imagen la genera Claude):**
```
scene: vertical 9:16 behind-the-scenes moment in a Colombian UGC production set,
soft natural window light, creator adjusting lighting or camera,
warm amber tones, cream and black wardrobe palette,
documentary cinematic quality, matte grain, editorial composition,
center subject in upper-middle area, generous empty space top and bottom for sticker/caption overlays.
```

### Tipo 2 — Educativo rapido (tip del dia)

Frame 1: headline grande (Anton 72-96px) — "3 COSAS QUE NADIE TE DICE"
Frame 2: punto 1 con icono/emoji sutil.
Frame 3: punto 2.
Frame 4: punto 3.
Frame 5: CTA al feed o DM.

**Fondo:** crema `#F5F5F0` con un acento amarillo, o negro con texto blanco.

### Tipo 3 — Debate ligero / Poll

Frame 1: pregunta provocadora ("¿UGC o influencer? ").
Frame 2: sticker poll con dos opciones.
Frame 3: resultado + opinion del equipo.

### Tipo 4 — Caso / Resultado rapido

Frame 1: numero grande en amarillo (ej. "CPA -40%").
Frame 2: contexto breve.
Frame 3: link o CTA al case study completo.

### Tipo 5 — Creator spotlight

Frame 1: foto del creator + nombre.
Frame 2: 1-2 datos (nicho, especialidad).
Frame 3: link al portafolio o DM para brief.

## Copy rules Stories

- **Texto grande:** max 12 palabras por frame. Tanya no lee, Tanya ve.
- **Anton 72-96px** para headlines.
- **Inter 24-32px** para body.
- **1 emoji max** por frame, nunca dominante.
- **CTA rojo `#DC2626`** si es urgencia ("ULTIMAS 24h"), amarillo `#F9B334` si es invitacion.

## Stickers recomendados

| Objetivo            | Sticker IG                                |
|---------------------|-------------------------------------------|
| Engagement rapido   | Poll (si/no o A/B)                        |
| Opinion             | Question sticker                          |
| Interaccion ludica  | Quiz                                      |
| Atencion            | Countdown (para lanzamiento)              |
| Accion              | Link sticker (exclusivo, alto ROI)        |
| Share cruzado       | Mention de creator o aliado               |

**Nota:** Link sticker va siempre en bottom-third, no en el tope. IG lo procesa mejor ahi.

## Caption / CTA

Stories no tiene caption publico, pero cada frame puede tener:
- **Texto principal:** el mensaje (Anton 72-96px).
- **Contexto chico:** Inter 20-28px si aporta.
- **CTA visual:** amarillo `#F9B334` o rojo `#DC2626` segun urgencia.

## Checklist

- [ ] 3-5 frames (nunca mas de 7).
- [ ] Zona segura respetada (top 250, bottom 350).
- [ ] Texto legible en movil (>= 24px Inter, >= 60px Anton).
- [ ] Handle/logo visible en primer frame.
- [ ] Ultimo frame con CTA claro (link, mencion, countdown).
- [ ] Paleta oficial. Amarillo `#F9B334`.
- [ ] Sticker con intencion (no solo decorativo).

## Salida esperada de Claude

1. **Tipo de Story** (BTS, educativo, debate, caso, spotlight).
2. **Numero de frames** y rol de cada uno.
3. **Copy por frame** con font/tamano sugerido.
4. **Stickers recomendados** (tipo, posicion).
5. **Prompt Nanobanana** si la imagen debe generarse (o nota "usar foto real de Tanya").
6. **Comando de generacion** si aplica.
