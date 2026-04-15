export interface DaySlot {
  slot: string;
  platform: string;
  type: string;
}

export interface ScheduleDay {
  day: string;
  shortDay: string;
  slots: DaySlot[];
}

export const weeklyGrid: ScheduleDay[] = [
  {
    day: "Lunes",
    shortDay: "LUN",
    slots: [
      { slot: "AM", platform: "LinkedIn", type: "Post estratégico" },
      { slot: "MID", platform: "IG Carrusel", type: "Framework" },
      { slot: "PM", platform: "X Thread", type: "Educativo" },
    ],
  },
  {
    day: "Martes",
    shortDay: "MAR",
    slots: [
      { slot: "AM", platform: "TikTok", type: "Hot take" },
      { slot: "MID", platform: "IG Reel", type: "BTS" },
      { slot: "PM", platform: "LinkedIn Alex", type: "Personal" },
      { slot: "EVE", platform: "YouTube Long", type: "Bi-semanal" },
    ],
  },
  {
    day: "Miércoles",
    shortDay: "MIE",
    slots: [
      { slot: "AM", platform: "IG Feed", type: "Caso real" },
      { slot: "MID", platform: "TikTok", type: "Educativo" },
      { slot: "PM", platform: "Newsletter", type: "Envío semanal" },
    ],
  },
  {
    day: "Jueves",
    shortDay: "JUE",
    slots: [
      { slot: "AM", platform: "LinkedIn", type: "Debate" },
      { slot: "MID", platform: "TikTok", type: "Serie" },
      { slot: "PM", platform: "YouTube Short", type: "Reuso" },
    ],
  },
  {
    day: "Viernes",
    shortDay: "VIE",
    slots: [
      { slot: "AM", platform: "IG Reel", type: "Testimonio" },
      { slot: "MID", platform: "TikTok", type: "Equipo" },
      { slot: "PM", platform: "LinkedIn Alex", type: "BOFU" },
      { slot: "EVE", platform: "WhatsApp", type: "Broadcast" },
    ],
  },
  {
    day: "Sábado",
    shortDay: "SAB",
    slots: [
      { slot: "AM", platform: "TikTok", type: "Tip rápido" },
      { slot: "PM", platform: "X", type: "Tweet solo" },
    ],
  },
  {
    day: "Domingo",
    shortDay: "DOM",
    slots: [{ slot: "ALL", platform: "IG Stories", type: "Community" }],
  },
];

export interface PlatformCadence {
  platform: string;
  weekly: string;
  monthly: string;
  role: string;
}

export const platformCadence: PlatformCadence[] = [
  {
    platform: "Instagram",
    weekly: "4 posts",
    monthly: "16",
    role: "Awareness + Authority",
  },
  { platform: "TikTok", weekly: "5 videos", monthly: "20", role: "Viralidad TOFU" },
  {
    platform: "LinkedIn Empresa",
    weekly: "3 posts",
    monthly: "12",
    role: "Leads B2B directos",
  },
  {
    platform: "LinkedIn Alexander",
    weekly: "3 posts",
    monthly: "12",
    role: "Personal brand · cierre",
  },
  {
    platform: "YouTube",
    weekly: "2 Shorts + 1 Long /2sem",
    monthly: "8 + 2",
    role: "SEO autoridad evergreen",
  },
  {
    platform: "X / Twitter",
    weekly: "5 tweets",
    monthly: "20",
    role: "Distribución y comunidad",
  },
  {
    platform: "WhatsApp Business",
    weekly: "2 broadcasts",
    monthly: "8",
    role: "BOFU directo",
  },
  { platform: "Newsletter", weekly: "1 envío", monthly: "4", role: "Nurture MOFU/BOFU" },
];

export const scheduleSummary = "~25 piezas semanales distribuidas en 7 plataformas. Cada día tiene un tema dominante.";
