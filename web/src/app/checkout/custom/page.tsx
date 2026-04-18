import { Suspense } from "react";
import type { Metadata } from "next";
import { CustomCheckoutClient } from "./CustomCheckoutClient";
import {
  isValidBillingDuration,
  type BillingDuration,
} from "@/lib/stripe/plans";
import { getCurrencyFromHeaders } from "@/lib/geo/server";

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
    duration?: string;
    canceled?: string;
  }>;
}) {
  const sp = await searchParams;
  const videosParsed = sp.videos ? parseInt(sp.videos, 10) : 50;
  const videos = Number.isFinite(videosParsed) ? videosParsed : 50;

  const durationParsed = sp.duration ? Number(sp.duration) : undefined;
  const duration: BillingDuration | undefined = isValidBillingDuration(durationParsed)
    ? durationParsed
    : undefined;

  const { country } = await getCurrencyFromHeaders();

  return (
    <Suspense>
      <CustomCheckoutClient
        initialVideos={Math.min(Math.max(videos, 5), 500)}
        initialDuration={duration}
        wasCanceled={sp.canceled === "1"}
        country={country ?? "US"}
      />
    </Suspense>
  );
}
