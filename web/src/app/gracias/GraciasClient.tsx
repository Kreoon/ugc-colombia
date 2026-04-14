"use client";

import { useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "motion/react";
import Image from "next/image";
import {
  CheckCircle2,
  Calendar,
  Clock,
  Video,
  MessageCircle,
  Instagram,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/home/Navbar";
import { Footer } from "@/components/home/Footer";
import { trackBookingComplete } from "@/lib/tracking/events";

const COMMUNITY_URL = "https://chat.whatsapp.com/F5QDgl4imsjBjW1KL2DhRE";
const DAY_FULL = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
const MONTH_NAMES = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre",
];

export function GraciasClient() {
  const params = useSearchParams();
  const hostName = params.get("host") || "UGC Colombia";
  const meetLink = params.get("meet") || "";
  const startISO = params.get("start") || "";

  // Dispara conversion tracking solo cuando hay booking real confirmado
  // (presencia de params start+host) para evitar disparar por visitas directas.
  const hasFired = useRef(false);
  useEffect(() => {
    if (hasFired.current) return;
    if (!startISO || !params.get("host")) return;
    hasFired.current = true;
    trackBookingComplete("gracias_page");
  }, [startISO, params]);

  let dateStr = "";
  let timeStr = "";
  if (startISO) {
    const date = new Date(startISO);
    const cotDate = new Date(date.getTime() - 5 * 60 * 60 * 1000);
    const h = cotDate.getUTCHours();
    const m = cotDate.getUTCMinutes();
    const ampm = h >= 12 ? "PM" : "AM";
    const h12 = h > 12 ? h - 12 : h === 0 ? 12 : h;
    dateStr = `${DAY_FULL[cotDate.getUTCDay()]} ${cotDate.getUTCDate()} de ${MONTH_NAMES[cotDate.getUTCMonth()]}`;
    timeStr = `${h12}:${m.toString().padStart(2, "0")} ${ampm}`;
  }

  return (
    <>
      <Navbar />
      <main className="relative bg-brand-black text-white min-h-screen">
        <div
          aria-hidden
          className="absolute inset-0"
          style={{ background: "radial-gradient(ellipse 60% 30% at 50% 15%, rgba(16,185,129,0.08), transparent 60%)" }}
        />

        <div className="relative max-w-lg mx-auto pt-28 pb-20 px-4 text-center">
          {/* Success icon */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="w-24 h-24 rounded-full bg-emerald-500/15 border-2 border-emerald-500/30 flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle2 className="w-12 h-12 text-emerald-400" />
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <h1 className="font-sans text-3xl sm:text-4xl font-bold text-white mb-3">
              ¡Llamada confirmada!
            </h1>
            <p className="text-brand-gray text-base mb-8">
              Te enviamos un email con los detalles y el link de la reunión.
            </p>
          </motion.div>

          {/* Meeting details card */}
          {startISO && (
            <motion.div
              className="p-6 rounded-2xl border border-brand-gold/20 bg-white/[0.03] text-left mb-8 inline-block w-full"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-brand-yellow flex-shrink-0" />
                  <span className="text-white font-semibold">{dateStr}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-brand-yellow flex-shrink-0" />
                  <span className="text-white font-semibold">{timeStr} — Hora Colombia</span>
                </div>
                <div className="flex items-center gap-3">
                  <Video className="w-5 h-5 text-brand-yellow flex-shrink-0" />
                  <span className="text-brand-gray">30 min · Google Meet · Con {hostName}</span>
                </div>
              </div>

              {meetLink && (
                <Button
                  size="lg"
                  className="w-full gap-2 mt-5"
                  onClick={() => window.open(meetLink, "_blank")}
                >
                  <Video className="w-5 h-5" />
                  Guardar link de Google Meet
                </Button>
              )}
            </motion.div>
          )}

          {/* Comunidad WhatsApp — CTA principal */}
          <motion.div
            className="p-6 rounded-2xl border border-emerald-500/25 bg-emerald-500/[0.04] mb-6"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div className="flex items-center justify-center gap-2 mb-3">
              <MessageCircle className="w-5 h-5 text-emerald-400" />
              <h2 className="text-white font-bold text-lg">Únete a nuestra comunidad</h2>
            </div>
            <p className="text-sm text-brand-gray mb-5 max-w-sm mx-auto">
              +200 marcas y emprendedores compartiendo estrategias de marketing, ventas, contenido y crecimiento de negocios. 100% gratis.
            </p>
            <a
              href={COMMUNITY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-500 text-white font-bold text-sm hover:bg-emerald-600 transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
              Unirme a la comunidad de WhatsApp
              <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>

          {/* Preparación para la llamada */}
          <motion.div
            className="p-5 rounded-2xl border border-white/10 bg-white/[0.02] text-left mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <p className="text-xs font-semibold text-brand-gray uppercase tracking-wider mb-3">Prepárate para la llamada</p>
            <ul className="space-y-2 text-sm text-brand-gray">
              <li className="flex items-start gap-2">
                <span className="text-brand-yellow mt-0.5">1.</span>
                Ten a mano ejemplos de contenido que hayas usado o que te gusten
              </li>
              <li className="flex items-start gap-2">
                <span className="text-brand-yellow mt-0.5">2.</span>
                Revisa tus métricas actuales (ads, ventas, seguidores)
              </li>
              <li className="flex items-start gap-2">
                <span className="text-brand-yellow mt-0.5">3.</span>
                Piensa en qué resultado te haría sentir que valió la pena
              </li>
            </ul>
          </motion.div>

          {/* Redes sociales */}
          <motion.div
            className="flex items-center justify-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
          >
            <p className="text-xs text-brand-gray/50">Síguenos:</p>
            <a href="https://www.instagram.com/agenciaugccolombia" target="_blank" rel="noopener noreferrer" className="text-brand-gray/50 hover:text-brand-yellow transition-colors">
              <Instagram className="w-5 h-5" />
            </a>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  );
}
