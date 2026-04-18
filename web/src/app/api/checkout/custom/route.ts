import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getStripe } from "@/lib/stripe/server";
import {
  applyDurationDiscount,
  toStripeAmount,
  type BillingDuration,
} from "@/lib/stripe/plans";
import {
  PLAN_PRICES,
  VOLUME_50_PRICE,
  VOLUME_TIERS,
  type Currency,
} from "@/lib/pricing/currency-config";
import { createSupabaseServiceRole } from "@/lib/supabase-server";
import { notifyAdmin } from "@/lib/email/stripe-notifications";

export const runtime = "nodejs";

const bodySchema = z.object({
  videos: z.number().int().min(5).max(500),
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

/**
 * Calcula el precio mensual base de un plan custom. Replicar la lógica aquí
 * (vs. trust al cliente) evita que el front pueda forzar un precio menor vía
 * request body.
 */
function resolveCustomMonthlyPrice(
  videos: number,
  currency: Currency,
): { amount: number; label: string } {
  if (videos <= 5)
    return { amount: PLAN_PRICES.starter[currency].amount, label: "INICIO" };
  if (videos <= 10)
    return { amount: PLAN_PRICES.growth[currency].amount, label: "CRECIMIENTO" };
  if (videos <= 30)
    return { amount: PLAN_PRICES.scale[currency].amount, label: "ESCALA" };
  if (videos <= 50)
    return { amount: VOLUME_50_PRICE[currency], label: "VOLUMEN 50" };

  const tier = VOLUME_TIERS[currency].find(
    (t) =>
      videos >= t.minVideos && (t.maxVideos === null || videos <= t.maxVideos),
  );
  const amount = tier ? videos * tier.perVideo : 0;
  return { amount, label: "A LA MEDIDA" };
}

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
    const duration = data.duration as BillingDuration;
    const { amount: monthlyAmount, label } = resolveCustomMonthlyPrice(
      data.videos,
      data.currency,
    );
    if (monthlyAmount <= 0) {
      return NextResponse.json(
        { error: "No se pudo calcular el precio. Contactanos directo." },
        { status: 400 },
      );
    }

    // Total del ciclo completo (duración × mensual × (1 - descuento)).
    const totalAmount = applyDurationDiscount(monthlyAmount, duration);

    const stripe = getStripe();
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
          source: "ugccolombia.co/checkout/custom",
          videos_per_month: String(data.videos),
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
          videos_per_month: data.videos,
        },
      });
    }

    const siteUrl =
      process.env.NEXT_PUBLIC_SITE_URL ??
      (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      customer: customerId,
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: data.currency.toLowerCase(),
            unit_amount: toStripeAmount(totalAmount, data.currency),
            recurring: { interval: "month", interval_count: duration },
            product_data: {
              name: `UGC Colombia — Plan ${label}`,
              description: `${data.videos} videos UGC al mes · ciclo de ${duration} ${
                duration === 1 ? "mes" : "meses"
              }`,
              metadata: {
                videos_per_month: String(data.videos),
                plan_label: label,
                billing_interval_count: String(duration),
              },
            },
          },
        },
      ],
      allow_promotion_codes: true,
      billing_address_collection: "required",
      locale: "es",
      success_url: `${siteUrl}/gracias-pago?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/checkout/custom?videos=${data.videos}&currency=${data.currency}&duration=${duration}&canceled=1`,
      subscription_data: {
        metadata: {
          plan_id: "custom",
          plan_label: label,
          currency: data.currency,
          videos_per_month: String(data.videos),
          billing_interval_count: String(duration),
          company: data.company,
          country: data.country,
          source: "ugccolombia.co",
        },
      },
      metadata: {
        plan_id: "custom",
        plan_label: label,
        currency: data.currency,
        videos_per_month: String(data.videos),
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

    await supabase.from("orders").insert({
      stripe_session_id: session.id,
      stripe_customer_id: customerId,
      email: data.email,
      plan_id: "custom",
      billing_interval_count: duration,
      amount_total: totalAmount,
      currency: data.currency,
      status: "pending",
      videos_count: data.videos,
      expires_at: session.expires_at
        ? new Date(session.expires_at * 1000).toISOString()
        : null,
      metadata: {
        name: data.name,
        company: data.company,
        country: data.country,
        whatsapp: data.whatsapp ?? null,
        tax_id: data.tax_id ?? null,
        plan_label: label,
        monthly_equivalent: monthlyAmount,
      },
    });

    notifyAdmin({
      kind: "checkout_started",
      email: data.email,
      name: data.name,
      company: data.company,
      plan_id: "custom",
      plan_label: label,
      currency: data.currency,
      amount: totalAmount,
      billing_interval_count: duration,
      videos_per_month: data.videos,
      whatsapp: data.whatsapp ?? null,
      country: data.country,
      stripe_session_id: session.id,
      stripe_customer_id: customerId,
      extra_note: `Plan custom: ${data.videos} videos/mes. Fue redirigido a Stripe Checkout.`,
    }).catch((err) => console.error("[checkout/custom] notifyAdmin error:", err));

    return NextResponse.json({ url: session.url, id: session.id });
  } catch (err) {
    console.error("[checkout/custom] Error:", err);
    const message = err instanceof Error ? err.message : "Error interno";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
