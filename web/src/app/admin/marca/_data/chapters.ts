import type { LucideIcon } from "lucide-react";
import {
  Fingerprint,
  Palette,
  Type,
  ImageIcon,
  Blocks,
  LayoutGrid,
  MessageSquare,
  Zap,
  Columns4,
  CalendarDays,
  FileImage,
  CheckSquare,
} from "lucide-react";

export interface Chapter {
  slug: string;
  number: string;
  title: string;
  eyebrow: string;
  desc: string;
  icon: LucideIcon;
  pdfPage: number;
}

export const chapters: Chapter[] = [
  {
    slug: "01-identidad",
    number: "01",
    title: "Identidad",
    eyebrow: "Identidad y posicionamiento",
    desc: "Quiénes somos, tagline, arquetipo, promesa y valores.",
    icon: Fingerprint,
    pdfPage: 3,
  },
  {
    slug: "02-color",
    number: "02",
    title: "Color",
    eyebrow: "Paleta oficial",
    desc: "Negro absoluto, amarillo solar y oro premium. HEX/RGB/CSS vars.",
    icon: Palette,
    pdfPage: 4,
  },
  {
    slug: "03-tipografia",
    number: "03",
    title: "Tipografía",
    eyebrow: "Dos familias, un ritmo",
    desc: "Anton display + Inter body. Jerarquía completa.",
    icon: Type,
    pdfPage: 5,
  },
  {
    slug: "04-logo",
    number: "04",
    title: "Logo",
    eyebrow: "Marca aplicada",
    desc: "4 variantes oficiales, efecto shine, clearspace, do/don't.",
    icon: ImageIcon,
    pdfPage: 6,
  },
  {
    slug: "05-componentes-ui",
    number: "05",
    title: "Componentes UI",
    eyebrow: "Sistema en código",
    desc: "Buttons, badges, cards y stack técnico.",
    icon: Blocks,
    pdfPage: 7,
  },
  {
    slug: "06-sistema",
    number: "06",
    title: "Sistema",
    eyebrow: "Grid, spacing, radios",
    desc: "12 columnas, escala de spacing, radios, overlays.",
    icon: LayoutGrid,
    pdfPage: 8,
  },
  {
    slug: "07-voz",
    number: "07",
    title: "Voz",
    eyebrow: "Cómo hablamos",
    desc: "Somos/no somos, reglas de copy, fórmulas de headline.",
    icon: MessageSquare,
    pdfPage: 9,
  },
  {
    slug: "08-efectos",
    number: "08",
    title: "Efectos",
    eyebrow: "Movimiento y presencia",
    desc: "Glow pulse, text reveal, marquee, shine. Live demos.",
    icon: Zap,
    pdfPage: 10,
  },
  {
    slug: "09-pilares",
    number: "09",
    title: "Pilares",
    eyebrow: "Los 5 pilares de contenido",
    desc: "Educativo, debate, estratégico, casos, BTS. KPIs y %.",
    icon: Columns4,
    pdfPage: 11,
  },
  {
    slug: "10-parrilla",
    number: "10",
    title: "Parrilla",
    eyebrow: "Parrilla semanal",
    desc: "~25 piezas/sem en 7 plataformas. Cadencia y rol.",
    icon: CalendarDays,
    pdfPage: 12,
  },
  {
    slug: "11-plantillas",
    number: "11",
    title: "Plantillas",
    eyebrow: "Plantillas por formato",
    desc: "Specs por plataforma: IG, TikTok, LinkedIn, YouTube.",
    icon: FileImage,
    pdfPage: 13,
  },
  {
    slug: "12-checklist",
    number: "12",
    title: "Checklist",
    eyebrow: "Antes de publicar",
    desc: "Checklist obligatorio + reglas innegociables.",
    icon: CheckSquare,
    pdfPage: 14,
  },
];

export const chapterBySlug = (slug: string): Chapter | undefined =>
  chapters.find((c) => c.slug === slug);

export const VALID_CHAPTER_SLUGS = new Set(chapters.map((c) => c.slug));
