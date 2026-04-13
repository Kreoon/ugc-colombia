"use client";

import { useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Loader2 } from "lucide-react";
import { SurveyQuestion, OptionCard } from "./shared";
import { getNextQuestion, getProgressLabel, buildAuditFromQuiz } from "@/lib/quiz-engine";
import { getInsight } from "@/lib/funnel-insights";
import { brandAuditSchema } from "@/lib/validations/lead-audit";
import { buildAuditFromAIQuiz, type AIAnswer, type AIQuizQuestion } from "@/lib/quiz-ai";
import type { BrandAudit, BrandInfo } from "@/lib/validations/lead-audit";

const MAX_QUESTIONS = 6;

interface Props {
  brandInfo?: BrandInfo;
  onSubmit: (data: BrandAudit, askedFields?: Set<string>) => void;
  onBack: () => void;
}

export function StepBrandAudit({ brandInfo, onSubmit, onBack }: Props) {
  const [questionNumber, setQuestionNumber] = useState(1);
  const [answers, setAnswers] = useState<AIAnswer[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<AIQuizQuestion | null>(null);
  const [showInsight, setShowInsight] = useState<{ text: string; emoji: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const isAdvancingRef = useRef(false);
  const pendingQuestionRef = useRef<AIQuizQuestion | null>(null);
  const insightTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Q1 is static (biggest_pain from quiz-engine)
  const staticQ1 = getNextQuestion({}, 0)!;
  const isFirstQuestion = questionNumber === 1;
  const displayQuestion = isFirstQuestion ? staticQ1 : currentQuestion;

  const totalEstimate = Math.max(MAX_QUESTIONS, questionNumber);

  // ─── Fetch next question from Gemini ───────────────────────────────

  async function fetchNextQuestion(updatedAnswers: AIAnswer[]): Promise<AIQuizQuestion | null> {
    try {
      const res = await fetch("/api/quiz-next", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          brand_name: brandInfo?.company_name || "",
          industry: brandInfo?.industry || "",
          instagram_handle: brandInfo?.instagram_handle || "",
          website: brandInfo?.website || "",
          answers_so_far: updatedAnswers.map(a => ({
            question_number: a.question_number,
            question: a.question,
            answer_value: a.answer_value,
            answer_label: a.answer_label,
            maps_to: a.maps_to,
          })),
          question_number: updatedAnswers.length + 1,
        }),
      });

      if (!res.ok) return null;
      return await res.json();
    } catch {
      return null;
    }
  }

  // ─── Get static fallback question ──────────────────────────────────

  function getStaticFallback(answersObj: Record<string, string>, idx: number): AIQuizQuestion | null {
    const q = getNextQuestion(answersObj, idx);
    if (!q) return null;
    return {
      question: q.question,
      hint: q.hint || "",
      options: q.options.map(o => ({
        value: o.value,
        label: o.label,
        sublabel: o.sublabel,
        maps_to: q.key,
        maps_value: o.value,
      })),
      insight_for_previous: { text: "", emoji: "" },
      is_last: false,
      pain_level: "medium",
    };
  }

  // ─── Handle answer selection ───────────────────────────────────────

  const handleSelect = useCallback((value: string, label: string, mapsTo: string, mapsValue: string) => {
    if (isAdvancingRef.current) return;
    isAdvancingRef.current = true;

    const question = isFirstQuestion ? staticQ1.question : currentQuestion?.question || "";

    const newAnswer: AIAnswer = {
      question_number: questionNumber,
      question,
      answer_value: value,
      answer_label: label,
      maps_to: mapsTo,
      maps_value: mapsValue,
    };

    const updatedAnswers = [...answers, newAnswer];
    setAnswers(updatedAnswers);

    // Check if quiz should end
    const shouldEnd = questionNumber >= MAX_QUESTIONS;

    if (shouldEnd) {
      finishQuiz(updatedAnswers);
      return;
    }

    // Get insight for this answer
    const staticInsight = isFirstQuestion ? getInsight("biggest_pain", value) : null;
    const aiInsight = !isFirstQuestion && currentQuestion?.insight_for_previous?.text
      ? currentQuestion.insight_for_previous
      : null;
    const insight = aiInsight || staticInsight;

    // Start fetching next question in parallel
    const fetchPromise = fetchNextQuestion(updatedAnswers);

    if (insight?.text) {
      setShowInsight(insight);

      // Wait for insight to finish, then show next question
      insightTimeoutRef.current = setTimeout(async () => {
        setShowInsight(null);

        const aiQuestion = pendingQuestionRef.current || await fetchPromise;

        if (aiQuestion?.is_last) {
          // Gemini says we should end
          finishQuiz(updatedAnswers);
          return;
        }

        if (aiQuestion && aiQuestion.options?.length >= 2) {
          setCurrentQuestion(aiQuestion);
          setQuestionNumber(questionNumber + 1);
        } else {
          // Fallback to static
          const answersObj: Record<string, string> = {};
          for (const a of updatedAnswers) answersObj[a.maps_to] = a.maps_value;
          const fallback = getStaticFallback(answersObj, updatedAnswers.length);
          if (fallback) {
            setCurrentQuestion(fallback);
            setQuestionNumber(questionNumber + 1);
          } else {
            finishQuiz(updatedAnswers);
          }
        }
        isAdvancingRef.current = false;
        pendingQuestionRef.current = null;
      }, 1800);

      // Pre-resolve fetch while insight is showing
      fetchPromise.then(q => {
        pendingQuestionRef.current = q;
      });
    } else {
      // No insight — show loading briefly, then next question
      setIsLoading(true);
      fetchPromise.then(aiQuestion => {
        setIsLoading(false);

        if (aiQuestion?.is_last) {
          finishQuiz(updatedAnswers);
          return;
        }

        if (aiQuestion && aiQuestion.options?.length >= 2) {
          setCurrentQuestion(aiQuestion);
          setQuestionNumber(questionNumber + 1);
        } else {
          const answersObj: Record<string, string> = {};
          for (const a of updatedAnswers) answersObj[a.maps_to] = a.maps_value;
          const fallback = getStaticFallback(answersObj, updatedAnswers.length);
          if (fallback) {
            setCurrentQuestion(fallback);
            setQuestionNumber(questionNumber + 1);
          } else {
            finishQuiz(updatedAnswers);
          }
        }
        isAdvancingRef.current = false;
      });
    }
  }, [answers, questionNumber, isFirstQuestion, currentQuestion, staticQ1, brandInfo]);

  // ─── Finish quiz ───────────────────────────────────────────────────

  function finishQuiz(finalAnswers: AIAnswer[]) {
    const { audit, askedFields } = buildAuditFromAIQuiz(finalAnswers);
    const parsed = brandAuditSchema.safeParse(audit);
    if (parsed.success) {
      onSubmit(parsed.data, askedFields);
    } else {
      // Fallback: try with static builder
      const answersObj: Record<string, string> = {};
      for (const a of finalAnswers) answersObj[a.maps_to] = a.maps_value;
      const fallbackAudit = buildAuditFromQuiz(answersObj);
      const fallbackParsed = brandAuditSchema.safeParse(fallbackAudit);
      onSubmit(
        fallbackParsed.success ? fallbackParsed.data : audit as unknown as BrandAudit,
        askedFields
      );
    }
    isAdvancingRef.current = false;
  }

  // ─── Skip insight ──────────────────────────────────────────────────

  function skipInsight() {
    if (insightTimeoutRef.current) {
      clearTimeout(insightTimeoutRef.current);
      insightTimeoutRef.current = null;
    }
    setShowInsight(null);
    // If we have a pending question, show it
    if (pendingQuestionRef.current) {
      const q = pendingQuestionRef.current;
      pendingQuestionRef.current = null;
      if (q.is_last) {
        finishQuiz(answers);
      } else {
        setCurrentQuestion(q);
        setQuestionNumber(questionNumber + 1);
      }
      isAdvancingRef.current = false;
    } else {
      setIsLoading(true);
    }
  }

  // ─── Back ──────────────────────────────────────────────────────────

  function handleBack() {
    if (showInsight) { skipInsight(); return; }
    if (isAdvancingRef.current || isLoading) return;

    if (questionNumber > 1) {
      const prev = answers.slice(0, -1);
      setAnswers(prev);
      setQuestionNumber(questionNumber - 1);
      if (questionNumber === 2) {
        setCurrentQuestion(null); // Back to static Q1
      }
    } else {
      onBack();
    }
  }

  if (!displayQuestion && !isLoading) return null;

  // ─── Render ────────────────────────────────────────────────────────

  const progressLabel = getProgressLabel(questionNumber - 1, totalEstimate);

  return (
    <div>
      {/* Progress */}
      <div className="mb-5">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[11px] font-sans text-brand-gray/50">{progressLabel}</span>
          <span className="text-[11px] font-sans text-brand-gray/30">{questionNumber}/{MAX_QUESTIONS}</span>
        </div>
        <div className="h-0.5 w-full bg-white/8 rounded-full overflow-hidden" role="progressbar" aria-valuenow={questionNumber} aria-valuemax={MAX_QUESTIONS}>
          <motion.div
            className="h-full bg-brand-yellow/60 rounded-full"
            animate={{ width: `${(questionNumber / MAX_QUESTIONS) * 100}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        {showInsight ? (
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
            <p className="text-sm sm:text-base text-brand-gray leading-relaxed max-w-md">{showInsight.text}</p>
            <p className="text-[11px] text-brand-gray/30 mt-4">Toca para continuar</p>
          </motion.button>
        ) : isLoading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center min-h-[200px] py-8"
          >
            <Loader2 className="w-6 h-6 text-brand-yellow animate-spin mb-3" />
            <p className="text-sm text-brand-gray/60">Analizando tu respuesta...</p>
          </motion.div>
        ) : displayQuestion ? (
          <SurveyQuestion
            key={`q-${questionNumber}`}
            question={displayQuestion.question}
            hint={"hint" in displayQuestion ? (displayQuestion as any).hint : undefined}
            onBack={handleBack}
            showSubmit={false}
          >
            <div className="space-y-2" role="radiogroup" aria-label={displayQuestion.question}>
              {displayQuestion.options.map((opt) => (
                <OptionCard
                  key={opt.value}
                  selected={false}
                  onClick={() => handleSelect(
                    opt.value,
                    opt.label,
                    "maps_to" in opt ? (opt as any).maps_to : (displayQuestion as any).key || "biggest_pain",
                    "maps_value" in opt ? (opt as any).maps_value : opt.value,
                  )}
                  label={opt.label}
                  sublabel={opt.sublabel}
                />
              ))}
            </div>
          </SurveyQuestion>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
