import type { Metadata } from "next";
import { AgendarClient } from "./AgendarClient";

export const metadata: Metadata = {
  title: "Agendar llamada gratuita — UGC Colombia",
  description: "Agenda tu llamada estratégica de 30 minutos gratis con un especialista en contenido UGC.",
};

export default function AgendarPage() {
  return <AgendarClient />;
}
