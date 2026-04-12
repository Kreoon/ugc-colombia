"use client";

import { cn } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "motion/react";
import type { ReactNode } from "react";

// Shared styles matching RegistrationForm patterns
export const inputClass = cn(
  "w-full bg-black/60 border border-brand-gold/30 rounded-lg px-4 py-3",
  "text-white placeholder:text-brand-gray/50 font-sans text-sm",
  "focus:outline-none focus:ring-2 focus:ring-brand-gold/50 focus:border-brand-gold/60",
  "transition-all duration-200"
);

export const labelClass =
  "block text-[11px] font-sans font-semibold text-brand-gray mb-1.5 tracking-wider uppercase";

export const errorClass = "mt-1 text-xs text-red-400";

export const selectClass = cn(
  inputClass,
  "appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%23BDBCBC%22%20stroke-width%3D%222%22%3E%3Cpath%20d%3D%22m6%209%206%206%206-6%22/%3E%3C/svg%3E')] bg-[length:12px] bg-[right_12px_center] bg-no-repeat pr-8"
);

interface OptionCardProps {
  selected: boolean;
  onClick: () => void;
  label: string;
  sublabel?: string;
  icon?: ReactNode;
}

export function OptionCard({ selected, onClick, label, sublabel, icon }: OptionCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex items-center gap-3 w-full px-4 py-3 rounded-xl border text-left transition-all text-sm",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold",
        selected
          ? "border-brand-gold/60 bg-brand-yellow/10 text-white"
          : "border-white/10 bg-white/[0.02] text-brand-gray hover:border-white/20 hover:bg-white/[0.04]"
      )}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      <div className="flex-1 min-w-0">
        <span className={cn("font-sans font-medium", selected && "text-white")}>{label}</span>
        {sublabel && <p className="text-[11px] text-brand-gray mt-0.5">{sublabel}</p>}
      </div>
      <div
        className={cn(
          "w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-all",
          selected
            ? "border-brand-yellow bg-brand-yellow"
            : "border-white/20"
        )}
      >
        {selected && (
          <svg className="w-3 h-3 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        )}
      </div>
    </button>
  );
}

interface MultiSelectCardProps {
  selected: boolean;
  onClick: () => void;
  label: string;
}

export function MultiSelectCard({ selected, onClick, label }: MultiSelectCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "px-3 py-2 rounded-lg border text-xs font-sans font-medium transition-all",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold",
        selected
          ? "border-brand-gold/60 bg-brand-yellow/15 text-brand-yellow"
          : "border-white/10 bg-white/[0.02] text-brand-gray hover:border-white/20"
      )}
    >
      {label}
    </button>
  );
}

interface StepLayoutProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  onBack?: () => void;
  onSubmit?: () => void;
  submitLabel?: string;
  isSubmitting?: boolean;
  canSubmit?: boolean;
}

export function StepLayout({
  title,
  subtitle,
  children,
  onBack,
  onSubmit,
  submitLabel = "Continuar",
  isSubmitting = false,
  canSubmit = true,
}: StepLayoutProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="mb-6">
        <h3 className="font-display text-xl sm:text-2xl text-white uppercase tracking-tight">
          {title}
        </h3>
        {subtitle && <p className="text-sm text-brand-gray mt-1">{subtitle}</p>}
      </div>

      {children}

      <div className="flex items-center justify-between mt-8 gap-4">
        {onBack ? (
          <button
            type="button"
            onClick={onBack}
            className="flex items-center gap-2 text-sm text-brand-gray hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Atrás
          </button>
        ) : (
          <div />
        )}
        {onSubmit && (
          <Button
            type="button"
            onClick={onSubmit}
            disabled={!canSubmit || isSubmitting}
            size="lg"
          >
            {isSubmitting ? "Enviando..." : submitLabel}
          </Button>
        )}
      </div>
    </motion.div>
  );
}
