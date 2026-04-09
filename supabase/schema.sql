-- =============================================================================
-- UGC COLOMBIA — Schema Supabase completo
-- Proyecto: ugccolombia.co
-- Ecosistema: Kreoon (Supabase)
-- Ultima actualizacion: 2026-04-08
-- =============================================================================
-- CONVENCIONES:
--   - Tablas en snake_case plural
--   - Columnas id (uuid), created_at, updated_at en toda tabla
--   - RLS habilitado en TODAS las tablas
--   - Usuarios se heredan de Supabase Auth (no se duplican)
-- =============================================================================


-- =============================================================================
-- 1. EXTENSIONES
-- =============================================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
-- pg_cron para reportes automáticos mensuales (habilitar desde Supabase Dashboard)
-- CREATE EXTENSION IF NOT EXISTS "pg_cron";


-- =============================================================================
-- 2. ENUMS
-- =============================================================================

-- Etapas del pipeline de leads
CREATE TYPE lead_stage AS ENUM (
  'nuevo',
  'contactado',
  'calificado',
  'propuesta_enviada',
  'negociacion',
  'convertido',
  'perdido',
  'descartado'
);

-- Estado de proyectos (alineado con doc 07)
CREATE TYPE project_status AS ENUM (
  'pendiente',
  'brief_enviado',
  'en_produccion',
  'borrador_recibido',
  'en_revision_cliente',
  'en_correccion_creador',
  'aprobado',
  'entregado',
  'cerrado',
  'cancelado'
);

-- Tier de creadores (sistema A/B/C de scoring)
CREATE TYPE creator_tier AS ENUM ('A', 'B', 'C');

-- Status de creadores
CREATE TYPE creator_status AS ENUM (
  'aplicante',
  'en_revision',
  'activo',
  'pausado',
  'suspendido',
  'rechazado'
);

-- Tipos de brief / formato de contenido
CREATE TYPE brief_type AS ENUM (
  'testimonial',
  'unboxing',
  'demo',
  'review',
  'lifestyle',
  'hook_ad',
  'foto_pack',
  'otro'
);

-- Estado de pagos
CREATE TYPE payment_status AS ENUM (
  'pendiente',
  'procesado',
  'fallido',
  'revertido'
);

-- Mercado objetivo
CREATE TYPE market_type AS ENUM ('LATAM', 'USA', 'Premium');

-- Tipo de uso del contenido
CREATE TYPE usage_type AS ENUM (
  'organico',
  'paid_media',
  'whitelisting',
  'perpetuo'
);

-- Tipo de pago al creador
CREATE TYPE payment_type AS ENUM (
  'anticipo',
  'saldo',
  'bonus',
  'penalidad'
);

-- Roles del equipo interno
CREATE TYPE team_role AS ENUM (
  'admin',
  'operaciones',
  'ventas',
  'finanzas',
  'creativo'
);

-- Estado del deliverable
CREATE TYPE deliverable_status AS ENUM (
  'pendiente',
  'subido',
  'en_revision',
  'aprobado',
  'rechazado',
  'entregado_cliente'
);

-- Tipo de lead source
CREATE TYPE lead_source AS ENUM (
  'sitio_web',
  'whatsapp',
  'instagram',
  'tiktok',
  'referido',
  'linkedin',
  'email',
  'otro'
);


-- =============================================================================
-- 3. FUNCIÓN HELPER: updated_at automático
-- =============================================================================

CREATE OR REPLACE FUNCTION trigger_set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;


-- =============================================================================
-- 4. TABLA: team_members
-- Equipo interno de UGC Colombia (Alexander, Brian, Diana, Samuel, Tanya)
-- Se vincula con auth.users de Supabase
-- =============================================================================

CREATE TABLE team_members (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  -- Vinculo con Supabase Auth
  user_id      UUID UNIQUE REFERENCES auth.users(id) ON DELETE SET NULL,

  full_name    TEXT NOT NULL,
  display_name TEXT,
  email        TEXT NOT NULL UNIQUE,
  whatsapp     TEXT,
  role         team_role NOT NULL DEFAULT 'operaciones',
  is_active    BOOLEAN NOT NULL DEFAULT true,

  -- Permisos granulares
  can_see_financials    BOOLEAN NOT NULL DEFAULT false,
  can_edit_creators     BOOLEAN NOT NULL DEFAULT false,
  can_approve_payments  BOOLEAN NOT NULL DEFAULT false,

  avatar_url   TEXT,
  notes        TEXT
);

CREATE TRIGGER set_updated_at_team_members
  BEFORE UPDATE ON team_members
  FOR EACH ROW EXECUTE FUNCTION trigger_set_updated_at();

ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;


-- =============================================================================
-- 5. TABLA: leads
-- Prospectos del sitio web, WhatsApp y redes sociales
-- =============================================================================

CREATE TABLE leads (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  -- Datos de contacto
  full_name    TEXT NOT NULL,
  email        TEXT,
  whatsapp     TEXT,
  company_name TEXT,
  website      TEXT,
  country      TEXT,
  city         TEXT,

  -- Origen y tracking
  source       lead_source NOT NULL DEFAULT 'sitio_web',
  utm_source   TEXT,
  utm_medium   TEXT,
  utm_campaign TEXT,
  referral_name TEXT,

  -- Calificacion
  stage        lead_stage NOT NULL DEFAULT 'nuevo',
  market       market_type,
  estimated_budget_usd NUMERIC(10,2),
  monthly_videos_needed INTEGER,
  content_types        brief_type[],

  -- Asignacion interna
  assigned_to  UUID REFERENCES team_members(id),
  last_contact_at TIMESTAMPTZ,
  next_followup_at TIMESTAMPTZ,

  -- Notas y metadata
  notes        TEXT,
  lost_reason  TEXT,
  raw_form_data JSONB   -- payload original del formulario web o webhook n8n
);

CREATE INDEX idx_leads_stage        ON leads(stage);
CREATE INDEX idx_leads_source       ON leads(source);
CREATE INDEX idx_leads_assigned_to  ON leads(assigned_to);
CREATE INDEX idx_leads_created_at   ON leads(created_at DESC);

CREATE TRIGGER set_updated_at_leads
  BEFORE UPDATE ON leads
  FOR EACH ROW EXECUTE FUNCTION trigger_set_updated_at();

ALTER TABLE leads ENABLE ROW LEVEL SECURITY;


-- =============================================================================
-- 6. TABLA: clients
-- Clientes activos (leads convertidos)
-- =============================================================================

CREATE TABLE clients (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  lead_id      UUID REFERENCES leads(id),

  -- Datos empresa
  company_name TEXT NOT NULL,
  brand_name   TEXT,
  contact_name TEXT NOT NULL,
  email        TEXT NOT NULL,
  whatsapp     TEXT,
  website      TEXT,
  country      TEXT NOT NULL DEFAULT 'Colombia',
  city         TEXT,
  market       market_type NOT NULL DEFAULT 'LATAM',

  -- Comercial
  account_manager  UUID REFERENCES team_members(id),
  monthly_retainer_usd NUMERIC(10,2),
  payment_terms_days   INTEGER DEFAULT 15,
  preferred_payment_method TEXT,
  billing_entity   TEXT,     -- razon social para facturacion
  billing_tax_id   TEXT,     -- NIT / RUT / EIN
  billing_country  TEXT,

  -- Estado
  is_active    BOOLEAN NOT NULL DEFAULT true,
  onboarded_at DATE,
  churned_at   DATE,
  churn_reason TEXT,

  -- Preferencias de contenido
  preferred_formats  brief_type[],
  brand_guidelines_url TEXT,
  do_not_use_creators  UUID[],   -- IDs de creadores excluidos para este cliente

  notes        TEXT,
  internal_notes TEXT
);

CREATE INDEX idx_clients_account_manager ON clients(account_manager);
CREATE INDEX idx_clients_is_active        ON clients(is_active);
CREATE INDEX idx_clients_market           ON clients(market);

CREATE TRIGGER set_updated_at_clients
  BEFORE UPDATE ON clients
  FOR EACH ROW EXECUTE FUNCTION trigger_set_updated_at();

ALTER TABLE clients ENABLE ROW LEVEL SECURITY;


-- =============================================================================
-- 7. TABLA: creators
-- Pool de creadores UGC — alineada con doc 07-dashboard-metricas-creadores
-- =============================================================================

CREATE TABLE creators (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  -- Datos personales
  full_name    TEXT NOT NULL,
  whatsapp     TEXT NOT NULL UNIQUE,
  email        TEXT UNIQUE,
  city         TEXT,
  country      TEXT NOT NULL DEFAULT 'Colombia',
  birthdate    DATE,
  gender       TEXT,
  id_type      TEXT,   -- CC, CE, pasaporte
  id_number    TEXT,

  -- Estado y clasificacion
  status       creator_status NOT NULL DEFAULT 'aplicante',
  tier         creator_tier,
  scoring_total       NUMERIC(5,2),
  scoring_last_updated DATE,

  -- Redes sociales
  instagram_handle        TEXT,
  instagram_followers     INTEGER,
  instagram_engagement_rate NUMERIC(5,2),
  tiktok_handle           TEXT,
  tiktok_followers        INTEGER,
  youtube_handle          TEXT,
  portfolio_url           TEXT,
  demo_reel_url           TEXT,

  -- Capacidades tecnicas
  max_resolution          TEXT,
  editing_tools           TEXT[],
  languages               TEXT[],
  equipment               TEXT[],

  -- Nichos y exclusiones
  niches                  TEXT[],
  excluded_categories     TEXT[],

  -- Disponibilidad
  monthly_capacity_videos INTEGER DEFAULT 4,
  typical_turnaround_days INTEGER DEFAULT 5,
  accepts_physical_product BOOLEAN DEFAULT true,
  shipping_address        TEXT,

  -- Pago
  preferred_payment_method TEXT,
  payment_account_details  TEXT,  -- nequi/bancolombia/wise — cifrar si necesario
  has_rut                 BOOLEAN DEFAULT false,
  issues_invoice          BOOLEAN DEFAULT false,
  base_rate_usd           NUMERIC(10,2),

  -- Tracking de aplicacion
  applied_at              TIMESTAMPTZ,
  approved_by             UUID REFERENCES team_members(id),
  approved_at             TIMESTAMPTZ,

  -- Notas internas (solo equipo)
  internal_notes          TEXT,
  diana_notes             TEXT,
  flags                   TEXT[]
);

CREATE INDEX idx_creators_status     ON creators(status);
CREATE INDEX idx_creators_tier       ON creators(tier);
CREATE INDEX idx_creators_country    ON creators(country);
CREATE INDEX idx_creators_niches     ON creators USING GIN(niches);
CREATE INDEX idx_creators_languages  ON creators USING GIN(languages);

CREATE TRIGGER set_updated_at_creators
  BEFORE UPDATE ON creators
  FOR EACH ROW EXECUTE FUNCTION trigger_set_updated_at();

ALTER TABLE creators ENABLE ROW LEVEL SECURITY;


-- =============================================================================
-- 8. TABLA: creator_scoring_history
-- Historial de evaluaciones (doc 07, Tabla 4)
-- =============================================================================

CREATE TABLE creator_scoring_history (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  creator_id   UUID NOT NULL REFERENCES creators(id) ON DELETE CASCADE,
  evaluated_by UUID REFERENCES team_members(id),

  -- Scores por categoria (escala 0-100)
  score_engagement          NUMERIC(5,2),
  score_technical_quality   NUMERIC(5,2),
  score_hook_retention      NUMERIC(5,2),
  score_professionalism     NUMERIC(5,2),
  score_soft_skills         NUMERIC(5,2),
  score_languages           NUMERIC(5,2),
  total_score               NUMERIC(5,2),

  tier_assigned  creator_tier,
  notes          TEXT,
  trigger_event  TEXT  -- 'aplicacion_inicial','revision_90_dias','post_proyecto','incidente'
);

CREATE INDEX idx_scoring_creator_id  ON creator_scoring_history(creator_id);
CREATE INDEX idx_scoring_created_at  ON creator_scoring_history(created_at DESC);

CREATE TRIGGER set_updated_at_scoring
  BEFORE UPDATE ON creator_scoring_history
  FOR EACH ROW EXECUTE FUNCTION trigger_set_updated_at();

ALTER TABLE creator_scoring_history ENABLE ROW LEVEL SECURITY;


-- =============================================================================
-- 9. TABLA: projects
-- Proyectos por cliente — cada proyecto agrupa uno o más briefs
-- =============================================================================

CREATE TABLE projects (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  -- Identificacion
  project_number TEXT UNIQUE NOT NULL,  -- ej: UGC-2026-0042
  client_id      UUID NOT NULL REFERENCES clients(id),
  brand_name     TEXT NOT NULL,         -- puede diferir del cliente (sub-marca)
  market         market_type NOT NULL DEFAULT 'LATAM',

  -- Responsables
  account_manager  UUID REFERENCES team_members(id),
  ops_manager      UUID REFERENCES team_members(id),

  -- Estado general del proyecto
  status         project_status NOT NULL DEFAULT 'pendiente',
  start_date     DATE,
  end_date       DATE,
  is_retainer    BOOLEAN NOT NULL DEFAULT false,
  retainer_month DATE,   -- primer dia del mes si es retainer recurrente

  -- Financiero a nivel de proyecto
  total_price_usd      NUMERIC(10,2),
  total_creator_cost   NUMERIC(10,2),  -- calculado via trigger
  agency_margin_usd    NUMERIC(10,2),  -- calculado via trigger
  agency_margin_pct    NUMERIC(5,2),   -- calculado via trigger

  -- Notas
  internal_notes TEXT,
  client_feedback TEXT
);

CREATE INDEX idx_projects_client_id  ON projects(client_id);
CREATE INDEX idx_projects_status     ON projects(status);
CREATE INDEX idx_projects_market     ON projects(market);
CREATE INDEX idx_projects_created_at ON projects(created_at DESC);
CREATE INDEX idx_projects_retainer_month ON projects(retainer_month);

CREATE TRIGGER set_updated_at_projects
  BEFORE UPDATE ON projects
  FOR EACH ROW EXECUTE FUNCTION trigger_set_updated_at();

ALTER TABLE projects ENABLE ROW LEVEL SECURITY;


-- =============================================================================
-- 10. SECUENCIA PARA project_number
-- =============================================================================

CREATE SEQUENCE project_seq START WITH 1 INCREMENT BY 1;

CREATE OR REPLACE FUNCTION generate_project_number()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.project_number IS NULL OR NEW.project_number = '' THEN
    NEW.project_number := 'UGC-' || TO_CHAR(NOW(), 'YYYY') || '-' ||
                          LPAD(nextval('project_seq')::TEXT, 4, '0');
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_project_number
  BEFORE INSERT ON projects
  FOR EACH ROW EXECUTE FUNCTION generate_project_number();


-- =============================================================================
-- 11. TABLA: briefs
-- Uno o más briefs por proyecto — cada brief define un video/foto a producir
-- =============================================================================

CREATE TABLE briefs (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  project_id   UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  brief_number INTEGER NOT NULL DEFAULT 1,  -- orden dentro del proyecto

  -- Contenido del brief
  title        TEXT NOT NULL,
  content_type brief_type NOT NULL,
  platform     TEXT,               -- Instagram Reels, TikTok, YouTube Shorts
  duration_seconds INTEGER,
  usage_type   usage_type DEFAULT 'organico',
  whitelisting_days INTEGER,
  aspect_ratio TEXT DEFAULT '9:16',

  -- Brief detallado
  description  TEXT,
  hook_options TEXT[],             -- opciones de hook sugeridas
  script_url   TEXT,               -- Google Doc o Notion
  reference_urls TEXT[],
  dos          TEXT[],
  donts        TEXT[],
  brand_voice  TEXT,
  cta_text     TEXT,

  -- Asignacion de creador
  creator_id   UUID REFERENCES creators(id),
  assigned_by  UUID REFERENCES team_members(id),
  assigned_at  TIMESTAMPTZ,

  -- Fechas clave
  brief_sent_date          DATE,
  product_shipped_date     DATE,
  product_received_date    DATE,
  draft_due_date           DATE,
  draft_received_date      DATE,
  final_due_date           DATE,
  final_delivered_date     DATE,
  client_approved_date     DATE,

  -- Estado del brief
  status       project_status NOT NULL DEFAULT 'pendiente',

  -- Revisiones
  revision_rounds_included INTEGER DEFAULT 2,
  revision_rounds_used     INTEGER DEFAULT 0,
  extra_revision_rounds    INTEGER DEFAULT 0,
  extra_revision_fee_usd   NUMERIC(10,2) DEFAULT 0,

  -- Financiero del brief
  price_to_client_usd      NUMERIC(10,2),
  creator_rate_usd         NUMERIC(10,2),
  agency_markup_pct        NUMERIC(5,2),

  -- Calidad post-entrega (escala 1-5)
  quality_score_draft            NUMERIC(3,1) CHECK (quality_score_draft BETWEEN 1 AND 5),
  quality_score_brief_compliance NUMERIC(3,1) CHECK (quality_score_brief_compliance BETWEEN 1 AND 5),
  quality_score_punctuality      NUMERIC(3,1) CHECK (quality_score_punctuality BETWEEN 1 AND 5),
  quality_score_corrections      NUMERIC(3,1) CHECK (quality_score_corrections BETWEEN 1 AND 5),
  quality_score_communication    NUMERIC(3,1) CHECK (quality_score_communication BETWEEN 1 AND 5),
  quality_average                NUMERIC(3,2),  -- calculado via trigger

  -- Notas
  internal_notes TEXT,
  client_feedback TEXT,

  UNIQUE (project_id, brief_number)
);

CREATE INDEX idx_briefs_project_id   ON briefs(project_id);
CREATE INDEX idx_briefs_creator_id   ON briefs(creator_id);
CREATE INDEX idx_briefs_status       ON briefs(status);
CREATE INDEX idx_briefs_final_due    ON briefs(final_due_date);

CREATE TRIGGER set_updated_at_briefs
  BEFORE UPDATE ON briefs
  FOR EACH ROW EXECUTE FUNCTION trigger_set_updated_at();

ALTER TABLE briefs ENABLE ROW LEVEL SECURITY;


-- =============================================================================
-- 12. TRIGGER: calcular quality_average en briefs
-- =============================================================================

CREATE OR REPLACE FUNCTION calculate_brief_quality_average()
RETURNS TRIGGER AS $$
DECLARE
  score_count  INTEGER := 0;
  score_sum    NUMERIC := 0;
BEGIN
  IF NEW.quality_score_draft IS NOT NULL THEN
    score_sum := score_sum + NEW.quality_score_draft; score_count := score_count + 1;
  END IF;
  IF NEW.quality_score_brief_compliance IS NOT NULL THEN
    score_sum := score_sum + NEW.quality_score_brief_compliance; score_count := score_count + 1;
  END IF;
  IF NEW.quality_score_punctuality IS NOT NULL THEN
    score_sum := score_sum + NEW.quality_score_punctuality; score_count := score_count + 1;
  END IF;
  IF NEW.quality_score_corrections IS NOT NULL THEN
    score_sum := score_sum + NEW.quality_score_corrections; score_count := score_count + 1;
  END IF;
  IF NEW.quality_score_communication IS NOT NULL THEN
    score_sum := score_sum + NEW.quality_score_communication; score_count := score_count + 1;
  END IF;

  IF score_count > 0 THEN
    NEW.quality_average := ROUND(score_sum / score_count, 2);
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER calculate_quality_average
  BEFORE INSERT OR UPDATE ON briefs
  FOR EACH ROW EXECUTE FUNCTION calculate_brief_quality_average();


-- =============================================================================
-- 13. TABLA: deliverables
-- Archivos entregados por creadores (videos, fotos, raw footage)
-- =============================================================================

CREATE TABLE deliverables (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  brief_id     UUID NOT NULL REFERENCES briefs(id) ON DELETE CASCADE,
  creator_id   UUID NOT NULL REFERENCES creators(id),

  -- Tipo y version
  deliverable_type TEXT NOT NULL DEFAULT 'video',  -- video, foto, raw, caption
  version      INTEGER NOT NULL DEFAULT 1,
  is_final     BOOLEAN NOT NULL DEFAULT false,

  -- Almacenamiento
  -- Bunny CDN para video (stream.bunnycdn.com), Supabase Storage para fotos
  file_url     TEXT,
  bunny_video_id TEXT,    -- ID en Bunny Stream
  storage_path TEXT,      -- path en Supabase Storage
  file_size_mb NUMERIC(10,2),
  duration_seconds INTEGER,
  resolution   TEXT,

  -- Estado de revision
  status       deliverable_status NOT NULL DEFAULT 'subido',
  reviewed_by  UUID REFERENCES team_members(id),
  reviewed_at  TIMESTAMPTZ,

  -- Feedback
  agency_feedback     TEXT,
  client_feedback     TEXT,
  revision_requested  BOOLEAN DEFAULT false,
  revision_notes      TEXT,

  -- Entrega al cliente
  delivered_to_client_at TIMESTAMPTZ,
  client_download_url    TEXT,
  client_download_expires_at TIMESTAMPTZ,

  notes TEXT
);

CREATE INDEX idx_deliverables_brief_id   ON deliverables(brief_id);
CREATE INDEX idx_deliverables_creator_id ON deliverables(creator_id);
CREATE INDEX idx_deliverables_status     ON deliverables(status);

CREATE TRIGGER set_updated_at_deliverables
  BEFORE UPDATE ON deliverables
  FOR EACH ROW EXECUTE FUNCTION trigger_set_updated_at();

ALTER TABLE deliverables ENABLE ROW LEVEL SECURITY;


-- =============================================================================
-- 14. TABLA: creator_payments
-- Pagos individuales a creadores (alineado con doc 07, Tabla 3)
-- =============================================================================

CREATE TABLE creator_payments (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  creator_id   UUID NOT NULL REFERENCES creators(id),
  brief_id     UUID REFERENCES briefs(id),
  project_id   UUID REFERENCES projects(id),

  payment_type   payment_type NOT NULL,
  amount_usd     NUMERIC(10,2) NOT NULL CHECK (amount_usd > 0),
  amount_cop     NUMERIC(15,2),
  exchange_rate  NUMERIC(10,2),

  payment_method  TEXT,          -- Nequi, Bancolombia, Wise, PayPal, Deel
  payment_date    DATE,
  status          payment_status NOT NULL DEFAULT 'pendiente',
  reference_number TEXT,

  approved_by  UUID REFERENCES team_members(id),
  approved_at  TIMESTAMPTZ,

  notes TEXT
);

CREATE INDEX idx_creator_payments_creator_id ON creator_payments(creator_id);
CREATE INDEX idx_creator_payments_status     ON creator_payments(status);
CREATE INDEX idx_creator_payments_date       ON creator_payments(payment_date DESC);
CREATE INDEX idx_creator_payments_project_id ON creator_payments(project_id);

CREATE TRIGGER set_updated_at_creator_payments
  BEFORE UPDATE ON creator_payments
  FOR EACH ROW EXECUTE FUNCTION trigger_set_updated_at();

ALTER TABLE creator_payments ENABLE ROW LEVEL SECURITY;


-- =============================================================================
-- 15. TABLA: client_invoices
-- Facturas / cobros a clientes
-- =============================================================================

CREATE TABLE client_invoices (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  client_id    UUID NOT NULL REFERENCES clients(id),
  project_id   UUID REFERENCES projects(id),

  -- Numeracion
  invoice_number TEXT UNIQUE NOT NULL,
  invoice_date   DATE NOT NULL DEFAULT CURRENT_DATE,
  due_date       DATE,

  -- Montos
  subtotal_usd   NUMERIC(10,2) NOT NULL CHECK (subtotal_usd >= 0),
  tax_pct        NUMERIC(5,2) DEFAULT 0,
  tax_amount_usd NUMERIC(10,2) GENERATED ALWAYS AS (subtotal_usd * tax_pct / 100) STORED,
  total_usd      NUMERIC(10,2) GENERATED ALWAYS AS (subtotal_usd + subtotal_usd * tax_pct / 100) STORED,
  total_cop      NUMERIC(15,2),
  exchange_rate  NUMERIC(10,2),

  -- Estado
  status         payment_status NOT NULL DEFAULT 'pendiente',
  paid_at        TIMESTAMPTZ,
  payment_method TEXT,
  reference_number TEXT,

  -- Documento
  invoice_url    TEXT,   -- PDF en Supabase Storage o link externo
  notes          TEXT,
  internal_notes TEXT
);

CREATE SEQUENCE invoice_seq START WITH 1001 INCREMENT BY 1;

CREATE OR REPLACE FUNCTION generate_invoice_number()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.invoice_number IS NULL OR NEW.invoice_number = '' THEN
    NEW.invoice_number := 'INV-' || TO_CHAR(NOW(), 'YYYY') || '-' ||
                          LPAD(nextval('invoice_seq')::TEXT, 4, '0');
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_invoice_number
  BEFORE INSERT ON client_invoices
  FOR EACH ROW EXECUTE FUNCTION generate_invoice_number();

CREATE INDEX idx_invoices_client_id  ON client_invoices(client_id);
CREATE INDEX idx_invoices_status     ON client_invoices(status);
CREATE INDEX idx_invoices_due_date   ON client_invoices(due_date);

CREATE TRIGGER set_updated_at_invoices
  BEFORE UPDATE ON client_invoices
  FOR EACH ROW EXECUTE FUNCTION trigger_set_updated_at();

ALTER TABLE client_invoices ENABLE ROW LEVEL SECURITY;


-- =============================================================================
-- 16. TABLA: reports
-- Reportes mensuales por cliente (generados automáticamente via n8n + pg_cron)
-- =============================================================================

CREATE TABLE reports (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  client_id    UUID NOT NULL REFERENCES clients(id),
  month        DATE NOT NULL,  -- primer dia del mes: 2026-04-01
  generated_by UUID REFERENCES team_members(id),
  generated_at TIMESTAMPTZ DEFAULT NOW(),

  -- KPIs del periodo
  total_briefs_delivered  INTEGER DEFAULT 0,
  total_briefs_approved   INTEGER DEFAULT 0,
  approval_rate_pct       NUMERIC(5,2),
  avg_quality_score       NUMERIC(3,2),
  avg_turnaround_days     NUMERIC(5,1),
  total_invoiced_usd      NUMERIC(10,2),
  total_paid_usd          NUMERIC(10,2),
  balance_pending_usd     NUMERIC(10,2),

  -- Contenido del reporte
  summary_text    TEXT,    -- resumen ejecutivo (puede generarse con IA via n8n)
  highlights      TEXT[],  -- logros del mes
  issues          TEXT[],  -- problemas o atrasos
  next_month_plan TEXT,

  -- Distribución
  report_url      TEXT,    -- PDF generado
  sent_at         TIMESTAMPTZ,
  sent_to         TEXT[],  -- emails a los que se envió

  is_published    BOOLEAN NOT NULL DEFAULT false,

  UNIQUE (client_id, month)
);

CREATE INDEX idx_reports_client_id ON reports(client_id);
CREATE INDEX idx_reports_month     ON reports(month DESC);

CREATE TRIGGER set_updated_at_reports
  BEFORE UPDATE ON reports
  FOR EACH ROW EXECUTE FUNCTION trigger_set_updated_at();

ALTER TABLE reports ENABLE ROW LEVEL SECURITY;


-- =============================================================================
-- 17. TABLA: mrr_snapshots
-- Snapshot mensual de MRR para tracking financiero
-- =============================================================================

CREATE TABLE mrr_snapshots (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  snapshot_month       DATE NOT NULL UNIQUE,  -- 2026-04-01
  mrr_usd              NUMERIC(10,2) NOT NULL DEFAULT 0,
  active_clients       INTEGER NOT NULL DEFAULT 0,
  active_creators      INTEGER NOT NULL DEFAULT 0,
  total_briefs_closed  INTEGER NOT NULL DEFAULT 0,
  total_revenue_usd    NUMERIC(10,2) NOT NULL DEFAULT 0,
  total_creator_cost   NUMERIC(10,2) NOT NULL DEFAULT 0,
  gross_margin_pct     NUMERIC(5,2),
  new_clients          INTEGER DEFAULT 0,
  churned_clients      INTEGER DEFAULT 0,
  notes                TEXT
);

ALTER TABLE mrr_snapshots ENABLE ROW LEVEL SECURITY;


-- =============================================================================
-- 18. TRIGGER: scoring automático de creadores
-- Cuando se inserta en creator_scoring_history, actualiza creators.tier y scoring
-- =============================================================================

CREATE OR REPLACE FUNCTION update_creator_scoring()
RETURNS TRIGGER AS $$
DECLARE
  v_tier creator_tier;
BEGIN
  -- Determinar tier según score total
  IF NEW.total_score >= 80 THEN
    v_tier := 'A';
  ELSIF NEW.total_score >= 60 THEN
    v_tier := 'B';
  ELSE
    v_tier := 'C';
  END IF;

  -- Actualizar tabla creators
  UPDATE creators
  SET
    scoring_total        = NEW.total_score,
    scoring_last_updated = CURRENT_DATE,
    tier                 = v_tier
  WHERE id = NEW.creator_id;

  -- Asignar tier al registro de scoring también
  NEW.tier_assigned := v_tier;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER auto_update_creator_scoring
  BEFORE INSERT ON creator_scoring_history
  FOR EACH ROW EXECUTE FUNCTION update_creator_scoring();


-- =============================================================================
-- 19. FUNCIÓN Y TRIGGER: calcular margen del proyecto
-- Se recalcula cuando cambia total_price_usd o total_creator_cost
-- =============================================================================

CREATE OR REPLACE FUNCTION calculate_project_margin()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.total_price_usd IS NOT NULL AND NEW.total_creator_cost IS NOT NULL
     AND NEW.total_price_usd > 0 THEN
    NEW.agency_margin_usd := NEW.total_price_usd - NEW.total_creator_cost;
    NEW.agency_margin_pct := ROUND(
      (NEW.total_price_usd - NEW.total_creator_cost) / NEW.total_price_usd * 100,
      2
    );
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER auto_calculate_project_margin
  BEFORE INSERT OR UPDATE ON projects
  FOR EACH ROW EXECUTE FUNCTION calculate_project_margin();


-- =============================================================================
-- 20. FUNCIÓN: calcular MRR snapshot (llamable desde n8n o pg_cron)
-- Uso: SELECT calculate_mrr_snapshot('2026-04-01');
-- =============================================================================

CREATE OR REPLACE FUNCTION calculate_mrr_snapshot(p_month DATE)
RETURNS VOID AS $$
DECLARE
  v_month_start DATE := DATE_TRUNC('month', p_month);
  v_month_end   DATE := DATE_TRUNC('month', p_month) + INTERVAL '1 month' - INTERVAL '1 day';
BEGIN
  INSERT INTO mrr_snapshots (
    snapshot_month,
    mrr_usd,
    active_clients,
    active_creators,
    total_briefs_closed,
    total_revenue_usd,
    total_creator_cost,
    gross_margin_pct,
    new_clients,
    churned_clients
  )
  SELECT
    v_month_start,
    COALESCE(SUM(c.monthly_retainer_usd) FILTER (WHERE c.is_active = true), 0),
    COUNT(DISTINCT c.id) FILTER (WHERE c.is_active = true),
    COUNT(DISTINCT cr.id) FILTER (WHERE cr.status = 'activo'),
    COUNT(DISTINCT b.id) FILTER (
      WHERE b.status = 'cerrado'
      AND b.final_delivered_date BETWEEN v_month_start AND v_month_end
    ),
    COALESCE(SUM(inv.total_usd) FILTER (
      WHERE inv.invoice_date BETWEEN v_month_start AND v_month_end
    ), 0),
    COALESCE(SUM(cp.amount_usd) FILTER (
      WHERE cp.payment_date BETWEEN v_month_start AND v_month_end
      AND cp.status = 'procesado'
    ), 0),
    CASE
      WHEN SUM(inv.total_usd) FILTER (
        WHERE inv.invoice_date BETWEEN v_month_start AND v_month_end
      ) > 0
      THEN ROUND(
        (SUM(inv.total_usd) FILTER (
          WHERE inv.invoice_date BETWEEN v_month_start AND v_month_end
        ) - COALESCE(SUM(cp.amount_usd) FILTER (
          WHERE cp.payment_date BETWEEN v_month_start AND v_month_end
          AND cp.status = 'procesado'
        ), 0))
        / SUM(inv.total_usd) FILTER (
          WHERE inv.invoice_date BETWEEN v_month_start AND v_month_end
        ) * 100, 2)
      ELSE 0
    END,
    COUNT(DISTINCT c.id) FILTER (
      WHERE DATE_TRUNC('month', c.onboarded_at) = v_month_start
    ),
    COUNT(DISTINCT c.id) FILTER (
      WHERE DATE_TRUNC('month', c.churned_at) = v_month_start
    )
  FROM clients c
  CROSS JOIN creators cr
  LEFT JOIN briefs b ON true
  LEFT JOIN client_invoices inv ON inv.client_id = c.id
  LEFT JOIN creator_payments cp ON true
  ON CONFLICT (snapshot_month) DO UPDATE SET
    mrr_usd             = EXCLUDED.mrr_usd,
    active_clients      = EXCLUDED.active_clients,
    active_creators     = EXCLUDED.active_creators,
    total_briefs_closed = EXCLUDED.total_briefs_closed,
    total_revenue_usd   = EXCLUDED.total_revenue_usd,
    total_creator_cost  = EXCLUDED.total_creator_cost,
    gross_margin_pct    = EXCLUDED.gross_margin_pct,
    new_clients         = EXCLUDED.new_clients,
    churned_clients     = EXCLUDED.churned_clients;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;


-- =============================================================================
-- 21. VISTAS
-- =============================================================================

-- -----------------------------------------------------------------------------
-- Vista 1: creator_performance_summary (doc 07 — tabla 4)
-- -----------------------------------------------------------------------------
CREATE OR REPLACE VIEW creator_performance_summary AS
SELECT
  c.id,
  c.full_name,
  c.tier,
  c.status,
  c.country,
  c.instagram_handle,
  c.instagram_followers,
  c.instagram_engagement_rate,
  c.base_rate_usd,
  c.languages,
  c.niches,
  c.monthly_capacity_videos,
  c.scoring_total,

  -- Metricas de briefs
  COUNT(b.id)                                                   AS total_briefs,
  COUNT(b.id) FILTER (WHERE b.status = 'cerrado')               AS completed_briefs,
  COUNT(b.id) FILTER (WHERE b.status = 'cancelado')             AS cancelled_briefs,
  COUNT(b.id) FILTER (
    WHERE b.status NOT IN ('cerrado','cancelado','pendiente')
  )                                                             AS active_briefs,

  -- Puntualidad (dias de retraso promedio, negativo = adelantado)
  ROUND(AVG(
    CASE
      WHEN b.final_delivered_date IS NOT NULL AND b.final_due_date IS NOT NULL
      THEN EXTRACT(DAY FROM (b.final_delivered_date - b.final_due_date))
    END
  ), 1)                                                         AS avg_days_delta,

  -- Revisiones
  ROUND(AVG(b.revision_rounds_used), 1)                         AS avg_revision_rounds,

  -- Calidad
  ROUND(AVG(b.quality_average), 2)                              AS avg_quality_score,
  ROUND(AVG(b.quality_score_brief_compliance), 2)               AS avg_brief_compliance,
  ROUND(AVG(b.quality_score_punctuality), 2)                    AS avg_punctuality,
  ROUND(AVG(b.quality_score_communication), 2)                  AS avg_communication,

  -- Financiero
  COALESCE(SUM(b.creator_rate_usd), 0)                          AS total_earned_usd,
  ROUND(AVG(b.creator_rate_usd), 2)                             AS avg_rate_per_brief,

  -- Actividad
  MAX(b.created_at)                                             AS last_brief_date,
  MIN(b.created_at)                                             AS first_brief_date,

  -- Alertas
  CASE
    WHEN c.scoring_last_updated < CURRENT_DATE - INTERVAL '90 days'
    THEN true ELSE false
  END                                                           AS scoring_overdue,
  CASE
    WHEN AVG(b.quality_average) < 3.5 AND COUNT(b.id) >= 2
    THEN true ELSE false
  END                                                           AS quality_alert

FROM creators c
LEFT JOIN briefs b ON b.creator_id = c.id
GROUP BY c.id;


-- -----------------------------------------------------------------------------
-- Vista 2: client_dashboard
-- KPIs por cliente para el panel de cuenta
-- -----------------------------------------------------------------------------
CREATE OR REPLACE VIEW client_dashboard AS
SELECT
  cl.id                                                         AS client_id,
  cl.company_name,
  cl.brand_name,
  cl.contact_name,
  cl.market,
  cl.monthly_retainer_usd,
  cl.is_active,
  cl.onboarded_at,

  tm.display_name                                               AS account_manager_name,

  -- Proyectos
  COUNT(DISTINCT p.id)                                          AS total_projects,
  COUNT(DISTINCT p.id) FILTER (
    WHERE p.status NOT IN ('cerrado','cancelado')
  )                                                             AS active_projects,

  -- Briefs
  COUNT(b.id)                                                   AS total_briefs,
  COUNT(b.id) FILTER (WHERE b.status = 'cerrado')               AS completed_briefs,
  COUNT(b.id) FILTER (
    WHERE b.status NOT IN ('cerrado','cancelado')
    AND b.final_due_date < CURRENT_DATE
  )                                                             AS overdue_briefs,

  -- Calidad
  ROUND(AVG(b.quality_average), 2)                              AS avg_quality_score,
  ROUND(AVG(b.revision_rounds_used), 1)                         AS avg_revision_rounds,

  -- Financiero
  COALESCE(SUM(inv.total_usd) FILTER (
    WHERE inv.invoice_date >= DATE_TRUNC('year', CURRENT_DATE)
  ), 0)                                                         AS revenue_ytd_usd,
  COALESCE(SUM(inv.total_usd) FILTER (
    WHERE inv.invoice_date >= DATE_TRUNC('month', CURRENT_DATE)
  ), 0)                                                         AS revenue_current_month_usd,
  COALESCE(SUM(inv.total_usd) FILTER (
    WHERE inv.status = 'pendiente'
    AND inv.due_date < CURRENT_DATE
  ), 0)                                                         AS overdue_balance_usd,

  -- Actividad reciente
  MAX(b.final_delivered_date)                                   AS last_delivery_date

FROM clients cl
LEFT JOIN team_members tm      ON tm.id = cl.account_manager
LEFT JOIN projects p           ON p.client_id = cl.id
LEFT JOIN briefs b             ON b.project_id = p.id
LEFT JOIN client_invoices inv  ON inv.client_id = cl.id
GROUP BY cl.id, tm.display_name;


-- -----------------------------------------------------------------------------
-- Vista 3: pipeline_by_stage
-- Pipeline de leads y proyectos para seguimiento comercial y operativo
-- -----------------------------------------------------------------------------
CREATE OR REPLACE VIEW pipeline_by_stage AS
-- Pipeline de leads (comercial)
SELECT
  'lead'                    AS pipeline_type,
  stage::TEXT               AS stage,
  COUNT(*)                  AS count,
  COALESCE(SUM(estimated_budget_usd), 0) AS value_usd,
  MIN(created_at)           AS oldest_entry,
  MAX(created_at)           AS newest_entry
FROM leads
WHERE stage NOT IN ('convertido', 'perdido', 'descartado')
GROUP BY stage

UNION ALL

-- Pipeline de proyectos (operativo)
SELECT
  'project'                 AS pipeline_type,
  status::TEXT              AS stage,
  COUNT(*)                  AS count,
  COALESCE(SUM(total_price_usd), 0) AS value_usd,
  MIN(created_at)           AS oldest_entry,
  MAX(created_at)           AS newest_entry
FROM projects
WHERE status NOT IN ('cerrado', 'cancelado')
GROUP BY status

ORDER BY pipeline_type, stage;


-- =============================================================================
-- 22. POLÍTICAS RLS
-- Estrategia:
--   - service_role: acceso total (n8n, Edge Functions, cron jobs)
--   - authenticated + team: acceso según rol
--   - anon: SIN acceso a ninguna tabla (todas son privadas)
-- =============================================================================

-- Helper function: verificar si el usuario autenticado es team member activo
CREATE OR REPLACE FUNCTION is_team_member()
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM team_members
    WHERE user_id = auth.uid()
    AND is_active = true
  );
$$ LANGUAGE sql SECURITY DEFINER STABLE;

-- Helper: verificar rol específico
CREATE OR REPLACE FUNCTION has_team_role(required_role team_role)
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM team_members
    WHERE user_id = auth.uid()
    AND is_active = true
    AND (role = required_role OR role = 'admin')
  );
$$ LANGUAGE sql SECURITY DEFINER STABLE;

-- Helper: verificar permiso de ver financials
CREATE OR REPLACE FUNCTION can_see_financials()
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM team_members
    WHERE user_id = auth.uid()
    AND is_active = true
    AND (can_see_financials = true OR role = 'admin')
  );
$$ LANGUAGE sql SECURITY DEFINER STABLE;


-- ---- team_members ----
CREATE POLICY "team: select own or admin"
  ON team_members FOR SELECT
  USING (user_id = auth.uid() OR has_team_role('admin'));

CREATE POLICY "team: insert admin only"
  ON team_members FOR INSERT
  WITH CHECK (has_team_role('admin'));

CREATE POLICY "team: update own or admin"
  ON team_members FOR UPDATE
  USING (user_id = auth.uid() OR has_team_role('admin'))
  WITH CHECK (user_id = auth.uid() OR has_team_role('admin'));

CREATE POLICY "team: delete admin only"
  ON team_members FOR DELETE
  USING (has_team_role('admin'));


-- ---- leads ----
CREATE POLICY "leads: select team"
  ON leads FOR SELECT
  USING (is_team_member());

CREATE POLICY "leads: insert team"
  ON leads FOR INSERT
  WITH CHECK (is_team_member());

CREATE POLICY "leads: update team"
  ON leads FOR UPDATE
  USING (is_team_member())
  WITH CHECK (is_team_member());

CREATE POLICY "leads: delete admin only"
  ON leads FOR DELETE
  USING (has_team_role('admin'));


-- ---- clients ----
CREATE POLICY "clients: select team"
  ON clients FOR SELECT
  USING (is_team_member());

CREATE POLICY "clients: insert ventas or admin"
  ON clients FOR INSERT
  WITH CHECK (has_team_role('ventas'));

CREATE POLICY "clients: update ops or admin"
  ON clients FOR UPDATE
  USING (is_team_member())
  WITH CHECK (is_team_member());

CREATE POLICY "clients: delete admin only"
  ON clients FOR DELETE
  USING (has_team_role('admin'));


-- ---- creators ----
CREATE POLICY "creators: select team"
  ON creators FOR SELECT
  USING (is_team_member());

CREATE POLICY "creators: insert ops or admin"
  ON creators FOR INSERT
  WITH CHECK (has_team_role('operaciones'));

CREATE POLICY "creators: update ops or admin"
  ON creators FOR UPDATE
  USING (is_team_member())
  WITH CHECK (is_team_member());

CREATE POLICY "creators: delete admin only"
  ON creators FOR DELETE
  USING (has_team_role('admin'));


-- ---- creator_scoring_history ----
CREATE POLICY "scoring: select team"
  ON creator_scoring_history FOR SELECT
  USING (is_team_member());

CREATE POLICY "scoring: insert ops or admin"
  ON creator_scoring_history FOR INSERT
  WITH CHECK (has_team_role('operaciones'));

CREATE POLICY "scoring: update ops or admin"
  ON creator_scoring_history FOR UPDATE
  USING (is_team_member())
  WITH CHECK (is_team_member());

CREATE POLICY "scoring: delete admin only"
  ON creator_scoring_history FOR DELETE
  USING (has_team_role('admin'));


-- ---- projects ----
CREATE POLICY "projects: select team"
  ON projects FOR SELECT
  USING (is_team_member());

CREATE POLICY "projects: insert ops or admin"
  ON projects FOR INSERT
  WITH CHECK (has_team_role('operaciones'));

CREATE POLICY "projects: update team"
  ON projects FOR UPDATE
  USING (is_team_member())
  WITH CHECK (is_team_member());

CREATE POLICY "projects: delete admin only"
  ON projects FOR DELETE
  USING (has_team_role('admin'));


-- ---- briefs ----
CREATE POLICY "briefs: select team"
  ON briefs FOR SELECT
  USING (is_team_member());

CREATE POLICY "briefs: insert ops or admin"
  ON briefs FOR INSERT
  WITH CHECK (has_team_role('operaciones'));

CREATE POLICY "briefs: update team"
  ON briefs FOR UPDATE
  USING (is_team_member())
  WITH CHECK (is_team_member());

CREATE POLICY "briefs: delete admin only"
  ON briefs FOR DELETE
  USING (has_team_role('admin'));


-- ---- deliverables ----
CREATE POLICY "deliverables: select team"
  ON deliverables FOR SELECT
  USING (is_team_member());

CREATE POLICY "deliverables: insert ops or admin"
  ON deliverables FOR INSERT
  WITH CHECK (has_team_role('operaciones'));

CREATE POLICY "deliverables: update team"
  ON deliverables FOR UPDATE
  USING (is_team_member())
  WITH CHECK (is_team_member());

CREATE POLICY "deliverables: delete admin only"
  ON deliverables FOR DELETE
  USING (has_team_role('admin'));


-- ---- creator_payments ----
-- Solo quienes pueden ver financials ven pagos completos
CREATE POLICY "creator_payments: select finanzas or admin"
  ON creator_payments FOR SELECT
  USING (can_see_financials());

CREATE POLICY "creator_payments: insert finanzas or admin"
  ON creator_payments FOR INSERT
  WITH CHECK (can_see_financials());

CREATE POLICY "creator_payments: update finanzas or admin"
  ON creator_payments FOR UPDATE
  USING (can_see_financials())
  WITH CHECK (can_see_financials());

CREATE POLICY "creator_payments: delete admin only"
  ON creator_payments FOR DELETE
  USING (has_team_role('admin'));


-- ---- client_invoices ----
CREATE POLICY "invoices: select finanzas or admin"
  ON client_invoices FOR SELECT
  USING (can_see_financials());

CREATE POLICY "invoices: insert finanzas or admin"
  ON client_invoices FOR INSERT
  WITH CHECK (can_see_financials());

CREATE POLICY "invoices: update finanzas or admin"
  ON client_invoices FOR UPDATE
  USING (can_see_financials())
  WITH CHECK (can_see_financials());

CREATE POLICY "invoices: delete admin only"
  ON client_invoices FOR DELETE
  USING (has_team_role('admin'));


-- ---- reports ----
CREATE POLICY "reports: select team"
  ON reports FOR SELECT
  USING (is_team_member());

CREATE POLICY "reports: insert ops or admin"
  ON reports FOR INSERT
  WITH CHECK (has_team_role('operaciones'));

CREATE POLICY "reports: update ops or admin"
  ON reports FOR UPDATE
  USING (is_team_member())
  WITH CHECK (is_team_member());

CREATE POLICY "reports: delete admin only"
  ON reports FOR DELETE
  USING (has_team_role('admin'));


-- ---- mrr_snapshots ----
CREATE POLICY "mrr: select finanzas or admin"
  ON mrr_snapshots FOR SELECT
  USING (can_see_financials());

CREATE POLICY "mrr: insert admin only"
  ON mrr_snapshots FOR INSERT
  WITH CHECK (has_team_role('admin'));

CREATE POLICY "mrr: update admin only"
  ON mrr_snapshots FOR UPDATE
  USING (has_team_role('admin'))
  WITH CHECK (has_team_role('admin'));

CREATE POLICY "mrr: delete admin only"
  ON mrr_snapshots FOR DELETE
  USING (has_team_role('admin'));


-- =============================================================================
-- 23. DATOS SEMILLA: equipo inicial
-- IMPORTANTE: reemplazar user_id con los UUID reales de auth.users
-- =============================================================================

INSERT INTO team_members (full_name, display_name, email, role, can_see_financials, can_edit_creators, can_approve_payments)
VALUES
  ('Alexander Cast',  'Alexander',  'founder@kreoon.com',          'admin',       true,  true,  true),
  ('Diana Mile',      'Diana',      'tdianamile@gmail.com',        'operaciones', false, true,  false),
  ('Brian',           'Brian',      'brian@ugccolombia.co',        'creativo',    false, false, false),
  ('Samuel',          'Samuel',     'samuel@ugccolombia.co',       'operaciones', false, true,  false),
  ('Tanya',           'Tanya',      'tanya@ugccolombia.co',        'ventas',      false, false, false)
ON CONFLICT (email) DO NOTHING;


-- =============================================================================
-- 24. QUERIES DE VERIFICACIÓN
-- Ejecutar después de aplicar el schema para validar
-- =============================================================================

-- Verificar tablas creadas
-- SELECT table_name FROM information_schema.tables
-- WHERE table_schema = 'public' ORDER BY table_name;

-- Verificar enums
-- SELECT typname FROM pg_type WHERE typtype = 'e' ORDER BY typname;

-- Verificar RLS habilitado en todas las tablas
-- SELECT tablename, rowsecurity FROM pg_tables
-- WHERE schemaname = 'public' ORDER BY tablename;

-- Verificar triggers
-- SELECT trigger_name, event_object_table, event_manipulation
-- FROM information_schema.triggers
-- WHERE trigger_schema = 'public' ORDER BY event_object_table;

-- Test: insertar un lead
-- INSERT INTO leads (full_name, whatsapp, source, stage)
-- VALUES ('Test Brand', '+573001234567', 'sitio_web', 'nuevo');
