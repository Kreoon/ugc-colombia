# Reporte de Silent Failures y Error Handling — UGC Colombia

**Fecha:** 2026-04-08
**Auditor:** silent-failure-hunter
**Alcance revisado:**
- `web/src/` (Next.js 15)
- `n8n/workflows-spec.md`
- `content/sistemas/integraciones/api-integrations-spec.md`

**Resumen ejecutivo:** El código de `web/` todavía no implementa Route Handlers ni Server Actions (solo componentes de marketing + cliente Supabase), por lo que los hallazgos se concentran en las specs de n8n y los clientes API. Hay bugs estructurales reales en los helpers `*Fetch` (timeout compartido entre reintentos, `AbortError` tragado, último intento que pierde el error), además de catch silenciosos en flujos críticos (scoring BANT, pagos a creadores, parseo de respuestas de Claude, verificación de HMAC) que hay que corregir antes de producción.

---

## HIGH

### H1. Timeout de `AbortController` se crea UNA sola vez fuera del loop de reintentos
**Archivos:**
- `content/sistemas/integraciones/api-integrations-spec.md:140-156` (beehiiv)
- `:293-307` (resend)
- `:459-474` (cal)
- `:667-681` (whatsapp)
- `:879-893` (meta)
- `:1060-1074` (wise)
- `:1138-1152` (mercury)
- `:1276-1296` (perplexity)

**Problema:** `const controller = new AbortController(); const timeoutId = setTimeout(() => controller.abort(), 10_000);` se declara ANTES del `for` de reintentos. Consecuencias:
1. El timeout total no es 10s por intento sino 10s para TODA la operación. En el segundo intento el signal ya está abortado y `fetch` falla inmediatamente con `AbortError`.
2. El `AbortError` cae en el `catch` genérico que hace `throw new Error('[X] Timeout')` — pero dentro de un reintento esto luce como "timeout real" cuando en realidad es el signal viejo. Peor: ese throw interno es atrapado nuevamente por el catch externo y puede silenciarse hasta el último intento.
3. `clearTimeout` solo se llama en `response.ok`. Si hay 4xx no-retriable, el timer queda colgado (leak).

**Corrección sugerida:**
```typescript
for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10_000);
  try {
    const response = await fetch(url, { ...options, headers, signal: controller.signal });
    if (response.ok) return response.json() as Promise<T>;
    // ... manejo de status
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      if (attempt === MAX_RETRIES - 1) throw new Error(`[X] Timeout tras ${MAX_RETRIES} intentos en ${path}`);
      continue;
    }
    if (attempt === MAX_RETRIES - 1) throw error;
  } finally {
    clearTimeout(timeoutId);
  }
}
```

---

### H2. Catch genérico traga errores distintos a AbortError sin loggear
**Archivos:** mismos que H1 — bloques `} catch (error) { if (AbortError)... if (attempt === MAX-1) throw; }`

**Problema:** Si `fetch` lanza un `TypeError` (ej. DNS, red caída, TLS), un `SyntaxError` del `.json()` cuando el body no es JSON, o cualquier excepción no-Abort, el catch hace `continue` silenciosamente hasta el último intento. Los primeros 2 fallos nunca se loggean. Cuando finalmente el `throw` ocurre, se pierde el contexto de los intentos previos. Además, errores de programación (null deref, etc.) también son atrapados.

**Impacto:** Debugging imposible. Un outage de 30s del proveedor se ve igual que un bug de código.

**Corrección:**
```typescript
} catch (error) {
  const isAbort = error instanceof Error && error.name === 'AbortError';
  const isNetwork = error instanceof TypeError; // fetch network errors
  console.error(`[X] Intento ${attempt + 1}/${MAX_RETRIES} falló en ${path}:`, error);
  if (!isAbort && !isNetwork) throw error; // bugs → no reintentar
  if (attempt === MAX_RETRIES - 1) throw error;
}
```

---

### H3. `creator-payment-scheduler` — sin rollback ni verificación de éxito real del pago
**Archivo:** `n8n/workflows-spec.md:474-519` (workflow 7)

**Problema:** Flujo crítico financiero con múltiples silent failures:
1. Nodo 5a/5b (Mercury/Wise Create Payment) no especifica qué hacer si devuelve 4xx/5xx. Por defecto n8n aborta el workflow → el pago queda en limbo sin registro en `payments`.
2. Nodo 6 (Insert Payment Record) se ejecuta ANTES de confirmar que el banco aceptó. Status se marca `scheduled` aunque el request HTTP falle parcialmente (response 202 no = dinero enviado).
3. Nodo 7 (Mark Content as Paid) ocurre antes de verificar `payments.status` final → se puede marcar `paid=true` sin que el creador haya recibido nada.
4. No hay nodo que consulte `GET /transfers/{id}` para confirmar `status='sent'` o `'outgoing_payment_sent'`.
5. Notificación al creador (Nodo 9) dice "tu pago está en camino" aunque el pago falló.
6. No hay idempotencia por intento (solo unique constraint en DB, pero si la escritura del registro falla después del POST al banco se paga dos veces en el siguiente run).

**Impacto:** Pagos duplicados, pagos perdidos, creadores notificados falsamente. Este es el workflow más crítico del sistema.

**Corrección sugerida:**
- Escribir `payments` con `status='initiating'` + `idempotency_key` (ej. `sha256(creator_id|period|amount)`) ANTES del POST al banco. El unique index sobre `idempotency_key` previene doble pago en reintentos.
- POST al banco con `Idempotency-Key` header (Mercury y Wise lo soportan).
- Verificar response body: para Wise confirmar `status` y existencia de `id`. Para Mercury verificar código 201.
- Update `payments.status='submitted'` + `provider_tx_id`.
- Nodo de polling posterior (o webhook del banco) que actualiza a `sent`/`failed`.
- Solo marcar `content_pieces.paid=true` cuando `payments.status='sent'`.
- Notificar al creador SOLO después de `sent`.
- Error branch obligatorio → WhatsApp a Brian Y Alexander con `creator_id`, `amount`, `tx_id`, `error`.

---

### H4. Validación de firma HMAC puede dar falso positivo (timing attack)
**Archivos:**
- `api-integrations-spec.md:529-538` (cal)
- `:776-786` (whatsapp)
- `n8n/workflows-spec.md:277-286` (cal webhook en n8n)

**Problema:** `expected === signature` usa comparación de strings normal en JS, que es time-variable. Aunque es un ataque exótico sobre webhooks, la guía pide rechazar con 401 — la comparación correcta es `crypto.timingSafeEqual`. Adicionalmente, si `signature` viene vacío o mal formado, el helper devuelve `false` pero el Route Handler solo responde 401 sin loggear quién intentó ni con qué firma — imposible detectar un atacante escaneando.

**Corrección:**
```typescript
import { createHmac, timingSafeEqual } from 'crypto';
const expected = createHmac('sha256', secret).update(rawBody).digest();
const received = Buffer.from(signature.replace(/^sha256=/, ''), 'hex');
if (expected.length !== received.length) return false;
return timingSafeEqual(expected, received);
```
Y en el Route Handler:
```typescript
if (!verifyCalWebhook(rawBody, signature)) {
  console.error('[cal-webhook] Firma inválida', { signature, ip: req.headers.get('x-forwarded-for') });
  return NextResponse.json({ error: 'Firma invalida' }, { status: 401 });
}
```

---

### H5. Cal.com webhook delega a n8n sin verificar respuesta ni timeout
**Archivo:** `api-integrations-spec.md:559-565`

**Código actual:**
```typescript
if (event.triggerEvent === 'BOOKING_CREATED') {
  await fetch(process.env.N8N_WEBHOOK_BOOKING_CREATED!, {
    method: 'POST', headers: { ... }, body: JSON.stringify(event),
  });
}
return NextResponse.json({ received: true });
```

**Problemas:**
1. `process.env.N8N_WEBHOOK_BOOKING_CREATED!` — non-null assertion sin validación: si falta la env var, `fetch` es llamado con `undefined` (→ TypeError), o peor, en algún runtime como string `"undefined"`.
2. No hay `try/catch` — si n8n está caído, el Route Handler responde 500 a Cal.com. Cal.com reintenta el webhook → eventualmente lo descarta. El booking se pierde silenciosamente.
3. No hay timeout → si n8n cuelga 30s, el handler rompe la regla "responder en < 5s" que la misma spec exige en línea 22.
4. No se verifica `response.ok`. Un 500 de n8n se traga.
5. Non-null assertion `!` es exactamente el anti-patrón de silent failure.
6. No se loggea nada (éxito ni fallo).

**Corrección:**
```typescript
const n8nUrl = process.env.N8N_WEBHOOK_BOOKING_CREATED;
if (!n8nUrl) {
  console.error('[cal-webhook] N8N_WEBHOOK_BOOKING_CREATED no configurado', { event });
  // Responder 200 para que Cal.com no reintente indefinidamente,
  // pero dejar traza en Sentry/logs para alertar.
  return NextResponse.json({ received: true, warning: 'n8n no disponible' });
}
try {
  const ac = new AbortController();
  const t = setTimeout(() => ac.abort(), 3_000);
  const r = await fetch(n8nUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(event),
    signal: ac.signal,
  });
  clearTimeout(t);
  if (!r.ok) {
    console.error('[cal-webhook] n8n respondió', r.status, await r.text());
    // TODO: dead letter queue / Supabase workflow_logs
  }
} catch (err) {
  console.error('[cal-webhook] fallo al reenviar a n8n', err, { event });
  // TODO: persistir en Supabase para replay
}
return NextResponse.json({ received: true });
```

---

### H6. `bant-scorer` — parseo frágil de respuesta de Claude que rompe el workflow sin recuperación
**Archivo:** `n8n/workflows-spec.md:229-236`

**Código:**
```javascript
const raw = $input.first().json.content[0].text;
const match = raw.match(/\{[\s\S]*\}/);
if (!match) throw new Error('No JSON in Claude response');
const bant = JSON.parse(match[0]);
return [{ json: bant }];
```

**Problemas:**
1. `$input.first().json.content[0].text` asume estructura — si Claude cambia o hay `stop_reason='max_tokens'`, `content[0]` puede ser de tipo `tool_use` sin `.text` → TypeError no loggeado.
2. Regex greedy `\{[\s\S]*\}` captura desde la PRIMERA `{` hasta la ÚLTIMA `}`, incluyendo texto intermedio si Claude hace "Aquí tienes: {...} y también {...}". `JSON.parse` falla con mensaje genérico.
3. `JSON.parse` throw no se loggea con el payload crudo → imposible debuggear.
4. No hay fallback: el lead queda con `stage='scored'` nunca actualizado → queda atascado.
5. No valida esquema (`total` podría ser string, `tier` un valor inválido para el Switch posterior).
6. Si falla el workflow, el lead que llegó en `lead-ingestion` ya se insertó pero nunca recibe scoring → follow-up sequence nunca lo procesa (porque filtra por `stage IN ('scored','contacted')`).

**Corrección:**
```javascript
const input = $input.first().json;
const block = input?.content?.find(b => b.type === 'text');
if (!block?.text) {
  throw new Error(`[bant] Respuesta Claude sin text block: ${JSON.stringify(input).slice(0, 500)}`);
}
const match = block.text.match(/\{[\s\S]*?\}/); // non-greedy
if (!match) {
  throw new Error(`[bant] No JSON en respuesta: ${block.text.slice(0, 500)}`);
}
let bant;
try { bant = JSON.parse(match[0]); }
catch (e) { throw new Error(`[bant] JSON inválido: ${match[0]} — ${e.message}`); }

const validTiers = ['HOT', 'WARM', 'COLD'];
if (typeof bant.total !== 'number' || !validTiers.includes(bant.tier)) {
  throw new Error(`[bant] Esquema inválido: ${JSON.stringify(bant)}`);
}
return [{ json: bant }];
```
Y agregar error branch que marque `leads.stage='scoring_failed'` para poder reintentar manualmente.

---

### H7. `creator-application-pipeline` Nodo 5 — `JSON.parse` sin try/catch, acceso a índice sin guard
**Archivo:** `n8n/workflows-spec.md:347-352`

**Código:**
```javascript
const raw = $input.first().json.content[0].text;
const score = JSON.parse(raw.match(/\{[\s\S]*\}/)[0]);
```

**Problema:** Si `raw.match(...)` devuelve `null`, `[0]` lanza TypeError. `JSON.parse` puede lanzar SyntaxError. Ambos abortan el workflow sin registrar el creator en DB aunque ya pasó validación. Además en n8n por defecto el error branch no está conectado → la aplicación del creator se pierde.

**Corrección:** Mismo patrón de H6 + configurar "Continue on Fail" en el nodo + Supabase insert con `score=null, status='scoring_failed'` para que Diana los revise manualmente.

---

### H8. `lead-ingestion` Node 5 `On error: continue` es un silent failure
**Archivo:** `n8n/workflows-spec.md:122-127`

**Problema:** Spec dice `**On error:** continue (log en workflow_logs)` pero:
1. No define QUÉ nodo hace el log — confía en el Error Workflow global. Pero el error workflow global solo dispara cuando TODO el workflow falla, no cuando un nodo tiene "continue on fail".
2. Si el INSERT falla (ej. constraint violation, tabla en mantenimiento, service_key expirada), el workflow sigue al Node 6 (Resend Welcome) y al 8 (WhatsApp Alexander diciendo "nuevo lead") con `$('Supabase - Insert Lead').item.json.id = undefined`.
3. Node 10 (respond to webhook) devuelve `{ lead_id: undefined }` al form. El usuario ve éxito falso.
4. Node 9 llama a bant-scorer con `lead_id: undefined` → otro workflow roto.

**Corrección:** Agregar un nodo IF inmediatamente después del insert que verifique `$json.id != null`, y en rama false insertar explícitamente en `workflow_logs` + alertar Alexander + devolver 500 al webhook. No continuar con welcome email si el lead no existe en DB.

---

### H9. `getWiseExchangeRate` — default silencioso y monto en moneda equivocada
**Archivo:** `api-integrations-spec.md:1099-1109`

**Código:**
```typescript
const rate = rates[0]?.rate;
if (!rate) throw new Error(`[Wise] No se encontro tasa ${source}/${target}`);
return rate;
```

**Problema:** Solo el throw está bien, pero el callsite no existe en la spec — no hay función que USE el rate para convertir USD→COP antes del `createWiseQuote`. El flujo `creator-payment-scheduler` (n8n workflow 7) asume montos en USD directos y nunca consulta la tasa. Los creadores LATAM pueden ser pagados con la tasa interna de Wise (spread no controlado) sin que el sistema compare contra tasa de mercado. La misma spec línea 1205 lo marca como requisito ("siempre verificar tasa de cambio en tiempo real antes de confirmar") pero no se implementa.

**Corrección:** Implementar helper `quoteAndVerifyTransfer` que consulte rate, construya quote, valide desviación < 2% contra tasa esperada, y solo entonces ejecute el transfer. Loggear el rate usado en `payments.fx_rate`.

---

## MEDIUM

### M1. `researchBrandProspect` catch vacío que enmascara JSON.parse
**Archivo:** `api-integrations-spec.md:1352-1371`

**Código:**
```typescript
try {
  const jsonMatch = content.match(/\{[\s\S]*\}/);
  const parsed = JSON.parse(jsonMatch?.[0] ?? '{}');
  return { ...parsed, citations: ... };
} catch {
  return { summary: content, industry: '', socialPresence: '', ... };
}
```

**Problemas:**
1. `catch {}` sin parámetro — no se loggea qué falló ni por qué.
2. El fallback devuelve campos `''` vacíos → los consumidores no distinguen "research hecho pero sin info de industria" vs "research falló". El cacheo de 24h (línea 1378) ahora envenena la caché con un resultado vacío.
3. Si el fallo es un bug de código (optional chain null deref), se silencia.

**Corrección:**
```typescript
try { ... }
catch (err) {
  console.error('[perplexity] parse fallido, devolviendo raw', err, { content: content.slice(0, 500) });
  return { summary: content, industry: 'UNKNOWN', socialPresence: 'UNKNOWN', estimatedAdBudget: 'UNKNOWN', ugcOpportunity: 'UNKNOWN', citations: result.citations ?? [], _parseError: true };
}
```
Y NO cachear cuando `_parseError === true`.

---

### M2. `response.json().catch(() => ({}))` traga errores de parseo
**Archivos:**
- `api-integrations-spec.md:687` (whatsapp errorBody)
- `:905` (meta errorBody)

**Problema:** `await response.json().catch(() => ({}))` silencia SyntaxError cuando el body no es JSON (ej. gateway HTML de error). Luego `errorBody?.error?.code` es `undefined`, se saltan checks específicos como el 131056, y el throw final dice `[WhatsApp] 400: {}` sin el body real.

**Corrección:** Leer como `text()` primero, intentar parse, loggear siempre el texto crudo:
```typescript
const rawText = await response.text();
let errorBody: any = {};
try { errorBody = JSON.parse(rawText); } catch { /* keep rawText */ }
if (errorBody?.error?.code === 131056) throw new Error(...);
throw new Error(`[WhatsApp] ${response.status}: ${rawText.slice(0, 1000)}`);
```

---

### M3. Workflow n8n Node "Wait" de 24h/1h sin manejo de crashes
**Archivo:** `n8n/workflows-spec.md:301-314` (discovery-call-followup Nodes 7-10)

**Problema:** Los nodos `Wait` de n8n persisten en disco, pero si el booking se cancela durante la espera, el recordatorio de 24h se envía igual (el Node 11 cancelled branch no interrumpe las esperas pendientes). Resultado: el prospect recibe un "te esperamos mañana" para una llamada que ya canceló. Además no hay verificación del estado actual del booking antes de enviar el reminder.

**Corrección:** Antes del WhatsApp 24h (Node 8) y del Post-call survey (Node 10), agregar un Supabase Get Row que verifique `bookings.status='confirmed'`. Si no, skip.

---

### M4. `follow-up-sequence` sin verificación de bounce/unsubscribe
**Archivo:** `n8n/workflows-spec.md:430-466`

**Problema:** La secuencia de 4 touches no consulta si el email hizo bounce, si el lead clickeó "unsubscribe" en Beehiiv, o si respondió WhatsApp con STOP. Sigue enviando touches incrementando `touch_count++`. Resend y Meta pueden banear el sender por abuso. No hay circuit breaker.

**Corrección:** En el SQL del Node 2 agregar `AND NOT EXISTS (SELECT 1 FROM unsubscribes WHERE email = leads.email) AND email_bounced = false`. Configurar webhook de Resend para actualizar `leads.email_bounced` cuando `email.bounced` event llegue.

---

### M5. `monthly-client-report` Node 6 — PDF generation sin manejo de fallo
**Archivo:** `n8n/workflows-spec.md:416-420`

**Problema:** Si Browserless devuelve 4xx/5xx o timeout, el Node 7 (Resend) intenta adjuntar un binary que no existe → o falla el nodo o envía un PDF corrupto. El cliente recibe un email vacío o ningún email. No hay log ni fallback (ej. enviar HTML inline). Además no se verifica que `$env.BROWSERLESS_TOKEN` exista.

**Corrección:** Agregar nodo IF que verifique el binary y, si falta, enviar email HTML sin attachment + alertar Alexander.

---

### M6. Node 8 (WhatsApp Alexander en lead-ingestion) sin retry y sin fallback
**Archivo:** `n8n/workflows-spec.md:161-176`

**Problema:** Spec no especifica retry para este nodo. Si WhatsApp Cloud API está caído o el token expiró, Alexander nunca se entera del lead nuevo. No hay fallback a email. Comparar con Node 6 (Resend) que sí tiene `Retry on fail: 3x`.

**Corrección:** Agregar retry 3x + error branch que envíe email a Alexander como fallback + insert en `workflow_logs` con severity=high.

---

### M7. `Error Handling Global` es opcional hasta configurarlo manualmente
**Archivo:** `n8n/workflows-spec.md:574-580`

**Problema:** La sección dice "Crear un Error Workflow en n8n Settings → asignar a todos", pero es acción manual no verificable. Si se olvida asignarlo a un workflow, los errores de ese workflow no van a ningún lado. n8n no avisa que falta el error workflow.

**Corrección:** Agregar checklist de deployment que verifique (vía API n8n) que cada workflow productivo tiene `settings.errorWorkflow` definido. Ejecutar este check en CI antes de cualquier deploy.

---

### M8. `addBeehiivSubscriber` no maneja el caso "email ya existe"
**Archivo:** `api-integrations-spec.md:183-194`

**Problema:** Beehiiv devuelve 409 o 200 con `status: 'inactive'` cuando el email ya existía. Actualmente 409 no está en `RETRYABLE_STATUSES` → throw directo. En lead-ingestion esto hace que el welcome email se envíe pero Beehiiv marca continue-on-fail, ocultando que nunca se reactivó la suscripción. El lead no recibe newsletter aunque el sistema lo reporte como suscrito.

**Corrección:** Tratar 409 como success (lead ya suscrito). Para 200 con `status !== 'active'`, loggear warning.

---

### M9. `normalized.phone` normaliza a string vacío sin error
**Archivo:** `n8n/workflows-spec.md:97`

**Código:** `phone: (item.phone || '').replace(/\D/g, '')`

**Problema:** Si el número viene malformado (letras, espacios, "+57-300 123 4567"), se normaliza a `3001234567` sin country code. El Node 8 WhatsApp luego intenta enviar a ese número → Meta devuelve error por formato inválido → ese nodo silencia o aborta. Para teléfonos colombianos el sistema debería prefixar `57` si tiene 10 dígitos, o fallar con error si no cumple E.164 (lo cual la misma spec línea 794 exige).

**Corrección:**
```javascript
let phone = (item.phone || '').replace(/\D/g, '');
if (phone && phone.length === 10) phone = '57' + phone;
if (phone && !/^\d{11,15}$/.test(phone)) {
  throw new Error(`Teléfono inválido tras normalización: "${item.phone}" → "${phone}"`);
}
normalized.phone = phone || null;
```

---

### M10. `verifyWhatsAppWebhook` devuelve `null` sin loggear intento de abuso
**Archivo:** `api-integrations-spec.md:764-774`

**Problema:** Cuando `mode !== 'subscribe'` o el token no matchea, devuelve `null` — el callsite debe responder 403. Pero no se loggea el intento, que puede ser un atacante probando tokens, o (más común) una mala config de Meta enviando un token viejo. El operador nunca se entera.

**Corrección:** `console.warn('[whatsapp-verify] Challenge rejected', { mode: params.mode, tokenProvided: params.token.slice(0, 4) + '***' });`

---

## LOW

### L1. Non-null assertion en `supabase.ts`
**Archivo:** `web/src/lib/supabase.ts:27` — `createClient<Database>(supabaseUrl!, serviceKey, ...)`

**Problema:** El `!` es técnicamente seguro porque la línea 8-13 ya valida, pero es frágil: si alguien refactoriza y mueve el `createClient` fuera del module scope, el `!` enmascararía un potencial undefined. TS no protege. Mejor pasar `supabaseUrl` directo (ya es `string` tras el throw).

---

### L2. `console.warn` como único logging
**Archivo:** `api-integrations-spec.md:165, 316, 1305`

**Problema:** Los clientes API usan `console.warn` para reintentos. En producción (Vercel) esto va a Runtime Logs pero no a Sentry / Axiom. No hay error IDs ni contexto estructurado (atributos: `path`, `status`, `attempt`, `requestId`). El equipo no podrá agrupar errores por integración.

**Corrección:** Crear `lib/logger.ts` con wrapper estructurado (ej. `logApiError({ integration, path, status, attempt, error })`) y usarlo en todos los clientes. Enviar a Sentry/Axiom con tags.

---

### L3. Retry backoff sin jitter
**Archivos:** todos los `*Fetch` en `api-integrations-spec.md`

**Problema:** `BASE_DELAY_MS * Math.pow(2, attempt)` es determinista. Bajo carga (múltiples requests fallando a la vez, ej. Resend rate-limit global), todos reintentan en el mismo instante → thundering herd → nuevo 429.

**Corrección:** `const delay = BASE_DELAY_MS * Math.pow(2, attempt) * (0.5 + Math.random());`

---

### L4. `getBeehiivPostStats` devuelve `unknown`
**Archivo:** `api-integrations-spec.md:209-212`

**Problema:** Tipo de retorno `unknown` obliga al caller a hacer casts sin validación. Los callers probablemente harán `(stats as any).opens` y si el schema cambia, silencio absoluto.

**Corrección:** Definir interface `BeehiivPostStats` o usar Zod para validar runtime.

---

### L5. `idempotency_key` fallback usa timestamp
**Archivo:** `n8n/workflows-spec.md:101`

**Código:** `idempotency_key: item.idempotency_key || \`${item.source}-${item.email}-${Date.now()}\``

**Problema:** Cuando el cliente no manda idempotency_key, el fallback incluye `Date.now()` → cada retry del cliente web genera key distinta → el lead se inserta N veces aunque Node 3 intente detectar duplicados por email (que sí protege parcialmente, pero sigue incrementando touch_count). La idempotencia se vuelve inútil.

**Corrección:** Remover `Date.now()`. Usar solo `source + email` como fallback, o rechazar requests sin idempotency_key con 400.

---

### L6. `content-repurposing-alert` Node 2 condición estática
**Archivo:** `n8n/workflows-spec.md:532-533`

**Problema:** `$json.pillar === true && $json.duration_sec > 120` — si `pillar` viene como string `"true"` desde el form (típico en multipart), la comparación estricta falla silenciosamente → nunca se genera el plan de derivadas, nadie lo nota porque no hay rama "else" con log.

**Corrección:** Normalizar en un Code node previo + agregar IF-else con log en workflow_logs cuando no aplica.

---

### L7. Meta Business `access_token` en query string se loggea
**Archivo:** `api-integrations-spec.md:877`

**Problema:** `const url = \`${BASE_URL}${path}${separator}access_token=${token}\`;` — si algún framework de logging imprime `response.url` o el `Error` incluye la URL (algunos SDKs lo hacen), el token queda en logs. La nota de seguridad línea 972 dice "nunca se loguea" pero el código no lo garantiza.

**Corrección:** Pasar el token en header `Authorization: Bearer ${token}` (Meta lo acepta) o redactar la URL antes de cualquier throw: `throw new Error(...path without token...)`.

---

### L8. `sendOfflineConversion` no verifica `events_received > 0`
**Archivo:** `api-integrations-spec.md:930-966`

**Problema:** Meta devuelve `{ events_received: 0 }` cuando el evento es rechazado por deduplicación o hashing inválido, pero con status 200. El cliente retorna success silencioso. Los eventos nunca llegan a Ads Manager y el optimization algorithm no aprende.

**Corrección:** `if (result.events_received === 0) throw new Error('[Meta] evento rechazado');`

---

## Notas generales

1. **`web/src/` actualmente no tiene Route Handlers, Server Actions ni formularios funcionales.** Cuando se implementen (basado en el spec), los mismos patrones aplicarán — asegurar que TODOS los fetch internos al backend n8n/Supabase sigan las correcciones de H1/H2/H5.
2. **Falta un módulo central `lib/logger.ts` con Sentry** — sin él, todas las correcciones de logging quedan en `console.*` que se pierde. Es prerrequisito para la mayoría de fixes.
3. **Falta tabla `workflow_logs` schema** — la spec la menciona pero no define columnas ni índice por `created_at`. Sin esto, cualquier insert en el error branch es desechable.
4. **No hay tests** — ninguno de estos catch blocks tiene cobertura. Antes de corregirlos, agregar fixtures con respuestas malformadas de cada API (Claude sin JSON, Meta con 200 + rejected, Wise timeout).
5. **Los workflows de n8n deben tener `errorWorkflow` asignado obligatoriamente en settings** — ver M7.

## Paths absolutos revisados

- `F:\Users\SICOMMER SAS\Documents\GitHub\UGC Colombia\web\src\lib\supabase.ts`
- `F:\Users\SICOMMER SAS\Documents\GitHub\UGC Colombia\n8n\workflows-spec.md`
- `F:\Users\SICOMMER SAS\Documents\GitHub\UGC Colombia\content\sistemas\integraciones\api-integrations-spec.md`
