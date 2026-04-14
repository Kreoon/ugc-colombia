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

interface PatchBody {
  status?: string;
  notes?: string | null;
  logo_url?: string | null;
  deal_value_cop?: number | null;
  next_action?: string | null;
  next_action_at?: string | null;
  last_contacted_at?: string | null;
  diagnosis_public?: boolean;
}

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

  if (body.status !== undefined && !isLeadStatus(body.status)) {
    return NextResponse.json({ error: "Invalid status" }, { status: 400 });
  }

  // Fetch state previo para registrar diffs
  const { data: prev } = await supabase
    .from("leads")
    .select("status, notes, deal_value_cop, next_action, next_action_at, logo_url, diagnosis_public")
    .eq("id", id)
    .single();

  if (!prev) {
    return NextResponse.json({ error: "Lead not found" }, { status: 404 });
  }

  const update: Record<string, unknown> = {};
  for (const k of [
    "status",
    "notes",
    "logo_url",
    "deal_value_cop",
    "next_action",
    "next_action_at",
    "last_contacted_at",
    "diagnosis_public",
  ] as const) {
    if (k in body) update[k] = body[k];
  }
  update.updated_at = new Date().toISOString();

  const { error } = await supabase.from("leads").update(update).eq("id", id);
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Activities según diffs
  await Promise.all([
    body.status !== undefined && body.status !== prev.status
      ? logActivity({
          leadId: id,
          type: "status_changed",
          description: `Status: ${prev.status ?? "—"} → ${body.status}`,
          metadata: { from: prev.status, to: body.status },
        })
      : null,
    body.notes !== undefined && body.notes !== prev.notes
      ? logActivity({
          leadId: id,
          type: "note_added",
          description: "Notas actualizadas",
          metadata: { length: body.notes?.length ?? 0 },
        })
      : null,
    body.deal_value_cop !== undefined && body.deal_value_cop !== prev.deal_value_cop
      ? logActivity({
          leadId: id,
          type: "deal_value_updated",
          description: `Deal: ${prev.deal_value_cop ?? 0} → ${body.deal_value_cop ?? 0} COP`,
          metadata: { from: prev.deal_value_cop, to: body.deal_value_cop },
        })
      : null,
    body.next_action !== undefined &&
    (body.next_action !== prev.next_action || body.next_action_at !== prev.next_action_at)
      ? logActivity({
          leadId: id,
          type: "next_action_set",
          description: body.next_action ? `Próximo: ${body.next_action}` : "Próxima acción borrada",
          metadata: { action: body.next_action, at: body.next_action_at },
        })
      : null,
    body.logo_url !== undefined && body.logo_url !== prev.logo_url
      ? logActivity({
          leadId: id,
          type: "logo_updated",
          description: body.logo_url ? "Logo actualizado" : "Logo removido",
          metadata: { url: body.logo_url },
        })
      : null,
  ]);

  return NextResponse.json({ ok: true });
}
