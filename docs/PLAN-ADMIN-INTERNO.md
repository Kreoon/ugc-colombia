# Plan — Sistema Interno /admin de UGC Colombia

**Fecha:** 2026-04-14
**Objetivo:** Construir el sistema interno de la agencia en `ugccolombia.co/admin` con autenticación real, navegación lateral, renderizado de todo el contenido operativo (manual de marca, parrilla, packs, calendarios, benchmark) y edición en vivo desde el admin.

**Lo que decidimos:**
1. **Auth:** Supabase Auth + invitaciones por email con roles (founder, manager, coordinator, creative)
2. **Contenido:** Renderizado desde `.md` del repo + editable en vivo desde admin (cambios se guardan en Supabase como overrides)
3. **Scope:** TODAS las secciones del MVP (Manual + Parrilla + Packs + Calendarios + Benchmark + Modelo)

---

## Fase 0 — Preparación (0.5 día)

**Mover contenido operativo dentro de `web/`** para que el build de Vercel lo incluya:

```
F:/Users/SICOMMER SAS/Documents/GitHub/UGC Colombia/
├── web/
│   ├── content/         ← NUEVO (movido desde raíz)
│   │   ├── viralidad/
│   │   ├── sistemas/
│   │   └── ...
│   ├── brand/           ← NUEVO (movido desde raíz)
│   │   └── manual-marca.html
│   └── src/
└── pdfs/                (se queda en raíz, output de build)
```

**Tareas:**
- Mover `content/` y `brand/` a `web/content/` y `web/brand/`
- Actualizar `scripts/generate-pdfs.js` para nuevas rutas
- Commit: "chore: move content and brand into web/"

---

## Fase 1 — Supabase Auth real (2 días)

**Reemplazar password HMAC actual por Supabase Auth con invitaciones.**

### Migraciones nuevas

```sql
-- 20260414_admin_auth.sql

-- Extender team_members con auth link
alter table team_members
  add column auth_user_id uuid references auth.users(id) on delete cascade unique,
  add column invited_by uuid references team_members(id),
  add column invitation_accepted_at timestamptz,
  add column last_login_at timestamptz;

-- Tabla de invitaciones pendientes
create table invitations (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  role text not null check (role in ('founder','manager','coordinator','creative')),
  invited_by uuid references team_members(id) not null,
  token text unique not null,
  expires_at timestamptz not null default (now() + interval '7 days'),
  accepted_at timestamptz,
  created_at timestamptz default now()
);

create index on invitations(email) where accepted_at is null;
create index on invitations(token);

-- Tabla de actividad (audit log)
create table admin_activity (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references team_members(id),
  action text not null,        -- "content_edit", "invitation_sent", etc.
  resource_type text,          -- "manual", "parrilla", "pack", etc.
  resource_id text,
  metadata jsonb,
  created_at timestamptz default now()
);

create index on admin_activity(user_id, created_at desc);

-- RLS: solo team members pueden leer
alter table invitations enable row level security;
create policy "team reads invitations"
  on invitations for select
  to authenticated
  using (exists (
    select 1 from team_members
    where auth_user_id = auth.uid() and is_active = true
  ));

create policy "founders create invitations"
  on invitations for insert
  to authenticated
  with check (exists (
    select 1 from team_members
    where auth_user_id = auth.uid() and role = 'founder' and is_active = true
  ));

alter table admin_activity enable row level security;
create policy "team reads activity"
  on admin_activity for select
  to authenticated
  using (exists (
    select 1 from team_members
    where auth_user_id = auth.uid() and is_active = true
  ));
```

### Archivos a crear / modificar

**Nuevos:**
- `web/src/lib/supabase-server.ts` — cliente Supabase con cookies (SSR)
- `web/src/lib/auth.ts` — helpers `getCurrentUser()`, `requireAuth()`, `hasRole()`
- `web/middleware.ts` — proteger `/admin/**` excepto `/admin/login` y `/admin/invitacion/*`
- `web/src/app/admin/login/page.tsx` — reemplazar form por email+password
- `web/src/app/admin/invitacion/[token]/page.tsx` — aceptar invitación + crear password
- `web/src/app/admin/equipo/page.tsx` — listar team members + invitar (solo founder)
- `web/src/app/api/admin/invite/route.ts` — crear invitación + enviar email

**Modificar:**
- Eliminar `web/src/lib/admin-auth.ts` (sistema HMAC viejo)
- Actualizar `web/src/app/api/admin/login/route.ts` → Supabase Auth
- Actualizar `web/src/app/api/admin/logout/route.ts`

### Semilla inicial

Script que crea el primer founder:
```typescript
// scripts/seed-founder.ts
const { data: user } = await supabase.auth.admin.createUser({
  email: 'founder@kreoon.com',
  password: '<temporal>',
  email_confirm: true,
});
await supabase.from('team_members').insert({
  auth_user_id: user.id,
  email: 'founder@kreoon.com',
  role: 'founder',
  full_name: 'Alexander Cast',
  is_active: true,
});
```

---

## Fase 2 — Layout de dashboard (1 día)

**Sidebar + header responsive con navegación a todas las secciones.**

### Archivos a crear

- `web/src/app/admin/layout.tsx` — layout compartido con sidebar + header
- `web/src/components/admin/Sidebar.tsx` — navegación lateral
- `web/src/components/admin/Header.tsx` — usuario + logout + breadcrumb
- `web/src/components/admin/MobileDrawer.tsx` — menú móvil
- `web/src/components/admin/UserMenu.tsx` — avatar + dropdown

### Estructura visual

```
┌──────────────────────────────────────────────────────────┐
│ [logo]              UGC Colombia · Admin     [user ▾]    │
├──────────┬───────────────────────────────────────────────┤
│ Dashboard│                                               │
│          │                                               │
│ DIAGN.   │                                               │
│ • Leads  │       (contenido de la sección)               │
│ • KPIs   │                                               │
│          │                                               │
│ MARCA    │                                               │
│ • Manual │                                               │
│ • Logos  │                                               │
│          │                                               │
│ VIRAL.   │                                               │
│ • Parr.  │                                               │
│ • Packs  │                                               │
│ • Calend.│                                               │
│ • Bench. │                                               │
│ • Modelo │                                               │
│          │                                               │
│ EQUIPO   │                                               │
│ • Miemb. │                                               │
│ • Activ. │                                               │
│          │                                               │
└──────────┴───────────────────────────────────────────────┘
```

**Tema visual:** Fiel a la web (negro #000, yellow #F9B334, gold #D4A017, Anton + Inter).

---

## Fase 3 — Content renderer (1–2 días)

**Leer `.md` del repo y renderizarlos con estilo nativo del admin. Aplicar overrides de Supabase si existen.**

### Dependencias a instalar

```json
"react-markdown": "^9.0.1",
"remark-gfm": "^4.0.0",
"rehype-highlight": "^7.0.0",
"gray-matter": "^4.0.3"
```

### Archivos a crear

- `web/src/lib/content.ts` — helpers de filesystem
  - `listContentFiles(dir: string)` — lista archivos disponibles
  - `readContentFile(path: string)` — lee .md + frontmatter
  - `getContentWithOverrides(path: string)` — merge con Supabase
- `web/src/components/admin/MarkdownRenderer.tsx` — componente visual
- `web/src/components/admin/ContentLayout.tsx` — layout por página de contenido

### Migración

```sql
-- 20260414_content_overrides.sql

create table content_overrides (
  id uuid primary key default gen_random_uuid(),
  file_path text not null unique,     -- "content/viralidad/00-modelo.md"
  content text not null,               -- markdown editado
  edited_by uuid references team_members(id),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table content_versions (
  id uuid primary key default gen_random_uuid(),
  override_id uuid references content_overrides(id) on delete cascade,
  content text not null,
  edited_by uuid references team_members(id),
  created_at timestamptz default now()
);

create index on content_versions(override_id, created_at desc);

alter table content_overrides enable row level security;
create policy "team reads overrides"
  on content_overrides for select
  to authenticated
  using (exists (select 1 from team_members where auth_user_id = auth.uid() and is_active = true));

create policy "managers edit overrides"
  on content_overrides for all
  to authenticated
  using (exists (
    select 1 from team_members
    where auth_user_id = auth.uid()
    and role in ('founder', 'manager')
    and is_active = true
  ));
```

### Lógica de merge

```typescript
async function getContentWithOverrides(filePath: string) {
  const fileContent = await readFile(`${WEB_ROOT}/${filePath}`, 'utf-8');
  const { data: override } = await supabase
    .from('content_overrides')
    .select('content, updated_at, edited_by')
    .eq('file_path', filePath)
    .single();

  return {
    raw: fileContent,
    override: override?.content ?? null,
    current: override?.content ?? fileContent,
    isOverridden: !!override,
    editedBy: override?.edited_by,
    updatedAt: override?.updated_at,
  };
}
```

---

## Fase 4 — Editor en vivo (1.5 días)

**Textarea con preview lado a lado + guardar en Supabase.**

### Archivos

- `web/src/components/admin/MarkdownEditor.tsx` — textarea + preview split
- `web/src/app/api/admin/content/route.ts` — POST: guardar override + crear versión
- `web/src/app/admin/[section]/[slug]/edit/page.tsx` — ruta de edición

### UX

```
┌─────────────────────────────────────────────────────┐
│ ← Volver    Manual de Marca > Colores     [Guardar] │
├─────────────────────┬───────────────────────────────┤
│ # Colores           │  COLORES                      │
│                     │  ───────                      │
│ Nuestra paleta...   │  Nuestra paleta...            │
│                     │                               │
│ - Black: #000       │  • Black: #000                │
│ - Yellow: #F9B334   │  • Yellow: #F9B334            │
│                     │                               │
│ [Markdown editor]   │  [Preview renderizado]        │
└─────────────────────┴───────────────────────────────┘
```

**Features:**
- Auto-save cada 30s (draft)
- Botón "Guardar y publicar" explícito
- Indicador "editado por Brian hace 2h"
- Revertir a versión original del repo

---

## Fase 5 — Secciones del admin (3–4 días)

Cada sección tiene ruta + layout + contenido.

### 5.1 — Dashboard Home (`/admin`)

Stats rápidos:
- Leads del mes (badge con nuevo/vs mes pasado)
- Piezas de contenido publicadas esta semana
- Actividad reciente del equipo (últimas 10 acciones)
- Accesos rápidos a secciones

### 5.2 — Diagnósticos (`/admin/diagnosticos`)

YA EXISTE. Solo integrar al nuevo sidebar y reemplazar el check de password HMAC por `requireAuth()`.

### 5.3 — Manual de Marca (`/admin/marca`)

Renderizar `web/brand/*.md` + también una "página visual" que clona el PDF (Colores, Tipografía, Logo, UI, etc.) con navegación interna.

**Sub-rutas:**
- `/admin/marca` — index con cards
- `/admin/marca/colores`
- `/admin/marca/tipografia`
- `/admin/marca/logo`
- `/admin/marca/componentes-ui`
- `/admin/marca/voz`
- `/admin/marca/guidelines` — render de `brand-guidelines.md`

### 5.4 — Viralidad / Parrilla (`/admin/viralidad`)

**Sub-rutas:**
- `/admin/viralidad/modelo` — render `content/viralidad/00-modelo-maestro-viralidad.md`
- `/admin/viralidad/benchmark` — render `01-benchmark-referentes-virales.md`
- `/admin/viralidad/parrilla` — render `03-parrilla-masiva-ig-tiktok.md` (el nuevo)
- `/admin/viralidad/calendarios`
  - `/julio` — render `02-calendario-julio-2026.md`
  - `/agosto` — render `02-calendario-agosto-2026.md`
  - `/septiembre` — render `02-calendario-septiembre-2026.md`

### 5.5 — Packs Virales (`/admin/packs`)

**Sub-rutas:**
- `/admin/packs` — grid con 5 personas
- `/admin/packs/alexander` — consolidado de sus 6 partes
- `/admin/packs/brian` — consolidado COO
- `/admin/packs/diana` — consolidado
- `/admin/packs/samuel` — consolidado
- `/admin/packs/tanya` — consolidado

Cada pack tiene tabs: Guiones cortos | Carruseles | LinkedIn | YouTube | Reglas

### 5.6 — Equipo (`/admin/equipo`)

- Lista de miembros + rol + última actividad
- Botón "Invitar" (solo founder)
- Activity log del equipo

---

## Fase 6 — Features extras (1 día)

- **Búsqueda global** (Cmd+K) con cmdk library
- **Favoritos por usuario** (tabla `user_favorites`)
- **Modo dark** por default (ya estamos en negro)
- **Notificaciones** cuando alguien edita contenido importante

---

## Cronograma estimado

| Fase | Descripción | Tiempo | Acumulado |
|---|---|---|---|
| 0 | Preparación | 0.5 día | 0.5 |
| 1 | Supabase Auth + invitaciones | 2 días | 2.5 |
| 2 | Layout dashboard | 1 día | 3.5 |
| 3 | Content renderer | 1.5 días | 5 |
| 4 | Editor en vivo | 1.5 días | 6.5 |
| 5 | Secciones del admin | 3.5 días | 10 |
| 6 | Features extras | 1 día | 11 |
| QA | Testing + fixes | 1 día | **12 días** |

**Arrancamos por fase 0 + 1 esta misma sesión.**

---

## Variables de entorno nuevas

```bash
# Email para invitaciones (Resend)
RESEND_API_KEY=re_...
RESEND_FROM_EMAIL=admin@ugccolombia.co

# Base URL para links de invitación
NEXT_PUBLIC_SITE_URL=https://ugccolombia.co

# Opcional: password inicial del founder (solo para seed)
INITIAL_FOUNDER_EMAIL=founder@kreoon.com
INITIAL_FOUNDER_PASSWORD=<temporal-cambiar-primer-login>
```

---

## Riesgos y mitigaciones

| Riesgo | Mitigación |
|---|---|
| Mover `content/` y `brand/` rompe PDFs existentes | Actualizar `scripts/generate-*.js` con nuevas rutas en mismo commit |
| Supabase Auth config compleja | Usar template de Supabase + docs oficiales |
| Edición concurrente (2 personas editando mismo archivo) | Lock optimista con `updated_at` + warning en UI |
| Volumen de .md crasheando build | Leer on-demand (server component), no en build |
| Permisos mal configurados | Probar con cada rol antes de invitar al equipo real |

---

## Decisiones arquitectónicas

1. **Supabase Auth > Custom HMAC** — estándar, seguro, soporta roles
2. **Static MD + DB overrides > Migración total a DB** — mantiene versionado git + permite edición
3. **Server Components > Client Components** para renderizar contenido — SEO + performance
4. **RLS estricto** — permisos en la base, no en el código
5. **Audit log desde día 1** — saber quién tocó qué

---

*Plan preparado por: Claude · Fecha: 2026-04-14 · Versión: 1.0*
*Siguiente paso: aprobación del plan → arrancamos Fase 0 + Fase 1.*
