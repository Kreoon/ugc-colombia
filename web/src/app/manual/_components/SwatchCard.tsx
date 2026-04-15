"use client";

import { useState } from "react";

type Props = {
  hex: string;
  name: string;
  uso?: string;
};

export function SwatchCard({ hex, name, uso }: Props) {
  const [copied, setCopied] = useState(false);

  function copy() {
    navigator.clipboard.writeText(hex);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  const isLight = ["#FFFFFF", "#F5F5F0", "#BDBCBC", "#F9B334"].includes(
    hex.toUpperCase()
  );

  return (
    <button
      onClick={copy}
      className="group text-left rounded-md overflow-hidden border border-brand-gray-dark/60 hover:border-brand-yellow transition-all"
    >
      <div
        className="h-40 w-full flex items-end p-4"
        style={{ backgroundColor: hex }}
      >
        <span
          className={`font-sans text-xs font-mono ${
            isLight ? "text-black" : "text-white"
          }`}
        >
          {hex}
        </span>
      </div>
      <div className="bg-brand-black p-4">
        <p className="font-display text-lg uppercase tracking-wider text-white">
          {name}
        </p>
        {uso && (
          <p className="font-sans text-xs text-brand-gray-light mt-1 leading-relaxed">
            {uso}
          </p>
        )}
        <p className="font-sans text-[10px] uppercase tracking-widest text-brand-yellow mt-3">
          {copied ? "Copiado" : "Copiar HEX"}
        </p>
      </div>
    </button>
  );
}
