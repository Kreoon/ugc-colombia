# Sistema WhatsApp Business — UGC Colombia

**Agencia boutique UGC premium | LATAM + USA Hispanic**
Ticket: $500–1500 USD/mes | Agente: Jarvis v2 (Claude Sonnet + Gemini fallback)
Integración: WhatsApp Cloud API + n8n (dev.kreoon.com) + Supabase
Última actualización: 2026-04-08 | Owner: Alexander Cast — founder@kreoon.com

---

## 1. Setup WhatsApp Business

### Perfil de Negocio

```
Nombre de cuenta:    UGC Colombia | Agencia Boutique
Categoría:           Advertising / Marketing
Descripción (139c):  Agencia boutique de UGC para marcas DTC y e-commerce en LATAM y USA.
                     Videos que venden. Hechos por creators reales. Entrega en 14 días.
                     Starter desde $500 USD/mes.
Sitio web:           https://ugccolombia.co
Email de soporte:    founder@kreoon.com
Dirección:           Bogotá, Colombia
```

### Horarios de Atención

```
Lunes a viernes:     8:00 am – 7:00 pm (COT, UTC-5)
Sábado:              9:00 am – 1:00 pm
Domingo:             Cerrado
Zona horaria:        America/Bogota
```

Nota para Jarvis v2: respetar ventana de silencio 9:00 pm – 8:00 am COT. No enviar mensajes proactivos fuera de horario. Si se recibe un mensaje fuera de horario, responder con template `fuera_horario` a las 8:00 am del siguiente día hábil.

### Mensaje de Bienvenida (dentro de horario)

```
Hola {{1}}, bienvenido a UGC Colombia.

Somos la agencia boutique de UGC que ayuda a marcas DTC y e-commerce a escalar
con videos que realmente convierten en Meta, TikTok y orgánico.

¿En qué te puedo ayudar hoy?

1. Quiero conocer los servicios
2. Tengo una marca y quiero cotizar
3. Soy creator y quiero aplicar
4. Tengo otra pregunta
```

### Mensaje de Ausencia (fuera de horario)

```
Hola {{1}}, recibí tu mensaje.

Nuestro horario de atención es lunes a viernes de 8 am a 7 pm y
sábados de 9 am a 1 pm (hora Colombia).

Te respondo al inicio del siguiente turno. Si es urgente,
puedes agendar directamente en: ugccolombia.co/discovery-call

Hasta pronto.
```

---

## 2. Catálogo de Servicios (WhatsApp Business Catalog)

### Producto 1 — Plan Starter

```
Nombre:       Plan Starter — 8 Videos UGC
Precio:       $500 USD / mes (pago anticipado)
Descripción:  Ideal para marcas que están empezando con UGC o quieren validar
              el canal antes de escalar.

Incluye:
- 8 videos UGC/mes (15–60 segundos)
- 1 creator rotativo de nuestra red curada
- Brief estratégico con ángulos definidos
- 1 ronda de revisión por video
- Derechos paid media 12 meses
- Entrega en 14 días hábiles desde kickoff

No incluye: estrategia mensual, acceso a Kreoon, videos bilingües.

CTA: Agendar Discovery Call
Link: https://ugccolombia.co/discovery-call
```

### Producto 2 — Plan Growth

```
Nombre:       Plan Growth — 16 Videos + Estrategia
Precio:       $950 USD / mes
Descripción:  Para marcas invirtiendo activamente en paid media que necesitan
              volumen y datos para iterar creatividades.

Incluye:
- 16 videos UGC/mes (mix de formatos y duraciones)
- 3 creators rotativos pre-aprobados por el cliente
- Estrategia de ángulos mensual (4 ángulos testeados)
- Acceso a plataforma Kreoon (briefs, review, delivery)
- 2 rondas de revisión por video
- Derechos paid media 12 meses
- Reunión de performance mensual (30 min)
- Entrega en 14 días hábiles

CTA: Agendar Discovery Call
Link: https://ugccolombia.co/discovery-call
```

### Producto 3 — Plan Scale

```
Nombre:       Plan Scale — 30+ Videos | Bilingüe | Account Manager
Precio:       $1,500 USD / mes
Descripción:  El plan para marcas que han validado UGC y quieren sistematizar
              la producción a escala con videos en español e inglés.

Incluye:
- 30+ videos UGC/mes (ES + EN nativos, no traducidos)
- 5 creators en rotación (perfiles aprobados)
- Estrategia de ángulos quincenal con data de Meta
- Account manager dedicado (Alexander o Brian)
- Acceso completo a Kreoon con dashboard en tiempo real
- Rondas de revisión ilimitadas
- Derechos paid media + orgánico 24 meses
- Reuniones semanales de performance (30 min)

CTA: Agendar Discovery Call
Link: https://ugccolombia.co/discovery-call
```

### Producto 4 — Audit UGC Gratuito

```
Nombre:       Audit de Contenido UGC (Gratis)
Precio:       $0 — Sin costo
Descripción:  Video Loom de 7 minutos donde Alexander analiza tu contenido
              actual y te da 3 recomendaciones específicas para mejorar
              tus creatividades en los próximos 30 días.

¿Cómo funciona?
1. Nos das tu Instagram + sitio web
2. En 48h recibes el video con el análisis
3. Si tiene sentido trabajar juntos, agendamos una call

Sin pitch. Sin presión.

CTA: Solicitar Audit
Link: https://ugccolombia.co/audit
```

### Producto 5 — Kit UGC 2026 (Lead Magnet)

```
Nombre:       Kit UGC 2026 — PDF Gratis
Precio:       $0 — Descarga directa
Descripción:  28 páginas con el sistema exacto que usamos con marcas
              que facturan 7 cifras en LATAM.

Incluye:
- Por qué el UGC reemplazó a los ads tradicionales (data 2026)
- Los 4 tipos de UGC que convierten
- Brief template que usamos con clientes de $1500/mes
- Checklist de 15 puntos para evaluar creators
- Métricas que importan más allá del view count
- Bonus: contratos, NDAs y pricing LATAM vs USA

CTA: Descargar Kit
Link: https://ugccolombia.co/kit-ugc-2026
```

---

## 3. Etiquetas / Labels de Clientes

Sistema de 8 etiquetas para clasificar contactos en WhatsApp Business Manager y Supabase (tabla `whatsapp_contacts`).

| Label | Color | Descripción | Trigger de asignación |
|-------|-------|-------------|----------------------|
| `prospecto-frio` | Gris | Primer contacto, sin calificar | Mensaje inicial recibido |
| `calificado` | Azul | Score BANT ≥ 10, listo para call | Post-calificación automática Jarvis |
| `call-agendada` | Amarillo | Discovery call confirmada en Cal.com | Confirmación de agenda |
| `propuesta-enviada` | Naranja | Propuesta enviada, en evaluación | Envío manual por Alexander/Brian |
| `cliente-activo` | Verde | Contrato firmado, facturando | Onboarding completado |
| `pausa` | Morado | Cliente existente en pausa temporal | Solicitud de pausa por el cliente |
| `churn` | Rojo | Cliente que canceló o no renovó | Fin de contrato |
| `nurture-largo` | Gris claro | No calificado hoy, potencial futuro | Score BANT < 10 |

### Reglas de transición

```
prospecto-frio  →  calificado       (score ≥ 10 en BANT automático)
prospecto-frio  →  nurture-largo    (score < 10)
calificado      →  call-agendada    (confirmación Cal.com)
call-agendada   →  propuesta-enviada (post-discovery)
propuesta-enviada → cliente-activo  (firma + pago)
cliente-activo  →  pausa            (solicitud del cliente)
cliente-activo  →  churn            (no renovación o cancelación)
pausa           →  cliente-activo   (reactivación)
nurture-largo   →  calificado       (re-engagement después de 60+ días)
```

---

## 4. Plantillas de Mensajes (Meta-Compliant)

### Template 1 — ugc_bienvenida_lead

```
Categoria:   marketing
Idioma:      es
Header:      TEXT
             UGC Colombia — Recibimos tu solicitud
Body:
Hola {{1}}, soy Alexander de UGC Colombia.

Vi que te interesa escalar tu contenido con UGC. Perfecto momento.

Somos la agencia boutique que ayuda a marcas como la tuya a pasar de
producir 4 videos al mes a 20–50 creatividades listas para Meta y TikTok.

Ya trabajamos con 120+ marcas en LATAM y USA. El 92% renuevan mes a mes.

¿Tienes 2 minutos para contarme sobre tu marca?

Footer:      UGC Colombia | ugccolombia.co
Botones:
- Quick Reply: "Sí, cuéntame más"  → intent_interes
- Quick Reply: "Primero quiero ver casos"  → intent_casos
- URL: "Ver servicios"  → https://ugccolombia.co/#servicios
```

### Template 2 — ugc_seguimiento_lead_24h

```
Categoria:   utility
Idioma:      es
Header:      TEXT
             Seguimiento — UGC Colombia
Body:
Hola {{1}},

Ayer te escribí sobre producción UGC para {{2}}.

Entiendo que estás ocupado. Solo quería asegurarme de que recibiste mi mensaje.

Si este no es el momento, me avisas y te escribo en 30 días. Sin problema.

Si sí te interesa explorar, puedo compartirte los resultados de una marca
similar a la tuya en 5 minutos por acá.

¿Cuándo tienes un momento?

Footer:      Para no recibir más mensajes, responde STOP.
Botones:
- Quick Reply: "Hoy me va bien"  → intent_disponible
- Quick Reply: "Escríbeme en 30 días"  → intent_nurture_30d
- Quick Reply: "No me interesa"  → intent_opt_out
```

### Template 3 — ugc_recordatorio_discovery

```
Categoria:   utility
Idioma:      es
Header:      TEXT
             Recordatorio: Tu Discovery Call con UGC Colombia
Body:
Hola {{1}},

Te recuerdo que mañana {{2}} a las {{3}} (hora Colombia) tienes tu
Discovery Call con Alexander.

En 30 minutos vas a tener un plan de contenido UGC concreto para los
próximos 90 días.

Link de la reunión: {{4}}

Si necesitas reagendar, hazlo acá: {{5}}

Footer:      UGC Colombia | founder@kreoon.com
Botones:
- URL: "Unirme a la call"  → {{4}}
- URL: "Reagendar"  → {{5}}
```

### Template 4 — ugc_propuesta_enviada

```
Categoria:   marketing
Idioma:      es
Header:      TEXT
             Tu propuesta de UGC Colombia está lista
Body:
Hola {{1}},

Acá está tu propuesta personalizada para {{2}}:
{{3}}

Incluye el plan recomendado ({{4}}), timeline de arranque,
casos similares en tu industria y los ángulos de contenido iniciales.

La propuesta es válida por 7 días.

¿Tienes alguna duda antes de decidir? Te puedo resolver todo por acá
o agendamos 15 minutos rápidos.

Footer:      UGC Colombia | Propuesta válida 7 días
Botones:
- URL: "Ver propuesta"  → {{3}}
- Quick Reply: "Tengo una pregunta"  → intent_duda_propuesta
- Quick Reply: "Listo para arrancar"  → intent_cierre
```

### Template 5 — ugc_onboarding_bienvenida

```
Categoria:   utility
Idioma:      es
Header:      TEXT
             Bienvenido a UGC Colombia — Empezamos
Body:
Hola {{1}},

Confirmado el pago. Bienvenido a UGC Colombia.

Aquí están tus próximos pasos:

1. Accede a Kreoon (tu plataforma de gestión): {{2}}
2. Completa el brand brief (toma 15 min): {{3}}
3. Kickoff call el {{4}} a las {{5}}

En el kickoff revisamos tu marca, definimos los 4 ángulos iniciales
y aprobamos el casting. Primera entrega en 14 días.

Tu account manager es {{6}}. Escríbele directo por este número.

Footer:      UGC Colombia | Plan {{7}}
Botones:
- URL: "Ir a Kreoon"  → {{2}}
- URL: "Completar brand brief"  → {{3}}
```

### Template 6 — ugc_reporte_mensual

```
Categoria:   utility
Idioma:      es
Header:      TEXT
             Reporte mensual UGC Colombia — {{1}}
Body:
Hola {{1}},

Tu reporte de {{2}} está listo.

Resumen ejecutivo:
- Videos entregados: {{3}}/{{4}} del plan
- Hook rate promedio: {{5}}%
- Mejor performing creative: {{6}}
- CPA estimado con tus top 3 videos: {{7}}

Recomendación del mes: {{8}}

El reporte completo está en Kreoon: {{9}}

¿Agendamos la reunión de performance? Tengo disponibilidad el {{10}}.

Footer:      UGC Colombia | Plan {{11}}
Botones:
- URL: "Ver reporte completo"  → {{9}}
- Quick Reply: "Agendar reunión"  → intent_agendar_reunion
- Quick Reply: "Todo bien, seguimos"  → intent_confirmacion
```

### Template 7 — ugc_reactivacion_churn

```
Categoria:   marketing
Idioma:      es
Header:      TEXT
             Hola de nuevo — UGC Colombia
Body:
Hola {{1}},

Hace {{2}} meses trabajamos juntos en {{3}}.

Quería escribirte porque en este período lanzamos nuevas capacidades:
videos bilingües ES/EN nativos, ángulos de UGC para TikTok Shop y
un plan Starter rediseñado desde $500 USD/mes.

¿Cómo está yendo tu estrategia de contenido este trimestre?

Si estás en un buen momento para retomar, con gusto te armo una
propuesta actualizada en 24h.

Footer:      Para no recibir mensajes, responde STOP.
Botones:
- Quick Reply: "Me interesa retomar"  → intent_reactivacion
- Quick Reply: "No es el momento"  → intent_nurture_60d
- Quick Reply: "Dame de baja"  → intent_opt_out
```

### Template 8 — ugc_solicitud_testimonio

```
Categoria:   utility
Idioma:      es
Header:      TEXT
             UGC Colombia — Tu opinión nos importa
Body:
Hola {{1}},

Llevamos {{2}} meses trabajando juntos en {{3}}. Es un honor.

¿Te tomaría 3 minutos compartir tu experiencia?

No necesitas escribir un ensayo. Con responder estas 3 preguntas es suficiente:

1. ¿Qué resultado concreto lograste con nuestro UGC?
2. ¿Qué fue lo que más valoraste del proceso?
3. ¿A qué tipo de marcas le recomendarías UGC Colombia?

Si prefieres grabarlo en video (30 segundos) te enviamos un regalo sorpresa.

Footer:      UGC Colombia | Gracias por confiar en nosotros
Botones:
- Quick Reply: "Respondo por acá"  → intent_testimonio_texto
- Quick Reply: "Prefiero grabar video"  → intent_testimonio_video
- Quick Reply: "Ahora no puedo"  → intent_testimonio_later
```

---

## 5. Flujo de Chatbot para Jarvis v2

### Configuración base Jarvis

```json
{
  "agent": "jarvis_v2",
  "channel": "whatsapp_cloud_api",
  "primary_llm": "claude-sonnet",
  "fallback_llm": "gemini-2.5-flash",
  "webhook": "https://jarvis.kreoon.com/webhook/whatsapp",
  "language": "es-CO",
  "session_timeout_minutes": 1440,
  "handoff_to": ["alexander", "brian"],
  "quiet_hours": { "start": "21:00", "end": "08:00", "tz": "America/Bogota" },
  "max_bot_messages_before_handoff": 8
}
```

### Contexto de sistema para Jarvis (system prompt WhatsApp)

```
Eres el asistente de ventas de UGC Colombia, una agencia boutique premium
de UGC con clientes en LATAM y USA. Tu nombre en esta conversación es
simplemente "el equipo de UGC Colombia".

Tu único objetivo es agendar una Discovery Call de 30 minutos con Alexander.
No cotices precios de forma exacta, di que "depende del volumen y la estrategia".
Sí puedes mencionar que el Starter arranca en $500 USD/mes.

Tono: cálido, directo, colombiano pero sin regionalismos confusos para LATAM/USA.
No uses emojis excesivos. Máximo 2 emojis por mensaje.
Cada mensaje máximo 200 caracteres. Si necesitas más, divide en 2 mensajes.
Nunca hagas más de 3 mensajes seguidos sin interacción del usuario.

Ante consultas muy técnicas (pricing exacto, contratos, integraciones),
transfiere a humano (Alexander o Brian).

Ante solicitudes de creadores queriendo aplicar, enviar a:
ugccolombia.co/aplicar-creator

Variables de contexto disponibles:
- {{contact.name}}: nombre del contacto
- {{contact.label}}: etiqueta CRM actual
- {{session.intent}}: intención detectada
- {{session.bant_score}}: puntaje BANT (0-19)
- {{contact.brand}}: nombre de la marca (si ya fue capturado)
```

### Arbol Conversacional Completo

```
## Flujo: UGC Colombia — Captacion a Discovery Call
Trigger:    Mensaje entrante en WhatsApp Business
Objetivo:   Agendar discovery call o calificar lead para seguimiento

==========================================================================
PASO 0: CLASIFICACION DE CONTACTO (Jarvis interno, sin mensaje al usuario)
==========================================================================

→ ¿Es contacto nuevo?
  ├── SI → Registrar en Supabase (tabla whatsapp_contacts) + label: prospecto-frio
  │        → Ir a Paso 1
  └── NO → Leer label actual del contacto
            ├── cliente-activo  → Ir a Flujo B (soporte cliente)
            ├── call-agendada   → Ir a Paso 6 (recordatorio)
            ├── propuesta-enviada → Ir a Flujo C (seguimiento propuesta)
            └── cualquier otro  → Ir a Paso 1

==========================================================================
PASO 1: BIENVENIDA Y CLASIFICACION INICIAL
==========================================================================

→ Jarvis detecta idioma (ES / EN)
→ Enviar mensaje de bienvenida (session message si < 24h, template si > 24h)

Mensaje A (si llegó por ad o QR):
"Hola {{contact.name}}, recibimos tu mensaje.
Soy del equipo de UGC Colombia. En qué te podemos ayudar?

1. Quiero conocer los servicios
2. Tengo una marca y quiero cotizar
3. Soy creator y quiero aplicar
4. Tengo otra pregunta"

→ Espera respuesta
  ├── "1" / "servicios" / "conocer"  → Paso 2a: Presentación servicios
  ├── "2" / "cotizar" / "marca"      → Paso 2b: Calificación rápida
  ├── "3" / "creator" / "aplicar"    → Paso 2c: Ruta creator
  ├── "4" / otro texto               → Paso 2d: Intención libre
  └── Sin respuesta en 24h           → Template ugc_seguimiento_lead_24h

==========================================================================
PASO 2a: PRESENTACION DE SERVICIOS (viene de opción 1)
==========================================================================

Mensaje 1:
"Perfecto. UGC Colombia es la agencia boutique que produce videos UGC
para marcas DTC y e-commerce en LATAM y USA.

Tenemos 3 planes:
- Starter: 8 videos/mes desde $500 USD
- Growth: 16 videos + estrategia desde $950 USD
- Scale: 30+ videos bilingüe desde $1.500 USD"

[pausa 2 segundos]

Mensaje 2:
"Todos incluyen brief estratégico, casting curado de nuestra red
de 300+ creators en Colombia, y derechos para paid media.

¿Tienes una marca que quieres escalar con UGC?"

→ Espera respuesta
  ├── "sí" / "tengo marca" / interés claro  → Paso 2b
  ├── "cuánto" / "precio" / "caro"          → Paso 3: Manejo objeción precio
  ├── "casos" / "resultados" / "ejemplos"   → Paso 2e: Prueba social
  └── Sin respuesta en 24h                  → Template ugc_seguimiento_lead_24h

==========================================================================
PASO 2b: CALIFICACION RAPIDA (viene de opción 2 o de 2a)
==========================================================================

Mensaje:
"Genial. Para entender bien tu situación y no perderte el tiempo,
te hago 3 preguntas rápidas.

¿Cuál es el nombre de tu marca y en qué industria estás?"

→ Espera respuesta
→ Guardar en Supabase: contact.brand, contact.industry

Mensaje:
"Y actualmente, ¿cuánto inviertes en publicidad digital al mes?
(puede ser en USD o COP, como prefieras)"

→ Espera respuesta
→ Guardar en Supabase: contact.ad_spend
→ Calcular score BANT parcial

Mensaje:
"Última pregunta: ¿qué tan urgente es resolver tu producción de
contenido ahora?

1. Ya, necesito arrancar este mes
2. En los próximos 30 días
3. Todavía estoy explorando opciones"

→ Espera respuesta
→ Completar score BANT
→ Guardar en Supabase: contact.timeline

  ├── Score ≥ 10 (calificado)  → Paso 4: CTA Discovery Call
  └── Score < 10 (no calificado) → Paso 5: Nurture + lead magnet

==========================================================================
PASO 2c: RUTA CREATOR
==========================================================================

Mensaje:
"Qué bueno que quieras unirte a nuestra red.

Para aplicar, completa el formulario en este link:
ugccolombia.co/aplicar-creator

Revisamos todas las aplicaciones cada lunes y te respondemos
en máximo 5 días hábiles."

→ FIN de flujo creator (no agendar call de ventas)

==========================================================================
PASO 2d: INTENCION LIBRE (Jarvis NLU)
==========================================================================

→ Jarvis clasifica intent con Claude:
  - Si intent = pregunta sobre servicios → Paso 2a
  - Si intent = pregunta sobre precio    → Paso 3
  - Si intent = interés en contratar     → Paso 2b
  - Si intent = queja / soporte          → Handoff humano
  - Si intent = desconocido o complejo   → Fallback

Mensaje fallback:
"Disculpa, no entendí bien tu mensaje. ¿Me puedes decir
con tus palabras qué necesitas?

O si prefieres, te paso directamente con Alexander."

→ Botones: [Hablar con Alexander] [Tengo una pregunta]

==========================================================================
PASO 2e: PRUEBA SOCIAL (viene de petición de casos/resultados)
==========================================================================

Mensaje 1:
"Claro, acá va lo que más nos mencionan los clientes:

Una marca DTC skincare en México bajó su CPA de $24 a $9 USD
en 45 días con nuestro Plan Growth."

[pausa 1 segundo]

Mensaje 2:
"Un SaaS B2B en Colombia pasó de 0 a 80M views orgánicos en TikTok
en 3 meses. Y una marca de moda en USA Hispanic escaló de $30K a
$180K USD al mes en ventas.

¿Quieres que miremos cómo aplicaría esto a tu marca?"

→ Espera respuesta
  ├── "sí" / interés  → Paso 2b
  └── Sin respuesta   → Template ugc_seguimiento_lead_24h

==========================================================================
PASO 3: MANEJO OBJECION PRECIO
==========================================================================

Mensaje:
"Entiendo. El Starter son $500 USD al mes, que es lo que una sola
creatividad le cuesta a una marca en una agencia de Miami.

La diferencia es que nosotros entregamos 8 videos ese mismo mes,
con estrategia de ángulos incluida.

¿Tu inversión actual en ads supera los $2.000 USD al mes?"

→ Espera respuesta
  ├── "sí" / confirma presupuesto → Paso 4
  ├── "no" / presupuesto bajo     →
      Mensaje: "Entiendo. En ese caso hoy probablemente no somos
      el fit ideal porque el ROI del UGC se ve mejor con más inversión
      en pauta. ¿Te parece si te mando el Kit UGC 2026 gratis para
      que tengas el sistema listo cuando escales?"
      → Enviar Kit → Paso 5 nurture largo
  └── No responde → Template ugc_seguimiento_lead_24h

==========================================================================
PASO 4: CTA DISCOVERY CALL (contacto calificado)
==========================================================================

→ Actualizar label Supabase: calificado
→ Notificar a Alexander vía n8n (email + WhatsApp interno)

Mensaje:
"Perfecto {{contact.name}}, con lo que me contaste creo que tiene
mucho sentido hablar con Alexander directamente.

La Discovery Call es de 30 minutos. Sales con un plan de contenido
UGC concreto para los próximos 90 días, te trabajes con nosotros o no.

¿Agendamos ahora?"

→ Botones: [Agendar mi call] [Primero tengo una duda]

  ├── "Agendar" → Enviar link Cal.com + Template ugc_seguimiento_lead_24h en 24h si no agenda
  │              → Al confirmar agenda: label = call-agendada
  │              → 24h antes: Template ugc_recordatorio_discovery
  └── "Tengo duda" → Jarvis responde duda (máx 2 intercambios)
                   → Si duda es compleja → Handoff Alexander

==========================================================================
PASO 5: NURTURE — NO CALIFICADO HOY
==========================================================================

→ Actualizar label Supabase: nurture-largo

Mensaje:
"Entiendo perfectamente. Tal vez no es el momento ideal hoy.

Te dejo el Kit UGC 2026 gratis, que tiene el sistema exacto que
usamos con marcas que facturan 7 cifras en LATAM:
ugccolombia.co/kit-ugc-2026

¿Te lo mando al email para que lo tengas guardado?"

→ Espera respuesta
  ├── Da email → Guardar en Supabase, activar secuencia Beehiiv, cerrar sesión
  └── No da email → "Sin problema. Queda en: ugccolombia.co/kit-ugc-2026
                    Cuando estés listo para hablar, escríbenos."
                   → Cerrar sesión + trigger follow-up en 30 días

==========================================================================
PASO 6: RECORDATORIO CALL (label = call-agendada)
==========================================================================

→ Automático vía n8n, 24h y 1h antes de la call
→ Usar template ugc_recordatorio_discovery
→ Si no hay confirmación 1h antes:
  Mensaje: "Hola {{contact.name}}, ¿todo bien para la call de hoy
  a las {{hora}}? Si necesitas reagendar: {{link_cal}}"

==========================================================================
FLUJO B: SOPORTE CLIENTE ACTIVO
==========================================================================

Trigger: label = cliente-activo

Mensaje inicial:
"Hola {{contact.name}}, qué gusto saber de ti.

¿En qué te ayudo hoy?
1. Estado de mis videos
2. Solicitar cambios a un video
3. Hablar con mi account manager
4. Otro"

→ Opciones 1 y 2: Jarvis responde con datos de Kreoon/Supabase
→ Opción 3: Handoff inmediato a Alexander o Brian
→ Opción 4: Jarvis atiende, handoff si es complejo

==========================================================================
FLUJO C: SEGUIMIENTO PROPUESTA ENVIADA
==========================================================================

Trigger: label = propuesta-enviada + sin respuesta en 48h

Mensaje (Jarvis, session message dentro de 24h de contacto):
"Hola {{contact.name}}, ¿pudiste revisar la propuesta?

Si tienes alguna pregunta sobre el plan o el proceso,
con gusto te aclaro. O si quieres hablar con Alexander
directamente, me avisas."

→ Espera respuesta
  ├── Pregunta → Jarvis responde (máx 2 intercambios) → Handoff si es cierre
  ├── "Listo para arrancar" → Handoff Alexander para cierre
  └── Sin respuesta 48h más → Template ugc_propuesta_enviada (recordatorio)
                             → Si no responde en 7 días → label = nurture-largo

==========================================================================
HANDOFF A HUMANO
==========================================================================

Triggers automáticos de handoff:
1. Usuario pide hablar con una persona
2. Jarvis no puede responder (fallback 2 veces)
3. Lead calificado con score ≥ 15 (HOT)
4. Propuesta en etapa de cierre
5. Cliente activo con queja o problema
6. Más de 8 mensajes del bot sin conversión

Mensaje de transición:
"Perfecto, te paso con Alexander ahora mismo.
Él te escribe en los próximos minutos."

→ Notificación push a Alexander (WhatsApp + email vía n8n)
→ Resumen del contexto de la conversación enviado en hilo interno
→ Jarvis en modo escucha (no responde automáticamente por 2h)
```

---

## 6. Script de Neuroventas con Gatillos de Cialdini

### Marco general: el cerebro del comprador hispano

Antes del script: entender que el comprador LATAM toma decisiones con el cerebro límbico (emocional) antes que el neocórtex (racional). El precio se justifica después, no antes. La confianza precede al interés.

Secuencia de activación de gatillos recomendada:
**Autoridad → Reciprocidad → Prueba social → Escasez → Compromiso**

---

### Gatillo 1 — Autoridad

Activar en el primer mensaje proactivo o en la presentación inicial.

```
SCRIPT A (WhatsApp texto):

"Hola {{nombre}}, te escribe Alexander, fundador de UGC Colombia.

Llevamos 3 años produciendo UGC para marcas DTC en LATAM y USA.
Más de 3.400 videos entregados. 92% de retención mes a mes.

No somos un marketplace. Somos el equipo creativo externo de marcas
que invierten entre $5K y $50K al mes en Meta y TikTok.

¿Tienes 2 minutos para que te cuente cómo lo hacemos?"
```

```
SCRIPT B (variante más directa para cuentas HOT):

"Hola {{nombre}}.

Vi los ads de {{marca}} en Meta Library. Hay 3 cosas que mejoraría
en tu estrategia creativa esta semana. ¿Te cuento?"
```

---

### Gatillo 2 — Reciprocidad

Dar valor antes de pedir. Activar antes o durante la calificación.

```
SCRIPT RECIPROCIDAD (dar antes de pedir):

"Antes de contarte sobre nosotros, te mando algo que seguro te sirve.

Este es el brief template que usamos con clientes de $1.500/mes.
Lo puedes usar con cualquier creator, trabajes con nosotros o no:
ugccolombia.co/kit-ugc-2026

Míralo. Si después quieres que lo apliquemos juntos para tu marca,
agendamos una call de 30 min."
```

Nota: el Kit UGC es el activo de reciprocidad principal. Siempre ofrecer antes de pedir el agendamiento. Reduce la fricción del primer "sí" un 40%.

---

### Gatillo 3 — Prueba Social

Activar cuando hay objeciones de precio o desconfianza. Tres formatos:

```
SCRIPT PRUEBA SOCIAL — Números:

"Somos 120+ marcas activas. El 92% renuevan cada mes.
No porque no tengan opciones. Porque el sistema funciona."
```

```
SCRIPT PRUEBA SOCIAL — Caso concreto (mismo sector):

"Tenemos un cliente en {{industria del prospecto}} que estaba en
la misma situación que vos. En 45 días bajamos su CPA un 62%.

¿Quieres ver cómo lo hicimos? Te mando el caso en 2 minutos."
```

```
SCRIPT PRUEBA SOCIAL — Testimonio directo:

"Acá va lo que nos escribió {{nombre de cliente}} la semana pasada:

'Llevaba 6 meses frustrado con creators freelance. Con UGC Colombia
entregamos 20 videos en 14 días y el primero ya ganó en testing.'

¿Te gustaría hablar con él? Te puedo conectar."
```

---

### Gatillo 4 — Escasez (legítima, no artificial)

Usar solo cuando sea real. Activar en el cierre o al ofrecer la discovery call.

```
SCRIPT ESCASEZ — Slots de onboarding:

"Solo hacemos onboarding de 4 clientes nuevos por mes. Así garantizamos
que cada marca tenga atención real de Alexander en las primeras semanas.

Esta semana quedan 2 slots disponibles para arrancar en mayo."
```

```
SCRIPT ESCASEZ — Precio:

"El Plan Starter sube a $600 USD desde el 1 de mayo. Si arrancas
este mes te lo dejamos en $500. Es el precio de lanzamiento."
```

```
SCRIPT ESCASEZ — Discovery Call:

"Los slots de discovery para esta semana se llenan rápido porque
Alexander hace máximo 5 calls por semana.

Quedan 2 disponibles para el jueves y viernes. ¿Cuál te va mejor?"
```

---

### Gatillo 5 — Compromiso (micro-compromisos)

Estructura de yeses progresivos antes del cierre.

```
SECUENCIA DE MICRO-COMPROMISOS:

Micro-compromiso 1 (bajo costo):
"¿Te mando el Kit UGC 2026? Es gratis, son 28 páginas del sistema
que usamos. Sin compromiso." → Esperar SÍ

Micro-compromiso 2 (costo medio):
"¿Qué te pareció el Kit? ¿Aplicaría para tu tipo de marca?" → Esperar respuesta

Micro-compromiso 3 (antes del cierre):
"Basado en lo que me contaste, creo que el Plan Growth sería el fit.
¿Tendría sentido verlo en detalle en una call?" → Esperar SÍ

Cierre (el grande):
"Perfecto. ¿Agendamos el jueves a las 10am o el viernes a las 3pm?" → SOLO dar 2 opciones
```

---

### Gatillo 6 — Reciprocidad en el cierre (BONO de última milla)

Usar cuando el prospecto está en el borde de la decisión.

```
SCRIPT BONO DE ULTIMA MILLA:

"Mira, si arrancamos este mes te incluyo sin costo adicional:
- 1 Audit Loom personalizado de tus ads actuales (valor $300 USD)
- Acceso a Kreoon desde el día 1, no desde la primera entrega

Es porque a los clientes que arrancan antes del {{fecha}} les damos
el onboarding extendido. Después del {{fecha}} lo quitamos."
```

---

### Manejo de objeciones clave (scripts WhatsApp)

```
OBJECION: "Es caro"

Respuesta:
"Lo entiendo. Comparado con un freelancer sí parece más.
Pero un freelancer te entrega 2 videos al mes, sin estrategia,
sin iteración y sin backup si desaparece.

Con nosotros son 8–30 videos, brief estratégico y métricas incluidas.
¿Cuánto te vale resolver el creative fatigue de tus ads esta semana?"
```

```
OBJECION: "Ya tengo una agencia"

Respuesta:
"Perfecto. ¿Cuántos videos UGC al mes te entregan?
¿Los miden con data de Meta o con opinión?

No te digo que nos cambies. Te digo que muchos de nuestros mejores
clientes también tienen otra agencia. Nosotros somos su unidad
de producción UGC especializada."
```

```
OBJECION: "¿Por qué Colombia?"

Respuesta:
"Mismo huso horario que EEUU. Español nativo sin acento marcado.
Los creadores colombianos tienen 10 años de cultura audiovisual
en novelas y reality — saben actuar frente a cámara mejor que
cualquier otro mercado LATAM.

Y producimos a la mitad del costo de Miami con el mismo estándar."
```

```
OBJECION: "Necesito pensarlo"

Respuesta:
"Por supuesto. ¿Qué es lo que más dudas en este momento?
El plan, el proceso o el timing.

Si me dices cuál es el freno, te resuelvo eso específicamente."
```

---

## 7. Secuencia de Seguimiento Post-Lead (7 Touches en 14 Dias)

Trigger: Lead registrado en Supabase con label `prospecto-frio` o `calificado`.
Canal principal: WhatsApp. Canal secundario: Email (Beehiiv).
Condición de pausa de secuencia: respuesta del lead en cualquier punto.
Condición de salida: agendar call, opt-out, o score <5 (nurture largo).

```
DIA 0 — TOUCH 1 (WhatsApp | Inmediato)
Canal:    WhatsApp session message
Tipo:     Bienvenida + calificación
Mensaje:  Template ugc_bienvenida_lead
Objetivo: Primera interacción, detectar intención
Horario:  Inmediato al recibir el lead (lunes–viernes 8am–7pm COT)

---

DIA 1 — TOUCH 2 (Email | +12h del Touch 1 si no responde WA)
Canal:    Email Beehiiv (si se capturó email)
Asunto:   "Acá está tu Kit UGC 2026 (más un regalo extra)"
Tipo:     Lead magnet + reciprocidad
Objetivo: Entregar valor, construir confianza

---

DIA 2 — TOUCH 3 (WhatsApp | +24h sin respuesta)
Canal:    WhatsApp template ugc_seguimiento_lead_24h
Tipo:     Follow-up suave
Mensaje:  "Hola {{nombre}}, ayer te escribí sobre producción UGC
          para {{marca}}. ¿Pudiste ver el mensaje?"
Objetivo: Reabrir conversación
Horario:  9am–12pm COT (hora de mayor apertura)

---

DIA 3 — TOUCH 4 (Email | +48h del Touch 1)
Canal:    Email Beehiiv
Asunto:   "El error de $12.000 USD que vi la semana pasada"
Tipo:     Caso de estudio + prueba social + autoridad
Objetivo: Activar urgencia con caso real

---

DIA 5 — TOUCH 5 (WhatsApp | +5 días)
Canal:    WhatsApp session message o template según ventana
Tipo:     Prueba social + CTA
Mensaje:  "Hola {{nombre}}, una última cosa.

          Una marca en tu industria bajó su CPA un 62% en 45 días
          cambiando solo su estrategia de UGC.

          ¿Tiene sentido explorar eso para {{marca}}?
          La call es gratis y de 30 min."

Botones:  [Agendar call] [Más información]
Objetivo: Segundo intento de conversión a call

---

DIA 7 — TOUCH 6 (Email | +7 días)
Canal:    Email Beehiiv
Asunto:   "De $24 a $9 de CPA en 45 días (caso real)"
Tipo:     Caso completo con números + CTA directo
Objetivo: Tercera oportunidad de conversión
CTA:      "Agendar Discovery Call"

---

DIA 14 — TOUCH 7 (WhatsApp | +14 días — ULTIMO INTENTO)
Canal:    WhatsApp template (si >24h sin contacto)
Tipo:     Cierre abierto + escasez legítima
Mensaje:  "Hola {{nombre}}, han pasado 2 semanas desde que
          te escribí sobre UGC Colombia.

          Entiendo si no es el momento. Solo quería preguntarte:
          ¿hay algo específico que te frenó?

          Si es precio, timeline o fit, te lo resuelvo en 5 min.
          Si no es para ahora, sin problema — te escribo en 60 días."

Botones:  [Hablemos] [Escríbeme en 60 días] [No me interesa]
Objetivo: Calificar intención final o mover a nurture-largo
```

### Reglas de la secuencia

1. Si el lead responde en cualquier punto, PAUSAR la secuencia automática y activar conversación manual (Jarvis + handoff si califica).
2. Si el lead dice STOP o "no me interesa", actualizar label a `churn` y cancelar todos los siguientes mensajes.
3. Si el lead agenda call, cancelar todos los siguientes touches y activar Flujo de recordatorio de call.
4. Touch 7 es el último. Después de Touch 7 sin respuesta: label `nurture-largo`, secuencia mensual (1 mensaje/mes, solo eventos especiales: lanzamiento de nuevo plan, caso de estudio relevante para su industria).

---

## 8. Integracion n8n: Arquitectura de Automatizacion

### Diagrama de flujo n8n

```
[WhatsApp Cloud API — Webhook entrante]
            |
            v
[n8n — Workflow: whatsapp_inbound_handler]
            |
    ┌───────┴────────┐
    |                |
[Nuevo contacto?]  [Contacto existente?]
    |                |
    v                v
[Crear registro   [Actualizar registro
 Supabase:         Supabase:
 tabla contacts]   last_message_at]
    |                |
    └───────┬────────┘
            |
            v
[Enviar a Jarvis v2 (jarvis.kreoon.com/webhook/whatsapp)]
            |
            v
[Jarvis procesa con Claude Sonnet / Gemini fallback]
            |
            v
[Clasificar intent + actualizar session_context en Supabase]
            |
    ┌───────┴────────────────┐
    |                        |
[¿Se hicieron preguntas    [¿Trigger de handoff?]
 BANT en la sesión?]          |
    |                         v
    v                   [Notificar a Alexander:
[Calcular BANT score]    Email vía Gmail +
    |                    WhatsApp interno]
    v
[Score ≥ 10?]
    |
  ┌─┴─┐
 SÍ   NO
  |    |
  v    v
[Label: calificado]  [Label: nurture-largo]
[Notificar Alexander] [Activar secuencia
[Enviar link Cal.com]  lead magnet]
```

### Workflows n8n requeridos

#### Workflow 1: `whatsapp_inbound_handler`

```json
{
  "name": "whatsapp_inbound_handler",
  "trigger": "webhook",
  "webhook_url": "https://dev.kreoon.com/webhook/whatsapp-inbound",
  "nodes": [
    {
      "name": "Receive WhatsApp Message",
      "type": "webhook",
      "method": "POST"
    },
    {
      "name": "Parse Message",
      "type": "function",
      "code": "Extract: wa_id, name, message_body, timestamp, message_type"
    },
    {
      "name": "Check Contact in Supabase",
      "type": "supabase",
      "table": "whatsapp_contacts",
      "operation": "upsert",
      "match_field": "wa_id"
    },
    {
      "name": "Send to Jarvis",
      "type": "http_request",
      "url": "https://jarvis.kreoon.com/webhook/whatsapp",
      "method": "POST",
      "body": { "contact": "{{contact}}", "message": "{{message}}" }
    },
    {
      "name": "Log to Supabase conversations",
      "type": "supabase",
      "table": "whatsapp_conversations",
      "operation": "insert"
    }
  ]
}
```

#### Workflow 2: `bant_scorer_and_router`

```json
{
  "name": "bant_scorer_and_router",
  "trigger": "supabase_event",
  "event": "UPDATE on whatsapp_contacts WHERE bant_complete = true",
  "nodes": [
    {
      "name": "Calculate BANT Score",
      "type": "function",
      "scoring": {
        "budget": { "<2000": 0, "2000-10000": 2, "10000-30000": 4, "30000+": 5 },
        "authority": { "founder/cmo/head": 3, "manager": 2, "other": 1 },
        "need": { "urgent_keywords": 3, "vague": 1 },
        "timeline": { "now": 5, "30d": 3, "60-90d": 2, "exploring": 1 },
        "fit": { "ecommerce/dtc/saas": 3, "services": 2, "other": 1 }
      }
    },
    {
      "name": "Route by Score",
      "type": "switch",
      "cases": [
        { "condition": "score >= 15", "route": "hot_lead" },
        { "condition": "score >= 10", "route": "warm_lead" },
        { "condition": "score >= 5",  "route": "cold_lead" },
        { "condition": "score < 5",   "route": "disqualified" }
      ]
    },
    {
      "name": "HOT — Notify Alexander + Brian",
      "type": "multi",
      "actions": [
        "Send WhatsApp to Alexander (wa_id: +573XXXXXXXXX)",
        "Send email to founder@kreoon.com",
        "Update label to calificado in Supabase",
        "Send ugc_bienvenida_lead template to lead"
      ]
    },
    {
      "name": "WARM — Standard Cal.com link",
      "type": "multi",
      "actions": [
        "Update label to calificado in Supabase",
        "Send Cal.com link via WhatsApp",
        "Add to Beehiiv nurture sequence"
      ]
    },
    {
      "name": "COLD — Nurture sequence",
      "type": "multi",
      "actions": [
        "Update label to nurture-largo in Supabase",
        "Send Kit UGC 2026 link via WhatsApp",
        "Add to Beehiiv nurture sequence (largo)"
      ]
    }
  ]
}
```

#### Workflow 3: `follow_up_sequence_scheduler`

```json
{
  "name": "follow_up_sequence_scheduler",
  "trigger": "cron",
  "schedule": "every day at 08:30 COT",
  "nodes": [
    {
      "name": "Get pending follow-ups",
      "type": "supabase",
      "query": "SELECT * FROM whatsapp_contacts WHERE next_followup_at <= NOW() AND label NOT IN ('cliente-activo', 'churn', 'opt-out') AND sequence_active = true"
    },
    {
      "name": "For each contact",
      "type": "loop",
      "actions": [
        "Determine which touch is next (1-7)",
        "Check if quiet hours (skip if 9pm-8am COT)",
        "Send appropriate template or session message",
        "Update next_followup_at in Supabase",
        "Log send event in whatsapp_conversations"
      ]
    }
  ]
}
```

#### Workflow 4: `handoff_notifier`

```json
{
  "name": "handoff_notifier",
  "trigger": "jarvis_event",
  "event": "handoff_requested",
  "nodes": [
    {
      "name": "Get conversation context",
      "type": "supabase",
      "query": "Last 10 messages from whatsapp_conversations WHERE wa_id = trigger.wa_id"
    },
    {
      "name": "Determine assignee",
      "type": "function",
      "logic": "HOT leads → Alexander | Support clients → Brian | Default → Alexander"
    },
    {
      "name": "Send notification to assignee",
      "type": "whatsapp",
      "template": "Resumen de conversación con {{contact_name}} ({{brand}}). Score BANT: {{score}}. Último mensaje: {{last_message}}. Ver: https://dev.kreoon.com/crm/contact/{{contact_id}}"
    },
    {
      "name": "Pause Jarvis for contact",
      "type": "supabase",
      "update": "SET bot_paused = true, bot_paused_until = NOW() + INTERVAL '2 hours' WHERE wa_id = trigger.wa_id"
    }
  ]
}
```

### Schema Supabase

```sql
-- Tabla principal de contactos
CREATE TABLE whatsapp_contacts (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  wa_id               TEXT UNIQUE NOT NULL,         -- número WhatsApp con código país
  name                TEXT,
  phone               TEXT,
  email               TEXT,
  brand               TEXT,
  industry            TEXT,
  ad_spend            TEXT,
  timeline            TEXT,
  label               TEXT DEFAULT 'prospecto-frio',
  bant_score          INTEGER DEFAULT 0,
  bant_complete       BOOLEAN DEFAULT false,
  sequence_active     BOOLEAN DEFAULT true,
  sequence_touch      INTEGER DEFAULT 0,            -- touch actual (1-7)
  next_followup_at    TIMESTAMPTZ,
  bot_paused          BOOLEAN DEFAULT false,
  bot_paused_until    TIMESTAMPTZ,
  assigned_to         TEXT,                          -- 'alexander' | 'brian'
  opt_out             BOOLEAN DEFAULT false,
  source              TEXT,                          -- 'ad', 'qr', 'organic', 'referral'
  utm_campaign        TEXT,
  created_at          TIMESTAMPTZ DEFAULT NOW(),
  updated_at          TIMESTAMPTZ DEFAULT NOW()
);

-- Tabla de conversaciones
CREATE TABLE whatsapp_conversations (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  contact_id          UUID REFERENCES whatsapp_contacts(id),
  wa_id               TEXT NOT NULL,
  direction           TEXT NOT NULL,                 -- 'inbound' | 'outbound'
  message_type        TEXT,                          -- 'text' | 'template' | 'button' | 'media'
  template_name       TEXT,
  message_body        TEXT,
  intent_detected     TEXT,
  jarvis_handled      BOOLEAN DEFAULT true,
  human_agent         TEXT,
  whatsapp_message_id TEXT,
  sent_at             TIMESTAMPTZ DEFAULT NOW()
);

-- Tabla de deals/propuestas
CREATE TABLE whatsapp_deals (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  contact_id          UUID REFERENCES whatsapp_contacts(id),
  plan                TEXT,                          -- 'starter' | 'growth' | 'scale'
  amount_usd          INTEGER,
  status              TEXT DEFAULT 'proposal',       -- 'proposal' | 'negotiation' | 'closed_won' | 'closed_lost'
  proposal_url        TEXT,
  proposal_sent_at    TIMESTAMPTZ,
  closed_at           TIMESTAMPTZ,
  close_reason        TEXT,
  created_at          TIMESTAMPTZ DEFAULT NOW()
);
```

---

## 9. KPIs y Metricas de WhatsApp

### Dashboard semanal (revisar lunes 9am)

| KPI | Formula | Meta semanal | Meta mensual | Alerta si... |
|-----|---------|-------------|-------------|-------------|
| **Nuevos contactos** | COUNT(wa_id) WHERE created_at = semana | 20 | 80 | < 10/semana |
| **Tasa de respuesta (lead → bot)** | Contactos que respondieron Touch 1 / Total leads | > 40% | > 40% | < 25% |
| **Tasa de calificacion** | Leads con bant_score ≥ 10 / Total leads | > 45% | > 45% | < 30% |
| **CTR a Cal.com** | Clicks en link Cal.com / Links enviados | > 30% | > 30% | < 15% |
| **Show rate discovery call** | Calls efectivas / Calls agendadas | > 70% | > 70% | < 55% |
| **Conversion lead → call** | Calls agendadas / Total leads nuevos | > 15% | > 15% | < 8% |
| **Conversion call → propuesta** | Propuestas enviadas / Calls efectivas | > 65% | > 65% | < 40% |
| **Conversion propuesta → cierre** | Deals cerrados / Propuestas enviadas | > 30% | > 30% | < 20% |
| **Tasa opt-out** | Opt-outs / Total mensajes enviados | < 2% | < 2% | > 4% |
| **Template approval rate** | Templates aprobados / Templates enviados a Meta | 100% | 100% | < 100% |
| **Tiempo primera respuesta** | Avg minutos entre lead entrante y primer mensaje bot | < 2 min | < 2 min | > 5 min |
| **CSAT cliente activo (NPS WA)** | Avg score solicitudes de testimonio | > 8/10 | > 8/10 | < 7/10 |

### Metricas de templates (revisar en Meta Business Manager)

| Template | CTR objetivo | Si CTR < umbral... |
|----------|-------------|-------------------|
| ugc_bienvenida_lead | > 45% (botones) | Revisar copy del body |
| ugc_seguimiento_lead_24h | > 35% (botones) | Revisar timing de envío |
| ugc_recordatorio_discovery | > 70% (botón call) | Revisar formato del link |
| ugc_propuesta_enviada | > 60% (ver propuesta) | Revisar headline del header |
| ugc_reactivacion_churn | > 25% (botones) | Revisar segmentación de la lista |

### Reporte mensual WhatsApp (formato para revisión con equipo)

```
REPORTE WHATSAPP — MES [X]

CAPTACION
- Nuevos contactos: [X]
- Fuente principal: [ad / organic / referral]
- % leads calificados: [X]%

CONVERSION
- Calls agendadas: [X]
- Show rate: [X]%
- Propuestas enviadas: [X]
- Deals cerrados: [X]
- MRR nuevo generado: $[X] USD

RETENCION (clientes activos en WA)
- Reportes mensuales enviados: [X]/[X]
- Solicitudes de testimonio enviadas: [X]
- Testimonios recibidos: [X]
- NPS promedio: [X]/10

SALUD DE LA LISTA
- Tasa opt-out: [X]%
- Contactos activos totales: [X]
- Distribución por label: [breakdown]

JARVIS PERFORMANCE
- % conversaciones manejadas por bot: [X]%
- Handoffs a humano: [X]
- Fallbacks (no pudo responder): [X]
- Tiempo promedio primera respuesta: [X] min

ACCIONES PARA EL PROXIMO MES
1. [acción basada en métricas]
2. [acción basada en métricas]
3. [acción basada en métricas]
```

---

## 10. Checklist de Implementacion

### Fase 1 — Setup inicial (semana 1)

- [ ] Crear perfil WhatsApp Business con los datos de la sección 1
- [ ] Verificar cuenta en Meta Business Manager
- [ ] Cargar los 5 productos en el catálogo
- [ ] Configurar mensaje de bienvenida y ausencia
- [ ] Crear las 8 etiquetas en WhatsApp Business Manager
- [ ] Enviar las 8 plantillas a aprobación de Meta (esperar 24-48h)

### Fase 2 — Jarvis y n8n (semana 2)

- [ ] Actualizar system prompt de Jarvis v2 con el contexto de sección 5
- [ ] Crear workflow `whatsapp_inbound_handler` en n8n
- [ ] Crear workflow `bant_scorer_and_router` en n8n
- [ ] Crear workflow `follow_up_sequence_scheduler` en n8n
- [ ] Crear workflow `handoff_notifier` en n8n
- [ ] Crear tablas Supabase con el schema de sección 8
- [ ] Prueba end-to-end con número de test

### Fase 3 — Templates y secuencias (semana 2-3)

- [ ] Confirmar aprobación de todas las plantillas Meta
- [ ] Cargar templates en n8n (IDs de plantillas aprobadas)
- [ ] Configurar secuencia de 14 días (7 touches)
- [ ] Conectar Beehiiv con n8n para sincronizar leads

### Fase 4 — Go live y monitoreo (semana 3-4)

- [ ] Test completo del flujo completo con lead real (Alexander como guinea pig)
- [ ] Revisar KPIs en el primer cierre del mes
- [ ] Ajustar tiempos de follow-up según tasa de apertura real
- [ ] Crear dashboard en Supabase con las métricas de sección 9

---

**Owner:** Alexander Cast — founder@kreoon.com
**Stack:** WhatsApp Cloud API + Jarvis v2 (VPS 194.163.161.151) + n8n (dev.kreoon.com) + Supabase
**Compatible con:** Meta Business API v18+, n8n 1.x, Supabase JS/REST
**Proxima revision:** 2026-05-08
