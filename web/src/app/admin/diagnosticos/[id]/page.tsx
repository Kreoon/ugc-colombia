import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { requireAuth } from "@/lib/auth";
import { getSupabaseAdmin } from "@/lib/supabase";
import { LeadDetailClient, type LeadDetail, type Activity } from "./LeadDetailClient";

export const metadata: Metadata = {
  title: "Lead — Admin UGC Colombia",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ id: string }>;
}

async function fetchLeadDetail(
  id: string,
): Promise<{ lead: LeadDetail; activities: Activity[] } | null> {
  const supabase = getSupabaseAdmin();
  if (!supabase) return null;

  const [leadRes, actRes] = await Promise.all([
    supabase.from("leads").select("*").eq("id", id).single(),
    supabase
      .from("lead_activities")
      .select("*")
      .eq("lead_id", id)
      .order("created_at", { ascending: false })
      .limit(100),
  ]);

  if (leadRes.error || !leadRes.data) return null;

  const r = leadRes.data as Record<string, unknown>;

  const lead: LeadDetail = {
    id: r.id as string,
    createdAt: r.created_at as string,
    updatedAt: (r.updated_at as string) ?? null,
    auditCompletedAt: (r.audit_completed_at as string) ?? null,
    companyName: (r.company_name as string) ?? "",
    fullName: (r.full_name as string) ?? "",
    instagramHandle: (r.instagram_handle as string) ?? "",
    tiktokHandle: (r.tiktok_handle as string) ?? "",
    email: (r.email as string) ?? "",
    phone: (r.phone as string) ?? "",
    whatsapp: (r.whatsapp as string) ?? "",
    company: (r.company as string) ?? "",
    industry: (r.industry as string) ?? null,
    leadType: ((r.lead_type as string) ?? "marca") as "marca" | "creador",
    urgency: (r.urgency as string) ?? null,
    adBudget: (r.ad_budget as string) ?? null,
    contentBudget: (r.content_budget as string) ?? null,
    biggestPain: (r.biggest_pain as string) ?? null,
    hasWebsite: (r.has_website as boolean) ?? false,
    hasActiveAds: (r.has_active_ads as boolean) ?? false,
    qualificationScore: (r.qualification_score as number) ?? 0,
    temperature: ((r.temperature as string) ?? "cold") as "hot" | "warm" | "cold",
    status: ((r.status as string) ?? "new") as string,
    notes: (r.notes as string) ?? "",
    diagnosisSlug: (r.diagnosis_slug as string) ?? "",
    diagnosisPublic: Boolean(r.diagnosis_public),
    aiDiagnosis: r.ai_diagnosis as Record<string, unknown> | null,
    bookingStatus: (r.booking_status as string) ?? null,
    googleCalendarEventId: (r.google_calendar_event_id as string) ?? null,
    logoUrl: (r.logo_url as string) ?? null,
    dealValueCop: (r.deal_value_cop as number) ?? null,
    nextAction: (r.next_action as string) ?? null,
    nextActionAt: (r.next_action_at as string) ?? null,
    lastContactedAt: (r.last_contacted_at as string) ?? null,
    creatorNiche: (r.creator_niche as string) ?? null,
    creatorFollowers: (r.creator_followers as number) ?? null,
    creatorPlatforms: (r.creator_platforms as string[]) ?? null,
    creatorPortfolioUrl: (r.creator_portfolio_url as string) ?? null,
  };

  const activities: Activity[] = (actRes.data ?? []).map(
    (a: Record<string, unknown>) => ({
      id: a.id as string,
      leadId: a.lead_id as string,
      type: a.activity_type as string,
      description: (a.description as string) ?? null,
      metadata: (a.metadata as Record<string, unknown>) ?? {},
      createdAt: a.created_at as string,
      createdBy: (a.created_by as string) ?? null,
    }),
  );

  return { lead, activities };
}

export default async function LeadDetailPage({ params }: PageProps) {
  await requireAuth();
  const { id } = await params;
  const data = await fetchLeadDetail(id);
  if (!data) notFound();

  return <LeadDetailClient lead={data.lead} initialActivities={data.activities} />;
}
