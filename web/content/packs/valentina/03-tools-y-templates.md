# 03 — Tools y Templates · Valentina Giraldo

**Fecha:** 2026-04-14
**Versión:** 1.0
**Uso:** Stack oficial, atajos, templates y librería creativa UGC Colombia.

---

## 1. Stack de edición

### 1.1 Primario — DaVinci Resolve Studio

**Por qué:** color profesional (Fairlight + page de color nativos), export potente, ideal para piezas premium y ads.
**Versión:** 19 o superior (licencia Studio activa, pedir clave a Samuel).
**Uso:** todos los Testimonials, Demos, Reviews, Hook-Ads. Default del rol.

**Atajos clave:**
- `J / K / L` — playback reverso / pausa / forward.
- `I / O` — in/out.
- `Shift + Z` — fit timeline.
- `Ctrl + B` / `Cmd + B` — split clip.
- `D` — enable/disable clip.
- `Shift + T` — apply transition.
- `Alt + Y` — select all clips forward.

**Workspaces guardados:**
- `UGC-Editing` — cut + edit pages abiertos, bin a la izquierda.
- `UGC-Color` — color page con scopes en RGB parade.
- `UGC-Audio` — Fairlight con loudness meter visible.

### 1.2 Backup — Adobe Premiere Pro

**Por qué:** compatibilidad con After Effects, cuando el cliente pide project file, cuando Valentina colabora con editores externos.
**Versión:** última CC.
**Uso:** projectos que requieren After Effects (motion graphics complejos), o cuando DaVinci falla.

### 1.3 Mobile — CapCut Pro

**Uso:**
- Edits rápidos de muestra (pre-brief preview, stories interna).
- Subtítulos auto cuando DaVinci no los genera bien en español colombiano.
- Edición en viaje sin laptop.

### 1.4 Programático — Remotion

**Uso:** piezas que se regeneran automáticamente con data dinámica (templates de testimonios con rotación de producto, thumbnails, lower thirds).
**Repo:** `ugc-colombia/remotion/src/compositions/`.
**Cuándo usarlo:** cuando haya 5+ variantes del mismo template (ej.: 20 thumbnails con distintos titulares).

---

## 2. Librería creativa UGC Colombia

Ubicación: `Drive/brand-assets/editing-library/`.

### 2.1 Presets de color (LUTs)

| LUT | Uso | Archivo |
|---|---|---|
| `UGC-Colombia-Warm-v2` | Default brand, piel cálida, ideal testimoniales LATAM | `.cube` |
| `UGC-Colombia-Neutral-v1` | Clientes USA, feel más neutro/clean | `.cube` |
| `UGC-Colombia-Punchy-v1` | Ads performance, saturación +10%, contraste +15% | `.cube` |
| `UGC-Colombia-Film-v1` | Lifestyle cinemático, teal & orange sutil | `.cube` |

Aplicar siempre en nodo de color separado para poder ajustar intensidad por clip.

### 2.2 Templates tipográficos (DaVinci Fusion titles)

| Template | Uso |
|---|---|
| `UGC-Title-Hook` | Texto grande centrado para primeros 3s |
| `UGC-Caption-Burned` | Subtítulo burn-in con highlight amarillo |
| `UGC-LowerThird-Brand` | Nombre del creador + handle IG |
| `UGC-CTA-Close` | Último frame con CTA + logo |
| `UGC-Product-Callout` | Flechita animada señalando producto |

**Fuentes instaladas localmente:**
- `Anton-Regular.ttf`
- `Inter-Regular.ttf`, `Inter-SemiBold.ttf`, `Inter-Bold.ttf`

Si falta alguna: pedir a Alexander el pack `ugc-colombia-fonts-2026.zip`.

### 2.3 Transiciones aprobadas

**Usables:**
- **Corte duro** (default, 90% de los cortes).
- **J-cut / L-cut** para fluir audio entre planos.
- **Match cut** cuando hay similitud visual (producto en mano → producto en mesa).
- **Zoom in digital** sutil (5-10%) para énfasis de palabra clave.
- **Cut to black** al final si el video cierra con revelación.

**Prohibidas (se ven amateur en ads pagos):**
- Whoosh/swipe de librería genérica.
- Page turn.
- Spin 3D.
- Stars / sparkles sin justificación narrativa.
- Glitch salvo que el brief sea de tech/gaming.

### 2.4 Pack de overlays

`Drive/brand-assets/editing-library/overlays/`:
- Flechas animadas (`arrow-pop-01.mov` a `arrow-pop-05.mov`).
- Highlight circles (`circle-highlight-01.mov`).
- Notification pops (mensajes estilo iMessage, WhatsApp, IG DM).
- Checkmarks animados para listas.
- Dotted underlines para palabras clave.

Todos con alpha channel (ProRes 4444 o PNG sequence).

### 2.5 Biblioteca de audio

- **Música:** Artlist.io (licencia UGC Colombia activa). Usuario `founder@kreoon.com`.
- **SFX:** librería interna `Drive/brand-assets/sfx/` con:
  - Whooshes, risers, clicks, pops.
  - Ambientes (café, oficina, calle bogotana).
- **NO usar:** Trending sounds de TikTok/IG sin verificación de licencia para paid media.

---

## 3. Proyecto base DaVinci

Plantilla oficial: `UGC-Colombia-Template-2026.drp`.

**Qué incluye:**
- Bins preconfigurados: `01-RAW`, `02-SELECTS`, `03-MUSIC`, `04-SFX`, `05-OVERLAYS`, `06-GRAPHICS`, `07-EXPORTS`.
- Timelines pre-creados: `9x16_1080p`, `1x1_1080p`, `16x9_1080p`.
- LUT brand cargada en Color page (nodo 1).
- Fairlight configurado con bus master a -14 LUFS target.
- Export presets:
  - `IG-Reels-1080x1920-H264`
  - `IG-Feed-1080x1080-H264`
  - `YouTube-1920x1080-H264`
  - `Master-ProRes422HQ`

**Cómo usar:** `File → Project Manager → Restore → UGC-Colombia-Template-2026.drp → Duplicate → renombrar`.

---

## 4. Subtítulos — workflow híbrido

1. **Auto-caption con CapCut** (español colombiano suele salir más preciso que DaVinci).
2. Exportar `.srt`.
3. Importar en DaVinci como track de Subtitle.
4. **Corrección manual palabra por palabra.**
5. Burn-in al exportar: `Video Format → Include subtitles`.

**Tip:** para highlights amarillos en palabras clave, hacerlo con Fusion title layer superior, no con el track de subtítulos.

---

## 5. Automatización y pipeline con Samuel

### 5.1 Supabase + Drive hooks

- Cuando Diana marca `deliveries.status = 'raw_delivered'` en Supabase → webhook notifica a Valentina por WhatsApp con link al folder.
- Cuando Valentina entrega → marca `deliveries.status = 'qa_passed'` desde dashboard interno → Diana recibe alerta.

### 5.2 Bunny CDN para entregas pesadas

- Videos >100MB se suben a Bunny vía CLI: `bunny upload [file] [folder]`.
- El sistema genera link público con expiración 30 días.
- Credenciales en Vault (pedir a Samuel).

### 5.3 Naming automático

Script en `scripts/rename-deliveries.ts` renombra archivos al formato `[marca]_[formato]_[creador]_V[n]_[aspect].mp4` leyendo el brief de Notion.

---

## 6. Hardware recomendado

**Actualmente asignado:**
- MacBook Pro M3 Pro 18GB (propio de Valentina si aplica, sino agencia evalúa compra).
- SSD externo NVMe 2TB para proyectos vivos.
- Monitor externo 27" calibrado (DisplayCAL + SpyderX).
- Audífonos de referencia Sennheiser HD 280 Pro (o equivalente).

**No recomendado:** editar profundo en laptop sin monitor externo calibrado (color no es fiel).

---

## 7. Backup y archivo

- **Diario:** Time Machine a disco local + sync de `Drive/proyectos-activos/` a la nube.
- **Por proyecto:** archivo final master a `Drive/archive/[año]/[cliente]/`.
- **Cleanup:** brutos se borran del SSD 60 días post-entrega final. Se conservan solo en Drive archive (comprimidos con HandBrake a 1/3 del tamaño original).

---

**Fuentes:** brand guidelines UGC Colombia, `02-PACK-DIANA-CREATORS.md`, `05-PACK-SAMUEL-TECH.md`, `remotion/README.md`.

**Próxima revisión:** 2026-05-14
