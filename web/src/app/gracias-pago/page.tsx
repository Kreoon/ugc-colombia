import { Suspense } from "react";
import type { Metadata } from "next";
import { GraciasPagoClient } from "./GraciasPagoClient";

export const metadata: Metadata = {
  title: "Gracias — Pago confirmado | UGC Colombia",
  description:
    "Tu plan está activo. Agenda tu reunión de inicio con Brian y arrancamos a producir contenido esta semana.",
  robots: { index: false, follow: false },
};

export default function GraciasPagoPage() {
  return (
    <Suspense>
      <GraciasPagoClient />
    </Suspense>
  );
}
