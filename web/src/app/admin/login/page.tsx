import type { Metadata } from "next";
import { LoginForm } from "./LoginForm";

export const metadata: Metadata = {
  title: "Admin Login — UGC Colombia",
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="inline-flex items-center gap-2 text-brand-yellow text-xs font-semibold tracking-[0.2em] uppercase mb-4">
            <span className="w-1.5 h-1.5 bg-brand-yellow rounded-full" />
            UGC Colombia · Admin
          </div>
          <h1 className="font-display text-4xl uppercase tracking-tight text-white">
            Bienvenido{" "}
            <span className="bg-gradient-to-r from-[#f9b334] via-[#d4a017] to-[#f9b334] bg-clip-text text-transparent">
              de vuelta.
            </span>
          </h1>
        </div>
        <LoginForm />
      </div>
    </main>
  );
}
