import {
  Building2,
  Target,
  Film,
  Palette,
  Scissors,
  FileText,
} from "lucide-react";
import { requireAuth } from "@/lib/auth";
import { PageHero, AdminCard, AdminGrid, Eyebrow } from "@/components/admin/ui";
import { identity } from "./marca/_data/identity";

const CARDS = [
  {
    label: "Identidad Corporativa",
    href: "/admin/empresa/identidad",
    desc: "Misión, visión, valores y PUV",
    icon: Building2,
  },
  {
    label: "Estrategia & OKRs",
    href: "/admin/empresa/estrategia",
    desc: "OKRs 2026, roadmap y KPIs",
    icon: Target,
  },
  {
    label: "Contenido & Viralidad",
    href: "/admin/contenido",
    desc: "Guiones, parrilla, packs, publicados",
    icon: Film,
  },
  {
    label: "Manual de Marca",
    href: "/admin/marca",
    desc: "Colores, tipografía, logo, UI",
    icon: Palette,
  },
  {
    label: "Cola Valentina",
    href: "/admin/contenido/valentina",
    desc: "Dashboard editora de planta",
    icon: Scissors,
  },
  {
    label: "Diagnósticos",
    href: "/admin/diagnosticos",
    desc: "CRM de leads y prospectos",
    icon: FileText,
  },
] as const;

export default async function AdminHome() {
  const user = await requireAuth();
  const firstName = user.fullName?.split(" ")[0] ?? "equipo";

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
      <PageHero
        eyebrow="Dashboard interno"
        title={`Hola, ${firstName}.`}
        lead="Sistema interno de UGC Colombia. Toda la operación en un solo lugar — estrategia, contenido, marca, CRM y equipo."
      />

      {/* Propósito — propuesta de valor */}
      <div className="mb-12 rounded-2xl border-2 border-brand-yellow/40 bg-gradient-to-br from-brand-yellow/10 to-brand-gold/5 p-6 sm:p-8">
        <Eyebrow variant="yellow" className="mb-3">
          Propósito oficial
        </Eyebrow>
        <div className="font-display uppercase text-2xl sm:text-3xl lg:text-4xl leading-tight">
          <span
            className="bg-clip-text text-transparent"
            style={{
              backgroundImage:
                "linear-gradient(90deg, #F9B334 0%, #D4A017 50%, #F9B334 100%)",
            }}
          >
            {identity.propuestaDeValor}
          </span>
        </div>
        <p className="text-sm text-brand-gray mt-3 leading-relaxed">
          Guía toda nuestra comunicación. Revísala antes de escribir copy, producir
          contenido o enviar propuestas.
        </p>
      </div>

      {/* Accesos rápidos */}
      <div className="mb-6">
        <Eyebrow className="mb-2">Accesos rápidos</Eyebrow>
        <h2 className="font-display uppercase text-white text-2xl sm:text-3xl">
          Por dónde empezar.
        </h2>
      </div>

      <AdminGrid cols={3}>
        {CARDS.map((card) => (
          <AdminCard
            key={card.href}
            href={card.href}
            icon={card.icon}
            title={card.label}
            desc={card.desc}
          />
        ))}
      </AdminGrid>
    </div>
  );
}
