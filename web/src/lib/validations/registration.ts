import { z } from "zod";

const passwordField = z.string().min(8, "Mínimo 8 caracteres");
const legalField = z.literal(true, {
  errorMap: () => ({ message: "Debes aceptar este punto" }),
});

export const registrationSchema = z
  .object({
    full_name: z.string().min(2, "Ingresa tu nombre completo"),
    email: z.string().email("Email inválido"),
    phone: z.string().min(7, "Teléfono inválido"),
    password: passwordField,
    confirm_password: z.string(),
    legal_accepted: legalField,
  })
  .refine((d) => d.password === d.confirm_password, {
    message: "Las contraseñas no coinciden",
    path: ["confirm_password"],
  });

export type RegistrationPayload = z.infer<typeof registrationSchema>;
