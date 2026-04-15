import { palette, signatureGradient, usageProportions, proportionsNote } from "../../_data/colors";
import { SectionTitle } from "@/components/admin/marca/SectionTitle";
import { ColorSwatch } from "@/components/admin/marca/ColorSwatch";
import { GradientShowcase } from "@/components/admin/marca/GradientShowcase";
import { UsageProportions } from "@/components/admin/marca/UsageProportions";

export default function Color() {
  return (
    <div className="space-y-12">
      <section>
        <SectionTitle
          eyebrow="Paleta oficial"
          title="Negro, amarillo y oro."
          desc="Los valores HEX usados en producción en ugccolombia.co. Esta es la fuente única de verdad para cualquier pieza, canal o formato."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {palette.map((token) => (
            <ColorSwatch key={token.hex} token={token} />
          ))}
        </div>
      </section>

      <section>
        <SectionTitle eyebrow="Gradiente signature" title="El toque premium." />
        <GradientShowcase
          css={signatureGradient.css}
          description={signatureGradient.description}
        />
      </section>

      <section>
        <SectionTitle eyebrow="Frecuencia" title="Cómo se usa en código." />
        <UsageProportions proportions={usageProportions} note={proportionsNote} />
      </section>
    </div>
  );
}
