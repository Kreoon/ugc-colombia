import { requireAuth } from '@/lib/auth';
import { createSupabaseServer } from '@/lib/supabase-server';

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
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <div className="text-brand-yellow text-xs font-semibold tracking-[0.2em] uppercase mb-3">
          · Admin
        </div>
        <h1 className="font-display text-4xl uppercase text-white mb-2">
          Actividad
        </h1>
        <p className="text-brand-gray">Últimas 100 acciones del equipo.</p>
      </div>

      <div className="rounded-xl border border-brand-gold/15 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-black/40 border-b-2 border-brand-gold text-xs uppercase tracking-wider text-brand-yellow">
            <tr>
              <th className="px-4 py-3 text-left" scope="col">
                Cuándo
              </th>
              <th className="px-4 py-3 text-left" scope="col">
                Quién
              </th>
              <th className="px-4 py-3 text-left" scope="col">
                Acción
              </th>
              <th className="px-4 py-3 text-left" scope="col">
                Recurso
              </th>
            </tr>
          </thead>
          <tbody>
            {activity && activity.length > 0 ? (
              activity.map((a) => (
                <tr
                  key={a.id}
                  className="border-b border-brand-gold/10 hover:bg-white/[0.02] transition-colors"
                >
                  <td className="px-4 py-3 text-brand-gray text-xs tabular-nums whitespace-nowrap">
                    <time dateTime={a.created_at}>
                      {new Date(a.created_at).toLocaleString('es-CO')}
                    </time>
                  </td>
                  <td className="px-4 py-3 text-white font-medium">
                    {a.admin_users?.full_name ?? a.admin_users?.email ?? '—'}
                  </td>
                  <td className="px-4 py-3">
                    <span className="uppercase text-xs tracking-wider text-brand-yellow font-semibold">
                      {a.action}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-xs font-mono text-brand-gray">
                    {a.resource_id ?? '—'}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={4}
                  className="px-4 py-16 text-center text-brand-gray"
                >
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
