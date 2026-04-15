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
      eyebrow="Viralidad · Modelo maestro"
      title="MODELO DE VIRALIDAD."
      lead="El framework editorial de UGC Colombia para producir contenido que se gana el feed. Pilares, hooks, cadencia y loop de medición."
    />
  );
}
