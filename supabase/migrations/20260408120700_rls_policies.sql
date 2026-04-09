-- Migration: RLS Policies adicionales y verificación
-- Date: 2026-04-08
-- Author: Alexander Cast
-- Project: UGC Colombia
--
-- NOTA: Las políticas base por tabla se crearon en sus respectivas
-- migraciones. Esta migración agrega:
--   1. Políticas para acceso de service_role a vistas (no aplica, las vistas
--      heredan RLS de las tablas base).
--   2. Política especial: creadores pueden ver su propio perfil si
--      en el futuro se crea un portal de creators con auth propio.
--   3. Política anon para formularios públicos de captación de leads.
--   4. Función helper is_team_member() reutilizable.
-- ============================================================

-- ============================================================
-- Función helper: is_team_member(role_filter TEXT[])
-- Retorna TRUE si el usuario autenticado pertenece al equipo
-- con alguno de los roles especificados.
-- ============================================================
CREATE OR REPLACE FUNCTION is_team_member(role_filter TEXT[] DEFAULT NULL)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
STABLE
AS $$
BEGIN
  IF role_filter IS NULL THEN
    -- Cualquier miembro activo del equipo
    RETURN EXISTS (
      SELECT 1 FROM team_members
      WHERE user_id = auth.uid()
        AND is_active = true
    );
  ELSE
    -- Miembro con rol específico
    RETURN EXISTS (
      SELECT 1 FROM team_members
      WHERE user_id = auth.uid()
        AND role = ANY(role_filter)
        AND is_active = true
    );
  END IF;
END;
$$;

COMMENT ON FUNCTION is_team_member IS 'Helper RLS: verifica si el usuario actual es miembro activo del equipo con rol opcional';

-- ============================================================
-- Política: leads INSERT para usuarios anónimos
-- Permite que formularios públicos (landing, Instagram bio link)
-- inserten leads sin autenticación.
-- Se limita: solo pueden insertar, NUNCA leer ni actualizar.
-- ============================================================

-- Eliminar política existente si existe (idempotente)
DROP POLICY IF EXISTS "Anon can submit leads via public form" ON leads;

CREATE POLICY "Anon can submit leads via public form"
  ON leads FOR INSERT
  TO anon
  WITH CHECK (
    -- Solo campos básicos — la app debe validar que no se inyecten
    -- campos sensibles desde el formulario público.
    -- status debe llegar como 'new' (default).
    true
  );

COMMENT ON TABLE leads IS 'Prospectos entrantes. Los anónimos pueden insertar vía formulario público.';

-- ============================================================
-- Política futura: portal de creators (preparada, deshabilitada)
-- Si se crea auth para creators, habilitar estas políticas.
-- ============================================================

-- CREATE POLICY "Creators can view own profile"
--   ON creators FOR SELECT
--   TO authenticated
--   USING (
--     email = (SELECT email FROM auth.users WHERE id = auth.uid())
--   );

-- CREATE POLICY "Creators can update own profile"
--   ON creators FOR UPDATE
--   TO authenticated
--   USING (
--     email = (SELECT email FROM auth.users WHERE id = auth.uid())
--   )
--   WITH CHECK (
--     email = (SELECT email FROM auth.users WHERE id = auth.uid())
--   );

-- ============================================================
-- Verificación: confirmar que todas las tablas tienen RLS activo
-- (Este SELECT no modifica nada, sirve como assertion en CI)
-- ============================================================
DO $$
DECLARE
  tbl TEXT;
  rls_enabled BOOLEAN;
BEGIN
  FOR tbl, rls_enabled IN
    SELECT relname, relrowsecurity
    FROM pg_class
    WHERE relname IN (
      'team_members', 'leads', 'clients',
      'creators', 'creator_scoring_history', 'creator_payments',
      'projects', 'briefs', 'deliverables',
      'client_invoices', 'reports'
    )
    AND relkind = 'r'
  LOOP
    IF NOT rls_enabled THEN
      RAISE EXCEPTION 'RLS NO HABILITADO en tabla: %', tbl;
    END IF;
  END LOOP;
  RAISE NOTICE 'OK: RLS verificado en todas las tablas del schema UGC Colombia';
END;
$$;
