"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Sparkles,
  Activity as ActivityIcon,
  FileText,
  BarChart3,
  Pencil,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { LogoAvatar } from "@/components/admin/LogoAvatar";
import { StatusSelector } from "@/components/admin/StatusSelector";
import { OverviewTab } from "./tabs/OverviewTab";
import { DiagnosisTab } from "./tabs/DiagnosisTab";
import { ActivityTab } from "./tabs/ActivityTab";
import { NotesTab } from "./tabs/NotesTab";
import { ContactSidebar } from "./components/ContactSidebar";
import { EditLeadModal } from "./components/EditLeadModal";

export interface LeadDetail {
  id: string;
  createdAt: string;
  updatedAt: string | null;
  auditCompletedAt: string | null;
  companyName: string;
  fullName: string;
  instagramHandle: string;
  tiktokHandle: string;
  email: string;
  phone: string;
  whatsapp: string;
  company: string;
  industry: string | null;
  leadType: "marca" | "creador";
  urgency: string | null;
  adBudget: string | null;
  contentBudget: string | null;
  biggestPain: string | null;
  hasWebsite: boolean;
  hasActiveAds: boolean;
  qualificationScore: number;
  temperature: "hot" | "warm" | "cold";
  status: string;
  notes: string;
  diagnosisSlug: string;
  diagnosisPublic: boolean;
  aiDiagnosis: Record<string, unknown> | null;
  bookingStatus: string | null;
  googleCalendarEventId: string | null;
  logoUrl: string | null;
  dealValueCop: number | null;
  nextAction: string | null;
  nextActionAt: string | null;
  lastContactedAt: string | null;
  creatorNiche: string | null;
  creatorFollowers: number | null;
  creatorPlatforms: string[] | null;
  creatorPortfolioUrl: string | null;
}

export interface Activity {
  id: string;
  leadId: string;
  type: string;
  description: string | null;
  metadata: Record<string, unknown>;
  createdAt: string;
  createdBy: string | null;
}

type TabKey = "overview" | "diagnosis" | "activity" | "notes";

const TABS: { key: TabKey; label: string; icon: typeof Sparkles }[] = [
  { key: "overview", label: "Overview", icon: BarChart3 },
  { key: "diagnosis", label: "Diagnóstico", icon: Sparkles },
  { key: "activity", label: "Actividad", icon: ActivityIcon },
  { key: "notes", label: "Notas", icon: FileText },
];

interface Props {
  lead: LeadDetail;
  initialActivities: Activity[];
}

export function LeadDetailClient({ lead: initialLead, initialActivities }: Props) {
  const [lead, setLead] = useState(initialLead);
  const [activities, setActivities] = useState(initialActivities);
  const [tab, setTab] = useState<TabKey>("overview");
  const [editing, setEditing] = useState(false);

  const displayName = lead.companyName || lead.fullName || "(sin nombre)";
  const handle = lead.instagramHandle.replace(/^@/, "");

  function patchLocal(patch: Partial<LeadDetail>) {
    setLead((prev) => ({ ...prev, ...patch }));
  }

  function addActivity(activity: Activity) {
    setActivities((prev) => [activity, ...prev]);
  }

  return (
    <main className="min-h-screen bg-brand-black text-white">
      <header className="border-b border-white/5 sticky top-0 bg-brand-black/95 backdrop-blur z-20">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <Link
            href="/admin/diagnosticos"
            className="inline-flex items-center gap-1.5 text-xs text-brand-gray hover:text-white transition-colors mb-3"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Volver al CRM
          </Link>

          <div className="flex items-start gap-4">
            <LogoAvatar logoUrl={lead.logoUrl} name={displayName} size="xl" />
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <h1 className="font-display text-2xl sm:text-3xl uppercase tracking-tight text-white">
                  {displayName}
                </h1>
                <span className="text-xs px-2 py-0.5 rounded-full bg-brand-yellow/10 text-brand-yellow font-bold uppercase">
                  {lead.leadType}
                </span>
              </div>
              <p className="text-sm text-brand-gray flex flex-wrap items-center gap-x-3">
                {handle && <span>@{handle}</span>}
                {lead.industry && <span>· {lead.industry}</span>}
                <span className="inline-flex items-center gap-1">
                  · {lead.temperature === "hot" ? "🔥" : lead.temperature === "warm" ? "☀️" : "❄️"} {lead.temperature}
                </span>
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <StatusSelector
                  leadId={lead.id}
                  currentStatus={lead.status}
                  size="md"
                  onChanged={(next) => patchLocal({ status: next })}
                />
                <button
                  type="button"
                  onClick={() => setEditing(true)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-brand-gold/30 bg-brand-yellow/10 text-brand-yellow text-xs font-bold hover:bg-brand-yellow/20 transition-colors"
                >
                  <Pencil className="w-3.5 h-3.5" />
                  Editar cliente
                </button>
              </div>
            </div>
          </div>

          <nav className="mt-5 flex gap-1 border-b border-white/5 overflow-x-auto">
            {TABS.map((t) => {
              const Icon = t.icon;
              const active = tab === t.key;
              return (
                <button
                  key={t.key}
                  type="button"
                  onClick={() => setTab(t.key)}
                  className={cn(
                    "inline-flex items-center gap-1.5 px-4 py-2.5 text-sm font-semibold transition-colors border-b-2 whitespace-nowrap",
                    active
                      ? "text-brand-yellow border-brand-yellow"
                      : "text-brand-gray border-transparent hover:text-white",
                  )}
                >
                  <Icon className="w-4 h-4" />
                  {t.label}
                </button>
              );
            })}
          </nav>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
        <section>
          {tab === "overview" && <OverviewTab lead={lead} />}
          {tab === "diagnosis" && <DiagnosisTab lead={lead} />}
          {tab === "activity" && (
            <ActivityTab
              leadId={lead.id}
              activities={activities}
              onAdded={addActivity}
            />
          )}
          {tab === "notes" && (
            <NotesTab
              leadId={lead.id}
              initialNotes={lead.notes}
              updatedAt={lead.updatedAt}
              onSaved={(notes) => patchLocal({ notes })}
            />
          )}
        </section>

        <aside>
          <ContactSidebar lead={lead} onPatch={patchLocal} />
        </aside>
      </div>

      {editing && (
        <EditLeadModal
          lead={lead}
          onClose={() => setEditing(false)}
          onSaved={patchLocal}
        />
      )}
    </main>
  );
}
