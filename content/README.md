# Contenido Estratégico y Operativo — Índice Maestro

**UGC Colombia — Documentación navegable del conocimiento de la agencia**
Última actualización: 2026-04-08

---

## Para Quién es Cada Documento

Este índice te ayuda a encontrar exactamente lo que necesitas según tu rol.

| Rol | Documentos principales | Frecuencia |
|-----|------------------------|-----------|
| **Alexander** (CEO/Estrategia) | Marca, Posicionamiento, Funnel, Pricing | Mensual |
| **Diana** (Operaciones/Talent) | Sistema creadores, Briefs, Scoring | Diaria |
| **Brian** (Finanzas) | Pricing guide, Pagos creadores | Quincenal |
| **Samuel** (Tech) | Cualquiera que afecte API/DB | Según task |
| **Tanya** (Growth) | LinkedIn, Bios, Funnel, Benchmarks | Semanal |

---

## 1. Sistema de Marca (40% operativo, 60% estratégico)

**Responsable:** Alexander Cast
**Propósito:** Identidad visual + voz + propuesta de valor

### 1.1 Brand Profile Estructurado
**Archivo:** `sistemas/marca/brand-profile.json`
**Qué contiene:**
- Tagline + one-liner
- Arquetipos de marca (Creator + Ruler)
- Valores (autenticidad, sistematización, estándar USA, orgullo latino, transparencia)
- Voz: axis (formal-casual, serio-divertido, etc.)
- Paleta de colores + racional
- Propuesta de valor (tech propia, casting curado, estrategia integrada, bilingüe)
- Audiencia ICP (3 perfiles: Founder D2C LATAM, Brand Manager USA Hispanic, Agencia white-label)
- Objetivos comerciales (meta: $100K USD MRR, 133 clientes, LTV 9 meses)
- Equipo asignaciones

**Para quién:** Alexander (estrategia), Tanya (growth), Brian (proyecciones financieras)
**Frecuencia de consulta:** Mensual (revisión trimestral)
**Acción:** Referencia en todas las decisiones de posicionamiento y pricing

---

### 1.2 Pilares de Contenido Estratégico
**Archivo:** `sistemas/marca/pilares-contenido.md`
**Qué contiene:**
- 6 pilares de contenido que diferenciamos
- Ángulos por pilar (educativo, testimonial, proceso, case study, insight, detrás-de-cámaras)
- Qué contenido no hacemos (promesas vacías, stock photos, cringe)
- Relación con ICP (qué pilar resonará con founder vs brand manager)

**Para quién:** Alexander (estrategia), Tanya (editorial), Diana (brief a creadores)
**Frecuencia:** Revisión trimestral
**Acción:** Guía los temas que producimos y cómo los empaquetamos

---

### 1.3 Posicionamiento Premium
**Archivo:** `sistemas/marca/posicionamiento-premium.md`
**Qué contiene:**
- Por qué no competimos por precio (diferencial de calidad)
- Mensajes de diferenciación vs competencia
- Puntos clave en llamadas de venta
- Proof points (casos de éxito, testimonios de clientes)

**Para quién:** Alexander (cierre), Tanya (nurture copy), Diana (comunicación interna)
**Frecuencia:** Revisión semestral o post-caso-éxito
**Acción:** Referencia en discovery calls y propuestas

---

## 2. Sistema Operativo de Creadores (80% operativo)

**Responsable:** Diana Mile
**Propósito:** Procesos documentados para scaling sin perder calidad

### 2.1 Índice Maestro del Sistema de Creadores
**Archivo:** `sistemas/creadores/00-indice-sistema-operativo-creadores.md`
**Qué contiene:**
- Flujo end-to-end (captación → aplicación → screening → onboarding → asignación → entrega → pago)
- Tabla de documentos (01-07) con responsables y frecuencia
- Definen el "cómo operamos"

**Para quién:** Diana (CEO del sistema), Alexander (oversight), Samuel (automatización)
**Frecuencia:** Consulta diaria (gestión pool)
**Acción:** Punto de entrada para cualquier pregunta sobre creadores

---

### 2.2 Formulario de Aplicación de Creadores
**Archivo:** `sistemas/creadores/01-formulario-aplicacion-creadores.md`
**Qué contiene:**
- Preguntas exactas en Tally/Typeform
- Datos capturados (email, Instagram, niche, followers, city, portfolio URL, rate expectation)
- Cómo fluyen los datos a Supabase `creators` tabla
- Triggers automáticos (notificación a Diana, webhook a n8n)

**Para quién:** Diana (recepción + screening), Samuel (setup form + webhooks)
**Frecuencia:** Cada nueva aplicación
**Acción:** Punto de entrada en el funnel de creadores

---

### 2.3 Sistema de Scoring A/B/C
**Archivo:** `sistemas/creadores/02-sistema-scoring-creadores.md`
**Qué contiene:**
- 5 criterios de scoring (reach, engagement, portfolio quality, communication, rate reasonableness)
- Puntuación por criterio (0-25 puntos cada uno, 0-100 total)
- Thresholds: Tier A (≥80), Tier B (60-79), Tier C (<60)
- Cómo asignar creadores a proyectos según tier + niche + disponibilidad
- Revisión de scoring cada 90 días

**Para quién:** Diana (evaluación), Alexander (oversight de tier A), Samuel (trigger automático en Supabase)
**Frecuencia:** Aplicación nueva + revisión trimestral
**Acción:** Base de todas las decisiones de casting

---

### 2.4 Contrato Tipo de Colaboración
**Archivo:** `sistemas/creadores/03-contrato-colaboracion-creadores.md`
**Qué contiene:**
- Términos estándar (scope, deliverables, exclusividad, NDA, rate, payment terms)
- Secciones por tipo de creador (freelancer vs retainer)
- IP ownership (nosotros retenemos derechos, creador puede usar en portfolio)
- Penalizaciones por incumplimiento

**Para quién:** Alexander (revisión legal), Diana (ejecuta firma), Brian (términos de pago)
**Frecuencia:** Cada nuevo creador aprobado (antes de pagar)
**Acción:** Vinculante, protege a la agencia

---

### 2.5 Pricing Guide LATAM vs USA
**Archivo:** `sistemas/creadores/04-pricing-guide-latam-usa.md`
**Qué contiene:**
- Tarifa por formato (video 15-60s, foto, carousel, script)
- Diferencial LATAM vs USA (USA = +20-30% sobre LATAM)
- Tier del creador afecta tarifa (A = +10% premium, C = rate base)
- Negociación máxima permitida (Diana autoriza hasta -10%, Alexander para más)
- Ejemplos: video 30s, Tier A, USA = $300-400 USD

**Para quién:** Alexander (cierre con clientes), Diana (oferta a creadores), Brian (presupuesto)
**Frecuencia:** Consulta antes de cada proyecto
**Acción:** Base de rentabilidad (margen cliente - pago creador)

---

### 2.6 Briefs Tipo por Formato
**Archivo:** `sistemas/creadores/05-briefs-tipo-por-formato.md`
**Qué contiene:**
- Template brief para 6 formatos (video testimonial, product demo, carousel, thumbnail, script, long-form)
- Campos obligatorios (client brief, ángulo, hook, key message, CTA, tono)
- Referencia visual (screenshots, brand guidelines)
- Ejemplo completado por formato

**Para quién:** Diana (crea brief), creador (recibe brief)
**Frecuencia:** Cada nuevo proyecto
**Acción:** Asegura claridad y reduce iteraciones

---

### 2.7 Proceso de Revisión y Feedback
**Archivo:** `sistemas/creadores/06-proceso-revision-feedback.md`
**Qué contiene:**
- Criterios de aprobación (técnico, creativo, compliance con brand)
- Flujo de feedback (1ª revisión → cambios → 2ª revisión → aprobación/rechazo)
- Máximo 2 rounds de revisión (antes de "rechazado")
- Comunicación a creador (vía Supabase comment o Slack)
- Escalada si cliente rechaza

**Para quién:** Diana (review + feedback), cliente (aprobación final), creador (iteración)
**Frecuencia:** Cada entrega
**Acción:** QA del contenido

---

### 2.8 Dashboard de Métricas de Creadores
**Archivo:** `sistemas/creadores/07-dashboard-metricas-creadores.md`
**Qué contiene:**
- KPIs por creador (entregables por mes, quality score, turnaround time, client satisfaction)
- Cómo se calcula cada métrica (en Supabase views)
- Dashboard en Kreoon (ui/URL)
- Alertas (quality < 7/10, turnaround > 7 days, client complaint)

**Para quién:** Diana (monitoreo diario), Alexander (oversight mensual)
**Frecuencia:** Consulta diaria
**Acción:** Early warning de creadores problemáticos

---

## 3. Captación y Funnel (70% operativo, 30% estratégico)

**Responsable:** Alexander (estrategia) + Tanya (ejecución)
**Propósito:** Llenar el pipeline de leads y convertir a clientes

### 3.1 Funnel Maestro
**Archivo:** `sistemas/captacion/funnel-maestro.md`
**Qué contiene:**
- 5 etapas (awareness, consideration, discovery, proposal, closed)
- Tácticas por etapa (content, email, ads, call, demo)
- Conversion rates objetivo (5% awareness→consideration, 20% consideration→discovery, 30% discovery→proposal, 50% proposal→closed)
- Ciclo de venta típico (10 semanas)
- KPIs por etapa

**Para quién:** Alexander (estrategia de go-to-market), Tanya (ejecuta tácticas), Brian (pipeline revenue)
**Frecuencia:** Revisión mensual + ajuste trimestral
**Acción:** Brújula de todos los esfuerzos de growth

---

### 3.2 Estrategia SEO
**Archivo:** `sistemas/captacion/seo-strategy.md`
**Qué contiene:**
- Keywords objetivo (UGC Colombia, UGC LATAM, UGC white-label, etc.)
- Estructura de contenido (blog, case studies, FAQs)
- On-page optimization (H1, meta, schema markup)
- Link building (partnerships, guest posts)
- Roadmap SEO (Q2-Q4 2026)

**Para quién:** Tanya (ejecución SEO), Alexander (oversight), Samuel (implementación técnica)
**Frecuencia:** Revisión mensual + actualización trimestral
**Acción:** Tráfico orgánico gratuito + autoridad

---

## 4. Canales de Comunicación (100% táctico)

**Responsable:** Tanya (Growth) + Alexander (CEO account)
**Propósito:** Mensajería clara y consistente

### 4.1 Bios y Copy de Canales
**Archivo:** `canales/bios-y-copy.md`
**Qué contiene:**
- Tagline maestra: "Contenido que vende. Equipo latino. Calidad USA."
- Bio exacta por canal (Instagram 150 chars, TikTok 80 chars, LinkedIn 120 chars)
- Límites de caracteres validados
- CTA por canal (link to form, booking, email, etc.)
- Secuencia de bienvenida (email 1, WhatsApp 1, etc.)

**Para quién:** Tanya (ejecución), administrador redes (copy/paste)
**Frecuencia:** Actualización si pivotamos mensaje (trimestral típicamente)
**Acción:** Consistencia en todos los canales

---

### 4.2 LinkedIn — Estrategia de Autoridad de Alexander
**Archivo:** `canales/linkedin-alexander-autoridad.md`
**Qué contiene:**
- Headline personal
- About section
- Pilares de contenido a publicar (insights UGC, case studies, tips operativos)
- Frecuencia (3 posts/semana)
- Engagement strategy (responder comentarios en 2h, DM leads)
- Conversión: LinkedIn → newsletter → discovery call

**Para quién:** Alexander (publicaciones), Tanya (calendarización), Brian (tracking lineal)
**Frecuencia:** Actualización semanal (publishing), revisión mensual (strategy)
**Acción:** Posición de pensamiento + lead generation

---

### 4.3 WhatsApp Business — Sistema
**Archivo:** `canales/whatsapp-business-sistema.md`
**Qué contiene:**
- Número de empresa (verificado)
- Templates de mensajes (welcome, booking reminder, payment notification, etc.)
- Triggers automáticos (via n8n)
- Tono: amigable pero profesional (nada de "mi ciela")
- Compliance: GDPR + TCPA (opt-in tracking)

**Para quién:** Tanya (templates), Samuel (setup n8n), Diana (operaciones)
**Frecuencia:** Actualización de templates según feedback (mensual)
**Acción:** Canal 1-to-1 + notificaciones time-sensitive

---

## 5. Benchmarks y Insights (100% referencia)

**Responsable:** Alexander (curaduría)
**Propósito:** Competitive intelligence + learning

### 5.1 Benchmark Batch A
**Archivo:** `referentes/benchmark-batch-a.md`
**Qué contiene:**
- Análisis de 5-10 competidores directos (UGC agencies, freelancers, in-house teams)
- Qué hacen bien, dónde fallan
- Pricing comparison
- Go-to-market tactics
- Conclusiones: dónde ganamos

**Para quién:** Alexander (estrategia), Tanya (positioning copy)
**Frecuencia:** Revisión trimestral
**Acción:** Mantener awareness competitiva

---

### 5.2 Benchmark Batch B
**Archivo:** `referentes/benchmark-batch-b.md`
**Qué contiene:**
- Análisis de 5-10 agencias inspiracionales (NO competencia directa)
  - Agencias de contenido "premium" (Billo, Insense)
  - Startups VC-backed en tech + media (Peech, Maverick, etc.)
  - Procesos de hiring / onboarding de talento
- Qué podemos copiar / adaptar

**Para quién:** Alexander (innovación), Samuel (procesos), Diana (scaling talent)
**Frecuencia:** Revisión semestral
**Acción:** Ideas para optimizar operaciones

---

### 5.3 Insights Accionables
**Archivo:** `referentes/insights-accionables.md`
**Qué contiene:**
- Datos públicos de industria (Forrester, HubSpot, Adespresso UGC benchmarks)
- Trending in UGC (formato, plataforma, niche, etc.)
- Qué formatos conversan mejor (video testimonial vs product demo, etc.)
- Oportunidades de nicho (e.g., UGC para SaaS, crypto, DTC beauty)

**Para quién:** Alexander (estrategia), Tanya (content calendar), Diana (briefing)
**Frecuencia:** Actualización mensual
**Acción:** Datos para pitch + diferenciación

---

## 6. Auditoría y Análisis

**Responsable:** Tanya (Growth)
**Propósito:** Diagnóstico inicial + learning continuo

### 6.1 Auditoría de Redes Actuales
**Archivo:** `auditoria/auditoria-redes-actuales.md`
**Qué contiene:**
- Análisis de presencia actual (@agenciaugccolombia Instagram, TikTok)
- Engagement rate, follower growth, content themes
- Fortalezas a mantener, debilidades a atacar
- Plan de transición hacia @ugccolombia (objetivo a 12m)

**Para quién:** Tanya (ejecución), Alexander (oversight)
**Frecuencia:** Revisión trimestral
**Acción:** Baseline para medir growth

---

## 7. Editorial y Contenido (100% operativo)

**Responsable:** Tanya (ejecución) + Alexander (estrategia)
**Propósito:** Contenido propio para autoridad + lead generation

### 7.1 Calendario Editorial
**Archivo:** `sistemas/contenido/calendario-editorial.md`
**Qué contiene:**
- 90 días de contenido pre-planeado
- Mix de pilares (educativo, testimonial, case study, insight, detrás-de-cámaras, anuncio)
- Plataformas (LinkedIn, Instagram Reels, TikTok, newsletter Beehiiv)
- Formato (video, carousel, post, documento PDF)
- Status por pieza (draft, en-producción, publicado, repurposed)
- Autor / responsable

**Para quién:** Tanya (calendario), productores (ejecución), Alexander (aprobación)
**Frecuencia:** Planificación semanal, ejecución diaria
**Acción:** Consistencia + autoridad + tráfico orgánico

---

### 7.2 Banco de Hooks
**Archivo:** `sistemas/contenido/banco-hooks.md`
**Qué contiene:**
- 50+ hooks testeados (opening lines que enganchan)
- Organizados por categoría (controversial, statistic, question, story, pattern interrupt)
- Performance (estimated CTR / engagement)
- Ejemplos en contexto (cómo usarlos en LinkedIn post, reel, etc.)

**Para quién:** Creadores (inspiración), Tanya (content), Alexander (coaching)
**Frecuencia:** Actualización cada trimestre (nuevo datos)
**Acción:** Mejora engagement en propio contenido + briefing a creadores

---

### 7.3 Guiones de Lanzamiento
**Archivo:** `sistemas/contenido/10-guiones-lanzamiento.md`
**Qué contiene:**
- Scripts para launches (producto, partnership, rebranding, feature)
- Estructura por formato (video testimonial 30s, LinkedIn post, email, TikTok)
- Variaciones A/B testeadas
- Ejemplos de launches exitosos

**Para quién:** Tanya (lanzamientos), creadores (referencia), Alexander (aprobación)
**Frecuencia:** Actualización post-launch (learning)
**Acción:** Acelera time-to-launch

---

## Estructura de Carpetas (referencia rápida)

```
content/
├── README.md ← Estás aquí
├── auditoria/
│   └── auditoria-redes-actuales.md
├── canales/
│   ├── bios-y-copy.md
│   ├── linkedin-alexander-autoridad.md
│   └── whatsapp-business-sistema.md
├── referentes/
│   ├── benchmark-batch-a.md
│   ├── benchmark-batch-b.md
│   └── insights-accionables.md
└── sistemas/
    ├── marca/
    │   ├── brand-profile.json
    │   ├── pilares-contenido.md
    │   └── posicionamiento-premium.md
    ├── creadores/
    │   ├── 00-indice-sistema-operativo-creadores.md ← Entrada
    │   ├── 01-formulario-aplicacion-creadores.md
    │   ├── 02-sistema-scoring-creadores.md
    │   ├── 03-contrato-colaboracion-creadores.md
    │   ├── 04-pricing-guide-latam-usa.md
    │   ├── 05-briefs-tipo-por-formato.md
    │   ├── 06-proceso-revision-feedback.md
    │   └── 07-dashboard-metricas-creadores.md
    ├── captacion/
    │   ├── funnel-maestro.md
    │   └── seo-strategy.md
    └── contenido/
        ├── calendario-editorial.md
        ├── banco-hooks.md
        └── 10-guiones-lanzamiento.md
```

---

## Cómo Navegar Este Índice

### Si eres Alexander (CEO)
1. Comienza en `sistemas/marca/brand-profile.json` (20 min)
2. Luego `sistemas/captacion/funnel-maestro.md` (funnel)
3. Revisa `referentes/benchmark-*.md` mensualmente

### Si eres Diana (Operaciones)
1. Comienza en `sistemas/creadores/00-indice-sistema-operativo-creadores.md` (es tu mapa)
2. Especialízate en docs 01-07 según donde tengas el cuello
3. Revisa `sistemas/creadores/07-dashboard-metricas-creadores.md` diariamente

### Si eres Tanya (Growth)
1. Comienza en `sistemas/captacion/funnel-maestro.md` (orientación)
2. Luego `sistemas/contenido/calendario-editorial.md` (ejecución)
3. Consulta `canales/*.md` para messaging
4. Revisa `referentes/insights-accionables.md` mensualmente

### Si eres Brian (Finanzas)
1. Consulta `sistemas/creadores/04-pricing-guide-latam-usa.md` (rentabilidad)
2. Revisa `sistemas/marca/brand-profile.json` sección objetivos comerciales

### Si eres Samuel (Tech)
1. Los sistemas de creadores (01-07) te dan contexto operativo
2. El `funnel-maestro.md` te dice qué workflows n8n necesitas
3. El `sistemas/contenido/*` te dice qué APIs necesita el CMS

---

## Mantenimiento de Este Índice

- **Responsable:** Alexander Cast
- **Revisión:** Mensual
- **Actualización:** Cuando se crea nuevo documento o cambia flujo operativo
- **Links:** Verificar que los paths sean correctos (relativo a content/)

---

**Versión 1.0 — Índice Maestro de Contenido UGC Colombia**
Creado: 2026-04-08
Próxima revisión: 2026-05-08
