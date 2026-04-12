"use client";

import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useAudit } from "./AuditContext";
import { StepType } from "./steps/StepType";
import { StepBrandInfo } from "./steps/StepBrandInfo";
import { StepCreatorInfo } from "./steps/StepCreatorInfo";
import { StepBrandAudit } from "./steps/StepBrandAudit";
import { StepCreatorAudit } from "./steps/StepCreatorAudit";
import { StepContact } from "./steps/StepContact";
import { StepDiagnosis } from "./steps/StepDiagnosis";
import type {
  BrandInfo,
  CreatorInfo,
  BrandAudit,
  CreatorAudit,
  ContactInfo,
} from "@/lib/validations/lead-audit";
import type { LeadScore, AIDiagnosis } from "@/lib/lead-scoring";

export type LeadTypeValue = "marca" | "creador" | null;

export interface AuditData {
  lead_type: LeadTypeValue;
  brand_info?: BrandInfo;
  creator_info?: CreatorInfo;
  brand_audit?: BrandAudit;
  creator_audit?: CreatorAudit;
  contact?: ContactInfo;
  score?: LeadScore;
  diagnosis?: AIDiagnosis;
}

const TOTAL_STEPS_BRAND = 5;
const TOTAL_STEPS_CREATOR = 5;

export function AuditModal() {
  const { isOpen, closeAudit } = useAudit();
  const [step, setStep] = useState(0);
  const [data, setData] = useState<AuditData>({ lead_type: null });

  const totalSteps = data.lead_type === "creador" ? TOTAL_STEPS_CREATOR : TOTAL_STEPS_BRAND;

  function handleReset() {
    setStep(0);
    setData({ lead_type: null });
  }

  function handleClose() {
    closeAudit();
    // Reset after animation
    setTimeout(handleReset, 300);
  }

  function handleTypeSelect(type: "marca" | "creador") {
    setData({ ...data, lead_type: type });
    setStep(1);
  }

  function handleBrandInfo(info: BrandInfo) {
    setData({ ...data, brand_info: info });
    setStep(2);
  }

  function handleCreatorInfo(info: CreatorInfo) {
    setData({ ...data, creator_info: info });
    setStep(2);
  }

  function handleBrandAudit(audit: BrandAudit) {
    setData({ ...data, brand_audit: audit });
    setStep(3);
  }

  function handleCreatorAudit(audit: CreatorAudit) {
    setData({ ...data, creator_audit: audit });
    setStep(3);
  }

  function handleContact(contact: ContactInfo, score: LeadScore, diagnosis: AIDiagnosis) {
    setData({ ...data, contact, score, diagnosis });
    setStep(4);
  }

  function goBack() {
    if (step > 0) setStep(step - 1);
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto p-0">
        {/* Progress bar */}
        {step > 0 && step < totalSteps && (
          <div className="px-6 pt-6">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[11px] font-sans font-semibold text-brand-gray tracking-wider uppercase">
                Paso {step} de {totalSteps - 1}
              </span>
            </div>
            <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-brand-yellow to-brand-gold rounded-full transition-all duration-500 ease-out"
                style={{ width: `${(step / (totalSteps - 1)) * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* Steps */}
        <div className="p-6">
          {step === 0 && <StepType onSelect={handleTypeSelect} />}

          {step === 1 && data.lead_type === "marca" && (
            <StepBrandInfo onSubmit={handleBrandInfo} onBack={goBack} />
          )}
          {step === 1 && data.lead_type === "creador" && (
            <StepCreatorInfo onSubmit={handleCreatorInfo} onBack={goBack} />
          )}

          {step === 2 && data.lead_type === "marca" && (
            <StepBrandAudit onSubmit={handleBrandAudit} onBack={goBack} />
          )}
          {step === 2 && data.lead_type === "creador" && (
            <StepCreatorAudit onSubmit={handleCreatorAudit} onBack={goBack} />
          )}

          {step === 3 && (
            <StepContact data={data} onSubmit={handleContact} onBack={goBack} />
          )}

          {step === 4 && data.score && data.diagnosis && (
            <StepDiagnosis
              data={data}
              score={data.score}
              diagnosis={data.diagnosis}
              onClose={handleClose}
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
