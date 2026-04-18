"use client";

/**
 * ForgeLeadForm — Formulario de captación de /forge.
 *
 * Campos obligatorios: Nombre, Empresa, Correo, Teléfono.
 * Opcional: ¿Cómo nos conociste?
 *
 * Submit → POST /api/lead-forge → redirige a /forge/gracias con query params.
 */

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

type FormState = {
  name: string;
  company: string;
  email: string;
  phone: string;
  howHeard: string;
};

type Props = {
  variant?: "hero" | "cta";
  className?: string;
};

const INITIAL: FormState = {
  name: "",
  company: "",
  email: "",
  phone: "",
  howHeard: "",
};

export function ForgeLeadForm({ variant = "hero", className = "" }: Props) {
  const router = useRouter();
  const [form, setForm] = useState<FormState>(INITIAL);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const [isSubmitting, startTransition] = useTransition();

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  }

  function validate(): boolean {
    const errs: Partial<Record<keyof FormState, string>> = {};
    if (!form.name.trim()) errs.name = "El nombre es obligatorio";
    if (!form.company.trim()) errs.company = "La empresa es obligatoria";
    if (!form.email.trim()) errs.email = "El correo es obligatorio";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = "Correo inválido";
    if (!form.phone.trim()) errs.phone = "El teléfono es obligatorio";
    else if (form.phone.replace(/\D/g, "").length < 7) errs.phone = "Teléfono muy corto";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setServerError(null);
    if (!validate()) return;

    startTransition(async () => {
      try {
        const res = await fetch("/api/lead-forge", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });

        if (!res.ok) {
          const data = await res.json().catch(() => ({ error: "Error al enviar" }));
          setServerError(data.error || "Hubo un error. Intenta de nuevo.");
          return;
        }

        const data = await res.json();

        // GA4 + Meta Pixel event
        if (typeof window !== "undefined") {
          const w = window as unknown as { dataLayer?: unknown[]; fbq?: (...args: unknown[]) => void };
          w.dataLayer?.push({ event: "forge_lead_submit", priority_slot: data.hasPrioritySlot });
          w.fbq?.("track", "Lead", { content_name: "Content Forge", priority: data.hasPrioritySlot });
        }

        const params = new URLSearchParams({
          name: form.name,
          priority: String(data.hasPrioritySlot),
        });
        router.push(`/forge/gracias?${params.toString()}`);
      } catch (err) {
        console.error("[ForgeLeadForm] submit error:", err);
        setServerError("No pudimos conectar. Revisa tu internet e intenta de nuevo.");
      }
    });
  }

  const isHero = variant === "hero";

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className={`flex flex-col gap-4 p-6 md:p-8 rounded-2xl border border-brand-yellow/40 bg-black/60 backdrop-blur-sm ${className}`}
    >
      <div className="flex flex-col gap-1">
        <p className="text-xs text-brand-yellow uppercase tracking-widest font-bold">
          {isHero ? "Descargar Content Forge" : "Déjanos tus datos"}
        </p>
        <h3 className="font-display text-3xl md:text-4xl uppercase text-white leading-none tracking-tight">
          {isHero ? "Es gratis. Es tuyo." : "Recíbelo ahora"}
        </h3>
        <p className="text-sm text-brand-gray-light leading-snug mt-1">
          Te enviamos el repositorio + guía de instalación a tu correo en menos de 1 minuto.
        </p>
      </div>

      <Field
        label="Nombre completo"
        name="name"
        required
        value={form.name}
        onChange={(v) => update("name", v)}
        error={errors.name}
        placeholder="Tu nombre"
        autoComplete="name"
      />

      <Field
        label="Empresa o marca personal"
        name="company"
        required
        value={form.company}
        onChange={(v) => update("company", v)}
        error={errors.company}
        placeholder="Nombre de tu empresa"
        autoComplete="organization"
      />

      <Field
        label="Correo electrónico"
        name="email"
        type="email"
        required
        value={form.email}
        onChange={(v) => update("email", v)}
        error={errors.email}
        placeholder="tu@correo.com"
        autoComplete="email"
      />

      <Field
        label="Teléfono (WhatsApp preferido)"
        name="phone"
        type="tel"
        required
        value={form.phone}
        onChange={(v) => update("phone", v)}
        error={errors.phone}
        placeholder="+57 300 123 4567"
        autoComplete="tel"
      />

      <div className="flex flex-col gap-1.5">
        <label htmlFor="howHeard" className="text-xs text-brand-gray-light uppercase tracking-wider font-semibold">
          ¿Cómo nos conociste? <span className="text-brand-gray-light/50 normal-case tracking-normal">(opcional)</span>
        </label>
        <select
          id="howHeard"
          name="howHeard"
          value={form.howHeard}
          onChange={(e) => update("howHeard", e.target.value)}
          className="bg-black/40 text-white border border-white/15 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-brand-yellow transition-colors"
        >
          <option value="">Selecciona...</option>
          <option value="instagram">Instagram</option>
          <option value="youtube">YouTube</option>
          <option value="facebook">Facebook</option>
          <option value="tiktok">TikTok</option>
          <option value="linkedin">LinkedIn</option>
          <option value="referido">Un amigo me lo recomendó</option>
          <option value="google">Google / Búsqueda</option>
          <option value="podcast">Podcast</option>
          <option value="otro">Otro</option>
        </select>
      </div>

      {serverError ? (
        <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/30 rounded-lg px-3 py-2">
          {serverError}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-2 bg-brand-yellow hover:bg-brand-yellow-hover disabled:opacity-60 disabled:cursor-not-allowed text-brand-black font-bold py-4 px-6 rounded-xl text-base transition-colors"
      >
        {isSubmitting ? "Enviando..." : "Descargar Content Forge gratis →"}
      </button>

      <p className="text-[11px] text-brand-gray-light/70 leading-relaxed text-center">
        Al enviar aceptas recibir correos con este entregable y futuros regalos.
        Tus datos están protegidos por la Ley 1581 de Colombia y nuestra{" "}
        <a href="/legal/privacidad" className="text-brand-yellow hover:underline">
          política de privacidad
        </a>
        .
      </p>
    </form>
  );
}

// ─── Field ─────────────────────────────────────────────────────────────
function Field(props: {
  label: string;
  name: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  placeholder?: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={props.name} className="text-xs text-brand-gray-light uppercase tracking-wider font-semibold">
        {props.label}
        {props.required ? <span className="text-brand-yellow ml-1">*</span> : null}
      </label>
      <input
        id={props.name}
        name={props.name}
        type={props.type || "text"}
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
        placeholder={props.placeholder}
        required={props.required}
        autoComplete={props.autoComplete}
        className={`bg-black/40 text-white border rounded-lg px-4 py-3 text-sm placeholder:text-brand-gray-light/40 focus:outline-none transition-colors ${
          props.error ? "border-red-500/60 focus:border-red-500" : "border-white/15 focus:border-brand-yellow"
        }`}
      />
      {props.error ? <p className="text-xs text-red-400">{props.error}</p> : null}
    </div>
  );
}
