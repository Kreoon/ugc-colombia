// Single source of truth para el pipeline de status del CRM.
// Mismo enum que la columna leads.status en Supabase.

export const LEAD_STATUSES = [
  "new",
  "contacted",
  "qualified",
  "converted",
  "lost",
] as const;

export type LeadStatus = (typeof LEAD_STATUSES)[number];

export interface LeadStatusMeta {
  value: LeadStatus;
  label: string;
  color: string;
  bgColor: string;
  borderColor: string;
  icon: string;
  order: number;
  description: string;
}

export const LEAD_STATUS_META: Record<LeadStatus, LeadStatusMeta> = {
  new: {
    value: "new",
    label: "Nuevo",
    color: "text-blue-400",
    bgColor: "bg-blue-500/10",
    borderColor: "border-blue-500/30",
    icon: "⭐",
    order: 0,
    description: "Lead recién capturado, aún sin contactar",
  },
  contacted: {
    value: "contacted",
    label: "Contactado",
    color: "text-amber-400",
    bgColor: "bg-amber-500/10",
    borderColor: "border-amber-500/30",
    icon: "📞",
    order: 1,
    description: "Primer contacto realizado (email, WhatsApp o llamada)",
  },
  qualified: {
    value: "qualified",
    label: "Calificado",
    color: "text-purple-400",
    bgColor: "bg-purple-500/10",
    borderColor: "border-purple-500/30",
    icon: "🎯",
    order: 2,
    description: "Cumple criterios y muestra interés real de comprar",
  },
  converted: {
    value: "converted",
    label: "Ganado",
    color: "text-emerald-400",
    bgColor: "bg-emerald-500/10",
    borderColor: "border-emerald-500/30",
    icon: "🏆",
    order: 3,
    description: "Cliente cerrado, contrato firmado",
  },
  lost: {
    value: "lost",
    label: "Perdido",
    color: "text-red-400",
    bgColor: "bg-red-500/10",
    borderColor: "border-red-500/30",
    icon: "❌",
    order: 4,
    description: "Descalificado o no avanza",
  },
};

export function isLeadStatus(value: unknown): value is LeadStatus {
  return (
    typeof value === "string" && (LEAD_STATUSES as readonly string[]).includes(value)
  );
}

export function statusMeta(status: string | null | undefined): LeadStatusMeta {
  return isLeadStatus(status) ? LEAD_STATUS_META[status] : LEAD_STATUS_META.new;
}
