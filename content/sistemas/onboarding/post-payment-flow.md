---
title: "Onboarding post-pago — Flujo cliente"
slug: post-payment-flow
owner: Alexander Cast
updated: 2026-04-18
---

# Onboarding post-pago

Qué ve el cliente después de pagar y qué se dispara internamente.

## 1) Experiencia del cliente en `/gracias-pago`

1. **Confirmación visual** — check verde + nombre del cliente si viene del Checkout Session.
2. **Resumen de la compra** — plan, mensualidad, videos/mes (para plan custom).
3. **CTA principal: Agendar kickoff call** — Cal.com event `kickoff-alexander` (30 min).
4. **Roadmap de 5 pasos** (Día 0, 1-2, 3-7, 7-14, 30) — deja clara la promesa.
5. **WhatsApp con asesora (Diana)** + **comunidad de marcas**.

La URL siempre recibe `?session_id=cs_...` de Stripe y recupera el detalle via `GET /api/checkout/session/[id]`.

## 2) Qué dispara internamente

Cuando el webhook `/api/webhooks/stripe` recibe `checkout.session.completed` con `payment_status=paid`:

1. **Supabase:**
   - `orders` → status `paid`, `paid_at` now, `stripe_subscription_id`, `stripe_payment_intent_id`.
   - `subscriptions` → upsert con plan, status, current_period_end.
   - `stripe_events` → marca `processed_at` (idempotencia).

2. **n8n** (`N8N_STRIPE_WEBHOOK_URL`): payload:
   ```json
   {
     "kind": "checkout_paid",
     "stripe_session_id": "cs_...",
     "stripe_subscription_id": "sub_...",
     "stripe_customer_id": "cus_...",
     "email": "cliente@ejemplo.com",
     "name": "Nombre",
     "amount_total": 40000,
     "currency": "USD",
     "plan_id": "starter",
     "plan_label": null,
     "videos_per_month": null,
     "company": "Marca",
     "country": "CO",
     "whatsapp": "+57..."
   }
   ```

3. **n8n workflow `09-client-onboarded`** (responsabilidad):
   - Crear carpeta Google Drive `/Clientes/{empresa}`.
   - Crear base Notion con template kickoff.
   - Enviar WhatsApp de bienvenida a Diana y Alexander.
   - Template Resend: email al cliente con siguiente paso (link a `/gracias-pago` + Cal.com + WhatsApp).

## 3) Qué NO hace el webhook

- **No promueve automáticamente** lead → cliente en la tabla `clients`. Eso queda para el equipo tras el kickoff call, cuando hay brief real y se activa el contrato.
- **No envía emails** transaccionales desde Next — los envía n8n para unificar templates y tracking.

## 4) Seguridad

- El webhook verifica `stripe-signature` contra `STRIPE_WEBHOOK_SECRET` antes de cualquier operación.
- La tabla `stripe_events` implementa idempotencia: Stripe reintenta hasta 3 días si no recibe 2xx; el evento se procesa sólo una vez.
- El service role de Supabase se usa exclusivamente en Route Handlers server-side (nunca en Client Components).
- El endpoint `/api/checkout/session/[id]` devuelve sólo campos públicos — nunca el raw Stripe Session.

## 5) Edge cases que cubre el handler

- `checkout.session.expired` → `orders.status='expired'`.
- `invoice.payment_failed` → `subscriptions.status='past_due'` (luego operador decide action).
- `customer.subscription.deleted` → `subscriptions.status='canceled'`, `canceled_at=now`.
- Evento duplicado → no vuelve a procesarse (fila en `stripe_events` con `processed_at` ya seteado).
- n8n caído → se loguea el error pero el 200 a Stripe se envía igual (no queremos que Stripe reintente indefinidamente; el equipo puede replay manual desde Dashboard).

## 6) Qué mostrar al cliente si algo falla

- Si el pago pasa pero `/api/checkout/session/[id]` falla, `/gracias-pago` muestra mensaje amarillo: "Tu pago se procesó correctamente. Te escribiremos al email registrado para continuar."
- El cliente siempre recibe el recibo de Stripe aunque nuestro flujo falle.
