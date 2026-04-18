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
      "Por defecto operan mes a mes, sin permanencia obligatoria. Si te comprometes a un contrato mínimo de 3 meses bajamos el precio entre 8% y 15% según el plan. Contratos de 6 o 12 meses tienen un descuento aún mayor. Lo conversamos en la llamada inicial.",
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
      "La pagina detecta tu pais y te muestra los precios en tu moneda local (USD por defecto, COP en Colombia). Puedes cambiar la moneda en cualquier momento desde el selector en el menu superior. Para marcas fuera de Colombia facturamos en USD (tarjeta internacional o transferencia). Para marcas colombianas facturamos en COP a la TRM del dia o USD a tu eleccion, con factura electronica DIAN. Los impuestos se manejan segun el pais de origen.",
    icon: DollarSign,
  },
  {
    question: "Que pasa si necesito mas videos un mes especifico?",
    answer:
      "En los planes mensuales puedes comprar videos extra del mismo plan, a precio unitario proporcional al plan contratado. Por ejemplo, en Crecimiento el costo por video adicional equivale al precio del plan dividido entre los 10 videos base. Si necesitas un volumen mayor de forma recurrente, conviene subir de nivel. Lo ajustamos en la llamada.",
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
      "Sí — de hecho es lo más común. La mayoría de marcas arranca con Inicio o Crecimiento por 1 a 3 meses para validar que el flujo funciona con su producto, y luego sube de plan. El histórico de instructivos, creadores aprobados y aprendizajes queda guardado dentro de tu cuenta.",
    icon: TrendingUp,
  },
  {
    question: "Que hace diferente al plan A la Medida?",
    answer:
      "Equipo dedicado exclusivo, director creativo propio, acuerdos de servicio garantizados por contrato, entrega sin límites de variantes, integración directa con tu equipo de medios pagados, panel en tiempo real y arranque ejecutivo con Alexander Cast. Es para empresas con presupuesto en publicidad pagada de más de $20.000 USD (~$80 millones COP) al mes, que necesitan una máquina de contenido corriendo todo el año.",
    icon: Crown,
  },
];
