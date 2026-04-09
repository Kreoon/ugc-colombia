-- Migration: Projects — projects, briefs, deliverables
-- Date: 2026-04-08
-- Author: Alexander Cast
-- Project: UGC Colombia

-- ============================================================
-- Table: projects
-- Proyectos UGC contratados por un cliente
-- ============================================================
CREATE TABLE IF NOT EXISTS projects (
  id              UUID          DEFAULT gen_random_uuid() PRIMARY KEY,
  client_id       UUID          NOT NULL REFERENCES clients(id) ON DELETE RESTRICT,
  managed_by      UUID          REFERENCES team_members(id) ON DELETE SET NULL,
  name            TEXT          NOT NULL,
  description     TEXT,
  status          TEXT          NOT NULL DEFAULT 'draft'
                                CHECK (status IN ('draft', 'active', 'in_review', 'approved', 'delivered', 'cancelled')),

  -- Alcance del proyecto
  deliverables_count INTEGER     NOT NULL DEFAULT 1 CHECK (deliverables_count > 0),
  content_types   TEXT[],       -- tipos de contenido solicitados
  niches          TEXT[],       -- nichos/categorías requeridas

  -- Fechas
  start_date      DATE,
  deadline        DATE,
  delivered_at    TIMESTAMPTZ,

  -- Financiero (proyecto completo)
  budget_cop      NUMERIC(12,2) DEFAULT 0.00,   -- lo que paga el cliente
  cost_cop        NUMERIC(12,2) DEFAULT 0.00,   -- costo de creators (calculado)
  margin_cop      NUMERIC(12,2) GENERATED ALWAYS AS (budget_cop - cost_cop) STORED,

  notes           TEXT,
  deleted_at      TIMESTAMPTZ,
  created_at      TIMESTAMPTZ   NOT NULL DEFAULT now(),
  updated_at      TIMESTAMPTZ   NOT NULL DEFAULT now()
);

COMMENT ON TABLE projects IS 'Proyectos UGC contratados por clientes';
COMMENT ON COLUMN projects.margin_cop IS 'Margen bruto: budget - costo creators (calculado automáticamente)';

-- ============================================================
-- Table: briefs
-- Brief creativo asociado a un proyecto
-- ============================================================
CREATE TABLE IF NOT EXISTS briefs (
  id                  UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id          UUID        NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  created_by          UUID        REFERENCES team_members(id) ON DELETE SET NULL,

  title               TEXT        NOT NULL,
  objective           TEXT,       -- qué debe lograr el contenido
  target_audience     TEXT,
  key_messages        TEXT[],     -- mensajes clave
  tone                TEXT,       -- 'informal' | 'profesional' | 'aspiracional' | 'divertido'
  dos                 TEXT[],     -- qué DEBE incluir
  donts               TEXT[],     -- qué NO debe incluir
  reference_urls      TEXT[],     -- ejemplos de referencia
  hashtags            TEXT[],
  music_style         TEXT,
  video_duration_sec  INTEGER,    -- duración objetivo en segundos
  format              TEXT        CHECK (format IN ('vertical_9x16', 'square_1x1', 'horizontal_16x9')),

  -- Archivos adjuntos (URLs a Supabase Storage o CDN)
  assets_urls         TEXT[],

  approved            BOOLEAN     NOT NULL DEFAULT false,
  approved_by         UUID        REFERENCES team_members(id) ON DELETE SET NULL,
  approved_at         TIMESTAMPTZ,

  notes               TEXT,
  created_at          TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at          TIMESTAMPTZ NOT NULL DEFAULT now()
);

COMMENT ON TABLE briefs IS 'Brief creativo de cada proyecto UGC';
COMMENT ON COLUMN briefs.dos IS 'Lista de elementos obligatorios en el contenido';
COMMENT ON COLUMN briefs.donts IS 'Lista de elementos prohibidos en el contenido';

-- ============================================================
-- Table: deliverables
-- Entregables individuales de un proyecto, asignados a un creator
-- ============================================================
CREATE TABLE IF NOT EXISTS deliverables (
  id              UUID          DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id      UUID          NOT NULL REFERENCES projects(id) ON DELETE RESTRICT,
  brief_id        UUID          REFERENCES briefs(id) ON DELETE SET NULL,
  creator_id      UUID          REFERENCES creators(id) ON DELETE SET NULL,
  assigned_by     UUID          REFERENCES team_members(id) ON DELETE SET NULL,
  reviewed_by     UUID          REFERENCES team_members(id) ON DELETE SET NULL,

  title           TEXT          NOT NULL,
  type            TEXT          NOT NULL DEFAULT 'video'
                                CHECK (type IN ('video', 'photo', 'reel', 'story', 'carousel')),
  status          TEXT          NOT NULL DEFAULT 'pending'
                                CHECK (status IN ('pending', 'in_production', 'submitted', 'revision', 'approved', 'rejected')),

  -- Revisiones
  revision_count  INTEGER       NOT NULL DEFAULT 0,
  max_revisions   INTEGER       NOT NULL DEFAULT 2,

  -- Archivos entregados (URLs)
  submitted_urls  TEXT[],
  final_url       TEXT,         -- URL final aprobada (Bunny CDN / Storage)

  -- Fechas
  due_date        DATE,
  submitted_at    TIMESTAMPTZ,
  approved_at     TIMESTAMPTZ,

  -- Pago al creator por este entregable
  creator_fee_cop NUMERIC(10,2) DEFAULT 0.00,

  revision_notes  TEXT,
  rejection_reason TEXT,
  notes           TEXT,
  created_at      TIMESTAMPTZ   NOT NULL DEFAULT now(),
  updated_at      TIMESTAMPTZ   NOT NULL DEFAULT now()
);

COMMENT ON TABLE deliverables IS 'Entregables individuales asignados a un creator';
COMMENT ON COLUMN deliverables.revision_count IS 'Número de revisiones ya usadas';
COMMENT ON COLUMN deliverables.final_url IS 'URL del contenido final aprobado en CDN';

-- ============================================================
-- FK diferida: creator_scoring_history → deliverables
-- creator_payments → deliverables
-- (las tablas se crearon en migración anterior sin la FK)
-- ============================================================
ALTER TABLE creator_scoring_history
  ADD CONSTRAINT fk_scoring_deliverable
  FOREIGN KEY (deliverable_id)
  REFERENCES deliverables(id)
  ON DELETE SET NULL;

ALTER TABLE creator_payments
  ADD CONSTRAINT fk_payment_deliverable
  FOREIGN KEY (deliverable_id)
  REFERENCES deliverables(id)
  ON DELETE SET NULL;

-- ============================================================
-- Indexes: projects
-- ============================================================
CREATE INDEX IF NOT EXISTS idx_projects_client_id  ON projects(client_id);
CREATE INDEX IF NOT EXISTS idx_projects_status     ON projects(status);
CREATE INDEX IF NOT EXISTS idx_projects_managed_by ON projects(managed_by);
CREATE INDEX IF NOT EXISTS idx_projects_deadline   ON projects(deadline);
CREATE INDEX IF NOT EXISTS idx_projects_deleted_at ON projects(deleted_at);

-- ============================================================
-- Indexes: briefs
-- ============================================================
CREATE INDEX IF NOT EXISTS idx_briefs_project_id ON briefs(project_id);
CREATE INDEX IF NOT EXISTS idx_briefs_approved   ON briefs(approved);

-- ============================================================
-- Indexes: deliverables
-- ============================================================
CREATE INDEX IF NOT EXISTS idx_deliverables_project_id  ON deliverables(project_id);
CREATE INDEX IF NOT EXISTS idx_deliverables_creator_id  ON deliverables(creator_id);
CREATE INDEX IF NOT EXISTS idx_deliverables_status      ON deliverables(status);
CREATE INDEX IF NOT EXISTS idx_deliverables_due_date    ON deliverables(due_date);
CREATE INDEX IF NOT EXISTS idx_deliverables_type        ON deliverables(type);

-- ============================================================
-- RLS: projects
-- ============================================================
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated team can view projects"
  ON projects FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated team can insert projects"
  ON projects FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated team can update projects"
  ON projects FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Founders can delete projects"
  ON projects FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM team_members tm
      WHERE tm.user_id = auth.uid()
        AND tm.role = 'founder'
    )
  );

CREATE POLICY "Service role full access on projects"
  ON projects FOR ALL
  USING (auth.role() = 'service_role');

-- ============================================================
-- RLS: briefs
-- ============================================================
ALTER TABLE briefs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated team can view briefs"
  ON briefs FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated team can insert briefs"
  ON briefs FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated team can update briefs"
  ON briefs FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Service role full access on briefs"
  ON briefs FOR ALL
  USING (auth.role() = 'service_role');

-- ============================================================
-- RLS: deliverables
-- ============================================================
ALTER TABLE deliverables ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated team can view deliverables"
  ON deliverables FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated team can insert deliverables"
  ON deliverables FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated team can update deliverables"
  ON deliverables FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Service role full access on deliverables"
  ON deliverables FOR ALL
  USING (auth.role() = 'service_role');
