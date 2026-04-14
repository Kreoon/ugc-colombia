"use client";

import { useEffect, useState } from "react";
import {
  COUNTDOWN_HOURS,
  OFFER_COOKIE_DEADLINE,
} from "@/lib/offer-config";

export interface CountdownState {
  hoursLeft: number;
  minutesLeft: number;
  secondsLeft: number;
  totalMsLeft: number;
  isExpired: boolean;
  /** true mientras no se haya hidratado el cliente; evita CLS en el primer paint. */
  isLoading: boolean;
}

const INITIAL: CountdownState = {
  hoursLeft: COUNTDOWN_HOURS,
  minutesLeft: 0,
  secondsLeft: 0,
  totalMsLeft: COUNTDOWN_HOURS * 3_600_000,
  isExpired: false,
  isLoading: true,
};

function readDeadlineCookie(): number | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(
    new RegExp(`(?:^|; )${OFFER_COOKIE_DEADLINE}=([^;]+)`),
  );
  if (!match) return null;
  const ts = Number.parseInt(decodeURIComponent(match[1]), 10);
  return Number.isFinite(ts) ? ts : null;
}

function writeDeadlineCookie(timestamp: number): void {
  if (typeof document === "undefined") return;
  const maxAge = COUNTDOWN_HOURS * 60 * 60 + 60;
  document.cookie = `${OFFER_COOKIE_DEADLINE}=${timestamp}; path=/; max-age=${maxAge}; SameSite=Lax`;
}

function computeState(deadline: number): CountdownState {
  const totalMsLeft = deadline - Date.now();
  if (totalMsLeft <= 0) {
    return {
      hoursLeft: 0,
      minutesLeft: 0,
      secondsLeft: 0,
      totalMsLeft: 0,
      isExpired: true,
      isLoading: false,
    };
  }
  const totalSeconds = Math.floor(totalMsLeft / 1000);
  return {
    hoursLeft: Math.floor(totalSeconds / 3600),
    minutesLeft: Math.floor((totalSeconds % 3600) / 60),
    secondsLeft: totalSeconds % 60,
    totalMsLeft,
    isExpired: false,
    isLoading: false,
  };
}

export function useOfferCountdown(): CountdownState {
  const [state, setState] = useState<CountdownState>(INITIAL);

  useEffect(() => {
    let deadline = readDeadlineCookie();
    if (!deadline) {
      deadline = Date.now() + COUNTDOWN_HOURS * 3_600_000;
      writeDeadlineCookie(deadline);
    }

    setState(computeState(deadline));

    const interval = window.setInterval(() => {
      const next = computeState(deadline);
      setState(next);
      if (next.isExpired) window.clearInterval(interval);
    }, 1000);

    return () => window.clearInterval(interval);
  }, []);

  return state;
}

export function pad2(n: number): string {
  return n.toString().padStart(2, "0");
}
