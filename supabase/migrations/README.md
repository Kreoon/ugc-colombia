# Migraciones Supabase — UGC Colombia

Autor: Alexander Cast  
Proyecto: UGC Colombia  
Base de datos: Supabase (PostgreSQL 15+)

---

## Orden de aplicación

Las migraciones deben aplicarse en orden estricto de timestamp. Cada una depende de las anteriores.

| Archivo | Descripcion |
|---|---|
| `20260408120000_init_extensions.sql` | Extensiones PostgreSQL: uuid-ossp, pgcrypto |
| `20260408120100_enums.sql` | Documentacion de dominios (CHECK constraints en tablas) |
| `20260408120200_core_tables.sql` | Tablas base: team_members, leads, clients + RLS |
| `20260408120300_creators.sql` | Roster de creators, scoring history, pagos + RLS |
| `20260408120400_projects.sql` | Proyectos, briefs, entregables + FK diferidas + RLS |
| `20260408120500_billing.sql` | Facturas a clientes, reportes de resultados + RLS |
| `20260408120600_views.sql` | Vistas derivadas: stats, pipeline, billing summary |
| `20260408120700_rls_policies.sql` | Politicas adicionales: anon form, helper is_team_member() |
| `20260408120800_triggers.sql` | Triggers: updated_at, score sync, tier upgrade, revision count |
| `20260408120900_seed_team.sql` | Seed equipo: Alexander, Brian, Diana, Samuel, Tanya |

---

## Metodo 1: Supabase CLI (recomendado)

### Prerequisitos

```bash
npm install -g supabase
supabase login
```

### Aplicar todas las migraciones

```bash
# Desde la raiz del proyecto (donde esta supabase/config.toml)
supabase db push
```

### Aplicar en entorno local (dev)

```bash
supabase start       # levanta Postgres local en Docker
supabase db reset    # aplica todas las migraciones desde cero
```

### Verificar estado de migraciones

```bash
supabase migration list
```

---

## Metodo 2: SQL manual (Supabase Dashboard)

Si no tienes CLI configurado, puedes copiar y pegar cada archivo en orden en:

`https://supabase.com/dashboard → SQL Editor`

Copiar el contenido de cada archivo en el orden indicado arriba y ejecutar uno por uno.

---

## Metodo 3: psql directo

```bash
# Conectar con la connection string de tu proyecto Supabase
export SUPABASE_DB_URL="postgresql://postgres:[PASSWORD]@db.[PROJECT_REF].supabase.co:5432/postgres"

# Aplicar en orden
psql $SUPABASE_DB_URL -f supabase/migrations/20260408120000_init_extensions.sql
psql $SUPABASE_DB_URL -f supabase/migrations/20260408120100_enums.sql
psql $SUPABASE_DB_URL -f supabase/migrations/20260408120200_core_tables.sql
psql $SUPABASE_DB_URL -f supabase/migrations/20260408120300_creators.sql
psql $SUPABASE_DB_URL -f supabase/migrations/20260408120400_projects.sql
psql $SUPABASE_DB_URL -f supabase/migrations/20260408120500_billing.sql
psql $SUPABASE_DB_URL -f supabase/migrations/20260408120600_views.sql
psql $SUPABASE_DB_URL -f supabase/migrations/20260408120700_rls_policies.sql
psql $SUPABASE_DB_URL -f supabase/migrations/20260408120800_triggers.sql
psql $SUPABASE_DB_URL -f supabase/migrations/20260408120900_seed_team.sql
```

---

## Post-instalacion: vincular equipo a Auth

Despues de que cada miembro del equipo haga sign up en Supabase Auth, ejecutar en el SQL Editor:

```sql
-- Vincular Alexander
SELECT link_team_member_to_auth('founder@kreoon.com');

-- Vincular resto del equipo
SELECT link_team_member_to_auth('brian@ugccolombia.co');
SELECT link_team_member_to_auth('tdianamile@gmail.com');
SELECT link_team_member_to_auth('samuel@ugccolombia.co');
SELECT link_team_member_to_auth('tanya@ugccolombia.co');
```

---

## Estructura del schema

```
auth.users (Supabase nativo)
    |
    └── team_members (equipo interno)
            |
            ├── leads (prospectos)
            |       └── clients (clientes convertidos)
            |               |
            |               ├── projects (proyectos contratados)
            |               |       ├── briefs (briefings creativos)
            |               |       └── deliverables (entregables por creator)
            |               |
            |               ├── client_invoices (facturacion)
            |               └── reports (reportes de resultados)
            |
            └── creators (roster UGC)
                    ├── creator_scoring_history (evaluaciones)
                    └── creator_payments (pagos a creators)
```

---

## Vistas disponibles

| Vista | Descripcion |
|---|---|
| `v_creator_stats` | Score, entregables y pagos consolidados por creator |
| `v_project_summary` | Progreso y financiero por proyecto (margen, completion %) |
| `v_pipeline_leads` | Funnel de leads con tiempos de conversion |
| `v_billing_summary` | Resumen financiero mensual de la agencia |

---

## Reglas de negocio implementadas en triggers

- `updated_at` se actualiza automaticamente en todas las tablas
- `creators.score` se recalcula con promedio ponderado de las ultimas 10 evaluaciones
- `creators.tier` sube/baja automaticamente segun score (bronze/silver/gold/platinum)
- `leads.converted_at` se registra automaticamente al cambiar status a `converted`
- `deliverables.revision_count` se incrementa al cambiar status a `revision` y lanza error si supera `max_revisions`
- `projects.cost_cop` se recalcula sumando `creator_fee_cop` de todos sus entregables

---

## Notas de seguridad

- RLS habilitado en todas las tablas
- Usuarios anonimos SOLO pueden insertar leads (formularios publicos)
- Usuarios autenticados del equipo pueden leer todo el schema
- Solo founders/managers pueden modificar facturas y pagos
- Solo founders pueden hacer hard delete (el soft delete via `deleted_at` esta disponible para leads y clients)
- El historial de scoring es inmutable (no hay UPDATE policy en `creator_scoring_history`)
