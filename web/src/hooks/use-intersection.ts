"use client";

import { useEffect, useRef, useState } from "react";

interface UseIntersectionOptions {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
}

/**
 * Wrapper sobre IntersectionObserver para scroll-triggered reveals.
 * Por default dispara solo una vez (once: true).
 */
export function useIntersection<T extends Element = HTMLDivElement>({
  threshold = 0.15,
  rootMargin = "0px",
  once = true,
}: UseIntersectionOptions = {}) {
  const ref = useRef<T>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setIsIntersecting(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  return { ref, isIntersecting };
}
