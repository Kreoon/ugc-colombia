# Formulario de Aplicacion de Creadores — UGC Colombia
**Sistema Operativo de Creadores v1.0**
**Preparado por:** Diana Mile / UGC Colombia (@agenciaugccolombia)
**Fecha:** Abril 2026

---

## Instrucciones de implementacion en Tally o Typeform

Crear como formulario de varias paginas con logica condicional.
Pagina de bienvenida con logo UGC Colombia, descripcion breve de la agencia y beneficios de unirse al pool.
Activar notificacion automatica a Diana Mile al enviar cada aplicacion.
Etiquetar cada respuesta con timestamp y UTM source si viene de Instagram/link de bio.

---

## PAGINA 1 — Datos personales

**Campo 1.1** Nombre completo
Tipo: Texto corto | Requerido: Si

**Campo 1.2** Numero de WhatsApp (con codigo de pais)
Tipo: Telefono | Requerido: Si
Nota interna: Este es el canal principal de comunicacion con el creador.

**Campo 1.3** Correo electronico
Tipo: Email | Requerido: Si

**Campo 1.4** Ciudad y pais de residencia
Tipo: Texto corto | Requerido: Si

**Campo 1.5** Fecha de nacimiento
Tipo: Fecha | Requerido: Si
Nota interna: Solo mayores de 18 anos. Configurar validacion: si edad < 18 mostrar mensaje "Gracias por tu interes. Por politica de la agencia trabajamos con mayores de 18 anos" y bloquear envio.

**Campo 1.6** Genero
Tipo: Seleccion unica
Opciones: Mujer | Hombre | No binario | Prefiero no decir

**Campo 1.7** Tipo de identificacion
Tipo: Seleccion unica
Opciones: Cedula de ciudadania (Colombia) | Cedula de extranjeria | Pasaporte | SSN / ITIN (USA) | Otro

**Campo 1.8** Numero de identificacion
Tipo: Texto corto | Requerido: Si

---

## PAGINA 2 — Redes sociales y audiencia

**Campo 2.1** Perfil principal de Instagram (@ sin arroba)
Tipo: Texto corto | Requerido: Si

**Campo 2.2** Seguidores en Instagram
Tipo: Seleccion unica
Opciones: Menos de 1.000 | 1.000 - 5.000 | 5.000 - 10.000 | 10.000 - 50.000 | Mas de 50.000

**Campo 2.3** Perfil de TikTok (si aplica)
Tipo: Texto corto | Requerido: No

**Campo 2.4** Seguidores en TikTok
Tipo: Seleccion unica
Opciones: No tengo TikTok | Menos de 1.000 | 1.000 - 5.000 | 5.000 - 20.000 | 20.000 - 100.000 | Mas de 100.000
Logica condicional: Solo mostrar si Campo 2.3 fue diligenciado.

**Campo 2.5** Canal de YouTube (si aplica)
Tipo: Texto corto | Requerido: No

**Campo 2.6** Tasa de engagement promedio en Instagram (%)
Tipo: Numero decimal
Instruccion al creador: "Calcula: (likes promedio + comentarios promedio) / seguidores x 100"
Requerido: Si

**Campo 2.7** Capture de pantalla de estadisticas de Instagram (ultimos 30 dias)
Tipo: Carga de archivo (imagen) | Requerido: Si
Instruccion: "Ve a Configuracion > Estadisticas > Descripcion general. Adjunta capture."

**Campo 2.8** Pais de la mayoria de tu audiencia
Tipo: Seleccion multiple (max 3)
Opciones: Colombia | Mexico | Argentina | Chile | Peru | Ecuador | Venezuela | USA (hispano) | USA (ingles) | Espana | Otro

**Campo 2.9** Rango de edad principal de tu audiencia
Tipo: Seleccion unica
Opciones: 13-17 | 18-24 | 25-34 | 35-44 | 45+

---

## PAGINA 3 — Experiencia y capacidades tecnicas

**Campo 3.1** Anos de experiencia creando contenido de video
Tipo: Seleccion unica
Opciones: Soy nuevo (menos de 6 meses) | 6 meses - 1 ano | 1 - 2 anos | 2 - 4 anos | Mas de 4 anos

**Campo 3.2** Has creado contenido UGC para marcas antes?
Tipo: Seleccion unica
Opciones: Si, tengo experiencia con varias marcas | Si, con 1-2 marcas | No, pero estoy listo para empezar

**Campo 3.3** Si tienes experiencia con marcas, menciona 2-3 (nombre y categoria)
Tipo: Texto largo | Requerido: No
Logica condicional: Mostrar solo si Campo 3.2 != "No, pero estoy listo para empezar"

**Campo 3.4** Con que equipo grabas actualmente?
Tipo: Seleccion multiple
Opciones: iPhone (X o superior) | Android flagship (Samsung S, Pixel) | Camara DSLR/mirrorless | GoPro u otro action cam | Microfono externo (ring light + mic) | Solo el telefono sin accesorios

**Campo 3.5** Puedes grabar en 4K o 1080p a 60fps?
Tipo: Seleccion unica
Opciones: Si, 4K | Si, 1080p 60fps | Solo 1080p 30fps | No estoy seguro

**Campo 3.6** Que tipo de iluminacion usas?
Tipo: Seleccion multiple
Opciones: Ring light | Luz de ventana (natural) | Softbox / luz de estudio | Sin iluminacion especial

**Campo 3.7** Que aplicaciones o programas usas para edicion?
Tipo: Seleccion multiple
Opciones: CapCut | InShot | Premiere Pro | Final Cut Pro | DaVinci Resolve | Canva | No edito, entrego en crudo | Otro

**Campo 3.8** Puedes entregar subtitulos integrados en el video?
Tipo: Seleccion unica
Opciones: Si siempre | Si si se me pide | No

**Campo 3.9** Idiomas en los que puedes grabar
Tipo: Seleccion multiple
Opciones: Espanol colombiano (neutral) | Espanol con acento mexicano | Espanol con acento neutro (castellano general) | Ingles fluido | Ingles conversacional | Portuques

**Campo 3.10** Portafolio o carpeta con ejemplos de videos anteriores
Tipo: URL o carga de archivo
Instruccion: "Comparte un link de Google Drive, Dropbox o tu perfil de Instagram/TikTok con ejemplos de tu trabajo."
Requerido: Si

---

## PAGINA 4 — Nichos y disponibilidad

**Campo 4.1** Nichos en los que te sientes comodo creando contenido
Tipo: Seleccion multiple
Opciones: Belleza y skincare | Moda y ropa | Salud y bienestar | Fitness y deporte | Tecnologia y gadgets | Hogar y decoracion | Alimentos y bebidas | Mascotas | Ninos y familia | Finanzas personales | Educacion y cursos | Viajes | Entretenimiento | Otro

**Campo 4.2** Categorias con las que NO trabajarias (exclusiones eticas)
Tipo: Seleccion multiple
Opciones: Alcohol | Tabaco / cigarrillos electronicos | Juegos de azar / apuestas | Suplementos no regulados | Contenido politico | Contenido adulto | Ninguna exclusion

**Campo 4.3** Disponibilidad mensual aproximada
Tipo: Seleccion unica
Opciones: 1-3 videos al mes | 4-8 videos al mes | 9-15 videos al mes | Mas de 15 videos al mes

**Campo 4.4** Tiempo de entrega tipico desde que recibes el brief (dias habiles)
Tipo: Seleccion unica
Opciones: 1-2 dias | 3-4 dias | 5-7 dias | Mas de 7 dias

**Campo 4.5** Tienes disponibilidad para grabaciones con envio de producto fisico?
Tipo: Seleccion unica
Opciones: Si, acepto producto fisico | Solo productos digitales o por correo | Depende del producto

**Campo 4.6** Direccion de envio para productos (ciudad y barrio/sector)
Tipo: Texto corto | Requerido: No
Logica condicional: Mostrar solo si Campo 4.5 = "Si, acepto producto fisico"

---

## PAGINA 5 — Informacion de pago

**Campo 5.1** Metodo de pago preferido
Tipo: Seleccion unica
Opciones: Transferencia bancaria Colombia (PSE / Bancolombia) | Nequi | Daviplata | PayPal | Wise | Payoneer | Zelle (USA) | Otro

**Campo 5.2** Tiene cuenta bancaria a su nombre?
Tipo: Seleccion unica
Opciones: Si, cuenta propia | No, cuenta de familiar | No tengo cuenta bancaria

**Campo 5.3** Emite facturas o documentos equivalentes?
Tipo: Seleccion unica
Opciones: Si, soy persona natural con RUT | Si, tengo empresa / SAS | No, cobro como persona natural sin declaracion | Prefiero no decir

**Campo 5.4** Rango de tarifa esperada por video UGC (30-60s, edicion incluida)
Tipo: Seleccion unica
Opciones: USD 30 - 60 | USD 60 - 100 | USD 100 - 180 | USD 180 - 300 | Mas de USD 300 | Negociable segun marca

---

## PAGINA 6 — Soft skills y cierre

**Campo 6.1** Como describirias tu estilo frente a camara?
Tipo: Seleccion multiple (max 3)
Opciones: Energico y dinamico | Cercano y conversacional | Profesional y serio | Divertido y casual | Aspiracional / lifestyle | Educativo / explicativo | Emocional y autentico

**Campo 6.2** Como reaccionas cuando un cliente pide una revision que no esperabas?
Tipo: Seleccion unica
Opciones: La hago sin problema si esta en el brief | La discuto primero para entender el objetivo | Prefiero no hacer revisiones no especificadas | Depende del tipo de cambio

**Campo 6.3** Con que frecuencia respondes mensajes de trabajo en WhatsApp?
Tipo: Seleccion unica
Opciones: En menos de 1 hora | Entre 1-4 horas | Al final del dia | Al siguiente dia habil

**Campo 6.4** Por que quieres trabajar con UGC Colombia? (respuesta libre)
Tipo: Texto largo | Requerido: Si
Limite: 300 palabras

**Campo 6.5** Acepto los terminos de colaboracion de UGC Colombia, incluyendo confidencialidad, entrega a tiempo y uso correcto de materiales de marca.
Tipo: Checkbox obligatorio | Requerido: Si

**Campo 6.6** Acepto que mis datos sean usados para asignacion de proyectos y comunicacion con el equipo de UGC Colombia.
Tipo: Checkbox obligatorio | Requerido: Si

---

## Mensaje de confirmacion post-envio

Titulo: "Aplicacion recibida"

Texto: "Gracias por postularte a UGC Colombia. Tu aplicacion fue recibida y Diana Mile la revisara dentro de los proximos 5-7 dias habiles. Si tu perfil coincide con nuestros proyectos activos, te contactaremos por WhatsApp al numero que registraste. Mientras tanto, siguenos en Instagram: @agenciaugccolombia"

---

## Automatizaciones recomendadas (n8n / Tally Webhooks)

1. Al enviar el formulario: notificacion automatica por WhatsApp a Diana Mile con resumen del aplicante (nombre, ciudad, seguidores, engagement, portafolio).
2. Crear fila automatica en hoja de Google Sheets o tabla Supabase `creators_applications` con todos los campos.
3. Si engagement >= 4% Y seguidores >= 5.000: etiquetar como "Prioritario" en la tabla.
4. Enviar email de confirmacion automatico al creador desde ugccolombia@kreoon.com.
