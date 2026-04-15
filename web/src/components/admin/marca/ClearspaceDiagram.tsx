import Image from "next/image";

export function ClearspaceDiagram() {
  return (
    <div className="rounded-2xl border border-brand-gold/15 p-6 bg-white/[0.02]">
      <div className="text-[10px] font-semibold tracking-[0.2em] uppercase text-brand-gold mb-4">
        · Clearspace — Zona de respeto
      </div>

      <div className="relative bg-brand-black rounded-xl p-8 flex items-center justify-center">
        <svg
          viewBox="0 0 400 200"
          className="w-full h-auto max-w-md"
          aria-label="Diagrama de clearspace"
        >
          {/* Outer guide box */}
          <rect
            x="20"
            y="20"
            width="360"
            height="160"
            fill="none"
            stroke="#D4A017"
            strokeWidth="1"
            strokeDasharray="4 4"
            opacity="0.6"
          />
          {/* Inner frame */}
          <rect
            x="80"
            y="60"
            width="240"
            height="80"
            fill="none"
            stroke="#F9B334"
            strokeWidth="1.5"
          />
          {/* Logo placeholder */}
          <text
            x="200"
            y="108"
            textAnchor="middle"
            fill="#F9B334"
            fontFamily="Anton, Impact, sans-serif"
            fontSize="24"
          >
            [LOGO]
          </text>
          {/* X measurements */}
          <g fill="#BDBCBC" fontSize="11" fontFamily="monospace">
            <text x="200" y="46">X</text>
            <text x="52" y="104">X</text>
            <text x="345" y="104">X</text>
            <text x="200" y="166">X</text>
          </g>
          {/* Arrows */}
          <g stroke="#BDBCBC" strokeWidth="1">
            <line x1="200" y1="30" x2="200" y2="55" />
            <line x1="200" y1="145" x2="200" y2="170" />
            <line x1="30" y1="100" x2="75" y2="100" />
            <line x1="325" y1="100" x2="370" y2="100" />
          </g>
        </svg>
      </div>

      <p className="text-sm text-brand-gray mt-4 leading-relaxed">
        <strong className="text-white">X</strong> = altura del isotipo en el wordmark. Clearspace mínimo = 1× en todos los lados. Mínimo digital: 20px para logo horizontal, 24px para principal, 12px para isotipo.
      </p>
    </div>
  );
}
