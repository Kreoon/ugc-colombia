import { Navbar } from "@/components/home/Navbar";
import { Footer } from "@/components/home/Footer";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs, type BreadcrumbItem } from "@/components/seo/Breadcrumbs";

interface PageShellProps {
  children: React.ReactNode;
  breadcrumbs?: BreadcrumbItem[];
  jsonLd?: Record<string, unknown>[];
  className?: string;
}

export function PageShell({
  children,
  breadcrumbs,
  jsonLd,
  className,
}: PageShellProps) {
  return (
    <>
      <Navbar />
      {jsonLd?.map((schema, i) => <JsonLd key={i} data={schema} />)}
      {breadcrumbs && <Breadcrumbs items={breadcrumbs} />}
      <main
        id="main-content"
        className={className ?? "relative bg-brand-black text-white"}
      >
        {children}
      </main>
      <Footer />
    </>
  );
}
