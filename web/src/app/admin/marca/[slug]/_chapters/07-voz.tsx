import { voicePillars, copyRules, headlineFormulas, voiceManifesto } from "../../_data/voice";
import { SectionTitle } from "@/components/admin/marca/SectionTitle";
import { VoiceTable } from "@/components/admin/marca/VoiceTable";
import { HeadlineFormulas, CopyRulesTable } from "@/components/admin/marca/HeadlineFormulas";

export default function Voz() {
  return (
    <div className="space-y-12">
      <section>
        <div className="rounded-2xl border border-brand-gold/15 p-8 bg-white/[0.02]">
          <div className="text-[10px] font-semibold tracking-[0.2em] uppercase text-brand-gold mb-3">
            · Manifiesto
          </div>
          <p className="font-display uppercase text-white text-2xl sm:text-3xl leading-tight">
            {voiceManifesto}
          </p>
        </div>
      </section>

      <section>
        <SectionTitle eyebrow="Identidad de voz" title="Somos / No somos." />
        <VoiceTable somos={voicePillars.somos} noSomos={voicePillars.noSomos} />
      </section>

      <section>
        <SectionTitle eyebrow="Reglas" title="Límites de copy." />
        <CopyRulesTable rules={copyRules} />
      </section>

      <section>
        <SectionTitle
          eyebrow="Fórmulas"
          title="Cómo escribimos headlines."
          desc="4 patrones que se repiten en la web, ads y social. Cualquier headline debe caber en una de estas estructuras."
        />
        <HeadlineFormulas formulas={headlineFormulas} />
      </section>
    </div>
  );
}
