import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/tracking/constants";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/servicios`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/precios`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/casos`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/legal/privacidad`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/legal/terminos`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/legal/cookies`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];

  // Dynamic diagnosis pages
  let diagnosisPages: MetadataRoute.Sitemap = [];
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (supabaseUrl && supabaseKey && !supabaseUrl.includes("placeholder")) {
      const { createClient } = await import("@supabase/supabase-js");
      const supabase = createClient(supabaseUrl, supabaseKey);

      const { data } = await supabase
        .from("leads")
        .select("diagnosis_slug, updated_at")
        .eq("diagnosis_public", true)
        .not("diagnosis_slug", "is", null)
        .not("ai_diagnosis", "is", null)
        .order("updated_at", { ascending: false })
        .limit(500);

      if (data) {
        diagnosisPages = data.map((lead) => ({
          url: `${SITE_URL}/diagnostico/${lead.diagnosis_slug}`,
          lastModified: new Date(lead.updated_at),
          changeFrequency: "monthly" as const,
          priority: 0.6,
        }));
      }
    }
  } catch {
    // Silently fail — static pages are still returned
  }

  return [...staticPages, ...diagnosisPages];
}
