import { NextRequest, NextResponse } from "next/server";
import type Stripe from "stripe";
import { getStripe } from "@/lib/stripe/server";
import { fromStripeAmount } from "@/lib/stripe/plans";
import {
  isRelevantEvent,
  normalizeSubscriptionStatus,
} from "@/lib/stripe/events";
import { createSupabaseServiceRole } from "@/lib/supabase-server";
import type { Currency } from "@/lib/pricing/currency-config";

export const runtime = "nodejs";
// Next.js App Router: el body debe llegar crudo para verificar la firma.
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const signature = req.headers.get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!signature) {
    return NextResponse.json(
      { error: "Falta cabecera stripe-signature" },
      { status: 400 },
    );
  }
  if (!webhookSecret) {
    console.error("[webhook/stripe] STRIPE_WEBHOOK_SECRET no configurado");
    return NextResponse.json({ error: "Webhook no configurado" }, { status: 500 });
  }

  const rawBody = await req.text();
  const stripe = getStripe();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
  } catch (err) {
    console.error("[webhook/stripe] Firma inválida:", err);
    return NextResponse.json({ error: "Firma inválida" }, { status: 400 });
  }

  const supabase = createSupabaseServiceRole();

  // Idempotencia: si ya procesamos este event_id, responder 200 sin repetir trabajo.
  const { data: existingEvent } = await supabase
    .from("stripe_events")
    .select("id, processed_at")
    .eq("stripe_event_id", event.id)
    .maybeSingle();

  if (existingEvent?.processed_at) {
    return NextResponse.json({ received: true, duplicate: true });
  }

  // Registra el evento ANTES de procesarlo; si algo falla, queda trazado.
  if (!existingEvent) {
    await supabase.from("stripe_events").insert({
      stripe_event_id: event.id,
      type: event.type,
      payload: event as unknown as Record<string, unknown>,
    });
  }

  if (!isRelevantEvent(event.type)) {
    // Ignorar eventos que no nos interesan, pero marcarlos como procesados.
    await supabase
      .from("stripe_events")
      .update({ processed_at: new Date().toISOString() })
      .eq("stripe_event_id", event.id);
    return NextResponse.json({ received: true, ignored: true });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed":
        await onCheckoutCompleted(event.data.object, supabase);
        break;
      case "checkout.session.expired":
        await onCheckoutExpired(event.data.object, supabase);
        break;
      case "invoice.paid":
        await onInvoicePaid(event.data.object, supabase);
        break;
      case "invoice.payment_failed":
        await onInvoicePaymentFailed(event.data.object, supabase);
        break;
      case "customer.subscription.created":
      case "customer.subscription.updated":
        await onSubscriptionUpserted(event.data.object, supabase);
        break;
      case "customer.subscription.deleted":
        await onSubscriptionDeleted(event.data.object, supabase);
        break;
      default:
        break;
    }

    await supabase
      .from("stripe_events")
      .update({ processed_at: new Date().toISOString() })
      .eq("stripe_event_id", event.id);

    await notifyN8n(event).catch((err) =>
      console.error("[webhook/stripe] n8n dispatch error:", err),
    );

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error(`[webhook/stripe] Handler error for ${event.type}:`, err);
    const message = err instanceof Error ? err.message : String(err);
    await supabase
      .from("stripe_events")
      .update({ error: message })
      .eq("stripe_event_id", event.id);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Handlers
// ─────────────────────────────────────────────────────────────────────────────

type SupabaseService = ReturnType<typeof createSupabaseServiceRole>;

async function onCheckoutCompleted(
  session: Stripe.Checkout.Session,
  supabase: SupabaseService,
) {
  const currency = (session.metadata?.currency ?? "USD") as Currency;
  const subscriptionId =
    typeof session.subscription === "string"
      ? session.subscription
      : session.subscription?.id ?? null;
  const paymentIntentId =
    typeof session.payment_intent === "string"
      ? session.payment_intent
      : session.payment_intent?.id ?? null;
  const customerId =
    typeof session.customer === "string"
      ? session.customer
      : session.customer?.id ?? null;

  await supabase
    .from("orders")
    .update({
      status: session.payment_status === "paid" ? "paid" : "pending",
      stripe_subscription_id: subscriptionId,
      stripe_payment_intent_id: paymentIntentId,
      stripe_customer_id: customerId,
      amount_total: session.amount_total
        ? fromStripeAmount(session.amount_total, currency)
        : 0,
      paid_at:
        session.payment_status === "paid" ? new Date().toISOString() : null,
    })
    .eq("stripe_session_id", session.id);
}

async function onCheckoutExpired(
  session: Stripe.Checkout.Session,
  supabase: SupabaseService,
) {
  await supabase
    .from("orders")
    .update({ status: "expired" })
    .eq("stripe_session_id", session.id);
}

/**
 * En API 2025+ `invoice.subscription` se movió a
 * `invoice.parent.subscription_details.subscription`. Esta función encapsula
 * esa resolución y cae a campos legacy si el SDK mantiene compatibilidad.
 */
function getInvoiceSubscriptionId(invoice: Stripe.Invoice): string | null {
  const parent = (invoice as unknown as {
    parent?: {
      subscription_details?: { subscription?: string | { id: string } | null };
    };
  }).parent;
  const fromParent = parent?.subscription_details?.subscription;
  if (typeof fromParent === "string") return fromParent;
  if (fromParent && typeof fromParent === "object" && "id" in fromParent) {
    return fromParent.id;
  }
  const legacy = (invoice as unknown as { subscription?: string | { id: string } | null })
    .subscription;
  if (typeof legacy === "string") return legacy;
  if (legacy && typeof legacy === "object" && "id" in legacy) return legacy.id;
  return null;
}

async function onInvoicePaid(
  invoice: Stripe.Invoice,
  supabase: SupabaseService,
) {
  const subscriptionId = getInvoiceSubscriptionId(invoice);
  if (!subscriptionId) return;

  // Marca la order asociada como paid (útil para primer cobro cuando
  // checkout.session.completed llega con payment_status=unpaid y se confirma luego).
  await supabase
    .from("orders")
    .update({
      status: "paid",
      paid_at: new Date().toISOString(),
    })
    .eq("stripe_subscription_id", subscriptionId)
    .eq("status", "pending");
}

async function onInvoicePaymentFailed(
  invoice: Stripe.Invoice,
  supabase: SupabaseService,
) {
  const subscriptionId = getInvoiceSubscriptionId(invoice);
  if (!subscriptionId) return;

  await supabase
    .from("subscriptions")
    .update({ status: "past_due" })
    .eq("stripe_subscription_id", subscriptionId);
}

async function onSubscriptionUpserted(
  sub: Stripe.Subscription,
  supabase: SupabaseService,
) {
  const item = sub.items.data[0];
  const currency = (sub.metadata?.currency as Currency) ?? "USD";
  const amount = item?.price.unit_amount
    ? fromStripeAmount(item.price.unit_amount, currency)
    : 0;

  const customerId =
    typeof sub.customer === "string" ? sub.customer : sub.customer.id;

  // API 2025+ movió current_period_* a items.data[i]. Cast defensivo por si
  // el SDK sirve aún ambos esquemas según el Stripe-Version del request.
  const itemWithPeriod = item as unknown as {
    current_period_start?: number | null;
    current_period_end?: number | null;
  };
  const legacySub = sub as unknown as {
    current_period_start?: number | null;
    current_period_end?: number | null;
  };
  const periodStart =
    itemWithPeriod.current_period_start ?? legacySub.current_period_start ?? null;
  const periodEnd =
    itemWithPeriod.current_period_end ?? legacySub.current_period_end ?? null;

  // Busca el email desde stripe_customers para no depender del objeto Stripe.
  const { data: customer } = await supabase
    .from("stripe_customers")
    .select("email")
    .eq("stripe_customer_id", customerId)
    .maybeSingle();

  await supabase
    .from("subscriptions")
    .upsert(
      {
        stripe_subscription_id: sub.id,
        stripe_customer_id: customerId,
        stripe_price_id: item?.price.id ?? null,
        email: customer?.email ?? sub.metadata?.email ?? "",
        plan_id: (sub.metadata?.plan_id as string) ?? "unknown",
        currency,
        amount,
        status: normalizeSubscriptionStatus(sub.status),
        cancel_at_period_end: sub.cancel_at_period_end,
        current_period_start: periodStart
          ? new Date(periodStart * 1000).toISOString()
          : null,
        current_period_end: periodEnd
          ? new Date(periodEnd * 1000).toISOString()
          : null,
        canceled_at: sub.canceled_at
          ? new Date(sub.canceled_at * 1000).toISOString()
          : null,
        metadata: sub.metadata ?? {},
      },
      { onConflict: "stripe_subscription_id" },
    );
}

async function onSubscriptionDeleted(
  sub: Stripe.Subscription,
  supabase: SupabaseService,
) {
  await supabase
    .from("subscriptions")
    .update({
      status: "canceled",
      canceled_at: new Date().toISOString(),
    })
    .eq("stripe_subscription_id", sub.id);
}

// ─────────────────────────────────────────────────────────────────────────────
// n8n dispatch — best-effort. No bloquea la respuesta a Stripe si n8n falla.
// ─────────────────────────────────────────────────────────────────────────────

async function notifyN8n(event: Stripe.Event) {
  const url = process.env.N8N_STRIPE_WEBHOOK_URL;
  if (!url) return;

  const payload = buildN8nPayload(event);
  if (!payload) return;

  await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(process.env.N8N_WEBHOOK_SECRET
        ? { "x-webhook-secret": process.env.N8N_WEBHOOK_SECRET }
        : {}),
    },
    body: JSON.stringify(payload),
  });
}

function buildN8nPayload(event: Stripe.Event): Record<string, unknown> | null {
  switch (event.type) {
    case "checkout.session.completed": {
      const s = event.data.object as Stripe.Checkout.Session;
      if (s.payment_status !== "paid") return null;
      return {
        kind: "checkout_paid",
        stripe_session_id: s.id,
        stripe_subscription_id:
          typeof s.subscription === "string" ? s.subscription : null,
        stripe_customer_id:
          typeof s.customer === "string" ? s.customer : null,
        email: s.customer_details?.email ?? s.customer_email ?? null,
        name: s.customer_details?.name ?? null,
        amount_total: s.amount_total,
        currency: (s.metadata?.currency ?? s.currency ?? "USD")
          .toString()
          .toUpperCase(),
        plan_id: s.metadata?.plan_id ?? null,
        plan_label: s.metadata?.plan_label ?? null,
        videos_per_month: s.metadata?.videos_per_month ?? null,
        company: s.metadata?.company ?? null,
        country: s.metadata?.country ?? null,
        whatsapp: s.metadata?.whatsapp ?? null,
      };
    }
    case "customer.subscription.deleted": {
      const sub = event.data.object as Stripe.Subscription;
      return {
        kind: "subscription_canceled",
        stripe_subscription_id: sub.id,
        stripe_customer_id:
          typeof sub.customer === "string" ? sub.customer : sub.customer.id,
        canceled_at: sub.canceled_at,
      };
    }
    default:
      return null;
  }
}
