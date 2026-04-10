"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { createClient } from "@supabase/supabase-js";

const loginSchema = z.object({
  email: z.string().email("Email invalido"),
  password: z.string().min(1, "Ingresa tu contrasena"),
});

type LoginPayload = z.infer<typeof loginSchema>;

const SUPABASE_URL = "https://wjkbqcrxwsmvtxmqgiqc.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indqa2JxY3J4d3NtdnR4bXFnaXFjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk0NDQwNTYsImV4cCI6MjA4NTAyMDA1Nn0.BorqcEBToDVeFBDQktZoCjCndYwB0bc6jlKmSJn-Wi8";

const inputClass = cn(
  "w-full bg-black/60 border border-brand-gold/30 rounded-lg px-4 py-3",
  "text-white placeholder:text-brand-gray/60 font-sans text-sm",
  "focus:outline-none focus:border-brand-yellow focus:ring-2 focus:ring-brand-yellow/30",
  "transition-colors"
);
const labelClass =
  "block text-[11px] font-sans font-semibold text-brand-gray mb-1.5 tracking-wider uppercase";
const errorClass = "mt-1 text-xs text-red-400";

export function LoginForm() {
  const [serverError, setServerError] = useState("");

  const { register, handleSubmit, formState } = useForm<LoginPayload>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (values: LoginPayload) => {
    setServerError("");
    try {
      const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
      const { error } = await supabase.auth.signInWithPassword({
        email: values.email.toLowerCase().trim(),
        password: values.password,
      });

      if (error) {
        if (error.message.includes("Invalid login")) {
          setServerError("Email o contrasena incorrectos");
        } else {
          setServerError(error.message);
        }
        return;
      }

      // Redirect to KREOON welcome page
      window.location.href = "https://kreoon.com/auth/callback?next=/welcome/ugc-colombia";
    } catch {
      setServerError("Error al iniciar sesion. Intenta de nuevo.");
    }
  };

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
          Iniciar sesion
        </h2>
        <p className="text-brand-gray font-sans text-sm text-center">
          Ingresa con tu cuenta de KREOON
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        <div>
          <label className={labelClass}>Email *</label>
          <input type="email" {...register("email")} className={inputClass} placeholder="tu@email.com" />
          {formState.errors.email && <p className={errorClass}>{formState.errors.email.message}</p>}
        </div>

        <div>
          <label className={labelClass}>Contrasena *</label>
          <input type="password" {...register("password")} className={inputClass} placeholder="Tu contrasena" />
          {formState.errors.password && <p className={errorClass}>{formState.errors.password.message}</p>}
        </div>

        {serverError && <p className="text-sm text-red-400 text-center">{serverError}</p>}

        <button
          type="submit"
          disabled={formState.isSubmitting}
          className="w-full py-3.5 rounded-lg font-sans font-bold text-sm tracking-wide bg-brand-yellow text-black hover:bg-brand-gold transition-colors shadow-[0_0_20px_rgba(212,160,23,0.4)] disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {formState.isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" /> Ingresando...
            </>
          ) : (
            "Ingresar a KREOON"
          )}
        </button>
      </form>

      <div className="mt-6 pt-5 border-t border-brand-gold/15 text-center">
        <p className="text-brand-gray text-xs">
          ¿No tienes cuenta?{" "}
          <a href="/registro" className="text-brand-yellow font-semibold hover:underline">
            Registrate gratis
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
