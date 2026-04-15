"use client";

import { useState } from "react";
import Image from "next/image";
import type { LogoVariant } from "../_data/logos";

type Props = {
  logos: LogoVariant[];
};

export function LogoViewer({ logos }: Props) {
  const available = logos.filter((l) => l.status === "official");
  const [current, setCurrent] = useState(available[0]);

  const bgClass =
    current.background === "dark"
      ? "bg-brand-black"
      : current.background === "yellow"
        ? "bg-brand-yellow"
        : "bg-brand-cream";

  return (
    <div className="space-y-6">
      <div
        className={`${bgClass} rounded-md border border-brand-gray-dark/60 flex items-center justify-center p-16 min-h-[320px]`}
      >
        <div className="relative w-full max-w-md h-32">
          <Image
            src={current.file}
            alt={current.name}
            fill
            sizes="400px"
            className="object-contain"
          />
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {available.map((logo) => (
          <button
            key={logo.id}
            onClick={() => setCurrent(logo)}
            className={`p-3 rounded text-left border transition-all ${
              current.id === logo.id
                ? "border-brand-yellow bg-brand-yellow/10"
                : "border-brand-gray-dark/60 hover:border-brand-yellow/50"
            }`}
          >
            <p className="font-sans text-xs text-white font-medium">
              {logo.name}
            </p>
            <p className="font-sans text-[10px] text-brand-gray-light mt-1">
              {logo.minWidthPx}px min
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}
