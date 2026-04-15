"use client";

import { useState } from "react";
import Image from "next/image";

type Props = {
  title: string;
  prompt: string;
  aspectRatio: string;
  exampleSrc?: string;
  usage?: string;
};

export function PromptCard({
  title,
  prompt,
  aspectRatio,
  exampleSrc,
  usage,
}: Props) {
  const [copied, setCopied] = useState(false);

  function copy() {
    navigator.clipboard.writeText(prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="rounded-md border border-brand-gray-dark/60 bg-brand-black/50 overflow-hidden">
      <div className="grid md:grid-cols-[240px_1fr] gap-0">
        {exampleSrc && (
          <div
            className="relative bg-brand-black"
            style={{ aspectRatio }}
          >
            <Image
              src={exampleSrc}
              alt={title}
              fill
              sizes="240px"
              className="object-cover"
            />
          </div>
        )}
        <div className="p-6">
          <div className="flex items-center justify-between gap-3 mb-3">
            <h3 className="font-display uppercase tracking-wider text-lg text-white">
              {title}
            </h3>
            <span className="text-[10px] uppercase tracking-widest text-brand-yellow font-mono">
              {aspectRatio}
            </span>
          </div>
          {usage && (
            <p className="font-sans text-xs text-brand-gray-light mb-4 leading-relaxed">
              {usage}
            </p>
          )}
          <pre className="font-mono text-[11px] text-brand-gray-light bg-brand-black/80 p-3 rounded border border-brand-gray-dark/40 whitespace-pre-wrap max-h-40 overflow-y-auto">
            {prompt}
          </pre>
          <button
            onClick={copy}
            className="mt-3 text-[10px] uppercase tracking-widest text-brand-yellow hover:text-white transition-colors font-sans"
          >
            {copied ? "Copiado ✓" : "Copiar prompt →"}
          </button>
        </div>
      </div>
    </div>
  );
}
