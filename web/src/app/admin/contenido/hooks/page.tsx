import { requireAuth } from '@/lib/auth';
import { ContentPage } from '@/components/admin/ContentPage';

export const dynamic = 'force-dynamic';

export default async function HooksPage() {
  const user = await requireAuth();
  return (
    <ContentPage
      user={user}
      filePath="content/sistemas/contenido/banco-hooks.md"
      backHref="/admin/contenido"
      backLabel="Volver a Contenido"
    />
  );
}
