import { NextResponse } from 'next/server';
import { requireAuth, requireRole } from '@/lib/auth';
import { listScripts, createScript } from '@/lib/admin/content-dal';
import {
  isScriptStatus,
  SCRIPT_PILLARS,
  SCRIPT_PLATFORMS,
  type ScriptPillar,
  type ScriptPlatform,
} from '@/lib/admin/script-status';

export async function GET(req: Request) {
  await requireAuth();
  const url = new URL(req.url);

  const status = url.searchParams.get('status');
  const pillar = url.searchParams.get('pillar');
  const platform = url.searchParams.get('platform');
  const assigned_editor = url.searchParams.get('assigned_editor');
  const archivedParam = url.searchParams.get('archived');
  const search = url.searchParams.get('search') ?? undefined;

  const scripts = await listScripts({
    status: status && isScriptStatus(status) ? status : undefined,
    pillar:
      pillar && (SCRIPT_PILLARS as readonly string[]).includes(pillar)
        ? (pillar as ScriptPillar)
        : undefined,
    platform:
      platform && (SCRIPT_PLATFORMS as readonly string[]).includes(platform)
        ? (platform as ScriptPlatform)
        : undefined,
    assigned_editor: assigned_editor ?? undefined,
    archived: archivedParam === null ? false : archivedParam === 'true',
    search,
  });

  return NextResponse.json({ scripts });
}

export async function POST(req: Request) {
  const user = await requireRole(['founder', 'manager']);
  const body = await req.json().catch(() => ({}));

  if (typeof body.slug !== 'string' || typeof body.title !== 'string') {
    return NextResponse.json(
      { error: 'slug y title requeridos' },
      { status: 400 },
    );
  }

  try {
    const script = await createScript(body, user.id);
    return NextResponse.json({ script }, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Error creating script' },
      { status: 500 },
    );
  }
}
