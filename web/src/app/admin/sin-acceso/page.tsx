import Link from 'next/link';
import { ShieldAlert, Mail, LogOut } from 'lucide-react';
import type { Metadata } from 'next';
import { createSupabaseServer } from '@/lib/supabase-server';

export const metadata: Metadata = {
  title: 'Sin acceso — UGC Colombia',
  robots: { index: false, follow: false },
};

export const dynamic = 'force-dynamic';

export default async function SinAccesoPage() {
  const supabase = await createSupabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <main className="min-h-screen bg-brand-black flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-brand-yellow/10 border border-brand-yellow/30 mb-6">
          <ShieldAlert
            className="w-8 h-8 text-brand-yellow"
            aria-hidden
          />
        </div>

        <div className="text-brand-yellow text-xs font-semibold tracking-[0.25em] uppercase mb-3">
          · UGC Colombia · Admin
        </div>

        <h1 className="font-display text-4xl uppercase text-white mb-4 leading-tight">
          Tu cuenta no tiene{' '}
          <span className="bg-gradient-to-r from-[#f9b334] via-[#d4a017] to-[#f9b334] bg-clip-text text-transparent">
            acceso aún.
          </span>
        </h1>

        <p className="text-brand-gray text-sm mb-8 leading-relaxed">
          Tu sesión está activa pero tu email todavía no está registrado en el
          equipo interno. Pide a Alexander que te agregue y vuelve a iniciar
          sesión.
        </p>

        {user?.email && (
          <div className="rounded-xl bg-white/[0.04] border border-white/10 px-4 py-3 mb-6 inline-flex items-center gap-2 text-sm text-white/90">
            <Mail className="w-4 h-4 text-brand-yellow" aria-hidden />
            {user.email}
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href="mailto:founder@kreoon.com?subject=Acceso%20admin%20UGC%20Colombia"
            className="inline-flex items-center justify-center gap-2 h-11 px-5 rounded-xl bg-brand-yellow text-black font-bold text-sm hover:bg-brand-gold transition-colors"
          >
            <Mail className="w-4 h-4" />
            Escribir a Alexander
          </a>

          <Link
            href="/admin/login?logout=1"
            className="inline-flex items-center justify-center gap-2 h-11 px-5 rounded-xl bg-white/5 border border-white/10 text-white/80 hover:bg-white/10 text-sm transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Cerrar sesión
          </Link>
        </div>
      </div>
    </main>
  );
}
