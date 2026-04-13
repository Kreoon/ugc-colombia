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

// Limpia el input de Instagram: extrae el handle de URLs, quita @, espacios, etc.
function cleanInstagramHandle(raw: string): string {
  let val = raw.trim();

  // Si pegaron una URL completa de Instagram
  const urlMatch = val.match(/(?:instagram\.com|instagr\.am)\/([A-Za-z0-9_.]+)/i);
  if (urlMatch) return urlMatch[1].toLowerCase();

  // Quitar @ del inicio (uno o varios)
  val = val.replace(/^@+/, "");

  // Quitar espacios
  val = val.replace(/\s+/g, "");

  return val.toLowerCase();
}

// Limpia URL de website
function cleanWebsite(raw: string): string {
  let val = raw.trim();
  if (!val) return "";

  // Si no tiene protocolo, agregar https://
  if (val && !val.match(/^https?:\/\//i)) {
    val = `https://${val}`;
  }

  return val;
}

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

  function handleInstagramChange(raw: string) {
    // Limpiar en tiempo real mientras escribe
    const cleaned = cleanInstagramHandle(raw);
    setForm({ ...form, instagram_handle: cleaned });
  }

  function handleWebsiteChange(raw: string) {
    setForm({ ...form, website: raw });
  }

  function handleSubmit() {
    // Limpiar antes de validar
    const cleaned = {
      ...form,
      instagram_handle: cleanInstagramHandle(form.instagram_handle),
      website: cleanWebsite(form.website),
    };

    const result = brandInfoSchema.safeParse(cleaned);
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

    // Fire early diagnosis pipeline in background
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
      title="Cuéntanos de tu marca para generar tu análisis"
      subtitle="Nuestra IA necesita estos datos para analizar tu presencia digital."
      onBack={onBack}
      onSubmit={handleSubmit}
    >
      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Tu nombre *</label>
            <input
              type="text"
              autoComplete="name"
              className={inputClass}
              placeholder="Ej: Juan Pérez"
              value={form.full_name}
              onChange={(e) => setForm({ ...form, full_name: e.target.value })}
            />
            {errors.full_name && <p className={errorClass}>{errors.full_name}</p>}
          </div>
          <div>
            <label className={labelClass}>Nombre de tu marca *</label>
            <input
              type="text"
              autoComplete="organization"
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
            <label className={labelClass}>Instagram de tu marca *</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-gray/50 text-sm pointer-events-none">@</span>
              <input
                type="text"
                className={`${inputClass} pl-8`}
                placeholder="tumarca"
                value={form.instagram_handle}
                onChange={(e) => handleInstagramChange(e.target.value)}
              />
            </div>
            {errors.instagram_handle && <p className={errorClass}>{errors.instagram_handle}</p>}
            <p className="text-[10px] text-brand-gray/40 mt-1">Pega tu @handle o la URL de Instagram</p>
          </div>
          <div>
            <label className={labelClass}>Sitio web</label>
            <input
              type="url"
              autoComplete="url"
              className={inputClass}
              placeholder="tumarca.com"
              value={form.website}
              onChange={(e) => handleWebsiteChange(e.target.value)}
            />
          </div>
        </div>

        <div>
          <label className={labelClass}>¿En qué industria estás? *</label>
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
