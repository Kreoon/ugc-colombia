"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface NavLink {
  label: string;
  href: string;
}

const navLinks: NavLink[] = [
  { label: "Servicios", href: "/servicios" },
  { label: "Casos", href: "/casos" },
  { label: "Precios", href: "/precios" },
  { label: "Blog", href: "/blog" },
  { label: "Sobre nosotros", href: "/sobre" },
];

export function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Cerrar menu al cambiar ruta
  React.useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-brand-cream/95 backdrop-blur-sm border-b border-zinc-200 shadow-sm"
          : "bg-transparent"
      )}
    >
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8"
        aria-label="Navegación principal"
      >
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 font-serif font-semibold text-xl text-brand-black"
          aria-label="UGC Colombia — Inicio"
        >
          <span className="text-brand-gold font-bold">UGC</span>
          <span>Colombia</span>
        </Link>

        {/* Links desktop */}
        <ul className="hidden md:flex items-center gap-8" role="list">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-brand-black",
                  pathname === link.href
                    ? "text-brand-black border-b-2 border-brand-gold pb-0.5"
                    : "text-zinc-600"
                )}
                aria-current={pathname === link.href ? "page" : undefined}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* CTA desktop */}
        <div className="hidden md:flex items-center gap-3">
          <Button variant="gold" size="sm" asChild>
            <Link href="/discovery-call">Agendar llamada</Link>
          </Button>
        </div>

        {/* Botón hamburguesa mobile */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 rounded-lg text-brand-black hover:bg-brand-black/5 transition-colors"
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {/* Menu mobile */}
      {isOpen && (
        <div
          id="mobile-menu"
          className="md:hidden bg-brand-cream border-t border-zinc-200 px-6 py-4"
          role="dialog"
          aria-label="Menú de navegación"
        >
          <ul className="flex flex-col gap-4" role="list">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    "block py-2 text-base font-medium transition-colors",
                    pathname === link.href
                      ? "text-brand-black"
                      : "text-zinc-600 hover:text-brand-black"
                  )}
                  aria-current={pathname === link.href ? "page" : undefined}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="pt-2 border-t border-zinc-200">
              <Button variant="gold" className="w-full" asChild>
                <Link href="/discovery-call">Agendar llamada</Link>
              </Button>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
