"use client";

import { useEffect, useRef } from "react";
import { trackScrollDepth } from "@/lib/tracking/events";

const THRESHOLDS = [25, 50, 75, 100];

export function ScrollDepthTracker() {
  const firedRef = useRef(new Set<number>());

  useEffect(() => {
    function handleScroll() {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) return;

      const percentage = Math.round((scrollTop / docHeight) * 100);

      for (const threshold of THRESHOLDS) {
        if (percentage >= threshold && !firedRef.current.has(threshold)) {
          firedRef.current.add(threshold);
          trackScrollDepth(threshold);
        }
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return null;
}
