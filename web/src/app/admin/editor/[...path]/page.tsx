import { notFound } from "next/navigation";
import { requireRole } from "@/lib/auth";
import { getContentWithOverrides } from "@/lib/content";
import { MarkdownEditor } from "@/components/admin/MarkdownEditor";

interface EditContentPageProps {
  params: Promise<{ path: string[] }>;
}

export default async function EditContentPage({
  params,
}: EditContentPageProps) {
  await requireRole(["founder", "manager"]);

  const { path } = await params;
  const filePath = path.join("/");

  const content = await getContentWithOverrides(filePath);
  if (!content) notFound();

  return (
    <MarkdownEditor
      filePath={filePath}
      initialContent={content.current}
      rawContent={content.raw}
      isOverridden={content.isOverridden}
    />
  );
}
