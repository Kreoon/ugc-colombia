# Arquitectura AI — ugccolombia.co

> Next.js 15 App Router · Fluid Compute · AI SDK v6 · Supabase (pgvector) · Vercel AI Gateway
> Última revisión: 2026-04-08 · Owner: Alexander Cast (@infiny)

## 0. Principios de diseño

- **Fluid Compute por default.** Todas las rutas AI corren en Node.js runtime (no Edge). Fluid reutiliza instancias, baja cold starts y permite SDKs pesados (Supabase, Perplexity, Anthropic).
- **AI Gateway como única puerta hacia modelos.** Cero claves directas en `process.env` de features de producto. Fallback ordenado: `anthropic/claude-sonnet-4.6` → `openai/gpt-5` → `google/gemini-3.1-pro-preview`. Tags por feature para cost tracking.
- **Supabase como source of truth.** Conversaciones, dossiers, embeddings, briefs, reportes. RLS activo; las rutas AI usan `service_role` solo en server.
- **AI SDK v6.** `streamText`, `generateText` con `Output.object()`, `ToolLoopAgent`, `InferAgentUIMessage`. Nada de `generateObject`, `maxSteps`, `parameters`, `maxTokens` (deprecados).
- **Modelo por tarea:**
  - Chat pre-sales / briefs / reportes → `anthropic/claude-sonnet-4.6` (calidad + latencia)
  - Razonamiento profundo (dossier final, re-ranking complejo) → `anthropic/claude-opus-4.6`
  - Clasificación / routing barato → `google/gemini-3-flash`
  - Embeddings → `openai/text-embedding-3-small` (1536 dims, o reducir a 768)

---

## 1. Schema Supabase adicional

Migración única `ai_features.sql`:

```sql
-- Extensión
create extension if not exists vector;

-- Leads (si no existe ya)
create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  full_name text,
  company text,
  website text,
  locale text default 'es',
  source text,
  bant jsonb default '{}'::jsonb,    -- { budget, authority, need, timing }
  stage text default 'new',          -- new | qualified | discovery_booked | client | lost
  created_at timestamptz default now()
);

-- Conversaciones chatbot
create table public.chat_conversations (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid references public.leads(id) on delete cascade,
  locale text default 'es',
  status text default 'active',      -- active | qualified | handoff
  summary text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table public.chat_messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid references public.chat_conversations(id) on delete cascade,
  role text not null,                -- user | assistant | tool
  parts jsonb not null,              -- UIMessage parts (AI SDK v6)
  tokens_in int,
  tokens_out int,
  cost_usd numeric(10,6),
  created_at timestamptz default now()
);
create index on public.chat_messages (conversation_id, created_at);

-- Dossiers (brand research)
create table public.brand_dossiers (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid references public.leads(id) on delete cascade,
  company text not null,
  industry text,
  hero_product text,
  competitors jsonb,                 -- [{name, url, note}]
  ugc_opportunities jsonb,           -- [{angle, format, rationale}]
  sources jsonb,                     -- Perplexity citations
  raw_markdown text,
  status text default 'pending',     -- pending | ready | failed
  created_at timestamptz default now()
);

-- Briefs generados
create table public.briefs (
  id uuid primary key default gen_random_uuid(),
  client_id uuid,
  product text not null,
  audience text not null,
  objective text not null,
  format text,                       -- testimonial | unboxing | how-to | ...
  content jsonb not null,            -- brief estructurado
  markdown text,
  created_at timestamptz default now()
);

-- Pool de creadores + embeddings
create table public.creators (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  handle text,
  tier text check (tier in ('A','B','C')),
  niches text[],
  city text,
  rate_usd numeric,
  availability boolean default true,
  bio text,
  portfolio_urls text[],
  embedding vector(1536),            -- text-embedding-3-small
  created_at timestamptz default now()
);
create index on public.creators using hnsw (embedding vector_cosine_ops);
create index on public.creators using gin (niches);

-- Match results (auditoría)
create table public.creator_matches (
  id uuid primary key default gen_random_uuid(),
  brief_id uuid references public.briefs(id) on delete cascade,
  creator_id uuid references public.creators(id) on delete cascade,
  score numeric,
  rationale text,
  rank int,
  created_at timestamptz default now()
);

-- Reportes mensuales
create table public.client_reports (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null,
  period date not null,              -- primer día del mes
  metrics jsonb not null,
  narrative_md text,
  pdf_url text,
  generated_at timestamptz default now(),
  unique (client_id, period)
);
```

RLS: `chat_conversations` y `chat_messages` abiertos a `anon` solo para insert con `conversation_id` coincidente (JWT custom claim). Resto solo `service_role`.

---

## 2. Variables de entorno

```env
# AI Gateway — usamos OIDC automático en Vercel (sin API key manual).
# El token se inyecta en runtime y se rota solo. Para dev local correr
# `vercel env pull` y el SDK lo detecta automáticamente. No definimos
# ninguna variable de gateway a mano en producción.

# Supabase
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...

# Research
PERPLEXITY_API_KEY=...

# Booking
CAL_COM_API_KEY=...
CAL_COM_EVENT_TYPE_ID=discovery-call-alexander

# Cron secret
CRON_SECRET=...
```

---

## 3. Feature 1 — Chatbot pre-sales `/chat`

### 3.1 Arquitectura

```
Client <useChat>  ──►  POST /api/chat  ──►  ToolLoopAgent (Sonnet 4.6)
   ▲                        │                   │
   │                        │                   ├─► tool: getLeadHistory  ─► Supabase
   │                        │                   ├─► tool: upsertLead        Supabase
   │                        │                   ├─► tool: saveBant          Supabase
   │                        │                   ├─► tool: getAvailableSlots Cal.com
   │                        │                   └─► tool: bookDiscoveryCall Cal.com + trigger dossier
   │                        │
   └──── stream UI ─────────┘
                 │
                 └─► persist user+assistant messages → chat_messages
```

- Runtime: **Node.js / Fluid Compute** (streaming nativo, sin límite 25s de Edge).
- `maxDuration = 60`.
- Persistencia: `onFinish` del `toUIMessageStreamResponse` escribe a Supabase.
- Handoff: cuando BANT completo (`budget ≥ 1500 USD && authority && timing < 90d`), el tool `bookDiscoveryCall` dispara además `/api/research/dossier` para Feature 2.

### 3.2 System prompt base (ES/EN bilingüe)

```
Eres Lía, la consultora virtual de UGC Colombia — agencia boutique de contenido
generado por creadores premium en LATAM. Tu rol es calificar leads antes del
discovery call con Alexander Cast (founder).

IDIOMA: Detecta el idioma del lead en su primer mensaje. Responde siempre en
ese idioma (español o inglés). Nunca mezcles.

TONO: Cálida, profesional, concreta. Nada de emojis. Frases cortas. Nunca
prometas precios en el chat — eso se cierra en el discovery call.

MISIÓN: En 6-10 turnos, descubrir:
  1. BUDGET — rango de inversión mensual en UGC (USD).
  2. AUTHORITY — rol del lead y quién firma.
  3. NEED — qué problema de contenido/performance están resolviendo.
  4. TIMING — cuándo quieren empezar.

REGLAS:
- Usa `getLeadHistory` ANTES de preguntar datos que ya tengamos.
- Guarda cada señal con `saveBant` a medida que la captures.
- Cuando BANT esté completo y califique (budget ≥ 1500 USD, timing ≤ 90 días),
  ofrece agendar discovery call con `getAvailableSlots` + `bookDiscoveryCall`.
- Si NO califica, agradece y ofrece recursos gratuitos (lead magnet PDF).
- Nunca inventes casos de estudio ni cifras. Si no sabes, dilo.
- Nunca digas que eres IA a menos que pregunten directamente.
```

### 3.3 Código — Route Handler principal

`app/api/chat/route.ts`:

```ts
import { convertToModelMessages, stepCountIs } from 'ai';
import { createClient } from '@/lib/supabase/server';
import { salesAgent, type SalesUIMessage } from '@/lib/ai/agents/sales-agent';

export const runtime = 'nodejs';
export const maxDuration = 60;

export async function POST(req: Request) {
  const { messages, conversationId, leadId } = (await req.json()) as {
    messages: SalesUIMessage[];
    conversationId: string;
    leadId?: string;
  };

  const supabase = await createClient();

  const result = salesAgent.stream({
    messages: convertToModelMessages(messages),
    stopWhen: stepCountIs(8),
    experimental_context: { supabase, conversationId, leadId },
  });

  return result.toUIMessageStreamResponse({
    onFinish: async ({ responseMessage, usage }) => {
      await supabase.from('chat_messages').insert([
        {
          conversation_id: conversationId,
          role: 'user',
          parts: messages.at(-1)?.parts ?? [],
        },
        {
          conversation_id: conversationId,
          role: 'assistant',
          parts: responseMessage.parts,
          tokens_in: usage?.inputTokens,
          tokens_out: usage?.outputTokens,
        },
      ]);
    },
  });
}
```

### 3.4 Agente + tools

`lib/ai/agents/sales-agent.ts`:

```ts
import { ToolLoopAgent, tool, InferAgentUIMessage } from 'ai';
import { z } from 'zod';
import { SALES_SYSTEM_PROMPT } from './prompts';

const getLeadHistory = tool({
  description: 'Obtiene historial del lead si ya existe en Supabase (por email).',
  inputSchema: z.object({ email: z.string().email() }),
  execute: async ({ email }, { experimental_context: ctx }) => {
    const { data } = await ctx.supabase
      .from('leads')
      .select('id, full_name, company, bant, stage')
      .eq('email', email)
      .maybeSingle();
    return data ?? { exists: false };
  },
});

const saveBant = tool({
  description: 'Guarda señal BANT capturada durante la conversación.',
  inputSchema: z.object({
    email: z.string().email(),
    field: z.enum(['budget', 'authority', 'need', 'timing']),
    value: z.string(),
  }),
  execute: async ({ email, field, value }, { experimental_context: ctx }) => {
    const { data: lead } = await ctx.supabase
      .from('leads')
      .select('id, bant')
      .eq('email', email)
      .single();
    const bant = { ...(lead?.bant ?? {}), [field]: value };
    await ctx.supabase.from('leads').update({ bant }).eq('id', lead!.id);
    return { ok: true, bant };
  },
});

const getAvailableSlots = tool({
  description: 'Consulta slots disponibles para discovery call en Cal.com (próximos 7 días).',
  inputSchema: z.object({ timezone: z.string().default('America/Bogota') }),
  execute: async ({ timezone }) => {
    const r = await fetch(
      `https://api.cal.com/v2/slots?eventTypeId=${process.env.CAL_COM_EVENT_TYPE_ID}&timezone=${timezone}`,
      { headers: { Authorization: `Bearer ${process.env.CAL_COM_API_KEY}` } },
    );
    const json = await r.json();
    return json.slots?.slice(0, 6) ?? [];
  },
});

const bookDiscoveryCall = tool({
  description: 'Agenda discovery call y dispara brand research en background.',
  inputSchema: z.object({
    email: z.string().email(),
    slotIso: z.string(),
    name: z.string(),
    company: z.string(),
  }),
  execute: async (input, { experimental_context: ctx }) => {
    const booking = await fetch('https://api.cal.com/v2/bookings', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.CAL_COM_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        eventTypeId: process.env.CAL_COM_EVENT_TYPE_ID,
        start: input.slotIso,
        responses: { name: input.name, email: input.email },
      }),
    }).then((r) => r.json());

    // Fire-and-forget: brand research
    fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/research/dossier`, {
      method: 'POST',
      headers: { 'x-internal-secret': process.env.CRON_SECRET! },
      body: JSON.stringify({ email: input.email, company: input.company }),
    }).catch(() => {});

    await ctx.supabase
      .from('leads')
      .update({ stage: 'discovery_booked' })
      .eq('email', input.email);

    return { confirmed: true, meetingUrl: booking.meetingUrl };
  },
});

export const salesAgent = new ToolLoopAgent({
  model: 'anthropic/claude-sonnet-4.6',
  instructions: SALES_SYSTEM_PROMPT,
  tools: { getLeadHistory, saveBant, getAvailableSlots, bookDiscoveryCall },
});

export type SalesUIMessage = InferAgentUIMessage<typeof salesAgent>;
```

### 3.5 Cliente `/chat`

`app/chat/page.tsx` usa `useChat<SalesUIMessage>()` con `DefaultChatTransport({ api: '/api/chat' })`, input manejado con `useState`, render de `part.type` con switch tipado (`tool-getAvailableSlots` muestra botones de slots; `tool-bookDiscoveryCall` muestra confirmación).

---

## 4. Feature 2 — Brand research on-demand

### 4.1 Arquitectura

```
trigger (chat o webhook lead)
   │
   ▼
POST /api/research/dossier  (Node.js, maxDuration=300)
   │
   ├─► Perplexity sonar-pro: "company {X} industry, products, competitors"
   ├─► Perplexity sonar-pro: "UGC / creator campaigns in {industry} LATAM recientes"
   │
   └─► generateText (Claude Opus 4.6) con Output.object(dossierSchema)
              │
              ▼
       brand_dossiers (status: ready)
              │
              ▼
       Email a Alexander (Resend) con link al dossier
```

- Ejecutado en **Vercel Function standard** (300s es más que suficiente; no requiere Workflow DevKit).
- Si crece a >5 min o multi-step crítico → migrar a `DurableAgent` de Workflow DevKit.

### 4.2 Schema del output

```ts
const dossierSchema = z.object({
  industry: z.string(),
  heroProduct: z.string(),
  positioning: z.string(),
  competitors: z.array(z.object({
    name: z.string(), url: z.string().url().optional(), note: z.string(),
  })).max(5),
  ugcOpportunities: z.array(z.object({
    angle: z.string(),
    format: z.enum(['testimonial','unboxing','how-to','day-in-life','comparison','demo']),
    rationale: z.string(),
    priority: z.enum(['high','medium','low']),
  })).min(3).max(6),
  discoveryCallQuestions: z.array(z.string()).min(5).max(8),
});
```

### 4.3 Prompt base

```
Eres analista senior de UGC para LATAM. Recibes research crudo de Perplexity
sobre una empresa. Produce un dossier accionable para que Alexander entre al
discovery call con contexto profundo.

CRITERIOS:
- Industria en 1 línea.
- Hero product: el producto estrella, no la empresa entera.
- Competidores: máximo 5, con por qué importan para UGC.
- Oportunidades UGC: 3-6 ángulos concretos (formato + razón + prioridad).
- Preguntas discovery: las que Alexander debe hacer para cerrar.
- Cita fuentes cuando uses data dura. No inventes números.
```

---

## 5. Feature 3 — Auto-briefing

### 5.1 Arquitectura

Server Action (no necesita streaming ni tools). Carga el template del archivo `content/sistemas/creadores/05-briefs-tipo-por-formato.md` al build (import MDX o `fs.readFile` cacheado con `'use cache'`), lo mete en el prompt junto con `producto + audiencia + objetivo + formato`, y devuelve el brief estructurado.

```ts
// app/briefs/actions.ts
'use server';
import { generateText, Output } from 'ai';
import { z } from 'zod';
import { BRIEFS_TEMPLATE } from '@/content/briefs-template'; // import MDX

const briefSchema = z.object({
  title: z.string(),
  hook: z.string(),
  script: z.array(z.object({ scene: z.number(), action: z.string(), voiceover: z.string() })),
  callToAction: z.string(),
  shotList: z.array(z.string()),
  doAndDont: z.object({ do: z.array(z.string()), dont: z.array(z.string()) }),
  deliverables: z.array(z.string()),
});

export async function generateBrief(input: {
  product: string; audience: string; objective: string; format: string;
}) {
  const { output } = await generateText({
    model: 'anthropic/claude-sonnet-4.6',
    output: Output.object({ schema: briefSchema }),
    system: `Eres director creativo de UGC Colombia. Generas briefs accionables
             siguiendo nuestro sistema. Usa este template como base:\n\n${BRIEFS_TEMPLATE}`,
    prompt: `Producto: ${input.product}
Audiencia: ${input.audience}
Objetivo: ${input.objective}
Formato: ${input.format}

Genera el brief completo.`,
    providerOptions: { gateway: { tags: ['feature:briefs'] } },
  });
  return output;
}
```

---

## 6. Feature 4 — Creator match engine

### 6.1 Arquitectura híbrida retrieval + re-ranking

```
brief nuevo
   │
   ▼
[1] Build query embedding  ←  embed(brief.product + audience + objective)
   │
[2] Retrieval  ←  pgvector <-> query (top 20) filtrado por
                   availability=true AND niche overlap
   │
[3] Hard filters (tier, rate, ciudad si aplica) → top 10
   │
[4] Re-ranking LLM (Opus 4.6) con bios + portfolio + scoring
                   → rationale estructurado por creador
   │
[5] Insert creator_matches (top 5) + return
```

```ts
// lib/ai/match/engine.ts
import { embed, generateText, Output } from 'ai';
import { z } from 'zod';

export async function matchCreators(briefId: string) {
  const supabase = await createClient();
  const { data: brief } = await supabase.from('briefs').select('*').eq('id', briefId).single();

  // [1] Embedding de la query
  const { embedding } = await embed({
    model: 'openai/text-embedding-3-small',
    value: `${brief.product}\n${brief.audience}\n${brief.objective}\n${brief.format}`,
  });

  // [2] + [3] Retrieval con filtros
  const { data: candidates } = await supabase.rpc('match_creators', {
    query_embedding: embedding,
    match_count: 10,
    min_tier: 'C',
  });

  // [4] Re-ranking con Opus
  const { output } = await generateText({
    model: 'anthropic/claude-opus-4.6',
    output: Output.object({
      schema: z.object({
        ranking: z.array(z.object({
          creatorId: z.string().uuid(),
          score: z.number().min(0).max(100),
          rationale: z.string(),
        })).length(5),
      }),
    }),
    prompt: `Brief:\n${JSON.stringify(brief.content)}\n\nCandidatos:\n${JSON.stringify(candidates)}\n\nRankea los 5 mejores para este brief. Explica el match por nicho, tono, portfolio.`,
  });

  // [5] Persistir
  await supabase.from('creator_matches').insert(
    output.ranking.map((r, i) => ({
      brief_id: briefId, creator_id: r.creatorId, score: r.score,
      rationale: r.rationale, rank: i + 1,
    })),
  );

  return output.ranking;
}
```

RPC `match_creators`:
```sql
create or replace function match_creators(query_embedding vector(1536), match_count int, min_tier text)
returns table (id uuid, full_name text, tier text, niches text[], bio text, similarity float)
language sql stable as $$
  select id, full_name, tier, niches, bio,
         1 - (embedding <=> query_embedding) as similarity
  from creators
  where availability = true
    and case min_tier when 'A' then tier = 'A'
                      when 'B' then tier in ('A','B')
                      else true end
  order by embedding <=> query_embedding
  limit match_count;
$$;
```

Ingestión: cuando se crea/edita un creator, Server Action llama `embed()` con `bio + niches.join(' ') + portfolio_summary` y guarda en `creators.embedding`.

---

## 7. Feature 5 — Report generator (cron mensual)

### 7.1 Arquitectura

```
Vercel Cron (1 de cada mes 09:00 COT)
   │
   ▼
GET /api/cron/reports  (header x-vercel-cron)
   │
   ├─► Para cada client activo:
   │     1. Agregar métricas del mes desde Supabase (views, engagement, creators activos, entregables)
   │     2. generateText(Sonnet 4.6, Output.object(reportSchema)) con narrativa premium
   │     3. Render HTML → PDF (usar @react-pdf/renderer o Vercel /api/og no sirve, usar Puppeteer en Vercel Sandbox si >1MB)
   │     4. Upload a Vercel Blob (private)
   │     5. Insert client_reports + email al cliente (Resend)
```

`vercel.ts`:
```ts
crons: [{ path: '/api/cron/reports', schedule: '0 14 1 * *' }], // 09:00 COT
```

Con 100 clientes y ~30s por reporte → procesar en lotes de 10 en paralelo con `Promise.all` dentro de la función (Fluid concurrency), o partir en sub-requests si >300s. Si crece, migrar a **Vercel Queues** (un job por cliente).

Prompt base:
```
Eres el head of strategy de UGC Colombia. Escribes reportes mensuales premium
para clientes que pagan USD 3,000-10,000/mes. Tono: ejecutivo, accionable, con
narrativa — no listas de métricas secas. Estructura fija:

1. Executive summary (3 bullets impactantes)
2. Qué ganamos este mes (wins con data)
3. Qué aprendimos (insights accionables del contenido)
4. Qué sigue (recomendaciones para el próximo sprint)
5. Números clave (tabla compacta)

Prohibido: jerga vacía ("engagement skyrocketed"), emojis, promesas sin data.
```

---

## 8. Observabilidad

**Sí, Vercel AI Gateway es mandatorio.** Razones para este caso:

1. **Cost tracking por feature** con tags: `feature:chat`, `feature:dossier`, `feature:briefs`, `feature:match`, `feature:reports`.
2. **Fallback automático** Sonnet → GPT-5 → Gemini 3.1 Pro cuando hay outage (crítico para chatbot público).
3. **Rate limit protection** ante scraping/abuse del `/chat`.
4. **Cost caps** por proyecto para que un loop accidental no queme USD 500.
5. **Zero data retention** — importante para compliance con clientes enterprise.

Stack completo de observabilidad:
- **AI Gateway dashboard** — costo, latencia, fallbacks, tokens.
- **Vercel Observability** — latencia de Route Handlers, errores.
- **Sentry** — excepciones en server actions y agents.
- **Supabase logs** — queries lentas de pgvector.
- **Tabla `chat_messages.cost_usd`** — costo por conversación para análisis de ROI.

---

## 9. Costos estimados — 100 clientes / mes

Supuestos de volumen mensual a régimen:

| Feature | Volumen | Modelo | Tokens in / out típicos | Costo unitario | Costo mensual |
|---|---|---|---|---|---|
| **Chat pre-sales** | 500 conversaciones × 12 turnos = 6,000 llamadas | Sonnet 4.6 | 3K / 0.7K | ~USD 0.019 | **~USD 115** |
| **Brand dossier** | 80 dossiers (solo leads calificados) | Perplexity sonar-pro + Opus 4.6 | PPLX: USD 0.02; Opus: 8K/2K ≈ USD 0.25 | USD 0.27 | **~USD 22** |
| **Auto-briefing** | 100 clientes × 6 briefs = 600 | Sonnet 4.6 | 4K / 2K ≈ USD 0.042 | USD 0.042 | **~USD 25** |
| **Creator match** | 600 briefs × (1 embedding + 1 rerank Opus) | embed-small + Opus | embed: ~0; Opus: 6K/1K ≈ USD 0.165 | USD 0.165 | **~USD 100** |
| **Report generator** | 100 reportes | Sonnet 4.6 | 6K / 3K ≈ USD 0.063 | USD 0.063 | **~USD 6** |
| **Ingest embeddings creators** | 500 creators (one-shot/ajustes) | text-embedding-3-small | 500 × 0.5K | ~USD 0.01 | **<USD 1** |
| **Subtotal AI** | | | | | **~USD 270 / mes** |
| Vercel Fluid Compute (Pro) | | | | | ~USD 20-40 |
| Supabase (Pro + pgvector) | | | | | ~USD 25 |
| Perplexity API | ~160 queries | | | | ~USD 5 |
| Resend | ~1K emails | | | | USD 0 (free tier) |
| Vercel Blob | ~1 GB PDFs | | | | ~USD 0.15 |
| **TOTAL infra + AI** | | | | | **~USD 320-340 / mes** |

Con 100 clientes a ticket promedio USD 3K/mes = USD 300K MRR → infra AI < 0.12% del revenue. Margen sano incluso multiplicando x3 el uso del chatbot.

**Palancas de optimización si se dispara:**
- Chat: router con Gemini 3 Flash para clasificar intención antes de invocar Sonnet → -40% en chat.
- Match: cachear re-ranking con `'use cache'` por `(brief_hash)` → -60% si hay briefs repetidos.
- Dossier: usar Sonnet en vez de Opus si la calidad alcanza → -70%.
- AI Gateway cost cap global: hard stop a USD 500/mes como guardrail.

---

## 10. Roadmap de implementación

| Fase | Semanas | Entregables |
|---|---|---|
| **F1 — Fundaciones** | 1 | Migración Supabase, AI Gateway setup, envs, Supabase client helpers, `vercel.ts` |
| **F2 — Chatbot** | 1-2 | Sales agent + tools + `/chat` UI + Cal.com integration + persistencia |
| **F3 — Dossier** | 1 | Perplexity wrapper, route handler, email notification |
| **F4 — Briefs** | 1 | Server action, form UI, template import, preview |
| **F5 — Match** | 2 | Ingest pipeline creators, pgvector RPC, re-ranking, UI de resultados |
| **F6 — Reports** | 1-2 | Cron + generación + PDF + delivery |
| **F7 — Observabilidad** | 0.5 | Dashboards AI Gateway, alertas Sentry, cost caps |

Total: ~7-9 semanas con dev full-time.

---

## 11. Referencias cruzadas

- `content/sistemas/creadores/05-briefs-tipo-por-formato.md` — template fuente de Feature 3.
- `content/sistemas/creadores/` — criterios A/B/C para tiers en `creators`.
- `web/` — scaffold Next.js 15 donde viven las rutas.
- Skills Vercel: `vercel:ai-sdk`, `vercel:ai-gateway`, `vercel:nextjs`, `vercel:vercel-functions`, `vercel:workflow` (solo si migramos dossier/reports a durable).
