import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const leadId = req.nextUrl.searchParams.get("lead_id");
  if (!leadId) {
    return NextResponse.json({ status: "error", message: "lead_id required" }, { status: 400 });
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseKey || supabaseUrl.includes("placeholder")) {
    return NextResponse.json({ status: "processing" });
  }

  try {
    const { createClient } = await import("@supabase/supabase-js");
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { data } = await supabase
      .from("leads")
      .select("ai_diagnosis, diagnosis_slug, instagram_handle")
      .eq("id", leadId)
      .single();

    if (!data?.ai_diagnosis?.overall_score) {
      return NextResponse.json({ status: "processing" });
    }

    return NextResponse.json({
      status: "ready",
      diagnosis: data.ai_diagnosis,
      diagnosis_slug: data.diagnosis_slug,
      instagram_handle: data.instagram_handle,
    });
  } catch {
    return NextResponse.json({ status: "processing" });
  }
}
