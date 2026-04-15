import type { Metadata } from "next";
import { requireRole } from "@/lib/auth";
import { createSupabaseServer } from "@/lib/supabase-server";
import { InviteForm } from "./InviteForm";
import { PageHero, SectionTitle, Badge, Eyebrow } from "@/components/admin/ui";

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
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
      <PageHero
        eyebrow="Administración · Equipo"
        title="Quién está"
        highlight="adentro."
        lead="Miembros activos del admin e invitaciones pendientes. Controla quién tiene acceso y a qué."
      />

      <div className="mb-12">
        <SectionTitle
          eyebrow="Nueva invitación"
          title="Invitar miembro."
          desc="Genera un link con expiración para que el nuevo miembro complete su registro."
        />
        <div className="rounded-2xl border border-brand-gold/15 bg-white/[0.02] p-6">
          <InviteForm />
        </div>
      </div>

      <div className="mb-12">
        <SectionTitle eyebrow="Miembros activos" title="Equipo actual." />
        <div className="rounded-2xl border border-brand-gold/15 overflow-hidden bg-white/[0.02]">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-[10px] uppercase tracking-[0.15em] text-brand-gray bg-white/[0.02]">
                <th className="text-left px-6 py-3 font-semibold">Nombre</th>
                <th className="text-left px-6 py-3 font-semibold">Email</th>
                <th className="text-left px-6 py-3 font-semibold">Rol</th>
                <th className="text-left px-6 py-3 font-semibold">Último login</th>
              </tr>
            </thead>
            <tbody>
              {members?.length ? (
                members.map((m) => (
                  <tr
                    key={m.id as string}
                    className="border-t border-brand-gold/10 hover:bg-white/[0.02] transition-colors"
                  >
                    <td className="px-6 py-3 text-white font-semibold">
                      {(m.full_name as string | null) ?? "—"}
                    </td>
                    <td className="px-6 py-3 text-brand-gray">
                      {m.email as string}
                    </td>
                    <td className="px-6 py-3">
                      <Badge variant="gold">{m.role as string}</Badge>
                    </td>
                    <td className="px-6 py-3 text-brand-gray tabular-nums">
                      {m.last_login_at
                        ? new Date(m.last_login_at as string).toLocaleDateString(
                            "es-CO"
                          )
                        : "—"}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={4}
                    className="px-6 py-12 text-center text-brand-gray"
                  >
                    No hay miembros aún.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {pendingInvites && pendingInvites.length > 0 && (
        <div>
          <SectionTitle
            eyebrow="Pendientes"
            title="Invitaciones sin aceptar."
          />
          <div className="rounded-2xl border border-brand-gold/15 overflow-hidden bg-white/[0.02]">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-[10px] uppercase tracking-[0.15em] text-brand-gray bg-white/[0.02]">
                  <th className="text-left px-6 py-3 font-semibold">Email</th>
                  <th className="text-left px-6 py-3 font-semibold">Rol</th>
                  <th className="text-left px-6 py-3 font-semibold">Expira</th>
                  <th className="text-left px-6 py-3 font-semibold">Link</th>
                </tr>
              </thead>
              <tbody>
                {pendingInvites.map((inv) => (
                  <tr
                    key={inv.id as string}
                    className="border-t border-brand-gold/10"
                  >
                    <td className="px-6 py-3 text-white">{inv.email as string}</td>
                    <td className="px-6 py-3">
                      <Badge variant="gold">{inv.role as string}</Badge>
                    </td>
                    <td className="px-6 py-3 text-brand-gray tabular-nums">
                      {new Date(inv.expires_at as string).toLocaleDateString(
                        "es-CO"
                      )}
                    </td>
                    <td className="px-6 py-3">
                      <code className="text-xs font-mono text-brand-yellow/70">
                        /admin/invitacion/{(inv.token as string).slice(0, 12)}…
                      </code>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <div className="mt-16 pt-6 border-t border-brand-gold/15">
        <Eyebrow variant="gray">Solo founders y managers pueden invitar</Eyebrow>
      </div>
    </div>
  );
}
