"use client";

import { motion } from "motion/react";
import {
  AlertTriangle,
  CheckCircle2,
  Flame,
  Thermometer,
  Snowflake,
  ArrowRight,
  Calendar,
  MessageCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import type { AuditData } from "../AuditModal";
import type { LeadScore, AIDiagnosis } from "@/lib/lead-scoring";

interface Props {
  data: AuditData;
  score: LeadScore;
  diagnosis: AIDiagnosis;
  onBooking: () => void;
  onClose: () => void;
}

const WHATSAPP_NUMBER = "573132947776";

function getScoreColor(temp: string) {
  if (temp === "hot") return "text-orange-400";
  if (temp === "warm") return "text-brand-yellow";
  return "text-blue-400";
}

function getScoreIcon(temp: string) {
  if (temp === "hot") return Flame;
  if (temp === "warm") return Thermometer;
  return Snowflake;
}

function getScoreBg(temp: string) {
  if (temp === "hot") return "from-orange-500/20 to-red-500/10 border-orange-500/30";
  if (temp === "warm") return "from-brand-yellow/20 to-brand-gold/10 border-brand-yellow/30";
  return "from-blue-500/20 to-cyan-500/10 border-blue-500/30";
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

export function StepDiagnosis({ data, score, diagnosis, onBooking, onClose }: Props) {
  const ScoreIcon = getScoreIcon(score.temperature);
  const isHot = score.temperature === "hot";
  const isCold = score.temperature === "cold";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Score header */}
      <div className={`relative rounded-2xl border p-6 mb-6 bg-gradient-to-br ${getScoreBg(score.temperature)}`}>
        <div className="flex items-start justify-between gap-4">
          <div>
            <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-brand-gray">
              {diagnosis.headline}
            </span>
            <div className="flex items-baseline gap-3 mt-2">
              <span className={`font-display text-5xl ${getScoreColor(score.temperature)}`}>
                {score.total}
              </span>
              <span className="text-brand-gray text-sm">/100</span>
            </div>
            <p className="text-sm text-white font-medium mt-2">{diagnosis.score_label}</p>
          </div>
          <div className={`p-3 rounded-xl bg-black/30 ${getScoreColor(score.temperature)}`}>
            <ScoreIcon className="w-8 h-8" />
          </div>
        </div>

        {/* Score bar */}
        <div className="mt-4 h-2 w-full bg-black/30 rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-blue-500 via-brand-yellow to-orange-500"
            initial={{ width: 0 }}
            animate={{ width: `${score.total}%` }}
            transition={{ delay: 0.3, duration: 1, ease: "easeOut" }}
          />
        </div>
        <div className="flex justify-between text-[10px] text-brand-gray mt-1">
          <span>Bajo</span>
          <span>Alto potencial</span>
        </div>
      </div>

      {/* Gaps detected */}
      {diagnosis.gaps.length > 0 && (
        <div className="mb-6">
          <h4 className="flex items-center gap-2 text-xs font-semibold text-brand-gray uppercase tracking-wider mb-3">
            <AlertTriangle className="w-4 h-4 text-orange-400" />
            Brechas detectadas
          </h4>
          <div className="space-y-2">
            {diagnosis.gaps.map((gap, i) => (
              <motion.div
                key={i}
                className="flex gap-3 p-3 rounded-xl bg-orange-500/5 border border-orange-500/15 text-sm text-brand-gray"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + i * 0.1 }}
              >
                <span className="text-orange-400 font-bold text-xs mt-0.5">{i + 1}</span>
                <span>{gap}</span>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Recommendations */}
      <div className="mb-6">
        <h4 className="flex items-center gap-2 text-xs font-semibold text-brand-gray uppercase tracking-wider mb-3">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          Lo que te recomendamos
        </h4>
        <div className="space-y-2">
          {diagnosis.recommendations.map((rec, i) => (
            <motion.div
              key={i}
              className="flex gap-3 p-3 rounded-xl bg-emerald-500/5 border border-emerald-500/15 text-sm text-brand-gray"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 + i * 0.1 }}
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
              <span>{rec}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Urgency message */}
      <motion.p
        className="text-sm text-white font-medium mb-6 p-4 rounded-xl bg-white/[0.03] border border-white/10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        {diagnosis.urgency_message}
      </motion.p>

      {/* CTA section */}
      <motion.div
        className="space-y-3"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        <p className="text-xs text-brand-gray uppercase tracking-wider font-semibold mb-2">
          {diagnosis.cta_message}
        </p>

        {!isCold ? (
          <>
            {/* Hot/Warm: go to embedded calendar */}
            <Button
              size="xl"
              className="w-full gap-3"
              onClick={onBooking}
            >
              <Calendar className="w-5 h-5" />
              {isHot ? "Agendar llamada prioritaria" : "Agendar llamada de diagnóstico"}
              <ArrowRight className="w-5 h-5" />
            </Button>
            {isHot && (
              <p className="text-center text-[11px] text-brand-yellow">
                Tu score es alto — tienes slots prioritarios esta semana
              </p>
            )}
          </>
        ) : (
          /* Cold: WhatsApp follow-up */
          <Button
            size="lg"
            variant="outline"
            className="w-full gap-3"
            onClick={() => window.open(getWhatsAppUrl(data), "_blank")}
          >
            <MessageCircle className="w-5 h-5" />
            Escríbenos por WhatsApp
            <ArrowRight className="w-4 h-4" />
          </Button>
        )}

        {/* Secondary WhatsApp CTA for hot/warm */}
        {!isCold && (
          <button
            type="button"
            onClick={() => window.open(getWhatsAppUrl(data), "_blank")}
            className="w-full flex items-center justify-center gap-2 text-sm text-brand-gray hover:text-white transition-colors py-2"
          >
            <MessageCircle className="w-4 h-4" />
            O escríbenos por WhatsApp
          </button>
        )}

        <button
          type="button"
          onClick={onClose}
          className="w-full text-center text-xs text-brand-gray/60 hover:text-brand-gray transition-colors py-2 mt-2"
        >
          Cerrar
        </button>
      </motion.div>
    </motion.div>
  );
}
