"use client";

import { motion } from "motion/react";
import { Building2, Camera } from "lucide-react";

interface StepTypeProps {
  onSelect: (type: "marca" | "creador") => void;
}

const options = [
  {
    type: "marca" as const,
    icon: Building2,
    title: "Soy una marca",
    description: "Busco creadores de contenido UGC para mi marca o negocio",
  },
  {
    type: "creador" as const,
    icon: Camera,
    title: "Soy creador/a",
    description: "Quiero crear contenido UGC para marcas y ganar dinero",
  },
];

export function StepType({ onSelect }: StepTypeProps) {
  return (
    <div className="flex flex-col items-center text-center">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-yellow/10 border border-brand-yellow/30 text-[10px] font-semibold text-brand-yellow tracking-[0.2em] uppercase mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-yellow animate-pulse" />
          Diagnóstico gratuito
        </span>
        <h2 className="font-display text-2xl sm:text-3xl text-white uppercase tracking-tight mb-2">
          Cuéntanos sobre ti
        </h2>
        <p className="text-sm text-brand-gray max-w-md mb-8">
          En menos de 2 minutos obtendrás un diagnóstico personalizado con IA
          sobre tu estrategia de contenido.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
        {options.map((opt, i) => (
          <motion.button
            key={opt.type}
            type="button"
            onClick={() => onSelect(opt.type)}
            className="group relative flex flex-col items-center gap-4 p-6 rounded-2xl border border-white/10 bg-white/[0.03] text-left transition-all hover:border-brand-gold/40 hover:bg-brand-yellow/[0.04] hover:shadow-[0_0_30px_rgba(212,160,23,0.1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="w-14 h-14 rounded-xl bg-brand-yellow/10 border border-brand-yellow/20 flex items-center justify-center transition-colors group-hover:bg-brand-yellow/20">
              <opt.icon className="w-7 h-7 text-brand-yellow" />
            </div>
            <div className="text-center">
              <p className="font-sans font-bold text-white text-base mb-1">{opt.title}</p>
              <p className="text-xs text-brand-gray leading-relaxed">{opt.description}</p>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
