// Micro-insights que se muestran entre preguntas del quiz
// Cada insight posiciona a UGC Colombia como solución sin decirlo explícitamente

interface Insight {
  text: string;
  emoji: string;
}

const INSIGHTS: Record<string, Record<string, Insight>> = {
  biggest_pain: {
    no_tengo_contenido: {
      text: "El 78% de las marcas en LATAM no tienen contenido suficiente para competir. Vamos a cambiar eso.",
      emoji: "💡",
    },
    contenido_no_convierte: {
      text: "El 73% de las marcas tienen este mismo problema. La buena noticia: tiene solución medible.",
      emoji: "📊",
    },
    muy_caro: {
      text: "El contenido UGC cuesta entre 60-80% menos que producción tradicional con los mismos resultados.",
      emoji: "💰",
    },
    no_encuentro_creadores: {
      text: "Encontrar creadores confiables es el #1 dolor en la industria. Por eso existen las agencias UGC.",
      emoji: "🎯",
    },
    inconsistencia: {
      text: "La consistencia es el factor #1 que diferencia marcas que crecen de las que se estancan.",
      emoji: "📈",
    },
    no_se_que_hacer: {
      text: "Empezar es más fácil de lo que crees. Un diagnóstico claro es el primer paso.",
      emoji: "🚀",
    },
  },
  ad_budget: {
    nada: {
      text: "Sin distribución, incluso el mejor contenido pasa desapercibido. Pero primero lo primero: el contenido.",
      emoji: "📢",
    },
    menos_500: {
      text: "Con menos de $500, cada dólar debe trabajar el doble. El contenido UGC tiene el mejor ROI por dólar.",
      emoji: "⚡",
    },
    "500_1000": {
      text: "Buen rango para empezar. Con creativos optimizados podrías duplicar tus resultados sin subir el presupuesto.",
      emoji: "📈",
    },
    "1000_3000": {
      text: "Con $1K-$3K en ads, cada dólar sin buen creativo es dinero quemado. UGC logra 2-4x mejor ROAS.",
      emoji: "🔥",
    },
    "3000_5000": {
      text: "A este nivel de inversión, la calidad del creativo es tu mayor palanca. Un 1% más de CTR = miles de dólares.",
      emoji: "💎",
    },
    mas_5000: {
      text: "Con +$5K mensuales, necesitas un pipeline constante de creativos frescos. Es exactamente lo que hacemos.",
      emoji: "🏆",
    },
  },
  content_budget: {
    nada: {
      text: "Sin inversión en contenido, tu marca depende de lo que ya tienes. Y el mercado no espera.",
      emoji: "⏰",
    },
    menos_500: {
      text: "Con un presupuesto ajustado, el UGC es tu mejor aliado: calidad profesional a precio de freelancer.",
      emoji: "✨",
    },
    "500_1000": {
      text: "Buen punto de partida. La pregunta es: ¿estás obteniendo el máximo valor por cada dólar?",
      emoji: "🤔",
    },
    "1000_3000": {
      text: "Con esa inversión deberías tener entre 8-15 piezas de calidad al mes. ¿Las tienes?",
      emoji: "📊",
    },
    "3000_5000": {
      text: "Inversión seria. Asegúrate de que cada pieza esté optimizada para conversión, no solo para estética.",
      emoji: "🎯",
    },
    mas_5000: {
      text: "A este nivel necesitas una operación de contenido, no piezas sueltas. Estrategia + producción integradas.",
      emoji: "🏗️",
    },
  },
  has_active_ads: {
    true: {
      text: "Bien — tienes la distribución activa. Ahora la pregunta es si tus creativos están a la altura.",
      emoji: "✅",
    },
    false: {
      text: "Sin ads activos, tu contenido depende 100% del algoritmo orgánico. Es una apuesta arriesgada.",
      emoji: "⚠️",
    },
  },
  current_ctr: {
    no_se: {
      text: "No medir el CTR es como manejar con los ojos cerrados. Vamos a abrirlos con tu diagnóstico.",
      emoji: "👀",
    },
    menos_1: {
      text: "CTR <1% = tu creatividad no conecta. El contenido UGC auténtico logra 2.5x más clics que el branded.",
      emoji: "🚨",
    },
    "1_2": {
      text: "CTR decente, pero hay espacio para mejorar. Con creativos frescos de UGC podrías llegar a +2%.",
      emoji: "📈",
    },
    mas_2: {
      text: "Excelente CTR. Tu contenido funciona — ahora necesitas escalar la producción sin perder calidad.",
      emoji: "🏆",
    },
  },
  creative_age_weeks: {
    menos_2: {
      text: "Contenido fresco — vas bien. La clave es mantener este ritmo de rotación.",
      emoji: "✅",
    },
    "2_4": {
      text: "Estás en el límite. Después de 3 semanas, Meta empieza a penalizar creativos repetidos.",
      emoji: "⏰",
    },
    "4_8": {
      text: "Alerta: después de 4 semanas, la efectividad cae hasta un 60%. Tu CPM podría estar inflado.",
      emoji: "⚠️",
    },
    mas_8: {
      text: "Más de 2 meses sin contenido nuevo = fatiga creativa garantizada. Esto se nota en tu billetera.",
      emoji: "🚨",
    },
    no_tengo: {
      text: "El 92% de los consumidores confía más en contenido de personas reales. Es hora de empezar.",
      emoji: "💡",
    },
  },
  monthly_content_pieces: {
    "0": {
      text: "Sin producción de contenido, tu marca es invisible digitalmente. Vamos a resolver eso.",
      emoji: "🔇",
    },
    "1_3": {
      text: "1-3 piezas no alcanzan para alimentar el algoritmo. Las marcas top producen +10/mes.",
      emoji: "📉",
    },
    "4_8": {
      text: "Buen volumen base. Ahora la pregunta es: ¿están optimizadas para conversión?",
      emoji: "🤔",
    },
    "9_15": {
      text: "Producción sólida. Con la estrategia correcta, podrías multiplicar resultados sin más contenido.",
      emoji: "💪",
    },
    mas_15: {
      text: "Producción activa — bien. El reto ahora es calidad y estrategia, no solo volumen.",
      emoji: "🎯",
    },
  },
  urgency: {
    inmediata: {
      text: "Entendido — cada semana sin contenido nuevo son oportunidades perdidas. Vamos a actuar rápido.",
      emoji: "⚡",
    },
    este_mes: {
      text: "Buen timing. Arrancando este mes podrías tener resultados antes de que termine el siguiente.",
      emoji: "🗓️",
    },
    proximo_trimestre: {
      text: "Planificar con tiempo es inteligente. Así puedes lanzar con todo cuando estés listo.",
      emoji: "🧠",
    },
    explorando: {
      text: "Sin prisa — pero los datos que vas a ver en tu diagnóstico podrían cambiar tu perspectiva.",
      emoji: "👀",
    },
  },
  competitor_awareness: {
    si_mucho: {
      text: "Tu competencia ya está invirtiendo en contenido. Cada día que pasa, la brecha crece.",
      emoji: "🏃",
    },
    si_poco: {
      text: "Hay una ventana de oportunidad — tu competencia aún no domina el contenido. Aprovéchala.",
      emoji: "🪟",
    },
    no: {
      text: "Excelente noticia: puedes ser el primero en tu nicho en dominar el contenido UGC.",
      emoji: "🥇",
    },
    no_se: {
      text: "Tu diagnóstico incluirá un análisis de lo que hace tu competencia. Te va a sorprender.",
      emoji: "🔍",
    },
  },
  conversion_goal: {
    mas_ventas: {
      text: "Ventas directas — el objetivo más medible. UGC es el formato con mayor conversión en ads.",
      emoji: "💰",
    },
    mas_alcance: {
      text: "Alcance + seguidores = top of funnel. El UGC orgánico tiene 6.9x más alcance que branded content.",
      emoji: "📢",
    },
    mejor_branding: {
      text: "Imagen de marca se construye con consistencia y autenticidad — exactamente lo que es UGC.",
      emoji: "✨",
    },
    reducir_costos: {
      text: "UGC cuesta 60-80% menos que producción tradicional. Misma calidad, fracción del precio.",
      emoji: "📉",
    },
  },
  team_resources: {
    nadie: {
      text: "Hacerlo todo solo/a no escala. Una agencia UGC se convierte en tu equipo de contenido.",
      emoji: "🤝",
    },
    freelancer: {
      text: "Los freelancers son impredecibles. Un equipo dedicado te da consistencia y calidad garantizada.",
      emoji: "🔄",
    },
    equipo_pequeno: {
      text: "Buen inicio. La pregunta es si tu equipo tiene tiempo para producir el volumen que necesitas.",
      emoji: "⏰",
    },
    agencia: {
      text: "No todas las agencias son iguales. La diferencia está en entender UGC como estrategia, no solo producción.",
      emoji: "💡",
    },
  },
};

export function getInsight(questionKey: string, answerValue: string): Insight | null {
  return INSIGHTS[questionKey]?.[answerValue] ?? null;
}
