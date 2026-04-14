"use client";

import { useState } from "react";
import {
  Mail,
  Phone,
  Instagram,
  Music2,
  Globe,
  DollarSign,
  Clock,
  Save,
  RefreshCw,
  Loader2,
  Copy,
  Check,
  Eye,
  EyeOff,
} from "lucide-react";
import type { LeadDetail } from "../LeadDetailClient";

interface Props {
  lead: LeadDetail;
  onPatch: (patch: Partial<LeadDetail>) => void;
}

export function ContactSidebar({ lead, onPatch }: Props) {
  const [savingDeal, setSavingDeal] = useState(false);
  const [savingAction, setSavingAction] = useState(false);
  const [savingPublic, setSavingPublic] = useState(false);
  const [fetchingLogo, setFetchingLogo] = useState(false);
  const [copied, setCopied] = useState(false);
  const [dealValue, setDealValue] = useState(lead.dealValueCop?.toString() ?? "");
  const [nextAction, setNextAction] = useState(lead.nextAction ?? "");
  const [nextActionAt, setNextActionAt] = useState(
    lead.nextActionAt ? lead.nextActionAt.slice(0, 16) : "",
  );

  const handle = lead.instagramHandle.replace(/^@/, "");
  const tiktokHandle = lead.tiktokHandle.replace(/^@/, "");
  const phoneClean = lead.whatsapp.replace(/[^0-9]/g, "");

  async function patchField(body: Record<string, unknown>) {
    const res = await fetch(`/api/admin/leads/${lead.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    return res.ok;
  }

  async function saveDeal() {
    setSavingDeal(true);
    const num = dealValue.trim() ? Number(dealValue.replace(/[^0-9]/g, "")) : null;
    const ok = await patchField({ deal_value_cop: num });
    setSavingDeal(false);
    if (ok) onPatch({ dealValueCop: num });
  }

  async function saveNextAction() {
    setSavingAction(true);
    const ok = await patchField({
      next_action: nextAction.trim() || null,
      next_action_at: nextActionAt ? new Date(nextActionAt).toISOString() : null,
    });
    setSavingAction(false);
    if (ok) {
      onPatch({
        nextAction: nextAction.trim() || null,
        nextActionAt: nextActionAt ? new Date(nextActionAt).toISOString() : null,
      });
    }
  }

  async function togglePublic() {
    setSavingPublic(true);
    const next = !lead.diagnosisPublic;
    const ok = await patchField({ diagnosis_public: next });
    setSavingPublic(false);
    if (ok) onPatch({ diagnosisPublic: next });
  }

  async function fetchLogo() {
    setFetchingLogo(true);
    const res = await fetch("/api/admin/logo-fetch", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        leadId: lead.id,
        instagramHandle: lead.instagramHandle,
      }),
    });
    setFetchingLogo(false);
    if (res.ok) {
      const data = (await res.json()) as { logoUrl?: string | null };
      onPatch({ logoUrl: data.logoUrl ?? null });
    }
  }

  async function copyDiagnosisUrl() {
    if (!lead.diagnosisSlug) return;
    const url = `https://www.ugccolombia.co/diagnostico/${lead.diagnosisSlug}`;
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  const wrapperClass =
    "rounded-2xl border border-white/10 bg-white/[0.02] p-4 space-y-3";
  const labelClass =
    "text-[10px] font-bold uppercase tracking-widest text-brand-gray";

  return (
    <div className="space-y-4 sticky top-32">
      {/* Contacto */}
      <div className={wrapperClass}>
        <p className={labelClass}>Contacto</p>
        <div className="space-y-2">
          {lead.email && (
            <a
              href={`mailto:${lead.email}`}
              className="flex items-center gap-2 text-sm text-white hover:text-brand-yellow transition-colors break-all"
            >
              <Mail className="w-4 h-4 text-brand-gray flex-shrink-0" />
              {lead.email}
            </a>
          )}
          {lead.whatsapp && (
            <a
              href={`https://wa.me/${phoneClean}`}
              target="_blank"
              rel="noopener"
              className="flex items-center gap-2 text-sm text-white hover:text-brand-yellow transition-colors"
            >
              <Phone className="w-4 h-4 text-brand-gray flex-shrink-0" />
              {lead.whatsapp}
            </a>
          )}
          {handle && (
            <a
              href={`https://instagram.com/${handle}`}
              target="_blank"
              rel="noopener"
              className="flex items-center gap-2 text-sm text-white hover:text-brand-yellow transition-colors"
            >
              <Instagram className="w-4 h-4 text-brand-gray flex-shrink-0" />@{handle}
            </a>
          )}
          {tiktokHandle && (
            <a
              href={`https://tiktok.com/@${tiktokHandle}`}
              target="_blank"
              rel="noopener"
              className="flex items-center gap-2 text-sm text-white hover:text-brand-yellow transition-colors"
            >
              <Music2 className="w-4 h-4 text-brand-gray flex-shrink-0" />@{tiktokHandle}
            </a>
          )}
          {lead.creatorPortfolioUrl && (
            <a
              href={lead.creatorPortfolioUrl}
              target="_blank"
              rel="noopener"
              className="flex items-center gap-2 text-sm text-white hover:text-brand-yellow transition-colors break-all"
            >
              <Globe className="w-4 h-4 text-brand-gray flex-shrink-0" />
              Portfolio
            </a>
          )}
        </div>
      </div>

      {/* Logo */}
      <div className={wrapperClass}>
        <div className="flex items-center justify-between">
          <p className={labelClass}>Logo</p>
          <button
            type="button"
            onClick={fetchLogo}
            disabled={fetchingLogo || !lead.instagramHandle}
            className="inline-flex items-center gap-1 text-[10px] font-semibold text-brand-yellow hover:text-brand-gold disabled:opacity-40"
          >
            {fetchingLogo ? (
              <Loader2 className="w-3 h-3 animate-spin" />
            ) : (
              <RefreshCw className="w-3 h-3" />
            )}
            Auto-fetch
          </button>
        </div>
        {!lead.instagramHandle && (
          <p className="text-[10px] text-brand-gray/70">
            Necesita Instagram handle para auto-fetch
          </p>
        )}
      </div>

      {/* Deal value */}
      <div className={wrapperClass}>
        <p className={labelClass}>Valor del Deal (COP)</p>
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <DollarSign className="absolute left-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-brand-gray" />
            <input
              type="text"
              inputMode="numeric"
              value={dealValue}
              onChange={(e) => setDealValue(e.target.value)}
              placeholder="0"
              className="w-full pl-7 pr-2 py-2 rounded-lg bg-black/60 border border-white/10 text-sm font-mono text-white focus:outline-none focus:border-brand-yellow"
            />
          </div>
          <button
            type="button"
            onClick={saveDeal}
            disabled={savingDeal}
            className="px-3 rounded-lg bg-brand-yellow text-black hover:bg-brand-gold transition-colors text-xs font-bold disabled:opacity-50"
          >
            {savingDeal ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Próxima acción */}
      <div className={wrapperClass}>
        <p className={labelClass}>Próxima acción</p>
        <input
          type="text"
          value={nextAction}
          onChange={(e) => setNextAction(e.target.value)}
          placeholder="Ej: Enviar propuesta"
          className="w-full px-2 py-2 rounded-lg bg-black/60 border border-white/10 text-sm text-white focus:outline-none focus:border-brand-yellow"
        />
        <div className="flex gap-2">
          <input
            type="datetime-local"
            value={nextActionAt}
            onChange={(e) => setNextActionAt(e.target.value)}
            className="flex-1 px-2 py-2 rounded-lg bg-black/60 border border-white/10 text-xs text-white focus:outline-none focus:border-brand-yellow"
          />
          <button
            type="button"
            onClick={saveNextAction}
            disabled={savingAction}
            className="px-3 rounded-lg bg-brand-yellow text-black hover:bg-brand-gold transition-colors text-xs font-bold disabled:opacity-50"
          >
            {savingAction ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Clock className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Diagnóstico público */}
      {lead.diagnosisSlug && (
        <div className={wrapperClass}>
          <p className={labelClass}>Diagnóstico público</p>
          <button
            type="button"
            onClick={togglePublic}
            disabled={savingPublic}
            className={`w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-colors border ${
              lead.diagnosisPublic
                ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/30"
                : "bg-white/5 text-brand-gray border-white/10"
            }`}
          >
            {lead.diagnosisPublic ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
            {lead.diagnosisPublic ? "Público" : "Privado"}
          </button>

          {lead.diagnosisPublic && (
            <button
              type="button"
              onClick={copyDiagnosisUrl}
              className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-brand-gray text-xs hover:text-white transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  Copiado
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  Copiar URL
                </>
              )}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
