"use client";

import { useEffect, useState, type FormEvent } from "react";
import { X, Save, Loader2 } from "lucide-react";
import type { LeadDetail } from "../LeadDetailClient";

interface Props {
  lead: LeadDetail;
  onClose: () => void;
  onSaved: (patch: Partial<LeadDetail>) => void;
}

type FormState = {
  company_name: string;
  full_name: string;
  email: string;
  phone: string;
  whatsapp: string;
  company: string;
  industry: string;
  instagram_handle: string;
  tiktok_handle: string;
  creator_niche: string;
  creator_portfolio_url: string;
};

function fromLead(lead: LeadDetail): FormState {
  return {
    company_name: lead.companyName,
    full_name: lead.fullName,
    email: lead.email,
    phone: lead.phone,
    whatsapp: lead.whatsapp,
    company: lead.company,
    industry: lead.industry ?? "",
    instagram_handle: lead.instagramHandle,
    tiktok_handle: lead.tiktokHandle,
    creator_niche: lead.creatorNiche ?? "",
    creator_portfolio_url: lead.creatorPortfolioUrl ?? "",
  };
}

export function EditLeadModal({ lead, onClose, onSaved }: Props) {
  const [form, setForm] = useState<FormState>(() => fromLead(lead));
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape" && !saving) onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, saving]);

  async function submit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setSaving(true);

    const body: Record<string, string | null> = {};
    for (const [k, v] of Object.entries(form)) {
      body[k] = v.trim() === "" ? null : v.trim();
    }

    const res = await fetch(`/api/admin/leads/${lead.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    setSaving(false);

    if (!res.ok) {
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      setError(data.error ?? "Error al guardar");
      return;
    }

    onSaved({
      companyName: form.company_name,
      fullName: form.full_name,
      email: form.email,
      phone: form.phone,
      whatsapp: form.whatsapp,
      company: form.company,
      industry: form.industry || null,
      instagramHandle: form.instagram_handle,
      tiktokHandle: form.tiktok_handle,
      creatorNiche: form.creator_niche || null,
      creatorPortfolioUrl: form.creator_portfolio_url || null,
    });
    onClose();
  }

  function setField<K extends keyof FormState>(k: K, v: FormState[K]) {
    setForm((prev) => ({ ...prev, [k]: v }));
  }

  const isCreador = lead.leadType === "creador";

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <form
        onSubmit={submit}
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-brand-gold/30 bg-brand-black shadow-2xl"
      >
        <header className="sticky top-0 flex items-center justify-between px-5 py-4 border-b border-white/10 bg-brand-black/95 backdrop-blur z-10">
          <h2 className="font-display text-xl uppercase tracking-tight text-white">
            Editar cliente
          </h2>
          <button
            type="button"
            onClick={onClose}
            disabled={saving}
            className="p-1.5 rounded-lg hover:bg-white/10 text-brand-gray hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </header>

        <div className="p-5 space-y-4">
          <fieldset className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Field label="Marca / Empresa">
              <input
                type="text"
                value={form.company_name}
                onChange={(e) => setField("company_name", e.target.value)}
                className={inputClass}
                placeholder="Nike Colombia"
              />
            </Field>
            <Field label="Nombre completo">
              <input
                type="text"
                value={form.full_name}
                onChange={(e) => setField("full_name", e.target.value)}
                className={inputClass}
                placeholder="Juan Pérez"
              />
            </Field>
            <Field label="Email">
              <input
                type="email"
                value={form.email}
                onChange={(e) => setField("email", e.target.value)}
                className={inputClass}
                placeholder="juan@marca.com"
              />
            </Field>
            <Field label="WhatsApp">
              <input
                type="tel"
                value={form.whatsapp}
                onChange={(e) => setField("whatsapp", e.target.value)}
                className={inputClass}
                placeholder="+573001234567"
              />
            </Field>
            <Field label="Teléfono alternativo">
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => setField("phone", e.target.value)}
                className={inputClass}
                placeholder="+57 1 234 5678"
              />
            </Field>
            <Field label="Instagram (sin @)">
              <input
                type="text"
                value={form.instagram_handle}
                onChange={(e) =>
                  setField("instagram_handle", e.target.value.replace(/^@/, ""))
                }
                className={inputClass}
                placeholder="nikecolombia"
              />
            </Field>
            <Field label="TikTok (sin @)">
              <input
                type="text"
                value={form.tiktok_handle}
                onChange={(e) =>
                  setField("tiktok_handle", e.target.value.replace(/^@/, ""))
                }
                className={inputClass}
                placeholder="nikecolombia"
              />
            </Field>
            <Field label="Empresa legal / razón social">
              <input
                type="text"
                value={form.company}
                onChange={(e) => setField("company", e.target.value)}
                className={inputClass}
                placeholder="Nike Colombia S.A.S."
              />
            </Field>
            <Field label="Industria" span2={!isCreador}>
              <select
                value={form.industry}
                onChange={(e) => setField("industry", e.target.value)}
                className={inputClass}
              >
                <option value="">— Sin industria —</option>
                <option value="ecommerce">E-commerce</option>
                <option value="marca_productos">Marca de productos</option>
                <option value="servicios">Servicios</option>
                <option value="saas">SaaS</option>
                <option value="dropshipping">Dropshipping</option>
                <option value="restaurantes">Restaurantes</option>
                <option value="salud_belleza">Salud / Belleza</option>
                <option value="educacion">Educación</option>
                <option value="fintech">Fintech</option>
                <option value="otro">Otro</option>
              </select>
            </Field>

            {isCreador && (
              <>
                <Field label="Nicho creador">
                  <input
                    type="text"
                    value={form.creator_niche}
                    onChange={(e) => setField("creator_niche", e.target.value)}
                    className={inputClass}
                    placeholder="Beauty, Fitness, Tech..."
                  />
                </Field>
                <Field label="URL portfolio" span2>
                  <input
                    type="url"
                    value={form.creator_portfolio_url}
                    onChange={(e) =>
                      setField("creator_portfolio_url", e.target.value)
                    }
                    className={inputClass}
                    placeholder="https://..."
                  />
                </Field>
              </>
            )}
          </fieldset>

          {error && (
            <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/30 rounded-lg p-3">
              {error}
            </p>
          )}
        </div>

        <footer className="sticky bottom-0 flex items-center justify-end gap-2 px-5 py-4 border-t border-white/10 bg-brand-black/95 backdrop-blur">
          <button
            type="button"
            onClick={onClose}
            disabled={saving}
            className="px-4 py-2 rounded-lg text-sm text-brand-gray hover:text-white"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-brand-yellow text-black text-sm font-bold hover:bg-brand-gold disabled:opacity-50"
          >
            {saving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Guardando...
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                Guardar cambios
              </>
            )}
          </button>
        </footer>
      </form>
    </div>
  );
}

const inputClass =
  "w-full px-3 py-2 rounded-lg bg-black/60 border border-white/10 text-sm text-white focus:outline-none focus:border-brand-yellow";

function Field({
  label,
  children,
  span2,
}: {
  label: string;
  children: React.ReactNode;
  span2?: boolean;
}) {
  return (
    <div className={span2 ? "sm:col-span-2" : ""}>
      <label className="block text-[10px] font-bold uppercase tracking-widest text-brand-gray mb-1.5">
        {label}
      </label>
      {children}
    </div>
  );
}
