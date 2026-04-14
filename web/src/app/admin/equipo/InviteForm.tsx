"use client";

import { useState, type FormEvent } from "react";
import { Loader2, Copy, Check } from "lucide-react";

type Role = "founder" | "manager" | "coordinator" | "sales" | "creative";

const ROLE_LABELS: Record<Role, string> = {
  founder: "Founder",
  manager: "Manager",
  coordinator: "Coordinator",
  sales: "Sales",
  creative: "Creative",
};

interface InviteResult {
  ok: boolean;
  inviteUrl: string;
}

export function InviteForm() {
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [role, setRole] = useState<Role>("coordinator");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [inviteUrl, setInviteUrl] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setInviteUrl(null);

    const res = await fetch("/api/admin/invite", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, fullName, role }),
    });

    const data = (await res.json().catch(() => ({}))) as Partial<InviteResult> & {
      error?: string;
    };

    if (!res.ok) {
      setError(data.error ?? "Error al crear invitación");
      setLoading(false);
      return;
    }

    setInviteUrl(data.inviteUrl ?? null);
    setEmail("");
    setFullName("");
    setRole("coordinator");
    setLoading(false);
  }

  async function copyToClipboard() {
    if (!inviteUrl) return;
    await navigator.clipboard.writeText(inviteUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="rounded-xl border border-brand-gold/20 bg-white/2 p-6">
      <h2 className="font-display text-xl uppercase text-white mb-4">
        Invitar miembro
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-brand-yellow uppercase tracking-widest mb-2">
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-11 px-4 rounded-xl bg-white/4 border border-brand-gold/15 text-white focus:border-brand-yellow focus:outline-none transition-colors text-sm"
              placeholder="nombre@equipo.com"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-brand-yellow uppercase tracking-widest mb-2">
              Nombre (opcional)
            </label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full h-11 px-4 rounded-xl bg-white/4 border border-brand-gold/15 text-white focus:border-brand-yellow focus:outline-none transition-colors text-sm"
              placeholder="Nombre completo"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-brand-yellow uppercase tracking-widest mb-2">
            Rol
          </label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value as Role)}
            className="w-full h-11 px-4 rounded-xl bg-white/4 border border-brand-gold/15 text-white focus:border-brand-yellow focus:outline-none transition-colors text-sm appearance-none cursor-pointer"
          >
            {(Object.keys(ROLE_LABELS) as Role[]).map((r) => (
              <option key={r} value={r} className="bg-black">
                {ROLE_LABELS[r]}
              </option>
            ))}
          </select>
        </div>

        {error && (
          <div className="px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading || !email}
          className="h-11 px-6 rounded-xl bg-brand-yellow text-black font-bold text-sm hover:bg-brand-gold hover:shadow-[0_0_20px_rgba(212,160,23,0.5)] transition-all disabled:opacity-50 flex items-center gap-2"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Generando link...
            </>
          ) : (
            "Generar invitación"
          )}
        </button>
      </form>

      {inviteUrl && (
        <div className="mt-4 p-4 rounded-xl bg-green-500/10 border border-green-500/30">
          <p className="text-xs font-semibold text-green-400 uppercase tracking-wider mb-2">
            Link de invitación generado
          </p>
          <div className="flex items-center gap-2">
            <code className="flex-1 text-xs text-green-300 break-all">
              {inviteUrl}
            </code>
            <button
              type="button"
              onClick={copyToClipboard}
              className="shrink-0 p-2 rounded-lg bg-green-500/20 hover:bg-green-500/30 text-green-400 transition-colors"
              aria-label="Copiar link de invitación"
            >
              {copied ? (
                <Check className="w-4 h-4" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </button>
          </div>
          <p className="text-xs text-brand-gray mt-2">
            Comparte este link directamente con el invitado. Expira en 7 días.
          </p>
        </div>
      )}
    </div>
  );
}
