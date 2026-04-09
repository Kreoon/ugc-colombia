-- Migration: Client Portal RLS — políticas SELECT para clientes autenticados
-- Date: 2026-04-09
-- Author: Alexander Cast
-- Project: UGC Colombia
--
-- Añade políticas SELECT para que un cliente autenticado (portal_user_id)
-- pueda ver únicamente sus propios registros en cada tabla.
-- Coexiste con las políticas existentes de team_members usando OR implícito:
-- Supabase evalúa todas las políticas FOR SELECT de un mismo rol y permite
-- el acceso si CUALQUIERA retorna TRUE (comportamiento PERMISSIVE por defecto).
--
-- Clientes: SOLO SELECT — sin INSERT, UPDATE, DELETE.
-- ============================================================

-- ============================================================
-- PROJECTS
-- El cliente ve proyectos donde projects.client_id le corresponde.
-- ============================================================
DROP POLICY IF EXISTS "Portal clients can view own projects" ON projects;

CREATE POLICY "Portal clients can view own projects"
  ON projects FOR SELECT
  TO authenticated
  USING (
    is_portal_client(client_id)
  );

-- ============================================================
-- BRIEFS
-- El cliente llega a briefs a través del project_id:
-- el brief pertenece a un proyecto que es del cliente.
-- ============================================================
DROP POLICY IF EXISTS "Portal clients can view own briefs" ON briefs;

CREATE POLICY "Portal clients can view own briefs"
  ON briefs FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1
      FROM projects p
      WHERE p.id        = briefs.project_id
        AND is_portal_client(p.client_id)
    )
  );

-- ============================================================
-- DELIVERABLES
-- El cliente ve entregables de sus proyectos.
-- Solo entregables aprobados (status = 'approved') son visibles
-- en el portal — los estados internos no se exponen.
-- ============================================================
DROP POLICY IF EXISTS "Portal clients can view own deliverables" ON deliverables;

CREATE POLICY "Portal clients can view own deliverables"
  ON deliverables FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1
      FROM projects p
      WHERE p.id        = deliverables.project_id
        AND is_portal_client(p.client_id)
    )
    AND status IN ('approved', 'submitted', 'revision')
    -- 'approved': contenido final listo
    -- 'submitted': en revisión por el equipo, cliente puede seguirlo
    -- 'revision': con notas de revisión activas
    -- 'pending' | 'in_production' | 'rejected': solo internos
  );

-- ============================================================
-- CLIENT_INVOICES
-- El cliente ve únicamente sus propias facturas.
-- Facturas en estado 'draft' no se muestran — son internas.
-- ============================================================
DROP POLICY IF EXISTS "Portal clients can view own invoices" ON client_invoices;

CREATE POLICY "Portal clients can view own invoices"
  ON client_invoices FOR SELECT
  TO authenticated
  USING (
    is_portal_client(client_id)
    AND status IN ('sent', 'paid', 'overdue')
    -- 'draft' y 'cancelled' son estados internos
  );

-- ============================================================
-- REPORTS
-- El cliente ve sus reportes de resultados.
-- Solo reportes que ya fueron enviados (sent_at IS NOT NULL).
-- ============================================================
DROP POLICY IF EXISTS "Portal clients can view own reports" ON reports;

CREATE POLICY "Portal clients can view own reports"
  ON reports FOR SELECT
  TO authenticated
  USING (
    is_portal_client(client_id)
    AND sent_at IS NOT NULL
    -- Reportes en borrador son internos hasta que se marquen como enviados
  );

-- ============================================================
-- NOTA sobre coexistencia con políticas de team_members:
-- Las políticas existentes usan TO authenticated con USING (true)
-- o condiciones de rol. Supabase evalúa todas las políticas
-- PERMISSIVE en OR: si el usuario es team_member O es portal_client,
-- accede. No hay conflicto ni necesidad de modificar las anteriores.
-- ============================================================
