"use client";

import { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Save, RotateCcw, AlertCircle, Check } from "lucide-react";
import { MarkdownRenderer } from "./MarkdownRenderer";

interface MarkdownEditorProps {
  filePath: string;
  initialContent: string;
  rawContent: string; // original del repo
  isOverridden: boolean;
}

export function MarkdownEditor({
  filePath,
  initialContent,
  rawContent,
  isOverridden,
}: MarkdownEditorProps) {
  const router = useRouter();
  const [content, setContent] = useState(initialContent);
  const [saving, setSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(true);

  const hasChanges = content !== initialContent;

  // Warn before leaving with unsaved changes
  useEffect(() => {
    if (!hasChanges) return;
    const handler = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      // Valor requerido por browsers legacy — browsers modernos ignoran el string
      return "";
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [hasChanges]);

  const handleSave = useCallback(async () => {
    setSaving(true);
    setError(null);

    try {
      const res = await fetch("/api/admin/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ filePath, content }),
      });

      if (!res.ok) {
        const data: { error?: string } = await res.json();
        setError(data.error ?? "Error al guardar");
        return;
      }

      setLastSaved(new Date());
      router.refresh();
    } catch {
      setError("Error de red al guardar");
    } finally {
      setSaving(false);
    }
  }, [filePath, content, router]);

  const handleRevert = useCallback(async () => {
    if (
      !confirm(
        "¿Revertir al contenido original del repo? Perderás tu edición actual."
      )
    )
      return;

    try {
      const res = await fetch("/api/admin/content", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ filePath }),
      });

      if (res.ok) {
        setContent(rawContent);
        setLastSaved(null);
        router.refresh();
      } else {
        const data: { error?: string } = await res.json();
        setError(data.error ?? "Error al revertir");
      }
    } catch {
      setError("Error de red al revertir");
    }
  }, [filePath, rawContent, router]);

  // Ctrl+S / Cmd+S
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "s") {
        e.preventDefault();
        if (hasChanges && !saving) handleSave();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [hasChanges, saving, handleSave]);

  return (
    <div className="flex flex-col h-[calc(100vh-3.5rem)]">
      {/* Toolbar */}
      <div className="flex items-center justify-between px-6 py-3 border-b border-brand-gold/15 bg-black/40 backdrop-blur-sm">
        <div className="flex items-center gap-3 text-sm">
          <code className="text-xs text-brand-gray">{filePath}</code>
          {hasChanges && (
            <span className="inline-flex items-center gap-1 text-xs text-brand-yellow">
              <AlertCircle className="w-3 h-3" aria-hidden="true" />
              Sin guardar
            </span>
          )}
          {lastSaved && !hasChanges && (
            <span className="inline-flex items-center gap-1 text-xs text-green-400">
              <Check className="w-3 h-3" aria-hidden="true" />
              Guardado {lastSaved.toLocaleTimeString("es-CO")}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setShowPreview((prev) => !prev)}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold text-brand-gray hover:text-white hover:bg-white/5 transition-colors"
            aria-pressed={showPreview}
          >
            {showPreview ? "Ocultar preview" : "Mostrar preview"}
          </button>

          {isOverridden && (
            <button
              type="button"
              onClick={handleRevert}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold text-red-400 border border-red-500/30 hover:bg-red-500/10 transition-colors"
              aria-label="Revertir al contenido original del repo"
            >
              <RotateCcw className="w-3 h-3" aria-hidden="true" />
              Revertir
            </button>
          )}

          <button
            type="button"
            onClick={handleSave}
            disabled={!hasChanges || saving}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-lg text-sm font-bold bg-brand-yellow text-black hover:bg-brand-gold disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            aria-label={saving ? "Guardando cambios" : "Guardar cambios"}
          >
            <Save className="w-4 h-4" aria-hidden="true" />
            {saving ? "Guardando..." : "Guardar"}
          </button>
        </div>
      </div>

      {/* Banner de error */}
      {error && (
        <div
          role="alert"
          className="px-6 py-3 bg-red-500/10 border-b border-red-500/30 text-red-400 text-sm"
        >
          {error}
        </div>
      )}

      {/* Split view: editor + preview */}
      <div
        className={`flex-1 grid ${
          showPreview ? "grid-cols-1 lg:grid-cols-2" : "grid-cols-1"
        } overflow-hidden`}
      >
        {/* Panel editor */}
        <div className="flex flex-col border-r border-brand-gold/15 overflow-hidden">
          <div className="px-6 py-2 text-[10px] uppercase tracking-[0.2em] font-semibold text-brand-gray border-b border-brand-gold/10">
            Editor
          </div>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            spellCheck={false}
            aria-label="Editor de markdown"
            className="flex-1 w-full px-6 py-4 bg-black text-white font-mono text-sm leading-relaxed resize-none focus:outline-none"
            placeholder="# Empieza a escribir..."
          />
        </div>

        {/* Panel preview */}
        {showPreview && (
          <div className="flex flex-col overflow-hidden">
            <div className="px-6 py-2 text-[10px] uppercase tracking-[0.2em] font-semibold text-brand-gray border-b border-brand-gold/10">
              Preview
            </div>
            <div className="flex-1 overflow-y-auto px-6 py-4" aria-live="polite">
              <MarkdownRenderer content={content} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
