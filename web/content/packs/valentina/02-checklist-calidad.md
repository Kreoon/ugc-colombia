# 02 — Checklist Premium de Calidad · Valentina Giraldo

**Fecha:** 2026-04-14
**Versión:** 1.0
**Uso:** Checklist obligatorio antes de entregar cualquier video a Diana. Cada ítem responde SÍ o NO. Un solo NO bloquea la entrega hasta que se corrija.

---

## Instrucciones

1. Aplicar este checklist al **master final** (no a un preview, no a un corte intermedio).
2. Marcar cada ítem SÍ / NO / N/A.
3. Si un ítem es NO: volver a la etapa correspondiente del workflow (`01-workflow-edicion.md`).
4. Guardar el checklist firmado en `Drive/[cliente]/[proyecto]/qa/` como PDF antes de entregar.
5. Solo Valentina firma. Si ella detecta que un ítem crítico no se puede cumplir por limitación del bruto: escala a Diana.

---

## Categoría 1 — Hook y retención

### 1.1 Hook primeros 3 segundos
- [ ] SÍ / NO
**Criterio:** ¿El primer segundo muestra movimiento, expresión facial o texto disruptivo que detiene el scroll?
**Ejemplos válidos:** reacción genuina, pregunta directa a cámara, producto en uso, afirmación inesperada.
**No válido:** "Hola chicos", logo de marca, transición de apertura larga, plano estático sin persona.

### 1.2 Ganchos cada 5-7 segundos
- [ ] SÍ / NO
**Criterio:** ¿Hay cambio visible cada 5-7s? Cambio = nuevo plano, zoom, overlay animado, corte de audio, texto nuevo en pantalla.
**Cómo validar:** ver el video con cronómetro. Si pasan más de 7s sin cambio, agregar uno.

### 1.3 Loop cerrado al final
- [ ] SÍ / NO / N/A (solo aplica a Reels/TikTok)
**Criterio:** ¿El último frame conecta visual o narrativamente con el primer frame para invitar al re-loop?
**Ejemplo:** el video abre mostrando el producto en mano y cierra con la misma toma pero con el producto usado.

### 1.4 Retención narrativa
- [ ] SÍ / NO
**Criterio:** ¿La historia tiene principio (hook), medio (problema/experiencia) y cierre (CTA) claramente diferenciados?

---

## Categoría 2 — Subtítulos y tipografía

### 2.1 Subtítulos sincronizados
- [ ] SÍ / NO
**Criterio:** cada palabra aparece en el frame exacto en que se pronuncia, con tolerancia ≤3 frames (≈100ms).
**Cómo validar:** reproducir a 0.5x y verificar 3 zonas aleatorias del video.

### 2.2 Subtítulos burned-in
- [ ] SÍ / NO
**Criterio:** los subtítulos están quemados en el video final, no son un track .srt aparte (salvo que el brief lo pida explícitamente).

### 2.3 Tipografía brand correcta
- [ ] SÍ / NO
**Criterio:**
- Títulos/claims: **Anton Regular**, peso normal, mayúsculas.
- Body/caption: **Inter SemiBold**, minúsculas salvo énfasis.
- Highlights de palabra clave: color `#FFD400` (amarillo brand) sobre blanco con outline negro.

### 2.4 Contraste legible
- [ ] SÍ / NO
**Criterio:** todo texto tiene outline, drop shadow o caja de fondo para asegurar legibilidad sobre cualquier plano. WCAG 4.5:1 mínimo.

### 2.5 Sin errores ortográficos ni typos
- [ ] SÍ / NO
**Criterio:** revisado palabra por palabra. Acentos en español correctos. Nombres de producto/marca exactos según brief.

---

## Categoría 3 — Transiciones y edición

### 3.1 Transiciones intencionales
- [ ] SÍ / NO
**Criterio:** cada transición tiene motivo narrativo. Sin transiciones "whoosh" random de librería. Cortes duros son válidos (y preferidos) salvo que el formato pida otra cosa.

### 3.2 Sin jump cuts visibles
- [ ] SÍ / NO
**Criterio:** cuando hay jump cut, se suaviza con B-roll, overlay o morph. Un jump cut accidental en talking head es rechazo automático.

### 3.3 Ritmo constante
- [ ] SÍ / NO
**Criterio:** sin silencios >0.4s salvo que sean intencionales (pausa dramática). Sin muletillas ("eh", "mmm", "entonces") que interrumpan el flujo.

### 3.4 B-roll relevante
- [ ] SÍ / NO / N/A
**Criterio:** si hay B-roll, apoya la narración. No es relleno de stock genérico sin conexión con el producto.

---

## Categoría 4 — Audio

### 4.1 Mix a -14 LUFS integrado
- [ ] SÍ / NO
**Criterio:** loudness meter de Fairlight confirma -14 LUFS (+/- 0.5). Estándar IG, TikTok, YouTube.

### 4.2 True Peak bajo -1 dBTP
- [ ] SÍ / NO
**Criterio:** sin clipping. Ningún peak supera -1 dBTP. Validar con meter profesional.

### 4.3 Voz limpia
- [ ] SÍ / NO
**Criterio:** sin ruido de fondo audible, sin eco notorio, sin plosivas fuertes. Denoise aplicado, EQ ajustado.

### 4.4 Música bajo voz
- [ ] SÍ / NO / N/A
**Criterio:** si hay música, está entre -24 y -28 dB bajo la voz. Ducking automático cuando la voz entra. Música no compite.

### 4.5 Licencia de audio válida
- [ ] SÍ / NO / N/A
**Criterio:** música de Artlist, Epidemic, Mixkit o biblioteca interna. **Nunca canciones comerciales sin licencia.**

---

## Categoría 5 — Visual y color

### 5.1 LUT brand aplicada
- [ ] SÍ / NO
**Criterio:** `UGC-Colombia-Warm-v2.cube` o variante aprobada aplicada en nodo principal. Sin LUTs de YouTube aleatorias.

### 5.2 Exposición consistente
- [ ] SÍ / NO
**Criterio:** sin quemados en blancos (>100 IRE). Sombras con detalle (no aplastadas). Consistencia entre planos del mismo video.

### 5.3 Encuadre correcto
- [ ] SÍ / NO
**Criterio:** elementos clave no tapados por UI de plataforma (username arriba, botones derecha en IG/TikTok). Safe area respetada.

### 5.4 Producto legible
- [ ] SÍ / NO
**Criterio:** el producto aparece claro al menos 2 veces en el video. Label/logo visible. Sin reflejos que oculten.

---

## Categoría 6 — CTA y cierre

### 6.1 CTA visible
- [ ] SÍ / NO
**Criterio:** último 3-5s muestra llamado a la acción tanto en voz como en texto en pantalla.

### 6.2 CTA accionable
- [ ] SÍ / NO
**Criterio:** la acción es concreta: "link en bio", "desliza hacia arriba", "búscalo en [marca].com". No vago como "síguenos" sin motivo.

### 6.3 Marca presente en cierre
- [ ] SÍ / NO
**Criterio:** logo o nombre de marca visible en el último frame (o supertitulado sutil). No oculto.

---

## Categoría 7 — Formato y entregables

### 7.1 Aspect ratio correcto
- [ ] SÍ / NO
**Criterio:** coincide con el brief. 9:16 para Reels/TikTok/Shorts. 1:1 para Feed. 16:9 para YouTube largo / web.

### 7.2 Duración dentro de tolerancia
- [ ] SÍ / NO
**Criterio:** duración final dentro del ±10% del brief. Si brief pide 30s, aceptable 27-33s.

### 7.3 Codec y bitrate correctos
- [ ] SÍ / NO
**Criterio:** H.264, CRF 18-20, bitrate 12-15 Mbps @ 1080p para 9:16. 20-25 Mbps para 16:9.

### 7.4 Tamaño de archivo razonable
- [ ] SÍ / NO
**Criterio:** <100MB para videos <60s (compartible por WhatsApp). <250MB para videos <2min.

### 7.5 Nombre de archivo según convención
- [ ] SÍ / NO
**Criterio:** `[marca]_[formato]_[creador]_V[n]_[aspect].mp4`. Minúsculas, sin espacios, sin tildes.

### 7.6 Variantes entregadas
- [ ] SÍ / NO
**Criterio:** si el brief pide 9:16 + 1:1 + 16:9, las 3 versiones están en el folder de entrega.

---

## Firma

**Proyecto:** _____________
**Video:** _____________
**Versión:** V___
**Fecha QA:** ___/___/______
**Valentina firma:** _____________

**Resumen del QA:**
- Total ítems: ___
- SÍ: ___
- NO: ___ (debe ser 0 para entregar)
- N/A: ___

Archivo guardado en: `Drive/[cliente]/[proyecto]/qa/QA-[video]-V[n].pdf`

---

**Fuentes:** `01-workflow-edicion.md`, `03-tools-y-templates.md`, brand guidelines UGC Colombia.

**Próxima revisión:** 2026-05-14
