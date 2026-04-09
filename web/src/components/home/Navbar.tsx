"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "Servicios", href: "#servicios" },
  { label: "Casos", href: "#casos" },
  { label: "Pricing", href: "#pricing" },
  { label: "Sobre", href: "#sobre" },
  { label: "Blog", href: "#blog" },
] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <header
      role="banner"
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-black/90 backdrop-blur-md border-b border-brand-gold/20 shadow-[0_1px_20px_rgba(0,0,0,0.5)]"
          : "bg-black/60 backdrop-blur-sm border-b border-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-18 flex items-center justify-between gap-8">
        {/* Logo */}
        <a
          href="/"
          className="flex-shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold rounded-sm"
          aria-label="UGC Colombia — Inicio"
        >
          <Image
            src="/brand/logo-dark-bg.png"
            alt="UGC Colombia"
            width={148}
            height={40}
            className="h-8 sm:h-9 w-auto"
            priority
          />
        </a>

        {/* Links desktop */}
        <nav
          aria-label="Navegación principal"
          className="hidden lg:flex items-center gap-1"
        >
          {NAV_LINKS.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNavClick(link.href)}
              className={cn(
                "px-4 py-2 text-sm font-sans font-medium text-brand-gray",
                "rounded-lg transition-all duration-150",
                "hover:text-white hover:bg-white/6",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold"
              )}
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* CTA desktop */}
        <div className="hidden lg:flex items-center gap-3">
          <Button
            size="default"
            onClick={() => handleNavClick("#contacto")}
            className="font-semibold tracking-wide text-sm"
          >
            Discovery Call →
          </Button>
        </div>

        {/* Botón hamburguesa mobile */}
        <button
          className={cn(
            "lg:hidden p-2 rounded-lg text-brand-gray",
            "hover:text-white hover:bg-white/8 transition-colors",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold"
          )}
          aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav"
          onClick={() => setMobileOpen((v) => !v)}
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile drawer — radix dialog sin portal para que quede dentro del header flow */}
      <DialogPrimitive.Root open={mobileOpen} onOpenChange={setMobileOpen}>
        <DialogPrimitive.Portal>
          <DialogPrimitive.Overlay className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden" />
          <DialogPrimitive.Content
            id="mobile-nav"
            aria-label="Menú de navegación móvil"
            className={cn(
              "fixed top-16 left-0 right-0 z-40 lg:hidden",
              "bg-black/95 backdrop-blur-xl border-b border-brand-gold/20",
              "px-4 py-6 flex flex-col gap-2",
              "data-[state=open]:animate-in data-[state=closed]:animate-out",
              "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
              "data-[state=closed]:slide-out-to-top-2 data-[state=open]:slide-in-from-top-2",
              "duration-200"
            )}
          >
            <DialogPrimitive.Title className="sr-only">
              Menú de navegación
            </DialogPrimitive.Title>
            {NAV_LINKS.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className={cn(
                  "w-full text-left px-4 py-3.5 text-base font-sans font-medium text-brand-gray",
                  "rounded-xl transition-all duration-150",
                  "hover:text-white hover:bg-white/8 hover:translate-x-1",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold"
                )}
              >
                {link.label}
              </button>
            ))}
            <div className="mt-2 pt-4 border-t border-white/10">
              <Button
                size="lg"
                className="w-full"
                onClick={() => handleNavClick("#contacto")}
              >
                Discovery Call →
              </Button>
            </div>
          </DialogPrimitive.Content>
        </DialogPrimitive.Portal>
      </DialogPrimitive.Root>
    </header>
  );
}
