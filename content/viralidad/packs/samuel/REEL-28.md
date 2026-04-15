---
slug: samuel-R28
title: "El error de RLS que expone tus datos y nadie te avisa"
assigned_creator: samuel@ugccolombia.co
pillar: data_angulos
platform: youtube_shorts
duration_seconds: 55
hook: "Si tu Supabase tiene esta policy, tus clientes ven datos de otros clientes. Lo vi en 3 proyectos este mes."
category: viral-pack
source_pack: samuel
scenes:
  - id: 1
    time: "0-3s"
    visual: "Pantalla negra con código SQL apareciendo en rojo. Flash rojo de fondo en el frame final"
    voice: "Si tu Supabase tiene esta policy, tus clientes ven datos de otros clientes. Lo vi en 3 proyectos este mes."
    creator_action: "Voz en off Samuel, tono serio, sin cámara"
    editing: "Texto overlay grande Anton: ⚠ ESTE BUG EXPONE TODO. Sonido tipo alarma sutil."
    broll:
      - "Código SQL apareciendo en rojo"
      - "Flash rojo de fondo"
      - "Icono warning"
  - id: 2
    time: "3-13s"
    visual: "Código resaltado: CREATE POLICY ... USING (true); con la palabra 'true' parpadeando en rojo"
    voice: "Esta es la policy mala: USING true. Literalmente le estás diciendo a Postgres 'deja pasar a todos'. Y como no hay error, Supabase no te avisa."
    creator_action: "Voz en off, screen recording"
    editing: "Overlay rojo: USING true = puerta abierta. Animación de puerta abriéndose icono."
    broll:
      - "Código USING true en rojo"
      - "Icono puerta abierta"
      - "Logo Supabase con tachado"
  - id: 3
    time: "13-28s"
    visual: "Pantalla con query SQL copiable en bloque destacado. Cut a resultado tabular con columnas tablename y qual; filas con 'true' resaltadas"
    voice: "Cómo verificar rápido: ejecutá esta query. Lista todas tus policies por tabla. Si ves qual 'true' en una tabla con datos privados, tenés el bug."
    creator_action: "Voz en off, screen recording"
    editing: "Overlay con la query completa visible. Flecha animada hacia columna qual. Resaltar filas problemáticas."
    broll:
      - "Query SQL copiable"
      - "Tabla resultado con qual"
      - "Filas resaltadas"
  - id: 4
    time: "28-43s"
    visual: "Código correcto en verde: USING (organization_id = (select organization_id from users where id = auth.uid())). Diagrama: usuario A con datos A, usuario B con datos B, línea de separación"
    voice: "La policy correcta usa auth.uid como filtro. Algo tipo USING organization_id equals select organization_id from users where id equals auth.uid. Eso garantiza que cada usuario solo ve su organización."
    creator_action: "Voz en off, screen recording + diagrama"
    editing: "Overlay verde: auth.uid = identidad real. Diagrama animado con separación clara."
    broll:
      - "Código correcto verde"
      - "Diagrama multi-tenant"
      - "Línea de separación animada"
  - id: 5
    time: "43-52s"
    visual: "Samuel a cámara con tono serio. Diagrama de antes/después del fix mostrándose detrás"
    voice: "En Kreoon corrimos auditoría hace 2 meses. Encontramos 1 tabla con policy mala. La arreglamos en 20 minutos. El cliente nunca supo — pero pudo haber sido grave."
    creator_action: "Samuel a cámara, mirada directa, gesto firme con la mano abierta"
    editing: "Overlay: 1 tabla → fixed en 20 min. Tono serio, sin música."
    broll:
      - "Talking head Samuel serio"
      - "Diagrama antes/después fix"
  - id: 6
    time: "52-55s"
    visual: "Card final con la query destacada y CTA prominente"
    voice: "Corre esa query hoy. Si ves 'true' donde no debería estar, tenés trabajo."
    creator_action: "Voz en off cierre"
    editing: "Música baja. CTA visual grande: query en mi perfil. Texto Anton."
    broll:
      - "Card final con query"
      - "CTA prominente"
---

# samuel-R28 — El error de RLS que expone tus datos y nadie te avisa

**Tipo:** Educativo de seguridad + controversia técnica
**Duración:** 55 segundos
**Voz:** Samuel en off + código en pantalla
**Música:** Thriller sutil, tensa en los momentos clave

---

| Tiempo | Audio / Voz | Visual | Notas de edición |
|--------|-------------|--------|------------------|
| 0-3s | `"Si tu Supabase tiene esta policy, tus clientes ven datos de otros clientes. Lo vi en 3 proyectos este mes."` | Pantalla negra con código SQL mal apareciendo. Flash rojo. | Texto overlay: "⚠ ESTE BUG EXPONE TODO". |
| 3-13s | `"Esta es la policy mala: USING true. Literalmente le estás diciendo a Postgres 'deja pasar a todos'. Y como no hay error, Supabase no te avisa."` | Código: `CREATE POLICY ... USING (true);` resaltado en rojo. | Overlay: "USING true = puerta abierta". Resaltar en rojo. |
| 13-28s | `"Cómo verificar rápido: ejecutá esta query. Lista todas tus policies por tabla. Si ves qual 'true' en una tabla con datos privados, tenés el bug."` | Pantalla: query SQL copiable + resultado con columnas "tablename, qual". Resaltar filas con "true". | Overlay con la query completa. Flecha hacia columna "qual". |
| 28-43s | `"La policy correcta usa auth.uid como filtro. Algo tipo USING organization_id equals (select organization_id from users where id equals auth.uid). Eso garantiza que cada usuario solo ve su organización."` | Código correcto en verde. Explicación visual: usuario A con datos A, usuario B con datos B, separación con línea. | Overlay: "auth.uid = identidad real". |
| 43-52s | `"En Kreoon corrimos auditoría hace 2 meses. Encontramos 1 tabla con policy mala. La arreglamos en 20 minutos. El cliente nunca supo — pero pudo haber sido grave."` | Samuel a cámara. Diagrama de antes/después del fix. | Overlay: "1 tabla → fixed en 20 min". |
| 52-55s | `"Corre esa query hoy. Si ves 'true' donde no debería estar, tenés trabajo."` | Card final con la query destacada. | Música baja. CTA visual. |

## Prosody ElevenLabs
- `<prosody rate="97%">` base — tono serio.
- `<emphasis level="strong">` en: "ven datos de otros clientes", "puerta abierta", "no te avisa", "corre esa query hoy".
- `<break time="0.5s"/>` antes de: "Cómo verificar rápido", "Corre esa query hoy".

## B-roll requerido
- Código SQL incorrecto en rojo (USING true)
- Query de auditoría de policies
- Resultado con columna qual mostrando "true"
- Código correcto con auth.uid en verde
- Diagrama de separación multi-tenant
- Talking head serio

## Retención loop
El viewer dev pausa para copiar la query. El loop natural es "corrí la query en mi proyecto → descubrí bug → vuelvo al reel para ver el fix". Comentarios se llenan de "corrí la query y sí tenía una mala".

## CTA
"Query de auditoría + policy segura en mi perfil. Compartilo con tu equipo, es prevención."

## Por qué funciona
Seguridad específica (no genérica) + acción inmediata (copy-paste) + anécdota real ("3 proyectos este mes"). Estilo Theo Browne al señalar errores comunes con autoridad. El viewer que corre la query y encuentra bug queda fan de por vida.
