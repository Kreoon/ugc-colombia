# Dashboard de Metricas del Creador — Especificacion para Supabase/Kreoon
**Sistema Operativo de Creadores v1.0**
**Fecha:** Abril 2026**
**Stack objetivo:** Supabase (PostgreSQL) + interfaz Kreoon o tabla interna

---

## Objetivo del dashboard

Centralizar toda la informacion operativa, de desempeno y financiera de cada creador del pool de UGC Colombia. Permite a Diana Mile y Alexander Cast tomar decisiones de asignacion, renegociacion de tarifas, upgrade/downgrade de Tier y pago, sin depender de hojas de calculo dispersas.

---

## Estructura de tablas en Supabase

### Tabla 1: `creators`
Perfil base del creador. Un registro por creador.

```sql
CREATE TABLE creators (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  -- Datos personales
  full_name TEXT NOT NULL,
  whatsapp TEXT NOT NULL UNIQUE,
  email TEXT UNIQUE,
  city TEXT,
  country TEXT,
  birthdate DATE,
  gender TEXT,
  id_type TEXT,
  id_number TEXT,

  -- Estado y clasificacion
  status TEXT NOT NULL DEFAULT 'aplicante'
    CHECK (status IN ('aplicante', 'en_revision', 'activo', 'pausado', 'suspendido', 'rechazado')),
  tier TEXT
    CHECK (tier IN ('A', 'B', 'C')),
  scoring_total NUMERIC(5,2),
  scoring_last_updated DATE,

  -- Redes sociales
  instagram_handle TEXT,
  instagram_followers INTEGER,
  instagram_engagement_rate NUMERIC(5,2),
  tiktok_handle TEXT,
  tiktok_followers INTEGER,
  youtube_handle TEXT,
  portfolio_url TEXT,

  -- Capacidades tecnicas
  max_resolution TEXT,
  editing_tools TEXT[],
  languages TEXT[],
  equipment TEXT[],

  -- Nichos
  niches TEXT[],
  excluded_categories TEXT[],

  -- Disponibilidad
  monthly_capacity_videos INTEGER,
  typical_turnaround_days INTEGER,
  accepts_physical_product BOOLEAN DEFAULT true,
  shipping_address TEXT,

  -- Pago
  preferred_payment_method TEXT,
  payment_account_details TEXT,
  has_rut BOOLEAN DEFAULT false,
  issues_invoice BOOLEAN DEFAULT false,
  base_rate_usd NUMERIC(10,2),

  -- Notas internas (solo equipo agencia)
  internal_notes TEXT,
  diana_notes TEXT,
  flags TEXT[]
);
```

---

### Tabla 2: `projects`
Un registro por proyecto / encargo.

```sql
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  -- Identificacion
  project_number TEXT UNIQUE NOT NULL, -- ej: UGC-2026-0042
  brand_name TEXT NOT NULL,
  brand_country TEXT,
  market TEXT CHECK (market IN ('LATAM', 'USA', 'Premium')),

  -- Contenido
  content_format TEXT NOT NULL
    CHECK (content_format IN ('testimonial', 'unboxing', 'demo', 'review', 'lifestyle', 'hook_ad', 'foto_pack', 'otro')),
  platform TEXT,
  duration_seconds INTEGER,
  usage_type TEXT
    CHECK (usage_type IN ('organico', 'paid_media', 'whitelisting', 'perpetuo')),
  whitelisting_days INTEGER,

  -- Asignacion
  creator_id UUID REFERENCES creators(id),
  assigned_by TEXT DEFAULT 'Diana Mile',
  assigned_at TIMESTAMP WITH TIME ZONE,

  -- Fechas clave
  brief_sent_date DATE,
  product_shipped_date DATE,
  product_received_date DATE,
  draft_due_date DATE,
  draft_received_date DATE,
  final_due_date DATE,
  final_delivered_date DATE,
  client_approved_date DATE,

  -- Estado
  status TEXT NOT NULL DEFAULT 'pendiente'
    CHECK (status IN (
      'pendiente',
      'brief_enviado',
      'en_produccion',
      'borrador_recibido',
      'en_revision_cliente',
      'en_correccion_creador',
      'aprobado',
      'entregado',
      'cerrado',
      'cancelado'
    )),

  -- Revisiones
  revision_rounds_included INTEGER DEFAULT 2,
  revision_rounds_used INTEGER DEFAULT 0,
  extra_revision_rounds INTEGER DEFAULT 0,
  extra_revision_fee_usd NUMERIC(10,2) DEFAULT 0,

  -- Financiero
  price_to_client_usd NUMERIC(10,2),
  creator_rate_usd NUMERIC(10,2),
  agency_markup_percent NUMERIC(5,2),
  advance_paid_client BOOLEAN DEFAULT false,
  advance_paid_creator BOOLEAN DEFAULT false,
  final_paid_client BOOLEAN DEFAULT false,
  final_paid_creator BOOLEAN DEFAULT false,
  advance_amount_usd NUMERIC(10,2),
  final_amount_usd NUMERIC(10,2),
  payment_method_client TEXT,
  payment_method_creator TEXT,

  -- Calidad post-proyecto
  quality_score_draft NUMERIC(3,1),    -- 1-5
  quality_score_brief_compliance NUMERIC(3,1),
  quality_score_punctuality NUMERIC(3,1),
  quality_score_corrections NUMERIC(3,1),
  quality_score_communication NUMERIC(3,1),
  quality_average NUMERIC(3,2),        -- calculado

  -- Notas
  internal_notes TEXT,
  client_feedback TEXT
);
```

---

### Tabla 3: `creator_payments`
Registro detallado de cada pago al creador.

```sql
CREATE TABLE creator_payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  creator_id UUID REFERENCES creators(id) NOT NULL,
  project_id UUID REFERENCES projects(id),

  payment_type TEXT CHECK (payment_type IN ('anticipo', 'saldo', 'bonus', 'penalidad')),
  amount_usd NUMERIC(10,2) NOT NULL,
  amount_cop NUMERIC(15,2),
  exchange_rate NUMERIC(10,2),

  payment_method TEXT,
  payment_date DATE,
  payment_status TEXT DEFAULT 'pendiente'
    CHECK (payment_status IN ('pendiente', 'procesado', 'fallido', 'revertido')),
  reference_number TEXT,
  notes TEXT
);
```

---

### Tabla 4: `creator_scoring_history`
Historial de evaluaciones de scoring. Permite ver evolucion del creador.

```sql
CREATE TABLE creator_scoring_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  evaluated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  creator_id UUID REFERENCES creators(id) NOT NULL,
  evaluated_by TEXT DEFAULT 'Diana Mile',

  -- Scores por categoria (mismo sistema del doc 02)
  score_engagement NUMERIC(5,2),
  score_technical_quality NUMERIC(5,2),
  score_hook_retention NUMERIC(5,2),
  score_professionalism NUMERIC(5,2),
  score_soft_skills NUMERIC(5,2),
  score_languages NUMERIC(5,2),
  total_score NUMERIC(5,2),

  tier_assigned TEXT CHECK (tier_assigned IN ('A', 'B', 'C', 'Rechazado')),
  notes TEXT,
  trigger_event TEXT  -- 'aplicacion_inicial', 'revision_90_dias', 'post_proyecto', 'incidente'
);
```

---

### Vista: `creator_performance_summary`
Vista calculada para el dashboard principal.

```sql
CREATE VIEW creator_performance_summary AS
SELECT
  c.id,
  c.full_name,
  c.tier,
  c.status,
  c.instagram_handle,
  c.instagram_followers,
  c.instagram_engagement_rate,
  c.base_rate_usd,
  c.languages,
  c.niches,

  -- Metricas de proyectos
  COUNT(p.id) AS total_projects,
  COUNT(CASE WHEN p.status = 'cerrado' THEN 1 END) AS completed_projects,
  COUNT(CASE WHEN p.status = 'cancelado' THEN 1 END) AS cancelled_projects,

  -- Puntualidad
  AVG(
    CASE
      WHEN p.final_delivered_date IS NOT NULL AND p.final_due_date IS NOT NULL
      THEN EXTRACT(DAY FROM p.final_delivered_date - p.final_due_date)
    END
  ) AS avg_days_late,

  -- Revisiones
  AVG(p.revision_rounds_used) AS avg_revision_rounds,

  -- Calidad
  AVG(p.quality_average) AS avg_quality_score,
  AVG(p.quality_score_brief_compliance) AS avg_brief_compliance,
  AVG(p.quality_score_punctuality) AS avg_punctuality,

  -- Financiero
  SUM(p.creator_rate_usd) AS total_earned_usd,
  AVG(p.creator_rate_usd) AS avg_rate_per_project,

  -- Actividad reciente
  MAX(p.created_at) AS last_project_date,
  MIN(p.created_at) AS first_project_date

FROM creators c
LEFT JOIN projects p ON p.creator_id = c.id
GROUP BY c.id;
```

---

## KPIs del dashboard por vista

### Vista 1: Panel general del pool

| KPI | Descripcion | Formula |
|-----|-------------|---------|
| Total creadores activos | Creadores con status = 'activo' | COUNT WHERE status = 'activo' |
| Distribucion por Tier | % A / B / C del pool activo | COUNT por tier / total activos |
| Creadores disponibles esta semana | Con capacidad disponible segun proyectos asignados | capacity - proyectos_en_curso |
| Nuevas aplicaciones pendientes | Formularios recibidos sin scoring | COUNT WHERE status = 'en_revision' |
| Tasa de aprobacion | % de aplicantes que llegan al pool | aprobados / total_aplicantes |

---

### Vista 2: Perfil individual del creador

| Seccion | Campos a mostrar |
|---------|-----------------|
| Identidad | Foto (si disponible), nombre, ciudad, Tier, status |
| Redes | Handle Instagram/TikTok, seguidores, engagement rate |
| Scoring | Puntaje total y por categoria (grafico de radar) |
| Historial de proyectos | Lista de proyectos, formato, marca, calificacion, fecha |
| Metricas de desempeno | Proyectos completados, puntualidad promedio, rounds de revision promedio, calidad promedio |
| Finanzas | Total ganado, tarifa promedio, pagos pendientes |
| Disponibilidad | Capacidad mensual declarada, proyectos activos actuales |
| Notas internas | Campo de texto privado para Diana y Alexander |

---

### Vista 3: Tablero operativo Diana Mile (gestion diaria)

| Columna | Descripcion |
|---------|-------------|
| Proyectos en brief enviado | Esperando que el creador confirme recepcion |
| Proyectos en produccion | Creador grabando, dentro del plazo |
| Borradores pendientes de recibir | Fecha limite proxima o vencida |
| En revision de cliente | Esperando feedback del cliente |
| En correccion del creador | Creador aplicando cambios |
| Pagos pendientes | Clientes o creadores con pago no procesado |
| Alertas | Proyectos con retraso, flags, incidentes |

Filtros disponibles: por Tier, por formato, por mercado (LATAM/USA), por fecha, por creador especifico.

---

### Vista 4: Metricas financieras (Alexander / CFO)

| KPI | Descripcion |
|-----|-------------|
| Facturacion mensual a clientes | Suma de price_to_client_usd por mes |
| Pagos a creadores del mes | Suma de creator_rate_usd por mes |
| Margen bruto agencia | (facturacion - pagos_creadores) / facturacion |
| Ingreso por mercado | LATAM vs USA vs Premium |
| Ingreso por formato | Cual formato genera mas revenue |
| Creador con mayor volumen | Por total facturado en el periodo |
| Proyectos cancelados (impacto) | Revenue perdido por cancelaciones |
| Pagos pendientes de cobro | Clientes con saldo vencido |

---

## Alertas automaticas recomendadas (via n8n)

| Trigger | Accion |
|---------|--------|
| Borrador no recibido 24h antes del deadline | WhatsApp a Diana + al creador |
| Cliente no responde en 48h | WhatsApp recordatorio de Diana al cliente |
| Revision extra #3 solicitada | Notificacion a Diana para cotizar |
| Creador con quality_average < 3.5 en 2 proyectos | Alerta a Diana para revisar Tier |
| Pago al creador pendiente mas de 3 dias | Alerta interna a Alexander |
| Nuevo formulario de aplicacion recibido | Notificacion a Diana en WhatsApp |
| Creador con scoring_last_updated > 90 dias | Recordatorio de reevaluacion |

---

## Implementacion recomendada

**Base de datos:** Supabase (ya en uso en Kreoon)
**Interfaz:** Crear una app ligera en Next.js o usar Supabase Table Editor + Row Level Security para acceso de Diana Mile con su propio login.
**Automatizaciones:** n8n (ya activo en dev.kreoon.com) conectado a Supabase via webhook o HTTP Request node.
**Reportes:** Exportar vistas como CSV mensual o conectar a Google Looker Studio para graficos ejecutivos.

**Accesos:**
- Alexander Cast: acceso total (admin)
- Diana Mile: acceso a vistas operativas + edicion de scoring + notas de creadores (no ve datos financieros completos de markup)
- Creadores: No tienen acceso directo al dashboard (no es una plataforma de self-service en esta version)

---

## Campos minimos para lanzar (MVP)

Si se quiere empezar rapido antes de construir el dashboard completo, estos son los campos minimos en una hoja de Google Sheets vinculada a Supabase:

**Tabla creators simplificada:**
Nombre | WhatsApp | Tier | Status | Instagram | Seguidores | Engagement | Tarifa USD | Nichos | Idiomas | Fecha de ingreso | Notas Diana

**Tabla projects simplificada:**
N° Proyecto | Marca | Formato | Creador | Fecha Limite | Estado | Precio Cliente | Tarifa Creador | Rondas usadas | Calidad (1-5) | Pagado cliente | Pagado creador

Esta version puede correr en Google Sheets con un formulario de ingreso manual por parte de Diana, y migrarse a Supabase cuando el volumen lo justifique (20+ creadores activos o 10+ proyectos simultaneos).
