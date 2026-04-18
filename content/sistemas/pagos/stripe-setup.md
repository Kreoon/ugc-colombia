---
title: "Stripe — Setup y operación"
slug: stripe-setup
owner: Alexander Cast
stack: Stripe USA (LLC) + Next.js 15 + Supabase + n8n
updated: 2026-04-18
---

# Stripe — Setup y operación

Runbook del procesador de pagos del sitio `ugccolombia.co`.

- **Cuenta:** Stripe USA (LLC Alexander Cast Holdings) — `acct_1TNLByRJEy1eltlX`.
- **Moneda base:** USD (settlement). Prices en USD y COP.
- **Modelo:** Stripe Subscription recurrente. Cuatro ciclos por plan (1, 3, 6, 12 meses).
- **Descuentos por compromiso:** 3 m −20 %, 6 m −30 %, 12 m −40 %.
- **Métodos activos:** tarjeta internacional, Stripe Link, Apple Pay, Google Pay.
  No se usan pasarelas colombianas (PSE / Nequi / Wompi / Bold) porque la cuenta es americana.
- **Facturación:** Stripe envía recibo por email al cliente. No se integra DIAN.

> ⚠️ Cuidado con COP: **NO es zero-decimal en Stripe**. Todos los montos se
> expresan en minor units (× 100). Un price de $1.590.000 COP se envía como
> `unit_amount: 159_000_000`.

## 1) Productos y prices (creados vía Stripe MCP — live)

### Productos

| Plan | Product ID |
|------|------------|
| UGC Colombia · Inicio (Starter) | `prod_UM4Lbpk9DX3wSp` |
| UGC Colombia · Crecimiento (Growth) | `prod_UM4L4Fu9NGzbPX` |
| UGC Colombia · Escala (Scale) | `prod_UM4Llf7IybGPmV` |

### Prices — USD (12)

| Plan | Ciclo | Total ciclo | Equivalente mensual | Price ID |
|------|-------|-------------|---------------------|----------|
| Starter | 1 mes | $590 | $590 | `price_1TNMDKRJEy1eltlX5aXC5WJN` |
| Starter | 3 meses (−20%) | $1.416 | $472 | `price_1TNMDLRJEy1eltlXyvFoxMYK` |
| Starter | 6 meses (−30%) | $2.478 | $413 | `price_1TNMDMRJEy1eltlX1ke3r2qN` |
| Starter | 12 meses (−40%) | $4.248 | $354 | `price_1TNMDNRJEy1eltlXEpvjFYoC` |
| Growth  | 1 mes | $890 | $890 | `price_1TNMDORJEy1eltlX34zIuYVo` |
| Growth  | 3 meses (−20%) | $2.136 | $712 | `price_1TNMDPRJEy1eltlXU6NuZiUP` |
| Growth  | 6 meses (−30%) | $3.738 | $623 | `price_1TNMDPRJEy1eltlXYrE3EJPu` |
| Growth  | 12 meses (−40%) | $6.408 | $534 | `price_1TNMDRRJEy1eltlX3WjmXS2e` |
| Scale   | 1 mes | $1.890 | $1.890 | `price_1TNMDRRJEy1eltlXa69122KP` |
| Scale   | 3 meses (−20%) | $4.536 | $1.512 | `price_1TNMDSRJEy1eltlXI8ptudzg` |
| Scale   | 6 meses (−30%) | $7.938 | $1.323 | `price_1TNMDTRJEy1eltlXIu0jGFiV` |
| Scale   | 12 meses (−40%) | $13.608 | $1.134 | `price_1TNMDURJEy1eltlXCDgfGxHk` |

### Prices — COP (12)

| Plan | Ciclo | Total ciclo | Equivalente mensual | Price ID |
|------|-------|-------------|---------------------|----------|
| Starter | 1 mes | $1.590.000 | $1.590.000 | `price_1TNMq0RJEy1eltlXvsYxrjf5` |
| Starter | 3 meses (−20%) | $3.816.000 | $1.272.000 | `price_1TNMq1RJEy1eltlXO59A8bMy` |
| Starter | 6 meses (−30%) | $6.678.000 | $1.113.000 | `price_1TNMq2RJEy1eltlXG5a5x6J6` |
| Starter | 12 meses (−40%) | $11.448.000 | $954.000 | `price_1TNMq3RJEy1eltlXaauRgfIB` |
| Growth  | 1 mes | $2.590.000 | $2.590.000 | `price_1TNMq4RJEy1eltlXB3iSvBf0` |
| Growth  | 3 meses (−20%) | $6.216.000 | $2.072.000 | `price_1TNMq6RJEy1eltlXJcMwUkRQ` |
| Growth  | 6 meses (−30%) | $10.878.000 | $1.813.000 | `price_1TNMq7RJEy1eltlXG3nc4i11` |
| Growth  | 12 meses (−40%) | $18.648.000 | $1.554.000 | `price_1TNMq7RJEy1eltlXTMdWxbsf` |
| Scale   | 1 mes | $5.890.000 | $5.890.000 | `price_1TNMq9RJEy1eltlX5hR6fyHD` |
| Scale   | 3 meses (−20%) | $14.136.000 | $4.712.000 | `price_1TNMqARJEy1eltlXhePHrxDv` |
| Scale   | 6 meses (−30%) | $24.738.000 | $4.123.000 | `price_1TNMqBRJEy1eltlXJyOPBdXo` |
| Scale   | 12 meses (−40%) | $42.408.000 | $3.534.000 | `price_1TNMqCRJEy1eltlXTnrfQ1EC` |

### Plan "A la medida" (calculadora ≥ 50 videos)

Se crea inline con `price_data` en la Checkout Session (no requiere Price
pre-creado). La lógica vive en `web/src/app/api/checkout/custom/route.ts` y
aplica el mismo descuento por compromiso: el backend calcula
`monthlyAmount × duration × (1 − DURATION_DISCOUNT[duration])` y manda
`recurring: { interval: "month", interval_count: duration }`.

## 2) Webhook endpoint

Dashboard → Developers → Webhooks → Add endpoint.

- **URL producción**: `https://ugccolombia.co/api/webhooks/stripe`
- **URL local (Stripe CLI)**: `http://localhost:3000/api/webhooks/stripe`
- **Events to send** (suscribir sólo estos):
  - `checkout.session.completed`
  - `checkout.session.expired`
  - `invoice.paid`
  - `invoice.payment_failed`
  - `customer.subscription.created`
  - `customer.subscription.updated`
  - `customer.subscription.deleted`

Copiar el `Signing secret` (`whsec_...`) al env var `STRIPE_WEBHOOK_SECRET`.

## 3) Variables de entorno

Pegar en `web/.env.local` (local) y en Vercel → Project Settings → Environment
Variables (producción). Los price IDs son los mismos que figuran en la tabla
anterior.

```env
# Stripe — core
STRIPE_SECRET_KEY=sk_live_xxxxxxxxxxxxxxxxxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxxxxxxxxx
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_xxxxxxxxxxxxxxxxxxxx

# Stripe — prices USD (1/3/6/12 meses)
STRIPE_PRICE_STARTER_USD_1M=price_1TNMDKRJEy1eltlX5aXC5WJN
STRIPE_PRICE_STARTER_USD_3M=price_1TNMDLRJEy1eltlXyvFoxMYK
STRIPE_PRICE_STARTER_USD_6M=price_1TNMDMRJEy1eltlX1ke3r2qN
STRIPE_PRICE_STARTER_USD_12M=price_1TNMDNRJEy1eltlXEpvjFYoC
STRIPE_PRICE_GROWTH_USD_1M=price_1TNMDORJEy1eltlX34zIuYVo
STRIPE_PRICE_GROWTH_USD_3M=price_1TNMDPRJEy1eltlXU6NuZiUP
STRIPE_PRICE_GROWTH_USD_6M=price_1TNMDPRJEy1eltlXYrE3EJPu
STRIPE_PRICE_GROWTH_USD_12M=price_1TNMDRRJEy1eltlX3WjmXS2e
STRIPE_PRICE_SCALE_USD_1M=price_1TNMDRRJEy1eltlXa69122KP
STRIPE_PRICE_SCALE_USD_3M=price_1TNMDSRJEy1eltlXI8ptudzg
STRIPE_PRICE_SCALE_USD_6M=price_1TNMDTRJEy1eltlXIu0jGFiV
STRIPE_PRICE_SCALE_USD_12M=price_1TNMDURJEy1eltlXCDgfGxHk

# Stripe — prices COP (1/3/6/12 meses)
STRIPE_PRICE_STARTER_COP_1M=price_1TNMq0RJEy1eltlXvsYxrjf5
STRIPE_PRICE_STARTER_COP_3M=price_1TNMq1RJEy1eltlXO59A8bMy
STRIPE_PRICE_STARTER_COP_6M=price_1TNMq2RJEy1eltlXG5a5x6J6
STRIPE_PRICE_STARTER_COP_12M=price_1TNMq3RJEy1eltlXaauRgfIB
STRIPE_PRICE_GROWTH_COP_1M=price_1TNMq4RJEy1eltlXB3iSvBf0
STRIPE_PRICE_GROWTH_COP_3M=price_1TNMq6RJEy1eltlXJcMwUkRQ
STRIPE_PRICE_GROWTH_COP_6M=price_1TNMq7RJEy1eltlXG3nc4i11
STRIPE_PRICE_GROWTH_COP_12M=price_1TNMq7RJEy1eltlXTMdWxbsf
STRIPE_PRICE_SCALE_COP_1M=price_1TNMq9RJEy1eltlX5hR6fyHD
STRIPE_PRICE_SCALE_COP_3M=price_1TNMqARJEy1eltlXhePHrxDv
STRIPE_PRICE_SCALE_COP_6M=price_1TNMqBRJEy1eltlXJyOPBdXo
STRIPE_PRICE_SCALE_COP_12M=price_1TNMqCRJEy1eltlXTnrfQ1EC

# n8n (dispara workflow 09-client-onboarded al primer cobro exitoso)
N8N_STRIPE_WEBHOOK_URL=https://dev.kreoon.com/webhook/stripe-payment

# Cal.com
NEXT_PUBLIC_CALCOM_KICKOFF_LINK=https://cal.com/ugccolombia/kickoff
```

En `test mode` se reemplazan `sk_live_`, `pk_live_`, `whsec_live_` por los
`test` correspondientes y se crean prices paralelos en el panel de test (no
están creados todavía — si quieres probar con tarjeta `4242…`, crea 24 prices
equivalentes en test mode).

## 4) Pruebas locales (Stripe CLI)

```bash
# Instalar CLI (una vez)
scoop install stripe        # Windows
# brew install stripe/stripe-cli/stripe   # macOS

# Autenticar
stripe login

# Forward de eventos al endpoint local
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

El CLI imprime el `whsec_...` temporal que debes pegar en `.env.local` mientras
estés en dev.

### Tarjetas de prueba

| Escenario | Número |
|-----------|--------|
| Aprobada | `4242 4242 4242 4242` |
| Requiere 3DS | `4000 0025 0000 3155` |
| Declinada | `4000 0000 0000 9995` |

CVC cualquiera, fecha cualquiera futura, ZIP cualquiera.

## 5) Flujo end-to-end esperado

1. Cliente entra a `/precios` o usa la calculadora.
2. Selecciona **plan + duración (1/3/6/12 meses)** — el descuento se aplica
   automáticamente y queda visible en la UI.
3. Clic en CTA → `/checkout/[plan]?duration=N&currency=X` o
   `/checkout/custom?videos=N&currency=X&duration=M`.
4. Completa form → `POST /api/checkout/create-session`
   (o `/api/checkout/custom`) con `duration` en el body.
5. Redirect a Stripe Hosted Checkout → paga.
6. Stripe redirige a `/gracias-pago?session_id=cs_...`.
7. Stripe envía evento `checkout.session.completed` → `/api/webhooks/stripe`:
   - Actualiza `orders.status = 'paid'` + `billing_interval_count` en Supabase.
   - Upsert de la subscription en tabla `subscriptions`.
   - Dispara `POST $N8N_STRIPE_WEBHOOK_URL` con payload del cliente.
8. n8n ejecuta `09-client-onboarded`: crea carpeta Drive, Notion board,
   WhatsApp bienvenida, email Resend.
9. Cliente agenda kickoff call desde `/gracias-pago` (Cal.com).

## 6) Checklist Go-live

- [x] Productos y 24 prices creados en modo **live** (ver tablas arriba).
- [ ] Webhook live apuntando a `https://ugccolombia.co/api/webhooks/stripe`.
- [ ] Variables en Vercel (production) con `sk_live_...`, `whsec_...`, `pk_live_...`
      y las 24 `STRIPE_PRICE_*_{USD,COP}_{1M,3M,6M,12M}`.
- [ ] Smoke test: comprar plan Starter 1m con tarjeta propia y verificar
      `orders.status = 'paid'` + webhook disparado a n8n.
- [ ] Smoke test: comprar plan Growth 3m y verificar que Stripe cobra
      `$2.136 USD` / `$6.216.000 COP` y `billing_interval_count = 3`.
- [ ] Reembolsar desde Dashboard y verificar que la fila `orders` no se rompe.
- [ ] Documentar el flujo de cancelación manual (sub → Cancel immediately)
      hasta que salga el Customer Portal.

## 7) Operación diaria

- **Ver pagos:** Dashboard → Payments (filtrar por estado).
- **Cancelar sub:** Dashboard → Customers → Subscriptions → ⋯ → Cancel
  (decidir immediate vs end-of-period).
- **Reembolso:** Dashboard → Payments → seleccionar → Refund.
- **Cambiar plan/duración de cliente:** Dashboard → Subscriptions → Update →
  nuevo Price (proration inmediata por default).
- **Recibos:** Stripe envía automáticamente. Se puede reenviar desde
  Dashboard → Customers → Invoice → Send.

## 8) Pendientes (v2)

- Stripe Customer Portal (que el cliente cancele/actualice tarjeta sin
  escribirnos).
- Coupons para descuentos de temporada (black friday, etc.) además del
  descuento por compromiso.
- Upsell proration mid-cycle desde UI admin (cambio Starter → Growth).
- Stripe Connect para pagos a creadores.
- Prices espejo en `test mode` (hoy solo existen en live).
