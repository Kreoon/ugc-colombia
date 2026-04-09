"use client";

import { useEffect, useRef, useState } from "react";

interface UseCountUpOptions {
  end: number;
  duration?: number;
  start?: number;
  decimals?: number;
  /** Si es true, empieza a animar solo cuando trigger cambia a true */
  trigger?: boolean;
}

/**
 * Anima un número desde `start` hasta `end` con easing exponencial.
 * Respeta prefers-reduced-motion mostrando el valor final directamente.
 */
export function useCountUp({
  end,
  duration = 2000,
  start = 0,
  decimals = 0,
  trigger = true,
}: UseCountUpOptions): string {
  const [value, setValue] = useState(start);
  const rafRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    if (!trigger) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReduced) {
      setValue(end);
      return;
    }

    startTimeRef.current = null;

    const animate = (timestamp: number) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const elapsed = timestamp - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);
      // Easing: ease-out exponencial
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = start + (end - start) * eased;
      setValue(current);

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        setValue(end);
      }
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [end, duration, start, trigger]);

  return value.toFixed(decimals);
}
