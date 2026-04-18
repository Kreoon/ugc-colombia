"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "motion/react";
import {
  CheckCircle2,
  Calendar,
  MessageCircle,
  FileText,
  Video,
  TrendingUp,
  Rocket,
  ArrowRight,
  Instagram,
} from "lucide-react";
import { Navbar } from "@/components/home/Navbar";
import { Footer } from "@/components/home/Footer";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/pricing/format";
import type { Currency } from "@/lib/pricing/currency-config";
import { trackPurchase } from "@/lib/tracking/events";

const WHATSAPP_ADVISOR_URL =
  process.env.NEXT_PUBLIC_WHATSAPP_ADVISOR_URL ??
  "https://wa.me/573001234567?text=Hola%2C%20acabo%20de%20pagar%20mi%20plan%20UGC";
const COMMUNITY_URL = "https://chat.whatsapp.com/F5QDgl4imsjBjW1KL2DhRE";

interface SessionSummary {
  id: string;
  status: string | null;
  payment_status: string | null;
  email: string | null;
  name: string | null;
  plan_id: string | null;
  plan_label: string | null;
  videos_per_month: string | null;
  billing_interval_count?: number | null;
  amount_total: number;
  currency: Currency;
}

const ROADMAP = [
  {
    day: "Día 0 — Hoy",
    title: "Pago confirmado",
    description:
      "Recibirás un email con el recibo. Tu suscripción queda activa de inmediato.",
    icon: CheckCircle2,
    done: true,
  },
  {
    day: "Día 1–2",
    title: "Kickoff call con Alexander",
    description:
      "Revisamos tu marca, objetivos y calendarios. Agenda la llamada abajo.",
    icon: Calendar,
  },
  {
    day: "Día 3–7",
    title: "Research + matching de creadores",
    description:
      "Investigamos tu mercado y seleccionamos los creadores adecuados para tu nicho.",
    icon: FileText,
  },
  {
    day: "Día 7–14",
    title: "Primera entrega de contenido",
    description: "Videos listos para publicar, con edición profesional y variantes.",
    icon: Video,
  },
  {
    day: "Día 30",
    title: "Reporte de resultados",
    description:
      "Métricas, aprendizajes y ajustes para el siguiente mes. Todo documentado.",
    icon: TrendingUp,
  },
];

export function GraciasPagoClient() {
  const params = useSearchParams();
  const sessionId = params.get("session_id");

  const [summary, setSummary] = useState<SessionSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!sessionId) {
      setLoading(false);
      return;
    }
    let cancelled = false;
    fetch(`/api/checkout/session/${sessionId}`)
      .then((r) => r.json())
      .then((data) => {
        if (cancelled) return;
        if (data.error) {
          setError(data.error);
        } else {
          setSummary(data);
          // Dispara Purchase en Meta/TikTok/GA4/Bing UET. Dedupe interno via
          // sessionStorage para evitar contar dos veces si el user refresca.
          if (data.payment_status === "paid" && data.amount_total > 0) {
            trackPurchase({
              transactionId: data.id,
              value: data.amount_total,
              currency: data.currency,
              planId: data.plan_id ?? "unknown",
              planLabel: data.plan_label ?? undefined,
              videosPerMonth: data.videos_per_month
                ? parseInt(data.videos_per_month, 10)
                : undefined,
              billingIntervalCount: data.billing_interval_count ?? undefined,
            });
          }
        }
      })
      .catch(() => {
        if (!cancelled) setError("No pudimos cargar los detalles del pago.");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [sessionId]);

  const calcomKickoff =
    process.env.NEXT_PUBLIC_CALCOM_KICKOFF_LINK ??
    "https://cal.com/ugccolombia/kickoff";

  const firstName = summary?.name?.split(" ")[0] ?? "";

  return (
    <>
      <Navbar />
      <main className="relative bg-brand-black text-white min-h-screen">
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 60% 30% at 50% 15%, rgba(16,185,129,0.10), transparent 60%)",
          }}
        />

        <div className="relative max-w-3xl mx-auto pt-24 sm:pt-28 pb-20 px-4 sm:px-6">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="w-24 h-24 rounded-full bg-emerald-500/15 border-2 border-emerald-500/30 flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle2 className="w-12 h-12 text-emerald-400" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center"
          >
            <span className="inline-block px-3 py-1 rounded-full text-[11px] font-sans font-bold tracking-widest uppercase mb-4 bg-emerald-500/15 text-emerald-400 border border-emerald-500/40">
              Pago confirmado
            </span>
            <h1 className="font-display text-[clamp(2rem,5vw,3.5rem)] leading-[1] text-white tracking-tight uppercase mb-4">
              {firstName ? `¡Gracias, ${firstName}!` : "¡Gracias!"}
            </h1>
            <p className="text-brand-gray text-base max-w-xl mx-auto">
              Tu suscripción está activa. En los próximos minutos recibirás un
              email con el recibo y el siguiente paso.
            </p>
          </motion.div>

          {/* Resumen de la compra */}
          {!loading && summary && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="mt-8 rounded-2xl border border-brand-gold/25 bg-white/[0.03] p-5 sm:p-6"
            >
              <p className="text-[10px] font-bold tracking-[0.25em] uppercase text-brand-gold/70 mb-3">
                Resumen
              </p>
              <div className="grid sm:grid-cols-3 gap-4 text-sm">
                <SummaryRow label="Plan" value={summary.plan_label ?? summary.plan_id ?? "—"} />
                <SummaryRow
                  label="Mensualidad"
                  value={formatPrice(summary.amount_total, summary.currency)}
                />
                {summary.videos_per_month && (
                  <SummaryRow
                    label="Videos / mes"
                    value={summary.videos_per_month}
                  />
                )}
              </div>
            </motion.div>
          )}

          {!loading && error && (
            <div className="mt-6 p-4 rounded-xl border border-amber-500/30 bg-amber-500/10 text-sm text-amber-200">
              {error} — Pero tu pago se procesó correctamente. Te escribiremos
              al email registrado para continuar.
            </div>
          )}

          {/* Kickoff call */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-10 rounded-2xl border border-brand-gold/30 bg-gradient-to-b from-brand-yellow/8 to-transparent p-6 sm:p-7 text-center"
          >
            <div className="w-14 h-14 rounded-full bg-brand-yellow/15 border border-brand-yellow/40 flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-6 h-6 text-brand-yellow" />
            </div>
            <h2 className="font-display text-2xl sm:text-3xl text-white uppercase tracking-tight mb-2">
              Agenda tu kickoff call
            </h2>
            <p className="text-sm text-brand-gray max-w-md mx-auto mb-5">
              30 minutos con Alexander Cast para alinear objetivos, definir tu
              mensaje y arrancar producción esta misma semana.
            </p>
            <Button
              asChild
              size="lg"
              className="gap-2"
            >
              <a href={calcomKickoff} target="_blank" rel="noopener noreferrer">
                <Calendar className="w-5 h-5" />
                Reservar kickoff call
                <ArrowRight className="w-4 h-4" />
              </a>
            </Button>
          </motion.div>

          {/* Roadmap */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-10"
          >
            <h3 className="font-display text-xl text-white uppercase tracking-tight mb-5">
              Tu primer mes, paso a paso
            </h3>
            <ol className="space-y-3">
              {ROADMAP.map((step, idx) => {
                const Icon = step.icon;
                return (
                  <li
                    key={step.title}
                    className={`flex gap-4 p-4 rounded-xl border transition-colors ${
                      step.done
                        ? "border-emerald-500/30 bg-emerald-500/5"
                        : "border-brand-graphite/60 bg-white/[0.02]"
                    }`}
                  >
                    <div
                      className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                        step.done
                          ? "bg-emerald-500/20 text-emerald-400"
                          : "bg-brand-graphite/40 text-brand-gray"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span
                          className={`text-[10px] font-bold tracking-widest uppercase ${
                            step.done ? "text-emerald-400" : "text-brand-gold/60"
                          }`}
                        >
                          {step.day}
                        </span>
                        {step.done && (
                          <span className="text-[10px] text-emerald-400">✓ Completo</span>
                        )}
                      </div>
                      <p className="text-white font-semibold text-sm">{step.title}</p>
                      <p className="text-brand-gray text-xs mt-1 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                    <span className="flex-shrink-0 text-[11px] text-brand-gray/50 font-semibold">
                      {idx + 1}
                    </span>
                  </li>
                );
              })}
            </ol>
          </motion.div>

          {/* WhatsApp + comunidad */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75 }}
            className="mt-10 grid sm:grid-cols-2 gap-4"
          >
            <a
              href={WHATSAPP_ADVISOR_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group p-5 rounded-2xl border border-emerald-500/30 bg-emerald-500/5 hover:bg-emerald-500/10 transition-colors"
            >
              <div className="flex items-center gap-3 mb-2">
                <MessageCircle className="w-5 h-5 text-emerald-400" />
                <p className="text-white font-semibold text-sm">
                  WhatsApp con tu asesora
                </p>
              </div>
              <p className="text-xs text-brand-gray mb-3">
                Diana está lista para resolver dudas y acelerar tu onboarding.
              </p>
              <span className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                Abrir chat <ArrowRight className="w-3 h-3" />
              </span>
            </a>

            <a
              href={COMMUNITY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group p-5 rounded-2xl border border-brand-gold/30 bg-brand-yellow/5 hover:bg-brand-yellow/10 transition-colors"
            >
              <div className="flex items-center gap-3 mb-2">
                <Rocket className="w-5 h-5 text-brand-yellow" />
                <p className="text-white font-semibold text-sm">
                  Comunidad de marcas
                </p>
              </div>
              <p className="text-xs text-brand-gray mb-3">
                +200 marcas compartiendo estrategias, casos y resultados.
              </p>
              <span className="text-[11px] text-brand-yellow font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                Unirme <ArrowRight className="w-3 h-3" />
              </span>
            </a>
          </motion.div>

          {/* Redes */}
          <div className="mt-10 flex items-center justify-center gap-4 text-xs text-brand-gray/50">
            <span>Síguenos:</span>
            <a
              href="https://www.instagram.com/agenciaugccolombia"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-brand-yellow transition-colors"
            >
              <Instagram className="w-5 h-5" />
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[10px] font-bold tracking-widest uppercase text-brand-gray mb-1">
        {label}
      </p>
      <p className="text-white font-semibold">{value}</p>
    </div>
  );
}
