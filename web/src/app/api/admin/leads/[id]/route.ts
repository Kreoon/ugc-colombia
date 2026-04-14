import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { getSupabaseAdmin } from "@/lib/supabase";
import { logActivity } from "@/lib/admin/activity-logger";
import { isLeadStatus } from "@/lib/admin/lead-status";

interface RouteCtx {
  params: Promise<{ id: string }>;
}

export async function GET(_request: Request, ctx: RouteCtx) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return NextResponse.json({ error: "Supabase not configured" }, { status: 500 });
  }

  const { id } = await ctx.params;

  const [leadRes, activitiesRes] = await Promise.all([
    supabase.from("leads").select("*").eq("id", id).single(),
    supabase
      .from("lead_activities")
      .select("*")
      .eq("lead_id", id)
      .order("created_at", { ascending: false })
      .limit(50),
  ]);

  if (leadRes.error || !leadRes.data) {
    return NextResponse.json({ error: "Lead not found" }, { status: 404 });
  }

  return NextResponse.json({
    lead: leadRes.data,
    activities: activitiesRes.data ?? [],
  });
}

// Campos CRM (sidebar + tabs) — disparan activity automática
const CRM_FIELDS = [
  "status",
  "notes",
  "logo_url",
  "deal_value_cop",
  "next_action",
  "next_action_at",
  "last_contacted_at",
  "diagnosis_public",
] as const;

// Campos editables de perfil del cliente
const PROFILE_FIELDS = [
  "company_name",
  "full_name",
  "email",
  "phone",
  "whatsapp",
  "company",
  "industry",
  "instagram_handle",
  "tiktok_handle",
  "creator_niche",
  "creator_portfolio_url",
] as const;

const ALL_FIELDS = [...CRM_FIELDS, ...PROFILE_FIELDS] as const;

type PatchBody = Partial<Record<(typeof ALL_FIELDS)[number], unknown>>;

export async function PATCH(request: Request, ctx: RouteCtx) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return NextResponse.json({ error: "Supabase not configured" }, { status: 500 });
  }

  const { id } = await ctx.params;
  const body = (await request.json().catch(() => ({}))) as PatchBody;

  if (body.status !== undefined && !isLeadStatus(body.status as string)) {
    return NextResponse.json({ error: "Invalid status" }, { status: 400 });
  }

  // Fetch state previo para registrar diffs
  const { data: prev } = await supabase
    .from("leads")
    .select(
      "status, notes, deal_value_cop, next_action, next_action_at, logo_url, diagnosis_public, company_name, email",
    )
    .eq("id", id)
    .single();

  if (!prev) {
    return NextResponse.json({ error: "Lead not found" }, { status: 404 });
  }

  const update: Record<string, unknown> = {};
  const profileChanged: string[] = [];
  for (const k of ALL_FIELDS) {
    if (k in body) {
      update[k] = body[k];
      if ((PROFILE_FIELDS as readonly string[]).includes(k)) {
        profileChanged.push(k);
      }
    }
  }
  update.updated_at = new Date().toISOString();

  const { error } = await supabase.from("leads").update(update).eq("id", id);
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Activities según diffs
  const prevRec = prev as Record<string, unknown>;
  await Promise.all([
    body.status !== undefined && body.status !== prevRec.status
      ? logActivity({
          leadId: id,
          type: "status_changed",
          description: `Status: ${(prevRec.status as string) ?? "—"} → ${body.status}`,
          metadata: { from: prevRec.status, to: body.status },
        })
      : null,
    body.notes !== undefined && body.notes !== prevRec.notes
      ? logActivity({
          leadId: id,
          type: "note_added",
          description: "Notas actualizadas",
          metadata: {
            length: typeof body.notes === "string" ? body.notes.length : 0,
          },
        })
      : null,
    body.deal_value_cop !== undefined &&
    body.deal_value_cop !== prevRec.deal_value_cop
      ? logActivity({
          leadId: id,
          type: "deal_value_updated",
          description: `Deal: ${(prevRec.deal_value_cop as number) ?? 0} → ${(body.deal_value_cop as number) ?? 0} COP`,
          metadata: { from: prevRec.deal_value_cop, to: body.deal_value_cop },
        })
      : null,
    body.next_action !== undefined &&
    (body.next_action !== prevRec.next_action ||
      body.next_action_at !== prevRec.next_action_at)
      ? logActivity({
          leadId: id,
          type: "next_action_set",
          description: body.next_action
            ? `Próximo: ${body.next_action}`
            : "Próxima acción borrada",
          metadata: { action: body.next_action, at: body.next_action_at },
        })
      : null,
    body.logo_url !== undefined && body.logo_url !== prevRec.logo_url
      ? logActivity({
          leadId: id,
          type: "logo_updated",
          description: body.logo_url ? "Logo actualizado" : "Logo removido",
          metadata: { url: body.logo_url },
        })
      : null,
    profileChanged.length > 0
      ? logActivity({
          leadId: id,
          type: "contact_logged",
          description: `Perfil editado: ${profileChanged.join(", ")}`,
          metadata: { fields: profileChanged },
        })
      : null,
  ]);

  return NextResponse.json({ ok: true });
}
