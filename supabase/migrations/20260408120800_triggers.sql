-- Migration: Triggers — updated_at y cálculos automáticos
-- Date: 2026-04-08
-- Author: Alexander Cast
-- Project: UGC Colombia

-- ============================================================
-- Función genérica: set_updated_at()
-- Actualiza el campo updated_at antes de cada UPDATE.
-- Se reutiliza en todas las tablas que lo requieren.
-- ============================================================
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

COMMENT ON FUNCTION set_updated_at IS 'Trigger function genérica: actualiza updated_at en cada UPDATE';

-- ============================================================
-- Triggers updated_at — una por tabla
-- ============================================================

-- team_members
DROP TRIGGER IF EXISTS trg_team_members_updated_at ON team_members;
CREATE TRIGGER trg_team_members_updated_at
  BEFORE UPDATE ON team_members
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- leads
DROP TRIGGER IF EXISTS trg_leads_updated_at ON leads;
CREATE TRIGGER trg_leads_updated_at
  BEFORE UPDATE ON leads
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- clients
DROP TRIGGER IF EXISTS trg_clients_updated_at ON clients;
CREATE TRIGGER trg_clients_updated_at
  BEFORE UPDATE ON clients
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- creators
DROP TRIGGER IF EXISTS trg_creators_updated_at ON creators;
CREATE TRIGGER trg_creators_updated_at
  BEFORE UPDATE ON creators
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- creator_payments
DROP TRIGGER IF EXISTS trg_creator_payments_updated_at ON creator_payments;
CREATE TRIGGER trg_creator_payments_updated_at
  BEFORE UPDATE ON creator_payments
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- projects
DROP TRIGGER IF EXISTS trg_projects_updated_at ON projects;
CREATE TRIGGER trg_projects_updated_at
  BEFORE UPDATE ON projects
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- briefs
DROP TRIGGER IF EXISTS trg_briefs_updated_at ON briefs;
CREATE TRIGGER trg_briefs_updated_at
  BEFORE UPDATE ON briefs
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- deliverables
DROP TRIGGER IF EXISTS trg_deliverables_updated_at ON deliverables;
CREATE TRIGGER trg_deliverables_updated_at
  BEFORE UPDATE ON deliverables
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- client_invoices
DROP TRIGGER IF EXISTS trg_client_invoices_updated_at ON client_invoices;
CREATE TRIGGER trg_client_invoices_updated_at
  BEFORE UPDATE ON client_invoices
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- reports
DROP TRIGGER IF EXISTS trg_reports_updated_at ON reports;
CREATE TRIGGER trg_reports_updated_at
  BEFORE UPDATE ON reports
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- ============================================================
-- Función: sync_creator_score()
-- Recalcula el score del creator en creators.score cada vez
-- que se inserta o modifica una evaluación en
-- creator_scoring_history.
-- ============================================================
CREATE OR REPLACE FUNCTION sync_creator_score()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
DECLARE
  v_new_score NUMERIC(4,1);
BEGIN
  -- Calcular score promedio de las últimas 10 evaluaciones
  SELECT ROUND(AVG(weighted_score), 1)
  INTO v_new_score
  FROM (
    SELECT weighted_score
    FROM creator_scoring_history
    WHERE creator_id = NEW.creator_id
    ORDER BY created_at DESC
    LIMIT 10
  ) recent;

  -- Actualizar el score desnormalizado en creators
  UPDATE creators
  SET score = COALESCE(v_new_score, 0)
  WHERE id = NEW.creator_id;

  RETURN NEW;
END;
$$;

COMMENT ON FUNCTION sync_creator_score IS 'Recalcula creators.score como promedio ponderado de las últimas 10 evaluaciones';

DROP TRIGGER IF EXISTS trg_sync_creator_score ON creator_scoring_history;
CREATE TRIGGER trg_sync_creator_score
  AFTER INSERT OR UPDATE ON creator_scoring_history
  FOR EACH ROW EXECUTE FUNCTION sync_creator_score();

-- ============================================================
-- Función: auto_upgrade_creator_tier()
-- Actualiza el tier del creator basado en su score actual.
-- Ejecuta después de actualizar creators.score.
-- Reglas:
--   score < 5.0   → bronze
--   score 5.0-6.9 → silver
--   score 7.0-8.9 → gold
--   score >= 9.0  → platinum
-- ============================================================
CREATE OR REPLACE FUNCTION auto_upgrade_creator_tier()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  -- Solo actuar si el score cambió
  IF OLD.score IS DISTINCT FROM NEW.score THEN
    NEW.tier = CASE
      WHEN NEW.score >= 9.0 THEN 'platinum'
      WHEN NEW.score >= 7.0 THEN 'gold'
      WHEN NEW.score >= 5.0 THEN 'silver'
      ELSE 'bronze'
    END;
  END IF;
  RETURN NEW;
END;
$$;

COMMENT ON FUNCTION auto_upgrade_creator_tier IS 'Actualiza automáticamente el tier del creator cuando cambia su score';

DROP TRIGGER IF EXISTS trg_auto_upgrade_tier ON creators;
CREATE TRIGGER trg_auto_upgrade_tier
  BEFORE UPDATE OF score ON creators
  FOR EACH ROW EXECUTE FUNCTION auto_upgrade_creator_tier();

-- ============================================================
-- Función: set_lead_converted_at()
-- Registra la fecha exacta cuando un lead cambia a 'converted'.
-- ============================================================
CREATE OR REPLACE FUNCTION set_lead_converted_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  IF NEW.status = 'converted' AND OLD.status <> 'converted' THEN
    NEW.converted_at = now();
  END IF;
  RETURN NEW;
END;
$$;

COMMENT ON FUNCTION set_lead_converted_at IS 'Registra converted_at automáticamente cuando el lead cambia a converted';

DROP TRIGGER IF EXISTS trg_lead_converted_at ON leads;
CREATE TRIGGER trg_lead_converted_at
  BEFORE UPDATE OF status ON leads
  FOR EACH ROW EXECUTE FUNCTION set_lead_converted_at();

-- ============================================================
-- Función: increment_deliverable_revision_count()
-- Incrementa el contador de revisiones cuando el status
-- cambia a 'revision'.
-- ============================================================
CREATE OR REPLACE FUNCTION increment_deliverable_revision_count()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  IF NEW.status = 'revision' AND OLD.status <> 'revision' THEN
    NEW.revision_count = OLD.revision_count + 1;

    -- Verificar límite de revisiones
    IF NEW.revision_count > NEW.max_revisions THEN
      RAISE EXCEPTION
        'El entregable % ha superado el máximo de % revisiones permitidas.',
        NEW.id,
        NEW.max_revisions;
    END IF;
  END IF;
  RETURN NEW;
END;
$$;

COMMENT ON FUNCTION increment_deliverable_revision_count IS 'Incrementa revision_count y valida max_revisions al cambiar status a revision';

DROP TRIGGER IF EXISTS trg_deliverable_revision_count ON deliverables;
CREATE TRIGGER trg_deliverable_revision_count
  BEFORE UPDATE OF status ON deliverables
  FOR EACH ROW EXECUTE FUNCTION increment_deliverable_revision_count();

-- ============================================================
-- Función: update_project_cost_from_deliverables()
-- Recalcula projects.cost_cop sumando todos los creator_fee_cop
-- de sus entregables aprobados.
-- ============================================================
CREATE OR REPLACE FUNCTION update_project_cost_from_deliverables()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
DECLARE
  v_total_cost NUMERIC(12,2);
BEGIN
  SELECT COALESCE(SUM(creator_fee_cop), 0)
  INTO v_total_cost
  FROM deliverables
  WHERE project_id = COALESCE(NEW.project_id, OLD.project_id);

  UPDATE projects
  SET cost_cop = v_total_cost
  WHERE id = COALESCE(NEW.project_id, OLD.project_id);

  RETURN NEW;
END;
$$;

COMMENT ON FUNCTION update_project_cost_from_deliverables IS 'Recalcula projects.cost_cop sumando creator_fee_cop de todos sus entregables';

DROP TRIGGER IF EXISTS trg_project_cost_on_deliverable ON deliverables;
CREATE TRIGGER trg_project_cost_on_deliverable
  AFTER INSERT OR UPDATE OF creator_fee_cop OR DELETE ON deliverables
  FOR EACH ROW EXECUTE FUNCTION update_project_cost_from_deliverables();
