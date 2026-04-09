import type { Metadata } from "next";
import { Navbar } from "@/components/home/Navbar";
import { Footer } from "@/components/home/Footer";
import { RegistrationForm } from "@/components/auth/RegistrationForm";

export const metadata: Metadata = {
  title: "Registro | UGC Colombia × KREOON",
  description:
    "Únete a la comunidad de creadores UGC más grande de Colombia. Registro gratuito para creadores y marcas.",
};

export default function RegistroPage() {
  return (
    <>
      <Navbar />

      <main
        id="main-content"
        className="relative min-h-screen bg-brand-black text-white overflow-hidden"
      >
        {/* Gradientes de marca */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-0"
          style={{
            background:
              "radial-gradient(ellipse at top, rgba(212,160,23,0.18) 0%, rgba(0,0,0,0) 55%), radial-gradient(ellipse at bottom right, rgba(249,179,52,0.10) 0%, rgba(0,0,0,0) 60%)",
          }}
        />

        <section className="relative z-10 pt-28 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Panel promocional (solo desktop) */}
            <div className="hidden lg:block animate-fade-in">
              <span className="inline-block px-3 py-1 text-xs font-sans font-semibold tracking-widest uppercase text-brand-yellow border border-brand-yellow/40 rounded-full mb-6">
                Registro gratuito
              </span>
              <h2 className="font-display text-5xl xl:text-6xl text-white tracking-wide uppercase leading-[1.05] mb-6">
                Crea contenido que{" "}
                <span className="text-brand-yellow">vende</span>
              </h2>
              <p className="text-brand-gray font-sans text-lg leading-relaxed mb-8 max-w-md">
                Conectamos creadores UGC con marcas que buscan contenido
                auténtico y efectivo. Regístrate y accede a la plataforma
                KREOON.
              </p>

              <ul className="space-y-4 text-brand-gray font-sans">
                {[
                  "Acceso directo a briefs de marcas reales",
                  "Pagos seguros y tracking de campañas",
                  "Comunidad de +500 creadores activos",
                  "Herramientas IA para producción de contenido",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-brand-yellow flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Formulario */}
            <div>
              <RegistrationForm />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
