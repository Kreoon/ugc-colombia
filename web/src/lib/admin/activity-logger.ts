import { getSupabaseAdmin } from "@/lib/supabase";

export const ACTIVITY_TYPES = [
  "quiz_completed",
  "diagnosis_generated",
  "status_changed",
  "note_added",
  "contact_logged",
  "whatsapp_sent",
  "email_sent",
  "call_logged",
  "meeting_scheduled",
  "meeting_completed",
  "deal_value_updated",
  "next_action_set",
  "logo_updated",
  "won",
  "lost",
] as const;

export type ActivityType = (typeof ACTIVITY_TYPES)[number];

export interface LogActivityParams {
  leadId: string;
  type: ActivityType;
  description?: string;
  metadata?: Record<string, unknown>;
  createdBy?: string;
}

/**
 * Registra una actividad en lead_activities. Server-side only.
 * No lanza si falla — solo loguea el error en consola para no romper la req principal.
 */
export async function logActivity(params: LogActivityParams): Promise<void> {
  const supabase = getSupabaseAdmin();
  if (!supabase) return;

  const { error } = await supabase.from("lead_activities").insert({
    lead_id: params.leadId,
    activity_type: params.type,
    description: params.description ?? null,
    metadata: params.metadata ?? {},
    created_by: params.createdBy ?? "admin",
  });

  if (error) {
    console.error("[activity-logger] Failed to log activity:", error.message, params);
  }
}
