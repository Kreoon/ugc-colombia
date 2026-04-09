-- Migration: Init extensions
-- Date: 2026-04-08
-- Author: Alexander Cast
-- Project: UGC Colombia

-- ============================================================
-- Extensions requeridas
-- ============================================================

-- UUID v4 via gen_random_uuid() — disponible en PostgreSQL 13+
-- En Supabase ya viene habilitada por defecto, pero la declaramos
-- explícitamente para garantizar portabilidad.
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Criptografía adicional (hashing, HMAC) — usada en tokens internos
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- pg_stat_statements — métricas de queries (útil en producción)
-- Comentar si no se requiere en el proyecto
-- CREATE EXTENSION IF NOT EXISTS "pg_stat_statements";
