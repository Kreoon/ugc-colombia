---
slug: samuel-R35
title: "Cliente paga en Wise, creator cobra en Mercury — el flow"
assigned_creator: samuel@ugccolombia.co
pillar: casos_resultados
platform: instagram_reel
duration_seconds: 55
hook: "El cliente paga en dólares. El creator cobra en Colombia. Cómo lo resolvimos sin banco."
category: viral-pack
source_pack: samuel
scenes:
  - id: 1
    time: "0-3s"
    visual: "Split: mapa USA a la izquierda + mapa Colombia a la derecha. Flecha de pago animada cruzando"
    voice: "El cliente paga en dólares. El creator cobra en Colombia. Lo resolvimos sin banco tradicional."
    creator_action: "Voz en off, sin cámara"
    editing: "Overlay grande Anton: USA → COL SIN BANCO. Flecha pulsante."
    broll:
      - "Mapa USA"
      - "Mapa Colombia"
      - "Flecha de pago animada"
  - id: 2
    time: "3-13s"
    visual: "Captura del dashboard Mercury (anonimizada) mostrando cuenta USD y balance"
    voice: "Cliente paga a nuestra cuenta Mercury en USA. Mercury es banco para startups — cuenta USD en 48 horas, sin llenar papeles hasta 2028."
    creator_action: "Voz en off, screen recording"
    editing: "Overlay: Mercury = banco USD fácil. Logo Mercury pulsante."
    broll:
      - "Dashboard Mercury anonimizado"
      - "Logo Mercury"
  - id: 3
    time: "13-28s"
    visual: "Diagrama de flujo: Mercury → n8n → Wise → Bancolombia/Nequi. Cada paso iluminado al mencionarlo"
    voice: "Cuando el brief se entrega y aprueba, disparamos un webhook a n8n. n8n llama a la API de Wise. Wise transfiere pesos colombianos a la cuenta del creator en menos de 10 minutos — con tasa de cambio mejor que cualquier banco."
    creator_action: "Voz en off, diagrama animado"
    editing: "Overlay: <10 min tasa mejor. Iluminación secuencial de cada paso del flujo."
    broll:
      - "Diagrama flujo de pagos"
      - "Logos n8n + Wise"
      - "Logos Bancolombia + Nequi"
  - id: 4
    time: "28-42s"
    visual: "Código en VS Code mostrando uso de idempotency_key en llamada Wise API. Cut a log con intento duplicado marcado SKIPPED en verde"
    voice: "La magia: cada pago lleva un idempotency key. Si la función se dispara dos veces, la segunda se descarta. Nunca pagamos doble. Clave para no perder plata ni confianza."
    creator_action: "Voz en off, screen recording"
    editing: "Overlay verde: idempotency = blindaje. Highlight en idempotency_key."
    broll:
      - "Código idempotency_key"
      - "Log con SKIPPED"
      - "Highlights verdes"
  - id: 5
    time: "42-55s"
    visual: "Samuel a cámara cierre. Cut a calendario con viernes resaltados en verde (libres)"
    voice: "Antes: yo mandaba pagos manualmente los viernes, 3 horas de chamba. Ahora: sale solo cuando se aprueba. El creator cobra más rápido, yo no pierdo viernes. Todos ganan."
    creator_action: "Samuel a cámara, leve sonrisa al decir 'viernes libres'"
    editing: "Overlay final: viernes libres = bonus. Música sube en 'Todos ganan'."
    broll:
      - "Talking head Samuel"
      - "Calendario viernes verdes"
      - "End card"
---

# samuel-R35 — Cliente paga en Wise, creator cobra en Mercury — el flow

**Tipo:** Caso real + arquitectura de pagos
**Duración:** 55 segundos
**Voz:** Samuel en off + diagrama de flujo
**Música:** Instrumental optimista

---

| Tiempo | Audio / Voz | Visual | Notas de edición |
|--------|-------------|--------|------------------|
| 0-3s | `"El cliente paga en dólares. El creator cobra en Colombia. Lo resolvimos sin banco tradicional."` | Split: mapa USA + mapa Colombia con flecha de pago. | Overlay: "USA → COL SIN BANCO". |
| 3-13s | `"Cliente paga a nuestra cuenta Mercury en USA. Mercury es banco para startups — cuenta USD en 48 horas, sin llenar papeles hasta 2028."` | Captura Mercury dashboard (anonimizada). | Overlay: "Mercury = banco USD fácil". |
| 13-28s | `"Cuando el brief se entrega y aprueba, disparamos un webhook a n8n. n8n llama a la API de Wise. Wise transfiere pesos colombianos a la cuenta del creator en menos de 10 minutos — con tasa de cambio mejor que cualquier banco."` | Diagrama: Mercury → n8n → Wise → Bancolombia/Nequi. Cada paso iluminado. | Overlay: "<10 min tasa mejor". |
| 28-42s | `"La magia: cada pago lleva un idempotency key. Si la función se dispara dos veces, la segunda se descarta. Nunca pagamos doble. Clave para no perder plata ni confianza."` | Código: uso de idempotency_key en llamada Wise API. Log de intento duplicado marcado "SKIPPED". | Overlay en verde: "idempotency = blindaje". |
| 42-55s | `"Antes: yo mandaba pagos manualmente los viernes, 3 horas de chamba. Ahora: sale solo cuando se aprueba. El creator cobra más rápido, yo no pierdo viernes. Todos ganan."` | Samuel a cámara + calendario con viernes liberados. | Overlay: "viernes libres = bonus". |

## Prosody ElevenLabs
- `<prosody rate="98%">` base.
- `<emphasis level="strong">` en: "sin banco tradicional", "idempotency key", "Todos ganan", "viernes libres".
- `<break time="0.4s"/>` antes de: "La magia", "Todos ganan".

## B-roll requerido
- Mapa USA/Colombia con flecha
- Dashboard Mercury anonimizado
- Diagrama de flujo de pagos
- Código con idempotency_key
- Log de intento duplicado skipped
- Talking head

## Retención loop
El viewer quiere saber "¿cómo tasa de cambio?" y "¿idempotency qué?". Respuestas en el video mantienen el pulso. Comentarios se llenan de freelancers preguntando por Mercury.

## CTA
"Arquitectura detallada de pagos + código idempotency en mi perfil. Si tenés equipo internacional, guardá esto."

## Por qué funciona
Problema real de freelancers/agencias LATAM (cobrar USA + pagar local). Solución concreta con stack nombrado. Insight técnico crítico (idempotency) que poca gente conoce. Alto share rate entre comunidad LATAM digital.
