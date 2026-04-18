-- Migration: Stripe Integration — checkout + subscriptions + webhook events
-- Date: 2026-04-18
-- Author: Alexander Cast
-- Project: UGC Colombia
--
-- Tablas:
--   stripe_customers  — map email ↔ stripe_customer_id para reutilizar en futuras subs
--   orders            — una fila por Checkout Session creada (éxito o no)
--   subscriptions     — suscripciones recurrentes activas (espejo local de Stripe)
--   stripe_events     — idempotencia de webhooks (evita doble-procesamiento)
--
-- Diseño:
--   * Todas las escrituras las hace el service role desde /api/webhooks/stripe.
--   * El equipo (authenticated) puede leer para reportes admin.
--   * Self-contained: las FK a leads/clients y el RLS restringido por team_members
--     se aplican condicionalmente al final, solo si esas tablas existen en la DB.
--     Esto permite correr la migración aunque no estén aplicadas las migraciones
--     previas del core (core_tables, admin_system, etc.).

-- ============================================================
-- Table: stripe_customers
-- ============================================================
CREATE TABLE IF NOT EXISTS stripe_customers (
  id                    UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  stripe_customer_id    TEXT        NOT NULL UNIQUE,
  email                 TEXT        NOT NULL,
  lead_id               UUID,
  client_id             UUID,
  metadata              JSONB       NOT NULL DEFAULT '{}'::jsonb,
  created_at            TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at            TIMESTAMPTZ NOT NULL DEFAULT now()
);

COMMENT ON TABLE  stripe_customers IS 'Mapeo email ↔ Stripe Customer. Reutilizado entre sesiones y subs.';
COMMENT ON COLUMN stripe_customers.stripe_customer_id IS 'ID del Customer en Stripe (cus_...)';
COMMENT ON COLUMN stripe_customers.lead_id   IS 'Lead asociado si el email llegó primero como lead (FK opcional)';
COMMENT ON COLUMN stripe_customers.client_id IS 'Cliente creado tras onboarding (FK opcional)';

CREATE INDEX IF NOT EXISTS idx_stripe_customers_email      ON stripe_customers(email);
CREATE INDEX IF NOT EXISTS idx_stripe_customers_lead_id    ON stripe_customers(lead_id);
CREATE INDEX IF NOT EXISTS idx_stripe_customers_client_id  ON stripe_customers(client_id);

-- ============================================================
-- Table: orders
-- Una fila por intento de compra (Stripe Checkout Session).
-- Se inserta en create-session (status=pending) y se actualiza
-- desde el webhook cuando llega checkout.session.completed / invoice.paid.
-- ============================================================
CREATE TABLE IF NOT EXISTS orders (
  id                        UUID          DEFAULT gen_random_uuid() PRIMARY KEY,
  stripe_session_id         TEXT          NOT NULL UNIQUE,
  stripe_payment_intent_id  TEXT,
  stripe_subscription_id    TEXT,
  stripe_customer_id        TEXT,

  email                     TEXT          NOT NULL,
  plan_id                   TEXT          NOT NULL,   -- 'starter' | 'growth' | 'scale' | 'custom'
  billing_interval_count    INTEGER       NOT NULL DEFAULT 1,  -- 1, 3, 6, 12 meses por ciclo
  amount_total              NUMERIC(14,2) NOT NULL,   -- monto cobrado (unidad mayor: dólares o pesos, no centavos)
  currency                  TEXT          NOT NULL,   -- 'USD' | 'COP'
  status                    TEXT          NOT NULL DEFAULT 'pending'
                                          CHECK (status IN ('pending', 'paid', 'failed', 'expired', 'refunded')),

  videos_count              INTEGER,                  -- solo para plan 'custom'
  metadata                  JSONB         NOT NULL DEFAULT '{}'::jsonb,

  lead_id                   UUID,
  client_id                 UUID,

  paid_at                   TIMESTAMPTZ,
  expires_at                TIMESTAMPTZ,
  created_at                TIMESTAMPTZ   NOT NULL DEFAULT now(),
  updated_at                TIMESTAMPTZ   NOT NULL DEFAULT now()
);

COMMENT ON TABLE  orders IS 'Checkout Sessions de Stripe — una fila por intento de compra';
COMMENT ON COLUMN orders.amount_total IS 'Monto en unidad mayor (USD / COP), no centavos';
COMMENT ON COLUMN orders.plan_id      IS 'Slug del plan: starter | growth | scale | custom';
COMMENT ON COLUMN orders.billing_interval_count IS 'Duración del ciclo en meses: 1, 3, 6 o 12 (define descuento por compromiso)';

CREATE INDEX IF NOT EXISTS idx_orders_email               ON orders(email);
CREATE INDEX IF NOT EXISTS idx_orders_status              ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_plan_id             ON orders(plan_id);
CREATE INDEX IF NOT EXISTS idx_orders_customer            ON orders(stripe_customer_id);
CREATE INDEX IF NOT EXISTS idx_orders_subscription        ON orders(stripe_subscription_id);
CREATE INDEX IF NOT EXISTS idx_orders_created_at          ON orders(created_at DESC);

-- ============================================================
-- Table: subscriptions
-- Espejo local de las suscripciones activas (monthly recurring).
-- ============================================================
CREATE TABLE IF NOT EXISTS subscriptions (
  id                        UUID          DEFAULT gen_random_uuid() PRIMARY KEY,
  stripe_subscription_id    TEXT          NOT NULL UNIQUE,
  stripe_customer_id        TEXT          NOT NULL,
  stripe_price_id           TEXT,

  email                     TEXT          NOT NULL,
  plan_id                   TEXT          NOT NULL,
  currency                  TEXT          NOT NULL,
  billing_interval_count    INTEGER       NOT NULL DEFAULT 1,
  amount                    NUMERIC(14,2) NOT NULL DEFAULT 0,

  status                    TEXT          NOT NULL
                                          CHECK (status IN (
                                            'trialing', 'active', 'past_due',
                                            'canceled', 'incomplete', 'incomplete_expired',
                                            'unpaid', 'paused'
                                          )),
  cancel_at_period_end      BOOLEAN       NOT NULL DEFAULT false,
  current_period_start      TIMESTAMPTZ,
  current_period_end        TIMESTAMPTZ,
  canceled_at               TIMESTAMPTZ,

  client_id                 UUID,
  metadata                  JSONB         NOT NULL DEFAULT '{}'::jsonb,

  created_at                TIMESTAMPTZ   NOT NULL DEFAULT now(),
  updated_at                TIMESTAMPTZ   NOT NULL DEFAULT now()
);

COMMENT ON TABLE subscriptions IS 'Espejo local de Stripe Subscriptions — fuente de verdad para portal admin';
COMMENT ON COLUMN subscriptions.billing_interval_count IS 'Duración del ciclo en meses (1/3/6/12)';

CREATE INDEX IF NOT EXISTS idx_subscriptions_email       ON subscriptions(email);
CREATE INDEX IF NOT EXISTS idx_subscriptions_status      ON subscriptions(status);
CREATE INDEX IF NOT EXISTS idx_subscriptions_customer    ON subscriptions(stripe_customer_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_plan_id     ON subscriptions(plan_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_period_end  ON subscriptions(current_period_end);

-- ============================================================
-- Table: stripe_events
-- Idempotencia de webhooks: cada stripe_event_id se procesa máximo una vez.
-- ============================================================
CREATE TABLE IF NOT EXISTS stripe_events (
  id                 UUID          DEFAULT gen_random_uuid() PRIMARY KEY,
  stripe_event_id    TEXT          NOT NULL UNIQUE,
  type               TEXT          NOT NULL,
  payload            JSONB         NOT NULL,
  received_at        TIMESTAMPTZ   NOT NULL DEFAULT now(),
  processed_at       TIMESTAMPTZ,
  error              TEXT
);

COMMENT ON TABLE stripe_events IS 'Eventos crudos de Stripe para idempotencia + debugging';

CREATE INDEX IF NOT EXISTS idx_stripe_events_type          ON stripe_events(type);
CREATE INDEX IF NOT EXISTS idx_stripe_events_received_at   ON stripe_events(received_at DESC);
CREATE INDEX IF NOT EXISTS idx_stripe_events_processed     ON stripe_events(processed_at) WHERE processed_at IS NULL;

-- ============================================================
-- Trigger: updated_at
-- ============================================================
CREATE OR REPLACE FUNCTION touch_updated_at() RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS tr_stripe_customers_updated_at ON stripe_customers;
CREATE TRIGGER tr_stripe_customers_updated_at
  BEFORE UPDATE ON stripe_customers
  FOR EACH ROW EXECUTE FUNCTION touch_updated_at();

DROP TRIGGER IF EXISTS tr_orders_updated_at ON orders;
CREATE TRIGGER tr_orders_updated_at
  BEFORE UPDATE ON orders
  FOR EACH ROW EXECUTE FUNCTION touch_updated_at();

DROP TRIGGER IF EXISTS tr_subscriptions_updated_at ON subscriptions;
CREATE TRIGGER tr_subscriptions_updated_at
  BEFORE UPDATE ON subscriptions
  FOR EACH ROW EXECUTE FUNCTION touch_updated_at();

-- ============================================================
-- RLS — lectura para el equipo, escritura sólo service_role
-- ============================================================
ALTER TABLE stripe_customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders           ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions    ENABLE ROW LEVEL SECURITY;
ALTER TABLE stripe_events    ENABLE ROW LEVEL SECURITY;

-- stripe_customers
DROP POLICY IF EXISTS "Team can view stripe_customers" ON stripe_customers;
CREATE POLICY "Team can view stripe_customers"
  ON stripe_customers FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "Service role full access on stripe_customers" ON stripe_customers;
CREATE POLICY "Service role full access on stripe_customers"
  ON stripe_customers FOR ALL USING (auth.role() = 'service_role');

-- orders
DROP POLICY IF EXISTS "Team can view orders" ON orders;
CREATE POLICY "Team can view orders"
  ON orders FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "Service role full access on orders" ON orders;
CREATE POLICY "Service role full access on orders"
  ON orders FOR ALL USING (auth.role() = 'service_role');

-- subscriptions
DROP POLICY IF EXISTS "Team can view subscriptions" ON subscriptions;
CREATE POLICY "Team can view subscriptions"
  ON subscriptions FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "Service role full access on subscriptions" ON subscriptions;
CREATE POLICY "Service role full access on subscriptions"
  ON subscriptions FOR ALL USING (auth.role() = 'service_role');

-- stripe_events — fallback: lectura authenticated general. Si existe team_members
-- al momento de correr el bloque condicional de abajo, se reemplaza por una
-- política estricta (founders only).
DROP POLICY IF EXISTS "Authenticated can view stripe_events" ON stripe_events;
DROP POLICY IF EXISTS "Founders can view stripe_events" ON stripe_events;
CREATE POLICY "Authenticated can view stripe_events"
  ON stripe_events FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "Service role full access on stripe_events" ON stripe_events;
CREATE POLICY "Service role full access on stripe_events"
  ON stripe_events FOR ALL USING (auth.role() = 'service_role');

-- ============================================================
-- Bloques condicionales: FK y RLS estricto solo si las tablas referenciadas existen.
-- ============================================================

-- FK a leads
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'leads') THEN
    IF NOT EXISTS (
      SELECT 1 FROM information_schema.table_constraints
      WHERE table_schema = 'public' AND table_name = 'stripe_customers'
        AND constraint_name = 'stripe_customers_lead_id_fkey'
    ) THEN
      ALTER TABLE stripe_customers
        ADD CONSTRAINT stripe_customers_lead_id_fkey
        FOREIGN KEY (lead_id) REFERENCES leads(id) ON DELETE SET NULL;
    END IF;

    IF NOT EXISTS (
      SELECT 1 FROM information_schema.table_constraints
      WHERE table_schema = 'public' AND table_name = 'orders'
        AND constraint_name = 'orders_lead_id_fkey'
    ) THEN
      ALTER TABLE orders
        ADD CONSTRAINT orders_lead_id_fkey
        FOREIGN KEY (lead_id) REFERENCES leads(id) ON DELETE SET NULL;
    END IF;
  END IF;
END $$;

-- FK a clients
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'clients') THEN
    IF NOT EXISTS (
      SELECT 1 FROM information_schema.table_constraints
      WHERE table_schema = 'public' AND table_name = 'stripe_customers'
        AND constraint_name = 'stripe_customers_client_id_fkey'
    ) THEN
      ALTER TABLE stripe_customers
        ADD CONSTRAINT stripe_customers_client_id_fkey
        FOREIGN KEY (client_id) REFERENCES clients(id) ON DELETE SET NULL;
    END IF;

    IF NOT EXISTS (
      SELECT 1 FROM information_schema.table_constraints
      WHERE table_schema = 'public' AND table_name = 'orders'
        AND constraint_name = 'orders_client_id_fkey'
    ) THEN
      ALTER TABLE orders
        ADD CONSTRAINT orders_client_id_fkey
        FOREIGN KEY (client_id) REFERENCES clients(id) ON DELETE SET NULL;
    END IF;

    IF NOT EXISTS (
      SELECT 1 FROM information_schema.table_constraints
      WHERE table_schema = 'public' AND table_name = 'subscriptions'
        AND constraint_name = 'subscriptions_client_id_fkey'
    ) THEN
      ALTER TABLE subscriptions
        ADD CONSTRAINT subscriptions_client_id_fkey
        FOREIGN KEY (client_id) REFERENCES clients(id) ON DELETE SET NULL;
    END IF;
  END IF;
END $$;

-- RLS estricto para stripe_events si existe team_members con rol founder
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'team_members') THEN
    DROP POLICY IF EXISTS "Authenticated can view stripe_events" ON stripe_events;
    DROP POLICY IF EXISTS "Founders can view stripe_events" ON stripe_events;
    EXECUTE $pol$
      CREATE POLICY "Founders can view stripe_events"
        ON stripe_events FOR SELECT TO authenticated
        USING (
          EXISTS (
            SELECT 1 FROM team_members tm
            WHERE tm.user_id = auth.uid()
              AND tm.role = 'founder'
          )
        )
    $pol$;
  END IF;
END $$;
