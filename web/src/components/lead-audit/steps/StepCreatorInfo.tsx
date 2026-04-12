"use client";

import { useState } from "react";
import { StepLayout, inputClass, labelClass, errorClass, OptionCard, MultiSelectCard } from "./shared";
import type { CreatorInfo } from "@/lib/validations/lead-audit";
import { creatorInfoSchema } from "@/lib/validations/lead-audit";

const PLATFORMS = [
  "Instagram", "TikTok", "YouTube", "Facebook", "Twitter/X", "LinkedIn",
];

const FOLLOWER_RANGES = [
  { value: "menos_1k", label: "Menos de 1K" },
  { value: "1k_10k", label: "1K - 10K" },
  { value: "10k_50k", label: "10K - 50K" },
  { value: "50k_100k", label: "50K - 100K" },
  { value: "mas_100k", label: "Más de 100K" },
] as const;

const EXPERIENCE = [
  { value: "menos_1", label: "Menos de 1 año" },
  { value: "1_2", label: "1-2 años" },
  { value: "3_5", label: "3-5 años" },
  { value: "mas_5", label: "Más de 5 años" },
] as const;

interface Props {
  onSubmit: (data: CreatorInfo) => void;
  onBack: () => void;
}

export function StepCreatorInfo({ onSubmit, onBack }: Props) {
  const [form, setForm] = useState({
    full_name: "",
    creator_niche: "",
    creator_platforms: [] as string[],
    creator_portfolio_url: "",
    creator_followers: "" as string,
    creator_experience_years: "" as string,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  function togglePlatform(p: string) {
    setForm((prev) => ({
      ...prev,
      creator_platforms: prev.creator_platforms.includes(p)
        ? prev.creator_platforms.filter((x) => x !== p)
        : [...prev.creator_platforms, p],
    }));
  }

  function handleSubmit() {
    const result = creatorInfoSchema.safeParse(form);
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
      title="Sobre ti como creador/a"
      subtitle="Queremos conocer tu perfil para conectarte con las marcas ideales."
      onBack={onBack}
      onSubmit={handleSubmit}
    >
      <div className="space-y-4">
        <div>
          <label className={labelClass}>Tu nombre *</label>
          <input
            type="text"
            className={inputClass}
            placeholder="Ej: María López"
            value={form.full_name}
            onChange={(e) => setForm({ ...form, full_name: e.target.value })}
          />
          {errors.full_name && <p className={errorClass}>{errors.full_name}</p>}
        </div>

        <div>
          <label className={labelClass}>Tu nicho de contenido *</label>
          <input
            type="text"
            className={inputClass}
            placeholder="Ej: Belleza, Fitness, Tech, Lifestyle..."
            value={form.creator_niche}
            onChange={(e) => setForm({ ...form, creator_niche: e.target.value })}
          />
          {errors.creator_niche && <p className={errorClass}>{errors.creator_niche}</p>}
        </div>

        <div>
          <label className={labelClass}>Plataformas donde creas contenido *</label>
          {errors.creator_platforms && <p className={errorClass}>{errors.creator_platforms}</p>}
          <div className="flex flex-wrap gap-2 mt-2">
            {PLATFORMS.map((p) => (
              <MultiSelectCard
                key={p}
                selected={form.creator_platforms.includes(p)}
                onClick={() => togglePlatform(p)}
                label={p}
              />
            ))}
          </div>
        </div>

        <div>
          <label className={labelClass}>Link a tu portafolio o redes</label>
          <input
            type="url"
            className={inputClass}
            placeholder="https://instagram.com/tucuenta"
            value={form.creator_portfolio_url}
            onChange={(e) => setForm({ ...form, creator_portfolio_url: e.target.value })}
          />
        </div>

        <div>
          <label className={labelClass}>Seguidores totales (tu plataforma principal) *</label>
          {errors.creator_followers && <p className={errorClass}>{errors.creator_followers}</p>}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-2">
            {FOLLOWER_RANGES.map((r) => (
              <OptionCard
                key={r.value}
                selected={form.creator_followers === r.value}
                onClick={() => setForm({ ...form, creator_followers: r.value })}
                label={r.label}
              />
            ))}
          </div>
        </div>

        <div>
          <label className={labelClass}>Experiencia creando contenido *</label>
          {errors.creator_experience_years && <p className={errorClass}>{errors.creator_experience_years}</p>}
          <div className="grid grid-cols-2 gap-2 mt-2">
            {EXPERIENCE.map((e) => (
              <OptionCard
                key={e.value}
                selected={form.creator_experience_years === e.value}
                onClick={() => setForm({ ...form, creator_experience_years: e.value })}
                label={e.label}
              />
            ))}
          </div>
        </div>
      </div>
    </StepLayout>
  );
}
