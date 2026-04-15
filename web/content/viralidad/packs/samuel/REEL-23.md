---
slug: samuel-R23
title: "40 horas al mes → 2 horas. El workflow n8n real"
assigned_creator: samuel@ugccolombia.co
pillar: casos_resultados
platform: tiktok
duration_seconds: 55
hook: "Diana gastaba 40 horas al mes mandando briefs a mano. Ahora son 2."
category: viral-pack
source_pack: samuel
scenes:
  - id: 1
    time: "0-3s"
    visual: "Pantalla dividida: calendario con 40 horas tachadas en rojo a la izquierda vs solo 2 horas verdes a la derecha"
    voice: "Diana gastaba 40 horas al mes mandando briefs a mano. Ahora son 2. Así lo hicimos."
    creator_action: "Voz en off de Samuel, sin cámara"
    editing: "Texto overlay grande Anton: 40h → 2h. Cut rápido a los 3s. Sonido tipo notification."
    broll:
      - "Calendario animado horas tachadas"
      - "Comparativa visual 40 vs 2"
  - id: 2
    time: "3-10s"
    visual: "Recreación: Diana frente a laptop con spreadsheet de Excel y WhatsApp Web abiertos en split screen. Reloj animado corriendo"
    voice: "El problema: cada brief aprobado necesitaba que Diana copiara el texto, buscara el creator, personalizara el mensaje y lo mandara por WhatsApp. Entre 15 y 20 minutos por brief."
    creator_action: "B-roll de Diana actuando el flujo manual; Samuel narra en off"
    editing: "Overlay: 15-20 min × brief. Reloj con segundos contando rápido."
    broll:
      - "Diana con spreadsheet"
      - "WhatsApp Web abierto"
      - "Reloj contando"
  - id: 3
    time: "10-25s"
    visual: "Screen recording del canvas n8n: 3 nodos visibles (Supabase trigger → JS code → WhatsApp API). Cada nodo se ilumina al mencionarlo"
    voice: "El workflow n8n es este. Trigger: cuando un brief en Supabase pasa a estado 'approved'. Paso 2: nodo JavaScript que saca el creator asignado y arma el mensaje con variables. Paso 3: nodo de WhatsApp Cloud API que lo manda."
    creator_action: "Voz en off, demo de pantalla"
    editing: "Cada nodo aparece con un ping sonoro. Labels animados: TRIGGER / JS / WA API. Zoom suave a cada bloque."
    broll:
      - "Canvas n8n con workflow"
      - "Zoom a cada nodo"
      - "Labels animados"
  - id: 4
    time: "25-38s"
    visual: "Screen del historial de ejecuciones n8n con timestamp 10:42 y duración 1.8s. Cut a captura del WhatsApp recibido (mock con datos prueba)"
    voice: "Miren la ejecución real. Brief aprobado a las 10:42. Workflow corre en 1.8 segundos. El creator recibe el WhatsApp con nombre, producto, deadline, link de referencia. Todo personalizado, cero copy-paste."
    creator_action: "Voz en off, screen recording continuo"
    editing: "Resaltar 1.8s con highlight amarillo. Flechas animadas sobre cada campo del WhatsApp señalando 'dinámico'."
    broll:
      - "Historial ejecuciones n8n"
      - "Mock mensaje WhatsApp"
      - "Flechas overlay sobre campos"
  - id: 5
    time: "38-48s"
    visual: "Split: calendario con 38h en verde a la izquierda + Diana en un shoot real con creator (b-roll archivo) a la derecha"
    voice: "Resultado: 38 horas al mes recuperadas. Diana ahora las usa para dirigir shoots. Eso es lo que hace una automatización buena — libera tiempo para trabajo creativo, no lo reemplaza."
    creator_action: "Voz en off; b-roll de Diana en shoot real"
    editing: "Overlay verde: +38h/mes trabajo creativo. Transición suave entre los dos elementos del split."
    broll:
      - "Calendario verde con 38h"
      - "B-roll Diana en shoot"
      - "Creator grabando UGC"
  - id: 6
    time: "48-55s"
    visual: "Samuel a cámara breve en estudio. Cut a CTA card con texto y QR opcional"
    voice: "Si tenés una agencia y seguís mandando briefs a mano, esto lo arma cualquiera que sepa n8n en una tarde."
    creator_action: "Samuel a cámara, gesto invitando con la mano"
    editing: "Música sube. Texto Anton: plantilla n8n → perfil. Cut limpio."
    broll:
      - "Talking head Samuel"
      - "End card con CTA"
---

# samuel-R23 — 40 horas al mes → 2 horas. El workflow n8n real

**Tipo:** Caso real + demo n8n
**Duración:** 55 segundos
**Voz:** Samuel en off + screen recording n8n completo
**Música:** Beat upbeat sutil

---

| Tiempo | Audio / Voz | Visual | Notas de edición |
|--------|-------------|--------|------------------|
| 0-3s | `"Diana gastaba 40 horas al mes mandando briefs a mano. Ahora son 2. Así lo hicimos."` | Pantalla dividida: calendario con 40 horas tachadas vs 2 horas. | Texto overlay: "40h → 2h". Cut rápido. |
| 3-10s | `"El problema: cada brief aprobado necesitaba que Diana copiara el texto, buscara el creator, personalizara el mensaje y lo mandara por WhatsApp. Entre 15 y 20 minutos por brief."` | Recreación: Diana con un spreadsheet y WhatsApp Web abiertos. Reloj animado. | Overlay: "15-20 min × brief". |
| 10-25s | `"El workflow n8n es este. Trigger: cuando un brief en Supabase pasa a estado 'approved'. Paso 2: nodo JavaScript que saca el creator asignado y arma el mensaje con variables. Paso 3: nodo de WhatsApp Cloud API que lo manda."` | Screen recording del canvas n8n: cada nodo se ilumina al mencionarlo. Zoom a cada bloque. | Cada nodo aparece con un "ping" sonoro. Labels: "TRIGGER / JS / WA API". |
| 25-38s | `"Miren la ejecución real. Brief aprobado a las 10:42. Workflow corre en 1.8 segundos. El creator recibe el WhatsApp con nombre, producto, deadline, link de referencia. Todo personalizado, cero copy-paste."` | Screen: historial de ejecuciones n8n. Luego captura del mensaje WhatsApp recibido (mock con datos de prueba). | Resaltar tiempo de ejecución "1.8s". Overlay flechas sobre el mensaje: "dinámico". |
| 38-48s | `"Resultado: 38 horas al mes recuperadas. Diana ahora las usa para dirigir shoots. Eso es lo que hace una automatización buena — libera tiempo para trabajo creativo, no lo reemplaza."` | Split: calendario con horas en verde + Diana en un shoot real (b-roll de archivo). | Overlay: "+38h/mes trabajo creativo". |
| 48-55s | `"Si tenés una agencia y seguís mandando briefs a mano, esto lo arma cualquiera que sepa n8n en una tarde."` | Samuel a cámara breve + CTA card. | Música sube. Texto: "plantilla n8n → perfil". |

## Prosody ElevenLabs
- `<prosody rate="97%">` base.
- `<emphasis level="strong">` en: "40 horas", "2 horas", "1.8 segundos", "38 horas al mes", "en una tarde".
- `<break time="0.4s"/>` antes de: "Resultado", "Eso es lo que hace".

## B-roll requerido
- Calendario animado con horas tachadas
- Recreación Diana con spreadsheet + WhatsApp Web
- Screen recording del workflow n8n real (anonimizar credenciales)
- Historial de ejecuciones n8n
- Mock de mensaje WhatsApp recibido
- B-roll de Diana en un shoot

## Retención loop
El número 1.8s es tan pequeño que el viewer regresa a verlo. La promesa "cualquiera lo arma en una tarde" empuja a guardar el video para hacerlo después.

## CTA
"Dejo la plantilla del workflow en el link de mi perfil. Gratis, sin email. Solo pegá tus credenciales."

## Por qué funciona
Caso concreto con ahorro específico (40→2) + demo en vivo (no promesa) + democratización ("cualquiera en una tarde"). Estilo Fireship: explicación rápida sin jerga innecesaria. El viewer no-técnico queda convencido de que es factible, el técnico lo guarda como referencia.
