"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { getConsent } from "@/lib/tracking/consent";
import { captureUTMParams } from "@/lib/tracking/utm";
import type { ConsentState } from "@/lib/tracking/types";

import { GoogleAnalytics } from "./GoogleAnalytics";
import { MetaPixel } from "./MetaPixel";
import { TikTokPixel } from "./TikTokPixel";
import { LinkedInInsight } from "./LinkedInInsight";
import { BingUET } from "./BingUET";
import { Hotjar } from "./Hotjar";
import { ScrollDepthTracker } from "./ScrollDepthTracker";

export function TrackingScripts() {
  const pathname = usePathname();
  const [consent, setConsentState] = useState<ConsentState>(getConsent);

  useEffect(() => {
    captureUTMParams();

    function onConsentUpdate(e: Event) {
      const detail = (e as CustomEvent<ConsentState>).detail;
      setConsentState(detail);
    }
    window.addEventListener("consent-updated", onConsentUpdate);
    return () => window.removeEventListener("consent-updated", onConsentUpdate);
  }, []);

  if (pathname?.startsWith("/admin")) return null;

  return (
    <>
      {consent.analytics && (
        <>
          {/* GTM se instala directo en layout.tsx (head + body) para carga inmediata */}
          <GoogleAnalytics />
          <Hotjar />
          <ScrollDepthTracker />
        </>
      )}
      {consent.marketing && (
        <>
          <MetaPixel />
          <TikTokPixel />
          <LinkedInInsight />
          <BingUET />
        </>
      )}
    </>
  );
}
