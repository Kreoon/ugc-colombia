# Estrategia SEO Integral — ugccolombia.co

> Agencia boutique UGC + marketing digital. Next.js 15 App Router + Vercel.
> Mercados: LATAM (ES primario) + USA Hispanic (ES/EN secundario).
> Enfoque: SEO clásico + GEO/AEO (Perplexity, ChatGPT Search, Google AI Overviews).
> Fecha: Abril 2026 | Owner: Alexander Cast (@infiny)

---

## 1. Keyword Research

### 1.1 Primarias LATAM (30) — español

Dificultad estimada: B (baja 0-30), M (media 31-55), A (alta 56-80). Volumen = búsquedas/mes aproximadas agregadas LATAM.

| # | Keyword | Intent | Volumen | Dificultad | Cluster |
|---|---|---|---|---|---|
| 1 | agencia ugc colombia | Transaccional | 480 | B | Marca/Servicio |
| 2 | agencia ugc | Transaccional | 2.900 | M | Servicio core |
| 3 | creadores ugc colombia | Transaccional | 320 | B | Servicio core |
| 4 | ugc creator colombia | Transaccional | 390 | B | Servicio core |
| 5 | qué es ugc marketing | Informacional | 1.800 | B | Educativo pillar |
| 6 | contenido generado por usuarios | Informacional | 1.300 | M | Educativo pillar |
| 7 | ugc para marcas | Comercial | 720 | M | Servicio |
| 8 | cuánto cobra un creador ugc | Informacional | 880 | B | Pricing/Educativo |
| 9 | precios ugc colombia | Comercial | 210 | B | Pricing |
| 10 | ugc tiktok colombia | Comercial | 260 | B | Plataforma |
| 11 | videos ugc para instagram | Comercial | 340 | B | Plataforma |
| 12 | agencia marketing digital bogotá | Transaccional | 1.600 | A | Local |
| 13 | agencia contenido digital colombia | Transaccional | 390 | M | Servicio |
| 14 | cómo hacer un video ugc | Informacional | 1.100 | B | Educativo |
| 15 | brief ugc ejemplo | Informacional | 480 | B | Educativo |
| 16 | guion ugc | Informacional | 590 | B | Educativo |
| 17 | ugc vs influencer marketing | Informacional | 720 | M | Comparativo |
| 18 | creator ads meta | Informacional | 880 | M | Paid media |
| 19 | ugc para meta ads | Comercial | 210 | B | Servicio |
| 20 | contenido ugc para ecommerce | Comercial | 320 | M | Vertical |
| 21 | ugc belleza colombia | Comercial | 170 | B | Vertical |
| 22 | ugc fitness colombia | Comercial | 140 | B | Vertical |
| 23 | agencia tiktok colombia | Transaccional | 480 | M | Plataforma |
| 24 | estrategia de contenido redes sociales | Informacional | 2.400 | A | Educativo pillar |
| 25 | plataforma ugc | Comercial | 390 | M | Comparativo |
| 26 | contratar creadores de contenido | Transaccional | 590 | M | Servicio |
| 27 | video testimonial para marca | Comercial | 260 | B | Servicio |
| 28 | producción de reels para marcas | Comercial | 210 | B | Servicio |
| 29 | marketing de influencia vs ugc | Informacional | 320 | M | Comparativo |
| 30 | agencia ugc latam | Transaccional | 170 | B | Regional |

### 1.2 Secundarias USA Hispanic (15) — ES/EN

| # | Keyword | Intent | Volumen | Dificultad |
|---|---|---|---|---|
| 1 | ugc agency latino market | Transaccional | 260 | M |
| 2 | hispanic ugc creators | Transaccional | 320 | M |
| 3 | spanish ugc content | Comercial | 210 | B |
| 4 | agencia ugc estados unidos hispano | Transaccional | 110 | B |
| 5 | bilingual ugc creators | Comercial | 170 | B |
| 6 | latino content creators for brands | Comercial | 390 | M |
| 7 | ugc en español para marcas usa | Comercial | 90 | B |
| 8 | nearshoring ugc latam | Comercial | 70 | B |
| 9 | ugc creator spanish speaking | Comercial | 140 | B |
| 10 | hispanic market content marketing | Informacional | 480 | A |
| 11 | ugc agency miami | Transaccional | 320 | A |
| 12 | tiktok creators latino usa | Comercial | 260 | M |
| 13 | creator economy latam | Informacional | 390 | M |
| 14 | ugc rates latam vs us | Informacional | 90 | B |
| 15 | affordable ugc creators | Comercial | 720 | A |

---

## 2. Arquitectura de URLs (sitemap propuesto)

Estructura flat con subcarpetas semánticas, i18n via `/en` para mercado US.

```
/                                          # Home ES
/en                                         # Home EN
/servicios                                  # Hub de servicios
/servicios/ugc-creators                     # Pilar servicio 1
/servicios/ugc-para-meta-ads                # Servicio 2
/servicios/video-testimoniales              # Servicio 3
/servicios/estrategia-contenido-redes       # Servicio 4
/servicios/gestion-creadores-tiktok         # Servicio 5
/casos                                      # Hub de casos
/casos/[slug]                               # Caso individual
/blog                                       # Hub blog
/blog/[slug]                                # Artículo
/blog/categoria/[cat]                       # Categoría
/recursos                                   # Hub lead magnets
/recursos/brief-ugc-plantilla
/recursos/calculadora-pricing-ugc
/sobre                                      # Sobre la agencia
/equipo                                     # Equipo/creators destacados
/creators                                   # Aplicar como creator
/discovery-call                             # CTA conversión principal
/precios                                    # Paquetes/tarifas
/industrias                                 # Hub verticales
/industrias/ecommerce
/industrias/belleza
/industrias/fitness-wellness
/industrias/saas
/contacto
/legal/privacidad
/legal/terminos
/en/services/*                              # Espejo EN para US Hispanic
```

**Reglas**:
- Slugs en español con guiones, sin stop-words innecesarias.
- Canonical auto por `generateMetadata` en cada `page.tsx`.
- `hreflang` `es-co`, `es-419`, `es-us`, `en-us` vía `alternates.languages`.

---

## 3. Páginas prioritarias (sprint inicial)

### P0 — Semana 1-2
1. **Home (`/`)** — H1: "Agencia UGC en Colombia para marcas LATAM y US Hispanic". Target: `agencia ugc colombia`, `agencia ugc`. 1.500 palabras. Schema: Organization + WebSite + FAQPage.
2. **Discovery Call (`/discovery-call`)** — conversión. Form + Cal.com embed. Schema: ContactPage + FAQPage. No-index optional: index (captura `agendar llamada ugc`).
3. **Servicios hub (`/servicios`)** — overview de 5 servicios. Schema: Service (ItemList).

### P0 — Semana 3-4
4. **`/servicios/ugc-creators`** — pilar. Target: `creadores ugc colombia`, `contratar creadores de contenido`. 2.000 palabras. Schema: Service + FAQPage + Offer.
5. **`/servicios/ugc-para-meta-ads`** — Target: `ugc para meta ads`, `creator ads meta`. 1.800 palabras.
6. **`/servicios/video-testimoniales`** — Target: `video testimonial para marca`.
7. **`/servicios/estrategia-contenido-redes`** — Target: `estrategia de contenido redes sociales`.
8. **`/servicios/gestion-creadores-tiktok`** — Target: `agencia tiktok colombia`.

### P1 — Mes 2
9. **Casos hub (`/casos`)** — mínimo 4 casos reales con métricas (ROAS, CPA, views, CTR). Schema: CaseStudy (Article + ItemList).
10. **Sobre (`/sobre`)** — E-E-A-T. Bio Alexander Cast, equipo, proceso, valores. Schema: Organization + Person.
11. **Precios (`/precios`)** — Target: `precios ugc colombia`, `cuánto cobra un creador ugc`. Tablas comparativas. Schema: Offer + FAQPage.
12. **Blog hub (`/blog`)** — primeros 5 artículos del cluster educativo.

### P1 — Mes 2-3
13. **Industrias** (4 páginas): ecommerce, belleza, fitness, SaaS.
14. **`/en`** home + 2 servicios traducidos para US Hispanic.
15. **Recursos** — brief UGC plantilla + calculadora pricing (lead magnets con tráfico orgánico alto).

---

## 4. Schema Markup (JSON-LD)

Todos los schemas inyectados vía `<script type="application/ld+json">` en Server Components usando el App Router.

### 4.1 Organization (global, en root layout)

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "UGC Colombia",
  "alternateName": "Agencia UGC Colombia",
  "url": "https://ugccolombia.co",
  "logo": "https://ugccolombia.co/logo.png",
  "founder": {
    "@type": "Person",
    "name": "Alexander Cast",
    "sameAs": ["https://www.linkedin.com/in/alexandercast", "https://instagram.com/infiny"]
  },
  "foundingDate": "2024",
  "areaServed": ["CO", "MX", "AR", "CL", "PE", "US"],
  "sameAs": [
    "https://instagram.com/agenciaugccolombia",
    "https://tiktok.com/@agenciaugccolombia",
    "https://linkedin.com/company/ugc-colombia"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "email": "founder@kreoon.com",
    "contactType": "sales",
    "availableLanguage": ["Spanish", "English"]
  }
}
```

### 4.2 Service (cada `/servicios/*`)

```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "UGC Creators para Meta Ads",
  "provider": { "@type": "Organization", "name": "UGC Colombia" },
  "areaServed": ["CO", "US", "MX"],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Paquetes UGC",
    "itemListElement": [
      { "@type": "Offer", "name": "Starter 5 videos", "price": "890", "priceCurrency": "USD" }
    ]
  },
  "audience": { "@type": "BusinessAudience", "audienceType": "DTC brands, ecommerce" }
}
```

### 4.3 Article (blog posts)

`Article` con `author.Person` (E-E-A-T), `datePublished`, `dateModified`, `image`, `headline`, `wordCount`, `inLanguage`.

### 4.4 FAQPage (home, servicios, precios, blog posts largos)

Mínimo 5 preguntas por página. Las preguntas deben coincidir con búsquedas reales (People Also Ask).

### 4.5 BreadcrumbList (toda página > 1 nivel)

Componente `<Breadcrumbs>` server-side que emite JSON-LD automático.

### 4.6 Adicionales recomendados

- **VideoObject** en casos y páginas con reels embebidos.
- **Review / AggregateRating** cuando haya 5+ testimonios con ratings.
- **HowTo** en tutoriales del blog (ej. "Cómo hacer un brief UGC").
- **LocalBusiness** solo si se define sede física en Bogotá.

---

## 5. Estrategia GEO/AEO (AI Search)

Objetivo: ser citados como fuente en respuestas de Perplexity, ChatGPT Search, Google AI Overviews, Claude, Gemini y You.com.

### 5.1 Principios de redacción AEO

1. **Respuesta directa en los primeros 60 palabras** de cada página (pattern: "UGC Colombia es una agencia boutique que... Ofrecemos X, Y, Z. Precios desde $X.").
2. **Definiciones claras y citables** — cada artículo pilar arranca con una definición de 1-2 frases que un LLM pueda extraer literalmente.
3. **Datos propios + cifras** — los LLMs priorizan contenido con estadísticas únicas. Publicar 1 "State of UGC LATAM" anual con datos propios.
4. **Formato Q&A explícito** — secciones `## ¿Qué es X?`, `## ¿Cuánto cuesta X?`, `## ¿Cómo funciona X?`.
5. **Listas y tablas estructuradas** — los parsers de AI Overviews favorecen HTML semántico (`<table>`, `<ol>`, `<dl>`).
6. **Fechas visibles** — "Actualizado: Abril 2026" al inicio de cada artículo (freshness signal).
7. **Autor con bio y credenciales** — Alexander Cast como autor con schema `Person`, LinkedIn, menciones de prensa.

### 5.2 Tácticas específicas por motor

| Motor | Táctica |
|---|---|
| **Perplexity** | Indexa rápido contenido con citas externas. Enlazar a fuentes .edu, .gov, reportes (HubSpot, Statista). Agregar `<cite>`. |
| **ChatGPT Search** | Prioriza dominios con menciones en Reddit, Quora, LinkedIn. Sembrar respuestas en r/marketing, r/Colombia, foros hispanos. |
| **Google AI Overviews** | Depende de SERPs tradicionales + featured snippets. Optimizar párrafos de 40-60 palabras respondiendo la query exacta. |
| **Gemini/Bard** | Favorece YouTube. Crear canal con 1 video corto por cluster y embeber en la página correspondiente (VideoObject schema). |
| **Claude (web)** | Crawlea menos; foco en contenido de autoridad muy bien estructurado con encabezados jerárquicos claros. |

### 5.3 Ingeniería de prompts inversa

Simular las 50 preguntas más probables que un prospecto haría a ChatGPT ("¿cuál es la mejor agencia ugc en Colombia?", "¿cuánto cobra un ugc creator latino?", "agencia ugc bilingüe para marcas de USA"). Crear una página o sección que responda literalmente cada una en formato Q&A con FAQPage schema.

### 5.4 llms.txt

Publicar `/llms.txt` y `/llms-full.txt` en la raíz describiendo la agencia, servicios y URLs prioritarias para entrenamiento de LLMs (estándar emergente adoptado por Anthropic/Perplexity).

---

## 6. Plan de Contenido SEO — 20 Clusters

Cada cluster = 1 pillar (2.500-4.000 palabras) + 3-5 supporting posts (1.200-1.800 palabras) con enlaces internos cruzados.

### Cluster 1 — UGC Fundamentos
- Pillar: **Qué es UGC marketing: guía completa 2026**
- S1: Qué es un UGC creator y qué hace
- S2: UGC vs contenido tradicional de marca
- S3: Tipos de contenido UGC (unboxing, testimonial, tutorial, lifestyle)
- S4: Historia del UGC y evolución 2020-2026

### Cluster 2 — UGC vs Influencers
- Pillar: **UGC vs Influencer Marketing: diferencias y cuándo usar cada uno**
- S1: Cuánto cuesta un influencer vs un UGC creator
- S2: Micro-influencers vs UGC creators
- S3: ROI comparativo UGC vs influencer
- S4: Casos donde UGC gana a influencer (DTC, performance)

### Cluster 3 — Pricing UGC
- Pillar: **Cuánto cuesta el UGC en Colombia y LATAM: tarifas 2026**
- S1: Precios UGC Colombia por tipo de video
- S2: Pricing UGC LATAM vs USA comparativa
- S3: Cómo negociar con un UGC creator
- S4: Modelos de pago: fijo, por performance, híbrido
- S5: Calculadora de presupuesto UGC

### Cluster 4 — UGC para Meta Ads
- Pillar: **UGC para Meta Ads: la guía de creator ads que convierten**
- S1: Mejores formatos UGC para Facebook Ads
- S2: Testing de creativos UGC en Meta
- S3: Métricas para evaluar UGC en paid
- S4: Whitelisting y partnership ads

### Cluster 5 — UGC para TikTok
- Pillar: **UGC para TikTok: estrategia completa para marcas LATAM**
- S1: TikTok Spark Ads con UGC
- S2: Tendencias TikTok 2026 para marcas
- S3: Algoritmo TikTok y contenido UGC
- S4: TikTok Shop + UGC

### Cluster 6 — Briefs y Producción
- Pillar: **Cómo hacer un brief UGC perfecto (con plantilla gratis)**
- S1: Brief UGC plantilla descargable
- S2: Guion UGC: estructura ganadora
- S3: Errores comunes al briefear creators
- S4: Revisión y feedback a creators

### Cluster 7 — Encontrar Creators
- Pillar: **Cómo encontrar y contratar UGC creators en Colombia**
- S1: Plataformas para encontrar UGC creators
- S2: Agencia vs marketplace vs directo
- S3: Checklist para evaluar un creator
- S4: Contrato UGC plantilla

### Cluster 8 — UGC Ecommerce
- Pillar: **UGC para ecommerce: cómo aumentar conversión con contenido real**
- S1: UGC en páginas de producto
- S2: UGC en email marketing
- S3: UGC en retargeting
- S4: Shopify + UGC integraciones

### Cluster 9 — UGC Belleza y Skincare
- Pillar: **UGC para marcas de belleza en Colombia**
- S1: Transition videos skincare
- S2: GRWM para marcas de maquillaje
- S3: Antes y después: legal y ético
- S4: Top UGC creators belleza LATAM

### Cluster 10 — UGC Fitness/Wellness
- Pillar: **UGC para marcas fitness y wellness**
- S1: Video transformación fitness
- S2: UGC para suplementos
- S3: UGC para apps fitness
- S4: Compliance y claims de salud

### Cluster 11 — UGC SaaS/B2B
- Pillar: **UGC para SaaS y B2B: sí funciona**
- S1: Screen-recording UGC para SaaS
- S2: Testimoniales B2B en video
- S3: LinkedIn UGC para B2B

### Cluster 12 — Creator Economy LATAM
- Pillar: **Creator economy en LATAM 2026: reporte UGC Colombia**
- S1: Estadísticas creator economy Colombia
- S2: Top nichos UGC en México, Argentina, Chile
- S3: Fiscalidad del creator en LATAM

### Cluster 13 — Mercado US Hispano
- Pillar: **Marketing hispano en USA con UGC bilingüe**
- S1: Por qué el hispanic market necesita UGC en español
- S2: Bilingual UGC creators para marcas americanas
- S3: Nearshoring: LATAM como hub UGC para USA

### Cluster 14 — Estrategia de Contenido
- Pillar: **Estrategia de contenido en redes sociales para marcas 2026**
- S1: Calendario editorial ejemplo
- S2: Pilares de contenido
- S3: TOFU MOFU BOFU en social

### Cluster 15 — Performance Creative
- Pillar: **Performance creative: del UGC al scroll-stopping ad**
- S1: Hooks UGC que funcionan
- S2: CTAs en video UGC
- S3: Iteración creativa semanal

### Cluster 16 — Medición y Analytics
- Pillar: **Cómo medir el ROI del UGC**
- S1: KPIs de UGC
- S2: Atribución UGC en GA4
- S3: Dashboards de creativos

### Cluster 17 — Legal UGC
- Pillar: **Contratos, derechos y uso de UGC: guía legal LATAM**
- S1: Cesión de derechos
- S2: Whitelisting legal
- S3: Uso cruzado de contenido

### Cluster 18 — Herramientas UGC
- Pillar: **Stack de herramientas para UGC creators y agencias**
- S1: Editores de video móviles
- S2: Apps de teleprompter
- S3: Iluminación DIY para UGC

### Cluster 19 — IA + UGC
- Pillar: **Inteligencia artificial en UGC: qué automatizar y qué no**
- S1: IA para guiones UGC
- S2: Detección de IA en contenido
- S3: UGC híbrido humano + IA

### Cluster 20 — Casos de Éxito
- Pillar: **20 casos de éxito de UGC en marcas LATAM**
- S1: Caso ecommerce moda
- S2: Caso app fintech
- S3: Caso DTC belleza
- S4: Caso SaaS B2B

**Ritmo**: 2 pillars/mes + 4 supporting/mes = 6 artículos/mes. 12 meses para completar los 20 clusters (~120 artículos totales).

---

## 7. Technical SEO Checklist — Next.js 15 App Router

### 7.1 Metadata API

- [ ] `generateMetadata` en cada `page.tsx` con `title`, `description`, `openGraph`, `twitter`, `alternates.canonical`, `alternates.languages`.
- [ ] `metadataBase` en `app/layout.tsx` apuntando a `https://ugccolombia.co`.
- [ ] Template de título: `%s | UGC Colombia`.
- [ ] Descripciones únicas por página, 140-158 caracteres.

```ts
// app/servicios/ugc-creators/page.tsx
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Creadores UGC en Colombia para Marcas LATAM y US",
    description: "Conectamos tu marca con creadores UGC verificados en Colombia...",
    alternates: {
      canonical: "/servicios/ugc-creators",
      languages: { "es-CO": "/servicios/ugc-creators", "en-US": "/en/services/ugc-creators" }
    },
    openGraph: { type: "website", images: ["/og/ugc-creators.png"] }
  };
}
```

### 7.2 sitemap.ts

- [ ] `app/sitemap.ts` dinámico que lea rutas estáticas + slugs MDX/CMS de blog y casos.
- [ ] Prioridades: home 1.0, servicios 0.9, blog pillars 0.8, supporting 0.6.
- [ ] `changeFrequency` real (weekly blog, monthly servicios).
- [ ] Sitemap index si >1.000 URLs.

### 7.3 robots.ts

```ts
// app/robots.ts
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/api/", "/admin/"] },
      { userAgent: "GPTBot", allow: "/" },
      { userAgent: "PerplexityBot", allow: "/" },
      { userAgent: "ClaudeBot", allow: "/" },
      { userAgent: "Google-Extended", allow: "/" }
    ],
    sitemap: "https://ugccolombia.co/sitemap.xml",
    host: "https://ugccolombia.co"
  };
}
```

### 7.4 OG Images dinámicas con `next/og`

- [ ] `app/opengraph-image.tsx` global con marca.
- [ ] OG por sección: `app/servicios/[slug]/opengraph-image.tsx` con título dinámico + gradient + logo.
- [ ] `twitter-image.tsx` 1200x628, summary_large_image.
- [ ] Probar con opengraph.xyz antes de deploy.

### 7.5 Core Web Vitals

- [ ] `next/image` en TODAS las imágenes. `priority` en LCP (hero home + hero servicios).
- [ ] `sizes` responsive obligatorio. Formatos AVIF/WebP automáticos.
- [ ] `next/font` con Google Fonts local + `display: swap`. Subset `latin` + `latin-ext`.
- [ ] Scripts de terceros con `next/script` estrategia `lazyOnload` (GA4, Meta Pixel, Hotjar).
- [ ] Preload de fuentes críticas y CSS por encima del fold.
- [ ] Route-level Suspense boundaries para datos no críticos.
- [ ] Objetivo: LCP <2.0s, INP <180ms, CLS <0.05. Medir con Vercel Speed Insights.

### 7.6 Otros

- [ ] `app/not-found.tsx` customizada con enlaces a top páginas (recupera link juice de 404).
- [ ] `app/error.tsx` y `app/global-error.tsx`.
- [ ] Trailing slash consistente (sin trailing slash recomendado, `trailingSlash: false`).
- [ ] Redirects 301 en `next.config.ts` para URLs viejas si hay migración.
- [ ] `Content-Security-Policy` headers sin bloquear bots.
- [ ] HTTPS forzado (Vercel default).
- [ ] `generateStaticParams` para blog/casos → SSG, ISR con `revalidate: 3600`.
- [ ] Evitar `'use client'` en páginas SEO-críticas. Render server-side puro.
- [ ] Vercel Speed Insights + Analytics activados.
- [ ] Google Search Console + Bing Webmaster verificados (meta tag en layout).
- [ ] `structured data` testado en Rich Results Test y Schema.org Validator.

---

## 8. Link Building — 10 Tácticas Realistas

1. **Directorios de agencias LATAM**: Clutch, Sortlist, DesignRush, AgenciaSEO.co, Merca2.0. Perfil completo con portfolio y reviews.
2. **Guest posting en medios de marketing hispanos**: Merca2.0, Roastbrief, PuroMarketing, Marketing4eCommerce, Marketing Directo, Reason Why. Pitch: tendencias UGC LATAM 2026 con datos propios.
3. **Podcast circuit**: participar en 12 podcasts/año de emprendimiento y marketing LATAM (Libros para Emprendedores, Casos y Cosas, Emprendedores Digitales). Backlinks desde show notes.
4. **HARO / Qwoted / Help a B2B Writer**: responder 3 queries/semana como experto en UGC y creator economy. Backlinks de Forbes, Inc, Entrepreneur.
5. **Reportes originales con PR**: publicar "State of UGC LATAM 2026" con 500 encuestas a creators. Pitchar a medios como exclusiva. Los reportes son imanes de backlinks.
6. **Intercambio con herramientas complementarias**: integraciones y menciones cruzadas con plataformas tipo Aspire, Insense, Influencity, Metricool (listados tipo "Top agencias UGC para usar con X").
7. **Alianzas con universidades**: webinars y masterclasses gratuitas en programas de marketing digital (Politécnico Grancolombiano, Uniandes, Tec de Monterrey, ITAM). Backlinks `.edu`.
8. **Wikipedia y Wikidata**: crear entrada de Alexander Cast en Wikidata con referencias a prensa. Mejora E-E-A-T y entidades en Knowledge Graph.
9. **LinkedIn newsletter + artículos**: publicar en LinkedIn 1 artículo largo/mes con link a ugccolombia.co. Los artículos de LinkedIn indexan en Google.
10. **Cases submissions**: enviar casos de éxito a publicaciones como Contagious, Marketing Dive, AdAge LatAm, Reportes de Meta (Meta Success Stories). Backlinks de altísima autoridad.

**Meta anual**: 60-80 backlinks de dominios únicos (DR>30 mínimo 40 de ellos).

---

## Roadmap resumido 90 días

| Semana | Entregables |
|---|---|
| 1-2 | Setup técnico Next.js, sitemap/robots, schema Organization, home + discovery-call, Search Console. |
| 3-4 | 5 páginas de servicios con schema Service + FAQPage, OG images dinámicas. |
| 5-6 | Sobre, precios, 4 casos, blog hub + primeros 2 pillars (Cluster 1 y 3). |
| 7-8 | 4 industrias, `/en` home + 2 servicios, llms.txt, 4 supporting posts. |
| 9-10 | Cluster 2 pillar, 5 supporting, alta en 10 directorios, primeros guest posts. |
| 11-12 | Reporte "State of UGC LATAM" lanzado con PR, Speed Insights review, auditoría Core Web Vitals. |

---

Documento vivo. Revisión trimestral con datos de GSC, Ahrefs y Vercel Analytics.
