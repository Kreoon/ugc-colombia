"use client";

import { useState } from "react";
import { StepLayout, labelClass, errorClass, OptionCard, MultiSelectCard } from "./shared";
import type { CreatorAudit } from "@/lib/validations/lead-audit";
import { creatorAuditSchema } from "@/lib/validations/lead-audit";

const CONTENT_TYPES = [
  "Testimonial", "Unboxing", "Review", "Demo de producto",
  "Lifestyle", "Hook para ads", "Foto pack", "Tutorial",
];

const RATES = [
  { value: "menos_50", label: "Menos de $50 USD (~$200K COP)" },
  { value: "50_100", label: "$50–$100 USD ($200K–$400K COP)" },
  { value: "100_200", label: "$100–$200 USD ($400K–$800K COP)" },
  { value: "200_500", label: "$200–$500 USD ($800K–$2M COP)" },
  { value: "mas_500", label: "Más de $500 USD ($2M+ COP)" },
  { value: "no_se", label: "No sé cuánto cobrar" },
] as const;

const AVAILABILITY = [
  { value: "inmediata", label: "Puedo empezar ya" },
  { value: "1_semana", label: "En 1 semana" },
  { value: "2_semanas", label: "En 2 semanas" },
  { value: "1_mes", label: "En 1 mes o más" },
] as const;

const GOALS = [
  { value: "ganar_dinero", label: "Generar ingresos creando contenido" },
  { value: "trabajar_con_marcas", label: "Trabajar con marcas reconocidas" },
  { value: "crecer_audiencia", label: "Crecer mi audiencia personal" },
  { value: "mejorar_habilidades", label: "Mejorar mis habilidades de creación" },
  { value: "ingreso_estable", label: "Tener un ingreso mensual estable" },
] as const;

interface Props {
  onSubmit: (data: CreatorAudit) => void;
  onBack: () => void;
}

export function StepCreatorAudit({ onSubmit, onBack }: Props) {
  const [form, setForm] = useState({
    content_types: [] as string[],
    has_ugc_experience: false,
    rate_per_video: "" as string,
    availability: "" as string,
    biggest_goal: "" as string,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  function toggleType(t: string) {
    setForm((prev) => ({
      ...prev,
      content_types: prev.content_types.includes(t)
        ? prev.content_types.filter((x) => x !== t)
        : [...prev.content_types, t],
    }));
  }

  function handleSubmit() {
    const result = creatorAuditSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        fieldErrors[issue.path[0] as string] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    onSubmit(result.data);
  }

  return (
    <StepLayout
      title="Tu perfil como creador/a"
      subtitle="Esto nos ayuda a conectarte con las marcas perfectas para ti."
      onBack={onBack}
      onSubmit={handleSubmit}
      submitLabel="Continuar"
    >
      <div className="space-y-6">
        <div>
          <label className={labelClass}>
            <span className="text-brand-yellow mr-1">1.</span>
            ¿Qué tipo de contenido puedes crear? *
          </label>
          {errors.content_types && <p className={errorClass}>{errors.content_types}</p>}
          <div className="flex flex-wrap gap-2 mt-2">
            {CONTENT_TYPES.map((t) => (
              <MultiSelectCard
                key={t}
                selected={form.content_types.includes(t)}
                onClick={() => toggleType(t)}
                label={t}
              />
            ))}
          </div>
        </div>

        <div>
          <label className={labelClass}>
            <span className="text-brand-yellow mr-1">2.</span>
            ¿Tienes experiencia creando UGC para marcas?
          </label>
          <div className="grid grid-cols-2 gap-2 mt-2">
            <OptionCard
              selected={form.has_ugc_experience === true}
              onClick={() => setForm({ ...form, has_ugc_experience: true })}
              label="Sí, ya he trabajado con marcas"
            />
            <OptionCard
              selected={form.has_ugc_experience === false}
              onClick={() => setForm({ ...form, has_ugc_experience: false })}
              label="No, sería mi primera vez"
            />
          </div>
        </div>

        <div>
          <label className={labelClass}>
            <span className="text-brand-yellow mr-1">3.</span>
            ¿Cuánto cobras (o cobrarías) por video? *
          </label>
          {errors.rate_per_video && <p className={errorClass}>{errors.rate_per_video}</p>}
          <div className="grid grid-cols-2 gap-2 mt-2">
            {RATES.map((r) => (
              <OptionCard
                key={r.value}
                selected={form.rate_per_video === r.value}
                onClick={() => setForm({ ...form, rate_per_video: r.value })}
                label={r.label}
              />
            ))}
          </div>
        </div>

        <div>
          <label className={labelClass}>
            <span className="text-brand-yellow mr-1">4.</span>
            ¿Cuándo podrías empezar? *
          </label>
          {errors.availability && <p className={errorClass}>{errors.availability}</p>}
          <div className="grid grid-cols-2 gap-2 mt-2">
            {AVAILABILITY.map((a) => (
              <OptionCard
                key={a.value}
                selected={form.availability === a.value}
                onClick={() => setForm({ ...form, availability: a.value })}
                label={a.label}
              />
            ))}
          </div>
        </div>

        <div>
          <label className={labelClass}>
            <span className="text-brand-yellow mr-1">5.</span>
            ¿Cuál es tu objetivo principal? *
          </label>
          {errors.biggest_goal && <p className={errorClass}>{errors.biggest_goal}</p>}
          <div className="space-y-2 mt-2">
            {GOALS.map((g) => (
              <OptionCard
                key={g.value}
                selected={form.biggest_goal === g.value}
                onClick={() => setForm({ ...form, biggest_goal: g.value })}
                label={g.label}
              />
            ))}
          </div>
        </div>
      </div>
    </StepLayout>
  );
}
