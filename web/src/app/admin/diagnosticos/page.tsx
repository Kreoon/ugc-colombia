import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { getSupabaseAdmin } from "@/lib/supabase";
import { DiagnosticosList, type DiagnosticoRow } from "./DiagnosticosList";

export const metadata: Metadata = {
  title: "Diagnósticos — Admin UGC Colombia",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

async function fetchDiagnosticos(): Promise<DiagnosticoRow[]> {
  const supabase = getSupabaseAdmin();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("leads")
    .select(
      "id, created_at, company_name, full_name, instagram_handle, email, whatsapp, diagnosis_slug, diagnosis_public, qualification_score, temperature, lead_type, ai_diagnosis",
    )
    .not("ai_diagnosis", "is", null)
    .order("created_at", { ascending: false })
    .limit(200);

  if (error || !data) return [];

  return data.map((r) => ({
    id: r.id,
    createdAt: r.created_at,
    companyName: r.company_name ?? "",
    fullName: r.full_name ?? "",
    instagramHandle: r.instagram_handle ?? "",
    email: r.email ?? "",
    whatsapp: r.whatsapp ?? "",
    diagnosisSlug: r.diagnosis_slug ?? "",
    diagnosisPublic: Boolean(r.diagnosis_public),
    qualificationScore: r.qualification_score ?? 0,
    temperature: (r.temperature ?? "cold") as "hot" | "warm" | "cold",
    leadType: (r.lead_type ?? "marca") as "marca" | "creador",
    overallScore:
      (r.ai_diagnosis as { overall_score?: number } | null)?.overall_score ??
      null,
  }));
}

export default async function DiagnosticosAdminPage() {
  if (!(await isAdminAuthenticated())) {
    redirect("/admin/login");
  }

  const rows = await fetchDiagnosticos();
  return <DiagnosticosList rows={rows} />;
}
