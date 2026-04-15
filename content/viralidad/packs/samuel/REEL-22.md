---
slug: samuel-R22
title: "Claude + Gemini juntos: la arquitectura que nos ahorra 68%"
assigned_creator: samuel@ugccolombia.co
pillar: data_angulos
platform: instagram_reel
duration_seconds: 50
hook: "Usamos Claude Y Gemini al mismo tiempo. No es moda — nos ahorra 68%."
category: viral-pack
source_pack: samuel
scenes:
  - id: 1
    time: "0-3s"
    visual: "Diagrama dual a pantalla completa: logo Claude a la izquierda, logo Gemini a la derecha, flecha bidireccional uniéndolos"
    voice: "Usamos Claude Y Gemini al mismo tiempo. No es moda. Te explico la arquitectura."
    creator_action: "Voz en off, pantalla limpia, sin cámara"
    editing: "Cut seco a los 3s. Texto overlay Anton: DUAL LLM ARCH. Flash blanco sutil al cut."
    broll:
      - "Logos Claude y Gemini animados"
      - "Flecha bidireccional pulsante"
  - id: 2
    time: "3-13s"
    visual: "Tabla animada de dos columnas: Claude Sonnet (reasoning, análisis ads, briefs) vs Gemini Flash (clasificación, tagging, embeddings)"
    voice: "Regla uno: el modelo correcto para la tarea correcta. Claude Sonnet para razonamiento complejo — análisis de ads, estrategia, briefs. Gemini Flash para tareas de alto volumen — clasificación, tagging, embeddings."
    creator_action: "Voz en off mientras tabla aparece fila por fila"
    editing: "Cada fila aparece con tic verde y micro-sonido. Overlay: Sonnet = reasoning / Flash = volume."
    broll:
      - "Tabla comparativa animada"
      - "Iconos de tareas (analizar, taggear, embeddear)"
  - id: 3
    time: "13-25s"
    visual: "Screen recording de log real de producción mostrando claude_timeout → gemini_fallback → response OK 1.2s"
    voice: "Regla dos: fallback automático. Si Claude está caído o timeout pasa 8 segundos, el router cambia a Gemini. El usuario no se entera. Miren este log de producción."
    creator_action: "Voz en off, screen recording"
    editing: "Resaltar línea del fallback con highlight amarillo. Zoom 10% al timestamp."
    broll:
      - "Log de producción con fallback"
      - "Diagrama del router con switch"
  - id: 4
    time: "25-40s"
    visual: "Gráfica pie animándose: 72% Claude azul / 28% Gemini verde. Cut a barras: $180 vs $560 con flecha de ahorro"
    voice: "Resultado: el mes pasado corrimos 12,400 requests. Claude manejó el 72% — el trabajo pesado. Gemini el 28% — lo masivo y los fallbacks. Costo total: 180 dólares. Solo con Claude hubiera sido 560."
    creator_action: "Voz en off, gráficas dinámicas"
    editing: "Números cambian con counter animation. Overlay grande: AHORRO 68%."
    broll:
      - "Gráfica pie distribución requests"
      - "Gráfica barras costo $180 vs $560"
      - "Counter animation"
  - id: 5
    time: "40-50s"
    visual: "Samuel talking head en silla del estudio (luz cálida lateral). Cierre con diagrama dual completo y CTA"
    voice: "La lección: no peleés por el mejor modelo. Usá los dos donde cada uno brilla. Eso es ingeniería, no hype."
    creator_action: "Samuel a cámara, gesto firme con la mano abierta al decir 'no peleés'"
    editing: "Música baja en 'ingeniería, no hype'. Texto overlay final: modelo correcto, tarea correcta."
    broll:
      - "Talking head Samuel"
      - "Diagrama dual completo"
      - "End card con CTA"
---

# samuel-R22 — Claude + Gemini juntos: la arquitectura que nos ahorra 68%

**Tipo:** Educativo técnico + opinión fuerte
**Duración:** 50 segundos
**Voz:** Samuel en off + diagrama animado en pantalla
**Música:** Beat electrónico ritmo medio

---

| Tiempo | Audio / Voz | Visual | Notas de edición |
|--------|-------------|--------|------------------|
| 0-3s | `"Usamos Claude Y Gemini al mismo tiempo. No es moda. Te explico la arquitectura."` | Diagrama dual: logo Claude a la izq, logo Gemini a la der, flecha uniendo. | Cut a los 3s. Texto overlay: "DUAL LLM ARCH". |
| 3-13s | `"Regla uno: el modelo correcto para la tarea correcta. Claude Sonnet para razonamiento complejo — análisis de ads, estrategia, briefs. Gemini Flash para tareas de alto volumen — clasificación, tagging, embeddings."` | Tabla animada: columna "Claude Sonnet" con tareas, columna "Gemini Flash" con tareas. | Cada fila aparece con tic verde. Overlay: "Sonnet = reasoning / Flash = volume". |
| 13-25s | `"Regla dos: fallback automático. Si Claude está caído o timeout pasa 8 segundos, el router cambia a Gemini. El usuario no se entera. Miren este log de producción."` | Screen recording: log real con evento "claude_timeout → gemini_fallback → response OK 1.2s". | Resaltar la línea del fallback en amarillo. |
| 25-40s | `"Resultado: el mes pasado corrimos 12,400 requests. Claude manejó el 72% — el trabajo pesado. Gemini el 28% — lo masivo y los fallbacks. Costo total: 180 dólares. Solo con Claude hubiera sido 560."` | Gráfica pie: 72% Claude / 28% Gemini. Luego barra: $180 vs $560 con flecha de ahorro. | Números cambian en tiempo real. Overlay: "AHORRO 68%". |
| 40-50s | `"La lección: no peleés por el mejor modelo. Usá los dos donde cada uno brilla. Eso es ingeniería, no hype."` | Samuel a cámara, silla del estudio. Final con diagrama completo y CTA. | Música baja. Texto overlay final: "modelo correcto, tarea correcta". |

## Prosody ElevenLabs
- `<prosody rate="100%">` base.
- `<emphasis level="strong">` en: "al mismo tiempo", "72%", "180 dólares", "560", "ingeniería, no hype".
- `<break time="0.5s"/>` antes de: "Costo total", "Eso es ingeniería".

## B-roll requerido
- Diagrama de arquitectura dual LLM (puede ser Excalidraw)
- Tabla comparativa Claude/Gemini por tarea
- Log de producción con fallback real (anonimizado)
- Gráfica pie de distribución de requests
- Gráfica de barras de costo
- Talking head final

## Retención loop
El número $180 vs $560 es el gancho. La gente vuelve al segundo 25 para entender el cálculo, y llega hasta el final por la lección. Comentarios se llenan de "¿qué router usan?" y "¿tienen el código?".

## CTA
"¿Quieren el router de fallback? Lo suelto en Twitter esta semana. Sígueme ahí."

## Por qué funciona
Opinión fuerte estilo Theo Browne ("no peleés por el mejor modelo") + data dura (12,400 requests, $180 vs $560) + arquitectura visualizada estilo ByteByteGo. Mata el cliché de "X es mejor que Y" y ofrece una tercera vía más inteligente.
