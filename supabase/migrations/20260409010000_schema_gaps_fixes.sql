-- Migration: Schema gaps fixes — columnas e índices faltantes detectados por agentes
-- Date: 2026-04-09
-- Author: Alexander Cast
-- Project: UGC Colombia
--
-- Tablas afectadas:
--   leads           → email_bounced, unsubscribed
--   creator_payments → idempotency_key
--   creators        → ai_notes
--   projects        → churn_risk, health_score
--
-- Esta migración es IDEMPOTENTE: todos los ADD COLUMN usan IF NOT EXISTS
-- y los índices usan CREATE INDEX IF NOT EXISTS.
-- No toca ninguna política RLS existente.

-- ============================================================
-- 1. leads → email_bounced
-- ============================================================
ALTER TABLE leads
  ADD COLUMN IF NOT EXISTS email_bounced BOOLEAN NOT NULL DEFAULT FALSE;

COMMENT ON COLUMN leads.email_bounced IS
  'TRUE cuando el proveedor de email (n8n / SendGrid) reporta bounce duro o suave. '
  'Usado para excluir el lead de campañas de email automatizadas.';

-- ============================================================
-- 2. leads → unsubscribed
-- ============================================================
ALTER TABLE leads
  ADD COLUMN IF NOT EXISTS unsubscribed BOOLEAN NOT NULL DEFAULT FALSE;

COMMENT ON COLUMN leads.unsubscribed IS
  'TRUE cuando el lead solicitó darse de baja de comunicaciones. '
  'Nunca enviar email marketing a registros con unsubscribed = TRUE.';

-- ============================================================
-- 3. creator_payments → idempotency_key
-- ============================================================
ALTER TABLE creator_payments
  ADD COLUMN IF NOT EXISTS idempotency_key TEXT;

COMMENT ON COLUMN creator_payments.idempotency_key IS
  'Clave única generada por el llamador (UUID v4 o hash de la operación) para '
  'prevenir pagos duplicados en reintentos de n8n o API. NULL en pagos manuales.';

-- Índice único parcial: solo aplica cuando la clave está presente.
-- Permite NULL múltiple (pagos manuales) pero bloquea duplicados con clave.
CREATE UNIQUE INDEX IF NOT EXISTS uidx_creator_payments_idempotency_key
  ON creator_payments(idempotency_key)
  WHERE idempotency_key IS NOT NULL;

-- ============================================================
-- 4. creators → ai_notes
-- ============================================================
ALTER TABLE creators
  ADD COLUMN IF NOT EXISTS ai_notes TEXT;

COMMENT ON COLUMN creators.ai_notes IS
  'Notas generadas por agentes IA (Jarvis / Claude) durante research del creator: '
  'análisis de perfil, detección de nichos, red flags, recomendaciones de tier. '
  'Campo de texto libre; no editar manualmente salvo corrección.';

-- ============================================================
-- 5. projects → churn_risk
-- ============================================================
ALTER TABLE projects
  ADD COLUMN IF NOT EXISTS churn_risk BOOLEAN NOT NULL DEFAULT FALSE;

COMMENT ON COLUMN projects.churn_risk IS
  'TRUE cuando el agente IA o un manager marca el proyecto con riesgo de abandono. '
  'Se usa en el dashboard para priorizar seguimiento comercial.';

-- ============================================================
-- 6. projects → health_score
-- ============================================================
ALTER TABLE projects
  ADD COLUMN IF NOT EXISTS health_score INTEGER
    CHECK (health_score BETWEEN 0 AND 100);

COMMENT ON COLUMN projects.health_score IS
  'Puntuación de salud del proyecto de 0 a 100 calculada por el agente IA. '
  'Considera: % entregables aprobados, días de retraso, revisiones consumidas y '
  'satisfacción del cliente. NULL = aún no calculado.';

-- ============================================================
-- Indexes
-- ============================================================

-- leads: filtrar leads con bounces activos (pocos en producción → parcial)
CREATE INDEX IF NOT EXISTS idx_leads_email_bounced
  ON leads(email_bounced)
  WHERE email_bounced = TRUE;

-- leads: filtrar leads no suscritos (exclusión de campañas → parcial)
CREATE INDEX IF NOT EXISTS idx_leads_unsubscribed
  ON leads(unsubscribed)
  WHERE unsubscribed = TRUE;

-- projects: dashboard de proyectos en riesgo (minoría → parcial)
CREATE INDEX IF NOT EXISTS idx_projects_churn_risk
  ON projects(churn_risk)
  WHERE churn_risk = TRUE;

-- projects: ordenar/filtrar por health score (query frecuente en dashboard)
CREATE INDEX IF NOT EXISTS idx_projects_health_score
  ON projects(health_score);

-- ============================================================
-- Verificación (comentada — ejecutar manualmente para validar)
-- ============================================================
-- SELECT column_name, table_name, data_type, column_default, is_nullable
-- FROM information_schema.columns
-- WHERE table_name IN ('leads', 'creator_payments', 'creators', 'projects')
--   AND column_name IN (
--     'email_bounced',
--     'unsubscribed',
--     'idempotency_key',
--     'ai_notes',
--     'churn_risk',
--     'health_score'
--   )
-- ORDER BY table_name, column_name;
--
-- -- Verificar índices creados
-- SELECT indexname, tablename, indexdef
-- FROM pg_indexes
-- WHERE tablename IN ('leads', 'creator_payments', 'projects')
--   AND indexname IN (
--     'idx_leads_email_bounced',
--     'idx_leads_unsubscribed',
--     'uidx_creator_payments_idempotency_key',
--     'idx_projects_churn_risk',
--     'idx_projects_health_score'
--   )
-- ORDER BY tablename, indexname;
