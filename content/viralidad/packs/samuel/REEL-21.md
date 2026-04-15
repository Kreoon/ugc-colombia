---
slug: samuel-R21
title: "Construí Kreoon en 4 meses, solo. Te muestro el commit 1"
assigned_creator: samuel@ugccolombia.co
pillar: craft_visible
platform: instagram_reel
duration_seconds: 55
hook: "4 meses, 1 dev, 847 commits. Este es el commit número 1 de Kreoon."
category: viral-pack
source_pack: samuel
scenes:
  - id: 1
    time: "0-3s"
    visual: "Terminal a pantalla completa con git log --reverse | head -1, zoom progresivo al hash del commit"
    voice: "4 meses, 1 dev, 847 commits. Este es el commit uno."
    creator_action: "Samuel narra en off, manos sobre teclado mecánico, mirada al monitor"
    editing: "Cut seco a los 3s. Texto overlay amarillo Anton: COMMIT #1. Sonido tipo terminal beep al hash."
    broll:
      - "Terminal con git log --reverse"
      - "Macro de teclado mecánico iluminado"
  - id: 2
    time: "3-10s"
    visual: "Split screen: README.md vacío a la izquierda, fecha del commit (dic 2025) a la derecha"
    voice: "Empezó así: un README vacío, un package.json, y una idea — dejar de pagar Airtable. Miren la fecha: diciembre 2025."
    creator_action: "Voz en off, screen recording sin cámara"
    editing: "Zoom in 8% a la fecha al decir 'Miren la fecha'. Overlay: dic 2025 → abr 2026."
    broll:
      - "README.md vacío en VS Code"
      - "package.json inicial"
      - "Captura de Airtable billing tachada"
  - id: 3
    time: "10-22s"
    visual: "Diagrama Excalidraw del schema Supabase animándose: tabla creators aparece, tabla briefs aparece, línea de relación se dibuja mal (rojo), se borra, se redibuja bien"
    voice: "Mes uno fue schema de Supabase. Tablas de creators, briefs, deliverables. Me equivoqué tres veces en la relación brief→creator antes de entender que era many-to-many con metadata."
    creator_action: "Voz en off mientras se ve el diagrama animado"
    editing: "Flash rojo de 200ms en cada error. Tic verde al fix. Overlay: many-to-many + metadata."
    broll:
      - "Diagrama animado del schema Supabase"
      - "Snapshots de los 3 commits del fix"
  - id: 4
    time: "22-35s"
    visual: "Screen recording del endpoint /match corriendo en Postman/curl, resultados aparecen con scores de similitud. Cut a VS Code mostrando historial git del prompt"
    voice: "Mes dos y tres: el matching con IA. Claude analiza el brief, genera embeddings, pgvector encuentra los 5 creators con mejor similitud semántica. Escribí el prompt 40 veces."
    creator_action: "Voz en off, demo en pantalla"
    editing: "Contador animado que pasa de 'prompt v1' a 'prompt v40' a velocidad acelerada. Resaltar score top en amarillo."
    broll:
      - "Endpoint /match con response JSON"
      - "Historial git del prompt en 40 versiones"
      - "Diagrama embeddings → pgvector"
  - id: 5
    time: "35-48s"
    visual: "Terminal mostrando log de un pago con idempotency_key destacada. Cut a dashboard Wise/Mercury"
    voice: "Mes cuatro: pagos. Wise + Mercury con idempotencia, porque el día que pagas dos veces al mismo creator entendés por qué existe esa palabra."
    creator_action: "Voz en off, screen recording"
    editing: "Overlay rojo: idempotency_key OBLIGATORIO. Pequeño meme emoji cara susto al mencionar 'dos veces'."
    broll:
      - "Log de pago con idempotency key"
      - "Dashboard Wise"
      - "Dashboard Mercury"
      - "Meme cara de susto"
  - id: 6
    time: "48-55s"
    visual: "Cut a dashboard de Kreoon en producción mostrando 30 creators, 12 clientes, 40 briefs/mes. End card con logo"
    voice: "847 commits después, Kreoon maneja 30 creators, 12 clientes, 40 briefs al mes. Y ya nadie paga Airtable en UGC Colombia."
    creator_action: "Samuel a cámara cierre breve"
    editing: "Música sube. CTA: stack completo en mi perfil. Logo Kreoon reveal con parallax."
    broll:
      - "Dashboard de Kreoon en producción"
      - "Logo Kreoon animado"
      - "Talking head Samuel cierre"
---

# samuel-R21 — Construí Kreoon en 4 meses, solo. Te muestro el commit 1

**Tipo:** BTS técnico + build-in-public
**Duración:** 55 segundos
**Voz:** Samuel talking head + screen recording VS Code
**Música:** Synth lo-fi tipo Fireship, baja en cortes clave

---

| Tiempo | Audio / Voz | Visual | Notas de edición |
|--------|-------------|--------|------------------|
| 0-3s | `"4 meses, 1 dev, 847 commits. Este es el commit uno."` | Terminal: `git log --reverse \| head -1` con zoom al hash. | Texto overlay amarillo: "COMMIT #1". Cut seco a los 3s. |
| 3-10s | `"Empezó así: un README vacío, un package.json, y una idea — dejar de pagar Airtable. Miren la fecha: diciembre 2025."` | Split screen: README.md vacío a la izq, fecha del commit a la der. | Zoom in a la fecha. Overlay: "dic 2025 → abr 2026". |
| 10-22s | `"Mes uno fue schema de Supabase. Tablas de creators, briefs, deliverables. Me equivoqué tres veces en la relación brief→creator antes de entender que era many-to-many con metadata."` | Diagrama del schema animándose: tabla aparece, línea de relación se dibuja mal, se borra, se dibuja bien. | Flash rojo en el error. Overlay: "many-to-many + metadata". |
| 22-35s | `"Mes dos y tres: el matching con IA. Claude analiza el brief, genera embeddings, pgvector encuentra los 5 creators con mejor similitud semántica. Escribí el prompt 40 veces."` | Screen recording: endpoint `/match` corriendo, resultados aparecen con scores. Luego VS Code con historial de versiones del prompt. | Contador animado: "prompt v1 → v40". |
| 35-48s | `"Mes cuatro: pagos. Wise + Mercury con idempotencia, porque el día que pagas dos veces al mismo creator entendés por qué existe esa palabra."` | Terminal mostrando log de un pago con idempotency key. Luego Stripe/Wise dashboard. | Overlay en rojo: "idempotency_key OBLIGATORIO". Pequeño meme: emoji cara de susto. |
| 48-55s | `"847 commits después, Kreoon maneja 30 creators, 12 clientes, 40 briefs al mes. Y ya nadie paga Airtable en UGC Colombia."` | Cut a dashboard de Kreoon en producción, números reales. Final en tarjeta con logo. | Música sube. CTA: "stack completo en mi perfil". |

## Prosody ElevenLabs
- `<prosody rate="98%">` base — ritmo Fireship.
- `<emphasis level="strong">` en: "847 commits", "me equivoqué tres veces", "40 veces", "dos veces al mismo creator".
- `<break time="0.4s"/>` antes de: "Miren la fecha", "entendés por qué existe esa palabra".

## B-roll requerido
- Terminal con `git log --reverse`
- VS Code mostrando README.md y package.json iniciales
- Diagrama animado del schema Supabase (Excalidraw o similar)
- Screen recording del endpoint de matching
- Historial del prompt en 40 versiones (pueden ser snapshots reales)
- Dashboard de Kreoon en producción

## Retención loop
El número de commits (847) es tan específico que el viewer duda y quiere confirmarlo. El final te invita a ver el stack completo, forzando el salto al siguiente reel o al perfil.

## CTA
"Stack completo (Next 15 + Supabase + Claude + n8n) en mi perfil. Guardá esto si estás construyendo algo parecido."

## Por qué funciona
Autoridad por transparencia extrema (commits, fechas, número de errores). Build-in-public puro tipo Theo Browne: "me equivoqué 3 veces" + "escribí el prompt 40 veces" desactiva el filtro anti-marketing. La curiosidad del hook (commit #1 de un producto que ya existe) es irresistible para devs.
