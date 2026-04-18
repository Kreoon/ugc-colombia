import { Suspense } from "react";
import type { Metadata } from "next";
import { KickoffClient } from "./KickoffClient";

export const metadata: Metadata = {
  title: "Agenda tu reunión de inicio — UGC Colombia",
  description:
    "Reserva tu reunión de arranque con tu coordinador de cuenta. 30 minutos para alinear objetivos y dejar listo el calendario de producción.",
  robots: { index: false, follow: false },
};

export default function KickoffPage() {
  return (
    <Suspense>
      <KickoffClient />
    </Suspense>
  );
}
