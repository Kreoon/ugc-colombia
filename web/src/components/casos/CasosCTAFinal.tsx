"use client";

import { motion } from "motion/react";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { useAudit } from "@/components/lead-audit/AuditContext";

export function CasosCTAFinal() {
  const { openAudit } = useAudit();

  return (
    <section
      id="contacto"
      className="relative py-20 sm:py-28 lg:py-32 px-4 sm:px-6 lg:px-8 scroll-mt-20 sm:scroll-mt-24"
      aria-labelledby="casos-cta-heading"
    >
      <motion.div
        className="relative max-w-6xl mx-auto rounded-3xl overflow-hidden"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Background layers */}
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #0a0a0a 100%)",
          }}
        />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 30% 20%, rgba(249,179,52,0.25) 0%, transparent 50%), radial-gradient(ellipse 70% 50% at 80% 80%, rgba(212,160,23,0.2) 0%, transparent 55%)",
          }}
        />

        {/* Gradient border */}
        <div
          aria-hidden
          className="absolute inset-0 rounded-3xl pointer-events-none"
          style={{
            padding: "2px",
            background:
              "linear-gradient(135deg, rgba(249,179,52,0.7), rgba(212,160,23,0.4) 40%, rgba(212,160,23,0.15) 70%, transparent 100%)",
            WebkitMask:
              "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
          }}
        />

        {/* Grid pattern */}
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
            maskImage:
              "radial-gradient(ellipse at center, black 20%, transparent 70%)",
          }}
        />

        {/* Content */}
        <div className="relative px-6 sm:px-12 lg:px-20 xl:px-24 py-16 sm:py-20 lg:py-28">
          <div className="flex flex-col items-start gap-7 max-w-4xl">
            {/* Badge */}
            <motion.span
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-yellow/10 border border-brand-yellow/30 text-xs font-semibold text-brand-yellow tracking-[0.2em] uppercase"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-brand-yellow animate-pulse" />
              Ya identificaste tu dolor
            </motion.span>

            {/* Headline */}
            <motion.h2
              id="casos-cta-heading"
              className="font-display text-[clamp(2.5rem,8vw,6.5rem)] leading-[0.9] text-white tracking-tight uppercase"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.7 }}
            >
              No tienes que cargar
              <br />
              <span className="text-brand-yellow">con todo esto solo.</span>
            </motion.h2>

            {/* Subheadline */}
            <motion.p
              className="max-w-2xl text-base sm:text-lg lg:text-xl text-brand-gray leading-relaxed"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              Ya leíste los 7 dolores. Ya viste cómo los resolvemos. El siguiente
              paso es una llamada de 30 minutos donde revisamos tu caso, te decimos
              qué línea de servicio encaja y salimos con un plan claro. Sin venta forzada.
            </motion.p>

            {/* CTA Button */}
            <motion.div
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-5 mt-2 w-full sm:w-auto"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <motion.button
                type="button"
                onClick={() => openAudit("casos_cta_final")}
                className="group relative inline-flex items-center justify-center gap-3 px-7 sm:px-8 py-4 sm:py-5 rounded-xl bg-brand-yellow text-brand-black font-semibold text-base sm:text-lg tracking-wide overflow-hidden min-h-[56px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-brand-yellow"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                style={{
                  boxShadow:
                    "0 10px 40px -10px rgba(249,179,52,0.5), 0 0 80px -20px rgba(212,160,23,0.4)",
                }}
              >
                <span className="relative z-10">QUIERO MI DIAGNÓSTICO</span>
                <ArrowRight
                  className="relative z-10 w-5 h-5 transition-transform group-hover:translate-x-1"
                  aria-hidden
                />
                <span
                  aria-hidden
                  className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-out"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)",
                  }}
                />
              </motion.button>

              <div className="flex items-center justify-center sm:justify-start gap-3 text-sm text-brand-gray">
                <span className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0" />
                  30 min
                </span>
                <span className="w-1 h-1 rounded-full bg-brand-graphite" aria-hidden />
                <span>Gratis</span>
                <span className="w-1 h-1 rounded-full bg-brand-graphite" aria-hidden />
                <span>Sin venta forzada</span>
              </div>
            </motion.div>

            {/* Guarantee badge */}
            <motion.div
              className="inline-flex items-center gap-2.5 mt-6 px-5 py-3 rounded-xl border border-brand-gold/25 bg-white/[0.03]"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7, duration: 0.6 }}
            >
              <ShieldCheck className="h-5 w-5 text-brand-yellow flex-shrink-0" aria-hidden />
              <div className="text-left">
                <p className="text-xs font-bold text-white">Garantía de 7 días</p>
                <p className="text-[10px] text-brand-gray">Si no encajamos, te recomendamos gratis a alguien que sí pueda ayudarte</p>
              </div>
            </motion.div>

            {/* Avatar stack */}
            <motion.div
              className="flex flex-col items-center sm:items-start gap-3 mt-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              <div className="flex items-center -space-x-2.5">
                {[
                  { name: "Shop Tokio", logo: "https://shoptokio.co/cdn/shop/files/gempages_513541607190955198-297e6fa2-f0e0-455a-bdf4-12a9388c792d.webp?v=1728089603&width=260" },
                  { name: "Altevo", logo: "https://altevo.com.co/cdn/shop/files/Altevo_Logo.png?v=1758591345&width=150" },
                  { name: "Vitalcom", logo: "/brand/logos/vitalcom.png" },
                  { name: "Bioboosters", logo: "https://bioboosters.co/cdn/shop/files/Logo_Blanco.png?v=1758762956&width=290" },
                ].map((c) => (
                  <div
                    key={c.name}
                    className="w-9 h-9 rounded-full bg-gradient-to-br from-brand-yellow/20 to-brand-gold/10 border-2 border-brand-black flex items-center justify-center overflow-hidden"
                    title={c.name}
                  >
                    <img
                      src={c.logo}
                      alt={c.name}
                      loading="lazy"
                      className="w-full h-full object-contain p-1.5 brightness-0 invert opacity-80"
                    />
                  </div>
                ))}
                <div className="w-9 h-9 rounded-full bg-brand-yellow/10 border-2 border-brand-black flex items-center justify-center">
                  <span className="text-[10px] font-bold text-brand-yellow/60 font-sans">+</span>
                </div>
              </div>
              <p className="text-xs text-brand-gray">Marcas en Colombia y LATAM ya confían en nosotros</p>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
