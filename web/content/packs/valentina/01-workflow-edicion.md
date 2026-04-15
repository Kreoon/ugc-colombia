# 01 — Workflow de Edición · Valentina Giraldo

**Fecha:** 2026-04-14
**Versión:** 1.0
**Uso:** Pipeline estándar de cada proyecto, desde que el creador graba hasta que el cliente recibe.

---

## Vista general del pipeline

```
1. GRABADO CREADOR
     │
     ▼
2. BRUTO RECIBIDO (Diana → Valentina)
     │
     ▼
3. QA DE BRUTO (Valentina)
     │  ├─ OK → continuar
     │  └─ No OK → devolver vía Diana, re-grabar
     ▼
4. CORTES GRUESOS (selects + ensamble)
     │
     ▼
5. CORTE FINO (ritmo + j/l cuts + silencios)
     │
     ▼
6. OVERLAYS + SUBTÍTULOS (tipografía + highlights + B-roll)
     │
     ▼
7. AUDIO MIX (-14 LUFS + denoise + ducking)
     │
     ▼
8. COLOR + EXPORT (LUT brand + H.264)
     │
     ▼
9. QA INTERNO (checklist premium)
     │  ├─ OK → entregar a Diana
     │  └─ No OK → volver a paso que corresponda
     ▼
10. ENTREGA A DIANA → CLIENTE
```

---

## Etapas detalladas

### Etapa 1 — Grabado (creador)
**Owner:** creador (no Valentina).
**Handoff a Valentina:** cuando Diana confirma que el bruto está subido a `Drive/[cliente]/[proyecto]/brutos/`.
**Qué verifica Valentina al recibir:** notificación WhatsApp + link directo al folder + brief actualizado en Notion.

---

### Etapa 2 — Bruto recibido
**Owner:** Diana → Valentina.
**Tiempo:** 15 min (ack + descarga proxy).
**Acciones:**
- Confirmar recepción en grupo WhatsApp #edicion.
- Descargar brutos a SSD local (proyectos vivos nunca solo en Drive).
- Crear proyecto DaVinci con plantilla agencia: `UGC-Colombia-Template-2026.drp`.
- Importar brutos al bin `01-RAW`.

**Handoff siguiente:** pasa a QA de bruto automáticamente.

---

### Etapa 3 — QA de bruto
**Owner:** Valentina.
**Tiempo:** 15-30 min.
**Checklist rápido:**
- [ ] Audio limpio (sin eco, sin saturación, >-30dB)
- [ ] Encuadre correcto según brief (9:16 nativo, no crop forzado)
- [ ] Iluminación sin quemados ni sombras duras
- [ ] Duración suficiente (bruto ≥3x duración final esperada)
- [ ] Tomas alternativas disponibles para cortes
- [ ] Producto visible y legible en momentos clave

**Decisión:**
- Todo OK → continuar a cortes gruesos.
- 1-2 issues menores que se pueden resolver en post → continuar con nota.
- Issue mayor (audio inutilizable, producto invisible, brief no cumplido) → **devolver** vía Diana con nota específica. Valentina NO contacta al creador directamente.

---

### Etapa 4 — Cortes gruesos (selects + ensamble)
**Owner:** Valentina.
**Tiempo:** 45-90 min (depende del formato).
**Acciones:**
- Marcar tomas buenas con color labels en DaVinci (verde = go, amarillo = tal vez, rojo = descarte).
- Ensamblar orden narrativo según estructura del brief (hook → problema → experiencia → CTA).
- Dejar respiración: cortar con 5-10 frames extra por si el corte fino necesita suavizar.
- Guardar `V0_ensamble.drp` al cerrar la sesión.

**Regla clave:** en esta etapa no se piensa en transiciones ni overlays. Solo estructura.

**Handoff interno:** pasa a corte fino.

---

### Etapa 5 — Corte fino (ritmo)
**Owner:** Valentina.
**Tiempo:** 60-120 min.
**Acciones:**
- Ajustar j-cuts y l-cuts para que el audio fluya natural.
- Eliminar silencios muertos >0.4s.
- Sincronizar cortes a beats si hay música.
- **Gancho cada 5-7s:** cambio de plano, zoom, overlay o cambio de audio. Si hay más de 7s sin variación, el ojo se va.
- Loop cerrado: el frame final debe conectar emocionalmente con el primer segundo (útil para IG Reels y TikTok).

**Tip:** ver el corte sin audio una vez para validar que visualmente engancha solo por imagen.

**Handoff interno:** pasa a overlays.

---

### Etapa 6 — Overlays + subtítulos
**Owner:** Valentina.
**Tiempo:** 45-90 min.
**Acciones:**
- Generar subtítulos con CapCut o DaVinci (auto) → **corregir manualmente palabra por palabra**.
- Aplicar plantilla de tipografía brand:
  - Títulos: Anton, peso regular, color #FFFFFF con outline #000000.
  - Body/caption: Inter SemiBold, color según contraste del plano.
- Burn-in de subtítulos (no .srt aparte, salvo que el cliente pida).
- Highlights amarillos (#FFD400) en palabras clave cada 3-5s.
- B-roll / insertos de producto entre planos largos.
- Stickers/emojis solo si el brief lo indica (evitar por default: lucen amateur en ads pagos).

**Handoff interno:** pasa a audio mix.

---

### Etapa 7 — Audio mix
**Owner:** Valentina.
**Tiempo:** 20-40 min.
**Acciones:**
- **Denoise** con Fairlight o iZotope RX.
- **EQ de voz:** roll-off <80Hz, ligero boost en 3-5kHz para claridad.
- **Compresión suave** (ratio 3:1, threshold ajustado a la toma).
- **Música de fondo:** -24 a -28dB bajo la voz. Ducking automático cuando la voz entra.
- **Normalización final a -14 LUFS integrado** (estándar Instagram/TikTok).
- **True Peak:** nunca superar -1 dBTP.

**Validación:** usar Fairlight loudness meter. Cualquier pieza fuera de rango vuelve a mezcla.

**Handoff interno:** pasa a color + export.

---

### Etapa 8 — Color + export
**Owner:** Valentina.
**Tiempo:** 20-30 min.
**Acciones:**
- Aplicar LUT brand `UGC-Colombia-Warm-v2.cube` en nodo principal.
- Corrección por plano si hay inconsistencias entre tomas.
- Vignette sutil (5-10%) solo si el plano lo pide.
- Exportar:
  - **Master:** ProRes 422 HQ (archivo interno).
  - **Delivery cliente:** H.264, CRF 18-20, bitrate 12-15 Mbps @ 1080p (9:16). Archivo <100MB para IG/WhatsApp.
  - **Variantes:** si el brief pide 1:1 y 16:9, reformat en el mismo proyecto (no exportar desde fuera).
- Nombrado final: `[marca]_[formato]_[creador]_V[n]_[aspect].mp4`.

**Handoff interno:** pasa a QA interno.

---

### Etapa 9 — QA interno (Valentina sobre su propia pieza)
**Owner:** Valentina.
**Tiempo:** 10-15 min.
**Acción:** correr el checklist completo de `02-checklist-calidad.md`. Cualquier ítem en NO → volver a la etapa que corresponda.

---

### Etapa 10 — Entrega a Diana → cliente
**Owner:** Valentina → Diana.
**Tiempo:** 5 min (upload + mensaje).
**Acciones:**
- Subir a `Drive/[cliente]/[proyecto]/finales/`.
- Mensaje a Diana en WhatsApp con:
  - Link directo al archivo
  - Duración y formatos entregados
  - Cualquier nota creativa relevante (ej.: "corté la toma de la cocina porque tenía saturación, usé la del balcón")
- Diana toma el relevo: comunica al cliente, recibe feedback, devuelve a Valentina si hay ronda 2.

---

## Tiempos totales por tipo de video

| Formato | Duración final | Tiempo neto Valentina |
|---|---|---|
| Hook-Ad (6-15s) | 6-15s | 1.5-2h |
| Testimonial (30s) | 30s | 2.5-3h |
| Testimonial (60s) | 60s | 3-4h |
| Unboxing (45-75s) | 45-75s | 3-4h |
| Demo/Tutorial (60-90s) | 60-90s | 4-5h |
| Review (45-60s) | 45-60s | 3-4h |
| Lifestyle B-roll (30-60s) | 30-60s | 3.5-4.5h |

*Tiempos netos = edición pura, sin incluir esperas de feedback ni rondas de revisión.*

---

## Rondas de revisión (integración con flujo Diana)

- **Ronda 1:** cliente pide ajustes (Diana los consolida) → Valentina aplica → re-entrega en 24-48h hábiles según SLA.
- **Ronda 2:** última incluida. Valentina aplica → re-entrega en 24h hábiles.
- **Ronda 3+:** cotización adicional (ver `05-sla-y-tiempos.md`). Valentina NO edita sin aprobación de Alexander/Brian.

---

**Fuentes:** `02-PACK-DIANA-CREATORS.md` (sección 8 revisión), `03-tools-y-templates.md`, `02-checklist-calidad.md`.

**Próxima revisión:** 2026-05-14
