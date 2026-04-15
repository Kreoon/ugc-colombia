-- Migration: Content system — scripts, publicaciones, eventos y auditoría
-- Date: 2026-04-15
-- Author: Alexander Cast
-- Project: UGC Colombia
--
-- Tablas creadas:
--   content_scripts        → guiones con estado editorial completo
--   content_publications   → publicaciones por plataforma con métricas
--   content_script_events  → log inmutable de cambios de estado (auditoría)
--
-- Tabla extendida:
--   admin_users           → columna content_specialty
--
-- Dependencias:
--   admin_users  (20260414120000_admin_system.sql)
--   Función admin_update_updated_at() — definida en admin_system
-- ============================================================


-- ============================================================
-- 1. Extender admin_users con especialidad de contenido
-- ============================================================

ALTER TABLE admin_users
  ADD COLUMN IF NOT EXISTS content_specialty TEXT;

COMMENT ON COLUMN admin_users.content_specialty IS
  'Especialidad de contenido del miembro (ej: edition, direction, ugc, copy)';


-- ============================================================
-- 2. Seed: Valentina Giraldo
-- ============================================================
-- Rol 'creative' válido contra CHECK constraint.
-- Si el email ya existe, solo actualiza content_specialty.

INSERT INTO admin_users (full_name, email, role, content_specialty, is_active)
VALUES (
  'Valentina Giraldo',
  'valentina@ugccolombia.co',
  'creative',
  'edition',
  true
)
ON CONFLICT (email) DO UPDATE SET
  content_specialty = EXCLUDED.content_specialty,
  is_active = true;


-- ============================================================
-- 3. Tabla: content_scripts
-- Guiones de contenido para redes sociales
-- ============================================================

CREATE TABLE IF NOT EXISTS content_scripts (
  id                       UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  slug                     TEXT        NOT NULL UNIQUE,
  title                    TEXT        NOT NULL,
  md_file_path             TEXT,
  humanized_md_file_path   TEXT,
  hook                     TEXT,
  duration_seconds         INTEGER,
  platform                 TEXT
                             CHECK (platform IN (
                               'instagram_reel',
                               'tiktok',
                               'youtube_shorts',
                               'linkedin',
                               'x',
                               'youtube_long',
                               'newsletter',
                               'otro'
                             )),
  pillar                   TEXT
                             CHECK (pillar IN (
                               'educativo',
                               'provocacion',
                               'caso_exito',
                               'bts',
                               'autoridad',
                               'comunidad',
                               'prueba_social'
                             )),
  status                   TEXT        NOT NULL DEFAULT 'borrador'
                             CHECK (status IN (
                               'borrador',
                               'aprobado',
                               'grabado',
                               'editando',
                               'entregado',
                               'publicado',
                               'archivado'
                             )),
  recorded                 BOOLEAN     NOT NULL DEFAULT false,
  edited                   BOOLEAN     NOT NULL DEFAULT false,
  published                BOOLEAN     NOT NULL DEFAULT false,
  archived                 BOOLEAN     NOT NULL DEFAULT false,
  recording_notes          TEXT,
  editing_notes            TEXT,
  created_by               UUID        REFERENCES admin_users(id) ON DELETE SET NULL,
  assigned_editor          UUID        REFERENCES admin_users(id) ON DELETE SET NULL,
  assigned_creator         UUID        REFERENCES admin_users(id) ON DELETE SET NULL,
  created_at               TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at               TIMESTAMPTZ NOT NULL DEFAULT now()
);

COMMENT ON TABLE content_scripts IS
  'Guiones de contenido para redes sociales — fuente de verdad del sistema editorial';


-- ============================================================
-- 4. Tabla: content_publications
-- ============================================================

CREATE TABLE IF NOT EXISTS content_publications (
  id                  UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  script_id           UUID        NOT NULL
                        REFERENCES content_scripts(id) ON DELETE CASCADE,
  platform            TEXT        NOT NULL
                        CHECK (platform IN (
                          'instagram_reel',
                          'tiktok',
                          'youtube_shorts',
                          'linkedin',
                          'x',
                          'youtube_long',
                          'newsletter',
                          'otro'
                        )),
  url                 TEXT,
  published_at        TIMESTAMPTZ,
  published_by        UUID        REFERENCES admin_users(id) ON DELETE SET NULL,
  editor_id           UUID        REFERENCES admin_users(id) ON DELETE SET NULL,
  views               INTEGER     NOT NULL DEFAULT 0,
  likes               INTEGER     NOT NULL DEFAULT 0,
  comments            INTEGER     NOT NULL DEFAULT 0,
  saves               INTEGER     NOT NULL DEFAULT 0,
  shares              INTEGER     NOT NULL DEFAULT 0,
  engagement_rate     NUMERIC(5, 2),
  notes               TEXT,
  metrics_updated_at  TIMESTAMPTZ,
  metrics_source      TEXT        NOT NULL DEFAULT 'manual',
  created_at          TIMESTAMPTZ NOT NULL DEFAULT now()
);

COMMENT ON TABLE content_publications IS
  'Publicaciones reales de cada guion por plataforma con métricas';


-- ============================================================
-- 5. Tabla: content_script_events (audit log)
-- ============================================================

CREATE TABLE IF NOT EXISTS content_script_events (
  id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  script_id   UUID        NOT NULL
                REFERENCES content_scripts(id) ON DELETE CASCADE,
  actor_id    UUID        REFERENCES admin_users(id) ON DELETE SET NULL,
  event_type  TEXT        NOT NULL,
  from_value  TEXT,
  to_value    TEXT,
  metadata    JSONB       NOT NULL DEFAULT '{}'::JSONB,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

COMMENT ON TABLE content_script_events IS
  'Log inmutable de eventos sobre guiones — no actualizar ni borrar';


-- ============================================================
-- 6. Índices
-- ============================================================

CREATE INDEX IF NOT EXISTS idx_content_scripts_status_archived
  ON content_scripts(status, archived);

CREATE INDEX IF NOT EXISTS idx_content_scripts_assigned_editor_active
  ON content_scripts(assigned_editor)
  WHERE archived = false;

CREATE INDEX IF NOT EXISTS idx_content_publications_script_published_at
  ON content_publications(script_id, published_at DESC);

CREATE INDEX IF NOT EXISTS idx_content_publications_editor_published_at
  ON content_publications(editor_id, published_at DESC);

CREATE INDEX IF NOT EXISTS idx_content_script_events_script_created
  ON content_script_events(script_id, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_content_script_events_actor_created
  ON content_script_events(actor_id, created_at DESC);


-- ============================================================
-- 7. Trigger updated_at
-- ============================================================

DROP TRIGGER IF EXISTS content_scripts_updated_at ON content_scripts;
CREATE TRIGGER content_scripts_updated_at
  BEFORE UPDATE ON content_scripts
  FOR EACH ROW
  EXECUTE FUNCTION admin_update_updated_at();


-- ============================================================
-- 8. RLS
-- ============================================================

ALTER TABLE content_scripts        ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_publications   ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_script_events  ENABLE ROW LEVEL SECURITY;


-- content_scripts
DROP POLICY IF EXISTS "team reads content_scripts" ON content_scripts;
CREATE POLICY "team reads content_scripts"
  ON content_scripts FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE auth_user_id = auth.uid()
        AND is_active = true
    )
  );

DROP POLICY IF EXISTS "team inserts content_scripts" ON content_scripts;
CREATE POLICY "team inserts content_scripts"
  ON content_scripts FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE auth_user_id = auth.uid()
        AND role IN ('founder', 'manager', 'creative')
        AND is_active = true
    )
  );

DROP POLICY IF EXISTS "team updates content_scripts" ON content_scripts;
CREATE POLICY "team updates content_scripts"
  ON content_scripts FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE auth_user_id = auth.uid()
        AND role IN ('founder', 'manager', 'creative')
        AND is_active = true
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE auth_user_id = auth.uid()
        AND role IN ('founder', 'manager', 'creative')
        AND is_active = true
    )
  );

DROP POLICY IF EXISTS "founders delete content_scripts" ON content_scripts;
CREATE POLICY "founders delete content_scripts"
  ON content_scripts FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE auth_user_id = auth.uid()
        AND role IN ('founder', 'manager')
        AND is_active = true
    )
  );

DROP POLICY IF EXISTS "service role full access on content_scripts" ON content_scripts;
CREATE POLICY "service role full access on content_scripts"
  ON content_scripts FOR ALL
  USING (auth.role() = 'service_role');


-- content_publications
DROP POLICY IF EXISTS "team reads content_publications" ON content_publications;
CREATE POLICY "team reads content_publications"
  ON content_publications FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE auth_user_id = auth.uid()
        AND is_active = true
    )
  );

DROP POLICY IF EXISTS "team inserts content_publications" ON content_publications;
CREATE POLICY "team inserts content_publications"
  ON content_publications FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE auth_user_id = auth.uid()
        AND role IN ('founder', 'manager', 'creative')
        AND is_active = true
    )
  );

DROP POLICY IF EXISTS "team updates content_publications" ON content_publications;
CREATE POLICY "team updates content_publications"
  ON content_publications FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE auth_user_id = auth.uid()
        AND role IN ('founder', 'manager', 'creative')
        AND is_active = true
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE auth_user_id = auth.uid()
        AND role IN ('founder', 'manager', 'creative')
        AND is_active = true
    )
  );

DROP POLICY IF EXISTS "founders delete content_publications" ON content_publications;
CREATE POLICY "founders delete content_publications"
  ON content_publications FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE auth_user_id = auth.uid()
        AND role IN ('founder', 'manager')
        AND is_active = true
    )
  );

DROP POLICY IF EXISTS "service role full access on content_publications" ON content_publications;
CREATE POLICY "service role full access on content_publications"
  ON content_publications FOR ALL
  USING (auth.role() = 'service_role');


-- content_script_events (append-only)
DROP POLICY IF EXISTS "team reads content_script_events" ON content_script_events;
CREATE POLICY "team reads content_script_events"
  ON content_script_events FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE auth_user_id = auth.uid()
        AND is_active = true
    )
  );

DROP POLICY IF EXISTS "team inserts content_script_events" ON content_script_events;
CREATE POLICY "team inserts content_script_events"
  ON content_script_events FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE auth_user_id = auth.uid()
        AND is_active = true
    )
  );

DROP POLICY IF EXISTS "service role full access on content_script_events" ON content_script_events;
CREATE POLICY "service role full access on content_script_events"
  ON content_script_events FOR ALL
  USING (auth.role() = 'service_role');
