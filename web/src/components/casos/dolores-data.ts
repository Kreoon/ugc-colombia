import {
  Flame,
  Repeat,
  UserX,
  Megaphone,
  LineChart,
  Camera,
  Bot,
  type LucideIcon,
} from "lucide-react";

export type Dolor = { titulo: string; descripcion: string };

export type Metrica = {
  label: string;
  value: string;
  desc: string;
};

export type DolorBlock = {
  id: string;
  icon: LucideIcon;
  image: string;
  imageAlt: string;
  titulo: string;
  subtitulo: string;
  dolores: Dolor[];
  solucion: string;
  metricas: Metrica[];
  servicioId: string;
  servicioLabel: string;
};

export const DOLOR_BLOCKS: DolorBlock[] = [
  {
    id: "creacion-contenido",
    icon: Flame,
    image: "/brand/casos-page/creacion-contenido.png",
    imageAlt: "Escena editorial de creación de contenido improvisada",
    titulo: "Crear contenido cada semana te está agotando.",
    subtitulo:
      "Sabes que necesitas publicar, sabes que necesitas videos para tus anuncios, sabes que el contenido es lo que mueve la aguja. Pero entre el día a día del negocio, al final del mes terminas grabando como puedas con el celular o pagándole a quien aparezca primero en Instagram.",
    dolores: [
      { titulo: "No sabes qué grabar", descripcion: "Cada semana pierdes 4 a 6 horas decidiendo qué grabar antes de poder grabarlo." },
      { titulo: "Calidad inconsistente", descripcion: "Un video sale bien, los siguientes tres son flojos. No hay método, solo suerte." },
      { titulo: "Equipo sobrecargado", descripcion: "Tu encargado de redes no es estratega, ni guionista, ni director, ni editor. Pero le pides todo." },
      { titulo: "Publicar por publicar", descripcion: "Subes lo que sea para no romper la racha. La marca pierde rumbo y la gente lo nota." },
      { titulo: "Cada video desde cero", descripcion: "Ningún proceso reutilizable. Cada producción empieza de la nada. Cero ahorro de tiempo." },
      { titulo: "Terminas tú frente a la cámara", descripcion: "Acabas grabando porque nadie más quiere o puede. Y eso no escala." },
    ],
    solucion:
      "Te entregamos 5, 10 o 30 videos UGC al mes con 3 versiones cada uno, listos para publicar en Meta y TikTok. Estrategia, guiones, selección de creadores, producción, edición y revisiones — todo con un solo equipo. Tu gente deja de improvisar y vuelve a enfocarse en vender.",
    metricas: [
      { label: "VOL", value: "30+", desc: "Entregables al mes" },
      { label: "TIEMPO", value: "7d", desc: "Primera entrega" },
      { label: "GANCHO", value: "30%+", desc: "Atención en 3 segundos" },
    ],
    servicioId: "ugc-ads",
    servicioLabel: "Ver UGC Ads Pack",
  },
  {
    id: "fatiga-creativa",
    icon: Repeat,
    image: "/brand/casos-page/fatiga-creativa.png",
    imageAlt: "Frames de video repitiéndose hacia el fondo en luz dorada",
    titulo: "Tu video funcionó. Una sola vez. Hace tres meses.",
    subtitulo:
      "Encontraste el video ganador, lo escalaste con todo, te trajo ventas… y de pronto el costo subió, la gente dejó de hacer clic y nadie en tu equipo sabe por qué. Spoiler: no es Meta, es que la audiencia ya se cansó del mismo video.",
    dolores: [
      { titulo: "Mismo formato repetido", descripcion: "Solo testimonios. Solo aperturas de producto. Solo demos. Tu audiencia ya los memorizó." },
      { titulo: "Una sola entrada al video", descripcion: "Un solo gancho inicial. Cuando deja de jalar, queda inservible todo el creativo." },
      { titulo: "Siempre el mismo creador", descripcion: "Mismo rostro durante 6 meses. Tu marca termina siendo la marca de esa persona." },
      { titulo: "Sin reservas de creativos", descripcion: "Cuando un video se quema no tienes 10 listos para reemplazarlo. Empiezas otra vez de cero." },
      { titulo: "Audiencia agotada", descripcion: "La frecuencia se pasa de 3.5 y ya nadie te ve. Pero sigues pagando por mostrar el anuncio." },
    ],
    solucion:
      "Te entregamos rotación constante: nuevos ganchos, nuevos creadores, nuevos formatos cada mes. 3 versiones por video × hasta 30 videos al mes = 90 entregables que pueden vivir al mismo tiempo en tu cuenta de anuncios. Cansancio del creativo, controlado.",
    metricas: [
      { label: "VARIAS", value: "3x", desc: "Versiones por video" },
      { label: "FREC", value: "<2.5", desc: "Frecuencia ideal Meta" },
      { label: "FRESCO", value: "100%", desc: "Banco renovado al mes" },
    ],
    servicioId: "ugc-ads",
    servicioLabel: "Ver UGC Ads Pack",
  },
  {
    id: "contratar-creadores",
    icon: UserX,
    image: "/brand/casos-page/contratar-creadores.png",
    imageAlt: "Teléfono con mensajes silenciados sobre superficie oscura",
    titulo: "Contratar creadores sin agencia es un dolor de cabeza.",
    subtitulo:
      "Buscaste creadores en Instagram, en TikTok, en grupos de Facebook. Mandaste 30 mensajes. Te respondieron 6. Contrataste 2. Uno entregó tarde y el otro nunca volvió a aparecer. Bienvenido al mundo del freelance UGC sin filtros.",
    dolores: [
      { titulo: "Búsqueda interminable por mensaje", descripcion: "8 horas a la semana solo buscando perfiles, mandando mensajes y rezando para que respondan." },
      { titulo: "Te dicen sí y desaparecen", descripcion: "Aceptan, cobran adelanto y nunca vuelven a contestar. Sin contrato no tienes nada que reclamar." },
      { titulo: "Calidad técnica pobre", descripcion: "Audio horrible, mala iluminación, formatos verticales mal cortados. No sirven para tus anuncios." },
      { titulo: "Sin guías ni instrucciones", descripcion: "Improvisan porque nadie les explicó qué hacer. Resultado: video genérico que no convierte." },
      { titulo: "Sin contratos ni derechos", descripcion: "No tienes derechos para usarlo en Meta Ads. Si te reportan, todo el creativo queda en el limbo." },
      { titulo: "Pagos directos sin respaldo", descripcion: "Transferencias a cuentas personales, sin facturas, sin garantía de que te entreguen." },
      { titulo: "Cero control de calidad", descripcion: "Recibes el video, no cumple, pides cambios y te dicen 'eso fue lo que acordamos'." },
    ],
    solucion:
      "Tenemos red de más de 30 creadores UGC verificados, contratos profesionales, instrucciones claras para cada grabación, control de calidad interno y derechos de uso comercial por 12 meses incluidos. Tú apruebas los creadores antes de grabar. Si algo no cumple, lo regrabamos sin discutir.",
    metricas: [
      { label: "RED", value: "+30", desc: "Creadores verificados" },
      { label: "QA", value: "100%", desc: "Aprobación previa del cliente" },
      { label: "USO", value: "12m", desc: "Licencia comercial" },
    ],
    servicioId: "talento",
    servicioLabel: "Ver Agencia de Creadores",
  },
  {
    id: "estrategia-organica",
    icon: Megaphone,
    image: "/brand/casos-page/estrategia-organica.png",
    imageAlt: "Muro editorial con fragmentos dispersos sin estructura",
    titulo: "Publicar sin estrategia es tirar contenido a la basura.",
    subtitulo:
      "Tu Instagram tiene 200 publicaciones y cero línea editorial. Tu TikTok copia tendencias que ya pasaron. Tu YouTube Shorts es un cementerio. Y aún así te preguntas por qué la marca no crece.",
    dolores: [
      { titulo: "Sin pilares de contenido", descripcion: "Cada publicación va por un lado distinto. La marca se siente sin alma." },
      { titulo: "Copiar tendencias tarde", descripcion: "Subes el sonido del momento dos semanas después. Ya nadie lo ve." },
      { titulo: "Cero consistencia", descripcion: "Publicas cinco días, desapareces dos semanas, vuelves. El algoritmo no te perdona." },
      { titulo: "Publicaciones sueltas", descripcion: "No hay un hilo que conecte una con la siguiente. Cero efecto acumulado." },
      { titulo: "Mides 'me gusta', no acciones", descripcion: "Te enorgulleces de mil 'me gusta' mientras cero personas entran a tu sitio." },
    ],
    solucion:
      "Diseñamos tu estrategia editorial mensual: pilares, calendario, ángulos ganadores, instrucciones para cada creador y reportes de resultados. Coordinamos lo orgánico con los anuncios pagados para que ambos refuercen el mismo mensaje, no compitan.",
    metricas: [
      { label: "PILARES", value: "4-6", desc: "Pilares editoriales" },
      { label: "POSTS", value: "20+", desc: "Publicaciones al mes" },
      { label: "CTR", value: "3%+", desc: "Meta para TikTok Spark Ads" },
    ],
    servicioId: "estrategia",
    servicioLabel: "Ver Estrategia de Contenido",
  },
  {
    id: "metricas-ads",
    icon: LineChart,
    image: "/brand/casos-page/metricas-ads.png",
    imageAlt: "Líneas de datos doradas entrelazándose en caos editorial",
    titulo: "Mides ROAS y le echas la culpa al video equivocado.",
    subtitulo:
      "Tu retorno bajó. ¿Es el video? ¿Es la oferta? ¿Es la página de aterrizaje? ¿Es el pago? No sabes. Y mientras tanto cambias el video cada semana esperando que algo funcione por accidente.",
    dolores: [
      { titulo: "Persigues el ROAS sin contexto", descripcion: "El retorno depende de la oferta, los precios y el embudo de venta. Echarle la culpa al video es la salida fácil." },
      { titulo: "No distingues gancho de retención", descripcion: "El video puede tener buen gancho y mala retención. O al revés. Cada uno se arregla diferente." },
      { titulo: "Sin separar métrica por video", descripcion: "Un solo número agregado para todos los creativos. No sabes cuál está jalando." },
      { titulo: "Decisiones a ciegas", descripcion: "Pausas el video equivocado, escalas el peor, repites los mismos errores." },
      { titulo: "Sin referencias de la industria", descripcion: "No sabes si tu CTR de 1.2% es bueno o malo. No tienes con qué compararlo." },
    ],
    solucion:
      "Auditamos tu embudo completo, separamos qué controla el video y qué controla la oferta, y te entregamos un plan a 90 días con métricas reales (gancho, retención, clics, costo por mil). Acompañamiento mensual con Alexander para no volver a decidir a ciegas.",
    metricas: [
      { label: "GANCHO", value: "30%+", desc: "Mejor 25% en Meta" },
      { label: "RET.", value: "60%+", desc: "Retención a 15 segundos" },
      { label: "PLAN", value: "90d", desc: "Hoja de ruta accionable" },
    ],
    servicioId: "consultoria",
    servicioLabel: "Ver Consultoría",
  },
  {
    id: "produccion-cara",
    icon: Camera,
    image: "/brand/casos-page/produccion-cara.png",
    imageAlt: "Equipo de producción cinematográfica sobredimensionado en silueta",
    titulo: "Una productora cobra $5K por un video que no convierte.",
    subtitulo:
      "Pagaste producción premium. Te entregaron una pieza de marca hermosa, en 4K, con drone y todo. La subiste a Meta Ads y… nada. Porque verse cinematográfico no significa que vende.",
    dolores: [
      { titulo: "Estética por encima de estrategia", descripcion: "Te enamoraste de la imagen y olvidaste el gancho." },
      { titulo: "Entrega lenta", descripcion: "Tres meses de pre-producción para un video que ya ni encaja con la temporada." },
      { titulo: "Un solo formato", descripcion: "Una versión 16:9 que toca recortar a mano para Reels y TikTok. Adiós composición." },
      { titulo: "Sin pensar en resultados", descripcion: "Nadie del equipo entiende de Meta Ads. Hicieron lo de siempre." },
      { titulo: "Sin versiones", descripcion: "Un solo video. Si no funciona, perdiste $5K. Si funciona, lo quemas en tres semanas." },
    ],
    solucion:
      "Cuando necesitas producción premium de verdad — video de venta, pieza de marca, lanzamiento — la hacemos pensando en resultados: pre-producción estratégica, varios formatos para anuncios y orgánico, ganchos pensados para los primeros 2 segundos. Estética y conversión.",
    metricas: [
      { label: "FORMATOS", value: "9:16·1:1·16:9", desc: "Ads y orgánico" },
      { label: "GANCHO", value: "2s", desc: "Atención forzada" },
      { label: "CORTES", value: "5+", desc: "Versiones por master" },
    ],
    servicioId: "produccion",
    servicioLabel: "Ver Producción Premium",
  },
  {
    id: "procesos-manuales",
    icon: Bot,
    image: "/brand/casos-page/procesos-manuales.png",
    imageAlt: "Escritorio editorial con pilas de papel y lámpara cálida",
    titulo: "Tu equipo hace lo mismo todos los días, a mano.",
    subtitulo:
      "Responder WhatsApps, mover clientes de un Excel a otro, agendar llamadas, mandar recordatorios, copiar y pegar reportes. Tu gente se quema en tareas que un agente con IA podría resolver en minutos.",
    dolores: [
      { titulo: "Atención al cliente sin escalar", descripcion: "Mil mensajes al día, dos personas respondiendo. Los clientes se enfrían." },
      { titulo: "Procesos en la cabeza de una sola persona", descripcion: "Si esa persona renuncia, te quedas sin operación." },
      { titulo: "Reportes a mano", descripcion: "8 horas al mes copiando datos a Google Sheets solo para ver lo que ya pasó." },
      { titulo: "Herramientas desconectadas", descripcion: "Tu CRM, Gmail, WhatsApp y planilla viven en mundos paralelos." },
      { titulo: "Equipo quemado", descripcion: "La gente buena se cansa de hacer trabajo de robot. Te toca reemplazarlos cada 6 meses." },
    ],
    solucion:
      "Diseñamos flujos automáticos con n8n, agentes en WhatsApp con IA e integraciones reales con tu CRM. Lo mismo que corremos en Jarvis v2 (nuestro asistente interno) lo aplicamos a tu operación. También producimos contenido con IA para escalar volumen sin sacrificar el ADN de tu marca.",
    metricas: [
      { label: "HORAS", value: "20+", desc: "Ahorradas a la semana" },
      { label: "RESP.", value: "<1m", desc: "Tiempo de respuesta WhatsApp" },
      { label: "STACK", value: "n8n+IA", desc: "Probado en producción" },
    ],
    servicioId: "ia-automatizacion",
    servicioLabel: "Ver Automatización con IA",
  },
];
