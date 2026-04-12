"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Calendar, CheckCircle2, MessageCircle, ArrowLeft } from "lucide-react";
import type { AuditData } from "../AuditModal";
import type { LeadScore } from "@/lib/lead-scoring";

const WHATSAPP_NUMBER = "573132947776";
const CALENDAR_BASE_URL =
  "https://calendar.google.com/calendar/appointments/schedules/AcZssZ3UuXHBul3xmIlzDPpFquDzWkCq0cwPfyr-PQAEwv3SlN9mI2zgbSEu1xj1nc3nSKE1YsMGvkAL";

interface Props {
  data: AuditData;
  score: LeadScore;
  onBack: () => void;
  onClose: () => void;
}

function getWhatsAppUrl(data: AuditData): string {
  const name = data.brand_info?.full_name || data.creator_info?.full_name || "";
  const company = data.brand_info?.company_name || "";
  const score = data.score?.total || 0;
  const type = data.lead_type === "marca" ? "marca" : "creador/a";

  const msg = encodeURIComponent(
    `Hola, soy ${name}${company ? ` de ${company}` : ""}. Acabo de completar el diagnóstico de UGC Colombia (score: ${score}/100) y me gustaría agendar una llamada como ${type}.`
  );

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`;
}

export function StepBooking({ data, score, onBack, onClose }: Props) {
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const isHot = score.temperature === "hot";

  // Build calendar URL with prefill params
  const calendarUrl = `${CALENDAR_BASE_URL}?gv=true`;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Header */}
      <div className="mb-4">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-brand-yellow/15 border border-brand-yellow/30 flex items-center justify-center">
            <Calendar className="w-5 h-5 text-brand-yellow" />
          </div>
          <div>
            <h3 className="font-display text-xl sm:text-2xl text-white uppercase tracking-tight">
              Agenda tu llamada
            </h3>
            <p className="text-xs text-brand-gray">
              {isHot
                ? "Tienes prioridad — elige el horario que prefieras"
                : "Selecciona un horario disponible"}
            </p>
          </div>
        </div>

        {/* Priority badge for hot leads */}
        {isHot && (
          <motion.div
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-orange-500/10 border border-orange-500/20 mb-4"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <CheckCircle2 className="w-4 h-4 text-orange-400 flex-shrink-0" />
            <p className="text-xs text-orange-300">
              <span className="font-semibold">Score {score.total}/100</span> — Tu marca califica para atención prioritaria. Agendaremos tu llamada esta semana.
            </p>
          </motion.div>
        )}
      </div>

      {/* Calendar iframe container */}
      <div className="relative rounded-2xl overflow-hidden border border-brand-gold/20 bg-white">
        {/* Loading state */}
        {!iframeLoaded && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black rounded-2xl">
            <div className="w-8 h-8 border-2 border-brand-yellow/30 border-t-brand-yellow rounded-full animate-spin mb-3" />
            <p className="text-sm text-brand-gray">Cargando calendario...</p>
          </div>
        )}

        {/* Branded top bar overlay */}
        <div className="relative z-[1] bg-gradient-to-r from-black via-black/95 to-black px-4 py-3 flex items-center justify-between border-b border-brand-gold/15">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-brand-yellow animate-pulse" />
            <span className="text-[11px] font-sans font-semibold text-brand-gray tracking-wider uppercase">
              Discovery Call — 30 min
            </span>
          </div>
          <span className="text-[10px] text-brand-gray/60">UGC Colombia</span>
        </div>

        {/* Iframe */}
        <iframe
          src={calendarUrl}
          title="Agendar llamada con UGC Colombia"
          className="w-full border-0"
          style={{ height: "520px", colorScheme: "light" }}
          onLoad={() => setIframeLoaded(true)}
          allow="clipboard-write"
        />

        {/* Branded bottom bar */}
        <div className="relative z-[1] bg-gradient-to-r from-black via-black/95 to-black px-4 py-2.5 border-t border-brand-gold/15">
          <p className="text-[10px] text-brand-gray/50 text-center">
            Al agendar, aceptas recibir un recordatorio por email y WhatsApp antes de la llamada.
          </p>
        </div>
      </div>

      {/* Footer actions */}
      <div className="flex items-center justify-between mt-5 gap-4">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-2 text-sm text-brand-gray hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Ver diagnóstico
        </button>

        <button
          type="button"
          onClick={() => window.open(getWhatsAppUrl(data), "_blank")}
          className="flex items-center gap-2 text-sm text-brand-gray hover:text-white transition-colors"
        >
          <MessageCircle className="w-4 h-4" />
          Prefiero WhatsApp
        </button>
      </div>

      <button
        type="button"
        onClick={onClose}
        className="w-full text-center text-xs text-brand-gray/40 hover:text-brand-gray transition-colors py-2 mt-3"
      >
        Cerrar
      </button>
    </motion.div>
  );
}
