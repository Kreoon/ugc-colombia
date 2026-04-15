---
slug: samuel-R37
title: "Vercel costó $420 un mes — qué cambié"
assigned_creator: samuel@ugccolombia.co
pillar: data_angulos
platform: instagram_reel
duration_seconds: 55
hook: "Vercel me cobró $420 en un mes. Pánico. Investigué y encontré el bug raíz."
category: viral-pack
source_pack: samuel
scenes:
  - id: 1
    time: "0-3s"
    visual: "Captura de factura Vercel con $420 destacado en rojo gigante. Fondo oscuro"
    voice: "Vercel me cobró 420 dólares en un mes. Pánico. Investigué. Encontré el bug raíz."
    creator_action: "Voz en off, sin cámara"
    editing: "Overlay rojo Anton: $420 ???. Sonido tipo notification de pánico."
    broll:
      - "Factura Vercel $420"
      - "Highlight rojo"
  - id: 2
    time: "3-13s"
    visual: "Dashboard Vercel con gráfico mostrando pico de function invocations llegando a 4M"
    voice: "Normal pagamos 20 — el plan Pro. Un mes subió a 420. El culpable: function invocations — 4 millones."
    creator_action: "Voz en off, screen recording"
    editing: "Resaltar 4M con flecha roja animada. Counter de invocations."
    broll:
      - "Dashboard Vercel"
      - "Gráfico de pico"
      - "Counter 4M invocations"
  - id: 3
    time: "13-28s"
    visual: "Código del middleware en VS Code marcado en rojo. Diagrama: 1 page → 31 invocations explotando"
    voice: "Investigué. Era un middleware mal escrito. Cada request hacía fetch a nuestra API interna para validar sesión. Si el usuario cargaba una página con 30 imágenes, 30 invocations extra."
    creator_action: "Voz en off, screen recording + diagrama"
    editing: "Overlay: 31 requests / 1 página. Highlight rojo en código y diagrama de explosión."
    broll:
      - "Código middleware bug"
      - "Diagrama amplificación"
      - "31 requests overlay"
  - id: 4
    time: "28-42s"
    visual: "Código fixed en verde con cache de sesión KV. Cut a siguiente factura Vercel mostrando $18"
    voice: "Fix: cache de sesión en el edge con KV. 1 lookup, no 30. Reescribí el middleware en 40 minutos. El mes siguiente: 18 dólares. Diferencia: 402."
    creator_action: "Voz en off, screen recording"
    editing: "Overlay verde: −$402 con 40 min de código. Counter $420 → $18."
    broll:
      - "Código fix con KV"
      - "Factura $18"
      - "Counter ahorro"
  - id: 5
    time: "42-55s"
    visual: "Samuel a cámara con tono bajado. Cut a captura de alerta de billing configurada en Vercel"
    voice: "Moraleja: los errores de arquitectura no los ves en tests, los ves en la factura. Configurá alertas de billing el día uno. Yo aprendí caro."
    creator_action: "Samuel a cámara, mirada directa, gesto serio al decir 'aprendí caro'"
    editing: "Overlay final Anton: alertas = seguro de vida. Música baja al cierre."
    broll:
      - "Talking head Samuel"
      - "Alerta billing configurada"
      - "End card"
---

# samuel-R37 — Vercel costó $420 un mes — qué cambié

**Tipo:** Post-mortem + lección costo
**Duración:** 55 segundos
**Voz:** Samuel storytelling + screen recordings
**Música:** Dramático → resolución

---

| Tiempo | Audio / Voz | Visual | Notas de edición |
|--------|-------------|--------|------------------|
| 0-3s | `"Vercel me cobró 420 dólares en un mes. Pánico. Investigué. Encontré el bug raíz."` | Pantalla: factura Vercel con $420 destacado. | Overlay rojo: "$420 ???". |
| 3-13s | `"Normal pagamos 20 — el plan Pro. Un mes subió a 420. El culpable: function invocations — 4 millones."` | Dashboard Vercel: gráfico pico de invocations. | Resaltar 4M con flecha roja. |
| 13-28s | `"Investigué. Era un middleware mal escrito. Cada request hacía fetch a nuestra API interna para validar sesión. Si el usuario cargaba una página con 30 imágenes, 30 invocations extra."` | Código del middleware marcado en rojo. Diagrama: 1 page → 31 invocations. | Overlay: "31 requests / 1 página". |
| 28-42s | `"Fix: cache de sesión en el edge con KV. 1 lookup, no 30. Reescribí el middleware en 40 minutos. El mes siguiente: 18 dólares. Diferencia: 402."` | Código fixed en verde. Siguiente factura Vercel $18. | Overlay: "−$402 con 40 min de código". |
| 42-55s | `"Moraleja: los errores de arquitectura no los ves en tests, los ves en la factura. Configurá alertas de billing el día uno. Yo aprendí caro."` | Samuel a cámara, tono bajado. Captura de alerta de billing configurada. | Overlay: "alertas = seguro de vida". |

## Prosody ElevenLabs
- `<prosody rate="96%">` base — narrativo.
- `<emphasis level="strong">` en: "420 dólares", "Pánico", "402", "los ves en la factura".
- `<break time="0.6s"/>` antes de: "Era un middleware mal escrito", "Moraleja".

## B-roll requerido
- Factura Vercel $420 destacada
- Gráfico dashboard con pico de invocations
- Código del middleware con bug
- Diagrama de amplificación de requests
- Código del fix
- Factura siguiente mes $18
- Captura de alerta de billing

## Retención loop
Storytelling con conflicto (pánico) → investigación → solución. El número $402 de ahorro es la recompensa. "Aprendí caro" invita a comentarios de "a mí me pasó con X".

## CTA
"Mi configuración de alertas de billing Vercel en mi perfil. No te pase lo mismo."

## Por qué funciona
Postmortem público = vulnerabilidad + lección. Build-in-public real incluye las metidas de pata. Estilo Theo Browne (comparte errores abiertamente). Números específicos ($420, $18, 40 min) dan credibilidad. Lección accionable (alertas day one) se comparte.
