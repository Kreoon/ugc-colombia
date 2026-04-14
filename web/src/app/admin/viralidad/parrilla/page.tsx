import { requireAuth } from '@/lib/auth';
import { ContentPage } from '@/components/admin/ContentPage';

export default async function ParrillaPage() {
  const user = await requireAuth();
  return (
    <ContentPage
      user={user}
      filePath="content/viralidad/03-parrilla-masiva-ig-tiktok.md"
      backHref="/admin/viralidad"
      backLabel="Volver a Viralidad"
    />
  );
}
