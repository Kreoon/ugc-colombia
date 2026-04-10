"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

const CLIENT_LOGOS = [
  { name: "smartBeemo", letters: "sB" },
  { name: "FitLab", letters: "FL" },
  { name: "Nova Beauty", letters: "NB" },
  { name: "Growthy", letters: "GR" },
  { name: "Alma Foods", letters: "AF" },
  { name: "Velora", letters: "VL" },
];

export function ClientLogoBar({ className }: { className?: string }) {
  return (
    <div className={cn("w-full", className)}>
      <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.3em] text-brand-graphite text-center mb-5 font-sans">
        Confían en nosotros
      </p>
      <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10">
        {CLIENT_LOGOS.map((client, i) => (
          <motion.div
            key={client.name}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 + i * 0.08 }}
            className="group flex items-center gap-2 opacity-40 hover:opacity-70 transition-opacity duration-300"
          >
            <span className="w-7 h-7 rounded-md bg-white/[0.06] border border-white/[0.08] flex items-center justify-center text-[10px] font-bold text-white/50 font-sans tracking-tight">
              {client.letters}
            </span>
            <span className="text-xs sm:text-sm font-sans font-medium text-white/40 tracking-wide hidden sm:inline">
              {client.name}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
