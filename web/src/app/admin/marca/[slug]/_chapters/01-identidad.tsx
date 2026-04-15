import { identity } from "../../_data/identity";
import { SectionTitle } from "@/components/admin/marca/SectionTitle";
import {
  PropuestaBlock,
  ArquetipoPromesa,
  ValoresGrid,
  StatsRow,
} from "@/components/admin/marca/IdentityBlocks";

export default function Identidad() {
  return (
    <div className="space-y-12">
      <section>
        <SectionTitle
          eyebrow="Propósito oficial"
          title="Para qué existimos."
          desc="La propuesta de valor guía toda la comunicación — web, social, ads, decks, email. Debajo de ella, el descriptor boutique y el tagline operativo."
        />
        <PropuestaBlock
          propuestaDeValor={identity.propuestaDeValor}
          propuestaDeValorDesc={identity.propuestaDeValorDesc}
          propuesta={identity.propuesta}
          tagline={identity.tagline}
        />
      </section>

      <section>
        <SectionTitle eyebrow="Arquetipo + promesa" title="Cómo operamos." />
        <ArquetipoPromesa arquetipo={identity.arquetipo} promesa={identity.promesa} />
      </section>

      <section>
        <SectionTitle eyebrow="Valores" title="Qué nos guía." />
        <ValoresGrid valores={identity.valores} />
      </section>

      <section>
        <SectionTitle eyebrow="Números" title="Quiénes somos hoy." />
        <StatsRow stats={identity.stats} />
      </section>
    </div>
  );
}
