# Plan de Comunidad — Pool de Creadores UGC Colombia
**Version:** 1.0  
**Fecha:** Abril 2026  
**Lider de comunidad:** Tanya  
**Lider de creadores:** Diana Mile  
**Direccion estrategica:** Alexander Cast  
**Meta:** 50 creadores activos (mes 3) → 150 creadores activos (mes 6)

---

## 1. Eleccion de plataforma

### Recomendacion: Discord + WhatsApp (modelo hibrido)

No existe una sola plataforma que resuelva todo. La recomendacion es un modelo de dos capas:

| Capa | Plataforma | Funcion |
|------|-----------|---------|
| Operativa diaria | WhatsApp (grupos segmentados por Tier) | Asignacion de proyectos, avisos urgentes, comunicacion rapida con Diana |
| Comunidad y crecimiento | Discord (servidor UGC Colombia) | Masterclasses, challenges, reconocimientos, networking, contenido educativo |

**Por que no Circle.so:** Costo mensual alto para el volumen actual. Su valor es para comunidades de infoproductos con membresía paga. No encaja con un pool de creadores B2B.

**Por que no Skool:** Orientado a cursos. El creador no viene a estudiar, viene a trabajar y conectar.

**Por que Discord como plataforma de comunidad:**
- Gratuito hasta escala grande
- Canales por categoria evitan el ruido de un solo grupo
- Bots nativos para gamificacion (MEE6, Carl-bot)
- Los creadores LATAM menores de 35 ya lo usan
- Permite roles visuales que reflejan los Tiers A/B/C sin configuracion compleja
- Integracion posible con n8n para automatizar bienvenidas y notificaciones

**Por que WhatsApp sigue siendo necesario:**
- La comunicacion operativa (briefs, entregas, pagos) no puede vivir en Discord
- Los creadores Tier A quieren respuesta rapida en el canal que ya usan
- Diana Mile ya opera ahi; mover toda la operacion a Discord genera friccion

**Alternativa si el equipo prefiere una sola plataforma:** WhatsApp Communities (funcion nativa de WhatsApp Business). Permite grupos anidados bajo una comunidad madre. Mas simple, menos engagement, sin gamificacion nativa.

---

## 2. Arquitectura del servidor Discord

### Estructura de canales

```
SERVIDOR: UGC Colombia — Pool de Creadores

INFORMACION (solo lectura)
  # bienvenida
  # reglas-y-codigo-de-conducta
  # novedades-de-la-agencia
  # proyectos-disponibles (feed automatico desde n8n)

COMUNIDAD
  # presentate-aqui
  # logros-y-wins
  # preguntas-y-respuestas
  # portfolio-showcase

APRENDIZAJE
  # recursos-y-templates
  # tips-de-produccion
  # masterclass-recordings

CHALLENGES
  # reto-semanal
  # entregas-del-reto
  # ganadores

TIER A — ROL EXCLUSIVO (solo creadores Tier A pueden ver)
  # lounge-tier-a
  # oportunidades-usa
  # feedback-directo-diana

VOZ Y VIDEO
  Sala: Masterclass Mensual
  Sala: Coworking Creativo (abierta siempre)
  Sala: Feedback en vivo

BOT / ADMIN
  # bot-puntos (registro automatico de puntos)
  # alertas-internas (solo equipo UGC Colombia)
```

### Roles (colores visibles en el servidor)

| Rol | Color | Quien lo tiene |
|-----|-------|---------------|
| Equipo UGC | Rojo | Alexander, Tanya, Diana |
| Tier A | Dorado | Creadores 75-100 pts scoring |
| Tier B | Plateado | Creadores 50-74 pts |
| Tier C | Verde | Creadores 25-49 pts |
| Nuevo | Gris | Primeras 2 semanas |
| MVP del Mes | Morado | Ganador mensual del ranking |

---

## 3. Grupos de WhatsApp (capa operativa)

```
UGC Colombia — Tier A (maximo 30 personas)
  Moderado por: Diana Mile
  Uso: proyectos prioritarios, oportunidades USA, feedback rapido

UGC Colombia — Tier B/C (hasta 80 personas)
  Moderado por: Tanya
  Uso: proyectos disponibles, avisos operativos

UGC Colombia — Anuncios (broadcast, solo lectura)
  Moderado por: Tanya
  Uso: masterclasses, retos semanales, logros, novedades
```

---

## 4. Onboarding — Dia 0 al Dia 30

### Prerequisito: el creador ya fue aprobado por Diana Mile con el scoring A/B/C.

### Dia 0 — Bienvenida operativa (WhatsApp, Diana Mile)

Mensaje manual de Diana al aprobar:

> "Hola [Nombre], soy Diana del equipo de UGC Colombia. Quedaste en nuestro pool Tier [A/B/C], felicitaciones. En las proximas horas te llegara el link para unirte a nuestra comunidad en Discord y al grupo de WhatsApp de tu Tier. Ahi vas a encontrar proyectos, recursos y al resto del equipo. Cualquier duda estoy aqui."

Acciones que dispara Diana:
- [ ] Envia link de invitacion Discord (link unico por persona, expira en 24h)
- [ ] Agrega al grupo de WhatsApp del Tier correspondiente
- [ ] Crea registro en Supabase (estado: activo, tier asignado, fecha de ingreso)

### Dia 0 — Bienvenida en Discord (automatizada con bot)

Cuando el creador acepta la invitacion y completa el onboarding del bot:

**Mensaje automatico en #bienvenida:**
> "Bienvenido/a al pool de UGC Colombia, [Nombre]. Eres parte de un grupo selecto de creadores verificados en LATAM. Tu tier actual es [A/B/C]. Completa tu presentacion en #presentate-aqui y empieza a sumar puntos. El equipo de Tanya y Diana esta aqui para lo que necesites."

**Tarea del bot (MEE6):** Asignar rol automaticamente segun Tier indicado en el formulario de bienvenida del servidor.

### Dia 1 — Primera accion (Discord)

Tanya publica un prompt en #presentate-aqui:

> "Si acabas de llegar, presentate con: tu nombre, ciudad, nicho fuerte, y una cosa que te hace diferente como creador. Los primeros 5 que se presenten esta semana ganan 50 puntos de bienvenida."

### Dia 2 — Primera entrega de valor

Tanya o Diana publican en #recursos-y-templates:
- Template de brief listo para usar
- Guia de iluminacion en interiores (PDF o Notion)
- Link al banco de hooks mas usados por UGC Colombia

Mensaje adjunto:
> "Esto es lo que usan los creadores Tier A cuando les llega un brief. Guardalo. Te va a ahorrar horas."

### Dia 3 — Check-in automatico (bot por DM si no ha interactuado)

> "Hola [Nombre], te uniste hace 3 dias y todavia no te hemos visto por ahi. Esta semana hay un reto activo en #reto-semanal y oportunidades en #proyectos-disponibles. Cuando quieras conectar, el equipo esta en Discord."

### Dia 5 — Invitacion al primer reto

Tanya menciona al creador directamente si no se ha inscrito al reto de la semana:

> "@[Nombre] este reto es perfecto para tu nicho. Animate, tienes hasta el viernes."

### Dia 7 — Encuesta de primera semana

DM automatico del bot:

> "Ya llevas una semana con nosotros. 3 preguntas rapidas: (1) La comunidad te ha parecido util? Si/No. (2) Algo que esperabas y no encontraste? (3) Tienes algun creador conocido que deberia estar aqui? Si lo refieres y es aprobado, ganas 200 puntos."

### Dia 14 — Reconocimiento si ha completado al menos una accion

Si el creador se presento, completo un reto o entrego un proyecto, Tanya lo menciona en #logros-y-wins:

> "Shoutout para [Nombre] por [accion especifica]. Asi se hace."

### Dia 30 — Evaluacion de primer mes

Diana revisa en Supabase:
- Proyectos entregados (si aplica)
- Participacion en la comunidad (retos, interacciones)
- Respuesta a mensajes del equipo

Si el creador Tier C mostro calidad en su primera entrega, Diana evalua upgrade a Tier B.
Si un Tier A no ha respondido ningun proyecto en 30 dias, entra a protocolo de retencion (ver seccion 6).

---

## 5. Sistema de gamificacion

### 5.1 Moneda: Puntos de Produccion (PP)

No son canjeables por dinero. Son simbolicos y determinan reconocimiento, acceso y prioridad en proyectos.

### 5.2 Tabla de puntos

| Accion | Puntos |
|--------|--------|
| Presentarse en #presentate-aqui | 50 |
| Completar perfil de Discord (foto, bio) | 25 |
| Participar en el reto semanal | 100 |
| Ganar el reto semanal | 250 |
| Entregar un proyecto a tiempo | 150 |
| Entregar sin revisiones (aprobado en ronda 1) | +100 bonus |
| Recibir calificacion 5/5 del cliente | +150 bonus |
| Publicar en #portfolio-showcase | 75 |
| Responder una pregunta en #preguntas-y-respuestas de manera util | 50 |
| Referir un creador que es aprobado | 200 |
| Asistir a masterclass en vivo | 75 |
| Asistir a masterclass y hacer una pregunta publica | +50 bonus |
| Upgrade de Tier (C→B o B→A) | 500 (celebracion especial) |

### 5.3 Leaderboard mensual

El bot de Discord (MEE6 o ranking personalizado via n8n) publica cada lunes el top 10 del mes anterior en #logros-y-wins.

El leaderboard se resetea el primer dia de cada mes.

El primer lugar recibe el badge MVP del Mes y rol morado durante 30 dias.

### 5.4 Badges permanentes (no se pierden)

| Badge | Criterio |
|-------|---------|
| Fundador | Creadores que entran en los primeros 30 dias del lanzamiento |
| Primer Proyecto | Completa su primera entrega aprobada |
| Racha x3 | Tres proyectos consecutivos sin revisiones pendientes |
| Referidor | Refiere un creador aprobado |
| Maestro del Hook | Gana el reto de hook en una convocatoria |
| Bilingue | Creador con proyectos entregados en ES y EN |
| Tier A | Badge permanente al llegar a Tier A (aunque luego baje) |
| 1 Ano | Un ano activo en el pool |

### 5.5 Recompensas reales

| Logro | Recompensa |
|-------|-----------|
| MVP del Mes | Featured en Instagram de @agenciaugccolombia (story + post) |
| Top 3 del mes | Prioridad en los proximos 3 proyectos disponibles de su Tier |
| Reto ganador | Sesion de feedback 1:1 con Diana (30 min) |
| Badge Fundador | Mencion permanente en la pagina web de UGC Colombia |
| 500 puntos acumulados | Acceso anticipado a proyectos antes de publicarlos al grupo general |
| 1.000 puntos acumulados | Carta de recomendacion firmada por Alexander Cast |
| Upgrade a Tier A | Acceso al canal #lounge-tier-a + consideracion para proyectos USA |

---

## 6. Calendario de contenido — 4 semanas tipo

El contenido de la comunidad lo lidera Tanya. Una pieza diaria, sin excepcion.

### Semana 1 — Fundamentos

| Dia | Canal | Tipo | Contenido |
|-----|-------|------|-----------|
| Lunes | Discord #recursos | Recurso | "Los 5 errores de hook mas comunes en UGC. Con ejemplos reales." |
| Martes | WhatsApp Anuncios | Aviso | Proyectos disponibles esta semana |
| Miercoles | Discord #reto-semanal | Reto | Reto: graba un hook de 3 segundos para un producto de cuidado personal |
| Jueves | Discord Sala de voz | Live | "Revision de hooks en vivo" — Tanya revisa 5 entregas del reto |
| Viernes | Discord #logros | Showcase | Top 3 entregas del reto + ganador |
| Sabado | Discord #preguntas | Hilo | "Pregunta de la semana: cual es tu setup actual de iluminacion?" |
| Domingo | WhatsApp Anuncios | Preview | "La semana que viene: masterclass de storytelling con Diana" |

### Semana 2 — Produccion

| Dia | Canal | Tipo | Contenido |
|-----|-------|------|-----------|
| Lunes | Discord #recursos | Recurso | Template de brief auto-completable (Notion) |
| Martes | WhatsApp Anuncios | Aviso | Proyectos disponibles + creadores con match por nicho |
| Miercoles | Discord #reto-semanal | Reto | Reto: entrega una toma de producto con tu setup actual en menos de 2 horas |
| Jueves | Discord Sala de voz | Masterclass | "De brief a entrega en 48h" — Diana Mile (45 min + preguntas) |
| Viernes | Discord #portfolio-showcase | Showcase | Hilo de portfolios: cada quien comparte su mejor pieza del mes |
| Sabado | Discord #preguntas | Hilo | Hilo colaborativo: tips de audio en espacios sin tratamiento acustico |
| Domingo | WhatsApp Anuncios | Preview | Semana 3: reto de colaboracion entre creadores |

### Semana 3 — Colaboracion

| Dia | Canal | Tipo | Contenido |
|-----|-------|------|-----------|
| Lunes | Discord #recursos | Recurso | Guia de angulos creativos para e-commerce (con ejemplos de campanas reales) |
| Martes | WhatsApp Anuncios | Aviso | Proyectos disponibles |
| Miercoles | Discord #reto-semanal | Reto | Reto de duplas: dos creadores graban el mismo script desde perspectivas diferentes |
| Jueves | Discord Sala de voz | Live | "Show & Tell": 6 creadores muestran un WIP o pieza reciente, el grupo da feedback |
| Viernes | Discord #logros | Showcase | Presentacion de las duplas del reto + votacion del servidor |
| Sabado | Discord #presentate | Hilo | Hilo de nuevos del mes: bienvenida colectiva a los que ingresaron en las ultimas 2 semanas |
| Domingo | WhatsApp Anuncios | Preview | Masterclass de la semana 4: UGC para USA con ingles |

### Semana 4 — Crecimiento y cierre de mes

| Dia | Canal | Tipo | Contenido |
|-----|-------|------|-----------|
| Lunes | Discord #recursos | Recurso | "Como subir de Tier C a B en 60 dias" — checklist practica |
| Martes | WhatsApp Anuncios | Aviso | Proyectos disponibles + ultimas plazas del mes |
| Miercoles | Discord #reto-semanal | Reto | Reto: graba un UGC en ingles (cualquier categoria) |
| Jueves | Discord Sala de voz | Masterclass | "UGC para el mercado USA Hispanic" — Alexander Cast (invitado) |
| Viernes | Discord #logros | Cierre mensual | Leaderboard final del mes + anuncio MVP + badges entregados |
| Sabado | Discord #preguntas | Retrospectiva | "Que aprendiste este mes? Comparte una sola cosa concreta" |
| Domingo | WhatsApp Anuncios | Arranque | Preview del mes siguiente + invitacion a referir nuevos creadores |

---

## 7. Rituales semanales y mensuales

### Semanales (inamovibles)

**Reto del Miercoles**
Tanya publica el reto a las 10:00 AM (hora Colombia). Siempre tiene: objetivo claro, entregable especifico, criterio de evaluacion, premio. Duracion: 72 horas (cierra el sabado a medianoche).

**Live del Jueves**
Alternancia semanal:
- Semana 1 y 3: "Revision en vivo" — Tanya o Diana revisan entregas del reto o trabajos del portafolio en tiempo real. Duracion: 45 min.
- Semana 2 y 4: "Masterclass practica" — un tema especifico de produccion, storytelling o negocio. Invitado externo 1 vez al mes. Duracion: 60 min.

**Showcase del Viernes**
Tanya publica en #logros-y-wins el top 3 del reto de la semana. Con screenshot del trabajo, nombre del creador, y por que gano. Obliga a que haya un ganador todas las semanas, sin excepcion.

**Proyectos del Martes**
Diana publica en WhatsApp Anuncios los proyectos disponibles esa semana. Formato fijo:
```
PROYECTO DISPONIBLE
Tipo: [Testimonial / Demo / UGC Lifestyle / etc.]
Duracion: [30s / 60s]
Mercado: [LATAM / USA]
Idioma: [ES / EN / ambos]
Nicho: [categoria]
Tier minimo: [A / B / cualquiera]
Fecha limite de entrega: [fecha]
Interesados: responder aqui o DM a Diana
```

### Mensuales

**Cierre y Leaderboard (ultimo viernes del mes)**
Tanya publica el ranking final. Diana entrega badges y recompensas. Se celebra publicamente al MVP. Si hay upgrade de Tier, se anuncia ese dia.

**Masterclass de Alexander (una vez al mes, semana 4)**
Alexander participa como invitado en el live del jueves. Temas: estrategia de agencia, mercado USA, tendencias UGC, oportunidades de crecimiento para creadores. Esto refuerza la conexion con el lider y da peso a la comunidad.

**Revision de Tiers (cada 90 dias)**
Diana revisa el scoring de todos los creadores activos. Creadores que mejoraron suben de Tier. Creadores inactivos por 60 dias pasan a estado "en pausa" y salen del grupo WhatsApp activo (siguen en Discord hasta 90 dias de inactividad).

---

## 8. Sistema de retencion — Anti-churn Tier A

Los creadores Tier A son el activo mas critico. Un creador Tier A que se va a otra agencia es una perdida directa de revenue.

### Protocolo de actividad

| Estado | Definicion | Accion |
|--------|-----------|--------|
| Activo | Entrego al menos 1 proyecto en los ultimos 30 dias O interactuo en comunidad | Sin accion |
| Tibio | Sin entregas en 30 dias, pero activo en Discord | Tanya lo menciona en un hilo relevante |
| En riesgo | Sin actividad en 45 dias (ni proyectos ni Discord) | Diana le escribe por WhatsApp (mensaje personal) |
| Critico | Sin respuesta en 60 dias | Alexander o Diana llaman directamente (WhatsApp audio o llamada) |
| Pausado | Sin actividad 90 dias | Sale del grupo activo. Queda en base de datos. Reingreso posible con proyecto nuevo. |

### Mensaje de reactivacion (Tier A en riesgo — dia 45)

Diana escribe por WhatsApp:

> "Hola [Nombre], te escribo porque tengo un proyecto que me tiene pensando en ti. Es para [tipo de marca] y necesita exactamente tu perfil de [nicho]. Disponible para la proxima semana. Me avisas?"

No mencionar la inactividad. Ofrecer trabajo directamente. Eso es lo que retiene a un creador Tier A.

### Beneficios exclusivos que justifican quedarse en Tier A

- Primera opcion en proyectos USA (los mejor pagados)
- Canal privado #lounge-tier-a con acceso a Diana directo
- Feedback de Alexander 1 vez por trimestre (sesion de 20 min)
- Featured mensual potencial en el Instagram de la agencia
- Carta de recomendacion para clientes o agencias internacionales
- Consideracion prioritaria para proyectos recurrentes (contratos mensuales con marcas)

### Lo que nunca se hace con un Tier A

- No se le manda broadcast genericos junto con Tier C
- No se le pide que aplique a proyectos publicamente como todos los demas. Se le ofrecen directamente.
- No se le ignora cuando entrega bien. Cada buena entrega de un Tier A recibe confirmacion directa de Diana.

---

## 9. Comunicacion interna — Reglas, moderacion y tono

### Codigo de conducta (publicado en #reglas-y-codigo-de-conducta)

**Lo que esta bien:**
- Pedir feedback sobre tu trabajo
- Compartir recursos, referencias, ideas
- Hacer preguntas, aunque parezcan basicas
- Celebrar los logros propios y los de otros
- Proponer mejoras a la comunidad

**Lo que no esta permitido:**
- Ofrecer servicios directamente a los clientes de UGC Colombia (rompe el contrato de colaboracion)
- Compartir precios, condiciones o detalles de proyectos fuera de los canales correspondientes
- Bajar el trabajo o el perfil de otro creador del pool
- Spam de portfolios o autopromociones fuera de #portfolio-showcase
- Compartir datos confidenciales de marcas (aplica NDA del contrato)

**Consecuencias:**
- Primera infraccion menor: aviso privado de Tanya
- Segunda infraccion: restriccion de canales por 7 dias
- Infraccion grave (compartir info de cliente, conflicto de interes): salida del pool y revision de contrato

### Tono de la comunidad

La comunidad no es un grupo de WhatsApp de freelancers esperando trabajo. Es un equipo profesional. El tono lo establecen Tanya y Diana con su forma de escribir:

- Directo, sin exceso de emojis
- Calido pero no forzado
- Se celebra el trabajo bien hecho, no el esfuerzo vacio
- Los errores se mencionan en privado, los logros en publico
- El humor es bienvenido pero no es el tono base

### Moderacion activa

Tanya es responsable de leer todos los canales de Discord una vez al dia (no en tiempo real). Diana monitorea los grupos de WhatsApp.

Si un canal pasa 5 dias sin actividad organica, Tanya publica un prompt o hilo para reactivarlo. La comunidad no puede verse abandonada.

---

## 10. Integracion con "Los Reyes del Contenido"

"Los Reyes del Contenido" es la comunidad de Alexander Cast orientada a creadores que aprenden a monetizar su contenido.

La integracion es estrategica, no operativa. Los dos ecosistemas no se mezclan operativamente, pero se alimentan mutuamente.

### Flujo de integracion

```
Los Reyes del Contenido (comunidad de Alexander)
    |
    | Creadores con potencial UGC identificados
    v
Invitacion a aplicar al pool de UGC Colombia
    |
    | Pasan el scoring de Diana Mile
    v
Ingresan al pool de creadores (comunidad cerrada)
    |
    | Creadores Tier A con logros destacados
    v
Regresa como caso de exito a Los Reyes del Contenido
    (Alexander los presenta como prueba social)
```

### Reglas de la integracion

1. UGC Colombia NO se promociona como una comunidad publica dentro de Los Reyes del Contenido. Se menciona como "oportunidad para creadores calificados" con proceso de aplicacion. Mantiene la exclusividad.

2. Alexander puede mencionar casos de exito del pool en sus contenidos de Los Reyes del Contenido, con permiso del creador y sin revelar tarifas o clientes.

3. Los creadores del pool que quieran acceder a formacion adicional de Alexander pueden ser referidos a Los Reyes del Contenido con un acceso especial o descuento. Esto genera ingreso adicional para el ecosistema.

4. Una vez al trimestre, Alexander hace un live conjunto donde habla de tendencias UGC ante la audiencia de Los Reyes del Contenido y menciona al pool como el equipo de implementacion. Esto genera aplicaciones nuevas al pool de manera organica.

5. Los dos ecosistemas comparten el mismo posicionamiento: "UGC latino con estandar USA." La coherencia de mensaje es no negociable.

---

## 11. Metricas de salud de la comunidad

### KPIs principales (revision semanal por Tanya)

| Metrica | Formula | Meta mes 3 | Meta mes 6 |
|---------|---------|-----------|-----------|
| Creadores activos | Creadores con al menos 1 accion en 30 dias / total del pool | 50 | 150 |
| Tasa de participacion en retos | Entregas al reto semanal / total miembros Discord | >20% | >25% |
| Tasa de asistencia a masterclass | Asistentes en vivo / total miembros | >30% | >30% |
| Proyectos asignados por mes | Conteo en Supabase | 20 | 60 |
| Tiempo promedio de asignacion | Desde publicacion hasta creador confirmado | <48h | <24h |
| Tasa de entrega a tiempo | Proyectos entregados en fecha / total asignados | >85% | >90% |
| Referidos aprobados | Nuevos creadores que entran por referido / total nuevos | >15% | >25% |
| Churn mensual Tier A | Creadores Tier A que salen o pasan a pausado / total Tier A | <5% | <3% |

### KPIs de comunidad (revision mensual por Alexander)

| Metrica | Umbral saludable | Alerta | Critico |
|---------|-----------------|--------|---------|
| DAU/MAU Discord | >25% | 15-25% | <15% |
| Mensajes por miembro/mes | >5 | 2-5 | <2 |
| Tasa de retencion a 30 dias | >80% | 65-80% | <65% |
| Tasa de retencion a 90 dias | >60% | 45-60% | <45% |
| NPS (encuesta trimestral) | >50 | 30-50 | <30 |
| Tasa de referidos activos | >15% | 8-15% | <8% |

### Como medir

- Discord: el bot MEE6 da estadisticas nativas de mensajes por usuario y por canal. Tanya exporta el reporte mensual.
- Proyectos y creadores: Supabase (tablas creators y projects ya configuradas en el sistema operativo).
- Retencion de Tiers: Diana revisa manualmente en Supabase cada primer lunes del mes.
- NPS: encuesta de Google Forms enviada por Tanya via WhatsApp Anuncios cada trimestre. Anonima. 3 preguntas.

---

## 12. Roadmap 90 dias

### Mes 1 — Construccion (semanas 1 a 4)

**Objetivo: 20 creadores activos, comunidad operativa.**

| Semana | Tanya | Diana | Alexander |
|--------|-------|-------|-----------|
| 1 | Configura servidor Discord, roles, bots, canales. Redacta el codigo de conducta. | Migra lista existente de creadores aprobados. Crea grupos WhatsApp segmentados. | Aprueba la arquitectura. Graba video de bienvenida (2 min, va al canal #bienvenida). |
| 2 | Lanza el servidor con los primeros 15-20 creadores ya aprobados. Ejecuta el onboarding dia 0-7 para cada uno. | Envia invitaciones personales por WhatsApp a cada creador. Explica el por que de la comunidad. | Participa en el primer live del jueves como invitado especial de lanzamiento. |
| 3 | Ejecuta primer reto del miercoles. Publica primer showcase del viernes. Activa leaderboard. | Publica primeros proyectos disponibles en el canal correspondiente. Asigna los primeros 5 proyectos via comunidad. | Ninguna accion operativa requerida. Monitorea metricas. |
| 4 | Cierre del primer mes: leaderboard, badges fundador, primer MVP. Encuesta de retroalimentacion a todos. | Revision de primeras entregas. Actualiza scoring si hay datos nuevos. Identifica candidatos a upgrade de Tier. | Masterclass de cierre de mes: "El mercado UGC en 2026, donde esta la oportunidad." |

**Indicador de exito mes 1:** 20+ creadores en Discord, tasa de participacion en primer reto >30%, al menos 3 proyectos asignados via comunidad.

### Mes 2 — Activacion (semanas 5 a 8)

**Objetivo: 35 creadores activos, primeros casos de exito documentados.**

- Tanya activa campana de referidos: mensaje en WhatsApp Anuncios el dia 1 del mes con el beneficio de referir.
- Diana identifica los 3 mejores creadores del mes 1 y los featurea en Instagram de la agencia.
- Alexander menciona el pool una vez en el contenido de Los Reyes del Contenido, con link de aplicacion.
- Se incorporan al menos 15 creadores nuevos via aplicaciones organicas o referidos.
- Se consolida el ritmo semanal: reto del miercoles, live del jueves, showcase del viernes son innegociables.
- Primera masterclass con invitado externo (editor de video, experto en TikTok, o creador Tier A invitado).
- Tanya realiza primer analisis de canales: que canales tienen mas actividad organica y cuales estan muertos. Elimina o fusiona los que no funcionan.

**Indicador de exito mes 2:** 35+ creadores activos, 3 casos de exito documentados con nombre y resultados, tasa de churn Tier A 0%.

### Mes 3 — Escala inicial (semanas 9 a 12)

**Objetivo: 50 creadores activos, sistema funcionando sin dependencia de Alexander en lo operativo.**

- Tanya y Diana operan la comunidad de manera autonoma. Alexander aparece una vez al mes.
- Se implementa el sistema de reactivacion automatico via n8n: bot detecta inactividad de 3 dias y envia DM automatico en Discord.
- Se lanza la primera convocatoria abierta de aplicaciones (formulario activo, promovido en Instagram de la agencia).
- Se publican los primeros dos casos de exito en formato largo (LinkedIn de Alexander + story de Instagram).
- Primera encuesta NPS al pool completo.
- Revision de Tiers de 90 dias: primeros upgrades oficiales.
- Se evalua si agregar un Tier D (aspirantes en lista de espera) para gestionar el crecimiento del pipeline.

**Indicador de exito mes 3:** 50 creadores activos verificados, sistema de onboarding ejecutado sin fallas en todos los nuevos, NPS >40.

### Meses 4-6 — Consolidacion

- Meta de 150 creadores activos al mes 6 requiere incorporar ~16-17 creadores nuevos por mes a partir del mes 3.
- Para ese volumen, Tanya necesita al menos una persona de apoyo en moderacion (parte del equipo o un creador Tier A con rol de "Embajador de Comunidad" con beneficios adicionales).
- El servidor Discord se segmenta por nicho (moda, tech, salud, etc.) para hacer los proyectos mas relevantes por canal.
- Se evalua la migracion de proyectos disponibles a Kreoon (si el modulo de comunidad esta listo) para tener trazabilidad completa.

---

## 13. Responsabilidades del equipo

| Tarea | Responsable | Frecuencia |
|-------|------------|------------|
| Configuracion y mantenimiento del servidor Discord | Tanya | Setup inicial + ajustes mensuales |
| Contenido diario de la comunidad (Discord) | Tanya | Diario |
| Reto semanal (publicacion y evaluacion) | Tanya | Miercoles y viernes |
| Live semanal (logistica y moderacion) | Tanya | Jueves |
| Leaderboard y badges mensuales | Tanya | Ultimo viernes del mes |
| Moderacion de WhatsApp grupos | Tanya (Tier B/C) + Diana (Tier A) | Diario |
| Publicacion de proyectos disponibles | Diana | Martes |
| Asignacion de proyectos a creadores | Diana | Segun disponibilidad |
| Onboarding de nuevos creadores (dia 0) | Diana | Cada aprobacion |
| Revision de scoring y Tiers | Diana | Cada 90 dias |
| Protocolo de reactivacion (creadores en riesgo) | Diana | Segun alertas |
| Masterclass mensual | Alexander (invitado) | Mensual |
| Integracion con Los Reyes del Contenido | Alexander | Trimestral |
| Revision de metricas generales | Alexander | Primer lunes de cada mes |
| Encuesta NPS | Tanya (envia) + Alexander (analiza) | Trimestral |
