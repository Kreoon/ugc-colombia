import type { Metadata } from "next";
import { requireRole } from "@/lib/auth";
import { createSupabaseServer } from "@/lib/supabase-server";
import { InviteForm } from "./InviteForm";

export const metadata: Metadata = {
  title: "Equipo — Admin UGC Colombia",
  robots: { index: false, follow: false },
};

export default async function EquipoPage() {
  await requireRole(["founder", "manager"]);
  const supabase = await createSupabaseServer();

  const { data: members } = await supabase
    .from("admin_users")
    .select(
      "id, email, full_name, role, is_active, last_login_at, invitation_accepted_at"
    )
    .order("created_at", { ascending: false });

  const { data: pendingInvites } = await supabase
    .from("invitations")
    .select("id, email, role, full_name, created_at, expires_at, token")
    .is("accepted_at", null)
    .gt("expires_at", new Date().toISOString())
    .order("created_at", { ascending: false });

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="font-display text-4xl uppercase text-white mb-2">
        Equipo
      </h1>
      <p className="text-brand-gray mb-10">
        Miembros activos e invitaciones pendientes.
      </p>

      <InviteForm />

      <h2 className="font-display text-2xl uppercase text-white mt-12 mb-4">
        Miembros
      </h2>
      <div className="rounded-xl border border-brand-gold/15 overflow-hidden">
        <table className="w-full">
          <thead className="bg-black/40 border-b-2 border-brand-gold text-xs uppercase tracking-wider text-brand-yellow">
            <tr>
              <th className="px-4 py-3 text-left">Nombre</th>
              <th className="px-4 py-3 text-left">Email</th>
              <th className="px-4 py-3 text-left">Rol</th>
              <th className="px-4 py-3 text-left">Último login</th>
            </tr>
          </thead>
          <tbody>
            {members?.map((m) => (
              <tr
                key={m.id as string}
                className="border-b border-brand-gold/10 text-brand-gray"
              >
                <td className="px-4 py-3 text-white font-semibold">
                  {(m.full_name as string | null) ?? "—"}
                </td>
                <td className="px-4 py-3">{m.email as string}</td>
                <td className="px-4 py-3 uppercase text-xs tracking-wider text-brand-yellow">
                  {m.role as string}
                </td>
                <td className="px-4 py-3">
                  {m.last_login_at
                    ? new Date(m.last_login_at as string).toLocaleDateString(
                        "es-CO"
                      )
                    : "—"}
                </td>
              </tr>
            ))}
            {!members?.length && (
              <tr>
                <td
                  colSpan={4}
                  className="px-4 py-6 text-center text-brand-gray text-sm"
                >
                  No hay miembros aún.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {pendingInvites && pendingInvites.length > 0 && (
        <>
          <h2 className="font-display text-2xl uppercase text-white mt-12 mb-4">
            Invitaciones pendientes
          </h2>
          <div className="rounded-xl border border-brand-gold/15 overflow-hidden">
            <table className="w-full">
              <thead className="bg-black/40 border-b-2 border-brand-gold text-xs uppercase tracking-wider text-brand-yellow">
                <tr>
                  <th className="px-4 py-3 text-left">Email</th>
                  <th className="px-4 py-3 text-left">Rol</th>
                  <th className="px-4 py-3 text-left">Expira</th>
                  <th className="px-4 py-3 text-left">Link</th>
                </tr>
              </thead>
              <tbody>
                {pendingInvites.map((inv) => (
                  <tr
                    key={inv.id as string}
                    className="border-b border-brand-gold/10 text-brand-gray"
                  >
                    <td className="px-4 py-3 text-white">
                      {inv.email as string}
                    </td>
                    <td className="px-4 py-3 uppercase text-xs tracking-wider text-brand-yellow">
                      {inv.role as string}
                    </td>
                    <td className="px-4 py-3">
                      {new Date(inv.expires_at as string).toLocaleDateString(
                        "es-CO"
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <code className="text-xs text-brand-yellow/70">
                        /admin/invitacion/
                        {(inv.token as string).slice(0, 12)}...
                      </code>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}
