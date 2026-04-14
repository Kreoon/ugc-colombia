import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { LoginForm } from "./LoginForm";

export const metadata: Metadata = {
  title: "Admin Login — UGC Colombia",
  robots: { index: false, follow: false },
};

export default async function AdminLoginPage() {
  if (await isAdminAuthenticated()) {
    redirect("/admin/diagnosticos");
  }

  return (
    <main className="min-h-screen bg-brand-black text-white flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-6">
          <h1 className="font-display text-2xl uppercase tracking-wide mb-2">
            Admin · UGC Colombia
          </h1>
          <p className="text-xs text-brand-gray">Acceso privado</p>
        </div>
        <LoginForm />
      </div>
    </main>
  );
}
