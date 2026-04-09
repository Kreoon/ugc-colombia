// ─────────────────────────────────────────────────────────────────────────────
// Tipos generados manualmente para el schema de UGC Colombia.
// Actualizar cuando el agente de backend entregue schema.sql definitivo.
// Para regenerar con tipos automáticos: npx supabase gen types typescript
// ─────────────────────────────────────────────────────────────────────────────

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      leads: {
        Row: {
          id: string;
          created_at: string;
          nombre: string;
          email: string;
          whatsapp: string | null;
          empresa: string | null;
          sitio_web: string | null;
          industria: LeadIndustria | null;
          presupuesto_ads: LeadPresupuesto | null;
          ugc_actual: LeadUgcActual | null;
          dolor_contenido: string | null;
          timeline: LeadTimeline | null;
          score: number | null;
          score_categoria: LeadScoreCategoria | null;
          fuente: string | null;
          utm_source: string | null;
          utm_medium: string | null;
          utm_campaign: string | null;
          status: LeadStatus;
          notas: string | null;
        };
        Insert: Omit<Database["public"]["Tables"]["leads"]["Row"], "id" | "created_at" | "score" | "score_categoria" | "status"> & {
          id?: string;
          created_at?: string;
          score?: number | null;
          score_categoria?: LeadScoreCategoria | null;
          status?: LeadStatus;
        };
        Update: Partial<Database["public"]["Tables"]["leads"]["Insert"]>;
      };
      casos: {
        Row: {
          id: string;
          created_at: string;
          slug: string;
          titulo: string;
          cliente_nombre: string;
          cliente_industria: string;
          cliente_pais: string;
          resumen: string;
          resultado_principal: string;
          metricas: Json;
          contenido_mdx: string | null;
          imagen_portada: string | null;
          publicado: boolean;
          orden: number;
        };
        Insert: Omit<Database["public"]["Tables"]["casos"]["Row"], "id" | "created_at">;
        Update: Partial<Database["public"]["Tables"]["casos"]["Insert"]>;
      };
      testimonios: {
        Row: {
          id: string;
          created_at: string;
          nombre: string;
          cargo: string | null;
          empresa: string | null;
          texto: string;
          rating: number;
          avatar_url: string | null;
          video_url: string | null;
          publicado: boolean;
          orden: number;
        };
        Insert: Omit<Database["public"]["Tables"]["testimonios"]["Row"], "id" | "created_at">;
        Update: Partial<Database["public"]["Tables"]["testimonios"]["Insert"]>;
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: {
      lead_industria: LeadIndustria;
      lead_presupuesto: LeadPresupuesto;
      lead_ugc_actual: LeadUgcActual;
      lead_timeline: LeadTimeline;
      lead_score_categoria: LeadScoreCategoria;
      lead_status: LeadStatus;
    };
  };
}

// ─── Enums del dominio ────────────────────────────────────────────────────────
export type LeadIndustria =
  | "ecommerce"
  | "saas"
  | "dtc"
  | "servicios"
  | "belleza"
  | "fitness"
  | "fintech"
  | "otro";

export type LeadPresupuesto =
  | "menos_2k"
  | "2k_10k"
  | "10k_30k"
  | "mas_30k";

export type LeadUgcActual =
  | "si_inhouse"
  | "si_agencia"
  | "no"
  | "intentamos_no_funciono";

export type LeadTimeline =
  | "ya"
  | "30_dias"
  | "60_90_dias"
  | "explorando";

export type LeadScoreCategoria = "hot" | "warm" | "cold" | "discard";

export type LeadStatus =
  | "nuevo"
  | "contactado"
  | "calificado"
  | "propuesta"
  | "cerrado"
  | "perdido"
  | "nurture";

// ─── Tipos derivados para uso en componentes ────────────────────────────────
export type Lead = Database["public"]["Tables"]["leads"]["Row"];
export type LeadInsert = Database["public"]["Tables"]["leads"]["Insert"];
export type Caso = Database["public"]["Tables"]["casos"]["Row"];
export type Testimonio = Database["public"]["Tables"]["testimonios"]["Row"];
