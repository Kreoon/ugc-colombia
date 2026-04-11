"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import {
  hasStoredConsent,
  setConsent,
  getConsent,
} from "@/lib/tracking/consent";
import type { ConsentState } from "@/lib/tracking/types";

export function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [showCustomize, setShowCustomize] = useState(false);
  const [analytics, setAnalytics] = useState(true);
  const [marketing, setMarketing] = useState(true);

  useEffect(() => {
    if (!hasStoredConsent()) {
      setVisible(true);
      const current = getConsent();
      setAnalytics(current.analytics);
      setMarketing(current.marketing);
    }
  }, []);

  const save = useCallback((state: ConsentState) => {
    setConsent(state);
    setVisible(false);
  }, []);

  if (!visible) return null;

  return (
    <div
      role="region"
      aria-label="Aviso de cookies"
      className="fixed inset-x-0 bottom-0 z-[9999] border-t border-white/10 bg-brand-black/95 p-4 backdrop-blur-md sm:p-5"
    >
      {!showCustomize ? (
        <div className="mx-auto flex max-w-5xl flex-col items-start gap-3 sm:flex-row sm:items-center">
          <p className="flex-1 text-xs text-brand-gray sm:text-sm">
            Usamos cookies para analítica y marketing para mejorar tu
            experiencia. Al continuar navegando aceptas su uso. Consulta
            nuestra{" "}
            <Link
              href="/legal/privacidad"
              className="text-brand-yellow underline underline-offset-2 hover:text-brand-gold"
            >
              política de privacidad
            </Link>
            .
          </p>
          <div className="flex shrink-0 gap-2">
            <button
              onClick={() => setShowCustomize(true)}
              className="rounded-lg border border-white/20 px-4 py-2 text-sm font-medium text-white transition-colors hover:border-white/40"
            >
              Personalizar
            </button>
            <button
              onClick={() =>
                save({ necessary: true, analytics: true, marketing: true })
              }
              className="rounded-lg bg-brand-yellow px-5 py-2 text-sm font-semibold text-black transition-colors hover:bg-brand-gold"
            >
              Entendido
            </button>
          </div>
        </div>
      ) : (
        <div className="mx-auto max-w-5xl space-y-4">
          <p className="text-sm font-medium text-white">
            Personaliza tus preferencias de cookies
          </p>

          <div className="space-y-3">
            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                checked
                disabled
                className="h-4 w-4 accent-brand-yellow"
              />
              <span className="text-sm text-brand-gray">
                <strong className="text-white">Necesarias</strong> — Siempre
                activas. Funcionalidad básica del sitio.
              </span>
            </label>

            <label className="flex cursor-pointer items-center gap-3">
              <input
                type="checkbox"
                checked={analytics}
                onChange={(e) => setAnalytics(e.target.checked)}
                className="h-4 w-4 accent-brand-yellow"
              />
              <span className="text-sm text-brand-gray">
                <strong className="text-white">Analítica</strong> — Google
                Analytics, Hotjar. Nos ayudan a mejorar la experiencia.
              </span>
            </label>

            <label className="flex cursor-pointer items-center gap-3">
              <input
                type="checkbox"
                checked={marketing}
                onChange={(e) => setMarketing(e.target.checked)}
                className="h-4 w-4 accent-brand-yellow"
              />
              <span className="text-sm text-brand-gray">
                <strong className="text-white">Marketing</strong> — Meta Pixel,
                TikTok, LinkedIn, Bing. Publicidad relevante.
              </span>
            </label>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setShowCustomize(false)}
              className="rounded-lg border border-white/20 px-4 py-2 text-sm font-medium text-white transition-colors hover:border-white/40"
            >
              Volver
            </button>
            <button
              onClick={() =>
                save({ necessary: true, analytics, marketing })
              }
              className="rounded-lg bg-brand-yellow px-4 py-2 text-sm font-semibold text-black transition-colors hover:bg-brand-gold"
            >
              Guardar preferencias
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
