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

const passwordField = z.string().min(8, "Mínimo 8 caracteres");
const legalField = z.literal(true, {
  errorMap: () => ({ message: "Debes aceptar este punto" }),
});

const baseFields = {
  full_name: z.string().min(2, "Ingresa tu nombre completo"),
  email: z.string().email("Email inválido"),
  phone: z.string().min(7, "Teléfono inválido"),
  password: passwordField,
  confirm_password: z.string(),
  legal_accepted: legalField,
};

export const creatorSchema = z
  .object({
    type: z.literal("creator"),
    ...baseFields,
  })
  .refine((d) => d.password === d.confirm_password, {
    message: "Las contraseñas no coinciden",
    path: ["confirm_password"],
  });

export const brandSchema = z
  .object({
    type: z.literal("brand"),
    company_name: z.string().min(2, "Nombre de empresa requerido"),
    ...baseFields,
  })
  .refine((d) => d.password === d.confirm_password, {
    message: "Las contraseñas no coinciden",
    path: ["confirm_password"],
  });

export type CreatorPayload = z.infer<typeof creatorSchema>;
export type BrandPayload = z.infer<typeof brandSchema>;
export type RegistrationPayload = CreatorPayload | BrandPayload;
