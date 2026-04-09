"use client";

import { Toaster } from "sonner";
import { ParticlesBg } from "./ParticlesBg";
import { CursorDot } from "./CursorDot";
import { Navbar } from "./Navbar";
import { MarqueeCore } from "./MarqueeCore";
import { Hero } from "./Hero";
import { WaitlistForm } from "./WaitlistForm";
import { CountdownTimer } from "./CountdownTimer";
import { Footer } from "./Footer";
import { CmdPalette } from "./CmdPalette";

export function ComingSoon() {
  return (
    <div className="relative min-h-screen bg-brand-black flex flex-col">
      {/* Fondo de partículas */}
      <ParticlesBg />

      {/* Cursor personalizado (solo desktop) */}
      <CursorDot />

      {/* Paleta de comandos Cmd+K */}
      <CmdPalette />

      {/* Toast notifications */}
      <Toaster
        theme="dark"
        position="bottom-center"
        toastOptions={{
          style: {
            background: "#3D3D3C",
            border: "1px solid #D4A017",
            color: "#ffffff",
          },
        }}
      />

      {/* Navbar fija */}
      <Navbar />

      {/* Banda marquee (debajo del navbar) */}
      <div className="pt-16">
        <MarqueeCore />
      </div>

      {/* Contenido central */}
      <div className="flex-1 flex flex-col items-center justify-center gap-12 px-4 py-12 sm:py-16">
        {/* Hero: logo + headline + subheadline */}
        <Hero />

        {/* Divisor */}
        <div
          className="w-24 h-px bg-brand-gold/40"
          aria-hidden="true"
        />

        {/* Countdown */}
        <CountdownTimer />

        {/* Divisor */}
        <div
          className="w-24 h-px bg-brand-gold/40"
          aria-hidden="true"
        />

        {/* Formulario waitlist */}
        <div id="waitlist-section" className="w-full max-w-md">
          <WaitlistForm />
        </div>
      </div>

      {/* Footer */}
      <Footer />

      {/* Hint teclado Cmd+K — visible solo en desktop */}
      <div
        className="hidden lg:flex fixed bottom-6 right-6 items-center gap-2 text-[11px] text-brand-gray/40 font-sans pointer-events-none select-none"
        aria-hidden="true"
      >
        <kbd className="font-mono bg-brand-graphite/60 px-2 py-1 rounded text-[10px]">
          ⌘K
        </kbd>
        <span>Comandos</span>
      </div>
    </div>
  );
}
