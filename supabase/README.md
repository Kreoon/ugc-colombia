# Supabase Schema — UGC Colombia

Stack: Supabase PostgreSQL + Next.js 15 (ugccolombia.co)
Ecosistema: Kreoon | Ultima actualizacion: 2026-04-09

---

## Estructura de tablas

| Tabla                    | Descripcion                                          |
|--------------------------|------------------------------------------------------|
| `team_members`           | Equipo interno (Alexander, Diana, Brian, Samuel, Tanya) |
| `leads`                  | Prospectos de sitio web, WhatsApp y redes            |
| `clients`                | Clientes activos (leads convertidos)                 |
| `creators`               | Pool de creadores UGC con scoring A/B/C              |
| `creator_scoring_history`| Historial de evaluaciones por creador                |
| `projects`               | Proyectos por cliente, agrupan briefs                |
| `briefs`                 | Un brief = un video/foto a producir                  |
| `deliverables`           | Archivos entregados por creadores                    |
| `creator_payments`       | Pagos individuales a creadores                       |
| `client_invoices`        | Facturas a clientes                                  |
| `reports`                | Reportes mensuales por cliente                       |
| `mrr_snapshots`          | Snapshots financieros mensuales                      |
| `client_notifications`   | Notificaciones del portal cliente con Realtime       |

## Vistas derivadas

| Vista                        | Uso                                              |
|------------------------------|--------------------------------------------------|
| `creator_performance_summary`| Dashboard individual de cada creador             |
| `client_dashboard`           | KPIs por cliente para el panel de cuenta         |
| `pipeline_by_stage`          | Pipeline comercial (leads) + operativo (proyectos)|

---

## Como aplicar el schema

### Opcion A — Supabase MCP (recomendado desde Claude Code)

```
execute_sql con el contenido de schema.sql
```

### Opcion B — Supabase CLI

```bash
supabase db push --db-url "postgresql://postgres:[PASSWORD]@db.[PROJECT_REF].supabase.co:5432/postgres"
```

### Opcion C — SQL Editor en dashboard

Supabase Dashboard > SQL Editor > New query > pegar schema.sql > Run

---

## Variables de entorno necesarias

### Next.js (web/.env.local)

```env
NEXT_PUBLIC_SUPABASE_URL=https://[PROJECT_REF].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=[ANON_KEY]
SUPABASE_SERVICE_ROLE_KEY=[SERVICE_ROLE_KEY]
```

### n8n (dev.kreoon.com)

```env
SUPABASE_URL=https://[PROJECT_REF].supabase.co
SUPABASE_SERVICE_ROLE_KEY=[SERVICE_ROLE_KEY]
```

### Edge Functions (supabase/functions/.env)

```env
SUPABASE_URL=https://[PROJECT_REF].supabase.co
SUPABASE_SERVICE_ROLE_KEY=[SERVICE_ROLE_KEY]
BUNNY_API_KEY=[BUNNY_CDN_API_KEY]
BUNNY_STREAM_LIBRARY_ID=[BUNNY_LIBRARY_ID]
```

> El SERVICE_ROLE_KEY bypasea RLS. Usarlo SOLO en Edge Functions y n8n.
> El ANON_KEY va en el frontend — nunca el service role key.

---

## Paso post-instalacion: vincular usuarios del equipo

Despues de crear las cuentas en Supabase Auth, actualizar los user_id:

```sql
UPDATE team_members
SET user_id = auth.users.id
FROM auth.users
WHERE auth.users.email = team_members.email;
```

---

## Paso post-instalacion: activar un cliente en el portal

1. Crear cuenta en Supabase Auth (email del cliente).
2. Vincular el UUID al registro de clients:

```sql
UPDATE clients
SET portal_user_id = '<uuid-de-auth.users>'
WHERE email = '<email-del-cliente>';
```

---

## Sistema de roles

| Rol          | Ver todo | Financials | Editar creadores | Aprobar pagos |
|--------------|----------|------------|-----------------|---------------|
| admin        | si       | si         | si              | si            |
| operaciones  | si       | no         | si              | no            |
| ventas       | si       | no         | no              | no            |
| finanzas     | si       | si         | no              | si            |
| creativo     | si       | no         | no              | no            |

Asignaciones iniciales:
- Alexander Cast → admin
- Diana Mile → operaciones (+ can_edit_creators)
- Brian → creativo
- Samuel → operaciones
- Tanya → ventas

---

## Triggers activos

| Trigger                        | Tabla                    | Funcion                           |
|--------------------------------|--------------------------|-----------------------------------|
| updated_at automatico          | todas las tablas         | `trigger_set_updated_at()`        |
| Numerar proyectos              | `projects`               | `generate_project_number()`       |
| Numerar facturas               | `client_invoices`        | `generate_invoice_number()`       |
| Calcular quality_average       | `briefs`                 | `calculate_brief_quality_average()`|
| Auto-scoring creadores         | `creator_scoring_history`| `update_creator_scoring()`        |
| Calcular margen de proyecto    | `projects`               | `calculate_project_margin()`      |
| Emitir Realtime notification   | `client_notifications`   | `notify_client_notification()`    |

---

## Logica de tier automatico

Cuando se inserta un registro en `creator_scoring_history`:

| Score total | Tier asignado |
|-------------|---------------|
| >= 80       | A             |
| >= 60       | B             |
| < 60        | C             |

Se actualiza automaticamente `creators.tier` y `creators.scoring_total`.

---

## Calcular MRR snapshot manualmente

```sql
SELECT calculate_mrr_snapshot('2026-04-01');
```

Para automatizar con pg_cron (habilitar extension en Supabase Dashboard):

```sql
SELECT cron.schedule(
  'monthly-mrr-snapshot',
  '0 1 1 * *',  -- 1am el primer dia de cada mes
  $$SELECT calculate_mrr_snapshot(DATE_TRUNC('month', CURRENT_DATE - INTERVAL '1 month'))$$
);
```

---

## Integracion n8n

Desde n8n (dev.kreoon.com), usar el node **Supabase** o **HTTP Request**:

- **Nuevo lead del formulario web** → INSERT en `leads`
- **Lead convertido** → UPDATE `leads.stage = 'convertido'` + INSERT en `clients`
- **Nueva aplicacion de creador** → INSERT en `creators` (status: aplicante)
- **Recordatorio scoring vencido** → query sobre `creator_performance_summary WHERE scoring_overdue = true`
- **Alerta quality baja** → query sobre `creator_performance_summary WHERE quality_alert = true`
- **Reporte mensual** → llamar `calculate_mrr_snapshot()` + generar PDF + INSERT en `reports`
- **Notificacion al cliente** → INSERT en `client_notifications` (se propaga via Realtime automaticamente)

---

## Almacenamiento de archivos (deliverables)

- **Videos**: Bunny Stream CDN → guardar `bunny_video_id` en `deliverables.bunny_video_id`
- **Fotos y PDFs**: Supabase Storage bucket `ugc-deliverables` (privado) → guardar path en `deliverables.storage_path`
- **Reportes PDF**: Supabase Storage bucket `ugc-reports` → guardar URL en `reports.report_url`

---

## Migraciones del portal cliente (2026-04-09)

| Archivo                                      | Descripcion                                                             |
|----------------------------------------------|-------------------------------------------------------------------------|
| `20260409000000_client_portal_auth.sql`      | Añade `portal_user_id` a `clients` y crea la funcion `is_portal_client()` |
| `20260409000100_client_portal_rls.sql`       | Politicas SELECT para clientes en `projects`, `briefs`, `deliverables`, `client_invoices`, `reports` |
| `20260409000200_client_portal_notifications.sql` | Tabla `client_notifications`, RLS y trigger Realtime via `pg_notify` |
| `20260409010000_schema_gaps_fixes.sql`       | Columnas e índices faltantes: `leads.email_bounced`, `leads.unsubscribed`, `creator_payments.idempotency_key`, `creators.ai_notes`, `projects.churn_risk`, `projects.health_score` |
