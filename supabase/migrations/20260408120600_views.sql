-- Migration: Views derivadas
-- Date: 2026-04-08
-- Author: Alexander Cast
-- Project: UGC Colombia

-- ============================================================
-- View: v_creator_stats
-- Estadísticas consolidadas por creator (score promedio, pagos, entregables)
-- ============================================================
CREATE OR REPLACE VIEW v_creator_stats AS
SELECT
  c.id,
  c.full_name,
  c.email,
  c.status,
  c.tier,
  c.score                                       AS current_score,
  c.ig_followers,
  c.tiktok_followers,
  c.avg_engagement_pct,

  -- Conteo de entregables por estado
  COUNT(d.id)                                   AS total_deliverables,
  COUNT(d.id) FILTER (WHERE d.status = 'approved')   AS approved_deliverables,
  COUNT(d.id) FILTER (WHERE d.status = 'rejected')   AS rejected_deliverables,
  COUNT(d.id) FILTER (WHERE d.status = 'pending')    AS pending_deliverables,

  -- Score promedio real del historial
  ROUND(AVG(sh.weighted_score), 2)              AS avg_score_history,
  COUNT(sh.id)                                  AS evaluations_count,

  -- Pagos
  COALESCE(SUM(cp.amount) FILTER (WHERE cp.status = 'paid'), 0)    AS total_paid_cop,
  COALESCE(SUM(cp.amount) FILTER (WHERE cp.status = 'pending'), 0) AS total_pending_cop,
  COUNT(cp.id) FILTER (WHERE cp.status = 'paid')                   AS payments_count,

  c.created_at,
  c.updated_at
FROM creators c
LEFT JOIN deliverables d            ON d.creator_id = c.id
LEFT JOIN creator_scoring_history sh ON sh.creator_id = c.id
LEFT JOIN creator_payments cp        ON cp.creator_id = c.id
WHERE c.deleted_at IS NULL
GROUP BY
  c.id, c.full_name, c.email, c.status, c.tier, c.score,
  c.ig_followers, c.tiktok_followers, c.avg_engagement_pct,
  c.created_at, c.updated_at;

COMMENT ON VIEW v_creator_stats IS 'Vista consolidada de métricas por creator — score, entregables y pagos';

-- ============================================================
-- View: v_project_summary
-- Resumen financiero y de progreso por proyecto
-- ============================================================
CREATE OR REPLACE VIEW v_project_summary AS
SELECT
  p.id,
  p.name,
  p.status,
  p.deadline,
  p.delivered_at,
  p.budget_cop,
  p.cost_cop,
  p.margin_cop,

  -- Cliente
  cl.company_name                               AS client_name,
  cl.status                                     AS client_status,

  -- Manager
  tm.full_name                                  AS manager_name,

  -- Progreso de entregables
  p.deliverables_count                          AS expected_deliverables,
  COUNT(d.id)                                   AS actual_deliverables,
  COUNT(d.id) FILTER (WHERE d.status = 'approved')  AS approved_count,
  COUNT(d.id) FILTER (WHERE d.status = 'pending')   AS pending_count,
  COUNT(d.id) FILTER (WHERE d.status = 'in_production') AS in_production_count,
  COUNT(d.id) FILTER (WHERE d.status = 'revision')      AS revision_count,

  -- Porcentaje de completado
  CASE
    WHEN p.deliverables_count > 0
    THEN ROUND(
      COUNT(d.id) FILTER (WHERE d.status = 'approved')::NUMERIC
      / p.deliverables_count * 100, 1
    )
    ELSE 0
  END                                           AS completion_pct,

  -- Días hasta deadline
  CASE
    WHEN p.deadline IS NOT NULL
    THEN p.deadline - CURRENT_DATE
    ELSE NULL
  END                                           AS days_to_deadline,

  p.created_at,
  p.updated_at
FROM projects p
LEFT JOIN clients cl        ON cl.id = p.client_id
LEFT JOIN team_members tm   ON tm.id = p.managed_by
LEFT JOIN deliverables d    ON d.project_id = p.id
WHERE p.deleted_at IS NULL
GROUP BY
  p.id, p.name, p.status, p.deadline, p.delivered_at,
  p.budget_cop, p.cost_cop, p.margin_cop, p.deliverables_count,
  cl.company_name, cl.status, tm.full_name,
  p.created_at, p.updated_at;

COMMENT ON VIEW v_project_summary IS 'Vista de progreso y financiero por proyecto';

-- ============================================================
-- View: v_pipeline_leads
-- Funnel de leads por estado con tiempos de conversión
-- ============================================================
CREATE OR REPLACE VIEW v_pipeline_leads AS
SELECT
  l.id,
  l.full_name,
  l.company,
  l.source,
  l.status,
  l.budget_range,
  l.industry,

  -- Asignado a
  tm.full_name                                  AS assigned_to_name,
  tm.role                                       AS assigned_to_role,

  -- Si convirtió
  cl.id                                         AS client_id,
  cl.company_name                               AS converted_client_name,

  -- Tiempos
  l.created_at,
  l.converted_at,
  CASE
    WHEN l.converted_at IS NOT NULL
    THEN EXTRACT(DAY FROM l.converted_at - l.created_at)::INTEGER
    ELSE EXTRACT(DAY FROM now() - l.created_at)::INTEGER
  END                                           AS days_in_pipeline

FROM leads l
LEFT JOIN team_members tm ON tm.id = l.assigned_to
LEFT JOIN clients cl      ON cl.lead_id = l.id
WHERE l.deleted_at IS NULL;

COMMENT ON VIEW v_pipeline_leads IS 'Pipeline de leads con tiempos de conversión';

-- ============================================================
-- View: v_billing_summary
-- Resumen financiero mensual de la agencia
-- ============================================================
CREATE OR REPLACE VIEW v_billing_summary AS
SELECT
  DATE_TRUNC('month', ci.issued_at)::DATE       AS month,
  COUNT(ci.id)                                  AS invoices_count,
  SUM(ci.subtotal_cop)                          AS total_subtotal_cop,
  SUM(ci.total_cop)                             AS total_billed_cop,
  SUM(ci.total_cop) FILTER (WHERE ci.status = 'paid')    AS total_paid_cop,
  SUM(ci.total_cop) FILTER (WHERE ci.status = 'overdue') AS total_overdue_cop,
  SUM(ci.total_cop) FILTER (WHERE ci.status = 'sent')    AS total_pending_cop,
  COUNT(ci.id) FILTER (WHERE ci.status = 'paid')         AS paid_count,
  COUNT(ci.id) FILTER (WHERE ci.status = 'overdue')      AS overdue_count
FROM client_invoices ci
WHERE ci.deleted_at IS NULL
GROUP BY DATE_TRUNC('month', ci.issued_at)::DATE
ORDER BY month DESC;

COMMENT ON VIEW v_billing_summary IS 'Resumen financiero mensual — facturación y cobros';
