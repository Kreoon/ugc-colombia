'use client';

import { useState } from 'react';
import {
  Film,
  Camera,
  Crown,
  Zap,
  History,
  Radio,
  Loader2,
  Plus,
} from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { MarkdownRenderer } from './MarkdownRenderer';
import { ScenesTable, type Scene } from './ScenesTable';
import type {
  ContentScript,
  ContentPublication,
  ContentScriptEvent,
  TeamMemberLite,
} from '@/lib/admin/content-dal';
import {
  SCRIPT_STATUSES,
  SCRIPT_STATUS_META,
  type ScriptStatus,
  SCRIPT_PLATFORM_LABEL,
} from '@/lib/admin/script-status';

interface ScriptTabsProps {
  script: ContentScript;
  publications: ContentPublication[];
  events: ContentScriptEvent[];
  team: TeamMemberLite[];
  originalMd: string | null;
  humanizedMd: string | null;
  scenes: Scene[];
}

const TAB_ORDER = [
  { value: 'escenas', label: 'Escenas', Icon: Film },
  { value: 'broll', label: 'B-roll', Icon: Camera },
  { value: 'premium', label: 'Premium', Icon: Crown },
  { value: 'dopaminico', label: 'Dopamínico', Icon: Zap },
  { value: 'estado', label: 'Estado', Icon: History },
  { value: 'publicaciones', label: 'Publicaciones', Icon: Radio },
] as const;

export function ScriptTabs({
  script,
  publications,
  events,
  team,
  originalMd,
  humanizedMd,
  scenes,
}: ScriptTabsProps) {
  const [currentScript, setCurrentScript] = useState(script);
  const [saving, setSaving] = useState<string | null>(null);

  const teamById = new Map(team.map((t) => [t.id, t]));
  const editor = currentScript.assigned_editor
    ? teamById.get(currentScript.assigned_editor)
    : null;

  async function patchScript(patch: Record<string, unknown>, indicator: string) {
    setSaving(indicator);
    try {
      const res = await fetch(`/api/admin/scripts/${currentScript.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(patch),
      });
      if (!res.ok) throw new Error(await res.text());
      const { script: updated } = await res.json();
      setCurrentScript(updated);
    } catch (err) {
      console.error(err);
      alert('Error guardando cambio');
    } finally {
      setSaving(null);
    }
  }

  return (
    <div className="space-y-8">
      {/* Barra superior: Status + Editor + Checks */}
      <header className="rounded-2xl bg-white/[0.04] border border-brand-gold/15 p-5">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Field label="Status">
            <select
              value={currentScript.status}
              onChange={(e) =>
                patchScript({ status: e.target.value as ScriptStatus }, 'status')
              }
              disabled={saving === 'status'}
              className="w-full bg-black border border-brand-gold/20 rounded-lg px-3 py-2 text-sm text-white focus:border-brand-yellow/50 outline-none"
            >
              {SCRIPT_STATUSES.map((s) => (
                <option key={s} value={s}>
                  {SCRIPT_STATUS_META[s].icon} {SCRIPT_STATUS_META[s].label}
                </option>
              ))}
            </select>
          </Field>

          <Field label="Editor asignado">
            <select
              value={currentScript.assigned_editor ?? ''}
              onChange={(e) =>
                patchScript(
                  { assigned_editor: e.target.value || null },
                  'assigned_editor',
                )
              }
              disabled={saving === 'assigned_editor'}
              className="w-full bg-black border border-brand-gold/20 rounded-lg px-3 py-2 text-sm text-white focus:border-brand-yellow/50 outline-none"
            >
              <option value="">— Sin asignar —</option>
              {team
                .filter((t) => t.content_specialty === 'edition' || t.role === 'creative')
                .map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.full_name}
                  </option>
                ))}
            </select>
            {editor?.content_specialty && (
              <p className="text-[10px] text-brand-yellow/80 mt-1 uppercase tracking-wider">
                {editor.content_specialty}
              </p>
            )}
          </Field>

          <Field label="Creador asignado">
            <select
              value={currentScript.assigned_creator ?? ''}
              onChange={(e) =>
                patchScript(
                  { assigned_creator: e.target.value || null },
                  'assigned_creator',
                )
              }
              disabled={saving === 'assigned_creator'}
              className="w-full bg-black border border-brand-gold/20 rounded-lg px-3 py-2 text-sm text-white focus:border-brand-yellow/50 outline-none"
            >
              <option value="">— Sin asignar —</option>
              {team.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.full_name}
                </option>
              ))}
            </select>
          </Field>

          <Field label="Progreso">
            <div className="flex flex-wrap gap-2">
              <CheckToggle
                label="Grabado"
                on={currentScript.recorded}
                saving={saving === 'recorded'}
                onToggle={() =>
                  patchScript({ recorded: !currentScript.recorded }, 'recorded')
                }
              />
              <CheckToggle
                label="Editado"
                on={currentScript.edited}
                saving={saving === 'edited'}
                onToggle={() =>
                  patchScript({ edited: !currentScript.edited }, 'edited')
                }
              />
              <CheckToggle
                label="Publicado"
                on={currentScript.published}
                saving={saving === 'published'}
                onToggle={() =>
                  patchScript({ published: !currentScript.published }, 'published')
                }
              />
            </div>
          </Field>
        </div>
      </header>

      {/* Tabs */}
      <Tabs defaultValue="escenas">
        <div className="overflow-x-auto pb-2">
          <TabsList className="flex-nowrap">
            {TAB_ORDER.map(({ value, label, Icon }) => (
              <TabsTrigger key={value} value={value}>
                <Icon className="w-3.5 h-3.5" aria-hidden />
                {label}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        <TabsContent value="escenas">
          <ScenesTable scenes={scenes} />
        </TabsContent>

        <TabsContent value="broll">
          <BrollView md={originalMd} />
        </TabsContent>

        <TabsContent value="premium">
          <PremiumView />
        </TabsContent>

        <TabsContent value="dopaminico">
          <DopaminicoView
            script={currentScript}
            onUpdate={async (patch) => {
              await patchScript(patch, 'dopamine_checklist');
            }}
          />
        </TabsContent>

        <TabsContent value="estado">
          <EstadoView
            script={currentScript}
            events={events}
            teamById={teamById}
          />
        </TabsContent>

        <TabsContent value="publicaciones">
          <PublicacionesView
            script={currentScript}
            publications={publications}
            team={team}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-brand-yellow/80 mb-2">
        {label}
      </label>
      {children}
    </div>
  );
}

function CheckToggle({
  label,
  on,
  saving,
  onToggle,
}: {
  label: string;
  on: boolean;
  saving: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      onClick={onToggle}
      disabled={saving}
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-[10px] font-semibold uppercase tracking-wider transition-all disabled:opacity-50 ${
        on
          ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-400 hover:bg-emerald-500/25'
          : 'bg-white/5 border-white/10 text-brand-gray hover:text-white hover:border-white/30'
      }`}
    >
      {saving ? (
        <Loader2 className="w-3 h-3 animate-spin" />
      ) : on ? (
        '✓'
      ) : (
        '○'
      )}
      {label}
    </button>
  );
}

// ──────────────────────────────────────────────────────────
// Tab: Estructura (deprecated — conservado por si se quiere reusar)
// ──────────────────────────────────────────────────────────

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function EstructuraView({ script }: { script: ContentScript }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <InfoCard
        title="Hook"
        subtitle="Primeros 3 segundos — captura y promete"
      >
        <p className="text-lg text-white italic leading-relaxed">
          {script.hook ? `“${script.hook}”` : 'Sin hook definido.'}
        </p>
      </InfoCard>

      <InfoCard title="Duración objetivo" subtitle="Formato atomizado">
        <p className="text-4xl font-display text-brand-yellow">
          {script.duration_seconds ? `${script.duration_seconds}s` : '—'}
        </p>
      </InfoCard>

      <InfoCard title="Plataforma" subtitle="Canal principal">
        <p className="text-xl text-white">
          {script.platform ? SCRIPT_PLATFORM_LABEL[script.platform] : '—'}
        </p>
      </InfoCard>

      <InfoCard title="Pilar de contenido" subtitle="Rol dentro del mix editorial">
        <p className="text-xl text-white capitalize">
          {script.pillar?.replace('_', ' ') ?? '—'}
        </p>
      </InfoCard>

      <InfoCard
        title="Loop cerrado"
        subtitle="¿El final engancha al principio?"
        wide
      >
        <p className="text-sm text-brand-gray">
          Revisa el tab <span className="text-brand-yellow">Guion Visual</span>{' '}
          y asegúrate de que la última línea devuelve al espectador al hook
          para replay orgánico.
        </p>
      </InfoCard>
    </div>
  );
}

function InfoCard({
  title,
  subtitle,
  children,
  wide,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  wide?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl bg-white/[0.04] border border-brand-gold/15 p-5 ${
        wide ? 'lg:col-span-2' : ''
      }`}
    >
      <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-brand-yellow/80 mb-2">
        {title}
      </div>
      {subtitle && <p className="text-xs text-brand-gray mb-3">{subtitle}</p>}
      {children}
    </div>
  );
}

// ──────────────────────────────────────────────────────────
// Tab: Voz
// ──────────────────────────────────────────────────────────

function VozView({
  script: _script,
  md,
}: {
  script: ContentScript;
  md: string | null;
}) {
  const prosodyBlock =
    md?.match(/(?:##?\s*)?Prosody[\s\S]*?(?=\n#{1,3} |$)/i)?.[0] ?? null;

  return (
    <div className="space-y-4">
      <div className="rounded-2xl bg-white/[0.04] border border-brand-gold/15 p-5">
        <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-brand-yellow/80 mb-2">
          Voiceover oficial
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <Stat label="Voz" value="Cristian Sanchez" />
          <Stat label="Acento" value="Paisa colombiano" />
          <Stat label="Motor" value="ElevenLabs" />
        </div>
      </div>

      {prosodyBlock ? (
        <div className="rounded-2xl bg-white/[0.02] border border-white/8 p-6 overflow-x-auto">
          <MarkdownRenderer content={prosodyBlock} />
        </div>
      ) : (
        <div className="rounded-2xl bg-white/[0.02] border border-white/8 p-6 text-brand-gray text-sm">
          El guion no tiene sección de prosody. Agrega tags ElevenLabs en el MD
          fuente para controlar ritmo, énfasis y pausas.
        </div>
      )}
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-white/5 border border-white/8 p-3">
      <div className="text-[10px] uppercase tracking-widest text-brand-gray mb-1">
        {label}
      </div>
      <div className="text-sm text-white font-medium">{value}</div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────
// Tab: B-roll
// ──────────────────────────────────────────────────────────

function BrollView({ md }: { md: string | null }) {
  const brollMatch = md?.match(/(?:##?\s*)?B-?roll[\s\S]*?(?=\n#{1,3} |$)/i);

  return (
    <div className="rounded-2xl bg-white/[0.02] border border-white/8 p-6 overflow-x-auto">
      {brollMatch ? (
        <MarkdownRenderer content={brollMatch[0]} />
      ) : (
        <div className="text-brand-gray text-sm space-y-2">
          <p>El guion no tiene sección B-roll específica.</p>
          <p>
            Agrega un bloque <code>## B-roll</code> en el MD con: fuente
            (stock/propio/IA), tipo de toma, y marcas de tiempo.
          </p>
        </div>
      )}
    </div>
  );
}

// ──────────────────────────────────────────────────────────
// Tab: Premium
// ──────────────────────────────────────────────────────────

function PremiumView() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <InfoCard title="Tipografía" subtitle="Design tokens UGC Colombia">
        <ul className="text-sm text-brand-gray space-y-1">
          <li>
            <span className="text-white font-display uppercase">Anton</span> —
            títulos, hooks, stats
          </li>
          <li>
            <span className="text-white font-sans">Inter</span> — subtítulos y
            cuerpo
          </li>
        </ul>
      </InfoCard>

      <InfoCard title="Paleta" subtitle="Contrast-safe 4.5:1+">
        <div className="flex gap-2 flex-wrap">
          <Swatch color="#000000" name="Brand Black" />
          <Swatch color="#F9B334" name="Brand Yellow" />
          <Swatch color="#D4A017" name="Brand Gold" />
          <Swatch color="#BDBCBC" name="Brand Gray" />
        </div>
      </InfoCard>

      <InfoCard
        title="Overlays"
        subtitle="Keyframes y burn-in"
        wide
      >
        <ul className="text-sm text-brand-gray space-y-1 list-disc list-inside">
          <li>Subtítulos: Inter 600, burned-in, 2 líneas máx, safe zone 10%.</li>
          <li>Stats y data: Anton uppercase, color brand-yellow, shadow soft.</li>
          <li>
            Transiciones: cortes limpios + zoom 2–3% puntual. Evitar whoosh
            genérico.
          </li>
          <li>Logo reveal en cierre (Remotion template).</li>
        </ul>
      </InfoCard>
    </div>
  );
}

function Swatch({ color, name }: { color: string; name: string }) {
  return (
    <div className="flex items-center gap-2 rounded-lg bg-white/5 border border-white/10 px-2 py-1.5">
      <span
        className="w-5 h-5 rounded border border-white/20"
        style={{ background: color }}
        aria-hidden
      />
      <span className="text-xs text-white">{name}</span>
    </div>
  );
}

// ──────────────────────────────────────────────────────────
// Tab: Dopamínico (checklist persistente)
// ──────────────────────────────────────────────────────────

const DOPAMINE_ITEMS = [
  {
    key: 'pattern_interrupt' as const,
    label: 'Quiebre inicial',
    desc: 'El primer segundo del video debe romper el patrón: un cambio visual fuerte, un sonido inesperado o una frase provocadora que frene el scroll.',
  },
  {
    key: 'curiosity_gap' as const,
    label: 'Curiosidad con promesa',
    desc: 'Al principio se promete algo que el espectador solo sabrá si se queda hasta el final. La pregunta o el misterio no se resuelve antes.',
  },
  {
    key: 'reframe' as const,
    label: 'Reencuadre de creencia',
    desc: 'El video ataca una idea común y muestra un ángulo nuevo. Ejemplo: "no es el presupuesto, es el creativo".',
  },
  {
    key: 'micro_payoff' as const,
    label: 'Recompensa cada 5-7 segundos',
    desc: 'A lo largo del video hay datos, revelaciones, chistes o comparaciones constantes. Nunca más de 7 segundos sin un gancho nuevo.',
  },
  {
    key: 'closed_loop' as const,
    label: 'Loop cerrado',
    desc: 'La última frase o imagen conecta con el hook del inicio, invitando al replay natural.',
  },
  {
    key: 'cta_low_friction' as const,
    label: 'Llamada a la acción sencilla',
    desc: 'Un solo verbo, un solo beneficio. Pedir comentar, guardar o enviar un mensaje — sin pasos complicados ni links largos.',
  },
] as const;

type DopamineKey = (typeof DOPAMINE_ITEMS)[number]['key'];

function DopaminicoView({
  script,
  onUpdate,
}: {
  script: ContentScript;
  onUpdate: (patch: Partial<ContentScript>) => Promise<void>;
}) {
  const [checklist, setChecklist] = useState<Record<string, boolean>>(
    (script.dopamine_checklist ?? {}) as Record<string, boolean>,
  );
  const [saving, setSaving] = useState<DopamineKey | null>(null);

  async function toggle(key: DopamineKey) {
    const next = { ...checklist, [key]: !checklist[key] };
    setChecklist(next);
    setSaving(key);
    try {
      await onUpdate({ dopamine_checklist: next });
    } catch (err) {
      console.error(err);
      setChecklist(checklist); // rollback
    } finally {
      setSaving(null);
    }
  }

  const passed = DOPAMINE_ITEMS.filter((i) => checklist[i.key]).length;
  const ready = passed >= 4;

  return (
    <div className="space-y-4">
      <div
        className={`rounded-2xl border p-5 flex items-center justify-between flex-wrap gap-3 ${
          ready
            ? 'bg-emerald-500/10 border-emerald-500/40'
            : 'bg-white/[0.04] border-brand-gold/15'
        }`}
      >
        <div>
          <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-brand-yellow/80 mb-1">
            · Checklist Dopamínico
          </div>
          <p className="text-sm text-white/90 max-w-xl">
            Cada video debe cumplir al menos <strong>4 de los 6</strong> puntos.
            Marca cada uno cuando el guion lo cumpla.
          </p>
        </div>
        <div
          className={`font-display text-4xl ${
            ready ? 'text-emerald-400' : 'text-brand-yellow'
          }`}
        >
          {passed}/{DOPAMINE_ITEMS.length}
        </div>
      </div>

      <ul className="space-y-2">
        {DOPAMINE_ITEMS.map((item) => {
          const checked = !!checklist[item.key];
          const isSaving = saving === item.key;
          return (
            <li key={item.key}>
              <button
                type="button"
                onClick={() => toggle(item.key)}
                disabled={isSaving}
                className={`w-full flex items-start gap-3 rounded-xl border p-4 text-left transition-all ${
                  checked
                    ? 'bg-emerald-500/10 border-emerald-500/40 hover:bg-emerald-500/15'
                    : 'bg-white/[0.03] border-white/10 hover:border-brand-yellow/40 hover:bg-white/[0.05]'
                } disabled:opacity-60`}
              >
                <span
                  className={`flex-shrink-0 w-6 h-6 rounded-md border flex items-center justify-center mt-0.5 transition-all ${
                    checked
                      ? 'bg-emerald-500 border-emerald-500'
                      : 'bg-transparent border-brand-yellow/50'
                  }`}
                  aria-hidden
                >
                  {isSaving ? (
                    <Loader2 className="w-3.5 h-3.5 text-white animate-spin" />
                  ) : checked ? (
                    <svg
                      className="w-4 h-4 text-black"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.7 5.3a1 1 0 010 1.4l-7.5 7.5a1 1 0 01-1.4 0L3.3 9.7a1 1 0 011.4-1.4l3.8 3.8 6.8-6.8a1 1 0 011.4 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : null}
                </span>
                <div className="flex-1 min-w-0">
                  <div
                    className={`text-sm font-semibold mb-0.5 ${
                      checked ? 'text-emerald-300' : 'text-white'
                    }`}
                  >
                    {item.label}
                  </div>
                  <p className="text-xs text-brand-gray leading-snug">
                    {item.desc}
                  </p>
                </div>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

// ──────────────────────────────────────────────────────────
// Tab: Humanizado
// ──────────────────────────────────────────────────────────

function HumanizadoView({
  original,
  humanized,
  scenes,
}: {
  original: string | null;
  humanized: string | null;
  scenes: Scene[];
}) {
  // Si hay archivo humanizado separado (solo los 20 G01-G20 originales), muestra
  // comparación side-by-side.
  if (humanized) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="rounded-2xl bg-white/[0.02] border border-white/8 p-6 overflow-x-auto">
          <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-brand-gray mb-3">
            · Original
          </div>
          {original ? (
            <MarkdownRenderer content={original} />
          ) : (
            <p className="text-brand-gray text-sm">Sin original cargado.</p>
          )}
        </div>
        <div className="rounded-2xl bg-brand-yellow/5 border border-brand-yellow/30 p-6 overflow-x-auto">
          <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-brand-yellow mb-3">
            · Humanizado · Paisa LATAM
          </div>
          <MarkdownRenderer content={humanized} />
        </div>
      </div>
    );
  }

  // Para los guiones nuevos (399), la humanización está integrada: cada
  // `scene.voice` ya es el texto paisa H.U.M.A.N.O a grabar.
  const voiceLines = scenes.filter((s) => s.voice && s.voice.trim().length > 0);

  if (voiceLines.length === 0) {
    return (
      <div className="rounded-2xl bg-white/[0.02] border border-white/8 p-6 text-brand-gray text-sm">
        Aún no hay líneas de voz escritas para este guion.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="rounded-2xl bg-brand-yellow/5 border border-brand-yellow/30 p-5">
        <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-brand-yellow mb-1">
          · Versión humanizada (paisa colombiano)
        </div>
        <p className="text-sm text-white/90 max-w-2xl">
          Este guion ya está escrito con el framework <strong>H.U.M.A.N.O</strong>:
          voseo natural, colombianismos medidos y ritmo hablado. Este es el
          texto literal que el creador (o la voz Cristian Sánchez en
          ElevenLabs) debe decir.
        </p>
      </div>

      <ol className="space-y-3">
        {voiceLines.map((s, idx) => (
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
            <p className="text-lg italic text-white leading-relaxed flex-1">
              “{s.voice}”
            </p>
          </li>
        ))}
      </ol>
    </div>
  );
}

// ──────────────────────────────────────────────────────────
// Tab: Estado (timeline)
// ──────────────────────────────────────────────────────────

function EstadoView({
  script: _script,
  events,
  teamById,
}: {
  script: ContentScript;
  events: ContentScriptEvent[];
  teamById: Map<string, TeamMemberLite>;
}) {
  if (events.length === 0) {
    return (
      <div className="rounded-2xl bg-white/[0.02] border border-white/8 p-6 text-brand-gray text-sm">
        Sin eventos registrados aún. Los cambios de status, asignación y
        publicación aparecerán aquí.
      </div>
    );
  }

  return (
    <ol className="space-y-3">
      {events.map((e) => {
        const actor = e.actor_id ? teamById.get(e.actor_id) : null;
        return (
          <li
            key={e.id}
            className="rounded-xl bg-white/[0.03] border border-white/8 p-4 flex gap-4 items-start"
          >
            <div className="w-2 h-2 rounded-full bg-brand-yellow mt-2 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap text-xs text-brand-gray mb-1">
                <span className="font-mono uppercase tracking-wider text-brand-yellow/80">
                  {e.event_type}
                </span>
                <span>·</span>
                <span>{new Date(e.created_at).toLocaleString('es-CO')}</span>
                {actor && (
                  <>
                    <span>·</span>
                    <span>{actor.full_name}</span>
                  </>
                )}
              </div>
              <div className="text-sm text-white">
                {e.from_value !== null && e.to_value !== null ? (
                  <>
                    <span className="text-brand-gray">{e.from_value}</span>
                    <span className="mx-2">→</span>
                    <span>{e.to_value}</span>
                  </>
                ) : (
                  <span>{e.to_value ?? e.from_value ?? '—'}</span>
                )}
              </div>
            </div>
          </li>
        );
      })}
    </ol>
  );
}

// ──────────────────────────────────────────────────────────
// Tab: Publicaciones
// ──────────────────────────────────────────────────────────

function PublicacionesView({
  script,
  publications,
  team,
}: {
  script: ContentScript;
  publications: ContentPublication[];
  team: TeamMemberLite[];
}) {
  const [showForm, setShowForm] = useState(false);
  const [items, setItems] = useState(publications);
  const teamById = new Map(team.map((t) => [t.id, t.full_name]));

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <h3 className="font-display text-lg uppercase text-white">
          Historial de publicaciones
        </h3>
        <button
          onClick={() => setShowForm((v) => !v)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-yellow text-black font-bold text-sm hover:bg-brand-gold transition-colors"
        >
          <Plus className="w-4 h-4" />
          {showForm ? 'Cerrar' : 'Registrar publicación'}
        </button>
      </div>

      {showForm && (
        <PublicationInlineForm
          scriptId={script.id}
          team={team}
          onCreated={(pub) => {
            setItems((prev) => [pub, ...prev]);
            setShowForm(false);
          }}
        />
      )}

      {items.length === 0 ? (
        <div className="rounded-2xl bg-white/[0.02] border border-white/8 p-8 text-center text-brand-gray text-sm">
          Aún no se registra ninguna publicación para este guion.
        </div>
      ) : (
        <ul className="space-y-2">
          {items.map((p) => (
            <li
              key={p.id}
              className="rounded-xl bg-white/[0.04] border border-brand-gold/15 p-4 flex items-start gap-4 flex-wrap"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 text-xs text-brand-gray mb-1">
                  <span className="font-mono uppercase tracking-wider text-brand-yellow">
                    {SCRIPT_PLATFORM_LABEL[p.platform] ?? p.platform}
                  </span>
                  {p.published_at && (
                    <>
                      <span>·</span>
                      <span>
                        {new Date(p.published_at).toLocaleDateString('es-CO')}
                      </span>
                    </>
                  )}
                  {p.editor_id && (
                    <>
                      <span>·</span>
                      <span>Editó: {teamById.get(p.editor_id) ?? 'n/a'}</span>
                    </>
                  )}
                </div>
                {p.url && (
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-white hover:text-brand-yellow truncate block"
                  >
                    {p.url}
                  </a>
                )}
              </div>
              <div className="flex flex-wrap gap-3 text-xs">
                <Metric label="Views" value={p.views} />
                <Metric label="Likes" value={p.likes} />
                <Metric label="Comments" value={p.comments} />
                <Metric label="Saves" value={p.saves} />
                <Metric label="Shares" value={p.shares} />
                {p.engagement_rate != null && (
                  <Metric
                    label="ER"
                    value={Number(p.engagement_rate).toFixed(1) + '%'}
                  />
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function Metric({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="flex flex-col items-center justify-center min-w-[56px] rounded-lg bg-white/5 border border-white/8 px-2 py-1">
      <div className="text-[9px] uppercase tracking-widest text-brand-gray">
        {label}
      </div>
      <div className="text-sm font-semibold text-white">{value}</div>
    </div>
  );
}

function PublicationInlineForm({
  scriptId,
  team,
  onCreated,
}: {
  scriptId: string;
  team: TeamMemberLite[];
  onCreated: (pub: ContentPublication) => void;
}) {
  const [platform, setPlatform] = useState('instagram_reel');
  const [url, setUrl] = useState('');
  const [publishedAt, setPublishedAt] = useState(
    new Date().toISOString().slice(0, 16),
  );
  const [editorId, setEditorId] = useState('');
  const [views, setViews] = useState(0);
  const [likes, setLikes] = useState(0);
  const [comments, setComments] = useState(0);
  const [saves, setSaves] = useState(0);
  const [shares, setShares] = useState(0);
  const [engagementRate, setEngagementRate] = useState('');
  const [notes, setNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch('/api/admin/publications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          script_id: scriptId,
          platform,
          url,
          published_at: new Date(publishedAt).toISOString(),
          editor_id: editorId || null,
          views,
          likes,
          comments,
          saves,
          shares,
          engagement_rate: engagementRate ? parseFloat(engagementRate) : null,
          notes,
        }),
      });
      if (!res.ok) throw new Error(await res.text());
      const { publication } = await res.json();
      onCreated(publication);
    } catch (err) {
      console.error(err);
      alert('Error creando publicación');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl bg-brand-yellow/5 border border-brand-yellow/30 p-5 space-y-4"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <Field label="Plataforma">
          <select
            value={platform}
            onChange={(e) => setPlatform(e.target.value)}
            className="w-full bg-black border border-brand-gold/20 rounded-lg px-3 py-2 text-sm text-white"
          >
            {Object.entries(SCRIPT_PLATFORM_LABEL).map(([k, v]) => (
              <option key={k} value={k}>
                {v}
              </option>
            ))}
          </select>
        </Field>
        <Field label="URL pública">
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://instagram.com/reel/..."
            className="w-full bg-black border border-brand-gold/20 rounded-lg px-3 py-2 text-sm text-white"
          />
        </Field>
        <Field label="Publicado el">
          <input
            type="datetime-local"
            value={publishedAt}
            onChange={(e) => setPublishedAt(e.target.value)}
            className="w-full bg-black border border-brand-gold/20 rounded-lg px-3 py-2 text-sm text-white"
          />
        </Field>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
        <Field label="Views">
          <input
            type="number"
            min={0}
            value={views}
            onChange={(e) => setViews(Number(e.target.value))}
            className="w-full bg-black border border-brand-gold/20 rounded-lg px-3 py-2 text-sm text-white"
          />
        </Field>
        <Field label="Likes">
          <input
            type="number"
            min={0}
            value={likes}
            onChange={(e) => setLikes(Number(e.target.value))}
            className="w-full bg-black border border-brand-gold/20 rounded-lg px-3 py-2 text-sm text-white"
          />
        </Field>
        <Field label="Comments">
          <input
            type="number"
            min={0}
            value={comments}
            onChange={(e) => setComments(Number(e.target.value))}
            className="w-full bg-black border border-brand-gold/20 rounded-lg px-3 py-2 text-sm text-white"
          />
        </Field>
        <Field label="Saves">
          <input
            type="number"
            min={0}
            value={saves}
            onChange={(e) => setSaves(Number(e.target.value))}
            className="w-full bg-black border border-brand-gold/20 rounded-lg px-3 py-2 text-sm text-white"
          />
        </Field>
        <Field label="Shares">
          <input
            type="number"
            min={0}
            value={shares}
            onChange={(e) => setShares(Number(e.target.value))}
            className="w-full bg-black border border-brand-gold/20 rounded-lg px-3 py-2 text-sm text-white"
          />
        </Field>
        <Field label="ER %">
          <input
            type="number"
            step="0.1"
            min={0}
            value={engagementRate}
            onChange={(e) => setEngagementRate(e.target.value)}
            placeholder="opcional"
            className="w-full bg-black border border-brand-gold/20 rounded-lg px-3 py-2 text-sm text-white"
          />
        </Field>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <Field label="Editor responsable">
          <select
            value={editorId}
            onChange={(e) => setEditorId(e.target.value)}
            className="w-full bg-black border border-brand-gold/20 rounded-lg px-3 py-2 text-sm text-white"
          >
            <option value="">— Sin asignar —</option>
            {team.map((t) => (
              <option key={t.id} value={t.id}>
                {t.full_name}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Notas">
          <input
            type="text"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Qué funcionó / aprendizajes"
            className="w-full bg-black border border-brand-gold/20 rounded-lg px-3 py-2 text-sm text-white"
          />
        </Field>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-brand-yellow text-black font-bold text-sm hover:bg-brand-gold transition-colors disabled:opacity-50"
        >
          {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
          Guardar publicación
        </button>
      </div>
    </form>
  );
}
