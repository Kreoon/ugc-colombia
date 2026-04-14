"use client";

import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import { Building2, Camera } from "lucide-react";
import { useAudit } from "../AuditContext";

interface StepTypeProps {
  onSelect: (type: "marca" | "creador") => void;
}

export function StepType({ onSelect }: StepTypeProps) {
  const router = useRouter();
  const { closeAudit } = useAudit();

  function handleCreator() {
    closeAudit();
    router.push("/registro");
  }

  return (
    <div className="flex flex-col items-center text-center">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-yellow/10 border border-brand-yellow/30 text-[10px] font-semibold text-brand-yellow tracking-[0.2em] uppercase mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-yellow animate-pulse" />
          Aplicación de partnership
        </span>
        <h2 className="font-sans text-xl sm:text-2xl text-white font-bold mb-2">
          Aplica para ser partner de UGC Colombia
        </h2>
        <p className="text-sm text-brand-gray/70 max-w-md mb-4">
          Revisamos cada aplicación en 24h. Si completas tu aplicación hoy, obtienes{" "}
          <span className="text-brand-yellow font-semibold">30% de descuento</span> en tu primer mes de partnership.
        </p>
        <div className="flex flex-col gap-1.5 mb-6 text-left max-w-sm">
          <div className="flex items-center gap-2 text-xs text-brand-gray">
            <span className="w-4 h-4 rounded-full bg-brand-yellow/15 flex items-center justify-center text-[10px] text-brand-yellow font-bold">1</span>
            Análisis con IA de tu marca — insights accionables
          </div>
          <div className="flex items-center gap-2 text-xs text-brand-gray">
            <span className="w-4 h-4 rounded-full bg-brand-yellow/15 flex items-center justify-center text-[10px] text-brand-yellow font-bold">2</span>
            Llamada de 30 min con un estratega — solo si tu marca encaja
          </div>
          <div className="flex items-center gap-2 text-xs text-brand-gray">
            <span className="w-4 h-4 rounded-full bg-brand-yellow/15 flex items-center justify-center text-[10px] text-brand-yellow font-bold">3</span>
            Propuesta de partnership personalizada con descuento activo
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
        <motion.button
          type="button"
          onClick={() => onSelect("marca")}
          className="group relative flex flex-col items-center gap-4 p-6 rounded-2xl border border-white/10 bg-white/[0.03] text-left transition-all hover:border-brand-gold/40 hover:bg-brand-yellow/[0.04] hover:shadow-[0_0_30px_rgba(212,160,23,0.1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="w-14 h-14 rounded-xl bg-brand-yellow/10 border border-brand-yellow/20 flex items-center justify-center transition-colors group-hover:bg-brand-yellow/20">
            <Building2 className="w-7 h-7 text-brand-yellow" />
          </div>
          <div className="text-center">
            <p className="font-sans font-bold text-white text-base mb-1">Soy una marca</p>
            <p className="text-xs text-brand-gray leading-relaxed">Quiero contenido UGC para mi marca o negocio</p>
          </div>
        </motion.button>

        <motion.button
          type="button"
          onClick={handleCreator}
          className="group relative flex flex-col items-center gap-4 p-6 rounded-2xl border border-white/10 bg-white/[0.03] text-left transition-all hover:border-brand-gold/40 hover:bg-brand-yellow/[0.04] hover:shadow-[0_0_30px_rgba(212,160,23,0.1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="w-14 h-14 rounded-xl bg-brand-yellow/10 border border-brand-yellow/20 flex items-center justify-center transition-colors group-hover:bg-brand-yellow/20">
            <Camera className="w-7 h-7 text-brand-yellow" />
          </div>
          <div className="text-center">
            <p className="font-sans font-bold text-white text-base mb-1">Soy creador/a</p>
            <p className="text-xs text-brand-gray leading-relaxed">Quiero ganar dinero creando contenido para marcas</p>
          </div>
        </motion.button>
      </div>
    </div>
  );
}
