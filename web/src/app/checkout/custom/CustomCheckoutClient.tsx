"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import {
  ArrowRight,
  Lock,
  Loader2,
  ShieldCheck,
  Sparkles,
  AlertCircle,
  Globe,
} from "lucide-react";
import { Navbar } from "@/components/home/Navbar";
import { Footer } from "@/components/home/Footer";
import { Button } from "@/components/ui/button";
import { useCurrency } from "@/components/providers/CurrencyProvider";
import {
  PLAN_PRICES,
  VOLUME_50_PRICE,
  VOLUME_TIERS,
  type Currency,
} from "@/lib/pricing/currency-config";
import { formatPrice } from "@/lib/pricing/format";
import {
  BILLING_DURATIONS,
  DURATION_DISCOUNT,
  DURATION_LABEL,
  applyDurationDiscount,
  isValidBillingDuration,
  type BillingDuration,
} from "@/lib/stripe/plans";

interface CustomCheckoutClientProps {
  initialVideos: number;
  initialDuration?: BillingDuration;
  wasCanceled: boolean;
  /** Código ISO2 de país detectado por IP. No editable por el user. */
  country: string;
}

function countryLabel(code: string): string {
  const map: Record<string, string> = {
    CO: "Colombia",
    US: "Estados Unidos",
    MX: "México",
    PE: "Perú",
    CL: "Chile",
    AR: "Argentina",
    EC: "Ecuador",
    ES: "España",
    BR: "Brasil",
    VE: "Venezuela",
  };
  return map[code] ?? code;
}

function resolveMonthlyPrice(
  videos: number,
  currency: Currency,
): { amount: number; label: string } {
  if (videos <= 5) return { amount: PLAN_PRICES.starter[currency].amount, label: "INICIO" };
  if (videos <= 10) return { amount: PLAN_PRICES.growth[currency].amount, label: "CRECIMIENTO" };
  if (videos <= 30) return { amount: PLAN_PRICES.scale[currency].amount, label: "ESCALA" };
  if (videos <= 50) return { amount: VOLUME_50_PRICE[currency], label: "VOLUMEN 50" };

  const tier = VOLUME_TIERS[currency].find(
    (t) =>
      videos >= t.minVideos && (t.maxVideos === null || videos <= t.maxVideos),
  );
  const amount = tier ? videos * tier.perVideo : 0;
  return { amount, label: "A LA MEDIDA" };
}

export function CustomCheckoutClient({
  initialVideos,
  initialDuration,
  wasCanceled,
  country,
}: CustomCheckoutClientProps) {
  const {
    currency,
    duration: globalDuration,
    setDuration: setGlobalDuration,
  } = useCurrency();

  const [videos, setVideos] = useState(initialVideos);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [taxId, setTaxId] = useState("");
  const [accepted, setAccepted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isValidBillingDuration(initialDuration) && initialDuration !== globalDuration) {
      setGlobalDuration(initialDuration);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const duration = globalDuration;

  const { monthlyAmount, label, cycleTotal, monthlyEquivalent, savings } =
    useMemo(() => {
      const { amount, label } = resolveMonthlyPrice(videos, currency);
      const cycle = applyDurationDiscount(amount, duration);
      return {
        monthlyAmount: amount,
        label,
        cycleTotal: cycle,
        monthlyEquivalent: duration > 0 ? Math.round(cycle / duration) : amount,
        savings: amount * duration - cycle,
      };
    }, [videos, currency, duration]);

  const perVideo = videos > 0 ? Math.round(monthlyAmount / videos) : 0;
  const cycleLabel = duration === 1 ? "cada mes" : `cada ${duration} meses`;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!accepted) {
      setError("Debes aceptar los términos para continuar");
      return;
    }
    if (monthlyAmount <= 0) {
      setError("No pudimos calcular el precio. Contactanos directo.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/checkout/custom", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          videos,
          duration,
          email,
          name,
          company,
          whatsapp: whatsapp || undefined,
          tax_id: taxId || undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.url)
        throw new Error(data.error ?? "No se pudo iniciar el pago");
      window.location.href = data.url;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al procesar");
      setLoading(false);
    }
  }

  return (
    <>
      <Navbar />
      <main className="relative bg-brand-black text-white min-h-screen">
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 40% at 50% 10%, rgba(16,185,129,0.08), transparent 60%)",
          }}
        />

        <div className="relative max-w-5xl mx-auto pt-20 sm:pt-24 md:pt-28 pb-20 px-4 sm:px-6">
          {wasCanceled && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8 p-4 rounded-xl border border-amber-500/30 bg-amber-500/10 flex items-start gap-3"
            >
              <AlertCircle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-amber-300">
                Checkout cancelado. Tus datos no se han guardado aún — puedes
                reintentar cuando quieras.
              </p>
            </motion.div>
          )}

          <div className="grid md:grid-cols-[1fr_1.1fr] gap-8 md:gap-10 items-start">
            {/* Izquierda: configurador (sticky solo en desktop) */}
            <motion.aside
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="md:sticky md:top-28"
            >
              <span className="inline-block px-3 py-1 rounded-full text-[11px] font-sans font-bold tracking-widest uppercase mb-4 bg-emerald-500/15 text-emerald-400 border border-emerald-500/40">
                <Sparkles className="inline w-3 h-3 mr-1" /> Plan a la medida
              </span>
              <h1 className="font-display text-[clamp(2rem,4vw,3rem)] leading-[1.05] text-white tracking-tight uppercase">
                {videos} videos al mes
              </h1>
              <p className="mt-3 text-sm text-brand-gray leading-relaxed">
                Ajusta el volumen y el compromiso. El precio se recalcula
                automáticamente aplicando los descuentos por prepago.
              </p>

              <div className="mt-6">
                <style>{`
                  .custom-checkout-slider::-webkit-slider-thumb {
                    -webkit-appearance: none;
                    appearance: none;
                    width: 24px;
                    height: 24px;
                    border-radius: 50%;
                    background: linear-gradient(135deg, #f9b334, #d4a017);
                    cursor: pointer;
                    border: 3px solid #000;
                    box-shadow: 0 0 16px rgba(249,179,52,0.5);
                  }
                  .custom-checkout-slider::-moz-range-thumb {
                    width: 24px;
                    height: 24px;
                    border-radius: 50%;
                    background: linear-gradient(135deg, #f9b334, #d4a017);
                    cursor: pointer;
                    border: 3px solid #000;
                    box-shadow: 0 0 16px rgba(249,179,52,0.5);
                  }
                `}</style>
                <label
                  htmlFor="custom-videos"
                  className="block text-xs sm:text-[11px] font-bold tracking-widest uppercase text-brand-gray mb-2"
                >
                  Videos al mes: {videos}
                </label>
                <input
                  id="custom-videos"
                  type="range"
                  min={5}
                  max={300}
                  step={1}
                  value={videos}
                  onChange={(e) => setVideos(parseInt(e.target.value, 10))}
                  className="custom-checkout-slider w-full h-2 rounded-full appearance-none cursor-pointer accent-brand-yellow"
                />
                <div className="flex justify-between mt-2 text-[10px] text-brand-gray/60">
                  <span>5</span>
                  <span>50</span>
                  <span>100</span>
                  <span>200</span>
                  <span>300</span>
                </div>
              </div>

              {/* Selector de duración */}
              <div className="mt-6">
                <p className="text-[10px] font-bold tracking-[0.25em] uppercase text-brand-gold/70 mb-2">
                  Compromiso
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {BILLING_DURATIONS.map((d) => {
                    const pct = Math.round(DURATION_DISCOUNT[d] * 100);
                    const active = duration === d;
                    return (
                      <button
                        key={d}
                        type="button"
                        onClick={() => setGlobalDuration(d)}
                        className={`relative px-3 py-3.5 sm:py-2.5 rounded-lg border text-left transition-colors ${
                          active
                            ? "border-brand-gold bg-brand-yellow/10"
                            : "border-brand-graphite/60 hover:border-brand-gold/40"
                        }`}
                      >
                        <p
                          className={`text-xs font-semibold ${
                            active ? "text-brand-yellow" : "text-white"
                          }`}
                        >
                          {DURATION_LABEL[d]}
                        </p>
                        <p className="text-[10px] text-brand-gray mt-0.5">
                          {d === 1 ? "1 mes" : `${d} meses`}
                        </p>
                        {pct > 0 && (
                          <span className="absolute top-1 right-1.5 text-[9px] font-bold text-emerald-400">
                            -{pct}%
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="mt-6 p-5 rounded-2xl border border-brand-gold/30 bg-gradient-to-b from-brand-yellow/5 to-transparent">
                <p className="text-[10px] font-bold tracking-[0.25em] uppercase text-brand-gold/70 mb-2">
                  Plan {label} · Total {cycleLabel}
                </p>
                <p className="font-display text-5xl sm:text-6xl text-white leading-none">
                  {formatPrice(cycleTotal, currency)}
                </p>
                <p className="text-xs text-brand-gray mt-2">
                  {currency} · {formatPrice(perVideo, currency)} por video
                </p>
                {duration > 1 && (
                  <div className="mt-2 flex items-center gap-2 text-xs flex-wrap">
                    <span className="text-brand-gray">
                      Equivalente a{" "}
                      <strong className="text-white">
                        {formatPrice(monthlyEquivalent, currency)}/mes
                      </strong>
                    </span>
                    {savings > 0 && (
                      <span className="text-emerald-400 font-semibold">
                        · Ahorras {formatPrice(savings, currency)}
                      </span>
                    )}
                  </div>
                )}

                <div className="mt-4 flex items-center gap-2 rounded-lg bg-black/30 border border-brand-graphite/60 px-3 py-2">
                  <Globe className="w-3.5 h-3.5 text-brand-gold/70 flex-shrink-0" />
                  <span className="text-[11px] text-brand-gray">
                    Desde {countryLabel(country)} se paga en{" "}
                    <strong className="text-white">{currency}</strong>
                  </span>
                </div>
              </div>

              <div className="mt-6 flex items-center gap-2 text-xs text-brand-gray/70">
                <ShieldCheck className="w-4 h-4 text-brand-gold/60" />
                <span>Procesado por Stripe · Cancela cuando quieras</span>
              </div>
            </motion.aside>

            {/* Derecha: formulario */}
            <motion.section
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="relative rounded-3xl border border-brand-graphite/60 bg-white/[0.03] p-6 sm:p-8"
            >
              <form onSubmit={handleSubmit} className="space-y-5">
                <h2 className="font-display text-2xl text-white uppercase tracking-tight">
                  Datos de facturación
                </h2>

                <Field label="Nombre completo" required value={name} onChange={setName} autoComplete="name" />
                <Field label="Correo electrónico" type="email" required value={email} onChange={setEmail} autoComplete="email" inputMode="email" />
                <Field label="Empresa / Marca" required value={company} onChange={setCompany} autoComplete="organization" />
                <Field label="WhatsApp (opcional)" placeholder="+57 300 123 4567" value={whatsapp} onChange={setWhatsapp} autoComplete="tel" inputMode="tel" />
                <Field label="NIT / RUC (opcional)" value={taxId} onChange={setTaxId} />

                <label className="flex items-start gap-3 text-xs text-brand-gray cursor-pointer">
                  <input
                    type="checkbox"
                    checked={accepted}
                    onChange={(e) => setAccepted(e.target.checked)}
                    className="mt-0.5 w-5 h-5 sm:w-4 sm:h-4 rounded border-brand-graphite bg-black/40 accent-brand-yellow flex-shrink-0"
                  />
                  <span>
                    Acepto que se cobre{" "}
                    <strong className="text-white">
                      {formatPrice(cycleTotal, currency)} en {currency}{" "}
                      {cycleLabel}
                    </strong>{" "}
                    de forma automática hasta que cancele. Puedo pausar o
                    cancelar escribiendo a{" "}
                    <span className="text-brand-gold">hola@ugccolombia.co</span>.
                  </span>
                </label>

                {error && (
                  <div
                    role="alert"
                    aria-live="assertive"
                    className="p-3 rounded-lg border border-red-500/40 bg-red-500/10 text-sm text-red-300"
                  >
                    {error}
                  </div>
                )}

                <Button
                  type="submit"
                  size="lg"
                  className="w-full gap-2"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Conectando con Stripe…
                    </>
                  ) : (
                    <>
                      <Lock className="w-4 h-4 hidden sm:inline-block" />
                      Continuar al pago seguro
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </Button>

                <p className="text-[11px] text-brand-gray/60 text-center">
                  Al continuar aceptas los{" "}
                  <Link href="/terminos" className="text-brand-gold hover:underline">términos</Link> y la{" "}
                  <Link href="/privacidad" className="text-brand-gold hover:underline">privacidad</Link>.
                </p>
              </form>
            </motion.section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

function Field({
  label, value, onChange, type = "text", required, placeholder, autoComplete, inputMode,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
  placeholder?: string;
  autoComplete?: string;
  inputMode?: "text" | "email" | "tel" | "numeric" | "decimal" | "search" | "url" | "none";
}) {
  return (
    <div>
      <label className="block text-xs sm:text-[11px] font-bold tracking-widest uppercase text-brand-gray mb-2">
        {label}
        {required && <span className="text-brand-gold ml-1">*</span>}
      </label>
      <input
        type={type}
        value={value}
        required={required}
        placeholder={placeholder}
        autoComplete={autoComplete}
        inputMode={inputMode}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-3 rounded-xl border border-brand-graphite/60 bg-black/40 text-white text-base sm:text-sm placeholder:text-brand-gray/40 focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold/40"
      />
    </div>
  );
}
