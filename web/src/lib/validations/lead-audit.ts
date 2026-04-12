import { z } from "zod";

// Step 1: Tipo de lead
export const leadTypeSchema = z.object({
  lead_type: z.enum(["marca", "creador"], {
    required_error: "Selecciona una opción",
  }),
});

// Step 2: Datos básicos de marca
export const brandInfoSchema = z.object({
  full_name: z.string().min(2, "Ingresa tu nombre"),
  company_name: z.string().min(2, "Ingresa el nombre de tu marca"),
  website: z.string().optional(),
  industry: z.enum([
    "ecommerce",
    "marca_productos",
    "servicios",
    "saas",
    "dropshipping",
    "restaurantes",
    "salud_belleza",
    "educacion",
    "fintech",
    "otro",
  ], { required_error: "Selecciona tu industria" }),
  instagram_handle: z.string().optional(),
});

// Step 2: Datos básicos de creador
export const creatorInfoSchema = z.object({
  full_name: z.string().min(2, "Ingresa tu nombre"),
  creator_niche: z.string().min(2, "¿En qué nicho creas contenido?"),
  creator_platforms: z.array(z.string()).min(1, "Selecciona al menos una plataforma"),
  creator_portfolio_url: z.string().optional(),
  creator_followers: z.enum(["menos_1k", "1k_10k", "10k_50k", "50k_100k", "mas_100k"], {
    required_error: "Selecciona un rango",
  }),
  creator_experience_years: z.enum(["menos_1", "1_2", "3_5", "mas_5"], {
    required_error: "Selecciona tu experiencia",
  }),
});

// Step 3: Auditoría de marca (preguntas calificativas)
export const brandAuditSchema = z.object({
  ad_budget: z.enum(["nada", "menos_500", "500_1000", "1000_3000", "3000_5000", "mas_5000"], {
    required_error: "Selecciona un rango",
  }),
  content_budget: z.enum(["nada", "menos_500", "500_1000", "1000_3000", "3000_5000", "mas_5000"], {
    required_error: "Selecciona un rango",
  }),
  has_active_ads: z.boolean(),
  current_ctr: z.enum(["no_se", "menos_1", "1_2", "mas_2"], {
    required_error: "Selecciona una opción",
  }),
  creative_age_weeks: z.enum(["menos_2", "2_4", "4_8", "mas_8", "no_tengo"], {
    required_error: "Selecciona una opción",
  }),
  monthly_content_pieces: z.enum(["0", "1_3", "4_8", "9_15", "mas_15"], {
    required_error: "Selecciona una opción",
  }),
  biggest_pain: z.enum([
    "no_tengo_contenido",
    "contenido_no_convierte",
    "muy_caro",
    "no_encuentro_creadores",
    "inconsistencia",
    "no_se_que_hacer",
  ], { required_error: "Selecciona tu mayor dolor" }),
  urgency: z.enum(["inmediata", "este_mes", "proximo_trimestre", "explorando"], {
    required_error: "Selecciona la urgencia",
  }),
});

// Step 3: Auditoría de creador
export const creatorAuditSchema = z.object({
  content_types: z.array(z.string()).min(1, "Selecciona al menos un tipo"),
  has_ugc_experience: z.boolean(),
  rate_per_video: z.enum(["menos_50", "50_100", "100_200", "200_500", "mas_500", "no_se"], {
    required_error: "Selecciona un rango",
  }),
  availability: z.enum(["inmediata", "1_semana", "2_semanas", "1_mes"], {
    required_error: "Selecciona tu disponibilidad",
  }),
  biggest_goal: z.enum([
    "ganar_dinero",
    "trabajar_con_marcas",
    "crecer_audiencia",
    "mejorar_habilidades",
    "ingreso_estable",
  ], { required_error: "Selecciona tu objetivo principal" }),
});

// Step 4: Datos de contacto
export const contactInfoSchema = z.object({
  email: z.string().email("Email inválido"),
  whatsapp: z.string().min(7, "WhatsApp inválido"),
  country: z.string().optional(),
});

// Schema completo para marca
export const fullBrandLeadSchema = leadTypeSchema
  .merge(brandInfoSchema)
  .merge(brandAuditSchema)
  .merge(contactInfoSchema);

// Schema completo para creador
export const fullCreatorLeadSchema = leadTypeSchema
  .merge(creatorInfoSchema)
  .merge(creatorAuditSchema)
  .merge(contactInfoSchema);

export type LeadType = z.infer<typeof leadTypeSchema>;
export type BrandInfo = z.infer<typeof brandInfoSchema>;
export type CreatorInfo = z.infer<typeof creatorInfoSchema>;
export type BrandAudit = z.infer<typeof brandAuditSchema>;
export type CreatorAudit = z.infer<typeof creatorAuditSchema>;
export type ContactInfo = z.infer<typeof contactInfoSchema>;
export type FullBrandLead = z.infer<typeof fullBrandLeadSchema>;
export type FullCreatorLead = z.infer<typeof fullCreatorLeadSchema>;
