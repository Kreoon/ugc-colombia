"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  registrationSchema,
  type RegistrationPayload,
} from "@/lib/validations/registration";
import { registerUser } from "@/lib/api/registration";

const inputClass = cn(
  "w-full bg-black/60 border border-brand-gold/30 rounded-lg px-4 py-3",
  "text-white placeholder:text-brand-gray/60 font-sans text-sm",
  "focus:outline-none focus:border-brand-yellow focus:ring-2 focus:ring-brand-yellow/30",
  "transition-colors"
);
const labelClass =
  "block text-[11px] font-sans font-semibold text-brand-gray mb-1.5 tracking-wider uppercase";
const errorClass = "mt-1 text-xs text-red-400";

export function RegistrationForm() {
  const [serverError, setServerError] = useState("");
  const [success, setSuccess] = useState(false);

  const { register, handleSubmit, formState } = useForm<RegistrationPayload>({
    resolver: zodResolver(registrationSchema),
  });

  const onSubmit = async (values: RegistrationPayload) => {
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
          <span className="text-brand-gray">&times;</span>
          <span className="text-white">KREOON</span>
        </div>
      </div>

      <div className="mb-5">
        <h2 className="font-display text-xl text-white tracking-wide uppercase text-center">
          Crea tu cuenta gratis
        </h2>
        <p className="text-brand-gray font-sans text-sm text-center">
          Ingresa tus datos para unirte a la comunidad
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        <div>
          <label className={labelClass}>Nombre completo *</label>
          <input type="text" {...register("full_name")} className={inputClass} placeholder="Tu nombre completo" />
          {formState.errors.full_name && <p className={errorClass}>{formState.errors.full_name.message}</p>}
        </div>

        <div>
          <label className={labelClass}>Email *</label>
          <input type="email" {...register("email")} className={inputClass} placeholder="tu@email.com" />
          {formState.errors.email && <p className={errorClass}>{formState.errors.email.message}</p>}
        </div>

        <div>
          <label className={labelClass}>Telefono *</label>
          <div className="flex gap-2">
            <div className="flex items-center gap-1.5 px-3 bg-black/60 border border-brand-gold/30 rounded-lg text-sm text-white font-sans">
              <span>+57</span>
            </div>
            <input type="tel" {...register("phone")} className={inputClass} placeholder="300 123 4567" />
          </div>
          {formState.errors.phone && <p className={errorClass}>{formState.errors.phone.message}</p>}
        </div>

        <div>
          <label className={labelClass}>Contrasena *</label>
          <input type="password" {...register("password")} className={inputClass} placeholder="Minimo 8 caracteres" />
          {formState.errors.password && <p className={errorClass}>{formState.errors.password.message}</p>}
        </div>

        <div>
          <label className={labelClass}>Confirmar contrasena *</label>
          <input type="password" {...register("confirm_password")} className={inputClass} placeholder="Repite tu contrasena" />
          {formState.errors.confirm_password && <p className={errorClass}>{formState.errors.confirm_password.message}</p>}
        </div>

        <div>
          <label className="flex items-start gap-3 cursor-pointer group">
            <input
              type="checkbox"
              {...register("legal_accepted")}
              className="mt-0.5 w-4 h-4 accent-brand-yellow cursor-pointer flex-shrink-0"
            />
            <span className="text-xs text-brand-gray font-sans leading-relaxed group-hover:text-white">
              Soy mayor de 18 anos y acepto los{" "}
              <a href="https://kreoon.com/terms" target="_blank" rel="noopener noreferrer" className="text-brand-yellow hover:underline">
                Terminos
              </a>
              ,{" "}
              <a href="https://kreoon.com/privacy" target="_blank" rel="noopener noreferrer" className="text-brand-yellow hover:underline">
                Privacidad
              </a>{" "}
              y Ley 1581
            </span>
          </label>
          {formState.errors.legal_accepted && (
            <p className={errorClass}>Debes aceptar los terminos y condiciones</p>
          )}
        </div>

        {serverError && <p className="text-sm text-red-400 text-center">{serverError}</p>}

        <button
          type="submit"
          disabled={formState.isSubmitting}
          className="w-full py-3.5 rounded-lg font-sans font-bold text-sm tracking-wide bg-brand-yellow text-black hover:bg-brand-gold transition-colors shadow-[0_0_20px_rgba(212,160,23,0.4)] disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {formState.isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" /> Creando cuenta...
            </>
          ) : (
            "Crear cuenta gratis"
          )}
        </button>
      </form>

      {/* Footer */}
      <div className="mt-6 pt-5 border-t border-brand-gold/15 text-center">
        <p className="text-brand-gray text-xs">
          ¿Ya tienes cuenta?{" "}
          <a href="/login" className="text-brand-yellow font-semibold hover:underline">
            Inicia sesion
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
