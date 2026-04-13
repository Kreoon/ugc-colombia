"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import {
  Calendar,
  CheckCircle2,
  Clock,
  ChevronLeft,
  ChevronRight,
  MessageCircle,
  ArrowLeft,
  Video,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { AuditData } from "../AuditModal";
import type { LeadScore } from "@/lib/lead-scoring";

const WHATSAPP_NUMBER = "573132947776";
const DAY_NAMES = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
const MONTH_NAMES = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre",
];

interface Slot {
  start: string;
  end: string;
  host_key: string;
  host_name: string;
  time_label: string;
}

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
  const msg = encodeURIComponent(
    `Hola, soy ${name}${company ? ` de ${company}` : ""}. Acabo de completar el diagnóstico de UGC Colombia (score: ${score}/100) y me gustaría agendar una llamada.`
  );
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`;
}

export function StepBooking({ data, score, onBack, onClose }: Props) {
  const [slots, setSlots] = useState<Record<string, Slot[]>>({});
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);
  const [booking, setBooking] = useState(false);
  const [booked, setBooked] = useState<{
    host_name: string;
    meet_link?: string;
    start: string;
  } | null>(null);
  const [error, setError] = useState("");

  const isHot = score.temperature === "hot";
  const availableDates = Object.keys(slots).sort();

  // Load availability
  useEffect(() => {
    fetch("/api/availability")
      .then((r) => r.json())
      .then((d) => {
        setSlots(d.slots || {});
        const dates = Object.keys(d.slots || {}).sort();
        if (dates.length > 0) setSelectedDate(dates[0]);
      })
      .catch(() => setError("No se pudo cargar la disponibilidad"))
      .finally(() => setLoading(false));
  }, []);

  async function handleBook() {
    if (!selectedSlot || !data.contact) return;
    setBooking(true);
    setError("");

    try {
      const res = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          start: selectedSlot.start,
          end: selectedSlot.end,
          host_key: selectedSlot.host_key,
          name: data.brand_info?.full_name || data.creator_info?.full_name || "",
          email: data.contact.email,
          company: data.brand_info?.company_name,
          score: score.total,
          lead_id: data.lead_id,
        }),
      });

      const result = await res.json();

      if (!res.ok) throw new Error(result.error || "Error al agendar");

      // Redirect to thank you page with meeting details
      const params = new URLSearchParams({
        host: result.host_name || "",
        meet: result.meet_link || "",
        start: result.start || "",
      });
      onClose();
      window.location.href = `/gracias?${params.toString()}`;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al agendar");
    } finally {
      setBooking(false);
    }
  }

  // ─── Booked confirmation ─────────────────────────────────

  if (booked) {
    const date = new Date(booked.start);
    const cotDate = new Date(date.getTime() - 5 * 60 * 60 * 1000);
    const dayName = DAY_NAMES[cotDate.getUTCDay()];
    const monthName = MONTH_NAMES[cotDate.getUTCMonth()];
    const h = cotDate.getUTCHours();
    const m = cotDate.getUTCMinutes();
    const ampm = h >= 12 ? "PM" : "AM";
    const h12 = h > 12 ? h - 12 : h === 0 ? 12 : h;

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-4"
      >
        <div className="w-16 h-16 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-8 h-8 text-emerald-400" />
        </div>
        <h3 className="font-display text-2xl text-white uppercase tracking-tight mb-2">
          Llamada confirmada
        </h3>
        <p className="text-brand-gray text-sm mb-6">
          Te enviamos un email con los detalles y el link de la reunión.
        </p>

        <div className="inline-flex flex-col gap-2 p-5 rounded-2xl border border-brand-gold/20 bg-white/[0.03] text-left mb-6">
          <div className="flex items-center gap-3 text-sm">
            <Calendar className="w-4 h-4 text-brand-yellow flex-shrink-0" />
            <span className="text-white font-medium">
              {dayName} {cotDate.getUTCDate()} de {monthName} — {h12}:{m.toString().padStart(2, "0")} {ampm}
            </span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <Clock className="w-4 h-4 text-brand-yellow flex-shrink-0" />
            <span className="text-brand-gray">30 minutos · Hora Colombia</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <Video className="w-4 h-4 text-brand-yellow flex-shrink-0" />
            <span className="text-brand-gray">Con {booked.host_name} — UGC Colombia</span>
          </div>
        </div>

        {booked.meet_link && (
          <Button
            size="lg"
            className="w-full gap-2 mb-3"
            onClick={() => window.open(booked.meet_link, "_blank")}
          >
            <Video className="w-5 h-5" />
            Guardar link de Google Meet
          </Button>
        )}

        <button
          type="button"
          onClick={onClose}
          className="w-full text-center text-sm text-brand-gray hover:text-white transition-colors py-2"
        >
          Cerrar
        </button>
      </motion.div>
    );
  }

  // ─── Main booking UI ─────────────────────────────────────

  const currentDateSlots = selectedDate ? (slots[selectedDate] || []) : [];

  // Navigate dates
  const currentDateIdx = selectedDate ? availableDates.indexOf(selectedDate) : 0;
  const canPrev = currentDateIdx > 0;
  const canNext = currentDateIdx < availableDates.length - 1;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl bg-brand-yellow/15 border border-brand-yellow/30 flex items-center justify-center">
          <Calendar className="w-5 h-5 text-brand-yellow" />
        </div>
        <div>
          <h3 className="font-display text-xl sm:text-2xl text-white uppercase tracking-tight">
            Agenda tu llamada
          </h3>
          <p className="text-xs text-brand-gray">
            {isHot ? "Tienes prioridad — elige el horario que prefieras" : "Selecciona un horario disponible"}
          </p>
        </div>
      </div>

      {isHot && (
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-orange-500/10 border border-orange-500/20 mb-4">
          <CheckCircle2 className="w-4 h-4 text-orange-400 flex-shrink-0" />
          <p className="text-xs text-orange-300">
            <span className="font-semibold">Score {score.total}/100</span> — Atención prioritaria
          </p>
        </div>
      )}

      {loading ? (
        <div className="flex flex-col items-center justify-center py-16">
          <Loader2 className="w-8 h-8 text-brand-yellow animate-spin mb-3" />
          <p className="text-sm text-brand-gray">Cargando disponibilidad...</p>
        </div>
      ) : availableDates.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-brand-gray mb-4">No hay horarios disponibles en este momento.</p>
          <Button
            variant="outline"
            onClick={() => window.open(getWhatsAppUrl(data), "_blank")}
            className="gap-2"
          >
            <MessageCircle className="w-4 h-4" />
            Escríbenos por WhatsApp
          </Button>
        </div>
      ) : (
        <>
          {/* Date selector */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-3">
              <button
                type="button"
                onClick={() => canPrev && setSelectedDate(availableDates[currentDateIdx - 1])}
                disabled={!canPrev}
                className="p-1.5 rounded-lg text-brand-gray hover:text-white hover:bg-white/10 transition-colors disabled:opacity-30"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <span className="text-sm font-semibold text-white">
                {selectedDate && (() => {
                  const d = new Date(selectedDate + "T12:00:00");
                  return `${DAY_NAMES[d.getDay()]} ${d.getDate()} de ${MONTH_NAMES[d.getMonth()]}`;
                })()}
              </span>

              <button
                type="button"
                onClick={() => canNext && setSelectedDate(availableDates[currentDateIdx + 1])}
                disabled={!canNext}
                className="p-1.5 rounded-lg text-brand-gray hover:text-white hover:bg-white/10 transition-colors disabled:opacity-30"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Date chips */}
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {availableDates.slice(0, 10).map((date) => {
                const d = new Date(date + "T12:00:00");
                const isSelected = date === selectedDate;
                return (
                  <button
                    key={date}
                    type="button"
                    onClick={() => { setSelectedDate(date); setSelectedSlot(null); }}
                    className={cn(
                      "flex flex-col items-center min-w-[52px] px-3 py-2 rounded-xl border text-xs transition-all flex-shrink-0",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold",
                      isSelected
                        ? "border-brand-gold/60 bg-brand-yellow/15 text-white"
                        : "border-white/10 bg-white/[0.02] text-brand-gray hover:border-white/20"
                    )}
                  >
                    <span className="font-semibold">{DAY_NAMES[d.getDay()]}</span>
                    <span className={cn("text-lg font-bold", isSelected && "text-brand-yellow")}>{d.getDate()}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Time slots */}
          <div className="mb-4">
            <p className="text-[11px] font-semibold text-brand-gray uppercase tracking-wider mb-2">
              Horarios disponibles · {currentDateSlots.length} slots
            </p>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 max-h-[220px] overflow-y-auto pr-1">
              {currentDateSlots.map((slot) => {
                const isSelected = selectedSlot?.start === slot.start;
                return (
                  <button
                    key={slot.start}
                    type="button"
                    onClick={() => setSelectedSlot(slot)}
                    className={cn(
                      "px-3 py-2.5 rounded-xl border text-sm font-medium transition-all",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold",
                      isSelected
                        ? "border-brand-gold/60 bg-brand-yellow/15 text-brand-yellow"
                        : "border-white/10 bg-white/[0.02] text-brand-gray hover:border-white/20 hover:text-white"
                    )}
                  >
                    {slot.time_label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Confirm button */}
          {selectedSlot && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4"
            >
              <Button
                size="lg"
                className="w-full gap-2"
                onClick={handleBook}
                disabled={booking}
              >
                {booking ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Agendando...
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-5 h-5" />
                    Confirmar {selectedSlot.time_label}
                  </>
                )}
              </Button>
              <p className="text-center text-[11px] text-brand-gray/60 mt-2">
                30 min · Google Meet · Hora Colombia
              </p>
            </motion.div>
          )}

          {error && (
            <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-sm text-red-400 mb-4">
              {error}
            </div>
          )}
        </>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between mt-2 gap-4">
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
          WhatsApp
        </button>
      </div>
    </motion.div>
  );
}
