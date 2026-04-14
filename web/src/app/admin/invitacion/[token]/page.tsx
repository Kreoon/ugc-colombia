import { notFound } from "next/navigation";
import { createSupabaseServiceRole } from "@/lib/supabase-server";
import { InvitationForm } from "./InvitationForm";

export const metadata = {
  robots: { index: false, follow: false },
};

interface PageProps {
  params: Promise<{ token: string }>;
}

export default async function InvitationPage({ params }: PageProps) {
  const { token } = await params;
  const supabase = createSupabaseServiceRole();

  const { data: invitation } = await supabase
    .from("invitations")
    .select("id, email, role, full_name, expires_at, accepted_at")
    .eq("token", token)
    .maybeSingle();

  if (!invitation) notFound();

  if (invitation.accepted_at) {
    return (
      <main className="min-h-screen bg-black flex items-center justify-center px-4">
        <div className="max-w-md text-center">
          <h1 className="font-display text-3xl uppercase text-white mb-4">
            Invitación ya usada
          </h1>
          <p className="text-brand-gray">
            Esta invitación ya fue aceptada. Intenta iniciar sesión.
          </p>
          <a
            href="/admin/login"
            className="inline-block mt-6 px-6 py-3 rounded-xl bg-brand-yellow text-black font-bold hover:bg-brand-gold transition-colors"
          >
            Ir al login
          </a>
        </div>
      </main>
    );
  }

  if (new Date(invitation.expires_at as string) < new Date()) {
    return (
      <main className="min-h-screen bg-black flex items-center justify-center px-4">
        <div className="max-w-md text-center">
          <h1 className="font-display text-3xl uppercase text-white mb-4">
            Invitación expirada
          </h1>
          <p className="text-brand-gray">
            Pídele a un admin que te envíe una nueva.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="inline-flex items-center gap-2 text-brand-yellow text-xs font-semibold tracking-[0.2em] uppercase mb-4">
            <span className="w-1.5 h-1.5 bg-brand-yellow rounded-full" />
            UGC Colombia
          </div>
          <h1 className="font-display text-4xl uppercase tracking-tight text-white">
            Bienvenido{" "}
            <span className="bg-gradient-to-r from-[#f9b334] via-[#d4a017] to-[#f9b334] bg-clip-text text-transparent">
              al equipo.
            </span>
          </h1>
          <p className="text-brand-gray mt-4">{invitation.email as string}</p>
        </div>
        <InvitationForm
          token={token}
          email={invitation.email as string}
        />
      </div>
    </main>
  );
}
