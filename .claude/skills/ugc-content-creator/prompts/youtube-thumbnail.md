# Prompt — YouTube Thumbnail (1280x720, 16:9)

Aplicar cuando Tanya pida: "thumbnail para YouTube de X", "miniatura de Y", "portada del short/long".

## Uso contextual

- YouTube Long (8-15 min): thumbnail primario. 60% del CTR depende de esto.
- YouTube Short (9:16 vertical): el cover no es 16:9 — usar `reel-tiktok.md`.
- El thumbnail es distinto a la portada embebida — se sube por separado en YouTube Studio.

## Workflow

1. **Confirmar** que es Long (no Short — si es Short, redirigir a `reel-tiktok.md`).
2. **Definir titulo del video** (eso condiciona el thumbnail).
3. **Generar prompt Nanobanana** con regla de tercios + texto overlay en postproduccion.
4. **Proponer 2 variantes A/B** para testing.

## Regla de tercios

```
|----- 1280px ------|
|         |         |
|  SUJETO |  TEXTO  |
|   40%   |   40%   |
|         |         |
|   +     |    +    |
|   |     |    |    |
|   V     |    V    |
|         |         |
|---------|---------|
  40%        40%
```

- **Izquierda 40%:** cara o sujeto con expresion alta (sorpresa, determinacion, cuestionamiento).
- **Centro 20%:** zona neutra (puede tener un elemento visual pequeno — flecha, simbolo).
- **Derecha 40%:** texto grande (max 5 palabras) en Anton ExtraBold equivalente, blanco con stroke negro.

## Elementos obligatorios

- **Sujeto (cara):** bien iluminado, expresion alta. Luz direccional amber `#F9B334`.
- **Fondo:** negro `#000000` o con crush de sombras profundas.
- **Texto overlay:** Anton uppercase, max 5 palabras, stroke negro 6-10px + sombra.
- **Acento dorado:** una sola palabra clave del texto va en `#F9B334`.
- **Logo UGC Colombia:** bottom-right, discreto, version blanca (fondo oscuro).

## Prompt Nanobanana

**Ejemplo (thumbnail educativo sobre hooks):**
```
scene: horizontal 16:9 YouTube thumbnail composition,
close-up portrait of a Latin American creator on the left third,
intense direct gaze, slightly surprised expression, natural but bold lighting,
warm amber #F9B334 key light from right with deep crushed shadows on the left,
dark #000000 environment fading into gradient on right 60% for text overlay,
documentary cinematic quality, shallow depth of field, matte grain,
rule of thirds strictly respected, right 40% clean space for typography,
editorial premium feel, no text, no labels.
```

**Variaciones por pilar:**
- **Educativo:** creator mirando con cara de "te voy a ensenar esto".
- **Debate:** creator con cara de desafio, brazos cruzados o senalando.
- **Estrategico:** creator frente a pizarra o pantalla con framework.
- **Casos:** screenshot de dashboard de resultados + mano/cara reaccionando.
- **BTS:** escena de set en accion, varios elementos.

## Texto del thumbnail

**Formulas que funcionan:**
- "[NUMERO] [TEMA] en [TIEMPO]" → "5 HOOKS UGC EN 60s"
- "[RESULTADO IMPACTANTE]" → "CPA -40% CON ESTO"
- "[PREGUNTA CORTA]" → "¿UGC EN 2026?"
- "[ANTES] → [DESPUES]" → "$500 → $5K/MES"
- "[ADVERTENCIA]" → "NO HAGAS ESTO"

**Reglas:**
- Max 5 palabras.
- Anton/display ExtraBold equivalente.
- Blanco con stroke negro 6-10px.
- **Una** palabra en amarillo `#F9B334` (la mas importante).
- Evitar signos (? ! solo si aportan fuerza).

## A/B testing recomendado

Generar **2 variantes** del thumbnail:
- **A:** foco en la cara del creator (reaccion emocional).
- **B:** foco en el dato/numero grande (concrecion).

Publicar ambas, usar YouTube Studio thumbnail experiments si esta disponible.

## Checklist

- [ ] Regla de tercios respetada (40% sujeto / 20% centro / 40% texto).
- [ ] Texto max 5 palabras, legible en 120px de alto (vista movil).
- [ ] Una palabra clave en amarillo `#F9B334`.
- [ ] Fondo negro o sombras profundas (nunca blanco brillante).
- [ ] Cara bien iluminada, expresion alta.
- [ ] Logo UGC Colombia bottom-right, discreto.
- [ ] Consistencia con el titulo del video (no clickbait vacio).
- [ ] Si clock/timestamp de YouTube tapa zona = rediseñar esquina inferior derecha.

## Salida esperada de Claude

1. **Titulo del video** (si no esta dado).
2. **Prompt Nanobanana** para variante A.
3. **Prompt Nanobanana** para variante B.
4. **Texto overlay** (exacto, con palabra en amarillo marcada).
5. **Posicion del logo** y elementos secundarios.
6. **Comando de generacion** para ambas variantes si Tanya aprueba.
