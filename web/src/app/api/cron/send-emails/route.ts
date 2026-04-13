import { NextRequest, NextResponse } from "next/server";
import { NURTURING_STEPS, type LeadContext } from "@/lib/email-sequences/nurturing-steps";

export const maxDuration = 300;

export async function GET(req: NextRequest) {
  // Verify cron secret
  const authHeader = req.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;
  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const resendKey = process.env.RESEND_API_KEY;

  if (!supabaseUrl || !supabaseKey || !resendKey) {
    return NextResponse.json({ error: "Missing config" }, { status: 500 });
  }

  try {
    const { createClient } = await import("@supabase/supabase-js");
    const supabase = createClient(supabaseUrl, supabaseKey);
    const { Resend } = await import("resend");
    const resend = new Resend(resendKey);

    // Get pending emails that are due
    const { data: pending } = await supabase
      .from("email_sequences")
      .select("id, lead_id, step_key")
      .eq("status", "pending")
      .lte("scheduled_at", new Date().toISOString())
      .order("scheduled_at")
      .limit(20);

    if (!pending || pending.length === 0) {
      return NextResponse.json({ processed: 0 });
    }

    let sent = 0;
    let failed = 0;

    for (const item of pending) {
      try {
        // Get lead data
        const { data: lead } = await supabase
          .from("leads")
          .select("full_name, company_name, industry, email, qualification_score, temperature, diagnosis_slug, booking_status")
          .eq("id", item.lead_id)
          .single();

        if (!lead || !lead.email) {
          await supabase.from("email_sequences").update({ status: "skipped" }).eq("id", item.id);
          continue;
        }

        // Skip offer email if lead already booked
        if (item.step_key === "day_30_offer" && lead.booking_status === "scheduled") {
          await supabase.from("email_sequences").update({ status: "skipped" }).eq("id", item.id);
          continue;
        }

        // Find the step template
        const step = NURTURING_STEPS.find((s) => s.key === item.step_key);
        if (!step) {
          await supabase.from("email_sequences").update({ status: "skipped" }).eq("id", item.id);
          continue;
        }

        const ctx: LeadContext = {
          full_name: lead.full_name || "amigo/a",
          company_name: lead.company_name || "tu marca",
          industry: lead.industry || "otro",
          email: lead.email,
          qualification_score: lead.qualification_score || 0,
          temperature: lead.temperature || "warm",
          diagnosis_slug: lead.diagnosis_slug || undefined,
        };

        // Generate and send
        const subject = step.subject(ctx);
        const html = step.generateHtml(ctx);

        await resend.emails.send({
          from: "UGC Colombia <noreply@ugccolombia.co>",
          to: lead.email,
          subject,
          html,
        });

        await supabase
          .from("email_sequences")
          .update({ status: "sent", sent_at: new Date().toISOString() })
          .eq("id", item.id);

        sent++;
      } catch (err) {
        const errMsg = err instanceof Error ? err.message : "Unknown error";
        await supabase
          .from("email_sequences")
          .update({ status: "failed", error_message: errMsg.slice(0, 500) })
          .eq("id", item.id);
        failed++;
      }
    }

    console.log(`[cron/send-emails] Processed: ${sent} sent, ${failed} failed, ${pending.length - sent - failed} skipped`);

    return NextResponse.json({ processed: pending.length, sent, failed });
  } catch (err) {
    console.error("[cron/send-emails] Error:", err);
    return NextResponse.json({ error: "Cron failed" }, { status: 500 });
  }
}
