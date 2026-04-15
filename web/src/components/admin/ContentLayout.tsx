import Link from "next/link";
import { Pencil, ArrowLeft, Clock } from "lucide-react";
import type { ContentFile } from "@/lib/content";

interface ContentLayoutProps {
  content: ContentFile;
  backHref?: string;
  backLabel?: string;
  editHref?: string;
  showEditButton?: boolean;
  eyebrow?: string;
  title?: string;
  lead?: string;
  children: React.ReactNode;
}

export function ContentLayout({
  content,
  backHref,
  backLabel = "Volver",
  editHref,
  showEditButton = true,
  eyebrow,
  title,
  lead,
  children,
}: ContentLayoutProps) {
  const overrideDate = content.overrideUpdatedAt
    ? new Date(content.overrideUpdatedAt).toLocaleString("es-CO")
    : null;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
      {/* Barra superior editorial */}
      <div className="flex items-center justify-between mb-10">
        {backHref ? (
          <Link
            href={backHref}
            className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase text-brand-gray hover:text-brand-yellow transition-colors"
          >
            <ArrowLeft className="w-3 h-3" aria-hidden="true" />
            {backLabel}
          </Link>
        ) : (
          <span />
        )}

        {showEditButton && editHref && (
          <Link
            href={editHref}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-yellow/15 border border-brand-yellow/30 text-brand-yellow text-xs font-semibold uppercase tracking-wider hover:bg-brand-yellow/25 transition-colors"
            aria-label="Editar este documento"
          >
            <Pencil className="w-3.5 h-3.5" aria-hidden="true" />
            Editar
          </Link>
        )}
      </div>

      {/* Hero editorial (si viene título/eyebrow) */}
      {(title || eyebrow) && (
        <header className="mb-10 pb-8 border-b border-brand-gold/15">
          {eyebrow && (
            <div className="text-[10px] font-semibold tracking-[0.2em] uppercase text-brand-yellow mb-3">
              · {eyebrow}
            </div>
          )}
          {title && (
            <h1 className="font-display uppercase text-white text-4xl sm:text-5xl lg:text-6xl leading-[0.95]">
              {title}
            </h1>
          )}
          {lead && (
            <p className="text-brand-gray mt-4 max-w-2xl leading-relaxed">{lead}</p>
          )}
        </header>
      )}

      {/* Banner override activo */}
      {content.isOverridden && overrideDate && (
        <div
          role="status"
          aria-live="polite"
          className="mb-8 flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-yellow/10 border border-brand-yellow/30 text-brand-yellow text-sm"
        >
          <Clock className="w-4 h-4 shrink-0" aria-hidden="true" />
          <span>
            Editado &middot; última actualización{" "}
            <time dateTime={content.overrideUpdatedAt}>{overrideDate}</time>
            {content.overrideEditedBy && (
              <>
                {" "}
                por{" "}
                <strong className="font-semibold">{content.overrideEditedBy}</strong>
              </>
            )}
          </span>
        </div>
      )}

      <article className="prose-editorial">{children}</article>
    </div>
  );
}
