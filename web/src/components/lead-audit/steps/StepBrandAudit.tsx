"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { SurveyQuestion, OptionCard } from "./shared";
import { getNextQuestion, getTotalQuestions, getProgressLabel, buildAuditFromQuiz } from "@/lib/quiz-engine";
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

  const currentQ = getNextQuestion(answers, qIndex);
  const totalQ = getTotalQuestions(answers);
  const progressLabel = getProgressLabel(qIndex, totalQ);

  const handleSelect = useCallback(
    (value: string) => {
      if (!currentQ) return;

      const updated = { ...answers, [currentQ.key]: value };
      setAnswers(updated);

      // Show micro-insight
      const insight = getInsight(currentQ.key, value);
      if (insight) {
        setShowInsight(insight);

        // After 2.5s, advance to next question or submit
        setTimeout(() => {
          setShowInsight(null);
          setTimeout(() => {
            const nextQ = getNextQuestion(updated, qIndex + 1);
            if (nextQ) {
              setQIndex(qIndex + 1);
            } else {
              // Quiz complete — submit
              const auditData = buildAuditFromQuiz(updated);
              const parsed = brandAuditSchema.safeParse(auditData);
              if (parsed.success) onSubmit(parsed.data);
            }
          }, 100);
        }, 2500);
      } else {
        // No insight — advance after short delay
        setTimeout(() => {
          const nextQ = getNextQuestion(updated, qIndex + 1);
          if (nextQ) {
            setQIndex(qIndex + 1);
          } else {
            const auditData = buildAuditFromQuiz(updated);
            const parsed = brandAuditSchema.safeParse(auditData);
            if (parsed.success) onSubmit(parsed.data);
          }
        }, 300);
      }
    },
    [answers, currentQ, qIndex, onSubmit]
  );

  function handleBack() {
    if (showInsight) return; // Don't allow back during insight
    if (qIndex > 0) {
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
        <div className="h-0.5 w-full bg-white/8 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-brand-yellow/60 rounded-full"
            animate={{ width: `${((qIndex + 1) / totalQ) * 100}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        {showInsight ? (
          /* Micro-insight screen */
          <motion.div
            key="insight"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center justify-center text-center min-h-[200px] py-8"
          >
            <span className="text-4xl mb-4">{showInsight.emoji}</span>
            <p className="text-sm sm:text-base text-brand-gray leading-relaxed max-w-md">
              {showInsight.text}
            </p>
            <div className="mt-4 flex gap-1">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-1.5 h-1.5 rounded-full bg-brand-yellow/40"
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
                />
              ))}
            </div>
          </motion.div>
        ) : (
          /* Question screen */
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
        )}
      </AnimatePresence>
    </div>
  );
}
