import { SocialIcons } from "./SocialIcons";

export function Navbar() {
  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-brand-graphite/40"
      role="banner"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center">
          <span
            className="font-display text-xl tracking-widest text-white uppercase"
            aria-label="UGC Colombia"
          >
            UGC{" "}
            <span className="text-brand-gold">Colombia</span>
          </span>
        </div>
        <SocialIcons />
      </div>
    </header>
  );
}
