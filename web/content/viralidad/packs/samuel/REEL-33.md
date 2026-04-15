---
slug: samuel-R33
title: "Schema para agencia UGC — 8 tablas, 1 explicación"
assigned_creator: samuel@ugccolombia.co
pillar: craft_visible
platform: tiktok
duration_seconds: 60
hook: "Diseñé el schema de una agencia UGC entera en 8 tablas. Te las muestro en orden."
category: viral-pack
source_pack: samuel
scenes:
  - id: 1
    time: "0-3s"
    visual: "Pantalla negra con contador grande '8 TABLAS' en tipografía Anton, fondo oscuro tema Aura"
    voice: "Diseñé el schema de una agencia UGC entera en 8 tablas. Te las muestro en orden."
    creator_action: "Voz en off, sin cámara"
    editing: "Texto overlay grande. Cut rápido. Sonido tipo data click."
    broll:
      - "Contador 8 TABLAS"
      - "Fondo oscuro tema Aura"
  - id: 2
    time: "3-10s"
    visual: "Diagrama ER en dbdiagram.io: aparece tabla 'organizations' con sus columnas (id, name, plan, billing_info, limits)"
    voice: "Tabla uno: organizations. El cliente que nos contrata. Con su plan, límites, billing info."
    creator_action: "Voz en off, animación ER"
    editing: "Cada columna aparece con un tic verde. Sonido tipo schema build."
    broll:
      - "Tabla organizations animada"
      - "Columnas apareciendo"
  - id: 3
    time: "10-18s"
    visual: "Tabla users aparece con flecha FK hacia organizations. Roles destacados: owner, manager, viewer"
    voice: "Tabla dos: users. Pertenecen a una organization. Con roles — owner, manager, viewer."
    creator_action: "Voz en off, ER creciendo"
    editing: "Resaltar relación FK con flecha azul animada."
    broll:
      - "Tabla users con FK"
      - "Flecha azul a organizations"
  - id: 4
    time: "18-28s"
    visual: "Tabla creators aparece SIN relación directa con orgs (lateral, color distinto)"
    voice: "Tres: creators. Nuestro talento. Con perfil, nichos, disponibilidad, histórico de calidad. Esta tabla vive aparte, no pertenece a un cliente."
    creator_action: "Voz en off, ER expandiéndose"
    editing: "Overlay: creators = pool compartido. Color naranja para diferenciar."
    broll:
      - "Tabla creators lateral"
      - "Color naranja distintivo"
  - id: 5
    time: "28-38s"
    visual: "3 tablas más aparecen: briefs, deliverables, briefs_creators (intermedia). Diagrama cada vez más denso"
    voice: "Cuatro y cinco: briefs y deliverables. Brief pertenece a organization. Deliverable pertenece a brief y creator. Many-to-many via briefs_creators tabla intermedia."
    creator_action: "Voz en off, ER complejizándose"
    editing: "Resaltar tabla intermedia briefs_creators con color púrpura distinto."
    broll:
      - "Tablas briefs/deliverables"
      - "Tabla intermedia púrpura"
      - "Relaciones FK"
  - id: 6
    time: "38-48s"
    visual: "Diagrama completo con las 8 tablas conectadas. Zoom out para ver todo el ER"
    voice: "Seis: payments. Pertenece a creator, con estado y proof. Siete: events. Log de auditoría — todo cambio importante queda aquí. Ocho: integrations. Credenciales encriptadas por organization."
    creator_action: "Voz en off, vista panorámica"
    editing: "Zoom out cinematográfico. Overlay: SCHEMA COMPLETO."
    broll:
      - "Diagrama ER completo"
      - "Zoom out animado"
  - id: 7
    time: "48-60s"
    visual: "Samuel a cámara cierre. Cut a diagrama pulido exportado en PDF/PNG limpio"
    voice: "Regla de oro del schema: si no sabés qué tablas tenés, no tenés producto — tenés conjetura. Dibujá el ER antes de escribir migraciones."
    creator_action: "Samuel a cámara, gesto firme con el dedo al decir 'conjetura'"
    editing: "Texto overlay final Anton: dibujá primero, codeá después. Música baja en el cierre."
    broll:
      - "Talking head Samuel"
      - "ER limpio exportado"
      - "End card"
---

# samuel-R33 — Schema para agencia UGC — 8 tablas, 1 explicación

**Tipo:** Database design + visualización
**Duración:** 60 segundos
**Voz:** Samuel en off + diagrama ER animado
**Música:** Lofi tech ritmo medio

---

| Tiempo | Audio / Voz | Visual | Notas de edición |
|--------|-------------|--------|------------------|
| 0-3s | `"Diseñé el schema de una agencia UGC entera en 8 tablas. Te las muestro en orden."` | Pantalla: contador "8 TABLAS" sobre fondo oscuro. | Texto overlay grande. Cut rápido. |
| 3-10s | `"Tabla uno: organizations. El cliente que nos contrata. Con su plan, límites, billing info."` | Diagrama ER: aparece tabla "organizations" con columnas. | Cada columna aparece con un tic. |
| 10-18s | `"Tabla dos: users. Pertenecen a una organization. Con roles — owner, manager, viewer."` | Tabla users aparece con flecha FK hacia organizations. | Resaltar relación con flecha azul. |
| 18-28s | `"Tres: creators. Nuestro talento. Con perfil, nichos, disponibilidad, histórico de calidad. Esta tabla vive aparte, no pertenece a un cliente."` | Tabla creators aparece sin relación directa con orgs. | Overlay: "creators = pool compartido". |
| 28-38s | `"Cuatro y cinco: briefs y deliverables. Brief pertenece a organization. Deliverable pertenece a brief y creator. Many-to-many via briefs_creators tabla intermedia."` | 3 tablas más aparecen con sus relaciones. Diagrama cada vez más denso. | Resaltar tabla intermedia "briefs_creators" con color distinto. |
| 38-48s | `"Seis: payments. Pertenece a creator, con estado y proof. Siete: events. Log de auditoría — todo cambio importante queda aquí. Ocho: integrations. Credenciales encriptadas por organization."` | Diagrama completo con las 8 tablas conectadas. | Zoom out para ver todo. Overlay: "SCHEMA COMPLETO". |
| 48-60s | `"Regla de oro del schema: si no sabés qué tablas tenés, no tenés producto — tenés conjetura. Dibujá el ER antes de escribir migraciones."` | Samuel a cámara. Cut final a diagrama pulido exportado. | Texto overlay: "dibujá primero, codeá después". |

## Prosody ElevenLabs
- `<prosody rate="98%">` base.
- `<emphasis level="strong">` en: "8 tablas", "pool compartido", "log de auditoría", "tenés conjetura".
- `<break time="0.4s"/>` antes de: "Regla de oro", "Dibujá el ER".

## B-roll requerido
- Diagrama ER construyéndose tabla por tabla (Figma o dbdiagram.io)
- Zoom in/out del diagrama
- Talking head final
- Exportación final del ER limpio

## Retención loop
La construcción progresiva del diagrama engancha (quiere ver el final). La regla "dibujá primero, codeá después" es compartible y termina en bookmarks.

## CTA
"El ER completo exportado en mi perfil. Úsalo de plantilla si estás montando agencia."

## Por qué funciona
Database design es contenido poco sexy — pero acá se visualiza como ByteByteGo. La frase final ("schema = producto") posiciona a Samuel como senior pensador, no solo ejecutor. Útil para cualquier founder técnico en SaaS.
