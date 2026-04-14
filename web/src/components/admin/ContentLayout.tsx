import Link from 'next/link';
import { Pencil, ArrowLeft, Clock } from 'lucide-react';
import type { ContentFile } from '@/lib/content';

interface ContentLayoutProps {
  content: ContentFile;
  backHref?: string;
  editHref?: string;
  showEditButton?: boolean;
  children: React.ReactNode;
}

export function ContentLayout({
  content,
  backHref,
  editHref,
  showEditButton = true,
  children,
}: ContentLayoutProps) {
  const overrideDate = content.overrideUpdatedAt
    ? new Date(content.overrideUpdatedAt).toLocaleString('es-CO')
    : null;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Barra superior: volver + editar */}
      <div className="flex items-center justify-between mb-8">
        {backHref ? (
          <Link
            href={backHref}
            className="inline-flex items-center gap-2 text-sm text-brand-gray hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            Volver
          </Link>
        ) : (
          <span />
        )}

        {showEditButton && editHref && (
          <Link
            href={editHref}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-brand-yellow/15 border border-brand-yellow/30 text-brand-yellow text-sm font-semibold hover:bg-brand-yellow/25 transition-colors"
            aria-label="Editar este documento"
          >
            <Pencil className="w-4 h-4" aria-hidden="true" />
            Editar
          </Link>
        )}
      </div>

      {/* Banner override activo */}
      {content.isOverridden && overrideDate && (
        <div
          role="status"
          aria-live="polite"
          className="mb-6 flex items-center gap-2 px-4 py-2 rounded-lg bg-brand-yellow/10 border border-brand-yellow/30 text-brand-yellow text-sm"
        >
          <Clock className="w-4 h-4 shrink-0" aria-hidden="true" />
          <span>
            Editado &middot; última actualización{' '}
            <time dateTime={content.overrideUpdatedAt}>{overrideDate}</time>
            {content.overrideEditedBy && (
              <> por <strong className="font-semibold">{content.overrideEditedBy}</strong></>
            )}
          </span>
        </div>
      )}

      <article>{children}</article>
    </div>
  );
}
