import { notFound } from 'next/navigation';
import type { AdminUser } from '@/lib/auth';
import { hasRole } from '@/lib/auth';
import { getContentWithOverrides } from '@/lib/content';
import { ContentLayout } from './ContentLayout';
import { MarkdownRenderer } from './MarkdownRenderer';

interface ContentPageProps {
  user: AdminUser;
  filePath: string;
  backHref: string;
  backLabel?: string;
  eyebrow?: string;
  title?: string;
  lead?: string;
}

export async function ContentPage({
  user,
  filePath,
  backHref,
  backLabel = 'Volver',
  eyebrow,
  title,
  lead,
}: ContentPageProps) {
  const content = await getContentWithOverrides(filePath);
  if (!content) notFound();

  const canEdit = hasRole(user, ['founder', 'manager']);

  return (
    <ContentLayout
      content={content}
      backHref={backHref}
      backLabel={backLabel}
      editHref={canEdit ? `/admin/editor/${filePath}` : undefined}
      showEditButton={canEdit}
      eyebrow={eyebrow}
      title={title}
      lead={lead}
    >
      <MarkdownRenderer content={content.current} />
    </ContentLayout>
  );
}
