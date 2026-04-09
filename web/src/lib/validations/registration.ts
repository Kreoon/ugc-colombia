import { z } from "zod";

export const CATEGORIES = [
  "belleza",
  "moda",
  "lifestyle",
  "fitness",
  "tech",
  "gastronomia",
  "viajes",
  "hogar",
  "mascotas",
  "gaming",
] as const;

export const INDUSTRIES = [
  { value: "belleza", label: "Belleza y Cuidado Personal" },
  { value: "moda", label: "Moda y Accesorios" },
  { value: "alimentos", label: "Alimentos y Bebidas" },
  { value: "tech", label: "Tecnología" },
  { value: "salud", label: "Salud y Bienestar" },
  { value: "hogar", label: "Hogar y Decoración" },
  { value: "servicios", label: "Servicios" },
  { value: "otro", label: "Otro" },
] as const;

const baseFields = {
  email: z.string().email("Email inválido"),
  password: z.string().min(8, "Mínimo 8 caracteres"),
  phone: z.string().optional().or(z.literal("")),
  city: z.string().optional().or(z.literal("")),
};

export const creatorSchema = z.object({
  type: z.literal("creator"),
  full_name: z.string().min(2, "Ingresa tu nombre completo"),
  instagram: z.string().optional().or(z.literal("")),
  tiktok: z.string().optional().or(z.literal("")),
  categories: z.array(z.enum(CATEGORIES)).optional(),
  ...baseFields,
});

export const brandSchema = z.object({
  type: z.literal("brand"),
  company_name: z.string().min(2, "Nombre de empresa requerido"),
  contact_name: z.string().min(2, "Nombre del contacto requerido"),
  website: z
    .string()
    .url("URL inválida")
    .optional()
    .or(z.literal("")),
  industry: z.string().optional().or(z.literal("")),
  ...baseFields,
});

export type CreatorPayload = z.infer<typeof creatorSchema>;
export type BrandPayload = z.infer<typeof brandSchema>;
export type RegistrationPayload = CreatorPayload | BrandPayload;
