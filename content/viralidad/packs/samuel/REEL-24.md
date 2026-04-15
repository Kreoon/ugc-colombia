---
slug: samuel-R24
title: "Supabase vs Firebase: por qué no me arrepiento"
assigned_creator: samuel@ugccolombia.co
pillar: craft_visible
platform: youtube_shorts
duration_seconds: 50
hook: "Empecé Kreoon en Firebase. Lo migré a Supabase en semana 3. Te cuento por qué."
category: viral-pack
source_pack: samuel
scenes:
  - id: 1
    time: "0-3s"
    visual: "Split a pantalla completa: logo Firebase a la izquierda, logo Supabase a la derecha. Flecha de migración curva animada del uno al otro"
    voice: "Empecé Kreoon en Firebase. A la semana 3 lo migré a Supabase. Te cuento por qué no me arrepiento."
    creator_action: "Voz en off, sin cámara"
    editing: "Cut seco. Texto overlay Anton: MIGRACIÓN SEMANA 3. Flash blanco al cut."
    broll:
      - "Logos Firebase y Supabase"
      - "Flecha de migración animada"
  - id: 2
    time: "3-12s"
    visual: "Captura de Firestore con estructura de colecciones duplicadas (briefs_by_creator, briefs_by_status, briefs_by_date) marcadas en rojo"
    voice: "Firebase es rápido para empezar. Auth, Firestore, cloud functions, listo en un día. Pero cuando empecé a hacer queries complejas de creators y briefs, Firestore me obligaba a estructurar los datos para el query, no para el dominio."
    creator_action: "Voz en off, screen recording"
    editing: "Resaltar redundancia con círculos rojos animados. Overlay: query-driven data = infierno."
    broll:
      - "Estructura Firestore con duplicación"
      - "Círculos rojos sobre redundancia"
  - id: 3
    time: "12-25s"
    visual: "Código SQL en VS Code mostrando un join simple entre briefs y creators. Cut a policy RLS de Supabase resaltada en verde"
    voice: "Supabase es Postgres. Postgres es SQL. SQL es joins. Si tengo briefs y creators, un query y listo. Además: Row Level Security me da multi-tenancy sin reescribir una sola función."
    creator_action: "Voz en off, screen recording"
    editing: "Highlight verde sobre la policy RLS. Overlay: RLS = multi-tenant gratis."
    broll:
      - "Query SQL con join"
      - "Policy RLS de ejemplo"
      - "Highlight verde"
  - id: 4
    time: "25-38s"
    visual: "Pantalla con CREATE EXTENSION vector; comando ejecutado. Cut a query vectorial con resultado de 5 creators ordenados por score"
    voice: "Lo que terminó de convencerme: pgvector. Para el matching con IA necesitaba búsqueda vectorial. En Firebase tenía que montar Pinecone aparte — más latencia, más costo, más fricción. En Supabase es una extensión."
    creator_action: "Voz en off, demo terminal/SQL editor"
    editing: "Resaltar la línea CREATE EXTENSION con highlight amarillo. Overlay: pgvector = 1 línea de SQL."
    broll:
      - "CREATE EXTENSION vector en SQL"
      - "Query vectorial con resultados"
      - "Comparación Pinecone vs pgvector"
  - id: 5
    time: "38-50s"
    visual: "Tabla comparativa final: 'Firebase wins at' (consumer apps, real-time chat) vs 'Supabase wins at' (relacional, IA, RLS). Samuel a cámara cierre"
    voice: "Firebase es excelente para apps consumer simples. Supabase gana cuando tus datos son relacionales y tu producto necesita IA. Eso era Kreoon. Por eso migré."
    creator_action: "Samuel a cámara con gesto firme, brazos cruzados al cierre"
    editing: "Texto overlay Anton: la herramienta correcta para el problema correcto. Música baja en 'por eso migré'."
    broll:
      - "Tabla comparativa final"
      - "Talking head Samuel"
      - "End card"
---

# samuel-R24 — Supabase vs Firebase: por qué no me arrepiento

**Tipo:** Opinión técnica + comparativa
**Duración:** 50 segundos
**Voz:** Samuel talking head + diagramas
**Música:** Synth sutil tipo documental tech

---

| Tiempo | Audio / Voz | Visual | Notas de edición |
|--------|-------------|--------|------------------|
| 0-3s | `"Empecé Kreoon en Firebase. A la semana 3 lo migré a Supabase. Te cuento por qué no me arrepiento."` | Split: logo Firebase a izq, logo Supabase a der. Flecha de migración animada. | Cut seco. Texto overlay: "MIGRACIÓN SEMANA 3". |
| 3-12s | `"Firebase es rápido para empezar. Auth, Firestore, cloud functions, listo en un día. Pero cuando empecé a hacer queries complejas de creators y briefs, Firestore me obligaba a estructurar los datos para el query, no para el dominio."` | Código: estructura de Firestore con colecciones duplicadas por query. Marcar en rojo la redundancia. | Overlay: "query-driven data = infierno". |
| 12-25s | `"Supabase es Postgres. Postgres es SQL. SQL es joins. Si tengo briefs y creators, un query y listo. Además: Row Level Security me da multi-tenancy sin reescribir una sola función."` | Código SQL mostrando un join simple. Luego policy RLS de Supabase. | Resaltar la política RLS en verde. Overlay: "RLS = multi-tenant gratis". |
| 25-38s | `"Lo que terminó de convencerme: pgvector. Para el matching con IA necesitaba búsqueda vectorial. En Firebase tenía que montar Pinecone aparte — más latencia, más costo, más fricción. En Supabase es una extensión."` | Pantalla: `CREATE EXTENSION vector;` luego demo de query vectorial. | Overlay: "pgvector = 1 línea de SQL". |
| 38-50s | `"Firebase es excelente para apps consumer simples. Supabase gana cuando tus datos son relacionales y tu producto necesita IA. Eso era Kreoon. Por eso migré."` | Tabla final: "Firebase wins at / Supabase wins at". Samuel a cámara. | Texto overlay: "la herramienta correcta para el problema correcto". |

## Prosody ElevenLabs
- `<prosody rate="98%">` base.
- `<emphasis level="strong">` en: "no me arrepiento", "query-driven data", "una extensión", "por eso migré".
- `<break time="0.4s"/>` antes de: "Lo que terminó de convencerme", "Por eso migré".

## B-roll requerido
- Diagrama Firebase vs Supabase
- Captura de estructura Firestore con redundancia de datos
- Código SQL con join simple
- Policy RLS de ejemplo
- Demo de pgvector (query y resultado)
- Tabla comparativa final

## Retención loop
Hook con acción concreta ("migré en semana 3") + promesa de no arrepentirse genera curiosidad. El detalle de pgvector en el segundo 25 hace que devs guarden el video para revisarlo.

## CTA
"Si estás empezando algo con IA, Supabase primero. Guardá esto para cuando te toque decidir."

## Por qué funciona
Opinión fuerte respaldada con razones técnicas concretas (no opinión vacía). Estilo Theo Browne: "Firebase es excelente para X, pero ganaba Supabase en mi caso Y". Reconoce los puntos fuertes del oponente — eso da credibilidad. Viralidad por controversia técnica suave.
