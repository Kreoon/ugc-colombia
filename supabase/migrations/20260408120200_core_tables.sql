-- Migration: Core tables — leads, clients, team_members
-- Date: 2026-04-08
-- Author: Alexander Cast
-- Project: UGC Colombia

-- ============================================================
-- Table: team_members
-- Equipo interno de la agencia (no son auth.users directamente,
-- pero pueden tener un user_id vinculado si inician sesión)
-- ============================================================
CREATE TABLE IF NOT EXISTS team_members (
  id             UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id        UUID        REFERENCES auth.users(id) ON DELETE SET NULL,
  full_name      TEXT        NOT NULL,
  email          TEXT        NOT NULL UNIQUE,
  role           TEXT        NOT NULL DEFAULT 'coordinator'
                             CHECK (role IN ('founder', 'manager', 'coordinator', 'sales', 'creative')),
  phone          TEXT,
  avatar_url     TEXT,
  is_active      BOOLEAN     NOT NULL DEFAULT true,
  notes          TEXT,
  created_at     TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at     TIMESTAMPTZ NOT NULL DEFAULT now()
);

COMMENT ON TABLE team_members IS 'Equipo interno de UGC Colombia';
COMMENT ON COLUMN team_members.user_id IS 'Vinculado a auth.users cuando el miembro inicia sesión en el dashboard';

-- ============================================================
-- Table: leads
-- Prospectos entrantes (formulario, DM, referido, etc.)
-- ============================================================
CREATE TABLE IF NOT EXISTS leads (
  id              UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name       TEXT        NOT NULL,
  email           TEXT,
  phone           TEXT,
  company         TEXT,
  instagram       TEXT,
  source          TEXT,     -- 'instagram_dm' | 'referral' | 'web_form' | 'cold_outreach' | 'event'
  status          TEXT        NOT NULL DEFAULT 'new'
                              CHECK (status IN ('new', 'contacted', 'qualified', 'converted', 'lost')),
  assigned_to     UUID        REFERENCES team_members(id) ON DELETE SET NULL,
  budget_range    TEXT,       -- '500-1000' | '1000-3000' | '3000+' | 'unknown'
  industry        TEXT,
  notes           TEXT,
  lost_reason     TEXT,
  converted_at    TIMESTAMPTZ,
  deleted_at      TIMESTAMPTZ,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

COMMENT ON TABLE leads IS 'Prospectos entrantes antes de convertirse en clientes';
COMMENT ON COLUMN leads.source IS 'Canal de origen del lead';
COMMENT ON COLUMN leads.deleted_at IS 'Soft delete — no eliminar registros de leads';

-- ============================================================
-- Table: clients
-- Clientes activos de la agencia
-- ============================================================
CREATE TABLE IF NOT EXISTS clients (
  id                UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  lead_id           UUID        REFERENCES leads(id) ON DELETE SET NULL,
  company_name      TEXT        NOT NULL,
  contact_name      TEXT        NOT NULL,
  email             TEXT        NOT NULL,
  phone             TEXT,
  instagram         TEXT,
  website           TEXT,
  industry          TEXT,
  status            TEXT        NOT NULL DEFAULT 'active'
                                CHECK (status IN ('active', 'paused', 'churned')),
  assigned_to       UUID        REFERENCES team_members(id) ON DELETE SET NULL,
  monthly_value     NUMERIC(12, 2) DEFAULT 0.00,  -- COP
  contract_start    DATE,
  contract_end      DATE,
  notes             TEXT,
  deleted_at        TIMESTAMPTZ,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at        TIMESTAMPTZ NOT NULL DEFAULT now()
);

COMMENT ON TABLE clients IS 'Clientes activos o históricos de la agencia';
COMMENT ON COLUMN clients.monthly_value IS 'Valor mensual del contrato en COP';

-- ============================================================
-- Indexes: team_members
-- ============================================================
CREATE INDEX IF NOT EXISTS idx_team_members_user_id   ON team_members(user_id);
CREATE INDEX IF NOT EXISTS idx_team_members_role      ON team_members(role);
CREATE INDEX IF NOT EXISTS idx_team_members_is_active ON team_members(is_active);

-- ============================================================
-- Indexes: leads
-- ============================================================
CREATE INDEX IF NOT EXISTS idx_leads_status      ON leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_assigned_to ON leads(assigned_to);
CREATE INDEX IF NOT EXISTS idx_leads_source      ON leads(source);
CREATE INDEX IF NOT EXISTS idx_leads_deleted_at  ON leads(deleted_at);
CREATE INDEX IF NOT EXISTS idx_leads_created_at  ON leads(created_at DESC);

-- ============================================================
-- Indexes: clients
-- ============================================================
CREATE INDEX IF NOT EXISTS idx_clients_status      ON clients(status);
CREATE INDEX IF NOT EXISTS idx_clients_assigned_to ON clients(assigned_to);
CREATE INDEX IF NOT EXISTS idx_clients_lead_id     ON clients(lead_id);
CREATE INDEX IF NOT EXISTS idx_clients_deleted_at  ON clients(deleted_at);

-- ============================================================
-- RLS: team_members
-- ============================================================
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;

-- Cualquier usuario autenticado puede ver el equipo (para asignaciones)
CREATE POLICY "Authenticated users can view team members"
  ON team_members FOR SELECT
  TO authenticated
  USING (true);

-- Solo founder/manager pueden insertar
CREATE POLICY "Managers can insert team members"
  ON team_members FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM team_members tm
      WHERE tm.user_id = auth.uid()
        AND tm.role IN ('founder', 'manager')
        AND tm.is_active = true
    )
  );

-- Solo founder/manager pueden actualizar
CREATE POLICY "Managers can update team members"
  ON team_members FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM team_members tm
      WHERE tm.user_id = auth.uid()
        AND tm.role IN ('founder', 'manager')
        AND tm.is_active = true
    )
  );

-- Service role acceso total
CREATE POLICY "Service role full access on team_members"
  ON team_members FOR ALL
  USING (auth.role() = 'service_role');

-- ============================================================
-- RLS: leads
-- ============================================================
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Equipo autenticado puede ver leads (excepto soft deleted — filtrar en app)
CREATE POLICY "Authenticated team can view leads"
  ON leads FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated team can insert leads"
  ON leads FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated team can update leads"
  ON leads FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Solo founders pueden hacer hard delete (soft delete preferido)
CREATE POLICY "Founders can delete leads"
  ON leads FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM team_members tm
      WHERE tm.user_id = auth.uid()
        AND tm.role = 'founder'
    )
  );

CREATE POLICY "Service role full access on leads"
  ON leads FOR ALL
  USING (auth.role() = 'service_role');

-- ============================================================
-- RLS: clients
-- ============================================================
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated team can view clients"
  ON clients FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated team can insert clients"
  ON clients FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated team can update clients"
  ON clients FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Founders can delete clients"
  ON clients FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM team_members tm
      WHERE tm.user_id = auth.uid()
        AND tm.role = 'founder'
    )
  );

CREATE POLICY "Service role full access on clients"
  ON clients FOR ALL
  USING (auth.role() = 'service_role');
