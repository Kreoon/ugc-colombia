import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { DiagnosisPageClient } from "./DiagnosisPageClient";

interface Props {
  params: Promise<{ handle: string }>;
}

async function getDiagnosis(handle: string) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !supabaseKey || supabaseUrl.includes("placeholder")) return null;

  const { createClient } = await import("@supabase/supabase-js");
  const supabase = createClient(supabaseUrl, supabaseKey);

  const cleanHandle = handle.replace(/^@/, "").toLowerCase();

  const { data } = await supabase
    .from("leads")
    .select("company_name, industry, instagram_handle, ai_diagnosis, qualification_score, temperature, diagnosis_slug")
    .eq("diagnosis_slug", cleanHandle)
    .eq("diagnosis_public", true)
    .not("ai_diagnosis", "is", null)
    .single();

  return data;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { handle } = await params;
  const data = await getDiagnosis(handle);

  if (!data) {
    return { title: "Diagnóstico no encontrado | UGC Colombia" };
  }

  const score = data.ai_diagnosis?.overall_score ?? data.qualification_score ?? 0;
  const company = data.company_name || `@${handle}`;

  return {
    title: `Diagnóstico de ${company} — Score ${score}/100 | UGC Colombia`,
    description: `Análisis de contenido y estrategia digital de ${company}. Descubre las oportunidades de crecimiento con UGC.`,
    openGraph: {
      title: `Diagnóstico de ${company} — Score ${score}/100`,
      description: `Análisis de estrategia digital de ${company} por UGC Colombia.`,
      url: `https://ugccolombia.co/diagnostico/${handle}`,
      siteName: "UGC Colombia",
      type: "article",
    },
  };
}

export default async function DiagnosisPage({ params }: Props) {
  const { handle } = await params;
  const data = await getDiagnosis(handle);

  if (!data) notFound();

  return (
    <DiagnosisPageClient
      handle={handle}
      companyName={data.company_name}
      industry={data.industry}
      instagramHandle={data.instagram_handle}
      diagnosis={data.ai_diagnosis}
      qualificationScore={data.qualification_score}
      temperature={data.temperature}
    />
  );
}
