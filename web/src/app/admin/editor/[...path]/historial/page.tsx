import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { requireRole } from "@/lib/auth";
import { createSupabaseServer } from "@/lib/supabase-server";

interface VersionsPageProps {
  params: Promise<{ path: string[] }>;
}

interface VersionRow {
  id: string;
  content: string;
  created_at: string;
  edited_by: string;
  admin_users: { full_name: string | null; email: string } | null;
}

export default async function VersionsPage({ params }: VersionsPageProps) {
  await requireRole(["founder", "manager"]);

  const { path } = await params;
  const filePath = path.join("/");

  const supabase = await createSupabaseServer();
  const { data: versions } = await supabase
    .from("content_versions")
    .select(
      "id, content, created_at, edited_by, admin_users!edited_by(full_name, email)"
    )
    .eq("file_path", filePath)
    .order("created_at", { ascending: false })
    .limit(50)
    .returns<VersionRow[]>();

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <Link
        href={`/admin/editor/${filePath}`}
        className="inline-flex items-center gap-2 text-sm text-brand-gray hover:text-white transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4" aria-hidden="true" />
        Volver al editor
      </Link>

      <h1 className="font-display text-4xl uppercase text-white mb-2">
        Historial
      </h1>
      <code className="text-xs text-brand-gray">{filePath}</code>

      <div className="mt-8 space-y-3">
        {versions?.map((v) => {
          const author =
            v.admin_users?.full_name ?? v.admin_users?.email ?? "—";
          const date = new Date(v.created_at).toLocaleString("es-CO");

          return (
            <article
              key={v.id}
              className="p-4 rounded-xl bg-white/4 border border-brand-gold/15"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="text-sm text-white font-medium">{author}</div>
                <time
                  dateTime={v.created_at}
                  className="text-xs text-brand-gray"
                >
                  {date}
                </time>
              </div>
              <div className="text-xs text-brand-gray">
                {v.content.length.toLocaleString("es-CO")} caracteres
              </div>
            </article>
          );
        })}

        {!versions?.length && (
          <p className="text-center text-brand-gray py-12">
            Sin versiones guardadas aún.
          </p>
        )}
      </div>
    </div>
  );
}
