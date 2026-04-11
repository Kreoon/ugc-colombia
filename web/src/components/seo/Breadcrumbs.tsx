import Link from "next/link";
import { breadcrumbSchema } from "@/lib/seo/json-ld";
import { JsonLd } from "./JsonLd";

export interface BreadcrumbItem {
  label: string;
  href: string;
}

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  if (items.length <= 1) return null;

  const schemaItems = items.map((item) => ({
    name: item.label,
    url: item.href,
  }));

  return (
    <>
      <JsonLd data={breadcrumbSchema(schemaItems)} />
      <nav
        aria-label="Breadcrumbs"
        className="mx-auto max-w-7xl px-4 pt-24 pb-2 sm:px-6"
      >
        <ol className="flex items-center gap-1.5 text-sm text-brand-gray">
          {items.map((item, i) => (
            <li key={item.href} className="flex items-center gap-1.5">
              {i > 0 && (
                <span className="text-brand-gold" aria-hidden="true">
                  /
                </span>
              )}
              {i === items.length - 1 ? (
                <span className="text-white" aria-current="page">
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="transition-colors hover:text-brand-yellow"
                >
                  {item.label}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
