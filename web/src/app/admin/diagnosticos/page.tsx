import type { Metadata } from "next";
import { requireAuth } from "@/lib/auth";
import { getSupabaseAdmin } from "@/lib/supabase";
import { DiagnosticosList } from "./DiagnosticosList";
import type { LeadCardData } from "@/components/admin/LeadCard";

export const metadata: Metadata = {
  title: "CRM — UGC Colombia",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

async function fetchDiagnosticos(): Promise<LeadCardData[]> {
  const supabase = getSupabaseAdmin();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("leads")
    .select(
      [
        "id",
        "created_at",
        "company_name",
        "full_name",
        "instagram_handle",
        "email",
        "whatsapp",
        "diagnosis_slug",
        "diagnosis_public",
        "qualification_score",
        "temperature",
        "lead_type",
        "ai_diagnosis",
        "status",
        "logo_url",
        "deal_value_cop",
        "next_action",
        "next_action_at",
        "last_contacted_at",
        "industry",
      ].join(", "),
    )
    .not("ai_diagnosis", "is", null)
    .order("created_at", { ascending: false })
    .limit(200);

  if (error || !data) return [];

  return (data as unknown as Record<string, unknown>[]).map((r) => ({
    id: r.id as string,
    createdAt: r.created_at as string,
    companyName: (r.company_name as string) ?? "",
    fullName: (r.full_name as string) ?? "",
    instagramHandle: (r.instagram_handle as string) ?? "",
    email: (r.email as string) ?? "",
    whatsapp: (r.whatsapp as string) ?? "",
    diagnosisSlug: (r.diagnosis_slug as string) ?? "",
    diagnosisPublic: Boolean(r.diagnosis_public),
    qualificationScore: (r.qualification_score as number) ?? 0,
    temperature: ((r.temperature as string) ?? "cold") as "hot" | "warm" | "cold",
    leadType: ((r.lead_type as string) ?? "marca") as "marca" | "creador",
    overallScore:
      (r.ai_diagnosis as { overall_score?: number } | null)?.overall_score ?? null,
    status: (r.status as string) ?? "new",
    logoUrl: (r.logo_url as string) ?? null,
    dealValueCop: (r.deal_value_cop as number) ?? null,
    nextAction: (r.next_action as string) ?? null,
    nextActionAt: (r.next_action_at as string) ?? null,
    lastContactedAt: (r.last_contacted_at as string) ?? null,
    industry: (r.industry as string) ?? null,
  }));
}

export default async function DiagnosticosAdminPage() {
  await requireAuth();
  const rows = await fetchDiagnosticos();
  return <DiagnosticosList rows={rows} />;
}
