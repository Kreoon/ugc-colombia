import type { Metadata } from "next";
import { DiagnosticoClient } from "./DiagnosticoClient";

export const metadata: Metadata = {
  title: "Diagnóstico Gratis con IA — UGC Colombia",
  description:
    "Descubre qué falta en tu marketing para que tus ads conviertan. Diagnóstico gratis con IA en 5 minutos. Después agenda una llamada sin costo con nuestro equipo.",
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: "https://www.ugccolombia.co/diagnostico",
  },
};

export default function DiagnosticoPage() {
  return <DiagnosticoClient />;
}
