---
slug: samuel-R45
title: "Deploy de Kreoon en 42 segundos — el proceso real"
assigned_creator: samuel@ugccolombia.co
pillar: craft_visible
platform: youtube_shorts
duration_seconds: 42
hook: "Deploy a producción en 42 segundos. Git push. Vercel. Migración. Listo."
category: viral-pack
source_pack: samuel
scenes:
  - id: 1
    time: "0-3s"
    visual: "Terminal con cronómetro digital iniciando en 0:00. Logo Kreoon arriba"
    voice: "Deploy a producción en 42 segundos. Git push. Vercel. Migración. Listo."
    creator_action: "Voz en off rápida, sin cámara"
    editing: "Texto overlay grande Anton: 42 SEGUNDOS REAL. Cronómetro empieza."
    broll:
      - "Terminal con cronómetro"
      - "Logo Kreoon"
  - id: 2
    time: "3-10s"
    visual: "Terminal con git push origin main ejecutándose. Cut a GitHub Actions iniciando con steps"
    voice: "Segundo 0: git push origin main. GitHub Actions dispara CI. Typecheck + tests + build."
    creator_action: "Voz en off, screen recording"
    editing: "Cronómetro visible. Overlay pasos: typecheck → tests → build."
    broll:
      - "Terminal git push"
      - "GitHub Actions log"
      - "Steps animados"
  - id: 3
    time: "10-20s"
    visual: "Split screen: Vercel build log a la izquierda corriendo + Terminal Supabase con migración a la derecha"
    voice: "Segundo 12: CI pasa. Vercel detecta y empieza preview. Lint ok, build ok. Al mismo tiempo, supabase db push corre mi migración si hay cambios de schema."
    creator_action: "Voz en off, screen recording paralelo"
    editing: "Cronómetro siempre visible esquina. Tics verdes en cada paso."
    broll:
      - "Vercel build log"
      - "Terminal supabase db push"
      - "Tics verdes paralelos"
  - id: 4
    time: "20-32s"
    visual: "Playwright headless corriendo 3 flows: login, crear brief, aprobar. Cada paso con tic verde animado"
    voice: "Segundo 28: preview listo. Smoke test automático con Playwright corriendo 3 flows críticos — login, crear brief, aprobar. Si algo falla, bloquea el deploy."
    creator_action: "Voz en off, screen recording"
    editing: "Cada paso con tic verde grande. Overlay: smoke test pass."
    broll:
      - "Playwright corriendo"
      - "3 flows visibles"
      - "Tics verdes"
  - id: 5
    time: "32-40s"
    visual: "Vercel promote screen con botón presionándose. Cut a curl al URL real devolviendo nueva versión"
    voice: "Segundo 39: promote a producción. Vercel cambia el DNS en 3 segundos. URL pública actualizada. 42 segundos end-to-end."
    creator_action: "Voz en off, screen recording"
    editing: "Cronómetro marcando 42s grande. Overlay verde: PROD ✓."
    broll:
      - "Vercel promote screen"
      - "Curl verificando"
      - "Cronómetro 42s"
  - id: 6
    time: "40-42s"
    visual: "Card final con logo + CTA y overlay 3×/día sin miedo"
    voice: "Así shippeo 3 veces al día sin miedo."
    creator_action: "Voz en off cierre"
    editing: "Texto overlay final Anton: 3×/día sin miedo. Música cierra con beat fuerte."
    broll:
      - "End card logo"
      - "CTA prominente"
---

# samuel-R45 — Deploy de Kreoon en 42 segundos — el proceso real

**Tipo:** BTS deploy + velocidad
**Duración:** 42 segundos
**Voz:** Samuel en off + screen recording en tiempo real
**Música:** Electro rápida

---

| Tiempo | Audio / Voz | Visual | Notas de edición |
|--------|-------------|--------|------------------|
| 0-3s | `"Deploy a producción en 42 segundos. Git push. Vercel. Migración. Listo."` | Terminal con cronómetro iniciando en 0:00. | Texto overlay: "42 SEGUNDOS REAL". |
| 3-10s | `"Segundo 0: git push origin main. GitHub Actions dispara CI. Typecheck + tests + build."` | Terminal con `git push`. GitHub Actions iniciando. | Cronómetro visible. Overlay pasos. |
| 10-20s | `"Segundo 12: CI pasa. Vercel detecta y empieza preview. Lint ok, build ok. Al mismo tiempo, supabase db push corre mi migración si hay cambios de schema."` | Vercel build log en vivo. Terminal supabase. | Split screen: Vercel + terminal Supabase. |
| 20-32s | `"Segundo 28: preview listo. Smoke test automático con Playwright corriendo 3 flows críticos — login, crear brief, aprobar. Si algo falla, bloquea el deploy."` | Playwright headless corriendo pasos visibles. | Cada paso con tic verde. |
| 32-40s | `"Segundo 39: promote a producción. Vercel cambia el DNS en 3 segundos. URL pública actualizada. 42 segundos end-to-end."` | Vercel promote a prod. Curl al URL real devolviendo versión nueva. | Cronómetro marcando 42s. |
| 40-42s | `"Así shippeo 3 veces al día sin miedo."` | Card final logo + CTA. | Overlay: "3×/día sin miedo". |

## Prosody ElevenLabs
- `<prosody rate="102%">` base — velocidad deliberada.
- `<emphasis level="strong">` en: "42 segundos", "bloquea el deploy", "sin miedo".
- `<break time="0.2s"/>` entre segundos — ritmo agitado.

## B-roll requerido
- Terminal con cronómetro
- git push en terminal
- GitHub Actions log
- Vercel build log en vivo
- Terminal supabase db push
- Playwright corriendo
- Vercel promote screen
- Curl verificando producción

## Retención loop
Cronómetro visible durante todo el reel obliga a mirar hasta el final. El "3 veces al día sin miedo" es autoridad pura.

## CTA
"Mi GitHub Actions + Vercel config + Playwright smoke tests en mi perfil. Copiar y pegar."

## Por qué funciona
CI/CD visualizado en tiempo real es contenido developer de alto share. Cronómetro = retención natural. Tono Fireship pero con demo real. Devs que tardan 15 minutos en deploy quedan inspirados.
