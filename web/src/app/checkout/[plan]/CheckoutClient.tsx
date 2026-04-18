"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import {
  ArrowRight,
  CheckCircle2,
  Lock,
  ShieldCheck,
  AlertCircle,
  Globe,
} from "lucide-react";
import { Navbar } from "@/components/home/Navbar";
import { Footer } from "@/components/home/Footer";
import { Button } from "@/components/ui/button";
import { useCurrency } from "@/components/providers/CurrencyProvider";
import { PLAN_PRICES } from "@/lib/pricing/currency-config";
import { formatPrice } from "@/lib/pricing/format";
import {
  BILLING_DURATIONS,
  DURATION_DISCOUNT,
  DURATION_LABEL,
  applyDurationDiscount,
  isValidBillingDuration,
  type BillingDuration,
  type StripePlanId,
} from "@/lib/stripe/plans";

interface CheckoutClientProps {
  planId: StripePlanId;
  planName: string;
  planVideos: string;
  planDescription: string;
  features: string[];
  wasCanceled: boolean;
  /** Código ISO2 de país detectado por IP. Nunca editable por el user. */
  country: string;
  initialDuration?: BillingDuration;
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

export function CheckoutClient({
  planId,
  planName,
  planVideos,
  planDescription,
  features,
  wasCanceled,
  country,
  initialDuration,
}: CheckoutClientProps) {
  const { currency, duration, setDuration } = useCurrency();

  useEffect(() => {
    if (isValidBillingDuration(initialDuration) && initialDuration !== duration) {
      setDuration(initialDuration);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [taxId, setTaxId] = useState("");
  const [accepted, setAccepted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const monthlyBase = PLAN_PRICES[planId][currency].amount;
  const { cycleTotal, monthlyEquivalent, savings, discountPct } = useMemo(() => {
    const cycle = applyDurationDiscount(monthlyBase, duration);
    const equivalent = Math.round(cycle / duration);
    const fullPrice = monthlyBase * duration;
    return {
      cycleTotal: cycle,
      monthlyEquivalent: equivalent,
      savings: fullPrice - cycle,
      discountPct: Math.round(DURATION_DISCOUNT[duration] * 100),
    };
  }, [monthlyBase, duration]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!accepted) {
      setError("Debes aceptar los términos para continuar");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/checkout/create-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          planId,
          duration,
          email,
          name,
          company,
          whatsapp: whatsapp || undefined,
          tax_id: taxId || undefined,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.url) {
        throw new Error(data.error ?? "No se pudo iniciar el pago");
      }

      window.location.href = data.url;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al procesar");
      setLoading(false);
    }
  }

  const cycleLabel = duration === 1 ? "cada mes" : `cada ${duration} meses`;

  return (
    <>
      <Navbar />
      <main className="relative bg-brand-black text-white min-h-screen">
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 40% at 50% 10%, rgba(249,179,52,0.08), transparent 60%)",
          }}
        />

        <div className="relative max-w-5xl mx-auto pt-24 sm:pt-28 pb-20 px-4 sm:px-6">
          {wasCanceled && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8 p-4 rounded-xl border border-amber-500/30 bg-amber-500/10 flex items-start gap-3"
            >
              <AlertCircle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-amber-300 font-semibold">
                  Checkout cancelado
                </p>
                <p className="text-xs text-amber-200/80 mt-1">
                  Puedes completar tu compra cuando estés listo. Los datos
                  siguen disponibles.
                </p>
              </div>
            </motion.div>
          )}

          <div className="grid md:grid-cols-[1fr_1.1fr] gap-10 items-start">
            {/* Izquierda: resumen plan */}
            <motion.aside
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="sticky top-28"
            >
              <span className="inline-block px-3 py-1 rounded-full text-[11px] font-sans font-bold tracking-widest uppercase mb-4 bg-brand-yellow/15 text-brand-yellow border border-brand-yellow/40">
                Checkout · Plan {planName}
              </span>
              <h1 className="font-display text-[clamp(2rem,4vw,3rem)] leading-[1.05] text-white tracking-tight uppercase">
                {planVideos}
              </h1>
              <p className="mt-3 text-sm text-brand-gray leading-relaxed">
                {planDescription}
              </p>

              {/* Selector de duración */}
              <div className="mt-6">
                <p className="text-[10px] font-bold tracking-[0.25em] uppercase text-brand-gold/70 mb-2">
                  ¿Cuánto te comprometes?
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {BILLING_DURATIONS.map((d) => {
                    const pct = Math.round(DURATION_DISCOUNT[d] * 100);
                    const active = duration === d;
                    return (
                      <button
                        key={d}
                        type="button"
                        onClick={() => setDuration(d)}
                        className={`relative px-3 py-2.5 rounded-lg border text-left transition-colors ${
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
                  Total {cycleLabel}
                </p>
                <div className="flex items-end gap-3 flex-wrap">
                  <p className="font-display text-5xl sm:text-6xl text-white leading-none">
                    {formatPrice(cycleTotal, currency)}
                  </p>
                  <p className="text-xs text-brand-gray pb-2">
                    {currency} · se renueva automáticamente
                  </p>
                </div>

                {duration > 1 && (
                  <div className="mt-3 flex items-center gap-2 text-xs flex-wrap">
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
                {duration === 1 && discountPct === 0 && (
                  <p className="mt-2 text-[11px] text-brand-gray/70">
                    Compromete 3, 6 o 12 meses y ahorra hasta 40%.
                  </p>
                )}

                <div className="mt-4 flex items-center gap-2 rounded-lg bg-black/30 border border-brand-graphite/60 px-3 py-2">
                  <Globe className="w-3.5 h-3.5 text-brand-gold/70 flex-shrink-0" />
                  <span className="text-[11px] text-brand-gray">
                    Desde {countryLabel(country)} se paga en{" "}
                    <strong className="text-white">{currency}</strong>
                  </span>
                </div>
              </div>

              <ul className="mt-6 space-y-2">
                {features.slice(0, 6).map((f) => (
                  <li
                    key={f}
                    className="flex items-start gap-2 text-sm text-brand-gray"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex items-center gap-2 text-xs text-brand-gray/70">
                <ShieldCheck className="w-4 h-4 text-brand-gold/60" />
                <span>Pago procesado por Stripe · Cancela cuando quieras</span>
              </div>
            </motion.aside>

            {/* Derecha: formulario */}
            <motion.section
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="relative rounded-3xl border border-brand-graphite/60 bg-white/[0.03] p-6 sm:p-8"
            >
              <form onSubmit={handleSubmit} className="space-y-5">
                <h2 className="font-display text-2xl text-white uppercase tracking-tight">
                  Datos de facturación
                </h2>

                <Field
                  label="Nombre completo"
                  required
                  value={name}
                  onChange={setName}
                  autoComplete="name"
                />
                <Field
                  label="Email"
                  type="email"
                  required
                  value={email}
                  onChange={setEmail}
                  autoComplete="email"
                />
                <Field
                  label="Empresa / Marca"
                  required
                  value={company}
                  onChange={setCompany}
                  autoComplete="organization"
                />
                <Field
                  label="WhatsApp (opcional, con indicativo)"
                  placeholder="+57 300 123 4567"
                  value={whatsapp}
                  onChange={setWhatsapp}
                  autoComplete="tel"
                />
                <Field
                  label="NIT / RUC (opcional)"
                  value={taxId}
                  onChange={setTaxId}
                />

                <label className="flex items-start gap-3 text-xs text-brand-gray cursor-pointer">
                  <input
                    type="checkbox"
                    checked={accepted}
                    onChange={(e) => setAccepted(e.target.checked)}
                    className="mt-0.5 w-4 h-4 rounded border-brand-graphite bg-black/40 accent-brand-yellow"
                  />
                  <span>
                    Acepto que se cobre{" "}
                    <strong className="text-white">
                      {formatPrice(cycleTotal, currency)} en {currency}{" "}
                      {cycleLabel}
                    </strong>{" "}
                    de forma automática hasta que cancele. Puedo pausar o
                    cancelar en cualquier momento escribiéndoles al WhatsApp o
                    al email{" "}
                    <span className="text-brand-gold">hola@ugccolombia.co</span>.
                  </span>
                </label>

                {error && (
                  <div className="p-3 rounded-lg border border-red-500/40 bg-red-500/10 text-sm text-red-300">
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
                    "Conectando con Stripe…"
                  ) : (
                    <>
                      <Lock className="w-4 h-4" />
                      Continuar al pago seguro
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </Button>

                <p className="text-[11px] text-brand-gray/60 text-center">
                  Al continuar aceptas los{" "}
                  <Link href="/terminos" className="text-brand-gold hover:underline">
                    términos de servicio
                  </Link>{" "}
                  y la{" "}
                  <Link href="/privacidad" className="text-brand-gold hover:underline">
                    política de privacidad
                  </Link>
                  .
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
  label,
  value,
  onChange,
  type = "text",
  required,
  placeholder,
  autoComplete,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
  placeholder?: string;
  autoComplete?: string;
}) {
  return (
    <div>
      <label className="block text-[11px] font-bold tracking-widest uppercase text-brand-gray mb-2">
        {label}
        {required && <span className="text-brand-gold ml-1">*</span>}
      </label>
      <input
        type={type}
        value={value}
        required={required}
        placeholder={placeholder}
        autoComplete={autoComplete}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-3 rounded-xl border border-brand-graphite/60 bg-black/40 text-white text-sm placeholder:text-brand-gray/40 focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold/40"
      />
    </div>
  );
}
