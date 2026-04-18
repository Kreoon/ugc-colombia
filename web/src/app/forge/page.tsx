import type { Metadata } from "next";
import { ForgeHero } from "@/components/forge/ForgeHero";
import { ForgeFeatures } from "@/components/forge/ForgeFeatures";
import { ForgeProofGallery } from "@/components/forge/ForgeProofGallery";
import { ForgeWhoAmI } from "@/components/forge/ForgeWhoAmI";
import { ForgeFAQ } from "@/components/forge/ForgeFAQ";
import { ForgeLeadForm } from "@/components/forge/ForgeLeadForm";
import { SocialLinks } from "@/components/shared/SocialLinks";

export const metadata: Metadata = {
  title: "Content Forge · Un estudio editorial en tu terminal — UGC Colombia",
  description:
    "Regalo de UGC Colombia: el pipeline que usamos para generar carruseles, reels y posts con calidad de agencia. Consistencia de personaje, voz configurable, tu propio rostro. Gratis, MIT.",
  openGraph: {
    title: "Content Forge — Un estudio editorial en tu terminal",
    description:
      "El pipeline de UGC Colombia, liberado como regalo. Carruseles, reels y posts con calidad de agencia desde Claude Code. Consistencia de personaje para marca personal.",
    url: "https://ugccolombia.co/forge",
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
  alternates: { canonical: "https://ugccolombia.co/forge" },
};

export default function ForgePage() {
  return (
    <main className="bg-brand-black min-h-screen">
      <ForgeHero />
      <ForgeFeatures />
      <ForgeProofGallery />
      <ForgeWhoAmI />
      <ForgeFAQ />

      {/* CTA final */}
      <section className="bg-brand-black py-20 md:py-28 border-t border-white/5">
        <div className="max-w-3xl mx-auto px-6 md:px-10">
          <div className="flex flex-col gap-4 items-center text-center mb-10">
            <span className="text-[10px] uppercase tracking-widest font-bold text-brand-yellow">
              Todo listo
            </span>
            <h2 className="font-display text-5xl md:text-6xl uppercase text-white leading-[0.95] tracking-tight">
              Déjanos tus datos y empieza hoy
            </h2>
            <p className="text-base text-brand-gray-light max-w-xl leading-relaxed">
              En menos de 1 minuto tendrás Content Forge en tu correo. En 20 minutos estarás publicando.
            </p>
          </div>

          <ForgeLeadForm variant="cta" />
        </div>
      </section>

      {/* Footer redes */}
      <section className="bg-brand-black py-12 border-t border-white/5">
        <div className="max-w-5xl mx-auto px-6 md:px-10">
          <SocialLinks variant="default" align="center" label="Síguenos para más regalos y contenido real" />
        </div>
      </section>
    </main>
  );
}
