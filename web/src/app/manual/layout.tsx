import Link from "next/link";
import Image from "next/image";
import { ReactNode } from "react";
import { officialLogo } from "./_data/logos";

export const metadata = {
  title: "Manual de Marca — UGC Colombia",
  description:
    "Sistema visual y de comunicación de UGC Colombia. Guidelines, tokens, logo, plantillas sociales, ads y decks.",
  robots: { index: false, follow: false },
};

const nav = [
  { href: "/manual", label: "Inicio", hint: "Overview" },
  { href: "/manual/guidelines", label: "Guidelines", hint: "Identidad y tono" },
  { href: "/manual/tokens", label: "Design Tokens", hint: "Colores y tipografía" },
  { href: "/manual/logo", label: "Logo", hint: "Variantes y usos" },
  { href: "/manual/social", label: "Plantillas Sociales", hint: "IG, TikTok, LinkedIn, YT" },
  { href: "/manual/ads", label: "Ads", hint: "Meta, Google, TikTok" },
  { href: "/manual/decks", label: "Kit Presentaciones", hint: "Pitch deck" },
  { href: "/manual/prompts", label: "Prompts Nanobanana", hint: "Biblioteca IA" },
];

export default function ManualLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-brand-black text-white">
      <div className="mx-auto flex max-w-[1400px]">
        <aside className="hidden lg:block w-72 shrink-0 border-r border-brand-gray-dark/60 py-12 px-6 sticky top-0 h-screen overflow-y-auto">
          <Link href="/manual" className="block mb-10">
            <div className="relative w-40 h-12 bg-brand-cream rounded-sm">
              <Image
                src={officialLogo.file}
                alt="UGC Colombia"
                fill
                sizes="160px"
                className="object-contain p-2"
              />
            </div>
            <p className="font-display uppercase tracking-[0.2em] text-[10px] text-brand-yellow mt-3">
              Manual de Marca · v2
            </p>
          </Link>
          <nav className="space-y-1">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block rounded px-3 py-2.5 hover:bg-white/5 border border-transparent hover:border-brand-yellow/30 transition-all group"
              >
                <p className="font-sans font-medium text-sm text-white group-hover:text-brand-yellow">
                  {item.label}
                </p>
                <p className="font-sans text-[11px] text-brand-gray-light mt-0.5">
                  {item.hint}
                </p>
              </Link>
            ))}
          </nav>
          <div className="mt-10 pt-6 border-t border-brand-gray-dark/60">
            <p className="font-sans text-[10px] uppercase tracking-widest text-brand-gray-light">
              Equipo
            </p>
            <p className="font-sans text-xs text-white mt-2">
              Alexander · Diana · Brian · Samuel · Tanya · Valentina
            </p>
            <p className="font-sans text-[10px] text-brand-gray-light mt-4">
              Actualizado 2026-04-15
            </p>
          </div>
        </aside>

        <main className="flex-1 min-w-0 py-10 px-6 sm:px-10 lg:px-16 max-w-full">
          <div className="lg:hidden mb-8 pb-6 border-b border-brand-gray-dark/60">
            <Link href="/manual" className="font-display uppercase tracking-[0.2em] text-xs text-brand-yellow">
              ← Manual
            </Link>
          </div>
          {children}
        </main>
      </div>
    </div>
  );
}
