import { requireAuth } from '@/lib/auth';
import { ContentPage } from '@/components/admin/ContentPage';

export default async function BenchmarkPage() {
  const user = await requireAuth();
  return (
    <ContentPage
      user={user}
      filePath="content/viralidad/01-benchmark-referentes-virales.md"
      backHref="/admin/viralidad"
      backLabel="Volver a Viralidad"
    />
  );
}
