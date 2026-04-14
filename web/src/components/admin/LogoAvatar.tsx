"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface Props {
  logoUrl?: string | null;
  name: string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

const SIZE_MAP = {
  sm: { px: 32, text: "text-xs" },
  md: { px: 48, text: "text-sm" },
  lg: { px: 64, text: "text-base" },
  xl: { px: 96, text: "text-2xl" },
} as const;

const GRADIENTS = [
  "from-amber-500 to-orange-600",
  "from-rose-500 to-pink-600",
  "from-violet-500 to-purple-600",
  "from-cyan-500 to-blue-600",
  "from-emerald-500 to-teal-600",
  "from-indigo-500 to-blue-700",
  "from-fuchsia-500 to-pink-600",
];

function initialsOf(name: string): string {
  const trimmed = name.trim();
  if (!trimmed) return "?";
  const parts = trimmed.split(/\s+/).slice(0, 2);
  return parts.map((p) => p[0]?.toUpperCase() ?? "").join("") || "?";
}

function gradientFor(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = (hash * 31 + name.charCodeAt(i)) >>> 0;
  return GRADIENTS[hash % GRADIENTS.length];
}

export function LogoAvatar({ logoUrl, name, size = "md", className }: Props) {
  const [errored, setErrored] = useState(false);
  const dim = SIZE_MAP[size];
  const showImage = logoUrl && !errored;

  return (
    <div
      className={cn(
        "relative flex-shrink-0 overflow-hidden rounded-xl border border-white/10 bg-brand-graphite/40",
        className,
      )}
      style={{ width: dim.px, height: dim.px }}
    >
      {showImage ? (
        <Image
          src={logoUrl!}
          alt={`Logo ${name}`}
          fill
          sizes={`${dim.px}px`}
          unoptimized
          onError={() => setErrored(true)}
          className="object-cover"
        />
      ) : (
        <div
          className={cn(
            "flex h-full w-full items-center justify-center bg-gradient-to-br font-sans font-bold text-white",
            gradientFor(name),
            dim.text,
          )}
        >
          {initialsOf(name)}
        </div>
      )}
    </div>
  );
}
