---
slug: samuel-R42
title: "El bug que nos costó 3 horas — debug en vivo"
assigned_creator: samuel@ugccolombia.co
pillar: craft_visible
platform: youtube_shorts
duration_seconds: 55
hook: "Un bug nos tumbó 3 horas. La causa fue una coma. En serio."
category: viral-pack
source_pack: samuel
scenes:
  - id: 1
    time: "0-3s"
    visual: "Pantalla negra. '3 HORAS' aparece grande en rojo con efecto glitch"
    voice: "Un bug nos tumbó 3 horas. La causa fue una coma. En serio. Mirá."
    creator_action: "Voz en off, sin cámara"
    editing: "Texto overlay Anton: 1 COMA = 3h. Sonido tipo glitch al inicio."
    broll:
      - "Texto 3 HORAS glitch"
      - "Fondo negro"
  - id: 2
    time: "3-13s"
    visual: "Recreación: Alexander frente a su laptop clickeando 'generar brief'. Pantalla con error 500. Cut a Vercel dashboard todo verde"
    voice: "Martes pasado. Alexander prueba Kreoon en producción. Click en generar brief. Error 500. Nada aparece en los logs. Vercel todo verde."
    creator_action: "B-roll de Alexander en su workspace; voz en off"
    editing: "Overlay: todo verde en dashboard. Contraste rojo (error) vs verde (Vercel)."
    broll:
      - "Alexander clickeando"
      - "Pantalla error 500"
      - "Vercel dashboard verde"
  - id: 3
    time: "13-28s"
    visual: "Screen: código en VS Code. Cut a terminal local con éxito. Cut a dev tools mostrando error en producción"
    voice: "Reviso función serverless. Llamada a Claude API, parsea JSON, guarda en Supabase. Todo parece fino. Corrí el script local — funciona. En prod — falla."
    creator_action: "Voz en off, screen recording"
    editing: "Overlay rojo: local OK / prod FAIL. Split entre los dos entornos."
    broll:
      - "Código VS Code"
      - "Terminal local OK"
      - "Dev tools error prod"
  - id: 4
    time: "28-45s"
    visual: "Zoom dramático a JSON con trailing comma resaltada en rojo. Cut a diagrama Node 18 (perdona) vs Node 20 (estricto)"
    voice: "Tres horas después. Estaba aquí — en la respuesta de Claude. A veces devolvía JSON con una coma final. Un trailing comma. JSON.parse estricto lo rechazaba. Local corría Node 18 que lo perdonaba. Prod corre Node 20 que no."
    creator_action: "Voz en off, screen recording dramático"
    editing: "Resaltar la coma con círculo rojo pulsante. Overlay: Node 18 ≠ Node 20."
    broll:
      - "JSON con trailing comma"
      - "Diagrama Node 18 vs 20"
      - "Highlight rojo en la coma"
  - id: 5
    time: "45-55s"
    visual: "Samuel a cámara cierre. Cut a código del fix con try-catch y JSON5 fallback"
    voice: "Fix: envolví el parse en try-catch con fallback a JSON5. 10 líneas. 3 horas perdidas por un ambiente distinto. Siempre matcheá Node local con prod. Siempre."
    creator_action: "Samuel a cámara, gesto firme al repetir 'siempre'"
    editing: "Overlay amarillo: local version = prod version. Música sube en el cierre."
    broll:
      - "Talking head Samuel"
      - "Código del fix"
      - "End card .nvmrc"
---

# samuel-R42 — El bug que nos costó 3 horas — debug en vivo

**Tipo:** BTS debug + lección
**Duración:** 55 segundos
**Voz:** Samuel storytelling + recreación
**Música:** Suspenso → resolución

---

| Tiempo | Audio / Voz | Visual | Notas de edición |
|--------|-------------|--------|------------------|
| 0-3s | `"Un bug nos tumbó 3 horas. La causa fue una coma. En serio. Mirá."` | Pantalla negra con "3 HORAS" en rojo apareciendo. | Texto overlay: "1 COMA = 3h". |
| 3-13s | `"Martes pasado. Alexander prueba Kreoon en producción. Click en 'generar brief'. Error 500. Nada aparece en los logs. Vercel todo verde."` | Recreación: Alexander clickeando. Pantalla error. Vercel dashboard verde. | Overlay: "todo verde en dashboard". |
| 13-28s | `"Reviso función serverless. Llamada a Claude API, parsea JSON, guarda en Supabase. Todo parece fino. Corrí el script local — funciona. En prod — falla."` | Screen: código en VS Code, ejecución local OK, dev tools con error en prod. | Overlay en rojo: "local OK / prod FAIL". |
| 28-45s | `"Tres horas después. Estaba aquí — en la respuesta de Claude. A veces devolvía JSON con una coma final. Un trailing comma. JSON.parse estricto lo rechazaba. Local corría Node 18 que lo perdonaba. Prod corre Node 20 que no."` | Zoom a JSON con trailing comma resaltada. Diagrama Node 18 vs Node 20. | Resaltar la coma. Overlay: "Node 18 ≠ Node 20". |
| 45-55s | `"Fix: envolví el parse en try-catch con fallback a JSON5. 10 líneas. 3 horas perdidas por un ambiente distinto. Siempre matcheá Node local con prod. Siempre."` | Samuel a cámara. Código del fix. Card final. | Overlay en amarillo: "local version = prod version". |

## Prosody ElevenLabs
- `<prosody rate="97%">` base — narrativo.
- `<emphasis level="strong">` en: "una coma", "trailing comma", "3 horas perdidas", "siempre".
- `<break time="0.6s"/>` antes de: "Tres horas después", "Siempre matcheá".

## B-roll requerido
- Recreación Alexander clickeando con error
- Vercel dashboard verde
- VS Code con código
- Dev tools con error
- JSON con trailing comma
- Diagrama Node 18 vs 20
- Código del fix
- Talking head cierre

## Retención loop
Storytelling con misterio ("la causa fue una coma") mantiene tensión. La resolución sorprendente (ambiente Node distinto) valida el detective work. Lección accionable al final.

## CTA
"Mi .nvmrc setup + script de verificación de versión en mi perfil. No te pase."

## Por qué funciona
Postmortem compartible + lección reusable. Devs se identifican al instante con bugs ambientales. Transparencia sobre fallos construye autoridad. Tipo Fireship en el ritmo narrativo.
