# Sistema Operativo de Creadores — UGC Colombia
**Indice Maestro v1.0**
**Agencia:** UGC Colombia (@agenciaugccolombia) | Infiny Group SAS
**Responsable operativo:** Diana Mile
**Direccion estrategica:** Alexander Cast
**Fecha de creacion:** Abril 2026

---

## Proposito del sistema

Este sistema operativo define el proceso completo de gestion del pool de creadores de UGC Colombia: desde que un creador aplica hasta que recibe su pago y queda disponible para el siguiente proyecto. Esta disenado para escalar sin perder calidad, operar en los mercados LATAM y USA Hispanic, y reducir la dependencia de procesos manuales y decisiones no documentadas.

---

## Documentos del sistema

| # | Documento | Responsable de uso | Frecuencia |
|---|-----------|-------------------|------------|
| 01 | Formulario de aplicacion de creadores | Diana Mile | Cada nueva aplicacion |
| 02 | Sistema de scoring A/B/C | Diana Mile | Cada nueva aplicacion + revision 90 dias |
| 03 | Contrato tipo de colaboracion | Alexander Cast / Diana Mile | Cada nuevo creador aprobado |
| 04 | Pricing guide LATAM vs USA | Alexander Cast / Diana Mile | Cada cotizacion a cliente |
| 05 | Briefs tipo por formato (6 formatos) | Diana Mile | Cada proyecto nuevo |
| 06 | Proceso de revision y feedback | Diana Mile | Cada borrador recibido |
| 07 | Dashboard de metricas (specs Supabase) | Alexander Cast (implementacion) | Consulta diaria Diana Mile |

---

## Flujo end-to-end resumido

```
CAPTACION
Creador descubre UGC Colombia (Instagram, referido, LinkedIn)
    |
    v
APLICACION
Completa formulario en Tally/Typeform (doc 01)
    |
    v
SCREENING
Diana Mile aplica scoring (doc 02) en 5-7 dias
    |
    v
ONBOARDING
Aprobado → Contrato firmado (doc 03) → Ingresa al pool
    |
    v
ASIGNACION
Cliente contrata proyecto → Diana asigna creador segun Tier, nicho, disponibilidad
    |
    v
BRIEF Y PRODUCCION
Diana envía brief tipo adaptado (doc 05) → Creador graba y entrega
    |
    v
REVISION
Proceso de feedback 2 rounds (doc 06) → Aprobacion final
    |
    v
ENTREGA Y PAGO
Archivo final al cliente → Pago del saldo al creador → Cierre en dashboard (doc 07)
    |
    v
EVALUACION
Diana califica el proyecto → Score del creador se actualiza → Tier se reevalua cada 90 dias
```

---

## Mercados y tarifas de referencia rapida

Ver documento 04 para el tarifario completo. Referencia ejecutiva:

| Mercado | Video 30s tipico | Video 60s tipico |
|---------|-----------------|-----------------|
| LATAM | USD 150 - 380 | USD 220 - 520 |
| USA | USD 350 - 900 | USD 500 - 1.200 |
| Premium | USD 700 - 1.800 | USD 900 - 2.500 |

Markup de agencia sobre tarifa del creador: 40-60% segun Tier.

---

## Canales operativos

| Funcion | Canal |
|---------|-------|
| Comunicacion con creadores | WhatsApp Business (Diana Mile) |
| Entrega de archivos | Google Drive (carpeta por proyecto) |
| Contratos | PDF firmado por WhatsApp (Ley 527/1999) o firma digital |
| Pagos Colombia | Bancolombia / Nequi / Daviplata |
| Pagos internacionales | Mercury Bank (USD) / Wise / Zelle |
| Base de datos interna | Supabase (tablas creators y projects) |
| Automatizaciones | n8n en dev.kreoon.com |
| Aplicacion de creadores | Tally o Typeform (link desde Instagram bio) |

---

## Politicas clave (resumen ejecutivo)

**Calidad:** Todo borrador pasa por Diana Mile antes de llegar al cliente. Un video tecnicamente deficiente no llega al cliente nunca.

**Revisiones:** 2 rondas incluidas. La tercera se cotiza. El brief manda, no el capricho del cliente.

**Pagos:** 50% anticipo / 50% contra entrega. El creador recibe su pago dentro de 48h de cobrado el saldo al cliente.

**Exclusividad:** 90 dias por categoria de marca despues de entregar el contenido.

**Confidencialidad:** Ningun creador menciona a la marca antes del lanzamiento de la campana.

**Tier:** Se reevalua cada 90 dias o despues de un incidente. Un creador puede subir de Tier C a B o de B a A con historico solido.

---

## Estado del sistema

| Componente | Estado |
|-----------|--------|
| Formulario de aplicacion | Listo para implementar en Tally/Typeform |
| Sistema de scoring | Listo para usar (manual por Diana) |
| Contrato | Listo — revisar con abogado para contratos > USD 1.000 |
| Pricing guide | Activo — revisar precios cada 6 meses |
| Briefs tipo | Listos — adaptar por proyecto |
| Proceso de revision | Activo |
| Dashboard Supabase | Especificacion lista — implementacion pendiente |
