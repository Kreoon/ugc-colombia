import { Compass, Eye, Sparkles } from 'lucide-react';

const HERO_CARDS = [
  {
    label: 'Misión',
    icon: Compass,
    body: 'Conectar marcas con audiencias reales a través de contenido auténtico, estratégico y medible.',
  },
  {
    label: 'Visión 2028',
    icon: Eye,
    body: 'Ser la agencia boutique de contenido UGC y estrategia digital más influyente del mercado hispano.',
  },
  {
    label: 'Tagline',
    icon: Sparkles,
    body: 'Contenido que Convierte. Resultados que Perduran.',
  },
] as const;

export function EmpresaHero() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {HERO_CARDS.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.label}
              className="relative overflow-hidden rounded-2xl p-6 bg-gradient-to-br from-brand-yellow/15 via-white/[0.04] to-transparent border border-brand-gold/30"
            >
              <Icon
                className="w-6 h-6 text-brand-yellow mb-3"
                aria-hidden="true"
              />
              <div className="text-[10px] font-semibold tracking-[0.25em] uppercase text-brand-yellow mb-2">
                {card.label}
              </div>
              <p className="text-white/90 text-sm leading-relaxed">
                {card.body}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
