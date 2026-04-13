-- =============================================================================
-- UGC Colombia — Setup completo para nueva base de datos
-- Proyecto: domxgsrajwyuaffiqbtr
-- Ejecutar en: https://supabase.com/dashboard/project/domxgsrajwyuaffiqbtr/sql/new
-- =============================================================================

-- Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- =============================================================================
-- TABLA: leads (sistema de captación)
-- =============================================================================

CREATE TABLE IF NOT EXISTS leads (
  id                    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at            TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at            TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  -- Datos de contacto
  full_name             TEXT,
  email                 TEXT,
  whatsapp              TEXT,
  company_name          TEXT,
  website               TEXT,
  country               TEXT,
  city                  TEXT,

  -- Origen y tracking
  source                TEXT NOT NULL DEFAULT 'sitio_web',
  utm_source            TEXT,
  utm_medium            TEXT,
  utm_campaign          TEXT,
  referral_name         TEXT,

  -- Pipeline
  stage                 TEXT NOT NULL DEFAULT 'nuevo',
  market                TEXT,
  estimated_budget_usd  NUMERIC(10,2),
  monthly_videos_needed INTEGER,

  -- Asignacion interna
  assigned_to           UUID,
  last_contact_at       TIMESTAMPTZ,
  next_followup_at      TIMESTAMPTZ,

  -- Notas y metadata
  notes                 TEXT,
  lost_reason           TEXT,
  raw_form_data         JSONB,

  -- Calificación (quiz)
  lead_type             TEXT,
  industry              TEXT,
  urgency               TEXT,
  ad_budget             TEXT,
  content_budget        TEXT,
  has_website           BOOLEAN DEFAULT FALSE,
  has_active_ads        BOOLEAN DEFAULT FALSE,
  current_ctr           TEXT,
  creative_age_weeks    INTEGER,
  monthly_content_pieces INTEGER,
  biggest_pain          TEXT,
  instagram_handle      TEXT,
  tiktok_handle         TEXT,
  qualification_score   INTEGER DEFAULT 0,
  temperature           TEXT,
  ai_diagnosis          JSONB,
  booking_status        TEXT DEFAULT 'pending',
  google_calendar_event_id TEXT,
  audit_completed_at    TIMESTAMPTZ,

  -- Creador
  creator_niche         TEXT,
  creator_followers     INTEGER,
  creator_platforms     TEXT[],
  creator_portfolio_url TEXT,
  creator_experience_years INTEGER,

  -- Diagnóstico público
  diagnosis_public      BOOLEAN DEFAULT TRUE,
  diagnosis_slug        TEXT
);

-- Índices
CREATE INDEX IF NOT EXISTS idx_leads_stage ON leads(stage);
CREATE INDEX IF NOT EXISTS idx_leads_source ON leads(source);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_lead_type ON leads(lead_type);
CREATE INDEX IF NOT EXISTS idx_leads_temperature ON leads(temperature);
CREATE INDEX IF NOT EXISTS idx_leads_qualification_score ON leads(qualification_score DESC);
CREATE INDEX IF NOT EXISTS idx_leads_industry ON leads(industry);
CREATE INDEX IF NOT EXISTS idx_leads_booking_status ON leads(booking_status);
CREATE UNIQUE INDEX IF NOT EXISTS idx_leads_diagnosis_slug ON leads(diagnosis_slug) WHERE diagnosis_slug IS NOT NULL;

-- =============================================================================
-- TABLA: email_sequences (nurturing automático)
-- =============================================================================

CREATE TABLE IF NOT EXISTS email_sequences (
  id              UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  lead_id         UUID NOT NULL REFERENCES leads(id) ON DELETE CASCADE,
  sequence_key    TEXT NOT NULL,
  step_key        TEXT NOT NULL,
  scheduled_at    TIMESTAMPTZ NOT NULL,
  sent_at         TIMESTAMPTZ,
  status          TEXT NOT NULL DEFAULT 'pending'
                  CHECK (status IN ('pending', 'sent', 'failed', 'skipped')),
  error_message   TEXT,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_email_seq_pending ON email_sequences(scheduled_at) WHERE status = 'pending';
CREATE INDEX IF NOT EXISTS idx_email_seq_lead ON email_sequences(lead_id, sequence_key);
CREATE UNIQUE INDEX IF NOT EXISTS idx_email_seq_unique ON email_sequences(lead_id, sequence_key, step_key);

-- =============================================================================
-- TABLA: newsletter_subscribers
-- =============================================================================

CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id              UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email           TEXT NOT NULL UNIQUE,
  full_name       TEXT,
  industry        TEXT,
  lead_id         UUID REFERENCES leads(id) ON DELETE SET NULL,
  status          TEXT NOT NULL DEFAULT 'active'
                  CHECK (status IN ('active', 'unsubscribed')),
  subscribed_at   TIMESTAMPTZ NOT NULL DEFAULT now(),
  unsubscribed_at TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS idx_newsletter_active ON newsletter_subscribers(status) WHERE status = 'active';

-- =============================================================================
-- TRIGGER: updated_at automático
-- =============================================================================

CREATE OR REPLACE FUNCTION trigger_set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_leads_updated_at
  BEFORE UPDATE ON leads
  FOR EACH ROW
  EXECUTE FUNCTION trigger_set_updated_at();

-- =============================================================================
-- RLS: habilitar pero permitir acceso con service_role
-- =============================================================================

ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_sequences ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Políticas permisivas para service_role (el backend de Next.js)
CREATE POLICY "Service role full access on leads" ON leads FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role full access on email_sequences" ON email_sequences FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role full access on newsletter_subscribers" ON newsletter_subscribers FOR ALL USING (true) WITH CHECK (true);

-- =============================================================================
-- DONE
-- =============================================================================
SELECT 'UGC Colombia database setup complete' AS status;
