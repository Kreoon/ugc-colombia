"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

const CLIENT_LOGOS: {
  name: string;
  letters: string;
  logo?: string;
  darkBg?: boolean;
}[] = [
  { name: "Beemo", letters: "Be", logo: "https://beemo.tv/img/logo_smartbeemo.svg" },
  { name: "Unlocked Academy", letters: "UA", logo: "https://lwfiles.mycourse.app/68dc04362e776ced248cac8e-public/b5b23fe7d48093ee532a2206f6cd2049.png" },
  { name: "Altevo", letters: "Al", logo: "https://altevo.com.co/cdn/shop/files/Altevo_Logo.png?v=1758591345&width=150" },
  { name: "Vitalcom", letters: "Vi", logo: "https://assets.skool.com/f/5c95a3174d2f4ea885f0c635959dfecf/7c7707c4438245d19469b65c4d1e8194c69499abf4f44c3091a913fa077fd85d-md.jpg", darkBg: true },
  { name: "Shop Tokio", letters: "ST", logo: "https://shoptokio.co/cdn/shop/files/gempages_513541607190955198-297e6fa2-f0e0-455a-bdf4-12a9388c792d.webp?v=1728089603&width=260" },
  { name: "Soluna", letters: "So", logo: "https://laboratoriosoluna.com/cdn/shop/files/Diseno_sin_titulo_1.png?v=1738769608&width=300" },
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
            {client.logo ? (
              <img
                src={client.logo}
                alt={client.name}
                className={`h-7 w-auto object-contain transition-all duration-300 ${
                  client.darkBg
                    ? "mix-blend-screen grayscale opacity-70 hover:opacity-100"
                    : "grayscale brightness-0 invert opacity-50 hover:opacity-90"
                }`}
              />
            ) : (
              <>
                <span className="w-7 h-7 rounded-md bg-white/[0.06] border border-white/[0.08] flex items-center justify-center text-[10px] font-bold text-white/50 font-sans tracking-tight">
                  {client.letters}
                </span>
                <span className="text-xs sm:text-sm font-sans font-medium text-white/40 tracking-wide hidden sm:inline">
                  {client.name}
                </span>
              </>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
