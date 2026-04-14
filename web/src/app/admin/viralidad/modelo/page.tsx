import { requireAuth } from '@/lib/auth';
import { ContentPage } from '@/components/admin/ContentPage';

export default async function ModeloPage() {
  const user = await requireAuth();
  return (
    <ContentPage
      user={user}
      filePath="content/viralidad/00-modelo-maestro-viralidad.md"
      backHref="/admin/viralidad"
      backLabel="Volver a Viralidad"
    />
  );
}
