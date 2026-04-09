import type { Metadata } from "next";
import Link from "next/link";
import { Briefcase, User } from "lucide-react";
import { Navbar } from "@/components/home/Navbar";
import { Footer } from "@/components/home/Footer";

export const metadata: Metadata = {
  title: "Registro | UGC Colombia × KREOON",
  description:
    "Únete a la comunidad UGC Colombia. Registro gratuito para marcas y creadores.",
};

export default function RegistroPage() {
  return (
    <>
      <Navbar />
      <main className="relative min-h-screen bg-brand-black text-white overflow-hidden flex items-center">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-0"
          style={{
            background:
              "radial-gradient(ellipse at top, rgba(249,115,22,0.18) 0%, rgba(0,0,0,0) 55%), radial-gradient(ellipse at bottom right, rgba(249,115,22,0.10) 0%, rgba(0,0,0,0) 60%)",
          }}
        />

        <section className="relative z-10 w-full pt-28 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block px-3 py-1 rounded-full text-[10px] font-sans font-bold tracking-widest uppercase mb-5 text-[#f97316] border border-[#f97316]/50 bg-[#f97316]/10">
              Comunidad UGC
            </span>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-white tracking-wide uppercase leading-tight mb-4">
              Únete a <span className="text-[#f97316]">UGC Colombia</span>
            </h1>
            <p className="text-brand-gray font-sans text-base sm:text-lg max-w-xl mx-auto mb-10">
              Selecciona cómo quieres registrarte y comienza con 1 mes gratis +
              800 tokens AI de bienvenida.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 max-w-2xl mx-auto">
              <Link
                href="/registro/marca"
                className="group p-6 sm:p-8 rounded-2xl border border-[#222] bg-[#111] hover:border-[#f97316] hover:shadow-[0_0_40px_rgba(249,115,22,0.2)] transition-all text-left"
              >
                <div className="w-14 h-14 rounded-xl bg-[#f97316]/15 flex items-center justify-center mb-5 group-hover:bg-[#f97316]/25 transition-colors">
                  <Briefcase className="w-7 h-7 text-[#f97316]" />
                </div>
                <h2 className="font-display text-2xl text-white tracking-wide uppercase mb-2">
                  Soy Marca
                </h2>
                <p className="text-zinc-400 font-sans text-sm leading-relaxed mb-4">
                  Busco creadores UGC para mis campañas y productos.
                </p>
                <span className="text-[#f97316] font-sans text-sm font-semibold group-hover:underline">
                  Registrar marca →
                </span>
              </Link>

              <Link
                href="/registro/talento"
                className="group p-6 sm:p-8 rounded-2xl border border-[#222] bg-[#111] hover:border-[#f97316] hover:shadow-[0_0_40px_rgba(249,115,22,0.2)] transition-all text-left"
              >
                <div className="w-14 h-14 rounded-xl bg-[#f97316]/15 flex items-center justify-center mb-5 group-hover:bg-[#f97316]/25 transition-colors">
                  <User className="w-7 h-7 text-[#f97316]" />
                </div>
                <h2 className="font-display text-2xl text-white tracking-wide uppercase mb-2">
                  Soy Talento
                </h2>
                <p className="text-zinc-400 font-sans text-sm leading-relaxed mb-4">
                  Creo contenido UGC y quiero trabajar con marcas reales.
                </p>
                <span className="text-[#f97316] font-sans text-sm font-semibold group-hover:underline">
                  Registrar talento →
                </span>
              </Link>
            </div>

            <p className="text-zinc-500 text-sm mt-10">
              ¿Ya tienes cuenta?{" "}
              <a href="https://kreoon.com/auth" className="text-[#f97316] font-semibold hover:underline">
                Inicia sesión en KREOON
              </a>
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
