"use client";

import { useState, useCallback } from "react";
import { AnimatePresence } from "motion/react";
import { SurveyQuestion, OptionCard } from "./shared";
import type { BrandAudit } from "@/lib/validations/lead-audit";
import { brandAuditSchema } from "@/lib/validations/lead-audit";

// ─── Survey questions config ─────────────────────────────────────────────────

interface QuestionConfig {
  key: string;
  question: string;
  hint?: string;
  options: Array<{ value: string; label: string; sublabel?: string }>;
}

const QUESTIONS: QuestionConfig[] = [
  {
    key: "biggest_pain",
    question: "¿Cuál es tu mayor frustración con el contenido de tu marca?",
    hint: "Elige la que más te identifique — esto define el enfoque de tu diagnóstico.",
    options: [
      { value: "no_tengo_contenido", label: "No tengo contenido de calidad", sublabel: "Necesito empezar desde cero o casi" },
      { value: "contenido_no_convierte", label: "Mi contenido no genera ventas", sublabel: "Publico pero no veo resultados en ingresos" },
      { value: "muy_caro", label: "Producir contenido es muy caro", sublabel: "Los costos se comen mi margen" },
      { value: "no_encuentro_creadores", label: "No encuentro buenos creadores", sublabel: "Es un dolor encontrar gente confiable" },
      { value: "inconsistencia", label: "No soy consistente publicando", sublabel: "Empiezo con fuerza y luego me pierdo" },
      { value: "no_se_que_hacer", label: "No sé por dónde empezar", sublabel: "Estoy perdido/a con tantas opciones" },
    ],
  },
  {
    key: "ad_budget",
    question: "¿Cuánto inviertes en publicidad digital al mes?",
    hint: "Meta Ads, Google Ads, TikTok Ads — todo cuenta.",
    options: [
      { value: "nada", label: "$0 — No invierto en ads" },
      { value: "menos_500", label: "Menos de $500 USD/mes" },
      { value: "500_1000", label: "$500 - $1,000 USD/mes" },
      { value: "1000_3000", label: "$1,000 - $3,000 USD/mes" },
      { value: "3000_5000", label: "$3,000 - $5,000 USD/mes" },
      { value: "mas_5000", label: "Más de $5,000 USD/mes" },
    ],
  },
  {
    key: "content_budget",
    question: "¿Y cuánto inviertes en producción de contenido?",
    hint: "Videos, fotos, diseño, creadores, agencia — lo que sea.",
    options: [
      { value: "nada", label: "$0 — No invierto en contenido" },
      { value: "menos_500", label: "Menos de $500 USD/mes" },
      { value: "500_1000", label: "$500 - $1,000 USD/mes" },
      { value: "1000_3000", label: "$1,000 - $3,000 USD/mes" },
      { value: "3000_5000", label: "$3,000 - $5,000 USD/mes" },
      { value: "mas_5000", label: "Más de $5,000 USD/mes" },
    ],
  },
  {
    key: "has_active_ads",
    question: "¿Tienes anuncios activos corriendo en este momento?",
    options: [
      { value: "true", label: "Sí, tengo ads corriendo", sublabel: "En Meta, Google, TikTok u otra plataforma" },
      { value: "false", label: "No, no tengo ads activos", sublabel: "Actualmente no estoy pautando" },
    ],
  },
  {
    key: "current_ctr",
    question: "¿Cuál es tu CTR promedio en anuncios?",
    hint: "Si no lo sabes, no te preocupes — eso ya nos dice algo importante.",
    options: [
      { value: "no_se", label: "No sé / No mido", sublabel: "No tengo claro este dato" },
      { value: "menos_1", label: "Menos de 1%", sublabel: "La gente no hace clic en mis ads" },
      { value: "1_2", label: "Entre 1% y 2%", sublabel: "Decente pero quiero mejorar" },
      { value: "mas_2", label: "Más de 2%", sublabel: "Mis ads funcionan bien en clics" },
    ],
  },
  {
    key: "creative_age_weeks",
    question: "¿Hace cuánto produjiste tu último video para ads o redes?",
    hint: "La frescura del contenido impacta directamente en tus resultados.",
    options: [
      { value: "menos_2", label: "Menos de 2 semanas" },
      { value: "2_4", label: "2 a 4 semanas" },
      { value: "4_8", label: "1 a 2 meses" },
      { value: "mas_8", label: "Más de 2 meses", sublabel: "Tus creativos probablemente están fatigados" },
      { value: "no_tengo", label: "Nunca he producido video", sublabel: "No tengo creativos de video" },
    ],
  },
  {
    key: "monthly_content_pieces",
    question: "¿Cuántas piezas de contenido produces al mes?",
    hint: "Reels, posts, carruseles, stories con diseño — todo cuenta.",
    options: [
      { value: "0", label: "Ninguna", sublabel: "No estoy produciendo contenido" },
      { value: "1_3", label: "1 a 3 piezas" },
      { value: "4_8", label: "4 a 8 piezas" },
      { value: "9_15", label: "9 a 15 piezas" },
      { value: "mas_15", label: "Más de 15 piezas", sublabel: "Tengo una operación activa" },
    ],
  },
  {
    key: "urgency",
    question: "¿Qué tan urgente es resolver tu contenido?",
    hint: "Esto nos ayuda a priorizar tu diagnóstico.",
    options: [
      { value: "inmediata", label: "Lo necesito ya", sublabel: "Cada semana sin contenido nuevo me cuesta dinero" },
      { value: "este_mes", label: "Quiero arrancar este mes", sublabel: "Tengo la decisión tomada" },
      { value: "proximo_trimestre", label: "En el próximo trimestre", sublabel: "Estoy planeando con tiempo" },
      { value: "explorando", label: "Solo estoy explorando", sublabel: "Quiero ver qué opciones hay" },
    ],
  },
];

const TOTAL_Q = QUESTIONS.length;

// ─── Component ───────────────────────────────────────────────────────────────

interface Props {
  onSubmit: (data: BrandAudit) => void;
  onBack: () => void;
}

export function StepBrandAudit({ onSubmit, onBack }: Props) {
  const [qIndex, setQIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const currentQ = QUESTIONS[qIndex];

  const handleSelect = useCallback(
    (value: string) => {
      const updated = { ...answers, [currentQ.key]: value };
      setAnswers(updated);

      // Auto-advance after a brief delay (feels intentional)
      setTimeout(() => {
        if (qIndex < TOTAL_Q - 1) {
          setQIndex(qIndex + 1);
        } else {
          // Last question — submit
          const parsed = buildAuditData(updated);
          if (parsed) onSubmit(parsed);
        }
      }, 300);
    },
    [answers, currentQ.key, qIndex, onSubmit]
  );

  function handleBack() {
    if (qIndex > 0) {
      setQIndex(qIndex - 1);
    } else {
      onBack();
    }
  }

  return (
    <div>
      {/* Thin progress bar — no numbers */}
      <div className="h-0.5 w-full bg-white/8 rounded-full overflow-hidden mb-6">
        <div
          className="h-full bg-brand-yellow/60 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${((qIndex + 1) / TOTAL_Q) * 100}%` }}
        />
      </div>

      <AnimatePresence mode="wait">
        <SurveyQuestion
          key={currentQ.key}
          question={currentQ.question}
          hint={currentQ.hint}
          onBack={handleBack}
          showSubmit={false}
        >
          <div className="space-y-2">
            {currentQ.options.map((opt) => (
              <OptionCard
                key={opt.value}
                selected={answers[currentQ.key] === opt.value}
                onClick={() => handleSelect(opt.value)}
                label={opt.label}
                sublabel={opt.sublabel}
              />
            ))}
          </div>
        </SurveyQuestion>
      </AnimatePresence>
    </div>
  );
}

// ─── Build audit data from answers ───────────────────────────────────────────

function buildAuditData(answers: Record<string, string>): BrandAudit | null {
  const data = {
    ad_budget: answers.ad_budget,
    content_budget: answers.content_budget,
    has_active_ads: answers.has_active_ads === "true",
    current_ctr: answers.current_ctr,
    creative_age_weeks: answers.creative_age_weeks,
    monthly_content_pieces: answers.monthly_content_pieces,
    biggest_pain: answers.biggest_pain,
    urgency: answers.urgency,
  };

  const result = brandAuditSchema.safeParse(data);
  return result.success ? result.data : null;
}
