-- Migration: Enums / tipos de dominio
-- Date: 2026-04-08
-- Author: Alexander Cast
-- Project: UGC Colombia

-- ============================================================
-- Estrategia: CHECK constraints en lugar de tipos ENUM custom
-- Ventaja: más fáciles de modificar sin ALTER TYPE + migraciones
-- ============================================================

-- Nota: los valores permitidos se documentan aquí como referencia.
-- Los CHECK constraints se aplican directamente en cada tabla.

-- lead_status         : new | contacted | qualified | converted | lost
-- client_status       : active | paused | churned
-- team_role           : founder | manager | coordinator | sales | creative
-- creator_status      : prospect | active | paused | blacklisted
-- creator_tier        : bronze | silver | gold | platinum
-- project_status      : draft | active | in_review | approved | delivered | cancelled
-- deliverable_status  : pending | in_production | submitted | revision | approved | rejected
-- deliverable_type    : video | photo | reel | story | carousel
-- invoice_status      : draft | sent | paid | overdue | cancelled
-- payment_status      : pending | paid | partial | cancelled

-- ============================================================
-- No se crean tipos PostgreSQL nativos (CREATE TYPE ... AS ENUM)
-- para mantener flexibilidad en ALTER sin downtime.
-- ============================================================

SELECT 'enums documentation loaded — constraints applied per table' AS status;
