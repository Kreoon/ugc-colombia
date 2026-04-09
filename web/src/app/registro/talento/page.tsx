import type { Metadata } from "next";
import { Navbar } from "@/components/home/Navbar";
import { Footer } from "@/components/home/Footer";
import { RegistrationForm } from "@/components/auth/RegistrationForm";

export const metadata: Metadata = {
  title: "Registro Talento | UGC Colombia × KREOON",
  description:
    "Únete como creador UGC en Colombia. Crea contenido para marcas reales y monetiza tu talento.",
};

export default function RegistroTalentoPage() {
  return (
    <>
      <Navbar />
      <main className="relative min-h-screen bg-brand-black text-white overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-0"
          style={{
            background:
              "radial-gradient(ellipse at top, rgba(249,115,22,0.18) 0%, rgba(0,0,0,0) 55%), radial-gradient(ellipse at bottom right, rgba(249,115,22,0.10) 0%, rgba(0,0,0,0) 60%)",
          }}
        />
        <section className="relative z-10 pt-28 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div className="hidden lg:block animate-fade-in">
              <span className="inline-block px-3 py-1 text-xs font-sans font-semibold tracking-widest uppercase text-[#f97316] border border-[#f97316]/40 rounded-full mb-6">
                Soy Talento
              </span>
              <h2 className="font-display text-5xl xl:text-6xl text-white tracking-wide uppercase leading-[1.05] mb-6">
                Crea contenido que <span className="text-[#f97316]">vende</span>
              </h2>
              <p className="text-brand-gray font-sans text-lg leading-relaxed mb-8 max-w-md">
                Únete a la comunidad UGC más grande de Colombia. Trabaja con
                marcas reales, recibe pagos seguros y crece como creador.
              </p>
              <ul className="space-y-4 text-brand-gray font-sans">
                {[
                  "Briefs de marcas verificadas",
                  "Pagos seguros vía KREOON",
                  "Comunidad activa de creadores",
                  "1 mes gratis y 800 tokens AI de bienvenida",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#f97316] flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <RegistrationForm initialType="creator" />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
