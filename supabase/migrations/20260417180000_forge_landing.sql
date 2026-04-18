-- Migration: Extender tabla leads para soportar landing /forge (regalos públicos)
-- Date: 2026-04-17
--
-- Añade:
--   how_heard             — texto opcional "¿cómo nos conociste?"
--   forge_priority_slot   — bool · true si entra en los primeros 50 (llamada 1:1 con Alexander)
--   forge_project_slug    — texto · qué regalo específico descargó (content-forge, futuros)
--
-- Source convention: 'forge_landing' para todos los leads captados via /forge
-- Se usa para contar los "primeros 50" y para segmentar en reportes.

ALTER TABLE leads
  ADD COLUMN IF NOT EXISTS how_heard          TEXT,
  ADD COLUMN IF NOT EXISTS forge_priority_slot BOOLEAN NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS forge_project_slug TEXT;

COMMENT ON COLUMN leads.how_heard IS
  'Canal donde el lead nos conoció (Instagram, YouTube, referido, etc.) — opcional en formularios de regalos';

COMMENT ON COLUMN leads.forge_priority_slot IS
  'true si el lead entró dentro de los primeros N que descargaron un regalo de Content Forge. Desbloquea llamada 1:1 con Alexander.';

COMMENT ON COLUMN leads.forge_project_slug IS
  'Slug del regalo descargado (ej. "content-forge"). NULL si el lead no viene de /forge.';

-- Índice para el contador público y queries de "primeros N"
CREATE INDEX IF NOT EXISTS idx_leads_source_created
  ON leads(source, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_leads_forge_project
  ON leads(forge_project_slug, created_at DESC)
  WHERE forge_project_slug IS NOT NULL;
