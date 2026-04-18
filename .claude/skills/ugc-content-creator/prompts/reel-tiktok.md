# Prompt — Reel IG / TikTok / YouTube Short (video vertical 9:16, 25-60s)

Aplicar cuando Tanya pida: "reel sobre X", "tiktok de Y", "short educativo", "video vertical de Z".

## Workflow

1. **Detectar pilar** + duracion sugerida segun el tema (ver `references/pillars-by-platform.md`).
2. **Elegir hook de 1.5s** de `references/hooks-library.md`.
3. **Redactar guion** con la anatomia de abajo.
4. **Generar prompt Nanobanana** solo para el **cover** del reel (el video se graba / edita aparte, pero la imagen portada se genera).
5. **Proponer** copy del caption + hashtags + audio recomendado.
6. **Preguntar** si Tanya dispara la generacion del cover.

## Duracion recomendada por pilar

| Pilar       | Duracion optima | Plataforma preferida       |
|-------------|-----------------|----------------------------|
| Educativo   | 45-60s          | IG Reel, YouTube Short     |
| Debate      | 25-40s          | TikTok, IG Reel            |
| Estrategico | 40-55s          | YouTube Short, LinkedIn    |
| Casos       | 30-60s          | IG Reel (testimonio)       |
| BTS         | 20-45s          | IG Reel, TikTok            |

## Anatomia del guion (30s ejemplo)

```
[00:00-00:03] HOOK BRUTAL (1.5s + reforzado a 3s)
  → Visual: pattern interrupt (objeto, zoom, cambio abrupto)
  → Audio: frase de max 7 palabras, alta energia
  → Texto en pantalla: mayusculas, blanco con stroke negro

[00:03-00:08] PROMESA
  → "En este video vas a ver [beneficio concreto]"
  → Pattern interrupt: cambio de angulo

[00:08-00:22] VALOR DENSO (3-5 ideas, jump cuts)
  → 1 idea cada 3-4s
  → B-roll ilustra cada idea
  → Captions sincronizados palabra por palabra

[00:22-00:28] INSIGHT PRINCIPAL o PAYOFF
  → El momento "ajaaaaa" que conecta todo
  → Zoom in + pausa dramatica de 0.5s

[00:28-00:30] CTA + LOOP
  → CTA especifico: "comenta BRIEF", "guarda esto", "parte 2 manana"
  → Ultimo frame conecta visualmente con el primero
```

## Regla de captions

- Font Inter Bold 700, tamano ocupa 60-70% del ancho util.
- Blanco `#FFFFFF` con stroke negro 4-6px, **o** negro con fondo amarillo `#F9B334`.
- Max 4 palabras por linea visible.
- Sincronizados palabra por palabra (MrBeast style).
- Posicion: tercio inferior, sobre la zona de UI.

## Zonas seguras por plataforma (video vertical 1080x1920)

- **IG Reel:** top 250px para handle, bottom 350px para CTAs/stickers.
- **TikTok:** izq 80px + top 200px + bottom 500px (UI ratings).
- **YouTube Short:** top 250px + bottom 350px.

## Cover image (portada del reel)

**Propmt Nanobanana ejemplo (cara a camara, pilar debate):**

```
scene: vertical 9:16 portrait of a young Colombian creator in her early 30s,
fresh confident look, direct eye contact with camera, natural makeup,
wearing a casual but polished outfit in cream or neutral tones,
behind-the-scenes set with studio lights visible out of focus,
dark #000000 environment with warm amber #F9B334 key light from camera-left,
documentary cinematic quality, shallow depth of field, matte grain,
generous empty space at the top for bold typography overlay,
lower third reserved for caption bar.
```

**Ajuste por pilar:**
- **Educativo:** creator con laptop/pizarra, luz calida.
- **Debate:** creator mirando directo a camara, gesto firme.
- **Estrategico:** escritorio con cafe y cuaderno con frameworks.
- **Casos:** screenshot de dashboard (ROAS, CPA) con una mano senalando.
- **BTS:** escena real de set de grabacion, equipo en accion.

## Caption del post

**IG Reel / YouTube Short (mas texto):**
```
[Hook de 1 linea pre-fold]

[2-3 lineas ampliando el insight del video]

[CTA especifico — igual al del video pero escrito]

.
.
.
#hashtag1 #hashtag2 ... (5-10)
```

**TikTok (mas corto):**
```
[Una sola linea que amplia el gancho]
[Emoji sutil si aporta, nunca mas de 2]
#hashtag #hashtag #hashtag (5-7)
```

## Audio recomendado

- **Educativo/Estrategico:** voiceover propio (sin musica o con musica instrumental de fondo bajo).
- **Debate:** cara a camara con audio limpio.
- **Casos:** testimonio real sin musica, subtitulos reforzados.
- **BTS:** trending sound de TikTok si aplica + voiceover o captions.
- **Evitar:** trending sounds con letras explicitas, audios con derechos claim.

## Hashtags

- **Brand:** #UGCColombia #AgenciaUGCColombia
- **Pilar:** (igual que en carousel-ig.md)
- **Trend:** 1-2 hashtags del momento si son relevantes (sin forzar).
- **Geo:** #Colombia #LATAM

## Checklist pre-publicacion

- [ ] Hook de 1.5s cumple: visual + audio + max 7 palabras.
- [ ] Pattern interrupts cada 2-3s (8-12 en 30s).
- [ ] Captions activos y sincronizados palabra por palabra.
- [ ] Densidad: cada segundo aporta.
- [ ] CTA especifico (no "sigueme").
- [ ] Loop perfecto: ultimo frame conecta con el primero.
- [ ] Sin relleno, sin "y bueno...".
- [ ] Audio: sin claim, nivel consistente.
- [ ] Cover generado con paleta oficial (`#F9B334`, no `#FFD60A`).
- [ ] Handle visible en esquina como watermark sutil.

## Salida esperada de Claude

1. **Pilar detectado** + duracion sugerida.
2. **Hook de 1.5s** + tipo (visual, pregunta, numero, etc).
3. **Guion completo** con timing por segundo.
4. **Prompt Nanobanana** para el cover.
5. **Caption del post** + hashtags + audio sugerido.
6. **Checklist** validado.
7. Si Tanya lo pide: comando `node .claude/skills/ugc-content-creator/scripts/generate-social.mjs --platform=reel --concept=<slug>` para generar el cover.
