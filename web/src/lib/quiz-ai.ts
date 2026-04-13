import { z } from "zod";
import type { BrandAudit } from "./validations/lead-audit";

// ─── Types ───────────────────────────────────────────────────────────────────

export interface AIAnswer {
  question_number: number;
  question: string;
  answer_value: string;
  answer_label: string;
  maps_to: string;
  maps_value: string;
}

export interface AIQuizQuestion {
  question: string;
  hint: string;
  options: Array<{
    value: string;
    label: string;
    sublabel?: string;
    maps_to: string;
    maps_value: string;
  }>;
  insight_for_previous: {
    text: string;
    emoji: string;
  };
  is_last: boolean;
  pain_level: "low" | "medium" | "high";
}

// ─── Validation schema for Gemini output ─────────────────────────────────────

const VALID_MAPS_TO = [
  "ad_budget", "content_budget", "has_active_ads", "current_ctr",
  "creative_age_weeks", "monthly_content_pieces", "urgency",
  "competitor_awareness", "conversion_goal", "team_resources",
] as const;

export const aiQuizResponseSchema = z.object({
  question: z.string().min(5),
  hint: z.string().default(""),
  options: z.array(z.object({
    value: z.string(),
    label: z.string(),
    sublabel: z.string().optional(),
    maps_to: z.string(),
    maps_value: z.string(),
  })).min(2).max(6),
  insight_for_previous: z.object({
    text: z.string(),
    emoji: z.string(),
  }).default({ text: "", emoji: "💡" }),
  is_last: z.boolean().default(false),
  pain_level: z.enum(["low", "medium", "high"]).default("medium"),
});

export function isValidMapsTo(value: string): boolean {
  return (VALID_MAPS_TO as readonly string[]).includes(value);
}

// ─── Build BrandAudit from AI answers ────────────────────────────────────────

export function buildAuditFromAIQuiz(answers: AIAnswer[]): {
  audit: BrandAudit;
  askedFields: Set<string>;
} {
  const result: Record<string, unknown> = {
    ad_budget: "nada",
    content_budget: "nada",
    has_active_ads: false,
    current_ctr: "no_se",
    creative_age_weeks: "no_tengo",
    monthly_content_pieces: "0",
    biggest_pain: "no_se_que_hacer",
    urgency: "explorando",
  };

  const askedFields = new Set<string>();

  for (const answer of answers) {
    const field = answer.maps_to;
    askedFields.add(field);

    if (field === "has_active_ads") {
      result[field] = answer.maps_value === "true";
    } else {
      result[field] = answer.maps_value;
    }
  }

  return { audit: result as unknown as BrandAudit, askedFields };
}
