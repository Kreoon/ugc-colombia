# API Integrations Spec — UGC Colombia

Stack: Next.js 15 (App Router) + n8n + Supabase  
Fecha: 2026-04-08  
Autor: Alexander Cast / KREOON

---

## Convenciones globales

```
Retry policy por defecto:
  - MAX_RETRIES = 3
  - BASE_DELAY_MS = 1000
  - Backoff: exponencial (delay * 2^attempt)
  - Reintentar solo en: 429, 500, 502, 503, 504

Timeouts:
  - Operaciones livianas (GET): 10s
  - Operaciones pesadas (upload, batch): 30s
  - Webhooks entrantes: responder en < 5s siempre

Headers mínimos obligatorios:
  - Content-Type: application/json
  - Authorization: Bearer <token> | Api-Key <key> (según API)
  - User-Agent: ugccolombia-app/1.0

Variables de entorno: siempre con NEXT_PUBLIC_ para cliente,
sin prefijo para server-only (Edge Functions, Route Handlers).
```

Archivo centralizado de validación de env vars (importar al inicio de cada cliente):

```typescript
// lib/env.ts
function requireEnv(key: string): string {
  const value = process.env[key];
  if (!value) throw new Error(`Missing required env var: ${key}`);
  return value;
}

export { requireEnv };
```

---

## 1. Beehiiv API

**Caso principal:** publicar newsletter, añadir suscriptores, leer métricas de campaña.

### Endpoints clave

| Accion | Metodo | Endpoint |
|---|---|---|
| Crear suscriptor | POST | `/v2/publications/{pub_id}/subscriptions` |
| Obtener suscriptores | GET | `/v2/publications/{pub_id}/subscriptions` |
| Crear post (borrador) | POST | `/v2/publications/{pub_id}/posts` |
| Publicar post | PUT | `/v2/publications/{pub_id}/posts/{post_id}` |
| Metricas de post | GET | `/v2/publications/{pub_id}/posts/{post_id}/stats` |
| Listar posts | GET | `/v2/publications/{pub_id}/posts` |

Base URL: `https://api.beehiiv.com`

### Autenticacion

API Key en header `Authorization: Bearer <key>`. Sin OAuth. La key no expira pero puede rotarse desde el dashboard.

### Rate limits

- 10 requests/segundo por publication
- Sin limite documentado de requests/dia
- Header de respuesta: `X-RateLimit-Remaining` / `X-RateLimit-Reset`

### Variables de entorno

```
BEEHIIV_API_KEY=
BEEHIIV_PUBLICATION_ID=
```

### Implementacion

```typescript
// lib/integrations/beehiiv-client.ts
import { requireEnv } from '@/lib/env';

interface BeehiivSubscriber {
  email: string;
  first_name?: string;
  last_name?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  custom_fields?: Array<{ name: string; value: string }>;
  reactivate_existing?: boolean;
  send_welcome_email?: boolean;
}

interface BeehiivSubscriberResponse {
  data: {
    id: string;
    email: string;
    status: 'active' | 'inactive' | 'pending';
    created: number;
  };
}

interface BeehiivPost {
  web_title: string;
  preview_text?: string;
  authors?: string[];
  content?: {
    free: string; // HTML
  };
  status: 'draft' | 'confirmed';
  schedule_for?: number; // unix timestamp
}

interface BeehiivPostResponse {
  data: {
    id: string;
    web_title: string;
    status: string;
    created: number;
    url?: string;
  };
}

const BASE_URL = 'https://api.beehiiv.com';
const MAX_RETRIES = 3;
const BASE_DELAY_MS = 1000;
const RETRYABLE_STATUSES = [429, 500, 502, 503, 504];

async function beehiivFetch<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const apiKey = requireEnv('BEEHIIV_API_KEY');

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10_000);

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${apiKey}`,
    'User-Agent': 'ugccolombia-app/1.0',
    ...options.headers,
  };

  for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
    try {
      const response = await fetch(`${BASE_URL}${path}`, {
        ...options,
        headers,
        signal: controller.signal,
      });

      if (response.ok) {
        clearTimeout(timeoutId);
        return response.json() as Promise<T>;
      }

      if (RETRYABLE_STATUSES.includes(response.status)) {
        const delay = BASE_DELAY_MS * Math.pow(2, attempt);
        console.warn(`[Beehiiv] ${response.status} en ${path}, reintento ${attempt + 1} en ${delay}ms`);
        await new Promise(r => setTimeout(r, delay));
        continue;
      }

      const body = await response.text();
      throw new Error(`[Beehiiv] ${response.status} ${response.statusText}: ${body}`);
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        throw new Error(`[Beehiiv] Timeout en ${path}`);
      }
      if (attempt === MAX_RETRIES - 1) throw error;
    }
  }

  throw new Error(`[Beehiiv] Max reintentos alcanzados para ${path}`);
}

export async function addBeehiivSubscriber(
  subscriber: BeehiivSubscriber
): Promise<BeehiivSubscriberResponse> {
  const pubId = requireEnv('BEEHIIV_PUBLICATION_ID');
  return beehiivFetch<BeehiivSubscriberResponse>(
    `/v2/publications/${pubId}/subscriptions`,
    {
      method: 'POST',
      body: JSON.stringify(subscriber),
    }
  );
}

export async function createBeehiivPost(
  post: BeehiivPost
): Promise<BeehiivPostResponse> {
  const pubId = requireEnv('BEEHIIV_PUBLICATION_ID');
  return beehiivFetch<BeehiivPostResponse>(
    `/v2/publications/${pubId}/posts`,
    {
      method: 'POST',
      body: JSON.stringify(post),
    }
  );
}

export async function getBeehiivPostStats(postId: string): Promise<unknown> {
  const pubId = requireEnv('BEEHIIV_PUBLICATION_ID');
  return beehiivFetch(`/v2/publications/${pubId}/posts/${postId}/stats`);
}
```

### Consideraciones de seguridad

- La API key da acceso completo a la publication. Nunca exponerla al cliente.
- Siempre usar Route Handlers (`app/api/`) o Edge Functions de Supabase para las llamadas.
- Si se implementa un formulario de suscripcion publico, agregar rate limiting por IP en el Route Handler (usar `@upstash/ratelimit` o middleware de Next.js).

---

## 2. Resend API

**Caso principal:** emails transaccionales (bienvenida a creator, recordatorio de entrega, reporte mensual de metricas).

### Endpoints clave

| Accion | Metodo | Endpoint |
|---|---|---|
| Enviar email | POST | `/emails` |
| Enviar batch | POST | `/emails/batch` |
| Estado de email | GET | `/emails/{email_id}` |
| Crear contacto | POST | `/audiences/{audience_id}/contacts` |
| Listar dominios | GET | `/domains` |

Base URL: `https://api.resend.com`

### Autenticacion

API Key en header `Authorization: Bearer <key>`. Sin OAuth.

### Rate limits

- 100 emails/segundo en plan gratuito
- 1,000 emails/dia en plan gratuito
- Planes de pago: sin limite diario documentado
- Batch: max 100 emails por request

### Variables de entorno

```
RESEND_API_KEY=
RESEND_FROM_EMAIL=hola@ugccolombia.co
RESEND_FROM_NAME=UGC Colombia
```

### Implementacion

```typescript
// lib/integrations/resend-client.ts
import { requireEnv } from '@/lib/env';

interface ResendEmail {
  from?: string;
  to: string | string[];
  subject: string;
  html?: string;
  text?: string;
  reply_to?: string;
  tags?: Array<{ name: string; value: string }>;
}

interface ResendEmailResponse {
  id: string;
}

interface ResendBatchResponse {
  data: ResendEmailResponse[];
}

const BASE_URL = 'https://api.resend.com';
const MAX_RETRIES = 3;
const BASE_DELAY_MS = 1000;
const RETRYABLE_STATUSES = [429, 500, 502, 503, 504];

async function resendFetch<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const apiKey = requireEnv('RESEND_API_KEY');

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10_000);

  for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
    try {
      const response = await fetch(`${BASE_URL}${path}`, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
          'User-Agent': 'ugccolombia-app/1.0',
          ...options.headers,
        },
        signal: controller.signal,
      });

      if (response.ok) {
        clearTimeout(timeoutId);
        return response.json() as Promise<T>;
      }

      if (RETRYABLE_STATUSES.includes(response.status)) {
        const delay = BASE_DELAY_MS * Math.pow(2, attempt);
        console.warn(`[Resend] ${response.status} en ${path}, reintento ${attempt + 1}`);
        await new Promise(r => setTimeout(r, delay));
        continue;
      }

      const body = await response.text();
      throw new Error(`[Resend] ${response.status} ${response.statusText}: ${body}`);
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        throw new Error(`[Resend] Timeout en ${path}`);
      }
      if (attempt === MAX_RETRIES - 1) throw error;
    }
  }

  throw new Error(`[Resend] Max reintentos alcanzados para ${path}`);
}

export async function sendTransactionalEmail(
  email: ResendEmail
): Promise<ResendEmailResponse> {
  const from = `${requireEnv('RESEND_FROM_NAME')} <${requireEnv('RESEND_FROM_EMAIL')}>`;
  return resendFetch<ResendEmailResponse>('/emails', {
    method: 'POST',
    body: JSON.stringify({ from, ...email }),
  });
}

export async function sendBatchEmails(
  emails: ResendEmail[]
): Promise<ResendBatchResponse> {
  if (emails.length > 100) {
    throw new Error('[Resend] Batch no puede superar 100 emails por request');
  }
  const from = `${requireEnv('RESEND_FROM_NAME')} <${requireEnv('RESEND_FROM_EMAIL')}>`;
  const payload = emails.map(e => ({ from, ...e }));
  return resendFetch<ResendBatchResponse>('/emails/batch', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

// Uso tipico: email de bienvenida a creator nuevo
export async function sendWelcomeEmail(params: {
  creatorEmail: string;
  creatorName: string;
  onboardingUrl: string;
}): Promise<ResendEmailResponse> {
  return sendTransactionalEmail({
    to: params.creatorEmail,
    subject: 'Bienvenido a UGC Colombia',
    html: `
      <h1>Hola ${params.creatorName},</h1>
      <p>Tu cuenta ha sido creada. Completa tu onboarding aqui:</p>
      <a href="${params.onboardingUrl}">Comenzar ahora</a>
    `,
    tags: [{ name: 'tipo', value: 'bienvenida' }],
  });
}
```

### Consideraciones de seguridad

- Verificar el dominio remitente en el dashboard de Resend antes de produccion.
- Nunca incluir datos sensibles de pago o contratos en el HTML del email.
- Para plantillas complejas, usar React Email (`@react-email/components`) y compilar antes de enviar.

---

## 3. Cal.com API

**Caso principal:** crear booking de discovery call, escuchar webhook de confirmacion para trigger en n8n.

### Endpoints clave

| Accion | Metodo | Endpoint |
|---|---|---|
| Listar event types | GET | `/v2/event-types` |
| Crear booking | POST | `/v2/bookings` |
| Obtener booking | GET | `/v2/bookings/{booking_uid}` |
| Cancelar booking | DELETE | `/v2/bookings/{booking_uid}` |
| Listar disponibilidad | GET | `/v2/slots/available` |

Base URL: `https://api.cal.com`

### Autenticacion

Dos modos:

1. **API Key personal** (server-to-server): `cal-api-key <key>` en header `Authorization`.
2. **OAuth 2.0** (si se embebe el flujo de booking para otros usuarios): Authorization Code Flow.

Para UGC Colombia usamos modo 1 (API Key del owner).

### Rate limits

- No documentados oficialmente. En la practica: 60 req/min por key.
- Aplicar retry con backoff por si acaso.

### Variables de entorno

```
CAL_API_KEY=
CAL_EVENT_TYPE_ID=           # ID del event type "Discovery Call"
CAL_WEBHOOK_SECRET=          # Para validar webhooks entrantes
```

### Implementacion

```typescript
// lib/integrations/cal-client.ts
import { requireEnv } from '@/lib/env';
import { createHmac } from 'crypto';

interface CalBookingPayload {
  eventTypeId: number;
  start: string;           // ISO 8601
  attendee: {
    name: string;
    email: string;
    timeZone: string;      // e.g. "America/Bogota"
    language: string;      // e.g. "es"
  };
  metadata?: Record<string, string>;
}

interface CalBookingResponse {
  uid: string;
  title: string;
  start: string;
  end: string;
  status: 'accepted' | 'pending' | 'cancelled';
  attendees: Array<{ email: string; name: string }>;
  meetingUrl?: string;
}

const BASE_URL = 'https://api.cal.com';
const MAX_RETRIES = 3;
const BASE_DELAY_MS = 1000;

async function calFetch<T>(path: string, options: RequestInit = {}): Promise<T> {
  const apiKey = requireEnv('CAL_API_KEY');

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10_000);

  for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
    try {
      const response = await fetch(`${BASE_URL}${path}`, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `cal-api-key ${apiKey}`,
          'cal-api-version': '2024-08-13',
          'User-Agent': 'ugccolombia-app/1.0',
          ...options.headers,
        },
        signal: controller.signal,
      });

      if (response.ok) {
        clearTimeout(timeoutId);
        return response.json() as Promise<T>;
      }

      if ([429, 500, 502, 503, 504].includes(response.status)) {
        const delay = BASE_DELAY_MS * Math.pow(2, attempt);
        await new Promise(r => setTimeout(r, delay));
        continue;
      }

      const body = await response.text();
      throw new Error(`[Cal.com] ${response.status}: ${body}`);
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        throw new Error('[Cal.com] Timeout');
      }
      if (attempt === MAX_RETRIES - 1) throw error;
    }
  }

  throw new Error('[Cal.com] Max reintentos alcanzados');
}

export async function createDiscoveryBooking(params: {
  prospectName: string;
  prospectEmail: string;
  startTime: string;
  metadata?: Record<string, string>;
}): Promise<CalBookingResponse> {
  const eventTypeId = Number(requireEnv('CAL_EVENT_TYPE_ID'));

  const payload: CalBookingPayload = {
    eventTypeId,
    start: params.startTime,
    attendee: {
      name: params.prospectName,
      email: params.prospectEmail,
      timeZone: 'America/Bogota',
      language: 'es',
    },
    metadata: params.metadata,
  };

  const result = await calFetch<{ status: string; data: CalBookingResponse }>(
    '/v2/bookings',
    { method: 'POST', body: JSON.stringify(payload) }
  );

  return result.data;
}

// Validacion de webhook entrante (usar en Route Handler)
export function verifyCalWebhook(
  rawBody: string,
  signature: string
): boolean {
  const secret = requireEnv('CAL_WEBHOOK_SECRET');
  const expected = createHmac('sha256', secret)
    .update(rawBody)
    .digest('hex');
  return expected === signature;
}
```

#### Route Handler para webhook de Cal.com (Next.js 15)

```typescript
// app/api/webhooks/cal/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { verifyCalWebhook } from '@/lib/integrations/cal-client';

export async function POST(req: NextRequest): Promise<NextResponse> {
  const rawBody = await req.text();
  const signature = req.headers.get('x-cal-signature-256') ?? '';

  if (!verifyCalWebhook(rawBody, signature)) {
    return NextResponse.json({ error: 'Firma invalida' }, { status: 401 });
  }

  const event = JSON.parse(rawBody);

  // Delegar procesamiento pesado a n8n via webhook
  if (event.triggerEvent === 'BOOKING_CREATED') {
    await fetch(process.env.N8N_WEBHOOK_BOOKING_CREATED!, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(event),
    });
  }

  // Responder inmediatamente < 5s
  return NextResponse.json({ received: true });
}
```

### Consideraciones de seguridad

- Siempre verificar HMAC del webhook antes de procesar.
- No ejecutar logica de negocio pesada dentro del webhook handler: delegar a n8n o a una queue.

---

## 4. WhatsApp Cloud API

**Caso principal:** enviar mensajes de texto y templates aprobados, recibir webhooks de mensajes entrantes.

### Endpoints clave

| Accion | Metodo | Endpoint |
|---|---|---|
| Enviar mensaje | POST | `/{phone_number_id}/messages` |
| Subir media | POST | `/{phone_number_id}/media` |
| Obtener media | GET | `/{media_id}` |
| Obtener perfil | GET | `/{phone_number_id}/whatsapp_business_profile` |

Base URL: `https://graph.facebook.com/v21.0`

### Autenticacion

Bearer token (System User Token de Meta Business Suite). Token de larga duracion, no expira a menos que se revoque.

### Rate limits

- 250 conversaciones/segundo por numero de telefono
- Templates: 1,000 mensajes de marketing/dia por usuario en tier inicial, escala segun historial
- Para mensajes de utilidad/autenticacion: sin limite documentado
- Headers de respuesta: `X-Business-Use-Case-Usage`

### Variables de entorno

```
WHATSAPP_ACCESS_TOKEN=
WHATSAPP_PHONE_NUMBER_ID=
WHATSAPP_WEBHOOK_VERIFY_TOKEN=   # Token que defines tu mismo para verificacion inicial
WHATSAPP_APP_SECRET=             # Para validar firma HMAC de webhooks
```

### Implementacion

```typescript
// lib/integrations/whatsapp-client.ts
import { requireEnv } from '@/lib/env';
import { createHmac } from 'crypto';

type WhatsAppMessageType = 'text' | 'template' | 'image' | 'document';

interface WhatsAppTextMessage {
  messaging_product: 'whatsapp';
  recipient_type: 'individual';
  to: string;
  type: 'text';
  text: { body: string; preview_url?: boolean };
}

interface WhatsAppTemplateMessage {
  messaging_product: 'whatsapp';
  recipient_type: 'individual';
  to: string;
  type: 'template';
  template: {
    name: string;
    language: { code: string };
    components?: Array<{
      type: 'body' | 'header' | 'button';
      parameters: Array<{ type: 'text' | 'image'; text?: string }>;
    }>;
  };
}

interface WhatsAppMessageResponse {
  messaging_product: string;
  contacts: Array<{ input: string; wa_id: string }>;
  messages: Array<{ id: string; message_status?: string }>;
}

const MAX_RETRIES = 3;
const BASE_DELAY_MS = 1000;

function getBaseUrl(): string {
  const phoneId = requireEnv('WHATSAPP_PHONE_NUMBER_ID');
  return `https://graph.facebook.com/v21.0/${phoneId}`;
}

async function whatsappFetch<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const token = requireEnv('WHATSAPP_ACCESS_TOKEN');
  const url = path.startsWith('http') ? path : `${getBaseUrl()}${path}`;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10_000);

  for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          ...options.headers,
        },
        signal: controller.signal,
      });

      if (response.ok) {
        clearTimeout(timeoutId);
        return response.json() as Promise<T>;
      }

      const errorBody = await response.json().catch(() => ({}));

      // Error 131056: par de usuarios al limite; no reintentar
      if (errorBody?.error?.code === 131056) {
        throw new Error(`[WhatsApp] Limite de mensajes alcanzado para este usuario`);
      }

      if ([429, 500, 502, 503, 504].includes(response.status)) {
        const delay = BASE_DELAY_MS * Math.pow(2, attempt);
        await new Promise(r => setTimeout(r, delay));
        continue;
      }

      throw new Error(
        `[WhatsApp] ${response.status}: ${JSON.stringify(errorBody)}`
      );
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        throw new Error('[WhatsApp] Timeout');
      }
      if (attempt === MAX_RETRIES - 1) throw error;
    }
  }

  throw new Error('[WhatsApp] Max reintentos alcanzados');
}

export async function sendWhatsAppText(
  to: string,
  body: string
): Promise<WhatsAppMessageResponse> {
  const payload: WhatsAppTextMessage = {
    messaging_product: 'whatsapp',
    recipient_type: 'individual',
    to,
    type: 'text',
    text: { body, preview_url: false },
  };

  return whatsappFetch<WhatsAppMessageResponse>('/messages', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export async function sendWhatsAppTemplate(params: {
  to: string;
  templateName: string;
  languageCode: string;
  bodyParams?: string[];
}): Promise<WhatsAppMessageResponse> {
  const payload: WhatsAppTemplateMessage = {
    messaging_product: 'whatsapp',
    recipient_type: 'individual',
    to: params.to,
    type: 'template',
    template: {
      name: params.templateName,
      language: { code: params.languageCode },
      ...(params.bodyParams && {
        components: [
          {
            type: 'body',
            parameters: params.bodyParams.map(text => ({ type: 'text', text })),
          },
        ],
      }),
    },
  };

  return whatsappFetch<WhatsAppMessageResponse>('/messages', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

// Verificacion GET del webhook (Meta requiere esto al registrar el endpoint)
export function verifyWhatsAppWebhook(params: {
  mode: string;
  token: string;
  challenge: string;
}): string | null {
  const verifyToken = requireEnv('WHATSAPP_WEBHOOK_VERIFY_TOKEN');
  if (params.mode === 'subscribe' && params.token === verifyToken) {
    return params.challenge;
  }
  return null;
}

// Verificacion HMAC del payload entrante
export function verifyWhatsAppSignature(
  rawBody: string,
  signature: string
): boolean {
  const appSecret = requireEnv('WHATSAPP_APP_SECRET');
  const expected = createHmac('sha256', appSecret)
    .update(rawBody)
    .digest('hex');
  return `sha256=${expected}` === signature;
}
```

### Consideraciones de seguridad

- El System User Token tiene permisos amplios. Rotar si hay sospecha de compromiso.
- Validar firma HMAC en cada webhook POST. Rechazar con 401 si falla.
- Los templates deben estar aprobados por Meta antes de usarlos en produccion. Guardar nombres exactos en env vars o base de datos.
- Numeros de telefono: siempre en formato E.164 (`+573001234567`).

---

## 5. Meta Business API

**Caso principal:** sincronizar catalogo de servicios UGC, enviar conversiones offline (leads cerrados).

### Endpoints clave

| Accion | Metodo | Endpoint |
|---|---|---|
| Listar catalogos | GET | `/{business_id}/owned_product_catalogs` |
| Crear item de catalogo | POST | `/{catalog_id}/products` |
| Actualizar item | POST | `/{catalog_id}/products` (con `method: UPDATE`) |
| Enviar conversion offline | POST | `/{dataset_id}/events` |
| Obtener insights de ad | GET | `/{ad_id}/insights` |

Base URL: `https://graph.facebook.com/v21.0`

### Autenticacion

System User Token de Meta Business Suite. El mismo token puede usarse para WhatsApp y Meta Ads si el System User tiene los permisos correctos (`ads_management`, `catalog_management`, `business_management`).

### Rate limits

- Marketing API: 200 calls/hora por app/user pair en tier basico
- Conversions API: sin limite documentado, pero recomienda batches de max 1,000 eventos
- Rate limit info en headers: `X-Business-Use-Case-Usage`, `X-Ad-Account-Usage`

### Variables de entorno

```
META_ACCESS_TOKEN=
META_BUSINESS_ID=
META_CATALOG_ID=
META_OFFLINE_DATASET_ID=    # Para Conversions API (offline events)
META_PIXEL_ID=              # Opcional, para server-side events
```

### Implementacion

```typescript
// lib/integrations/meta-business-client.ts
import { requireEnv } from '@/lib/env';

interface MetaConversionEvent {
  event_name:
    | 'Lead'
    | 'Purchase'
    | 'Contact'
    | 'CompleteRegistration'
    | 'ViewContent';
  event_time: number; // unix timestamp
  user_data: {
    em?: string[];   // email hasheado SHA-256
    ph?: string[];   // telefono hasheado SHA-256
    fn?: string;     // nombre hasheado
    ln?: string;     // apellido hasheado
    country?: string;
    ct?: string;     // ciudad hasheada
  };
  custom_data?: {
    currency?: string;
    value?: number;
    content_name?: string;
    status?: string;
  };
  action_source: 'email' | 'phone_call' | 'crm' | 'website' | 'other';
}

interface MetaConversionPayload {
  data: MetaConversionEvent[];
  test_event_code?: string; // solo para testing
}

const BASE_URL = 'https://graph.facebook.com/v21.0';
const MAX_RETRIES = 3;
const BASE_DELAY_MS = 2000; // Meta puede ser mas lento

async function metaFetch<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = requireEnv('META_ACCESS_TOKEN');
  const separator = path.includes('?') ? '&' : '?';
  const url = `${BASE_URL}${path}${separator}access_token=${token}`;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 15_000);

  for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': 'ugccolombia-app/1.0',
          ...options.headers,
        },
        signal: controller.signal,
      });

      if (response.ok) {
        clearTimeout(timeoutId);
        return response.json() as Promise<T>;
      }

      if ([429, 500, 503].includes(response.status)) {
        const delay = BASE_DELAY_MS * Math.pow(2, attempt);
        await new Promise(r => setTimeout(r, delay));
        continue;
      }

      const body = await response.json().catch(() => ({}));
      throw new Error(`[Meta] ${response.status}: ${JSON.stringify(body?.error)}`);
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        throw new Error('[Meta] Timeout');
      }
      if (attempt === MAX_RETRIES - 1) throw error;
    }
  }

  throw new Error('[Meta] Max reintentos alcanzados');
}

// Hashear datos de usuario (requerido por Conversions API)
async function hashSHA256(value: string): Promise<string> {
  const normalized = value.toLowerCase().trim();
  const buffer = await crypto.subtle.digest(
    'SHA-256',
    new TextEncoder().encode(normalized)
  );
  return Array.from(new Uint8Array(buffer))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

export async function sendOfflineConversion(params: {
  email: string;
  phone?: string;
  eventName: MetaConversionEvent['event_name'];
  value?: number;
  currency?: string;
  contentName?: string;
}): Promise<{ events_received: number }> {
  const datasetId = requireEnv('META_OFFLINE_DATASET_ID');

  const hashedEmail = await hashSHA256(params.email);
  const hashedPhone = params.phone ? await hashSHA256(params.phone) : undefined;

  const event: MetaConversionEvent = {
    event_name: params.eventName,
    event_time: Math.floor(Date.now() / 1000),
    user_data: {
      em: [hashedEmail],
      ...(hashedPhone && { ph: [hashedPhone] }),
    },
    action_source: 'crm',
    ...(params.value && {
      custom_data: {
        currency: params.currency ?? 'USD',
        value: params.value,
        content_name: params.contentName,
      },
    }),
  };

  const payload: MetaConversionPayload = { data: [event] };

  return metaFetch<{ events_received: number }>(
    `/${datasetId}/events`,
    { method: 'POST', body: JSON.stringify(payload) }
  );
}
```

### Consideraciones de seguridad

- Los datos de usuario DEBEN hashearse con SHA-256 antes de enviarlos. Nunca enviar PII en texto plano.
- El access token va en query string para Meta API (asi lo requiere la API), pero nunca se loguea ni se expone en responses del lado cliente.
- Revisar `X-Business-Use-Case-Usage` para detectar throttling antes de que ocurra.

---

## 6. Mercury Bank / Wise APIs

**Caso principal:**
- **Mercury**: verificar balance, listar transacciones, emitir pagos ACH a creadores US.
- **Wise (Transferwise)**: crear transfers a LATAM (COP, MXN, ARS), obtener tasas de cambio.

### Mercury

**Base URL:** `https://api.mercury.com/api/v1`

**Autenticacion:** API Key en header `Authorization: api-key <key>`

**Endpoints clave:**

| Accion | Metodo | Endpoint |
|---|---|---|
| Listar cuentas | GET | `/accounts` |
| Balance de cuenta | GET | `/accounts/{account_id}` |
| Listar transacciones | GET | `/accounts/{account_id}/transactions` |
| Crear pago | POST | `/accounts/{account_id}/transactions` |

**Rate limits:** No documentados oficialmente. Conservador: max 60 req/min.

### Wise

**Base URL:** `https://api.wise.com` (prod) / `https://api.sandbox.transferwise.tech` (sandbox)

**Autenticacion:** Bearer Token (API key del perfil)

**Endpoints clave:**

| Accion | Metodo | Endpoint |
|---|---|---|
| Obtener perfil | GET | `/v1/profiles` |
| Crear quote | POST | `/v3/quotes` |
| Crear transfer | POST | `/v1/transfers` |
| Fondear transfer | POST | `/v3/profiles/{profileId}/transfers/{transferId}/payments` |
| Estado de transfer | GET | `/v1/transfers/{transferId}` |
| Tasas de cambio | GET | `/v1/rates?source=USD&target=COP` |

**Variables de entorno:**

```
MERCURY_API_KEY=
MERCURY_ACCOUNT_ID=          # ID de la cuenta principal USD

WISE_API_KEY=
WISE_PROFILE_ID=             # ID del perfil Business en Wise
WISE_SANDBOX=false           # "true" para testing
```

### Implementacion

```typescript
// lib/integrations/payments-client.ts
import { requireEnv } from '@/lib/env';

// --- WISE ---

interface WiseQuote {
  id: string;
  sourceCurrency: string;
  targetCurrency: string;
  sourceAmount: number;
  targetAmount: number;
  rate: number;
  expirationTime: string;
}

interface WiseTransfer {
  id: number;
  status: string;
  targetAccount: number;
  quote: string;
}

async function wiseFetch<T>(path: string, options: RequestInit = {}): Promise<T> {
  const apiKey = requireEnv('WISE_API_KEY');
  const isSandbox = process.env.WISE_SANDBOX === 'true';
  const baseUrl = isSandbox
    ? 'https://api.sandbox.transferwise.tech'
    : 'https://api.wise.com';

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 15_000);

  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const response = await fetch(`${baseUrl}${path}`, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
          'User-Agent': 'ugccolombia-app/1.0',
          ...options.headers,
        },
        signal: controller.signal,
      });

      if (response.ok) {
        clearTimeout(timeoutId);
        return response.json() as Promise<T>;
      }

      if ([429, 500, 502, 503].includes(response.status)) {
        await new Promise(r => setTimeout(r, 1000 * Math.pow(2, attempt)));
        continue;
      }

      const body = await response.text();
      throw new Error(`[Wise] ${response.status}: ${body}`);
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        throw new Error('[Wise] Timeout');
      }
      if (attempt === 2) throw error;
    }
  }

  throw new Error('[Wise] Max reintentos');
}

export async function getWiseExchangeRate(
  source: string,
  target: string
): Promise<number> {
  const rates = await wiseFetch<Array<{ rate: number; source: string; target: string }>>(
    `/v1/rates?source=${source}&target=${target}`
  );
  const rate = rates[0]?.rate;
  if (!rate) throw new Error(`[Wise] No se encontro tasa ${source}/${target}`);
  return rate;
}

export async function createWiseQuote(params: {
  sourceCurrency: string;
  targetCurrency: string;
  sourceAmount: number;
}): Promise<WiseQuote> {
  const profileId = requireEnv('WISE_PROFILE_ID');
  return wiseFetch<WiseQuote>('/v3/quotes', {
    method: 'POST',
    body: JSON.stringify({
      profile: Number(profileId),
      ...params,
    }),
  });
}

// --- MERCURY ---

interface MercuryTransaction {
  id: string;
  amount: number;
  status: 'pending' | 'sent' | 'failed' | 'cancelled';
  createdAt: string;
  note?: string;
}

async function mercuryFetch<T>(path: string, options: RequestInit = {}): Promise<T> {
  const apiKey = requireEnv('MERCURY_API_KEY');
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10_000);

  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const response = await fetch(`https://api.mercury.com/api/v1${path}`, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `api-key ${apiKey}`,
          'User-Agent': 'ugccolombia-app/1.0',
          ...options.headers,
        },
        signal: controller.signal,
      });

      if (response.ok) {
        clearTimeout(timeoutId);
        return response.json() as Promise<T>;
      }

      if ([429, 500, 503].includes(response.status)) {
        await new Promise(r => setTimeout(r, 1000 * Math.pow(2, attempt)));
        continue;
      }

      const body = await response.text();
      throw new Error(`[Mercury] ${response.status}: ${body}`);
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        throw new Error('[Mercury] Timeout');
      }
      if (attempt === 2) throw error;
    }
  }

  throw new Error('[Mercury] Max reintentos');
}

export async function getMercuryBalance(): Promise<number> {
  const accountId = requireEnv('MERCURY_ACCOUNT_ID');
  const account = await mercuryFetch<{ availableBalance: number }>(
    `/accounts/${accountId}`
  );
  return account.availableBalance;
}

export async function listMercuryTransactions(params?: {
  limit?: number;
  offset?: number;
}): Promise<MercuryTransaction[]> {
  const accountId = requireEnv('MERCURY_ACCOUNT_ID');
  const query = new URLSearchParams({
    limit: String(params?.limit ?? 20),
    offset: String(params?.offset ?? 0),
  });
  const result = await mercuryFetch<{ transactions: MercuryTransaction[] }>(
    `/accounts/${accountId}/transactions?${query}`
  );
  return result.transactions;
}
```

### Consideraciones de seguridad

- Operaciones de pago requieren doble validacion: confirmar monto y destinatario antes de ejecutar.
- Las API keys de Mercury y Wise tienen acceso a fondos reales. Almacenar con rotacion periodica. Nunca en cliente.
- Para pagos a creadores LATAM: siempre verificar tasa de cambio en tiempo real antes de confirmar el monto en COP.
- Wise tiene un flujo de 2FA para pagos grandes (SCA). Manejar el error `422 Unprocessable Entity` con `type: TWO_FACTOR_AUTH_REQUIRED`.

---

## 7. Perplexity API

**Caso principal:** research automatico de marcas prospecto (industria, presencia digital, competidores, presupuesto estimado de marketing).

### Endpoints clave

| Accion | Metodo | Endpoint |
|---|---|---|
| Chat completion (con busqueda web) | POST | `/chat/completions` |

Base URL: `https://api.perplexity.ai`

### Autenticacion

Bearer Token (API key del dashboard de Perplexity).

### Rate limits

- Dependen del plan. Plan basico: ~10 requests/minuto.
- Modelos disponibles: `sonar`, `sonar-pro`, `sonar-deep-research`
- Para research de marcas usar `sonar-pro` (balance costo/profundidad).

### Variables de entorno

```
PERPLEXITY_API_KEY=
PERPLEXITY_MODEL=sonar-pro     # sonar | sonar-pro | sonar-deep-research
```

### Implementacion

```typescript
// lib/integrations/perplexity-client.ts
import { requireEnv } from '@/lib/env';

interface PerplexityMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

interface PerplexityResponse {
  id: string;
  model: string;
  choices: Array<{
    index: number;
    message: { role: string; content: string };
    finish_reason: string;
  }>;
  citations?: string[];
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

const MAX_RETRIES = 3;
const BASE_DELAY_MS = 2000;

async function perplexityChat(
  messages: PerplexityMessage[],
  options?: { maxTokens?: number; temperature?: number }
): Promise<PerplexityResponse> {
  const apiKey = requireEnv('PERPLEXITY_API_KEY');
  const model = process.env.PERPLEXITY_MODEL ?? 'sonar-pro';

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 30_000); // research puede tomar mas tiempo

  for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
    try {
      const response = await fetch('https://api.perplexity.ai/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
          'User-Agent': 'ugccolombia-app/1.0',
        },
        body: JSON.stringify({
          model,
          messages,
          max_tokens: options?.maxTokens ?? 2000,
          temperature: options?.temperature ?? 0.2,
          return_citations: true,
        }),
        signal: controller.signal,
      });

      if (response.ok) {
        clearTimeout(timeoutId);
        return response.json() as Promise<PerplexityResponse>;
      }

      if ([429, 500, 502, 503].includes(response.status)) {
        const delay = BASE_DELAY_MS * Math.pow(2, attempt);
        console.warn(`[Perplexity] ${response.status}, reintento ${attempt + 1} en ${delay}ms`);
        await new Promise(r => setTimeout(r, delay));
        continue;
      }

      const body = await response.text();
      throw new Error(`[Perplexity] ${response.status}: ${body}`);
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        throw new Error('[Perplexity] Timeout (30s)');
      }
      if (attempt === MAX_RETRIES - 1) throw error;
    }
  }

  throw new Error('[Perplexity] Max reintentos');
}

// Caso principal: research de marca prospecto
export async function researchBrandProspect(brandName: string): Promise<{
  summary: string;
  industry: string;
  socialPresence: string;
  estimatedAdBudget: string;
  ugcOpportunity: string;
  citations: string[];
}> {
  const systemPrompt = `Eres un analista de marketing digital especializado en UGC (User Generated Content) para LATAM. 
Investiga marcas y devuelve informacion estructurada en JSON valido.
Responde siempre en español.`;

  const userPrompt = `Investiga la marca "${brandName}" y devuelve un JSON con esta estructura exacta:
{
  "summary": "descripcion breve de la empresa (2-3 oraciones)",
  "industry": "industria principal",
  "socialPresence": "descripcion de su presencia en redes sociales y nivel de contenido UGC actual",
  "estimatedAdBudget": "estimado de presupuesto de marketing digital (bajo/medio/alto + rango aproximado USD)",
  "ugcOpportunity": "oportunidad especifica para ofrecerles servicios UGC"
}`;

  const result = await perplexityChat([
    { role: 'system', content: systemPrompt },
    { role: 'user', content: userPrompt },
  ]);

  const content = result.choices[0]?.message?.content ?? '{}';

  try {
    // Extraer JSON del contenido (puede venir con texto alrededor)
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    const parsed = JSON.parse(jsonMatch?.[0] ?? '{}');
    return {
      ...parsed,
      citations: result.citations ?? [],
    };
  } catch {
    // Si no parsea, devolver el texto completo en summary
    return {
      summary: content,
      industry: '',
      socialPresence: '',
      estimatedAdBudget: '',
      ugcOpportunity: '',
      citations: result.citations ?? [],
    };
  }
}
```

### Consideraciones de seguridad

- Sanitizar el input `brandName` antes de incluirlo en el prompt (evitar prompt injection).
- El modelo `sonar-deep-research` toma 30-60 segundos. Para UI, usar loading states o jobs en background.
- Cachear resultados en Supabase por al menos 24h para no gastar creditos en la misma marca.

---

## 8. Bunny CDN

**Caso principal:** subir y servir videos de casos de estudio desde Edge Functions o Route Handlers.

### Endpoints clave

| Accion | Metodo | Endpoint |
|---|---|---|
| Subir archivo | PUT | `/{storageZone}/{path}/{fileName}` |
| Eliminar archivo | DELETE | `/{storageZone}/{path}/{fileName}` |
| Listar directorio | GET | `/{storageZone}/{path}/` |

Base URL Storage: `https://storage.bunnycdn.com`  
Base URL Edge Storage (EU): `https://ny.storage.bunnycdn.com` (seleccionar por region)

### Autenticacion

Header `AccessKey: <storage_api_key>`. La key es por Storage Zone, no global.

### Rate limits

- Sin limite documentado de operaciones por segundo para storage.
- Pull Zone tiene rate limits por IP configurables en el dashboard.

### Variables de entorno

```
BUNNY_STORAGE_API_KEY=
BUNNY_STORAGE_ZONE_NAME=
BUNNY_PULL_ZONE_HOSTNAME=     # e.g. ugccolombia.b-cdn.net
BUNNY_STORAGE_REGION=         # "" para default EU, "ny" para New York, etc.
```

### Implementacion

```typescript
// lib/integrations/bunny-client.ts
import { requireEnv } from '@/lib/env';

interface BunnyUploadResult {
  publicUrl: string;
  fileName: string;
  size: number;
}

function getStorageBaseUrl(): string {
  const region = process.env.BUNNY_STORAGE_REGION ?? '';
  if (region && region !== 'de') {
    return `https://${region}.storage.bunnycdn.com`;
  }
  return 'https://storage.bunnycdn.com';
}

function getPublicUrl(path: string): string {
  const hostname = requireEnv('BUNNY_PULL_ZONE_HOSTNAME');
  return `https://${hostname}/${path}`;
}

export async function uploadToBunny(params: {
  fileBuffer: ArrayBuffer;
  fileName: string;
  directory?: string; // e.g. "casos-de-estudio/2026"
  contentType?: string;
}): Promise<BunnyUploadResult> {
  const apiKey = requireEnv('BUNNY_STORAGE_API_KEY');
  const storageZone = requireEnv('BUNNY_STORAGE_ZONE_NAME');
  const MAX_RETRIES = 3;
  const BASE_DELAY_MS = 1000;

  const filePath = params.directory
    ? `${params.directory}/${params.fileName}`
    : params.fileName;

  const url = `${getStorageBaseUrl()}/${storageZone}/${filePath}`;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 60_000); // uploads pueden tardar

  for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
    try {
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'AccessKey': apiKey,
          'Content-Type': params.contentType ?? 'application/octet-stream',
          'User-Agent': 'ugccolombia-app/1.0',
        },
        body: params.fileBuffer,
        signal: controller.signal,
      });

      if (response.ok) {
        clearTimeout(timeoutId);
        return {
          publicUrl: getPublicUrl(filePath),
          fileName: params.fileName,
          size: params.fileBuffer.byteLength,
        };
      }

      if ([429, 500, 502, 503].includes(response.status)) {
        const delay = BASE_DELAY_MS * Math.pow(2, attempt);
        console.warn(`[Bunny] ${response.status}, reintento ${attempt + 1}`);
        await new Promise(r => setTimeout(r, delay));
        continue;
      }

      const body = await response.text();
      throw new Error(`[Bunny] ${response.status}: ${body}`);
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        throw new Error('[Bunny] Timeout de upload (60s)');
      }
      if (attempt === MAX_RETRIES - 1) throw error;
    }
  }

  throw new Error('[Bunny] Max reintentos de upload');
}

export async function deleteFromBunny(filePath: string): Promise<void> {
  const apiKey = requireEnv('BUNNY_STORAGE_API_KEY');
  const storageZone = requireEnv('BUNNY_STORAGE_ZONE_NAME');
  const url = `${getStorageBaseUrl()}/${storageZone}/${filePath}`;

  const response = await fetch(url, {
    method: 'DELETE',
    headers: {
      'AccessKey': apiKey,
      'User-Agent': 'ugccolombia-app/1.0',
    },
  });

  if (!response.ok && response.status !== 404) {
    throw new Error(`[Bunny] Error al eliminar ${filePath}: ${response.status}`);
  }
}

// Uso desde Route Handler de Next.js 15
// app/api/videos/upload/route.ts (ejemplo de uso)
//
// export async function POST(req: NextRequest) {
//   const formData = await req.formData();
//   const file = formData.get('video') as File;
//   const buffer = await file.arrayBuffer();
//   const result = await uploadToBunny({
//     fileBuffer: buffer,
//     fileName: `${Date.now()}-${file.name}`,
//     directory: 'casos-de-estudio',
//     contentType: file.type,
//   });
//   return NextResponse.json(result);
// }
```

### Consideraciones de seguridad

- Validar tipo MIME y tamano maximo del archivo antes de subir. Rechazar archivos no-video.
- Los archivos en Bunny son publicos por URL. Si el contenido es sensible, usar Token Authentication de Bunny (configurar en Pull Zone settings).
- La Storage API Key solo tiene acceso al storage, no al billing. Rotar si es comprometida.

---

## 9. Supabase Storage

**Caso principal:** recibir y almacenar entregables de creadores (videos crudos, ediciones, assets) con acceso controlado.

### Endpoints clave (via SDK, no fetch directo)

Supabase Storage se interactua mejor via `@supabase/supabase-js`. Los endpoints REST son:

| Accion | Metodo | Endpoint |
|---|---|---|
| Subir archivo | POST | `/storage/v1/object/{bucket}/{path}` |
| Obtener URL firmada | POST | `/storage/v1/object/sign/{bucket}/{path}` |
| Descargar archivo | GET | `/storage/v1/object/{bucket}/{path}` |
| Eliminar archivos | DELETE | `/storage/v1/object/{bucket}` |
| Listar archivos | POST | `/storage/v1/object/list/{bucket}` |

### Autenticacion

- **Service Role Key** (server-side): acceso total, bypassa RLS. Solo en servidor.
- **Anon Key** (cliente): acceso limitado por RLS Policies del bucket.
- Archivos privados: acceder via URLs firmadas (tiempo limitado).

### Variables de entorno

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=         # Solo server-side, nunca al cliente
SUPABASE_STORAGE_BUCKET_CREATORS=entregables-creadores
```

### Implementacion

```typescript
// lib/integrations/supabase-storage-client.ts
import { createClient } from '@supabase/supabase-js';
import { requireEnv } from '@/lib/env';

// Cliente server-side con Service Role (para operaciones admin)
function getAdminClient() {
  return createClient(
    requireEnv('NEXT_PUBLIC_SUPABASE_URL'),
    requireEnv('SUPABASE_SERVICE_ROLE_KEY'),
    { auth: { persistSession: false } }
  );
}

// Cliente publico (para uploads autenticados desde el cliente)
function getPublicClient() {
  return createClient(
    requireEnv('NEXT_PUBLIC_SUPABASE_URL'),
    requireEnv('NEXT_PUBLIC_SUPABASE_ANON_KEY')
  );
}

const BUCKET = process.env.SUPABASE_STORAGE_BUCKET_CREATORS ?? 'entregables-creadores';

export interface UploadEntregableResult {
  path: string;
  fullPath: string;
  signedUrl?: string;
}

// Upload server-side (desde Route Handler o Edge Function)
export async function uploadCreatorDeliverable(params: {
  file: File | Blob;
  creatorId: string;
  projectId: string;
  fileName: string;
}): Promise<UploadEntregableResult> {
  const supabase = getAdminClient();
  const path = `${params.creatorId}/${params.projectId}/${Date.now()}-${params.fileName}`;

  const { data, error } = await supabase.storage
    .from(BUCKET)
    .upload(path, params.file, {
      contentType: params.file instanceof File ? params.file.type : 'application/octet-stream',
      upsert: false,
    });

  if (error) {
    throw new Error(`[Supabase Storage] Upload fallido: ${error.message}`);
  }

  return {
    path: data.path,
    fullPath: data.fullPath,
  };
}

// Generar URL firmada para acceso temporal (clientes o reviewers)
export async function getSignedDeliverableUrl(
  path: string,
  expiresInSeconds: number = 3600
): Promise<string> {
  const supabase = getAdminClient();

  const { data, error } = await supabase.storage
    .from(BUCKET)
    .createSignedUrl(path, expiresInSeconds);

  if (error || !data) {
    throw new Error(`[Supabase Storage] Error generando URL firmada: ${error?.message}`);
  }

  return data.signedUrl;
}

// Listar entregables de un creador en un proyecto
export async function listCreatorDeliverables(params: {
  creatorId: string;
  projectId: string;
}): Promise<Array<{ name: string; size: number; createdAt: string; path: string }>> {
  const supabase = getAdminClient();
  const prefix = `${params.creatorId}/${params.projectId}/`;

  const { data, error } = await supabase.storage
    .from(BUCKET)
    .list(prefix, { sortBy: { column: 'created_at', order: 'desc' } });

  if (error) {
    throw new Error(`[Supabase Storage] Error listando archivos: ${error.message}`);
  }

  return (data ?? []).map(f => ({
    name: f.name,
    size: f.metadata?.size ?? 0,
    createdAt: f.created_at ?? '',
    path: `${prefix}${f.name}`,
  }));
}

// Eliminar entregable (solo admins via Service Role)
export async function deleteCreatorDeliverable(path: string): Promise<void> {
  const supabase = getAdminClient();

  const { error } = await supabase.storage.from(BUCKET).remove([path]);

  if (error) {
    throw new Error(`[Supabase Storage] Error eliminando ${path}: ${error.message}`);
  }
}
```

#### Configuracion del bucket en Supabase (SQL)

```sql
-- Bucket privado para entregables
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'entregables-creadores',
  'entregables-creadores',
  false,
  524288000, -- 500MB max por archivo
  ARRAY['video/mp4', 'video/quicktime', 'video/webm', 'image/jpeg', 'image/png', 'image/webp', 'application/zip']
);

-- RLS: un creator solo puede subir a su propia carpeta
CREATE POLICY "Creator puede subir sus propios archivos"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'entregables-creadores'
  AND (storage.foldername(name))[1] = auth.uid()::text
);

-- RLS: un creator puede ver sus propios archivos
CREATE POLICY "Creator puede ver sus archivos"
ON storage.objects FOR SELECT
TO authenticated
USING (
  bucket_id = 'entregables-creadores'
  AND (storage.foldername(name))[1] = auth.uid()::text
);

-- RLS: admins (rol custom) pueden ver todo
CREATE POLICY "Admin puede ver todos los archivos"
ON storage.objects FOR SELECT
TO authenticated
USING (
  bucket_id = 'entregables-creadores'
  AND EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  )
);
```

### Consideraciones de seguridad

- El bucket debe ser `public: false`. Acceder siempre con URLs firmadas.
- `SUPABASE_SERVICE_ROLE_KEY` bypassa RLS completamente. Nunca exponer al cliente. Solo usar en Route Handlers o Edge Functions.
- Limitar tipos MIME aceptados en el bucket para prevenir uploads de ejecutables.
- Las URLs firmadas expiran. Para reviews prolongadas, regenerarlas al momento de acceso.

---

## Resumen de variables de entorno

Archivo `.env.local` consolidado (agregar a `.gitignore`):

```bash
# Beehiiv
BEEHIIV_API_KEY=
BEEHIIV_PUBLICATION_ID=

# Resend
RESEND_API_KEY=
RESEND_FROM_EMAIL=hola@ugccolombia.co
RESEND_FROM_NAME=UGC Colombia

# Cal.com
CAL_API_KEY=
CAL_EVENT_TYPE_ID=
CAL_WEBHOOK_SECRET=

# WhatsApp Cloud API
WHATSAPP_ACCESS_TOKEN=
WHATSAPP_PHONE_NUMBER_ID=
WHATSAPP_WEBHOOK_VERIFY_TOKEN=
WHATSAPP_APP_SECRET=

# Meta Business
META_ACCESS_TOKEN=
META_BUSINESS_ID=
META_CATALOG_ID=
META_OFFLINE_DATASET_ID=
META_PIXEL_ID=

# Pagos
MERCURY_API_KEY=
MERCURY_ACCOUNT_ID=
WISE_API_KEY=
WISE_PROFILE_ID=
WISE_SANDBOX=false

# Perplexity
PERPLEXITY_API_KEY=
PERPLEXITY_MODEL=sonar-pro

# Bunny CDN
BUNNY_STORAGE_API_KEY=
BUNNY_STORAGE_ZONE_NAME=
BUNNY_PULL_ZONE_HOSTNAME=
BUNNY_STORAGE_REGION=

# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
SUPABASE_STORAGE_BUCKET_CREATORS=entregables-creadores

# n8n Webhooks (internos)
N8N_WEBHOOK_BOOKING_CREATED=https://dev.kreoon.com/webhook/booking-created
N8N_WEBHOOK_BASE_URL=https://dev.kreoon.com
```

---

## Patron de retry reutilizable

Para evitar duplicar la logica en cada cliente, se puede extraer:

```typescript
// lib/integrations/fetch-with-retry.ts
const RETRYABLE_STATUSES = [429, 500, 502, 503, 504];

export async function fetchWithRetry<T>(
  url: string,
  options: RequestInit & { timeoutMs?: number; maxRetries?: number } = {}
): Promise<T> {
  const { timeoutMs = 10_000, maxRetries = 3, ...fetchOptions } = options;

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

    try {
      const response = await fetch(url, {
        ...fetchOptions,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (response.ok) {
        return response.json() as Promise<T>;
      }

      if (RETRYABLE_STATUSES.includes(response.status) && attempt < maxRetries - 1) {
        const delay = 1000 * Math.pow(2, attempt);
        console.warn(`[fetchWithRetry] ${response.status} en ${url}, reintento ${attempt + 1} en ${delay}ms`);
        await new Promise(r => setTimeout(r, delay));
        continue;
      }

      const body = await response.text();
      throw new Error(`HTTP ${response.status}: ${body}`);
    } catch (error) {
      clearTimeout(timeoutId);
      if (error instanceof Error && error.name === 'AbortError') {
        throw new Error(`Timeout (${timeoutMs}ms) en ${url}`);
      }
      if (attempt === maxRetries - 1) throw error;
    }
  }

  throw new Error(`Max reintentos (${maxRetries}) alcanzados para ${url}`);
}
```
