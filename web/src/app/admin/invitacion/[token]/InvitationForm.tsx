"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

interface InvitationFormProps {
  token: string;
  email: string;
}

export function InvitationForm({ token, email }: InvitationFormProps) {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const res = await fetch("/api/admin/accept-invitation", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, password, fullName }),
    });

    if (!res.ok) {
      const data = (await res.json().catch(() => ({}))) as {
        error?: string;
      };
      setError(data.error ?? "Error al aceptar invitación");
      setLoading(false);
      return;
    }

    router.push("/admin/login");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-xs font-semibold text-brand-yellow uppercase tracking-widest mb-2">
          Email
        </label>
        <input
          type="email"
          value={email}
          disabled
          className="w-full h-12 px-4 rounded-xl bg-white/4 border border-brand-gold/15 text-brand-gray cursor-not-allowed"
          aria-label="Email de invitación (no editable)"
        />
      </div>

      <div>
        <label className="block text-xs font-semibold text-brand-yellow uppercase tracking-widest mb-2">
          Tu nombre
        </label>
        <input
          type="text"
          required
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="w-full h-12 px-4 rounded-xl bg-white/4 border border-brand-gold/15 text-white focus:border-brand-yellow focus:outline-none transition-colors"
          placeholder="Nombre completo"
          autoComplete="name"
        />
      </div>

      <div>
        <label className="block text-xs font-semibold text-brand-yellow uppercase tracking-widest mb-2">
          Crea tu contraseña
        </label>
        <input
          type="password"
          required
          minLength={8}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full h-12 px-4 rounded-xl bg-white/4 border border-brand-gold/15 text-white focus:border-brand-yellow focus:outline-none transition-colors"
          autoComplete="new-password"
        />
        <p className="text-xs text-brand-gray mt-1">Mínimo 8 caracteres</p>
      </div>

      {error && (
        <div className="px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={loading || !fullName || !password}
        className="w-full h-12 rounded-xl bg-brand-yellow text-black font-bold hover:bg-brand-gold hover:shadow-[0_0_20px_rgba(212,160,23,0.5)] transition-all disabled:opacity-50 flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Creando cuenta...
          </>
        ) : (
          "Aceptar y entrar"
        )}
      </button>
    </form>
  );
}
