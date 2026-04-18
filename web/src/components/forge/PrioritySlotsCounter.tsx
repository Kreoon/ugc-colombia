"use client";

/**
 * PrioritySlotsCounter — muestra "X de 50 slots tomados" en vivo.
 * Crea escasez real basada en datos de Supabase.
 */

import { useEffect, useState } from "react";

type Counter = {
  total: number;
  taken: number;
  remaining: number;
};

export function PrioritySlotsCounter() {
  const [counter, setCounter] = useState<Counter | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    fetch("/api/lead-forge")
      .then((r) => r.json())
      .then((data) => {
        if (!alive) return;
        setCounter({
          total: data.prioritySlotsTotal ?? 50,
          taken: data.prioritySlotsTaken ?? 0,
          remaining: data.prioritySlotsRemaining ?? 50,
        });
        setLoading(false);
      })
      .catch(() => {
        if (!alive) return;
        setLoading(false);
      });
    return () => {
      alive = false;
    };
  }, []);

  if (loading || !counter) {
    return (
      <div className="inline-flex items-center gap-3 px-4 py-3 rounded-xl border border-white/10 bg-black/40">
        <div className="w-2 h-2 rounded-full bg-brand-gray-light animate-pulse" />
        <span className="text-sm text-brand-gray-light">Cargando bonus…</span>
      </div>
    );
  }

  const soldOut = counter.remaining <= 0;
  const progress = (counter.taken / counter.total) * 100;

  return (
    <div className="inline-flex flex-col gap-2 px-4 py-3 rounded-xl border border-brand-yellow/40 bg-brand-yellow/5 max-w-md">
      <div className="flex items-center gap-2">
        <span className={`w-2 h-2 rounded-full ${soldOut ? "bg-red-500" : "bg-brand-yellow animate-pulse"}`} />
        <p className="text-[11px] uppercase tracking-widest font-bold text-brand-yellow">
          BONUS · Llamada 1:1 con Alexander
        </p>
      </div>
      <p className="text-sm text-white leading-snug">
        {soldOut ? (
          <>
            <strong>Bonus agotado.</strong> Los primeros 50 slots ya se tomaron — igual te damos el repositorio gratis.
          </>
        ) : (
          <>
            Los primeros <strong className="text-brand-yellow">{counter.total}</strong> que descarguen reciben una <strong>llamada de 15 minutos gratis</strong> para configurar Content Forge a su marca.{" "}
            <strong className="text-brand-yellow">{counter.remaining}</strong> slots disponibles.
          </>
        )}
      </p>
      <div className="w-full h-1 rounded-full bg-black/40 overflow-hidden">
        <div
          className={`h-full transition-all duration-500 ${soldOut ? "bg-red-500" : "bg-brand-yellow"}`}
          style={{ width: `${Math.min(100, progress)}%` }}
        />
      </div>
    </div>
  );
}
