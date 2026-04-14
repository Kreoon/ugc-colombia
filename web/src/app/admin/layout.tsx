import type { Metadata } from "next";
import { getCurrentUser } from "@/lib/auth";
import { Sidebar } from "@/components/admin/Sidebar";
import { Header } from "@/components/admin/Header";

export const metadata: Metadata = {
  title: "UGC Colombia · Admin",
  robots: { index: false, follow: false },
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // getCurrentUser puede fallar si Supabase no está disponible — absorbemos el error.
  const user = await getCurrentUser().catch(() => null);

  return (
    <div className="min-h-screen bg-brand-black text-white">
      {user ? (
        <div className="flex min-h-screen">
          <Sidebar user={user} />
          <div className="flex flex-col flex-1 min-w-0">
            <Header user={user} />
            <main id="admin-main" className="flex-1">
              {children}
            </main>
          </div>
        </div>
      ) : (
        // Rutas sin sesión: login, invitación — sin sidebar
        <>{children}</>
      )}
    </div>
  );
}
