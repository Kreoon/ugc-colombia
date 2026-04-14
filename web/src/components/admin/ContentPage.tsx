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
}

export async function ContentPage({
  user,
  filePath,
  backHref,
  backLabel = 'Volver',
}: ContentPageProps) {
  const content = await getContentWithOverrides(filePath);
  if (!content) notFound();

  const canEdit = hasRole(user, ['founder', 'manager']);

  return (
    <ContentLayout
      content={content}
      backHref={backHref}
      editHref={canEdit ? `/admin/editor/${filePath}` : undefined}
      showEditButton={canEdit}
    >
      <MarkdownRenderer content={content.current} />
    </ContentLayout>
  );
}
