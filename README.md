# UGC Colombia — Documentación Maestro

**Agencia boutique de UGC estratégico para marcas LATAM y USA Hispanic.**
Última actualización: 2026-04-08

---

## Resumen del Negocio

UGC Colombia es una agencia boutique de User-Generated Content que conecta marcas de e-commerce LATAM y USA Hispanic con creadores colombianos preseleccionados. **No somos un marketplace transaccional** — somos un equipo operativo que produce contenido estratégico al estándar de agencias USA, con procesos auditables en tiempo real y tecnología propia (Kreoon).

Nuestro diferencial: sistematización tech + casting curado + estrategia integrada. Entregamos no solo clips, sino ángulos testeados, hooks optimizados y planes de iteración. Operamos bilingüe (español nativo + inglés auténtico para USA Hispanic) sin sonar traducido.

**Modelo:** Monthly Retainer de $500–1500 USD/mes. Clientes objetivo son D2C LATAM en crecimiento (30K–200K USD/mes), Brand Managers USA Hispanic, y agencias de media que necesitan proveedor white-label confiable. Meta: 133 clientes activos → $100K USD MRR en 12 meses.

---

## Arquitectura del Sistema

```
┌─────────────────────────────────────────────────────────────────┐
│                       UGCCOLOMBIA.CO                             │
│                    (Next.js 15 + Tailwind)                       │
│                                                                    │
│  Landing → Formulario Lead → Booking Cal.com → Dashboard Clientes│
└────────────────────┬────────────────────────────────────────────┘
                     │ HTTP API
                     ↓
┌─────────────────────────────────────────────────────────────────┐
│                  SUPABASE (PostgreSQL)                            │
│                                                                    │
│  ├─ leads (scoring BANT automático)                              │
│  ├─ creators (pool curado A/B/C)                                 │
│  ├─ clients (clientes activos + MRR tracking)                    │
│  ├─ projects & briefs (por cliente)                              │
│  ├─ deliverables (videos + fotos + PDFs)                         │
│  ├─ payments (creadores + facturas clientes)                     │
│  └─ workflow_logs (auditoría, errores)                           │
│                                                                    │
│  ├─ Bucket: ugc-deliverables (privado, archivos)                 │
│  ├─ Bucket: ugc-reports (PDF reportes mensuales)                 │
│  └─ Edge Functions (validación, webhooks)                        │
└────────────┬────────────────────────┬──────────────────────────┘
             │                        │
      Supabase SSR Client    Service Role Key (n8n, Edge)
             │                        │
             ↓                        ↓
┌──────────────────────┐    ┌──────────────────────────────────┐
│   NEXT.JS APP        │    │    N8N (dev.kreoon.com)           │
│   (web clients)      │    │                                   │
│                      │    │ Workflows:                        │
│  • Dashboard         │    │ ├─ lead-ingestion                │
│  • Project mgmt      │    │ ├─ bant-scorer (Claude API)      │
│  • Metrics           │    │ ├─ discovery-call-followup       │
│  • Creador profiles  │    │ ├─ creator-application-pipeline  │
│                      │    │ ├─ monthly-client-report        │
│                      │    │ ├─ follow-up-sequence (nurture)  │
│                      │    │ ├─ creator-payment-scheduler     │
│                      │    │ └─ content-repurposing-alert     │
└──────────────────────┘    └──┬──────────────────────────────┘
                               │ Webhooks / API
         ┌─────────────────────┼──────────────────────┬────────┐
         ↓                     ↓                      ↓        ↓
    ┌─────────┐        ┌──────────────┐       ┌────────┐  ┌──────┐
    │ Resend  │        │ WhatsApp     │       │ Beehiiv│  │Bunny │
    │ (Email) │        │ Cloud API    │       │(Email) │  │(CDN) │
    └─────────┘        └──────────────┘       └────────┘  └──────┘
         │                  │                      │
    Transaccional    Alerts al equipo         Newsletter       Videos
         │                  │
    Bienvenida      +BANT alerts
    Confirmacion    +Reminders
    Reporte         +Pagos
```

**Flujo de datos:**
1. Cliente llena form web → webhook n8n `lead-ingestion`
2. n8n valida, normaliza, inserta en Supabase `leads`
3. Claude API (via n8n) calcula BANT score → actualiza `leads.tier` (HOT/WARM/COLD)
4. Según tier, n8n dispara WhatsApp a Alexander o email nurture
5. Si booking en Cal.com → n8n inserta en `bookings`, envía confirmación + reminders
6. Cliente activo genera proyectos → creadores entregan en Bunny CDN → Supabase registra deliverables
7. Cada 1º de mes, n8n genera reporte PDF mensual y lo envía por email

---

## Estructura de Carpetas

```
UGC Colombia/
│
├── README.md (este archivo)
├── CONTRIBUTING.md (convenciones dev)
│
├── web/                              ← Next.js 15 app (frontend + API)
│   ├── package.json
│   ├── next.config.ts
│   ├── tailwind.config.ts
│   ├── tsconfig.json
│   ├── .env.example
│   │
│   ├── src/
│   │   ├── app/                      ← App Router (Next.js 15)
│   │   │   ├── layout.tsx            ← Root layout
│   │   │   ├── page.tsx              ← / (landing home)
│   │   │   ├── globals.css           ← Tailwind directives
│   │   │   ├── robots.ts
│   │   │   └── sitemap.ts
│   │   │
│   │   ├── components/
│   │   │   ├── ui/                   ← shadcn/ui buttons, inputs, etc.
│   │   │   └── sections/             ← Navbar, Hero, Problema, Solucion, etc.
│   │   │
│   │   ├── lib/
│   │   │   ├── supabase.ts           ← Cliente SSR + RLS
│   │   │   └── utils.ts              ← Helpers (clsx, etc.)
│   │   │
│   │   └── types/
│   │       └── supabase.ts           ← Tipos generados de schema
│   │
│   └── README.md                     ← Documentación web-específica
│
├── supabase/                         ← Base de datos + Edge Functions
│   ├── schema.sql                    ← Schema completo (todas las tablas)
│   │
│   ├── migrations/
│   │   ├── 20260408120000_init_extensions.sql   ← Extensions (uuid, pgcrypto)
│   │   ├── 20260408120100_enums.sql             ← ENUM types
│   │   ├── 20260408120200_core_tables.sql       ← Tablas principales
│   │   ├── 20260408120300_creators.sql          ← Pool creadores
│   │   ├── 20260408120400_projects.sql          ← Proyectos + briefs
│   │   ├── 20260408120500_billing.sql           ← Pagos + facturas
│   │   ├── 20260408120600_views.sql             ← Vistas derivadas
│   │   ├── 20260408120700_rls_policies.sql      ← Row Level Security
│   │   ├── 20260408120800_triggers.sql          ← Triggers automáticos
│   │   └── 20260408120900_seed_team.sql         ← Datos iniciales equipo
│   │
│   ├── functions/                    ← Edge Functions (TypeScript)
│   │   ├── validate-brief/
│   │   ├── calculate-mrr/
│   │   └── send-invoice/
│   │
│   ├── README.md                     ← Setup Supabase (migraciones, vars)
│   └── migrations/README.md          ← Documentación de cada migración
│
├── brand/                            ← Sistema visual y voz de marca
│   ├── brand-guidelines.md           ← Logo, paleta, tipografía, voice
│   ├── design-tokens.md              ← Tailwind config + CSS vars
│   ├── logo-specs.md                 ← Versiones del logo, clearspace
│   ├── social-templates-spec.md      ← Dimensiones redes + reglas
│   ├── ad-assets-spec.md             ← Tamaños ads Meta/Google/TikTok
│   ├── presentation-kit-spec.md      ← Plantillas deck + propuestas
│   ├── email-signature.html          ← Firma estándar equipo
│   ├── generation-manifest.json      ← Prompts para gen IA de assets
│   ├── image-prompts.md              ← Prompts Veo 3/Gemini/Midjourney
│   │
│   └── README.md                     ← Guía rápida de uso de marca
│
├── n8n/                              ← Automatizaciones (dev.kreoon.com)
│   ├── workflows-spec.md             ← Documentación 8 workflows
│   │
│   └── README.md                     ← Setup n8n (vars, credenciales)
│
└── content/                          ← Contenido estratégico + operativo
    ├── README.md                     ← ÍNDICE MAESTRO (este archivo en content/)
    │
    ├── auditoria/
    │   └── auditoria-redes-actuales.md
    │
    ├── canales/                      ← Copy por canal
    │   ├── bios-y-copy.md           ← Instagram, TikTok, LinkedIn
    │   ├── linkedin-alexander-autoridad.md
    │   └── whatsapp-business-sistema.md
    │
    ├── referentes/                   ← Benchmarks y insights
    │   ├── benchmark-batch-A.md
    │   ├── benchmark-batch-B.md
    │   └── insights-accionables.md
    │
    └── sistemas/                     ← Procesos operativos documentados
        ├── marca/
        │   ├── brand-profile.json    ← Perfil de marca estructurado
        │   ├── pilares-contenido.md  ← 6 pilares estratégicos
        │   └── posicionamiento-premium.md
        │
        ├── creadores/
        │   ├── 00-indice-sistema-operativo-creadores.md ← Índice maestro
        │   ├── 01-formulario-aplicacion-creadores.md
        │   ├── 02-sistema-scoring-creadores.md (A/B/C)
        │   ├── 03-contrato-colaboracion-creadores.md
        │   ├── 04-pricing-guide-latam-usa.md
        │   ├── 05-briefs-tipo-por-formato.md
        │   ├── 06-proceso-revision-feedback.md
        │   └── 07-dashboard-metricas-creadores.md
        │
        ├── captacion/
        │   ├── funnel-maestro.md
        │   └── seo-strategy.md
        │
        └── contenido/
            ├── calendario-editorial.md
            ├── banco-hooks.md
            └── 10-guiones-lanzamiento.md
```

---

## Quick Start para Nuevos Colaboradores

### Requisitos previos

- **Node.js:** >= 24.0.0
- **Git:** última versión
- **cURL/Postman:** para testing webhooks

### 1. Clonar y setup

```bash
# Clonar repo
git clone [repo-url] ugc-colombia
cd ugc-colombia

# Instalar dependencias web
cd web
npm install

# Copiar variables de entorno
cp .env.example .env.local
# ⚠️ Completa .env.local con valores reales (ver sección Variables de Entorno)

# Levantar servidor local
npm run dev
# → http://localhost:3000
```

### 2. Setup Supabase (primera vez)

```bash
# Desde la raíz del repo:

# 1. Ir a Supabase Dashboard (project-ref = pregunta a Alexander)
# 2. SQL Editor > New query > pegar content de supabase/schema.sql
# 3. Run para inicializar todas las tablas

# Verificar que las tablas existen:
# SELECT * FROM information_schema.tables WHERE table_schema = 'public';
```

### 3. Generar tipos TypeScript

```bash
# Si Supabase CLI está instalado:
supabase gen types typescript --project-id [PROJECT_REF] > web/src/types/supabase.ts

# Si no lo está:
# Ir a Supabase Dashboard > SQL Editor > Types > copiar TypeScript types > pegar en web/src/types/supabase.ts
```

### 4. Testing local

```bash
# Dentro de web/:

# Ejecutar tests
npm run test

# Ver UI de tests
npm run test:ui

# Type check
npm run type-check

# Lint
npm run lint
```

### 5. Desplegar a Vercel

```bash
# First time:
vercel link --prod
vercel pull

# Para deployar:
vercel deploy --prod
```

---

## Stack Tecnológico

| Layer | Tecnología | Versión | Docs |
|-------|------------|---------|------|
| **Frontend** | Next.js | 15.3.0 | https://nextjs.org/docs |
| **React** | React | 19.1.0 | https://react.dev |
| **Styling** | Tailwind CSS | 4.1.3 | https://tailwindcss.com |
| **UI Components** | Radix UI + shadcn/ui | Latest | https://ui.shadcn.com |
| **Database** | Supabase (PostgreSQL) | Latest | https://supabase.com/docs |
| **Auth** | Supabase Auth (SSR) | Latest | https://supabase.com/docs/guides/auth |
| **Email** | Resend | 4.5.1 | https://resend.com |
| **Icons** | Lucide React | 0.487.0 | https://lucide.dev |
| **Automation** | n8n | Hosted (dev.kreoon.com) | https://docs.n8n.io |
| **CDN (Videos)** | Bunny Stream | Latest | https://bunny.com/docs |
| **API (AI)** | Anthropic Claude | sonnet-4-5 | https://docs.anthropic.com |
| **Observabilidad** | Workflow logs en Supabase | Custom | - |

---

## Variables de Entorno Requeridas

### web/.env.local

```env
# ─────────────────────────────────────────
# SUPABASE
# ─────────────────────────────────────────
NEXT_PUBLIC_SUPABASE_URL=https://[PROJECT_REF].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=[ANON_KEY_from_Supabase]
SUPABASE_SERVICE_ROLE_KEY=[SERVICE_ROLE_KEY_from_Supabase]
  # ⚠️ SERVICE_ROLE_KEY nunca en .env.example

# ─────────────────────────────────────────
# EMAIL (Resend)
# ─────────────────────────────────────────
RESEND_API_KEY=re_[YOUR_KEY]
RESEND_FROM_EMAIL=hola@ugccolombia.co
RESEND_NOTIFY_EMAIL=founder@kreoon.com

# ─────────────────────────────────────────
# SITE & SEO
# ─────────────────────────────────────────
NEXT_PUBLIC_SITE_URL=https://ugccolombia.co
NEXT_PUBLIC_GA4_ID=G-[YOUR_ID]
NEXT_PUBLIC_META_PIXEL_ID=[YOUR_PIXEL]

# ─────────────────────────────────────────
# N8N INTEGRATION
# ─────────────────────────────────────────
N8N_WEBHOOK_URL=https://dev.kreoon.com/webhook
N8N_WEBHOOK_SECRET=[INTERNAL_SECRET]

# ─────────────────────────────────────────
# CAL.COM (Booking)
# ─────────────────────────────────────────
NEXT_PUBLIC_CALCOM_LINK=https://cal.com/ugccolombia/discovery
```

### n8n (dev.kreoon.com) — Settings > Variables

```env
SUPABASE_URL=https://[PROJECT_REF].supabase.co
SUPABASE_SERVICE_KEY=[SERVICE_ROLE_KEY]
RESEND_API_KEY=re_[YOUR_KEY]
BEEHIIV_API_KEY=bhv_[YOUR_KEY]
BEEHIIV_PUB_ID=pub_[YOUR_ID]
WHATSAPP_TOKEN=EAAG[YOUR_TOKEN]
WHATSAPP_PHONE_ID=1234567890
ALEXANDER_WHATSAPP=573001234567
DIANA_WHATSAPP=573007654321
BRIAN_WHATSAPP=573009876543
ANTHROPIC_API_KEY=sk-ant-[YOUR_KEY]
MERCURY_API_KEY=mrc_[YOUR_KEY]
WISE_API_KEY=[YOUR_KEY]
BUNNY_STREAM_KEY=bny_[YOUR_KEY]
CALCOM_API_KEY=cal_[YOUR_KEY]
CALCOM_WEBHOOK_SECRET=whsec_[YOUR_SECRET]
INTERNAL_WEBHOOK_SECRET=ugc_internal_[RANDOM_STRING]
```

### supabase/functions/.env.local (si necesitas Edge Functions)

```env
SUPABASE_URL=https://[PROJECT_REF].supabase.co
SUPABASE_SERVICE_ROLE_KEY=[SERVICE_ROLE_KEY]
BUNNY_API_KEY=[BUNNY_CDN_API_KEY]
BUNNY_STREAM_LIBRARY_ID=[BUNNY_LIBRARY_ID]
```

**Notas de seguridad:**
- **ANON_KEY** → público, en .env.example
- **SERVICE_ROLE_KEY** → secreto, SOLO en .env.local y n8n
- Nunca subir .env.local a Git (ya está en .gitignore)
- Usar GitHub Secrets en CI/CD para variables productivas

---

## Sub-READMEs (Documentación Específica)

| Carpeta | README | Para Quién | Tópicos |
|---------|--------|-----------|---------|
| **web/** | `web/README.md` | Devs frontend | Setup Next.js, estructura carpetas, deploy Vercel |
| **supabase/** | `supabase/README.md` | Devs DB + n8n | Schema, migraciones, RLS, triggers, Edge Functions |
| **n8n/** | `n8n/README.md` | Automatizadores | Setup workflows, credenciales, webhooks, testing |
| **brand/** | `brand/README.md` | Diseñadores + copy | Logo specs, paleta, tipografía, voice de marca |
| **content/** | `content/README.md` | Estrategas + productores | Índice navegable de todos los docs operativos |

---

## Roadmap y Estado Actual

### Fase 0: MVP (✅ Completada — 2026-04-08)

- ✅ Landing page web (ugccolombia.co) con form de leads
- ✅ Schema Supabase completo (12 tablas + vistas + RLS)
- ✅ 5 workflows n8n (lead-ingestion, bant-scorer, discovery-followup, creator-app, monthly-report)
- ✅ Brand system completo (guidelines + design tokens)
- ✅ Documentación operativa de creadores (sistema A/B/C)

### Fase 1: Dashboard Clientes (🚧 En Progreso — Q2 2026)

- 🚧 Dashboard cliente (proyectos, briefs, entregables, métricas)
- 🚧 Upload de videos a Bunny Stream (con validación)
- 🚧 Sistema de comentarios + revision en briefs
- ⏳ Integración Cal.com con follow-ups automáticos

### Fase 2: Dashboard Creadores (⏳ Pendiente — Q3 2026)

- ⏳ Portal creador (mis proyectos, briefing, upload deliverables, pagos)
- ⏳ Calificación de creadores en tiempo real (scoring automático)
- ⏳ Historial de pagos + recibos digitales

### Fase 3: Inteligencia y Automatización (⏳ Pendiente — Q3-Q4 2026)

- ⏳ Workflow de repurposing automático (video → reel + short + carousel)
- ⏳ Dashboard de calidad por creador (AI analysis de entregas)
- ⏳ Sugerencia de creadores automática por brief

### Fase 4: Escala (⏳ Pendiente — 2027)

- ⏳ API pública para agencias (white-label)
- ⏳ Multi-idioma (EN/ES automático en dashboards)
- ⏳ Integración con Meta Ads Manager (sync automático de entregables)

### Fase 5: Inteligencia Comercial (⏳ Pendiente — 2027+)

- ⏳ Benchmarking de ROAS por creador
- ⏳ Predicción de churn de clientes
- ⏳ Recomendación de estrategia de contenido (via Claude)

---

## Estado por Componente

| Componente | Estado | Último Check | Notas |
|------------|--------|--------------|-------|
| ugccolombia.co (landing) | ✅ Live | 2026-04-08 | Vercel, HTTPS |
| Supabase DB | ✅ Listo | 2026-04-08 | RLS activo, migraciones aplicadas |
| Auth (team members) | ✅ Listo | 2026-04-08 | 5 cuentas: Alexander, Diana, Brian, Samuel, Tanya |
| n8n workflows | ✅ 5 activos | 2026-04-08 | lead-ingestion, bant-scorer, discovery, creator-app, monthly-report |
| Resend emails | ✅ Funcional | 2026-04-08 | Dominio ugccolombia.co verificado |
| WhatsApp Cloud API | ✅ Funcional | 2026-04-08 | Tokens configurados en n8n |
| Cal.com integration | ✅ Listo | 2026-04-08 | Webhooks configurados |
| Bunny Stream | ✅ Ready | 2026-04-08 | API key configurada, sin uso aún |
| Dashboard clientes | 🚧 En progreso | 2026-04-08 | Diseño en Figma, implementación Next.js próxima |
| Portal creadores | ⏳ Roadmap | - | Primer sprint Q2 2026 |
| Analytics/Reporting | ⏳ Roadmap | - | Depende de dashboard clientes |

---

## Equipo y Responsabilidades

| Persona | Rol | Responsabilidades | WhatsApp |
|---------|-----|-------------------|----------|
| **Alexander Cast** | CEO / Estrategia | Posicionamiento, cierre clientes, tech decisions, roadmap | 573001234567 |
| **Diana Mile** | Ops / Talent | Casting + scoring creadores, gestión pool, quality control | 573007654321 |
| **Brian** | Finanzas / Ops | Pagos creadores, facturas clientes, reconciliación | 573009876543 |
| **Samuel** | Tech / Productos | Backend Supabase, workflows n8n, deployment | - |
| **Tanya** | Growth / Ventas | Lead nurture, community, partnerships | - |

---

## Convenciones y Procesos

### Commits y Ramas

Consulta **CONTRIBUTING.md** para:
- Formato de commit messages
- Convención de ramas (feature/, fix/, hotfix/)
- Flujo de pull requests
- Proceso de code review

### Deployments

1. **Dev:** automático en push a `main` (Vercel)
2. **Staging:** manual en rama `staging` (Vercel)
3. **Prod:** manual con `vercel deploy --prod`

### Variables Secretas

- **Vercel:** usar Project Settings > Environment Variables
- **n8n:** usar Settings > Variables
- **Supabase:** usar Project Settings > API Keys (no en código)

---

## Links Rápidos

| Sistema | URL | Acceso |
|---------|-----|--------|
| **Web producción** | https://ugccolombia.co | Público |
| **Web staging** | https://ugccolombia-staging.vercel.app | Restringido Vercel |
| **Supabase Dashboard** | https://app.supabase.com | Alexander + Samuel |
| **n8n Workflows** | https://dev.kreoon.com | Alexander + Samuel |
| **Cal.com** | https://cal.com/ugccolombia/discovery | Público (booking) |
| **GitHub Repo** | [tu-repo-url] | Team |
| **Figma Design** | [tu-figma-link] | Design + Alexander |
| **Brand Guidelines** | `brand/brand-guidelines.md` | Todos |

---

## Troubleshooting Inicial

**P: Landing no carga**
R: Vercel deployment fallido. Revisar `vercel logs web`.

**P: Los webhooks n8n no funcionan**
R: Verificar que `N8N_WEBHOOK_SECRET` en .env.local coincida con el esperado en n8n.

**P: "AUTH: User not found"**
R: El user_id en Supabase `team_members` no está vinculado. Ver supabase/README.md sección "Post-instalación".

**P: Emails no llegan**
R: Verificar que `RESEND_API_KEY` sea válido y dominio `ugccolombia.co` esté verificado en Resend.

**P: Los types de Supabase están desactualizados**
R: Regenerar con `supabase gen types typescript --project-id [REF]`.

---

## Recursos Adicionales

- **Brand System:** `brand/` (logo specs, paleta, tipografía, voz)
- **Documentación Operativa:** `content/README.md` (índice navegable)
- **API Supabase:** `supabase/README.md` (schema, RLS, triggers)
- **Setup n8n:** `n8n/README.md` (workflows, credenciales)
- **Frontend Setup:** `web/README.md` (estructura, componentes, deploy)

---

## Contacto y Soporte

- **Preguntas arquitectura / producto:** Alexander Cast
- **Preguntas DB / API:** Samuel
- **Preguntas creadores / operaciones:** Diana Mile
- **Issues críticos:** Abrir issue en GitHub + mensaje WhatsApp a Alexander

---

**Versión 1.0 — Documentación Maestro UGC Colombia**
Mantenido por: Alexander Cast (@infiny)
Última actualización: 2026-04-08
