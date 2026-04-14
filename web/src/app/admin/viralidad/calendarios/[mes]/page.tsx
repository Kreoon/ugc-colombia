import { notFound } from 'next/navigation';
import { requireAuth } from '@/lib/auth';
import { ContentPage } from '@/components/admin/ContentPage';

const MES_MAP: Record<string, string> = {
  julio: 'content/viralidad/02-calendario-julio-2026.md',
  agosto: 'content/viralidad/02-calendario-agosto-2026.md',
  septiembre: 'content/viralidad/02-calendario-septiembre-2026.md',
};

export default async function CalendarioMesPage({
  params,
}: {
  params: Promise<{ mes: string }>;
}) {
  const user = await requireAuth();
  const { mes } = await params;
  const filePath = MES_MAP[mes];

  if (!filePath) notFound();

  return (
    <ContentPage
      user={user}
      filePath={filePath}
      backHref="/admin/viralidad/calendarios"
      backLabel="Volver a Calendarios"
    />
  );
}

export function generateStaticParams() {
  return Object.keys(MES_MAP).map((mes) => ({ mes }));
}
