"use client";

import { useState } from "react";
import { Play } from "lucide-react";
import type { EffectSpec } from "@/app/admin/marca/_data/effects";

export function EffectCard({ effect }: { effect: EffectSpec }) {
  const [replay, setReplay] = useState(0);

  return (
    <div className="rounded-2xl border border-brand-gold/15 p-6 bg-white/[0.02]">
      <div className="flex items-start justify-between mb-4 gap-4">
        <div>
          <div className="text-[10px] font-semibold tracking-[0.2em] uppercase text-brand-gold mb-1">
            · {effect.subtitle}
          </div>
          <div className="font-display uppercase text-white text-2xl">
            {effect.name}
          </div>
        </div>
        <button
          onClick={() => setReplay((v) => v + 1)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-brand-yellow hover:bg-brand-yellow/10 transition-colors border border-brand-yellow/30"
        >
          <Play className="w-3 h-3" aria-hidden />
          Replay
        </button>
      </div>

      <div className="bg-brand-black rounded-xl p-8 mb-4 flex items-center justify-center min-h-[120px]">
        <EffectDemo id={effect.id} replayKey={replay} />
      </div>

      <dl className="grid grid-cols-3 gap-3 text-xs mb-4 pb-4 border-b border-brand-gold/10">
        <div>
          <dt className="text-brand-gray mb-0.5">Duración</dt>
          <dd className="text-white font-mono">{effect.duration}</dd>
        </div>
        <div>
          <dt className="text-brand-gray mb-0.5">Loop</dt>
          <dd className="text-white font-mono">{effect.loop}</dd>
        </div>
        <div>
          <dt className="text-brand-gray mb-0.5">Easing</dt>
          <dd className="text-white font-mono truncate">{effect.easing}</dd>
        </div>
      </dl>

      <pre className="text-[11px] font-mono text-brand-gray bg-black/40 rounded-lg p-3 overflow-x-auto whitespace-pre">
        <code>{effect.css}</code>
      </pre>

      <p className="text-sm text-brand-gray mt-3 leading-relaxed">{effect.use}</p>
    </div>
  );
}

function EffectDemo({ id, replayKey }: { id: string; replayKey: number }) {
  if (id === "glow-pulse") {
    return (
      <button
        key={replayKey}
        className="px-8 py-3 rounded-xl bg-brand-yellow text-black font-bold uppercase tracking-wider animate-glow-pulse"
      >
        AGENDAR CALL
      </button>
    );
  }

  if (id === "text-reveal") {
    return (
      <div key={replayKey} className="font-display uppercase text-white text-3xl animate-text-reveal">
        HACEMOS CRECER MARCAS.
      </div>
    );
  }

  if (id === "marquee") {
    return (
      <div className="w-full overflow-hidden">
        <div className="flex gap-12 animate-marquee whitespace-nowrap">
          {Array.from({ length: 8 }).map((_, i) => (
            <span key={i} className="font-display uppercase text-brand-gray text-2xl">
              MARCA {i + 1}
            </span>
          ))}
        </div>
      </div>
    );
  }

  if (id === "logo-shine") {
    return (
      <div key={replayKey} className="relative">
        <div className="font-display uppercase text-transparent text-5xl relative">
          <span
            className="bg-clip-text bg-white"
            style={{
              backgroundImage:
                "linear-gradient(115deg, transparent 30%, rgba(255,255,255,0.15) 44%, rgba(249,179,52,0.55) 48%, rgba(255,255,255,0.9) 50%, rgba(249,179,52,0.55) 52%, rgba(255,255,255,0.15) 56%, transparent 70%)",
              backgroundSize: "200% 100%",
              animation: "shine-sweep 5s ease-in-out infinite",
            }}
          >
            UGC
          </span>
          <style jsx>{`
            @keyframes shine-sweep {
              0% { background-position: 200% 0; }
              100% { background-position: -200% 0; }
            }
          `}</style>
        </div>
      </div>
    );
  }

  return null;
}

interface Transition {
  element: string;
  duration: string;
  easing: string;
  use: string;
}

export function TransitionsTable({ items }: { items: Transition[] }) {
  return (
    <div className="rounded-2xl border border-brand-gold/15 overflow-hidden bg-white/[0.02]">
      <div className="px-6 py-4 border-b border-brand-gold/15">
        <div className="text-[10px] font-semibold tracking-[0.2em] uppercase text-brand-gold">
          · Transiciones estándar
        </div>
      </div>
      <table className="w-full text-sm">
        <thead>
          <tr className="text-[10px] uppercase tracking-[0.15em] text-brand-gray bg-white/[0.02]">
            <th className="text-left px-6 py-3 font-semibold">Elemento</th>
            <th className="text-left px-6 py-3 font-semibold">Duración</th>
            <th className="text-left px-6 py-3 font-semibold">Easing</th>
            <th className="text-left px-6 py-3 font-semibold">Uso</th>
          </tr>
        </thead>
        <tbody>
          {items.map((r) => (
            <tr key={r.element} className="border-t border-brand-gold/10">
              <td className="px-6 py-3 text-white font-semibold">{r.element}</td>
              <td className="px-6 py-3 font-mono text-brand-yellow">{r.duration}</td>
              <td className="px-6 py-3 font-mono text-brand-gray">{r.easing}</td>
              <td className="px-6 py-3 text-brand-gray">{r.use}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
