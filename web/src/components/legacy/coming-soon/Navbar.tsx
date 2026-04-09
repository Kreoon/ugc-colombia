import Image from "next/image";
import { SocialIcons } from "./SocialIcons";

/**
 * Navbar minimal del coming soon.
 * Usa el logo oficial dark-bg (blanco/gris sobre fondo oscuro).
 */
export function Navbar() {
  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 bg-black/75 backdrop-blur-md border-b border-brand-gold/20"
      role="banner"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <a
          href="/"
          className="flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold rounded-sm"
          aria-label="UGC Colombia - Inicio"
        >
          <Image
            src="/brand/logo-dark-bg.png"
            alt="UGC Colombia"
            width={140}
            height={40}
            className="h-8 sm:h-9 w-auto"
            priority
          />
        </a>
        <SocialIcons />
      </div>
    </header>
  );
}
