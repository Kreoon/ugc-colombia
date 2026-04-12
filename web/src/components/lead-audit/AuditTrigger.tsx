"use client";

import { useAudit } from "./AuditContext";
import type { ReactNode, MouseEvent } from "react";

interface AuditTriggerProps {
  children: ReactNode;
  className?: string;
  as?: "button" | "a";
}

/**
 * Wraps any element to open the audit modal on click.
 * Use as="a" when replacing an existing <a> tag to keep the same DOM structure.
 */
export function AuditTrigger({
  children,
  className,
  as = "button",
}: AuditTriggerProps) {
  const { openAudit } = useAudit();

  function handleClick(e: MouseEvent) {
    e.preventDefault();
    openAudit();
  }

  const Comp = as;

  return (
    <Comp
      onClick={handleClick}
      className={className}
      {...(as === "a" ? { href: "#diagnostico", role: "button" } : { type: "button" })}
    >
      {children}
    </Comp>
  );
}
