import { createSupabaseServiceRole } from '@/lib/supabase-server';
import type {
  ScriptStatus,
  ScriptPillar,
  ScriptPlatform,
} from './script-status';

// ──────────────────────────────────────────────────────────
// Tipos
// ──────────────────────────────────────────────────────────

export interface DopamineChecklist {
  pattern_interrupt?: boolean;
  curiosity_gap?: boolean;
  reframe?: boolean;
  micro_payoff?: boolean;
  closed_loop?: boolean;
  cta_low_friction?: boolean;
}

export interface ContentScript {
  id: string;
  slug: string;
  title: string;
  md_file_path: string | null;
  humanized_md_file_path: string | null;
  hook: string | null;
  duration_seconds: number | null;
  platform: ScriptPlatform | null;
  pillar: ScriptPillar | null;
  status: ScriptStatus;
  recorded: boolean;
  edited: boolean;
  published: boolean;
  archived: boolean;
  recording_notes: string | null;
  editing_notes: string | null;
  created_by: string | null;
  assigned_editor: string | null;
  assigned_creator: string | null;
  dopamine_checklist: DopamineChecklist;
  created_at: string;
  updated_at: string;
}

export interface ContentPublication {
  id: string;
  script_id: string;
  platform: ScriptPlatform;
  url: string | null;
  published_at: string | null;
  published_by: string | null;
  editor_id: string | null;
  views: number;
  likes: number;
  comments: number;
  saves: number;
  shares: number;
  engagement_rate: number | null;
  notes: string | null;
  metrics_updated_at: string | null;
  metrics_source: string;
  created_at: string;
}

export interface ContentScriptEvent {
  id: string;
  script_id: string;
  actor_id: string | null;
  event_type: string;
  from_value: string | null;
  to_value: string | null;
  metadata: Record<string, unknown>;
  created_at: string;
}

export interface ScriptFilters {
  status?: ScriptStatus;
  pillar?: ScriptPillar;
  platform?: ScriptPlatform;
  assigned_editor?: string;
  assigned_creator?: string;
  archived?: boolean;
  search?: string;
}

// ──────────────────────────────────────────────────────────
// Queries (service role — bypass RLS)
// ──────────────────────────────────────────────────────────

export async function listScripts(
  filters: ScriptFilters = {},
): Promise<ContentScript[]> {
  const supabase = createSupabaseServiceRole();
  let query = supabase
    .from('content_scripts')
    .select('*')
    .order('updated_at', { ascending: false });

  if (filters.status) query = query.eq('status', filters.status);
  if (filters.pillar) query = query.eq('pillar', filters.pillar);
  if (filters.platform) query = query.eq('platform', filters.platform);
  if (filters.assigned_editor)
    query = query.eq('assigned_editor', filters.assigned_editor);
  if (filters.assigned_creator)
    query = query.eq('assigned_creator', filters.assigned_creator);
  if (filters.archived !== undefined) query = query.eq('archived', filters.archived);
  if (filters.search) {
    const s = filters.search.replace(/[%_]/g, '\\$&');
    query = query.or(`title.ilike.%${s}%,hook.ilike.%${s}%,slug.ilike.%${s}%`);
  }

  const { data, error } = await query;
  if (error) throw new Error(`listScripts: ${error.message}`);
  return (data ?? []) as ContentScript[];
}

export async function getScriptBySlug(
  slug: string,
): Promise<ContentScript | null> {
  const supabase = createSupabaseServiceRole();
  const { data, error } = await supabase
    .from('content_scripts')
    .select('*')
    .eq('slug', slug)
    .maybeSingle();
  if (error) throw new Error(`getScriptBySlug: ${error.message}`);
  return (data ?? null) as ContentScript | null;
}

export async function getScriptById(
  id: string,
): Promise<ContentScript | null> {
  const supabase = createSupabaseServiceRole();
  const { data, error } = await supabase
    .from('content_scripts')
    .select('*')
    .eq('id', id)
    .maybeSingle();
  if (error) throw new Error(`getScriptById: ${error.message}`);
  return (data ?? null) as ContentScript | null;
}

export async function updateScript(
  id: string,
  patch: Partial<ContentScript>,
  actorId: string | null,
): Promise<ContentScript> {
  const supabase = createSupabaseServiceRole();

  const { data: prev } = await supabase
    .from('content_scripts')
    .select('*')
    .eq('id', id)
    .single();

  const { data, error } = await supabase
    .from('content_scripts')
    .update(patch)
    .eq('id', id)
    .select()
    .single();

  if (error) throw new Error(`updateScript: ${error.message}`);

  // Audit events para campos importantes
  const events: Array<Promise<unknown>> = [];
  if (prev && patch.status !== undefined && patch.status !== prev.status) {
    events.push(
      recordEvent({
        scriptId: id,
        actorId,
        eventType: 'status_changed',
        from: String(prev.status),
        to: String(patch.status),
      }),
    );
  }
  if (
    prev &&
    patch.assigned_editor !== undefined &&
    patch.assigned_editor !== prev.assigned_editor
  ) {
    events.push(
      recordEvent({
        scriptId: id,
        actorId,
        eventType: 'editor_assigned',
        from: prev.assigned_editor ?? null,
        to: patch.assigned_editor ?? null,
      }),
    );
  }
  for (const flag of ['recorded', 'edited', 'published', 'archived'] as const) {
    if (prev && patch[flag] !== undefined && patch[flag] !== prev[flag]) {
      events.push(
        recordEvent({
          scriptId: id,
          actorId,
          eventType: `flag_${flag}`,
          from: String(prev[flag]),
          to: String(patch[flag]),
        }),
      );
    }
  }
  await Promise.all(events);

  return data as ContentScript;
}

export async function createScript(
  input: Partial<ContentScript> & { slug: string; title: string },
  actorId: string | null,
): Promise<ContentScript> {
  const supabase = createSupabaseServiceRole();
  const { data, error } = await supabase
    .from('content_scripts')
    .insert({ ...input, created_by: actorId })
    .select()
    .single();
  if (error) throw new Error(`createScript: ${error.message}`);
  await recordEvent({
    scriptId: data.id,
    actorId,
    eventType: 'created',
    from: null,
    to: data.slug,
  });
  return data as ContentScript;
}

// ──────────────────────────────────────────────────────────
// Publicaciones
// ──────────────────────────────────────────────────────────

export async function listPublications(filters: {
  scriptId?: string;
  editorId?: string;
  platform?: ScriptPlatform;
  from?: string;
  to?: string;
} = {}): Promise<ContentPublication[]> {
  const supabase = createSupabaseServiceRole();
  let query = supabase
    .from('content_publications')
    .select('*')
    .order('published_at', { ascending: false, nullsFirst: false });

  if (filters.scriptId) query = query.eq('script_id', filters.scriptId);
  if (filters.editorId) query = query.eq('editor_id', filters.editorId);
  if (filters.platform) query = query.eq('platform', filters.platform);
  if (filters.from) query = query.gte('published_at', filters.from);
  if (filters.to) query = query.lte('published_at', filters.to);

  const { data, error } = await query;
  if (error) throw new Error(`listPublications: ${error.message}`);
  return (data ?? []) as ContentPublication[];
}

export async function createPublication(
  input: Partial<ContentPublication> & {
    script_id: string;
    platform: ScriptPlatform;
  },
  actorId: string | null,
): Promise<ContentPublication> {
  const supabase = createSupabaseServiceRole();
  const { data, error } = await supabase
    .from('content_publications')
    .insert({ ...input, published_by: actorId })
    .select()
    .single();
  if (error) throw new Error(`createPublication: ${error.message}`);

  // Marca el script como publicado automáticamente
  await updateScript(
    input.script_id,
    { published: true, status: 'publicado' },
    actorId,
  );
  await recordEvent({
    scriptId: input.script_id,
    actorId,
    eventType: 'published',
    from: null,
    to: input.platform,
    metadata: { publication_id: data.id, url: input.url ?? null },
  });

  return data as ContentPublication;
}

export async function updatePublication(
  id: string,
  patch: Partial<ContentPublication>,
): Promise<ContentPublication> {
  const supabase = createSupabaseServiceRole();
  const { data, error } = await supabase
    .from('content_publications')
    .update({ ...patch, metrics_updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();
  if (error) throw new Error(`updatePublication: ${error.message}`);
  return data as ContentPublication;
}

// ──────────────────────────────────────────────────────────
// Eventos (audit log)
// ──────────────────────────────────────────────────────────

export async function recordEvent(input: {
  scriptId: string;
  actorId: string | null;
  eventType: string;
  from?: string | null;
  to?: string | null;
  metadata?: Record<string, unknown>;
}): Promise<void> {
  const supabase = createSupabaseServiceRole();
  await supabase.from('content_script_events').insert({
    script_id: input.scriptId,
    actor_id: input.actorId,
    event_type: input.eventType,
    from_value: input.from ?? null,
    to_value: input.to ?? null,
    metadata: input.metadata ?? {},
  });
}

export async function listScriptEvents(
  scriptId: string,
): Promise<ContentScriptEvent[]> {
  const supabase = createSupabaseServiceRole();
  const { data, error } = await supabase
    .from('content_script_events')
    .select('*')
    .eq('script_id', scriptId)
    .order('created_at', { ascending: false })
    .limit(100);
  if (error) throw new Error(`listScriptEvents: ${error.message}`);
  return (data ?? []) as ContentScriptEvent[];
}

// ──────────────────────────────────────────────────────────
// Team members (para dropdowns de asignación) — usa admin_users
// ──────────────────────────────────────────────────────────

export interface TeamMemberLite {
  id: string;
  full_name: string;   // computed: admin_users.full_name ?? email prefix
  email: string;
  role: string;
  content_specialty: string | null;
  is_active: boolean;
}

export async function listActiveTeamMembers(): Promise<TeamMemberLite[]> {
  const supabase = createSupabaseServiceRole();
  const { data, error } = await supabase
    .from('admin_users')
    .select('id, full_name, email, role, content_specialty, is_active')
    .eq('is_active', true)
    .order('full_name');
  if (error) throw new Error(`listActiveTeamMembers: ${error.message}`);
  return (data ?? []).map((m) => ({
    ...m,
    full_name: m.full_name ?? m.email.split('@')[0],
  })) as TeamMemberLite[];
}
