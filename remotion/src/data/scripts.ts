/**
 * scripts.ts — 10 guiones de lanzamiento UGC Colombia
 * Fuente: content/sistemas/contenido/10-guiones-lanzamiento.md
 * Handle: @agenciaugccolombia
 */

export interface Scene {
  /** Segundo de inicio dentro del video (sin contar intro/outro) */
  startSec: number;
  /** Segundo de fin */
  endSec: number;
  /** Texto que aparece como overlay en pantalla */
  overlayText: string;
  /** Descripción del visual / b-roll para referencia de producción */
  visualNote: string;
}

export interface ReelScript {
  id: number;
  title: string;
  type: string;
  pillar: string;
  durationSec: number;
  hook: string;
  hookType: "pain" | "curiosity" | "direct" | "controversial" | "resultado" | "transformacion" | "historia";
  music: string;
  /** Texto completo del guion para ElevenLabs */
  voiceoverText: string;
  /** Notas SSML para ElevenLabs */
  elevenLabsNotes: string;
  scenes: Scene[];
  cta: string;
}

export const reelScripts: ReelScript[] = [
  {
    id: 1,
    title: "El problema con tu UGC",
    type: "Educativo — Framework",
    pillar: "Data & Angulos (TOFU-MOFU)",
    durationSec: 60,
    hook: "Si tu marca tiene UGC y aun así el CPA no baja...",
    hookType: "pain",
    music: "Lo-fi hip hop minimalista, 85 BPM, sin drops pronunciados",
    voiceoverText:
      "Si tu marca tiene UGC y aun así el CPA no baja... el problema no es el contenido. Es que el contenido no tiene estrategia. " +
      "La mayoría de marcas DTC que me escriben tienen el mismo patrón: contratan un creator, reciben el video, lo suben al ad set... y esperan. " +
      "Eso no es estrategia. Eso es suerte. " +
      "El UGC que convierte tiene tres cosas antes de que el creator abra la boca: " +
      "uno, un ángulo específico basado en el pain del buyer. " +
      "Dos, un hook testeado. " +
      "Tres, un brief que le dice al creator exactamente qué decir en los primeros tres segundos. " +
      "Sin eso, el mejor creator del mundo te va a entregar un video bacano que nadie para a ver. " +
      "El problema no es el talento. Es el sistema. " +
      "En UGC Colombia trabajamos con un framework que llamamos AURA: ángulo, urgencia, reacción, autenticidad. " +
      "Cada video que producimos pasa por ese filtro antes de llegar a tu ad account. " +
      "Si quieres ver cómo aplicamos esto a tu marca, el link está en bio. Primera consulta gratis.",
    elevenLabsNotes:
      'prosody rate="95%". Pausas críticas antes de "estrategia", "el sistema". Énfasis fuerte en: estrategia, el sistema, AURA.',
    scenes: [
      {
        startSec: 0,
        endSec: 8,
        overlayText: "Si tienes UGC y el CPA no baja...\nNo es el contenido. Es la estrategia.",
        visualNote: "Talking head, cámara cerca, fondo neutro oscuro.",
      },
      {
        startSec: 8,
        endSec: 18,
        overlayText: "Eso no es estrategia. Eso es suerte.",
        visualNote: "Pantalla dividida: lo que hacen / lo que funciona.",
      },
      {
        startSec: 18,
        endSec: 30,
        overlayText: "1. Ángulo\n2. Hook\n3. Brief",
        visualNote: "Lista aparece uno a uno mientras avanza el audio.",
      },
      {
        startSec: 30,
        endSec: 45,
        overlayText: "El problema es el sistema.",
        visualNote: "Regreso a talking head. Expresión directa.",
      },
      {
        startSec: 45,
        endSec: 55,
        overlayText: "A — Ángulo\nU — Urgencia\nR — Reacción\nA — Autenticidad",
        visualNote: "Animación tipográfica: A-U-R-A con subtexto.",
      },
      {
        startSec: 55,
        endSec: 60,
        overlayText: "Consulta gratis → Bio",
        visualNote: "CTA card final: logo + handle @agenciaugccolombia.",
      },
    ],
    cta: "Primera consulta gratis. Link en bio.",
  },
  {
    id: 2,
    title: "Por qué tus ads se ven bien y no convierten",
    type: "Educativo — Mito vs Realidad",
    pillar: "Data & Angulos (MOFU)",
    durationSec: 45,
    hook: "La razón por la que tus ads se ven bien y no convierten... nadie te la explica.",
    hookType: "curiosity",
    music: "Beat minimalista con tensión ligera, 90 BPM",
    voiceoverText:
      "La razón por la que tus ads se ven bien y no convierten... nadie te la explica. " +
      "El mito es que si el video se ve profesional, convierte mejor. La realidad es exactamente lo contrario. " +
      "En Meta, el algoritmo no premia la producción. Premia la retención. " +
      "Y la retención la gana el video que parece auténtico, no el que parece un comercial. " +
      "Tu cliente ya sabe que le estás vendiendo algo. Si el video grita comercial, lo scrollea. " +
      "La diferencia no está en la cámara ni en el set. " +
      "Está en si el video se parece a algo que un amigo le mandaría. " +
      "Eso es lo que produce UGC bien hecho: autenticidad sistematizada. " +
      "Sígueme para más datos reales sobre UGC en paid media. Cada semana.",
    elevenLabsNotes:
      'prosody rate="90%". Énfasis fuerte en "exactamente lo contrario", "retención", "autenticidad sistematizada".',
    scenes: [
      {
        startSec: 0,
        endSec: 3,
        overlayText: "Tus ads se ven bien. Y no convierten. ¿Por qué?",
        visualNote: "Talking head, tight shot, expresión de revelación.",
      },
      {
        startSec: 3,
        endSec: 12,
        overlayText: "MITO vs REALIDAD",
        visualNote: "Side by side: producción alta (MITO rojo) / UGC crudo (REALIDAD verde).",
      },
      {
        startSec: 12,
        endSec: 25,
        overlayText: "La producción no premia.\nLa retención sí.",
        visualNote: "Regreso a talking head. Gesticulación natural.",
      },
      {
        startSec: 25,
        endSec: 38,
        overlayText: "Autenticidad sistematizada.",
        visualNote: "B-roll: manos con teléfono grabando algo cotidiano.",
      },
      {
        startSec: 38,
        endSec: 45,
        overlayText: "@agenciaugccolombia\nDatos reales. Cada semana.",
        visualNote: "CTA card con handle e ícono de follow.",
      },
    ],
    cta: "Sígueme para más datos reales sobre UGC en paid media.",
  },
  {
    id: 3,
    title: "3 tipos de video que sí convierten en Meta",
    type: "Educativo — Tips accionables",
    pillar: "Data & Angulos (MOFU)",
    durationSec: 60,
    hook: "Tres tipos de UGC que convierten en Meta Ads este trimestre. Apúntalos.",
    hookType: "direct",
    music: "Trap instrumental ligero, 92 BPM, sin letra",
    voiceoverText:
      "Tres tipos de UGC que convierten en Meta Ads este trimestre. Apúntalos. " +
      "Número uno: el video problema-solución. El creator describe un pain específico del buyer en los primeros tres segundos " +
      "—llevaba seis meses buscando una proteína que no me cayera mal— " +
      "y el producto aparece como la solución natural. No como un comercial. Como una historia. " +
      "Número dos: el tutorial corto. No el tutorial de diez minutos. " +
      "Treinta segundos mostrando un uso específico del producto. " +
      "Para suplementos: cómo se mezcla. Para skincare: cómo se aplica. Para tech: un solo feature. Solo uno. " +
      "Número tres: la reacción honesta. Creator recibe el producto, lo abre en cámara, lo prueba. Sin guion perfecto. " +
      "La vacilación, la cara de sorpresa, el 'oe espera esto sí funciona' — eso vale más que cualquier producción. " +
      "Porque es lo que el viewer quiere sentir. " +
      "Los tres tienen algo en común: el producto no es el protagonista. La experiencia humana sí. " +
      "En bio dejé el PDF con los hooks que más están pegando este mes. Gratis.",
    elevenLabsNotes:
      'prosody rate="fast" en enumeración de usos. Énfasis en "Solo uno", "La experiencia humana sí".',
    scenes: [
      {
        startSec: 0,
        endSec: 3,
        overlayText: "3 UGC que convierten en Meta ahora",
        visualNote: "Texto grande en pantalla. Presenter en esquina inferior derecha.",
      },
      {
        startSec: 3,
        endSec: 15,
        overlayText: "01\nProblema → Solución\nPain del buyer en los primeros 3s",
        visualNote: "Número 01 grande. B-roll: person grabando selfie video en cocina.",
      },
      {
        startSec: 15,
        endSec: 30,
        overlayText: "02\nTutorial 30s\nUn solo feature. Solo uno.",
        visualNote: "Número 02. B-roll: manos usando producto (genérico).",
      },
      {
        startSec: 30,
        endSec: 47,
        overlayText: "03\nReacción sin guion",
        visualNote: "Número 03. B-roll: unboxing auténtico.",
      },
      {
        startSec: 47,
        endSec: 55,
        overlayText: "El producto no es el protagonista.",
        visualNote: "Talking head full, cámara cerca.",
      },
      {
        startSec: 55,
        endSec: 60,
        overlayText: "PDF Gratis → Bio",
        visualNote: "CTA card: lead magnet PDF en bio.",
      },
    ],
    cta: "PDF gratis con hooks que más están pegando. En bio.",
  },
  {
    id: 4,
    title: "Dejen de contratar influencers para vender",
    type: "Provocación — Hot Take",
    pillar: "Craft Visible (TOFU)",
    durationSec: 30,
    hook: "Dejen de contratar influencers para vender productos. En serio.",
    hookType: "controversial",
    music: "Sin música los primeros 5s, entra beat de tensión baja después",
    voiceoverText:
      "Dejen de contratar influencers para vender productos. En serio. " +
      "Un influencer de 200,000 seguidores te cobra 1,500 dólares por un post que dura 48 horas en el feed " +
      "y no tiene ninguna métrica de conversión. Cero trackeo. Cero ROAS. Solo vanity metrics. " +
      "Con ese mismo presupuesto, ocho videos UGC testeables en Meta, con ángulos diferentes, " +
      "con datos reales de retención y conversión. " +
      "Ocho chances de encontrar el creativo ganador versus una apuesta ciega. " +
      "No estoy diciendo que los influencers no sirven. " +
      "Estoy diciendo que para conversión directa, el UGC gana. Los datos lo dicen, no yo. " +
      "Sígueme si quieres ver los datos.",
    elevenLabsNotes:
      'prosody rate="fast" en enumeración 0:03-0:10. prosody pitch="+3%" en "En serio."',
    scenes: [
      {
        startSec: 0,
        endSec: 3,
        overlayText: "Dejen de contratar influencers para vender.",
        visualNote: "Talking head, zoom muy cercano. Sin música. Solo cara y texto.",
      },
      {
        startSec: 3,
        endSec: 10,
        overlayText: "$1,500 / 0 ROAS",
        visualNote: "Overlay numérico en rojo. Mismo encuadre, sin cortes.",
      },
      {
        startSec: 10,
        endSec: 20,
        overlayText: "$1,500 = 8 UGC testeables\nvs\n$1,500 = 1 post de influencer",
        visualNote: "Pantalla dividida simple. Verde vs rojo. Presenter desaparece.",
      },
      {
        startSec: 20,
        endSec: 27,
        overlayText: "Para conversión directa,\nel UGC gana.",
        visualNote: "Regreso a talking head. Tono más calmo.",
      },
      {
        startSec: 27,
        endSec: 30,
        overlayText: "",
        visualNote: "CTA simple. Corte seco al negro. Sin música final.",
      },
    ],
    cta: "Sígueme si quieres ver los datos.",
  },
  {
    id: 5,
    title: "UGC de $800 que generó $12,000",
    type: "Caso — Resultado numérico",
    pillar: "Resultados / Proof (MOFU)",
    durationSec: 45,
    hook: "Gastamos 800 dólares en UGC y generamos 12,000 en revenue en 21 días.",
    hookType: "resultado",
    music: "Chill trap con momentum, 88 BPM",
    voiceoverText:
      "Gastamos 800 dólares en UGC y generamos 12,000 en revenue en 21 días. " +
      "El cliente vendía suplementos deportivos. Tenía ads corriendo, pero el ROAS estaba en 1.1. " +
      "Básicamente rompiendo el punto de equilibrio. " +
      "El problema era el creativo: todos los videos se veían como comerciales de los 90. " +
      "Producimos ocho videos UGC con tres ángulos: problema-solución, tutorial de uso, y reacción honesta. " +
      "En el día 7, uno de los videos de reacción honesta empezó a escalar. " +
      "ROAS llegó a 4.2 en el pico. " +
      "El video no era el más producido. Era el más auténtico. " +
      "Si quieres ver el brief exacto que usamos para ese video, está en bio.",
    elevenLabsNotes: 'prosody rate="95%". Énfasis en "4.2", "el más auténtico".',
    scenes: [
      {
        startSec: 0,
        endSec: 5,
        overlayText: "$800 invertidos\n$12,000 generados\n21 días",
        visualNote: "Números grandes en pantalla. Entrada con spring animation.",
      },
      {
        startSec: 5,
        endSec: 15,
        overlayText: "ROAS inicial: 1.1x",
        visualNote: "Gráfico simple mostrando ROAS plano.",
      },
      {
        startSec: 15,
        endSec: 28,
        overlayText: "8 videos UGC\n3 ángulos distintos",
        visualNote: "Lista de ángulos aparece secuencialmente.",
      },
      {
        startSec: 28,
        endSec: 38,
        overlayText: "ROAS pico: 4.2x",
        visualNote: "Número 4.2 con animación de counter. Color dorado.",
      },
      {
        startSec: 38,
        endSec: 45,
        overlayText: "El brief exacto → Bio",
        visualNote: "CTA card premium. Fade suave.",
      },
    ],
    cta: "El brief exacto está en bio.",
  },
  {
    id: 6,
    title: "De 1.2x a 3.4x ROAS en 60 días",
    type: "Caso — Transformación",
    pillar: "Resultados / Proof (MOFU-BOFU)",
    durationSec: 60,
    hook: "En 60 días llevamos el ROAS de una marca de skincare de 1.2 a 3.4.",
    hookType: "transformacion",
    music: "Ambient electrónico, 86 BPM, build progresivo",
    voiceoverText:
      "En 60 días llevamos el ROAS de una marca de skincare de 1.2 a 3.4. " +
      "Sin cambiar el producto. Sin cambiar el presupuesto de pauta. Solo cambiamos el creativo. " +
      "Mes uno: diagnóstico. Revisamos todos los ads activos. " +
      "El 80% de los creativos eran fotos de producto con texto encima. " +
      "El 20% restante era video, pero producción de estudio. Ningún UGC. " +
      "Semana dos: producimos 12 videos UGC con seis creators diferentes. " +
      "Ángulos variados: tutorial, transformación antes-después, reacción de primera vez. " +
      "Semana cuatro: uno de los videos de transformación escaló. " +
      "Una creator mostrando su rutina de 30 días con el producto. Sin filtros. Sin edición pesada. " +
      "El video llegó a 2.3 millones de vistas orgánicas en TikTok antes de que lo pusieran en paid. " +
      "Al mes dos, ese creativo solo llevaba el ROAS a 3.4. " +
      "La marca aumentó el presupuesto tres veces. " +
      "Lo que cambió no fue el dinero. Fue el sistema creativo. " +
      "Si quieres ver la estrategia completa, tenemos una llamada de diagnóstico de 30 minutos. Link en bio.",
    elevenLabsNotes: 'prosody rate="93%". Build de energía hacia el pico del ROAS. Pausa antes de "Lo que cambió".',
    scenes: [
      {
        startSec: 0,
        endSec: 6,
        overlayText: "ROAS: 1.2x → 3.4x\n60 días. Solo el creativo cambió.",
        visualNote: "Hook visual con números grandes. Flecha de transformación.",
      },
      {
        startSec: 6,
        endSec: 20,
        overlayText: "Mes 1: Diagnóstico\n80% fotos. 0% UGC.",
        visualNote: "Breakdown visual del mix de creativos anterior.",
      },
      {
        startSec: 20,
        endSec: 35,
        overlayText: "12 videos UGC\n6 creators\n3 ángulos",
        visualNote: "Grid de thumbnails de videos (placeholder). Aparecen secuencialmente.",
      },
      {
        startSec: 35,
        endSec: 50,
        overlayText: "2.3M vistas orgánicas\nRedes → Paid",
        visualNote: "Número de vistas con counter animation. Color dorado.",
      },
      {
        startSec: 50,
        endSec: 55,
        overlayText: "Lo que cambió:\nel sistema creativo.",
        visualNote: "Talking head. Pausa dramática.",
      },
      {
        startSec: 55,
        endSec: 60,
        overlayText: "Diagnóstico 30 min → Bio",
        visualNote: "CTA card premium con llamada de diagnóstico.",
      },
    ],
    cta: "Llamada de diagnóstico 30 minutos. Link en bio.",
  },
  {
    id: 7,
    title: "Lo que pasa antes de grabar",
    type: "BTS — Producción",
    pillar: "Craft Visible (TOFU)",
    durationSec: 45,
    hook: "Esto es lo que pasa en las 48 horas antes de que un creator grabe para nuestros clientes.",
    hookType: "historia",
    music: "Lo-fi chill, 80 BPM, tranquilo",
    voiceoverText:
      "Esto es lo que pasa en las 48 horas antes de que un creator grabe para nuestros clientes. " +
      "Paso uno: revisamos el ad account del cliente. Qué hooks han funcionado, cuáles han fallado, cuál es el CPM. " +
      "No adivinamos. Usamos datos. " +
      "Paso dos: definimos el ángulo. No 'haz un video del producto'. " +
      "'Eres una mamá de 34 años que llevaba seis meses con acné hormonal y esto fue lo primero que funcionó.' " +
      "Eso es un brief. " +
      "Paso tres: enviamos el producto con el brief al creator. " +
      "Le damos libertad de entrega pero el ángulo y el hook están definidos. " +
      "Paso cuatro: revisión de primer draft. Feedback en 24 horas. " +
      "Entrega final en 72 horas desde que el creator recibe el producto. " +
      "Eso es producción UGC sistematizada. No depende de la inspiración. Depende del proceso.",
    elevenLabsNotes: 'prosody rate="95%". Tono conversacional de BTS. Énfasis en "datos", "proceso".',
    scenes: [
      {
        startSec: 0,
        endSec: 4,
        overlayText: "48h antes de grabar.\n¿Qué pasa?",
        visualNote: "Hook visual. Reloj o timeline gráfico.",
      },
      {
        startSec: 4,
        endSec: 15,
        overlayText: "Paso 1: Ad account review\nDatos, no suposiciones.",
        visualNote: "BTS: pantalla de Meta Ads Manager (mockup o blur).",
      },
      {
        startSec: 15,
        endSec: 25,
        overlayText: 'Paso 2: El brief exacto\n"Eres una mamá de 34 años..."',
        visualNote: "Documento de brief en pantalla (mockup).",
      },
      {
        startSec: 25,
        endSec: 35,
        overlayText: "Paso 3: Producto + Brief → Creator\nLibertad de entrega, ángulo definido.",
        visualNote: "BTS: empacando producto para envío.",
      },
      {
        startSec: 35,
        endSec: 45,
        overlayText: "Entrega en 72h.\nProceso, no inspiración.",
        visualNote: "Timeline de 72h. CTA sutil al final.",
      },
    ],
    cta: "Proceso, no inspiración. Así funciona UGC Colombia.",
  },
  {
    id: 8,
    title: "Dirigiendo un creator en Bogotá",
    type: "BTS — Casting y dirección",
    pillar: "Craft Visible (TOFU)",
    durationSec: 60,
    hook: "Así dirigimos a un creator en Bogotá para un cliente de Miami.",
    hookType: "curiosity",
    music: "Trap colombiano suave, 90 BPM",
    voiceoverText:
      "Así dirigimos a un creator en Bogotá para un cliente de Miami. " +
      "El cliente vende un suplemento de colágeno para mujeres mayores de 35. " +
      "Necesitábamos una creator que se viera real, no como modelo. Alguien con quien el target se identificara. " +
      "Casting: revisamos 40 perfiles de TikTok colombianos. " +
      "No buscamos seguidores. Buscamos engagement rate y naturalidad frente a cámara. " +
      "Seleccionamos tres. Les enviamos brief y producto. " +
      "En la dirección, le pedimos a la creator que grabara sin maquillaje. " +
      "No porque el cliente lo pidiera. Porque el dato de conversión nos dice que la autenticidad visual " +
      "en el hook de los primeros tres segundos aumenta la retención en un 40%. " +
      "El video que grabó esa creator en su apartamento en Chapinero " +
      "tuvo mejor CTR que el video de estudio que el cliente tenía corriendo hace tres meses. " +
      "Bogotá produce UGC de talla mundial. Solo necesita el sistema correcto detrás.",
    elevenLabsNotes: 'prosody rate="95%". Orgullo colombiano en el cierre. Énfasis en "Chapinero", "talla mundial".',
    scenes: [
      {
        startSec: 0,
        endSec: 5,
        overlayText: "Creator en Bogotá.\nCliente en Miami.",
        visualNote: "Mapa animado simple Colombia → Miami.",
      },
      {
        startSec: 5,
        endSec: 18,
        overlayText: "40 perfiles revisados\nEngagement rate, no seguidores.",
        visualNote: "Grid de perfiles TikTok (placeholder/blur).",
      },
      {
        startSec: 18,
        endSec: 35,
        overlayText: "Dirección:\nSin maquillaje. En su apartamento.\nRetención +40%.",
        visualNote: "BTS del set en apartamento. Iluminación natural.",
      },
      {
        startSec: 35,
        endSec: 50,
        overlayText: "CTR del UGC > Video de estudio\n(3 meses corriendo)",
        visualNote: "Comparativa de métricas. Dorado vs gris.",
      },
      {
        startSec: 50,
        endSec: 60,
        overlayText: "Bogotá produce UGC\nde talla mundial.",
        visualNote: "Cierre con logo UGC Colombia y tagline.",
      },
    ],
    cta: "Bogotá produce UGC de talla mundial.",
  },
  {
    id: 9,
    title: "La realidad del UGC barato",
    type: "Provocación — Hot Take",
    pillar: "Diferenciación (MOFU)",
    durationSec: 30,
    hook: "El UGC de 50 dólares te está costando mucho más de 50 dólares.",
    hookType: "controversial",
    music: "Sin música los primeros 3s. Beat de tensión después.",
    voiceoverText:
      "El UGC de 50 dólares te está costando mucho más de 50 dólares. " +
      "El video llega en 48 horas. Sin brief estratégico. Sin revisión de ángulo. " +
      "Sin entender quién es el buyer persona ni qué pain específico tiene. " +
      "Lo subes al ad set porque ya lo pagaste. El CPM sube porque la retención es baja. " +
      "El algoritmo lo penaliza. Gastas más en pauta para compensar un creativo débil. " +
      "Ese video de 50 dólares te costó 800 en pauta desperdiciada. " +
      "El UGC barato no es barato. Es caro con pasos extra. " +
      "Lo que necesitas no es UGC más barato. Necesitas UGC que funcione.",
    elevenLabsNotes: 'prosody rate="fast" en la secuencia de consecuencias. Énfasis en "800 en pauta desperdiciada".',
    scenes: [
      {
        startSec: 0,
        endSec: 4,
        overlayText: "El UGC de $50\nte está costando mucho más.",
        visualNote: "Texto grande. Sin música. Pattern interrupt.",
      },
      {
        startSec: 4,
        endSec: 18,
        overlayText: "CPM sube → Retención baja\nAlgoritmo penaliza → Más pauta",
        visualNote: "Cadena de consecuencias visual. Flechas en rojo.",
      },
      {
        startSec: 18,
        endSec: 25,
        overlayText: "$50 de UGC\n= $800 en pauta desperdiciada",
        visualNote: "Ecuación visual en pantalla. Rojo a izquierda.",
      },
      {
        startSec: 25,
        endSec: 30,
        overlayText: "No necesitas UGC barato.\nNecesitas UGC que funcione.",
        visualNote: "Cierre directo. Texto bold en blanco.",
      },
    ],
    cta: "No necesitas UGC barato. Necesitas UGC que funcione.",
  },
  {
    id: 10,
    title: "Qué hace diferente UGC Colombia",
    type: "Oferta Soft — Presentación",
    pillar: "Diferenciación / Cierre (BOFU)",
    durationSec: 60,
    hook: "Somos la única agencia UGC en LATAM que trabaja con un sistema de datos antes de producir un solo video.",
    hookType: "direct",
    music: "Ambient premium, 84 BPM, crescendo suave",
    voiceoverText:
      "Somos la única agencia UGC en LATAM que trabaja con un sistema de datos antes de producir un solo video. " +
      "La mayoría de agencias UGC te entregan videos. Nosotros te entregamos un sistema creativo. " +
      "La diferencia está en el proceso: " +
      "Primero, analizamos tu ad account. Qué está funcionando, qué está quemado, cuál es tu CPA actual. " +
      "Segundo, definimos los ángulos con base en datos de tu industria y tu buyer persona. " +
      "No creatividad por intuición. Creatividad por datos. " +
      "Tercero, producimos con creators colombianos seleccionados. " +
      "Gente real con carisma real, dirigidos con briefs profesionales. " +
      "Cuarto, entregamos con métricas. Sabes qué video generó qué resultado. " +
      "Trabajamos con marcas DTC en USA, México y Colombia. " +
      "Presupuestos desde 800 dólares mensuales. " +
      "Si quieres ver si somos el fit correcto para tu marca, " +
      "tenemos una llamada de diagnóstico gratuita de 30 minutos. " +
      "El link está en bio. Solo tomamos 5 clientes nuevos por mes.",
    elevenLabsNotes: 'prosody rate="93%". Tono de autoridad. Énfasis en "datos", "sistema", "5 clientes por mes".',
    scenes: [
      {
        startSec: 0,
        endSec: 6,
        overlayText: "La única agencia UGC en LATAM\ncon sistema de datos primero.",
        visualNote: "Hook visual impactante. Logo + tagline.",
      },
      {
        startSec: 6,
        endSec: 16,
        overlayText: "No solo videos.\nUn sistema creativo.",
        visualNote: "Diferenciación visual: videos vs sistema.",
      },
      {
        startSec: 16,
        endSec: 32,
        overlayText: "1. Ad Account Review\n2. Ángulos por datos\n3. Creators colombianos\n4. Métricas de entrega",
        visualNote: "Lista de pasos aparece secuencialmente.",
      },
      {
        startSec: 32,
        endSec: 45,
        overlayText: "USA · México · Colombia\nDesde $800 USD/mes",
        visualNote: "Mapa de cobertura o iconos de banderas.",
      },
      {
        startSec: 45,
        endSec: 55,
        overlayText: "Diagnóstico gratuito 30 min",
        visualNote: "CTA card prominente.",
      },
      {
        startSec: 55,
        endSec: 60,
        overlayText: "Solo 5 clientes nuevos por mes.\nLink en bio.",
        visualNote: "Urgencia/escasez. Fade a logo.",
      },
    ],
    cta: "Diagnóstico gratuito 30 minutos. Solo 5 cupos por mes. Link en bio.",
  },
];

export type { ReelScript, Scene };
