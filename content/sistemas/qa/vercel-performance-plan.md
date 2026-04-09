# Plan de Performance Vercel — ugccolombia.co

> **Stack**: Next.js 15 (App Router) + Vercel Fluid Compute + Node.js 24
> **Targets**: LCP <1.5s · INP <150ms · CLS <0.05 · TTFB <200ms · Lighthouse 100 · First Load JS <100KB
> **Fecha**: 2026-04-08

---

## 1. Rendering Strategy por Ruta

| Ruta | Estrategia | Razon | Revalidate |
|---|---|---|---|
| `/` (home) | **Static + ISR** | Landing hero, cambia semanalmente | `revalidate = 3600` |
| `/servicios/[slug]` | **Static (SSG)** | Catalogo fijo, genera en build | `generateStaticParams` |
| `/casos/[slug]` | **ISR con tag** | Casos de estudio editables desde CMS | `cacheTag('case-'+slug)` |
| `/blog/[slug]` | **ISR con tag** | SEO-critical, refresh on publish | `cacheTag('post-'+slug)` |
| `/contacto` | **Static** | Formulario con Server Action | - |
| `/api/lead` | **Dynamic (Node)** | Server Action/Route Handler para captura | - |
| `/api/og/[...]` | **Edge-cacheable** | `next/og` con `Cache-Control` largo | `s-maxage=31536000` |
| `/sitemap.xml` | **ISR** | Se regenera al publicar | `revalidate = 3600` |

**Regla de oro**: todo contenido de marketing = `'use cache'` + tags. Nada de SSR puro salvo endpoints transaccionales.

```tsx
// app/servicios/[slug]/page.tsx
import { cacheTag, cacheLife } from 'next/cache'

export async function generateStaticParams() {
  const servicios = await getServicios()
  return servicios.map((s) => ({ slug: s.slug }))
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  'use cache'
  const { slug } = await params
  cacheTag(`servicio-${slug}`)
  cacheLife('days')
  const data = await getServicio(slug)
  return <ServicioView data={data} />
}
```

---

## 2. Fluid Compute — Configuracion

```ts
// vercel.ts
import { type VercelConfig } from '@vercel/config/v1'

export const config: VercelConfig = {
  framework: 'nextjs',
  functions: {
    'app/api/lead/route.ts': {
      runtime: 'nodejs24.x',
      memory: 1024,
      maxDuration: 10, // lead capture rapido
    },
    'app/api/cron/reportes/route.ts': {
      runtime: 'nodejs24.x',
      memory: 2048,
      maxDuration: 300, // reportes pesados
    },
    'app/api/og/[...slug]/route.tsx': {
      runtime: 'nodejs24.x',
      memory: 512,
      maxDuration: 15,
    },
  },
  crons: [
    { path: '/api/cron/reportes', schedule: '0 6 * * 1' }, // lunes 6am
  ],
  headers: [
    {
      source: '/_next/static/(.*)',
      headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
    },
    {
      source: '/api/og/(.*)',
      headers: [{ key: 'Cache-Control', value: 'public, s-maxage=31536000, stale-while-revalidate=86400' }],
    },
  ],
}
```

**Graceful shutdown** para el cron de reportes:

```ts
// app/api/cron/reportes/route.ts
import { after } from 'next/server'

export async function GET(req: Request) {
  // Verifica secret de Vercel Cron
  if (req.headers.get('authorization') !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response('Unauthorized', { status: 401 })
  }

  const reporte = await generarReporteRapido()

  // after() ejecuta trabajo despues del response sin bloquear
  after(async () => {
    await enviarEmailsPesados(reporte)
    await persistirMetricas(reporte)
  })

  return Response.json({ ok: true })
}
```

---

## 3. Caching Strategy (Next.js 16 Cache Components)

```tsx
// lib/data.ts
import { cacheTag, cacheLife } from 'next/cache'

export async function getCasos() {
  'use cache'
  cacheTag('casos')
  cacheLife('hours')
  return db.casos.findMany({ where: { published: true } })
}

export async function getCaso(slug: string) {
  'use cache'
  cacheTag('casos', `caso-${slug}`)
  cacheLife('days')
  return db.casos.findUnique({ where: { slug } })
}
```

**Invalidacion desde Server Action** (ej. cuando publicas un caso desde admin):

```ts
// app/admin/actions.ts
'use server'
import { revalidateTag, updateTag } from 'next/cache'

export async function publicarCaso(slug: string, data: FormData) {
  await db.casos.update({ where: { slug }, data: parse(data) })
  updateTag(`caso-${slug}`) // inmediato en mismo request
  revalidateTag('casos')     // background para listado
}
```

---

## 4. Images — next/image Optimizado

```ts
// next.config.ts
import type { NextConfig } from 'next'

const config: NextConfig = {
  cacheComponents: true, // Next.js 16+ — habilita PPR y 'use cache'
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [360, 640, 828, 1080, 1280, 1920],
    imageSizes: [64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000,
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.ugccolombia.co' },
      { protocol: 'https', hostname: '*.bunnycdn.com' },
    ],
  },
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion', '@radix-ui/react-icons'],
  },
}

export default config
```

```tsx
// app/(marketing)/_components/Hero.tsx
import Image from 'next/image'
import heroImg from '@/public/hero.jpg' // blur automatico

export function Hero() {
  return (
    <section className="relative h-screen">
      <Image
        src={heroImg}
        alt="UGC Colombia - creadores autenticos"
        fill
        priority
        fetchPriority="high"
        sizes="100vw"
        placeholder="blur"
        quality={85}
        style={{ objectFit: 'cover' }}
      />
    </section>
  )
}

// Grid de casos below-the-fold
<Image
  src={caso.thumbnail}
  alt={caso.titulo}
  width={640}
  height={480}
  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
  placeholder="blur"
  blurDataURL={caso.blurHash}
/>
```

**Regla**: `priority` SOLO en el LCP real (1 imagen). Todo lo demas lazy por default.

---

## 5. Fonts — next/font con subset espanol

```tsx
// app/layout.tsx
import { Inter, Playfair_Display } from 'next/font/google'

const inter = Inter({
  subsets: ['latin', 'latin-ext'], // latin-ext cubre acentos espanol completo
  variable: '--font-sans',
  display: 'swap',
  adjustFontFallback: true, // reduce CLS a 0
  preload: true,
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  weight: ['700', '900'],
  preload: true,
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-CO" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
```

```ts
// tailwind.config.ts
theme: {
  extend: {
    fontFamily: {
      sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
      display: ['var(--font-display)', 'Georgia', 'serif'],
    },
  },
}
```

---

## 6. Third-party Scripts (GA4 + Meta Pixel + LinkedIn)

```tsx
// app/layout.tsx
import Script from 'next/script'
import { GoogleAnalytics } from '@next/third-parties/google'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-CO">
      <body>
        {children}

        {/* GA4 optimizado por Vercel */}
        <GoogleAnalytics gaId="G-XXXXXXXXXX" />

        {/* Meta Pixel — lazy, no bloquea INP */}
        <Script
          id="meta-pixel"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
              fbq('init','${process.env.NEXT_PUBLIC_META_PIXEL_ID}');
              fbq('track','PageView');
            `,
          }}
        />

        {/* LinkedIn Insight — lazy */}
        <Script
          id="linkedin-insight"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `
              _linkedin_partner_id="${process.env.NEXT_PUBLIC_LINKEDIN_ID}";
              window._linkedin_data_partner_ids=window._linkedin_data_partner_ids||[];
              window._linkedin_data_partner_ids.push(_linkedin_partner_id);
              (function(l){if(!l){window.lintrk=function(a,b){window.lintrk.q.push([a,b])};window.lintrk.q=[]}var s=document.getElementsByTagName("script")[0];var b=document.createElement("script");b.type="text/javascript";b.async=true;b.src="https://snap.licdn.com/li.lms-analytics/insight.min.js";s.parentNode.insertBefore(b,s)})(window.lintrk);
            `,
          }}
        />
      </body>
    </html>
  )
}
```

**Estrategias** (de mayor a menor prioridad):
- `beforeInteractive` — NUNCA en third-party de analytics
- `afterInteractive` — GA4 (via `@next/third-parties`)
- `lazyOnload` — Meta Pixel, LinkedIn, chat widgets, hotjar

---

## 7. Bundle Analysis & Code Splitting

```bash
# Next.js 16+
npx next experimental-analyze --output
```

**Patrones de dynamic import**:

```tsx
// Componentes pesados below-the-fold
import dynamic from 'next/dynamic'

const Testimonials = dynamic(() => import('./Testimonials'), {
  loading: () => <div className="h-96 animate-pulse bg-neutral-100" />,
})

const VideoPlayer = dynamic(() => import('./VideoPlayer'), {
  ssr: false, // solo si requiere window
})

const CalendlyEmbed = dynamic(() => import('./CalendlyEmbed'), {
  ssr: false,
})
```

**Checklist de bundle**:
- [ ] `optimizePackageImports` para `lucide-react`, `framer-motion`, `date-fns`
- [ ] NO importar `lodash` completo — usa `lodash-es` o nativo
- [ ] NO `moment.js` — usa `date-fns` o `Intl.DateTimeFormat`
- [ ] Tree-shake Radix/Headless UI (ya ES modules)
- [ ] Auditar cada `'use client'` — empujar el boundary lo mas abajo posible
- [ ] Framer Motion solo en componentes interactivos (no en layout)

---

## 8. Edge vs Node — Recomendacion por Ruta

| Ruta | Runtime | Razon |
|---|---|---|
| Todas las pages | **Node (Fluid)** | Cache Components, Prisma, full ecosystem |
| `/api/lead` | **Node (Fluid)** | DB write, email, validation |
| `/api/og/*` | **Node (Fluid)** | `next/og` funciona full en Node 24 |
| `middleware.ts` (v16: `proxy.ts`) | **Node (Fluid)** | Geo routing, A/B, auth — Fluid lo permite |
| `/api/cron/*` | **Node (Fluid)** | Jobs largos, max 300s |

> **Edge runtime ya no se recomienda**. Fluid Compute tiene misma latencia regional, mismos precios, y soporta Node completo. No uses `export const runtime = 'edge'` salvo caso muy especifico.

---

## 9. Vercel OG — Imagenes dinamicas

```tsx
// app/api/og/servicio/[slug]/route.tsx
import { ImageResponse } from 'next/og'

export const alt = 'UGC Colombia'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export async function GET(
  req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  const servicio = await getServicio(slug)

  return new ImageResponse(
    (
      <div style={{
        display: 'flex', flexDirection: 'column', width: '100%', height: '100%',
        background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%)',
        padding: 80, color: 'white', fontFamily: 'Inter',
      }}>
        <div style={{ fontSize: 32, opacity: 0.7 }}>UGC COLOMBIA</div>
        <div style={{ fontSize: 80, fontWeight: 900, marginTop: 40, lineHeight: 1.1 }}>
          {servicio.titulo}
        </div>
        <div style={{ fontSize: 36, marginTop: 24, opacity: 0.8 }}>
          {servicio.tagline}
        </div>
      </div>
    ),
    {
      ...size,
      headers: {
        'Cache-Control': 'public, immutable, s-maxage=31536000, max-age=31536000',
      },
    }
  )
}
```

**Uso en metadata**:

```tsx
// app/servicios/[slug]/page.tsx
export async function generateMetadata({ params }): Promise<Metadata> {
  const { slug } = await params
  const s = await getServicio(slug)
  return {
    title: `${s.titulo} | UGC Colombia`,
    description: s.descripcion,
    openGraph: {
      images: [`https://ugccolombia.co/api/og/servicio/${slug}`],
    },
    twitter: { card: 'summary_large_image' },
  }
}
```

---

## 10. Speed Insights + Analytics

```bash
pnpm add @vercel/speed-insights @vercel/analytics
```

```tsx
// app/layout.tsx
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Analytics } from '@vercel/analytics/next'

export default function RootLayout({ children }) {
  return (
    <html lang="es-CO">
      <body>
        {children}
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  )
}
```

Ambos son cero-config, no impactan CWV (se cargan con `requestIdleCallback`). El dashboard de Vercel mostrara RUM data segmentado por ruta.

---

## 11. Checklist de Validacion Pre-Launch

### Performance
- [ ] `next experimental-analyze` — First Load JS <100KB en `/`
- [ ] Lighthouse CI en preview deployments (Performance = 100)
- [ ] LCP element identificado y con `priority + fetchPriority="high"`
- [ ] Todas las fonts via `next/font` con `adjustFontFallback`
- [ ] Zero `<img>` nativos (solo `next/image`)
- [ ] Zero `<link rel="stylesheet">` externos (solo `next/font` y CSS modules)
- [ ] Todo third-party con `next/script strategy="lazyOnload"` (salvo GA4)

### Caching
- [ ] Todas las pages de marketing con `'use cache'`
- [ ] Tags definidos para invalidacion (`cacheTag`)
- [ ] `cacheLife` apropiado por tipo de contenido
- [ ] Headers de `Cache-Control` para assets y OG

### Fluid Compute
- [ ] `vercel.ts` con memory/duration por funcion
- [ ] `after()` usado en cron para trabajo post-response
- [ ] `CRON_SECRET` validado en endpoints de cron
- [ ] Node 24 runtime explicito

### SEO/Meta
- [ ] `generateMetadata` en todas las rutas dinamicas
- [ ] OG images dinamicas con cache de 1 ano
- [ ] `sitemap.ts` + `robots.ts` en `app/`
- [ ] `lang="es-CO"` en `<html>`

### Monitoring
- [ ] `@vercel/speed-insights` instalado
- [ ] `@vercel/analytics` instalado
- [ ] Alerts configurados para CWV regressions

---

## 12. Metricas Target vs Estrategia

| Metrica | Target | Como se logra |
|---|---|---|
| **LCP** | <1.5s | Hero image `priority` + AVIF + `adjustFontFallback` + ISR |
| **INP** | <150ms | Server Components por default, `'use client'` minimo, `lazyOnload` third-party |
| **CLS** | <0.05 | `next/font` + dimensiones explicitas en imagenes + skeletons con `min-height` |
| **TTFB** | <200ms | Static/ISR + Fluid Compute en region `gru1` (Sao Paulo, cerca de Colombia) |
| **FCP** | <1.0s | Inline critical CSS (automatico Next.js) + font `display: swap` |
| **First Load JS** | <100KB | Server Components + `optimizePackageImports` + dynamic imports |

---

## 13. Region Recomendada

En `vercel.ts`:

```ts
export const config: VercelConfig = {
  regions: ['gru1'], // Sao Paulo - menor latencia desde Colombia
}
```

> Colombia no tiene region directa. `gru1` (Brasil) da ~80ms RTT vs `iad1` (Virginia) ~100ms. Si tu DB esta en otro lado, alinea la region.

---

**Siguiente paso**: aplicar este plan incrementalmente. Orden sugerido: 1 (rendering) -> 4 (images) -> 5 (fonts) -> 3 (caching) -> 6 (scripts) -> 7 (bundle) -> 10 (monitoring).
