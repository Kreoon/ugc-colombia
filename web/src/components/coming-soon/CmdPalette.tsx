"use client";

import { useEffect, useState } from "react";
import { Command } from "cmdk";
import { Instagram, Music2, Linkedin, MessageCircle, Mail, ExternalLink } from "lucide-react";

interface PaletteItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  action: () => void;
  disabled?: boolean;
}

interface CmdPaletteProps {
  onOpenWaitlist?: () => void;
}

export function CmdPalette({ onOpenWaitlist }: CmdPaletteProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
      if (e.key === "Escape") {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const items: PaletteItem[] = [
    {
      id: "waitlist",
      label: "Unirme a la waitlist",
      icon: <Mail size={16} aria-hidden="true" />,
      action: () => {
        setOpen(false);
        onOpenWaitlist?.();
        const el = document.getElementById("waitlist-section");
        el?.scrollIntoView({ behavior: "smooth", block: "center" });
      },
    },
    {
      id: "whatsapp",
      label: "WhatsApp",
      icon: <MessageCircle size={16} aria-hidden="true" />,
      action: () => {
        setOpen(false);
        window.open(
          "https://wa.me/573001234567?text=Hola%2C%20quiero%20saber%20m%C3%A1s%20de%20UGC%20Colombia",
          "_blank",
          "noopener,noreferrer"
        );
      },
    },
    {
      id: "instagram",
      label: "Instagram",
      icon: <Instagram size={16} aria-hidden="true" />,
      action: () => {
        setOpen(false);
        window.open("https://instagram.com/agenciaugccolombia", "_blank", "noopener,noreferrer");
      },
    },
    {
      id: "tiktok",
      label: "TikTok",
      icon: <Music2 size={16} aria-hidden="true" />,
      action: () => {
        setOpen(false);
        window.open("https://tiktok.com/@agenciaugccolombia", "_blank", "noopener,noreferrer");
      },
    },
    {
      id: "linkedin",
      label: "LinkedIn",
      icon: <Linkedin size={16} aria-hidden="true" />,
      action: () => {
        setOpen(false);
        window.open("https://linkedin.com/company/ugccolombia", "_blank", "noopener,noreferrer");
      },
    },
    {
      id: "kit",
      label: "Descargar Kit UGC 2026 (pronto)",
      icon: <ExternalLink size={16} aria-hidden="true" />,
      action: () => {
        setOpen(false);
      },
      disabled: true,
    },
  ];

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-start justify-center pt-[20vh] px-4"
      role="dialog"
      aria-modal="true"
      aria-label="Paleta de comandos"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />

      {/* Panel */}
      <div className="relative w-full max-w-lg">
        <Command
          className="bg-brand-graphite border border-brand-gold/30 rounded-xl overflow-hidden shadow-2xl shadow-black/60"
          label="Comandos de UGC Colombia"
        >
          <div className="border-b border-brand-graphite/80 px-4 py-3 flex items-center gap-3">
            <Command.Input
              placeholder="Buscar acción..."
              className="flex-1 bg-transparent text-white placeholder:text-brand-gray/50 font-sans text-sm focus:outline-none"
              autoFocus
            />
            <kbd className="hidden sm:inline-flex items-center gap-1 text-[10px] text-brand-gray/50 font-sans">
              <span>ESC</span>
            </kbd>
          </div>

          <Command.List className="max-h-[320px] overflow-y-auto py-2">
            <Command.Empty className="py-8 text-center text-brand-gray/60 font-sans text-sm">
              Sin resultados.
            </Command.Empty>

            <Command.Group heading="" className="[&_[cmdk-group-heading]]:hidden">
              {items.map((item) => (
                <Command.Item
                  key={item.id}
                  value={item.label}
                  disabled={item.disabled}
                  onSelect={item.action}
                  className={[
                    "flex items-center gap-3 px-4 py-3 font-sans text-sm cursor-pointer",
                    "transition-colors duration-100 rounded-md mx-1",
                    item.disabled
                      ? "text-brand-gray/30 cursor-not-allowed"
                      : "text-brand-gray hover:text-white data-[selected=true]:bg-brand-gold/10 data-[selected=true]:text-brand-gold",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                >
                  <span className="text-brand-gold/70">{item.icon}</span>
                  {item.label}
                  {item.disabled && (
                    <span className="ml-auto text-[10px] text-brand-gray/30 uppercase tracking-wider">
                      Pronto
                    </span>
                  )}
                </Command.Item>
              ))}
            </Command.Group>
          </Command.List>

          <div className="border-t border-brand-graphite/60 px-4 py-2 flex items-center justify-end gap-4">
            <span className="text-[11px] text-brand-gray/40 font-sans">
              <kbd className="font-mono">⌘K</kbd> para abrir / cerrar
            </span>
          </div>
        </Command>
      </div>
    </div>
  );
}
