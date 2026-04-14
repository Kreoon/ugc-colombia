"use client";

import { useState } from "react";
import { Plus, Loader2 } from "lucide-react";
import type { Activity } from "../LeadDetailClient";
import { ACTIVITY_TYPES } from "@/lib/admin/activity-logger";

const ICON_BY_TYPE: Record<string, string> = {
  quiz_completed: "🧠",
  diagnosis_generated: "✨",
  status_changed: "🔄",
  note_added: "📝",
  contact_logged: "📇",
  whatsapp_sent: "📱",
  email_sent: "📧",
  call_logged: "📞",
  meeting_scheduled: "📅",
  meeting_completed: "✅",
  deal_value_updated: "💰",
  next_action_set: "⏰",
  logo_updated: "🖼️",
  won: "🏆",
  lost: "❌",
};

function formatDateTime(iso: string): string {
  return new Date(iso).toLocaleString("es-CO", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatRelative(iso: string): string {
  const ms = Date.now() - new Date(iso).getTime();
  const min = Math.floor(ms / 60000);
  if (min < 1) return "ahora";
  if (min < 60) return `hace ${min}m`;
  const h = Math.floor(min / 60);
  if (h < 24) return `hace ${h}h`;
  const d = Math.floor(h / 24);
  if (d < 30) return `hace ${d}d`;
  return formatDateTime(iso);
}

interface Props {
  leadId: string;
  activities: Activity[];
  onAdded: (a: Activity) => void;
}

export function ActivityTab({ leadId, activities, onAdded }: Props) {
  const [showForm, setShowForm] = useState(false);
  const [type, setType] = useState<string>("contact_logged");
  const [description, setDescription] = useState("");
  const [saving, setSaving] = useState(false);

  async function submit() {
    if (!description.trim()) return;
    setSaving(true);
    const res = await fetch(`/api/admin/leads/${leadId}/activities`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type, description: description.trim() }),
    });
    setSaving(false);
    if (res.ok) {
      // Optimistic add
      onAdded({
        id: crypto.randomUUID(),
        leadId,
        type,
        description: description.trim(),
        metadata: {},
        createdAt: new Date().toISOString(),
        createdBy: "admin",
      });
      setDescription("");
      setShowForm(false);
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-display text-lg uppercase tracking-tight text-white">
          Actividad
        </h3>
        <button
          type="button"
          onClick={() => setShowForm((v) => !v)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-brand-yellow text-black text-xs font-bold hover:bg-brand-gold"
        >
          <Plus className="w-3.5 h-3.5" />
          Agregar
        </button>
      </div>

      {showForm && (
        <div className="rounded-xl border border-brand-gold/30 bg-brand-yellow/[0.04] p-4 space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-[200px_1fr] gap-3">
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="px-2 py-2 rounded-lg bg-black/60 border border-white/10 text-sm focus:outline-none"
            >
              {ACTIVITY_TYPES.map((t) => (
                <option key={t} value={t}>
                  {ICON_BY_TYPE[t] ?? "•"} {t.replace(/_/g, " ")}
                </option>
              ))}
            </select>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Descripción de la actividad"
              className="px-3 py-2 rounded-lg bg-black/60 border border-white/10 text-sm focus:outline-none focus:border-brand-yellow"
            />
          </div>
          <div className="flex gap-2 justify-end">
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="px-3 py-1.5 rounded-lg text-xs text-brand-gray hover:text-white"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={submit}
              disabled={saving || !description.trim()}
              className="px-3 py-1.5 rounded-lg bg-brand-yellow text-black text-xs font-bold disabled:opacity-50"
            >
              {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : "Guardar"}
            </button>
          </div>
        </div>
      )}

      {activities.length === 0 ? (
        <p className="text-center text-brand-gray py-8">
          Sin actividades registradas aún.
        </p>
      ) : (
        <ol className="relative border-l border-white/10 ml-3 space-y-4">
          {activities.map((a) => (
            <li key={a.id} className="ml-6">
              <span className="absolute -left-[13px] flex items-center justify-center w-6 h-6 rounded-full bg-brand-graphite border border-white/10 text-sm">
                {ICON_BY_TYPE[a.type] ?? "•"}
              </span>
              <div className="rounded-xl border border-white/10 bg-white/[0.02] p-3">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-sm text-white/90 font-medium">
                    {a.description ?? a.type.replace(/_/g, " ")}
                  </p>
                  <time
                    title={formatDateTime(a.createdAt)}
                    className="text-[10px] text-brand-gray font-mono whitespace-nowrap"
                  >
                    {formatRelative(a.createdAt)}
                  </time>
                </div>
                <p className="text-[10px] uppercase tracking-widest text-brand-gray mt-1">
                  {a.type.replace(/_/g, " ")}
                  {a.createdBy && ` · ${a.createdBy}`}
                </p>
              </div>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
