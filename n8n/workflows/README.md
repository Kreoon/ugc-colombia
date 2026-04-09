# n8n Workflows — UGC Colombia

**Instancia:** https://dev.kreoon.com  
**VPS:** 194.163.161.151  
**Generado:** 2026-04-08  
**Actualizado:** 2026-04-08 — agregados workflows 09 y 10 (client lifecycle)

---

## Como importar en dev.kreoon.com

### Metodo: Import from File

1. Entrar a https://dev.kreoon.com
2. En el menu lateral izquierdo ir a **Workflows**
3. Clic en **Add workflow** (boton superior derecho)
4. En el menu de los tres puntos (`...`) seleccionar **Import from File**
5. Seleccionar el archivo `.json` correspondiente
6. El workflow se importa como `active: false` — revisar antes de activar

Repetir para cada uno de los 10 archivos en este directorio.

### Orden de import recomendado

Importar en este orden para que los webhooks queden registrados correctamente:

```
01-lead-ingestion.json               ← primero (otros workflows lo llaman)
02-bant-scorer.json                  ← llamado por lead-ingestion
03-discovery-call-followup.json
04-creator-application-pipeline.json
05-monthly-client-report.json
06-follow-up-sequence.json
07-creator-payment-scheduler.json    ← CRITICO — activar ultimo
08-content-repurposing-alert.json
09-client-onboarded.json             ← lifecycle: activacion de cliente
10-client-renewed.json               ← lifecycle: renovacion dia 90
```

---

## Variables de entorno (configurar antes de activar)

En n8n: **Settings → Variables → Add Variable**

| Variable | Descripcion | Donde obtener |
|---|---|---|
| `SUPABASE_URL` | URL del proyecto Supabase UGC Colombia | Supabase Dashboard → Settings → API |
| `SUPABASE_SERVICE_KEY` | Service role key (no la anon key) | Supabase Dashboard → Settings → API |
| `RESEND_API_KEY` | API key de Resend | resend.com → API Keys |
| `BEEHIIV_API_KEY` | API key de Beehiiv | app.beehiiv.com → Settings → API |
| `BEEHIIV_PUB_ID` | Publication ID de Beehiiv (formato pub_xxx) | app.beehiiv.com → Settings |
| `WHATSAPP_TOKEN` | Token permanente de WhatsApp Cloud API | Meta Business → WhatsApp → API Setup |
| `WHATSAPP_PHONE_ID` | Phone Number ID de WhatsApp | Meta Business → WhatsApp → API Setup |
| `ALEXANDER_WHATSAPP` | Numero de Alexander en formato E.164 (ej: 573001234567) | — |
| `DIANA_WHATSAPP` | Numero de Diana en formato E.164 | — |
| `BRIAN_WHATSAPP` | Numero de Brian en formato E.164 | — |
| `CALCOM_API_KEY` | API key de Cal.com | app.cal.com → Settings → Developer → API Keys |
| `CALCOM_WEBHOOK_SECRET` | Secret del webhook de Cal.com | app.cal.com → Settings → Webhooks |
| `ANTHROPIC_API_KEY` | API key de Anthropic Claude | console.anthropic.com |
| `MERCURY_API_KEY` | API key de Mercury Bank | app.mercury.com → Settings → API |
| `MERCURY_ACCOUNT_ID` | ID de la cuenta bancaria Mercury | app.mercury.com → Accounts |
| `WISE_API_KEY` | API key de Wise Business | wise.com → Settings → API tokens |
| `BUNNY_STREAM_KEY` | API key de Bunny Stream | panel.bunny.net |
| `INTERNAL_WEBHOOK_SECRET` | Secret para webhooks internos entre workflows | Generar: `openssl rand -hex 32` |
| `BROWSERLESS_TOKEN` | Token de Browserless.io para PDF (opcional) | browserless.io → Dashboard |

---

## Credenciales n8n (configurar en Credentials)

En n8n: **Credentials → Add Credential**

### 1. Supabase - UGC Colombia
- Tipo: **Supabase API**
- Host: URL de Supabase (de `SUPABASE_URL`)
- Service Role Secret: (de `SUPABASE_SERVICE_KEY`)

### 2. Resend API
- Tipo: **HTTP Header Auth**
- Name: `Authorization`
- Value: `Bearer re_xxxx` (tu API key de Resend)

### 3. WhatsApp Cloud API
- Tipo: **HTTP Header Auth**
- Name: `Authorization`
- Value: `Bearer EAAG...` (tu token de WhatsApp)

### 4. Beehiiv API
- Tipo: **HTTP Header Auth**
- Name: `Authorization`
- Value: `Bearer bhv_xxx`

### 5. Anthropic Claude
- Tipo: **Anthropic API** (si el nodo nativo esta instalado)  
  O **HTTP Header Auth** con Name: `x-api-key`, Value: tu API key

### 6. Cal.com API
- Tipo: **HTTP Header Auth**
- Name: `Authorization`
- Value: `Bearer cal_xxx`

### 7. Internal Webhook Auth
- Tipo: **HTTP Header Auth**
- Name: `X-Internal-Secret`
- Value: valor de `INTERNAL_WEBHOOK_SECRET`

---

## Listado completo de workflows

| # | Nombre | Trigger | Proposito |
|---|---|---|---|
| 01 | lead-ingestion | Webhook `/lead-ingestion` | Capturar leads desde web/WhatsApp/IG |
| 02 | bant-scorer | Webhook `/bant-scorer` | Scoring BANT via Claude |
| 03 | discovery-call-followup | Webhook `/calcom-booking` | Confirmaciones y recordatorios de calls |
| 04 | creator-application-pipeline | Webhook `/creator-application` | Onboarding de creators |
| 05 | monthly-client-report | Cron `0 9 1 * *` | Reporte mensual a clientes con PDF |
| 06 | follow-up-sequence | Cron `0 10 * * *` | Nurture multi-touch a leads |
| 07 | creator-payment-scheduler | Cron `0 9 1,15 * *` | Pagos quincenales Mercury/Wise |
| 08 | content-repurposing-alert | Webhook `/content-uploaded` | Derivadas de contenido pilar |
| 09 | **client-onboarded** | Webhook `/client-onboarded` | Activacion de cliente nuevo tras pago |
| 10 | **client-renewed** | Webhook `/client-renewed` | Renovacion contrato dia 90 |

---

## Configuracion de Cal.com Webhook

Para que `03-discovery-call-followup` reciba eventos:

1. Ir a app.cal.com → Settings → Developer → Webhooks
2. Crear webhook con URL: `https://dev.kreoon.com/webhook/calcom-booking`
3. Events: seleccionar `BOOKING_CREATED`, `BOOKING_CANCELLED`, `BOOKING_RESCHEDULED`
4. Secret: usar el mismo valor que `CALCOM_WEBHOOK_SECRET`

---

## Error Workflow global (configurar despues de importar todos)

1. Crear un workflow nuevo llamado `00-error-handler`
2. Nodos: `Error Trigger` → `Supabase Insert workflow_logs` → `IF severity=critical` → `WhatsApp Alexander`
3. En **cada workflow** ir a Settings (icono de engranaje) → Error Workflow → seleccionar `00-error-handler`

Esto asegura que todos los errores no manejados lleguen a Supabase y a Alexander por WhatsApp.

---

## Fixes de seguridad aplicados (silent-failures-report)

Los siguientes bugs del reporte fueron corregidos en esta version:

| Fix | Workflow afectado | Descripcion |
|---|---|---|
| H3 | 07-creator-payment-scheduler | Idempotencia por intento: registro `initiating` antes del POST al banco, verificacion de tx_id, error branch obligatorio |
| H4 | 03-discovery-call-followup | HMAC timing-safe via XOR char-by-char (compatible con sandbox n8n) |
| H6 | 02-bant-scorer | Parseo robusto de Claude: busca bloque `type=text`, regex non-greedy, valida esquema, error branch marca `scoring_failed` |
| H7 | 04-creator-application-pipeline | Guards en todos los accesos, fallback a `score=null` en lugar de abortar workflow |
| H8 | 01-lead-ingestion, 09-client-onboarded | Eliminado `On Error Continue` del insert — nodo IF verifica `id != null`, responde 500 real si falla |
| L5 | 01-lead-ingestion, 09, 10 | Idempotency key sin `Date.now()` — usa claves estables (source+email, source_lead_id+plan, client_id+contract_end_date) |
| L6 | 08-content-repurposing-alert | Nodo Code normaliza `pillar` antes del IF (`true`, `'true'`, `1`, `'1'`) |
| M3 | 03-discovery-call-followup | Verifica `bookings.status=confirmed` antes de enviar reminder de 24h y post-call survey |
| M4 | 06-follow-up-sequence | Filtra `email_bounced=false` y `unsubscribed=false` antes de enviar touches |
| M5 | 05-monthly-client-report | IF verifica token de Browserless y resultado del PDF; fallback a HTML inline |
| M6 | 01, 09, 10 | WhatsApp con retry 3x + continueOnFail |
| M8 | 01, 09, 10 | Beehiiv con `ignore400=true` para tratar 409 como exito |
| M9 | 01, 04, 09 | Normalizacion de telefono a E.164 con prefijo `57` para Colombia |

**Pendiente de implementar (requieren cambios en infra):**
- H1/H2: AbortController por intento — aplica a clientes HTTP del lado Next.js, no a n8n
- H5: Cal.com Route Handler — aplica a `web/src/`, no a n8n
- H9: Verificacion de tasa de cambio Wise antes de confirmar transfer — agregar nodo de consulta de tasa antes del POST a Wise en workflow 07
- Migracion Supabase para workflow 10: crear tabla `client_renewals` y agregar columnas a `clients` (ver `workflows-spec.md` seccion 10)
- Google Drive API en workflow 09: actualmente placeholder manual — habilitar en `jarvis-kreoon-ai` y agregar nodo Google Drive

---

## URLs de webhooks activos

Una vez activados los workflows, los webhooks quedan disponibles en:

```
POST https://dev.kreoon.com/webhook/lead-ingestion
POST https://dev.kreoon.com/webhook/bant-scorer
POST https://dev.kreoon.com/webhook/calcom-booking
POST https://dev.kreoon.com/webhook/creator-application
POST https://dev.kreoon.com/webhook/content-uploaded
POST https://dev.kreoon.com/webhook/client-onboarded
POST https://dev.kreoon.com/webhook/client-renewed
```

Los workflows de Schedule (05, 06, 07) no tienen webhook — se activan solos por cron.

---

## Checklist antes de activar en produccion

- [ ] Todas las variables de entorno configuradas en n8n Settings
- [ ] Todas las credenciales creadas y asignadas a cada workflow
- [ ] Cal.com webhook configurado con secret correcto
- [ ] Error workflow `00-error-handler` creado y asignado a todos
- [ ] Tabla `workflow_logs` existe en Supabase con columnas: `id, workflow, node, level, message, payload, created_at`
- [ ] Columna `email_bounced` existe en tabla `leads` (default: false)
- [ ] Columna `unsubscribed` existe en tabla `leads` (default: false)
- [ ] Columnas `win_date`, `converted_client_id` existen en tabla `leads`
- [ ] Columna `idempotency_key` existe en tabla `payments` con UNIQUE index
- [ ] Columna `idempotency_key` existe en tabla `clients` con UNIQUE index
- [ ] Columnas `contract_end_date`, `last_renewal_at`, `health_score`, `churn_risk`, `stage`, `source_lead_id` existen en `clients`
- [ ] Tabla `client_renewals` creada (ver migracion en `workflows-spec.md` seccion 10)
- [ ] Columna `ai_notes` existe en tabla `creators`
- [ ] Templates WhatsApp `welcome_client`, `discovery_reminder_24h` aprobados en Meta Business
- [ ] Template email `welcome-client` configurado en Resend
- [ ] Hacer test con payload de prueba en cada webhook antes de activar
- [ ] Activar `07-creator-payment-scheduler` ULTIMO — es el workflow mas critico (pagos reales)
