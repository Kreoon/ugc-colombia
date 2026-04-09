-- Migration: Client Portal Notifications — tabla, RLS y realtime trigger
-- Date: 2026-04-09
-- Author: Alexander Cast
-- Project: UGC Colombia
--
-- Notificaciones para el portal de clientes.
-- El trigger emite NOTIFY para Supabase Realtime en cada insert.
-- ============================================================

-- ============================================================
-- 1. Tipo ENUM para notification_type
-- Usamos CHECK constraint (mismo patrón del schema existente)
-- para evitar ALTER TYPE sin downtime.
-- ============================================================

-- ============================================================
-- 2. Tabla: client_notifications
-- ============================================================
CREATE TABLE IF NOT EXISTS client_notifications (
  id          UUID          DEFAULT gen_random_uuid() PRIMARY KEY,
  client_id   UUID          NOT NULL REFERENCES clients(id) ON DELETE CASCADE,

  -- Tipo de notificación
  type        TEXT          NOT NULL
              CHECK (type IN (
                'new_deliverable',   -- nuevo entregable listo para revisar
                'new_report',        -- nuevo reporte publicado
                'invoice_due',       -- factura próxima a vencer
                'project_update',    -- cambio de status en un proyecto
                'message'            -- mensaje directo del equipo al cliente
              )),

  -- Contenido
  title       TEXT          NOT NULL,
  body        TEXT,

  -- Datos extra (referencia a la entidad relacionada, URLs, etc.)
  -- Ej: {"project_id": "...", "deliverable_id": "...", "url": "/portal/..."}
  metadata    JSONB         NOT NULL DEFAULT '{}'::jsonb,

  -- Lifecycle
  read_at     TIMESTAMPTZ,           -- NULL = no leída
  created_at  TIMESTAMPTZ   NOT NULL DEFAULT now()
  -- No updated_at: las notificaciones son inmutables salvo read_at
);

COMMENT ON TABLE client_notifications IS
  'Notificaciones del portal cliente. Cada fila se emite via Supabase Realtime al insertar.';
COMMENT ON COLUMN client_notifications.type IS
  'new_deliverable | new_report | invoice_due | project_update | message';
COMMENT ON COLUMN client_notifications.metadata IS
  'JSONB con contexto adicional: project_id, deliverable_id, url de acción, etc.';
COMMENT ON COLUMN client_notifications.read_at IS
  'Timestamp en que el cliente marcó la notificación como leída. NULL = no leída.';

-- ============================================================
-- 3. Índices
-- idx_notifications_client_unread: query principal "unread count"
-- idx_notifications_client_created: feed cronológico por cliente
-- idx_notifications_type: filtros por tipo desde el portal
-- ============================================================
CREATE INDEX IF NOT EXISTS idx_notifications_client_unread
  ON client_notifications(client_id, read_at)
  WHERE read_at IS NULL;

CREATE INDEX IF NOT EXISTS idx_notifications_client_created
  ON client_notifications(client_id, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_notifications_type
  ON client_notifications(type);

-- ============================================================
-- 4. RLS
-- ============================================================
ALTER TABLE client_notifications ENABLE ROW LEVEL SECURITY;

-- El cliente solo ve sus propias notificaciones
DROP POLICY IF EXISTS "Portal clients can view own notifications" ON client_notifications;

CREATE POLICY "Portal clients can view own notifications"
  ON client_notifications FOR SELECT
  TO authenticated
  USING (
    is_portal_client(client_id)
  );

-- El cliente puede marcar como leída (UPDATE solo sobre read_at)
-- El equipo actualiza desde service_role, no desde el dashboard autenticado.
DROP POLICY IF EXISTS "Portal clients can mark notifications as read" ON client_notifications;

CREATE POLICY "Portal clients can mark notifications as read"
  ON client_notifications FOR UPDATE
  TO authenticated
  USING (
    is_portal_client(client_id)
  )
  WITH CHECK (
    is_portal_client(client_id)
  );

-- Team members con acceso a clientes pueden ver todas las notificaciones
-- Útil para auditoría y soporte desde el dashboard interno.
DROP POLICY IF EXISTS "Team members can view all notifications" ON client_notifications;

CREATE POLICY "Team members can view all notifications"
  ON client_notifications FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM team_members tm
      WHERE tm.user_id  = auth.uid()
        AND tm.is_active = true
    )
  );

-- Service role: acceso total (n8n, Edge Functions)
DROP POLICY IF EXISTS "Service role full access on notifications" ON client_notifications;

CREATE POLICY "Service role full access on notifications"
  ON client_notifications FOR ALL
  USING (auth.role() = 'service_role');

-- ============================================================
-- 5. Función trigger: notify_client_notification()
-- Emite NOTIFY al canal 'client_notifications' con el payload
-- de la fila insertada. Supabase Realtime escucha este canal
-- y lo propaga a los clientes suscritos via WebSocket.
--
-- El canal usa el client_id como discriminador para que cada
-- cliente solo reciba sus propias notificaciones.
-- ============================================================
CREATE OR REPLACE FUNCTION notify_client_notification()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  payload JSONB;
BEGIN
  -- Construir payload con los campos relevantes para el frontend
  payload := jsonb_build_object(
    'id',         NEW.id,
    'client_id',  NEW.client_id,
    'type',       NEW.type,
    'title',      NEW.title,
    'body',       NEW.body,
    'metadata',   NEW.metadata,
    'created_at', NEW.created_at
  );

  -- NOTIFY al canal específico del cliente
  -- El frontend se suscribe a: client_notifications:{client_id}
  PERFORM pg_notify(
    'client_notifications',
    payload::text
  );

  RETURN NEW;
END;
$$;

COMMENT ON FUNCTION notify_client_notification IS
  'Trigger function: emite pg_notify a Supabase Realtime al insertar una notificación. '
  'El payload incluye client_id para filtrar por cliente en el frontend.';

-- ============================================================
-- 6. Trigger: after insert on client_notifications
-- Se ejecuta por cada fila insertada (FOR EACH ROW).
-- ============================================================
DROP TRIGGER IF EXISTS trg_notify_client_notification ON client_notifications;

CREATE TRIGGER trg_notify_client_notification
  AFTER INSERT ON client_notifications
  FOR EACH ROW
  EXECUTE FUNCTION notify_client_notification();

COMMENT ON TRIGGER trg_notify_client_notification ON client_notifications IS
  'Emite NOTIFY vía pg_notify después de cada INSERT para alimentar Supabase Realtime.';

-- ============================================================
-- 7. Habilitar Realtime en la tabla (replication)
-- Supabase requiere que la tabla esté en la publication
-- para que Realtime transmita los cambios via WebSocket.
-- ============================================================
ALTER PUBLICATION supabase_realtime ADD TABLE client_notifications;
