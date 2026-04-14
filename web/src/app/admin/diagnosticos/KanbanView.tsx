"use client";

import { useState } from "react";
import Link from "next/link";
import { LogoAvatar } from "@/components/admin/LogoAvatar";
import { LEAD_STATUSES, LEAD_STATUS_META } from "@/lib/admin/lead-status";
import type { LeadCardData } from "@/components/admin/LeadCard";
import { cn } from "@/lib/utils";
import { Flame, Sun, Snowflake } from "lucide-react";

const TEMP_ICON = {
  hot: { icon: Flame, color: "text-red-400" },
  warm: { icon: Sun, color: "text-amber-400" },
  cold: { icon: Snowflake, color: "text-blue-400" },
} as const;

interface Props {
  rows: LeadCardData[];
  onStatusChange: (id: string, next: string) => Promise<void>;
}

function formatCop(value: number | null): string | null {
  if (!value) return null;
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
    notation: value > 1_000_000 ? "compact" : "standard",
  }).format(value);
}

export function KanbanView({ rows, onStatusChange }: Props) {
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [dragOverCol, setDragOverCol] = useState<string | null>(null);
  const [localRows, setLocalRows] = useState(rows);

  function handleDrop(targetStatus: string) {
    if (!draggingId) return;
    const lead = localRows.find((r) => r.id === draggingId);
    if (!lead || lead.status === targetStatus) {
      setDraggingId(null);
      setDragOverCol(null);
      return;
    }
    setLocalRows((prev) =>
      prev.map((r) => (r.id === draggingId ? { ...r, status: targetStatus } : r)),
    );
    onStatusChange(draggingId, targetStatus);
    setDraggingId(null);
    setDragOverCol(null);
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 px-4 pb-6">
      {LEAD_STATUSES.map((status) => {
        const meta = LEAD_STATUS_META[status];
        const items = localRows.filter((r) => (r.status ?? "new") === status);
        const totalDeal = items.reduce((acc, r) => acc + (r.dealValueCop ?? 0), 0);
        const isOver = dragOverCol === status;

        return (
          <div
            key={status}
            onDragOver={(e) => {
              e.preventDefault();
              setDragOverCol(status);
            }}
            onDragLeave={() => setDragOverCol(null)}
            onDrop={() => handleDrop(status)}
            className={cn(
              "flex flex-col rounded-2xl border bg-white/[0.02] min-h-[300px] transition-colors",
              isOver
                ? "border-brand-yellow/60 bg-brand-yellow/5"
                : "border-white/10",
            )}
          >
            <header className={cn("p-3 border-b border-white/5", meta.bgColor)}>
              <div className="flex items-center justify-between">
                <span
                  className={cn(
                    "inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider",
                    meta.color,
                  )}
                >
                  <span aria-hidden>{meta.icon}</span>
                  {meta.label}
                </span>
                <span className="text-xs text-brand-gray font-mono">
                  {items.length}
                </span>
              </div>
              {totalDeal > 0 && (
                <p className="text-[10px] text-emerald-400 font-bold mt-1">
                  {formatCop(totalDeal)}
                </p>
              )}
            </header>

            <div className="flex-1 p-2 space-y-2 overflow-y-auto max-h-[70vh]">
              {items.length === 0 ? (
                <p className="text-[11px] text-brand-gray/50 text-center py-4">
                  Sin leads
                </p>
              ) : (
                items.map((lead) => {
                  const name = lead.companyName || lead.fullName || "(sin nombre)";
                  const handle = lead.instagramHandle.replace(/^@/, "");
                  const tempInfo = TEMP_ICON[lead.temperature];
                  const TempIcon = tempInfo.icon;
                  const dealDisplay = formatCop(lead.dealValueCop);
                  const isDragging = draggingId === lead.id;

                  return (
                    <Link
                      key={lead.id}
                      href={`/admin/diagnosticos/${lead.id}`}
                      draggable
                      onDragStart={() => setDraggingId(lead.id)}
                      onDragEnd={() => setDraggingId(null)}
                      className={cn(
                        "block p-2.5 rounded-xl border bg-brand-black/40 hover:border-brand-gold/40 transition-colors cursor-move",
                        isDragging
                          ? "opacity-40 border-brand-yellow"
                          : "border-white/10",
                      )}
                    >
                      <div className="flex items-start gap-2 mb-1.5">
                        <LogoAvatar logoUrl={lead.logoUrl} name={name} size="sm" />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold text-white truncate">
                            {name}
                          </p>
                          {handle && (
                            <p className="text-[10px] text-brand-gray truncate">
                              @{handle}
                            </p>
                          )}
                        </div>
                        <TempIcon
                          className={cn("w-3.5 h-3.5 flex-shrink-0", tempInfo.color)}
                        />
                      </div>

                      <div className="flex items-center gap-1.5 flex-wrap">
                        {lead.overallScore !== null && (
                          <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-white/5 text-white">
                            AI {lead.overallScore}
                          </span>
                        )}
                        {dealDisplay && (
                          <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-emerald-500/10 text-emerald-400">
                            {dealDisplay}
                          </span>
                        )}
                      </div>

                      {lead.nextAction && (
                        <p className="text-[10px] text-brand-gray mt-1.5 truncate">
                          ⏰ {lead.nextAction}
                        </p>
                      )}
                    </Link>
                  );
                })
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
