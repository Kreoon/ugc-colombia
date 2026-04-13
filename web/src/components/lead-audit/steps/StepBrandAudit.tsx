"use client";

import { useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { SurveyQuestion, OptionCard } from "./shared";
import { getNextQuestion, getTotalQuestions, getProgressLabel, getQuizPath, buildAuditFromQuiz } from "@/lib/quiz-engine";
import { getInsight } from "@/lib/funnel-insights";
import { brandAuditSchema } from "@/lib/validations/lead-audit";
import type { BrandAudit } from "@/lib/validations/lead-audit";

interface Props {
  onSubmit: (data: BrandAudit) => void;
  onBack: () => void;
}

export function StepBrandAudit({ onSubmit, onBack }: Props) {
  const [qIndex, setQIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showInsight, setShowInsight] = useState<{ text: string; emoji: string } | null>(null);
  const isAdvancingRef = useRef(false);
  const insightTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const currentQ = getNextQuestion(answers, qIndex);
  const totalQ = getTotalQuestions(answers);
  const progressLabel = getProgressLabel(qIndex, totalQ);

  const handleSelect = useCallback(
    (value: string) => {
      if (!currentQ || isAdvancingRef.current) return;
      isAdvancingRef.current = true;

      const updated = { ...answers, [currentQ.key]: value };

      // Si cambió biggest_pain, limpiar respuestas del path anterior
      if (currentQ.key === "biggest_pain" && answers.biggest_pain && answers.biggest_pain !== value) {
        const oldPath = getQuizPath(answers);
        const newPath = getQuizPath({ biggest_pain: value });
        // Borrar respuestas de preguntas que ya no están en el nuevo path
        for (const key of oldPath) {
          if (key !== "biggest_pain" && !newPath.includes(key)) {
            delete updated[key];
          }
        }
      }

      setAnswers(updated);

      // Show micro-insight
      const insight = getInsight(currentQ.key, value);

      function advance() {
        const nextQ = getNextQuestion(updated, qIndex + 1);
        if (nextQ) {
          setQIndex(qIndex + 1);
        } else {
          // Quiz complete
          const auditData = buildAuditFromQuiz(updated);
          const parsed = brandAuditSchema.safeParse(auditData);
          if (parsed.success) {
            onSubmit(parsed.data);
          } else {
            console.error("[quiz] Validation failed:", parsed.error.issues);
            // Fallback: submit anyway with defaults
            onSubmit(auditData as BrandAudit);
          }
        }
        isAdvancingRef.current = false;
      }

      if (insight) {
        setShowInsight(insight);
        insightTimeoutRef.current = setTimeout(() => {
          setShowInsight(null);
          setTimeout(advance, 100);
        }, 1800);
      } else {
        setTimeout(advance, 350);
      }
    },
    [answers, currentQ, qIndex, onSubmit]
  );

  function skipInsight() {
    if (insightTimeoutRef.current) {
      clearTimeout(insightTimeoutRef.current);
      insightTimeoutRef.current = null;
    }
    setShowInsight(null);
    // Advance after clearing insight
    const nextQ = getNextQuestion(answers, qIndex + 1);
    if (nextQ) {
      setQIndex(qIndex + 1);
    }
    isAdvancingRef.current = false;
  }

  function handleBack() {
    if (showInsight) {
      skipInsight();
      return;
    }
    if (isAdvancingRef.current) return;

    if (qIndex > 0) {
      // Limpiar la respuesta de la pregunta actual al retroceder
      const currentKey = currentQ?.key;
      if (currentKey && answers[currentKey] !== undefined) {
        const cleaned = { ...answers };
        delete cleaned[currentKey];
        setAnswers(cleaned);
      }
      setQIndex(qIndex - 1);
    } else {
      onBack();
    }
  }

  if (!currentQ) return null;

  return (
    <div>
      {/* Progress bar + label */}
      <div className="mb-5">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[11px] font-sans text-brand-gray/50">
            {progressLabel}
          </span>
          <span className="text-[11px] font-sans text-brand-gray/30">
            {qIndex + 1}/{totalQ}
          </span>
        </div>
        <div className="h-0.5 w-full bg-white/8 rounded-full overflow-hidden" role="progressbar" aria-valuenow={qIndex + 1} aria-valuemin={1} aria-valuemax={totalQ}>
          <motion.div
            className="h-full bg-brand-yellow/60 rounded-full"
            animate={{ width: `${((qIndex + 1) / totalQ) * 100}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        {showInsight ? (
          /* Micro-insight screen — clickable to skip */
          <motion.button
            key="insight"
            type="button"
            onClick={skipInsight}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="flex flex-col items-center justify-center text-center min-h-[200px] py-8 w-full cursor-pointer"
            aria-live="polite"
          >
            <span className="text-4xl mb-4">{showInsight.emoji}</span>
            <p className="text-sm sm:text-base text-brand-gray leading-relaxed max-w-md">
              {showInsight.text}
            </p>
            <p className="text-[11px] text-brand-gray/30 mt-4">
              Toca para continuar
            </p>
          </motion.button>
        ) : (
          /* Question screen */
          <SurveyQuestion
            key={currentQ.key}
            question={currentQ.question}
            hint={currentQ.hint}
            onBack={handleBack}
            showSubmit={false}
          >
            <div className="space-y-2" role="radiogroup" aria-label={currentQ.question}>
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
        )}
      </AnimatePresence>
    </div>
  );
}
