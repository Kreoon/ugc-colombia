import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe/server";
import { fromStripeAmount } from "@/lib/stripe/plans";
import type { Currency } from "@/lib/pricing/currency-config";

export const runtime = "nodejs";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    if (!id || !id.startsWith("cs_")) {
      return NextResponse.json({ error: "session_id inválido" }, { status: 400 });
    }

    const stripe = getStripe();
    const session = await stripe.checkout.sessions.retrieve(id, {
      expand: ["subscription", "customer"],
    });

    // No exponemos el raw object de Stripe: sólo campos necesarios para la UI.
    const currency = (
      (session.metadata?.currency ?? session.currency ?? "USD") as string
    ).toUpperCase() as Currency;

    return NextResponse.json({
      id: session.id,
      status: session.status,
      payment_status: session.payment_status,
      email: session.customer_details?.email ?? session.customer_email ?? null,
      name: session.customer_details?.name ?? null,
      plan_id: session.metadata?.plan_id ?? null,
      plan_label: session.metadata?.plan_label ?? null,
      videos_per_month: session.metadata?.videos_per_month ?? null,
      amount_total: session.amount_total
        ? fromStripeAmount(session.amount_total, currency)
        : 0,
      currency,
    });
  } catch (err) {
    console.error("[checkout/session/id] Error:", err);
    return NextResponse.json(
      { error: "No se pudo recuperar la sesión" },
      { status: 500 },
    );
  }
}
