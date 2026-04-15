import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { getSupabaseAdmin } from "@/lib/supabase";
import {
  ACTIVITY_TYPES,
  logActivity,
  type ActivityType,
} from "@/lib/admin/activity-logger";

interface RouteCtx {
  params: Promise<{ id: string }>;
}

export async function GET(_request: Request, ctx: RouteCtx) {
  if (!(await getCurrentUser())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return NextResponse.json({ error: "Supabase not configured" }, { status: 500 });
  }

  const { id } = await ctx.params;
  const { data, error } = await supabase
    .from("lead_activities")
    .select("*")
    .eq("lead_id", id)
    .order("created_at", { ascending: false })
    .limit(100);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ activities: data ?? [] });
}

interface PostBody {
  type?: string;
  description?: string;
  metadata?: Record<string, unknown>;
}

export async function POST(request: Request, ctx: RouteCtx) {
  if (!(await getCurrentUser())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await ctx.params;
  const body = (await request.json().catch(() => ({}))) as PostBody;

  if (!body.type || !(ACTIVITY_TYPES as readonly string[]).includes(body.type)) {
    return NextResponse.json({ error: "Invalid activity type" }, { status: 400 });
  }

  await logActivity({
    leadId: id,
    type: body.type as ActivityType,
    description: body.description,
    metadata: body.metadata,
  });

  return NextResponse.json({ ok: true });
}
