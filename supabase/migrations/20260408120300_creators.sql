-- Migration: Creators — creators, creator_scoring_history, creator_payments
-- Date: 2026-04-08
-- Author: Alexander Cast
-- Project: UGC Colombia

-- ============================================================
-- Table: creators
-- Creadores de contenido UGC del roster de la agencia
-- ============================================================
CREATE TABLE IF NOT EXISTS creators (
  id                  UUID          DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name           TEXT          NOT NULL,
  email               TEXT          UNIQUE,
  phone               TEXT,
  instagram           TEXT,
  tiktok              TEXT,
  city                TEXT,
  country             TEXT          NOT NULL DEFAULT 'CO',
  status              TEXT          NOT NULL DEFAULT 'prospect'
                                    CHECK (status IN ('prospect', 'active', 'paused', 'blacklisted')),
  tier                TEXT          NOT NULL DEFAULT 'bronze'
                                    CHECK (tier IN ('bronze', 'silver', 'gold', 'platinum')),

  -- Datos de contenido
  content_types       TEXT[],       -- ['video', 'photo', 'reel', 'story', 'carousel']
  niches              TEXT[],       -- ['moda', 'belleza', 'tecnologia', 'food', 'lifestyle', ...]
  languages           TEXT[]        NOT NULL DEFAULT ARRAY['es'],
  portfolio_url       TEXT,
  sample_video_url    TEXT,

  -- Métricas de audiencia
  ig_followers        INTEGER       DEFAULT 0,
  tiktok_followers    INTEGER       DEFAULT 0,
  avg_views           INTEGER       DEFAULT 0,
  avg_engagement_pct  NUMERIC(5,2)  DEFAULT 0.00,

  -- Datos de pago
  payment_method      TEXT          CHECK (payment_method IN ('nequi', 'bancolombia', 'daviplata', 'paypal', 'crypto', 'otro')),
  payment_details     TEXT,         -- número de cuenta / wallet — encriptado en app
  id_document         TEXT,         -- cédula o NIT

  -- Scoring interno (calculado, desnormalizado para performance)
  score               NUMERIC(4,1)  DEFAULT 0.0 CHECK (score >= 0 AND score <= 10),

  -- Control
  assigned_to         UUID          REFERENCES team_members(id) ON DELETE SET NULL,
  blacklist_reason    TEXT,
  notes               TEXT,
  deleted_at          TIMESTAMPTZ,
  created_at          TIMESTAMPTZ   NOT NULL DEFAULT now(),
  updated_at          TIMESTAMPTZ   NOT NULL DEFAULT now()
);

COMMENT ON TABLE creators IS 'Roster de creadores UGC activos y potenciales';
COMMENT ON COLUMN creators.score IS 'Score de 0 a 10 calculado por scoring_history';
COMMENT ON COLUMN creators.content_types IS 'Array de tipos de contenido que produce el creator';
COMMENT ON COLUMN creators.niches IS 'Array de nichos/verticales del creator';

-- ============================================================
-- Table: creator_scoring_history
-- Historial de evaluaciones de calidad por entregable
-- ============================================================
CREATE TABLE IF NOT EXISTS creator_scoring_history (
  id              UUID          DEFAULT gen_random_uuid() PRIMARY KEY,
  creator_id      UUID          NOT NULL REFERENCES creators(id) ON DELETE CASCADE,
  deliverable_id  UUID,         -- FK a deliverables se agrega en migración 20260408120400
  evaluated_by    UUID          REFERENCES team_members(id) ON DELETE SET NULL,

  -- Dimensiones de scoring (1-10 cada una)
  quality_score       NUMERIC(3,1) NOT NULL CHECK (quality_score BETWEEN 1 AND 10),
  punctuality_score   NUMERIC(3,1) NOT NULL CHECK (punctuality_score BETWEEN 1 AND 10),
  communication_score NUMERIC(3,1) NOT NULL CHECK (communication_score BETWEEN 1 AND 10),
  creativity_score    NUMERIC(3,1) NOT NULL CHECK (creativity_score BETWEEN 1 AND 10),

  -- Score ponderado calculado
  weighted_score  NUMERIC(4,2)  GENERATED ALWAYS AS (
    (quality_score * 0.40) +
    (punctuality_score * 0.25) +
    (communication_score * 0.20) +
    (creativity_score * 0.15)
  ) STORED,

  notes           TEXT,
  created_at      TIMESTAMPTZ   NOT NULL DEFAULT now()
);

COMMENT ON TABLE creator_scoring_history IS 'Historial de evaluaciones por entregable';
COMMENT ON COLUMN creator_scoring_history.weighted_score IS 'Calculado: calidad×40% + puntualidad×25% + comunicación×20% + creatividad×15%';

-- ============================================================
-- Table: creator_payments
-- Pagos realizados a creadores por trabajos completados
-- ============================================================
CREATE TABLE IF NOT EXISTS creator_payments (
  id              UUID          DEFAULT gen_random_uuid() PRIMARY KEY,
  creator_id      UUID          NOT NULL REFERENCES creators(id) ON DELETE RESTRICT,
  deliverable_id  UUID,         -- FK a deliverables se agrega en migración 20260408120400
  processed_by    UUID          REFERENCES team_members(id) ON DELETE SET NULL,

  amount          NUMERIC(12,2) NOT NULL CHECK (amount > 0),
  currency        TEXT          NOT NULL DEFAULT 'COP' CHECK (currency IN ('COP', 'USD', 'EUR')),
  payment_method  TEXT          NOT NULL CHECK (payment_method IN ('nequi', 'bancolombia', 'daviplata', 'paypal', 'crypto', 'otro')),
  status          TEXT          NOT NULL DEFAULT 'pending'
                                CHECK (status IN ('pending', 'paid', 'partial', 'cancelled')),

  reference       TEXT,         -- número de comprobante / txid
  notes           TEXT,
  paid_at         TIMESTAMPTZ,
  created_at      TIMESTAMPTZ   NOT NULL DEFAULT now(),
  updated_at      TIMESTAMPTZ   NOT NULL DEFAULT now()
);

COMMENT ON TABLE creator_payments IS 'Pagos realizados a creadores UGC';
COMMENT ON COLUMN creator_payments.reference IS 'Número de comprobante de transferencia o ID de transacción';

-- ============================================================
-- Indexes: creators
-- ============================================================
CREATE INDEX IF NOT EXISTS idx_creators_status      ON creators(status);
CREATE INDEX IF NOT EXISTS idx_creators_tier        ON creators(tier);
CREATE INDEX IF NOT EXISTS idx_creators_score       ON creators(score DESC);
CREATE INDEX IF NOT EXISTS idx_creators_assigned_to ON creators(assigned_to);
CREATE INDEX IF NOT EXISTS idx_creators_deleted_at  ON creators(deleted_at);
CREATE INDEX IF NOT EXISTS idx_creators_niches      ON creators USING GIN(niches);
CREATE INDEX IF NOT EXISTS idx_creators_content_types ON creators USING GIN(content_types);

-- ============================================================
-- Indexes: creator_scoring_history
-- ============================================================
CREATE INDEX IF NOT EXISTS idx_scoring_creator_id     ON creator_scoring_history(creator_id);
CREATE INDEX IF NOT EXISTS idx_scoring_deliverable_id ON creator_scoring_history(deliverable_id);
CREATE INDEX IF NOT EXISTS idx_scoring_created_at     ON creator_scoring_history(created_at DESC);

-- ============================================================
-- Indexes: creator_payments
-- ============================================================
CREATE INDEX IF NOT EXISTS idx_payments_creator_id     ON creator_payments(creator_id);
CREATE INDEX IF NOT EXISTS idx_payments_status         ON creator_payments(status);
CREATE INDEX IF NOT EXISTS idx_payments_deliverable_id ON creator_payments(deliverable_id);
CREATE INDEX IF NOT EXISTS idx_payments_paid_at        ON creator_payments(paid_at DESC);

-- ============================================================
-- RLS: creators
-- ============================================================
ALTER TABLE creators ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated team can view creators"
  ON creators FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated team can insert creators"
  ON creators FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated team can update creators"
  ON creators FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Founders can delete creators"
  ON creators FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM team_members tm
      WHERE tm.user_id = auth.uid()
        AND tm.role = 'founder'
    )
  );

CREATE POLICY "Service role full access on creators"
  ON creators FOR ALL
  USING (auth.role() = 'service_role');

-- ============================================================
-- RLS: creator_scoring_history
-- ============================================================
ALTER TABLE creator_scoring_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated team can view scoring"
  ON creator_scoring_history FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated team can insert scoring"
  ON creator_scoring_history FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- El historial de scoring es inmutable — no se permite UPDATE
-- Para corregir un score, insertar un nuevo registro

CREATE POLICY "Service role full access on scoring"
  ON creator_scoring_history FOR ALL
  USING (auth.role() = 'service_role');

-- ============================================================
-- RLS: creator_payments
-- ============================================================
ALTER TABLE creator_payments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated team can view payments"
  ON creator_payments FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Managers can insert payments"
  ON creator_payments FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM team_members tm
      WHERE tm.user_id = auth.uid()
        AND tm.role IN ('founder', 'manager')
    )
  );

CREATE POLICY "Managers can update payments"
  ON creator_payments FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM team_members tm
      WHERE tm.user_id = auth.uid()
        AND tm.role IN ('founder', 'manager')
    )
  );

CREATE POLICY "Service role full access on payments"
  ON creator_payments FOR ALL
  USING (auth.role() = 'service_role');
