-- =============================================================================
-- Migración: Secuencias de email + Newsletter
-- Fecha: 2026-04-13
-- =============================================================================

-- Secuencias de nurturing (drip emails)
CREATE TABLE IF NOT EXISTS email_sequences (
  id              UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  lead_id         UUID NOT NULL REFERENCES leads(id) ON DELETE CASCADE,
  sequence_key    TEXT NOT NULL,
  step_key        TEXT NOT NULL,
  scheduled_at    TIMESTAMPTZ NOT NULL,
  sent_at         TIMESTAMPTZ,
  status          TEXT NOT NULL DEFAULT 'pending'
                  CHECK (status IN ('pending', 'sent', 'failed', 'skipped')),
  error_message   TEXT,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_email_seq_pending
  ON email_sequences(scheduled_at) WHERE status = 'pending';

CREATE INDEX IF NOT EXISTS idx_email_seq_lead
  ON email_sequences(lead_id, sequence_key);

CREATE UNIQUE INDEX IF NOT EXISTS idx_email_seq_unique
  ON email_sequences(lead_id, sequence_key, step_key);

-- Newsletter subscribers (auto-subscribe desde leads)
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id              UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email           TEXT NOT NULL UNIQUE,
  full_name       TEXT,
  industry        TEXT,
  lead_id         UUID REFERENCES leads(id) ON DELETE SET NULL,
  status          TEXT NOT NULL DEFAULT 'active'
                  CHECK (status IN ('active', 'unsubscribed')),
  subscribed_at   TIMESTAMPTZ NOT NULL DEFAULT now(),
  unsubscribed_at TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS idx_newsletter_active
  ON newsletter_subscribers(status) WHERE status = 'active';
