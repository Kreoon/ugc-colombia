-- Migration: Client Portal Auth — vinculación de clientes con auth.users
-- Date: 2026-04-09
-- Author: Alexander Cast
-- Project: UGC Colombia
--
-- Añade portal_user_id a clients para permitir que un cliente
-- inicie sesión en su portal y vea únicamente sus propios datos.
-- ============================================================

-- ============================================================
-- 1. Columna: clients.portal_user_id
-- FK a auth.users — NULL si el cliente no tiene acceso al portal
-- ============================================================
ALTER TABLE clients
  ADD COLUMN IF NOT EXISTS portal_user_id UUID
  REFERENCES auth.users(id)
  ON DELETE SET NULL;

COMMENT ON COLUMN clients.portal_user_id IS
  'Usuario de Supabase Auth vinculado al portal del cliente. '
  'NULL = el cliente no tiene acceso al portal todavía.';

-- ============================================================
-- 2. Índice en portal_user_id
-- Crítico para el lookup is_portal_client() que corre en cada
-- evaluación de política RLS.
-- ============================================================
CREATE INDEX IF NOT EXISTS idx_clients_portal_user_id
  ON clients(portal_user_id);

-- ============================================================
-- 3. Función helper: is_portal_client(target_client_id UUID)
-- Retorna TRUE si el usuario autenticado (auth.uid()) es el
-- portal_user_id del cliente indicado.
-- Usada en todas las políticas RLS del portal cliente.
-- ============================================================
CREATE OR REPLACE FUNCTION is_portal_client(target_client_id UUID)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
STABLE
AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1
    FROM clients
    WHERE id             = target_client_id
      AND portal_user_id = auth.uid()
      AND portal_user_id IS NOT NULL
  );
END;
$$;

COMMENT ON FUNCTION is_portal_client IS
  'Helper RLS: devuelve TRUE si auth.uid() corresponde al portal_user_id '
  'del cliente indicado. Usar en políticas SELECT del portal cliente.';
