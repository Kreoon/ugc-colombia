export interface ButtonVariant {
  id: string;
  label: string;
  variant: "default" | "outline" | "ghost";
  classes: string;
  description: string;
}

export const buttons: ButtonVariant[] = [
  {
    id: "default",
    label: "AGENDAR CALL",
    variant: "default",
    classes: "bg-brand-yellow text-black shadow-yellow hover:bg-brand-yellow-hover",
    description: "DEFAULT · YELLOW — bg-brand-yellow text-black · shadow glow",
  },
  {
    id: "outline",
    label: "VER CASOS",
    variant: "outline",
    classes: "border border-brand-gold text-brand-gold hover:bg-brand-gold/10",
    description: "OUTLINE · GOLD BORDER — border brand-gold · texto gold",
  },
  {
    id: "ghost",
    label: "MÁS INFO",
    variant: "ghost",
    classes: "text-brand-gray hover:text-white",
    description: "GHOST · TRANSPARENT — text-brand-gray · hover:white",
  },
];

export interface BadgeVariant {
  id: string;
  label: string;
  classes: string;
}

export const badges: BadgeVariant[] = [
  {
    id: "default",
    label: "DEFAULT",
    classes: "bg-white/10 text-white border border-white/20",
  },
  {
    id: "gold",
    label: "GOLD",
    classes: "bg-brand-gold/15 text-brand-gold border border-brand-gold/30",
  },
  {
    id: "outline",
    label: "OUTLINE",
    classes: "border border-brand-gray text-brand-gray",
  },
  {
    id: "solid",
    label: "SOLID",
    classes: "bg-brand-yellow text-black",
  },
];

export const cardSpec = {
  base: "p-6 rounded-2xl bg-white/[0.04] border border-brand-gold/15",
  description:
    "CARD · CON BORDER GOLD/15 Y BG WHITE/4 — patrón dominante en web: Hero, Casos, Testimonios.",
};

export const techStack = [
  { dep: "Next.js", version: "15.5.15", role: "Framework · Turbopack · App Router" },
  { dep: "React", version: "19.1.0", role: "Biblioteca UI" },
  { dep: "Tailwind CSS", version: "4.1.3", role: "Sistema de estilos · tokens" },
  { dep: "Motion (Framer)", version: "11.18.2", role: "Animaciones · stagger · fade-up" },
  { dep: "Radix UI", version: "latest", role: "Dialog · Accordion · Tabs · Select" },
  { dep: "Lucide React", version: "0.487.0", role: "Iconos (outline, 1.5px stroke)" },
];
