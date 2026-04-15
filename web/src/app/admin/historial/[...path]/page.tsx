import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { requireRole } from "@/lib/auth";
import { createSupabaseServer } from "@/lib/supabase-server";
import { PageHero, EmptyState, Eyebrow } from "@/components/admin/ui";

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
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
      <div className="mb-6">
        <Link
          href={`/admin/editor/${filePath}`}
          className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase text-brand-gray hover:text-brand-yellow transition-colors"
        >
          <ArrowLeft className="w-3 h-3" aria-hidden="true" />
          Volver al editor
        </Link>
      </div>

      <PageHero
        eyebrow="Historial de versiones"
        title="Cambios"
        highlight="registrados."
        lead={
          <>
            Últimas 50 versiones guardadas para <code className="text-brand-yellow font-mono text-sm">{filePath}</code>
          </>
        }
      />

      {versions?.length ? (
        <div className="space-y-3">
          {versions.map((v) => {
            const author =
              v.admin_users?.full_name ?? v.admin_users?.email ?? "—";
            const date = new Date(v.created_at).toLocaleString("es-CO");

            return (
              <article
                key={v.id}
                className="p-5 rounded-2xl bg-white/[0.04] border border-brand-gold/15 hover:border-brand-yellow/40 transition-colors"
              >
                <div className="flex items-center justify-between mb-2 gap-3">
                  <div className="flex items-center gap-3">
                    <span className="font-semibold text-white">{author}</span>
                    <Eyebrow variant="gray">
                      {v.content.length.toLocaleString("es-CO")} caracteres
                    </Eyebrow>
                  </div>
                  <time
                    dateTime={v.created_at}
                    className="text-xs text-brand-gray tabular-nums"
                  >
                    {date}
                  </time>
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <EmptyState
          title="Sin versiones guardadas aún"
          desc="Apenas se edite este documento, las versiones aparecerán acá con autor y marca temporal."
        />
      )}
    </div>
  );
}
