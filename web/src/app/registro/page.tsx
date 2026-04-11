import { createMetadata } from "@/lib/seo/metadata";
import { Navbar } from "@/components/home/Navbar";
import { Footer } from "@/components/home/Footer";
import { RegistrationForm } from "@/components/auth/RegistrationForm";

export const metadata = createMetadata({
  title: "Registro",
  description:
    "Únete a la comunidad UGC Colombia. Registro gratuito para marcas y creadores.",
  path: "/registro",
  noIndex: true,
});

export default function RegistroPage() {
  return (
    <>
      <Navbar />
      <main className="relative min-h-screen bg-brand-black text-white overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-0"
          style={{
            background:
              "radial-gradient(ellipse at top, rgba(212,160,23,0.20) 0%, rgba(0,0,0,0) 55%), radial-gradient(ellipse at bottom right, rgba(249,179,52,0.10) 0%, rgba(0,0,0,0) 60%)",
          }}
        />
        <section className="relative z-10 pt-28 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div className="hidden lg:block animate-fade-in">
              <span className="inline-block px-3 py-1 text-xs font-sans font-semibold tracking-widest uppercase text-brand-yellow border border-brand-yellow/40 rounded-full mb-6">
                Registro gratuito
              </span>
              <h2 className="font-display text-5xl xl:text-6xl text-white tracking-wide uppercase leading-[1.05] mb-6">
                Únete a <span className="text-brand-yellow">UGC Colombia</span>
              </h2>
              <p className="text-brand-gray font-sans text-lg leading-relaxed mb-8 max-w-md">
                La comunidad UGC más grande de Colombia. Conecta con marcas,
                crea contenido y crece como profesional.
              </p>
              <ul className="space-y-4 text-brand-gray font-sans">
                {[
                  "Acceso a la plataforma KREOON",
                  "Comunidad activa de creadores y marcas",
                  "Pagos seguros y briefs verificados",
                  "100% gratis para empezar",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-brand-yellow flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
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
