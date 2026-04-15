---
slug: samuel-R31
title: "Edge Functions de Supabase + IA = magia casi gratis"
assigned_creator: samuel@ugccolombia.co
pillar: data_angulos
platform: youtube_shorts
duration_seconds: 55
hook: "Esta edge function cuesta $0.0001 por ejecución y corre Claude. No es exageración."
category: viral-pack
source_pack: samuel
scenes:
  - id: 1
    time: "0-3s"
    visual: "Pantalla con $0.0001 en tipografía gigante. Cut a logos Supabase + Claude unidos por una flecha"
    voice: "Esta edge function cuesta 1 décima de centavo por ejecución. Y corre Claude. No es exageración."
    creator_action: "Voz en off, sin cámara"
    editing: "Texto overlay Anton: 1 DÉCIMA DE CENTAVO. Zoom al precio. Cut seco."
    broll:
      - "Número $0.0001 grande"
      - "Logos Supabase + Claude"
  - id: 2
    time: "3-12s"
    visual: "Terminal con comando supabase functions deploy analyze-brief. Output verde de éxito"
    voice: "Edge functions son Deno funciones que corren cerca del usuario. Cold start de 100 milisegundos. Despliegue con un comando: supabase functions deploy."
    creator_action: "Voz en off, screen recording terminal"
    editing: "Highlight verde en línea de éxito. Overlay: Deno + edge = rápido."
    broll:
      - "Terminal con deploy"
      - "Output success"
      - "Logo Deno"
  - id: 3
    time: "12-28s"
    visual: "Código TypeScript completo de la function en VS Code. Cut a demo en UI: crear brief, ver ángulos sugeridos aparecer en 2s"
    voice: "Caso real: cuando un cliente crea un brief, se dispara esta función. Llama a Claude con el texto, le pide ángulos UGC, devuelve JSON. El usuario ve los ángulos sugeridos en 2 segundos."
    creator_action: "Voz en off, screen recording"
    editing: "Resaltar la llamada a Claude en amarillo. Overlay: 2s end-to-end. Counter de segundos."
    broll:
      - "Código TypeScript edge function"
      - "Demo UI Kreoon"
      - "Ángulos apareciendo"
  - id: 4
    time: "28-42s"
    visual: "Diagrama: function → Claude → response. Etiquetas Deno = $0 y egress = incluido en verde"
    voice: "Qué no pagás. No pagás servidor porque Deno corre bajo demanda. No pagás egress raro porque Supabase lo incluye en el plan. Solo pagás Claude — que ahí sí cuesta, pero el hosting es gratis."
    creator_action: "Voz en off, diagrama animado"
    editing: "Overlay: pagás IA, no hosting. Tics verdes en cada componente gratis."
    broll:
      - "Diagrama de costo"
      - "Etiquetas $0"
      - "Highlight verde"
  - id: 5
    time: "42-55s"
    visual: "Samuel a cámara. Gráfica comparativa: barras 2020 (hosting domina) vs 2026 (IA domina)"
    voice: "La lección: en 2026, el costo de ejecutar código es ruido. El costo real es el modelo. Optimizá llamadas a IA, no infraestructura."
    creator_action: "Samuel a cámara, gesto firme con el dedo al decir 'optimizá IA'"
    editing: "Texto overlay final Anton: optimizá IA, no servidores. Música baja en el cierre."
    broll:
      - "Talking head Samuel"
      - "Gráfica 2020 vs 2026"
      - "End card"
---

# samuel-R31 — Edge Functions de Supabase + IA = magia casi gratis

**Tipo:** Educativo técnico + demo
**Duración:** 55 segundos
**Voz:** Samuel en off + código en pantalla
**Música:** Synthwave sutil

---

| Tiempo | Audio / Voz | Visual | Notas de edición |
|--------|-------------|--------|------------------|
| 0-3s | `"Esta edge function cuesta 1 décima de centavo por ejecución. Y corre Claude. No es exageración."` | Pantalla: `$0.0001` grande. Luego logo Supabase + logo Claude. | Texto overlay: "1 DÉCIMA DE CENTAVO". |
| 3-12s | `"Edge functions son Deno funciones que corren cerca del usuario. Cold start de 100 milisegundos. Despliegue con un comando: supabase functions deploy."` | Terminal: `supabase functions deploy analyze-brief`. Output verde. | Overlay: "Deno + edge = rápido". |
| 12-28s | `"Caso real: cuando un cliente crea un brief, se dispara esta función. Llama a Claude con el texto, le pide ángulos UGC, devuelve JSON. El usuario ve los ángulos sugeridos en 2 segundos."` | Código TypeScript completo de la function. Luego demo en UI: crear brief, ver ángulos aparecer. | Resaltar llamada a Claude. Overlay: "2s end-to-end". |
| 28-42s | `"Qué no pagás. No pagás servidor porque Deno corre bajo demanda. No pagás egress raro porque Supabase lo incluye en el plan. Solo pagás Claude — que ahí sí cuesta, pero el hosting es gratis."` | Diagrama: function → Claude → response. Etiquetas "Deno = $0" + "egress = incluido". | Overlay: "pagás IA, no hosting". |
| 42-55s | `"La lección: en 2026, el costo de ejecutar código es ruido. El costo real es el modelo. Optimizá llamadas a IA, no infraestructura."` | Samuel a cámara. Gráfica: costo 2020 (hosting dominaba) vs costo 2026 (IA domina). | Texto overlay final: "optimizá IA, no servidores". |

## Prosody ElevenLabs
- `<prosody rate="98%">` base.
- `<emphasis level="strong">` en: "1 décima de centavo", "No es exageración", "pagás IA, no hosting", "optimizá IA, no servidores".
- `<break time="0.4s"/>` antes de: "Qué no pagás", "La lección".

## B-roll requerido
- Terminal con deploy de edge function
- Código TypeScript de la function
- Demo UI de creación de brief con ángulos aparecidos
- Diagrama de arquitectura
- Gráfica costo 2020 vs 2026

## Retención loop
El precio ($0.0001) es tan bajo que genera incredulidad. El punto final "optimizá IA, no infraestructura" es una opinión fuerte tipo Theo Browne que provoca debate.

## CTA
"Plantilla de edge function + prompt en mi GitHub. Perfil."

## Por qué funciona
Combina servicio concreto (edge functions) + opinión disruptiva (servidores ya no son el costo) + caso real. Devs senior reaccionan al insight de 2026, devs junior aprenden herramienta nueva. Ángulo poco trillado.
