import { NextResponse } from 'next/server';
import { requireRole } from '@/lib/auth';
import { updatePublication } from '@/lib/admin/content-dal';

interface RouteCtx {
  params: Promise<{ id: string }>;
}

const ALLOWED_FIELDS = [
  'views',
  'likes',
  'comments',
  'saves',
  'shares',
  'engagement_rate',
  'notes',
  'url',
  'published_at',
  'metrics_source',
  'editor_id',
] as const;

export async function PATCH(req: Request, ctx: RouteCtx) {
  await requireRole(['founder', 'manager', 'creative']);
  const { id } = await ctx.params;

  const body = await req.json().catch(() => ({}));
  const patch: Record<string, unknown> = {};
  for (const key of ALLOWED_FIELDS) {
    if (key in body) patch[key] = body[key];
  }

  try {
    const publication = await updatePublication(id, patch);
    return NextResponse.json({ publication });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Error updating' },
      { status: 500 },
    );
  }
}
