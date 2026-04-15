// Pipeline de status para guiones de contenido.
// Mismo enum que content_scripts.status en Supabase.

export const SCRIPT_STATUSES = [
  "borrador",
  "aprobado",
  "grabado",
  "editando",
  "entregado",
  "publicado",
  "archivado",
] as const;

export type ScriptStatus = (typeof SCRIPT_STATUSES)[number];

export interface ScriptStatusMeta {
  value: ScriptStatus;
  label: string;
  color: string;
  bgColor: string;
  borderColor: string;
  icon: string;
  order: number;
  description: string;
}

export const SCRIPT_STATUS_META: Record<ScriptStatus, ScriptStatusMeta> = {
  borrador: {
    value: "borrador",
    label: "Borrador",
    color: "text-brand-gray",
    bgColor: "bg-white/5",
    borderColor: "border-white/10",
    icon: "✏️",
    order: 0,
    description: "Guion escrito, pendiente de aprobar",
  },
  aprobado: {
    value: "aprobado",
    label: "Aprobado",
    color: "text-blue-400",
    bgColor: "bg-blue-500/10",
    borderColor: "border-blue-500/30",
    icon: "✅",
    order: 1,
    description: "Listo para grabar",
  },
  grabado: {
    value: "grabado",
    label: "Grabado",
    color: "text-purple-400",
    bgColor: "bg-purple-500/10",
    borderColor: "border-purple-500/30",
    icon: "🎥",
    order: 2,
    description: "Bruto listo, en cola de edición",
  },
  editando: {
    value: "editando",
    label: "Editando",
    color: "text-amber-400",
    bgColor: "bg-amber-500/10",
    borderColor: "border-amber-500/30",
    icon: "✂️",
    order: 3,
    description: "Valentina trabajando en la edición",
  },
  entregado: {
    value: "entregado",
    label: "Entregado",
    color: "text-cyan-400",
    bgColor: "bg-cyan-500/10",
    borderColor: "border-cyan-500/30",
    icon: "📦",
    order: 4,
    description: "Versión final lista, aún no publicada",
  },
  publicado: {
    value: "publicado",
    label: "Publicado",
    color: "text-emerald-400",
    bgColor: "bg-emerald-500/10",
    borderColor: "border-emerald-500/30",
    icon: "🚀",
    order: 5,
    description: "Live en al menos una plataforma",
  },
  archivado: {
    value: "archivado",
    label: "Archivado",
    color: "text-brand-gray",
    bgColor: "bg-white/5",
    borderColor: "border-white/10",
    icon: "🗄️",
    order: 6,
    description: "Retirado del feed activo",
  },
};

export function isScriptStatus(value: unknown): value is ScriptStatus {
  return (
    typeof value === "string" &&
    (SCRIPT_STATUSES as readonly string[]).includes(value)
  );
}

export function scriptStatusMeta(status: string | null | undefined): ScriptStatusMeta {
  return isScriptStatus(status)
    ? SCRIPT_STATUS_META[status]
    : SCRIPT_STATUS_META.borrador;
}

// ──────────────────────────────────────────────────────────
// Pilares y plataformas
// ──────────────────────────────────────────────────────────

export const SCRIPT_PILLARS = [
  // v1 (formatos)
  "educativo",
  "provocacion",
  "caso_exito",
  "bts",
  "autoridad",
  "comunidad",
  "prueba_social",
  // v2 (pilares UGC Colombia — packs virales por persona)
  "craft_visible",
  "data_angulos",
  "casos_resultados",
  "equipo_cultura",
  "oferta_conversion",
] as const;

export type ScriptPillar = (typeof SCRIPT_PILLARS)[number];

export const SCRIPT_PILLAR_LABEL: Record<ScriptPillar, string> = {
  educativo: "Educativo",
  provocacion: "Provocación",
  caso_exito: "Caso de éxito",
  bts: "Behind the scenes",
  autoridad: "Autoridad",
  comunidad: "Comunidad",
  prueba_social: "Prueba social",
  craft_visible: "Craft Visible",
  data_angulos: "Data & Ángulos",
  casos_resultados: "Casos y Resultados",
  equipo_cultura: "Equipo y Cultura",
  oferta_conversion: "Oferta y Conversión",
};

export const SCRIPT_PLATFORMS = [
  "instagram_reel",
  "tiktok",
  "youtube_shorts",
  "linkedin",
  "x",
  "youtube_long",
  "newsletter",
  "otro",
] as const;

export type ScriptPlatform = (typeof SCRIPT_PLATFORMS)[number];

export const SCRIPT_PLATFORM_LABEL: Record<ScriptPlatform, string> = {
  instagram_reel: "Instagram Reel",
  tiktok: "TikTok",
  youtube_shorts: "YouTube Shorts",
  linkedin: "LinkedIn",
  x: "X (Twitter)",
  youtube_long: "YouTube Long",
  newsletter: "Newsletter",
  otro: "Otro",
};
