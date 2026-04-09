# Client Onboarding Flow — UGC Colombia

> **Documento maestro de onboarding de clientes nuevos.**
> Agencia boutique premium de UGC (User Generated Content) para marcas LATAM y USA.
> Ticket objetivo: **USD $500 – $1.500/mes** (retainer recurrente, 3 a 12 meses).
> Versión 1.0 — abril 2026. Owner documento: Alexander Cast (Founder).
> Ejecución operativa: Diana Mile (Head of Operations).
> Audiencia: equipo interno UGC Colombia (Alexander, Diana, Brian, Samuel + creadores freelance).

---

## Índice

1. Contexto y propósito del documento
2. Equipo, roles y responsabilidades (RACI)
3. Las 10 etapas del onboarding (Día 0 → Día 90)
4. Tabla maestra de SLAs
5. Playbook "cliente difícil"
6. NPS y métricas de captura (Día 30, 60, 90)
7. Health Score — fórmula Supabase
8. Diagrama ASCII del flujo completo
9. Checklist maestro imprimible para Diana
10. Anexos: scripts, plantillas y enlaces cruzados

---

## 1. Contexto y propósito

UGC Colombia es una **agencia boutique** (no una marketplace de creadores, no una plataforma self-serve). Nuestra promesa es: **"UGC premium hecho en Colombia, entregado en 14 días, sin caos operativo para la marca"**.

El cliente ideal (ICP) es:

- **Marca DTC / eCommerce** con facturación USD $20K–$500K/mes.
- **Startup SaaS B2C** en etapa seed/Series A que necesita creatives para paid ads.
- **Marcas personales premium** (coaches, infoproductores con ticket > USD $500).
- Mercado principal: **Colombia, México, USA (hispano), España**.

Lo que vendemos **NO es contenido suelto**. Vendemos:

1. **Sistema operativo de producción UGC** (briefing, match creadores, revisión interna, entrega).
2. **Paquete mensual** de 4, 8 o 12 piezas según plan.
3. **Garantía de calidad interna** (Diana revisa cada pieza antes de entregar).
4. **Performance feedback loop** (qué creatives ganaron, iteración Batch 2).

El onboarding es el momento **más crítico del ciclo de vida del cliente**. El 70% de los churns que hemos medido ocurren en los primeros 45 días. Este documento existe para que ese número baje a <20% en los próximos 6 meses.

**Objetivo medible del onboarding**:

- **Día 14**: primera entrega de Batch 1 al cliente (4–6 piezas).
- **Día 21**: aprobación final Batch 1 (máximo 2 rondas de revisión).
- **Día 30**: primer reporte de performance + renovación de fee automática.
- **Día 90**: NPS ≥ 8, health score ≥ 70, renewal signed o upsell cerrado.

---

## 2. Equipo, roles y responsabilidades

### 2.1 Equipo core (abril 2026)

| Persona | Rol | Responsabilidad onboarding |
|---|---|---|
| **Alexander Cast** | Founder / Strategy | Venta, kickoff call estratégica, check-in día 60, renewal día 90, escalamiento clientes difíciles. |
| **Diana Mile** | Head of Operations | Dueña del flujo operativo completo día 1–90. Brand briefing, match creadores, revisión interna, entregas, revisiones, reportes mensuales. |
| **Brian** | Creative Producer | Redacción de briefs creativos, dirección artística, revisión técnica (audio, luz, encuadre). |
| **Samuel** | Data / Performance Analyst | Dashboard de performance, reporte mensual, tracking UTMs, análisis de piezas ganadoras. |
| **Jarvis (n8n)** | Automatización | Disparos WhatsApp, recordatorios, webhook Stripe→Supabase, logging eventos. |

### 2.2 Matriz RACI resumida

| Actividad | Alexander | Diana | Brian | Samuel | Jarvis |
|---|---|---|---|---|---|
| Firma contrato + pago | A/R | C | I | I | R |
| Activación automática en Supabase | I | C | I | I | R |
| Kickoff call | R | A | C | I | I |
| Brand briefing intake | C | A/R | C | I | I |
| Dossier Perplexity + research | I | A | R | C | I |
| Match creadores | I | A/R | C | I | I |
| Briefs creativos Batch 1 | I | C | A/R | I | I |
| Revisión interna pre-entrega | I | A/R | C | I | I |
| Entrega Batch 1 | I | A/R | I | I | R |
| Rondas de revisión cliente | I | A/R | C | I | I |
| Reporte mensual | C | C | I | A/R | I |
| Check-in día 60 | A/R | C | I | I | I |
| Renewal call día 90 | A/R | C | I | C | I |

R = Responsible · A = Accountable · C = Consulted · I = Informed

---

## 3. Las 10 etapas del onboarding

A continuación, cada etapa con: **owner, duración, herramientas, entregables, KPIs, fricción típica + solución, integración Jarvis WhatsApp**.

---

### ETAPA 1 — DÍA 0: Contrato firmado + pago + activación automática

**Owner**: Alexander (cierre) → Jarvis (activación automática) → Diana (handoff).
**Duración**: 2 a 4 horas desde "sí" verbal hasta sistema activo.
**Herramientas**: DocuSign / PandaDoc, Stripe, Supabase, n8n, WhatsApp Business, Notion.

#### 3.1.1 Contexto

El Día 0 empieza cuando el prospecto dice "sí, quiero firmar". Hasta que el contrato no está firmado Y el primer pago no está en Stripe, **no existe cliente**. Esto evita scope creep y trabajo sin pago.

#### 3.1.2 Secuencia operativa

1. **Alexander envía contrato** desde plantilla DocuSign (`templates/contrato-retainer-ugc-v3.pdf`). Plantilla incluye:
   - Scope del plan (4/8/12 piezas mensuales).
   - Cláusula de revisiones (máximo 2 rondas por pieza).
   - SLA de entrega (14 días calendario desde brand briefing aprobado).
   - Propiedad intelectual (cliente adquiere uso perpetuo, UGC Colombia se reserva derecho de portafolio salvo NDA).
   - Cláusula de cancelación (aviso 30 días, sin reembolso del mes en curso).
   - Precio, método de pago, fecha de corte mensual.
2. **Cliente firma** → DocuSign dispara webhook a n8n.
3. **n8n crea invoice en Stripe** con link de primer pago (monto = fee mes 1 + setup fee si aplica).
4. **Cliente paga** → Stripe webhook `invoice.paid` → n8n ejecuta workflow `client.activate`:
   - Crea registro en `clients` (Supabase) con `status='active'`, `plan`, `monthly_fee`, `start_date`, `billing_day`.
   - Crea registro en `contracts` con URL del PDF firmado.
   - Crea estructura de carpetas en Google Drive: `/Clientes/{brand_name}/01-Brand-Brief/`, `/02-Research/`, `/03-Briefs/`, `/04-Raw-Footage/`, `/05-Entregas/`, `/06-Reportes/`.
   - Crea board en Notion a partir de template `Client OS - UGC Boutique`.
   - Dispara WhatsApp de bienvenida al cliente (ver script 3.1.5).
   - Dispara WhatsApp interno a Diana: *"Nuevo cliente activo: {brand}. Plan {plan}. Agendar kickoff call en <48h."*
   - Dispara email de bienvenida con link al Brand Briefing form (Typeform).
5. **Diana recibe handoff** en Notion con tarea automática: *"Agendar kickoff call con {brand} — deadline 48h"*.

#### 3.1.3 Entregables día 0

- Contrato firmado y archivado en Drive.
- Invoice pagada en Stripe.
- Registro cliente activo en Supabase (`clients.status='active'`).
- Estructura de carpetas Drive creada.
- Board Notion del cliente creado.
- WhatsApp de bienvenida enviado.
- Email con Brand Briefing form enviado.
- Tarea de kickoff asignada a Diana.

#### 3.1.4 KPIs

- **Time to activation (TTA)**: desde pago confirmado hasta WhatsApp de bienvenida enviado. Meta: **< 10 minutos** (100% automático).
- **% contratos firmados sin fricción**: meta 90%.
- **% primeros pagos cobrados en <24h desde firma**: meta 85%.

#### 3.1.5 Script WhatsApp de bienvenida (Jarvis)

```
Hola {nombre_contacto} 👋

Bienvenido/a oficialmente a UGC Colombia. Ya recibimos tu contrato firmado y tu primer pago — estás activado/a en nuestro sistema.

Esto es lo que sigue:

1️⃣ En los próximos minutos recibes un correo con un Brand Briefing (15–20 min de tu tiempo). Llénalo antes de nuestra kickoff call.

2️⃣ Diana (nuestra Head of Operations) te contactará en las próximas 24h para agendar tu kickoff call de 45 min.

3️⃣ En 14 días calendario recibes tu primer batch de contenido UGC listo para publicar.

Cualquier cosa urgente, responde a este WhatsApp y te contestamos en <2h hábiles.

— Alexander Cast, Founder
UGC Colombia
```

#### 3.1.6 Fricción típica + solución

| Fricción | Frecuencia | Solución |
|---|---|---|
| Cliente firma pero no paga en 48h | 15% | n8n dispara reminder automático a las 24h y 48h. Si >72h, Alexander llama personalmente. |
| Contrato devuelto con cambios legales | 10% | Alexander tiene 3 "slots" pre-negociados (NDA reforzado, exclusividad parcial, descuento multi-mes). Fuera de eso, escala a asesor legal externo. |
| Pago rechazado (tarjeta internacional) | 20% en clientes USA | Fallback automático a Wise / transferencia directa COP/USD. n8n envía instrucciones alternativas. |
| Webhook DocuSign falla | <5% | Jarvis monitorea cada hora estados pending. Diana recibe alerta si pasa 4h sin update. |

#### 3.1.7 Integración Jarvis WhatsApp

Jarvis escucha el canal `stripe.webhook.invoice.paid` en n8n y dispara el workflow `whatsapp.welcome.client.v2`. Todo el mensaje es dinámico con variables del registro Supabase. Si el cliente responde dentro de 10 min, Jarvis entra en modo "conversational onboarding" y puede responder FAQs básicas (cuándo es la kickoff, quién es Diana, cómo funciona el Brand Briefing).

---

### ETAPA 2 — DÍAS 1-3: Kickoff call + Brand Briefing intake

**Owner**: Diana (principal), Alexander (invitado estratégico si ticket > USD $1K).
**Duración**: 3 días calendario máximo desde activación hasta briefing aprobado.
**Herramientas**: Google Calendar, Google Meet, Granola (transcripción), Typeform (Brand Briefing), Notion, Jarvis.

#### 3.2.1 Contexto

La kickoff call NO es una llamada de ventas. La venta ya está cerrada. Es una **sesión de alineación estratégica** donde Diana extrae toda la información necesaria para que en los próximos 7 días podamos armar un dossier de research y matchear creadores. Si la llamada sale mal o el briefing queda incompleto, arrastras problemas durante 90 días.

#### 3.2.2 Pre-call (Diana, día 1)

1. Diana revisa en Notion que el cliente haya llenado el Brand Briefing form. Si no, le envía WhatsApp amable: *"Vi que aún no llenaste el brief — ¿tienes 15 min ahora? Si quieres, te acompaño por llamada"*.
2. Diana revisa manualmente:
   - Web del cliente (10 min).
   - Instagram + TikTok del cliente (10 min).
   - Contenido UGC que ya tengan publicado (5 min).
   - 2–3 competidores directos (10 min).
3. Diana prepara agenda visible en Notion y la comparte como link al cliente antes de la call.
4. Agenda la call en Calendly personalizado. Jarvis confirma automáticamente al cliente por WhatsApp 24h y 1h antes.

#### 3.2.3 Estructura de la kickoff call (45 min)

| Minuto | Bloque | Owner |
|---|---|---|
| 0–5 | Rompehielo + presentación del equipo (nombre + cara de Diana, Brian, Samuel) | Diana |
| 5–10 | Recap del scope contratado y expectativas | Diana |
| 10–20 | Brand deep dive: tono de voz, valores, no-go zones, competidores | Diana |
| 20–30 | Objetivo de negocio: ¿qué métrica quieres mover con este UGC? (ventas, CPA, CTR, awareness) | Diana + Alex si aplica |
| 30–40 | Creator fit: ¿has trabajado UGC antes? ¿qué te gustó/odiaste? ¿perfil de creador soñado? | Diana |
| 40–45 | Próximos pasos + timeline visual | Diana |

**Regla de oro**: Diana **no promete** nada fuera del scope contratado durante la call. Si el cliente pide algo extra, la respuesta es *"déjame validarlo con el equipo y te confirmo por WhatsApp hoy mismo"*. Nunca "sí" en vivo.

#### 3.2.4 Brand Briefing form (Typeform)

Campos obligatorios:

1. Identidad: nombre marca, website, IG, TikTok, logo (upload), paleta de colores (hex), tipografías.
2. Negocio: producto estrella, ticket promedio, margen, público objetivo (edad, género, ubicación, intereses, pain points).
3. Tono de voz: 3 adjetivos, 3 marcas de referencia que admires, 3 marcas que NO quieres parecer.
4. No-go zones: temas prohibidos, palabras prohibidas, competidores a no mencionar.
5. UGC previo: links a contenido UGC que tengan (bueno y malo), qué funcionó y qué no.
6. Objetivo medible: métrica a mover (CTR, CPA, ROAS, conversiones, seguidores), baseline actual, meta a 30/90 días.
7. Plataformas de publicación: Meta Ads, TikTok Ads, Orgánico IG, Orgánico TikTok, YouTube Shorts, Landing Page.
8. Producto físico / envío: ¿se envía producto al creador? ¿quién paga? ¿dónde está el stock? (CRÍTICO para logística).
9. Legales: ¿tienes registro sanitario / Invima / FDA si aplica? ¿claims permitidos y prohibidos?
10. Aprobador final: nombre + WhatsApp + email de la UNA persona que aprueba piezas. Si hay comité = red flag.

#### 3.2.5 Post-call (Diana, día 2)

- Sube la transcripción de Granola a Notion del cliente.
- Completa el "Client OS" con los bloques de identidad, negocio, tono, no-go.
- Valida el Brand Briefing: si hay campos vacíos, pide completarlos por WhatsApp.
- Envía al cliente un **recap escrito en 1 página** en Notion compartido (link público con permisos de comentario).
- Marca en Supabase `clients.briefing_approved_at=now()` → dispara automáticamente arranque de etapa 3.

#### 3.2.6 Entregables etapa 2

- Kickoff call agendada, ejecutada y transcrita.
- Brand Briefing completo y aprobado por cliente.
- Client OS en Notion con identidad, negocio, tono, objetivo, aprobador.
- Recap compartido con cliente por escrito.
- Handoff a etapa 3 disparado en Supabase.

#### 3.2.7 KPIs

- **Time to kickoff**: meta <48h desde activación.
- **% briefings completos sin follow-up**: meta 70%.
- **Duración real de la call**: meta 45±10 min (si pasa de 70 min = red flag cliente over-thinker).
- **CSAT post-kickoff** (encuesta 1 pregunta): meta ≥4.5/5.

#### 3.2.8 Fricción típica + solución

| Fricción | Solución |
|---|---|
| Cliente no tiene claro su público objetivo | Diana usa framework "Customer avatar express" (3 preguntas: edad, problema que resuelves, dónde vive). No pasa a etapa 3 sin esto. |
| Cliente quiere "que la marca sea para todos" | Diana explica por qué eso mata el UGC y ofrece 2 segmentos de prueba para Batch 1. Si insiste, escala a Alexander. |
| Cliente no define aprobador único | Bloqueante absoluto. No se avanza hasta que haya 1 nombre con WhatsApp. |
| Cliente quiere participar en casting de creadores | Se permite solo con plan Premium ($1.5K). En plan Starter/Pro, Diana muestra 3 perfiles shortlist y el cliente elige, pero no casting abierto. |
| Producto físico aún no está listo para envío | Se ajusta el start_date del SLA: reloj de 14 días arranca cuando producto llega a creador, no antes. Se documenta en Supabase. |

#### 3.2.9 Integración Jarvis WhatsApp

- Jarvis envía recordatorio de kickoff 24h y 1h antes.
- Jarvis envía el link del Brand Briefing si el cliente no lo ha abierto a las 12h post-activación.
- Jarvis envía el recap escrito como mensaje resumen por WhatsApp (no solo email).
- Jarvis detecta si el cliente pasa 48h sin responder → alerta a Diana con prioridad alta.

---

### ETAPA 3 — DÍAS 4-7: Research & Strategy

**Owner**: Diana (lead), Brian (dirección creativa), Alexander (QA estratégico opcional).
**Duración**: 4 días hábiles.
**Herramientas**: Perplexity Pro, Apify, Meta Ads Library, TikTok Creative Center, Google Trends, base de datos interna de creadores (Supabase `creators` table), Notion, Loom.

#### 3.3.1 Contexto

Esta es la etapa que nos diferencia de una marketplace cualquiera. Antes de producir una sola pieza, invertimos 4 días en **entender el mercado del cliente, extraer los ángulos que están funcionando, definir 3–5 content pillars y matchear creadores que encajen con la voz**. Es la etapa más barata de hacer bien, y la más cara de saltarse.

#### 3.3.2 Sub-etapas

**Día 4 — Research de mercado (Diana + Perplexity)**

1. Diana usa prompt estándar de Perplexity `research-ugc-market-v2` (ver anexo) con variables: nicho del cliente, país objetivo, ticket producto.
2. Perplexity devuelve:
   - Top 10 insights del nicho en los últimos 90 días.
   - 5 ángulos de comunicación trending.
   - 3 objeciones principales del comprador.
   - 5 keywords emocionales de alto uso.
3. Diana valida output y descarta ruido. Output final = "Dossier de Research" en Notion (3–5 páginas).

**Día 5 — Análisis competidores (Diana + Apify + Meta Ads Library)**

1. Scraping con Apify de los últimos 30 días de ads de 3 competidores directos desde Meta Ads Library.
2. Scraping de los últimos 30 posts orgánicos de cada competidor en IG y TikTok.
3. Diana clasifica ganadores/perdedores por engagement rate relativo.
4. Output: tabla comparativa "Qué funciona en el nicho" con 10–15 piezas referencia.

**Día 6 — Content Pillars (Diana + Brian)**

Diana y Brian hacen una sesión de 90 min y definen 3 a 5 **content pillars** del cliente. Cada pillar incluye:

- Nombre del pillar.
- Ángulo emocional.
- Problem → Solution statement.
- Tipo de hook recomendado.
- Formato UGC preferido (testimonial, unboxing, POV, tutorial, comparativo).
- CTA final.
- Ejemplo de pieza referencia (link).

Los pillars se documentan en Notion y son **el contrato creativo** de los siguientes 90 días.

**Día 7 — Match de creadores (Diana)**

1. Diana filtra la tabla `creators` de Supabase por:
   - País del cliente (priorizar local).
   - Arquetipo que encaja con el brand voice.
   - Rango de edad del público objetivo.
   - Formatos históricos exitosos.
   - Disponibilidad en los próximos 10 días (`creators.availability_status='open'`).
   - Rating interno ≥ 4.0/5.
2. Shortlist de 3–5 creadores por cada pieza del Batch 1.
3. Diana envía Loom al cliente presentando los 3 top creadores recomendados con bio + portafolio + por qué los eligió. Cliente aprueba en WhatsApp.
4. Si el cliente dice "no" a un creador, Diana ofrece 2 alternativas. Máximo 2 iteraciones.

#### 3.3.3 Entregables etapa 3

- Dossier de research en Notion (5 páginas aprox).
- Tabla comparativa de competidores con 10–15 piezas referencia.
- 3–5 content pillars documentados y aprobados por el cliente.
- Shortlist de creadores aprobada por el cliente.
- Supabase: `clients.strategy_approved_at=now()`.

#### 3.3.4 KPIs

- **Tiempo total etapa 3**: meta ≤4 días hábiles.
- **% clientes que aprueban pillars sin cambios**: meta 60%.
- **% clientes que aprueban creadores en primera ronda**: meta 75%.

#### 3.3.5 Fricción típica + solución

| Fricción | Solución |
|---|---|
| Cliente rechaza todos los creadores recomendados | Red flag. Diana agenda llamada de 15 min para entender qué está buscando realmente. Probable gap en brand briefing. |
| Cliente pide creadores "famosos" (influencers) | Diana educa: UGC ≠ influencer marketing. Muestra caso de estudio interno de cómo UGC anónimo supera influencer en CPA. |
| Pillars demasiado amplios (cliente quiere "todo") | Diana fuerza priorización: *"Este mes solo podemos atacar 3. ¿Cuáles son los más urgentes para tu negocio?"*. |
| Nicho regulado (salud, finanzas, suplementos) | Brian revisa compliance. Todos los claims se validan contra normativa Invima/FDA antes de escribir briefs. |

#### 3.3.6 Integración Jarvis WhatsApp

- Jarvis envía el dossier de research y los pillars al cliente por WhatsApp como PDF + link Notion.
- Jarvis dispara pregunta específica: *"¿Apruebas estos 3 pillars como guía de los próximos 30 días? Responde SÍ / CAMBIOS"*.
- Respuestas se loggean en Supabase `client_approvals` para tener trazabilidad legal.

---

### ETAPA 4 — DÍAS 8-14: Producción Batch 1

**Owner**: Brian (briefs y dirección), Diana (gestión creadores y calidad), creadores freelance (ejecución), Alexander (QA final).
**Duración**: 7 días calendario.
**Herramientas**: Notion (briefs), WhatsApp (coordinación creadores), Google Drive (raw footage), Frame.io o Loom (revisión interna), Supabase (`deliveries` table).

#### 3.4.1 Contexto

Esta es la etapa donde se produce valor real. Batch 1 define la primera impresión del cliente con nuestra calidad. Si falla aquí, el cliente churnea antes del día 30. Brian y Diana tienen **tolerancia cero a piezas B-class** en Batch 1.

#### 3.4.2 Sub-etapas

**Día 8 — Redacción de briefs (Brian)**

Brian escribe 1 brief por cada pieza del Batch 1. Cada brief incluye:

- Pillar al que pertenece.
- Hook exacto (primeros 3 segundos) con guion textual.
- Desarrollo (12–40 segundos) con bullets de lo que debe decir el creador.
- CTA (últimos 2–3 segundos).
- Encuadre sugerido (selfie, medio plano, plano fijo).
- Ambientación sugerida (cocina, calle, baño, oficina, outdoor).
- Vestuario: casual / profesional / no-brand.
- Objeto principal (producto) y cómo debe aparecer.
- Referencias visuales (2–3 links a piezas que inspiraron el brief).
- Entregables esperados: 1 vertical 9:16 + 1 horizontal 16:9 opcional.
- Duración objetivo.
- Archivos: raw + editado si aplica.

Cada brief pasa por **QA de Diana** antes de ser enviado al creador. Diana bloquea cualquier brief con ambigüedad creativa.

**Día 9 — Asignación + envío a creadores (Diana)**

1. Diana envía brief a cada creador por WhatsApp + Notion.
2. Si requiere envío físico del producto: Diana coordina envío por Servientrega / DHL. Se loggea tracking en Supabase.
3. Creador confirma recepción de brief, deadline (día 12) y precio acordado.
4. Supabase: `deliveries.status='briefed'`.

**Días 10–12 — Producción (creadores)**

- Creador graba. Jarvis envía check-in automático día 10 y día 11: *"¿Cómo va la grabación de {brand}? ¿Alguna duda con el brief? Responde OK / DUDA"*.
- Si creador reporta bloqueo → Diana resuelve en <2h hábiles.
- Día 12: creador sube raw footage a Google Drive en carpeta asignada y marca en WhatsApp "ENTREGADO".
- Supabase: `deliveries.status='raw_delivered'`, `deliveries.raw_url=...`.

**Día 13 — Revisión interna Diana + Brian**

Esta es la revisión interna **obligatoria** antes de mostrar nada al cliente. Checklist técnico:

- Audio limpio (sin eco, sin ruido ambiente).
- Luz aceptable (cara iluminada, no silueta).
- Encuadre correcto (ojos en el tercio superior).
- Hook cumple el brief literalmente.
- CTA claro.
- Duración dentro de rango.
- Sin errores de locución críticos.
- Producto visible y bien presentado.
- Sin menciones a competidores ni temas no-go.

**Cada pieza recibe una calificación A / B / C:**

- **A**: se entrega al cliente tal cual.
- **B**: se pide re-grabación de fragmento específico al creador (máximo 24h).
- **C**: pieza rechazada, se re-asigna a otro creador.

Regla crítica: **ninguna pieza C o B sin corregir entra a Batch 1**.

**Día 14 — Empaquetado final**

Diana ensambla entregables: cada pieza en 9:16 MP4 + versión horizontal si aplica + thumbnail + transcripción + sugerencia de copy para paid. Todo se sube a `/05-Entregas/Batch-01/` con naming convention `{brand}_{pillar}_{creator}_{version}.mp4`.

#### 3.4.3 Entregables etapa 4

- 4, 8 o 12 briefs (según plan).
- 4, 8 o 12 piezas UGC grado A listas para entrega.
- Raw footage archivado en Drive.
- Supabase: todas las `deliveries` con `status='ready_for_client'`.

#### 3.4.4 KPIs

- **% briefs aceptados por creador sin fricción**: meta 90%.
- **% piezas grado A en primera grabación**: meta 70%.
- **% piezas B corregidas en <24h**: meta 95%.
- **Piezas C rechazadas**: meta <5%.
- **Cumplimiento SLA día 14**: meta 100%.

#### 3.4.5 Fricción típica + solución

| Fricción | Solución |
|---|---|
| Creador no responde en 24h tras envío del brief | Jarvis escala automático a Diana. Diana llama. Si no hay respuesta en 48h, se re-asigna a otro creador del shortlist. |
| Producto no llega al creador a tiempo | Diana negocia extensión SLA con el cliente (regla: el reloj del SLA se pausa mientras el producto está en tránsito, y se documenta). |
| Pieza grado C masivo (creador malo) | Creador se marca en Supabase `creators.rating` -0.5, y se evalúa pausa/exclusión del roster. |
| Cliente pide ver piezas en día 12 (antes de QA interno) | NO se muestra nada sin grado A. Diana responde con WhatsApp template: *"Estamos en ronda de QA interno — el viernes 14 recibes todo aprobado"*. |
| Creador sube archivos en calidad baja (celular viejo) | Brian valida specs técnicos mínimos ANTES de asignar. Nuevos creadores pasan filtro de calidad en onboarding del creador. |

#### 3.4.6 Integración Jarvis WhatsApp

- Jarvis envía recordatorios diarios a creadores durante grabación (día 10, 11, 12).
- Jarvis envía heartbeat automático al cliente día 10: *"Todo en producción, vamos según cronograma. Entrega confirmada para {fecha}"*.
- Jarvis dispara alerta interna a Diana si `deliveries.status` no avanza según SLA intermedio.

---

### ETAPA 5 — DÍAS 15-21: Entrega Batch 1 + rondas de revisión

**Owner**: Diana (entrega y gestión de revisiones), Brian (ajustes creativos).
**Duración**: 7 días calendario.
**Herramientas**: Google Drive, WhatsApp, Frame.io o Loom para comentarios, Supabase, Notion.

#### 3.5.1 Contexto

Entregamos el día 14 (o máximo 15 si se retrasa 1 día). A partir de ahí, el cliente tiene **máximo 2 rondas de revisión por pieza**, y cada ronda tiene un SLA de ejecución por parte nuestra. Esto es crítico porque el scope creep vive aquí.

#### 3.5.2 Día 15 — Entrega oficial Batch 1

1. Diana envía WhatsApp + email al cliente con:
   - Link Drive a la carpeta `/05-Entregas/Batch-01/`.
   - Loom de 5–7 min presentando cada pieza (qué pillar, qué creator, por qué este hook).
   - Instrucciones claras de cómo dar feedback: 1 documento compartido en Notion con sección por pieza.
   - Deadline de feedback: **5 días hábiles** (si no llega en 5 días, las piezas se consideran aprobadas automáticamente — cláusula contractual).
2. Supabase: `deliveries.status='delivered_to_client'`, `deliveries.delivered_at=now()`.
3. Jarvis envía WhatsApp al cliente confirmando entrega + cómo dar feedback.

#### 3.5.3 Días 16–19 — Ronda 1 de revisión

**Reglas del juego (se comunican explícitamente al cliente):**

- Feedback por escrito, con timestamp exacto de cada pieza.
- Feedback agrupado por pieza, no drip por WhatsApp.
- Máximo 2 rondas totales por pieza.
- Cambios dentro del scope del brief original son gratis. Cambios fuera del scope se cotizan.

**Ejemplos de dentro del scope (gratis):**

- Ajustar música.
- Recortar silencio al inicio.
- Añadir subtítulos en color específico.
- Corrección de audio.
- Cambio de CTA menor.

**Ejemplos de fuera del scope (cotizado):**

- Re-grabación del hook con otro guion.
- Cambio de creador.
- Agregar B-roll no contemplado.
- Cambio de pillar completo.
- Adición de efectos visuales complejos.

Diana clasifica cada request en **ENTREVISTA** (dudas antes de ejecutar), **ACEPTADO IN-SCOPE**, **ACEPTADO OUT-OF-SCOPE (requiere aprobación y pago)**, **RECHAZADO (con razón explicada al cliente)**.

SLA de ejecución ronda 1: **48h hábiles** desde feedback consolidado recibido.

#### 3.5.4 Días 20–21 — Ronda 2 de revisión (si aplica)

Misma mecánica que ronda 1, pero SLA más corto: **24h hábiles**. Después de ronda 2, la pieza se marca como final. Supabase: `deliveries.status='final_approved'`. Si el cliente quiere una ronda 3, se documenta como scope creep y se cotiza.

#### 3.5.5 Entregables etapa 5

- Batch 1 entregado oficialmente.
- Feedback consolidado recibido.
- Rondas de revisión ejecutadas dentro de SLA.
- Piezas finales aprobadas en Supabase.

#### 3.5.6 KPIs

- **% piezas aprobadas en ronda 1 sin cambios**: meta 40%.
- **% piezas aprobadas dentro de ronda 2**: meta 95%.
- **% rondas fuera de scope (identificadas y cotizadas)**: meta >80% de los out-of-scope facturados.
- **SLA ronda 1 cumplido**: meta 95%.
- **SLA ronda 2 cumplido**: meta 100%.

#### 3.5.7 Fricción típica + solución

| Fricción | Solución |
|---|---|
| Cliente da feedback contradictorio (cambia de opinión entre rondas) | Diana hace llamada de 20 min para alinear antes de ejecutar. Se documenta en acta. |
| Cliente pide ronda 3 "gratis" | Diana cita contrato (máximo 2 rondas) y ofrece cotización transparente. Si es cliente estratégico, Alexander decide si se regala. |
| Cliente desaparece y no da feedback | Jarvis dispara reminders día 16, 18, 20. Día 21: aprobación automática según contrato. Email formal de Diana confirmando. |
| Cliente comparte pieza con "su equipo" y vuelve con feedback de 5 personas distintas | Diana bloquea: *"Necesitamos el feedback consolidado del aprobador único que definimos en kickoff"*. |
| Cliente comenta por WhatsApp en lugar del documento | Diana copia/pega al documento compartido y le avisa: *"Registré tu feedback aquí — así tenemos trazabilidad"*. |

#### 3.5.8 Integración Jarvis WhatsApp

- Jarvis envía Batch 1 al cliente por WhatsApp como link drive + Loom.
- Jarvis envía reminders de feedback día 16, 18, 20.
- Jarvis envía auto-approve notification día 21 si no hay feedback.
- Jarvis detecta feedback entrando por WhatsApp y notifica a Diana para que lo traslade al doc de revisión.

---

### ETAPA 6 — DÍAS 22-30: Performance tracking + Batch 2 en paralelo

**Owner**: Samuel (performance), Diana (arranque Batch 2), Brian (briefs Batch 2).
**Duración**: 9 días calendario.
**Herramientas**: Meta Ads Manager, TikTok Ads Manager, Google Analytics 4, UTM tracker, Supabase, Notion, Looker Studio.

#### 3.6.1 Contexto

El objetivo aquí es doble: **medir qué está funcionando de Batch 1** y **arrancar Batch 2 con insights reales, no solo con pillars teóricos**. Es el primer momento donde cerramos el loop de performance → creatividad.

#### 3.6.2 Sub-etapas

**Días 22–24 — Samuel configura tracking**

1. Samuel valida que el cliente haya subido las piezas a sus plataformas.
2. Samuel configura UTMs en links de landing (si aplica).
3. Samuel conecta dashboards: Meta Ads API, TikTok Ads API, GA4.
4. Samuel crea vista personalizada en Looker Studio para el cliente.

**Días 25–30 — Samuel captura métricas diarias**

- CTR, CPC, CPM, CPA, ROAS por pieza (si es paid).
- Views, ER, saves, shares (si es orgánico).
- Ranking interno por pieza ganadora/perdedora.

**Días 22–30 — Diana arranca Batch 2 en paralelo**

- Si Batch 1 no está 100% aprobado aún, Diana igual arranca briefs de Batch 2 con los pillars definidos, pero no envía a producción hasta que Batch 1 esté cerrado.
- Brian redacta briefs de Batch 2 incorporando insights preliminares de performance (aunque sean de solo 3 días).

#### 3.6.3 Entregables etapa 6

- Dashboard Looker Studio del cliente activo.
- Batch 2 en producción (día 30 con raw footage llegando).
- Insights preliminares de performance documentados en Notion.

#### 3.6.4 KPIs

- **Dashboard operativo antes del día 25**: meta 100%.
- **% piezas Batch 1 publicadas por el cliente**: meta 80%.
- **Tiempo de Samuel por cliente/mes**: meta <4h.

#### 3.6.5 Fricción típica + solución

| Fricción | Solución |
|---|---|
| Cliente no publica las piezas | Diana pregunta por qué. Razón común: equipo de paid overloaded. Se ofrece servicio add-on "Launch Assist". |
| Cliente no da acceso a Ads Manager | Samuel ofrece 2 opciones: acceso lector o reporte manual mensual con screenshots. |
| Performance malo en primera semana | Samuel filtra: ¿es problema de la pieza o del setup del ad (audiencia, puja)? Rarísimo culpar a la pieza en 3 días. |
| Cliente pide "más piezas ya" fuera de scope | Diana cotiza add-on pack o upsell a plan superior. |

#### 3.6.6 Integración Jarvis WhatsApp

- Jarvis envía snapshot semanal de performance al cliente (día 25) con 3 bullets: top pieza, CTR promedio, next step.
- Jarvis alerta a Samuel si alguna pieza tiene CPA 2x sobre baseline.

---

### ETAPA 7 — DÍA 30: Primer reporte mensual + fee recurrente

**Owner**: Samuel (reporte), Diana (presentación), Alexander (sign-off), Jarvis (billing).
**Duración**: 1 día.
**Herramientas**: Looker Studio, Notion, Loom, Stripe, Supabase.

#### 3.7.1 Contexto

El día 30 es el primer momento de verdad. El cliente recibe su primera factura recurrente Y su primer reporte de performance. Este día define si el cliente renueva naturalmente o si empieza a dudar.

#### 3.7.2 Secuencia

1. **Samuel** finaliza reporte mensual en Notion. Estructura:
   - Resumen ejecutivo (3 bullets).
   - Piezas entregadas y publicadas.
   - Performance: top 3 ganadoras y bottom 1 perdedora con hipótesis.
   - Insights aplicables a Batch 2.
   - Roadmap sugerido mes 2.
2. **Diana** graba Loom de 8–12 min presentando el reporte en lenguaje humano.
3. **Alexander** revisa (15 min QA) antes de enviar.
4. **Diana** envía reporte + Loom al cliente por WhatsApp + email.
5. **Jarvis** dispara invoice recurrente Stripe para mes 2 (según `clients.billing_day`).
6. Si pago exitoso → `clients.status` sigue `active`, se loggea `payments.mrr_paid_at`.
7. Si pago falla → 3 reintentos automáticos (día 30, 32, 34). Si falla en 34 → Alexander llama personalmente.

#### 3.7.3 Entregables

- Reporte mensual mes 1.
- Loom presentación.
- Invoice mes 2 cobrada.

#### 3.7.4 KPIs

- **% facturas cobradas sin fricción**: meta 90%.
- **% clientes que responden al reporte**: meta 70%.
- **NPS espontáneo post-reporte**: meta >7.

#### 3.7.5 Fricción típica + solución

| Fricción | Solución |
|---|---|
| Cliente no está satisfecho con performance | Diana agenda llamada de 30 min y co-construye hipótesis para Batch 2. No se defiende, se co-resuelve. |
| Pago rechazado | Reintento automático, fallback a transferencia. Alexander llama personalmente si persiste. |
| Cliente pide "descuento porque aún no ve resultados" | Alexander se involucra. Respuesta estándar: no bajamos precio en mes 2, pero sí ofrecemos 1 pieza extra gratis como "investment in your success". |

#### 3.7.6 Integración Jarvis WhatsApp

- Jarvis envía reporte por WhatsApp con preview de métricas top.
- Jarvis maneja recordatorios de factura automáticos.
- Jarvis captura respuesta del cliente al reporte y la loggea en Supabase.

---

### ETAPA 8 — DÍA 45: Mid-month review call

**Owner**: Diana.
**Duración**: 30 min.
**Herramientas**: Google Meet, Granola, Notion.

#### 3.8.1 Contexto

A mitad del mes 2, Diana hace un touchpoint corto para tomar la temperatura. No es venta. Es **mantener relación y detectar fricción temprano**. 

#### 3.8.2 Estructura (30 min)

| Min | Tema |
|---|---|
| 0–5 | Cómo te sentiste con Batch 1, ¿algo cambiarías? |
| 5–15 | Review de performance (datos frescos) |
| 15–20 | Preview de Batch 2 (status, creadores, timing) |
| 20–25 | ¿Algo nuevo del negocio que debamos saber? (cambio de campañas, promo, lanzamiento) |
| 25–30 | Next steps + acciones |

#### 3.8.3 Entregables

- Acta de call en Notion.
- Acciones asignadas en Supabase.

#### 3.8.4 KPIs

- **Call ejecutada dentro de 48h del día 45**: meta 100%.
- **Insights nuevos capturados**: meta ≥2 por call.

#### 3.8.5 Fricción típica + solución

| Fricción | Solución |
|---|---|
| Cliente cancela la call | Diana ofrece reemplazar por async Loom del cliente (5 min). |
| Cliente llega enojado | Diana escucha 10 min sin interrumpir, luego propone plan de acción con deadline. Escala a Alexander si es grave. |

#### 3.8.6 Integración Jarvis WhatsApp

- Jarvis agenda automático y manda reminders.
- Jarvis envía acta post-call.

---

### ETAPA 9 — DÍA 60: Check-in satisfacción + expansión

**Owner**: Alexander.
**Duración**: 45 min.
**Herramientas**: Google Meet, Notion, Calendly.

#### 3.9.1 Contexto

Día 60 es el momento donde el cliente ya tiene 2 batches entregados, 2 meses de performance y una relación sólida con Diana. Este es el momento donde **Alexander entra personalmente** para 2 objetivos:

1. Medir NPS formalmente.
2. Sembrar la conversación de expansión (upsell plan superior, add-ons, referidos).

Alexander no vende agresivo. Escucha más de lo que habla. La regla es 80/20 en favor del cliente.

#### 3.9.2 Estructura (45 min)

| Min | Tema |
|---|---|
| 0–10 | Rapport personal (negocio del cliente en general, no UGC) |
| 10–20 | NPS formal: *"En una escala de 0 a 10, qué tan probable es que nos recomiendes a otro founder?"* + *¿por qué ese número?* |
| 20–30 | ¿Qué hemos hecho mejor? ¿Qué podríamos hacer mejor? |
| 30–40 | Oportunidades: ¿necesitas más piezas? ¿otros formatos (carrusel, podcast, short video ads)? ¿referidos? |
| 40–45 | Commitment + next step |

#### 3.9.3 Upsell paths

| Path | Condición | Producto |
|---|---|---|
| Plan upgrade | Cliente en Starter ($500) con NPS ≥ 8 | Upgrade a Pro ($1K) o Premium ($1.5K). |
| Add-on Launch Assist | Cliente no publica piezas por overload | USD $300/mes: Samuel agenda y sube piezas por ellos. |
| Add-on Paid Ads Management | Cliente sin equipo de paid | Servicio dedicado, USD $800/mes + % ad spend. |
| Referral program | NPS ≥ 9 | USD $200 crédito por cada cliente referido que firme. |

#### 3.9.4 Entregables

- NPS score registrado en Supabase.
- Acta de call.
- Pipeline de expansión actualizado en Notion/CRM.

#### 3.9.5 KPIs

- **NPS promedio día 60**: meta ≥ 8.
- **% clientes con upsell conversation iniciada**: meta 100%.
- **% clientes que aceptan upsell**: meta 20%.
- **% clientes que dan referral**: meta 15%.

#### 3.9.6 Fricción típica + solución

| Fricción | Solución |
|---|---|
| NPS = 6 o menos | Alexander entra en modo recovery: pregunta en detalle, ofrece acción correctiva concreta, agenda revisit día 75. |
| Cliente quiere hablar de churn | Alexander escucha, no defiende. Aplica playbook churn prevention (ver sección 5). |
| Cliente quiere algo que no hacemos | Alexander no inventa. Propone socio externo y cobra fee de referido si aplica. |

#### 3.9.7 Integración Jarvis WhatsApp

- Jarvis agenda y confirma la call.
- Jarvis envía encuesta NPS corta 1h post-call para validar.

---

### ETAPA 10 — DÍA 90: Renewal call o churn prevention

**Owner**: Alexander (lead), Diana (apoyo operativo).
**Duración**: 45–60 min.
**Herramientas**: Google Meet, Looker Studio, Notion, Stripe.

#### 3.10.1 Contexto

Día 90 es la primera gran puerta de renovación. Para ese momento, ya tenemos:

- 3 batches entregados.
- 3 meses de performance data.
- 2 rondas de NPS.
- Health score calculado.
- Señales claras de riesgo o expansión.

El objetivo es cerrar **renewal de 3 meses adicionales** como mínimo, idealmente 6 meses, con upgrade de plan si aplica.

#### 3.10.2 Pre-call (Diana + Samuel, día 88)

- Samuel prepara "Quarterly Performance Report" en Looker Studio + slides resumen.
- Diana actualiza health score del cliente.
- Alexander revisa histórico y define objetivo de la call (renew plano, upgrade, downgrade, churn prevention).

#### 3.10.3 Estructura de la call

**Escenario A — Health score ≥ 70 (cliente sano, renew esperado)**

| Min | Tema |
|---|---|
| 0–10 | Recap de 90 días: qué logramos juntos |
| 10–20 | Performance: top piezas, CPA evolution, ROAS |
| 20–30 | Visión próximos 90 días: qué pillars mantener, qué agregar |
| 30–40 | Propuesta comercial: renew + posible upgrade |
| 40–45 | Firma o commitment |

**Escenario B — Health score < 70 (riesgo, churn prevention)**

Ver sección 5 playbook completo.

#### 3.10.4 Entregables

- Contrato de renovación firmado (ideal: 3–6 meses).
- Plan de trabajo Q2 documentado.
- Cliente movido a `clients.stage='recurring'` en Supabase.

#### 3.10.5 KPIs

- **% clientes renovados al día 90**: meta 70%.
- **% upgrades al renovar**: meta 25%.
- **LTV promedio al día 90**: meta USD $3.000+.

#### 3.10.6 Fricción típica + solución

Ver sección 5.

#### 3.10.7 Integración Jarvis WhatsApp

- Jarvis envía "Quarterly Report" previo a la call.
- Jarvis envía contrato de renovación post-call con link de firma directo.
- Jarvis dispara campaña win-back automática si el cliente declina renovar (día 100, 120, 150).

---

## 4. Tabla maestra de SLAs

| Evento | SLA máximo | Owner | Consecuencia si se incumple |
|---|---|---|---|
| Activación en Supabase post-pago | 10 min | Jarvis | Alerta crítica a Diana |
| Kickoff call agendada | 48h post activación | Diana | Escalamiento a Alexander |
| Brand briefing aprobado | 72h post kickoff | Diana + cliente | Pausa SLA hasta completar |
| Research dossier entregado | Día 6 | Diana | Alert interno |
| Pillars aprobados por cliente | Día 7 | Diana | Pausa Batch 1 |
| Briefs creativos listos | Día 8 | Brian | Escalamiento |
| Creadores asignados | Día 9 | Diana | Re-planificación |
| Raw footage recibido | Día 12 | Creadores | Re-asignación |
| QA interno completado | Día 13 | Diana | Bloqueante |
| Entrega Batch 1 al cliente | Día 14 | Diana | Penalty interno + disculpa formal al cliente |
| Respuesta a consulta cliente vía WhatsApp | 2h hábiles | Diana / Jarvis | Escalamiento |
| Ejecución ronda 1 de revisión | 48h hábiles | Brian + Diana | Pieza marcada en riesgo |
| Ejecución ronda 2 de revisión | 24h hábiles | Brian + Diana | Escalamiento Alexander |
| Reporte mensual | Día 30 ±1 | Samuel + Diana | Cliente insatisfecho |
| Mid-month call | Día 45 ±2 | Diana | Alert de engagement |
| Check-in día 60 | Día 60 ±3 | Alexander | Riesgo churn |
| Renewal call | Día 90 ±3 | Alexander | Riesgo churn crítico |
| Invoice cobrada (billing day) | +3 días reintento | Jarvis + Alexander | Pausa de servicio día 5 |

---

## 5. Playbook "cliente difícil"

### 5.1 Scope creep

**Síntoma**: cliente pide cada vez más cosas fuera del scope original ("ya que estás, hazme también...").

**Diagnóstico**: el cliente percibe valor alto y quiere más por el mismo precio. Es señal positiva (ama el servicio) mal canalizada.

**Respuesta**:

1. Diana documenta cada request fuera de scope en Notion con etiqueta `out-of-scope`.
2. Una vez a la semana, Diana envía resumen al cliente: *"Estas fueron las cosas extra que hicimos esta semana. En tu plan actual son gratis hasta X. Desde ahora, cualquier cosa marcada [OUT] requiere aprobación y cotización breve"*.
3. Si persiste: Alexander agenda llamada y presenta **upgrade a plan superior** como solución estructural.
4. No decir "no" jamás. Decir: *"Eso no está en el plan actual. En el plan Pro sí está incluido. ¿Quieres que te lo cotice?"*.

### 5.2 Delays del cliente (no aprueba briefings, no da feedback, no manda producto)

**Síntoma**: el SLA de 14 días se dispara porque el cliente bloquea.

**Diagnóstico**: el cliente está saturado o priorizando otras cosas.

**Respuesta**:

1. Jarvis envía reminders escalonados (día 1, 3, 5).
2. Diana llama personalmente al día 5.
3. Si pasa día 7 sin respuesta: se **pausa el reloj del SLA** oficialmente por escrito (email formal). El cronómetro reanuda cuando el cliente responde. Esto se documenta en Supabase `deliveries.pause_reason` y `deliveries.paused_at`.
4. No se absorbe el delay como responsabilidad nuestra jamás.
5. En el renewal call, se muestra la data: *"Este mes estuvimos bloqueados 9 días esperando tu feedback. Si lo agilizamos a 2 días, podemos entregar 30% más piezas"*.

### 5.3 Feedback contradictorio

**Síntoma**: cliente dice una cosa en ronda 1, la opuesta en ronda 2.

**Diagnóstico**: falta de aprobador único, o cliente no tiene claridad interna.

**Respuesta**:

1. Diana hace llamada de 20 min y obliga a definir **criterio único de aprobación** (*"¿Cuál es el principio que vamos a usar para decidir?"*).
2. Si el cliente sigue contradictorio, Diana redacta un **Decision Memo** de 1 página que el cliente debe firmar digitalmente antes de ejecutar cambios adicionales.
3. Si persiste, se activa cláusula de contrato: "ambigüedad creativa repetida se cotiza como nueva ronda fuera de scope".

### 5.4 Creador rechazado después de producción

**Síntoma**: cliente aprobó creador en casting pero rechaza la pieza porque "no me gusta cómo se ve".

**Diagnóstico**: gap entre expectativa visual y ejecución, o cliente cambió de opinión.

**Respuesta**:

1. Diana valida si el creador cumplió el brief. Si sí cumplió, se muestra al cliente el contrato: la pieza no se re-hace gratis.
2. Se ofrecen 2 opciones:
   - Editar la pieza existente (gratis, dentro de 2 rondas).
   - Re-grabar con otro creador (costo adicional).
3. Si es error del creador (no del cliente), se re-hace sin costo y se penaliza al creador en Supabase.
4. El creador rechazado se evalúa: si es primer strike, queda en watchlist; si es segundo, pausa temporal; si es tercero, se excluye del roster.

### 5.5 Cliente compara con competencia ("X agencia me cobra la mitad")

**Síntoma**: el cliente menciona agencias baratas o marketplaces self-serve.

**Diagnóstico**: commoditización percibida. Nuestra narrativa de valor no está calando.

**Respuesta**:

1. Alexander toma la conversación personalmente.
2. No defiende el precio. Redefine el producto:
   - *"Entiendo. ¿Esa agencia te hace research de mercado antes de producir?"*
   - *"¿Te da dashboard de performance con recomendaciones?"*
   - *"¿Te responde en menos de 2h por WhatsApp?"*
   - *"¿Revisa cada pieza internamente antes de entregártela?"*
3. Cierra con: *"Si lo que buscas es volumen barato, tenemos 3 marketplaces que te recomiendo honestamente. Si lo que buscas es un socio operativo de contenido, somos la opción correcta. Ambas decisiones son válidas"*.
4. Alexander ofrece 1 mes de prueba con guarantee: si al día 30 no hay diferencia clara, downgrade o reembolso parcial.
5. Nunca bajar precio como primera opción. Siempre agregar valor antes de descontar.

---

## 6. NPS y métricas de captura

### 6.1 Cuándo se captura NPS

| Evento | Canal | Tipo |
|---|---|---|
| Día 14 (post entrega Batch 1) | WhatsApp Jarvis, 1 pregunta | CSAT express |
| Día 30 (post reporte mensual) | Typeform corto, 3 preguntas | NPS + 2 open |
| Día 60 (check-in Alexander) | Conversacional en call + captura manual | NPS formal |
| Día 90 (renewal call) | Typeform + captura en call | NPS + qualitative |

### 6.2 Métricas adicionales a capturar

**Producto**:

- Tiempo real por etapa (Supabase `deliveries.timestamps`).
- Número de rondas por pieza.
- % piezas grado A en primera ejecución.
- % briefs que requirieron re-write.

**Cliente**:

- NPS día 14, 30, 60, 90.
- Tiempo de respuesta cliente a feedback.
- % piezas publicadas por cliente.
- Performance ads de las piezas (CPA, CTR, ROAS).
- Número de WhatsApps iniciados por cliente.

**Comercial**:

- MRR retenido por cliente.
- LTV acumulado día 90.
- % renovación día 90.
- % upsell día 60 y 90.
- Referrals generados.

**Operacional**:

- Tiempo total del equipo por cliente/mes.
- Costo de creadores por cliente/mes.
- Margen bruto por cliente.
- Health score actual y delta semanal.

### 6.3 Encuesta NPS estandarizada (Typeform, 3 preguntas)

1. En una escala de 0–10, ¿qué tan probable es que recomiendes UGC Colombia a otro founder?
2. ¿Qué es lo que más valoras hasta ahora?
3. ¿Qué cambiarías?

---

## 7. Health Score — fórmula Supabase

### 7.1 Fórmula (escala 0–100)

```sql
-- Supabase: function get_client_health_score(client_id uuid)
-- Retorna integer 0-100

health_score = ROUND(
    (nps_weight * nps_normalized) +
    (delivery_weight * delivery_sla_compliance) +
    (revision_weight * (1 - revision_ratio)) +
    (publish_weight * publish_rate) +
    (payment_weight * payment_reliability) +
    (engagement_weight * response_time_score)
)

donde:
    nps_weight             = 0.25
    delivery_weight        = 0.20
    revision_weight        = 0.15
    publish_weight         = 0.15
    payment_weight         = 0.15
    engagement_weight      = 0.10

    nps_normalized         = COALESCE(latest_nps, 7) * 10   -- 0-100
    delivery_sla_compliance= on_time_deliveries / total_deliveries
    revision_ratio         = avg_revisions_per_piece / 2    -- normalizado a 0-1, cap en 1
    publish_rate           = pieces_published_by_client / pieces_delivered
    payment_reliability    = on_time_payments / total_payments
    response_time_score    = CASE
                                WHEN avg_client_response_hours < 24 THEN 1.0
                                WHEN avg_client_response_hours < 48 THEN 0.7
                                WHEN avg_client_response_hours < 72 THEN 0.4
                                ELSE 0.1
                             END
```

### 7.2 Umbrales operativos

| Health Score | Estado | Acción automática |
|---|---|---|
| 85–100 | Excelente | Candidato a referral + upsell |
| 70–84 | Sano | Mantener cadencia estándar |
| 50–69 | Riesgo moderado | Alert a Diana, llamada en <72h |
| 30–49 | Riesgo alto | Alert a Alexander, intervención en <48h |
| 0–29 | Crítico | Escalamiento inmediato, playbook churn prevention activo |

### 7.3 Frecuencia de cálculo

- Recalculado **cada lunes 08:00 hora Bogotá** por n8n cron.
- Recalculado **on-demand** cada vez que hay un evento de riesgo (delivery tardío, feedback negativo, pago rechazado, NPS bajo).
- Historial guardado en `client_health_history` con snapshot semanal.

### 7.4 Migración sugerida

```sql
CREATE TABLE client_health_history (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    client_id uuid REFERENCES clients(id),
    score integer NOT NULL,
    nps numeric,
    delivery_sla_compliance numeric,
    revision_ratio numeric,
    publish_rate numeric,
    payment_reliability numeric,
    response_time_score numeric,
    computed_at timestamptz DEFAULT now()
);

CREATE INDEX idx_chh_client_time ON client_health_history (client_id, computed_at DESC);
```

---

## 8. Diagrama ASCII del flujo día 0 → 90

```
                        UGC COLOMBIA — CLIENT ONBOARDING FLOW (90 DAYS)
                        =================================================

DAY 0          DAY 1-3         DAY 4-7         DAY 8-14         DAY 15-21
[ACTIVACION]   [KICKOFF]       [STRATEGY]      [PRODUCCION B1]  [ENTREGA + REVS]
     |              |               |                |                  |
  Contrato      Kickoff Call    Research Perplexity  Briefs Brian   Entrega Batch 1
  Pago Stripe   Brand Briefing  Competitor analysis  Asignacion     Ronda 1 revision
  n8n webhook   Recap Notion    Content Pillars      Grabacion      Ronda 2 revision
  Supabase      Jarvis confirms Match creadores      QA Diana       Supabase: final
  Jarvis WA                                          Empaquetado
     |              |               |                |                  |
     v              v               v                v                  v
  [clients]    [briefings]     [strategy]       [deliveries]     [deliveries]
   active       approved        approved         ready            approved
     |              |               |                |                  |
     +--------------+---------------+----------------+------------------+
                                          |
                                          v
DAY 22-30                   DAY 30          DAY 45          DAY 60          DAY 90
[PERFORMANCE + B2]          [REPORTE]       [MID CALL]      [CHECK-IN]      [RENEWAL]
      |                         |               |                |               |
 Samuel dashboards         Reporte mensual  Diana call      Alexander call   Alexander
 Batch 2 briefs            Fee recurrente   30 min          NPS formal       Renew call
 Insights capture          Stripe invoice   Temperatura     Upsell paths     Contrato
 Creadores Batch 2         Jarvis WA        Notion acta     Referrals        Q2 plan
      |                         |               |                |               |
      v                         v               v                v               v
  [batch2]              [mrr_paid]       [mid_review]       [nps=8+]        [renewed]
                                                                                  |
                                                                                  v
                                                                            [RECURRING]
                                                                           (mes 4 en adelante)


             JARVIS (n8n + WhatsApp) — capa transversal
             ------------------------------------------
             * Welcomes, reminders, follow-ups
             * Health score weekly
             * Alert escalations
             * Billing flow
             * Report delivery
             * NPS capture
```

---

## 9. Checklist maestro imprimible para Diana

> **Instrucciones**: imprimir 1 hoja por cliente nuevo. Marcar con X cada item. Pegar en la carpeta física del cliente o adjuntar a Notion.

### Cliente: ________________________________________
### Plan: __________  Start date: __________  Billing day: __________

---

#### DÍA 0

- [ ] Contrato firmado en DocuSign
- [ ] Primer pago confirmado en Stripe
- [ ] Registro `clients` creado en Supabase con `status='active'`
- [ ] Carpeta Drive creada con estructura estándar
- [ ] Board Notion del cliente generado
- [ ] WhatsApp de bienvenida enviado
- [ ] Email con Brand Briefing form enviado
- [ ] Tarea de kickoff asignada a Diana

#### DÍAS 1–3: Kickoff + Briefing

- [ ] Kickoff call agendada en <48h
- [ ] Brand Briefing form revisado
- [ ] Kickoff call ejecutada y transcrita
- [ ] Client OS completo en Notion
- [ ] Recap enviado al cliente
- [ ] `briefing_approved_at` registrado en Supabase

#### DÍAS 4–7: Research + Strategy

- [ ] Dossier Perplexity generado
- [ ] Análisis competidores con Apify
- [ ] 3–5 content pillars definidos con Brian
- [ ] Pillars aprobados por cliente (WhatsApp)
- [ ] Shortlist creadores enviada al cliente
- [ ] Creadores aprobados por cliente
- [ ] `strategy_approved_at` registrado en Supabase

#### DÍAS 8–14: Producción Batch 1

- [ ] Briefs redactados por Brian
- [ ] QA de briefs por Diana
- [ ] Envío de briefs a creadores
- [ ] Envío de producto físico (si aplica)
- [ ] Grabaciones confirmadas día 10 y 11
- [ ] Raw footage recibido día 12
- [ ] QA interno día 13 (A/B/C)
- [ ] Todas las piezas en grado A
- [ ] Empaquetado final día 14

#### DÍAS 15–21: Entrega + Revisiones

- [ ] Entrega Batch 1 enviada al cliente
- [ ] Loom presentación grabado
- [ ] Feedback cliente recibido antes del día 20
- [ ] Ronda 1 ejecutada <48h
- [ ] Ronda 2 ejecutada <24h (si aplica)
- [ ] Piezas marcadas `final_approved` en Supabase

#### DÍAS 22–30: Performance + Batch 2

- [ ] Dashboard Looker Studio operativo
- [ ] UTMs configurados (si aplica)
- [ ] Snapshot semanal de performance enviado
- [ ] Batch 2 briefs iniciados
- [ ] Creadores Batch 2 asignados

#### DÍA 30: Reporte + Renovación mes 2

- [ ] Reporte mensual finalizado por Samuel
- [ ] Loom presentación reporte grabado
- [ ] QA Alexander completado
- [ ] Reporte enviado al cliente
- [ ] Invoice mes 2 cobrada
- [ ] NPS Día 30 capturado

#### DÍA 45: Mid-month call

- [ ] Call agendada
- [ ] Call ejecutada
- [ ] Acta en Notion
- [ ] Acciones asignadas

#### DÍA 60: Check-in Alexander

- [ ] Call agendada por Alexander
- [ ] NPS formal capturado
- [ ] Conversación de expansión iniciada
- [ ] Upsell path identificado
- [ ] Referrals solicitados (si NPS ≥ 9)

#### DÍA 90: Renewal

- [ ] Quarterly report preparado
- [ ] Health score actualizado
- [ ] Renewal call ejecutada
- [ ] Contrato de renovación firmado
- [ ] Plan Q2 documentado
- [ ] Cliente movido a `stage='recurring'`

---

## 10. Anexos

### 10.1 Templates y enlaces cruzados

- Contrato retainer: `templates/contrato-retainer-ugc-v3.pdf`
- Brand Briefing Typeform: `https://typeform.com/ugc-brand-briefing`
- Prompt Perplexity research: `content/sistemas/research/perplexity-prompts.md`
- Funnel maestro: `content/sistemas/captacion/funnel-maestro.md`
- Sistema creadores: `content/sistemas/creadores/`
- Workflows n8n: `n8n/workflows-spec.md`
- Schema Supabase: `supabase/schema.sql`
- Client OS Notion template: `templates/notion-client-os.md`
- Looker Studio template: `templates/looker-client-dashboard.md`

### 10.2 Workflows n8n relevantes

- `client.activate.v2` — activación post pago
- `whatsapp.welcome.client.v2` — bienvenida cliente
- `whatsapp.kickoff.reminder.v1` — reminders pre-kickoff
- `whatsapp.creator.checkin.v1` — checkin creadores durante grabación
- `whatsapp.delivery.reminder.v1` — reminders feedback cliente
- `stripe.billing.recurring.v2` — factura mensual recurrente
- `health.score.weekly.v1` — recálculo semanal health score
- `nps.capture.v1` — captura NPS día 14/30/60/90

### 10.3 Comandos rápidos Diana (Notion)

- `/nuevo-cliente` — activa template Client OS
- `/brief-creativo` — template brief de pieza
- `/qa-internal` — checklist QA interno
- `/reporte-mensual` — template reporte
- `/decision-memo` — template para cliente con feedback contradictorio

### 10.4 Contactos de escalamiento

| Situación | Escalamiento |
|---|---|
| Problema legal / contrato | Alexander → asesor legal externo |
| Problema de pago | Alexander → contador Colombia |
| Creador problemático | Diana → Brian → Alexander |
| Cliente amenaza churn | Diana → Alexander directo |
| Crisis reputacional cliente | Alexander exclusivo |
| Fallo crítico Jarvis | Alexander + proveedor VPS |

---

## Changelog del documento

| Versión | Fecha | Autor | Cambios |
|---|---|---|---|
| 1.0 | 2026-04-08 | Alexander Cast | Versión inicial completa. Base para ejecución desde lunes 2026-04-13. |

---

**Fin del documento.**

Este flujo se ejecuta desde el lunes 13 de abril de 2026. Próxima revisión: día 90 de ejecución (julio 2026), con datos reales de los primeros 3 clientes que pasen por el flujo.
