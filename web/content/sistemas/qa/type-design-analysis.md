# Análisis de Diseño de Tipos — web/ (UGC Colombia)

Fecha: 2026-04-08
Alcance: `web/src/**/*.{ts,tsx}`
Archivos con tipos de dominio: `web/src/types/supabase.ts`, `web/src/lib/supabase.ts`.
Componentes de sección (`Hero`, `Casos`, `Problema`, `Solucion`, `Navbar`) son presentacionales y usan datos hardcoded inline — no exponen tipos de dominio.

## Resumen ejecutivo (ratings 1-10)

| Dimensión | Rating | Comentario |
|---|---|---|
| Encapsulación | 6/10 | Tipos Row públicos planos, sin distinción lectura/escritura del dominio. Cliente admin bien encapsulado. |
| Expresión de invariantes | 4/10 | Enums bien definidos, pero estados inválidos son representables (score sin categoría, transiciones de status libres, métricas como `Json`). |
| Utilidad | 7/10 | Los enums aportan valor real (evitan stringly-typed). Estructura `Database` fiel a la convención Supabase. |
| Enforcement | 5/10 | `strict: true` activo y sin `any`/`as` en el código revisado. Pero no hay Zod/Valibot en boundaries (form → DB), y los tipos son hand-written (drift vs schema real). |

Promedio ponderado: **5.5/10** — base correcta pero con brechas críticas en validación en frontera y modelado de invariantes.

---

## Tipo: `Lead` / `LeadInsert` (supabase.ts)

### Invariantes identificadas
- `email` debe ser email válido (no enforced — es `string`).
- `whatsapp` debe ser E.164 o formato consistente (no enforced).
- `score ∈ [0, 100]` presumiblemente (no enforced — es `number | null`).
- `score_categoria` debería derivarse de `score` (hot/warm/cold/discard) — hoy son campos independientes que pueden desincronizarse.
- `status` tiene transiciones válidas implícitas: `nuevo → contactado → calificado → propuesta → {cerrado|perdido}`, con `nurture` como rama lateral. Hoy cualquier transición es legal.
- `sitio_web` debería ser URL válida.
- `utm_*` son opcionales pero suelen ir juntos (tri-estado: todos o ninguno).
- `Insert` omite `status` pero lo permite como opcional — un cliente público podría forzar `status: "cerrado"` al insertar si RLS no lo bloquea.

### Problemas concretos

**1. Score y categoría desacoplados (invariante rota).**
```ts
score: number | null;
score_categoria: LeadScoreCategoria | null;
```
Puede existir `score: 95, score_categoria: "cold"`. Mejor: discriminated union o derivar en runtime.

Antes:
```ts
score: number | null;
score_categoria: LeadScoreCategoria | null;
```
Después (en capa de dominio, separada del Row de DB):
```ts
type Score = { value: number; categoria: LeadScoreCategoria }; // construido por función pura
type LeadScored = Lead & { scoring: Score | null };
function computeScore(value: number): Score { /* … */ }
```
En DB sigue siendo dos columnas (para queries), pero la capa de dominio solo expone `scoring` construido.

**2. `status` libre — no modela máquina de estados.**
Hoy `LeadStatus` es union plana. Para invariantes reales usar discriminated union con transiciones explícitas:

```ts
type LeadState =
  | { status: "nuevo"; created_at: string }
  | { status: "contactado"; contactado_at: string; canal: "email" | "whatsapp" }
  | { status: "calificado"; score: number }
  | { status: "propuesta"; propuesta_url: string }
  | { status: "cerrado"; valor_usd: number; cerrado_at: string }
  | { status: "perdido"; razon: string }
  | { status: "nurture"; reactivar_at: string };
```
Esto hace **imposible** tener un lead "cerrado" sin `valor_usd`. Requiere cambio de schema, pero alinea tipos con reglas de negocio.

**3. `LeadInsert` permite `status` desde el cliente público.**
```ts
Insert: Omit<Row, "id" | "created_at" | "score" | "score_categoria" | "status"> & {
  …
  status?: LeadStatus;  // ← riesgo
};
```
Un form público jamás debería setear `status`. Separar:
```ts
type LeadPublicInsert = Omit<LeadInsert, "status" | "score" | "score_categoria" | "notas">;
type LeadAdminUpdate = Partial<LeadInsert>;
```
Y usar `LeadPublicInsert` en el Server Action del form, `LeadAdminUpdate` solo con `createAdminClient()`.

**4. `email`, `whatsapp`, `sitio_web` son `string` crudo.**
No hay Zod/Valibot en ningún boundary. Dado que este scaffold va a recibir forms públicos, es la brecha más urgente.

Recomendación: crear `web/src/lib/schemas/lead.ts` con Zod:
```ts
import { z } from "zod";
export const LeadPublicInsertSchema = z.object({
  nombre: z.string().min(2).max(120),
  email: z.string().email(),
  whatsapp: z.string().regex(/^\+?\d{8,15}$/).nullable(),
  empresa: z.string().max(120).nullable(),
  sitio_web: z.string().url().nullable(),
  industria: z.enum(["ecommerce","saas","dtc","servicios","belleza","fitness","fintech","otro"]).nullable(),
  presupuesto_ads: z.enum(["menos_2k","2k_10k","10k_30k","mas_30k"]).nullable(),
  ugc_actual: z.enum(["si_inhouse","si_agencia","no","intentamos_no_funciono"]).nullable(),
  dolor_contenido: z.string().max(2000).nullable(),
  timeline: z.enum(["ya","30_dias","60_90_dias","explorando"]).nullable(),
  fuente: z.string().max(80).nullable(),
  utm_source: z.string().max(80).nullable(),
  utm_medium: z.string().max(80).nullable(),
  utm_campaign: z.string().max(80).nullable(),
});
export type LeadPublicInsert = z.infer<typeof LeadPublicInsertSchema>;
```
Y que los enums de `types/supabase.ts` se deriven del schema Zod (una sola fuente de verdad) — o viceversa con `z.enum` construido desde el tipo.

---

## Tipo: `Caso`

### Invariantes identificadas
- `slug` debe ser URL-safe único.
- `metricas: Json` — completamente opaco, pierde tipo.
- `contenido_mdx` opcional pero `publicado: true` probablemente lo requiere.
- `orden` es `number` — debería ser entero no-negativo.

### Problemas

**1. `metricas: Json` desperdicia el sistema de tipos.**
Antes:
```ts
metricas: Json;
```
Después:
```ts
type CasoMetrica = { label: string; valor: string; tendencia?: "up" | "down" };
type CasoMetricas = readonly CasoMetrica[];
// en Row:
metricas: CasoMetricas;
```
Supabase almacena como `jsonb` pero el tipo TS puede ser estricto; validar con Zod al leer de DB.

**2. Invariante "publicado ⇒ contenido_mdx".**
Discriminated union:
```ts
type Caso =
  | { publicado: false; contenido_mdx: string | null; /*…*/ }
  | { publicado: true; contenido_mdx: string; imagen_portada: string; /*…*/ };
```

**3. Duplicación hardcoded en `Casos.tsx`.**
El componente define su propia estructura inline (`slug`, `pais`, `industria`, `resultado`, `descripcion`, `metricas`) que **no coincide** con el tipo `Caso` de DB (`cliente_pais` vs `pais`, `cliente_industria` vs `industria`, `resultado_principal` vs `resultado`). Esto garantiza drift cuando se conecte a Supabase. Extraer un tipo `CasoCard` compartido ahora.

---

## Tipo: `Testimonio`

### Invariantes identificadas
- `rating ∈ [1, 5]` entero (no enforced — es `number`).
- `video_url` XOR `avatar_url` probablemente (testimonio de video vs texto).

### Mejora

```ts
type Rating = 1 | 2 | 3 | 4 | 5;
type Testimonio = {
  // …
  rating: Rating;
  media: { type: "video"; video_url: string } | { type: "avatar"; avatar_url: string | null };
};
```

---

## Tipo: `Database` (estructura Supabase)

### Problema principal: hand-written vs generated

El comentario dice "Actualizar cuando el agente de backend entregue schema.sql". Esto es **deuda de tipos garantizada**. Tan pronto exista `schema.sql`:

```bash
npx supabase gen types typescript --project-id <id> > src/types/supabase.generated.ts
```

Y luego en `src/types/supabase.ts` re-exportar + sobre-tipar (brand types, discriminated unions de dominio) sin tocar los generados. Los tipos generados nunca deben editarse a mano.

### Enums duplicados

Hoy los enums viven como `export type` TS **y** como referencia en `Database["public"]["Enums"]`. Con tipos generados esto se unifica. Mientras tanto, al menos los enums Zod y los TS deben derivarse uno del otro (ver `LeadPublicInsertSchema` arriba).

---

## Tipo: `supabase` client (lib/supabase.ts)

### Fortalezas
- Fail-fast en env vars al import-time.
- `createAdminClient` como función (lazy) y con guard para `SUPABASE_SERVICE_ROLE_KEY`.
- `autoRefreshToken: false, persistSession: false` en admin — correcto.

### Problemas
- El cliente `supabase` público se instancia a module-scope. En Next.js App Router esto mezcla browser y server. Para RSC considerar `createServerClient` de `@supabase/ssr` con cookies — no es solo type design pero impacta qué tipos de sesión son alcanzables.
- `supabaseUrl!` con non-null assertion en `createAdminClient` (línea 27) es innecesario: ya se validó arriba, pero TS no lo recuerda entre funciones. Alternativa sin `!`:
  ```ts
  const url = supabaseUrl; const anon = supabaseAnonKey; // const locales post-guard
  ```
  o mover la validación adentro. Cosmético pero elimina el único `!` del codebase.
- No hay tipo `SupabaseClient<Database>` exportado para que Server Actions lo reciban por parámetro (facilita testing).

---

## Enforcement global

- `strict: true` activo. Bien.
- Búsqueda: no encontré `any` ni `as` en los archivos revisados (excepto `!` mencionado).
- No hay `zod`, `valibot`, ni ningún validador en `package.json` implícito por los imports. **Esta es la brecha crítica**: los tipos solo valen en compile-time; los datos del form y los de Supabase son `unknown` en runtime.
- No hay generics custom (ni falta que hacen en este scope).

---

## Plan de acción priorizado

1. **(Crítico)** Instalar Zod y crear `src/lib/schemas/{lead,caso,testimonio}.ts`. Usar en Server Actions del form y al leer de Supabase (`.parse()` el resultado).
2. **(Alto)** Separar `LeadPublicInsert` (form) de `LeadAdminUpdate` (backoffice). El cliente público nunca debe poder setear `status`, `score`, `notas`.
3. **(Alto)** Reemplazar `metricas: Json` en `Caso` por `CasoMetricas` tipado.
4. **(Alto)** Alinear el tipo inline de `Casos.tsx` con el tipo `Caso` de DB — extraer `CasoCard` y `adaptCasoToCard(caso: Caso): CasoCard`.
5. **(Medio)** Una vez exista `schema.sql`, reemplazar `types/supabase.ts` por generados + overlays de dominio en archivo separado.
6. **(Medio)** Modelar `LeadState` como discriminated union por `status` (requiere columnas nuevas — decisión de producto).
7. **(Bajo)** Eliminar el `supabaseUrl!` con guard local.
8. **(Bajo)** Branded types para `Email`, `WhatsApp`, `Url`, `Slug` construidos solo vía los parsers Zod.

## Archivos relevantes

- `F:\Users\SICOMMER SAS\Documents\GitHub\UGC Colombia\web\src\types\supabase.ts`
- `F:\Users\SICOMMER SAS\Documents\GitHub\UGC Colombia\web\src\lib\supabase.ts`
- `F:\Users\SICOMMER SAS\Documents\GitHub\UGC Colombia\web\src\components\sections\Casos.tsx` (drift de tipo inline)
- `F:\Users\SICOMMER SAS\Documents\GitHub\UGC Colombia\web\tsconfig.json` (strict OK)
