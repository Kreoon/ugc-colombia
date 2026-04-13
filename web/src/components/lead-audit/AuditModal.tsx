"use client";

import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { getAskedFields } from "@/lib/quiz-engine";
import { useAudit } from "./AuditContext";
import { StepType } from "./steps/StepType";
import { StepBrandInfo } from "./steps/StepBrandInfo";
import { StepCreatorInfo } from "./steps/StepCreatorInfo";
import { StepBrandAudit } from "./steps/StepBrandAudit";
import { StepCreatorAudit } from "./steps/StepCreatorAudit";
import { StepContact } from "./steps/StepContact";
import { StepDiagnosis } from "./steps/StepDiagnosis";
import { StepBooking } from "./steps/StepBooking";
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
  lead_id?: string;
  early_diagnosis_key?: string;
  asked_fields?: Set<string>;
  brand_info?: BrandInfo;
  creator_info?: CreatorInfo;
  brand_audit?: BrandAudit;
  creator_audit?: CreatorAudit;
  contact?: ContactInfo;
  score?: LeadScore;
  diagnosis?: AIDiagnosis;
}

// Steps: 0=type, 1=info, 2=audit, 3=contact, 4=diagnosis, 5=booking

export function AuditModal() {
  const { isOpen, closeAudit } = useAudit();
  const [step, setStep] = useState(0);
  const [data, setData] = useState<AuditData>({ lead_type: null });

  function handleReset() {
    setStep(0);
    setData({ lead_type: null });
  }

  function handleClose() {
    closeAudit();
    setTimeout(handleReset, 300);
  }

  function handleTypeSelect(type: "marca" | "creador") {
    setData({ ...data, lead_type: type });
    setStep(1);
  }

  function handleBrandInfo(info: BrandInfo) {
    const handle = info.instagram_handle?.replace(/^@/, "").trim();
    const key = handle || info.company_name.toLowerCase().replace(/\s+/g, "-");
    setData({ ...data, brand_info: info, early_diagnosis_key: key });
    setStep(2);
  }

  function handleCreatorInfo(info: CreatorInfo) {
    setData({ ...data, creator_info: info });
    setStep(2);
  }

  function handleBrandAudit(audit: BrandAudit) {
    const asked = getAskedFields(audit as unknown as Record<string, string>);
    setData({ ...data, brand_audit: audit, asked_fields: asked });
    setStep(3);
  }

  function handleCreatorAudit(audit: CreatorAudit) {
    setData({ ...data, creator_audit: audit });
    setStep(3);
  }

  function handleContact(contact: ContactInfo, score: LeadScore, diagnosis: AIDiagnosis, leadId?: string) {
    setData({ ...data, contact, score, diagnosis, lead_id: leadId });
    setStep(4);
  }

  function goToBooking() {
    setStep(5);
  }

  function goBack() {
    if (step > 0) setStep(step - 1);
  }

  // Wider modal for booking step (calendar iframe needs space)
  const isBookingStep = step === 5;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent
        className={cn(
          "max-h-[90vh] overflow-y-auto p-0 transition-[max-width] duration-300",
          isBookingStep ? "max-w-3xl" : "max-w-2xl"
        )}
      >
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
              onBooking={goToBooking}
              onClose={handleClose}
            />
          )}

          {step === 5 && data.score && (
            <StepBooking
              data={data}
              score={data.score}
              onBack={() => setStep(4)}
              onClose={handleClose}
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
