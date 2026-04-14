"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CurrencySwitcher } from "@/components/ui/CurrencySwitcher";
import { useAudit } from "@/components/lead-audit/AuditContext";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "Servicios", href: "/servicios", external: true as const },
  { label: "Casos", href: "/casos", external: true as const },
  { label: "Precios", href: "/precios", external: true as const },
  { label: "Sobre", href: "#sobre" },
  { label: "Blog", href: "#blog" },
] as const;

// Offset equal to navbar height to avoid content hidden under it
const SCROLL_OFFSET = 80;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { openAudit } = useAudit();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    // Set initial state
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close drawer on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setMobileOpen(false);
    };
    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleNavClick = useCallback((href: string) => {
    setMobileOpen(false);
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) {
      const top =
        el.getBoundingClientRect().top + window.scrollY - SCROLL_OFFSET;
      window.scrollTo({ top, behavior: "smooth" });
    }
  }, []);

  // Altura del navbar: compacta al scrollear
  const navbarHeight = scrolled ? "h-14" : "h-16";

  return (
    <header
      role="banner"
      style={{ top: "var(--banner-h, 0px)" }}
      className={cn(
        "fixed left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-black/92 backdrop-blur-md border-b border-brand-gold/20 shadow-[0_1px_20px_rgba(0,0,0,0.5)]"
          : "bg-black/60 backdrop-blur-sm border-b border-transparent"
      )}
    >
      <div
        className={cn(
          "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-6 transition-all duration-300",
          navbarHeight
        )}
      >
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
            className={cn(
              "w-auto transition-all duration-300",
              scrolled ? "h-7" : "h-8 sm:h-9"
            )}
            priority
          />
        </a>

        {/* Links desktop */}
        <nav
          aria-label="Navegación principal"
          className="hidden lg:flex items-center gap-1"
        >
          {NAV_LINKS.map((link) => {
            const className = cn(
              "px-4 py-2 text-sm font-sans font-medium text-brand-gray",
              "rounded-lg transition-all duration-150",
              "hover:text-white hover:bg-white/6",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold",
              "min-h-[44px] flex items-center"
            );
            if ("external" in link && link.external) {
              return (
                <a key={link.href} href={link.href} className={className}>
                  {link.label}
                </a>
              );
            }
            return (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className={className}
              >
                {link.label}
              </button>
            );
          })}
          <a
            href="/login"
            className={cn(
              "px-4 py-2 text-sm font-sans font-semibold text-brand-gray",
              "rounded-lg transition-all duration-150",
              "hover:text-white hover:bg-brand-gold/10",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold",
              "min-h-[44px] flex items-center"
            )}
          >
            Ingresar
          </a>
          <a
            href="/registro"
            className={cn(
              "px-4 py-2 text-sm font-sans font-semibold text-brand-yellow",
              "rounded-lg transition-all duration-150",
              "hover:text-white hover:bg-brand-gold/10",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold",
              "min-h-[44px] flex items-center"
            )}
          >
            Registro
          </a>
        </nav>

        {/* Lado derecho: CTA visible siempre en mobile + desktop */}
        <div className="flex items-center gap-2 sm:gap-3">
          <CurrencySwitcher className="hidden sm:flex" />
          {/* CTA visible en mobile (compacto) + desktop (normal) */}
          <Button
            size="default"
            onClick={() => openAudit("navbar_desktop")}
            className={cn(
              "font-semibold tracking-wide transition-all duration-300",
              "text-xs sm:text-sm",
              scrolled ? "px-3 sm:px-4 py-2" : "px-3 sm:px-5 py-2.5"
            )}
            aria-label="Aplicar ahora a UGC Colombia"
          >
            <span className="hidden sm:inline">Aplica ahora →</span>
            <span className="sm:hidden">Aplica →</span>
          </Button>

          {/* Botón hamburguesa mobile */}
          <button
            className={cn(
              "lg:hidden p-2 rounded-lg text-brand-gray",
              "hover:text-white hover:bg-white/8 transition-colors",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold",
              "min-w-[44px] min-h-[44px] flex items-center justify-center"
            )}
            aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <DialogPrimitive.Root open={mobileOpen} onOpenChange={setMobileOpen}>
        <DialogPrimitive.Portal>
          <DialogPrimitive.Overlay
            className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden"
            style={{ top: scrolled ? "56px" : "64px" }}
          />
          <DialogPrimitive.Content
            id="mobile-nav"
            aria-label="Menú de navegación móvil"
            className={cn(
              "fixed left-0 right-0 z-40 lg:hidden",
              "bg-black/97 backdrop-blur-xl border-b border-brand-gold/20",
              "px-4 py-5 flex flex-col gap-1",
              "data-[state=open]:animate-in data-[state=closed]:animate-out",
              "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
              "data-[state=closed]:slide-out-to-top-4 data-[state=open]:slide-in-from-top-4",
              "duration-200"
            )}
            style={{ top: scrolled ? "56px" : "64px" }}
          >
            <DialogPrimitive.Title className="sr-only">
              Menú de navegación
            </DialogPrimitive.Title>

            {NAV_LINKS.map((link) => {
              const className = cn(
                "w-full text-left px-4 py-3.5 text-base font-sans font-medium text-brand-gray",
                "rounded-xl transition-all duration-150 min-h-[44px]",
                "hover:text-white hover:bg-white/8 hover:translate-x-1",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold"
              );
              if ("external" in link && link.external) {
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={className}
                  >
                    {link.label}
                  </a>
                );
              }
              return (
                <button key={link.href} onClick={() => handleNavClick(link.href)} className={className}>
                  {link.label}
                </button>
              );
            })}

            <a
              href="/login"
              onClick={() => setMobileOpen(false)}
              className={cn(
                "w-full text-left px-4 py-3.5 text-base font-sans font-semibold text-brand-gray",
                "rounded-xl transition-all duration-150 min-h-[44px]",
                "hover:text-white hover:bg-brand-gold/10 hover:translate-x-1",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold"
              )}
            >
              Ingresar
            </a>
            <a
              href="/registro"
              onClick={() => setMobileOpen(false)}
              className={cn(
                "w-full text-left px-4 py-3.5 text-base font-sans font-semibold text-brand-yellow",
                "rounded-xl transition-all duration-150 min-h-[44px]",
                "hover:text-white hover:bg-brand-gold/10 hover:translate-x-1",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold"
              )}
            >
              Registro →
            </a>

            <div className="mt-3 pt-4 border-t border-white/10 flex items-center gap-3">
              <CurrencySwitcher />
              <Button
                size="lg"
                className="flex-1 min-h-[48px] text-base font-bold"
                onClick={() => openAudit("navbar_mobile")}
              >
                Aplica ahora →
              </Button>
            </div>
          </DialogPrimitive.Content>
        </DialogPrimitive.Portal>
      </DialogPrimitive.Root>
    </header>
  );
}
