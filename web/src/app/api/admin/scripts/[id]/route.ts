import { NextResponse } from 'next/server';
import { requireAuth, requireRole } from '@/lib/auth';
import {
  getScriptById,
  updateScript,
  listScriptEvents,
  listPublications,
} from '@/lib/admin/content-dal';
import { isScriptStatus } from '@/lib/admin/script-status';

interface RouteCtx {
  params: Promise<{ id: string }>;
}

const ALLOWED_PATCH_FIELDS = [
  'status',
  'recorded',
  'edited',
  'published',
  'archived',
  'assigned_editor',
  'assigned_creator',
  'recording_notes',
  'editing_notes',
  'hook',
  'title',
  'duration_seconds',
  'platform',
  'pillar',
  'humanized_md_file_path',
  'dopamine_checklist',
] as const;

export async function GET(_req: Request, ctx: RouteCtx) {
  await requireAuth();
  const { id } = await ctx.params;

  const script = await getScriptById(id);
  if (!script) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  const [events, publications] = await Promise.all([
    listScriptEvents(id),
    listPublications({ scriptId: id }),
  ]);

  return NextResponse.json({ script, events, publications });
}

export async function PATCH(req: Request, ctx: RouteCtx) {
  const user = await requireRole(['founder', 'manager', 'creative']);
  const { id } = await ctx.params;

  const body = await req.json().catch(() => ({}));
  const patch: Record<string, unknown> = {};
  for (const key of ALLOWED_PATCH_FIELDS) {
    if (key in body) patch[key] = body[key];
  }

  if (patch.status !== undefined && !isScriptStatus(patch.status as string)) {
    return NextResponse.json({ error: 'Status inválido' }, { status: 400 });
  }

  try {
    const script = await updateScript(id, patch, user.id);
    return NextResponse.json({ script });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Error updating script' },
      { status: 500 },
    );
  }
}

// Soft delete: archived = true
export async function DELETE(_req: Request, ctx: RouteCtx) {
  const user = await requireRole(['founder', 'manager']);
  const { id } = await ctx.params;

  try {
    const script = await updateScript(
      id,
      { archived: true, status: 'archivado' },
      user.id,
    );
    return NextResponse.json({ script });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Error archiving' },
      { status: 500 },
    );
  }
}
