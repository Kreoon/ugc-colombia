-- =============================================================================
-- Migración: Páginas públicas de diagnóstico
-- Fecha: 2026-04-13
-- =============================================================================

ALTER TABLE leads ADD COLUMN IF NOT EXISTS diagnosis_public BOOLEAN DEFAULT TRUE;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS diagnosis_slug TEXT;

-- Índice para lookups rápidos por slug
CREATE UNIQUE INDEX IF NOT EXISTS idx_leads_diagnosis_slug
  ON leads(diagnosis_slug) WHERE diagnosis_slug IS NOT NULL;

COMMENT ON COLUMN leads.diagnosis_slug IS 'Instagram handle limpio para URL pública: /diagnostico/@handle';
COMMENT ON COLUMN leads.diagnosis_public IS 'Si el diagnóstico es visible públicamente';
