/**
 * ProjectCard — Tarjeta reutilizable para cada regalo/proyecto en el hub.
 *
 * Usada en /forge/gracias (entrega inmediata + cross-sell)
 * y en /regalos (hub permanente).
 */

import Link from "next/link";

export type ProjectStatus = "live" | "soon" | "wip" | "new";

export type ProjectCardProps = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  status: ProjectStatus;
  stackBadges?: string[];
  repoUrl?: string;
  guideUrl?: string;
  leadFormUrl?: string;
  thumbnail?: string;
  featured?: boolean;
  onClick?: () => void;
};

const STATUS_CONFIG: Record<ProjectStatus, { label: string; bg: string; fg: string; border: string }> = {
  live: { label: "DISPONIBLE", bg: "bg-green-500/15", fg: "text-green-400", border: "border-green-500/40" },
  new: { label: "NUEVO", bg: "bg-brand-yellow/15", fg: "text-brand-yellow", border: "border-brand-yellow/60" },
  soon: { label: "PRÓXIMO", bg: "bg-brand-gray-light/10", fg: "text-brand-gray-light", border: "border-brand-gray-light/30" },
  wip: { label: "EN CONSTRUCCIÓN", bg: "bg-brand-gray-light/10", fg: "text-brand-gray-light", border: "border-brand-gray-light/30" },
};

export function ProjectCard(props: ProjectCardProps) {
  const status = STATUS_CONFIG[props.status];
  const isLive = props.status === "live" || props.status === "new";

  return (
    <article
      className={`group flex flex-col gap-4 p-6 rounded-2xl border transition-all ${
        props.featured
          ? "border-brand-yellow/60 bg-gradient-to-br from-brand-yellow/10 via-transparent to-transparent"
          : "border-white/10 bg-black/40 hover:border-brand-yellow/40"
      }`}
    >
      {/* Status + featured */}
      <div className="flex items-center justify-between gap-2">
        <span
          className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase ${status.bg} ${status.fg} border ${status.border}`}
        >
          {status.label}
        </span>
        {props.featured ? (
          <span className="text-[10px] font-bold tracking-widest uppercase text-brand-yellow">
            ★ DESTACADO
          </span>
        ) : null}
      </div>

      {/* Thumbnail opcional */}
      {props.thumbnail ? (
        <div className="relative aspect-[16/9] overflow-hidden rounded-xl border border-white/10">
          <img src={props.thumbnail} alt={props.name} className="w-full h-full object-cover" loading="lazy" />
        </div>
      ) : null}

      {/* Nombre + tagline */}
      <div>
        <h3 className="font-display text-3xl uppercase text-white tracking-tight leading-none mb-2">
          {props.name}
        </h3>
        <p className="text-sm text-brand-yellow/90 font-medium">{props.tagline}</p>
      </div>

      {/* Descripción */}
      <p className="text-sm text-brand-gray-light leading-relaxed">{props.description}</p>

      {/* Stack badges */}
      {props.stackBadges && props.stackBadges.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {props.stackBadges.map((b) => (
            <span
              key={b}
              className="text-[10px] font-semibold tracking-wide uppercase px-2 py-1 rounded border border-white/10 text-brand-gray-light"
            >
              {b}
            </span>
          ))}
        </div>
      ) : null}

      {/* CTAs */}
      <div className="mt-auto flex flex-col gap-2 pt-2">
        {isLive ? (
          <>
            {props.leadFormUrl ? (
              <Link
                href={props.leadFormUrl}
                onClick={props.onClick}
                className="inline-flex items-center justify-center gap-2 bg-brand-yellow hover:bg-brand-yellow-hover text-brand-black font-bold px-5 py-3 rounded-xl text-sm transition-colors"
              >
                Obtener gratis →
              </Link>
            ) : props.repoUrl ? (
              <Link
                href={props.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-brand-yellow hover:bg-brand-yellow-hover text-brand-black font-bold px-5 py-3 rounded-xl text-sm transition-colors"
              >
                Ver en GitHub →
              </Link>
            ) : null}

            {props.guideUrl ? (
              <Link
                href={props.guideUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 text-brand-yellow hover:text-brand-yellow-hover font-semibold px-5 py-2 rounded-xl text-sm border border-brand-yellow/30 hover:border-brand-yellow/60 transition-colors"
              >
                Guía de instalación
              </Link>
            ) : null}
          </>
        ) : (
          <div className="inline-flex items-center justify-center gap-2 text-brand-gray-light px-5 py-3 rounded-xl text-sm border border-white/10 font-semibold">
            Próximamente
          </div>
        )}
      </div>
    </article>
  );
}
