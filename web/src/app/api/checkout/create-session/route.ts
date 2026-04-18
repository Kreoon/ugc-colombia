import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getStripe } from "@/lib/stripe/server";
import {
  getStripePriceId,
  isValidStripePlan,
  type BillingDuration,
} from "@/lib/stripe/plans";
import { createSupabaseServiceRole } from "@/lib/supabase-server";

export const runtime = "nodejs";

const bodySchema = z.object({
  planId: z.enum(["starter", "growth", "scale"]),
  currency: z.enum(["USD", "COP"]),
  duration: z
    .union([z.literal(1), z.literal(3), z.literal(6), z.literal(12)])
    .default(1),
  email: z.string().email(),
  name: z.string().min(1).max(120),
  company: z.string().min(1).max(160),
  country: z.string().min(2).max(2).default("CO"),
  whatsapp: z.string().min(7).max(20).optional(),
  tax_id: z.string().max(40).optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = bodySchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? "Datos inválidos" },
        { status: 400 },
      );
    }

    const data = parsed.data;
    if (!isValidStripePlan(data.planId)) {
      return NextResponse.json({ error: "Plan inválido" }, { status: 400 });
    }

    const duration = data.duration as BillingDuration;
    const stripe = getStripe();
    const priceId = getStripePriceId(data.planId, data.currency, duration);

    // Reutiliza Customer si existe (evita duplicados en Stripe).
    const supabase = createSupabaseServiceRole();
    const { data: existingCustomer } = await supabase
      .from("stripe_customers")
      .select("stripe_customer_id")
      .eq("email", data.email)
      .maybeSingle();

    let customerId = existingCustomer?.stripe_customer_id;
    if (!customerId) {
      const customer = await stripe.customers.create({
        email: data.email,
        name: data.name,
        metadata: {
          company: data.company,
          country: data.country,
          whatsapp: data.whatsapp ?? "",
          tax_id: data.tax_id ?? "",
          source: "ugccolombia.co/checkout",
        },
      });
      customerId = customer.id;

      await supabase.from("stripe_customers").insert({
        stripe_customer_id: customerId,
        email: data.email,
        metadata: {
          company: data.company,
          country: data.country,
          whatsapp: data.whatsapp ?? null,
        },
      });
    }

    const siteUrl =
      process.env.NEXT_PUBLIC_SITE_URL ??
      (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      customer: customerId,
      line_items: [{ price: priceId, quantity: 1 }],
      allow_promotion_codes: true,
      billing_address_collection: "required",
      locale: "es",
      success_url: `${siteUrl}/gracias-pago?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/checkout/${data.planId}?canceled=1`,
      subscription_data: {
        metadata: {
          plan_id: data.planId,
          currency: data.currency,
          billing_interval_count: String(duration),
          company: data.company,
          country: data.country,
          source: "ugccolombia.co",
        },
      },
      metadata: {
        plan_id: data.planId,
        currency: data.currency,
        billing_interval_count: String(duration),
        company: data.company,
        country: data.country,
        whatsapp: data.whatsapp ?? "",
      },
    });

    if (!session.url) {
      return NextResponse.json(
        { error: "Stripe no devolvió URL de checkout" },
        { status: 500 },
      );
    }

    // Registra la intención de compra; el webhook marcará paid cuando el pago concrete.
    await supabase.from("orders").insert({
      stripe_session_id: session.id,
      stripe_customer_id: customerId,
      email: data.email,
      plan_id: data.planId,
      billing_interval_count: duration,
      amount_total: session.amount_total
        ? session.amount_total / 100
        : 0,
      currency: data.currency,
      status: "pending",
      expires_at: session.expires_at
        ? new Date(session.expires_at * 1000).toISOString()
        : null,
      metadata: {
        name: data.name,
        company: data.company,
        country: data.country,
        whatsapp: data.whatsapp ?? null,
        tax_id: data.tax_id ?? null,
        billing_interval_count: duration,
      },
    });

    return NextResponse.json({ url: session.url, id: session.id });
  } catch (err) {
    console.error("[checkout/create-session] Error:", err);
    const message = err instanceof Error ? err.message : "Error interno";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
