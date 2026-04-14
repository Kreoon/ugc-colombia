-- ============================================================================
-- CRM fields + lead_activities table
-- ============================================================================
-- Upgrade de /admin/diagnosticos a CRM premium:
-- - Nuevas columnas en leads: logo_url, deal_value_cop, next_action,
--   next_action_at, last_contacted_at
-- - Nueva tabla lead_activities para timeline de eventos
-- - Seed inicial: actividad quiz_completed para leads existentes con ai_diagnosis

alter table public.leads
  add column if not exists logo_url text,
  add column if not exists deal_value_cop bigint,
  add column if not exists next_action text,
  add column if not exists next_action_at timestamptz,
  add column if not exists last_contacted_at timestamptz;

create index if not exists idx_leads_next_action_at
  on public.leads(next_action_at)
  where next_action_at is not null;

create index if not exists idx_leads_status_created
  on public.leads(status, created_at desc);

-- ─── Tabla lead_activities ──────────────────────────────────────────────────

create table if not exists public.lead_activities (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid not null references public.leads(id) on delete cascade,
  activity_type text not null check (activity_type in (
    'quiz_completed','diagnosis_generated','status_changed','note_added',
    'contact_logged','whatsapp_sent','email_sent','call_logged',
    'meeting_scheduled','meeting_completed','deal_value_updated',
    'next_action_set','logo_updated','won','lost'
  )),
  description text,
  metadata jsonb default '{}'::jsonb,
  created_at timestamptz not null default now(),
  created_by text
);

create index if not exists idx_lead_activities_lead_id
  on public.lead_activities(lead_id, created_at desc);

alter table public.lead_activities enable row level security;

drop policy if exists "service_role_full_access" on public.lead_activities;
create policy "service_role_full_access" on public.lead_activities
  for all
  using (auth.role() = 'service_role')
  with check (auth.role() = 'service_role');

-- ─── Seed: actividad quiz_completed para leads existentes ───────────────────

insert into public.lead_activities (lead_id, activity_type, description, created_at, created_by)
select
  id,
  'quiz_completed',
  'Quiz completado (evento histórico cargado por migración)',
  coalesce(audit_completed_at, created_at),
  'migration:crm_fields'
from public.leads
where ai_diagnosis is not null
  and not exists (
    select 1 from public.lead_activities la
    where la.lead_id = public.leads.id
      and la.activity_type = 'quiz_completed'
  );
