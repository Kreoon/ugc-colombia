"use client";

import { useState } from "react";
import { ChevronDown, Check, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  LEAD_STATUSES,
  LEAD_STATUS_META,
  type LeadStatus,
  statusMeta,
} from "@/lib/admin/lead-status";

interface Props {
  leadId: string;
  currentStatus: string | null | undefined;
  onChanged?: (next: LeadStatus) => void;
  size?: "sm" | "md";
}

export function StatusSelector({
  leadId,
  currentStatus,
  onChanged,
  size = "md",
}: Props) {
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [current, setCurrent] = useState<string | null | undefined>(currentStatus);
  const meta = statusMeta(current);

  async function changeTo(next: LeadStatus) {
    if (next === current) {
      setOpen(false);
      return;
    }
    setSaving(true);
    const res = await fetch(`/api/admin/leads/${leadId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: next }),
    });
    setSaving(false);
    if (res.ok) {
      setCurrent(next);
      setOpen(false);
      onChanged?.(next);
    } else {
      window.alert("No se pudo cambiar el status");
    }
  }

  const triggerSize =
    size === "md" ? "px-3 py-1.5 text-xs" : "px-2 py-1 text-[11px]";

  return (
    <div className="relative inline-block">
      <button
        type="button"
        onClick={() => !saving && setOpen((o) => !o)}
        disabled={saving}
        className={cn(
          "inline-flex items-center gap-1.5 rounded-lg border font-bold uppercase tracking-wider transition-colors",
          meta.bgColor,
          meta.color,
          meta.borderColor,
          "hover:bg-white/[0.06]",
          triggerSize,
          saving && "opacity-50 cursor-wait",
        )}
      >
        {saving ? (
          <Loader2 className="w-3 h-3 animate-spin" />
        ) : (
          <span aria-hidden>{meta.icon}</span>
        )}
        {meta.label}
        <ChevronDown className="w-3 h-3" />
      </button>

      {open && (
        <>
          <button
            type="button"
            aria-hidden
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-40 cursor-default"
          />
          <div className="absolute left-0 top-full mt-1 z-50 w-52 rounded-xl border border-white/10 bg-brand-black/95 backdrop-blur shadow-2xl p-1.5">
            {LEAD_STATUSES.map((s) => {
              const m = LEAD_STATUS_META[s];
              const isCurrent = current === s;
              return (
                <button
                  key={s}
                  type="button"
                  onClick={() => changeTo(s)}
                  className={cn(
                    "w-full flex items-center gap-2 px-2.5 py-2 rounded-lg text-left text-xs transition-colors hover:bg-white/[0.06]",
                    isCurrent && "bg-white/[0.04]",
                  )}
                >
                  <span aria-hidden className="w-4 text-center">
                    {m.icon}
                  </span>
                  <span className={cn("flex-1 font-semibold", m.color)}>
                    {m.label}
                  </span>
                  {isCurrent && <Check className="w-3.5 h-3.5 text-brand-yellow" />}
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
