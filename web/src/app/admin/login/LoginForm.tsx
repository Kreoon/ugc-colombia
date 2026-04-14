"use client";

import { useState, type FormEvent } from "react";
import { Loader2 } from "lucide-react";

export function LoginForm() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) {
        setError(data.error ?? "Error desconocido");
        return;
      }
      window.location.href = "/admin/diagnosticos";
    } catch {
      setError("Error de red");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl p-6 bg-brand-graphite/40 border border-brand-gold/20 space-y-4"
    >
      <div>
        <label className="block text-[11px] font-sans font-semibold text-brand-gray mb-1.5 tracking-wider uppercase">
          Contraseña
        </label>
        <input
          type="password"
          autoFocus
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full bg-black/60 border border-brand-gold/30 rounded-lg px-4 py-3 text-white font-sans text-sm focus:outline-none focus:border-brand-yellow focus:ring-2 focus:ring-brand-yellow/30"
        />
      </div>

      {error && <p className="text-xs text-red-400">{error}</p>}

      <button
        type="submit"
        disabled={loading || !password}
        className="w-full py-3 rounded-lg font-sans font-bold text-sm tracking-wide bg-brand-yellow text-black hover:bg-brand-gold transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Verificando...
          </>
        ) : (
          "Entrar"
        )}
      </button>
    </form>
  );
}
