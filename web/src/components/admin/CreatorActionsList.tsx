import { User, Eye } from 'lucide-react';
import type { Scene } from './ScenesTable';

interface CreatorActionsListProps {
  scenes: Scene[];
}

export function CreatorActionsList({ scenes }: CreatorActionsListProps) {
  const withActions = scenes.filter((s) => s.creator_action);

  if (!scenes || scenes.length === 0 || withActions.length === 0) {
    return (
      <div className="rounded-2xl bg-white/[0.02] border border-white/8 p-10 text-center">
        <User className="w-10 h-10 text-brand-yellow/40 mx-auto mb-3" aria-hidden />
        <p className="text-brand-gray text-sm">
          Aún no hay actuaciones descritas por escena.
          <br />
          Se completa al regenerar con IA.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <header className="flex items-center gap-3">
        <User className="w-5 h-5 text-brand-yellow" aria-hidden />
        <div>
          <h3 className="font-display text-lg uppercase text-white">
            Actuación del creador
          </h3>
          <p className="text-xs text-brand-gray">
            Guía de expresiones, mirada, manos y cuerpo — escena por escena.
          </p>
        </div>
      </header>

      <ol className="space-y-3">
        {withActions.map((s, idx) => (
          <li
            key={s.id ?? idx}
            className="rounded-2xl bg-white/[0.04] border border-brand-gold/15 p-5 flex gap-4"
          >
            <div className="flex-shrink-0 flex flex-col items-center gap-2 pt-1">
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-brand-yellow text-black font-display text-xs">
                {idx + 1}
              </span>
              <span className="text-[10px] font-mono text-brand-yellow/80">
                {s.time}
              </span>
            </div>
            <div className="flex-1 min-w-0 space-y-3">
              <div>
                <div className="text-[10px] uppercase tracking-widest text-brand-yellow/70 mb-1 flex items-center gap-1">
                  <Eye className="w-3 h-3" aria-hidden />
                  Qué hace ante la cámara
                </div>
                <p className="text-sm text-white/95 leading-relaxed">
                  {s.creator_action}
                </p>
              </div>

              {s.voice && (
                <div>
                  <div className="text-[10px] uppercase tracking-widest text-brand-gray mb-1">
                    Línea a decir
                  </div>
                  <p className="text-sm italic text-white/80">
                    “{s.voice}”
                  </p>
                </div>
              )}
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
