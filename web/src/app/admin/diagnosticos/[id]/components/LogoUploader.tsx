"use client";

import { useRef, useState } from "react";
import { Upload, RefreshCw, Trash2, Loader2, Link2 } from "lucide-react";
import { LogoAvatar } from "@/components/admin/LogoAvatar";

interface Props {
  leadId: string;
  logoUrl: string | null;
  name: string;
  instagramHandle: string;
  onChanged: (url: string | null) => void;
}

export function LogoUploader({
  leadId,
  logoUrl,
  name,
  instagramHandle,
  onChanged,
}: Props) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [urlInput, setUrlInput] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  async function uploadFile(file: File) {
    setError("");
    setBusy(true);

    const fd = new FormData();
    fd.append("leadId", leadId);
    fd.append("file", file);

    const res = await fetch("/api/admin/logo-upload", {
      method: "POST",
      body: fd,
    });

    const data = (await res.json().catch(() => ({}))) as {
      ok?: boolean;
      logoUrl?: string;
      error?: string;
    };
    setBusy(false);

    if (!res.ok || !data.logoUrl) {
      setError(data.error ?? "Error al subir");
      return;
    }

    onChanged(data.logoUrl);
  }

  async function autoFetch() {
    if (!instagramHandle) return;
    setBusy(true);
    setError("");
    const res = await fetch("/api/admin/logo-fetch", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ leadId, instagramHandle }),
    });
    const data = (await res.json().catch(() => ({}))) as {
      logoUrl?: string | null;
      error?: string;
    };
    setBusy(false);
    if (!res.ok) {
      setError(data.error ?? "No se pudo auto-fetch");
      return;
    }
    if (!data.logoUrl) {
      setError("Instagram no devolvió avatar. Súbelo manualmente.");
      return;
    }
    onChanged(data.logoUrl);
  }

  async function setFromUrl() {
    const url = urlInput.trim();
    if (!url) return;
    setBusy(true);
    setError("");
    const res = await fetch(`/api/admin/leads/${leadId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ logo_url: url }),
    });
    setBusy(false);
    if (!res.ok) {
      setError("Error al guardar URL");
      return;
    }
    onChanged(url);
    setShowUrlInput(false);
    setUrlInput("");
  }

  async function removeLogo() {
    const ok = window.confirm("¿Eliminar logo? Se usarán iniciales en su lugar.");
    if (!ok) return;
    setBusy(true);
    const res = await fetch(`/api/admin/leads/${leadId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ logo_url: null }),
    });
    setBusy(false);
    if (res.ok) onChanged(null);
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <LogoAvatar logoUrl={logoUrl} name={name} size="lg" />
        <div className="flex-1 min-w-0">
          <p className="text-xs text-brand-gray truncate">
            {logoUrl ? "Logo actual" : "Sin logo — usando iniciales"}
          </p>
          {busy && (
            <p className="text-[10px] text-brand-yellow inline-flex items-center gap-1 mt-0.5">
              <Loader2 className="w-3 h-3 animate-spin" />
              Procesando...
            </p>
          )}
        </div>
      </div>

      <input
        ref={fileRef}
        type="file"
        accept="image/png,image/jpeg,image/webp,image/gif"
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) uploadFile(f);
          e.target.value = "";
        }}
      />

      <div className="grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          disabled={busy}
          className="inline-flex items-center justify-center gap-1.5 px-2 py-1.5 rounded-lg bg-brand-yellow/10 border border-brand-yellow/30 text-brand-yellow text-[11px] font-semibold hover:bg-brand-yellow/20 disabled:opacity-50"
        >
          <Upload className="w-3 h-3" />
          Subir
        </button>
        <button
          type="button"
          onClick={autoFetch}
          disabled={busy || !instagramHandle}
          className="inline-flex items-center justify-center gap-1.5 px-2 py-1.5 rounded-lg bg-white/5 border border-white/10 text-brand-gray text-[11px] hover:text-white disabled:opacity-40"
          title={!instagramHandle ? "Necesita Instagram handle" : "Fetch desde IG"}
        >
          <RefreshCw className="w-3 h-3" />
          IG
        </button>
        <button
          type="button"
          onClick={() => setShowUrlInput((v) => !v)}
          disabled={busy}
          className="inline-flex items-center justify-center gap-1.5 px-2 py-1.5 rounded-lg bg-white/5 border border-white/10 text-brand-gray text-[11px] hover:text-white disabled:opacity-50"
        >
          <Link2 className="w-3 h-3" />
          URL
        </button>
        <button
          type="button"
          onClick={removeLogo}
          disabled={busy || !logoUrl}
          className="inline-flex items-center justify-center gap-1.5 px-2 py-1.5 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-[11px] hover:bg-red-500/20 disabled:opacity-40"
        >
          <Trash2 className="w-3 h-3" />
          Borrar
        </button>
      </div>

      {showUrlInput && (
        <div className="flex gap-1.5">
          <input
            type="url"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            placeholder="https://..."
            className="flex-1 px-2 py-1.5 rounded-lg bg-black/60 border border-white/10 text-xs text-white focus:outline-none focus:border-brand-yellow"
          />
          <button
            type="button"
            onClick={setFromUrl}
            disabled={busy || !urlInput.trim()}
            className="px-3 py-1.5 rounded-lg bg-brand-yellow text-black text-xs font-bold hover:bg-brand-gold disabled:opacity-50"
          >
            OK
          </button>
        </div>
      )}

      {error && (
        <p className="text-[10px] text-red-400 bg-red-500/10 border border-red-500/20 rounded px-2 py-1">
          {error}
        </p>
      )}

      <p className="text-[10px] text-brand-gray/60 leading-relaxed">
        Formatos: PNG, JPG, WebP, GIF. Máx 3MB.
      </p>
    </div>
  );
}
