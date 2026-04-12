## 3. GUIONES CORTOS (continuacion — guiones 11 al 20)

### GUION 11 — "Como auditamos seguridad en Supabase"
**Duracion:** 55s | **Plataforma:** YouTube Shorts / TikTok
**Pilar:** Educativo | **Hook:** Pain Hook
**Estilo:** Screen recording + talking head

| Tiempo | Audio / Voz | Visual | Notas edicion |
|--------|-------------|--------|---------------|
| 0:00-0:03 | "Si tienes una base de datos en Supabase y nunca la has auditado, probablemente hay un hoyo de seguridad abierto." | Samuel a camara, serio | Texto overlay: "SUPABASE SIN AUDITAR = riesgo" |
| 0:03-0:12 | "El error mas comun: activar RLS en la tabla pero olvidarse de crear las politicas. Resultado: la tabla queda abierta para cualquier request autenticado. Cualquier usuario puede leer los datos de otro usuario." | Demo: Supabase dashboard, tabla sin politicas RLS | Resaltar en rojo la tabla sin politicas |
| 0:12-0:22 | "El segundo error: usar la anon key en el frontend para queries que deberian usar service_role. La anon key tiene acceso limitado por RLS. Pero si tus politicas estan mal, la anon key puede hacer cosas que no deberla." | Camara | Diagrama: anon key vs service_role, que puede hacer cada uno |
| 0:22-0:33 | "La herramienta para auditarlo: supabase db lint. La corres en el CLI y te dice exactamente que tablas tienen RLS activo sin politicas, que politicas pueden ser un riesgo, y que indices te faltan para performance." | Demo: terminal con el comando y output | Mostrar el output real del lint |
| 0:33-0:45 | "Nosotros corrimos esto en Kreoon y encontramos tres tablas que estaban expuestas sin querer. chat_conversations, chat_messages, y leads. Las tres con datos de clientes reales." | Camara, cara seria | Texto overlay: "ENCONTRAMOS 3 TABLAS EXPUESTAS" |
| 0:45-0:52 | "El fix: crear las politicas correctas en 10 minutos. Pero si no lo hubieramos auditado, eso podia haber sido una filtracion de datos." | Camara | Mostrar el comando de fix: CREATE POLICY... |
| 0:52-0:55 | "Corre supabase db lint hoy. Gratis. Cinco minutos. Puede salvarte de un desastre." | Camara, directo | CTA: "COMENTA si encontraste algo" |

---

### GUION 12 — "El costo real de nuestro stack mensual"
**Duracion:** 60s | **Plataforma:** YouTube Shorts / TikTok
**Pilar:** Casos | **Hook:** Curiosity Hook
**Estilo:** Pantalla con spreadsheet de costos + voz en off

| Tiempo | Audio / Voz | Visual | Notas edicion |
|--------|-------------|--------|---------------|
| 0:00-0:03 | "Cuanto cuesta el stack tecnologico de nuestra agencia UGC al mes. Con numeros reales." | Samuel a camara | Texto overlay: "COSTO REAL — sin mentiras" |
| 0:03-0:08 | "Vercel Pro: 20 dolares. Nos da funciones serverless sin limite de tiempo de ejecucion, dominio, analytics, y CI/CD automatico." | Pantalla: tabla de costos, resaltando la fila de Vercel | Numero grande: "$20" |
| 0:08-0:14 | "Supabase Pro: 25 dolares. Ocho gigabytes de base de datos, dos proyectos, backups diarios, soporte basico. Para el tamano de operacion actual, esto es mas que suficiente." | Tabla | "$25" |
| 0:14-0:20 | "VPS para n8n y Jarvis: 12 dolares. Un servidor en Europa con 4GB de RAM y 80GB de disco. Corre n8n, Jarvis v2, y algunos scripts de automatizacion." | Tabla | "$12" |
| 0:20-0:27 | "Bunny CDN para videos de clientes y portafolios: entre 8 y 15 dolares dependiendo del trafico. El mes con mas trafico llegamos a 18." | Tabla | "$8-15" |
| 0:27-0:35 | "Claude API para briefs, chatbot y dossiers: entre 30 y 60 dolares al mes. Depende de cuantos leads entren y cuantos briefs generemos. Los meses con mas volumen pueden llegar a 80." | Tabla | "$30-60" |
| 0:35-0:43 | "WhatsApp Cloud API: casi gratis. Las primeras mil conversaciones al mes son gratuitas. Lo que pagamos es por encima de eso, que suele ser entre 5 y 12 dolares." | Tabla | "$5-12" |
| 0:43-0:50 | "Total: entre 100 y 140 dolares al mes. Para manejar multiples clientes, 30 creators activos, automatizaciones corriendo 24/7, y un agente de IA que responde mensajes." | Tabla con total | Texto grande: "$100-140 USD/MES TOTAL" |
| 0:50-0:57 | "Cuando escalemos necesitaremos mas. Pero por ahora, esto es todo lo que necesitamos para operar." | Camara | Texto: "Escalable segun demanda" |
| 0:57-1:00 | "En el siguiente video cuento cual es el primer corte que haria si necesitara reducir costos a la mitad." | Camara | CTA: "Reducir costos a la mitad — proximo video" |

---

### GUION 13 — "El primer bug grave de Kreoon"
**Duracion:** 60s | **Plataforma:** YouTube Shorts / TikTok / Reels
**Pilar:** BTS | **Hook:** Story Hook
**Estilo:** Talking head, storytelling honesto

| Tiempo | Audio / Voz | Visual | Notas edicion |
|--------|-------------|--------|---------------|
| 0:00-0:04 | "El primer bug grave que tuve en Kreoon en produccion. Casi pago dos veces al mismo creator." | Samuel a camara, cara seria | Texto overlay: "CASI PAGO DOS VECES AL MISMO CREADOR" |
| 0:04-0:14 | "El workflow de pagos tenia un error de logica: si el webhook de confirmacion de Wise llegaba con un delay, el sistema interpretaba que el pago habia fallado y lanzaba un segundo intento. Con otro pago real." | Camara | Diagrama simple: pago 1 → timeout → pago 2 por error |
| 0:14-0:25 | "Lo descubri cuando un creator me escribe diciendo que le habian llegado dos transferencias. Fueron 120 dolares duplicados. Tuvimos que pedirle que devolviera uno, y el creator fue honesto — gracias a Dios." | Camara, serio | Texto overlay: "$120 duplicados" |
| 0:25-0:38 | "El fix tuvo dos partes. Primero: idempotency key. Cada pago genera una clave unica basada en el creator, la entrega y el tipo de pago. Si se intenta crear dos pagos con la misma clave, la base de datos rechaza el segundo. Imposible duplicar." | Camara + diagrama | Mostrar la formula: sha256(creator_id|delivery_id|type) |
| 0:38-0:50 | "Segundo: el status del pago es progresivo. Pasa por initiating, submitted, sent. Solo cuando el banco confirma que el pago llego, marcamos el contenido como pagado y notificamos al creator. No antes." | Diagrama de estados | Flecha: initiating → submitted → sent |
| 0:50-0:57 | "Lo que aprendi: no importa que tan pequena sea tu operacion, los pagos necesitan ser idempotentes desde el primer dia. Es el tipo de bug que en una operacion grande te puede costar miles." | Camara | Texto: "PAGOS = idempotentes desde el dia 1" |
| 0:57-1:00 | "Les cuento el segundo bug grave la proxima semana. Este fue mas vergonzoso." | Camara, rie | CTA: "Bug vergonzoso 2 — la proxima semana" |

---

### GUION 14 — "POV: eres dev en una agencia que se mueve rapido"
**Duracion:** 45s | **Plataforma:** TikTok / Reels
**Pilar:** BTS | **Hook:** Story Hook
**Estilo:** POV camara, informal, tipo vlog

| Tiempo | Audio / Voz | Visual | Notas edicion |
|--------|-------------|--------|---------------|
| 0:00-0:03 | "POV: eres el dev de una agencia de contenido que acaba de conseguir un cliente nuevo en 48 horas." | Camara de frente, casual | Texto overlay: "POV: dev en una agencia que no para" |
| 0:03-0:10 | "Diana me escribe el lunes: 'Samuel, el cliente quiere un dashboard con sus metricas de ads. Para el viernes.' Son cuatro dias." | Camara mostrando el mensaje en pantalla | Mostrar chat de WhatsApp real (datos de prueba) |
| 0:10-0:20 | "No me pongo a construir desde cero. Primero reviso que ya tenemos: tenemos el conector de Meta Ads funcionando, tenemos la tabla de client_reports en Supabase, tenemos el cron que genera reportes mensuales." | Camara + rapido a pantalla con codigo | Scroll rapido por el codigo existente |
| 0:20-0:30 | "El trabajo no es construir. Es conectar lo que ya existe. Tres dias despues, el dashboard esta en staging. Un dia para QA con Diana, y el viernes se lo mostramos al cliente." | Camara | Captura del dashboard funcionando |
| 0:30-0:40 | "La clave en una agencia que se mueve rapido: no sobreingenierar. No construir la solucion perfecta. Construir la solucion que funcione hoy y que se pueda mejorar despues." | Camara, firme | Texto: "No sobreingenieres. Construye lo que funciona hoy." |
| 0:40-0:45 | "El perfeccionismo en desarrollo de software en una startup te mata. La velocidad de entrega es el producto." | Camara | CTA: "Comenta si eres dev en una startup y te identificas" |

---

### GUION 15 — "Usando Claude Sonnet para analizar ads de clientes"
**Duracion:** 55s | **Plataforma:** YouTube Shorts / TikTok
**Pilar:** Educativo | **Hook:** Curiosity Hook
**Estilo:** Demo en pantalla + voz en off

| Tiempo | Audio / Voz | Visual | Notas edicion |
|--------|-------------|--------|---------------|
| 0:00-0:03 | "Le paso los ads de un cliente a Claude Sonnet y me dice en 10 segundos por que no estan funcionando." | Pantalla con chat de Claude | Texto overlay: "IA ANALIZA ADS EN 10 SEGUNDOS" |
| 0:03-0:12 | "El prompt es especifico. No le digo 'analiza este ad'. Le digo: 'Eres un experto en UGC de alto rendimiento para Meta Ads. Analiza el hook de este video en los primeros 3 segundos, el CTA, y si hay prueba social. Dame tres problemas concretos y tres soluciones.'" | Mostrar el prompt en Claude | Resaltar las partes clave del prompt |
| 0:12-0:25 | "Le paso la transcripcion del video y las metricas: CTR, hook rate, completion rate. En 10 segundos me da un analisis estructurado." | Demo: respuesta de Claude aparece en pantalla | Scroll de la respuesta con los tres problemas identificados |
| 0:25-0:38 | "Ejemplo real: un cliente tenia un completion rate del 18% en sus UGCs. Claude identifico que el hook en los primeros tres segundos mencionaba el nombre de la marca — eso le importa al cliente, no al espectador. Cambio el hook para hablar del problema del usuario. Completion rate subio a 34%." | Camara + captura de metricas | Grafico: 18% → 34% |
| 0:38-0:48 | "Esto no reemplaza el criterio humano. Claude puede estar equivocado. Pero te da un punto de partida estructurado en segundos, en vez de una opinion desde el intestino." | Camara | Texto: "IA = punto de partida, no decision final" |
| 0:48-0:52 | "Tengo el prompt guardado. Si quieres que te lo mande, comenta PROMPT." | Camara | CTA: "COMENTA 'PROMPT'" |
| 0:52-0:55 | "La proxima semana muestro como automatizamos este analisis para que corra automatico cada semana para todos nuestros clientes." | Camara | Texto: "Automatizacion de analisis — proxima semana" |

---

### GUION 16 — "Stack tecnologico de una agencia UGC vs una agencia tradicional"
**Duracion:** 50s | **Plataforma:** TikTok / Reels
**Pilar:** Estrategico | **Hook:** Controversial Hook
**Estilo:** Comparacion visual, talking head

| Tiempo | Audio / Voz | Visual | Notas edicion |
|--------|-------------|--------|---------------|
| 0:00-0:03 | "La diferencia entre una agencia UGC moderna y una tradicional no es el talento. Es la infraestructura." | Samuel a camara | Texto: "AGENCIA MODERNA vs TRADICIONAL" |
| 0:03-0:14 | "Agencia tradicional: Google Drive para archivos, Notion para procesos, WhatsApp manual para comunicar, Excel para seguimiento de pagos, emails para enviar reportes." | Pantalla dividida, lado izquierdo | Iconos con X roja |
| 0:14-0:26 | "Agencia moderna: SaaS propio o plataforma integrada, base de datos con RLS, automatizaciones con n8n, agente de IA para comunicacion, reportes automaticos mensuales por WhatsApp." | Pantalla dividida, lado derecho | Iconos con check verde |
| 0:26-0:38 | "La diferencia practica: la agencia tradicional tarda 2 horas en procesar un nuevo cliente y coordinar su primer brief. La moderna tarda 20 minutos — el resto es automatico." | Camara | Comparacion de tiempo: 2h vs 20 min |
| 0:38-0:46 | "Eso no significa que la tradicional es mala. Significa que si compiten en el mismo mercado de precio, la moderna puede atender mas clientes con el mismo equipo." | Camara | Texto: "Mas clientes. Mismo equipo." |
| 0:46-0:50 | "La pregunta no es si necesitas tech. Es cuanta tech necesitas hoy para el tamano de tu agencia." | Camara | CTA: "Comenta el tamano de tu agencia" |

---

### GUION 17 — "Supabase RLS explicado como si tuvieras 10 anos"
**Duracion:** 50s | **Plataforma:** YouTube Shorts / TikTok
**Pilar:** Educativo | **Hook:** Curiosity Hook
**Estilo:** Analogia + demo rapida

| Tiempo | Audio / Voz | Visual | Notas edicion |
|--------|-------------|--------|---------------|
| 0:00-0:03 | "Row Level Security de Supabase explicado para que lo entienda cualquier persona." | Samuel a camara, relajado | Texto: "RLS — explicado para humanos" |
| 0:03-0:12 | "Imagina que tienes un edificio de apartamentos. La base de datos es el edificio. Cada fila de tu tabla es un apartamento. Sin RLS, cualquier persona que entre al edificio puede entrar a cualquier apartamento." | Animacion simple de edificio | Diagrama: edificio con puertas abiertas |
| 0:12-0:22 | "Con RLS activo, cada persona solo puede entrar al apartamento que le pertenece. El portero — que es Supabase — verifica la identidad antes de dejar pasar." | Animacion: portero en la puerta | Diagrama: portero verificando JWT token |
| 0:22-0:33 | "En codigo: activas RLS con ALTER TABLE leads ENABLE ROW LEVEL SECURITY. Luego creas una politica: CREATE POLICY 'solo el dueno' ON leads FOR ALL USING (auth.uid() = user_id)." | Demo en Supabase SQL editor | Mostrar el codigo en pantalla |
| 0:33-0:42 | "Ahora si un cliente intenta leer los datos de otro cliente, Supabase le devuelve una lista vacia. No un error, no un 403. Una lista vacia. Como si los datos no existieran para el." | Demo: query retorna vacio | Mostrar resultado en el SQL editor |
| 0:42-0:48 | "El error clasico: activar RLS y no crear la politica. Resultado: nadie puede leer nada, ni el propietario. La tabla queda completamente bloqueada." | Camara, senala | Texto en rojo: "RLS sin politica = nadie puede leer" |
| 0:48-0:50 | "RLS: la diferencia entre una base de datos que protege tus usuarios y una que los expone." | Camara | CTA: "Guarda esto para cuando lo necesites" |

---

### GUION 18 — "BTS: asi es un dia de trabajo como dev de agencia"
**Duracion:** 60s | **Plataforma:** TikTok / Reels
**Pilar:** BTS | **Hook:** Story Hook
**Estilo:** Vlog informal, camara en mano

| Tiempo | Audio / Voz | Visual | Notas edicion |
|--------|-------------|--------|---------------|
| 0:00-0:03 | "Un dia tipico como dev de una agencia de UGC. Sin filtros." | Samuel caminando con camara | Texto: "DIA REAL. SIN FILTROS." |
| 0:03-0:12 | "7am: leo las alertas de Jarvis. Si algun workflow fallo en la noche, me llega una notificacion. Esta manana: un mensaje de error en el workflow de pagos. Un creator no tenia el numero de Wise registrado. Fix rapido de 5 minutos." | Pantalla del telefono con alerta | Mostrar la notificacion real de error |
| 0:12-0:22 | "9am: standup de 20 minutos con Alexander y Diana. Yo reporto que hay tres issues abiertos: el bug de Wise de esta manana, una integracion de Meta Ads que esta dando timeout en reportes largos, y un feature nuevo que pidio un cliente." | Camara informal | Texto overlay: "Standup: 20 min. No mas." |
| 0:22-0:35 | "10am a 1pm: trabajo profundo. Hoy toco el bug del Meta Ads timeout. El problema era que para clientes con muchas campanhas, la query tardaba mas de 30 segundos y el servidor la cortaba. Solucion: paginacion y cache en Supabase." | Pantalla con codigo en VS Code | Mostrar el codigo del fix |
| 0:35-0:45 | "3pm: Diana me manda un audio. Un cliente quiere saber si podemos exportar los reportes en PowerPoint, no en PDF. Investigo si react-pdf puede exportar a PPTX. No puede. Le digo que lo evaluamos para Q3. A veces el trabajo es saber decir 'no ahora'." | Camara, mensaje de audio visible | Mostrar el proceso de investigacion rapida |
| 0:45-0:55 | "6pm: deploy a produccion del fix de Meta Ads. Vercel lo sube automatico cuando hago push a main. Reviso que el workflow de reportes funcione con el cliente que tenia el timeout. Funciona. Listo." | Pantalla: Vercel deployment exitoso | Mostrar el check verde del deploy |
| 0:55-1:00 | "Eso es un dia normal. Mitad bugs, mitad features, mitad comunicacion. Si, son tres mitades. Asi funciona una agencia en modo crecimiento." | Camara, rie | CTA: "Comenta como es tu dia como dev" |

---

### GUION 19 — "El error de arquitectura que casi nos cuesta un cliente"
**Duracion:** 55s | **Plataforma:** YouTube Shorts / TikTok
**Pilar:** BTS | **Hook:** Pain Hook
**Estilo:** Storytelling, talking head

| Tiempo | Audio / Voz | Visual | Notas edicion |
|--------|-------------|--------|---------------|
| 0:00-0:04 | "Un error de arquitectura en nuestro chatbot de ventas casi nos cuesta un cliente de 3,000 dolares al mes." | Samuel a camara, serio | Texto: "ERROR DE ARQUITECTURA = cliente perdido casi" |
| 0:04-0:15 | "El chatbot de ventas — Lia, nuestra consultora virtual de IA — no tenia memoria entre sesiones. Si un lead cerraba el navegador y volvia al dia siguiente, el chat empezaba de cero. Lia le volvia a preguntar su nombre, su empresa, todo." | Demo del chatbot empezando de cero | Mostrar la experiencia de usuario mala |
| 0:15-0:27 | "Un lead que habia tenido una conversacion de 15 minutos el dia anterior, llego al dia siguiente y Lia le pregunto 'Hola, cuales son tus necesidades de contenido?' El lead penso que era un bot malo y no respondio mas." | Camara | Texto: "15 min de conversacion... perdida" |
| 0:27-0:40 | "El fix fue implementar persistencia de conversacion en Supabase. Guardamos cada mensaje en chat_messages con el conversation_id. Cuando el lead vuelve, Lia carga el historial y retoma desde donde quedo. Un lead que regresa es un lead caliente." | Demo del chatbot retomando la conversacion | Mostrar como Lia saluda al lead por nombre y retoma |
| 0:40-0:50 | "La leccion: la experiencia de usuario no es solo el diseno visual. Es si el sistema recuerda quien eres. En ventas, la memoria es respeto." | Camara | Texto: "Memoria = respeto al usuario" |
| 0:50-0:55 | "Ese lead volvio despues del fix. Agenda la llamada de discovery. Hoy es cliente." | Camara, pausa | Texto: "Volvio. Hoy es cliente." — CTA: "Sigue para ver como construi el sistema de memoria" |

---

### GUION 20 — "Por que el 80% de las automatizaciones de marketing fallan"
**Duracion:** 50s | **Plataforma:** TikTok / Reels
**Pilar:** Debate | **Hook:** Controversial Hook
**Estilo:** Opinion fuerte, talking head

| Tiempo | Audio / Voz | Visual | Notas edicion |
|--------|-------------|--------|---------------|
| 0:00-0:03 | "El 80% de las automatizaciones de marketing fallan por la misma razon. Y no es la tecnologia." | Samuel a camara, directo | Texto: "POR QUE FALLAN LAS AUTOMATIZACIONES" |
| 0:03-0:12 | "Fallan porque automatizan el proceso equivocado. La gente agarra Zapier o n8n y automatiza lo primero que ve: enviar emails, postear en redes, generar reportes. Pero si el proceso manual ya era malo, automatizarlo solo hace el problema mas rapido." | Camara | Texto: "Automatizar un proceso malo = problema mas rapido" |
| 0:12-0:23 | "Antes de automatizar algo en nuestra agencia, hacemos tres preguntas. Uno: este proceso funciona bien cuando lo hacemos a mano? Dos: lo hacemos mas de tres veces a la semana? Tres: si falla, hay alguien que lo detecte?" | Camara, cuenta con dedos | Las tres preguntas aparecen como texto |
| 0:23-0:35 | "Si la respuesta a cualquiera de esas es no, no automatizamos todavia. Primero ajustamos el proceso manual hasta que funcione bien. Luego lo automatizamos." | Camara | Texto: "Proceso manual que funciona → automatizar" |
| 0:35-0:43 | "El segundo error: automatizar sin manejo de errores. Una automatizacion que falla silenciosamente es peor que no tener automatizacion. Por lo menos si falla a mano, te das cuenta." | Camara, enfatico | Texto en rojo: "Falla silenciosa = PEOR que no automatizar" |
| 0:43-0:48 | "Cada workflow que construimos tiene una rama de error obligatoria: si algo falla, nos avisa por WhatsApp con el contexto del error. Cero fallos silenciosos." | Camara | Mostrar diagrama de rama de error |
| 0:48-0:50 | "Automatiza inteligente. No automatiza por automatizar." | Camara | CTA: "Comenta si has tenido una automatizacion que fallo silenciosamente" |

---

## 4. GUIONES CARRUSELES LINKEDIN (10 carruseles)

### CARRUSEL 01 — "Stack tech de una agencia UGC moderna"
**Slides:** 10 | **Formato:** LinkedIn Carousel (1:1)
**CTA final:** Seguir a Samuel / UGC Colombia en LinkedIn

**Slide 1 — Portada**
Titulo: "El stack tech que usamos para manejar 30 creators y multiples clientes simultaneos"
Subtitulo: "Cada herramienta, cada costo, cada decision"
Visual: Diagrama de arquitectura limpio sobre fondo oscuro

**Slide 2 — Por que necesitas un stack definido**
Texto: "Sin stack definido, tu agencia depende de que nadie se equivoque. Con stack definido, los errores son detectables y corregibles. La diferencia entre un negocio que escala y uno que depende de heroes."

**Slide 3 — Frontend: Next.js 15 + Vercel**
Texto: "Por que Next.js? Porque el App Router mezcla server components con client components. Los datos sensibles nunca salen del servidor. Los componentes interactivos cargan solo lo necesario. Vercel lo deploya automatico en cada push a main."
Costo: "$20 USD/mes (Pro)"

**Slide 4 — Base de datos: Supabase**
Texto: "Postgres en la nube con RLS activo. Cada cliente solo ve sus datos. pgvector para busqueda semantica de creators — es como un motor de recomendacion pero para talento. Real-time para notificaciones instantaneas. Backups diarios automaticos."
Costo: "$25 USD/mes (Pro)"

**Slide 5 — IA: Modelo por tarea**
Texto: "No uses el mismo modelo para todo. Claude Sonnet para briefs y chat — balance costo/capacidad optimo. Claude Opus para research profundo — cuando necesitas razonamiento real. Gemini Flash para clasificacion y routing — 10x mas barato para tareas simples."
Costo: "$30-60 USD/mes segun volumen"

**Slide 6 — Automatizacion: n8n self-hosted**
Texto: "n8n en nuestro propio VPS. Cero limite de ejecuciones, cero costo de licencia. Conecta Supabase, WhatsApp, Stripe, Wise, Meta Ads en workflows visuales. La curva de aprendizaje es real pero vale la pena."
Costo: "Incluido en VPS: $12 USD/mes"

**Slide 7 — Comunicacion: WhatsApp Cloud API + Jarvis v2**
Texto: "WhatsApp como canal unico para clientes, creators y alertas del sistema. Jarvis v2 es el agente de IA que lee y responde el 80% de los mensajes. El 20% que no puede manejar escala al equipo con contexto completo."
Costo: "Variable — primeras 1,000 conversaciones gratis"

**Slide 8 — Pagos: Wise + Mercury**
Texto: "Wise para transfers internacionales a creators de LATAM. Mercury para pagos en USD a creators de USA. Ambos con Idempotency-Key en cada request: imposible pagar dos veces el mismo trabajo. Aprendimos esto de la manera dificil."
Costo: "Fees de transferencia: ~1-2% por pago"

**Slide 9 — El costo total**
Tabla visual:
- Vercel Pro: $20
- Supabase Pro: $25
- VPS: $12
- Bunny CDN: $8-15
- Claude API: $30-60
- WhatsApp API: $5-12
- **Total: $100-144 USD/mes**
"Para manejar multiples clientes y 30 creators activos simultaneamente."

**Slide 10 — CTA**
Texto: "El stack no es el producto. El stack es lo que permite que el equipo se enfoque en lo que importa: conseguir clientes y entregar contenido de calidad."
CTA: "Sigue a Samuel para mas contenido tecnico de agencia UGC"

---

### CARRUSEL 02 — "Como construir tu propio SaaS operativo"
**Slides:** 9

**Slide 1:** "Construi Kreoon en 4 meses. Este es el proceso real, sin romanticismo."

**Slide 2 — Antes de escribir una linea de codigo**
Texto: "Documenta el proceso manual primero. Literalmente escribe en papel como funciona el proceso hoy, quienes lo hacen, cuanto tarda, donde falla. Si no puedes explicar el proceso manual, no puedes automatizarlo."

**Slide 3 — El MVP que realmente importa**
Texto: "No construyas todas las features. Construye el flujo critico de extremo a extremo. Para Kreoon: brief → creator asignado → video entregado. Solo eso. Todo lo demas fue iteracion despues."

**Slide 4 — Elige el stack que ya conoces**
Texto: "No es momento de aprender un framework nuevo. Usa lo que ya sabes. Yo ya conocia Next.js y Postgres. Supabase fue el unico nuevo — y tiene una documentacion excelente. La velocidad de ejecucion importa mas que el stack perfecto."

**Slide 5 — El primer deploy a produccion**
Texto: "Despliega algo funcional lo antes posible. Aunque sea solo con datos de prueba. La diferencia entre 'en desarrollo' y 'en produccion' es que en produccion el software te habla. Te dice donde duele."

**Slide 6 — Observabilidad desde el dia uno**
Texto: "Configura alertas antes de que las necesites. Logs estructurados, alertas de workflows que fallan, notificaciones cuando algo sale mal. Sin observabilidad, los bugs viven en silencio hasta que un cliente los encuentra primero."

**Slide 7 — El error que mas te va a costar**
Texto: "Sobreingenierar la primera version. El sistema de match de creators de Kreoon empezo con una query SQL simple de tres filtros. Hoy usa pgvector HNSW con re-ranking de Opus. Pero arrancar con vectores desde el dia uno habria sido tres meses extra de trabajo."

**Slide 8 — Cuando sabes que funciona**
Texto: "Cuando el equipo empieza a quejarse si el sistema cae. Ese es el momento. Antes de eso, eres el unico que lo usa. Despues de eso, tiene traccion real."

**Slide 9 — CTA**
Texto: "Kreoon no es el SaaS mas elegante del mercado. Es el que resuelve exactamente los problemas que teniamos. Eso vale mas que la arquitectura perfecta."
CTA: "Comenta si estas pensando en construir una herramienta interna"

---

### CARRUSEL 03 — "IA aplicada a produccion de contenido: lo que funciona y lo que no"
**Slides:** 8

**Slide 1:** "Llevamos 6 meses usando IA en produccion real de UGC. Esta es la verdad sin hype."

**Slide 2 — Lo que SI funciona: generacion de briefs**
Texto: "Darle a Claude Sonnet el producto, la audiencia y el objetivo, y pedirle que genere un brief estructurado. Ahorra 35 minutos por brief. El output requiere revision pero da el 80% del trabajo hecho."

**Slide 3 — Lo que SI funciona: analisis de hooks**
Texto: "Pasarle la transcripcion de un UGC existente y pedirle que evalue el hook en los primeros 3 segundos contra benchmarks de la industria. Identifica problemas que el ojo humano pasa por alto cuando llevas el dia mirando videos."

**Slide 4 — Lo que SI funciona: clasificacion de mensajes entrantes**
Texto: "Usar Gemini Flash para clasificar si un mensaje de WhatsApp es de ventas, operaciones o de un creator. Es rapido, es barato, y libera a Jarvis para solo activar el modelo caro cuando realmente se necesita."

**Slide 5 — Lo que NO funciona: reemplazar al creator**
Texto: "La IA puede sugerir angulos, hooks, guiones. No puede grabar el video. La autenticidad del UGC viene del ser humano frente a la camara. La IA es la herramienta de preparacion, no el producto."

**Slide 6 — Lo que NO funciona: automatizar la aprobacion de contenido**
Texto: "Intentamos que la IA evaluara si un video cumplia el brief antes de mandarlo al cliente. Resultado: la IA aprueba videos que el cliente rechaza y rechaza videos que el cliente ama. El gusto estetico no se puede automatizar todavia."

**Slide 7 — Lo que NO funciona: confiar sin verificar**
Texto: "Claude puede alucinar datos, inventar estadisticas, citar fuentes que no existen. Todo output de IA para clientes pasa por revision humana. La IA acelera, el humano verifica."

**Slide 8 — CTA**
Texto: "La IA no reemplaza el trabajo. Reemplaza el trabajo repetitivo para que el equipo pueda hacer el trabajo que importa."
CTA: "Comenta que proceso de tu agencia crees que podria automatizarse"

---

### CARRUSEL 04 — "Automatizaciones n8n que todo operador de agencia deberia tener"
**Slides:** 9

**Slide 1:** "Los 6 workflows de n8n que mas impacto han tenido en nuestra operacion. Con descripcion de como funcionan."

**Slide 2 — Workflow 1: Captura de lead → CRM**
Texto: "El formulario del landing llega a n8n. n8n hace upsert del lead en Supabase, inicia la conversacion con Jarvis en WhatsApp, y envia el email de bienvenida con Resend. Sin intervencion humana. El equipo de ventas solo entra cuando el lead califica."

**Slide 3 — Workflow 2: Brief aprobado → WhatsApp al creator**
Texto: "Cuando un brief cambia a 'aprobado' en Supabase, n8n busca el creator asignado, arma el mensaje con el brief completo y lo manda por WhatsApp. El creator tiene toda la informacion en un solo mensaje. Sin copiar y pegar."

**Slide 4 — Workflow 3: Booking de discovery call**
Texto: "Cal.com manda un webhook cuando alguien agenda una llamada. n8n recibe el evento, persiste el booking en Supabase, dispara el workflow de research de la empresa del lead con Perplexity + Claude Opus, y manda la confirmacion al lead. Alexander llega a la llamada con un dossier de la empresa preparado."

**Slide 5 — Workflow 4: Pago de Stripe recibido**
Texto: "Cuando Stripe confirma el pago de un cliente, n8n activa al cliente en Supabase, notifica a Diana para arrancar el onboarding, y manda el mensaje de bienvenida al cliente por WhatsApp via Jarvis. El cliente siente que todo es fluido porque lo es."

**Slide 6 — Workflow 5: Pago a creator (con idempotencia)**
Texto: "Cuando una entrega es aprobada y el cliente ha pagado, n8n calcula la idempotency key, inserta el pago en Supabase con estado 'initiating', llama a Wise o Mercury con el Idempotency-Key header, y actualiza el estado progresivamente. Solo cuando el banco confirma el pago, notificamos al creator."

**Slide 7 — Workflow 6: Reporte mensual automatico**
Texto: "El primer dia de cada mes a las 6am, n8n corre el reporte para cada cliente activo: pull de metricas de Meta Ads, generacion de narrativa con Claude Sonnet, PDF con react-pdf, subida a Bunny CDN, y WhatsApp al cliente con el link. El cliente recibe su reporte antes de que el equipo despierte."

**Slide 8 — El patron comun**
Texto: "Todos estos workflows comparten tres caracteristicas: trigger claro, manejo de errores obligatorio, y notificacion al equipo si algo falla. Un workflow sin rama de error no esta terminado."

**Slide 9 — CTA**
Texto: "No empieces con los seis. Empieza con el que mas tiempo te quita hoy. Para nosotros fue el brief al creator. 20 minutos por brief, 15 briefs al mes = 5 horas. Ese fue el primero."
CTA: "Comenta cual seria el primero que construirias"

---

### CARRUSEL 05 — "Por que construimos sobre Supabase y no Firebase"
**Slides:** 7

**Slide 1:** "La decision de base de datos mas importante que tomamos. Por que Supabase y no Firebase."

**Slide 2 — La razon principal: SQL vs NoSQL**
Texto: "Firebase es NoSQL. Supabase es Postgres. Para una agencia, los datos tienen relaciones reales: un cliente tiene briefs, un brief tiene un creator asignado, una entrega tiene un pago. SQL maneja esas relaciones nativamente. NoSQL las complica."

**Slide 3 — pgvector: la razon tecnica decisiva**
Texto: "Supabase soporta pgvector, la extension de Postgres para busqueda vectorial. Esto nos permite hacer match semantico de creators para cada brief sin necesitar una base de datos vectorial separada como Pinecone. Todo en un solo lugar."

**Slide 4 — RLS: seguridad a nivel de fila**
Texto: "Row Level Security de Supabase permite que las politicas de acceso vivan en la base de datos, no en el codigo de la aplicacion. Aunque haya un bug en el backend, los datos de un cliente no pueden ser vistos por otro. Firebase no tiene esto."

**Slide 5 — Migraciones vs colecciones**
Texto: "Con Supabase podemos hacer migraciones de schema versionadas. Cada cambio en la estructura de datos queda registrado en Git. Con Firebase, el schema es implicito — vive solo en el codigo. En un equipo, eso es una receta para inconsistencias."

**Slide 6 — Costo comparativo**
Texto: "Supabase Pro: $25 USD/mes para lo que necesitamos. Firebase Blaze: pago por uso, dificil de predecir. Para startups que quieren previsibilidad de costos, Supabase es mas facil de presupuestar."

**Slide 7 — CTA**
Texto: "Firebase es excelente para ciertos casos. Para una agencia con relaciones de datos complejas, auditoria, y necesidad de busqueda semantica, Supabase fue la decision correcta para nosotros."
CTA: "Comenta si usas Supabase o Firebase y por que"

---

### CARRUSEL 06 — "Los 5 errores de seguridad mas comunes en startups Next.js"
**Slides:** 8

**Slide 1:** "Auditamos nuestro propio codigo. Encontramos 5 errores de seguridad serios. Aqui estan para que no los cometas."

**Slide 2 — Error 1: process.env.FOO! (non-null assertion)**
Texto: "Usar el operador ! para decirle a TypeScript 'confia en mi, esta variable existe'. Si la variable no existe en produccion, el error llega en runtime, no en build time. Fix: crear requireEnv('FOO') que lanza un error descriptivo si la variable no existe."

**Slide 3 — Error 2: AbortController fuera del loop de reintentos**
Texto: "Crear el timeout una vez para toda la operacion de retry. En el segundo intento, el signal ya esta abortado. El request falla inmediatamente aunque el servidor este disponible. Fix: crear un nuevo AbortController dentro de cada iteracion del loop."

**Slide 4 — Error 3: Validacion de webhook con === en vez de timingSafeEqual**
Texto: "Comparar signatures de HMAC con === es vulnerable a timing attacks. Un atacante puede inferir cuantos caracteres son correctos por el tiempo de respuesta. Fix: usar crypto.timingSafeEqual que siempre tarda el mismo tiempo sin importar donde diffieren las strings."

**Slide 5 — Error 4: Pagos sin idempotencia**
Texto: "Si el pago se confirma pero el webhook de respuesta llega tarde, el sistema puede intentar pagar de nuevo. Fix: calcular una idempotency_key unica por pago (sha256 del creator_id + delivery_id + type) y usarla como header en el request a Wise o Mercury."

**Slide 6 — Error 5: Parseo de respuestas de IA sin validacion**
Texto: "Confiar en que Claude siempre devuelve el formato correcto. En produccion, los modelos de IA pueden devolver formatos inesperados. Fix: usar Zod para validar el output del modelo antes de usarlo. Si el schema no coincide, el error es descriptivo y controlado."

**Slide 7 — El patron comun**
Texto: "Todos estos errores son silenciosos en desarrollo y ruidosos en produccion. La solucion es siempre la misma: hacer los errores explicitos, rapidos y descriptivos. Fail fast, fail loud."

**Slide 8 — CTA**
Texto: "Corrimos supabase db lint y una auditoria manual de todos nuestros clientes HTTP. Te recomiendo hacer lo mismo antes de escalar."
CTA: "Guarda este carrusel para tu proxima auditoria"

---

### CARRUSEL 07 — "Jarvis v2: como construir un agente de WhatsApp con IA"
**Slides:** 9

**Slide 1:** "Como construimos Jarvis, el agente de IA que responde el 80% de los mensajes de WhatsApp de nuestra agencia."

**Slide 2 — La arquitectura basica**
Texto: "WhatsApp Cloud API manda un webhook cuando llega un mensaje. n8n recibe el webhook, extrae el texto, lo manda a Claude Sonnet con el contexto de la conversacion, y manda la respuesta de vuelta por la API. En menos de 3 segundos."

**Slide 3 — El primer problema: routing**
Texto: "No todos los mensajes necesitan el mismo modelo. Un mensaje de 'hola' no necesita Claude Sonnet. Una pregunta tecnica compleja si. Solucion: Gemini Flash clasifica el intent primero (ventas / operaciones / creator / soporte). Segun el intent, activa el modelo correcto."

**Slide 4 — El segundo problema: memoria**
Texto: "Sin memoria, cada mensaje es una conversacion nueva. Jarvis le pide el nombre al mismo lead tres veces. Solucion: guardar cada mensaje en Supabase con el numero de WhatsApp como clave. Antes de responder, cargar el historial de la conversacion."

**Slide 5 — El tercer problema: escalamiento al humano**
Texto: "Jarvis no puede resolverlo todo. Necesita saber cuando escalar. Solucion: si el intent es 'queja', 'precio especifico', 'contrato' o si la confianza de clasificacion es baja, Jarvis responde que va a pasar el caso con un humano y manda una alerta al equipo con el contexto completo."

**Slide 6 — El cuarto problema: fallback de modelo**
Texto: "Si Claude esta caido o lento, el agente no puede quedar mudo. Solucion: cadena de fallback configurada en el AI Gateway. claude-sonnet-4.6 es el primero. Si falla, intenta gpt-5. Si falla, gemini-3.1-pro-preview. El usuario nunca ve el error."

**Slide 7 — Metricas de Jarvis**
Texto: "80% de mensajes resueltos sin intervencion humana. Tiempo de respuesta promedio: 2.3 segundos. El 20% que escala: principalmente negociaciones de precio y quejas. El equipo revisa esos 20% en bloques de 20 minutos, dos veces al dia."

**Slide 8 — Lo que no hariamos de nuevo**
Texto: "Construir el sistema de clasificacion de intent desde cero con keywords. Tarda mucho y es fragil. Hoy usariamos un modelo pequeno desde el inicio para clasificar. Habriamos ahorrado dos semanas de trabajo."

**Slide 9 — CTA**
Texto: "Jarvis no es magia. Es n8n + WhatsApp API + Claude + Supabase bien conectados. La magia esta en la arquitectura, no en la IA."
CTA: "Comenta JARVIS si quieres el diagrama de arquitectura completo"

---

### CARRUSEL 08 — "El roadmap de Kreoon para 2026"
**Slides:** 8

**Slide 1:** "Lo que viene en Kreoon este ano. Features confirmadas, features en evaluacion, y una que descartamos."

**Slide 2 — Feature 1 (Q2): Modulo de briefs publico**
Texto: "Hoy los briefs los generamos internamente. En Q2, los clientes van a poder generar sus propios briefs directamente desde su portal. Con guia paso a paso y la IA generando el borrador. El equipo solo aprueba."

**Slide 3 — Feature 2 (Q2): Dashboard de metricas en tiempo real**
Texto: "Hoy el reporte de metricas se genera una vez al mes. En Q2, los clientes van a tener un dashboard en tiempo real con sus metricas de Meta Ads, videos publicados, y estado de cada entrega."

**Slide 4 — Feature 3 (Q3): Creator self-service**
Texto: "Hoy Diana coordina con cada creator por WhatsApp. En Q3, los creators van a tener su propio portal para ver sus briefs activos, subir entregables, y ver el estado de sus pagos. Sin intermediario humano para lo operativo."

**Slide 5 — Feature 4 (Q3): Match de creators con IA explicable**
Texto: "Hoy el match de creators muestra un score. En Q3, va a mostrar ademas por que ese creator es el indicado: que videos previos son similares al brief, que metricas de entrega tiene, cuantas revisiones pide en promedio."

**Slide 6 — Feature evaluando: integracion con TikTok Ads**
Texto: "Varios clientes nos han pedido metricas de TikTok Ads, no solo Meta. Estamos evaluando la API. El problema: la API de TikTok para ads es menos madura que la de Meta y requiere aprobacion. Lo evaluamos para Q4."

**Slide 7 — Feature descartada: IA para revisar videos automaticamente**
Texto: "Intentamos que la IA revisara si un video cumplia el brief antes de mandarlo al cliente. Despues de tres semanas de pruebas, el resultado era inconsistente. La IA no tiene el criterio estetico que tiene el equipo. Lo descartamos por ahora."

**Slide 8 — CTA**
Texto: "Kreoon es el cliente cero de si mismo. Cada feature que construimos resuelve un problema real que vivimos en nuestra agencia. Esa es la ventaja de construir tu propia herramienta."
CTA: "Que feature te gustaria ver en una plataforma de gestion UGC?"

---

### CARRUSEL 09 — "Costo real de la IA en una agencia: mes a mes"
**Slides:** 7

**Slide 1:** "Cuanto nos cuesta realmente la IA al mes. Cada modelo, cada uso, cada numero."

**Slide 2 — Claude Sonnet: briefs y chatbot**
Texto: "Usamos Claude Sonnet para generacion de briefs y el chatbot de ventas Lia. Promedio de tokens: 2,000 in + 1,500 out por brief. Con 20 briefs al mes y el chatbot activo, el costo es aproximadamente $35-50 USD/mes."

**Slide 3 — Claude Opus: dossiers de investigacion**
Texto: "Claude Opus solo lo usamos para research profundo de marca cuando un lead agenda discovery call. Es el modelo mas caro pero el mas capaz para sintesis de investigacion. Usamos entre 8 y 15 dossiers al mes: $15-25 USD/mes."

**Slide 4 — Gemini Flash: clasificacion y routing**
Texto: "Gemini Flash clasifica el intent de cada mensaje de WhatsApp antes de activar un modelo mas caro. Es el mas economico del stack. Con 500-800 clasificaciones al mes, el costo es menor a $3 USD/mes."

**Slide 5 — text-embedding-3-small: embeddings de creators**
Texto: "Generamos embeddings de cada creator una vez cuando se registra. Los actualizamos solo cuando cambia su bio o portafolio. Con 30 creators activos y actualizaciones mensuales, el costo de embeddings es menor a $1 USD/mes."

**Slide 6 — Total y ROI**
Texto: "Total IA: $55-80 USD/mes. Lo que genera: 40 horas de trabajo manual automatizado al mes. Si el valor del tiempo del equipo es $20 USD/hora, el ROI de la IA es $800 en ahorro por $70 en costo. 11x de retorno."

**Slide 7 — CTA**
Texto: "La IA no es cara si la usas con precision. El error es activar el modelo mas caro para tareas que puede resolver el mas economico."
CTA: "Guarda esto para calcular el ROI de IA en tu operacion"

---

### CARRUSEL 10 — "De 0 a sistema de pagos automatico para creators: el proceso"
**Slides:** 8

**Slide 1:** "Como construimos el sistema de pagos automaticos para creators. Los errores que cometimos y como los corregimos."

**Slide 2 — El problema inicial**
Texto: "Antes pagabamos a cada creator manualmente. Brian entraba a Wise, buscaba al creator, ingresaba el monto, confirmaba la transferencia. Por cada pago: 8-12 minutos. Con 15-20 pagos al mes: entre 2 y 4 horas de trabajo manual."

**Slide 3 — El primer intento (mal)**
Texto: "Construimos un script que tomaba los pagos pendientes de Supabase y los ejecutaba en Wise. Funciono en staging. En produccion, el primer mes el webhook de confirmacion de Wise llego tarde y el script interpreto que habia fallado y ejecuto el pago dos veces. Costo: $120 duplicados."

**Slide 4 — La solucion: idempotencia**
Texto: "Cada pago ahora tiene una idempotency_key unica: sha256(creator_id + delivery_id + tipo_pago). Esta clave va como header en el request a Wise. Si se manda el mismo request dos veces, Wise detecta la clave duplicada y devuelve el resultado del primero sin ejecutar uno nuevo."

**Slide 5 — Estados progresivos**
Texto: "El pago no es binario (pendiente / pagado). Tiene estados: initiating → submitted → sent → failed. Solo cuando el estado llega a 'sent' (confirmado por el banco), marcamos la entrega como pagada y notificamos al creator. Antes de eso, todo es provisional."

**Slide 6 — El manejo de errores**
Texto: "Si algo falla en cualquier paso, el workflow envia un WhatsApp a Brian y Alexander con el creator, el monto, el ID de la transaccion y el error especifico. Sin este manejo, un pago fallido puede quedar en limbo y el creator no recibe su dinero."

**Slide 7 — El resultado**
Texto: "Hoy: 2 horas de trabajo manual por mes → 15 minutos. Solo revisamos que los pagos esten en estado 'sent'. El sistema maneja el resto. Con el volumen actual, esto escala a 50 creators sin necesitar mas tiempo del equipo."

**Slide 8 — CTA**
Texto: "Los pagos son el momento de la verdad con los creators. Si el pago falla o se retrasa, pierdes confianza. La automatizacion con idempotencia es la unica forma de hacerlo confiable a escala."
CTA: "Comenta si manejas pagos a multiples creators y como lo haces"

