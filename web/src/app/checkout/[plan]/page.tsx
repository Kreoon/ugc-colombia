import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PLANES_RECURRENTES } from "@/lib/pricing-plans";
import {
  isValidStripePlan,
  isValidBillingDuration,
  type BillingDuration,
} from "@/lib/stripe/plans";
import { getCurrencyFromHeaders } from "@/lib/geo/server";
import { CheckoutClient } from "./CheckoutClient";

export const metadata: Metadata = {
  title: "Checkout — UGC Colombia",
  description: "Completa tu compra y comienza a producir contenido UGC profesional.",
  robots: { index: false, follow: false },
};

export default async function CheckoutPlanPage({
  params,
  searchParams,
}: {
  params: Promise<{ plan: string }>;
  searchParams: Promise<{ canceled?: string; duration?: string }>;
}) {
  const { plan } = await params;
  const sp = await searchParams;

  if (!isValidStripePlan(plan)) notFound();

  const planData = PLANES_RECURRENTES.find((p) => p.id === plan);
  if (!planData) notFound();

  const { country } = await getCurrencyFromHeaders();

  const durationParsed = sp.duration ? Number(sp.duration) : undefined;
  const initialDuration: BillingDuration | undefined = isValidBillingDuration(durationParsed)
    ? durationParsed
    : undefined;

  return (
    <Suspense>
      <CheckoutClient
        planId={plan}
        planName={planData.name}
        planVideos={planData.videos}
        planDescription={planData.description}
        features={planData.features}
        wasCanceled={sp.canceled === "1"}
        country={country ?? "US"}
        initialDuration={initialDuration}
      />
    </Suspense>
  );
}
