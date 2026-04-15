import { notFound } from 'next/navigation';
import { requireAuth } from '@/lib/auth';
import { ContentPage } from '@/components/admin/ContentPage';
import { EmpresaHero } from '@/components/admin/EmpresaHero';

const VALID_SLUGS = new Set([
  'identidad',
  'modelo-negocio',
  'estrategia',
  'equipo',
  'mercado',
]);

export default async function EmpresaSectionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const user = await requireAuth();
  const { slug } = await params;

  if (!VALID_SLUGS.has(slug)) notFound();

  return (
    <>
      {slug === 'identidad' && <EmpresaHero />}
      <ContentPage
        user={user}
        filePath={`content/empresa/${slug}.md`}
        backHref="/admin/empresa"
        backLabel="Volver a Empresa"
      />
    </>
  );
}

export function generateStaticParams() {
  return Array.from(VALID_SLUGS).map((slug) => ({ slug }));
}
