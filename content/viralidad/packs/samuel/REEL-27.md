---
slug: samuel-R27
title: "De idea a producción en 3 días — BTS de una feature"
assigned_creator: samuel@ugccolombia.co
pillar: craft_visible
platform: instagram_reel
duration_seconds: 55
hook: "Martes 10am: idea. Jueves 9pm: en producción. Así shippeo una feature solo."
category: viral-pack
source_pack: samuel
scenes:
  - id: 1
    time: "0-3s"
    visual: "Timeline horizontal animada: punto MAR 10am a la izquierda → línea con ticks → punto JUE 9pm a la derecha"
    voice: "Martes 10am: idea. Jueves 9pm: en producción. Así shippeo una feature solo."
    creator_action: "Voz en off, sin cámara"
    editing: "Texto overlay Anton: 72 HORAS IDEA→PROD. Cut seco al siguiente shot."
    broll:
      - "Timeline horizontal animada"
      - "Ticks de eventos"
  - id: 2
    time: "3-12s"
    visual: "Screen recording de Linear con ticket abierto, scope detallado en 3 bullets. Zoom progresivo al ticket"
    voice: "Martes. Diana me dice: 'necesitamos que el cliente vea el progreso de sus videos en tiempo real sin refresh'. Anoté requisito en Linear. 5 minutos. Cerré el ticket de scope en 20 minutos más."
    creator_action: "Voz en off, screen recording Linear"
    editing: "Zoom 12% al ticket. Overlay: scope definido = 50% del trabajo."
    broll:
      - "Linear con ticket"
      - "Scope en bullets"
  - id: 3
    time: "12-25s"
    visual: "Pantalla dividida: migración SQL arriba (CREATE TYPE status_enum), código Next.js 15 abajo (useEffect + supabase.channel). Time-lapse de escritura"
    voice: "Miércoles mañana: schema. Agregué status enum en la tabla deliverables. Migración en Supabase. 15 minutos. Miércoles tarde: realtime subscription en Next.js 15. Usé useEffect + supabase.channel. Otros 45 minutos."
    creator_action: "Voz en off, time-lapse de código"
    editing: "Contador de tiempo acumulado +1h. Overlay: Supabase Realtime = game changer."
    broll:
      - "Migración SQL"
      - "Código React con realtime"
      - "Time-lapse de typing"
  - id: 4
    time: "25-40s"
    visual: "Componente shadcn badge animándose entre estados (pending → in_review → approved). Cut a edge function en VS Code. Cut a bug list con tachados"
    voice: "Miércoles noche: UI. Componente con shadcn, badge cambia de color según status. 30 minutos. Jueves mañana: edge function que actualiza el status cuando Alexander aprueba. Jueves tarde: QA con Diana, encontré 2 bugs, los arreglé."
    creator_action: "Voz en off, screen recordings rápidos"
    editing: "Overlay: 2 bugs → fixed. Pequeños 'ding' al tachar bugs. Cortes cada 2-3s."
    broll:
      - "Componente badge animado"
      - "Edge function VS Code"
      - "Bug list tachada"
  - id: 5
    time: "40-50s"
    visual: "Vercel deployment dashboard con status verde. Cut a captura de Slack (mock) con cliente reaccionando con emoji"
    voice: "Jueves 9pm: deploy a Vercel. Notifiqué al cliente por Slack. Vio los status cambiar en vivo. Se rió. Ese es el momento."
    creator_action: "Voz en off, screen recording"
    editing: "Texto overlay verde: PROD ✓. Reaction emoji animado en Slack. Pausa de 0.3s antes de 'Ese es el momento'."
    broll:
      - "Vercel deploy verde"
      - "Mock Slack con cliente"
      - "Emoji reaction animado"
  - id: 6
    time: "50-55s"
    visual: "Samuel a cámara cierre. Logo en el cierre con efecto reveal"
    voice: "Solo dev, cero standups, feedback loop corto con Diana. Esa es la velocity que solo tenés cuando sos 1."
    creator_action: "Samuel a cámara, mirada directa, leve sonrisa"
    editing: "Música sube. Overlay final Anton: 1 dev = 1 decisión."
    broll:
      - "Talking head Samuel"
      - "Logo reveal"
      - "End card"
---

# samuel-R27 — De idea a producción en 3 días — BTS de una feature

**Tipo:** BTS build-in-public
**Duración:** 55 segundos
**Voz:** Samuel + screen recordings rápidos del proceso
**Música:** Lofi energética con cortes

---

| Tiempo | Audio / Voz | Visual | Notas de edición |
|--------|-------------|--------|------------------|
| 0-3s | `"Martes 10am: idea. Jueves 9pm: en producción. Así shippeo una feature solo."` | Timeline horizontal: MAR 10am → JUE 9pm con ticks de eventos. | Texto overlay: "72 HORAS IDEA→PROD". |
| 3-12s | `"Martes. Diana me dice: 'necesitamos que el cliente vea el progreso de sus videos en tiempo real sin refresh'. Anoté requisito en Linear. 5 minutos. Cerré el ticket de scope en 20 minutos más."` | Screen: Linear con ticket abierto, scope detallado. | Zoom al ticket. Overlay: "scope definido = 50% del trabajo". |
| 12-25s | `"Miércoles mañana: schema. Agregué status enum en la tabla deliverables. Migración en Supabase. 15 minutos. Miércoles tarde: realtime subscription en Next.js 15. Usé useEffect + supabase.channel. Otros 45 minutos."` | Pantalla dividida: migración SQL arriba, código React abajo. Se escribe rápido (time-lapse). | Contador: "+1h acumulada". Overlay: "Supabase Realtime = game changer". |
| 25-40s | `"Miércoles noche: UI. Componente con shadcn, badge cambia de color según status. 30 minutos. Jueves mañana: edge function que actualiza el status cuando Alexander aprueba. Jueves tarde: QA con Diana, encontré 2 bugs, los arreglé."` | Screen: componente badge animado. Edge function en VS Code. Bug list tachada. | Overlay: "2 bugs → fixed". Pequeños "ding" al tachar. |
| 40-50s | `"Jueves 9pm: deploy a Vercel. Notifiqué al cliente por Slack. Vio los status cambiar en vivo. Se rió. Ese es el momento."` | Screen: Vercel deploy green. Luego captura (mock) de Slack con cliente reaccionando. | Texto overlay: "PROD ✓". |
| 50-55s | `"Solo dev, cero standups, feedback loop corto con Diana. Esa es la velocity que solo tenés cuando sos 1."` | Samuel a cámara. Final con logo. | Música sube. Overlay final: "1 dev = 1 decisión". |

## Prosody ElevenLabs
- `<prosody rate="100%">` base — ritmo rápido build-in-public.
- `<emphasis level="strong">` en: "solo", "scope definido", "Supabase Realtime", "Ese es el momento".
- `<break time="0.3s"/>` antes de: "Miércoles mañana", "Jueves 9pm", "Ese es el momento".

## B-roll requerido
- Timeline horizontal animada mar-jue
- Linear con ticket real (anonimizado)
- Migración SQL escribiéndose
- Código Next.js 15 con realtime
- Componente shadcn badge animado
- Edge function VS Code
- Vercel deploy verde
- Mock de Slack cliente

## Retención loop
El ritmo rápido de timestamps ("10am", "mañana", "tarde", "9pm") mantiene el pulso. La frase final "1 dev = 1 decisión" genera debate en comentarios de "y si creces?".

## CTA
"¿Quieres ver el stack de cómo hago shipping rápido? Guía en mi perfil."

## Por qué funciona
Transparencia radical con timestamps reales tipo #buildinpublic. Muestra el proceso real, no el highlight. La opinión lateral ("cero standups") provoca a PMs y equipos grandes — engagement alto. Tono Fireship en los cortes rápidos y cambios de escena.
