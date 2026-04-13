"use client";

import { useState } from "react";
import { StepLayout, inputClass, labelClass, errorClass, OptionCard } from "./shared";
import type { BrandInfo } from "@/lib/validations/lead-audit";
import { brandInfoSchema } from "@/lib/validations/lead-audit";

const INDUSTRIES = [
  { value: "ecommerce", label: "E-commerce" },
  { value: "marca_productos", label: "Marca de productos" },
  { value: "servicios", label: "Servicios" },
  { value: "saas", label: "SaaS / Software" },
  { value: "dropshipping", label: "Dropshipping" },
  { value: "restaurantes", label: "Restaurantes / Food" },
  { value: "salud_belleza", label: "Salud y belleza" },
  { value: "educacion", label: "Educación" },
  { value: "fintech", label: "Fintech" },
  { value: "otro", label: "Otra industria" },
] as const;

interface Props {
  onSubmit: (data: BrandInfo) => void;
  onBack: () => void;
}

export function StepBrandInfo({ onSubmit, onBack }: Props) {
  const [form, setForm] = useState({
    full_name: "",
    company_name: "",
    website: "",
    industry: "" as string,
    instagram_handle: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  function handleSubmit() {
    const result = brandInfoSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        const key = issue.path[0] as string;
        fieldErrors[key] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }
    setErrors({});

    // Fire early diagnosis pipeline in background (while user does the quiz)
    if (result.data.company_name) {
      fetch("/api/early-diagnosis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          brand_name: result.data.company_name,
          instagram_handle: result.data.instagram_handle,
          website: result.data.website,
          industry: result.data.industry,
        }),
      }).catch(() => {});
    }

    onSubmit(result.data);
  }

  return (
    <StepLayout
      title="Primero, cuéntanos de tu marca"
      subtitle="Con esto personalizamos tu diagnóstico al 100%."
      onBack={onBack}
      onSubmit={handleSubmit}
    >
      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Tu nombre</label>
            <input
              type="text"
              className={inputClass}
              placeholder="Ej: Juan Pérez"
              value={form.full_name}
              onChange={(e) => setForm({ ...form, full_name: e.target.value })}
            />
            {errors.full_name && <p className={errorClass}>{errors.full_name}</p>}
          </div>
          <div>
            <label className={labelClass}>Nombre de tu marca</label>
            <input
              type="text"
              className={inputClass}
              placeholder="Ej: Mi Tienda Online"
              value={form.company_name}
              onChange={(e) => setForm({ ...form, company_name: e.target.value })}
            />
            {errors.company_name && <p className={errorClass}>{errors.company_name}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Instagram de tu marca</label>
            <input
              type="text"
              className={inputClass}
              placeholder="@tumarca"
              value={form.instagram_handle}
              onChange={(e) => setForm({ ...form, instagram_handle: e.target.value })}
            />
          </div>
          <div>
            <label className={labelClass}>Sitio web</label>
            <input
              type="url"
              className={inputClass}
              placeholder="https://tumarca.com"
              value={form.website}
              onChange={(e) => setForm({ ...form, website: e.target.value })}
            />
          </div>
        </div>

        <div>
          <label className={labelClass}>¿En qué industria estás?</label>
          {errors.industry && <p className={errorClass}>{errors.industry}</p>}
          <div className="grid grid-cols-2 gap-2 mt-2">
            {INDUSTRIES.map((ind) => (
              <OptionCard
                key={ind.value}
                selected={form.industry === ind.value}
                onClick={() => setForm({ ...form, industry: ind.value })}
                label={ind.label}
              />
            ))}
          </div>
        </div>
      </div>
    </StepLayout>
  );
}
