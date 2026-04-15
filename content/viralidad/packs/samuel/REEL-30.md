---
slug: samuel-R30
title: "Remotion: 120 videos personalizados en una tarde"
assigned_creator: samuel@ugccolombia.co
pillar: craft_visible
platform: tiktok
duration_seconds: 50
hook: "120 videos personalizados, cada uno con datos distintos, renderizados en una tarde. Con código."
category: viral-pack
source_pack: samuel
scenes:
  - id: 1
    time: "0-3s"
    visual: "Grid 4x4 a pantalla completa con 16 videos diferentes corriendo en loop sincronizado. Overlay '120 VIDEOS'"
    voice: "120 videos personalizados, cada uno con datos distintos, renderizados en una tarde. Con código."
    creator_action: "Voz en off, sin cámara"
    editing: "Zoom rápido al grid. Texto en rojo Anton: NO ES CAPCUT. Beat sincronizado."
    broll:
      - "Grid 4x4 de videos"
      - "Loop sincronizado"
  - id: 2
    time: "3-12s"
    visual: "Pantalla con código React de un componente Remotion (función con props). Props entrando desde un array de datos"
    voice: "Remotion te deja construir video con React. Componentes, props, animaciones — como una web, pero se exporta a mp4. Miren el componente."
    creator_action: "Voz en off, screen recording"
    editing: "Resaltar prop creatorName con flecha animada. Overlay: React → mp4."
    broll:
      - "Código React Remotion"
      - "Array de datos"
      - "Flecha sobre prop"
  - id: 3
    time: "12-25s"
    visual: "Split: After Effects manual lento a la izquierda (fast-forward de drag-and-drop) vs Remotion con CSV a la derecha (grid llenándose automático)"
    voice: "Caso real: 120 creators, cada uno recibe un video personalizado de bienvenida. Nombre, foto, stats de perfil. Antes lo hacía a mano en After Effects — 3 minutos por video. Con Remotion: un CSV y un render batch."
    creator_action: "Voz en off, comparativa"
    editing: "Overlay comparativo: 3 min × video / batch automático. Time-lapse del grid llenándose."
    broll:
      - "After Effects manual"
      - "CSV con 120 rows"
      - "Grid llenándose"
  - id: 4
    time: "25-38s"
    visual: "Terminal con comando npx remotion lambda render corriendo. Cut a dashboard AWS Lambda con funciones paralelas. Counter $4.00"
    voice: "El render corre en Lambda. Paralelizado — 120 videos en 25 minutos. Costo: 4 dólares. Los creators vieron sus videos y 18 lo compartieron en sus historias. Eso es marketing sin fricción."
    creator_action: "Voz en off, screen recording"
    editing: "Overlay: 120 videos / 25min / $4. Counter de tiempo y costo animados."
    broll:
      - "Terminal comando lambda"
      - "Dashboard AWS Lambda"
      - "Counter $4.00"
      - "Stories con video compartido"
  - id: 5
    time: "38-50s"
    visual: "Samuel a cámara cierre. Cortes rápidos de otros casos: banners animados, resúmenes mensuales, credenciales en video"
    voice: "Remotion no es para todo — si grabás UGC normal, usá CapCut. Pero si generás contenido por lotes con datos dinámicos, cambia el juego."
    creator_action: "Samuel a cámara, gesto abierto al hablar de casos"
    editing: "Cortes cada 1.5s en los casos. Overlay final: para contenido programático."
    broll:
      - "Talking head Samuel"
      - "Banners animados"
      - "Resúmenes video"
      - "End card"
---

# samuel-R30 — Remotion: 120 videos personalizados en una tarde

**Tipo:** Demo técnica + uso creativo
**Duración:** 50 segundos
**Voz:** Samuel en off + screen recording Remotion
**Música:** Electro sutil ritmo medio

---

| Tiempo | Audio / Voz | Visual | Notas de edición |
|--------|-------------|--------|------------------|
| 0-3s | `"120 videos personalizados, cada uno con datos distintos, renderizados en una tarde. Con código."` | Grid 4x4 con videos diferentes corriendo en loop. Overlay "120 VIDEOS". | Zoom rápido al grid. Texto en rojo: "NO ES CAPCUT". |
| 3-12s | `"Remotion te deja construir video con React. Componentes, props, animaciones — como una web, pero se exporta a mp4. Miren el componente."` | Pantalla: código React de un componente Remotion. Props entrando desde array de datos. | Resaltar prop "creatorName" con flecha. Overlay: "React → mp4". |
| 12-25s | `"Caso real: 120 creators, cada uno recibe un video personalizado de bienvenida. Nombre, foto, stats de perfil. Antes lo hacía a mano en After Effects — 3 minutos por video. Con Remotion: un CSV y un render batch."` | Split: After Effects manual a la izq (lento), Remotion con CSV a la der (grid llenándose). | Overlay comparativo: "3 min × video / batch automático". |
| 25-38s | `"El render corre en Lambda. Paralelizado — 120 videos en 25 minutos. Costo: 4 dólares. Los creators vieron sus videos y 18 lo compartieron en sus historias. Eso es marketing sin fricción."` | Terminal: comando `npx remotion lambda render` corriendo. Dashboard AWS Lambda con funciones paralelas. Contador $4.00. | Overlay: "120 videos / 25min / $4". |
| 38-50s | `"Remotion no es para todo — si grabás UGC normal, usá CapCut. Pero si generás contenido por lotes con datos dinámicos, cambia el juego."` | Samuel a cámara + cortes rápidos de otros casos (banners, resúmenes, credenciales video). | Final con overlay "para contenido programático". |

## Prosody ElevenLabs
- `<prosody rate="100%">` base — ritmo rápido.
- `<emphasis level="strong">` en: "120 videos", "como una web", "cambia el juego", "marketing sin fricción".
- `<break time="0.4s"/>` antes de: "Caso real", "Pero si generás".

## B-roll requerido
- Grid 4x4 de videos personalizados
- Código React de componente Remotion
- CSV con datos
- Demo de After Effects manual (b-roll)
- Terminal con comando de render lambda
- Dashboard AWS Lambda
- Talking head final

## Retención loop
El ahorro (3 min/video manual → 25 min para 120 total) es aritmética que la gente hace mentalmente y se queda asombrada. El caso "18 lo compartieron" muestra ROI creativo, no solo técnico.

## CTA
"Starter kit de Remotion para UGC Colombia lo tengo en repo público. Link en perfil."

## Por qué funciona
Herramienta underrated (Remotion es conocido por devs pero no por marketers). Demo concreta con números (120, 25min, $4) + caso creativo aplicado al nicho. Estilo Fireship puro — "aquí está la tecnología, aquí está el caso, aquí está el comando exacto".
