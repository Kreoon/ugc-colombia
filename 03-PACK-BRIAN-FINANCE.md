# PACK OPERATIVO — BRIAN
## Finanzas · UGC Colombia

**Fecha:** 2026-04-09
**Versión:** 1.0
**Rol:** Finanzas, cobranza, pagos a creadores, métricas financieras, compliance tributario
**Uso:** Referencia diaria para cada billing cycle, MBR mensual y gestión de cartera.

---

## Tabla de contenidos

1. [Visión y KPIs propios](#1-vision-y-kpis)
2. [Pricing guide LATAM/USA completo](#2-pricing-guide)
3. [Proceso de facturación al cliente](#3-facturacion)
4. [Proceso de pago a creadores (idempotencia)](#4-pago-creadores)
5. [MRR, Health Score y métricas SaaS](#5-mrr)
6. [Política de cobranza y dunning](#6-cobranza)
7. [Política de churn y reintegro](#7-churn)
8. [Dashboard financiero](#8-dashboard)
9. [Riesgos y mitigación](#9-riesgos)

---

## 1. Visión y KPIs propios

**Meta 12 meses:** $100K USD/mes MRR activo cobrado.
**Ticket promedio:** $750 USD/mes.
**Ruta:** 10 clientes M3 → 35 M6 → 110 M12.
**Punto de equilibrio:** ~12 clientes activos ($9K MRR).
**Burn aceptable Q2:** ≤$8K USD.

### KPIs Brian

| KPI | Target |
|---|---|
| DSO (días de cobranza) | **≤15 días** |
| % facturas vencidas | **<5%** |
| Margen bruto promedio | **≥55%** |
| CAC blended | **≤$300 USD** |
| LTV/CAC | **≥6x** (target 18x) |
| Payback period | **4-5 meses** |

### Cadencias

- **Diario:** cobros del día, facturas vencidas, conciliación bancaria.
- **Semanal:** cash flow rolling 13 semanas, AR aging, proyección de cobros.
- **Mensual:** P&L, margen bruto por servicio, CAC por canal, impuestos Colombia, payroll.

---

## 2. Pricing guide LATAM / USA completo

### Principios

1. **Precio al cliente = Tarifa creador × markup agencia (40-60%).** El markup cubre coordinación, QA, garantía, derechos y margen operativo.
2. LATAM aplica para clientes COL/MEX/ARG/etc. (presupuesto COP/MXN/ARS).
3. USA aplica para clientes con sede USA o presupuesto declarado en USD.
4. Premium aplica para enterprise, paid media de alto presupuesto o whitelisting sostenido.
5. **Todos los precios en USD.** En Colombia se liquidan a TRM del día.

### Tabla maestra de precios al cliente

#### Formato 1 — Testimonial (talking head)

| Duración | LATAM | USA | Premium |
|---|---|---|---|
| 15-30s | $150-250 | $350-600 | $700-1.200 |
| 30-60s | $220-380 | $500-900 | $900-1.800 |
| 60-90s | $300-500 | $700-1.200 | $1.200-2.500 |

Incluye: 1 toma principal, 2 rondas de revisión, vertical 9:16, subtítulos opcionales.

#### Formato 2 — Unboxing

| Duración | LATAM | USA | Premium |
|---|---|---|---|
| 30-45s | $200-320 | $450-750 | $800-1.400 |
| 45-90s | $280-450 | $600-1.000 | $1.000-2.000 |
| 90-120s | $380-600 | $800-1.400 | $1.400-2.800 |

**Nota:** envío físico se adiciona. Colombia: $15-30 USD. Internacional: costo real + 20%.

#### Formato 3 — Demo / Tutorial

| Duración | LATAM | USA | Premium |
|---|---|---|---|
| 30-60s | $220-380 | $500-900 | $900-1.800 |
| 60-90s | $320-520 | $700-1.200 | $1.200-2.400 |
| 90-180s | $450-750 | $1.000-1.800 | $1.800-3.500 |

**Nota:** brief call se cobra $25/h LATAM / $50/h USA / $100/h Premium si supera 30 min.

#### Formato 4 — Review / Comparación

| Duración | LATAM | USA | Premium |
|---|---|---|---|
| 45-60s | $250-420 | $550-950 | $950-1.900 |
| 60-120s | $380-600 | $800-1.400 | $1.400-2.800 |
| 120-180s | $520-800 | $1.100-2.000 | $2.000-4.000 |

**Nota:** si cliente pide review 100% positivo, cotizar como testimonial.

#### Formato 5 — Lifestyle / B-roll

| Duración | LATAM | USA | Premium |
|---|---|---|---|
| 15-30s | $180-300 | $400-700 | $700-1.400 |
| 30-60s | $280-480 | $650-1.100 | $1.100-2.200 |
| 60-90s | $400-650 | $900-1.600 | $1.600-3.200 |

**Nota:** locación especial se cobra aparte: $50-200 según tipo.

#### Formato 6 — Hook-Ad / Ad Creative

| Duración | LATAM | USA | Premium |
|---|---|---|---|
| 6-10s | $120-200 | $280-500 | $500-1.000 |
| 10-15s | $160-280 | $380-700 | $700-1.400 |
| Pack 3 variaciones | $400-650 | $900-1.600 | $1.600-3.200 |

**Nota:** mayor ROI para cliente. Ofrecer pack de 3 variaciones para A/B testing.

### Adicionales y complementos

| Adicional | LATAM | USA | Premium |
|---|---|---|---|
| Pack 3 fotos UGC del producto | $80-150 | $200-400 | $400-800 |
| Pack 6 fotos (lifestyle + plano) | $150-260 | $380-700 | $700-1.400 |
| Subtítulos en inglés | $20-30 | $40-60 | $60-100 |
| Versión con traducción al inglés | +60% base | Incluido | Incluido |
| Formatos adicionales (1:1, 16:9) | $30-50 c/u | $60-100 c/u | $100-150 c/u |
| Revisión extra (3ª en adelante) | $20-40 | $50-80 | $80-150 |
| Brief call (>30 min) | $25/h | $50/h | $100/h |

### Licencias de uso (se suman al precio base)

| Licencia | LATAM | USA | Premium |
|---|---|---|---|
| Uso orgánico | Incluido | Incluido | Incluido |
| Paid Media | +30% | +40% | +50% |
| Whitelisting 30d | +30% mensual | +40% mensual | +50% mensual |
| Whitelisting 90d | +25% mensual | +35% mensual | +45% mensual |
| Email + landing | +20% | +25% | +30% |
| Perpetua (ilimitada) | +50% | +60% | +75% |
| TV / OOH | +80% | +100% | +150% |

### Paquetes de volumen

| Videos pedidos | Descuento |
|---|---|
| 3-5 videos | 5% |
| 6-10 videos | 10% |
| 11-20 videos | 15% |
| >20 videos | 20% (negociar caso a caso) |

### Markup agencia sobre tarifa creador

| Tier creador | Tarifa base | Markup | Precio cliente |
|---|---|---|---|
| C | $40-80 | 60% | $64-128 |
| B | $80-150 | 50% | $120-225 |
| A LATAM | $150-300 | 45% | $218-435 |
| A USA | $300-600 | 40% | $420-840 |

### Casos especiales

- **Startups / beta:** -10-15% adicional a cambio de testimonio, caso de estudio o pago 100% anticipado.
- **ONGs:** evaluar caso a caso, -20-30% si impacto social relevante + portafolio de valor.
- **Retainer agencia exclusiva (3+ meses):** -15-20% sobre precio lista a cambio de volumen mínimo mensual garantizado.

### Planes SaaS (mensual recurrente)

| Plan | Precio | Piezas/mes | Target |
|---|---|---|---|
| Starter | $500 | 4 piezas | Startups, primera experiencia UGC |
| Pro | $950 | 8 piezas | DTC establecida, performance marketing |
| Premium | $1.500 | 12+ piezas + formatos mixtos + casting abierto | Enterprise, paid media alto |

---

## 3. Proceso de facturación al cliente

### Setup inicial de cliente nuevo

1. Cliente firma propuesta (PandaDoc/DocuSign).
2. Brian crea cliente en Stripe + Supabase `clients`: nombre, email, país, plan, `billing_day`, método de pago.
3. Stripe envía **invoice mes 1 (100% anticipado)** inmediatamente.
4. Cliente paga → webhook `invoice.paid` dispara activación en n8n (ver Pack Samuel).

### Ciclo de cobro recurrente (mes 2 en adelante)

- **Día 30, 60, 90...** (según `clients.billing_day`): Jarvis dispara invoice recurrente automática en Stripe.
- **Si pago exitoso:** `clients.status='active'`, se loggea `payments.mrr_paid_at`.
- **Si pago falla:** 3 reintentos automáticos en días 30, 32, 34.
- **Día 34 falla:** Alexander llama personalmente.
- **Día 35 sin cobro:** pausa de servicio automática (ver sección 6).

### Métodos de pago

- **Internacional (default):** Stripe (USD wire / ACH / tarjeta) → Mercury Bank.
- **Alternativo:** Wise, PayPal Business.
- **Colombia:** PSE, Bancolombia, Nequi Empresas (liquidación TRM del día).

### Política de pago

- **Mes 1:** 100% anticipado (no reembolsable tras activación).
- **Mes 2+:** anticipado el día de billing.
- **Clientes con 3+ meses historial:** pueden negociar crédito a 15 días.
- **Ticket >$2K/mes:** contrato anual con descuento 10%, facturado mensual.

### Condiciones por proyecto puntual (no retainer)

- 50% anticipo para iniciar (no reembolsable tras envío del brief al creador).
- 50% saldo contra entrega final aprobada.
- Plazo del 50% saldo: **48 horas** tras aprobación escrita del cliente.
- Si supera 48h: recordatorio Jarvis → 72h recordatorio Brian → 5 días escalamiento Alexander.

### KPIs proceso facturación

- **% facturas cobradas sin fricción:** meta 90%
- **% facturas vencidas:** meta <5%
- **DSO:** meta ≤15 días

### Fricciones típicas

| Fricción | Solución |
|---|---|
| Pago rechazado tarjeta | Reintento automático, fallback a transferencia, Alexander llama si persiste |
| Cliente pide descuento "porque aún no ve resultados" (mes 2) | No bajar precio. Ofrecer 1 pieza extra gratis como "investment in your success" |
| Cliente pide split payment | Solo aprobado por Brian. Máximo 2 cuotas, segunda a 15 días. |
| Cliente USA con ITIN pide factura con IVA | Brian emite invoice Infiny Group (NIT Colombia) con cláusula de servicios exportados (IVA 0%) |

---

## 4. Proceso de pago a creadores (idempotencia)

### Principios

1. **Idempotencia:** cada pago tiene `payment_id` único. Nunca duplicar pagos por reintento.
2. **Trazabilidad:** cada pago loggea en Supabase `creator_payments` con: proyecto, creador, fecha, monto, método, referencia externa, estado.
3. **Anticipo / saldo separados:** el anticipo (50%) y el saldo (50%) son dos pagos distintos con IDs distintos.

### Flujo

**Al confirmar asignación del proyecto:**
1. Diana crea registro `deliveries` en Supabase.
2. Supabase inserta `creator_payments` con:
   - `payment_id=uuid()`
   - `delivery_id={id}`
   - `type='advance'`
   - `amount=50%`
   - `status='pending'`
3. Brian ejecuta transferencia (Bancolombia / Wise / PayPal).
4. Marca `status='paid'`, `external_ref={id_transferencia}`, `paid_at=now()`.

**Al aprobar entrega final del cliente:**
1. Diana marca `deliveries.status='approved'`.
2. **Esperar cobro del saldo al cliente** (ver sección 3).
3. Una vez el cliente paga: Brian crea segundo registro `creator_payments` con `type='final'`, `amount=50%`.
4. Transferencia al creador dentro de **24-48h** de recibido el saldo.
5. Marca `status='paid'`.

### Regla de idempotencia

**Antes de ejecutar cualquier transferencia**, Brian verifica:
```sql
SELECT * FROM creator_payments
WHERE delivery_id = :delivery_id
AND type = :type
AND status = 'paid';
```

Si hay resultado → **NO transferir**. Si hay row con `status='pending'` pero sin `external_ref` → verificar manualmente antes de reintentar.

### Descuentos contractuales automáticos

- **Retraso sin aviso 24h previo:** descuento 10% por día.
- **Video grado C rechazado:** creador pierde anticipo (después de 5 días hábiles sin solución).
- **Calidad técnica inaceptable (no pasa QA Diana):** devolución sin pago hasta cumplir estándar.

### Métodos por creador

| Ubicación creador | Métodos preferidos |
|---|---|
| Colombia | Bancolombia, Nequi, Daviplata (sin comisión) |
| México / Argentina / LATAM | Wise, PayPal Business |
| USA | Zelle, Wise, Payoneer |
| Otros | PayPal, Wise |

### Compliance tributario (Colombia)

- Creadores persona natural con RUT: requieren factura electrónica para proyectos >$500 USD/mes.
- Creadores sin RUT: cuenta de cobro firmada. Retención fuente según Decreto 1625/2016.
- Pagos a extranjeros: no aplica retención fuente Colombia.
- Brian mantiene archivo de facturas/cuentas de cobro 5 años (obligación tributaria).

---

## 5. MRR, Health Score y métricas SaaS

### Cálculo de MRR activo cobrado (NSM)

```
MRR = SUM(clients.plan_amount)
WHERE clients.status = 'active'
AND clients.last_payment_at >= now() - interval '31 days'
```

Solo cuenta lo **cobrado y activo**. Facturado pero no cobrado no cuenta.

### Árbol de MRR

```
MRR TOTAL
├── NUEVO MRR (new logos)
│   └── Leads × Close rate × Plan promedio
├── MRR EXPANSION (upsells)
│   └── Upgrade Starter→Pro, Starter→Premium, add-ons
└── MRR PERDIDO (-)
    ├── Logo churn (cliente se va)
    └── Revenue churn (downgrade plano)
```

### Health Score por cliente (0-100)

Cálculo semanal automático. Componentes:

| Componente | Peso | Cálculo |
|---|---|---|
| Puntualidad pago | 25% | 100 si pagó a tiempo últimos 3 meses, -20 por cada falla |
| Delivery Health Score interno | 25% | Promedio calificación A/B/C de piezas entregadas (A=100, B=70, C=30) |
| Engagement con reportes | 15% | % de reportes mensuales con respuesta/interacción del cliente |
| NPS | 20% | NPS × 10 (si NPS=8 → 80 puntos) |
| Velocity de feedback | 15% | Tiempo promedio entre entrega y feedback. <24h=100, 24-48h=80, 48-72h=50, >72h=0 |

**Interpretación:**
- **≥80:** cliente saludable, candidato a upsell
- **60-79:** cliente estable, mantener relación
- **40-59:** cliente en riesgo, intervención Diana/Alexander
- **<40:** churn inminente, playbook prevención

### Métricas SaaS principales

- **MRR** (NSM)
- **ARR** = MRR × 12
- **Growth MoM %**
- **Logo Churn %** = clientes perdidos / clientes inicio mes
- **Revenue Churn %** = MRR perdido (churn + downgrade) / MRR inicio mes
- **NRR (Net Revenue Retention)** = (MRR inicio + expansion - churn - downgrade) / MRR inicio. **Target ≥105%** en Q3.
- **CAC** = gasto marketing + ventas / nuevos clientes
- **LTV** = ARPU × margen × meses promedio. Target: $750 × 0.6 × 12 = $5.400
- **LTV/CAC:** target 18x
- **Payback:** target 4-5 meses
- **Gross Margin %:** target ≥55%

### Cálculo de margen bruto

```
Gross Margin % = (Revenue - COGS) / Revenue × 100
COGS incluye:
  - Pagos a creadores
  - Comisiones Stripe/Wise/PayPal
  - Envíos de producto físico
  - Hosting de archivos (Drive/Bunny CDN prorrateado)
NO incluye:
  - Sueldos del equipo (eso es OpEx)
  - Paid ads (eso es CAC)
  - Tooling (eso es OpEx)
```

---

## 6. Política de cobranza y dunning

### Flujo de dunning automático (Jarvis + Stripe)

| Día desde billing | Acción |
|---|---|
| D+0 | Jarvis envía invoice por WhatsApp + email |
| D+2 | Stripe reintento automático #1 |
| D+4 | Stripe reintento automático #2 |
| D+5 | Jarvis envía recordatorio amable por WhatsApp |
| D+7 | Stripe reintento automático #3 |
| D+7 | Brian envía email formal con copia a founder@kreoon.com |
| D+10 | **Pausa de servicio automática.** Cliente marcado `clients.status='suspended'`. Diana deja de producir nuevas piezas. |
| D+10 | Alexander llama personalmente (15 min) |
| D+14 | Segunda llamada Alexander + email con opciones (split payment, downgrade, churn con devolución parcial) |
| D+21 | Si no hay pago: `clients.status='churned'`, cancelación de contrato, campaña win-back programada (día 45 post-churn) |

### Reglas

- **Nunca** cobrar a cliente "por cortesía" sin pago en mano.
- **Nunca** continuar producción durante dunning. Suspender batches pendientes.
- **Siempre** documentar cada contacto en Supabase `collections_log`.
- **Siempre** ofrecer alternativas antes de declarar churn (split payment, downgrade, pausa 1 mes sin cobro).

### Template email D+7

```
Asunto: Factura UGC Colombia — [MES] pendiente

Hola [NOMBRE],

Hemos notado que la factura de [MES] por [MONTO USD] aún no ha sido procesada.
Stripe intentó cobrarla automáticamente 3 veces sin éxito.

Para continuar con la producción del batch de este mes, necesitamos regularizar
el pago antes del [FECHA D+10].

Opciones:
1. Actualizar tu método de pago: [LINK PORTAL STRIPE]
2. Pagar por transferencia directa: [INSTRUCCIONES WISE/MERCURY]
3. Agendar una llamada para conversar: [LINK CALENDLY ALEXANDER]

Quedo atento,
Brian
Finanzas · UGC Colombia
```

---

## 7. Política de churn y reintegro

### Definición de churn

- **Voluntario:** cliente notifica cancelación formal.
- **Involuntario:** 14+ días sin pago tras proceso dunning completo.
- **Downgrade:** cambio a plan menor. Cuenta como revenue churn parcial.

### Política de reintegro

- **Cliente mes 1 (100% anticipado):** NO reembolsable si ya hay briefs enviados a creadores. Si cancelación es pre-brief (<48h de activación): reembolso 80% (penalización 20% por costos administrativos).
- **Cliente mes 2+:** No reembolsable. Se honra el mes en curso, sin renovación.
- **Excepción mala calidad demostrable:** Alexander autoriza caso a caso. Nunca admitir fault sin evidencia.

### Campaña win-back (post-churn)

Jarvis dispara automáticamente:
- **Día 45 post-churn:** "Te extrañamos. ¿Qué tal estuvieron estos 45 días sin UGC?"
- **Día 90 post-churn:** "Casos nuevos que hemos cerrado este trimestre. ¿Volvemos a conversar?"
- **Día 180 post-churn:** oferta de re-entry con primer mes a 50%.

### Métricas churn (monthly review)

- Logo churn rate: **target ≤3% mensual en Q3**
- Revenue churn rate: target ≤4%
- Razón de churn (categorizar): no performance, precio, cambio estrategia interna, producto mejor competidor, relación

---

## 8. Dashboard financiero

### Vista diaria (Brian, 5 min)

- Cobros del día (Stripe + transferencias)
- Facturas vencidas
- Conciliación bancaria Mercury + Bancolombia

### Vista semanal

- Cash flow rolling 13 semanas (prever gaps)
- AR aging (0-15d, 16-30d, 31-60d, >60d)
- Proyección de cobros próximas 2 semanas
- Pagos pendientes a creadores (`creator_payments.status='pending'`)

### Vista mensual (MBR)

- P&L del mes
- MRR inicio vs fin
- Margen bruto por servicio (Starter / Pro / Premium)
- CAC por canal
- NRR, Logo churn, Revenue churn
- Impuestos Colombia (IVA, ICA, renta provisional)
- Payroll equipo
- Burn rate + runway

### KPIs mensuales a reportar al equipo

1. MRR activo cobrado
2. Nuevo MRR del mes
3. MRR perdido del mes
4. Margen bruto %
5. DSO actual
6. % facturas vencidas
7. Cash en cuenta (USD + COP)

---

## 9. Riesgos financieros y mitigación

| # | Riesgo | Prob | Impacto | Mitigación |
|---|---|---|---|---|
| 1 | Cash flow negativo por pago lento USA | Media | Alto | 100% anticipado mes 1, Stripe débito, factor de crédito a $20K MRR |
| 2 | Concentración de clientes (top 3 = >50% MRR) | Media | Crítico | Reportar concentración mensual en MBR, diversificar desde M4 |
| 3 | Fluctuación TRM COP/USD | Alta | Medio | Operar Mercury en USD, liquidar solo payroll Colombia a COP |
| 4 | Chargeback fraudulento de cliente | Baja | Alto | Contrato firmado + entrega documentada + evidencia de aprobación escrita |
| 5 | Impuestos Colombia (IVA servicios digitales USA) | Media | Medio | Asesor tributario mensual, facturación servicios exportados IVA 0% |
| 6 | Fallas Stripe / bloqueo de cuenta | Baja | Crítico | Fallback Wise + PayPal + Mercury directo como plan B |
| 7 | Creador reclama pago doble | Baja | Medio | Idempotencia en `creator_payments` + verificación SQL pre-transferencia |
| 8 | CAC se dispara por sobreinversión paid | Media | Alto | Cap $1K/mes en Meta Ads hasta M4, revisar ROAS semanal |

### Señales de alerta financiera (trigger para Alexander)

- MRR cobrado mes actual < 80% del mes anterior
- 3+ facturas vencidas >15 días simultáneamente
- Health Score promedio cae <60
- Margen bruto <50% dos meses consecutivos
- DSO >20 días
- Cash en cuenta <1x burn mensual

---

## Apéndice — Supuestos de cálculo MRR M12

- 110 clientes × $750 promedio × 1.21 mix premium = **~$100K/mes**
- CAC target $300 → LTV/CAC 18x
- Payback 4-5 meses
- Punto equilibrio ~12 clientes activos ($9K MRR)
- Burn Q2 ≤$8K USD (paid media + tooling + operación mínima)

---

**Fuentes:** `content/sistemas/creadores/04-pricing-guide-latam-usa.md`, `content/sistemas/negocio/okrs-y-metricas.md`, `content/sistemas/onboarding/client-onboarding-flow.md` (Etapa 7 billing + Playbook churn).

**Próxima revisión:** 2026-05-09
