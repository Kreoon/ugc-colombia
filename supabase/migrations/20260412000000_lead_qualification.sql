-- =============================================================================
-- Migración: Sistema de calificación de leads (Brand Audit)
-- Fecha: 2026-04-12
-- Descripción: Agrega campos de calificación, scoring y tipo de lead
-- =============================================================================

-- Tipo de lead: marca o creador
CREATE TYPE lead_type AS ENUM ('marca', 'creador');

-- Nivel de urgencia
CREATE TYPE lead_urgency AS ENUM ('inmediata', 'este_mes', 'proximo_trimestre', 'explorando');

-- Industria de la marca
CREATE TYPE lead_industry AS ENUM (
  'ecommerce',
  'marca_productos',
  'servicios',
  'saas',
  'dropshipping',
  'restaurantes',
  'salud_belleza',
  'educacion',
  'fintech',
  'otro'
);

-- Rango de inversión
CREATE TYPE budget_range AS ENUM (
  'nada',
  'menos_500',
  '500_1000',
  '1000_3000',
  '3000_5000',
  'mas_5000'
);

-- Calificación del lead
CREATE TYPE lead_temperature AS ENUM ('hot', 'warm', 'cold');

-- Agregar columnas de calificación a la tabla leads
ALTER TABLE leads
  ADD COLUMN IF NOT EXISTS lead_type           lead_type,
  ADD COLUMN IF NOT EXISTS industry             lead_industry,
  ADD COLUMN IF NOT EXISTS urgency              lead_urgency,
  ADD COLUMN IF NOT EXISTS ad_budget            budget_range,
  ADD COLUMN IF NOT EXISTS content_budget       budget_range,
  ADD COLUMN IF NOT EXISTS has_website          BOOLEAN DEFAULT FALSE,
  ADD COLUMN IF NOT EXISTS has_active_ads       BOOLEAN DEFAULT FALSE,
  ADD COLUMN IF NOT EXISTS current_ctr          TEXT,
  ADD COLUMN IF NOT EXISTS creative_age_weeks   INTEGER,
  ADD COLUMN IF NOT EXISTS monthly_content_pieces INTEGER,
  ADD COLUMN IF NOT EXISTS biggest_pain         TEXT,
  ADD COLUMN IF NOT EXISTS instagram_handle     TEXT,
  ADD COLUMN IF NOT EXISTS tiktok_handle        TEXT,
  ADD COLUMN IF NOT EXISTS qualification_score  INTEGER DEFAULT 0,
  ADD COLUMN IF NOT EXISTS temperature          lead_temperature,
  ADD COLUMN IF NOT EXISTS ai_diagnosis         JSONB,
  ADD COLUMN IF NOT EXISTS booking_status       TEXT DEFAULT 'pending',
  ADD COLUMN IF NOT EXISTS google_calendar_event_id TEXT,
  ADD COLUMN IF NOT EXISTS audit_completed_at   TIMESTAMPTZ;

-- Creador: campos específicos
ALTER TABLE leads
  ADD COLUMN IF NOT EXISTS creator_niche        TEXT,
  ADD COLUMN IF NOT EXISTS creator_followers    INTEGER,
  ADD COLUMN IF NOT EXISTS creator_platforms     TEXT[],
  ADD COLUMN IF NOT EXISTS creator_portfolio_url TEXT,
  ADD COLUMN IF NOT EXISTS creator_experience_years INTEGER;

-- Índices para el nuevo sistema
CREATE INDEX IF NOT EXISTS idx_leads_lead_type ON leads(lead_type);
CREATE INDEX IF NOT EXISTS idx_leads_temperature ON leads(temperature);
CREATE INDEX IF NOT EXISTS idx_leads_qualification_score ON leads(qualification_score DESC);
CREATE INDEX IF NOT EXISTS idx_leads_industry ON leads(industry);
CREATE INDEX IF NOT EXISTS idx_leads_booking_status ON leads(booking_status);

-- Hacer full_name nullable para leads parciales (el form es multi-step)
ALTER TABLE leads ALTER COLUMN full_name DROP NOT NULL;

COMMENT ON COLUMN leads.qualification_score IS 'Score 0-100 calculado por el sistema de auditoría web';
COMMENT ON COLUMN leads.temperature IS 'hot (70+), warm (40-69), cold (<40) basado en qualification_score';
COMMENT ON COLUMN leads.ai_diagnosis IS 'Diagnóstico generado por IA: recomendaciones, gaps detectados, CTA personalizado';
COMMENT ON COLUMN leads.booking_status IS 'pending, scheduled, completed, no_show, cancelled';
