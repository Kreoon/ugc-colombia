"use client";

import { useState } from "react";
import { useForm, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
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

const inputClass = cn(
  "w-full bg-black/60 border border-brand-gold/30 rounded-lg px-4 py-3",
  "text-white placeholder:text-brand-gray/60 font-sans text-sm",
  "focus:outline-none focus:border-brand-yellow focus:ring-2 focus:ring-brand-yellow/30",
  "transition-colors"
);

const labelClass = "block text-xs font-sans font-medium text-brand-gray mb-1.5 tracking-wide uppercase";
const errorClass = "mt-1 text-xs text-red-400";

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
      await registerUser({ ...values, categories: categories as CreatorPayload["categories"] });
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
          "bg-brand-graphite/40 backdrop-blur-md border border-brand-gold/30",
          "shadow-[0_0_40px_rgba(212,160,23,0.15)] animate-fade-in"
        )}
      >
        <CheckCircle2 className="w-16 h-16 text-brand-yellow mx-auto mb-4" />
        <h2 className="font-display text-3xl text-white tracking-wide uppercase mb-3">
          ¡Registro Exitoso!
        </h2>
        <p className="text-brand-gray font-sans text-sm mb-6 leading-relaxed">
          Revisa tu email para verificar tu cuenta. Luego ingresa a la plataforma
          KREOON para completar tu perfil.
        </p>
        <Button asChild size="lg" className="w-full">
          <a href="https://kreoon.com/auth">Ir a KREOON →</a>
        </Button>
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
        "bg-brand-graphite/40 backdrop-blur-md border border-brand-gold/20",
        "shadow-[0_0_60px_rgba(212,160,23,0.1)] animate-slide-up"
      )}
    >
      {/* Header */}
      <div className="text-center mb-6">
        <div className="flex items-center justify-center gap-2 mb-3 text-xs font-sans font-semibold tracking-widest uppercase">
          <span className="text-brand-yellow">UGC Colombia</span>
          <span className="text-brand-gray">×</span>
          <span className="text-brand-gold">KREOON</span>
        </div>
        <h1 className="font-display text-3xl sm:text-4xl text-white tracking-wide uppercase">
          Únete a la Comunidad
        </h1>
        <p className="text-brand-gray font-sans text-sm mt-2">
          Creadores y marcas creando contenido que vende
        </p>
      </div>

      {/* Toggle */}
      <div className="grid grid-cols-2 gap-2 mb-6 p-1 bg-black/60 rounded-xl border border-brand-gold/20">
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
                ? "bg-brand-yellow text-black shadow-[0_0_16px_rgba(249,179,52,0.4)]"
                : "text-brand-gray hover:text-white"
            )}
          >
            {t === "creator" ? "Soy Creador" : "Soy Marca"}
          </button>
        ))}
      </div>

      {/* Creator form */}
      {isCreator ? (
        <form
          key="creator"
          onSubmit={creatorForm.handleSubmit(onCreatorSubmit)}
          className="space-y-4"
          noValidate
        >
          <div>
            <label className={labelClass}>Nombre completo *</label>
            <input
              type="text"
              {...creatorForm.register("full_name")}
              className={inputClass}
              placeholder="Juan Pérez"
            />
            {creatorForm.formState.errors.full_name && (
              <p className={errorClass}>{creatorForm.formState.errors.full_name.message}</p>
            )}
          </div>

          <div>
            <label className={labelClass}>Email *</label>
            <input
              type="email"
              {...creatorForm.register("email")}
              className={inputClass}
              placeholder="tu@email.com"
            />
            {creatorForm.formState.errors.email && (
              <p className={errorClass}>{creatorForm.formState.errors.email.message}</p>
            )}
          </div>

          <div>
            <label className={labelClass}>Contraseña *</label>
            <input
              type="password"
              {...creatorForm.register("password")}
              className={inputClass}
              placeholder="Mínimo 8 caracteres"
            />
            {creatorForm.formState.errors.password && (
              <p className={errorClass}>{creatorForm.formState.errors.password.message}</p>
            )}
          </div>

          <div>
            <label className={labelClass}>Teléfono (WhatsApp)</label>
            <input
              type="tel"
              {...creatorForm.register("phone")}
              className={inputClass}
              placeholder="+57 300 000 0000"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelClass}>Instagram</label>
              <input
                type="text"
                {...creatorForm.register("instagram")}
                className={inputClass}
                placeholder="@usuario"
              />
            </div>
            <div>
              <label className={labelClass}>TikTok</label>
              <input
                type="text"
                {...creatorForm.register("tiktok")}
                className={inputClass}
                placeholder="@usuario"
              />
            </div>
          </div>

          <div>
            <label className={labelClass}>Ciudad</label>
            <input
              type="text"
              {...creatorForm.register("city")}
              className={inputClass}
              placeholder="Bogotá"
            />
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
                      ? "bg-brand-gold text-black border border-brand-gold"
                      : "border border-brand-gold/40 text-brand-gray hover:text-white hover:border-brand-gold"
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {serverError && (
            <p className="text-sm text-red-400 text-center">{serverError}</p>
          )}

          <Button type="submit" size="lg" className="w-full" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" /> Registrando...
              </>
            ) : (
              "Crear cuenta de creador →"
            )}
          </Button>
        </form>
      ) : (
        <form
          key="brand"
          onSubmit={brandForm.handleSubmit(onBrandSubmit)}
          className="space-y-4"
          noValidate
        >
          <div>
            <label className={labelClass}>Nombre de la empresa *</label>
            <input
              type="text"
              {...brandForm.register("company_name")}
              className={inputClass}
              placeholder="Mi Marca S.A.S."
            />
            {brandForm.formState.errors.company_name && (
              <p className={errorClass}>{brandForm.formState.errors.company_name.message}</p>
            )}
          </div>

          <div>
            <label className={labelClass}>Nombre del contacto *</label>
            <input
              type="text"
              {...brandForm.register("contact_name")}
              className={inputClass}
              placeholder="María Gómez"
            />
            {brandForm.formState.errors.contact_name && (
              <p className={errorClass}>{brandForm.formState.errors.contact_name.message}</p>
            )}
          </div>

          <div>
            <label className={labelClass}>Email corporativo *</label>
            <input
              type="email"
              {...brandForm.register("email")}
              className={inputClass}
              placeholder="contacto@empresa.com"
            />
            {brandForm.formState.errors.email && (
              <p className={errorClass}>{brandForm.formState.errors.email.message}</p>
            )}
          </div>

          <div>
            <label className={labelClass}>Contraseña *</label>
            <input
              type="password"
              {...brandForm.register("password")}
              className={inputClass}
              placeholder="Mínimo 8 caracteres"
            />
            {brandForm.formState.errors.password && (
              <p className={errorClass}>{brandForm.formState.errors.password.message}</p>
            )}
          </div>

          <div>
            <label className={labelClass}>Teléfono</label>
            <input
              type="tel"
              {...brandForm.register("phone")}
              className={inputClass}
              placeholder="+57 300 000 0000"
            />
          </div>

          <div>
            <label className={labelClass}>Sitio web</label>
            <input
              type="url"
              {...brandForm.register("website")}
              className={inputClass}
              placeholder="https://miempresa.com"
            />
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
            <input
              type="text"
              {...brandForm.register("city")}
              className={inputClass}
              placeholder="Medellín"
            />
          </div>

          {serverError && (
            <p className="text-sm text-red-400 text-center">{serverError}</p>
          )}

          <Button type="submit" size="lg" className="w-full" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" /> Registrando...
              </>
            ) : (
              "Crear cuenta de marca →"
            )}
          </Button>
        </form>
      )}

      <p className="text-brand-gray/70 text-[11px] text-center mt-5 leading-relaxed">
        Al registrarte aceptas los{" "}
        <a href="/terminos" className="text-brand-yellow hover:underline">
          Términos
        </a>{" "}
        y la{" "}
        <a href="/privacidad" className="text-brand-yellow hover:underline">
          Política de Privacidad
        </a>
      </p>

      <div className="mt-5 pt-5 border-t border-brand-gold/15 text-center">
        <p className="text-brand-gray text-sm">
          ¿Ya tienes cuenta?{" "}
          <a
            href="https://kreoon.com/auth"
            className="text-brand-yellow font-semibold hover:underline"
          >
            Inicia sesión
          </a>
        </p>
      </div>
    </div>
  );
}
