-- Migration: Seed equipo fundador de UGC Colombia
-- Date: 2026-04-08
-- Author: Alexander Cast
-- Project: UGC Colombia
--
-- IMPORTANTE: Este seed inserta los miembros del equipo sin user_id.
-- El user_id se vincula después cuando cada persona crea su cuenta
-- en Supabase Auth y se ejecuta:
--   UPDATE team_members SET user_id = auth.uid() WHERE email = '...';
-- O bien mediante la función link_team_member_to_auth() más abajo.
-- ============================================================

-- ============================================================
-- Seed: equipo UGC Colombia
-- ============================================================
INSERT INTO team_members (full_name, email, role, phone, notes, is_active)
VALUES
  (
    'Alexander Cast',
    'founder@kreoon.com',
    'founder',
    NULL,
    'Fundador de Infiny Group y KREOON. Creador de UGC Colombia.',
    true
  ),
  (
    'Brian',
    'brian@ugccolombia.co',
    'manager',
    NULL,
    'Manager de operaciones y coordinación de proyectos.',
    true
  ),
  (
    'Diana Mile',
    'tdianamile@gmail.com',
    'coordinator',
    NULL,
    'Coordinadora de creators y producción UGC.',
    true
  ),
  (
    'Samuel',
    'samuel@ugccolombia.co',
    'creative',
    NULL,
    'Equipo creativo — edición y dirección de contenido.',
    true
  ),
  (
    'Tanya',
    'tanya@ugccolombia.co',
    'sales',
    NULL,
    'Equipo de ventas y gestión de clientes.',
    true
  )
ON CONFLICT (email) DO NOTHING;

-- ============================================================
-- Función helper: link_team_member_to_auth(p_email TEXT)
-- Vincula un team_member a su auth.user por email.
-- Ejecutar manualmente una vez que el usuario haga sign up.
-- Ejemplo de uso:
--   SELECT link_team_member_to_auth('founder@kreoon.com');
-- ============================================================
CREATE OR REPLACE FUNCTION link_team_member_to_auth(p_email TEXT)
RETURNS TEXT
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_user_id UUID;
  v_member_name TEXT;
BEGIN
  -- Buscar el auth.user por email
  SELECT id INTO v_user_id
  FROM auth.users
  WHERE email = p_email
  LIMIT 1;

  IF v_user_id IS NULL THEN
    RETURN 'ERROR: No existe un usuario en auth.users con email: ' || p_email;
  END IF;

  -- Buscar el nombre del team member
  SELECT full_name INTO v_member_name
  FROM team_members
  WHERE email = p_email;

  IF v_member_name IS NULL THEN
    RETURN 'ERROR: No existe un team_member con email: ' || p_email;
  END IF;

  -- Vincular
  UPDATE team_members
  SET user_id = v_user_id
  WHERE email = p_email;

  RETURN 'OK: ' || v_member_name || ' vinculado a auth.users(' || v_user_id || ')';
END;
$$;

COMMENT ON FUNCTION link_team_member_to_auth IS 'Vincula un team_member con su usuario de Supabase Auth por email. Ejecutar una vez por miembro después de sign up.';

-- ============================================================
-- Verificación del seed
-- ============================================================
DO $$
DECLARE
  v_count INTEGER;
BEGIN
  SELECT COUNT(*) INTO v_count FROM team_members WHERE is_active = true;
  RAISE NOTICE 'Seed completado: % miembros activos en team_members', v_count;
END;
$$;
