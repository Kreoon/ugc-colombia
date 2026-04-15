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
      eyebrow="Viralidad · Parrilla masiva"
      title="PARRILLA IG + TIKTOK."
      lead="Ritmo de publicación, slots diarios y patrones de contenido para saturar feeds con presencia editorial."
    />
  );
}
