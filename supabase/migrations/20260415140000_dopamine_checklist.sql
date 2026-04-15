-- Migration: Agregar checklist dopamínico persistente a content_scripts
-- Date: 2026-04-15
--
-- Campo jsonb con 6 flags booleanos:
--   pattern_interrupt, curiosity_gap, reframe, micro_payoff, closed_loop, cta_low_friction

ALTER TABLE content_scripts
  ADD COLUMN IF NOT EXISTS dopamine_checklist JSONB NOT NULL DEFAULT '{}'::jsonb;

COMMENT ON COLUMN content_scripts.dopamine_checklist IS
  'Checklist dopamínico. Claves: pattern_interrupt, curiosity_gap, reframe, micro_payoff, closed_loop, cta_low_friction. Valor: bool.';
