-- Migration: Billing — client_invoices, reports
-- Date: 2026-04-08
-- Author: Alexander Cast
-- Project: UGC Colombia

-- ============================================================
-- Table: client_invoices
-- Facturas / cobros emitidos a clientes
-- ============================================================
CREATE TABLE IF NOT EXISTS client_invoices (
  id              UUID          DEFAULT gen_random_uuid() PRIMARY KEY,
  client_id       UUID          NOT NULL REFERENCES clients(id) ON DELETE RESTRICT,
  project_id      UUID          REFERENCES projects(id) ON DELETE SET NULL,
  created_by      UUID          REFERENCES team_members(id) ON DELETE SET NULL,

  invoice_number  TEXT          NOT NULL UNIQUE,  -- 'UGC-2026-001'
  status          TEXT          NOT NULL DEFAULT 'draft'
                                CHECK (status IN ('draft', 'sent', 'paid', 'overdue', 'cancelled')),

  -- Montos
  subtotal_cop    NUMERIC(12,2) NOT NULL DEFAULT 0.00,
  tax_pct         NUMERIC(5,2)  NOT NULL DEFAULT 0.00,  -- IVA 19% u otro
  tax_amount_cop  NUMERIC(12,2) GENERATED ALWAYS AS (
    ROUND(subtotal_cop * tax_pct / 100, 2)
  ) STORED,
  total_cop       NUMERIC(12,2) GENERATED ALWAYS AS (
    subtotal_cop + ROUND(subtotal_cop * tax_pct / 100, 2)
  ) STORED,

  -- Concepto
  line_items      JSONB         NOT NULL DEFAULT '[]'::jsonb,
  -- Estructura sugerida: [{"description": "...", "qty": 1, "unit_price": 0, "amount": 0}]

  -- Fechas
  issued_at       DATE          NOT NULL DEFAULT CURRENT_DATE,
  due_date        DATE,
  paid_at         TIMESTAMPTZ,

  payment_method  TEXT,         -- 'transferencia' | 'efectivo' | 'daviplata' | 'paypal'
  payment_reference TEXT,       -- comprobante

  notes           TEXT,
  deleted_at      TIMESTAMPTZ,
  created_at      TIMESTAMPTZ   NOT NULL DEFAULT now(),
  updated_at      TIMESTAMPTZ   NOT NULL DEFAULT now()
);

COMMENT ON TABLE client_invoices IS 'Facturas emitidas a clientes por proyectos UGC';
COMMENT ON COLUMN client_invoices.line_items IS 'Array JSONB de items: [{description, qty, unit_price, amount}]';
COMMENT ON COLUMN client_invoices.invoice_number IS 'Formato recomendado: UGC-YYYY-NNN';

-- ============================================================
-- Table: reports
-- Reportes de resultados entregados a clientes
-- (métricas de performance del contenido UGC)
-- ============================================================
CREATE TABLE IF NOT EXISTS reports (
  id              UUID          DEFAULT gen_random_uuid() PRIMARY KEY,
  client_id       UUID          NOT NULL REFERENCES clients(id) ON DELETE RESTRICT,
  project_id      UUID          REFERENCES projects(id) ON DELETE SET NULL,
  created_by      UUID          REFERENCES team_members(id) ON DELETE SET NULL,

  title           TEXT          NOT NULL,
  period_start    DATE          NOT NULL,
  period_end      DATE          NOT NULL,

  -- Métricas agregadas del período
  total_pieces    INTEGER       DEFAULT 0,    -- piezas entregadas
  total_views     INTEGER       DEFAULT 0,    -- vistas totales reportadas
  total_clicks    INTEGER       DEFAULT 0,
  total_saves     INTEGER       DEFAULT 0,
  total_shares    INTEGER       DEFAULT 0,
  total_comments  INTEGER       DEFAULT 0,
  avg_engagement  NUMERIC(5,2)  DEFAULT 0.00, -- % engagement promedio
  best_roas       NUMERIC(8,2),               -- mejor ROAS reportado (si aplica)

  -- Contenido del reporte
  summary         TEXT,
  highlights      TEXT[],       -- logros destacados
  recommendations TEXT[],       -- recomendaciones para siguiente período

  -- Archivos (URLs a PDF generado, drive, etc.)
  report_url      TEXT,
  attachments     TEXT[],

  sent_at         TIMESTAMPTZ,
  created_at      TIMESTAMPTZ   NOT NULL DEFAULT now(),
  updated_at      TIMESTAMPTZ   NOT NULL DEFAULT now()
);

COMMENT ON TABLE reports IS 'Reportes de resultados de contenido UGC enviados a clientes';
COMMENT ON COLUMN reports.best_roas IS 'Return on Ad Spend - solo aplica si el cliente está usando el UGC en ads';

-- ============================================================
-- Indexes: client_invoices
-- ============================================================
CREATE INDEX IF NOT EXISTS idx_invoices_client_id     ON client_invoices(client_id);
CREATE INDEX IF NOT EXISTS idx_invoices_project_id    ON client_invoices(project_id);
CREATE INDEX IF NOT EXISTS idx_invoices_status        ON client_invoices(status);
CREATE INDEX IF NOT EXISTS idx_invoices_due_date      ON client_invoices(due_date);
CREATE INDEX IF NOT EXISTS idx_invoices_issued_at     ON client_invoices(issued_at DESC);
CREATE INDEX IF NOT EXISTS idx_invoices_deleted_at    ON client_invoices(deleted_at);

-- ============================================================
-- Indexes: reports
-- ============================================================
CREATE INDEX IF NOT EXISTS idx_reports_client_id   ON reports(client_id);
CREATE INDEX IF NOT EXISTS idx_reports_project_id  ON reports(project_id);
CREATE INDEX IF NOT EXISTS idx_reports_period      ON reports(period_start, period_end);

-- ============================================================
-- RLS: client_invoices
-- ============================================================
ALTER TABLE client_invoices ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated team can view invoices"
  ON client_invoices FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Managers can insert invoices"
  ON client_invoices FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM team_members tm
      WHERE tm.user_id = auth.uid()
        AND tm.role IN ('founder', 'manager')
    )
  );

CREATE POLICY "Managers can update invoices"
  ON client_invoices FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM team_members tm
      WHERE tm.user_id = auth.uid()
        AND tm.role IN ('founder', 'manager')
    )
  );

CREATE POLICY "Founders can delete invoices"
  ON client_invoices FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM team_members tm
      WHERE tm.user_id = auth.uid()
        AND tm.role = 'founder'
    )
  );

CREATE POLICY "Service role full access on invoices"
  ON client_invoices FOR ALL
  USING (auth.role() = 'service_role');

-- ============================================================
-- RLS: reports
-- ============================================================
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated team can view reports"
  ON reports FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated team can insert reports"
  ON reports FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated team can update reports"
  ON reports FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Service role full access on reports"
  ON reports FOR ALL
  USING (auth.role() = 'service_role');
