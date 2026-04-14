"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import confetti from "canvas-confetti";
import { motion } from "motion/react";
import { ArrowRight, Loader2 } from "lucide-react";
import { trackWaitlistSubmit } from "@/lib/tracking/events";

const waitlistSchema = z.object({
  email: z
    .string()
    .min(1, "El correo es requerido.")
    .email("Ingresa un correo válido."),
});

type WaitlistFormValues = z.infer<typeof waitlistSchema>;

function fireConfetti() {
  const count = 160;
  const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 };

  const fire = (particleRatio: number, opts: confetti.Options) => {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio),
      colors: ["#F9B334", "#D4A017", "#C9940A", "#ffffff"],
    });
  };

  fire(0.25, { spread: 26, startVelocity: 55, origin: { x: 0.5, y: 0.6 } });
  fire(0.2, { spread: 60, origin: { x: 0.5, y: 0.6 } });
  fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8, origin: { x: 0.5, y: 0.6 } });
  fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2, origin: { x: 0.5, y: 0.6 } });
  fire(0.1, { spread: 120, startVelocity: 45, origin: { x: 0.5, y: 0.6 } });
}

export function WaitlistForm() {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<WaitlistFormValues>({
    resolver: zodResolver(waitlistSchema),
  });

  const onSubmit = async (data: WaitlistFormValues) => {
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: data.email }),
      });

      if (!res.ok) {
        const body = (await res.json()) as { message?: string };
        throw new Error(body.message ?? "Error al registrarse.");
      }

      trackWaitlistSubmit();
      setSubmitted(true);
      fireConfetti();
      toast.success("Ya estás dentro. Te avisamos cuando lancemos.", {
        duration: 6000,
      });
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Algo salió mal. Intenta de nuevo.";
      toast.error(message);
    }
  };

  if (submitted) {
    return (
      <motion.div
        className="flex flex-col items-center gap-3 text-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        role="status"
        aria-live="polite"
      >
        <span className="text-4xl" aria-hidden="true">
          🎉
        </span>
        <p className="font-display text-2xl text-brand-gold uppercase tracking-wide">
          ¡Estás dentro!
        </p>
        <p className="text-brand-gray text-sm">
          Te avisamos cuando lancemos. Mientras tanto, síguenos en redes.
        </p>
      </motion.div>
    );
  }

  return (
    <motion.section
      aria-labelledby="waitlist-heading"
      className="w-full max-w-md mx-auto flex flex-col gap-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.4, duration: 0.6 }}
    >
      <h2
        id="waitlist-heading"
        className="text-center font-display text-xl sm:text-2xl uppercase tracking-widest text-white"
      >
        Sé el primero en saber
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="flex flex-col sm:flex-row gap-3"
        aria-label="Formulario de lista de espera"
      >
        <div className="flex-1 flex flex-col gap-1">
          <label htmlFor="waitlist-email" className="sr-only">
            Correo electrónico
          </label>
          <input
            id="waitlist-email"
            type="email"
            autoComplete="email"
            placeholder="tu@email.com"
            aria-describedby={errors.email ? "waitlist-email-error" : undefined}
            aria-invalid={!!errors.email}
            className={[
              "w-full bg-brand-graphite/50 border rounded-lg px-4 py-3 text-white placeholder:text-brand-gray/60",
              "font-sans text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold",
              "transition-all duration-200",
              errors.email
                ? "border-red-500"
                : "border-brand-graphite hover:border-brand-gold/60 focus:border-brand-gold",
              "animate-glow-pulse",
            ]
              .filter(Boolean)
              .join(" ")}
            {...register("email")}
          />
          {errors.email && (
            <p
              id="waitlist-email-error"
              className="text-red-400 text-xs mt-1"
              role="alert"
            >
              {errors.email.message}
            </p>
          )}
        </div>

        <motion.button
          type="submit"
          disabled={isSubmitting}
          className="flex-shrink-0 flex items-center justify-center gap-2 bg-brand-yellow hover:bg-brand-gold text-black font-sans font-semibold text-sm px-6 py-3 rounded-lg transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed whitespace-nowrap"
          whileHover={{ scale: isSubmitting ? 1 : 1.04 }}
          whileTap={{ scale: isSubmitting ? 1 : 0.97 }}
        >
          {isSubmitting ? (
            <Loader2 size={16} className="animate-spin" aria-hidden="true" />
          ) : (
            <>
              Unirme a la lista
              <ArrowRight size={16} aria-hidden="true" />
            </>
          )}
        </motion.button>
      </form>

      <p className="text-center text-brand-gray/50 text-xs">
        Sin spam. Solo el anuncio del lanzamiento.
      </p>
    </motion.section>
  );
}
