---
slug: samuel-R34
title: "Por qué tu Next.js está lento — los 3 errores reales"
assigned_creator: samuel@ugccolombia.co
pillar: data_angulos
platform: youtube_shorts
duration_seconds: 55
hook: "Auditamos 6 apps Next.js de clientes. 5 tenían los mismos 3 errores de performance. Mirá."
category: viral-pack
source_pack: samuel
scenes:
  - id: 1
    time: "0-3s"
    visual: "Grid 3x2 con 6 logos de apps anonimizadas. 5 de los 6 se vuelven rojos con tic"
    voice: "Auditamos 6 apps Next.js de clientes. 5 tenían los mismos 3 errores. Te los muestro."
    creator_action: "Voz en off, sin cámara"
    editing: "Texto overlay grande Anton: 5/6 APPS. Cut seco. Sonido tipo alarma sutil."
    broll:
      - "Grid 6 logos"
      - "Highlights rojos animados"
  - id: 2
    time: "3-15s"
    visual: "Código en VS Code: archivo con 'use client' al inicio marcado en rojo. Cut a gráfica de bundle size pre/post fix"
    voice: "Error uno: componentes client que no deberían serlo. Vi hojas enteras con use client arriba solo porque el dev tenía miedo. Resultado: bundle inflado 40%."
    creator_action: "Voz en off, screen recording"
    editing: "Highlight rojo en use client. Overlay: bundle 40% menos. Counter de KB animado."
    broll:
      - "Código con use client en rojo"
      - "Gráfica bundle size"
  - id: 3
    time: "15-30s"
    visual: "Comparativa código: <img> normal vs <Image />. Cut a Lighthouse score 62 → 87 con counter animado"
    voice: "Error dos: imágenes sin next/image. Next.js tiene optimización automática con lazy loading, webp, responsive. Usar img normal en 2026 es autolesión. Lighthouse sube 25 puntos con ese fix."
    creator_action: "Voz en off, screen recording"
    editing: "Resaltar diferencia con flecha verde. Counter Lighthouse 62 → 87."
    broll:
      - "Código <img> vs <Image>"
      - "Lighthouse report"
      - "Counter animado"
  - id: 4
    time: "30-42s"
    visual: "Diagrama: flujo client (3 requests) vs server (1 request). Waterfall del Network tab Chrome DevTools"
    voice: "Error tres: fetch en componente client cuando debería ser server component. Hace 3 requests extra desde el navegador. En server component es 1 request en el server y HTML directo al usuario."
    creator_action: "Voz en off, screen recording"
    editing: "Overlay: 3 requests → 1. Highlights en waterfall."
    broll:
      - "Diagrama client vs server"
      - "Waterfall Network tab"
      - "Comparación HTML directo"
  - id: 5
    time: "42-55s"
    visual: "Samuel a cámara. Métrica final destacada: LCP 3s → 1.2s con counter"
    voice: "Ninguno de estos errores aparece en los cursos. Todos aparecen en producción. Arreglar los 3 te baja LCP de 3 segundos a 1.2. Miden plata."
    creator_action: "Samuel a cámara, gesto firme al decir 'miden plata'"
    editing: "Texto overlay final Anton: LCP 3s → 1.2s = conversión. Música sube en cierre."
    broll:
      - "Talking head Samuel"
      - "Métrica LCP destacada"
      - "End card"
---

# samuel-R34 — Por qué tu Next.js está lento — los 3 errores reales

**Tipo:** Educativo + performance audit
**Duración:** 55 segundos
**Voz:** Samuel en off + código y Lighthouse
**Música:** Electro tensa, baja en el fix

---

| Tiempo | Audio / Voz | Visual | Notas de edición |
|--------|-------------|--------|------------------|
| 0-3s | `"Auditamos 6 apps Next.js de clientes. 5 tenían los mismos 3 errores. Te los muestro."` | Grid 6 logos de apps (anonimizados). 5 de ellos se vuelven rojos. | Texto overlay: "5/6 APPS". |
| 3-15s | `"Error uno: componentes client que no deberían serlo. Vi hojas enteras con 'use client' arriba solo porque el dev tenía miedo. Resultado: bundle inflado 40%."` | Código: archivo con `'use client'` marcado en rojo. Gráfico de bundle size pre/post fix. | Overlay: "bundle 40% menos". |
| 15-30s | `"Error dos: imágenes sin next/image. Next.js tiene optimización automática con lazy loading, webp, responsive. Usar <img> normal en 2026 es autolesión. Lighthouse sube 25 puntos con ese fix."` | Comparativa: <img> normal vs <Image />. Lighthouse score antes 62, después 87. | Resaltar diferencia con flecha verde. |
| 30-42s | `"Error tres: fetch en componente client cuando debería ser server component. Hace 3 requests extra desde el navegador. En server component es 1 request en el server y HTML directo al usuario."` | Diagrama: flujo client (3 requests) vs server (1 request). Waterfall de Network tab. | Overlay: "3 requests → 1". |
| 42-55s | `"Ninguno de estos errores aparece en los cursos. Todos aparecen en producción. Arreglar los 3 te baja LCP de 3 segundos a 1.2. Miden plata."` | Samuel a cámara. Métrica final: LCP 3s → 1.2s. | Texto overlay: "LCP 3s → 1.2s = conversión". |

## Prosody ElevenLabs
- `<prosody rate="99%">` base.
- `<emphasis level="strong">` en: "5/6 apps", "autolesión", "no aparecen en los cursos", "miden plata".
- `<break time="0.4s"/>` antes de: "Error dos", "Error tres", "Miden plata".

## B-roll requerido
- Grid de 6 apps anonimizadas
- Código con `use client` marcado
- Gráfica bundle size
- Comparativa `<img>` vs `<Image>`
- Lighthouse score reports
- Waterfall de Network tab
- Diagrama client vs server component

## Retención loop
Los 3 errores están concretos y accionables. El viewer corre Lighthouse en su propia app mientras mira el reel y vuelve para comparar resultados.

## CTA
"Checklist de audit Next.js en mi perfil. 15 items, gratis."

## Por qué funciona
Listicle específico ("3 errores") + data real ("5 de 6 apps") + métrica clara (LCP 3s→1.2s). Frase gancho ("ninguno aparece en cursos") sugiere insider knowledge. Estilo Fireship en el ritmo y Theo Browne en la opinión sobre cursos.
