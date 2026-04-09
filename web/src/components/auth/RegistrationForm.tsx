"use client";

import { useState } from "react";
import { useForm, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Briefcase, CheckCircle2, Gift, Loader2, Sparkles, User } from "lucide-react";
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

const BENEFITS = ["1 mes gratis de suscripción", "800 tokens AI de bienvenida"];

const LEGAL_ITEMS = [
  { name: "legal_age" as const, label: "Declaro bajo juramento que soy mayor de 18 años" },
  {
    name: "legal_terms" as const,
    label: (
      <>
        Acepto los{" "}
        <a href="https://kreoon.com/terms" target="_blank" rel="noopener noreferrer" className="text-[#f97316] hover:underline">
          Términos y Condiciones
        </a>
      </>
    ),
  },
  {
    name: "legal_privacy" as const,
    label: (
      <>
        Acepto la{" "}
        <a href="https://kreoon.com/privacy" target="_blank" rel="noopener noreferrer" className="text-[#f97316] hover:underline">
          Política de Privacidad
        </a>
      </>
    ),
  },
  {
    name: "legal_data" as const,
    label: "Acepto el Tratamiento de Datos (Ley 1581)",
  },
];

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
      <div className="w-full max-w-md mx-auto rounded-2xl p-8 text-center bg-[#111] border border-[#222] shadow-[0_0_60px_rgba(249,115,22,0.15)] animate-fade-in">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#f97316]/15 flex items-center justify-center">
          <CheckCircle2 className="w-9 h-9 text-[#f97316]" />
        </div>
        <h2 className="font-display text-2xl sm:text-3xl text-white tracking-wide uppercase mb-2">
          ¡Bienvenido a UGC Colombia!
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
            <li>✓ 800 tokens AI de bienvenida</li>
          </ul>
        </div>
        <a
          href="https://kreoon.com/auth"
          className="block w-full py-3 rounded-lg font-sans font-bold text-sm tracking-wide bg-[#f97316] text-white hover:bg-[#ea6a10] transition-colors shadow-[0_0_20px_rgba(249,115,22,0.4)]"
        >
          Ingresar a KREOON →
        </a>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto rounded-2xl p-6 sm:p-8 bg-[#111] border border-[#222] shadow-[0_0_80px_rgba(249,115,22,0.08)] animate-slide-up">
      {/* Header */}
      <div className="text-center mb-5">
        <span
          className="inline-block px-3 py-1 rounded-full text-[10px] font-sans font-bold tracking-widest uppercase mb-3"
          style={{ backgroundColor: `${ACCENT}1f`, color: ACCENT, border: `1px solid ${ACCENT}66` }}
        >
          Comunidad UGC
        </span>
        <div className="flex items-center justify-center gap-2 mb-3 text-xs font-sans font-bold tracking-widest uppercase">
          <span style={{ color: ACCENT }}>UGC Colombia</span>
          <span className="text-zinc-600">×</span>
          <span className="text-white">KREOON</span>
        </div>
        <div className="flex items-center justify-center gap-2 text-[10px] text-zinc-500 font-sans tracking-wider uppercase">
          Paso {step} de 2
        </div>
      </div>

      {/* Beneficios compactos */}
      <div className="bg-[#0a0a0a] border border-[#f97316]/25 rounded-xl p-3 mb-5">
        <p className="flex items-center gap-2 text-[#f97316] font-sans font-bold text-[10px] uppercase tracking-wider mb-2">
          <Gift className="w-3.5 h-3.5" /> Beneficios al registrarte
        </p>
        <ul className="grid grid-cols-1 gap-1">
          {BENEFITS.map((b) => (
            <li key={b} className="flex items-center gap-2 text-xs text-zinc-300 font-sans">
              <span className="text-[#f97316]">✓</span>
              <span>{b}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* PASO 1: Selector de tipo */}
      {step === 1 && (
        <div className="space-y-3">
          <h2 className="font-display text-xl text-white tracking-wide uppercase text-center">
            ¿Cómo quieres registrarte?
          </h2>
          <p className="text-zinc-400 font-sans text-sm text-center mb-2">
            Selecciona tu tipo de cuenta
          </p>

          <button
            type="button"
            onClick={() => {
              setUserType("brand");
              setStep(2);
            }}
            className="w-full p-4 rounded-xl border border-[#222] hover:border-[#f97316] bg-[#0a0a0a] text-left transition-all group flex items-center gap-4"
          >
            <div className="w-11 h-11 rounded-lg bg-[#f97316]/15 flex items-center justify-center group-hover:bg-[#f97316]/25 transition-colors">
              <Briefcase className="w-5 h-5 text-[#f97316]" />
            </div>
            <div className="flex-1">
              <p className="text-white font-sans font-semibold text-sm">Marca / Empresa</p>
              <p className="text-zinc-500 font-sans text-xs">Busco creadores para mis campañas</p>
            </div>
            <span className="text-[#f97316] text-lg">→</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setUserType("creator");
              setStep(2);
            }}
            className="w-full p-4 rounded-xl border border-[#222] hover:border-[#f97316] bg-[#0a0a0a] text-left transition-all group flex items-center gap-4"
          >
            <div className="w-11 h-11 rounded-lg bg-[#f97316]/15 flex items-center justify-center group-hover:bg-[#f97316]/25 transition-colors">
              <User className="w-5 h-5 text-[#f97316]" />
            </div>
            <div className="flex-1">
              <p className="text-white font-sans font-semibold text-sm">Freelancer / Creador</p>
              <p className="text-zinc-500 font-sans text-xs">Creo contenido UGC para marcas</p>
            </div>
            <span className="text-[#f97316] text-lg">→</span>
          </button>
        </div>
      )}

      {/* PASO 2: Datos */}
      {step === 2 && userType && (
        <>
          {!initialType && (
            <button
              type="button"
              onClick={() => setStep(1)}
              className="flex items-center gap-1 text-zinc-500 hover:text-[#f97316] text-xs font-sans mb-4 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Cambiar tipo
            </button>
          )}

          <div className="mb-5">
            <h2 className="font-display text-xl text-white tracking-wide uppercase">
              Completa tu registro
            </h2>
            <p className="text-zinc-400 font-sans text-sm">
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
      <div className="mt-6 pt-5 border-t border-[#222] text-center">
        <p className="text-zinc-500 text-xs">
          ¿Ya tienes cuenta?{" "}
          <a href="https://kreoon.com/auth" className="text-[#f97316] font-semibold hover:underline">
            Inicia sesión
          </a>
        </p>
        <p className="text-zinc-600 text-[10px] mt-2">
          Powered by{" "}
          <a href="https://kreoon.com" className="text-[#f97316] hover:underline">
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
        <div className="flex items-center gap-1.5 px-3 bg-[#0a0a0a] border border-[#222] rounded-lg text-sm text-zinc-300 font-sans">
          <span>🇨🇴</span>
          <span>+57</span>
        </div>
        <input type="tel" {...registerProps} className={inputClass} placeholder="300 123 4567" />
      </div>
      {error && <p className={errorClass}>{error}</p>}
    </div>
  );
}

function LegalCheckboxes<T extends CreatorPayload | BrandPayload>({ form }: { form: ReturnType<typeof useForm<T>> }) {
  const errors = form.formState.errors as Record<string, { message?: string } | undefined>;
  const hasError =
    errors.legal_age || errors.legal_terms || errors.legal_privacy || errors.legal_data;

  return (
    <div className="space-y-2.5 pt-1">
      <p className={labelClass}>Aceptaciones legales *</p>
      {LEGAL_ITEMS.map((item) => (
        <label key={item.name} className="flex items-start gap-3 cursor-pointer group">
          <input
            type="checkbox"
            {...form.register(item.name as never)}
            className="mt-0.5 w-4 h-4 accent-[#f97316] cursor-pointer flex-shrink-0"
          />
          <span className="text-xs text-zinc-400 font-sans leading-relaxed group-hover:text-zinc-300">
            {item.label}
          </span>
        </label>
      ))}
      {hasError && (
        <p className={errorClass}>Debes aceptar todos los puntos legales</p>
      )}
    </div>
  );
}

function CreatorStep({ form, onSubmit, serverError }: FormProps<CreatorPayload>) {
  const { register, handleSubmit, formState } = form;
  const errors = formState.errors;
  const loading = formState.isSubmitting;

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

      <LegalCheckboxes form={form} />

      {serverError && <p className="text-sm text-red-400 text-center">{serverError}</p>}

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3.5 rounded-lg font-sans font-bold text-sm tracking-wide bg-[#f97316] text-white hover:bg-[#ea6a10] transition-colors shadow-[0_0_20px_rgba(249,115,22,0.35)] disabled:opacity-50 flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" /> Creando cuenta...
          </>
        ) : (
          "Crear cuenta"
        )}
      </button>
    </form>
  );
}

function BrandStep({ form, onSubmit, serverError }: FormProps<BrandPayload>) {
  const { register, handleSubmit, formState } = form;
  const errors = formState.errors;
  const loading = formState.isSubmitting;

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

      <LegalCheckboxes form={form} />

      {serverError && <p className="text-sm text-red-400 text-center">{serverError}</p>}

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3.5 rounded-lg font-sans font-bold text-sm tracking-wide bg-[#f97316] text-white hover:bg-[#ea6a10] transition-colors shadow-[0_0_20px_rgba(249,115,22,0.35)] disabled:opacity-50 flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" /> Creando cuenta...
          </>
        ) : (
          "Crear cuenta"
        )}
      </button>
    </form>
  );
}
