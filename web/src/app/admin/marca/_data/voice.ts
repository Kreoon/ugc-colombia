export const voicePillars = {
  somos: ["Directos", "Editoriales", "Técnicos", "Humanos", "Confiables"],
  noSomos: ["Vendedores", "Motivacionales", "Clichés", "Corporativos", "Hype"],
};

export const copyRules = [
  { element: "Headline", limit: "≤ 8 palabras" },
  { element: "Subhead", limit: "≤ 15 palabras" },
  { element: "Body ad", limit: "≤ 40 palabras" },
  { element: "CTA", limit: "≤ 4 palabras" },
  { element: "Label", limit: "≤ 3 palabras" },
];

export interface HeadlineFormula {
  pattern: string;
  example: string;
}

export const headlineFormulas: HeadlineFormula[] = [
  {
    pattern: "[BENEFICIO + ACCIÓN]",
    example: "HACEMOS CRECER MARCAS.",
  },
  {
    pattern: "[RESULTADO + PROOF]",
    example: "QUE LOS RESULTADOS HABLEN POR NOSOTROS.",
  },
  {
    pattern: "[DATO + CONTEXTO]",
    example: "4.2× ROAS. 60 DÍAS. UN SISTEMA.",
  },
  {
    pattern: "[ORIGEN COMO VENTAJA]",
    example: "UGC LATINO. ESTÁNDAR USA.",
  },
];

export const voiceManifesto =
  "Directo, premium, humano. No vendemos — construimos autoridad editorial con datos reales y lenguaje sin relleno.";
