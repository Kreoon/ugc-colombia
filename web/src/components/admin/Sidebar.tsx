"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  LayoutDashboard,
  Users,
  FileText,
  Palette,
  TrendingUp,
  Calendar,
  Package,
  BookOpen,
  Menu,
  X,
  Building2,
  Briefcase,
  Target,
  Users2,
  Film,
  Sparkles,
  Archive,
  Scissors,
} from "lucide-react";
import type { AdminUser, Role } from "@/lib/auth";

interface NavItem {
  href: string;
  label: string;
  icon: React.ElementType;
  requiresRole?: Role[];
}

interface NavSection {
  section: string;
  items: NavItem[];
}

const nav: NavSection[] = [
  {
    section: "General",
    items: [
      { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
      { href: "/admin/diagnosticos", label: "Diagnósticos", icon: FileText },
    ],
  },
  {
    section: "Empresa",
    items: [
      { href: "/admin/empresa/identidad", label: "Identidad Corporativa", icon: Building2 },
      { href: "/admin/empresa/modelo-negocio", label: "Modelo de Negocio", icon: Briefcase },
      { href: "/admin/empresa/estrategia", label: "Estrategia & OKRs", icon: Target },
      { href: "/admin/empresa/equipo", label: "Equipo & Organigrama", icon: Users2 },
      { href: "/admin/empresa/mercado", label: "Mercado & Competencia", icon: TrendingUp },
    ],
  },
  {
    section: "Marca",
    items: [
      { href: "/admin/marca", label: "Manual de Marca", icon: Palette },
    ],
  },
  {
    section: "Contenido & Viralidad",
    items: [
      { href: "/admin/contenido/guiones", label: "Guiones", icon: Film },
      { href: "/admin/viralidad/parrilla", label: "Parrilla", icon: Calendar },
      { href: "/admin/viralidad/modelo", label: "Modelo de Viralidad", icon: TrendingUp },
      { href: "/admin/contenido/hooks", label: "Banco de Hooks", icon: Sparkles },
      { href: "/admin/viralidad/calendarios", label: "Calendarios Q3", icon: Calendar },
      { href: "/admin/viralidad/benchmark", label: "Benchmark", icon: BookOpen },
      { href: "/admin/contenido/publicados", label: "Publicados", icon: Archive },
      { href: "/admin/contenido/valentina", label: "Cola Valentina", icon: Scissors },
    ],
  },
  {
    section: "Equipo",
    items: [
      {
        href: "/admin/equipo",
        label: "Miembros",
        icon: Users,
        requiresRole: ["founder", "manager"],
      },
      { href: "/admin/actividad", label: "Actividad", icon: FileText },
    ],
  },
];

interface SidebarProps {
  user: AdminUser;
}

export function Sidebar({ user }: SidebarProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  function isActive(href: string): boolean {
    if (href === "/admin") return pathname === "/admin";
    return pathname.startsWith(href);
  }

  return (
    <>
      {/* Botón toggle mobile */}
      <button
        onClick={() => setMobileOpen((v) => !v)}
        className="lg:hidden fixed top-4 left-4 z-50 w-10 h-10 flex items-center justify-center rounded-lg bg-brand-yellow text-black shadow-lg"
        aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
        aria-expanded={mobileOpen}
        aria-controls="admin-sidebar"
      >
        {mobileOpen ? (
          <X className="w-5 h-5" aria-hidden />
        ) : (
          <Menu className="w-5 h-5" aria-hidden />
        )}
      </button>

      {/* Overlay mobile */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/80 z-30"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        id="admin-sidebar"
        className={[
          "fixed lg:static inset-y-0 left-0 z-40",
          "w-64 bg-brand-black border-r border-brand-gold/15",
          "flex flex-col overflow-y-auto",
          "transform transition-transform duration-300 ease-in-out",
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
        ].join(" ")}
      >
        {/* Logo */}
        <div className="px-6 py-6 border-b border-brand-gold/10 flex-shrink-0">
          <Link href="/admin" onClick={() => setMobileOpen(false)}>
            <Image
              src="/brand/logo-dark-bg.png"
              alt="UGC Colombia"
              width={148}
              height={40}
              className="w-auto h-8"
              priority
            />
          </Link>
          <div className="text-[10px] uppercase tracking-[0.2em] text-brand-yellow mt-2 font-semibold">
            · Admin
          </div>
        </div>

        {/* Nav */}
        <nav className="py-4 flex-1" aria-label="Navegación admin">
          {nav.map((section) => {
            const visibleItems = section.items.filter(
              (item) =>
                !item.requiresRole || item.requiresRole.includes(user.role)
            );

            if (visibleItems.length === 0) return null;

            return (
              <div key={section.section} className="mb-6">
                <div className="px-6 mb-2 text-[10px] uppercase tracking-[0.2em] font-semibold text-brand-gray">
                  {section.section}
                </div>
                <ul role="list">
                  {visibleItems.map((item) => {
                    const active = isActive(item.href);
                    const Icon = item.icon;
                    return (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          onClick={() => setMobileOpen(false)}
                          aria-current={active ? "page" : undefined}
                          className={[
                            "flex items-center gap-3 px-6 py-2.5 text-sm font-medium transition-colors",
                            active
                              ? "bg-brand-yellow/10 text-brand-yellow border-l-2 border-brand-yellow"
                              : "text-brand-gray hover:text-white hover:bg-white/5 border-l-2 border-transparent",
                          ].join(" ")}
                        >
                          <Icon className="w-4 h-4 flex-shrink-0" aria-hidden />
                          <span>{item.label}</span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
