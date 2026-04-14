import { requireAuth } from "@/lib/auth";

export const dynamic = "force-dynamic";

const CARDS = [
  {
    label: "Manual de Marca",
    href: "/admin/marca",
    desc: "Colores, tipografía, logo, UI",
  },
  {
    label: "Parrilla de Contenido",
    href: "/admin/viralidad/parrilla",
    desc: "IG, TikTok, frecuencia diaria",
  },
  {
    label: "Packs Virales",
    href: "/admin/packs",
    desc: "Guiones por miembro del equipo",
  },
  {
    label: "Calendarios Q3",
    href: "/admin/viralidad/calendarios",
    desc: "Julio · Agosto · Septiembre",
  },
  {
    label: "Benchmark",
    href: "/admin/viralidad/benchmark",
    desc: "25 referentes virales",
  },
  {
    label: "Diagnósticos",
    href: "/admin/diagnosticos",
    desc: "CRM de leads y prospectos",
  },
] as const;

export default async function AdminHome() {
  const user = await requireAuth();
  const firstName = user.fullName?.split(" ")[0] ?? "equipo";

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Encabezado */}
      <div className="mb-10">
        <div className="text-brand-yellow text-[10px] font-semibold tracking-[0.25em] uppercase mb-3">
          · Dashboard
        </div>
        <h1 className="font-display text-5xl uppercase text-white leading-none">
          Hola,{" "}
          <span className="bg-gradient-to-r from-brand-yellow via-brand-gold to-brand-yellow bg-clip-text text-transparent">
            {firstName}.
          </span>
        </h1>
        <p className="text-brand-gray mt-3 text-sm max-w-xl">
          Este es el sistema interno de UGC Colombia. Toda la operación en un
          solo lugar.
        </p>
      </div>

      {/* Cards de acceso rápido */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {CARDS.map((card) => (
          <a
            key={card.href}
            href={card.href}
            className="group block p-6 rounded-2xl bg-white/[0.04] border border-brand-gold/15 hover:border-brand-yellow/50 hover:bg-white/[0.06] transition-all"
          >
            <div className="font-display text-xl uppercase text-white group-hover:text-brand-yellow transition-colors mb-1 leading-tight">
              {card.label}
            </div>
            <div className="text-sm text-brand-gray">{card.desc}</div>
          </a>
        ))}
      </div>
    </div>
  );
}
