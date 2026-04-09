import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility para componer clases Tailwind sin conflictos.
 * Combina clsx (condicionales) + tailwind-merge (deduplicación).
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
