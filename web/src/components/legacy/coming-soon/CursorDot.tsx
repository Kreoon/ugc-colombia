"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

export function CursorDot() {
  const [isDesktop, setIsDesktop] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  const springX = useSpring(rawX, { stiffness: 500, damping: 28 });
  const springY = useSpring(rawY, { stiffness: 500, damping: 28 });

  useEffect(() => {
    const hover = window.matchMedia("(hover: hover)");
    setIsDesktop(hover.matches);
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    hover.addEventListener("change", handler);
    return () => hover.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (!isDesktop) return;

    const onMove = (e: MouseEvent) => {
      rawX.set(e.clientX - 6);
      rawY.set(e.clientY - 6);
      if (!isVisible) setIsVisible(true);
    };

    const onLeave = () => setIsVisible(false);
    const onEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", onMove);
    document.documentElement.addEventListener("mouseleave", onLeave);
    document.documentElement.addEventListener("mouseenter", onEnter);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.documentElement.removeEventListener("mouseenter", onEnter);
    };
  }, [isDesktop, isVisible, rawX, rawY]);

  if (!isDesktop) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 w-3 h-3 rounded-full bg-brand-gold mix-blend-difference pointer-events-none z-[9998]"
      style={{ x: springX, y: springY, opacity: isVisible ? 1 : 0 }}
      aria-hidden="true"
    />
  );
}
