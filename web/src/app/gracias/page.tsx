import { Suspense } from "react";
import type { Metadata } from "next";
import { GraciasClient } from "./GraciasClient";

export const metadata: Metadata = {
  title: "Llamada confirmada — UGC Colombia",
  description: "Tu llamada de diagnóstico estratégico con UGC Colombia ha sido confirmada.",
};

export default function GraciasPage() {
  return (
    <Suspense>
      <GraciasClient />
    </Suspense>
  );
}
