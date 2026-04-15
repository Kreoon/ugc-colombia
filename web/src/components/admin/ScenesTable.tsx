import { Film, Mic, Scissors, Camera, Zap } from 'lucide-react';

export interface Scene {
  id: number | string;
  time: string;
  visual: string;
  voice: string;
  creator_action?: string;
  editing: string;
  broll?: string[];
}

interface ScenesTableProps {
  scenes: Scene[];
}

export function ScenesTable({ scenes }: ScenesTableProps) {
  if (!scenes || scenes.length === 0) {
    return (
      <div className="rounded-2xl bg-white/[0.02] border border-white/8 p-10 text-center">
        <Zap className="w-10 h-10 text-brand-yellow/40 mx-auto mb-3" aria-hidden />
        <p className="text-brand-gray text-sm">
          Este guion aún no tiene escenas estructuradas.
          <br />
          Se genera con regeneración por IA (pendiente Fase 2).
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <header className="flex items-center gap-3">
        <Zap className="w-5 h-5 text-brand-yellow" aria-hidden />
        <div>
          <h3 className="font-display text-lg uppercase text-white">
            Escena por escena
          </h3>
          <p className="text-xs text-brand-gray">
            Cambios visuales cada 1-3s · {scenes.length} beats · ritmo dopamínico
          </p>
        </div>
      </header>

      <div className="overflow-x-auto rounded-2xl border border-brand-gold/15 bg-white/[0.02]">
        <table className="min-w-full divide-y divide-white/5">
          <thead>
            <tr className="bg-brand-yellow/5">
              <Th>#</Th>
              <Th>
                <Film className="inline w-3.5 h-3.5 mr-1" aria-hidden />
                Visual
              </Th>
              <Th>
                <Mic className="inline w-3.5 h-3.5 mr-1" aria-hidden />
                Voz · Creador
              </Th>
              <Th>
                <Scissors className="inline w-3.5 h-3.5 mr-1" aria-hidden />
                Edición
              </Th>
              <Th>
                <Camera className="inline w-3.5 h-3.5 mr-1" aria-hidden />
                B-roll
              </Th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {scenes.map((s, idx) => (
              <tr
                key={s.id ?? idx}
                className="odd:bg-white/[0.01] hover:bg-brand-yellow/5 transition-colors align-top"
              >
                <td className="px-3 py-4 whitespace-nowrap">
                  <div className="flex flex-col items-center gap-1">
                    <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-brand-yellow text-black font-display text-xs">
                      {idx + 1}
                    </span>
                    <span className="text-[10px] font-mono text-brand-yellow/80 whitespace-nowrap">
                      {s.time}
                    </span>
                  </div>
                </td>
                <td className="px-3 py-4 text-sm text-white/95 max-w-xs">
                  {s.visual}
                </td>
                <td className="px-3 py-4 text-sm max-w-xs">
                  <p className="italic text-white/90 mb-1">
                    {s.voice ? `"${s.voice}"` : '—'}
                  </p>
                  {s.creator_action && (
                    <p className="text-[11px] text-brand-yellow/70 leading-snug">
                      ▸ {s.creator_action}
                    </p>
                  )}
                </td>
                <td className="px-3 py-4 text-xs text-brand-gray max-w-xs leading-snug">
                  {s.editing}
                </td>
                <td className="px-3 py-4 max-w-[14rem]">
                  {s.broll && s.broll.length > 0 ? (
                    <ul className="flex flex-col gap-1.5">
                      {s.broll.map((b, i) => (
                        <li
                          key={i}
                          className="inline-flex items-start gap-1.5 text-[11px] text-white/80 bg-white/5 border border-white/8 rounded-md px-2 py-1"
                        >
                          <Camera
                            className="w-3 h-3 text-brand-yellow/80 flex-shrink-0 mt-0.5"
                            aria-hidden
                          />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <span className="text-[11px] text-brand-gray/60">—</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-[11px] text-brand-gray/70 italic">
        Cada fila = 1 corte. Retención dopamínica: nunca más de 3s sin
        cambio visual.
      </p>
    </div>
  );
}

function Th({ children }: { children: React.ReactNode }) {
  return (
    <th
      scope="col"
      className="px-3 py-3 text-left text-[10px] font-semibold uppercase tracking-[0.15em] text-brand-yellow/80"
    >
      {children}
    </th>
  );
}
