"use client";

import { useState } from "react";
import { useForm, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Briefcase, CheckCircle2, Loader2, User } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  brandSchema,
  creatorSchema,
  type BrandPayload,
  type CreatorPayload,
} from "@/lib/validations/registration";
import { registerUser } from "@/lib/api/registration";

type UserType = "creator" | "brand";
type Step = 1 | 2;

const inputClass = cn(
  "w-full bg-black/60 border border-brand-gold/30 rounded-lg px-4 py-3",
  "text-white placeholder:text-brand-gray/60 font-sans text-sm",
  "focus:outline-none focus:border-brand-yellow focus:ring-2 focus:ring-brand-yellow/30",
  "transition-colors"
);
const labelClass =
  "block text-[11px] font-sans font-semibold text-brand-gray mb-1.5 tracking-wider uppercase";
const errorClass = "mt-1 text-xs text-red-400";

export function RegistrationForm({ initialType }: { initialType?: UserType } = {}) {
  const [step, setStep] = useState<Step>(initialType ? 2 : 1);
  const [userType, setUserType] = useState<UserType | null>(initialType ?? null);
  const [serverError, setServerError] = useState("");
  const [success, setSuccess] = useState(false);

  const creatorForm = useForm<CreatorPayload>({
    resolver: zodResolver(creatorSchema) as Resolver<CreatorPayload>,
    defaultValues: { type: "creator" },
  });
  const brandForm = useForm<BrandPayload>({
    resolver: zodResolver(brandSchema) as Resolver<BrandPayload>,
    defaultValues: { type: "brand" },
  });

  const onSubmit = async (values: CreatorPayload | BrandPayload) => {
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
      <div className="w-full max-w-md mx-auto rounded-2xl p-8 text-center bg-brand-graphite/40 backdrop-blur-md border border-brand-gold/30 shadow-[0_0_60px_rgba(212,160,23,0.18)] animate-fade-in">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-brand-yellow/15 flex items-center justify-center">
          <CheckCircle2 className="w-9 h-9 text-brand-yellow" />
        </div>
        <h2 className="font-display text-2xl sm:text-3xl text-white tracking-wide uppercase mb-2">
          ¡Bienvenido a UGC Colombia!
        </h2>
        <p className="text-brand-gray font-sans text-sm mb-6">
          Revisa tu email para verificar tu cuenta y luego ingresa a la plataforma KREOON.
        </p>
        <a
          href="https://kreoon.com/auth"
          className="block w-full py-3 rounded-lg font-sans font-bold text-sm tracking-wide bg-brand-yellow text-black hover:bg-brand-gold transition-colors shadow-[0_0_20px_rgba(212,160,23,0.45)]"
        >
          Ingresar a KREOON →
        </a>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto rounded-2xl p-6 sm:p-8 bg-brand-graphite/40 backdrop-blur-md border border-brand-gold/20 shadow-[0_0_80px_rgba(212,160,23,0.10)] animate-slide-up">
      {/* Header */}
      <div className="text-center mb-5">
        <span className="inline-block px-3 py-1 rounded-full text-[10px] font-sans font-bold tracking-widest uppercase mb-3 bg-brand-yellow/15 text-brand-yellow border border-brand-yellow/40">
          Comunidad UGC
        </span>
        <div className="flex items-center justify-center gap-2 mb-3 text-xs font-sans font-bold tracking-widest uppercase">
          <span className="text-brand-yellow">UGC Colombia</span>
          <span className="text-brand-gray">×</span>
          <span className="text-white">KREOON</span>
        </div>
        <div className="text-[10px] text-brand-gray font-sans tracking-wider uppercase">
          Paso {step} de 2
        </div>
      </div>

      {/* PASO 1: Selector */}
      {step === 1 && (
        <div className="space-y-3">
          <h2 className="font-display text-xl text-white tracking-wide uppercase text-center">
            ¿Cómo quieres registrarte?
          </h2>
          <p className="text-brand-gray font-sans text-sm text-center mb-2">
            Selecciona tu tipo de cuenta
          </p>

          <button
            type="button"
            onClick={() => {
              setUserType("brand");
              setStep(2);
            }}
            className="w-full p-4 rounded-xl border border-brand-gold/25 hover:border-brand-yellow bg-black/60 text-left transition-all group flex items-center gap-4"
          >
            <div className="w-11 h-11 rounded-lg bg-brand-yellow/15 flex items-center justify-center group-hover:bg-brand-yellow/25 transition-colors">
              <Briefcase className="w-5 h-5 text-brand-yellow" />
            </div>
            <div className="flex-1">
              <p className="text-white font-sans font-semibold text-sm">Marca / Empresa</p>
              <p className="text-brand-gray font-sans text-xs">Busco creadores para mis campañas</p>
            </div>
            <span className="text-brand-yellow text-lg">→</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setUserType("creator");
              setStep(2);
            }}
            className="w-full p-4 rounded-xl border border-brand-gold/25 hover:border-brand-yellow bg-black/60 text-left transition-all group flex items-center gap-4"
          >
            <div className="w-11 h-11 rounded-lg bg-brand-yellow/15 flex items-center justify-center group-hover:bg-brand-yellow/25 transition-colors">
              <User className="w-5 h-5 text-brand-yellow" />
            </div>
            <div className="flex-1">
              <p className="text-white font-sans font-semibold text-sm">Freelancer / Talento</p>
              <p className="text-brand-gray font-sans text-xs">Creo contenido UGC para marcas</p>
            </div>
            <span className="text-brand-yellow text-lg">→</span>
          </button>
        </div>
      )}

      {/* PASO 2 */}
      {step === 2 && userType && (
        <>
          {!initialType && (
            <button
              type="button"
              onClick={() => setStep(1)}
              className="flex items-center gap-1 text-brand-gray hover:text-brand-yellow text-xs font-sans mb-4 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Cambiar tipo
            </button>
          )}

          <div className="mb-5">
            <h2 className="font-display text-xl text-white tracking-wide uppercase">
              Completa tu registro
            </h2>
            <p className="text-brand-gray font-sans text-sm">
              Ingresa tus datos para crear tu cuenta
            </p>
          </div>

          {userType === "creator" ? (
            <CreatorStep form={creatorForm} onSubmit={onSubmit} serverError={serverError} />
          ) : (
            <BrandStep form={brandForm} onSubmit={onSubmit} serverError={serverError} />
          )}
        </>
      )}

      {/* Footer */}
      <div className="mt-6 pt-5 border-t border-brand-gold/15 text-center">
        <p className="text-brand-gray text-xs">
          ¿Ya tienes cuenta?{" "}
          <a href="https://kreoon.com/auth" className="text-brand-yellow font-semibold hover:underline">
            Inicia sesión
          </a>
        </p>
        <p className="text-brand-gray/70 text-[10px] mt-2">
          Powered by{" "}
          <a href="https://kreoon.com" className="text-brand-yellow hover:underline">
            KREOON
          </a>
        </p>
      </div>
    </div>
  );
}

/* ---------- Sub-componentes ---------- */

type FormProps<T extends CreatorPayload | BrandPayload> = {
  form: ReturnType<typeof useForm<T>>;
  onSubmit: (values: T) => Promise<void>;
  serverError: string;
};

type PhoneRegisterProps = React.InputHTMLAttributes<HTMLInputElement> & { ref?: React.Ref<HTMLInputElement> };
function PhoneInput({ registerProps, error }: { registerProps: PhoneRegisterProps; error?: string }) {
  return (
    <div>
      <label className={labelClass}>Teléfono *</label>
      <div className="flex gap-2">
        <div className="flex items-center gap-1.5 px-3 bg-black/60 border border-brand-gold/30 rounded-lg text-sm text-white font-sans">
          <span>🇨🇴</span>
          <span>+57</span>
        </div>
        <input type="tel" {...registerProps} className={inputClass} placeholder="300 123 4567" />
      </div>
      {error && <p className={errorClass}>{error}</p>}
    </div>
  );
}

function LegalCheckbox<T extends CreatorPayload | BrandPayload>({ form }: { form: ReturnType<typeof useForm<T>> }) {
  const errors = form.formState.errors as Record<string, { message?: string } | undefined>;
  return (
    <div>
      <label className="flex items-start gap-3 cursor-pointer group">
        <input
          type="checkbox"
          {...form.register("legal_accepted" as never)}
          className="mt-0.5 w-4 h-4 accent-brand-yellow cursor-pointer flex-shrink-0"
        />
        <span className="text-xs text-brand-gray font-sans leading-relaxed group-hover:text-white">
          Soy mayor de 18 años y acepto los{" "}
          <a href="https://kreoon.com/terms" target="_blank" rel="noopener noreferrer" className="text-brand-yellow hover:underline">
            Términos
          </a>
          ,{" "}
          <a href="https://kreoon.com/privacy" target="_blank" rel="noopener noreferrer" className="text-brand-yellow hover:underline">
            Privacidad
          </a>{" "}
          y Ley 1581
        </span>
      </label>
      {errors.legal_accepted && (
        <p className={errorClass}>Debes aceptar los términos y condiciones</p>
      )}
    </div>
  );
}

function SubmitButton({ loading, label }: { loading: boolean; label: string }) {
  return (
    <button
      type="submit"
      disabled={loading}
      className="w-full py-3.5 rounded-lg font-sans font-bold text-sm tracking-wide bg-brand-yellow text-black hover:bg-brand-gold transition-colors shadow-[0_0_20px_rgba(212,160,23,0.4)] disabled:opacity-50 flex items-center justify-center gap-2"
    >
      {loading ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin" /> Creando cuenta...
        </>
      ) : (
        label
      )}
    </button>
  );
}

function CreatorStep({ form, onSubmit, serverError }: FormProps<CreatorPayload>) {
  const { register, handleSubmit, formState } = form;
  const errors = formState.errors;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      <div>
        <label className={labelClass}>Nombre completo *</label>
        <input type="text" {...register("full_name")} className={inputClass} placeholder="Tu nombre completo" />
        {errors.full_name && <p className={errorClass}>{errors.full_name.message}</p>}
      </div>

      <div>
        <label className={labelClass}>Email *</label>
        <input type="email" {...register("email")} className={inputClass} placeholder="tu@email.com" />
        {errors.email && <p className={errorClass}>{errors.email.message}</p>}
      </div>

      <PhoneInput registerProps={register("phone")} error={errors.phone?.message} />

      <div>
        <label className={labelClass}>Contraseña *</label>
        <input type="password" {...register("password")} className={inputClass} placeholder="Mínimo 8 caracteres" />
        {errors.password && <p className={errorClass}>{errors.password.message}</p>}
      </div>

      <div>
        <label className={labelClass}>Confirmar contraseña *</label>
        <input type="password" {...register("confirm_password")} className={inputClass} placeholder="Repite tu contraseña" />
        {errors.confirm_password && <p className={errorClass}>{errors.confirm_password.message}</p>}
      </div>

      <LegalCheckbox form={form} />

      {serverError && <p className="text-sm text-red-400 text-center">{serverError}</p>}

      <SubmitButton loading={formState.isSubmitting} label="Crear cuenta" />
    </form>
  );
}

function BrandStep({ form, onSubmit, serverError }: FormProps<BrandPayload>) {
  const { register, handleSubmit, formState } = form;
  const errors = formState.errors;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      <div>
        <label className={labelClass}>Nombre completo *</label>
        <input type="text" {...register("full_name")} className={inputClass} placeholder="Tu nombre completo" />
        {errors.full_name && <p className={errorClass}>{errors.full_name.message}</p>}
      </div>

      <div>
        <label className={labelClass}>Email *</label>
        <input type="email" {...register("email")} className={inputClass} placeholder="contacto@empresa.com" />
        {errors.email && <p className={errorClass}>{errors.email.message}</p>}
      </div>

      <div>
        <label className={labelClass}>Nombre de empresa *</label>
        <input type="text" {...register("company_name")} className={inputClass} placeholder="Nombre de tu empresa" />
        {errors.company_name && <p className={errorClass}>{errors.company_name.message}</p>}
      </div>

      <PhoneInput registerProps={register("phone")} error={errors.phone?.message} />

      <div>
        <label className={labelClass}>Contraseña *</label>
        <input type="password" {...register("password")} className={inputClass} placeholder="Mínimo 8 caracteres" />
        {errors.password && <p className={errorClass}>{errors.password.message}</p>}
      </div>

      <div>
        <label className={labelClass}>Confirmar contraseña *</label>
        <input type="password" {...register("confirm_password")} className={inputClass} placeholder="Repite tu contraseña" />
        {errors.confirm_password && <p className={errorClass}>{errors.confirm_password.message}</p>}
      </div>

      <LegalCheckbox form={form} />

      {serverError && <p className="text-sm text-red-400 text-center">{serverError}</p>}

      <SubmitButton loading={formState.isSubmitting} label="Crear cuenta" />
    </form>
  );
}
