import { NextResponse } from 'next/server';
import { requireAuth, requireRole } from '@/lib/auth';
import { listPublications, createPublication } from '@/lib/admin/content-dal';
import {
  SCRIPT_PLATFORMS,
  type ScriptPlatform,
} from '@/lib/admin/script-status';

export async function GET(req: Request) {
  await requireAuth();
  const url = new URL(req.url);

  const platform = url.searchParams.get('platform');
  const scriptId = url.searchParams.get('script_id') ?? undefined;
  const editorId = url.searchParams.get('editor_id') ?? undefined;
  const from = url.searchParams.get('from') ?? undefined;
  const to = url.searchParams.get('to') ?? undefined;

  const publications = await listPublications({
    scriptId,
    editorId,
    platform:
      platform && (SCRIPT_PLATFORMS as readonly string[]).includes(platform)
        ? (platform as ScriptPlatform)
        : undefined,
    from,
    to,
  });

  return NextResponse.json({ publications });
}

export async function POST(req: Request) {
  const user = await requireRole(['founder', 'manager', 'creative']);
  const body = await req.json().catch(() => ({}));

  if (typeof body.script_id !== 'string' || typeof body.platform !== 'string') {
    return NextResponse.json(
      { error: 'script_id y platform requeridos' },
      { status: 400 },
    );
  }

  if (!(SCRIPT_PLATFORMS as readonly string[]).includes(body.platform)) {
    return NextResponse.json({ error: 'platform inválida' }, { status: 400 });
  }

  try {
    const publication = await createPublication(body, user.id);
    return NextResponse.json({ publication }, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Error creating publication' },
      { status: 500 },
    );
  }
}
