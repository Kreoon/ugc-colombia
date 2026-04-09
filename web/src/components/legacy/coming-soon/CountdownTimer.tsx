"use client";

import { useEffect, useState } from "react";

const TARGET_DATE = new Date("2026-05-09T00:00:00-05:00");

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function getTimeLeft(): TimeLeft {
  const diff = Math.max(0, TARGET_DATE.getTime() - Date.now());
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function pad(n: number): string {
  return String(n).padStart(2, "0");
}

interface UnitProps {
  value: number;
  label: string;
  hideMobile?: boolean;
}

function Unit({ value, label, hideMobile }: UnitProps) {
  return (
    <div
      className={[
        "flex flex-col items-center gap-1",
        hideMobile ? "hidden sm:flex" : "flex",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <span
        className="font-display text-[clamp(2.5rem,8vw,5rem)] leading-none tabular-nums text-white"
        aria-live="off"
      >
        {pad(value)}
      </span>
      <span className="font-sans text-[10px] sm:text-xs uppercase tracking-[0.2em] text-brand-gray">
        {label}
      </span>
    </div>
  );
}

function Separator() {
  return (
    <span
      className="font-display text-[clamp(2rem,6vw,4rem)] text-brand-gold/60 leading-none self-start pt-1"
      aria-hidden="true"
    >
      :
    </span>
  );
}

export function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() => getTimeLeft());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const id = setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);
    return () => clearInterval(id);
  }, []);

  if (!mounted) {
    // Evita hydration mismatch — render placeholder con mismas dimensiones
    return (
      <div className="h-24 sm:h-32" aria-hidden="true" />
    );
  }

  return (
    <section
      aria-label="Cuenta regresiva al lanzamiento"
      className="flex flex-col items-center gap-4"
    >
      <p className="font-sans text-xs uppercase tracking-[0.2em] text-brand-gray/70">
        Lanzamiento en
      </p>

      <div
        className="flex items-start gap-3 sm:gap-5"
        role="timer"
        aria-live="polite"
        aria-atomic="true"
        aria-label={`${timeLeft.days} días, ${timeLeft.hours} horas, ${timeLeft.minutes} minutos, ${timeLeft.seconds} segundos`}
      >
        <Unit value={timeLeft.days} label="Días" />
        <Separator />
        <Unit value={timeLeft.hours} label="Horas" />
        <Separator />
        <Unit value={timeLeft.minutes} label="Minutos" />
        <Separator />
        <Unit value={timeLeft.seconds} label="Segundos" />
      </div>
    </section>
  );
}
