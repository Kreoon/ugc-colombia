import { Suspense } from "react";
import type { Metadata } from "next";
import { CustomCheckoutClient } from "./CustomCheckoutClient";
import {
  isValidBillingDuration,
  type BillingDuration,
} from "@/lib/stripe/plans";

export const metadata: Metadata = {
  title: "Plan a la medida — UGC Colombia",
  description:
    "Diseña un plan UGC personalizado según el volumen de videos que necesitas al mes.",
  robots: { index: false, follow: false },
};

export default async function CheckoutCustomPage({
  searchParams,
}: {
  searchParams: Promise<{
    videos?: string;
    currency?: string;
    duration?: string;
    canceled?: string;
  }>;
}) {
  const sp = await searchParams;
  const videosParsed = sp.videos ? parseInt(sp.videos, 10) : 50;
  const videos = Number.isFinite(videosParsed) ? videosParsed : 50;
  const currency = sp.currency === "COP" ? "COP" : "USD";
  const durationParsed = sp.duration ? Number(sp.duration) : undefined;
  const duration: BillingDuration | undefined = isValidBillingDuration(durationParsed)
    ? durationParsed
    : undefined;

  return (
    <Suspense>
      <CustomCheckoutClient
        initialVideos={Math.min(Math.max(videos, 5), 500)}
        initialCurrency={currency as "USD" | "COP"}
        initialDuration={duration}
        wasCanceled={sp.canceled === "1"}
      />
    </Suspense>
  );
}
