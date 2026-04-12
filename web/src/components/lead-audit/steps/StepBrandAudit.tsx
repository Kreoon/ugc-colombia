"use client";

import { useState } from "react";
import { StepLayout, labelClass, errorClass, OptionCard } from "./shared";
import type { BrandAudit } from "@/lib/validations/lead-audit";
import { brandAuditSchema } from "@/lib/validations/lead-audit";

const AD_BUDGETS = [
  { value: "nada", label: "$0 — No invierto en ads" },
  { value: "menos_500", label: "Menos de $500 USD/mes" },
  { value: "500_1000", label: "$500 - $1,000 USD/mes" },
  { value: "1000_3000", label: "$1,000 - $3,000 USD/mes" },
  { value: "3000_5000", label: "$3,000 - $5,000 USD/mes" },
  { value: "mas_5000", label: "Más de $5,000 USD/mes" },
] as const;

const CONTENT_BUDGETS = [
  { value: "nada", label: "$0 — No invierto en contenido" },
  { value: "menos_500", label: "Menos de $500 USD/mes" },
  { value: "500_1000", label: "$500 - $1,000 USD/mes" },
  { value: "1000_3000", label: "$1,000 - $3,000 USD/mes" },
  { value: "3000_5000", label: "$3,000 - $5,000 USD/mes" },
  { value: "mas_5000", label: "Más de $5,000 USD/mes" },
] as const;

const CTR_OPTIONS = [
  { value: "no_se", label: "No sé / No mido" },
  { value: "menos_1", label: "Menos de 1%" },
  { value: "1_2", label: "Entre 1% y 2%" },
  { value: "mas_2", label: "Más de 2%" },
] as const;

const CREATIVE_AGE = [
  { value: "menos_2", label: "Menos de 2 semanas" },
  { value: "2_4", label: "2-4 semanas" },
  { value: "4_8", label: "1-2 meses" },
  { value: "mas_8", label: "Más de 2 meses" },
  { value: "no_tengo", label: "No tengo creativos de video" },
] as const;

const MONTHLY_PIECES = [
  { value: "0", label: "Ninguno" },
  { value: "1_3", label: "1-3 piezas" },
  { value: "4_8", label: "4-8 piezas" },
  { value: "9_15", label: "9-15 piezas" },
  { value: "mas_15", label: "Más de 15 piezas" },
] as const;

const PAINS = [
  { value: "no_tengo_contenido", label: "No tengo contenido de calidad" },
  { value: "contenido_no_convierte", label: "Mi contenido no genera ventas" },
  { value: "muy_caro", label: "Producir contenido es muy caro" },
  { value: "no_encuentro_creadores", label: "No encuentro buenos creadores" },
  { value: "inconsistencia", label: "No soy consistente publicando" },
  { value: "no_se_que_hacer", label: "No sé por dónde empezar" },
] as const;

const URGENCY = [
  { value: "inmediata", label: "Necesito esto ya — es urgente" },
  { value: "este_mes", label: "Quiero arrancar este mes" },
  { value: "proximo_trimestre", label: "En el próximo trimestre" },
  { value: "explorando", label: "Solo estoy explorando opciones" },
] as const;

interface Props {
  onSubmit: (data: BrandAudit) => void;
  onBack: () => void;
}

export function StepBrandAudit({ onSubmit, onBack }: Props) {
  const [form, setForm] = useState({
    ad_budget: "" as string,
    content_budget: "" as string,
    has_active_ads: false,
    current_ctr: "" as string,
    creative_age_weeks: "" as string,
    monthly_content_pieces: "" as string,
    biggest_pain: "" as string,
    urgency: "" as string,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  function handleSubmit() {
    const result = brandAuditSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        fieldErrors[issue.path[0] as string] = issue.message;
      });
      setErrors(fieldErrors);
      // Scroll to first error
      const firstKey = result.error.issues[0]?.path[0] as string;
      document.getElementById(`audit-${firstKey}`)?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    setErrors({});
    onSubmit(result.data);
  }

  return (
    <StepLayout
      title="Auditoría de tu estrategia"
      subtitle="Responde honestamente — tu diagnóstico será más preciso."
      onBack={onBack}
      onSubmit={handleSubmit}
      submitLabel="Ver mi diagnóstico"
    >
      <div className="space-y-6">
        {/* Ad budget */}
        <div id="audit-ad_budget">
          <label className={labelClass}>
            <span className="text-brand-yellow mr-1">1.</span>
            ¿Cuánto inviertes en publicidad digital al mes? *
          </label>
          {errors.ad_budget && <p className={errorClass}>{errors.ad_budget}</p>}
          <div className="space-y-2 mt-2">
            {AD_BUDGETS.map((b) => (
              <OptionCard
                key={b.value}
                selected={form.ad_budget === b.value}
                onClick={() => setForm({ ...form, ad_budget: b.value })}
                label={b.label}
              />
            ))}
          </div>
        </div>

        {/* Content budget */}
        <div id="audit-content_budget">
          <label className={labelClass}>
            <span className="text-brand-yellow mr-1">2.</span>
            ¿Cuánto inviertes en producción de contenido al mes? *
          </label>
          {errors.content_budget && <p className={errorClass}>{errors.content_budget}</p>}
          <div className="space-y-2 mt-2">
            {CONTENT_BUDGETS.map((b) => (
              <OptionCard
                key={b.value}
                selected={form.content_budget === b.value}
                onClick={() => setForm({ ...form, content_budget: b.value })}
                label={b.label}
              />
            ))}
          </div>
        </div>

        {/* Active ads toggle */}
        <div>
          <label className={labelClass}>
            <span className="text-brand-yellow mr-1">3.</span>
            ¿Tienes anuncios activos en este momento?
          </label>
          <div className="grid grid-cols-2 gap-2 mt-2">
            <OptionCard
              selected={form.has_active_ads === true}
              onClick={() => setForm({ ...form, has_active_ads: true })}
              label="Sí, tengo ads corriendo"
            />
            <OptionCard
              selected={form.has_active_ads === false}
              onClick={() => setForm({ ...form, has_active_ads: false })}
              label="No, no tengo ads activos"
            />
          </div>
        </div>

        {/* CTR */}
        <div id="audit-current_ctr">
          <label className={labelClass}>
            <span className="text-brand-yellow mr-1">4.</span>
            ¿Cuál es tu CTR promedio en anuncios? *
          </label>
          {errors.current_ctr && <p className={errorClass}>{errors.current_ctr}</p>}
          <div className="grid grid-cols-2 gap-2 mt-2">
            {CTR_OPTIONS.map((c) => (
              <OptionCard
                key={c.value}
                selected={form.current_ctr === c.value}
                onClick={() => setForm({ ...form, current_ctr: c.value })}
                label={c.label}
              />
            ))}
          </div>
        </div>

        {/* Creative age */}
        <div id="audit-creative_age_weeks">
          <label className={labelClass}>
            <span className="text-brand-yellow mr-1">5.</span>
            ¿Hace cuánto produjiste tu último creativo de video? *
          </label>
          {errors.creative_age_weeks && <p className={errorClass}>{errors.creative_age_weeks}</p>}
          <div className="space-y-2 mt-2">
            {CREATIVE_AGE.map((c) => (
              <OptionCard
                key={c.value}
                selected={form.creative_age_weeks === c.value}
                onClick={() => setForm({ ...form, creative_age_weeks: c.value })}
                label={c.label}
              />
            ))}
          </div>
        </div>

        {/* Monthly content */}
        <div id="audit-monthly_content_pieces">
          <label className={labelClass}>
            <span className="text-brand-yellow mr-1">6.</span>
            ¿Cuántas piezas de contenido produces al mes? *
          </label>
          {errors.monthly_content_pieces && <p className={errorClass}>{errors.monthly_content_pieces}</p>}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-2">
            {MONTHLY_PIECES.map((m) => (
              <OptionCard
                key={m.value}
                selected={form.monthly_content_pieces === m.value}
                onClick={() => setForm({ ...form, monthly_content_pieces: m.value })}
                label={m.label}
              />
            ))}
          </div>
        </div>

        {/* Biggest pain */}
        <div id="audit-biggest_pain">
          <label className={labelClass}>
            <span className="text-brand-yellow mr-1">7.</span>
            ¿Cuál es tu mayor dolor con el contenido? *
          </label>
          {errors.biggest_pain && <p className={errorClass}>{errors.biggest_pain}</p>}
          <div className="space-y-2 mt-2">
            {PAINS.map((p) => (
              <OptionCard
                key={p.value}
                selected={form.biggest_pain === p.value}
                onClick={() => setForm({ ...form, biggest_pain: p.value })}
                label={p.label}
              />
            ))}
          </div>
        </div>

        {/* Urgency */}
        <div id="audit-urgency">
          <label className={labelClass}>
            <span className="text-brand-yellow mr-1">8.</span>
            ¿Qué tan urgente es resolver esto? *
          </label>
          {errors.urgency && <p className={errorClass}>{errors.urgency}</p>}
          <div className="space-y-2 mt-2">
            {URGENCY.map((u) => (
              <OptionCard
                key={u.value}
                selected={form.urgency === u.value}
                onClick={() => setForm({ ...form, urgency: u.value })}
                label={u.label}
              />
            ))}
          </div>
        </div>
      </div>
    </StepLayout>
  );
}
