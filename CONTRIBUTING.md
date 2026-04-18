# CONTRIBUTING — Convenciones de Desarrollo

UGC Colombia. Equipo: Alexander Cast, Diana Mile, Brian, Samuel, Tanya.

---

## Commits

### Formato

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Tipos

| Tipo | Uso | Ejemplo |
|------|-----|---------|
| `feat` | Nueva funcionalidad | `feat(dashboard): add creator metrics chart` |
| `fix` | Bug fix | `fix(auth): handle SSR redirect on login` |
| `docs` | Cambios de documentación | `docs(readme): update env vars section` |
| `style` | Cambios de formato (sin lógica) | `style: fix prettier warnings` |
| `refactor` | Refactorización de código | `refactor(db): extract lead scoring logic` |
| `test` | Tests | `test(api): add webhook validation tests` |
| `chore` | Setup, deps, etc. | `chore: upgrade Next.js to 15.3.0` |
| `perf` | Optimización de performance | `perf: cache creator pool query` |

### Scope

Elige el alcance principal afectado:

- `auth` — Autenticación / SSR
- `dashboard` — Panel de clientes
- `creators` — Pool y portal creadores
- `leads` — Captura y scoring de leads
- `db` — Schema Supabase
- `api` — Rutas API Next.js / Edge Functions
- `email` — Integraciones Resend / templates
- `n8n` — Workflows de automatización
- `ui` — Componentes / Tailwind
- `deploy` — Vercel / infra

### Ejemplo completo

```
feat(dashboard): add deliverables list by status

- Fetch deliverables from Supabase with RLS filter
- Group by status (pending, approved, rejected)
- Add filter UI (dropdown) and sort (date desc)
- Style with Tailwind grid + cards

Closes #42
```

### Reglas

- ✅ Sujeto en **imperativo** ("add", "fix", no "adds", "added")
- ✅ Sujeto **sin punto final**
- ✅ Máximo 50 caracteres en el sujeto
- ✅ Body máximo 72 caracteres por línea
- ✅ Referenciar issues: `Closes #123` o `Refs #456`

---

## Ramas

### Convención

```
<type>/<descriptive-name>
```

### Patrones

```
feature/creator-dashboard       ← Nueva característica
feature/bant-scoring-v2         ← Mejora de feature existente
fix/auth-ssr-redirect           ← Bug fix
fix/email-resend-retry          ← Otro bug

hotfix/payment-webhook-critical ← Urgente (de main/prod)
docs/contributing-guide         ← Documentación
chore/upgrade-tailwind          ← Mantenimiento
```

### Crear rama

```bash
# Basarse en main (siempre)
git checkout main
git pull origin main

# Crear rama feature
git checkout -b feature/creator-dashboard

# Hacer cambios
git add .
git commit -m "feat(dashboard): add creator performance chart"

# Push
git push -u origin feature/creator-dashboard
```

---

## Pull Requests

### Estructura

```markdown
## Descripción

Qué cambió y por qué (1-2 párrafos máximo).

## Tipo de cambio

- [ ] Nueva funcionalidad
- [ ] Bug fix
- [ ] Refactor (sin cambios funcionales)
- [ ] Actualización de documentación
- [ ] Breaking change

## Testing

Describe cómo probaste los cambios:

- [ ] Testeado localmente (npm run dev)
- [ ] Tests automatizados pasados (npm run test)
- [ ] Type check pasó (npm run type-check)
- [ ] Linting pasó (npm run lint)
- [ ] Testeado en staging (si aplica)

## Screenshots (si es UI)

Incluir antes y después.

## Checklist

- [ ] Code se adhiere a estilo del proyecto
- [ ] Documentación actualizada
- [ ] Types TypeScript están correctos
- [ ] No hay console.logs de debug
- [ ] Variables de entorno documentadas (si aplica)
- [ ] No hay warnings de Supabase / Vercel
```

### Reglas

1. **Un PR = una funcionalidad** (no mezclar features)
2. **Titulo descriptivo:** `[Feature] Creator Dashboard — Add Performance Metrics` o `[Fix] Auth — SSR Redirect Loop`
3. **Asignar revisor:** @infiny (Alexander) u @samuel
4. **Linkedar issue:** `Closes #123`
5. **Pasar todos los checks:** tests + type-check + lint antes de merge

### Revisión

- **Mínimo 1 aprobación** antes de merge
- **No merge tu propio PR** (excepción: hotfixes críticos)
- **Resolver comentarios** o justificar decisiones

### Merge

```bash
# Opción A: Squash (recomendado para features pequeñas)
# GitHub UI → Squash and merge

# Opción B: Rebase (para series de commits lógicos)
# GitHub UI → Rebase and merge

# Nunca usar "Create a merge commit" (genera ruido en log)
```

---

## Código

### TypeScript

- ✅ **Tipos explícitos** en funciones públicas
  ```typescript
  // ✅ Bien
  function calculateCreatorTier(score: number): 'A' | 'B' | 'C' {
    return score >= 80 ? 'A' : score >= 60 ? 'B' : 'C';
  }

  // ❌ Evitar
  function calculateCreatorTier(score) {
    return ...;
  }
  ```

- ✅ **Tipos para Supabase** (generar con `supabase gen types`)
  ```typescript
  import type { Database } from '@/types/supabase';
  
  type Lead = Database['public']['Tables']['leads']['Row'];
  ```

- ✅ **Enums para valores fijos**
  ```typescript
  enum CreatorTier {
    A = 'A',
    B = 'B',
    C = 'C',
  }
  ```

- ❌ **Evitar `any`** — usar `unknown` + type guards si es necesario

### React (Server Components default)

- ✅ **Preferencia Server Components** (Next.js 15 App Router)
  ```typescript
  // ✅ Server Component (default)
  export default async function Dashboard() {
    const leads = await fetchLeads(); // ← directamente en componente
    return <div>{leads.map(...)}</div>;
  }
  ```

- ✅ **`'use client'` mínimo** — solo para interactividad
  ```typescript
  'use client';
  
  import { useState } from 'react';
  
  export function FilterButton() {
    const [filter, setFilter] = useState('');
    // ...
  }
  ```

- ✅ **Server Actions** para mutations
  ```typescript
  'use server';
  
  export async function updateLeadTier(leadId: string, tier: string) {
    const { error } = await supabase
      .from('leads')
      .update({ tier })
      .eq('id', leadId);
    if (error) throw error;
  }
  ```

- ❌ **Evitar prop drilling** — usar Server Components + Suspense

### CSS

- ✅ **Tailwind classes** (via `clsx` o `cn()` helper)
  ```typescript
  import { cn } from '@/lib/utils';
  
  export function Card({ className, ...props }) {
    return (
      <div className={cn('bg-black border border-gray-700 p-6', className)}>
        {/* ... */}
      </div>
    );
  }
  ```

- ✅ **Design tokens** en `brand/design-tokens.md`
  ```typescript
  // ✅ Usar tokens documentados
  <button className="bg-black text-white hover:bg-gray-900">
  
  // ❌ Evitar magic colors
  <button className="bg-#0A0A0A">
  ```

- ❌ **Evitar CSS-in-JS** (Next.js optimiza mejor Tailwind)
- ❌ **Evitar imports `globals.css` en componentes** — Tailwind directives en `app/globals.css`

### Testing

- ✅ **Tests para funciones públicas**
  ```typescript
  // src/__tests__/lib/scoring.test.ts
  import { calculateCreatorTier } from '@/lib/scoring';
  
  describe('calculateCreatorTier', () => {
    it('returns A for score >= 80', () => {
      expect(calculateCreatorTier(85)).toBe('A');
    });
  });
  ```

- ✅ **Snapshot tests para UI estable**
  ```typescript
  it('renders lead card correctly', () => {
    const { container } = render(<LeadCard lead={mockLead} />);
    expect(container).toMatchSnapshot();
  });
  ```

- ❌ **No hacer tests para imports triviales** — focus en lógica

### Documentación Inline

- ✅ **JSDoc para funciones exportadas**
  ```typescript
  /**
   * Calculate tier basado en BANT score.
   * @param score - BANT score (0-100)
   * @returns Tier ('A' | 'B' | 'C')
   * @example
   * const tier = calculateCreatorTier(85);
   */
  export function calculateCreatorTier(score: number): 'A' | 'B' | 'C' {
  ```

- ✅ **Inline comments para lógica no-obvia**
  ```typescript
  // Exponential backoff: 1s, 2s, 4s between retries
  const delay = BASE_DELAY * Math.pow(2, attempt);
  ```

- ❌ **No comentar lo obvio**
  ```typescript
  // ❌ Evitar
  // Incrementar el contador
  count++;
  ```

---

## Supabase

### Migraciones

- ✅ **Crear archivo migration por feature**
  ```bash
  # Supabase CLI
  supabase migration new add_creator_scoring_history
  ```

- ✅ **Nombre descriptivo y date-prefixed**
  ```
  migrations/
  ├── 20260408120000_init_extensions.sql
  ├── 20260408120100_enums.sql
  └── [timestamp]_[descriptive_name].sql
  ```

- ✅ **Idempotente (IF NOT EXISTS, IF EXISTS)**
  ```sql
  CREATE TABLE IF NOT EXISTS creator_scoring_history (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    -- ...
  );
  ```

- ❌ **No DROP sin backup** (revisar con Alexander antes)

### RLS Policies

- ✅ **Política por rol** (ver `supabase/migrations/*_rls_policies.sql`)
  ```sql
  -- Leads visible solo para sales + admin
  CREATE POLICY lead_visibility
    ON leads
    FOR SELECT
    USING (auth.jwt() -> 'user_metadata' ->> 'role' IN ('admin', 'ventas'));
  ```

- ✅ **Documentar intención**
  ```sql
  -- Creadores pueden ver y editar solo sus propios deliverables
  CREATE POLICY creator_edit_own_deliverables
  ```

---

## n8n Workflows

### Estructura

- ✅ **Un workflow = un propósito claro** (lead-ingestion, bant-scorer, etc.)
- ✅ **Nodos nombrados** descriptivamente (`Webhook - Lead Ingestion`, `Supabase - Check Existing Lead`)
- ✅ **Error handler global** en cada workflow
- ✅ **Documentación en README** (`n8n/workflows-spec.md`)

### Code Nodes (JavaScript)

- ✅ **Sin require() en Code nodes** — sandbox restringido
- ✅ **Usar nodos nativos** (Crypto para HMAC, Supabase node para DB, etc.)
- ✅ **Comentarios en español** en workflows
- ❌ **No hardcodear secrets** — usar `$env.VARIABLE_NAME`

### Testing

- Probar con `?test=true` en webhook (si está implementado)
- Usar `Webhook - Debug` node para inspeccionar payloads
- No ejecutar workflows de production sin revisar primero

---

## Documentation

### README por carpeta

- ✅ **Cada carpeta principal tiene README.md**
- ✅ **Incluir:** propósito, setup, structure, variábles, links
- ✅ **Mantener actualizado** con cambios de código

### Markdown

- ✅ **Usar H2 para secciones** (`## Título`)
- ✅ **Tablas para referencia** (config, env vars)
- ✅ **Code blocks con syntax highlighting** (```typescript, ```bash, etc.)
- ✅ **Links internos:** `[Docs](./path/to/file.md)` (relativos)

### Documentación de API

- ✅ **Endpoint route.ts comentado**
  ```typescript
  // POST /api/leads
  // Body: { email, full_name, source, ... }
  // Response: { id, status: 'created' }
  export async function POST(request: Request) {
  ```

---

## Deployment

### Pre-deployment Checklist

- [ ] Rama está actualizada con `main`
- [ ] `npm run lint` pasa sin warnings
- [ ] `npm run type-check` pasa
- [ ] `npm run test` pasa
- [ ] Variables de entorno están en Vercel Project Settings (no en .env.example si son secretas)
- [ ] Base de datos migrada (si hay cambios Supabase)
- [ ] n8n workflows testeados (si hay cambios)

### Proceso

```bash
# 1. Merge a main (via GitHub PR)

# 2. Vercel deploy automático (CI/CD)
# Verificar: https://vercel.com/[project]/[deployment]

# 3. Si hay cambios DB, ejecutar migraciones
supabase db push --db-url "postgresql://..."

# 4. Verificar en producción
curl https://ugccolombia.co/api/health

# 5. Monitorear logs
vercel logs web --prod
```

### Rollback

```bash
# Si algo falla en producción:
vercel rollback --prod
# ← Revierte al deployment anterior
```

---

## Prácticas de Seguridad

- ❌ **Nunca commitear secrets** (.env.local, API keys)
- ✅ **Usar .gitignore** (ya configurado)
- ✅ **Usar Vercel Secrets** para vars productivas
- ✅ **Usar n8n Variables** para credenciales workflows
- ❌ **No loguear datos sensibles** (passwords, tokens, SSNs)
- ✅ **Validar inputs** en API routes (email, phone, etc.)

---

## Herramientas Útiles

| Tool | Comando | Uso |
|------|---------|-----|
| **ESLint** | `npm run lint` | Detecta problemas de código |
| **TypeScript** | `npm run type-check` | Valida tipos |
| **Vitest** | `npm run test` | Unit tests |
| **Prettier** | Auto en save (IDE) | Formatea código |
| **Vercel CLI** | `vercel` | Deploy y logs |
| **Supabase CLI** | `supabase` | Migraciones locales |

---

## Preguntas Frecuentes

**P: Puedo commitear directamente a main?**
R: No. Siempre via PR + code review.

**P: Qué pasa si me olvido de actualizar la rama?**
R: GitHub te avisa en el PR. Hacer `git pull origin main` localmente y push de nuevo.

**P: Cómo rollback de un commit?**
R: Revert: `git revert [commit-hash]` → nuevo commit que deshace cambios.

**P: Si rompo algo en produción?**
R: Reportar inmediatamente a Alexander. Usar `vercel rollback --prod` si es necesario.

---

## Contacto

- **Preguntas de convención:** Abre una discusión en GitHub
- **Emergencias producción:** WhatsApp a Alexander

---

## Claude Code — skill `ugc-content-creator`

El repo incluye una skill versionada en `.claude/skills/ugc-content-creator/` que Tanya (Community Manager) y el resto del equipo pueden usar para generar contenido on-brand. Lee `content/viralidad/`, `brand/design-tokens.md` y `scripts/image-gen/brand-system.mjs` para producir carruseles IG, reels, stories, posts LinkedIn, shorts de YouTube, thumbnails y broadcasts WhatsApp siguiendo los 5 pilares de viralidad.

**Cómo invocarla:**

Con Claude Code abierto en el repo, escribir en lenguaje natural — por ejemplo:

- *"Dame un carrusel educativo para IG sobre los 3 errores que matan un UGC antes del hook"*
- *"Reel para TikTok de debate sobre marketplaces vs agencias boutique"*
- *"Story BTS de la grabación de hoy con Camila"*
- *"Post LinkedIn de Alexander sobre retención en UGC 2026"*

Claude detecta formato + pilar, propone estructura + copy + prompts Nanobanana, y ofrece ejecutar `generate-social.mjs` para generar los PNGs.

**Documentación completa:** `.claude/skills/ugc-content-creator/SKILL.md`.

---

## Permisos y capas de seguridad (Claude Code)

El repo usa 5 capas de defensa en profundidad para que contenido/marketing pueda operar con Claude Code sin riesgo de tocar código de producto:

1. **GitHub Read-only** para miembros de contenido (ej. Tanya). `git push` rebota. Cambios van via PR desde la UI de GitHub.
2. **Branch protection + CODEOWNERS** (`.github/CODEOWNERS`). Cualquier PR que toque `/web`, `/supabase`, `/scripts`, `/n8n`, `/.claude` o `/.github` requiere review de @AlexanderKast.
3. **`.claude/settings.json`** compartido con `deny` estricto: bloquea Write sobre `web/app/`, `supabase/`, `scripts/`, `n8n/`, `.env*`, `package.json`, `next.config.*`, etc. Bloquea `git push`, `git commit`, `git reset`, `rm`, `vercel:*`, `supabase:*`. Las reglas `deny` ganan sobre `allow` — ni con `--dangerously-skip-permissions` se saltan.
4. **Pre-commit hook** (`scripts/hooks/pre-commit.sh`). Si alguien edita archivos protegidos fuera de Claude Code, el commit local aborta. Requiere `ALLOW_PROTECTED=1` para desbloquear (solo Alexander/Samuel lo setean cuando aprueban).
5. **Flujo documentado** (abajo): ninguna modificación a rutas protegidas ocurre sin aprobación escrita.

**Rutas donde Tanya sí puede escribir** (via `Write` allow de la skill):
- `content/calendar/**` — planes editoriales, métricas, briefs semanales.
- `drafts/**` — outputs intermedios, briefs JSON para generate-social.
- `web/public/brand/social/**` — assets generados con Nanobanana.

**Activar el pre-commit hook en tu máquina (una sola vez):**

```bash
git config core.hooksPath scripts/hooks
chmod +x scripts/hooks/pre-commit.sh   # Mac/Linux
```

En Windows con Git Bash, `chmod` lo ejecuta Git automáticamente al checkout.

---

## Onboarding Community Manager (Tanya)

Pasos para dar acceso a Tanya (o cualquier nuevo miembro del equipo de contenido):

### 1. Invitar al repo en GitHub con rol **Read**

Settings → Collaborators → Add people → rol `Read`.
Con Read, Tanya puede `git clone` y `git pull` pero no `git push`. Los cambios los propone con PR desde la UI de GitHub.

### 2. Branch protection en `main`

Settings → Branches → Add rule para `main`:
- ☑ Require a pull request before merging
- ☑ Require approvals (1 mínimo)
- ☑ Require review from Code Owners
- ☑ Restrict who can push to matching branches (solo Alexander y Samuel)

### 3. Instalar en su Mac

- **Git** (viene pre-instalado en macOS; si no, `brew install git`).
- **Node.js 20+** (`brew install node` o desde nodejs.org).
- **Claude Code** (https://claude.com/claude-code — extensión VS Code + CLI).
- **VS Code** con extensiones: Claude Code, GitLens (recomendado).

### 4. Clonar el repo

```bash
cd ~/Documents
git clone https://github.com/AlexanderKast/ugc-colombia.git
cd ugc-colombia
```

### 5. Configurar su GEMINI_API_KEY propia

Tanya crea su propia key en https://aistudio.google.com con **su cuenta de Google** (no la compartida del proyecto). Esto le da rate limit propio y auditabilidad independiente.

```bash
# Crear web/.env.local (no se versiona)
nano web/.env.local
# Agregar:
# GEMINI_API_KEY=<su-key-personal>
```

### 6. Instalar dependencias

```bash
# Desde la raíz del repo:
npm install
# O si scripts/image-gen tiene su propio package.json:
cd scripts/image-gen && npm install
```

### 7. Activar el pre-commit hook

```bash
git config core.hooksPath scripts/hooks
```

### 8. Test de humo (generar un asset)

```bash
node scripts/image-gen/generate.mjs home hero
```

Debería generar un PNG en `web/public/brand/home/hero.png`. Si falla: revisar que la key de Gemini esté activa.

### 9. Test de la skill desde Claude Code

Abrir el repo en Claude Code y escribir:

```
Usa la skill ugc-content-creator para darme un reel educativo sobre hooks para UGC
```

Debería activarse la skill y devolver estructura + copy + prompts Nanobanana.

### 10. Test de permisos (opcional pero recomendado)

Pedir a Claude:

```
Modifica web/app/page.tsx y agrega un banner
```

Debe bloquearse por el `deny` de `.claude/settings.json`. Si no bloquea, revisar que `settings.json` esté correctamente cargado (reiniciar Claude Code).

### 11. Flujo de trabajo diario de Tanya

1. `git pull` al empezar el día para recibir actualizaciones de skill/branding.
2. Usa la skill en Claude Code para generar piezas.
3. Los drafts y calendarios los escribe Claude en `content/calendar/` y `drafts/`.
4. Los PNGs generados viven en `web/public/brand/social/YYYYMMDD-<slug>/`.
5. Tanya los descarga, arma en Canva/CapCut y publica con Buffer/Later.
6. Si hace cambios a docs de contenido que quiere compartir: abre PR desde UI de GitHub → Alexander aprueba → merge.

**Qué NO hacer:**
- No modificar `web/`, `supabase/`, `scripts/`, `n8n/` directamente. Si surge la necesidad, crear issue describiendo el cambio y esperar aprobación.
- No desactivar el hook (`git config --unset core.hooksPath`) sin permiso.
- No compartir su `GEMINI_API_KEY` con nadie más del equipo.

---

**Última actualización:** 2026-04-16
**Mantenido por:** Alexander Cast
