"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import { trackAuditOpen, trackAuditTypeSelect } from "@/lib/tracking/events";

export type LeadTypeValue = "marca" | "creador" | null;

interface OpenAuditOptions {
  source?: string;
  prefillType?: "marca" | "creador";
}

interface AuditContextType {
  isOpen: boolean;
  prefillType: "marca" | "creador" | null;
  openAudit: (sourceOrOptions?: string | OpenAuditOptions) => void;
  closeAudit: () => void;
  consumePrefillType: () => "marca" | "creador" | null;
}

const AuditContext = createContext<AuditContextType | null>(null);

export function AuditProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [prefillType, setPrefillType] = useState<"marca" | "creador" | null>(null);

  const openAudit = useCallback(
    (sourceOrOptions?: string | OpenAuditOptions) => {
      const options: OpenAuditOptions =
        typeof sourceOrOptions === "string"
          ? { source: sourceOrOptions }
          : sourceOrOptions ?? {};
      trackAuditOpen(options.source ?? "unknown");
      if (options.prefillType) {
        trackAuditTypeSelect(options.prefillType);
        setPrefillType(options.prefillType);
      } else {
        setPrefillType(null);
      }
      setIsOpen(true);
    },
    [],
  );

  const closeAudit = useCallback(() => {
    setIsOpen(false);
    setPrefillType(null);
  }, []);

  const consumePrefillType = useCallback(() => {
    const value = prefillType;
    setPrefillType(null);
    return value;
  }, [prefillType]);

  return (
    <AuditContext
      value={{ isOpen, prefillType, openAudit, closeAudit, consumePrefillType }}
    >
      {children}
    </AuditContext>
  );
}

export function useAudit() {
  const ctx = useContext(AuditContext);
  if (!ctx) throw new Error("useAudit must be used within AuditProvider");
  return ctx;
}
