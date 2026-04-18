# n8n Workflows — UGC Colombia

**Instancia:** https://dev.kreoon.com
**Owner:** Alexander Cast (@infiny)
**Actualizado:** 2026-04-08

## Variables de entorno (n8n → Settings → Variables)

```
SUPABASE_URL=https://xxxx.supabase.co
SUPABASE_SERVICE_KEY=eyJhbGc...
RESEND_API_KEY=re_xxx
BEEHIIV_API_KEY=bhv_xxx
BEEHIIV_PUB_ID=pub_xxx
WHATSAPP_TOKEN=EAAG...
WHATSAPP_PHONE_ID=1234567890
ALEXANDER_WHATSAPP=573001234567
DIANA_WHATSAPP=573007654321
BRIAN_WHATSAPP=573009876543
CALCOM_API_KEY=cal_xxx
CALCOM_WEBHOOK_SECRET=whsec_xxx
ANTHROPIC_API_KEY=sk-ant-xxx
MERCURY_API_KEY=mrc_xxx
WISE_API_KEY=wise_xxx
BUNNY_STREAM_KEY=bny_xxx
INTERNAL_WEBHOOK_SECRET=ugc_internal_xxx
```

## Credenciales n8n requeridas

| Credencial                | Tipo             | Usos                          |
| ------------------------- | ---------------- | ----------------------------- |
| `Supabase - UGC Colombia` | Supabase API     | Todos los workflows           |
| `Resend API`              | HTTP Header Auth | Emails transaccionales        |
| `WhatsApp Cloud API`      | HTTP Header Auth | Notificaciones                |
| `Beehiiv API`             | HTTP Header Auth | Newsletter subs               |
| `Anthropic Claude`        | Anthropic API    | BANT scoring, creator scoring |
| `Cal.com API`             | HTTP Header Auth | Bookings                      |

## Schema Supabase (tablas referenciadas)

```sql
leads (id, full_name, email, phone, source, company, budget_range, created_at,
       bant_score, tier, stage, last_touch_at, touch_count, notes)
creators (id, full_name, email, phone, instagram, niche, followers, city,
          score, status, applied_at, assigned_to)
clients (id, company, contact_email, whatsapp, plan, mrr, started_at)
bookings (id, lead_id, event_type, scheduled_at, status, cal_booking_id, notes)
content_pieces (id, client_id, type, url, pillar, status, published_at)
payments (id, creator_id, amount_usd, currency, period_start, period_end,
          status, provider, tx_id, scheduled_for)
workflow_logs (id, workflow, node, level, message, payload, created_at)
```

---

## 1) lead-ingestion

**Proposito:** Capturar leads desde web form, WhatsApp (Jarvis) o Instagram DM y normalizarlos.

**Trigger:** Webhook POST `/webhook/lead-ingestion`
**Body esperado:**

```json
{
  "source": "web_form | whatsapp | instagram_dm",
  "full_name": "...",
  "email": "...",
  "phone": "...",
  "company": "...",
  "budget_range": "...",
  "message": "...",
  "idempotency_key": "..."
}
```

### Nodos

#### Node 1: Webhook - Lead Ingestion

- **Tipo:** Webhook
- **Metodo:** POST
- **Path:** `lead-ingestion`
- **Response Mode:** Last Node
- **Authentication:** Header Auth (`X-Internal-Secret` = `{{ $env.INTERNAL_WEBHOOK_SECRET }}`)

#### Node 2: Code - Validate & Normalize

- **Tipo:** Code (JavaScript)

```javascript
const item = $input.first().json;
const required = ["source", "email"];
for (const f of required) {
  if (!item[f]) throw new Error(`Missing field: ${f}`);
}
const normalized = {
  source: item.source,
  full_name: (item.full_name || "").trim(),
  email: item.email.toLowerCase().trim(),
  phone: (item.phone || "").replace(/\D/g, ""),
  company: item.company || null,
  budget_range: item.budget_range || null,
  notes: item.message || null,
  idempotency_key:
    item.idempotency_key || `${item.source}-${item.email}-${Date.now()}`,
  stage: "new",
  touch_count: 0,
  created_at: new Date().toISOString(),
};
return [{ json: normalized }];
```

#### Node 3: Supabase - Check Existing Lead

- **Tipo:** Supabase
- **Operacion:** Get Many Rows
- **Tabla:** `leads`
- **Filtros:** `email = {{ $json.email }}`
- **Limit:** 1

#### Node 4: IF - Is New Lead?

- **Tipo:** IF
- **Condicion:** `{{ $json.length === 0 }}`
- **True:** Node 5
- **False:** Node 11 (update touch_count only)

#### Node 5: Supabase - Insert Lead

- **Tipo:** Supabase
- **Operacion:** Insert Row
- **Tabla:** `leads`
- **Campos:** todos del Node 2
- **On error:** continue (log en workflow_logs)

#### Node 6: HTTP Request - Resend Welcome Email

- **Tipo:** HTTP Request
- **Metodo:** POST
- **URL:** `https://api.resend.com/emails`
- **Headers:** `Authorization: Bearer {{ $env.RESEND_API_KEY }}`
- **Body (JSON):**

```json
{
  "from": "UGC Colombia <hola@agenciaugccolombia.co>",
  "to": "{{ $('Code - Validate & Normalize').item.json.email }}",
  "subject": "Bienvenido a UGC Colombia, {{ $('Code - Validate & Normalize').item.json.full_name }}",
  "html": "<h2>Hola {{ $('Code - Validate & Normalize').item.json.full_name }}!</h2><p>Gracias por tu interes. En 24h te contactamos para una discovery call gratis.</p><p><a href='https://cal.com/ugc-colombia/discovery'>Agenda tu llamada</a></p>"
}
```

- **Retry on fail:** 3x, backoff 2s

#### Node 7: HTTP Request - Beehiiv Subscribe

- **Tipo:** HTTP Request
- **Metodo:** POST
- **URL:** `https://api.beehiiv.com/v2/publications/{{ $env.BEEHIIV_PUB_ID }}/subscriptions`
- **Headers:** `Authorization: Bearer {{ $env.BEEHIIV_API_KEY }}`
- **Body:**

```json
{
  "email": "{{ $('Code - Validate & Normalize').item.json.email }}",
  "reactivate_existing": true,
  "send_welcome_email": false,
  "utm_source": "{{ $('Code - Validate & Normalize').item.json.source }}"
}
```

- **On error:** continue

#### Node 8: HTTP Request - WhatsApp Alexander

- **Tipo:** HTTP Request
- **Metodo:** POST
- **URL:** `https://graph.facebook.com/v21.0/{{ $env.WHATSAPP_PHONE_ID }}/messages`
- **Headers:** `Authorization: Bearer {{ $env.WHATSAPP_TOKEN }}`
- **Body:**

```json
{
  "messaging_product": "whatsapp",
  "to": "{{ $env.ALEXANDER_WHATSAPP }}",
  "type": "text",
  "text": {
    "body": "Nuevo lead UGC: {{ $('Code - Validate & Normalize').item.json.full_name }} ({{ $('Code - Validate & Normalize').item.json.source }}) - {{ $('Code - Validate & Normalize').item.json.email }} - Budget: {{ $('Code - Validate & Normalize').item.json.budget_range }}"
  }
}
```

#### Node 9: HTTP Request - Trigger BANT Scorer

- **Tipo:** HTTP Request
- **URL:** `https://dev.kreoon.com/webhook/bant-scorer`
- **Body:** `{ "lead_id": "{{ $('Supabase - Insert Lead').item.json.id }}" }`

#### Node 10: Respond to Webhook

- **Body:** `{ "status": "ok", "lead_id": "{{ $('Supabase - Insert Lead').item.json.id }}" }`

#### Node 11: Supabase - Update Touch Count (rama existente)

- **Operacion:** Update Row
- **Tabla:** `leads`
- **Filtro:** `email = {{ $json[0].email }}`
- **Campos:** `touch_count = {{ $json[0].touch_count + 1 }}`, `last_touch_at = {{ $now.toISO() }}`

#### Error Handler (workflow-level)

- **Tipo:** Error Trigger → Supabase Insert en `workflow_logs` + WhatsApp a Alexander

---

## 2) bant-scorer

**Proposito:** Scoring automatico BANT (Budget/Authority/Need/Timeline) via Claude.

**Trigger:** Webhook POST `/webhook/bant-scorer` con `{ "lead_id": "uuid" }`

### Nodos

#### Node 1: Webhook - BANT Trigger

- **Path:** `bant-scorer`

#### Node 2: Supabase - Get Lead

- **Operacion:** Get Row
- **Tabla:** `leads`
- **Filtro:** `id = {{ $json.lead_id }}`

#### Node 3: Anthropic - BANT Analysis

- **Tipo:** HTTP Request (o nodo Anthropic si instalado)
- **URL:** `https://api.anthropic.com/v1/messages`
- **Headers:** `x-api-key: {{ $env.ANTHROPIC_API_KEY }}`, `anthropic-version: 2023-06-01`
- **Body:**

```json
{
  "model": "claude-sonnet-4-5-20250929",
  "max_tokens": 500,
  "messages": [
    {
      "role": "user",
      "content": "Analiza este lead UGC y devuelve SOLO JSON valido con {budget:0-25, authority:0-25, need:0-25, timeline:0-25, total:0-100, tier:'HOT'|'WARM'|'COLD', reasoning:''}. Lead: company={{ $json.company }}, budget_range={{ $json.budget_range }}, notes={{ $json.notes }}, source={{ $json.source }}. Reglas: HOT>=75, WARM 50-74, COLD<50."
    }
  ]
}
```

#### Node 4: Code - Parse BANT Response

```javascript
const raw = $input.first().json.content[0].text;
const match = raw.match(/\{[\s\S]*\}/);
if (!match) throw new Error("No JSON in Claude response");
const bant = JSON.parse(match[0]);
return [{ json: bant }];
```

#### Node 5: Supabase - Update Lead Score

- **Operacion:** Update Row
- **Tabla:** `leads`
- **Filtro:** `id = {{ $('Webhook - BANT Trigger').item.json.lead_id }}`
- **Campos:** `bant_score = {{ $json.total }}`, `tier = {{ $json.tier }}`, `stage = 'scored'`

#### Node 6: Switch - Tier Routing

- **Tipo:** Switch
- **Valor:** `{{ $json.tier }}`
- **Rutas:**
  - `HOT` → Node 7 (WhatsApp urgente a Alexander)
  - `WARM` → Node 8 (agregar a nurture sequence)
  - `COLD` → Node 9 (solo log)

#### Node 7: WhatsApp HOT Alert

- Mensaje: `HOT LEAD detectado! Score {{ $json.total }}. Contactar en <1h. Lead ID: {{ ... }}`

---

## 3) discovery-call-followup

**Trigger:** Webhook Cal.com `/webhook/calcom-booking` (eventos: BOOKING_CREATED, BOOKING_CANCELLED, BOOKING_RESCHEDULED)

### Nodos

#### Node 1: Webhook - Cal.com Booking

- **Path:** `calcom-booking`
- **Auth:** Header `X-Cal-Signature-256` validar contra `CALCOM_WEBHOOK_SECRET`

#### Node 2: Crypto - Compute HMAC

- **Tipo:** Crypto (nodo nativo n8n)
- **Action:** HMAC
- **Type:** SHA256
- **Value:** `{{ JSON.stringify($json.body) }}`
- **Secret:** `{{ $env.CALCOM_WEBHOOK_SECRET }}`
- **Property Name:** `computed_signature`
- **Encoding:** hex

#### Node 3: Code - Verify Signature (sandbox-safe, sin require)

```javascript
// Nota: el HMAC se calcula en el nodo Crypto previo.
// Aqui solo comparamos el valor ya computado contra el header recibido.
const received = $("Webhook - Cal.com Booking").item.json.headers[
  "x-cal-signature-256"
];
const expected = $input.first().json.computed_signature;
if (!received || received !== expected) {
  throw new Error("Invalid Cal.com signature");
}
return [{ json: $("Webhook - Cal.com Booking").item.json.body }];
```

#### Node 4: Switch - Event Type

- `BOOKING_CREATED` → Node 5
- `BOOKING_RESCHEDULED` → Node 5
- `BOOKING_CANCELLED` → Node 11

#### Node 5: Supabase - Upsert Booking

- **Tabla:** `bookings`
- **Campos:** `cal_booking_id`, `scheduled_at`, `lead_id` (lookup por email), `status='confirmed'`

#### Node 6: Resend - Confirmation Email

- Subject: `Tu discovery call esta confirmada`
- Body con detalles + link Google Meet

#### Node 7: Wait - Until 24h Before

- **Tipo:** Wait
- **Modo:** Resume At Specific Time
- **Time:** `{{ DateTime.fromISO($json.scheduled_at).minus({hours: 24}).toISO() }}`

#### Node 8: WhatsApp - 24h Reminder

- Template: `discovery_reminder_24h`

#### Node 9: Wait - Until 1h After Call

- Time: `{{ DateTime.fromISO($json.scheduled_at).plus({hours: 1}).toISO() }}`

#### Node 10: Resend - Post-call Survey

- Link a Typeform/Tally con NPS + feedback

#### Node 11: Rama Cancelled

- Update Supabase `status='cancelled'` + WhatsApp Alexander

---

## 4) creator-application-pipeline

**Trigger:** Webhook POST `/webhook/creator-application`

### Nodos

#### Node 1: Webhook - Creator Form

- **Path:** `creator-application`
- **Body:** `{full_name, email, phone, instagram, tiktok, niche, followers, city, portfolio_url, rate_expectation}`

#### Node 2: Code - Validate

```javascript
const d = $input.first().json;
if (!d.email || !d.instagram) throw new Error("Missing required");
d.followers = parseInt(d.followers) || 0;
d.applied_at = new Date().toISOString();
d.status = "pending_review";
return [{ json: d }];
```

#### Node 3: HTTP - Instagram Basic Check (opcional)

- Verifica que el handle exista (scrape o API Graph)

#### Node 4: Anthropic - Preliminary Scoring

- **Prompt:** `Evalua este creator UGC para agencia Colombia. Devuelve JSON {score:0-100, strengths:[], weaknesses:[], recommendation:'accept'|'review'|'reject'}. Datos: niche={{ $json.niche }}, followers={{ $json.followers }}, city={{ $json.city }}, rate={{ $json.rate_expectation }}, portfolio={{ $json.portfolio_url }}`

#### Node 5: Code - Merge Score

```javascript
const raw = $input.first().json.content[0].text;
const score = JSON.parse(raw.match(/\{[\s\S]*\}/)[0]);
const creator = $("Code - Validate").item.json;
return [
  { json: { ...creator, score: score.score, ai_notes: JSON.stringify(score) } },
];
```

#### Node 6: Supabase - Insert Creator

- **Tabla:** `creators`
- **assigned_to:** `diana@ugccolombia.co`

#### Node 7: WhatsApp Diana

- Mensaje: `Nueva aplicacion creator: {{ $json.full_name }} (@{{ $json.instagram }}) - Score IA: {{ $json.score }}/100 - Rec: {{ recommendation }}`

#### Node 8: Resend - Acknowledge Applicant

- `Gracias por aplicar. Revisamos en 3-5 dias habiles.`

---

## 5) monthly-client-report

**Trigger:** Schedule Trigger - Cron `0 9 1 * *` (dia 1, 9am)

### Nodos

#### Node 1: Schedule Trigger

- **Cron:** `0 9 1 * *`

#### Node 2: Supabase - Get Active Clients

- **Operacion:** Get Many Rows
- **Tabla:** `clients`
- **Filtro:** `plan != 'churned'`

#### Node 3: Split In Batches

- **Batch Size:** 1

#### Node 4: Supabase - Query Client Metrics

- **Tipo:** Execute Query (SQL)

```sql
SELECT
  COUNT(*) FILTER (WHERE type='video') as videos,
  COUNT(*) FILTER (WHERE type='photo') as photos,
  COUNT(*) FILTER (WHERE type='carousel') as carousels,
  SUM(CASE WHEN status='published' THEN 1 ELSE 0 END) as published
FROM content_pieces
WHERE client_id = '{{ $json.id }}'
  AND published_at >= date_trunc('month', now() - interval '1 month')
  AND published_at < date_trunc('month', now());
```

#### Node 5: Code - Build HTML Report

```javascript
const client = $("Split In Batches").item.json;
const m = $input.first().json;
const monthName = new Date(Date.now() - 30 * 86400000).toLocaleDateString(
  "es-CO",
  { month: "long", year: "numeric" },
);
const html = `
<!DOCTYPE html><html><body style="font-family:Arial">
<h1>Reporte ${monthName} - ${client.company}</h1>
<table border="1" cellpadding="8">
<tr><td>Videos entregados</td><td>${m.videos}</td></tr>
<tr><td>Fotos</td><td>${m.photos}</td></tr>
<tr><td>Carruseles</td><td>${m.carousels}</td></tr>
<tr><td>Publicados</td><td>${m.published}</td></tr>
</table>
<p>Equipo UGC Colombia</p>
</body></html>`;
return [{ json: { html, client, metrics: m } }];
```

#### Node 6: HTTP - PDF Generation (via Browserless o api2pdf)

- **URL:** `https://chrome.browserless.io/pdf?token={{ $env.BROWSERLESS_TOKEN }}`
- **Body:** `{ "html": "{{ $json.html }}" }`
- **Response:** Binary (pdf)

#### Node 7: Resend - Send Report Email

- **Attachments:** PDF del Node 6
- **To:** `{{ $json.client.contact_email }}`

#### Node 8: WhatsApp Client Notification

- `Hola! Tu reporte mensual de UGC Colombia esta en tu correo ({{ client.contact_email }}).`

---

## 6) follow-up-sequence

**Trigger:** Schedule `0 10 * * *` (diario 10am)

### Nodos

#### Node 1: Schedule Trigger

#### Node 2: Supabase - Query Leads Needing Touch

```sql
SELECT *,
  EXTRACT(DAY FROM (now() - last_touch_at)) as days_since
FROM leads
WHERE stage IN ('scored','contacted')
  AND tier != 'COLD'
  AND (
    (touch_count = 0 AND created_at < now() - interval '1 day') OR
    (touch_count = 1 AND last_touch_at < now() - interval '2 days') OR
    (touch_count = 2 AND last_touch_at < now() - interval '4 days') OR
    (touch_count = 3 AND last_touch_at < now() - interval '7 days')
  )
  AND touch_count < 4;
```

#### Node 3: Split In Batches (1)

#### Node 4: Switch - Touch Number

- `touch_count == 0` → D1 email (intro)
- `touch_count == 1` → D3 WhatsApp (case study)
- `touch_count == 2` → D7 email (testimonial + oferta)
- `touch_count == 3` → D14 WhatsApp (last call)

#### Node 5a-d: Resend / WhatsApp por cada rama

#### Node 6: Supabase - Update touch_count++

#### Node 7: Wait 2s (rate limit)

---

## 7) creator-payment-scheduler

**Trigger:** Schedule `0 9 1,15 * *` (dias 1 y 15, 9am)

### Nodos

#### Node 1: Schedule Trigger

#### Node 2: Supabase - Calculate Pending Payments

```sql
SELECT c.id, c.full_name, c.email,
  SUM(cp.rate_usd) as total_usd,
  array_agg(cp.id) as content_ids
FROM creators c
JOIN content_pieces cp ON cp.creator_id = c.id
WHERE cp.status = 'approved'
  AND cp.paid = false
  AND cp.approved_at < now() - interval '7 days'
GROUP BY c.id, c.full_name, c.email
HAVING SUM(cp.rate_usd) >= 20;
```

#### Node 3: Split In Batches

#### Node 4: IF - Amount > $500?

- **True:** Mercury (bank transfer)
- **False:** Wise

#### Node 5a: HTTP - Mercury Create Payment

- **URL:** `https://api.mercury.com/api/v1/account/{account_id}/transactions`
- **Headers:** `Authorization: Bearer {{ $env.MERCURY_API_KEY }}`

#### Node 5b: HTTP - Wise Create Transfer

- **URL:** `https://api.wise.com/v1/transfers`

#### Node 6: Supabase - Insert Payment Record

- **Tabla:** `payments`
- **status:** `scheduled`

#### Node 7: Supabase - Mark Content as Paid

#### Node 8: WhatsApp Brian

```
Pagos programados quincena {{ $now.toFormat('dd/MM') }}:
- {{ $json.full_name }}: ${{ $json.total_usd }} USD via {{ provider }}
Total batch: {{ totalSum }}
```

#### Node 9: Resend Creator Notification

- `Tu pago de ${{ total_usd }} USD esta en camino. Llegada estimada 2-3 dias habiles.`

---

## 8) content-repurposing-alert

**Trigger:** Webhook POST `/webhook/content-uploaded` (llamado por Bunny Stream webhook o por equipo manualmente)

### Nodos

#### Node 1: Webhook - Content Uploaded

- **Body:** `{ content_id, client_id, type, url, pillar, duration_sec }`

#### Node 2: IF - Is Pillar Content?

- **Condicion:** `{{ $json.pillar === true && $json.duration_sec > 120 }}`

#### Node 3: Code - Generate Derivative List

```javascript
const piece = $input.first().json;
const derivatives = [
  { type: "reel_30s", platform: "instagram", priority: 1 },
  { type: "short_60s", platform: "youtube", priority: 1 },
  { type: "tiktok_15s", platform: "tiktok", priority: 2 },
  { type: "carousel_5slides", platform: "instagram", priority: 2 },
  { type: "tweet_thread", platform: "twitter", priority: 3 },
  { type: "linkedin_post", platform: "linkedin", priority: 3 },
  { type: "newsletter_section", platform: "beehiiv", priority: 2 },
  { type: "blog_post_1500w", platform: "web", priority: 3 },
];
return derivatives.map((d) => ({
  json: { ...d, parent_id: piece.content_id, client_id: piece.client_id },
}));
```

#### Node 4: Supabase - Bulk Insert Derivatives

- **Tabla:** `content_pieces` con `status='pending_derivative'`, `parent_id`

#### Node 5: Code - Format Team Message

```javascript
const items = $input.all().map((i) => i.json);
const grouped = items.reduce((acc, d) => {
  acc[d.priority] = acc[d.priority] || [];
  acc[d.priority].push(`- ${d.type} (${d.platform})`);
  return acc;
}, {});
const msg = `Nuevo pilar subido! Derivadas a generar:\n\nP1:\n${(grouped[1] || []).join("\n")}\n\nP2:\n${(grouped[2] || []).join("\n")}\n\nP3:\n${(grouped[3] || []).join("\n")}`;
return [{ json: { message: msg } }];
```

#### Node 6: WhatsApp - Notify Team Group

- **To:** grupo de equipo (usar group_id o broadcast a Diana + Alexander)

#### Node 7: Resend - Email con checklist

- Subject: `Checklist derivadas - {{ piece.url }}`

---

## 9) client-onboarded

**Proposito:** Procesar confirmacion de pago de nuevo cliente — insertar en `clients`, marcar lead origen como ganado, enviar bienvenida y notificar al equipo. Referenciado por `content/sistemas/onboarding/client-onboarded-flow.md`.

**Trigger:** Webhook POST `/webhook/client-onboarded` con header `X-Internal-Secret`.

**Body esperado:**

```json
{
  "client_name": "Nombre del contacto",
  "company": "Nombre empresa (opcional, default=client_name)",
  "contact_email": "cliente@empresa.com",
  "whatsapp": "573001234567",
  "plan": "starter | growth | premium",
  "mrr_usd": 1500,
  "source_lead_id": "uuid-del-lead",
  "contract_start_date": "2026-04-08T00:00:00Z",
  "idempotency_key": "opcional — si no se provee, se genera como onboard-{source_lead_id}-{plan}"
}
```

### Nodos

1. **Webhook - Client Onboarded** — POST `/webhook/client-onboarded`, responseMode lastNode.
2. **Code - Auth & Validate Payload** — HMAC timing-safe XOR char-by-char vs `INTERNAL_WEBHOOK_SECRET`, valida campos requeridos, normaliza email/whatsapp a E.164, genera idempotency_key estable sin `Date.now()`.
3. **Supabase - Check Idempotency** — busca `clients.idempotency_key = ?`.
4. **IF - Is New Client?** — length===0 continua, sino Respond - Duplicate.
5. **Supabase - Insert Client** — sin On Error Continue; campos: company, contact_email, whatsapp, plan, mrr, started_at, source_lead_id, idempotency_key, stage=`active`, health_score=100, churn_risk=false.
6. **IF - Insert OK?** — verifica `id != null`; rama false → log + Respond 500.
7. **Supabase - Mark Lead Won** — UPDATE `leads` SET stage=`won`, win_date=now(), converted_client_id=clients.id WHERE id=source_lead_id. `continueOnFail` (lead puede estar archivado).
8. **HTTP - Resend Welcome Client Email** — template `welcome-client`, retry 3x backoff 2s.
9. **HTTP - WhatsApp Client Welcome** — template `welcome_client` (es) via Cloud API, retry 3x backoff 3s.
10. **HTTP - WhatsApp Diana** — texto "Nuevo cliente asignado: [nombre]" con detalles y client_id para kickoff.
11. **HTTP - WhatsApp Alexander** — confirmacion "CLIENTE CERRADO!" con MRR y plan.
12. **HTTP - Beehiiv Tag Cliente-Activo** — upsert subscriber con `custom_fields.tag=cliente-activo`, `ignore400=true`.
13. **Code - Drive Folder Placeholder** — PENDIENTE: crear carpeta Drive manualmente por ahora. Migrar a Google Drive API cuando este habilitada en `jarvis-kreoon-ai`. Retorna `drive_folder_pending:true` y nombre sugerido.
14. **Respond - Success** — `{ status: "ok", client_id }`.
15. **Supabase - Log Insert Failure** + **Respond - Insert Failed** (500) — error branch.

**Error handling:** Todos los nodos HTTP con `continueOnFail=true` excepto Insert Client. Retry 3x con jitter (backoff 2-3s). Error workflow global captura excepciones no manejadas.

---

## 10) client-renewed

**Proposito:** Procesar renovacion de contrato (dia 90) — actualizar plan, registrar historial, notificar al cliente y celebrar internamente.

**Trigger:** Webhook POST `/webhook/client-renewed` con header `X-Internal-Secret`.

**Body esperado:**

```json
{
  "client_id": "uuid-cliente",
  "new_plan": "growth",
  "new_mrr_usd": 2500,
  "contract_end_date": "2026-07-08",
  "previous_plan": "starter",
  "previous_mrr_usd": 1500,
  "renewal_number": 2,
  "idempotency_key": "opcional — default: renew-{client_id}-{contract_end_date}"
}
```

### Migracion pendiente (Supabase)

La tabla `client_renewals` debe crearse antes de activar este workflow:

```sql
CREATE TABLE client_renewals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id uuid NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  previous_plan text,
  previous_mrr_usd numeric,
  new_plan text NOT NULL,
  new_mrr_usd numeric NOT NULL,
  contract_end_date date NOT NULL,
  renewal_number int DEFAULT 1,
  idempotency_key text UNIQUE NOT NULL,
  renewed_at timestamptz DEFAULT now()
);
CREATE INDEX idx_client_renewals_client_id ON client_renewals(client_id);
```

Tambien agregar a `clients`:

```sql
ALTER TABLE clients
  ADD COLUMN IF NOT EXISTS contract_end_date date,
  ADD COLUMN IF NOT EXISTS last_renewal_at timestamptz,
  ADD COLUMN IF NOT EXISTS health_score int DEFAULT 100,
  ADD COLUMN IF NOT EXISTS churn_risk boolean DEFAULT false,
  ADD COLUMN IF NOT EXISTS stage text DEFAULT 'active',
  ADD COLUMN IF NOT EXISTS source_lead_id uuid,
  ADD COLUMN IF NOT EXISTS idempotency_key text UNIQUE,
  ADD COLUMN IF NOT EXISTS converted_client_id uuid;
```

### Nodos

1. **Webhook - Client Renewed**.
2. **Code - Auth & Validate Payload** — HMAC timing-safe, valida `client_id`, `new_plan`, `new_mrr_usd`, `contract_end_date`. idempotency_key=`renew-{client_id}-{contract_end_date}`.
3. **Supabase - Check Renewal Idempotency** — `client_renewals.idempotency_key = ?`.
4. **IF - Is New Renewal?** — sino Respond - Duplicate.
5. **Supabase - Get Client** — carga cliente actual para obtener email/whatsapp y plan previo.
6. **IF - Client Exists?** — length>0; rama false → log + Respond 404.
7. **Supabase - Update Client Plan** — SET plan, mrr, contract_end_date, last_renewal_at, health_score=100, churn_risk=false, stage=`active`.
8. **Supabase - Insert Renewal Record** — inserta en `client_renewals` con previous_plan/mrr del snapshot.
9. **HTTP - Resend Renewal Confirmation** — email al contact_email del cliente con plan y vigencia.
10. **HTTP - WhatsApp Client Thanks** — "Gracias por renovar con UGC Colombia!" al whatsapp del cliente.
11. **HTTP - Beehiiv Tag Renovado** — tag `cliente-renovado`, `ignore400=true`.
12. **HTTP - WhatsApp Team Celebrate** — a Alexander: "RENOVACION! [company] - [plan] - $[mrr]/mes. Renovacion #[n]".
13. **Respond - Success**.
14. **Supabase - Log Missing Client** + **Respond 404** — rama de error.

**Error handling:** HMAC timing-safe, idempotencia estricta por `(client_id, contract_end_date)`, retry con jitter en HTTP, continueOnFail en notificaciones externas, error branch 404 si el cliente no existe.

---

## Error Handling Global

Crear un **Error Workflow** en n8n Settings → asignar a todos:

```
[Error Trigger] → [Supabase Insert workflow_logs] → [IF: severity=critical] → [WhatsApp Alexander]
```

## Idempotencia

- `lead-ingestion`: usar `idempotency_key` + check en Supabase
- `calcom-booking`: `cal_booking_id` UNIQUE
- `creator-payment-scheduler`: `payments` tiene UNIQUE en `(creator_id, period_start, period_end)`

## Rate Limiting

- WhatsApp Cloud API: max 80 msg/s → Wait node 50ms entre envios batch
- Resend: 10 req/s free tier → Split In Batches + Wait 120ms
- Anthropic: respetar tier (5000 RPM Sonnet) → batch size 5

## Sandbox rules para nodos Code

- **No usar CommonJS imports** — el sandbox de n8n no expone modulos Node via imports dinamicos; usar solo globals y nodos nativos.
- Para crypto/HMAC usar el **nodo Crypto** nativo en lugar de importar el modulo crypto de Node.
- Para hashing/UUID/base64 usar globals ya disponibles (`btoa`, `atob`, `crypto.randomUUID()` en Node 20+).
- Logica pesada de Node.js mover a un **Execute Command** node o a un webhook externo.

## Testing

Cada workflow incluye modo `test` via query param `?test=true` que:

1. No escribe a Supabase produccion (usa schema `staging`)
2. Envia notificaciones solo a Alexander
3. Loggea payload completo
