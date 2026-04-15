---
slug: samuel-R32
title: "El cliente que venía con 120 videos en Excel — cómo migramos"
assigned_creator: samuel@ugccolombia.co
pillar: casos_resultados
platform: instagram_reel
duration_seconds: 55
hook: "Un cliente nuevo nos mandó 120 videos en un Excel. En 2 horas estaban todos en Kreoon."
category: viral-pack
source_pack: samuel
scenes:
  - id: 1
    time: "0-3s"
    visual: "Split: Excel crudo desordenado a la izquierda → dashboard Kreoon ordenado con 120 videos a la derecha"
    voice: "Un cliente nuevo nos mandó 120 videos en un Excel. En 2 horas estaban todos en Kreoon, indexados y taggeados."
    creator_action: "Voz en off, sin cámara"
    editing: "Overlay grande Anton: EXCEL → KREOON en 2h. Cut seco a los 3s."
    broll:
      - "Excel crudo desordenado"
      - "Dashboard Kreoon ordenado"
  - id: 2
    time: "3-13s"
    visual: "Excel scrolleando rápido, resaltando columnas caóticas (links de Drive, descripciones libres, nombres rarísimos)"
    voice: "Problema: Excel con links a Drive, descripciones libres, nombres de archivo rarísimos. Nada normalizado. Imposible de usar en producción."
    creator_action: "Voz en off, screen recording Excel"
    editing: "Overlay rojo: datos sucios. Highlight rojo sobre columnas problemáticas."
    broll:
      - "Excel scrolling"
      - "Highlights rojos en columnas"
  - id: 3
    time: "13-28s"
    visual: "Diagrama 5 pasos animándose secuencial: CSV → Drive API → Whisper → Claude → Supabase. Cut a terminal con script corriendo y progress bar 120/120"
    voice: "Script de migración. Paso 1: leí el CSV con Node. Paso 2: por cada row, descargué el video de Drive API. Paso 3: Whisper transcribió el audio. Paso 4: Claude clasificó por nicho, formato, y calidad. Paso 5: todo entró a Supabase con metadata limpia."
    creator_action: "Voz en off, animación + screen recording"
    editing: "Cada paso aparece con un tic verde. Overlay: 5 pasos / 1 script. Progress bar acelerado."
    broll:
      - "Diagrama 5 pasos"
      - "Terminal con progress bar"
      - "Iconos por paso"
  - id: 4
    time: "28-42s"
    visual: "Dashboard Kreoon con búsqueda semántica. Query en vivo: 'ganchos de skincare con humor' devuelve 8 videos relevantes"
    voice: "Corrí el script una vez. Tardó 1h 40min. Costo: 14 dólares en IA. Resultado: 120 videos con tags, transcripciones, calidad score. Buscables por texto libre — 'ganchos de skincare con humor' devuelve 8 videos."
    creator_action: "Voz en off, screen recording demo"
    editing: "Overlay: búsqueda semántica = ON. Counter $14 destacado. Highlight a la query y a los resultados."
    broll:
      - "Dashboard Kreoon búsqueda"
      - "Query semántica en vivo"
      - "8 videos resultado"
  - id: 5
    time: "42-55s"
    visual: "Samuel a cámara cierre. Cut a mock de firma de contrato con DocuSign / pluma animada"
    voice: "El cliente vio la base ordenada y cerró el contrato anual en la demo. La migración no es trabajo pesado — si tenés el script correcto, es una tarde."
    creator_action: "Samuel a cámara, leve sonrisa al decir 'cerró el contrato anual'"
    editing: "Overlay final Anton: migración = cierre de venta. Música sube en 'una tarde'."
    broll:
      - "Talking head Samuel"
      - "Mock firma contrato"
      - "End card CTA"
---

# samuel-R32 — El cliente que venía con 120 videos en Excel — cómo migramos

**Tipo:** Caso real + script de migración
**Duración:** 55 segundos
**Voz:** Samuel en off + screen recording
**Música:** Instrumental tech cálida

---

| Tiempo | Audio / Voz | Visual | Notas de edición |
|--------|-------------|--------|------------------|
| 0-3s | `"Un cliente nuevo nos mandó 120 videos en un Excel. En 2 horas estaban todos en Kreoon, indexados y taggeados."` | Pantalla: Excel crudo + luego dashboard Kreoon con 120 videos ordenados. | Overlay: "EXCEL → KREOON en 2h". |
| 3-13s | `"Problema: Excel con links a Drive, descripciones libres, nombres de archivo rarísimos. Nada normalizado. Imposible de usar en producción."` | Excel scrolleando, resaltando columnas caóticas. | Overlay en rojo: "datos sucios". |
| 13-28s | `"Script de migración. Paso 1: leí el CSV con Node. Paso 2: por cada row, descargué el video de Drive API. Paso 3: Whisper transcribió el audio. Paso 4: Claude clasificó por nicho, formato, y calidad. Paso 5: todo entró a Supabase con metadata limpia."` | Diagrama 5 pasos animándose. Terminal corriendo el script, progress bar 120/120. | Cada paso aparece con un "tic". Overlay: "5 pasos / 1 script". |
| 28-42s | `"Corrí el script una vez. Tardó 1h 40min. Costo: 14 dólares en IA. Resultado: 120 videos con tags, transcripciones, calidad score. Buscables por texto libre — 'ganchos de skincare con humor' devuelve 8 videos."` | Dashboard Kreoon con búsqueda semántica funcionando. Query en vivo. | Overlay: "búsqueda semántica = ON". |
| 42-55s | `"El cliente vio la base ordenada y cerró el contrato anual en la demo. La migración no es trabajo pesado — si tenés el script correcto, es una tarde."` | Cierre con Samuel a cámara. Cut a un mock de firma de contrato. | Overlay: "migración = cierre de venta". |

## Prosody ElevenLabs
- `<prosody rate="98%">` base.
- `<emphasis level="strong">` en: "2 horas", "datos sucios", "14 dólares en IA", "cerró el contrato anual".
- `<break time="0.4s"/>` antes de: "Resultado", "El cliente vio".

## B-roll requerido
- Excel crudo scrolleando
- Dashboard Kreoon ordenado
- Diagrama 5 pasos animado
- Terminal con progress bar de script
- Demo de búsqueda semántica en Kreoon
- Mock de firma de contrato

## Retención loop
El número 14 dólares vs cerrar contrato anual es contraste brutal. El tip final ("migración como cierre de venta") es reutilizable y se comparte.

## CTA
"Script base de migración en mi perfil. Adaptalo a tu caso."

## Por qué funciona
Caso B2B real + script reutilizable + insight comercial (migración como técnica de cierre). Va más allá del "mira qué bonito mi tech" y muestra cómo el stack genera revenue. Combina audiencia técnica y de negocios.
