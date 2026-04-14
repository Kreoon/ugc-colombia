"use client";

import { useMemo, useState } from "react";
import { Search, LogOut, LayoutGrid, List, Columns3 } from "lucide-react";
import { LeadCard, type LeadCardData } from "@/components/admin/LeadCard";
import { KanbanView } from "./KanbanView";
import { LEAD_STATUSES, LEAD_STATUS_META } from "@/lib/admin/lead-status";
import { cn } from "@/lib/utils";

type ViewMode = "list" | "kanban";

interface Props {
  rows: LeadCardData[];
}

export function DiagnosticosList({ rows }: Props) {
  const [search, setSearch] = useState("");
  const [tempFilter, setTempFilter] = useState<"all" | "hot" | "warm" | "cold">("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [view, setView] = useState<ViewMode>("list");
  const [busyId, setBusyId] = useState<string | null>(null);
  const [localRows, setLocalRows] = useState(rows);

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return localRows.filter((r) => {
      if (tempFilter !== "all" && r.temperature !== tempFilter) return false;
      if (statusFilter !== "all" && (r.status ?? "new") !== statusFilter) return false;
      if (!q) return true;
      return (
        r.companyName.toLowerCase().includes(q) ||
        r.fullName.toLowerCase().includes(q) ||
        r.email.toLowerCase().includes(q) ||
        r.instagramHandle.toLowerCase().includes(q) ||
        r.diagnosisSlug.toLowerCase().includes(q)
      );
    });
  }, [localRows, search, tempFilter, statusFilter]);

  const stats = useMemo(() => {
    const totalDeal = localRows.reduce((acc, r) => acc + (r.dealValueCop ?? 0), 0);
    return {
      total: localRows.length,
      hot: localRows.filter((r) => r.temperature === "hot").length,
      warm: localRows.filter((r) => r.temperature === "warm").length,
      cold: localRows.filter((r) => r.temperature === "cold").length,
      pendingActions: localRows.filter((r) => r.nextActionAt && new Date(r.nextActionAt) < new Date()).length,
      totalDeal,
    };
  }, [localRows]);

  async function handleDelete(id: string, label: string) {
    const ok = window.confirm(
      `¿Eliminar permanentemente el diagnóstico de "${label}"? Esta acción no se puede deshacer.`,
    );
    if (!ok) return;
    setBusyId(id);
    const res = await fetch("/api/admin/delete-lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    setBusyId(null);
    if (res.ok) {
      setLocalRows((prev) => prev.filter((r) => r.id !== id));
    } else {
      window.alert("No se pudo eliminar.");
    }
  }

  async function handleStatusChange(id: string, next: string) {
    setLocalRows((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: next } : r)),
    );
    const res = await fetch(`/api/admin/leads/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: next }),
    });
    if (!res.ok) {
      window.alert("No se pudo cambiar status. Revertir manualmente.");
    }
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.href = "/admin/login";
  }

  return (
    <main className="min-h-screen bg-brand-black text-white">
      <header className="border-b border-white/5 sticky top-0 bg-brand-black/95 backdrop-blur z-20">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-xl uppercase tracking-wide">
              CRM · UGC Colombia
            </h1>
            <p className="text-xs text-brand-gray mt-0.5">
              {stats.total} leads · 🔥 {stats.hot} · ☀️ {stats.warm} · ❄️ {stats.cold}
              {stats.pendingActions > 0 && (
                <span className="ml-2 text-red-400 font-semibold">
                  · ⚠️ {stats.pendingActions} acciones vencidas
                </span>
              )}
              {stats.totalDeal > 0 && (
                <span className="ml-2 text-emerald-400 font-semibold">
                  · 💰 {new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0, notation: "compact" }).format(stats.totalDeal)} pipeline
                </span>
              )}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex rounded-lg border border-white/10 overflow-hidden">
              <button
                onClick={() => setView("list")}
                className={cn(
                  "p-2 text-xs flex items-center gap-1.5",
                  view === "list"
                    ? "bg-brand-yellow/15 text-brand-yellow"
                    : "text-brand-gray hover:bg-white/5",
                )}
                aria-label="Vista lista"
              >
                <List className="w-3.5 h-3.5" />
                Lista
              </button>
              <button
                onClick={() => setView("kanban")}
                className={cn(
                  "p-2 text-xs flex items-center gap-1.5 border-l border-white/10",
                  view === "kanban"
                    ? "bg-brand-yellow/15 text-brand-yellow"
                    : "text-brand-gray hover:bg-white/5",
                )}
                aria-label="Vista kanban"
              >
                <Columns3 className="w-3.5 h-3.5" />
                Kanban
              </button>
            </div>
            <button
              onClick={logout}
              className="flex items-center gap-2 text-xs text-brand-gray hover:text-white transition-colors px-3 py-2 rounded-lg border border-white/10"
            >
              <LogOut className="w-3.5 h-3.5" />
              Salir
            </button>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 pb-4 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-gray" />
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar por marca, nombre, email, handle..."
              className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-black/60 border border-brand-gold/20 text-sm focus:outline-none focus:border-brand-yellow"
            />
          </div>

          <div className="flex gap-2">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2.5 rounded-lg bg-black/60 border border-brand-gold/20 text-sm focus:outline-none"
            >
              <option value="all">Todos status</option>
              {LEAD_STATUSES.map((s) => (
                <option key={s} value={s}>
                  {LEAD_STATUS_META[s].icon} {LEAD_STATUS_META[s].label}
                </option>
              ))}
            </select>

            <select
              value={tempFilter}
              onChange={(e) => setTempFilter(e.target.value as typeof tempFilter)}
              className="px-3 py-2.5 rounded-lg bg-black/60 border border-brand-gold/20 text-sm focus:outline-none"
            >
              <option value="all">Todas temp.</option>
              <option value="hot">🔥 Hot</option>
              <option value="warm">☀️ Warm</option>
              <option value="cold">❄️ Cold</option>
            </select>
          </div>
        </div>
      </header>

      {view === "list" ? (
        <section className="max-w-5xl mx-auto px-4 py-6">
          {filtered.length === 0 ? (
            <p className="text-center text-brand-gray py-12">
              No hay diagnósticos que coincidan con los filtros.
            </p>
          ) : (
            <div className="space-y-3">
              {filtered.map((r) => (
                <LeadCard
                  key={r.id}
                  lead={r}
                  onDelete={handleDelete}
                  busy={busyId === r.id}
                />
              ))}
            </div>
          )}
        </section>
      ) : (
        <section className="max-w-7xl mx-auto py-4">
          <KanbanView rows={filtered} onStatusChange={handleStatusChange} />
        </section>
      )}
    </main>
  );
}
