"use client";

import { useState } from "react";
import { StepLayout, inputClass, labelClass, errorClass } from "./shared";
import { contactInfoSchema } from "@/lib/validations/lead-audit";
import { calculateBrandScore, generateDiagnosis } from "@/lib/lead-scoring";
import type { AuditData } from "../AuditModal";
import type { LeadScore, AIDiagnosis } from "@/lib/lead-scoring";
import type { ContactInfo } from "@/lib/validations/lead-audit";

interface Props {
  data: AuditData;
  onSubmit: (contact: ContactInfo, score: LeadScore, diagnosis: AIDiagnosis, leadId?: string) => void;
  onBack: () => void;
}

export function StepContact({ data, onSubmit, onBack }: Props) {
  const [form, setForm] = useState({
    email: "",
    whatsapp: "",
    country: "Colombia",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState("");

  async function handleSubmit() {
    const result = contactInfoSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        fieldErrors[issue.path[0] as string] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    setIsSubmitting(true);
    setServerError("");

    let score: LeadScore;
    let diagnosis: AIDiagnosis;

    if (data.lead_type === "marca" && data.brand_info && data.brand_audit) {
      score = calculateBrandScore(data.brand_info, data.brand_audit);
      diagnosis = generateDiagnosis(data.brand_info, data.brand_audit, score);
    } else {
      score = { total: 50, temperature: "warm", breakdown: { ad_budget: 0, content_budget: 0, urgency: 0, industry: 0, pain: 0, ads_active: 0, creative_fatigue: 0, website: 0 } };
      diagnosis = {
        headline: "Tu perfil de creador/a",
        score_label: "Tienes potencial para trabajar con marcas a través de UGC Colombia",
        gaps: [],
        recommendations: ["Nuestro equipo revisará tu perfil y te contactará con oportunidades."],
        urgency_message: "Te contactaremos en las próximas 48 horas.",
        cta_message: "Agenda una llamada para conocernos.",
      };
    }

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          contact: result.data,
          qualification_score: score.total,
          temperature: score.temperature,
          ai_diagnosis: diagnosis,
        }),
      });

      const resBody = await res.json().catch(() => ({} as Record<string, unknown>));

      if (!res.ok) {
        throw new Error((resBody.error as string) || "Error al enviar tus datos");
      }

      onSubmit(result.data, score, diagnosis, resBody.lead_id as string | undefined);
    } catch (err) {
      setServerError(err instanceof Error ? err.message : "Error inesperado. Intenta de nuevo.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <StepLayout
      title="Casi listo — ¿dónde te enviamos el diagnóstico?"
      subtitle="Recibirás un análisis completo de tu marca por email."
      onBack={onBack}
      onSubmit={handleSubmit}
      submitLabel="Ver mi diagnóstico →"
      isSubmitting={isSubmitting}
    >
      <div className="space-y-4">
        <div>
          <label className={labelClass}>Email</label>
          <input
            type="email"
            className={inputClass}
            placeholder="tu@email.com"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          {errors.email && <p className={errorClass}>{errors.email}</p>}
        </div>

        <div>
          <label className={labelClass}>WhatsApp</label>
          <div className="flex gap-2">
            <span className="flex items-center px-3.5 bg-black/60 border border-brand-gold/30 rounded-xl text-sm text-brand-gray">
              +57
            </span>
            <input
              type="tel"
              className={inputClass}
              placeholder="3132947776"
              value={form.whatsapp}
              onChange={(e) => setForm({ ...form, whatsapp: e.target.value })}
            />
          </div>
          {errors.whatsapp && <p className={errorClass}>{errors.whatsapp}</p>}
        </div>

        {serverError && (
          <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-sm text-red-400">
            {serverError}
          </div>
        )}

        <p className="text-[11px] text-brand-gray/50 leading-relaxed">
          Al enviar aceptas recibir tu diagnóstico por email y WhatsApp. Cero spam.
        </p>
      </div>
    </StepLayout>
  );
}
