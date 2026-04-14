"use client";

import { useState } from "react";
import { Save, Loader2, Check } from "lucide-react";

interface Props {
  leadId: string;
  initialNotes: string;
  updatedAt: string | null;
  onSaved: (notes: string) => void;
}

export function NotesTab({ leadId, initialNotes, updatedAt, onSaved }: Props) {
  const [notes, setNotes] = useState(initialNotes);
  const [saving, setSaving] = useState(false);
  const [savedAt, setSavedAt] = useState<string | null>(updatedAt);
  const [justSaved, setJustSaved] = useState(false);

  async function save() {
    setSaving(true);
    const res = await fetch(`/api/admin/leads/${leadId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ notes }),
    });
    setSaving(false);
    if (res.ok) {
      onSaved(notes);
      setSavedAt(new Date().toISOString());
      setJustSaved(true);
      setTimeout(() => setJustSaved(false), 2000);
    } else {
      window.alert("No se pudo guardar las notas");
    }
  }

  const dirty = notes !== initialNotes;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="font-display text-lg uppercase tracking-tight text-white">
          Notas internas
        </h3>
        <div className="flex items-center gap-3">
          {savedAt && (
            <p className="text-[10px] text-brand-gray">
              Última actualización: {new Date(savedAt).toLocaleString("es-CO")}
            </p>
          )}
          <button
            type="button"
            onClick={save}
            disabled={saving || !dirty}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-brand-yellow text-black text-xs font-bold hover:bg-brand-gold disabled:opacity-50"
          >
            {saving ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : justSaved ? (
              <Check className="w-3.5 h-3.5" />
            ) : (
              <Save className="w-3.5 h-3.5" />
            )}
            {justSaved ? "Guardado" : "Guardar"}
          </button>
        </div>
      </div>

      <textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        placeholder="Notas internas sobre este lead. Markdown soportado: **bold**, *italic*, listas con -. Solo visible en el admin."
        rows={20}
        className="w-full px-4 py-3 rounded-2xl bg-black/60 border border-white/10 text-sm text-white font-mono leading-relaxed focus:outline-none focus:border-brand-yellow resize-y min-h-[400px]"
      />

      <p className="text-[10px] text-brand-gray">
        💡 Tip: usa este espacio para registrar contexto, learnings, links a
        proposals, etc.
      </p>
    </div>
  );
}
