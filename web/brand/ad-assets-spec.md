# Ad Assets Spec — UGC Colombia

> Especificaciones de creativos pagados para Meta Ads y TikTok Ads.
> Sistema visual: negro + dorado + crema. Arquetipo: Creator + Ruler.
> Para generación de imágenes ver image-prompts.md.

---

## Principios de Creativos UGC Colombia

### La paradoja de la agencia UGC

UGC Colombia vende contenido auténtico — pero sus propios ads deben tener el rigor y la estética de una marca premium. La solución: **ads que se ven como contenido real de la industria**, no como avisos corporativos.

### Los 3 tipos de hook que funcionan para nuestra audiencia

```
1. PAIN HOOK (fundador con fatiga creativa):
   "¿Tu ROAS lleva 3 semanas bajando? Tenemos el diagnóstico."

2. PROOF HOOK (agencia de performance):
   "20 variantes/mes. Entregadas. Testeadas. Reportadas."

3. DIFERENCIACIÓN HOOK (brand manager USA):
   "UGC hispano auténtico. No traducido. No genérico."
```

---

## META ADS

### Formato 1: Feed Image — 1080 × 1080px (1:1)

```
Canvas:       1080 × 1080px
Fondo:        #0A0A0A
Texto en imagen: máx 20% del área (regla Meta)
Safe zone:    54px margen en todos los lados
```

**Estructura visual:**
```
┌─────────────────────────────────┐
│  [OVERLINE TAG — Inter caps]    │  → y: 54–90px
│                                 │
│   IMAGEN/VISUAL CENTRAL         │  → zona 90–700px
│   (creador, set, screenshot)    │
│                                 │
│  ─────────────────────────────  │  → línea dorada
│  [HEADLINE 2–5 palabras]        │  → zona 720–900px
│  Fraunces ExtraBold 48px        │
│                                 │
│  [Logo]    [handle]             │  → y: 920–1026px
└─────────────────────────────────┘
```

**Copy de anuncio (fuera de imagen):**
```
Headline (título):       máx 27 caracteres
Primary text (descripción): máx 125 caracteres (visible sin expandir)
Descripción del link:    máx 27 caracteres
CTA button:              "Más información" / "Reservar" / "Contactar"
```

**Conceptos creativos aprobados:**

| Concepto           | Visual                    | Headline                     |
|--------------------|---------------------------|------------------------------|
| Pain Point         | Creador frustrado ante pantalla vacía | "¿Sin creatividades frescas esta semana?" |
| Proof/Results      | Screenshot dashboard Kreoon con métricas reales | "4.2x ROAS. No promesas." |
| Behind the scenes  | Set real de grabación, Colombia | "Así se produce UGC premium." |
| Comparativo        | Split: agencia genérica vs UGC Colombia | "No somos marketplace." |
| Equipo             | Retrato de Diana/Alexander | "Boutique con caras reales." |

---

### Formato 2: Feed Image — 1080 × 1350px (4:5)

```
Canvas:       1080 × 1350px (más espacio que 1:1, mejor reach)
Safe zone:    54px (horizontal) / 67px (vertical)
```

Mismos principios de diseño que 1:1, pero con zona visual expandida.
Visual ocupa 60% superior, texto en 35% inferior.
Formato recomendado para campañas de prospecting.

---

### Formato 3: Story / Reels — 1080 × 1920px (9:16)

```
Canvas:       1080 × 1920px
UI Meta:      top 14% y bottom 20% reservados
Zona activa:  1080 × 1267px (desde y=269px hasta y=1536px)
```

**Estructura visual para stories:**
```
[y=200px]  Logo horizontal — pequeño, esquina superior izquierda
[y=350px]  HOOK visual — imagen de impacto o texto grande
[y=900px]  VISUAL PRINCIPAL — creador, proceso, resultado
[y=1350px] HEADLINE — Fraunces ExtraBold, 52px, blanco
[y=1500px] CTA BUTTON — rojo #DC2626, Inter SemiBold 18px
```

**Texto en imágenes de stories:**
- Máx 2 líneas de headline
- Nunca texto en los primeros 200px ni últimos 384px

**3 segundos decisivos:** El hook debe estar en el primer frame. Para motion graphics, texto de hook aparece en 0:00–0:03.

---

### Formato 4: Carrusel — 1080 × 1080px (múltiples slides)

```
Slides:       5–10 imágenes
Slide 1:      Hook (pregunta o dato impactante) — debe parar el scroll
Slides 2–4:   Desarrollo del argumento, un punto por slide
Slide penúltimo: Resumen / síntesis visual
Último slide: CTA + logo + handle + URL
```

**Consistencia visual entre slides:**
- Logo en misma posición (top right)
- Numeración "01/07" en top left desde slide 2
- Barra de progreso dorada en borde inferior
- Mismo fondo base por serie

---

### Formato 5: Video Ad — 9:16 (Reels/Stories)

```
Resolución:   1080 × 1920px
Duración:     15–30 segundos (sweet spot para performance)
FPS:          24–30fps
Audio:        Opcional — diseñar para SIN sonido + subtítulos
Safe zone:    misma que stories estática
```

**Estructura de video UGC Colombia (propia):**
```
0:00–0:03  HOOK — texto grande sobre negro o visual de impacto
0:03–0:08  PROBLEMA — articulado en 1 frase visual o voz
0:08–0:20  SOLUCIÓN — proceso/behind-the-scenes/dashboard
0:20–0:28  PRUEBA — número, nombre de cliente, resultado
0:28–0:30  CTA — "Link en bio" / "Reserva tu diagnóstico"
```

**Subtítulos:**
- Font: Inter SemiBold, 22px, blanco con borde negro de 2px
- Posición: zona central-inferior (y=1300–1450px)
- Nunca sobre el CTA button

---

### Especificaciones técnicas Meta Ads

| Formato           | Tamaño máx archivo | Tipos soportados       |
|-------------------|--------------------|------------------------|
| Imagen estática   | 30MB               | JPG, PNG               |
| Video             | 4GB                | MP4, MOV, GIF          |
| Carrusel (imagen) | 30MB por slide     | JPG, PNG               |
| Story estática    | 30MB               | JPG, PNG               |

**Colores seguros para Meta:**
- Todos los colores de la paleta UGC Colombia son seguros
- El rojo `#DC2626` es aprobado — no confunde con interfaz de Meta

---

## TIKTOK ADS

### Formato 1: TopView / In-Feed — 1080 × 1920px (9:16)

```
Canvas:       1080 × 1920px
UI TikTok:
  - Top:    200px (búsqueda, cámara)
  - Bottom: 380px (caption, botones de acción)
  - Right:  200px (like, comment, share, profile)
Zona activa texto: izquierda, desde x=80px hasta x=880px
```

**Zona de composición TikTok (activa):**
```
[y=220px–320px]  Logo/marca pequeño (izq), discreta presencia
[y=320px–800px]  Visual de impacto — creador, acción, resultado
[y=800px–1200px] Texto de soporte — dato o claim (sin exceso)
[y=1200px–1540px] Espacio limpio o elemento de apoyo
```

**Regla de oro TikTok:** El 80% del valor del ad debe estar en el video. Los estáticos funcionan como thumbnails o como ads de catálogo.

---

### Formato 2: Spark Ads (amplificación de orgánico)

```
Usar el post orgánico existente como base
Agregar solo: botón de CTA nativo de TikTok
No modificar el frame visual
Objetivo: amplificar contenido que ya tiene tracción orgánica
```

---

### Formato 3: Collection Ad — 1200 × 628px (thumbnail) + 1080 × 1920px (full)

```
Thumbnail: 1200 × 628px — imagen de producto/servicio principal
Full-screen: 1080 × 1920px — página de destino nativa TikTok
Fondo:        #0A0A0A
```

---

### Especificaciones técnicas TikTok Ads

| Parámetro              | Especificación                                |
|------------------------|-----------------------------------------------|
| Duración video         | 5–60 segundos (recomendado: 15–30s)           |
| Resolución             | Mín. 540 × 960px. Recomendado: 1080 × 1920px |
| Relación de aspecto    | 9:16, 1:1, o 16:9                             |
| Tamaño máx             | 500MB                                         |
| Tipos de archivo       | .mp4, .mov, .mpeg, .avi                       |
| Bitrate                | Mín. 516 Kbps                                 |
| Texto en video         | Máx 20 caracteres (title) + 100 (description) |
| Logo en video          | Máx 1/4 del área del frame                    |

---

## Copy Bank — UGC Colombia Ads

### Headlines (Meta — máx 27 caracteres)

```
"UGC que para el scroll."
"Tu próxima campaña, lista."
"Colombia produce. Tú vendes."
"20 variantes. Una semana."
"Sin más fatiga creativa."
"ROAS 4x. Proceso auditado."
"El UGC que el mercado USA pide."
```

### Primary Text (Meta — máx 125 caracteres visibles)

```
"¿Tus Meta Ads llevan 3 semanas sin mejorar? Nosotros producimos 20 variantes/mes con creadores colombianos pre-validados. Diagnóstico gratis."

"Boutique UGC con tech propia. Briefing, casting, revisión y entrega en una plataforma. No WhatsApp. No Drive. Resultados auditables."

"El mercado hispano de USA no quiere contenido traducido. Quiere autenticidad colombiana. Eso es lo que entregamos."
```

### Hooks de video (primeros 3 segundos)

```
"Si tu ROAS bajó este mes, este video es tuyo."
"La razón por la que el UGC genérico no convierte para marcas hispanas..."
"Así es un set de grabación real de UGC Colombia. Sin filtros."
"Este número lo cambió todo: 4.2x ROAS en 60 días."
```

---

## Checklist de aprobación antes de activar ad

- [ ] Imagen: texto ocupa menos del 20% del área (Meta)
- [ ] Video: subtítulos activos para reproducción sin sonido
- [ ] Hook visual en primeros 3 segundos (video) o elemento de parada (imagen)
- [ ] CTA claro y único
- [ ] Logo visible pero no dominante
- [ ] URL de destino correcta y con UTM configurado
- [ ] Pixel/CAPI configurado para el evento de conversión
- [ ] Variante A y B lista para A/B test

---

_Versión 1.0 — UGC Colombia Brand System_
