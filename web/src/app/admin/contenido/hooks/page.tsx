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
      eyebrow="Contenido · Banco de hooks"
      title="HOOKS QUE PARAN SCROLL."
      lead="Base de ganchos probados, organizados por pilar y plataforma. Cada hook con ejemplo, racional y KPI esperado."
    />
  );
}
