"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { ChevronDown, LogOut } from "lucide-react";
import type { AdminUser } from "@/lib/auth";

function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

interface Crumb {
  label: string;
  href: string;
}

function getBreadcrumbs(pathname: string): Crumb[] {
  const parts = pathname.split("/").filter(Boolean);
  return parts.map((part, i) => ({
    label: capitalize(decodeURIComponent(part).replace(/-/g, " ")),
    href: "/" + parts.slice(0, i + 1).join("/"),
  }));
}

function getInitial(user: AdminUser): string {
  return (user.fullName ?? user.email).charAt(0).toUpperCase();
}

function getDisplayName(user: AdminUser): string {
  return user.fullName ?? user.email.split("@")[0];
}

interface HeaderProps {
  user: AdminUser;
}

export function Header({ user }: HeaderProps) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const crumbs = getBreadcrumbs(pathname);

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.href = "/admin/login";
  }

  return (
    <header className="sticky top-0 z-20 bg-brand-black/90 backdrop-blur-sm border-b border-brand-gold/15">
      <div className="flex items-center justify-between px-6 lg:px-8 h-14">
        {/* Breadcrumbs — con margen izquierdo para el toggle mobile */}
        <nav
          aria-label="Breadcrumb"
          className="flex-1 min-w-0 pl-12 lg:pl-0 overflow-hidden"
        >
          <ol className="flex items-center gap-2 text-sm text-brand-gray truncate">
            {crumbs.map((crumb, i) => (
              <li key={crumb.href} className="flex items-center gap-2">
                {i > 0 && (
                  <span className="text-brand-gold/40" aria-hidden="true">
                    /
                  </span>
                )}
                <span
                  className={
                    i === crumbs.length - 1
                      ? "text-white font-medium"
                      : "text-brand-gray"
                  }
                  aria-current={i === crumbs.length - 1 ? "page" : undefined}
                >
                  {crumb.label}
                </span>
              </li>
            ))}
          </ol>
        </nav>

        {/* Menú de usuario */}
        <div className="relative flex-shrink-0">
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-white/5 transition-colors"
            aria-label="Menú de cuenta"
            aria-expanded={menuOpen}
            aria-haspopup="menu"
          >
            {/* Avatar inicial */}
            <div
              className="w-8 h-8 rounded-full bg-brand-yellow text-black flex items-center justify-center font-bold text-sm flex-shrink-0"
              aria-hidden="true"
            >
              {getInitial(user)}
            </div>

            {/* Nombre y rol — solo en sm+ */}
            <div className="hidden sm:block text-left">
              <div className="text-sm text-white font-medium leading-tight">
                {getDisplayName(user)}
              </div>
              <div className="text-[10px] uppercase tracking-widest text-brand-yellow font-semibold">
                {user.role}
              </div>
            </div>

            <ChevronDown
              className={[
                "w-4 h-4 text-brand-gray transition-transform duration-200",
                menuOpen ? "rotate-180" : "",
              ].join(" ")}
              aria-hidden
            />
          </button>

          {/* Dropdown */}
          {menuOpen && (
            <>
              {/* Cierre al click fuera */}
              <div
                className="fixed inset-0 z-10"
                onClick={() => setMenuOpen(false)}
                aria-hidden="true"
              />
              <div
                role="menu"
                aria-label="Opciones de cuenta"
                className="absolute right-0 top-full mt-2 w-56 rounded-xl bg-brand-black border border-brand-gold/20 shadow-xl z-20 overflow-hidden"
              >
                {/* Info usuario */}
                <div className="p-4 border-b border-brand-gold/10">
                  <div className="text-sm text-white font-semibold">
                    {user.fullName ?? "—"}
                  </div>
                  <div className="text-xs text-brand-gray truncate">
                    {user.email}
                  </div>
                  <div className="text-[10px] uppercase tracking-widest text-brand-yellow font-semibold mt-1">
                    {user.role}
                  </div>
                </div>

                {/* Logout */}
                <button
                  role="menuitem"
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2 px-4 py-3 text-sm text-brand-gray hover:bg-white/5 hover:text-white transition-colors"
                >
                  <LogOut className="w-4 h-4" aria-hidden />
                  Cerrar sesión
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
