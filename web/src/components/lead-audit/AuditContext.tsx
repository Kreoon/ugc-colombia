"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import { trackAuditOpen } from "@/lib/tracking/events";

interface AuditContextType {
  isOpen: boolean;
  openAudit: (source?: string) => void;
  closeAudit: () => void;
}

const AuditContext = createContext<AuditContextType | null>(null);

export function AuditProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openAudit = useCallback((source?: string) => {
    trackAuditOpen(source ?? "unknown");
    setIsOpen(true);
  }, []);
  const closeAudit = useCallback(() => setIsOpen(false), []);

  return (
    <AuditContext value={{ isOpen, openAudit, closeAudit }}>
      {children}
    </AuditContext>
  );
}

export function useAudit() {
  const ctx = useContext(AuditContext);
  if (!ctx) throw new Error("useAudit must be used within AuditProvider");
  return ctx;
}
