import { NextRequest, NextResponse } from "next/server";
import type Stripe from "stripe";
import { getStripe } from "@/lib/stripe/server";
import { fromStripeAmount } from "@/lib/stripe/plans";
import {
  isRelevantEvent,
  normalizeSubscriptionStatus,
} from "@/lib/stripe/events";
import { createSupabaseServiceRole } from "@/lib/supabase-server";
import { notifyAdmin } from "@/lib/email/stripe-notifications";
import type { Currency } from "@/lib/pricing/currency-config";

export const runtime = "nodejs";
// Next.js App Router: el body debe llegar crudo para verificar la firma.
export const dynamic = "force-dynamic";

type SupabaseService = ReturnType<typeof createSupabaseServiceRole>;

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

  const amountTotal = session.amount_total
    ? fromStripeAmount(session.amount_total, currency)
    : 0;

  await supabase
    .from("orders")
    .update({
      status: session.payment_status === "paid" ? "paid" : "pending",
      stripe_subscription_id: subscriptionId,
      stripe_payment_intent_id: paymentIntentId,
      stripe_customer_id: customerId,
      amount_total: amountTotal,
      paid_at:
        session.payment_status === "paid" ? new Date().toISOString() : null,
    })
    .eq("stripe_session_id", session.id);

  if (session.payment_status === "paid") {
    const meta = session.metadata ?? {};
    await notifyAdmin({
      kind: "purchase",
      email: session.customer_details?.email ?? session.customer_email ?? meta.email ?? null,
      name: session.customer_details?.name ?? meta.name ?? null,
      company: meta.company ?? null,
      plan_id: meta.plan_id ?? null,
      plan_label: meta.plan_label ?? null,
      currency,
      amount: amountTotal,
      billing_interval_count: meta.billing_interval_count
        ? parseInt(meta.billing_interval_count, 10)
        : null,
      videos_per_month: meta.videos_per_month
        ? parseInt(meta.videos_per_month, 10)
        : null,
      whatsapp: meta.whatsapp ?? null,
      country: meta.country ?? null,
      stripe_session_id: session.id,
      stripe_subscription_id: subscriptionId,
      stripe_customer_id: customerId,
    });
  }
}

async function onCheckoutExpired(
  session: Stripe.Checkout.Session,
  supabase: SupabaseService,
) {
  await supabase
    .from("orders")
    .update({ status: "expired" })
    .eq("stripe_session_id", session.id);

  const meta = session.metadata ?? {};
  const currency = (meta.currency ?? "USD") as Currency;

  await notifyAdmin({
    kind: "checkout_expired",
    email: session.customer_details?.email ?? session.customer_email ?? meta.email ?? null,
    name: session.customer_details?.name ?? meta.name ?? null,
    company: meta.company ?? null,
    plan_id: meta.plan_id ?? null,
    plan_label: meta.plan_label ?? null,
    currency,
    amount: session.amount_total ? fromStripeAmount(session.amount_total, currency) : null,
    billing_interval_count: meta.billing_interval_count
      ? parseInt(meta.billing_interval_count, 10)
      : null,
    videos_per_month: meta.videos_per_month
      ? parseInt(meta.videos_per_month, 10)
      : null,
    whatsapp: meta.whatsapp ?? null,
    country: meta.country ?? null,
    stripe_session_id: session.id,
    extra_note:
      "El cliente inició checkout pero no completó el pago en 24h. Considera escribirle directo — Stripe enviará su propio email de recovery si tenemos activados los abandoned cart emails.",
  });
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

function getInvoiceBillingReason(invoice: Stripe.Invoice): string | null {
  return (invoice as unknown as { billing_reason?: string | null }).billing_reason ?? null;
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

  // Solo notificamos renovaciones (no la compra inicial — esa ya se notificó
  // desde checkout.session.completed). billing_reason=subscription_cycle es la
  // renovación recurrente.
  const billingReason = getInvoiceBillingReason(invoice);
  if (billingReason !== "subscription_cycle") return;

  const currency = (invoice.currency?.toUpperCase() ?? "USD") as Currency;
  const amount = invoice.amount_paid
    ? fromStripeAmount(invoice.amount_paid, currency)
    : 0;

  await notifyAdmin({
    kind: "renewal",
    email: invoice.customer_email ?? null,
    name: invoice.customer_name ?? null,
    currency,
    amount,
    stripe_subscription_id: subscriptionId,
    stripe_customer_id:
      typeof invoice.customer === "string" ? invoice.customer : invoice.customer?.id ?? null,
  });
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

  const currency = (invoice.currency?.toUpperCase() ?? "USD") as Currency;
  const amount = invoice.amount_due
    ? fromStripeAmount(invoice.amount_due, currency)
    : 0;

  await notifyAdmin({
    kind: "payment_failed",
    email: invoice.customer_email ?? null,
    name: invoice.customer_name ?? null,
    currency,
    amount,
    stripe_subscription_id: subscriptionId,
    stripe_customer_id:
      typeof invoice.customer === "string" ? invoice.customer : invoice.customer?.id ?? null,
    extra_note:
      "Stripe reintentará automáticamente. Si falla 3 veces la suscripción pasa a canceled. Considera escribirle al cliente.",
  });
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

  const intervalCount = item?.price.recurring?.interval_count ?? 1;

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
        billing_interval_count: intervalCount,
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

  const customerId =
    typeof sub.customer === "string" ? sub.customer : sub.customer.id;

  const { data: customer } = await supabase
    .from("stripe_customers")
    .select("email, metadata")
    .eq("stripe_customer_id", customerId)
    .maybeSingle();

  await notifyAdmin({
    kind: "subscription_canceled",
    email: customer?.email ?? null,
    plan_id: (sub.metadata?.plan_id as string) ?? null,
    stripe_subscription_id: sub.id,
    stripe_customer_id: customerId,
    extra_note: "La suscripción ya no se renovará. Considera escribirle para feedback.",
  });
}
