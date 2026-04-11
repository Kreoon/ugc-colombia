import type { FAQItem } from "./home-faq";
import type { LucideIcon } from "lucide-react";
import {
  CreditCard,
  Clock,
  ArrowUpDown,
  XCircle,
  ShieldCheck,
  DollarSign,
  Plus,
  FileText,
  TrendingUp,
  Crown,
} from "lucide-react";

export interface PreciosFAQItem extends FAQItem {
  icon: LucideIcon;
}

export const PRECIOS_FAQS: PreciosFAQItem[] = [
  {
    question: "Cual es el modelo de pago?",
    answer:
      "Todos los planes son con pago anticipado. Los planes mensuales (Inicio, Crecimiento, Escala) se cobran al inicio de cada periodo via Stripe. El plan A la Medida se factura segun acuerdo comercial (pago unico, mensual o por hito). Aceptamos tarjeta internacional, transferencia USD/COP y facturacion electronica LATAM.",
    icon: CreditCard,
  },
  {
    question: "Hay permanencia minima?",
    answer:
      "Por defecto operan mes a mes, sin permanencia obligatoria. Si te comprometes a un contrato minimo de 3 meses bajamos el precio entre 8% y 15% segun el plan. Contratos de 6 o 12 meses escalan el descuento. Se habla en la llamada inicial.",
    icon: Clock,
  },
  {
    question: "Puedo cambiar de plan a mitad de mes?",
    answer:
      "Si. Si subes de plan (por ejemplo de Inicio a Crecimiento), el cambio es inmediato y pagas la diferencia prorrateada. Si bajas de plan, el cambio aplica al siguiente ciclo de facturacion. Sin penalidades.",
    icon: ArrowUpDown,
  },
  {
    question: "Puedo cancelar cuando quiera?",
    answer:
      "Si. Cancelas con 30 dias de aviso y no te volvemos a cobrar. Conservas todos los videos producidos hasta esa fecha, con sus derechos de publicidad pagada por 12 meses. No retenemos contenido ni hacemos clawback.",
    icon: XCircle,
  },
  {
    question: "Ofrecen garantia de devolucion?",
    answer:
      "Si. Tienes 7 dias de garantia desde el primer pago. Si durante la primera semana consideras que no encajamos con tu marca, te devolvemos el 100% del pago. Pasada esa ventana no hay reembolso, pero puedes cancelar al siguiente ciclo sin penalidad.",
    icon: ShieldCheck,
  },
  {
    question: "En que moneda se factura?",
    answer:
      "Los precios publicados son en USD. Facturamos en USD para marcas fuera de Colombia (pago con tarjeta internacional o transferencia). Para marcas colombianas facturamos en COP a la TRM del dia o USD a tu eleccion, con factura electronica DIAN. Todos los impuestos se manejan segun el pais de origen.",
    icon: DollarSign,
  },
  {
    question: "Que pasa si necesito mas videos un mes especifico?",
    answer:
      "En los planes mensuales puedes comprar 'extras' del mismo plan a precio unitario (por ejemplo, 5 videos extra en Crecimiento = $350 adicionales ese mes). Si necesitas un volumen mayor recurrente, conviene subir de tier. En llamada ajustamos.",
    icon: Plus,
  },
  {
    question: "Que incluye la licencia de publicidad de 12 meses?",
    answer:
      "Uso comercial para medios pagados (Meta Ads, TikTok Ads, Google Ads, YouTube Ads) por 12 meses desde la entrega del video. Si necesitas publicacion con tu marca, se negocia directamente con el creador teniendo en cuenta su engagement y seguidores. Derechos perpetuos o exclusividad por nicho se cotizan como complemento.",
    icon: FileText,
  },
  {
    question: "Puedo empezar con un paquete y escalar despues?",
    answer:
      "Si — de hecho es lo mas comun. La mayoria de marcas arranca con Inicio o Crecimiento por 1-3 meses para validar que el flujo funciona con su producto, y luego escala. El historico de briefs, creadores aprobados y aprendizaje queda dentro de la cuenta.",
    icon: TrendingUp,
  },
  {
    question: "Que hace diferente al plan A la Medida?",
    answer:
      "Equipo dedicado exclusivo, director creativo propio, SLA garantizado por contrato, entrega sin limites de variantes, integracion directa con tu equipo de paid media, panel en tiempo real y arranque ejecutivo con Alexander Cast. Es para empresas con presupuesto de paid +$20K/mes que necesitan una maquina de contenido corriendo todo el ano.",
    icon: Crown,
  },
];
