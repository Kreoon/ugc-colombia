# PACK OPERATIVO — TANYA
## Community & Content · UGC Colombia

**Fecha:** 2026-04-09
**Versión:** 1.0
**Rol:** Lead de comunidad de creadores + content editorial multicanal + WhatsApp L1
**Uso:** Operación diaria del pool de creadores + publicaciones semanales + atención en WhatsApp.

---

## Tabla de contenidos

1. [Plan de comunidad creadores](#1-comunidad)
2. [Arquitectura Discord + WhatsApp](#2-arquitectura)
3. [Onboarding creador día 0-30](#3-onboarding)
4. [Gamificación: puntos, badges, recompensas](#4-gamificacion)
5. [Calendario de contenido comunidad (4 semanas tipo)](#5-calendario-comunidad)
6. [Rituales semanales y mensuales](#6-rituales)
7. [Calendario editorial multicanal (7 redes)](#7-calendario-editorial)
8. [Banco de hooks (muestra)](#8-hooks)
9. [Ideas de guion por nicho](#9-guiones)
10. [Sistema WhatsApp Business](#10-whatsapp)
11. [Métricas y roadmap](#11-metricas)

---

## 1. Plan de comunidad — Pool de creadores

**Meta:** 50 creadores activos (mes 3) → 150 creadores activos (mes 6).
**Lead comunidad:** Tanya. **Lead creadores:** Diana Mile. **Dirección:** Alexander Cast.

### Decisión de plataforma: Discord + WhatsApp (híbrido)

| Capa | Plataforma | Función |
|---|---|---|
| Operativa diaria | WhatsApp (grupos segmentados por Tier) | Asignación, avisos urgentes, comunicación rápida |
| Comunidad y crecimiento | Discord (servidor UGC Colombia) | Masterclasses, challenges, reconocimientos, networking, educación |

**Por qué no Circle/Skool:** costo alto para el volumen actual; Skool es para cursos (el creador viene a trabajar, no a estudiar).
**Por qué Discord:** gratuito, canales por categoría, bots nativos de gamificación (MEE6, Carl-bot), roles visuales por Tier, integración n8n.
**Por qué WhatsApp:** comunicación operativa no puede vivir en Discord. Tier A quiere respuesta rápida en el canal que ya usa.

---

## 2. Arquitectura Discord + WhatsApp

### Estructura del servidor Discord

```
SERVIDOR: UGC Colombia — Pool de Creadores

INFORMACIÓN (solo lectura)
  # bienvenida
  # reglas-y-codigo-de-conducta
  # novedades-de-la-agencia
  # proyectos-disponibles (feed automático desde n8n)

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

TIER A — ROL EXCLUSIVO
  # lounge-tier-a
  # oportunidades-usa
  # feedback-directo-diana

VOZ Y VIDEO
  Sala: Masterclass Mensual
  Sala: Coworking Creativo (abierta siempre)
  Sala: Feedback en vivo

BOT / ADMIN
  # bot-puntos
  # alertas-internas
```

### Roles del servidor

| Rol | Color | Quién |
|---|---|---|
| Equipo UGC | Rojo | Alexander, Tanya, Diana |
| Tier A | Dorado | Creadores 75-100 pts |
| Tier B | Plateado | Creadores 50-74 pts |
| Tier C | Verde | Creadores 25-49 pts |
| Nuevo | Gris | Primeras 2 semanas |
| MVP del Mes | Morado | Ganador mensual ranking |

### Grupos WhatsApp (capa operativa)

```
UGC Colombia — Tier A (max 30)
  Moderado por: Diana Mile
  Uso: proyectos prioritarios, oportunidades USA, feedback rápido

UGC Colombia — Tier B/C (hasta 80)
  Moderado por: Tanya
  Uso: proyectos disponibles, avisos operativos

UGC Colombia — Anuncios (broadcast, solo lectura)
  Moderado por: Tanya
  Uso: masterclasses, retos semanales, logros, novedades
```

---

## 3. Onboarding creador día 0-30

### Prerequisito: aprobado por Diana con scoring A/B/C.

**Día 0 — Bienvenida operativa (WhatsApp, Diana):**
> "Hola [Nombre], soy Diana del equipo de UGC Colombia. Quedaste en nuestro pool Tier [A/B/C], felicitaciones. En las próximas horas te llegará el link para unirte a nuestra comunidad en Discord y al grupo de WhatsApp de tu Tier."

Acciones Diana:
- Envía link de invitación Discord (expira en 24h)
- Agrega al grupo WhatsApp del Tier
- Crea registro en Supabase (activo, tier, fecha)

**Día 0 — Bienvenida Discord (automatizada MEE6):**
> "Bienvenido al pool de UGC Colombia, [Nombre]. Eres parte de un grupo selecto de creadores verificados en LATAM. Tu tier actual es [A/B/C]. Completa tu presentación en #presentate-aqui y empieza a sumar puntos."

**Día 1 — Primera acción (Tanya publica en #presentate-aqui):**
> "Si acabas de llegar, preséntate con: tu nombre, ciudad, nicho fuerte, y una cosa que te hace diferente. Los primeros 5 que se presenten esta semana ganan 50 puntos."

**Día 2 — Entrega de valor:** Template de brief, guía de iluminación, banco de hooks.

**Día 3 — Check-in automático (bot DM si no ha interactuado):**
> "Hola [Nombre], te uniste hace 3 días y todavía no te hemos visto por ahí. Esta semana hay un reto activo en #reto-semanal y oportunidades en #proyectos-disponibles."

**Día 5 — Invitación al primer reto:** Tanya menciona al creador directamente.

**Día 7 — Encuesta primera semana (DM bot):** 3 preguntas: útil? qué faltó? conoces creador para referir?

**Día 14 — Reconocimiento:** si participó en al menos una acción, shoutout en #logros-y-wins.

**Día 30 — Evaluación primer mes:** Diana revisa proyectos entregados, participación, respuesta. Tier C con calidad → upgrade a B. Tier A sin proyectos en 30 días → protocolo retención.

---

## 4. Gamificación

### Moneda: Puntos de Producción (PP)

Simbólicos, no canjeables por dinero. Determinan reconocimiento, acceso y prioridad en proyectos.

### Tabla de puntos

| Acción | Puntos |
|---|---|
| Presentarse en #presentate-aqui | 50 |
| Completar perfil Discord | 25 |
| Participar en reto semanal | 100 |
| Ganar reto semanal | 250 |
| Entregar proyecto a tiempo | 150 |
| Entregar sin revisiones (aprobado ronda 1) | +100 bonus |
| Calificación 5/5 del cliente | +150 bonus |
| Publicar en #portfolio-showcase | 75 |
| Responder pregunta útil en Q&A | 50 |
| Referir creador que es aprobado | 200 |
| Asistir masterclass en vivo | 75 |
| Asistir masterclass + hacer pregunta pública | +50 |
| Upgrade Tier (C→B o B→A) | 500 + celebración |

### Leaderboard mensual

MEE6 o ranking personalizado publica cada lunes top 10 del mes anterior en #logros-y-wins. Reseteo primer día del mes. Primer lugar recibe MVP del Mes + rol morado 30 días.

### Badges permanentes

| Badge | Criterio |
|---|---|
| Fundador | Entra en primeros 30 días del lanzamiento |
| Primer Proyecto | Completa primera entrega aprobada |
| Racha x3 | 3 proyectos consecutivos sin revisiones pendientes |
| Referidor | Refiere creador aprobado |
| Maestro del Hook | Gana reto de hook |
| Bilingüe | Proyectos entregados en ES y EN |
| Tier A | Al llegar a Tier A (aunque luego baje) |
| 1 Año | Año activo en el pool |

### Recompensas reales

| Logro | Recompensa |
|---|---|
| MVP del Mes | Featured en IG @agenciaugccolombia (story + post) |
| Top 3 del mes | Prioridad en 3 próximos proyectos de su Tier |
| Reto ganador | Sesión feedback 1:1 con Diana (30 min) |
| Badge Fundador | Mención permanente en web UGC Colombia |
| 500 puntos acumulados | Acceso anticipado a proyectos |
| 1.000 puntos | Carta de recomendación firmada por Alexander |
| Upgrade a Tier A | Acceso #lounge-tier-a + proyectos USA |

---

## 5. Calendario de contenido comunidad — 4 semanas tipo

Contenido liderado por Tanya. **Una pieza diaria, sin excepción.**

### Semana 1 — Fundamentos

| Día | Canal | Tipo | Contenido |
|---|---|---|---|
| Lunes | Discord #recursos | Recurso | "Los 5 errores de hook más comunes en UGC. Con ejemplos reales." |
| Martes | WhatsApp Anuncios | Aviso | Proyectos disponibles esta semana |
| Miércoles | Discord #reto-semanal | Reto | Graba un hook de 3s para un producto de cuidado personal |
| Jueves | Discord sala voz | Live | "Revisión de hooks en vivo" — Tanya revisa 5 entregas |
| Viernes | Discord #logros | Showcase | Top 3 entregas del reto + ganador |
| Sábado | Discord #preguntas | Hilo | "¿Cuál es tu setup actual de iluminación?" |
| Domingo | WhatsApp Anuncios | Preview | Semana siguiente: masterclass de storytelling con Diana |

### Semana 2 — Producción

Lunes: template brief auto-completable | Martes: proyectos disponibles + match por nicho | Miércoles: reto entrega con tu setup en <2h | Jueves: masterclass Diana "De brief a entrega en 48h" | Viernes: portfolio showcase | Sábado: hilo tips audio | Domingo: preview reto duplas.

### Semana 3 — Colaboración

Lunes: guía ángulos creativos para e-commerce | Martes: proyectos | Miércoles: reto duplas (2 creadores mismo script distintas perspectivas) | Jueves: "Show & Tell" 6 creadores muestran WIP | Viernes: showcase duplas + votación | Sábado: bienvenida colectiva nuevos del mes | Domingo: preview masterclass UGC USA.

### Semana 4 — Crecimiento y cierre

Lunes: "Cómo subir de Tier C a B en 60 días" checklist | Martes: proyectos + últimas plazas del mes | Miércoles: reto UGC en inglés | Jueves: **Masterclass Alexander "UGC para USA Hispanic"** | Viernes: leaderboard final + MVP + badges | Sábado: retrospectiva "¿qué aprendiste este mes?" | Domingo: arranque próximo mes + invitación a referir.

---

## 6. Rituales semanales y mensuales

### Semanales (inamovibles)

- **Reto del miércoles (10am COT):** objetivo claro + entregable específico + criterio + premio. 72h duración, cierra sábado medianoche.
- **Live del jueves:** S1/S3 "Revisión en vivo" (45 min) | S2/S4 "Masterclass práctica" (60 min, invitado externo 1/mes).
- **Showcase del viernes:** top 3 del reto en #logros-y-wins. Obligatorio tener ganador.
- **Proyectos del martes (Diana, WhatsApp Anuncios, formato fijo):**
```
PROYECTO DISPONIBLE
Tipo: [Testimonial/Demo/etc.]
Duración: [30s/60s]
Mercado: [LATAM/USA]
Idioma: [ES/EN/ambos]
Nicho: [categoría]
Tier mínimo: [A/B/cualquiera]
Fecha límite: [fecha]
Interesados: responder aquí o DM Diana
```

### Mensuales

- **Cierre y Leaderboard** (último viernes): ranking, badges, MVP, upgrades de Tier.
- **Masterclass Alexander** (semana 4): estrategia de agencia, mercado USA, tendencias UGC.
- **Revisión de Tiers** (cada 90 días, Diana): upgrades y estado "en pausa" para inactivos.

### Retención Tier A (anti-churn)

| Estado | Criterio | Acción |
|---|---|---|
| Activo | Entrega o interacción en 30 días | Sin acción |
| Tibio | Sin entregas en 30d pero activo en Discord | Tanya lo menciona en hilo relevante |
| En riesgo | Sin actividad 45 días | Diana escribe WhatsApp personal |
| Crítico | Sin respuesta 60 días | Alexander o Diana llaman directo |
| Pausado | Sin actividad 90 días | Sale del grupo activo, reingreso con proyecto nuevo |

**Mensaje reactivación Tier A (día 45, Diana):**
> "Hola [Nombre], te escribo porque tengo un proyecto que me tiene pensando en ti. Es para [tipo de marca] y necesita exactamente tu perfil de [nicho]. Disponible para la próxima semana. ¿Me avisas?"

**Regla:** no mencionar inactividad. Ofrecer trabajo directamente.

---

## 7. Calendario editorial multicanal (7 redes)

### Arquitectura de canales y frecuencia

| Canal | Frec. semanal | Frec. mensual | Rol estratégico |
|---|---|---|---|
| Instagram (@agenciaugccolombia) | 4 posts | 16 posts | Awareness + Authority |
| TikTok | 5 videos | 20 videos | Viralidad TOFU masivo |
| LinkedIn Empresa | 3 posts | 12 posts | Leads B2B directos |
| LinkedIn Alexander | 3 posts | 12 posts | Personal brand + cierre |
| YouTube (Shorts + Long) | 2 Shorts + 1 Long/2sem | 8 Shorts + 2 Long | SEO + Autoridad evergreen |
| X (Twitter) | 5 tweets/threads | 20 | Distribución + comunidad |
| WhatsApp Business | 2 broadcasts | 8 | BOFU directo |
| Newsletter (Beehiiv) | 1 envío/semana | 4 | Nurture MOFU/BOFU |

**Total: ~100 activos de contenido/mes.**

### Mix TOFU/MOFU/BOFU por canal

| Canal | TOFU | MOFU | BOFU |
|---|---|---|---|
| IG Reels | 50% | 30% | 20% |
| IG Carrusel | 20% | 60% | 20% |
| TikTok | 65% | 25% | 10% |
| LinkedIn Empresa | 30% | 45% | 25% |
| LinkedIn Alexander | 25% | 40% | 35% |
| YouTube Long | 10% | 70% | 20% |
| YouTube Shorts | 55% | 30% | 15% |
| X | 60% | 30% | 10% |
| WhatsApp | 0% | 20% | 80% |
| Newsletter | 10% | 50% | 40% |

### Formatos óptimos por plataforma

- **IG Reel 15-30s:** hook brutal primeros 1.5s, audio trending, TOFU viral y BOFU testimonios.
- **IG Reel 45-60s:** tutoriales, casos de éxito.
- **IG Carrusel 7-10 slides:** slide 1 hook visual, slide final CTA. Educación y guardados.
- **TikTok 15-30s:** pattern interrupt en 0.8s, texto overlay, cortes rápidos.
- **LinkedIn post texto 1200-2000 chars:** primera línea = hook antes del "ver más", párrafos cortos, martes-jueves 8-10am.
- **LinkedIn carrusel PDF:** frameworks, guías, casos. Alto engagement B2B.
- **YouTube Short 30-58s:** reutilizar TikToks con captions nativas.
- **YouTube Long-form 8-15min:** guía definitiva / caso estudio profundo, SEO evergreen.
- **X thread 6-12 tweets:** hook en tweet 1, valor 2-10, CTA en último.
- **WhatsApp broadcast:** lista segmentada, texto corto + CTA directo.
- **Newsletter Beehiiv 400-600 palabras:** asunto corto, 1 insight accionable, 1 caso real, 1 CTA único.

### Ejemplo día a día — Semana 1 (7-13 abril) "El modelo de negocio UGC"

**Lunes 7 abril:**
- IG Reel 20s (7:30am): Hook "Las marcas te están pagando por videos que ya sabes hacer..." → CTA guardar el video.
- TikTok 25s (7pm): Hook "PARA. Las marcas pagan $200 USD por UN video de 30s". VO + texto overlay. CTA "sígueme, esta semana explico cómo empezar".
- LinkedIn empresa texto 1400 chars (8:30am): Hook "El 78% de los consumidores en LATAM confían más en un video de un cliente real que en un anuncio."

**Martes 8 abril:**
- TikTok 40s (12pm): Hook "Así funciona exactamente una campaña UGC de $1000". Desglose brief → casting → producción → entrega.
- LinkedIn Alexander 1600 chars (8am): Historia de origen con números reales.
- X thread 7 tweets (9am): "El UGC no es tendencia, es el nuevo estándar."

**Miércoles 9 abril:**
- IG Carrusel 8 slides (12pm): "5 errores que matan tu contenido UGC (y cómo evitarlos)".
- TikTok 20s (7am): Hook "El creador UGC que contratamos ganó más que nuestro diseñador senior..."
- Newsletter Beehiiv envío #1 (8am): "El negocio que las marcas no te están contando". Dato CPM UGC vs paid ads + framework + caso real + CTA auditoría gratuita.

**Jueves 10 abril:**
- IG Reel 30s (12pm): Testimonial cliente (MOFU)
- TikTok 30s (7pm): Pattern interrupt BOFU
- LinkedIn empresa carrusel PDF 9 slides: "Cómo evaluar si necesitas UGC"

**Viernes 11 abril:**
- IG post o reel (10am): cierre semana
- TikTok 25s + LinkedIn Alexander post: lecciones de la semana
- WhatsApp Business broadcast: oferta descubrimiento call 15 min

**Sábado 12 abril:**
- TikTok 20s: contenido lifestyle detrás de cámaras
- X: hot take del día

**Domingo 13 abril:**
- IG Story secuencia (5-7 stories): preview semana siguiente
- Newsletter: resumen y preview

### Horarios recomendados (hora Colombia, UTC-5)

- **LinkedIn:** martes-jueves 8-10am
- **Instagram:** 7:30am + 12pm + 7pm
- **TikTok:** 7am, 12pm, 7pm
- **X:** 9am, 12pm, 6pm
- **WhatsApp broadcast:** martes 10am + viernes 4pm

---

## 8. Banco de hooks (muestra de 50 hooks total)

**Principio:** Nunca reutilizar el mismo hook dentro de la misma semana en el mismo canal.

### Pattern Interrupt (los más directos) — B2B ecommerce

1. "PARA. No publiques otro ad sin ver esto primero." (TikTok/IG Reel, TOFU)
2. "Tu agencia creativa te está cobrando $5.000 por algo que cuesta $300." (TikTok/LinkedIn, TOFU)
3. "El 90% de los ecommerces en LATAM están haciendo esto mal con su contenido." (LinkedIn/IG, TOFU)
4. "Hace 6 meses este ecommerce tenía un CPA de $18. Hoy es $4.50." (IG Reel/LinkedIn, BOFU)
5. "No necesitas un equipo de producción. Necesitas esto." (TikTok/IG, TOFU/MOFU)

### Curiosity Gap

6. "Descubrí esto después de revisar 200 campañas de Meta para ecommerce..." (TikTok/IG Reel, MOFU)
7. "Existe un tipo de video que Meta prioriza sobre todos los demás en 2026." (LinkedIn/TikTok, MOFU)
8. "La razón por la que tus ads se ven bien pero no convierten nadie te la explica." (LinkedIn/IG, MOFU)
9. "Analizamos los 10 ecommerces con mejor ROAS en LATAM. Todos tienen esto en común." (LinkedIn/IG Carrusel)
10. "La métrica que los founders de ecommerce ignoran y que predice si su negocio va a escalar." (LinkedIn/Newsletter)

### Prueba social y resultados

11. "Así conseguimos 50 clientes nuevos en 30 días para una marca DTC sin aumentar el presupuesto." (BOFU)
12. "Esta marca gastó $800 en UGC y recuperó $12.000 en ventas en 3 semanas." (BOFU)
13. "Le preguntamos a 20 founders de ecommerce por qué cambiaron a UGC. Esto dijeron." (BOFU)
14. "Rechazamos una propuesta de $3.000 al mes. Por esto." (MOFU/BOFU)
15. "Nuestro cliente de suplementos bajó su CPA de $22 a $6. El proceso exacto." (BOFU)

### Educativo + Autoridad

16. "3 tipos de video UGC que convierten mejor en Meta Ads este trimestre (con ejemplos)."
17. "El brief de UGC que le mandamos a todos nuestros creators. Cópiatelo."
18. "Si gestionas paid media para un ecommerce, esta información cambia cómo asignas tu presupuesto."
19. "5 errores que cometen los ecommerces cuando briefan un creator de UGC (y cómo evitarlos)."
20. "Lo que ninguna agencia creativa te dice sobre por qué tus ads no convierten."

### Por nicho — Beauty & Skincare (muestra)

21. "Tu cliente ideal no le cree a los before/after que produces tú. Le cree a alguien como ella."
22. "Una selfie de 30 segundos vendió más unidades que la campaña de influencer de $8.000."
23. "El tipo de skin que más convierte en UGC para skincare no es el que piensas."
24. "Por qué las marcas de beauty premium están usando UGC de micro-creators en lugar de mega-influencers."
25. "Esta marca colombiana vendió 500 unidades en 48 horas con 3 videos UGC."

### Por nicho — Fitness & Suplementos (muestra)

26. "El problema con los ads de suplementos no es el producto. Es que no se parece a nadie real."
27. "Esta marca de proteína bajó su CPA de $22 a $6 en 45 días con UGC. Sin cambiar el producto."
28. "El video UGC de suplementos que rompe todas las reglas y aun así convierte al 8%."
29. "Por qué las personas compran suplementos de un desconocido en TikTok y no de tu landing page."
30. "3 tipos de creator que generan más confianza para marcas de fitness en 2026."

### Por nicho — Food & Beverage (muestra)

31. "No puedes hacer probar tu producto por internet. Pero sí puedes hacer que tu cliente lo imagine."
32. "Esta marca de snacks genera 300+ UGCs al mes sin pagar a ningún creator. El sistema exacto."
33. "El unboxing de comida que generó 2M de views y agotó el stock en 72 horas."
34. "El video de 'primera vez que pruebo' convierte 3x más que el video de receta. Por qué."
35. "Cuánto gana un creator UGC de food en LATAM. Los rangos reales."

### Por nicho — Tech & Apps (muestra)

36. "Por qué tu app con 5 estrellas en la App Store no convierte en Meta Ads."
37. "El creator que generó 40K downloads orgánicos para una app en 2 semanas. Cómo lo hizo."
38. "Tu demo de producto no debería ser un demo de producto."
39. "Los 3 formatos de UGC que más funcionan para SaaS B2C."
40. "La diferencia entre un video UGC de tech y un 'review' de YouTube."

### Por nicho — Finanzas & Fintech (muestra)

41. "Tu cliente de finanzas no confía en tu banner. Confía en alguien que pasó por lo mismo."
42. "Por qué el UGC es la única forma de hacer marketing de fintech que no parece estafa."
43. "Una persona hablando de su experiencia real convierte 4x más que un infográfico animado."
44. "Los 5 angulos de UGC que más convierten para fintech en 2026."
45. "El tipo de creator que una marca de finanzas debería contratar (y nadie lo hace)."

**Fórmulas base reutilizables:**
- "El X% de [audiencia] hace [acción] mal. Te explico por qué."
- "Esta marca pasó de [métrica mala] a [métrica buena] en [tiempo corto]."
- "Lo que nadie te dice sobre [tema relevante]."
- "Si [condición audiencia], deberías ver esto."
- "Rechazamos [oportunidad $] por esto."

---

## 9. Ideas de guion por nicho (20 guiones referencia)

Los guiones completos viven en `content/sistemas/contenido/10-guiones-lanzamiento.md` y `20-guiones-lote-2.md`. Aquí las líneas de ataque:

1. **Testimonial beauty** — Fundadora joven cuenta cómo un producto cambió su rutina
2. **Unboxing suplemento** — Primera vez abriendo y probando, reacción genuina
3. **Demo skincare** — Rutina 3 pasos mañana/noche
4. **Review comparativo moda** — Mismo outfit 3 marcas, veredicto
5. **Lifestyle food** — Almuerzo en oficina con snack de marca
6. **Hook-ad tech** — "Si tu app no tiene esto, estás perdiendo usuarios"
7. **Problem-solution home** — "Mi casa siempre olía a humedad hasta que..."
8. **Before/after fitness** — 30 días con suplemento, resultado honesto
9. **UGC en inglés** — Versión anglo del top converter
10. **Testimonial fintech** — Emprendedor latino cuenta cómo manejó primera factura en USD
11-20. Variantes de los anteriores para A/B testing

---

## 10. Sistema WhatsApp Business

### Perfil de negocio

```
Nombre: UGC Colombia | Agencia Boutique
Categoría: Advertising / Marketing
Descripción: Agencia boutique de UGC para marcas DTC y e-commerce en LATAM
             y USA. Videos que venden. Hechos por creators reales.
             Entrega en 14 días. Starter desde $500 USD/mes.
Sitio web: https://ugccolombia.co
Email: founder@kreoon.com
Dirección: Bogotá, Colombia
```

### Horarios

```
L-V: 8am - 7pm COT
Sáb: 9am - 1pm COT
Dom: Cerrado
```

**Ventana de silencio:** 9pm - 8am COT. Jarvis no envía proactivo fuera de horario.

### Mensaje de bienvenida (dentro de horario)

```
Hola {{1}}, bienvenido a UGC Colombia.

Somos la agencia boutique de UGC que ayuda a marcas DTC y e-commerce
a escalar con videos que realmente convierten en Meta, TikTok y orgánico.

¿En qué te puedo ayudar hoy?

1. Quiero conocer los servicios
2. Tengo una marca y quiero cotizar
3. Soy creator y quiero aplicar
4. Tengo otra pregunta
```

### Mensaje de ausencia

```
Hola {{1}}, recibí tu mensaje.

Nuestro horario de atención es lunes a viernes de 8am a 7pm
y sábados de 9am a 1pm (hora Colombia).

Te respondo al inicio del siguiente turno. Si es urgente,
puedes agendar directamente en: ugccolombia.co/discovery-call
```

### Catálogo de servicios (Business Catalog)

**Producto 1 — Plan Starter ($500 USD/mes):**
- 8 videos UGC/mes (15-60s)
- 1 creator rotativo
- Brief estratégico
- 1 ronda de revisión
- Derechos paid media 12 meses
- Entrega 14 días hábiles

**Producto 2 — Plan Growth ($950 USD/mes):**
- 16 videos/mes (mix formatos)
- 3 creators pre-aprobados
- Estrategia ángulos mensual (4 testeados)
- Acceso Kreoon
- 2 rondas revisión
- Reunión performance mensual

**Producto 3 — Plan Scale ($1.500 USD/mes):**
- 30+ videos ES + EN nativos
- 5 creators rotación
- Estrategia quincenal con data Meta
- Account manager dedicado
- Kreoon completo
- Revisiones ilimitadas
- Derechos paid + orgánico 24 meses
- Reuniones semanales

**Producto 4 — Audit UGC Gratuito ($0):**
Video Loom 7 min con Alexander, análisis + 3 recomendaciones. 48h.

**Producto 5 — Kit UGC 2026 (PDF gratis):**
28 páginas. Lead magnet con link directo.

### Labels (8 etiquetas)

| Label | Color | Descripción |
|---|---|---|
| `prospecto-frio` | Gris | Primer contacto sin calificar |
| `calificado` | Azul | Score BANT ≥10 |
| `call-agendada` | Amarillo | Discovery confirmada Cal.com |
| `propuesta-enviada` | Naranja | Propuesta en evaluación |
| `cliente-activo` | Verde | Contrato firmado, facturando |
| `pausa` | Morado | Cliente en pausa temporal |
| `churn` | Rojo | Canceló o no renovó |
| `nurture-largo` | Gris claro | Score BANT <10, potencial futuro |

### Transiciones automáticas

```
prospecto-frio → calificado (score ≥10 BANT)
prospecto-frio → nurture-largo (score <10)
calificado → call-agendada (Cal.com confirm)
call-agendada → propuesta-enviada (post-discovery)
propuesta-enviada → cliente-activo (firma + pago)
cliente-activo → pausa (request)
cliente-activo → churn (fin contrato)
```

### Flows de WhatsApp

1. **Bienvenida + menú 4 opciones** (dispatch por intent)
2. **Calificación BANT** (5 preguntas breves, si califica agenda Cal.com)
3. **Catálogo browse** (opciones 1→muestra 3 planes)
4. **Creator application** (opción 3→link al form Tally)
5. **FAQ genérico** (opción 4→intent detection o handoff humano)
6. **Recordatorio billing** (automático día facturación)
7. **Post-delivery feedback** (24h después de entrega)
8. **Win-back churn** (día 45/90/180 post-churn)

---

## 11. Métricas y roadmap

### KPIs comunidad (revisión semanal Tanya)

| Métrica | Meta M3 | Meta M6 |
|---|---|---|
| Creadores activos | 50 | 150 |
| Tasa participación retos | >20% | >25% |
| Asistencia masterclass | >30% | >30% |
| Proyectos asignados/mes | 20 | 60 |
| Tiempo promedio asignación | <48h | <24h |
| Tasa entrega a tiempo | >85% | >90% |
| Referidos aprobados | >15% | >25% |
| Churn mensual Tier A | <5% | <3% |

### KPIs salud comunidad (revisión mensual Alexander)

| Métrica | Saludable | Alerta | Crítico |
|---|---|---|---|
| DAU/MAU Discord | >25% | 15-25% | <15% |
| Mensajes por miembro/mes | >5 | 2-5 | <2 |
| Retención 30 días | >80% | 65-80% | <65% |
| Retención 90 días | >60% | 45-60% | <45% |
| NPS (trimestral) | >50 | 30-50 | <30 |
| Referidos activos | >15% | 8-15% | <8% |

### KPIs contenido Tanya

- Followers netos IG @agenciaugccolombia: **+5.000 Q2**
- Engagement rate IG: **≥4.5%**
- % SQL desde orgánico: **≥30%**

### Roadmap 90 días

**Mes 1 (semanas 1-4) — Construcción. Meta: 20 creadores activos.**
- Tanya: configura servidor, roles, bots, código de conducta.
- Diana: migra lista existente, crea grupos WhatsApp.
- Alexander: graba video bienvenida + participa primer live.

**Mes 2 (semanas 5-8) — Activación. Meta: 35 creadores activos.**
- Campaña referidos (Tanya WhatsApp broadcast día 1).
- Diana featurea top 3 en IG.
- Alexander menciona el pool en Los Reyes del Contenido.
- Primera masterclass invitado externo.

**Mes 3 (semanas 9-12) — Escala inicial. Meta: 50 creadores activos.**
- Tanya y Diana operan sin dependencia de Alexander.
- Sistema de reactivación automático via n8n.
- Primera convocatoria abierta de aplicaciones.
- Publicación de casos de éxito largos.
- Primera encuesta NPS al pool completo.
- Revisión de Tiers 90 días: primeros upgrades.

### Código de conducta (resumen)

**SÍ:** pedir feedback, compartir recursos, preguntar, celebrar logros.
**NO:** ofrecer servicios directos a clientes UGC Colombia (rompe contrato), compartir precios/detalles fuera de canales, bajar trabajo de otro creador, spam de portfolios, compartir datos confidenciales de marcas.

**Consecuencias:** 1ª menor = aviso privado de Tanya. 2ª = restricción 7 días. Grave = salida del pool + revisión contrato.

### Tono

Directo, sin exceso de emojis. Cálido pero no forzado. Se celebra el trabajo bien hecho, no el esfuerzo vacío. Los errores en privado, los logros en público. Humor bienvenido pero no es el tono base.

---

**Fuentes:** `content/sistemas/comunidad/plan-comunidad-creadores.md`, `content/sistemas/contenido/calendario-editorial.md`, `content/sistemas/contenido/banco-hooks.md`, `content/sistemas/contenido/10-guiones-lanzamiento.md` + `20-guiones-lote-2.md`, `content/canales/whatsapp-business-sistema.md`.

**Próxima revisión:** 2026-05-09
