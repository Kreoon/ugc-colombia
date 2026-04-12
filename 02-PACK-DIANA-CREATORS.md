# PACK OPERATIVO — DIANA MILE
## Head of Operations / Creators · UGC Colombia

**Fecha:** 2026-04-09
**Versión:** 1.0
**Rol:** Gestión end-to-end de creadores, delivery y cliente operativo
**Uso:** Biblia diaria. Referencia de cada kickoff, brief, revisión y escalamiento.

---

## Tabla de contenidos

1. [Propósito del sistema](#1-proposito)
2. [Flujo end-to-end (resumen)](#2-flujo)
3. [Formulario de aplicación de creadores](#3-formulario)
4. [Sistema de scoring A/B/C](#4-scoring)
5. [Contrato de colaboración (cláusulas clave)](#5-contrato)
6. [Pricing guide LATAM/USA](#6-pricing)
7. [Briefs tipo por formato (6 formatos)](#7-briefs)
8. [Proceso de revisión y feedback](#8-revision)
9. [Dashboard de métricas](#9-dashboard)
10. [Onboarding de cliente día 0-90](#10-onboarding)
11. [Playbook cliente difícil](#11-cliente-dificil)

---

## 1. Propósito del sistema

Este sistema define el proceso completo de gestión del pool de creadores de UGC Colombia: desde que un creador aplica hasta que recibe su pago. Está diseñado para escalar sin perder calidad, operar en LATAM y USA Hispanic, y reducir dependencia de procesos manuales.

**Canales operativos:**
- Comunicación con creadores: WhatsApp Business (Diana)
- Entrega de archivos: Google Drive (carpeta por proyecto)
- Contratos: PDF firmado por WhatsApp (Ley 527/1999) o firma digital
- Pagos Colombia: Bancolombia / Nequi / Daviplata
- Pagos internacionales: Mercury Bank (USD) / Wise / Zelle
- Base de datos: Supabase (tablas `creators`, `projects`, `deliveries`)
- Automatizaciones: n8n en dev.kreoon.com
- Aplicación de creadores: Tally o Typeform (link desde bio IG)

**Políticas clave:**
- **Calidad:** Todo borrador pasa por Diana antes de llegar al cliente. Nunca llega un video técnicamente deficiente al cliente.
- **Revisiones:** 2 rondas incluidas. La tercera se cotiza. El brief manda.
- **Pagos:** 50% anticipo / 50% contra entrega. Creador recibe su pago en 48h de cobrado el saldo al cliente.
- **Exclusividad:** 90 días por categoría después de entregar.
- **Confidencialidad:** Ningún creador menciona la marca antes del lanzamiento.
- **Tier:** Se reevalúa cada 90 días o tras un incidente.

---

## 2. Flujo end-to-end

```
CAPTACIÓN → APLICACIÓN (Tally) → SCREENING (scoring 5-7 días)
    ↓
ONBOARDING (contrato firmado) → INGRESO AL POOL
    ↓
ASIGNACIÓN (Diana matchea Tier, nicho, disponibilidad)
    ↓
BRIEF Y PRODUCCIÓN → REVISIÓN (2 rounds) → APROBACIÓN FINAL
    ↓
ENTREGA AL CLIENTE → PAGO CREADOR → CIERRE DASHBOARD
    ↓
EVALUACIÓN (Diana califica → score actualiza → Tier reevalúa 90d)
```

---

## 3. Formulario de aplicación

Implementar en Tally o Typeform, formulario multi-página con lógica condicional. Notificación automática a Diana al enviar.

### Campos (resumen)

**Página 1 — Datos personales:**
nombre completo, WhatsApp (con código país), email, ciudad/país, fecha nacimiento (bloquear <18), género, tipo y número de identificación.

**Página 2 — Redes y audiencia:**
@ Instagram, rango seguidores IG, @ TikTok (opcional), seguidores TikTok, YouTube opcional, engagement rate (instrucción de cálculo), **captura de estadísticas IG últimos 30 días (obligatoria)**, país principal de audiencia, rango de edad principal.

**Página 3 — Experiencia técnica:**
años creando video, experiencia con marcas, equipo de grabación (iPhone/Android/DSLR/mic externo), capacidad 4K/60fps, iluminación, apps de edición (CapCut/Premiere/etc.), subtítulos integrados, idiomas de grabación (español neutro / mexicano / inglés), **portfolio (link Drive/Dropbox obligatorio)**.

**Página 4 — Nichos y disponibilidad:**
nichos cómodos (belleza, moda, salud, fitness, tech, hogar, alimentos, etc.), exclusiones éticas (alcohol, tabaco, apuestas, etc.), disponibilidad mensual (1-3 / 4-8 / 9-15 / 15+), tiempo de entrega típico, disponibilidad para recibir producto físico, dirección de envío.

**Página 5 — Pago:**
método preferido (transferencia / Nequi / Daviplata / PayPal / Wise / Payoneer / Zelle), cuenta propia o familiar, emite factura o RUT, **rango de tarifa esperada por video 30-60s** (USD 30-60 / 60-100 / 100-180 / 180-300 / 300+).

**Página 6 — Soft skills:**
estilo en cámara, reacción ante revisiones inesperadas, frecuencia de respuesta WhatsApp, **"¿Por qué quieres trabajar con UGC Colombia?" (texto libre max 300 palabras)**, checkboxes de aceptación de términos.

### Automatizaciones

1. Al enviar: notificación WhatsApp a Diana con resumen (nombre, ciudad, seguidores, engagement, portfolio).
2. Fila automática en Supabase `creators_applications`.
3. Si engagement ≥4% Y seguidores ≥5.000 → etiqueta "Prioritario".
4. Email automático de confirmación desde ugccolombia@kreoon.com.

---

## 4. Sistema de scoring A/B/C

Puntaje total: **100 puntos**. Scoring se aplica en 48h de recibida aplicación completa. Revisión cada 90 días.

### Categorías y puntos máximos

| # | Categoría | Puntos Max |
|---|---|---|
| 1 | Engagement y métricas de audiencia | 25 |
| 2 | Calidad técnica del video | 20 |
| 3 | Retención y eficacia del hook | 20 |
| 4 | Profesionalismo y cumplimiento | 15 |
| 5 | Soft skills y cámara | 10 |
| 6 | Idiomas y versatilidad | 10 |

### Tiers

| Tier | Puntaje | Asignación |
|---|---|---|
| **A** | 75-100 | Marcas USA, campañas pagas, whitelisting |
| **B** | 50-74 | Marcas LATAM mid, campañas orgánicas |
| **C** | 25-49 | Proyectos entrada, test batches |
| **Rechazado** | 0-24 | No se integra al pool |

### Desglose categoría 1 — Engagement (25 pts)

**1.1 ER en IG/TikTok (10 pts):** ≥6% = 10 | 4-5.9% = 8 | 2.5-3.9% = 5 | 1.5-2.4% = 2 | <1.5% = 0
**1.2 Tamaño audiencia (5 pts):** >50K = 5 | 10-50K = 4 | 5-10K = 3 | 1-5K = 2 | <1K = 1
**1.3 Calidad audiencia (10 pts):** >70% en mercado objetivo = 10 | 50-69% = 7 | 30-49% = 4 | <30% = 1

### Desglose categoría 2 — Calidad técnica (20 pts)
**2.1 Resolución y estabilidad (5):** 4K/1080p estable = 5 | 1080p aceptable = 3 | <1080p = 1 | inaceptable = 0
**2.2 Iluminación y encuadre (5):** profesional = 5 | natural buena = 3 | deficiente = 1 | inaceptable = 0
**2.3 Audio (5):** limpio + mic externo = 5 | aceptable = 3 | eco notorio = 1 | inutilizable = 0
**2.4 Edición (5):** fluida + subtítulos = 5 | básica funcional = 3 | mínima = 1 | sin edición necesaria = 0

### Desglose categoría 3 — Hook y retención (20 pts)
**3.1 Hook primeros 3s (10):** muy fuerte disruptivo = 10 | funcional = 6 | débil ("Hola hoy...") = 2 | sin hook = 0
**3.2 Ritmo (5):** sostenido = 5 | algunos lentos = 3 | mucho relleno = 1
**3.3 Mensaje y CTA (5):** claro + CTA específico = 5 | claro sin CTA = 3 | confuso = 0

### Desglose categoría 4 — Profesionalismo (15 pts)
**4.1 Tiempo de respuesta (5):** <2h verificado = 5 | mismo día = 3 | siguiente día = 1 | >2 días = 0
**4.2 Historial con marcas (5):** >5 marcas = 5 | 2-4 = 3 | 1 = 1 | ninguna = 0
**4.3 Completitud formulario (5):** todo completo + capturas + portfolio = 5 | falta algo no esencial = 3 | varios campos = 1 | no evaluable = 0

### Desglose categoría 5 — Soft skills (10 pts)
**5.1 Naturalidad frente a cámara (5):** muy natural = 5 | ligera tensión = 3 | forzado = 1 | no sostiene toma = 0
**5.2 Sigue estructura sin brief (5):** evidencia clara = 5 | inconsistente = 3 | sin estructura = 1

### Desglose categoría 6 — Idiomas (10 pts)
**6.1 Español (5):** neutro impecable = 5 | acento regional aceptable = 3 | errores gramaticales = 1
**6.2 Inglés (5):** fluido = 5 | conversacional = 3 | básico = 1 | no habla = 0

### Flags automáticos de descalificación (sin importar puntaje)

- Menor de 18 años
- Portfolio inaccesible o inexistente tras re-solicitud
- Evidencia de compra de seguidores (ratio anómalo, comments genéricos masivos)
- Historial público de incumplimiento con otras marcas
- Videos que violan normas de plataforma
- No responde durante evaluación >5 días hábiles

### Mensajes post-evaluación (plantillas WhatsApp)

**Tier A/B — Aprobado:**
> "Hola [Nombre], soy Diana de UGC Colombia. Revisamos tu aplicación y nos encantó tu perfil. Quedaste clasificado en nuestro pool activo Tier [A/B]. Te vamos a estar contactando cuando tengamos proyectos que encajen con tu perfil y nichos. En los próximos días te enviamos el contrato base. Bienvenido al equipo."

**Tier C — En formación:**
> "Hola [Nombre], gracias por postularte. Tu perfil tiene potencial y lo hemos guardado en nuestra base. Por ahora te asignaremos proyectos de entrada para que ganes experiencia con nosotros."

**Rechazado:**
> "Hola [Nombre], gracias por tu interés. En este momento tu perfil no coincide con los requisitos actuales. Te invitamos a seguir desarrollando tu contenido y a aplicar nuevamente en 3 meses."

---

## 5. Contrato de colaboración (cláusulas clave)

**Contratante:** Infiny Group SAS (marca UGC Colombia), representada por Alexander Cast.
**Naturaleza:** Contrato de prestación de servicios independiente. No hay relación laboral.
**Vigencia:** Contrato marco por 12 meses, renovable automáticamente. Cada proyecto se rige por brief complementario.

### Cláusula 4 — Propiedad intelectual (crítica)

- **Cesión exclusiva, irrevocable y onerosa** al recibir pago total: reproducción, distribución, comunicación pública, transformación y sincronización musical.
- Cesión incluye todos los formatos actuales y futuros, cualquier plataforma, sin limitación geográfica.
- Derechos morales irrenunciables (Ley 23/1982 Col.), pero creador acepta que el contenido no requiere crédito público y puede presentarse como orgánico.

**Alcance por tipo de licencia:**
- Uso orgánico: incluido.
- Paid Media: +30-50% sobre base.
- Whitelisting: +30-40% mensual.
- Uso perpetuo: +50-75% sobre base.

**Exclusividad por categoría:** 90 días calendario desde entrega, no crear contenido para competidores directos.

### Cláusula 5 — Confidencialidad

El creador no puede mencionar nombre de marca antes del lanzamiento. Tampoco puede publicar precios, briefs, scripts o materiales recibidos. Violación genera responsabilidad por daños.

### Cláusula 6 — Obligaciones del creador

a) Producir según brief (guion, formato, duración, **resolución mínima 1080p**).
b) Entregar en plazo. Incumplimiento sin aviso 24h previo = **descuento 10% por día** de retraso.
c) Responder mensajes en ≤4h hábiles.
d) Calidad técnica aceptable. Entregas inaceptables devueltas sin pago.
e) No publicar en sus propias redes sin autorización.
f) Conservar archivos originales **60 días** post-entrega.
g) Avisar con 48h si no podrá cumplir un plazo.
h) No sublicenciar ni revender el contenido.

### Pago

- 50% anticipo al confirmar asignación (no reembolsable tras envío del brief).
- 50% saldo a los 2-5 días hábiles de entrega final aprobada.
- Métodos: Bancolombia/Nequi (Col), Wise/PayPal/Zelle (internacional).

---

## 6. Pricing guide LATAM / USA (ver Pack Brian para detalle completo)

### Markup agencia sobre tarifa creador

| Tier | Tarifa base al creador | Markup | Precio cliente |
|---|---|---|---|
| C | $40-80 | 60% | $64-128 |
| B | $80-150 | 50% | $120-225 |
| A LATAM | $150-300 | 45% | $218-435 |
| A USA | $300-600 | 40% | $420-840 |

### Tabla maestra por formato (USD al cliente)

**Testimonial (talking head):**
| Duración | LATAM | USA | Premium |
|---|---|---|---|
| 15-30s | $150-250 | $350-600 | $700-1.200 |
| 30-60s | $220-380 | $500-900 | $900-1.800 |
| 60-90s | $300-500 | $700-1.200 | $1.200-2.500 |

**Unboxing:** 30-45s → $200-320 LATAM / $450-750 USA. 45-90s → $280-450 / $600-1.000.
**Demo/Tutorial:** 30-60s → $220-380 LATAM / $500-900 USA. 60-90s → $320-520 / $700-1.200.
**Review/Comparación:** 45-60s → $250-420 LATAM / $550-950 USA.
**Lifestyle/B-roll:** 15-30s → $180-300 LATAM / $400-700 USA. 30-60s → $280-480 / $650-1.100.
**Hook-Ad:** 6-10s → $120-200 LATAM / $280-500 USA. Pack 3 variaciones → $400-650 / $900-1.600.

### Licencias (se suman al precio base)

| Tipo | LATAM | USA | Premium |
|---|---|---|---|
| Orgánico | Incluido | Incluido | Incluido |
| Paid Media | +30% | +40% | +50% |
| Whitelisting 30d | +30%/mes | +40%/mes | +50%/mes |
| Whitelisting 90d | +25%/mes | +35%/mes | +45%/mes |
| Email/landing | +20% | +25% | +30% |
| Perpetua | +50% | +60% | +75% |
| OOH/TV | +80% | +100% | +150% |

### Paquetes de volumen

3-5 videos = 5% desc | 6-10 = 10% | 11-20 = 15% | >20 = 20% (negociar).

### Condiciones de pago al cliente

- 50% anticipo para iniciar (no reembolsable tras envío brief al creador).
- 50% saldo contra entrega aprobada.
- Clientes con 3+ proyectos: crédito 15 días posible.
- Pagos internacionales: Mercury / Wise / PayPal Business.
- Pagos Colombia: Bancolombia / Nequi Empresas.

---

## 7. Briefs tipo por formato

Diana completa campos en MAYÚSCULAS antes de enviar al creador. Los 6 formatos estándar:

### Brief #1 — Testimonial (talking head)

**Estructura (30s):**
- 0-3s Hook: "Llevaba [X tiempo] buscando algo que realmente [resultado] y lo encontré." / "Esto cambió completamente cómo yo [actividad]." / "[Resultado] en solo [tiempo]."
- 3-10s Problema: "Antes de [PRODUCTO] tenía este problema: [PROBLEMA]. Probé muchas cosas y nada funcionaba."
- 10-25s Experiencia: "Cuando empecé a usar [PRODUCTO] noté que [BENEFICIO 1]. Además [BENEFICIO 2]. Lo que más me gustó fue [DIFERENCIADOR]." — mostrar producto en mano.
- 25-30s CTA: "Si tú también quieres [RESULTADO], lo encuentras en [LINK/SITIO]."

**Do's:** buena luz frontal, fondo limpio o relevante, ropa apropiada, producto visible, sonrisa genuina.
**Don'ts:** no empezar con "Hola", no mencionar competidores, no logos visibles, no baño con inodoro al fondo, no mencionar precio salvo indicación.

### Brief #2 — Unboxing

**Estructura (45-75s):** Hook con paquete cerrado → presentación del exterior (3-12s) → apertura lenta con comentarios (12-35s) → primera impresión sensorial (35-65s) → CTA.
**Crítico:** superficie limpia (blanco/madera/mármol), manos cuidadas, reacciones genuinas, abrir de verdad (no simular).

### Brief #3 — Demo / Tutorial

**Estructura (45-90s):** Hook mostrando resultado final → promesa y contexto (3-10s) → pasos numerados con plano detalle (10-70s) → resultado (70-85s) → CTA.
**Crítico:** texto en pantalla con número de paso, ritmo rápido, iluminación consistente entre planos.

### Brief #4 — Review / Comparación

**Estructura:** Hook crítico honesto → criterios objetivos → pros → contras → para quién es ideal → veredicto.
**Crítico:** cliente debe aceptar que puede incluir observaciones críticas. Si exige 100% positivo, cotizar como testimonial.

### Brief #5 — Lifestyle / B-roll

**Estructura:** Escena de vida cotidiana, producto integrado naturalmente, sin discurso directo. Música, texto superpuesto, alta calidad cinematográfica. Ideal para moda, hogar, viajes, comida.
**Crítico:** requiere locación adecuada. Locación especial se cobra aparte ($50-200).

### Brief #6 — Hook-Ad / Ad Creative

**Estructura (6-15s):** Hook + beneficio + CTA. Máximo impacto, mínimo tiempo. Entregar en 9:16, 1:1, 16:9.
**Crítico:** mayor ROI para el cliente. Recomendar pack de 3 variaciones para A/B testing.

### Especificaciones técnicas universales de entrega

- MP4 o MOV, sin comprimir o compresión mínima.
- Sin marca de agua ni subtítulos integrados (salvo indicación).
- Sin música de fondo (salvo indicación).
- Nombre: `[MARCA]-[FORMATO]-[CREADOR]-V1.mp4`
- Entregar 3 captures (seg 0, seg 10, final) para propuestas.

---

## 8. Proceso de revisión y feedback

### Principios

1. **Un solo canal por proyecto.** Todo feedback por un hilo único.
2. **Feedback consolidado.** Cliente da todos los comentarios en un solo mensaje. Mensajes separados = múltiples rounds.
3. **Dos rondas incluidas.** La tercera se factura.
4. **El brief manda.** Si el contenido cumple el brief, no hay revisión válida.
5. **Diana es el filtro.** Comentarios del cliente nunca llegan directo al creador.

### Definición de ronda

Una ronda = ciclo completo: cliente entrega comentarios → agencia retransmite → creador entrega corregida → cliente revisa.

**Ejemplos UNA sola ronda:** 5 cambios en un solo mensaje, creador los hace todos.
**Ejemplos DOS rondas:** Cliente aprueba WhatsApp pero luego pide cambio por email = segunda ronda.

### Plazos

| Etapa | Responsable | Plazo máximo |
|---|---|---|
| Revisión borrador por cliente | Cliente | 48h hábiles |
| Procesamiento feedback por Diana | Diana | 12h hábiles |
| Entrega corrección por creador | Creador | 48h hábiles |
| Segunda revisión cliente | Cliente | 24h hábiles |
| Aprobación final y cierre | Cliente + Diana | 24h hábiles |

Si cliente no responde dentro del plazo: proyecto "en espera por cliente", plazo total se extiende proporcionalmente. Recordatorio automático a 24h y 48h.

### Feedback válido vs no válido

**VÁLIDO (gratis rondas 1 y 2):**
- Creador no mencionó punto clave del brief
- Hook no es el indicado
- Duración muy diferente (+/-15%)
- Error técnico: borroso, audio malo, encuadre
- CTA incorrecto
- Iluminación/fondo inaceptable
- Mencionó Don'ts
- Cortes bruscos o errores obvios

**NO VÁLIDO (cotización adicional):**
- "Queremos cambiar el guion completo"
- "Ahora que sea más corto/largo"
- "Queremos agregar un punto que no estaba"
- "El tono no nos gusta" (si brief lo indicaba y creador lo siguió)
- "Queremos otro creador"
- "Cambiamos el producto"
- "Necesitamos versión en inglés" (si no estaba en brief)
- Cualquier cambio por cambio de estrategia del cliente

### Formulario de feedback (plantilla para clientes)

```
FORMULARIO DE REVISIÓN — UGC Colombia
Proyecto: [#]
Video: [NOMBRE]
Versión: V1

1. APROBACIÓN GENERAL
[ ] Aprobado sin cambios
[ ] Aprobado con ajustes menores
[ ] Requiere cambios importantes

2. AJUSTES SOLICITADOS
(Lista todos aquí en este mensaje. Comentarios posteriores = segunda ronda.)
Ajuste 1: [segundo del video] — [descripción]
Ajuste 2: ___
Ajuste 3: ___

3. LO QUE FUNCIONA BIEN (opcional, útil para el creador)

4. PRIORIDAD
[ ] Todos obligatorios
[ ] Los marcados con * son obligatorios

Firmado: [Nombre aprobador único]
```

### Protocolo Diana → creador

```
FEEDBACK RONDA [1/2] — Proyecto [#]
Video: [NOMBRE]
Recepción feedback cliente: [FECHA]
Deadline corrección: [FECHA + 48h]

CAMBIOS REQUERIDOS (en orden de prioridad):
1. [CAMBIO 1 — específico, con segundo si aplica]
2. [CAMBIO 2]
3. [CAMBIO 3]

LO QUE ESTÁ BIEN (no tocar):
- [ELEMENTOS APROBADOS]

NOTAS:
[Contexto útil]

Responde confirmando recepción y cumplimiento del plazo.
```

### Aprobación final y entrega

1. Diana pide confirmación escrita: "Confirmas que [VIDEO] versión [X] está aprobado para uso final?"
2. Diana solicita archivo máxima calidad al creador (24h).
3. Sube a Drive del cliente con nombre final: `[MARCA]-[FORMATO]-FINAL.mp4`.
4. Envía factura por 50% restante al cliente (pago 48h).
5. Paga al creador 24-48h tras recibir saldo.
6. Cierra proyecto en Supabase: fecha, estado, calificaciones, notas.

### Escenarios especiales

- **Creador no entrega:** recordatorio 24h antes → aviso al cliente → descuento 10% por día tras 48h → reasignación tras 5 días hábiles (creador pierde anticipo).
- **Cliente rechaza sin feedback específico:** Diana pide formulario. Si no especifica, revisa contra brief; si cumple, lo defiende.
- **Video no pasa QA de Diana:** devuelve al creador antes del cliente. No cuenta como ronda del cliente.
- **Cliente quiere >3 rondas:** "Ya agotamos las 2 rondas incluidas. Una revisión adicional cuesta [PRECIO]. ¿Confirmas?"

### Calificación post-proyecto (Diana actualiza en Supabase)

Criterios 1-5: calidad borrador inicial, cumplimiento brief, puntualidad, calidad correcciones, comunicación. Promedio automático. **Creadores con <3.5 en 2 proyectos consecutivos → revisión de Tier o suspensión.**

---

## 9. Dashboard de métricas (vista Diana)

**Diario:**
- Briefs activos
- Entregas pendientes hoy
- Alertas de retraso

**Semanal:**
- Delivery Health Score por cliente
- Creadores activos
- Retrabajos

**Mensual:**
- Creator NPS
- Churn de creadores
- Tiempo promedio brief→entrega
- % aprobados sin retrabajo

**KPIs propios:**
- ≤7 días brief→entrega
- ≥80% aprobados sin retrabajo
- ≥50 Creator NPS

---

## 10. Onboarding de cliente día 0-90 (10 etapas)

### Etapa 1 — Día 0: Activación post-pago
**Owner:** Jarvis → Diana.
**SLA:** 10 min desde cobro Stripe hasta activación en Supabase + handoff a Diana.
**Trigger:** `stripe.webhook.invoice.paid` en n8n → workflow `whatsapp.welcome.client.v2`.

### Etapa 2 — Días 1-3: Kickoff call + Brand Briefing
**Owner:** Diana (Alexander si ticket >$1K).
**Duración:** 3 días calendario máximo desde activación a briefing aprobado.

**Pre-call Diana (día 1):** revisa que cliente haya llenado Brand Briefing form; web 10min + IG/TikTok 10min + UGC previo 5min + 2-3 competidores 10min; agenda visible en Notion.

**Estructura kickoff call (45 min):**

| Min | Bloque |
|---|---|
| 0-5 | Rompehielo + presentación del equipo |
| 5-10 | Recap del scope contratado |
| 10-20 | Brand deep dive: tono, valores, no-go, competidores |
| 20-30 | Objetivo de negocio: qué métrica mover |
| 30-40 | Creator fit: UGC previo, qué gustó/odió, perfil soñado |
| 40-45 | Próximos pasos + timeline |

**Regla de oro:** Diana **no promete** nada fuera del scope en la call. Si pide extra: *"déjame validarlo y te confirmo por WhatsApp hoy"*.

**Brand Briefing form (Typeform) — campos obligatorios:**
1. Identidad: marca, web, IG, TikTok, logo, colores, tipografías
2. Negocio: producto estrella, ticket, margen, público objetivo
3. Tono: 3 adjetivos, 3 marcas admiradas, 3 que NO
4. No-go zones: temas, palabras, competidores
5. UGC previo: links, qué funcionó
6. Objetivo medible: métrica, baseline, meta 30/90d
7. Plataformas de publicación
8. Producto físico: envío, stock, quién paga
9. Legales: Invima/FDA, claims permitidos
10. **Aprobador final único** (nombre + WhatsApp + email). Comité = red flag.

**Post-call (día 2):** transcripción Granola a Notion, Client OS lleno, recap 1-página compartido, `clients.briefing_approved_at=now()` dispara Etapa 3.

### Etapa 3 — Días 4-7: Research & Strategy

Día 4: Research mercado (Diana + Perplexity prompt `research-ugc-market-v2`) → Dossier Notion.
Día 5: Análisis competidores (Apify + Meta Ads Library) → tabla 10-15 piezas referencia.
Día 6: Content Pillars (Diana + Brian, sesión 90 min) → 3-5 pillars con ángulo, problem-solution, hook, formato, CTA, referencia.
Día 7: Match creadores (Supabase query por país, arquetipo, edad audiencia, rating ≥4.0, `availability_status='open'`) → shortlist 3-5 por pieza → Loom al cliente.

**KPIs:** ≤4 días hábiles | ≥60% pillars sin cambios | ≥75% creadores aprobados en primera ronda.

### Etapa 4 — Días 8-14: Producción Batch 1

Día 8: Briefs (Brian escribe 1 por pieza, Diana hace QA).
Día 9: Asignación y envío a creadores.
Días 10-12: Producción (Jarvis check-in día 10 y 11).
Día 13: Revisión interna Diana + Brian. Checklist: audio, luz, encuadre, hook, CTA, duración, errores, producto, no-go.

**Calificación A/B/C por pieza:**
- **A:** se entrega al cliente tal cual.
- **B:** re-grabación de fragmento específico en ≤24h.
- **C:** rechazada, se reasigna.

**Regla crítica: ninguna pieza C o B sin corregir entra a Batch 1.**

Día 14: empaquetado final. Naming: `{brand}_{pillar}_{creator}_{version}.mp4`.

**KPIs:** ≥90% briefs aceptados sin fricción | ≥70% piezas grado A en primera grabación | ≥95% piezas B corregidas en <24h | <5% piezas C | 100% cumplimiento SLA día 14.

### Etapas 5-9 (resumen)

- **Etapa 5 (Día 15):** Entrega Batch 1 al cliente con Loom de presentación.
- **Etapa 6 (Día 16-21):** Rondas de feedback cliente (máximo 2).
- **Etapa 7 (Día 22-30):** Producción y entrega Batch 2 + reporte mensual día 30.
- **Etapa 8 (Día 31-60):** Batch 3, mid-month call día 45, check-in día 60 (Alexander).
- **Etapa 9 (Día 61-89):** Batch 4-5, preparación quarterly report.

### Etapa 10 — Día 90: Renewal call

**Ver Pack Alexander sección 8 para playbook completo.** Resumen: 45 min, Alexander lead, objetivo renew 3-6 meses + upgrade. Jarvis dispara win-back automático si declina.

---

## 11. Playbook cliente difícil

### 11.1 Scope creep

**Síntoma:** cliente pide cada vez más cosas fuera del scope.
**Respuesta:**
1. Diana documenta cada request con tag `out-of-scope`.
2. Resumen semanal al cliente: "Estas fueron las cosas extra esta semana. En tu plan son gratis hasta X. Desde ahora, marcadas [OUT] requieren aprobación y cotización."
3. Si persiste: Alexander presenta **upgrade a plan superior**.
4. Nunca decir "no". Decir: *"Eso no está en el plan actual. En Pro sí está incluido. ¿Quieres que te lo cotice?"*

### 11.2 Delays del cliente

**Síntoma:** SLA 14 días se dispara por bloqueo del cliente.
**Respuesta:**
1. Jarvis reminders escalonados (día 1, 3, 5).
2. Diana llama al día 5.
3. Documenta bloqueos en Supabase para mostrar en renewal call: *"Este mes estuvimos bloqueados 9 días esperando tu feedback. Si lo agilizamos a 2 días, podemos entregar 30% más piezas."*

### 11.3 Feedback de comité (5+ personas)

**Síntoma:** cliente comparte pieza y vuelve con feedback de múltiples personas.
**Respuesta:** Diana bloquea: *"Necesitamos el feedback consolidado del aprobador único que definimos en kickoff."*

### 11.4 Cliente rechaza todos los creadores

**Diagnóstico:** probable gap en brand briefing.
**Respuesta:** Diana agenda llamada 15 min para entender qué busca realmente.

### 11.5 Cliente pide "famosos" (influencers)

**Respuesta:** Diana educa: UGC ≠ influencer marketing. Muestra caso de estudio interno: UGC anónimo supera influencer en CPA.

### 11.6 Nicho regulado (salud, finanzas, suplementos)

**Respuesta:** Brian revisa compliance. Todos los claims se validan contra Invima/FDA antes de escribir briefs.

---

**Fuentes:** `content/sistemas/creadores/00-indice.md`, `01-formulario.md`, `02-sistema-scoring.md`, `03-contrato.md`, `04-pricing.md`, `05-briefs-por-formato.md`, `06-proceso-revision.md`, `07-dashboard-metricas.md`, `content/sistemas/onboarding/client-onboarding-flow.md` (Etapas 1-10 + Playbook).

**Próxima revisión:** 2026-05-09
