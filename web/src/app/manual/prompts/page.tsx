import { SectionHero } from "../_components/SectionHero";
import { PromptCard } from "../_components/PromptCard";
import { promptLibrary } from "../_data/prompts";

export default function PromptsPage() {
  return (
    <>
      <SectionHero
        eyebrow="07 — Prompts Nanobanana"
        title="Biblioteca de prompts IA"
        subtitle="Cada prompt está calibrado con la paleta oficial y el mood boutique. Copia, reemplaza las variables entre llaves {} y genera con Gemini 2.5 Flash Image."
      />

      <section className="mt-10 p-6 rounded border border-brand-yellow/30 bg-brand-yellow/5 mb-14">
        <p className="font-display uppercase text-sm text-brand-yellow mb-3">
          Cómo generar
        </p>
        <ol className="font-sans text-sm text-white/90 space-y-2 list-decimal list-inside">
          <li>
            Clona el repo y abre <code className="font-mono text-xs text-brand-yellow">scripts/image-gen/</code>.
          </li>
          <li>
            Asegúrate de tener <code className="font-mono text-xs text-brand-yellow">GEMINI_API_KEY</code>{" "}
            en <code className="font-mono text-xs text-brand-yellow">web/.env.local</code>.
          </li>
          <li>
            Agrega tu prompt a un batch en{" "}
            <code className="font-mono text-xs text-brand-yellow">scripts/image-gen/prompts/</code>.
          </li>
          <li>
            Corre <code className="font-mono text-xs text-brand-yellow">node generate.mjs &lt;batch&gt;</code>.
          </li>
        </ol>
      </section>

      <div className="space-y-6">
        {promptLibrary.map((p) => (
          <PromptCard
            key={p.id}
            title={p.title}
            prompt={p.prompt}
            aspectRatio={p.aspectRatio}
            exampleSrc={p.exampleSrc}
            usage={p.usage}
          />
        ))}
      </div>
    </>
  );
}
