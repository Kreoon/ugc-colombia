## 5. GUIONES LINKEDIN POSTS (12 posts)

### POST 01 — El bug que casi nos cuesta $120
"El primer mes de pagos automaticos a creators, el sistema pago dos veces al mismo creator.

No por un error de logica. Por un error de arquitectura.

El webhook de confirmacion de Wise llego 35 segundos tarde. El sistema interpreto silencio como fallo. Lanzo un segundo pago.

$120 duplicados.

El creator fue honesto. Nos devolvio uno.

Pero eso no siempre va a pasar.

La solucion: idempotency keys. Cada pago genera una clave unica basada en el creator, la entrega y el tipo de pago. Si se intenta ejecutar el mismo pago dos veces, el proveedor detecta la clave duplicada y devuelve el resultado del primero.

Sin ejecutar nada nuevo.

La leccion mas cara que me ha dado Kreoon:
Los pagos no son operaciones. Son compromisos. Y los compromisos necesitan garantias, no esperanzas.

Si manejas pagos programaticos: implementa idempotencia desde el dia uno. No cuando ya tengas el problema."

---

### POST 02 — Por que construi Kreoon en vez de usar Airtable
"Me preguntan mucho: 'Por que no usas Airtable / Notion / Monday?'

La respuesta corta: porque ninguno puede hacer lo que necesitamos.

La respuesta larga:

Airtable no puede calcular una idempotency key para un pago a Wise.
Notion no tiene pgvector para busqueda semantica de creators.
Monday no puede generar un brief con IA y persistirlo en una base de datos relacional con RLS.

Estas herramientas son excelentes para lo que hacen: organizacion visual de datos. No son un backend de aplicacion.

Kreoon es el backend de nuestra operacion. Tiene reglas de negocio reales, automatizaciones que dependen unas de otras, y datos que tienen relaciones entre si.

Eso requiere codigo.

No porque sea mas elegante. Sino porque es la unica forma de hacerlo exactamente como lo necesitamos.

El costo de construirlo: 4 meses de trabajo.
El beneficio: 40 horas al mes de operacion que hoy son automaticas.

A veces la herramienta correcta es la que no existe todavia."

---

### POST 03 — La regla del modelo correcto para la tarea correcta
"Cometemos el error de usar el modelo de IA mas caro para todo.

Es como usar un bisturi para cortar el pan.

En nuestra agencia:

Gemini Flash: clasifica el intent de un mensaje de WhatsApp. Cuesta 10 veces menos que Sonnet. Para esa tarea, el resultado es identico.

Claude Sonnet: genera briefs de UGC y maneja el chatbot de ventas. Balance perfecto entre capacidad y costo.

Claude Opus: research profundo de marca para dossiers antes de una discovery call. Solo aqui justificamos el costo mas alto.

text-embedding-3-small de OpenAI: genera los vectores de creators para el sistema de match. No necesitas un modelo de lenguaje para embeddings.

Total de IA al mes: entre $55 y $80 USD.
Ahorro de tiempo: 40 horas.
ROI aproximado: 11x.

La IA es cara si la usas sin precision.
Es barata si cada modelo hace exactamente la tarea para la que es optimo."

---

### POST 04 — Supabase RLS: el escudo que casi no activamos
"Teniamos RLS desactivado en produccion durante dos semanas sin saberlo.

No porque no lo supieramos. Sino porque activamos RLS en la tabla y nos olvidamos de crear las politicas.

En Supabase, RLS sin politicas = tabla completamente bloqueada. Nadie puede leer nada. Ni el admin.

Creamos las politicas. Listo.

Pero nos hizo pensar: ¿cuantos desarrolladores tienen RLS activado con politicas mal escritas que exponen datos de un usuario a otro?

Corrimos supabase db lint. Encontramos tres tablas con RLS activo pero sin politicas correctas:
- chat_conversations
- chat_messages  
- leads

Las tres con datos reales de clientes potenciales.

Fix: 20 minutos.

Ahora correr el lint es parte del checklist antes de cada deploy a produccion.

Si tienes una app en Supabase y nunca has corrido supabase db lint, hazlo hoy. Es gratis. Son cinco minutos. Puede salvarte de una filtracion."

---

### POST 05 — n8n vs Zapier: la decision que nos ahorro $3,600 al ano
"Estabamos evaluando automatizaciones para la agencia.

Zapier: $299 USD/mes para el plan que necesitabamos (workflows multi-paso, ejecuciones ilimitadas).

n8n self-hosted: $0 en licencia. Solo el servidor: $12 USD/mes.

$287 de diferencia al mes. $3,444 al ano.

Dicho asi parece obvio. Pero hay que ser honesto con los trade-offs:

n8n self-hosted requiere que alguien lo mantenga. Actualizaciones, backups, monitoreo. Para un equipo sin dev, ese costo oculto puede ser mayor que la diferencia de precio.

Para nosotros, yo soy el dev. El costo de mantenimiento es parte de mi trabajo. La eleccion fue clara.

Pero si no tienes un dev en el equipo, Zapier o Make pueden ser la decision correcta. El precio de la conveniencia tiene sentido cuando el tiempo del alternativo cuesta mas.

La moraleja no es 'usa n8n siempre'. Es 'calcula el costo total, no solo la licencia'.

Para nosotros: n8n self-hosted en un VPS de $12 al mes. 10 workflows criticos corriendo. Cero limite de ejecuciones."

---

### POST 06 — El chatbot que no recuerda nada es un chatbot malo
"Teniamos un chatbot de ventas en el sitio web.

Lia, nuestra consultora virtual de IA.

El problema: cada vez que un lead volvia, Lia empezaba la conversacion desde cero. 

'Hola! Cuales son tus necesidades de contenido?'

Al mismo lead que habia tenido una conversacion de 20 minutos el dia anterior.

Un lead que ya hablo contigo y al que le preguntas de nuevo quien es... no vuelve.

El fix fue conceptualmente simple: persistir cada mensaje en Supabase con el numero de telefono o el email como clave. Cuando el lead vuelve, cargar el historial.

Tecnicamente: tres horas de trabajo.

El resultado: los leads que regresan ahora ven a Lia retomar la conversacion con naturalidad. 'Bienvenido de nuevo. La ultima vez hablabamos de tu presupuesto de UGC para Q2...'

Un lead que regresa es un lead caliente. Tratarlo como si fuera nuevo es tirar esa temperatura a la basura.

La memoria en un sistema de IA no es un detalle tecnico. Es respeto al usuario."

---

### POST 07 — Cuanto cuesta realmente tener un agente de IA en WhatsApp
"Numeros reales de lo que nos cuesta Jarvis, nuestro agente de WhatsApp, al mes:

WhatsApp Cloud API: $5-12 USD (segun volumen de conversaciones)
Claude Sonnet para respuestas: incluido en el costo de IA del stack
Gemini Flash para clasificacion de intent: menos de $3 USD
VPS donde corre n8n que lo orquesta: proporcional, aprox $3 USD
Total: entre $11 y $18 USD al mes.

Lo que hace:
- Responde el 80% de los mensajes sin intervencion humana
- Califica leads con preguntas de BANT
- Coordina con creators sobre entregas
- Alerta al equipo cuando un caso necesita atencion humana
- Funciona 24/7, incluso cuando el equipo duerme

Antes del agente: 2 horas diarias del equipo en mensajes.
Hoy: 20 minutos en los casos que Jarvis escala.

$15 al mes por 110 minutos diarios recuperados.

No es magia. Es n8n + WhatsApp API + Claude + Supabase bien conectados. La complejidad esta en la arquitectura, no en el presupuesto."

---

### POST 08 — La diferencia entre una automatizacion que funciona y una que falla silenciosamente
"Construi mi primera automatizacion de pagos hace ocho meses.

Funcionaba perfectamente en staging.

En produccion, fallaba silenciosamente cada vez que Wise tardaba mas de 10 segundos en responder.

No sabia que fallaba. El log no decia nada. El pago quedaba en estado 'pendiente' para siempre. El creator nunca recibia su dinero. Yo no recibia ninguna alerta.

La primer vez que lo descubri fue cuando un creator me escribio preguntando por su pago tres dias despues de la fecha acordada.

El problema: el catch del error solo hacia console.log. En un servidor de produccion, ese log desaparece en el ruido.

La solucion: rama de error obligatoria en cada workflow. Si algo falla, un WhatsApp llega a mi telefono con el creator, el monto, el ID de transaccion y el error exacto. En menos de 30 segundos.

Una automatizacion sin manejo de errores no esta terminada. Solo esta esperando fallar en el momento mas inoportuno.

Regla que aplico a todo workflow nuevo: si no tengo una alerta cuando falla, no existe para mi."

---

### POST 09 — Por que los developers en agencias creativas son el activo mas subestimado
"Las agencias creativas hablan mucho de sus creativos.

Poco hablan de los developers que construyen la infraestructura que permite que esos creativos trabajen.

En UGC Colombia:

Sin el brief generator de IA, cada brief tarda 45 minutos. Con el, tarda 10. Eso son 35 minutos por brief, 700 minutos al mes con 20 briefs. Casi 12 horas.

Sin el sistema de match de creators, Diana busca manualmente quien encaja con cada proyecto. Con el, son 8 segundos y cinco candidatos ordenados por relevancia.

Sin los workflows de n8n, alguien del equipo pasa 2-4 horas al mes procesando pagos a creators. Con ellos, son 15 minutos de revision.

El dev de una agencia creativa no es soporte. Es multiplicador.

Cada hora de desarrollo bien invertida puede liberar 10 horas de trabajo operativo al mes.

El problema es que ese ROI es invisible. Nadie celebra que el sistema funciono sin fallos. Solo se nota cuando algo sale mal.

A los founders de agencias creativas: inviertan en infraestructura tecnologica. No como gasto. Como capital de eficiencia."

---

### POST 10 — La decision que no tomaria de nuevo al construir Kreoon
"Si pudiera volver al inicio de Kreoon, no comenzaria con el match de creators con vectores.

Tarde tres semanas construyendo el sistema de busqueda semantica con pgvector. Es tecnicamente interesante. Funciona bien.

Pero en los primeros dos meses, teniamos 8 creators en la base de datos.

Con 8 creators, la busqueda vectorial es overkill total. Una query SQL con tres filtros (nicho, disponibilidad, tier) hubiera dado el mismo resultado en una fraccion del tiempo de desarrollo.

La leccion: la solucion tecnica correcta depende del tamano del problema hoy, no del tamano del problema que imaginas tener en dos anos.

Hoy, con 30 creators y creciendo, el sistema vectorial si tiene sentido. Hubiera tenido sentido construirlo en el mes tres, no en el mes uno.

El perfeccionismo tecnico en startups tempranas no es ambicion. Es miedo a lanzar algo simple.

Lanza simple. Itera rapido. Sofistica cuando el tamano del problema lo justifique."

---

### POST 11 — Como sabemos que una automatizacion esta funcionando bien
"Hay una metrica que me gusta mas que cualquier otra para medir si una automatizacion esta funcionando:

Cuantas veces al mes alguien del equipo la menciona?

Si nadie la menciona, esta funcionando perfectamente. Es invisible. Hace su trabajo y no molesta a nadie.

Si alguien la menciona mucho, esta fallando o creando friccion.

Las mejores automatizaciones de Kreoon son las que el equipo olvida que existen:

El workflow de brief al creator: nadie sabe que existe. Los creators reciben el brief. Eso es todo lo que importa.

El reporte mensual automatico: los clientes lo reciben el dia 1. El equipo no hace nada ese dia.

Las alertas de Jarvis: llegan solo cuando se necesitan. El equipo no revisa WhatsApp constantemente buscando si hay algo urgente.

La invisibilidad es el estandar de oro.

Si tienes que explicarle a tu equipo como usar una automatizacion, todavia no esta terminada."

---

### POST 12 — El stack que usaria si empezara una agencia UGC desde cero hoy
"Si empezara una agencia UGC desde cero hoy, con cero capital tecnico:

Mes 1-2: Notion para procesos, Google Drive para archivos, WhatsApp manual. Costo: $0. El foco es conseguir los primeros clientes y entender el flujo operativo real antes de automatizarlo.

Mes 3: Supabase free tier para la base de datos de creators y clientes. Primer script de n8n para automatizar el envio de briefs. Costo: $12 (VPS para n8n).

Mes 4-5: WhatsApp Cloud API para comunicacion estructurada. Template de mensajes para briefs y actualizaciones. Costo: $5-15.

Mes 6: Primer modelo de IA para generacion de briefs. Claude Sonnet via API. Costo adicional: $20-30 al mes segun volumen.

Mes 8+: Plataforma propia o herramienta consolidada si el volumen lo justifica.

El error mas comun: invertir en stack tecnologico antes de tener clientes reales.

El stack no consigue clientes. El stack sirve a los clientes que ya tienes.

Construye en el orden correcto."

---

## 6. GUIONES YOUTUBE LARGOS (3 videos de 10-15 min)

### VIDEO YOUTUBE 01 — "El stack tecnologico completo de una agencia UGC 2026"
**Duracion objetivo:** 12 minutos
**Formato:** Tutorial con screen recording + talking head
**Estilo:** Educativo, denso, bien estructurado

**Chapters:**
- 0:00 — Intro: por que importa el stack de tu agencia
- 1:00 — El diagrama de arquitectura completo
- 2:30 — Frontend: Next.js 15 y por que App Router
- 4:00 — Base de datos: Supabase, RLS, y pgvector
- 5:30 — IA: modelo por tarea, no un modelo para todo
- 7:00 — Automatizacion: n8n self-hosted vs Zapier
- 8:30 — Comunicacion: WhatsApp Cloud API y Jarvis
- 10:00 — Pagos: Wise, Mercury, e idempotencia
- 11:00 — Costo total del stack
- 11:40 — CTA y recursos

---

**GUION COMPLETO — VIDEO 01**

**[0:00 — 0:55] INTRO**

"Si tienes una agencia de UGC y todavia manejas todo con Google Sheets, Notion y WhatsApp a mano, este video es para ti.

Voy a mostrar el stack tecnologico completo que usamos en UGC Colombia para manejar multiples clientes y 30 creators simultaneamente.

No es el stack mas sofisticado del mundo. Es el stack que funciona para nuestro tamano de operacion hoy, que cuesta menos de 150 dolares al mes, y que nos ahorra 40 horas de trabajo manual cada mes.

Me llamo Samuel, soy el tech lead de UGC Colombia. Construi Kreoon, nuestra plataforma de gestion, desde cero. En este video voy a abrirte el capo y mostrarte exactamente como funciona todo.

Quedate hasta el final porque en el minuto 11 muestro el costo exacto de cada herramienta. Nada de estimados vagos."

**[0:55 — 1:45] DIAGRAMA DE ARQUITECTURA**

"Empecemos con el panorama general antes de entrar al detalle.

[Mostrar diagrama en pantalla]

En el centro esta Next.js — es nuestra aplicacion web. El frontend que ven los clientes y el backend que procesa toda la logica.

Debajo esta Supabase — la base de datos. Aqui vive toda la informacion: clients, creators, briefs, deliveries, pagos, conversaciones.

A la derecha estan los servicios de IA: Claude Sonnet para briefs y chat, Claude Opus para research de marca, Gemini Flash para clasificacion de mensajes.

A la izquierda esta n8n — el motor de automatizacion. Es lo que conecta todo: cuando algo pasa en Supabase, n8n reacciona y ejecuta una accion en WhatsApp, Stripe, Wise, o Meta Ads.

Abajo estan los proveedores externos: WhatsApp para comunicacion, Stripe para cobrar a clientes, Wise y Mercury para pagar a creators, Meta Ads para metricas de campanas, y Bunny CDN para almacenar videos.

Este es el mapa. Ahora vamos pieza por pieza."

**[1:45 — 3:15] NEXT.JS 15**

"El frontend esta construido en Next.js 15 con el App Router.

Por que Next.js y no algo mas simple?

Tres razones concretas.

Primera: el App Router de Next.js 15 te deja mezclar componentes de servidor con componentes de cliente en la misma aplicacion. Los componentes de servidor pueden hacer queries directas a la base de datos sin pasar por una API. Eso elimina una capa de complejidad.

[Demo: mostrar un Server Component haciendo una query a Supabase]

Segunda: las Server Actions de Next.js reemplazan la mayoria de los API routes para mutaciones. En vez de crear un endpoint POST para actualizar el estado de un brief, creas una Server Action. El form del cliente llama a esa funcion directamente. Mas simple, menos codigo.

[Demo: mostrar una Server Action simple]

Tercera: Vercel — la empresa detras de Next.js — tiene la mejor integracion para deployar Next.js. Push a main y en 2 minutos el deploy esta en produccion automaticamente.

El costo de Vercel Pro: 20 dolares al mes. Incluye funciones serverless sin limite de tiempo de ejecucion, dominio personalizado, analytics, y CI/CD automatico.

Para el tamano de nuestra operacion, es la inversion mas rentable del stack."

**[3:15 — 4:45] SUPABASE**

"La base de datos es Supabase. Es Postgres en la nube con tres features que para nosotros son indispensables.

Primera: Row Level Security. RLS permite que las politicas de acceso a los datos vivan en la base de datos, no en el codigo de la aplicacion. Esto significa que aunque haya un bug en el backend, los datos de un cliente nunca pueden ser vistos por otro cliente.

[Demo: mostrar una politica de RLS en el SQL editor de Supabase]

Asi se ve una politica de RLS. Esta dice: 'el usuario solo puede leer las filas donde el client_id coincide con su ID de autenticacion'. Si alguien intenta leer los datos de otro cliente, Supabase devuelve una lista vacia. No un error. Una lista vacia, como si esos datos no existieran.

Segunda feature: pgvector. Es una extension de Postgres que permite almacenar vectores matematicos y hacer busquedas por similitud semantica.

[Demo: mostrar la tabla de creators con la columna de embedding]

Cada creator en nuestra base de datos tiene un embedding — un vector de 1,536 numeros que representa semanticamente su perfil: su nicho, su estilo, su experiencia. Cuando llega un brief nuevo, calculamos el vector del brief y buscamos los creators cuyos vectores son mas similares.

Es como Google pero para talento humano.

Tercera: real-time. Cuando un cliente aprueba un video en el portal, la notificacion llega al team dashboard en tiempo real sin necesidad de recargar la pagina. Supabase maneja eso con WebSockets automaticamente.

Costo de Supabase Pro: 25 dolares al mes."

**[4:45 — 6:15] IA: MODELO POR TAREA**

"La IA es la parte del stack que mas preguntas genera. La gente asume que usamos un solo modelo para todo. Error.

Tenemos cuatro modelos en el stack y cada uno hace exactamente una cosa.

[Mostrar tabla en pantalla]

Primero: Claude Sonnet 4.6 de Anthropic. Lo usamos para dos cosas: generar briefs de UGC y manejar el chatbot de ventas. Por que Sonnet y no Opus? Porque para briefs y chat, Sonnet da resultados excelentes a un tercio del costo de Opus.

Segundo: Claude Opus 4.6. Solo lo activamos para los dossiers de investigacion de marca. Cuando un lead agenda una discovery call, Opus hace una investigacion profunda de la empresa: industria, competidores, oportunidades de UGC. Este es el caso donde el razonamiento profundo justifica el costo extra.

Tercero: Gemini Flash de Google. Lo usamos exclusivamente para clasificar el intent de mensajes de WhatsApp. Un mensaje llega. Gemini decide si es de ventas, operaciones, o de un creator. En menos de un segundo. A una fraccion del costo de Claude.

[Demo: mostrar la clasificacion de un mensaje en tiempo real]

Cuarto: text-embedding-3-small de OpenAI. Solo para generar los vectores de creators. No necesitas un modelo de lenguaje para esto. Este modelo especializado en embeddings hace el trabajo perfectamente a un costo minimo.

El resultado: la IA nos cuesta entre 55 y 80 dolares al mes. Con precision de uso, no con gasto indiscriminado."

**[6:15 — 7:30] N8N**

"n8n es el motor que conecta todo. Es como Zapier pero self-hosted — lo corremos en nuestro propio servidor.

Por que n8n y no Zapier?

[Mostrar precio de Zapier vs costo de n8n]

Zapier para nuestro caso de uso cuesta 299 dolares al mes. n8n self-hosted: cero de licencia, 12 dolares de VPS. La diferencia es de 287 dolares al mes.

Los workflows que corren en n8n:

[Demo: abrir el canvas de n8n y mostrar los 10 workflows activos]

Uno: lead capture. Cuando alguien llena el formulario del landing, n8n hace el upsert en Supabase, activa a Jarvis para iniciar la conversacion de WhatsApp, y manda el email de bienvenida.

Dos: brief al creator. Cuando un brief se aprueba en Kreoon, n8n busca el creator asignado y le manda el brief completo por WhatsApp en 4 segundos.

Tres: pagos a creators. Cuando una entrega es aprobada, n8n calcula la idempotency key, ejecuta el pago en Wise o Mercury, y actualiza el estado progresivamente hasta confirmar que el dinero llego.

Cuatro: reportes mensuales. El primero de cada mes a las 6am, n8n genera el reporte de metricas para cada cliente activo, lo convierte en PDF, lo sube a Bunny CDN, y le manda el link por WhatsApp.

Estos workflows corren solos. El equipo no hace nada. Eso es el punto."

**[7:30 — 8:45] WHATSAPP + JARVIS**

"WhatsApp es el canal de comunicacion de toda la operacion. No email. No Slack. WhatsApp.

Por que? Porque en Colombia y LATAM, WhatsApp tiene una tasa de apertura de mensajes mayor al 90%. El email esta muerto para comunicacion urgente.

Usamos la WhatsApp Cloud API de Meta. Es la API oficial, no un proveedor tercero. Mas confiable, mas barata a escala.

[Demo: mostrar el panel de WhatsApp Business]

Jarvis es el agente de IA que vive en WhatsApp. Tecnicamente es un conjunto de workflows de n8n orquestados por Claude Sonnet.

Cuando llega un mensaje:

Primero, Gemini Flash clasifica el intent. Ventas, operaciones, o creator.

Segun el intent, Jarvis carga el contexto correcto: para ventas, el historial del lead y sus datos de BANT. Para operaciones, el estado del proyecto del cliente. Para creators, sus entregas activas.

Luego Claude Sonnet genera la respuesta con ese contexto.

Si la confianza de clasificacion es baja o el caso es sensible (queja, negociacion de precio, problema de pago), Jarvis no responde. En cambio, alerta al equipo con el contexto completo del mensaje.

[Demo: mostrar una alerta de escalamiento en el telefono]

El resultado: 80% de mensajes resueltos automaticamente. 20% con atencion humana en bloques de 20 minutos dos veces al dia."

**[8:45 — 10:00] PAGOS**

"El sistema de pagos es la parte mas critica del stack. Un error aqui afecta directamente a los creators y a la confianza del equipo.

Usamos dos proveedores: Wise para transfers internacionales a creators de LATAM, Mercury para pagos en USD a creators de USA.

Ambos tienen una feature indispensable: el Idempotency-Key header.

[Demo: mostrar un request a la API de Wise con el header]

Este header funciona asi: cuando mandas un request de pago, incluyes una clave unica en el header. Si por cualquier razon el request se ejecuta dos veces con la misma clave, el proveedor detecta la duplicacion y devuelve el resultado del primer pago sin procesar uno nuevo.

Sin esto, un timeout de red puede resultar en un pago duplicado.

[Mostrar el diagrama de estados del pago]

El flujo completo: el pago empieza en 'initiating'. Cuando el request llega al proveedor, pasa a 'submitted'. Cuando el banco confirma que el dinero llego, pasa a 'sent'. Solo en 'sent' marcamos la entrega como pagada y notificamos al creator.

Si algo falla en cualquier punto, el status pasa a 'failed' y le llega una alerta a Brian y Alexander con todos los detalles del error.

No hay pagos en limbo. No hay pagos duplicados. No hay creators esperando sin saber si les llego su dinero."

**[10:00 — 11:00] COSTO TOTAL**

"El momento que estaban esperando. El costo exacto de todo el stack al mes.

[Mostrar tabla en pantalla]

Vercel Pro: 20 dolares.
Supabase Pro: 25 dolares.
VPS para n8n y Jarvis: 12 dolares.
Bunny CDN para videos: 8 a 15 dolares segun trafico.
IA (Claude + Gemini + embeddings): 55 a 80 dolares segun volumen.
WhatsApp Cloud API: 5 a 12 dolares segun conversaciones.

Total: entre 125 y 164 dolares al mes.

Para manejar multiples clientes simultaneos, 30 creators activos, automatizaciones corriendo 24/7, y un agente de IA que responde el 80% de los mensajes de WhatsApp.

El stack no es un gasto. Es infraestructura. La diferencia entre un equipo de cuatro personas que puede manejar lo que normalmente requeriria ocho, es este stack.

El costo real no es lo que pagas al mes. Es cuantas horas de trabajo humano estas reemplazando con sistemas confiables."

**[11:00 — 12:00] CTA Y CIERRE**

"Para resumir:

Frontend: Next.js 15 con Vercel. 20 dolares al mes.
Base de datos: Supabase con RLS y pgvector. 25 dolares.
IA: Claude Sonnet para briefs y chat, Opus para research, Gemini Flash para clasificacion. 55-80 dolares.
Automatizacion: n8n self-hosted. 12 dolares en VPS.
Comunicacion: WhatsApp Cloud API con Jarvis. 5-12 dolares.
Pagos: Wise y Mercury con idempotencia. Fees de transferencia.

Total: 125 a 164 dolares al mes.

Si quieres ver como construi Kreoon desde cero, el siguiente video es el demo completo de la plataforma.

Si tienes preguntas sobre alguna herramienta especifica, dejala en los comentarios. Respondo todos.

Suscribete si quieres contenido tecnico de agencia UGC sin filtros ni hype."

---

### VIDEO YOUTUBE 02 — "Kreoon: construi un SaaS para gestionar creators (demo completa)"
**Duracion objetivo:** 15 minutos
**Formato:** Screen recording completo + voz en off
**Chapters:**
- 0:00 — Por que construi Kreoon
- 1:30 — El problema que resolvia antes
- 3:00 — Demo: dashboard principal
- 4:30 — Demo: generacion de briefs con IA
- 6:30 — Demo: match de creators
- 8:30 — Demo: flujo de entregables y revision
- 10:30 — Demo: sistema de pagos
- 12:00 — Demo: reportes de cliente
- 13:30 — Stack tecnico resumido
- 14:30 — Que viene en Q2 y Q3

**GUION COMPLETO — VIDEO 02**

**[0:00 — 1:30] INTRO**

"Kreoon es la plataforma que construi para gestionar toda la operacion de UGC Colombia.

No es un producto que vendemos. Es nuestra herramienta interna. La construi porque ninguna herramienta del mercado hacia exactamente lo que necesitabamos.

En este video te voy a mostrar un demo completo de todo lo que hace. Sin cuts. Sin edicion de pantalla que oculte tiempos de carga reales. Lo que ves es lo que existe en produccion hoy.

Antes de la demo, un minuto de contexto de por que la construi."

**[1:30 — 3:00] EL PROBLEMA**

"Hace ocho meses managiamos 15 creators con esto.

[Mostrar Google Sheets con colores manuales]

Una hoja de calculo con cinco columnas de colores. Status del brief: amarillo, verde, rojo. Creator asignado: escrito a mano. Fecha de entrega: calculada con formula. Pago: otro tab con mas formulas.

El problema no era el volumen. Era que la hoja no nos avisaba de nada.

Un creator entregaba tarde. Nos enterabamos cuando el cliente preguntaba.
Un pago estaba vencido. Nos enterabamos cuando el creator escribia.
Un brief habia cambiado. El creator seguia trabajando con la version anterior.

Probamos Notion: demasiado generico. Airtable: no podia hacer logica de negocio real. Monday: mismo problema.

Construi Kreoon en Next.js con Supabase. Tarde cuatro meses. Hoy maneja toda la operacion."

**[3:00 — 4:30] DEMO: DASHBOARD PRINCIPAL**

"Este es el dashboard principal de Kreoon.

[Demo: abrir Kreoon, navegar al dashboard]

En la parte superior: el estado de todos los proyectos activos. Verde: en tiempo. Amarillo: proximo al deadline. Rojo: vencido.

[Clic en un proyecto amarillo]

Este proyecto tiene un creator que tiene que entregar en 48 horas. La tarjeta me muestra: que graba, para que cliente, y cuando vence. Con un boton para mandarle un recordatorio por WhatsApp directamente desde aqui.

[Mostrar la seccion de metricas del dashboard]

Debajo: el resumen de metricas del mes. Videos entregados, videos aprobados a primera revision, promedio de revisiones por entrega. Estos numeros son en tiempo real desde Supabase.

[Mostrar la seccion de pagos pendientes]

Y en la barra lateral: pagos pendientes de ejecutar. Cuando veo esta lista, es porque el sistema espera mi confirmacion antes de ejecutar. Para pagos grandes pedimos una segunda aprobacion humana antes de mandarlos."

**[4:30 — 6:30] DEMO: GENERACION DE BRIEFS**

"La feature que mas tiempo ahorra: generacion de briefs con IA.

[Demo: ir a la seccion de briefs, clic en 'Nuevo brief']

Tres campos: el producto, la audiencia objetivo, y el objetivo de la campana.

[Llenar los campos con datos reales de un cliente de prueba]

Producto: serum hidratante de noche para piel sensible.
Audiencia: mujeres de 25 a 40 anos en Colombia, piel sensible, preocupadas por ingredientes quimicos.
Objetivo: conversiones en Meta Ads, objetivo ROAS de 3x.

[Clic en 'Generar brief']

Voy a dejar el cronometro visible para que vean el tiempo real.

[Mostrar cronometro mientras genera]

Ocho segundos.

[Mostrar el brief generado]

Lo que genera: angulo creativo principal — 'La noche es cuando tu piel se repara, este serum trabaja contigo'. Hook de apertura sugerido — 'Si tu piel se irrita con todo, esto va a cambiar tu rutina de noche'. Instrucciones de grabacion paso a paso: encuadre recomendado, iluminacion, que debe mostrar la creator. Dos variaciones de guion: una mas directa, una mas storytelling. Lista de no-hacer: no decir 'clinicamente probado' sin documentacion, no hacer comparaciones con competidores.

Antes de la IA: 45 minutos por brief. Con la IA: 10 minutos revisando y ajustando. Ahorro: 35 minutos por brief."

**[6:30 — 8:30] DEMO: MATCH DE CREATORS**

"Despues de generar el brief, el siguiente paso es asignar el creator correcto.

[Demo: en el brief generado, clic en 'Buscar creator']

Kreoon toma el brief y busca en nuestra base de datos el creator que mejor encaja. Esto usa pgvector — una extension de Postgres que hace busqueda por similitud semantica.

[Mostrar el proceso de busqueda con un indicador de carga]

Lo que pasa por debajo: Kreoon calcula el vector del brief, busca los vectores de creators mas cercanos en el espacio semantico, filtra por disponibilidad y tier requerido, y luego Claude Opus re-rankea los top 20 resultados razonando sobre los portafolios reales.

[Mostrar los 5 resultados con scores]

Aqui estan los cinco mejores candidatos. Cada uno con un score de compatibilidad, y mas importante: la razon. Por que este creator encaja con este brief.

[Clic en el primer resultado]

Creator A: nicho de skincare natural con piel sensible. Ha grabado 12 UGCs en el ultimo trimestre, promedio de 1.3 revisiones por entrega (excelente), disponible la proxima semana, tarifa de 80 dolares.

[Clic en 'Asignar']

Asignada. El sistema actualiza el brief con el creator. El workflow de n8n se activa automaticamente y le manda el brief por WhatsApp."

**[8:30 — 10:30] DEMO: ENTREGABLES Y REVISION**

"Esta es la parte donde el cliente interactua directamente con la plataforma.

[Demo: ir a la seccion de entregables del proyecto]

Cuando el creator sube el video, aparece aqui con el estado 'Entregado pendiente de revision'.

[Mostrar el video en el reproductor de Kreoon]

El video se reproduce directamente en Kreoon. El cliente puede dejarlo en cualquier punto y agregar un comentario con timestamp. Esto reemplaza el flujo de 'te mando el video por Drive, me mandas los cambios por WhatsApp, alguien los pierde'.

[Mostrar un comentario de revision en el timeline del video]

El cliente comento en el segundo 8: 'El producto no se ve claramente. Acercar mas la camara'. Ese comentario le llega al creator con el timestamp exacto. No hay ambiguedad.

[Mostrar el boton de aprobacion]

Cuando el cliente esta satisfecho, aprueba el video aqui. En ese momento:
El status del entregable cambia a 'aprobado'.
n8n detecta el cambio en Supabase.
Se activa el workflow de pago al creator.

El cliente no sabe que pasa por debajo. Solo sabe que su experiencia es fluida."

**[10:30 — 12:00] DEMO: SISTEMA DE PAGOS**

"El sistema de pagos es el mas critico. Y el que mas trabajo me tomo construir bien.

[Demo: ir a la seccion de pagos]

Esta es la vista de pagos pendientes y ejecutados. Cada pago tiene un estado visible: initiating, submitted, sent, o failed.

[Clic en un pago en estado 'sent']

Este pago fue a un creator de Medellin via Wise. La idempotency key esta visible — es el hash que previene pagos duplicados. El provider_tx_id es el ID de la transaccion en Wise para auditoria.

[Clic en un pago en estado 'failed']

Este fallo porque el creator no tenia su numero de cuenta de Wise actualizado. El sistema no lo reintento automaticamente. Me mando una alerta y lo marca como failed. Yo lo resuelvo manualmente.

[Mostrar el log de intentos del pago fallido]

El log muestra cada intento con el timestamp y el error exacto. En este caso: '422 Unprocessable Entity — recipient account not found'. Con esa informacion, le pido al creator que actualice sus datos en la plataforma.

La filosofia del sistema de pagos: es mejor fallar de forma visible que 'resolver' silenciosamente de forma incorrecta."

**[12:00 — 13:30] DEMO: REPORTES DE CLIENTE**

"El ultimo modulo: reportes mensuales para clientes.

[Demo: ir a la seccion de reportes]

El primero de cada mes, Kreoon genera automaticamente un reporte para cada cliente activo. Este es el reporte del mes pasado para uno de nuestros clientes.

[Abrir el reporte en pantalla]

El reporte tiene tres secciones: metricas de Meta Ads (CTR, ROAS, CPC), performance de los UGCs (completion rate, hook rate, cual fue el top video del mes), y una narrativa escrita por Claude Sonnet que interpreta los numeros en lenguaje humano.

[Leer la narrativa del reporte]

'El hook rate del video de producto mejoro un 18% respecto al mes anterior, lo que indica que el nuevo angulo de apertura — comenzar con el problema de la piel en vez del producto — esta generando mayor retencion en los primeros tres segundos...'

Esto no lo escribio nadie del equipo. Lo genero la IA con los datos de Meta Ads y el contexto de los UGCs de ese mes.

El cliente recibe este reporte por WhatsApp el dia 1 de cada mes. Con el PDF adjunto.

El equipo no tiene que hacer nada ese dia. Solo si el cliente tiene preguntas."

**[13:30 — 14:30] STACK TECNICO**

"El stack de Kreoon en una slide:

[Mostrar diagrama final]

Next.js 15 App Router en Vercel.
Supabase: Postgres, pgvector, RLS, real-time.
IA: Claude Sonnet, Claude Opus, Gemini Flash, text-embedding-3-small.
n8n self-hosted en VPS para automatizaciones.
WhatsApp Cloud API para comunicacion.
Wise y Mercury para pagos con idempotencia.
Bunny CDN para videos.

Costo total: entre 125 y 164 dolares al mes."

**[14:30 — 15:00] CIERRE Y CTA**

"Eso es Kreoon. No es el SaaS mas elegante del mercado. Es el que resuelve exactamente los problemas que teniamos.

Si estas construyendo algo similar o tienes preguntas sobre alguna parte del stack, dejalo en los comentarios.

El proximo video: IA aplicada al UGC — lo que funciona y lo que no. Sin hype, con numeros reales de seis meses en produccion.

Suscribete para no perdertelo."

---

### VIDEO YOUTUBE 03 — "IA aplicada al UGC: lo que funciona y lo que no (sin hype)"
**Duracion objetivo:** 13 minutos
**Formato:** Talking head + demos intercaladas
**Chapters:**
- 0:00 — Por que este video
- 1:00 — Lo que SI funciona: generacion de briefs
- 3:00 — Lo que SI funciona: analisis de hooks y metricas
- 5:00 — Lo que SI funciona: clasificacion de mensajes con IA
- 6:30 — Lo que NO funciona: revisar videos automaticamente
- 8:00 — Lo que NO funciona: reemplazar al creator
- 9:30 — Lo que NO funciona: confiar sin verificar
- 10:30 — El stack de IA optimo segun tamano de agencia
- 12:00 — CTA

**GUION COMPLETO — VIDEO 03**

**[0:00 — 1:00] INTRO**

"Llevamos seis meses usando IA en produccion real de UGC. No en demos. No en pruebas de concepto. En produccion, con clientes reales, con dinero real.

Este video es la verdad de lo que funciona y lo que no.

No hay hype aqui. Si algo no funciono, lo digo. Si cometimos un error caro, lo cuento. Si la IA no puede hacer algo que prometen que puede, lo desmiento.

Empecemos por lo que si funciona."

**[1:00 — 3:00] LO QUE FUNCIONA: BRIEFS**

"Numero uno que funciona: generacion de briefs.

Este es el caso de uso con mejor ROI que hemos encontrado. Sin discusion.

[Demo: mostrar el proceso de generacion de brief en Kreoon]

Un brief de UGC tiene muchas partes: el angulo creativo, el hook de apertura, las instrucciones de grabacion, las variaciones de guion, las restricciones de marca. Hacerlo bien toma entre 30 y 45 minutos.

Con Claude Sonnet, toma 8 segundos generar el primer borrador y 10 minutos revisarlo y ajustarlo.

El ahorro: 35 minutos por brief. Con 20 briefs al mes, son casi 12 horas de trabajo del equipo que desaparecen.

Pero — y esto es importante — el output de la IA no sale directo al creator. Siempre pasa por revision humana. La IA puede equivocarse en el tono de la marca, puede sugerir un angulo que ya probamos y no funciono, puede ignorar una restriccion del cliente que no estaba en el prompt.

La IA genera. El equipo decide.

[Mostrar un ejemplo de brief generado con cambios en rojo]

En este brief, la IA sugeria 'clinicamente probado' para un producto de skincare. El cliente no tiene esa certificacion. Ese cambio lo hace el equipo en la revision. Cinco segundos. Pero si no hubiera revision, ese brief habria llegado al creator con un claim que el cliente no puede respaldar.

El punto: la IA como herramienta de borrador rapido. No como autor final."

**[3:00 — 5:00] LO QUE FUNCIONA: ANALISIS DE HOOKS**

"Numero dos que funciona: analisis de performance de videos.

Esto lo construimos hace tres meses despues de un cliente que tenia un CTR muy bajo en sus UGCs.

[Demo: mostrar el prompt en Claude]

El prompt que usamos: 'Eres un experto en UGC de alto rendimiento para Meta Ads. Analiza el hook de este video en los primeros tres segundos. Evalua: claridad del problema que presenta, ritmo del habla, si hay movimiento visual que mantiene la atencion, y si el primer segundo crea curiosidad suficiente para no hacer scroll. Dame tres problemas especificos y tres soluciones concretas.'

[Mostrar la respuesta de Claude para ese cliente]

Para ese cliente especifico, Claude identifico tres problemas: el hook empezaba con el nombre de la marca en vez del problema del usuario, la creator hablaba muy despacio en los primeros dos segundos, y no habia ningun elemento visual dinamico en los primeros tres segundos.

[Mostrar las metricas antes y despues]

Aplicamos los tres cambios en los siguientes tres UGCs. El hook rate subio de 22% a 38%. El completion rate de 18% a 31%.

¿Fue todo merito de la IA? No. Fue el criterio del equipo aplicando las sugerencias de la IA de forma inteligente.

La IA da direccion. Los resultados los produce el equipo."

**[5:00 — 6:30] LO QUE FUNCIONA: CLASIFICACION DE MENSAJES**

"Numero tres: clasificacion de mensajes de WhatsApp con IA.

Esto es mas operativo pero tiene impacto directo en el tiempo del equipo.

Jarvis, nuestro agente de WhatsApp, recibe entre 40 y 80 mensajes al dia de clientes, creators y leads. Sin clasificacion, alguien tiene que leer cada mensaje y decidir a quien escala.

Con Gemini Flash como clasificador, cada mensaje tiene un intent asignado en menos de un segundo: ventas, operaciones, creator, soporte tecnico, o urgente.

[Demo: mostrar el panel de mensajes clasificados en n8n]

Segun ese intent, Jarvis responde con el contexto correcto o escala al humano correcto. Los mensajes de ventas van a Jarvis con el perfil del lead. Los de operaciones van a Diana con el estado del proyecto. Los urgentes van directamente al equipo con una alerta en WhatsApp.

El resultado: el equipo no lee mensajes random. Solo lee los que Jarvis no pudo resolver. Y esos son el 20% del total.

Gemini Flash cuesta una fraccion de Claude para esta tarea. Para clasificacion, no necesitas el modelo mas inteligente. Necesitas el mas rapido y el mas barato."

**[6:30 — 8:00] LO QUE NO FUNCIONA: REVISION AUTOMATICA DE VIDEOS**

"Ahora la parte honesta. Lo que no funciona.

Numero uno que NO funciona: revision automatica de videos con IA.

Intentamos que la IA revisara si un video cumplia el brief antes de mandarlo al cliente. La idea era simple: el creator sube el video, la IA lo analiza contra el brief, y si cumple, pasa al cliente automaticamente.

En teoria, perfecto. En practica, desastroso.

[Mostrar ejemplos de evaluaciones incorrectas]

La IA aprobaba videos que el cliente rechazaba por razones esteticas que no se pueden codificar en un prompt. La IA rechazaba videos que el cliente amaba porque usaban una ejecucion diferente a la del brief pero igualmente valida.

El criterio estetico es subjetivo. Depende del gusto del cliente, del mood de la campana, de comparaciones con videos previos que la IA no conoce.

Despues de tres semanas de pruebas con resultados inconsistentes, lo descartamos.

La IA puede analizar la transcripcion. Puede revisar si menciona el producto. No puede juzgar si la luz era la correcta, si la energia del creator era la indicada, si el ritmo del corte funciona.

Ese juicio sigue siendo humano. Y debe serlo."

**[8:00 — 9:30] LO QUE NO FUNCIONA: REEMPLAZAR AL CREATOR**

"Numero dos que NO funciona: usar IA para crear el contenido que deberia crear el creator.

Esto suena obvio cuando lo digo. Pero hay mucha confusion en el mercado sobre esto.

Los videos generados por IA — Veo 3, Sora, etc. — son utiles para B-roll, para prototipos conceptuales, para dar referencias visuales al equipo. No son UGC.

El valor del UGC esta precisamente en que es un ser humano real, con cara real, hablando de un producto real. La autenticidad no se puede simular con IA para el proposito de conversion en ads.

Los algoritmos de Meta y TikTok detectan contenido artificialmente generado. El rendimiento de ads con contenido de IA versus contenido humano autentico no es comparable todavia.

Esto puede cambiar. Probablemente va a cambiar. Pero hoy, en 2026, el UGC humano sigue siendo el activo que convierte mejor.

Usamos IA antes del creator: para el brief, para el angulo, para el guion de referencia. Usamos IA despues del creator: para analizar el performance, para identificar que funciona y que no. No la usamos para reemplazar al creator."

**[9:30 — 10:30] LO QUE NO FUNCIONA: CONFIAR SIN VERIFICAR**

"Numero tres: confiar en los outputs de IA sin verificacion.

Claude puede alucinar. Puede inventar estadisticas. Puede citar estudios que no existen. Puede decir que un hook funciona basandose en patrones de su entrenamiento que no se aplican al nicho especifico del cliente.

Tenemos una regla en el equipo: nada de IA sale al cliente sin haber sido leido por un humano.

No es una regla de desconfianza en la IA. Es una regla de responsabilidad.

Si un reporte de cliente dice que el ROAS fue de 3.2x y la IA lo calculo mal porque hubo un problema al importar las metricas de Meta Ads, eso afecta la confianza del cliente en nosotros. No en la IA. En nosotros.

La IA acelera el trabajo. La responsabilidad sigue siendo nuestra."

**[10:30 — 12:00] EL STACK DE IA SEGUN TAMANO**

"Por ultimo: que stack de IA tiene sentido segun el tamano de tu agencia.

[Mostrar tabla en pantalla]

Agencia pequena, menos de 5 clientes: Claude API directamente para briefs. Un workflow de n8n simple para mandar los briefs. Sin sistema de match, sin embeddings. Costo estimado: menos de 30 dolares al mes en IA.

Agencia mediana, 5 a 15 clientes: agregar el chatbot de ventas con Claude Sonnet. Clasificacion de mensajes con Gemini Flash. Sistema de match simple con SQL, no vectores todavia. Costo: 50 a 80 dolares al mes.

Agencia grande, mas de 15 clientes: todo el stack que describimos. pgvector para match semantico de creators, Opus para dossiers de investigacion, reportes mensuales automaticos. Costo: 80 a 150 dolares al mes.

El principio: construye el stack que necesitas hoy. No el que vas a necesitar en dos anos."

**[12:00 — 13:00] CIERRE**

"Para resumir lo que aprendimos en seis meses de IA en produccion:

Lo que funciona: generacion de briefs, analisis de performance, clasificacion de mensajes.
Lo que no funciona: revision automatica de videos, reemplazar al creator, confiar sin verificar.

La IA no es magia. Es una herramienta que amplifica lo que el equipo puede hacer. Bien usada, es el mayor multiplicador de productividad que hemos encontrado. Mal usada, genera errores que el cliente paga.

Si tienes preguntas sobre como implementar algo de lo que vimos, dejalo en los comentarios.

Suscribete para el proximo video: como construi el sistema de pagos automaticos para creators — incluyendo el error que nos costo 120 dolares el primer mes."

---

## 7. GUIONES X/TWITTER THREADS (8 threads)

### THREAD 01 — El stack tecnologico completo de una agencia UGC (hilo)

Tweet 1:
"El stack tecnologico de nuestra agencia UGC. Todo lo que corre por debajo del capo. Hilo:"

Tweet 2:
"Frontend: Next.js 15 con App Router en Vercel. 20 USD/mes. Deploy automatico en cada push a main. Los Server Components hacen queries directas a la BD sin pasar por una API. Menos codigo, menos superficie de error."

Tweet 3:
"Base de datos: Supabase. Postgres con RLS activo — cada cliente solo ve sus datos, aunque haya un bug en el backend. pgvector para match semantico de creators. Real-time para notificaciones instantaneas. 25 USD/mes."

Tweet 4:
"IA: no usamos un modelo para todo. Claude Sonnet para briefs y chatbot. Claude Opus para research de marca. Gemini Flash para clasificar mensajes de WhatsApp (10x mas barato que Sonnet para esa tarea). text-embedding-3-small para vectores de creators."

Tweet 5:
"Automatizacion: n8n self-hosted. Cero limite de ejecuciones, cero costo de licencia. Solo el VPS: 12 USD/mes. Comparado con Zapier Pro: 287 USD/mes de ahorro. La curva de aprendizaje existe. Vale la pena."

Tweet 6:
"Comunicacion: WhatsApp Cloud API. Tasa de apertura mayor al 90% en LATAM. Jarvis, nuestro agente de IA, responde el 80% de los mensajes sin intervencion humana. El 20% que escala llega al equipo con contexto completo."

Tweet 7:
"Pagos: Wise para LATAM, Mercury para USA. Ambos con Idempotency-Key header en cada request. Sin idempotencia, un timeout de red puede resultar en un pago duplicado. Aprendimos esto de la manera cara."

Tweet 8:
"Costo total: entre 125 y 164 USD/mes. Para manejar multiples clientes, 30 creators activos, y automatizaciones corriendo 24/7. El stack no es un gasto. Es la diferencia entre necesitar 4 personas o 8 para el mismo volumen."

Tweet 9:
"La regla que aplico a cada herramienta antes de agregarla al stack: ¿que proceso manual reemplaza, cuanto tiempo ahorra al mes, y que pasa si cae? Si no puedo responder las tres, no la agrego."

Tweet 10:
"Fin del hilo. Si quieres el desglose completo con demos de cada herramienta, el video de YouTube esta en el link de la bio."

---

### THREAD 02 — Por que construi Kreoon y no use Airtable

Tweet 1:
"Por que construi un SaaS propio para gestionar nuestra agencia en vez de usar Airtable / Notion / Monday. Hilo:"

Tweet 2:
"No es que esas herramientas sean malas. Son excelentes para lo que hacen. El problema: lo que yo necesitaba no estaban dentro de sus limites."

Tweet 3:
"Ejemplo 1: busqueda semantica de creators. Necesitaba encontrar el creator perfecto para cada brief usando vectores de embeddings. Airtable no tiene pgvector. La integracion externa es una pesadilla de sincronizacion."

Tweet 4:
"Ejemplo 2: pagos con idempotencia. Necesitaba que cuando el cliente aprueba un video, el pago al creator salga automatico con una idempotency_key para evitar duplicados. Eso requiere logica de negocio en un backend real. No en Airtable."

Tweet 5:
"Ejemplo 3: RLS por cliente. Necesitaba que cada cliente solo vea sus proyectos, sus creators, sus metricas. Supabase tiene esto nativo. Airtable tiene permisos pero no a nivel de fila de datos."

Tweet 6:
"El costo de construirlo: 4 meses trabajando de noche y fines de semana. El beneficio: 40 horas al mes de operacion manual que hoy son automaticas."

Tweet 7:
"El punto de inflexion: cuando el costo de adaptar tu proceso a la herramienta es mayor que el costo de construir la herramienta que se adapta a tu proceso. Para nosotros ese punto llego alrededor del cliente numero 8."

Tweet 8:
"Antes del cliente 8: Google Sheets era suficiente. Despues del cliente 8: necesitabamos algo que nos avisara, que automatizara, que recordara. Eso no es Airtable. Eso es un sistema."

Tweet 9:
"No recomiendo construir tu propio SaaS si no tienes un dev en el equipo. Pero si lo tienes, o si eres el dev: evalua honestamente si el costo de oportunidad de no tenerlo es mayor que el costo de construirlo."

Tweet 10:
"Para nosotros lo fue. Kreoon hoy es el activo tecnico mas valioso que tiene UGC Colombia."

---

### THREAD 03 — Los 5 errores de seguridad que encontramos en nuestro propio codigo

Tweet 1:
"Auditamos nuestro propio stack. Encontramos 5 errores de seguridad que podian haber sido graves. Los comparto para que no los cometas. Hilo:"

Tweet 2:
"Error 1: process.env.FOO! (non-null assertion). Si FOO no existe en produccion, el error es en runtime, no en build. Fix: crear requireEnv('FOO') que falla rapido con un mensaje claro si la variable no existe."

Tweet 3:
"Error 2: AbortController creado fuera del loop de reintentos. Si el primer intento hace timeout, el signal ya esta abortado en el segundo intento. El request falla instantaneamente aunque el servidor este disponible. Fix: crear un nuevo AbortController en cada iteracion."

Tweet 4:
"Error 3: validacion de webhook con ===. Es vulnerable a timing attacks. Un atacante puede inferir cuantos caracteres son correctos midiendo el tiempo de respuesta. Fix: crypto.timingSafeEqual. Siempre tarda lo mismo."

Tweet 5:
"Error 4: pagos sin idempotencia. Un timeout de red puede hacer que el sistema interprete silencio como fallo y ejecute un segundo pago. Fix: Idempotency-Key header en cada request a Wise/Mercury. Si se manda dos veces, el proveedor devuelve el resultado del primero."

Tweet 6:
"Error 5: parseo de respuestas de IA sin validacion. Claude puede devolver un formato inesperado. Sin Zod para validar el output, el error llega en runtime de formas dificiles de debuggear. Fix: schema Zod para cada output de modelo."

Tweet 7:
"El patron comun de los 5 errores: todos son silenciosos en development y ruidosos en produccion. La solucion en todos los casos es la misma: hacer los errores explicitos, rapidos y descriptivos."

Tweet 8:
"La herramienta que uso para auditar: supabase db lint para la base de datos. Revision manual del codigo de integraciones. Para los webhooks: testear con payloads invalidos deliberadamente y verificar que el rechazo sea correcto."

Tweet 9:
"Ningun de estos errores requeria conocimiento avanzado para encontrarlo. Requeria sentarse a revisar el codigo con ojos criticos, buscando especificamente donde podia fallar silenciosamente."

Tweet 10:
"El mejor momento para auditar tu codigo: antes de escalar. El peor: cuando ya tienes el problema."

---

### THREAD 04 — Como construir un agente de WhatsApp con IA desde cero

Tweet 1:
"Como construimos Jarvis, el agente de IA que responde el 80% de los mensajes de WhatsApp de nuestra agencia. La arquitectura completa. Hilo:"

Tweet 2:
"El flujo basico: WhatsApp Cloud API recibe un mensaje → manda un webhook a n8n → n8n procesa el mensaje con Claude → n8n manda la respuesta de vuelta via la API de WhatsApp. En menos de 3 segundos."

Tweet 3:
"El primer problema que tuvimos: usabamos Claude Sonnet para todo, incluyendo decidir si un mensaje era de ventas o de operaciones. Caro e innecesario. Fix: Gemini Flash clasifica el intent primero. Es 10x mas barato. El resultado es identico para clasificacion simple."

Tweet 4:
"El segundo problema: sin memoria entre sesiones. Cada mensaje era una conversacion nueva. Fix: guardar cada mensaje en Supabase con el numero de WhatsApp como clave. Antes de responder, cargar el historial. El agente recuerda quien eres."

Tweet 5:
"El tercer problema: el agente intentaba resolver todo, incluso lo que no podia. Resultado: respuestas vagas que frustraban a los usuarios. Fix: lista de casos que el agente debe escalar inmediatamente: quejas, negociaciones de precio, problemas de pago. En esos casos, el agente dice 'te paso con el equipo' y manda la alerta."

Tweet 6:
"El cuarto problema: si Claude estaba lento o caido, el agente quedaba mudo. Fix: cadena de fallback en el AI Gateway. Claude Sonnet primero. Si falla, GPT-5. Si falla, Gemini Pro. El usuario nunca ve el error."

Tweet 7:
"Las metricas actuales de Jarvis: 80% de mensajes resueltos sin intervencion humana. Tiempo de respuesta promedio: 2.3 segundos. El equipo revisa el 20% de escalamientos en dos bloques de 20 minutos al dia."

Tweet 8:
"El costo de Jarvis al mes: entre 11 y 18 USD. WhatsApp API, una fraccion de la IA, y el VPS proporcional. Por 110 minutos diarios recuperados del equipo."

Tweet 9:
"Lo que no haria de nuevo: construir el clasificador de intent desde cero con keywords. Tarde dos semanas en algo que Gemini Flash hace en dos horas de setup. Hubiera empezado con el modelo de clasificacion desde el inicio."

Tweet 10:
"Jarvis no es magia. Es n8n + WhatsApp API + Claude + Supabase bien conectados. La magia esta en la arquitectura, no en la IA en si misma."

---

### THREAD 05 — Por que el 80% de las automatizaciones de marketing fallan

Tweet 1:
"El 80% de las automatizaciones de marketing fallan por la misma razon. Y no es la tecnologia. Hilo:"

Tweet 2:
"Fallan porque automatizan el proceso equivocado. La gente agarra n8n o Zapier y automatiza lo primero que ve. Si el proceso manual ya era malo, automatizarlo solo hace el problema mas rapido."

Tweet 3:
"Antes de automatizar algo, hacemos tres preguntas: ¿este proceso funciona bien cuando lo hacemos a mano? ¿Lo hacemos mas de tres veces a la semana? ¿Si falla, hay alguien que lo detecte? Si la respuesta a cualquiera es no, no automatizamos todavia."

Tweet 4:
"El segundo error: automatizar sin manejo de errores. Una automatizacion que falla silenciosamente es peor que no tener automatizacion. Por lo menos si falla a mano, te das cuenta."

Tweet 5:
"Ejemplo propio: teniamos un workflow de pagos sin rama de error. Cuando Wise tardaba mas de 10 segundos en responder, el sistema interpretaba silencio como fallo. Relanzaba el pago. Pago duplicado. $120 duplicados el primer mes."

Tweet 6:
"El fix fue doble: rama de error obligatoria en el workflow, y Idempotency-Key en el request a Wise. Ahora si el mismo pago se intenta dos veces, el proveedor detecta la duplicacion y devuelve el resultado del primero."

Tweet 7:
"El tercer error: no monitorear las automatizaciones despues de lanzarlas. Una automatizacion no es set-and-forget para siempre. Las APIs cambian, los schemas cambian, los volúmenes cambian. Una automatizacion que funciono hace tres meses puede estar fallando hoy."

Tweet 8:
"Nuestra practica: cada workflow de n8n tiene un check semanal automatico. Si no ejecuto en los ultimos 7 dias cuando deberia haberlo hecho, me llega una alerta. Detectamos problemas antes de que el equipo los note."

Tweet 9:
"El cuarto error: automatizar lo que requiere juicio humano. No todo se puede automatizar. El criterio estetico sobre un video, la empatia en una queja de cliente, la negociacion de precio — eso es humano. Las automatizaciones liberan al humano para esas decisiones, no las reemplazan."

Tweet 10:
"Automatiza lo repetitivo. Preserva lo que requiere juicio. Monitorea lo que automastizas. Y nunca confundas 'funciona hoy' con 'va a funcionar siempre'."

---

### THREAD 06 — Supabase RLS: la guia rapida que necesitabas

Tweet 1:
"Row Level Security de Supabase explicado de forma que cualquier persona entienda. Y los errores comunes que van a bloquear tu aplicacion si no los conoces. Hilo:"

Tweet 2:
"RLS basico: es un sistema que dice 'este usuario solo puede ver las filas que le pertenecen'. Aunque haya un bug en tu backend que intente leer todas las filas, Supabase las filtra automaticamente segun las politicas."

Tweet 3:
"Para activar RLS: ALTER TABLE nombre_tabla ENABLE ROW LEVEL SECURITY. Para crear una politica basica: CREATE POLICY 'solo el dueno' ON nombre_tabla FOR ALL USING (auth.uid() = user_id). Ahora cada usuario solo lee sus filas."

Tweet 4:
"Error comun 1: activar RLS y olvidarse de crear la politica. Resultado: la tabla queda completamente bloqueada. Nadie puede leer nada, ni el administrador. La tabla devuelve lista vacia para todos."

Tweet 5:
"Error comun 2: politica que usa = en vez de IN para arrays. Si un usuario puede pertenecer a multiples organizaciones, necesitas USING (org_id = ANY(auth.jwt()->>'org_ids')). El = solo funciona para un valor."

Tweet 6:
"Error comun 3: RLS activo en la tabla padre pero no en las tablas relacionadas. Si tengo RLS en 'clients' pero no en 'deliveries', alguien puede llegar a las entregas de otro cliente via JOIN si conoce el ID."

Tweet 7:
"La herramienta para detectar estos errores: supabase db lint. Corre en el CLI, es gratis, y te dice exactamente que tablas tienen RLS activo sin politicas, y que politicas pueden tener problemas."

Tweet 8:
"La diferencia entre anon key y service_role key: la anon key esta sujeta a RLS. La service_role ignora RLS completamente. Nunca uses service_role en el frontend. Solo en el backend donde el codigo es tuyo y lo controlas."

Tweet 9:
"Nosotros encontramos tres tablas con datos de clientes reales que tenian RLS activo pero politicas incorrectas. El fix fue 20 minutos. La deteccion hubiera podido ser nunca, si no hubieramos corrido el lint."

Tweet 10:
"Corre supabase db lint hoy. Es gratis, toma 5 minutos, y puede salvarte de una filtracion de datos. El mejor momento para auditarlo es antes de que lo necesites."

---

### THREAD 07 — Lo que aprendes construyendo un SaaS para tu propia agencia

Tweet 1:
"Lo que aprendes cuando construyes un SaaS para resolver tus propios problemas operativos. Construi Kreoon en 4 meses. Este es el resumen honesto. Hilo:"

Tweet 2:
"Leccion 1: el MVP no es la version minima del producto que imaginas. Es el flujo critico de extremo a extremo. Para Kreoon: brief → creator asignado → video entregado. Solo eso. Todo lo demas fue iteracion despues."

Tweet 3:
"Leccion 2: construye para el problema que tienes hoy, no para el que imaginas tener en dos anos. Pase tres semanas en el sistema de match vectorial cuando tenia 8 creators. Con 8 creators, una query SQL con tres filtros da el mismo resultado."

Tweet 4:
"Leccion 3: la observabilidad no es opcional. Sin logs, sin alertas, sin metricas, los bugs viven en silencio hasta que un cliente los encuentra primero. Configure alertas antes de tener el primer usuario real."

Tweet 5:
"Leccion 4: los pagos son el modulo mas critico y el que mas tiempo requiere construir bien. No por complejidad tecnica, sino por las garantias que necesita: idempotencia, estados progresivos, notificacion en fallo, auditoria completa."

Tweet 6:
"Leccion 5: el primer deploy a produccion va a revelar problemas que staging nunca mostro. El volumen de datos reales, los patrones de uso reales, y los edge cases que no imaginaste. Deploy temprano, aunque este incompleto."

Tweet 7:
"Leccion 6: el stack que ya conoces es mejor que el stack 'correcto'. La velocidad de construccion importa mas que la perfeccion tecnica en los primeros meses. Usar lo que ya sabes te da semanas de ventaja."

Tweet 8:
"Leccion 7: el momento en que el equipo empieza a quejarse si el sistema cae es el momento en que sabes que funciona. Antes de eso, eres el unico que lo usa. Despues de eso, tiene traccion real."

Tweet 9:
"Leccion 8: construir tu propia herramienta no significa que siempre es la decision correcta. Es la decision correcta cuando el costo de adaptar tu proceso a una herramienta existente es mayor que el de construir la herramienta que se adapta a tu proceso."

Tweet 10:
"Kreoon no es el SaaS mas elegante. Es el que resuelve exactamente los problemas que teniamos. Eso vale mas que la arquitectura perfecta."

---

### THREAD 08 — La IA en produccion real de UGC: 6 meses de resultados

Tweet 1:
"6 meses de IA en produccion real de UGC. Lo que funciono, lo que no funciono, y los numeros exactos. Hilo:"

Tweet 2:
"Lo que SI funciona: generacion de briefs. 45 minutos → 10 minutos por brief. 20 briefs al mes = 11.6 horas recuperadas. ROI: inmediato. El borrador es bueno. La revision sigue siendo humana."

Tweet 3:
"Lo que SI funciona: analisis de hooks. Le pasamos la transcripcion de un UGC y las metricas a Claude. Identifica problemas que el equipo pasa por alto cuando lleva el dia mirando videos. Un cliente paso de 22% a 38% de hook rate aplicando las sugerencias."

Tweet 4:
"Lo que SI funciona: clasificacion de mensajes de WhatsApp. Gemini Flash clasifica el intent de cada mensaje en menos de un segundo. El agente solo activa el modelo caro cuando la tarea lo requiere. El resultado: el 80% de mensajes resueltos sin intervencion humana."

Tweet 5:
"Lo que NO funciona: revision automatica de videos. Intentamos que la IA evaluara si un video cumplia el brief. Resultado inconsistente — aprueba videos que el cliente rechaza, rechaza videos que el cliente ama. El criterio estetico es humano."

Tweet 6:
"Lo que NO funciona: reemplazar al creator. El valor del UGC es la autenticidad humana. Los algoritmos de Meta y TikTok detectan contenido generado por IA. El performance no es comparable todavia. La IA prepara al creator. No lo reemplaza."

Tweet 7:
"Lo que NO funciona: confiar sin verificar. Claude puede alucinar datos, inventar estadisticas, citar fuentes que no existen. Todo output de IA para clientes pasa por revision humana antes de salir. Sin excepcion."

Tweet 8:
"El costo de toda la IA en el stack: entre 55 y 80 USD al mes. El ahorro de tiempo: 40 horas al mes. Si el valor del tiempo del equipo es 20 USD/hora, el ROI es 800 USD en ahorro por 70 USD en costo. 11x."

Tweet 9:
"La regla mas importante que aprendimos: la IA acelera el trabajo. No lo reemplaza. Bien usada, es el mayor multiplicador de productividad que hemos encontrado. Mal usada, genera errores que el cliente paga."

Tweet 10:
"El error de implementacion mas comun que veo en otras agencias: activar la IA para todo desde el dia uno. Mejor: identificar el proceso manual que mas tiempo consume, automatizar ese primero, medir el impacto, y luego el siguiente."

