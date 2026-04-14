import { notFound } from 'next/navigation';
import { requireAuth } from '@/lib/auth';
import { ContentPage } from '@/components/admin/ContentPage';

const VALID_SLUGS = new Set([
  'brand-guidelines',
  'design-tokens',
  'logo-specs',
  'social-templates-spec',
  'ad-assets-spec',
  'presentation-kit-spec',
  'image-prompts',
]);

export default async function MarcaSectionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const user = await requireAuth();
  const { slug } = await params;

  if (!VALID_SLUGS.has(slug)) notFound();

  return (
    <ContentPage
      user={user}
      filePath={`brand/${slug}.md`}
      backHref="/admin/marca"
      backLabel="Volver al Manual"
    />
  );
}

export function generateStaticParams() {
  return Array.from(VALID_SLUGS).map((slug) => ({ slug }));
}
