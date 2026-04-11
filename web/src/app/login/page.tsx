import { createMetadata } from "@/lib/seo/metadata";
import { Navbar } from "@/components/home/Navbar";
import { Footer } from "@/components/home/Footer";
import { LoginForm } from "@/components/auth/LoginForm";

export const metadata = createMetadata({
  title: "Iniciar Sesión",
  description:
    "Inicia sesión en tu cuenta de UGC Colombia y accede a la plataforma KREOON.",
  path: "/login",
  noIndex: true,
});

export default function LoginPage() {
  return (
    <>
      <Navbar />
      <main className="relative min-h-screen bg-brand-black text-white overflow-hidden flex items-center">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-0"
          style={{
            background:
              "radial-gradient(ellipse at top, rgba(212,160,23,0.20) 0%, rgba(0,0,0,0) 55%), radial-gradient(ellipse at bottom right, rgba(249,179,52,0.10) 0%, rgba(0,0,0,0) 60%)",
          }}
        />
        <section className="relative z-10 w-full pt-28 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md mx-auto">
            <LoginForm />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
