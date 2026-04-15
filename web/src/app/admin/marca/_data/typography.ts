export const typography = {
  display: {
    name: "Anton",
    role: "Display",
    desc: "Sans-serif condensada de impacto. Titulares en mayúsculas con personalidad fuerte. Único peso disponible: 400. El peso visual se logra con tamaño y contraste, nunca con bold.",
    source: "Google Fonts",
    weights: [400],
    cssVar: "--font-anton",
    sample: "HACEMOS CRECER MARCAS.",
  },
  body: {
    name: "Inter",
    role: "Body",
    desc: "Sans-serif funcional, limpio, legible. Todo el contenido de cuerpo, UI, botones y labels.",
    source: "Google Fonts",
    weights: [400, 500, 600, 700],
    cssVar: "--font-inter",
    sample:
      "Párrafo estándar, descripciones, UI text, contenido corrido. Esta es la base legible del sistema.",
  },
};

export interface TypeHierarchyEntry {
  level: string;
  family: "Anton" | "Inter";
  weight: number;
  size: string;
  leading?: string;
  tracking?: string;
  transform?: "uppercase" | "none";
  sample: string;
  description: string;
}

export const hierarchy: TypeHierarchyEntry[] = [
  {
    level: "Display · Hero Headline",
    family: "Anton",
    weight: 400,
    size: "clamp(2.4rem, 8vw, 8rem)",
    leading: "0.92",
    transform: "uppercase",
    sample: "HACEMOS CRECER MARCAS.",
    description: "Hero headline de la home y landing principal.",
  },
  {
    level: "H2 Section",
    family: "Anton",
    weight: 400,
    size: "clamp(2.5rem, 6vw, 5rem)",
    tracking: "tracking-tight",
    transform: "uppercase",
    sample: "QUE LOS RESULTADOS HABLEN.",
    description: "Headline de sección interna.",
  },
  {
    level: "H3 Card",
    family: "Inter",
    weight: 700,
    size: "14–20pt",
    transform: "none",
    sample: "Subtítulo de módulo",
    description: "Cards, testimonios, precios.",
  },
  {
    level: "Body",
    family: "Inter",
    weight: 400,
    size: "16px",
    leading: "1.5",
    transform: "none",
    sample:
      "Párrafo estándar, descripciones, UI text, contenido corrido. Esta es la base legible del sistema — la que transporta la información real al visitante.",
    description: "Texto corrido estándar.",
  },
  {
    level: "Label",
    family: "Inter",
    weight: 600,
    size: "12px",
    tracking: "tracking-[0.18em] hasta 0.35em",
    transform: "uppercase",
    sample: "MARCAS QUE CONFIARON EN NOSOTROS",
    description: "All caps, máx 4 palabras.",
  },
];
