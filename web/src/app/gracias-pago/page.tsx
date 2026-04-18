import { Suspense } from "react";
import type { Metadata } from "next";
import { GraciasPagoClient } from "./GraciasPagoClient";

export const metadata: Metadata = {
  title: "Gracias — Pago confirmado | UGC Colombia",
  description:
    "Tu suscripción está activa. Agenda tu llamada de kickoff y comencemos a producir contenido.",
  robots: { index: false, follow: false },
};

export default function GraciasPagoPage() {
  return (
    <Suspense>
      <GraciasPagoClient />
    </Suspense>
  );
}
