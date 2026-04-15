import {
  logoVariants,
  logoShineCSS,
  logoShineNote,
  logoDo,
  logoDont,
  logoBackgroundRule,
  clearspaceRule,
  minSizes,
} from "../../_data/logo";
import { SectionTitle } from "@/components/admin/marca/SectionTitle";
import { LogoCard } from "@/components/admin/marca/LogoCard";
import { LogoRuleCallout } from "@/components/admin/marca/LogoRuleCallout";
import { ClearspaceDiagram } from "@/components/admin/marca/ClearspaceDiagram";
import { DoDontList } from "@/components/admin/marca/DoDontList";

export default function Logo() {
  return (
    <div className="space-y-12">
      <section>
        <LogoRuleCallout rule={logoBackgroundRule} />
      </section>

      <section>
        <SectionTitle
          eyebrow="Variantes oficiales"
          title="Marca aplicada."
          desc="Logo oficial en producción: /public/brand/logo-dark-bg.png — 814 × 351 px — PNG RGBA."
        />
        <div className="grid sm:grid-cols-2 gap-4">
          {logoVariants.map((v) => (
            <LogoCard key={v.id} variant={v} />
          ))}
        </div>
      </section>

      <section>
        <SectionTitle eyebrow="Efecto shine" title="Barrido premium." />
        <div className="rounded-2xl border border-brand-gold/15 p-6 bg-white/[0.02]">
          <pre className="text-[11px] font-mono text-brand-gray bg-black/40 rounded-lg p-4 overflow-x-auto whitespace-pre">
            <code>{logoShineCSS}</code>
          </pre>
          <p className="text-sm text-brand-gray mt-4 leading-relaxed">{logoShineNote}</p>
        </div>
      </section>

      <section>
        <SectionTitle eyebrow="Clearspace" title="Zona de respeto." />
        <ClearspaceDiagram />
        <p className="text-sm text-brand-gray mt-4 leading-relaxed">{clearspaceRule}</p>
      </section>

      <section>
        <SectionTitle eyebrow="Tamaños mínimos" title="No más pequeño que esto." />
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="rounded-2xl border border-brand-gold/15 overflow-hidden bg-white/[0.02]">
            <div className="px-6 py-4 border-b border-brand-gold/15">
              <div className="text-[10px] font-semibold tracking-[0.2em] uppercase text-brand-gold">
                · Digital
              </div>
            </div>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-[10px] uppercase tracking-[0.15em] text-brand-gray bg-white/[0.02]">
                  <th className="text-left px-4 py-2 font-semibold">Versión</th>
                  <th className="text-left px-4 py-2 font-semibold">Mínimo</th>
                  <th className="text-left px-4 py-2 font-semibold">Recomendado</th>
                </tr>
              </thead>
              <tbody>
                {minSizes.digital.map((row) => (
                  <tr key={row.variant} className="border-t border-brand-gold/10">
                    <td className="px-4 py-2 text-white">{row.variant}</td>
                    <td className="px-4 py-2 font-mono text-brand-yellow">{row.min}</td>
                    <td className="px-4 py-2 font-mono text-brand-gray">{row.recomendado}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="rounded-2xl border border-brand-gold/15 overflow-hidden bg-white/[0.02]">
            <div className="px-6 py-4 border-b border-brand-gold/15">
              <div className="text-[10px] font-semibold tracking-[0.2em] uppercase text-brand-gold">
                · Impresión
              </div>
            </div>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-[10px] uppercase tracking-[0.15em] text-brand-gray bg-white/[0.02]">
                  <th className="text-left px-4 py-2 font-semibold">Versión</th>
                  <th className="text-left px-4 py-2 font-semibold">Mínimo</th>
                </tr>
              </thead>
              <tbody>
                {minSizes.print.map((row) => (
                  <tr key={row.variant} className="border-t border-brand-gold/10">
                    <td className="px-4 py-2 text-white">{row.variant}</td>
                    <td className="px-4 py-2 font-mono text-brand-yellow">{row.min}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section>
        <SectionTitle eyebrow="Reglas de uso" title="Do / Don't." />
        <DoDontList doList={logoDo} dontList={logoDont} />
      </section>
    </div>
  );
}
