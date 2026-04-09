"use client";

import { useState } from "react";
import { useForm, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Gift, Loader2, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  CATEGORIES,
  INDUSTRIES,
  brandSchema,
  creatorSchema,
  type BrandPayload,
  type CreatorPayload,
} from "@/lib/validations/registration";
import { registerUser } from "@/lib/api/registration";

type UserType = "creator" | "brand";

const ACCENT = "#f97316";

const inputClass = cn(
  "w-full bg-[#0a0a0a] border border-[#222] rounded-lg px-4 py-3",
  "text-white placeholder:text-zinc-500 font-sans text-sm",
  "focus:outline-none focus:border-[#f97316] focus:ring-2 focus:ring-[#f97316]/30",
  "transition-colors"
);

const labelClass =
  "block text-[11px] font-sans font-semibold text-zinc-400 mb-1.5 tracking-wider uppercase";
const errorClass = "mt-1 text-xs text-red-400";

const BENEFITS = [
  "1 mes gratis de suscripción",
  "500 tokens AI de bienvenida",
  "Descuento en comisiones del marketplace",
  'Badge "UGC Colombia" en tu perfil',
];

export function RegistrationForm() {
  const [userType, setUserType] = useState<UserType>("creator");
  const [serverError, setServerError] = useState("");
  const [success, setSuccess] = useState(false);
  const [categories, setCategories] = useState<string[]>([]);

  const creatorForm = useForm<CreatorPayload>({
    resolver: zodResolver(creatorSchema) as Resolver<CreatorPayload>,
    defaultValues: { type: "creator" },
  });

  const brandForm = useForm<BrandPayload>({
    resolver: zodResolver(brandSchema) as Resolver<BrandPayload>,
    defaultValues: { type: "brand" },
  });

  const toggleCategory = (cat: string) => {
    setCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const onCreatorSubmit = async (values: CreatorPayload) => {
    setServerError("");
    try {
      await registerUser({
        ...values,
        categories: categories as CreatorPayload["categories"],
      });
      setSuccess(true);
    } catch (err) {
      setServerError(err instanceof Error ? err.message : "Error inesperado");
    }
  };

  const onBrandSubmit = async (values: BrandPayload) => {
    setServerError("");
    try {
      await registerUser(values);
      setSuccess(true);
    } catch (err) {
      setServerError(err instanceof Error ? err.message : "Error inesperado");
    }
  };

  if (success) {
    return (
      <div
        className={cn(
          "w-full max-w-md mx-auto rounded-2xl p-8 text-center",
          "bg-[#111] border border-[#222]",
          "shadow-[0_0_60px_rgba(249,115,22,0.15)] animate-fade-in"
        )}
      >
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#f97316]/15 flex items-center justify-center">
          <CheckCircle2 className="w-9 h-9 text-[#f97316]" />
        </div>
        <h2 className="font-display text-2xl sm:text-3xl text-white tracking-wide uppercase mb-2">
          ¡Bienvenido a la Comunidad UGC Colombia!
        </h2>
        <p className="text-zinc-400 font-sans text-sm mb-6">
          Revisa tu email para verificar tu cuenta.
        </p>

        <div className="bg-[#0a0a0a] border border-[#f97316]/30 rounded-xl p-5 mb-6 text-left">
          <p className="text-[#f97316] font-sans font-semibold text-xs uppercase tracking-wider mb-3 flex items-center gap-2">
            <Sparkles className="w-4 h-4" /> Beneficios otorgados
          </p>
          <ul className="space-y-2 text-sm text-zinc-300 font-sans">
            <li>✓ 1 mes gratis de suscripción</li>
            <li>✓ 500 tokens AI de bienvenida</li>
            <li>✓ Badge &quot;UGC Colombia&quot; activado</li>
          </ul>
        </div>

        <a
          href="https://kreoon.com/auth"
          className={cn(
            "block w-full py-3 rounded-lg font-sans font-bold text-sm tracking-wide",
            "bg-[#f97316] text-white hover:bg-[#ea6a10] transition-colors",
            "shadow-[0_0_20px_rgba(249,115,22,0.4)]"
          )}
        >
          Ingresar a KREOON →
        </a>
      </div>
    );
  }

  const isCreator = userType === "creator";
  const activeForm = isCreator ? creatorForm : brandForm;
  const loading = activeForm.formState.isSubmitting;

  return (
    <div
      className={cn(
        "w-full max-w-md mx-auto rounded-2xl p-6 sm:p-8",
        "bg-[#111] border border-[#222]",
        "shadow-[0_0_80px_rgba(249,115,22,0.08)] animate-slide-up"
      )}
    >
      {/* Header */}
      <div className="text-center mb-6">
        <span
          className="inline-block px-3 py-1 rounded-full text-[10px] font-sans font-bold tracking-widest uppercase mb-4"
          style={{ backgroundColor: `${ACCENT}1f`, color: ACCENT, border: `1px solid ${ACCENT}66` }}
        >
          Comunidad UGC
        </span>
        <div className="flex items-center justify-center gap-2 mb-3 text-xs font-sans font-bold tracking-widest uppercase">
          <span style={{ color: ACCENT }}>UGC Colombia</span>
          <span className="text-zinc-600">×</span>
          <span className="text-white">KREOON</span>
        </div>
        <h1 className="font-display text-2xl sm:text-3xl text-white tracking-wide uppercase leading-tight">
          Únete a la Comunidad
        </h1>
      </div>

      {/* Benefits */}
      <div className="bg-[#0a0a0a] border border-[#f97316]/25 rounded-xl p-4 mb-6">
        <p className="flex items-center gap-2 text-[#f97316] font-sans font-bold text-xs uppercase tracking-wider mb-3">
          <Gift className="w-4 h-4" /> Beneficios exclusivos
        </p>
        <ul className="space-y-1.5">
          {BENEFITS.map((b) => (
            <li key={b} className="flex items-start gap-2 text-sm text-zinc-300 font-sans">
              <span className="text-[#f97316] flex-shrink-0">✓</span>
              <span>{b}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Toggle */}
      <div className="grid grid-cols-2 gap-2 mb-6 p-1 bg-[#0a0a0a] rounded-xl border border-[#222]">
        {(["creator", "brand"] as const).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => {
              setUserType(t);
              setServerError("");
            }}
            className={cn(
              "py-2.5 rounded-lg text-sm font-sans font-semibold tracking-wide transition-all",
              userType === t
                ? "bg-[#f97316] text-white shadow-[0_0_16px_rgba(249,115,22,0.45)]"
                : "text-zinc-400 hover:text-white"
            )}
          >
            {t === "creator" ? "Creador" : "Marca"}
          </button>
        ))}
      </div>

      {/* Forms */}
      {isCreator ? (
        <form
          key="creator"
          onSubmit={creatorForm.handleSubmit(onCreatorSubmit)}
          className="space-y-4"
          noValidate
        >
          <div>
            <label className={labelClass}>Email *</label>
            <input type="email" {...creatorForm.register("email")} className={inputClass} placeholder="tu@email.com" />
            {creatorForm.formState.errors.email && (
              <p className={errorClass}>{creatorForm.formState.errors.email.message}</p>
            )}
          </div>

          <div>
            <label className={labelClass}>Contraseña *</label>
            <input type="password" {...creatorForm.register("password")} className={inputClass} placeholder="Mínimo 8 caracteres" />
            {creatorForm.formState.errors.password && (
              <p className={errorClass}>{creatorForm.formState.errors.password.message}</p>
            )}
          </div>

          <div>
            <label className={labelClass}>Nombre completo *</label>
            <input type="text" {...creatorForm.register("full_name")} className={inputClass} placeholder="Juan Pérez" />
            {creatorForm.formState.errors.full_name && (
              <p className={errorClass}>{creatorForm.formState.errors.full_name.message}</p>
            )}
          </div>

          <div>
            <label className={labelClass}>Teléfono</label>
            <input type="tel" {...creatorForm.register("phone")} className={inputClass} placeholder="+57 300 000 0000" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelClass}>Instagram</label>
              <input type="text" {...creatorForm.register("instagram")} className={inputClass} placeholder="@usuario" />
            </div>
            <div>
              <label className={labelClass}>TikTok</label>
              <input type="text" {...creatorForm.register("tiktok")} className={inputClass} placeholder="@usuario" />
            </div>
          </div>

          <div>
            <label className={labelClass}>Categorías</label>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => toggleCategory(cat)}
                  className={cn(
                    "px-3 py-1.5 rounded-full text-xs font-sans font-medium capitalize transition-all",
                    categories.includes(cat)
                      ? "bg-[#f97316] text-white border border-[#f97316]"
                      : "border border-[#333] text-zinc-400 hover:text-white hover:border-[#f97316]"
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className={labelClass}>Ciudad</label>
            <input type="text" {...creatorForm.register("city")} className={inputClass} placeholder="Bogotá" />
          </div>

          {serverError && <p className="text-sm text-red-400 text-center">{serverError}</p>}

          <button
            type="submit"
            disabled={loading}
            className={cn(
              "w-full py-3.5 rounded-lg font-sans font-bold text-sm tracking-wide",
              "bg-[#f97316] text-white hover:bg-[#ea6a10] transition-colors",
              "shadow-[0_0_20px_rgba(249,115,22,0.35)] disabled:opacity-50",
              "flex items-center justify-center gap-2"
            )}
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" /> Registrando...
              </>
            ) : (
              "Crear cuenta de creador →"
            )}
          </button>
        </form>
      ) : (
        <form
          key="brand"
          onSubmit={brandForm.handleSubmit(onBrandSubmit)}
          className="space-y-4"
          noValidate
        >
          <div>
            <label className={labelClass}>Email *</label>
            <input type="email" {...brandForm.register("email")} className={inputClass} placeholder="contacto@empresa.com" />
            {brandForm.formState.errors.email && (
              <p className={errorClass}>{brandForm.formState.errors.email.message}</p>
            )}
          </div>

          <div>
            <label className={labelClass}>Contraseña *</label>
            <input type="password" {...brandForm.register("password")} className={inputClass} placeholder="Mínimo 8 caracteres" />
            {brandForm.formState.errors.password && (
              <p className={errorClass}>{brandForm.formState.errors.password.message}</p>
            )}
          </div>

          <div>
            <label className={labelClass}>Nombre de la empresa *</label>
            <input type="text" {...brandForm.register("company_name")} className={inputClass} placeholder="Mi Marca S.A.S." />
            {brandForm.formState.errors.company_name && (
              <p className={errorClass}>{brandForm.formState.errors.company_name.message}</p>
            )}
          </div>

          <div>
            <label className={labelClass}>Nombre del contacto *</label>
            <input type="text" {...brandForm.register("contact_name")} className={inputClass} placeholder="María Gómez" />
            {brandForm.formState.errors.contact_name && (
              <p className={errorClass}>{brandForm.formState.errors.contact_name.message}</p>
            )}
          </div>

          <div>
            <label className={labelClass}>Teléfono</label>
            <input type="tel" {...brandForm.register("phone")} className={inputClass} placeholder="+57 300 000 0000" />
          </div>

          <div>
            <label className={labelClass}>Website</label>
            <input type="url" {...brandForm.register("website")} className={inputClass} placeholder="https://miempresa.com" />
            {brandForm.formState.errors.website && (
              <p className={errorClass}>{brandForm.formState.errors.website.message}</p>
            )}
          </div>

          <div>
            <label className={labelClass}>Industria</label>
            <select
              {...brandForm.register("industry")}
              className={cn(inputClass, "appearance-none cursor-pointer")}
            >
              <option value="">Selecciona industria</option>
              {INDUSTRIES.map((i) => (
                <option key={i.value} value={i.value}>
                  {i.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className={labelClass}>Ciudad</label>
            <input type="text" {...brandForm.register("city")} className={inputClass} placeholder="Medellín" />
          </div>

          {serverError && <p className="text-sm text-red-400 text-center">{serverError}</p>}

          <button
            type="submit"
            disabled={loading}
            className={cn(
              "w-full py-3.5 rounded-lg font-sans font-bold text-sm tracking-wide",
              "bg-[#f97316] text-white hover:bg-[#ea6a10] transition-colors",
              "shadow-[0_0_20px_rgba(249,115,22,0.35)] disabled:opacity-50",
              "flex items-center justify-center gap-2"
            )}
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" /> Registrando...
              </>
            ) : (
              "Crear cuenta de marca →"
            )}
          </button>
        </form>
      )}

      {/* Footer */}
      <div className="mt-6 pt-5 border-t border-[#222] text-center space-y-2">
        <p className="text-zinc-500 text-xs">
          Powered by{" "}
          <a href="https://kreoon.com" className="text-[#f97316] font-semibold hover:underline">
            KREOON
          </a>
        </p>
        <p className="text-zinc-600 text-[10px] leading-relaxed px-4">
          Tus datos están protegidos según nuestra{" "}
          <a href="/privacidad" className="text-zinc-500 hover:text-[#f97316] underline">
            política de privacidad
          </a>
        </p>
        <p className="text-zinc-500 text-xs pt-2">
          ¿Ya tienes cuenta?{" "}
          <a href="https://kreoon.com/auth" className="text-[#f97316] font-semibold hover:underline">
            Inicia sesión
          </a>
        </p>
      </div>
    </div>
  );
}
