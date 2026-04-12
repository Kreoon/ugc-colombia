# PACK VIRAL — Samuel (Tech Lead)
## UGC Colombia · Contenido de Alto Impacto 2026

**Rol en contenido:** Tech expert, demos de Kreoon, automatizacion, IA aplicada a UGC
**Voz:** Tecnica pero accesible. Developer que explica como si fueras su amigo
**Plataformas:** YouTube (Long + Short), LinkedIn, Twitter/X
**Cadencia:** 4-6 piezas por semana
**Fecha:** 2026-04-10

---

## 1. Posicionamiento y Voz

### Arquetipo de creador
Samuel es el **contrapeso nerd del equipo**. Mientras Diana habla de creators y Alexander habla de negocios, Samuel muestra lo que esta pasando por debajo del capo. Es el que abre el motor y dice "miren como funciona esto". Su contenido es prueba social tecnologica: demuestra que UGC Colombia no es una agencia cualquiera, tiene infraestructura real.

### Propuesta de valor unica
- Es el unico tech lead de agencia UGC en Colombia que hace contenido publico sobre su stack
- Construyo Kreoon desde cero para resolver sus propios problemas operativos
- No vende herramientas, muestra lo que usa el mismo en produccion real

### Pilares de contenido
| Pilar | % | Que publica |
|---|---|---|
| Educativo | 40% | Tutoriales, explicaciones de stack, como funciona X |
| Estrategico | 25% | Por que tomamos tal decision tecnica, trade-offs |
| BTS (Behind the scenes) | 20% | Proceso real de desarrollo, bugs, deploys |
| Casos | 10% | Resultados medibles de automatizaciones |
| Debate | 5% | Opiniones tecnicas, herramientas que no le gustan |

### Tono y lenguaje
**SI usar:**
- "parce", "bacano", "vamos a ver", "miren esto"
- "en produccion real", "lo construi yo mismo", "esto nos ahorra X horas"
- Analogias simples: "es como si tu nevera te avisara cuando se acaba la leche"
- Numeros concretos: horas ahorradas, lineas de codigo, costo mensual exacto

**NO usar:**
- Jerigonza sin explicar: no decir "pgvector HNSW cosine search" sin explicarlo antes
- "soluciones enterprise", "ecosistema", "sinergia" (palabras de PowerPoint)
- Pretender que todo fue facil desde el principio
- Hablar de tecnologia sin conectarlo a un resultado de negocio

### Regla de oro
Cada pieza de contenido debe responder una de estas preguntas:
1. Como hiciste eso?
2. Cuanto te costo / cuanto te ahorro?
3. Puedo hacer lo mismo yo?

---

## 2. Calendario Semanal

### Semana tipo (4-6 piezas)

| Dia | Plataforma | Formato | Pilar |
|---|---|---|---|
| Lunes | YouTube Shorts / TikTok | Demo 60s | Educativo |
| Martes | LinkedIn | Post texto | Estrategico |
| Miercoles | YouTube Shorts / Reels | Tutorial rapido | Educativo |
| Jueves | Twitter/X | Thread 8 tweets | Educativo / Debate |
| Viernes | LinkedIn | Carrusel | Casos / BTS |
| Sabado (opcional) | TikTok / Reels | BTS informal | BTS |

### Batch semanal recomendado
- **Martes 2 horas:** Grabar todos los Shorts/Reels de la semana (3-4 videos)
- **Jueves 1 hora:** Escribir threads de Twitter + post LinkedIn
- **Viernes 30 min:** Armar carrusel con capturas de pantalla de la semana

---

## 3. GUIONES CORTOS — TikTok / Reels / YouTube Shorts

### GUION 01 — "Construi una plataforma para manejar 30 creators"
**Duracion:** 60s | **Plataforma:** YouTube Shorts / TikTok / Reels
**Pilar:** Educativo | **Hook:** Result Hook
**Estilo:** Talking head + screen recording en pantalla partida
**Voz:** Samuel (camara) + demo Kreoon en pantalla

| Tiempo | Audio / Voz | Visual | Notas edicion |
|--------|-------------|--------|---------------|
| 0:00-0:03 | "Construi una plataforma completa para manejar 30 creators. Sin Airtable, sin Notion, sin Excel. La construi yo." | Samuel a camara, expresion directa | Texto overlay grande: "CONSTRUI MI PROPIO SOFTWARE" — corte rapido al arrancar |
| 0:03-0:08 | "Se llama Kreoon. Y voy a mostrarte exactamente que hace en los proximos 50 segundos." | Camara — senala pantalla lateral | Pantalla dividida: Samuel izquierda, Kreoon derecha |
| 0:08-0:18 | "Primero: el dashboard de briefs. Cuando un cliente nos contrata, la IA genera el brief del UGC automaticamente. Producto, audiencia, angulos, todo. En 8 segundos." | Demo en pantalla: abrir Kreoon, ir a briefs, mostrar generacion | Zoom suave al brief generado, resaltar campos con highlight amarillo |
| 0:18-0:28 | "Segundo: el match de creators. Kreoon busca en nuestra base de datos quien es el creator perfecto para ese brief. Usa vectores — es como un motor de busqueda pero para talento humano." | Demo: pantalla de match, aparecen 5 creators con scores | Texto overlay: "VECTORES = busqueda por similitud semantica" |
| 0:28-0:40 | "Tercero: el flujo de aprobacion. El cliente recibe el video, lo aprueba o pide revision, todo dentro de la plataforma. Sin emails de ida y vuelta, sin WhatsApps perdidos." | Demo: pantalla de entregables, boton de aprobacion | Flecha animada mostrando el flujo: creator → revision → cliente |
| 0:40-0:50 | "Y cuando el cliente aprueba, el pago al creator sale automatico. Wise o Mercury dependiendo del pais. Con idempotencia, para que nunca se pague dos veces." | Demo: pantalla de pagos, transaccion en estado 'submitted' | Texto overlay: "IDEMPOTENCIA = cero pagos duplicados" |
| 0:50-0:57 | "Tarde 4 meses en construirlo. Pero ahora nos ahorra 40 horas al mes de operacion manual. Eso en plata es como contratar medio empleado extra." | Samuel a camara, relajado | Grafico simple: "40h/mes ahorradas" |
| 0:57-1:00 | "Si quieres ver el stack completo, lo pongo en el siguiente video." | Samuel senala arriba (gesto TikTok) | Texto overlay: "STACK COMPLETO — siguiente video" |

**ElevenLabs markers:**
`Construi una plataforma completa para manejar 30 creators. <break time="0.3s"/> Sin Airtable, sin Notion, sin Excel. <emphasis level="strong">La construi yo.</emphasis>`

---

### GUION 02 — "La automatizacion que nos ahorra 5 horas a la semana"
**Duracion:** 45s | **Plataforma:** TikTok / Reels
**Pilar:** Casos | **Hook:** Result Hook
**Estilo:** Screen recording con voz en off + camara pequena esquina

| Tiempo | Audio / Voz | Visual | Notas edicion |
|--------|-------------|--------|---------------|
| 0:00-0:03 | "Este workflow de n8n nos ahorra 5 horas a la semana. Te muestro exactamente como funciona." | Pantalla completa: canvas n8n con nodos visibles | Texto overlay: "5 HORAS/SEMANA — automatizadas" |
| 0:03-0:10 | "Antes, cuando llegaba un brief aprobado, Diana tenia que copiar el brief, buscarlo en nuestra base de creators, armar el mensaje y mandarlo por WhatsApp. Todo a mano." | Pantalla: spreadsheet de Excel con datos de creators | Tachado animado sobre el Excel: "ESTO YA NO" |
| 0:10-0:22 | "Ahora el workflow hace todo eso. Miren: llega el trigger de Supabase cuando un brief cambia a estado 'aprobado'. El nodo de JavaScript calcula que creator es el indicado segun disponibilidad y nicho. Y manda el WhatsApp automatico." | Demo n8n: click en cada nodo explicando | Zoom en cada nodo: trigger → JS → WhatsApp |
| 0:22-0:32 | "El creator recibe esto." | Pantalla: WhatsApp con mensaje estructurado de brief | Mostrar mensaje real (datos de prueba), resaltar variables dinamicas |
| 0:32-0:40 | "Nombre del creator, nombre del producto, que tiene que grabar, fecha limite, link de referencia. Todo personalizado. Sin que nadie lo haya escrito." | Voz en off sobre el mensaje | Flechas senalando cada campo del mensaje |
| 0:40-0:45 | "5 horas a la semana, 20 horas al mes, 240 horas al ano. Eso es un empleado de tiempo parcial. Automatizado." | Samuel a camara (esquina) con expresion seria | Texto overlay: "240h/ano = empleado part-time" — CTA: "Sigo explicando el stack en mi perfil" |

---

### GUION 03 — "Usamos IA para generar briefs UGC"
**Duracion:** 50s | **Plataforma:** YouTube Shorts / TikTok
**Pilar:** Educativo | **Hook:** Curiosity Hook
**Estilo:** Demo en pantalla completa + voz en off

| Tiempo | Audio / Voz | Visual | Notas edicion |
|--------|-------------|--------|---------------|
| 0:00-0:03 | "Nadie en Colombia esta haciendo esto todavia: generar briefs de UGC con IA." | Pantalla negra con texto apareciendo | Texto tipo maquina de escribir: "BRIEFS UGC CON IA" |
| 0:03-0:10 | "Un brief de UGC normal te toma entre 20 y 45 minutos. Tienes que investigar el producto, definir la audiencia, escribir el angulo creativo, las instrucciones de grabacion, los dos primeros segundos del video..." | Mostrar brief manual en Google Docs (largo) | Scroll rapido del documento mostrando lo largo que es |
| 0:10-0:22 | "Nosotros metemos tres datos: el producto, la audiencia objetivo y el objetivo de la campana. Y en 8 segundos, Claude Sonnet genera el brief completo." | Demo en Kreoon: llenar 3 campos, presionar generar | Cronometro en pantalla marcando 8 segundos |
| 0:22-0:35 | "Miren lo que genera: angulo creativo principal, hook de apertura sugerido, instrucciones de grabacion paso a paso, dos variaciones de guion, y lista de no-hacer. Todo en el tono de la marca." | Scroll del brief generado en Kreoon | Resaltar con highlight cada seccion mientras la menciona |
| 0:35-0:45 | "No es perfecto. Hay que revisarlo. Pero nos da el 80% del trabajo hecho. Lo que antes tomaba 45 minutos ahora toma 10." | Samuel a camara, honesto | Grafico: 45 min → 10 min, ahorro de 35 min por brief |
| 0:45-0:50 | "Si generamos 20 briefs al mes, eso son mas de 11 horas ahorradas. Solo en briefs." | Calculo rapido en pantalla | Texto: "20 briefs x 35 min = 11.6 horas/mes" — CTA: "Comenta BRIEF si quieres ver el prompt que usamos" |

---

### GUION 04 — "Stack tecnologico de una agencia UGC en 2026"
**Duracion:** 60s | **Plataforma:** YouTube Shorts / TikTok
**Pilar:** Educativo | **Hook:** Direct Hook
**Estilo:** Talking head + texto overlay rapido (estilo listicle)

| Tiempo | Audio / Voz | Visual | Notas edicion |
|--------|-------------|--------|---------------|
| 0:00-0:03 | "El stack tecnologico de nuestra agencia UGC. Todo lo que corre por debajo del capo." | Samuel a camara, tono directo | Texto overlay: "NUESTRO STACK REAL" |
| 0:03-0:08 | "Frontend: Next.js 15. Por que? Porque el App Router nos deja mezclar componentes de servidor con cliente sin drama. Y Vercel lo deploya solo cuando hacemos push." | Camara | Logo Next.js aparece — texto: "Frontend: Next.js 15 + Vercel" |
| 0:08-0:14 | "Base de datos: Supabase. Postgres con superpoderes. RLS para que cada cliente solo vea sus datos, pgvector para busqueda semantica de creators, y real-time para notificaciones." | Camara | Logo Supabase — texto: "BD: Supabase (Postgres + pgvector)" |
| 0:14-0:20 | "IA: Claude Sonnet 4.6 para briefs y chat. Claude Opus para el dossier de investigacion de marca. Gemini Flash para clasificaciones rapidas y baratas." | Camara | Logos Anthropic + Google — texto: "IA: Claude + Gemini (segun tarea)" |
| 0:20-0:27 | "Automatizacion: n8n en nuestro propio servidor. No usamos Zapier porque n8n es gratis si lo hosteas tu mismo y no tiene limite de ejecuciones." | Camara | Logo n8n — texto: "Automatizacion: n8n (self-hosted, $0)" |
| 0:27-0:34 | "Pagos a creators: Wise para transfers internacionales, Mercury para USA. Ambos con idempotencia para que nunca se pague dos veces el mismo trabajo." | Camara | Logos Wise + Mercury |
| 0:34-0:40 | "Comunicacion: WhatsApp Cloud API para todo. Clientes, creators, alertas del sistema. Jarvis v2, nuestro agente de IA, responde el 80% de los mensajes automatico." | Camara | Logo WhatsApp — texto: "80% mensajes = automatizados" |
| 0:40-0:48 | "Video: Bunny CDN. Carga rapido, cuesta poco. Para entregables de clientes y portafolios de creators." | Camara | Logo Bunny CDN |
| 0:48-0:55 | "Costo total del stack: menos de 300 dolares al mes. Para manejar 30 creators y multiples clientes simultaneos." | Camara, levanta una ceja | Texto grande: "MENOS DE $300 USD/MES" |
| 0:55-1:00 | "En el siguiente video desgloso cada costo. Herramienta por herramienta." | Samuel senala | CTA overlay: "COSTO REAL — siguiente video" |

---

### GUION 05 — "De spreadsheet a SaaS propio: el proceso"
**Duracion:** 60s | **Plataforma:** YouTube Shorts / TikTok / Reels
**Pilar:** Estrategico | **Hook:** Story Hook
**Estilo:** Talking head con B-roll de codigo/pantalla

| Tiempo | Audio / Voz | Visual | Notas edicion |
|--------|-------------|--------|---------------|
| 0:00-0:04 | "Hace 8 meses managiamos 15 creators con un Google Sheets. Hoy tenemos un SaaS propio. Esto es lo que paso en el medio." | Samuel a camara, serio | Texto: "8 meses. De Excel a SaaS." |
| 0:04-0:12 | "El problema con el spreadsheet no era que fuera feo. Era que no nos avisaba de nada. Un creator entregaba tarde y nos enterabamos cuando el cliente preguntaba. Eso quema relaciones." | Camara | B-roll: spreadsheet con celdas de colores manualmente |
| 0:12-0:22 | "Primero intentamos Notion. Luego Airtable. Luego hasta Monday. Todos tienen el mismo problema: son herramientas genericas. No entienden el flujo de una agencia UGC." | Camara, cuenta con los dedos | Logos de Notion, Airtable, Monday aparecen y se tachan uno a uno |
| 0:22-0:32 | "Entonces decidi construir Kreoon. No porque sea mejor programador que esos equipos. Sino porque yo conozco exactamente el flujo que necesitamos: brief → match → grabacion → revision → pago. Sin pasos de mas." | Camara, apunta a si mismo | Diagrama animado del flujo |
| 0:32-0:44 | "Lo construi en Next.js con Supabase en el backend. Tarde cuatro meses con trabajar en eso de noche y los fines de semana. El primer deploy a produccion fue un desastre — pero ya funciona." | Camara, sonrie | B-roll: VS Code con codigo, commit history en GitHub |
| 0:44-0:55 | "La leccion: si usas mas de dos herramientas para gestionar el mismo proceso, probablemente necesitas una sola herramienta que las reemplace. No siempre es un SaaS — a veces es solo un script de 50 lineas." | Camara, reflexivo | Texto overlay: "2+ herramientas para 1 proceso = problema de arquitectura" |
| 0:55-1:00 | "La semana que viene muestro el primer bug grave que tuve en produccion. Fue vergonzoso." | Camara, rie | Texto CTA: "BUG VERGONZOSO — proxima semana" |

---

### GUION 06 — "Demo de Kreoon en 30 segundos"
**Duracion:** 30s | **Plataforma:** TikTok / Reels / YouTube Shorts
**Pilar:** Educativo | **Hook:** Direct Hook
**Estilo:** Screen recording puro, voz en off rapida

| Tiempo | Audio / Voz | Visual | Notas edicion |
|--------|-------------|--------|---------------|
| 0:00-0:02 | "Kreoon en 30 segundos. Vamos." | Logo Kreoon en pantalla | Musica upbeat, tempo rapido |
| 0:02-0:07 | "Dashboard principal: estado de todos los proyectos activos, que creator esta grabando que, fechas limite en rojo si estan proximas." | Demo: pantalla principal de Kreoon | Zoom rapido a cada seccion |
| 0:07-0:12 | "Brief generator: tres campos, ocho segundos, brief completo con IA." | Demo: generar brief en tiempo real | Mostrar los 8 segundos reales de generacion |
| 0:12-0:18 | "Creator match: busca el mejor creator para ese brief automaticamente. Cinco candidatos ordenados por score de compatibilidad." | Demo: pantalla de match con scores | Resaltar el score del top 1 |
| 0:18-0:24 | "Entregables: el creator sube el video, el cliente lo revisa, lo aprueba o pide cambio. Todo en un solo lugar." | Demo: flujo de revision con botones | Animacion del flujo |
| 0:24-0:28 | "Pagos: automaticos cuando el cliente aprueba. Idempotentes para que nunca se paguen dos veces." | Demo: pantalla de pagos | Mostrar estado 'sent' en una transaccion |
| 0:28-0:30 | "Eso es Kreoon." | Samuel a camara una fraccion de segundo | Corte rapido al logo — CTA: "Sigue para ver el stack" |

---

### GUION 07 — "Como Jarvis v2 responde el 80% de los DMs"
**Duracion:** 55s | **Plataforma:** YouTube Shorts / TikTok
**Pilar:** Educativo | **Hook:** Result Hook
**Estilo:** Demo WhatsApp en pantalla + explicacion en voz en off

| Tiempo | Audio / Voz | Visual | Notas edicion |
|--------|-------------|--------|---------------|
| 0:00-0:03 | "Nuestro agente de IA responde el 80% de los mensajes de WhatsApp sin que nadie del equipo toque el telefono." | Pantalla de WhatsApp con conversacion activa | Texto overlay: "80% AUTOMATIZADO" |
| 0:03-0:10 | "Se llama Jarvis. Corre en nuestro servidor en Bogota. Y tiene tres trabajos: calificar leads, responder preguntas de clientes, y coordinar con creators." | Samuel a camara | Diagrama: Jarvis en el centro con flechas a los tres roles |
| 0:10-0:22 | "Miren un ejemplo real. Un lead escribe preguntando por precios. Jarvis detecta que es un lead nuevo, le hace tres preguntas para entender su presupuesto y sus necesidades, y si califica, le ofrece agendar una llamada con Alexander." | Demo: conversacion de WhatsApp en tiempo real (datos de prueba) | Mostrar la conversacion mensaje por mensaje |
| 0:22-0:33 | "El cerebro de Jarvis es Claude Sonnet. Pero el routing — decidir si un mensaje es de ventas, operaciones o un creator — lo hace Gemini Flash, que es 10 veces mas barato. Solo usamos el modelo caro cuando realmente se necesita." | Camara | Diagrama: mensaje → Gemini clasifica → Claude responde |
| 0:33-0:45 | "El 20% restante que Jarvis no puede manejar — preguntas muy especificas, quejas, negociaciones — los marca como urgentes y nos avisa por WhatsApp. Nos llega una notificacion con el contexto completo de la conversacion." | Demo: notificacion de escalamiento | Mostrar mensaje de escalamiento con contexto |
| 0:45-0:52 | "Antes del agente, el equipo pasaba dos horas al dia respondiendo mensajes. Ahora son veinte minutos, solo los que Jarvis no pudo resolver." | Camara | Grafico: 2h → 20 min |
| 0:52-0:55 | "El proximo video: como configurar un agente de WhatsApp con n8n desde cero." | Samuel senala | CTA: "AGENTE WHATSAPP — proximo video" |

---

### GUION 08 — "El workflow n8n que envia briefs automatico"
**Duracion:** 60s | **Plataforma:** YouTube Shorts / TikTok
**Pilar:** Educativo | **Hook:** Curiosity Hook
**Estilo:** Screen recording de n8n + voz en off

| Tiempo | Audio / Voz | Visual | Notas edicion |
|--------|-------------|--------|---------------|
| 0:00-0:03 | "Este workflow de 7 nodos hace algo que antes nos tomaba 20 minutos. Y lo hace en 4 segundos." | Canvas de n8n con workflow visible | Texto: "7 NODOS. 4 SEGUNDOS." |
| 0:03-0:10 | "Nodo 1: el trigger. Escucha cambios en nuestra base de datos de Supabase. Cuando un brief cambia a estado 'aprobado', el workflow se activa automaticamente." | Zoom al nodo trigger de Supabase | Resaltar el campo 'status = approved' |
| 0:10-0:20 | "Nodo 2: busca el creator asignado a ese brief. Le pregunta a Supabase: quien tiene la disponibilidad, el nicho correcto y el tier requerido por el cliente?" | Zoom al nodo de consulta SQL | Mostrar la query simplificada |
| 0:20-0:30 | "Nodo 3: arma el mensaje. Un template de JavaScript que toma los datos del brief y los del creator y genera el WhatsApp personalizado. Nombre del creator, producto, que debe grabar, deadline, link de referencia." | Zoom al nodo de codigo | Mostrar el template con variables |
| 0:30-0:40 | "Nodo 4: envia el WhatsApp via la API de Meta. El creator recibe el brief en su celular en cuatro segundos desde que se aprobo." | Zoom al nodo de WhatsApp | Mostrar el mensaje recibido en telefono |
| 0:40-0:50 | "Nodos 5, 6 y 7: manejo de errores. Si algo falla — la API de Meta cae, el creator no existe en la BD — el workflow nos avisa por WhatsApp a nosotros en vez de fallar silenciosamente." | Zoom a la rama de error | Resaltar la rama roja de errores |
| 0:50-0:57 | "Sin este workflow: 20 minutos por brief, errores de copia-pega, olvidos. Con este workflow: 4 segundos, cero errores, funciona mientras dormimos." | Camara | Texto: "20 min → 4 seg. Siempre encendido." |
| 0:57-1:00 | "Comenta WORKFLOW y te mando el JSON para importarlo." | Samuel a camara | CTA grande: "COMENTA 'WORKFLOW'" |

---

### GUION 09 — "Por que construi Kreoon en vez de usar Airtable"
**Duracion:** 50s | **Plataforma:** TikTok / Reels
**Pilar:** Estrategico | **Hook:** Controversial Hook
**Estilo:** Talking head

| Tiempo | Audio / Voz | Visual | Notas edicion |
|--------|-------------|--------|---------------|
| 0:00-0:03 | "Dejen de usar Airtable para gestionar una agencia UGC. Hay una razon mejor." | Samuel a camara, directo | Texto overlay: "DEJEN DE USAR AIRTABLE" — fuerte |
| 0:03-0:10 | "No es que Airtable sea malo. Es una herramienta excelente para lo que hace. El problema es que te cobra por fila, por usuario, y sobre todo: no puede hacer las cosas especificas que nosotros necesitamos." | Camara | Captura de pantalla de precios de Airtable con flecha al precio |
| 0:10-0:20 | "Ejemplo: en Airtable no puedo hacer que cuando un cliente apruebe un video, automaticamente se calcule la idempotency key del pago y se inicie la transferencia a Wise. Eso requiere codigo." | Camara | Diagrama del flujo que menciona |
| 0:20-0:30 | "Tampoco puedo hacer busqueda por similitud semantica en mis creators. Necesito un vector database para eso. Airtable no lo tiene, y la integracion externa es una pesadilla." | Camara | Visualizacion simple de busqueda vectorial vs busqueda normal |
| 0:30-0:40 | "Construi Kreoon en Next.js con Supabase porque esos dos me dan exactamente lo que necesito: logica de negocio en el backend, pgvector para el match de creators, y RLS para que cada cliente solo vea sus datos." | Camara | Logos Next.js + Supabase |
| 0:40-0:48 | "El costo de oportunidad de Airtable no es lo que pagas. Es lo que no puedes hacer con el." | Camara, pausa dramatica | Texto overlay: "El costo real de Airtable = lo que NO puedes hacer" |
| 0:48-0:50 | "Siguiente video: el stack completo de Kreoon y cuanto cuesta al mes." | Camara | CTA |

---

### GUION 10 — "5 herramientas gratis que usa nuestra agencia"
**Duracion:** 45s | **Plataforma:** TikTok / Reels / YouTube Shorts
**Pilar:** Educativo | **Hook:** Direct Hook
**Estilo:** Lista rapida, talking head

| Tiempo | Audio / Voz | Visual | Notas edicion |
|--------|-------------|--------|---------------|
| 0:00-0:03 | "5 herramientas completamente gratis que usamos en nuestra agencia UGC. Ninguna es de mentiras." | Samuel a camara | Texto: "5 HERRAMIENTAS GRATIS — reales" |
| 0:03-0:10 | "Uno: n8n self-hosted. Es como Zapier pero tu lo hosteas en tu servidor. Cero costo de licencia, cero limite de ejecuciones. Solo pagas el servidor, que puede ser tan barato como 5 dolares al mes." | Camara | Logo n8n — texto: "n8n self-hosted: $0 en licencia" |
| 0:10-0:18 | "Dos: Supabase free tier. Hasta 500 megabytes de datos y 50,000 requests al mes gratis. Para una agencia pequena, eso alcanza facilmente para los primeros meses." | Camara | Logo Supabase — texto: "Supabase: gratis hasta 500MB" |
| 0:18-0:26 | "Tres: Vercel hobby plan. Deploy automatico desde GitHub, dominio personalizado, funciones serverless. Gratis para proyectos que no son de produccion critica." | Camara | Logo Vercel — texto: "Vercel Hobby: $0" |
| 0:26-0:33 | "Cuatro: WhatsApp Cloud API. La API oficial de Meta para WhatsApp Business. Las primeras 1,000 conversaciones al mes son gratis. Mas que suficiente para arrancar." | Camara | Logo WhatsApp — texto: "1,000 conversaciones/mes gratis" |
| 0:33-0:40 | "Cinco: Claude API con capa gratuita. Para prototipar automizaciones de briefs y el chatbot. Los primeros experimentos son baratos, casi gratis si los mensajes son cortos." | Camara | Logo Anthropic — texto: "Prototipos: casi $0" |
| 0:40-0:45 | "Puedes arrancar una agencia UGC tech con menos de 20 dolares al mes en stack. El limite no es el presupuesto, es el conocimiento." | Camara, firme | Texto final: "Stack de agencia UGC: desde $20 USD/mes" — CTA: "Guarda este video" |

