"use client";

import Link from "next/link";
import {
  Flame,
  Snowflake,
  Sun,
  ExternalLink,
  Copy,
  Check,
  Mail,
  Phone,
  Instagram,
  Trash2,
  Eye,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { LogoAvatar } from "./LogoAvatar";
import { StatusPill } from "./StatusPill";
import { NextActionBadge } from "./NextActionBadge";

export interface LeadCardData {
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
  status: string | null;
  logoUrl: string | null;
  dealValueCop: number | null;
  nextAction: string | null;
  nextActionAt: string | null;
  lastContactedAt: string | null;
  industry: string | null;
}

const TEMPERATURE_META = {
  hot: { label: "Hot", icon: Flame, color: "text-red-400", bg: "bg-red-500/10" },
  warm: { label: "Warm", icon: Sun, color: "text-amber-400", bg: "bg-amber-500/10" },
  cold: { label: "Cold", icon: Snowflake, color: "text-blue-400", bg: "bg-blue-500/10" },
} as const;

function formatCop(value: number | null): string | null {
  if (value === null || value === undefined) return null;
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(value);
}

function formatRelativeDate(iso: string): string {
  try {
    const d = new Date(iso);
    const diff = Date.now() - d.getTime();
    const h = Math.round(diff / (1000 * 60 * 60));
    if (h < 1) return "hace minutos";
    if (h < 24) return `hace ${h}h`;
    const days = Math.round(h / 24);
    if (days < 30) return `hace ${days}d`;
    return d.toLocaleDateString("es-CO", { day: "numeric", month: "short" });
  } catch {
    return iso;
  }
}

interface Props {
  lead: LeadCardData;
  onDelete: (id: string, label: string) => void;
  busy?: boolean;
}

export function LeadCard({ lead, onDelete, busy }: Props) {
  const [copied, setCopied] = useState(false);
  const displayName = lead.companyName || lead.fullName || "(sin nombre)";
  const handle = lead.instagramHandle.replace(/^@/, "");
  const tempMeta = TEMPERATURE_META[lead.temperature];
  const TempIcon = tempMeta.icon;
  const dealDisplay = formatCop(lead.dealValueCop);
  const detailHref = `/admin/diagnosticos/${lead.id}`;

  async function copyDiagnosisUrl() {
    if (!lead.diagnosisSlug) return;
    const url = `https://www.ugccolombia.co/diagnostico/${lead.diagnosisSlug}`;
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <article
      className={cn(
        "group rounded-2xl border border-white/10 bg-white/[0.02] p-4 transition-colors",
        "hover:border-brand-gold/30 hover:bg-white/[0.04]",
      )}
    >
      <div className="flex items-start gap-4">
        <Link href={detailHref} className="flex-shrink-0">
          <LogoAvatar logoUrl={lead.logoUrl} name={displayName} size="lg" />
        </Link>

        <div className="flex-1 min-w-0 space-y-2">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <div className="min-w-0 flex-1">
              <Link
                href={detailHref}
                className="block font-display text-lg text-white tracking-tight uppercase hover:text-brand-yellow transition-colors truncate"
              >
                {displayName}
              </Link>
              <p className="text-xs text-brand-gray mt-0.5 truncate">
                {handle && <span>@{handle}</span>}
                {handle && lead.industry && <span> · </span>}
                {lead.industry && <span>{lead.industry}</span>}
                {!handle && !lead.industry && <span>{lead.leadType}</span>}
              </p>
            </div>

            <div className="flex items-center gap-1.5 flex-shrink-0">
              <StatusPill status={lead.status} />
              <span
                className={cn(
                  "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider",
                  tempMeta.bg,
                  tempMeta.color,
                )}
              >
                <TempIcon className="w-3 h-3" />
                {tempMeta.label}
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-brand-gray">
            {lead.email && (
              <a
                href={`mailto:${lead.email}`}
                className="inline-flex items-center gap-1 hover:text-brand-yellow transition-colors truncate max-w-[180px]"
              >
                <Mail className="w-3 h-3 flex-shrink-0" />
                <span className="truncate">{lead.email}</span>
              </a>
            )}
            {lead.whatsapp && (
              <a
                href={`https://wa.me/${lead.whatsapp.replace(/[^0-9]/g, "")}`}
                target="_blank"
                rel="noopener"
                className="inline-flex items-center gap-1 hover:text-brand-yellow transition-colors"
              >
                <Phone className="w-3 h-3 flex-shrink-0" />
                {lead.whatsapp}
              </a>
            )}
            {handle && (
              <a
                href={`https://instagram.com/${handle}`}
                target="_blank"
                rel="noopener"
                className="inline-flex items-center gap-1 hover:text-brand-yellow transition-colors"
              >
                <Instagram className="w-3 h-3 flex-shrink-0" />@{handle}
              </a>
            )}
            <span className="text-brand-gray/60">
              · {formatRelativeDate(lead.createdAt)}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-[11px]">
            {lead.overallScore !== null && (
              <span className="inline-flex items-center px-2 py-0.5 rounded-lg bg-white/5 text-white font-bold">
                AI {lead.overallScore}/100
              </span>
            )}
            {lead.qualificationScore > 0 && (
              <span className="inline-flex items-center px-2 py-0.5 rounded-lg bg-white/5 text-brand-gray font-medium">
                Lead {lead.qualificationScore}/100
              </span>
            )}
            <span className="inline-flex items-center px-2 py-0.5 rounded-lg bg-brand-yellow/10 text-brand-yellow font-bold uppercase">
              {lead.leadType}
            </span>
            {dealDisplay && (
              <span className="inline-flex items-center px-2 py-0.5 rounded-lg bg-emerald-500/10 text-emerald-400 font-bold">
                {dealDisplay}
              </span>
            )}
          </div>

          {lead.nextAction && (
            <NextActionBadge action={lead.nextAction} at={lead.nextActionAt} />
          )}

          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-white/5">
            <Link
              href={detailHref}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-brand-yellow/10 border border-brand-yellow/30 text-brand-yellow text-xs font-semibold hover:bg-brand-yellow/20 transition-colors"
            >
              <Eye className="w-3.5 h-3.5" />
              Detalle
            </Link>

            {lead.diagnosisSlug && (
              <>
                <Link
                  href={`/diagnostico/${lead.diagnosisSlug}`}
                  target="_blank"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-brand-gray text-xs hover:text-white transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  Diag
                </Link>
                <button
                  type="button"
                  onClick={copyDiagnosisUrl}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-brand-gray text-xs hover:text-white transition-colors"
                >
                  {copied ? (
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

            <div className="flex-1" />

            <button
              type="button"
              onClick={() => onDelete(lead.id, displayName)}
              disabled={busy}
              title="Eliminar"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-semibold hover:bg-red-500/20 transition-colors disabled:opacity-50"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
