import { NextResponse } from 'next/server';
import { readFile, readdir } from 'fs/promises';
import { join } from 'path';
import matter from 'gray-matter';
import { requireRole } from '@/lib/auth';
import { createSupabaseServiceRole } from '@/lib/supabase-server';
import type {
  ScriptPillar,
  ScriptPlatform,
} from '@/lib/admin/script-status';
import {
  SCRIPT_PILLARS,
  SCRIPT_PLATFORMS,
  isScriptStatus,
} from '@/lib/admin/script-status';

/**
 * Seed de guiones a content_scripts.
 *
 * Modes (query `?scope=`):
 *   `original` (default): parsea 10-guiones-lanzamiento.md + 20-guiones-lote-2.md
 *   `viral-packs`: escanea content/viralidad/packs/{persona}/*.md con frontmatter completo
 *   `all`: ambos
 *
 * Solo founder / manager.
 */

interface ParsedScript {
  slug: string;
  title: string;
  mdFilePath: string;
  humanizedMdFilePath: string | null;
  hook: string | null;
  durationSeconds: number | null;
  platform: ScriptPlatform;
  pillar: ScriptPillar;
  assignedCreatorEmail: string | null;
}

const PERSONA_EMAIL: Record<string, string> = {
  alexander: 'founder@kreoon.com', // ya está en admin_users
  diana: 'diana@ugccolombia.co',
  brian: 'brian@ugccolombia.co',
  samuel: 'samuel@ugccolombia.co',
  tanya: 'tanya@ugccolombia.co',
  valentina: 'valentina@ugccolombia.co',
};

const PERSONA_FULLNAME: Record<string, string> = {
  alexander: 'Alexander Cast',
  diana: 'Diana Mile',
  brian: 'Brian Velásquez',
  samuel: 'Samuel',
  tanya: 'Tanya',
  valentina: 'Valentina Giraldo',
};

const PERSONA_ROLE: Record<string, string> = {
  alexander: 'founder',
  diana: 'creative',
  brian: 'manager',
  samuel: 'creative',
  tanya: 'creative',
  valentina: 'creative',
};

function inferPillar(tipo: string, pilar: string): ScriptPillar {
  const t = (tipo + ' ' + pilar).toLowerCase();
  if (t.includes('bts')) return 'bts';
  if (t.includes('caso')) return 'caso_exito';
  if (t.includes('provocacion') || t.includes('hot take')) return 'provocacion';
  if (t.includes('educativo') || t.includes('tutorial') || t.includes('mito'))
    return 'educativo';
  if (t.includes('autoridad')) return 'autoridad';
  if (t.includes('comunidad')) return 'comunidad';
  if (t.includes('prueba') || t.includes('testimonial')) return 'prueba_social';
  return 'educativo';
}

function inferPlatform(
  durationSeconds: number | null,
  rawPlatforms: string,
): ScriptPlatform {
  const p = rawPlatforms.toLowerCase();
  if (p.includes('tiktok') && durationSeconds && durationSeconds <= 30)
    return 'tiktok';
  if (p.includes('shorts')) return 'youtube_shorts';
  if (p.includes('linkedin')) return 'linkedin';
  return 'instagram_reel';
}

function parseDuration(text: string): number | null {
  const m = text.match(/(\d+)\s*segundo/i) ?? text.match(/(\d+)\s*s\b/i);
  return m ? parseInt(m[1], 10) : null;
}

function parseLegacyScriptBlock(raw: string): ParsedScript | null {
  const headerMatch = raw.match(/#\s*GUION\s+(\d+)\s*[—-]\s*(.+)/i);
  if (!headerMatch) return null;

  const slugNum = parseInt(headerMatch[1], 10);
  const slug = `G${slugNum.toString().padStart(2, '0')}`;
  const title = headerMatch[2].trim();

  const tipoMatch = raw.match(/\*\*Tipo:\*\*\s*(.+)/i);
  const pilarMatch = raw.match(/\*\*Pilar:\*\*\s*(.+)/i);
  const duracionMatch = raw.match(/\*\*Duracion:\*\*\s*(.+)/i);
  const plataformasMatch = raw.match(/\*\*Plataformas:\*\*\s*(.+)/i);

  const durationSeconds = duracionMatch
    ? parseDuration(duracionMatch[1])
    : null;
  const platform = inferPlatform(durationSeconds, plataformasMatch?.[1] ?? '');
  const pillar = inferPillar(tipoMatch?.[1] ?? '', pilarMatch?.[1] ?? '');

  const hookMatch = raw.match(/`"([^"]+)"`/);
  const hook = hookMatch?.[1]?.trim() ?? null;

  return {
    slug,
    title,
    mdFilePath: '',
    humanizedMdFilePath: null,
    hook,
    durationSeconds,
    platform,
    pillar,
    assignedCreatorEmail: null,
  };
}

function splitLegacyScripts(
  fileContent: string,
  sourcePath: string,
): ParsedScript[] {
  const parts = fileContent
    .split(/(?=^# GUION \d+)/m)
    .filter((p) => /^# GUION/.test(p));
  const scripts: ParsedScript[] = [];
  for (const block of parts) {
    const parsed = parseLegacyScriptBlock(block);
    if (parsed) {
      parsed.mdFilePath = sourcePath;
      scripts.push(parsed);
    }
  }
  return scripts;
}

async function fileExists(path: string): Promise<boolean> {
  try {
    await readFile(path);
    return true;
  } catch {
    return false;
  }
}

// ──────────────────────────────────────────────────────────
// Viral packs: lee archivos con frontmatter individual
// ──────────────────────────────────────────────────────────

async function parseViralPack(
  root: string,
  persona: string,
): Promise<ParsedScript[]> {
  const dir = join(root, 'content', 'viralidad', 'packs', persona);
  let files: string[];
  try {
    files = await readdir(dir);
  } catch {
    return [];
  }

  const scripts: ParsedScript[] = [];
  for (const name of files) {
    if (!name.endsWith('.md') || name.startsWith('_')) continue;
    const full = join(dir, name);
    let raw: string;
    try {
      raw = await readFile(full, 'utf-8');
    } catch {
      continue;
    }

    const { data } = matter(raw);
    if (!data.slug || !data.title) continue;

    const platform = (
      data.platform &&
      (SCRIPT_PLATFORMS as readonly string[]).includes(data.platform)
        ? (data.platform as ScriptPlatform)
        : 'instagram_reel'
    );
    const pillar = (
      data.pillar &&
      (SCRIPT_PILLARS as readonly string[]).includes(data.pillar)
        ? (data.pillar as ScriptPillar)
        : 'educativo'
    );

    scripts.push({
      slug: String(data.slug),
      title: String(data.title),
      mdFilePath: `content/viralidad/packs/${persona}/${name}`.replace(/\\/g, '/'),
      humanizedMdFilePath: null,
      hook: data.hook ? String(data.hook) : null,
      durationSeconds: data.duration_seconds
        ? Number(data.duration_seconds)
        : null,
      platform,
      pillar,
      assignedCreatorEmail:
        (data.assigned_creator as string | undefined) ??
        PERSONA_EMAIL[persona] ??
        null,
    });
  }
  return scripts;
}

async function ensureAdminUser(
  supabase: ReturnType<typeof createSupabaseServiceRole>,
  persona: string,
): Promise<string | null> {
  const email = PERSONA_EMAIL[persona];
  if (!email) return null;

  const { data: existing } = await supabase
    .from('admin_users')
    .select('id')
    .eq('email', email)
    .maybeSingle();
  if (existing?.id) return existing.id as string;

  const { data: created, error } = await supabase
    .from('admin_users')
    .insert({
      email,
      full_name: PERSONA_FULLNAME[persona] ?? persona,
      role: PERSONA_ROLE[persona] ?? 'creative',
      content_specialty: persona === 'valentina' ? 'edition' : 'creator',
      is_active: true,
    })
    .select('id')
    .single();

  if (error) {
    console.error(`ensureAdminUser(${persona}):`, error.message);
    return null;
  }
  return (created?.id as string) ?? null;
}

// ──────────────────────────────────────────────────────────
// POST handler
// ──────────────────────────────────────────────────────────

export async function POST(req: Request) {
  await requireRole(['founder', 'manager']);
  const url = new URL(req.url);
  const scope = url.searchParams.get('scope') ?? 'original';

  const root = process.cwd();
  const supabase = createSupabaseServiceRole();
  const allScripts: ParsedScript[] = [];
  const errors: string[] = [];
  const countByPersona: Record<string, number> = {};

  // ─── Legacy guiones (G01-G20) ──────────────────────────
  if (scope === 'original' || scope === 'all') {
    const sources = [
      'content/sistemas/contenido/10-guiones-lanzamiento.md',
      'content/sistemas/contenido/20-guiones-lote-2.md',
    ];

    for (const src of sources) {
      try {
        const fullPath = join(root, src);
        const raw = await readFile(fullPath, 'utf-8');
        const { content } = matter(raw);
        const parsed = splitLegacyScripts(content, src);
        for (const s of parsed) {
          const individualPath = `content/sistemas/contenido/guiones/${s.slug}.md`;
          if (await fileExists(join(root, individualPath))) {
            s.mdFilePath = individualPath;
          }
          const humanizedPath = `content/sistemas/contenido/humanizados/${s.slug}-humanizado.md`;
          if (await fileExists(join(root, humanizedPath))) {
            s.humanizedMdFilePath = humanizedPath;
          }
        }
        allScripts.push(...parsed);
      } catch (err) {
        errors.push(
          `${src}: ${err instanceof Error ? err.message : 'unknown'}`,
        );
      }
    }
  }

  // ─── Viral packs ──────────────────────────
  const emailToId = new Map<string, string>();

  if (scope === 'viral-packs' || scope === 'all') {
    const personas = ['alexander', 'diana', 'brian', 'samuel', 'tanya', 'valentina'];

    // Asegura que cada admin_user existe
    for (const persona of personas) {
      const id = await ensureAdminUser(supabase, persona);
      if (id) emailToId.set(PERSONA_EMAIL[persona], id);
    }

    for (const persona of personas) {
      try {
        const parsed = await parseViralPack(root, persona);
        countByPersona[persona] = parsed.length;
        allScripts.push(...parsed);
      } catch (err) {
        errors.push(
          `pack ${persona}: ${err instanceof Error ? err.message : 'unknown'}`,
        );
      }
    }
  }

  // ─── Upsert ──────────────────────────
  const rows = allScripts.map((s) => ({
    slug: s.slug,
    title: s.title,
    md_file_path: s.mdFilePath,
    humanized_md_file_path: s.humanizedMdFilePath,
    hook: s.hook,
    duration_seconds: s.durationSeconds,
    platform: s.platform,
    pillar: s.pillar,
    status: 'borrador',
    assigned_creator:
      s.assignedCreatorEmail && emailToId.get(s.assignedCreatorEmail)
        ? emailToId.get(s.assignedCreatorEmail)
        : null,
  }));

  if (rows.length === 0) {
    return NextResponse.json({
      ok: true,
      inserted_or_updated: 0,
      by_persona: countByPersona,
      parse_errors: errors,
      note: 'Sin archivos para procesar en este scope.',
    });
  }

  const { data, error } = await supabase
    .from('content_scripts')
    .upsert(rows, { onConflict: 'slug', ignoreDuplicates: false })
    .select('id, slug');

  if (error) {
    return NextResponse.json(
      {
        error: error.message,
        errors,
        rows_attempted: rows.length,
        by_persona: countByPersona,
      },
      { status: 500 },
    );
  }

  return NextResponse.json({
    ok: true,
    scope,
    inserted_or_updated: data?.length ?? 0,
    by_persona: countByPersona,
    slugs: data?.map((r) => r.slug) ?? [],
    parse_errors: errors,
  });
}

// Mantiene isScriptStatus importado por si se usa en expansiones futuras
void isScriptStatus;
