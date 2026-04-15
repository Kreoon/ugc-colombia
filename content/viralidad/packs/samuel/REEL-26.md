---
slug: samuel-R26
title: "1 video → 1 reel + 1 carrusel + 1 email. Auto."
assigned_creator: samuel@ugccolombia.co
pillar: casos_resultados
platform: tiktok
duration_seconds: 60
hook: "Subimos un video de 12 minutos. En 4 minutos teníamos 4 piezas más. Automático."
category: viral-pack
source_pack: samuel
scenes:
  - id: 1
    time: "0-3s"
    visual: "Split: video original de 12 min en thumbnail grande + 4 miniaturas saliendo en abanico (reel, carrusel, email, tweet)"
    voice: "Subimos un video de 12 minutos. En 4 minutos teníamos 4 piezas más. Automático."
    creator_action: "Voz en off, sin cámara"
    editing: "Texto overlay grande Anton: 1 INPUT → 4 OUTPUTS. Cut rápido. Beat sincronizado al cut."
    broll:
      - "Thumbnail video original"
      - "4 thumbnails saliendo en abanico"
  - id: 2
    time: "3-12s"
    visual: "Diagrama animado del pipeline empezando: nodo Google Drive → trigger n8n → Whisper API. Contador de centavos animándose"
    voice: "El pipeline es este. Input: video en Google Drive. Trigger: n8n detecta el upload. Paso 1: Whisper API transcribe el audio. Cuesta 6 centavos para 12 minutos."
    creator_action: "Voz en off, diagrama dinámico"
    editing: "Cada nodo aparece secuencial. Counter de $ animado: $0.00 → $0.06. Overlay: $0.06 por transcripción."
    broll:
      - "Diagrama pipeline (Excalidraw)"
      - "Logo Whisper"
      - "Counter de centavos"
  - id: 3
    time: "12-25s"
    visual: "Pantalla con transcript dividiéndose en bloques de colores (chunks semánticos). Cada bloque obtiene un tic verde"
    voice: "Paso 2: Claude recibe el transcript y lo parte en chunks semánticos. No por tiempo — por idea. Cada idea se convierte en un candidato para reel corto."
    creator_action: "Voz en off, animación de chunks"
    editing: "Resaltar 'chunks semánticos' con flecha animada. Overlay: idea ≠ minuto."
    broll:
      - "Transcript dividiéndose"
      - "Bloques con colores"
      - "Tic verde por chunk"
  - id: 4
    time: "25-40s"
    visual: "Diagrama: 1 nodo central (Claude) → 3 prompts en paralelo (reel, carrusel, newsletter) → 3 outputs. Nodos laterales se iluminan simultáneamente"
    voice: "Paso 3: fan-out. El mismo transcript va a 3 prompts diferentes. Uno genera guión de reel de 60 segundos. Otro genera copy de carrusel de 8 slides. Otro genera newsletter de 400 palabras. En paralelo."
    creator_action: "Voz en off, diagrama animado"
    editing: "Iluminar los 3 nodos al mismo tiempo en el segundo 33. Sound effect tipo whoosh paralelo."
    broll:
      - "Diagrama fan-out"
      - "3 outputs en paralelo"
      - "Iconos reel/carrusel/email"
  - id: 5
    time: "40-52s"
    visual: "Comparativa lado a lado: output crudo con fragmentos en rojo (jerga IA) vs output humanizado en verde (modismos UGC Colombia). Cut a vista de Notion con piezas listas"
    voice: "Paso 4: humanizer pass. Otro prompt reescribe todo en voz UGC Colombia — sin jerga de IA, con modismos nuestros. Y al final, todo cae en Notion listo para revisar. 4 minutos end-to-end."
    creator_action: "Voz en off, comparativa de pantalla"
    editing: "Overlay: antes / después humanizer. Highlight rojo en jerga, verde en humanizado."
    broll:
      - "Output crudo vs humanizado"
      - "Captura Notion con piezas"
      - "Iconos antes/después"
  - id: 6
    time: "52-60s"
    visual: "Samuel a cámara cierre. Final con diagrama completo de pipeline en background"
    voice: "No genera contenido perfecto. Genera primer draft. Diana o yo lo editamos en 10 minutos. Eso es IA útil — asistente, no reemplazo."
    creator_action: "Samuel a cámara, gesto firme con la mano al decir 'asistente, no reemplazo'"
    editing: "Texto overlay final Anton: asistente, no reemplazo. Música sube y baja al cierre."
    broll:
      - "Talking head Samuel"
      - "Pipeline completo background"
      - "End card UGC Colombia"
---

# samuel-R26 — 1 video → 1 reel + 1 carrusel + 1 email. Auto.

**Tipo:** Caso real + pipeline de repurposing
**Duración:** 60 segundos
**Voz:** Samuel en off + diagrama de pipeline
**Música:** Electrónica rítmica

---

| Tiempo | Audio / Voz | Visual | Notas de edición |
|--------|-------------|--------|------------------|
| 0-3s | `"Subimos un video de 12 minutos. En 4 minutos teníamos 4 piezas más. Automático."` | Split: video original + 4 miniaturas saliendo (reel, carrusel, email, tweet). | Texto overlay: "1 INPUT → 4 OUTPUTS". |
| 3-12s | `"El pipeline es este. Input: video en Google Drive. Trigger: n8n detecta el upload. Paso 1: Whisper API transcribe el audio. Cuesta 6 centavos para 12 minutos."` | Diagrama animado del pipeline. Nodo de Whisper con contador de centavos. | Overlay: "$0.06 por transcripción". |
| 12-25s | `"Paso 2: Claude recibe el transcript y lo parte en chunks semánticos. No por tiempo — por idea. Cada idea se convierte en un candidato para reel corto."` | Pantalla: transcript dividiéndose en bloques con colores. Cada bloque con un tic. | Resaltar "chunks semánticos" con flecha. Overlay: "idea ≠ minuto". |
| 25-40s | `"Paso 3: fan-out. El mismo transcript va a 3 prompts diferentes. Uno genera guión de reel de 60 segundos. Otro genera copy de carrusel de 8 slides. Otro genera newsletter de 400 palabras. En paralelo."` | Diagrama: 1 nodo → 3 prompts en paralelo → 3 outputs. | Nodos laterales iluminándose simultáneamente. |
| 40-52s | `"Paso 4: humanizer pass. Otro prompt reescribe todo en voz UGC Colombia — sin jerga de IA, con modismos nuestros. Y al final, todo cae en Notion listo para revisar. 4 minutos end-to-end."` | Comparativa: output crudo (marcado en rojo) vs output humanizado (verde). Notion al final. | Overlay: "antes / después humanizer". |
| 52-60s | `"No genera contenido perfecto. Genera primer draft. Diana o yo lo editamos en 10 minutos. Eso es IA útil — asistente, no reemplazo."` | Samuel a cámara, final con diagrama completo. | Texto overlay: "asistente, no reemplazo". |

## Prosody ElevenLabs
- `<prosody rate="98%">` base.
- `<emphasis level="strong">` en: "4 minutos", "6 centavos", "en paralelo", "asistente, no reemplazo".
- `<break time="0.4s"/>` antes de: "Paso 3", "Paso 4", "Eso es IA útil".

## B-roll requerido
- Pipeline animado completo (Excalidraw o Figma)
- Screen recording de Whisper API
- Transcript siendo dividido en chunks (puede ser mock)
- Diagrama de fan-out con 3 prompts paralelos
- Comparativa output crudo vs humanizado
- Notion con piezas listas

## Retención loop
El tiempo "4 minutos end-to-end" contradice la expectativa (debería ser horas). El costo de $0.06 es absurdamente bajo y la gente duda. Comentarios explotan con "¿y el prompt del humanizer?".

## CTA
"Si te interesa el código del pipeline, dejo link al repo mañana. Guardá esto."

## Por qué funciona
Repurposing es hype constante — pero pocos muestran la arquitectura real. Números exactos ($0.06, 4 minutos) + estructura clara (4 pasos) + honestidad final ("no reemplazo"). La frase "asistente, no reemplazo" desactiva el escepticismo de creadores anti-IA y los convierte en fans.
