/**
 * SocialLinks — Redes sociales oficiales de la agencia.
 *
 * Instagram · YouTube · Facebook · TikTok.
 * Handle único oficial: @agenciaugccolombia
 */

import Link from "next/link";

export type SocialLinksProps = {
  variant?: "default" | "compact" | "iconic";
  align?: "left" | "center" | "right";
  label?: string;
  className?: string;
};

const SOCIALS = [
  {
    name: "Instagram",
    url: "https://www.instagram.com/agenciaugccolombia",
    handle: "@agenciaugccolombia",
    icon: InstagramIcon,
  },
  {
    name: "YouTube",
    url: "https://www.youtube.com/@agenciaugccolombia",
    handle: "@agenciaugccolombia",
    icon: YoutubeIcon,
  },
  {
    name: "Facebook",
    url: "https://www.facebook.com/agenciaugccolombia",
    handle: "Agencia UGC Colombia",
    icon: FacebookIcon,
  },
  {
    name: "TikTok",
    url: "https://www.tiktok.com/@agenciaugccolombia",
    handle: "@agenciaugccolombia",
    icon: TiktokIcon,
  },
];

export function SocialLinks({
  variant = "default",
  align = "center",
  label = "Síguenos para más regalos",
  className = "",
}: SocialLinksProps) {
  const alignClass =
    align === "left" ? "text-left items-start" : align === "right" ? "text-right items-end" : "text-center items-center";

  if (variant === "iconic") {
    return (
      <div className={`flex gap-4 ${align === "center" ? "justify-center" : align === "right" ? "justify-end" : "justify-start"} ${className}`}>
        {SOCIALS.map((s) => (
          <Link
            key={s.name}
            href={s.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${s.name} · ${s.handle}`}
            className="group flex items-center justify-center w-12 h-12 rounded-full border border-brand-yellow/40 bg-black/40 hover:bg-brand-yellow hover:border-brand-yellow transition-all"
          >
            <s.icon className="w-5 h-5 text-brand-yellow group-hover:text-black transition-colors" />
          </Link>
        ))}
      </div>
    );
  }

  if (variant === "compact") {
    return (
      <div className={`flex flex-wrap gap-x-4 gap-y-2 ${align === "center" ? "justify-center" : align === "right" ? "justify-end" : "justify-start"} ${className}`}>
        {SOCIALS.map((s) => (
          <Link
            key={s.name}
            href={s.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-brand-yellow hover:text-brand-yellow-hover font-medium transition-colors"
          >
            {s.name}
          </Link>
        ))}
      </div>
    );
  }

  return (
    <div className={`flex flex-col gap-3 ${alignClass} ${className}`}>
      {label ? (
        <p className="text-xs text-brand-gray-light uppercase tracking-widest font-semibold">
          {label}
        </p>
      ) : null}
      <div className={`flex flex-wrap gap-3 ${align === "center" ? "justify-center" : align === "right" ? "justify-end" : "justify-start"}`}>
        {SOCIALS.map((s) => (
          <Link
            key={s.name}
            href={s.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-full border border-brand-yellow/30 bg-black/40 hover:border-brand-yellow hover:bg-brand-yellow/10 transition-all"
          >
            <s.icon className="w-4 h-4 text-brand-yellow" />
            <span className="text-sm font-medium text-white">{s.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

// ─── Icons ─────────────────────────────────────────────────────────────
function InstagramIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function YoutubeIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

function FacebookIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function TiktokIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43V8.6a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.84-.03z" />
    </svg>
  );
}
