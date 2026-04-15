export interface Pillar {
  number: string;
  category: string;
  name: string;
  desc: string;
  percent: number;
  focus: string;
}

export const pillars: Pillar[] = [
  {
    number: "01",
    category: "EDUCATIVO",
    name: "La Academia UGC",
    desc: "Tutoriales, frameworks originales, desgloses técnicos. Autoridad pedagógica.",
    percent: 30,
    focus: "Autoridad",
  },
  {
    number: "02",
    category: "DEBATE",
    name: "Opinión sin filtro",
    desc: "Hot takes, críticas fundamentadas, predicciones polémicas. Generar conversación.",
    percent: 20,
    focus: "Conversación",
  },
  {
    number: "03",
    category: "ESTRATÉGICO",
    name: "El Pizarrón",
    desc: "Breakdowns, frameworks de funnel, teardowns. Nivel consultor senior.",
    percent: 20,
    focus: "Expertise",
  },
  {
    number: "04",
    category: "CASOS & RESULTADOS",
    name: "El Scoreboard",
    desc: "Case studies, testimonios reales, números verificables. Social proof masivo.",
    percent: 15,
    focus: "Prueba",
  },
  {
    number: "05",
    category: "DETRÁS DE CÁMARAS",
    name: "La Familia UGC",
    desc: "BTS del equipo, creators, operación real. Humanizar la marca.",
    percent: 15,
    focus: "Humanidad",
  },
];

export const pillarsRule =
  "Cada pieza clasifica en uno y solo un pilar. Mix evaluado mensualmente. Total semanal = 100%.";
