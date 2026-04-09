import { Instagram, Music2, Linkedin, MessageCircle } from "lucide-react";

interface SocialLink {
  label: string;
  href: string;
  icon: React.ReactNode;
}

const SOCIAL_LINKS: SocialLink[] = [
  {
    label: "Instagram de UGC Colombia",
    href: "https://instagram.com/agenciaugccolombia",
    icon: <Instagram size={20} aria-hidden="true" />,
  },
  {
    label: "TikTok de UGC Colombia",
    href: "https://tiktok.com/@agenciaugccolombia",
    icon: <Music2 size={20} aria-hidden="true" />,
  },
  {
    label: "WhatsApp de UGC Colombia",
    href: "https://wa.me/573001234567?text=Hola%2C%20quiero%20saber%20m%C3%A1s%20de%20UGC%20Colombia",
    icon: <MessageCircle size={20} aria-hidden="true" />,
  },
  {
    label: "LinkedIn de UGC Colombia",
    href: "https://linkedin.com/company/ugccolombia",
    icon: <Linkedin size={20} aria-hidden="true" />,
  },
];

export function SocialIcons() {
  return (
    <nav aria-label="Redes sociales de UGC Colombia">
      <ul className="flex items-center gap-4">
        {SOCIAL_LINKS.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.label}
              className="text-brand-gray hover:text-brand-gold transition-colors duration-200 hover:scale-110 inline-block"
            >
              {link.icon}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
