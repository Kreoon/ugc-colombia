import { SocialIcons } from "./SocialIcons";

const WA_LINK =
  "https://wa.me/573001234567?text=Hola%2C%20quiero%20agendar%20una%20llamada%20con%20UGC%20Colombia";

export function Footer() {
  return (
    <footer
      className="w-full border-t border-brand-graphite/40 mt-16 py-8 px-4"
      role="contentinfo"
    >
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        <p className="text-brand-gray/60 text-xs text-center sm:text-left">
          &copy; 2026 UGC Colombia &middot; Contenido real, resultados reales.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-6">
          <SocialIcons />
          <a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="font-sans text-sm font-semibold text-brand-yellow hover:text-brand-gold transition-colors duration-200 whitespace-nowrap"
            aria-label="Agenda una llamada con UGC Colombia por WhatsApp"
          >
            Agenda una llamada →
          </a>
        </div>
      </div>
    </footer>
  );
}
