"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ExternalLink,
  Search,
  Flame,
  Snowflake,
  Sun,
  LogOut,
  Copy,
  Check,
  Instagram,
  Mail,
  Phone,
  Trash2,
} from "lucide-react";

export interface DiagnosticoRow {
  id: string;
  createdAt: string;
  companyName: string;
  fullName: string;
  instagramHandle: string;
  email: string;
  whatsapp: string;
  diagnosisSlug: string;
  diagnosisPublic: boolean;
  qualificationScore: number;
  temperature: "hot" | "warm" | "cold";
  leadType: "marca" | "creador";
  overallScore: number | null;
}

const TEMPERATURE_META = {
  hot: { label: "Hot", icon: Flame, color: "text-red-400", bg: "bg-red-500/10" },
  warm: { label: "Warm", icon: Sun, color: "text-amber-400", bg: "bg-amber-500/10" },
  cold: { label: "Cold", icon: Snowflake, color: "text-blue-400", bg: "bg-blue-500/10" },
} as const;

function formatDate(iso: string): string {
  try {
    const d = new Date(iso);
    return d.toLocaleString("es-CO", {
      day: "2-digit",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return iso;
  }
}

export function DiagnosticosList({ rows }: { rows: DiagnosticoRow[] }) {
  const [search, setSearch] = useState("");
  const [tempFilter, setTempFilter] = useState<"all" | "hot" | "warm" | "cold">(
    "all",
  );
  const [publicFilter, setPublicFilter] = useState<"all" | "public" | "private">(
    "all",
  );
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [toggling, setToggling] = useState<string | null>(null);
  const [localRows, setLocalRows] = useState(rows);

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return localRows.filter((r) => {
      if (tempFilter !== "all" && r.temperature !== tempFilter) return false;
      if (publicFilter === "public" && !r.diagnosisPublic) return false;
      if (publicFilter === "private" && r.diagnosisPublic) return false;
      if (!q) return true;
      return (
        r.companyName.toLowerCase().includes(q) ||
        r.fullName.toLowerCase().includes(q) ||
        r.email.toLowerCase().includes(q) ||
        r.instagramHandle.toLowerCase().includes(q) ||
        r.diagnosisSlug.toLowerCase().includes(q)
      );
    });
  }, [localRows, search, tempFilter, publicFilter]);

  const stats = useMemo(() => {
    return {
      total: localRows.length,
      hot: localRows.filter((r) => r.temperature === "hot").length,
      warm: localRows.filter((r) => r.temperature === "warm").length,
      cold: localRows.filter((r) => r.temperature === "cold").length,
      public: localRows.filter((r) => r.diagnosisPublic).length,
    };
  }, [localRows]);

  async function togglePublic(id: string, next: boolean) {
    setToggling(id);
    const res = await fetch("/api/admin/toggle-public", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, public: next }),
    });
    setToggling(null);
    if (res.ok) {
      setLocalRows((prev) =>
        prev.map((r) => (r.id === id ? { ...r, diagnosisPublic: next } : r)),
      );
    }
  }

  async function copyUrl(slug: string, id: string) {
    const url = `https://www.ugccolombia.co/diagnostico/${slug}`;
    await navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500);
  }

  async function deleteLead(id: string, label: string) {
    const ok = window.confirm(
      `¿Eliminar permanentemente el diagnóstico de "${label}"? Esta acción no se puede deshacer.`,
    );
    if (!ok) return;
    setToggling(id);
    const res = await fetch("/api/admin/delete-lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    setToggling(null);
    if (res.ok) {
      setLocalRows((prev) => prev.filter((r) => r.id !== id));
    } else {
      window.alert("No se pudo eliminar. Revisa la consola.");
    }
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.href = "/admin/login";
  }

  return (
    <main className="min-h-screen bg-brand-black text-white">
      <header className="border-b border-white/5 sticky top-0 bg-brand-black/95 backdrop-blur z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="font-display text-xl uppercase tracking-wide">
              Diagnósticos Admin
            </h1>
            <p className="text-xs text-brand-gray mt-0.5">
              {stats.total} total · {stats.hot} hot · {stats.warm} warm · {stats.cold} cold · {stats.public} públicos
            </p>
          </div>
          <button
            onClick={logout}
            className="flex items-center gap-2 text-xs text-brand-gray hover:text-white transition-colors px-3 py-2 rounded-lg border border-white/10"
          >
            <LogOut className="w-3.5 h-3.5" />
            Salir
          </button>
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
              value={tempFilter}
              onChange={(e) => setTempFilter(e.target.value as typeof tempFilter)}
              className="px-3 py-2.5 rounded-lg bg-black/60 border border-brand-gold/20 text-sm focus:outline-none"
            >
              <option value="all">Todas temp.</option>
              <option value="hot">🔥 Hot</option>
              <option value="warm">☀️ Warm</option>
              <option value="cold">❄️ Cold</option>
            </select>

            <select
              value={publicFilter}
              onChange={(e) => setPublicFilter(e.target.value as typeof publicFilter)}
              className="px-3 py-2.5 rounded-lg bg-black/60 border border-brand-gold/20 text-sm focus:outline-none"
            >
              <option value="all">Todos</option>
              <option value="public">Públicos</option>
              <option value="private">Privados</option>
            </select>
          </div>
        </div>
      </header>

      <section className="max-w-7xl mx-auto px-4 py-6">
        {filtered.length === 0 ? (
          <p className="text-center text-brand-gray py-12">
            No hay diagnósticos que coincidan con los filtros.
          </p>
        ) : (
          <div className="space-y-2">
            {filtered.map((r) => {
              const temp = TEMPERATURE_META[r.temperature];
              const TempIcon = temp.icon;
              const diagnosisUrl = `/diagnostico/${r.diagnosisSlug}`;

              return (
                <article
                  key={r.id}
                  className="rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] transition-colors p-4 grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-3"
                >
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-semibold text-white">
                        {r.companyName || r.fullName || "(sin nombre)"}
                      </h3>

                      <span
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${temp.bg} ${temp.color}`}
                      >
                        <TempIcon className="w-3 h-3" />
                        {temp.label}
                      </span>

                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-brand-yellow/10 text-brand-yellow">
                        {r.leadType}
                      </span>

                      {r.overallScore !== null && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/5 text-white">
                          AI {r.overallScore}/100
                        </span>
                      )}

                      {r.qualificationScore > 0 && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/5 text-brand-gray">
                          Lead {r.qualificationScore}/100
                        </span>
                      )}
                    </div>

                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-brand-gray">
                      {r.instagramHandle && (
                        <a
                          href={`https://instagram.com/${r.instagramHandle.replace(/^@/, "")}`}
                          target="_blank"
                          rel="noopener"
                          className="flex items-center gap-1 hover:text-brand-yellow"
                        >
                          <Instagram className="w-3 h-3" />@
                          {r.instagramHandle.replace(/^@/, "")}
                        </a>
                      )}
                      {r.email && (
                        <a
                          href={`mailto:${r.email}`}
                          className="flex items-center gap-1 hover:text-brand-yellow"
                        >
                          <Mail className="w-3 h-3" />
                          {r.email}
                        </a>
                      )}
                      {r.whatsapp && (
                        <a
                          href={`https://wa.me/${r.whatsapp.replace(/[^0-9]/g, "")}`}
                          target="_blank"
                          rel="noopener"
                          className="flex items-center gap-1 hover:text-brand-yellow"
                        >
                          <Phone className="w-3 h-3" />
                          {r.whatsapp}
                        </a>
                      )}
                      <span>📅 {formatDate(r.createdAt)}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 lg:justify-end">
                    {r.diagnosisSlug && (
                      <>
                        <Link
                          href={diagnosisUrl}
                          target="_blank"
                          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-brand-yellow/10 border border-brand-yellow/30 text-brand-yellow text-xs font-semibold hover:bg-brand-yellow/20 transition-colors"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          Ver
                        </Link>

                        <button
                          onClick={() => copyUrl(r.diagnosisSlug, r.id)}
                          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-brand-gray text-xs hover:text-white transition-colors"
                        >
                          {copiedId === r.id ? (
                            <>
                              <Check className="w-3.5 h-3.5" />
                              Copiado
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              URL
                            </>
                          )}
                        </button>
                      </>
                    )}

                    <button
                      onClick={() =>
                        deleteLead(
                          r.id,
                          r.companyName || r.fullName || r.email || r.id,
                        )
                      }
                      disabled={toggling === r.id}
                      title="Eliminar permanentemente"
                      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-semibold hover:bg-red-500/20 transition-colors disabled:opacity-50"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      Eliminar
                    </button>

                    <button
                      onClick={() => togglePublic(r.id, !r.diagnosisPublic)}
                      disabled={toggling === r.id}
                      className={`inline-flex items-center px-3 py-2 rounded-lg text-xs font-semibold transition-colors disabled:opacity-50 ${
                        r.diagnosisPublic
                          ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/25"
                          : "bg-white/5 text-brand-gray border border-white/10 hover:bg-white/10"
                      }`}
                    >
                      {r.diagnosisPublic ? "Público" : "Privado"}
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}
