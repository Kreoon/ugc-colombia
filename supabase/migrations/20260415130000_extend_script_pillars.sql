-- Migration: Extender check constraint de content_scripts.pillar
-- Date: 2026-04-15
-- Agregar los 5 pilares oficiales de UGC Colombia que los packs virales usan.

ALTER TABLE content_scripts
  DROP CONSTRAINT IF EXISTS content_scripts_pillar_check;

ALTER TABLE content_scripts
  ADD CONSTRAINT content_scripts_pillar_check
    CHECK (pillar IN (
      -- Tipos de formato (v1)
      'educativo',
      'provocacion',
      'caso_exito',
      'bts',
      'autoridad',
      'comunidad',
      'prueba_social',
      -- Pilares UGC Colombia (v2 — packs virales por persona)
      'craft_visible',
      'data_angulos',
      'casos_resultados',
      'equipo_cultura',
      'oferta_conversion'
    ));

COMMENT ON COLUMN content_scripts.pillar IS
  'v1 (guiones legacy): educativo|provocacion|caso_exito|bts|autoridad|comunidad|prueba_social. v2 (packs virales por persona): craft_visible|data_angulos|casos_resultados|equipo_cultura|oferta_conversion.';
