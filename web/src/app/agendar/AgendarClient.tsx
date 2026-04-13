"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "motion/react";
import {
  Calendar,
  CheckCircle2,
  Clock,
  ChevronLeft,
  ChevronRight,
  Video,
  Loader2,
  ArrowRight,
  MessageCircle,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Navbar } from "@/components/home/Navbar";
import { Footer } from "@/components/home/Footer";

const WHATSAPP_NUMBER = "573132947776";
const COMMUNITY_URL = "https://chat.whatsapp.com/F5QDgl4imsjBjW1KL2DhRE";
const DAY_NAMES = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
const DAY_FULL = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
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

export function AgendarClient() {
  const params = useSearchParams();
  const leadName = params.get("name") || "";
  const leadEmail = params.get("email") || "";
  const leadCompany = params.get("company") || "";
  const leadId = params.get("lead_id") || "";
  const leadScore = params.get("score") || "";

  const [slots, setSlots] = useState<Record<string, Slot[]>>({});
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);
  const [booking, setBooking] = useState(false);
  const [error, setError] = useState("");

  // Form for email/name if not in params
  const [name, setName] = useState(leadName);
  const [email, setEmail] = useState(leadEmail);

  const [booked, setBooked] = useState<{
    host_name: string;
    meet_link?: string;
    start: string;
  } | null>(null);

  const availableDates = Object.keys(slots).sort();

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
    if (!selectedSlot) return;
    if (!name.trim() || !email.trim()) {
      setError("Ingresa tu nombre y email para confirmar.");
      return;
    }
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
          name: name.trim(),
          email: email.trim(),
          company: leadCompany || undefined,
          score: leadScore ? Number(leadScore) : undefined,
          lead_id: leadId || undefined,
        }),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Error al agendar");

      setBooked({
        host_name: result.host_name,
        meet_link: result.meet_link,
        start: result.start,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al agendar");
    } finally {
      setBooking(false);
    }
  }

  const currentDateSlots = selectedDate ? (slots[selectedDate] || []) : [];
  const currentDateIdx = selectedDate ? availableDates.indexOf(selectedDate) : 0;

  // ─── Confirmación ────────────────────────────────────

  if (booked) {
    const date = new Date(booked.start);
    const cotDate = new Date(date.getTime() - 5 * 60 * 60 * 1000);
    const h = cotDate.getUTCHours();
    const m = cotDate.getUTCMinutes();
    const ampm = h >= 12 ? "PM" : "AM";
    const h12 = h > 12 ? h - 12 : h === 0 ? 12 : h;

    return (
      <>
        <Navbar />
        <main className="relative bg-brand-black text-white min-h-screen pt-28 pb-20 px-4">
          <motion.div
            className="max-w-lg mx-auto text-center"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="w-20 h-20 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-10 h-10 text-emerald-400" />
            </div>
            <h1 className="font-sans text-3xl font-bold text-white mb-2">Llamada confirmada</h1>
            <p className="text-brand-gray mb-8">Revisa tu email — te enviamos los detalles y el link de la reunión.</p>

            <div className="inline-flex flex-col gap-3 p-6 rounded-2xl border border-brand-gold/20 bg-white/[0.03] text-left mb-8">
              <div className="flex items-center gap-3 text-sm">
                <Calendar className="w-5 h-5 text-brand-yellow flex-shrink-0" />
                <span className="text-white font-medium">
                  {DAY_FULL[cotDate.getUTCDay()]} {cotDate.getUTCDate()} de {MONTH_NAMES[cotDate.getUTCMonth()]}
                </span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Clock className="w-5 h-5 text-brand-yellow flex-shrink-0" />
                <span className="text-white font-medium">{h12}:{m.toString().padStart(2, "0")} {ampm} — Hora Colombia</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Video className="w-5 h-5 text-brand-yellow flex-shrink-0" />
                <span className="text-brand-gray">30 min · Google Meet · Con {booked.host_name}</span>
              </div>
            </div>

            {booked.meet_link && (
              <Button size="lg" className="w-full gap-2 mb-4" onClick={() => window.open(booked.meet_link, "_blank")}>
                <Video className="w-5 h-5" />
                Guardar link de Google Meet
              </Button>
            )}

            <a
              href={COMMUNITY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-emerald-500/10 border border-emerald-500/25 text-sm font-semibold text-emerald-400 hover:bg-emerald-500/20 transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              Unirme a la comunidad de WhatsApp
            </a>
          </motion.div>
        </main>
        <Footer />
      </>
    );
  }

  // ─── Selector de horarios ────────────────────────────

  return (
    <>
      <Navbar />
      <main className="relative bg-brand-black text-white min-h-screen pt-28 pb-20 px-4">
        <div
          aria-hidden
          className="absolute inset-0"
          style={{ background: "radial-gradient(ellipse 60% 30% at 50% 15%, rgba(212,160,23,0.08), transparent 60%)" }}
        />
        <div className="relative max-w-2xl mx-auto">
          {/* Header */}
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-yellow/10 border border-brand-yellow/30 text-[10px] font-semibold text-brand-yellow tracking-[0.2em] uppercase mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-yellow animate-pulse" />
              100% gratis · 30 minutos
            </span>
            <h1 className="font-sans text-2xl sm:text-3xl font-bold text-white mb-2">
              Agenda tu llamada estratégica
            </h1>
            <p className="text-sm text-brand-gray max-w-md mx-auto">
              Un especialista de UGC Colombia revisará tu marca contigo y te dará un plan de acción concreto.
            </p>
          </motion.div>

          {/* Contact fields if not from email */}
          {(!leadName || !leadEmail) && (
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <div>
                <label className="block text-[11px] font-semibold text-brand-gray mb-1.5 tracking-wider uppercase">Tu nombre</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Juan Pérez"
                  className="w-full bg-black/60 border border-brand-gold/30 rounded-xl px-4 py-3 text-white placeholder:text-brand-gray/50 text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold/50"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-brand-gray mb-1.5 tracking-wider uppercase">Tu email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@email.com"
                  className="w-full bg-black/60 border border-brand-gold/30 rounded-xl px-4 py-3 text-white placeholder:text-brand-gray/50 text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold/50"
                />
              </div>
            </motion.div>
          )}

          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2 className="w-8 h-8 text-brand-yellow animate-spin mb-3" />
              <p className="text-sm text-brand-gray">Cargando disponibilidad...</p>
            </div>
          ) : availableDates.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-brand-gray mb-4">No hay horarios disponibles en este momento.</p>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hola, quiero agendar una llamada con UGC Colombia.")}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline" className="gap-2">
                  <MessageCircle className="w-4 h-4" />
                  Escríbenos por WhatsApp
                </Button>
              </a>
            </div>
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
              {/* Date navigation */}
              <div className="mb-5">
                <div className="flex items-center justify-between mb-3">
                  <button
                    type="button"
                    onClick={() => currentDateIdx > 0 && setSelectedDate(availableDates[currentDateIdx - 1])}
                    disabled={currentDateIdx === 0}
                    className="p-2 rounded-lg text-brand-gray hover:text-white hover:bg-white/10 transition-colors disabled:opacity-30"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <span className="text-sm font-semibold text-white">
                    {selectedDate && (() => {
                      const d = new Date(selectedDate + "T12:00:00");
                      return `${DAY_FULL[d.getDay()]} ${d.getDate()} de ${MONTH_NAMES[d.getMonth()]}`;
                    })()}
                  </span>
                  <button
                    type="button"
                    onClick={() => currentDateIdx < availableDates.length - 1 && setSelectedDate(availableDates[currentDateIdx + 1])}
                    disabled={currentDateIdx === availableDates.length - 1}
                    className="p-2 rounded-lg text-brand-gray hover:text-white hover:bg-white/10 transition-colors disabled:opacity-30"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>

                {/* Date chips */}
                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                  {availableDates.slice(0, 14).map((date) => {
                    const d = new Date(date + "T12:00:00");
                    const isSelected = date === selectedDate;
                    return (
                      <button
                        key={date}
                        type="button"
                        onClick={() => { setSelectedDate(date); setSelectedSlot(null); }}
                        className={cn(
                          "flex flex-col items-center min-w-[56px] px-3 py-2.5 rounded-xl border text-xs transition-all flex-shrink-0",
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

              {/* Time slots grid */}
              <div className="mb-5">
                <p className="text-[11px] font-semibold text-brand-gray uppercase tracking-wider mb-2.5">
                  Horarios disponibles · Hora Colombia
                </p>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
                  {currentDateSlots.map((slot) => {
                    const isSelected = selectedSlot?.start === slot.start;
                    return (
                      <button
                        key={slot.start}
                        type="button"
                        onClick={() => setSelectedSlot(slot)}
                        className={cn(
                          "px-3 py-3 rounded-xl border text-sm font-medium transition-all",
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

              {/* Confirm */}
              {selectedSlot && (
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
                  <Button size="xl" className="w-full gap-2" onClick={handleBook} disabled={booking}>
                    {booking ? (
                      <><Loader2 className="w-5 h-5 animate-spin" /> Agendando...</>
                    ) : (
                      <><CheckCircle2 className="w-5 h-5" /> Confirmar {selectedSlot.time_label}<ArrowRight className="w-5 h-5" /></>
                    )}
                  </Button>
                  <div className="flex items-center justify-center gap-4 mt-3 text-[11px] text-brand-gray/60">
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> 30 min</span>
                    <span className="flex items-center gap-1"><Video className="w-3 h-3" /> Google Meet</span>
                    <span className="flex items-center gap-1"><ShieldCheck className="w-3 h-3" /> Gratis</span>
                  </div>
                </motion.div>
              )}

              {error && (
                <div className="mt-4 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-sm text-red-400">
                  {error}
                </div>
              )}
            </motion.div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
