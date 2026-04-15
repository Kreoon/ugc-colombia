import { requireAuth } from '@/lib/auth';
import { createSupabaseServer } from '@/lib/supabase-server';
import { PageHero, Badge } from '@/components/admin/ui';

interface AdminUserRef {
  full_name: string | null;
  email: string | null;
}

interface ActivityRow {
  id: string;
  action: string;
  resource_type: string | null;
  resource_id: string | null;
  metadata: Record<string, unknown> | null;
  created_at: string;
  admin_users: AdminUserRef | null;
}

export default async function ActividadPage() {
  await requireAuth();
  const supabase = await createSupabaseServer();

  const { data: activity } = await supabase
    .from('admin_activity')
    .select(
      'id, action, resource_type, resource_id, metadata, created_at, admin_users!user_id(full_name, email)'
    )
    .order('created_at', { ascending: false })
    .limit(100)
    .returns<ActivityRow[]>();

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
      <PageHero
        eyebrow="Administración · Actividad"
        title="Registro"
        highlight="editorial."
        lead="Últimas 100 acciones del equipo en el admin — qué se creó, editó o movió."
      />

      <div className="rounded-2xl border border-brand-gold/15 overflow-hidden bg-white/[0.02]">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-[10px] uppercase tracking-[0.15em] text-brand-gray bg-white/[0.02]">
              <th className="text-left px-6 py-3 font-semibold" scope="col">
                Cuándo
              </th>
              <th className="text-left px-6 py-3 font-semibold" scope="col">
                Quién
              </th>
              <th className="text-left px-6 py-3 font-semibold" scope="col">
                Acción
              </th>
              <th className="text-left px-6 py-3 font-semibold" scope="col">
                Recurso
              </th>
            </tr>
          </thead>
          <tbody>
            {activity && activity.length > 0 ? (
              activity.map((a) => (
                <tr
                  key={a.id}
                  className="border-t border-brand-gold/10 hover:bg-white/[0.02] transition-colors"
                >
                  <td className="px-6 py-3 text-brand-gray text-xs tabular-nums whitespace-nowrap">
                    <time dateTime={a.created_at}>
                      {new Date(a.created_at).toLocaleString('es-CO')}
                    </time>
                  </td>
                  <td className="px-6 py-3 text-white font-semibold">
                    {a.admin_users?.full_name ?? a.admin_users?.email ?? '—'}
                  </td>
                  <td className="px-6 py-3">
                    <Badge variant="gold">{a.action}</Badge>
                  </td>
                  <td className="px-6 py-3 text-xs font-mono text-brand-gray">
                    {a.resource_id ?? '—'}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="px-6 py-16 text-center text-brand-gray">
                  Sin actividad aún
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
