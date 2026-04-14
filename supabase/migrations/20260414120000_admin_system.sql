-- Migration: Admin system — auth link, invitations, audit log, content management
-- Date: 2026-04-14
-- Author: Alexander Cast
-- Project: UGC Colombia
--
-- Nota importante:
--   El proyecto Supabase actual ya tiene una tabla `team_members` de otro sistema
--   (relación user↔team multi-tenant). Para no colisionar con ella, este sistema
--   admin usa la tabla `admin_users` como fuente de verdad del equipo interno.
--
-- Tablas creadas:
--   admin_users         → miembros del equipo interno con roles y auth link
--   invitations         → invitaciones pendientes con token URL-safe
--   admin_activity      → audit log inmutable
--   content_overrides   → ediciones de contenido desde el admin
--   content_versions    → historial de versiones
--   user_favorites      → favoritos por miembro del equipo

-- ============================================================
-- 1. Tabla: admin_users (equipo interno de UGC Colombia)
-- ============================================================

CREATE TABLE IF NOT EXISTS admin_users (
  id                     UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  auth_user_id           UUID        UNIQUE,
  email                  TEXT        NOT NULL UNIQUE,
  full_name              TEXT,
  role                   TEXT        NOT NULL DEFAULT 'coordinator'
                                     CHECK (role IN ('founder', 'manager', 'coordinator', 'sales', 'creative')),
  phone                  TEXT,
  avatar_url             TEXT,
  is_active              BOOLEAN     NOT NULL DEFAULT true,
  invited_by             UUID,
  invitation_accepted_at TIMESTAMPTZ,
  last_login_at          TIMESTAMPTZ,
  notes                  TEXT,
  created_at             TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at             TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- FK a auth.users de Supabase
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints
    WHERE table_schema = 'public'
      AND table_name = 'admin_users'
      AND constraint_name = 'admin_users_auth_user_id_fkey'
  ) THEN
    ALTER TABLE admin_users
      ADD CONSTRAINT admin_users_auth_user_id_fkey
      FOREIGN KEY (auth_user_id) REFERENCES auth.users(id) ON DELETE CASCADE;
  END IF;
END $$;

-- Auto-referencia para invited_by
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints
    WHERE table_schema = 'public'
      AND table_name = 'admin_users'
      AND constraint_name = 'admin_users_invited_by_fkey'
  ) THEN
    ALTER TABLE admin_users
      ADD CONSTRAINT admin_users_invited_by_fkey
      FOREIGN KEY (invited_by) REFERENCES admin_users(id) ON DELETE SET NULL;
  END IF;
END $$;

COMMENT ON TABLE admin_users IS 'Equipo interno de UGC Colombia con acceso al dashboard admin';
COMMENT ON COLUMN admin_users.auth_user_id IS 'Vínculo al usuario en Supabase Auth';
COMMENT ON COLUMN admin_users.role IS 'founder | manager | coordinator | sales | creative';

CREATE INDEX IF NOT EXISTS idx_admin_users_email ON admin_users(email);
CREATE INDEX IF NOT EXISTS idx_admin_users_auth_user_id ON admin_users(auth_user_id) WHERE auth_user_id IS NOT NULL;

-- ============================================================
-- 2. Generador de tokens URL-safe
-- ============================================================

CREATE OR REPLACE FUNCTION gen_invitation_token()
RETURNS TEXT
LANGUAGE SQL
VOLATILE
AS $$
  SELECT replace(replace(replace(
    encode(gen_random_bytes(32), 'base64'),
    '+', '-'),
    '/', '_'),
    '=', '');
$$;

COMMENT ON FUNCTION gen_invitation_token IS 'Genera un token URL-safe de 32 bytes';

-- ============================================================
-- 3. Tabla: invitations
-- ============================================================

CREATE TABLE IF NOT EXISTS invitations (
  id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  email       TEXT        NOT NULL,
  role        TEXT        NOT NULL
                          CHECK (role IN ('founder', 'manager', 'coordinator', 'sales', 'creative')),
  full_name   TEXT,
  invited_by  UUID        NOT NULL,
  token       TEXT        UNIQUE NOT NULL DEFAULT gen_invitation_token(),
  expires_at  TIMESTAMPTZ NOT NULL DEFAULT (now() + INTERVAL '7 days'),
  accepted_at TIMESTAMPTZ,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints
    WHERE table_schema = 'public'
      AND table_name = 'invitations'
      AND constraint_name = 'invitations_invited_by_fkey'
  ) THEN
    ALTER TABLE invitations
      ADD CONSTRAINT invitations_invited_by_fkey
      FOREIGN KEY (invited_by) REFERENCES admin_users(id) ON DELETE RESTRICT;
  END IF;
END $$;

COMMENT ON TABLE invitations IS 'Invitaciones pendientes para nuevos miembros del admin';
COMMENT ON COLUMN invitations.token IS 'Token URL-safe de 32 bytes, único por invitación';

CREATE INDEX IF NOT EXISTS idx_invitations_email_pending
  ON invitations(email)
  WHERE accepted_at IS NULL;

CREATE INDEX IF NOT EXISTS idx_invitations_token
  ON invitations(token);

-- ============================================================
-- 4. Tabla: admin_activity
-- ============================================================

CREATE TABLE IF NOT EXISTS admin_activity (
  id            UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id       UUID,
  action        TEXT        NOT NULL,
  resource_type TEXT,
  resource_id   TEXT,
  metadata      JSONB       NOT NULL DEFAULT '{}'::JSONB,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints
    WHERE table_schema = 'public'
      AND table_name = 'admin_activity'
      AND constraint_name = 'admin_activity_user_id_fkey'
  ) THEN
    ALTER TABLE admin_activity
      ADD CONSTRAINT admin_activity_user_id_fkey
      FOREIGN KEY (user_id) REFERENCES admin_users(id) ON DELETE SET NULL;
  END IF;
END $$;

COMMENT ON TABLE admin_activity IS 'Registro inmutable de acciones del equipo en el dashboard';

CREATE INDEX IF NOT EXISTS idx_admin_activity_user_created
  ON admin_activity(user_id, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_admin_activity_resource
  ON admin_activity(resource_type, resource_id);

-- ============================================================
-- 5. Tabla: content_overrides
-- ============================================================

CREATE TABLE IF NOT EXISTS content_overrides (
  id         UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  file_path  TEXT        NOT NULL UNIQUE,
  content    TEXT        NOT NULL,
  edited_by  UUID,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints
    WHERE table_schema = 'public'
      AND table_name = 'content_overrides'
      AND constraint_name = 'content_overrides_edited_by_fkey'
  ) THEN
    ALTER TABLE content_overrides
      ADD CONSTRAINT content_overrides_edited_by_fkey
      FOREIGN KEY (edited_by) REFERENCES admin_users(id) ON DELETE SET NULL;
  END IF;
END $$;

COMMENT ON TABLE content_overrides IS 'Override de contenido editable desde el admin';

-- ============================================================
-- 6. Tabla: content_versions
-- ============================================================

CREATE TABLE IF NOT EXISTS content_versions (
  id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  override_id UUID,
  file_path   TEXT        NOT NULL,
  content     TEXT        NOT NULL,
  edited_by   UUID,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints
    WHERE table_schema = 'public'
      AND table_name = 'content_versions'
      AND constraint_name = 'content_versions_override_id_fkey'
  ) THEN
    ALTER TABLE content_versions
      ADD CONSTRAINT content_versions_override_id_fkey
      FOREIGN KEY (override_id) REFERENCES content_overrides(id) ON DELETE CASCADE;
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints
    WHERE table_schema = 'public'
      AND table_name = 'content_versions'
      AND constraint_name = 'content_versions_edited_by_fkey'
  ) THEN
    ALTER TABLE content_versions
      ADD CONSTRAINT content_versions_edited_by_fkey
      FOREIGN KEY (edited_by) REFERENCES admin_users(id) ON DELETE SET NULL;
  END IF;
END $$;

COMMENT ON TABLE content_versions IS 'Historial de versiones — append-only';

CREATE INDEX IF NOT EXISTS idx_content_versions_override_created
  ON content_versions(override_id, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_content_versions_file_path_created
  ON content_versions(file_path, created_at DESC);

-- ============================================================
-- 7. Tabla: user_favorites (renombrada para evitar colisión con 'favorites')
-- ============================================================

CREATE TABLE IF NOT EXISTS admin_user_favorites (
  id         UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id    UUID        NOT NULL,
  file_path  TEXT        NOT NULL,
  label      TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints
    WHERE table_schema = 'public'
      AND table_name = 'admin_user_favorites'
      AND constraint_name = 'admin_user_favorites_user_id_fkey'
  ) THEN
    ALTER TABLE admin_user_favorites
      ADD CONSTRAINT admin_user_favorites_user_id_fkey
      FOREIGN KEY (user_id) REFERENCES admin_users(id) ON DELETE CASCADE;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints
    WHERE table_schema = 'public'
      AND table_name = 'admin_user_favorites'
      AND constraint_name = 'admin_user_favorites_user_id_file_path_key'
  ) THEN
    ALTER TABLE admin_user_favorites
      ADD CONSTRAINT admin_user_favorites_user_id_file_path_key
      UNIQUE (user_id, file_path);
  END IF;
END $$;

COMMENT ON TABLE admin_user_favorites IS 'Favoritos personales del equipo admin';

CREATE INDEX IF NOT EXISTS idx_admin_user_favorites_user_id
  ON admin_user_favorites(user_id);

-- ============================================================
-- 8. Trigger updated_at genérico
-- ============================================================

CREATE OR REPLACE FUNCTION admin_update_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS admin_users_updated_at ON admin_users;
CREATE TRIGGER admin_users_updated_at
  BEFORE UPDATE ON admin_users
  FOR EACH ROW
  EXECUTE FUNCTION admin_update_updated_at();

DROP TRIGGER IF EXISTS content_overrides_updated_at ON content_overrides;
CREATE TRIGGER content_overrides_updated_at
  BEFORE UPDATE ON content_overrides
  FOR EACH ROW
  EXECUTE FUNCTION admin_update_updated_at();

-- ============================================================
-- 9. Trigger de versionado automático
-- ============================================================

CREATE OR REPLACE FUNCTION create_content_version()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  INSERT INTO content_versions (override_id, file_path, content, edited_by)
  VALUES (NEW.id, NEW.file_path, NEW.content, NEW.edited_by);
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS content_overrides_versioning ON content_overrides;
CREATE TRIGGER content_overrides_versioning
  AFTER INSERT OR UPDATE OF content ON content_overrides
  FOR EACH ROW
  EXECUTE FUNCTION create_content_version();

-- ============================================================
-- 10. Funciones helper
-- ============================================================

CREATE OR REPLACE FUNCTION current_admin_user()
RETURNS admin_users
LANGUAGE SQL
STABLE
SECURITY DEFINER
AS $$
  SELECT *
  FROM admin_users
  WHERE auth_user_id = auth.uid()
    AND is_active = true
  LIMIT 1;
$$;

COMMENT ON FUNCTION current_admin_user IS
  'Retorna el admin_user del autenticado vía auth_user_id';

CREATE OR REPLACE FUNCTION current_admin_has_role(required_roles TEXT[])
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM admin_users
    WHERE auth_user_id = auth.uid()
      AND role = ANY(required_roles)
      AND is_active = true
  );
$$;

COMMENT ON FUNCTION current_admin_has_role IS
  'Verifica si el admin_user actual tiene alguno de los roles';

CREATE OR REPLACE FUNCTION log_admin_activity(
  p_action        TEXT,
  p_resource_type TEXT    DEFAULT NULL,
  p_resource_id   TEXT    DEFAULT NULL,
  p_metadata      JSONB   DEFAULT '{}'::JSONB
)
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_user_id    UUID;
  v_activity_id UUID;
BEGIN
  SELECT id INTO v_user_id
  FROM admin_users
  WHERE auth_user_id = auth.uid()
  LIMIT 1;

  IF v_user_id IS NULL THEN
    RETURN NULL;
  END IF;

  INSERT INTO admin_activity (user_id, action, resource_type, resource_id, metadata)
  VALUES (v_user_id, p_action, p_resource_type, p_resource_id, p_metadata)
  RETURNING id INTO v_activity_id;

  RETURN v_activity_id;
END;
$$;

COMMENT ON FUNCTION log_admin_activity IS
  'Registra actividad para el admin_user autenticado';

-- ============================================================
-- 11. RLS habilitado
-- ============================================================

ALTER TABLE admin_users          ENABLE ROW LEVEL SECURITY;
ALTER TABLE invitations          ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_activity       ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_overrides    ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_versions     ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_user_favorites ENABLE ROW LEVEL SECURITY;

-- ============================================================
-- 12. RLS Policies: admin_users
-- ============================================================

DROP POLICY IF EXISTS "admin reads self and team" ON admin_users;
CREATE POLICY "admin reads self and team"
  ON admin_users FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users au
      WHERE au.auth_user_id = auth.uid()
        AND au.is_active = true
    )
  );

DROP POLICY IF EXISTS "founders manage admin_users" ON admin_users;
CREATE POLICY "founders manage admin_users"
  ON admin_users FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users au
      WHERE au.auth_user_id = auth.uid()
        AND au.role IN ('founder', 'manager')
        AND au.is_active = true
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_users au
      WHERE au.auth_user_id = auth.uid()
        AND au.role IN ('founder', 'manager')
        AND au.is_active = true
    )
  );

DROP POLICY IF EXISTS "service role full access on admin_users" ON admin_users;
CREATE POLICY "service role full access on admin_users"
  ON admin_users FOR ALL
  USING (auth.role() = 'service_role');

-- ============================================================
-- 13. RLS Policies: invitations
-- ============================================================

DROP POLICY IF EXISTS "team reads invitations" ON invitations;
CREATE POLICY "team reads invitations"
  ON invitations FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE auth_user_id = auth.uid()
        AND is_active = true
    )
  );

DROP POLICY IF EXISTS "founders create invitations" ON invitations;
CREATE POLICY "founders create invitations"
  ON invitations FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE auth_user_id = auth.uid()
        AND role IN ('founder', 'manager')
        AND is_active = true
    )
  );

DROP POLICY IF EXISTS "founders revoke invitations" ON invitations;
CREATE POLICY "founders revoke invitations"
  ON invitations FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE auth_user_id = auth.uid()
        AND role IN ('founder', 'manager')
        AND is_active = true
    )
  );

DROP POLICY IF EXISTS "service role full access on invitations" ON invitations;
CREATE POLICY "service role full access on invitations"
  ON invitations FOR ALL
  USING (auth.role() = 'service_role');

-- ============================================================
-- 14. RLS Policies: admin_activity
-- ============================================================

DROP POLICY IF EXISTS "team reads activity" ON admin_activity;
CREATE POLICY "team reads activity"
  ON admin_activity FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE auth_user_id = auth.uid()
        AND is_active = true
    )
  );

DROP POLICY IF EXISTS "system inserts activity" ON admin_activity;
CREATE POLICY "system inserts activity"
  ON admin_activity FOR INSERT
  TO authenticated
  WITH CHECK (
    user_id = (
      SELECT id FROM admin_users
      WHERE auth_user_id = auth.uid()
      LIMIT 1
    )
  );

DROP POLICY IF EXISTS "service role full access on admin_activity" ON admin_activity;
CREATE POLICY "service role full access on admin_activity"
  ON admin_activity FOR ALL
  USING (auth.role() = 'service_role');

-- ============================================================
-- 15. RLS Policies: content_overrides
-- ============================================================

DROP POLICY IF EXISTS "team reads overrides" ON content_overrides;
CREATE POLICY "team reads overrides"
  ON content_overrides FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE auth_user_id = auth.uid()
        AND is_active = true
    )
  );

DROP POLICY IF EXISTS "managers manage overrides" ON content_overrides;
CREATE POLICY "managers manage overrides"
  ON content_overrides FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE auth_user_id = auth.uid()
        AND role IN ('founder', 'manager')
        AND is_active = true
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE auth_user_id = auth.uid()
        AND role IN ('founder', 'manager')
        AND is_active = true
    )
  );

DROP POLICY IF EXISTS "service role full access on content_overrides" ON content_overrides;
CREATE POLICY "service role full access on content_overrides"
  ON content_overrides FOR ALL
  USING (auth.role() = 'service_role');

-- ============================================================
-- 16. RLS Policies: content_versions
-- ============================================================

DROP POLICY IF EXISTS "team reads versions" ON content_versions;
CREATE POLICY "team reads versions"
  ON content_versions FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE auth_user_id = auth.uid()
        AND is_active = true
    )
  );

DROP POLICY IF EXISTS "service role full access on content_versions" ON content_versions;
CREATE POLICY "service role full access on content_versions"
  ON content_versions FOR ALL
  USING (auth.role() = 'service_role');

-- ============================================================
-- 17. RLS Policies: admin_user_favorites
-- ============================================================

DROP POLICY IF EXISTS "users manage own favorites" ON admin_user_favorites;
CREATE POLICY "users manage own favorites"
  ON admin_user_favorites FOR ALL
  TO authenticated
  USING (
    user_id = (
      SELECT id FROM admin_users
      WHERE auth_user_id = auth.uid()
      LIMIT 1
    )
  )
  WITH CHECK (
    user_id = (
      SELECT id FROM admin_users
      WHERE auth_user_id = auth.uid()
      LIMIT 1
    )
  );

DROP POLICY IF EXISTS "service role full access on admin_user_favorites" ON admin_user_favorites;
CREATE POLICY "service role full access on admin_user_favorites"
  ON admin_user_favorites FOR ALL
  USING (auth.role() = 'service_role');
