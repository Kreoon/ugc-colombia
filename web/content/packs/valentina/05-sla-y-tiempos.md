# 05 — SLA y Tiempos · Valentina Giraldo

**Fecha:** 2026-04-14
**Versión:** 1.0
**Uso:** Compromisos de tiempo por tier de cliente. Vinculante con contrato comercial.

---

## 1. SLA por tier de cliente

Los tiempos cuentan **horas hábiles** (lunes-viernes, 8:00 a.m.-5:00 p.m. hora Colombia), desde que Valentina recibe el bruto aprobado por Diana hasta que entrega el master final.

| Tier cliente | Volumen | Turnaround por video | Rondas incluidas | SLA ronda 1 | SLA ronda 2 |
|---|---|---|---|---|---|
| **Starter** | 4 videos/mes | **72h hábiles** | 2 | 48h | 24h |
| **Growth** | 8 videos/mes | **48h hábiles** | 2 | 36h | 24h |
| **Pro** | 12 videos/mes | **48h hábiles** | 2 | 24h | 24h |
| **Enterprise** | 20+ videos/mes | **24h hábiles** | 2 | 24h | 12h |
| **Rush (+25% fee)** | ad hoc | **24h** (incluye fines de semana) | 1 incluida | 12h | — |

**Cronómetro empieza:** cuando Diana marca `deliveries.status = 'raw_delivered'` en Supabase y notifica a Valentina por WhatsApp.
**Cronómetro se pausa:** cuando hay dependencia externa (re-grabación del creador, espera de asset del cliente, bloqueo por brief ambiguo).
**Cronómetro se reinicia:** en cada ronda de revisión — el SLA de ronda 2 empieza cuando Diana pasa el feedback consolidado.

---

## 2. Reglas de priorización cuando hay múltiples proyectos

Si Valentina tiene varios proyectos simultáneos compitiendo por su tiempo, la prioridad es:

1. **Rush activos** (con 24h clock corriendo).
2. **Enterprise** sin importar si están en ronda 1 o 2.
3. **Pro** en ronda 2 (ya casi cierran).
4. **Pro / Growth** en ronda 1.
5. **Starter** en cualquier ronda.
6. **Contenido interno UGC Colombia** (canal IG, TikTok, YouTube agencia).

Cuando hay empate: FIFO (primero en entrar, primero en salir).

**Regla de escalamiento:** si Valentina detecta que el backlog supera su capacidad (>3 videos simultáneos de alta complejidad), escala a Alexander antes de que un SLA se vulnere. Alexander decide: contratar freelancer temporal, negociar extensión con cliente, o reasignar.

---

## 3. Rondas de revisión — detalle

### 3.1 Ronda 1
- Cliente envía feedback consolidado a Diana.
- Diana lo convierte en instrucción operativa (ver Pack Diana sección 8 — protocolo Diana → creador, versión adaptada a Valentina).
- Valentina aplica cambios y re-exporta.
- SLA cuenta desde que Diana envía feedback estructurado, no desde el mensaje original del cliente.

### 3.2 Ronda 2
- Misma lógica que ronda 1.
- **Última incluida en el contrato.** Después se cotiza.

### 3.3 Ronda 3+ (extra)
- No se trabaja sin aprobación de Alexander o Brian (quien confirme que el cliente aceptó cotización).
- **Pricing ronda extra:**
  - Tier Starter / Growth: USD 45-75 por ronda.
  - Tier Pro: USD 60-90.
  - Tier Enterprise: USD 80-120 (salvo que el contrato incluya buffer de rondas ilimitadas).
- Tiempo de ejecución de ronda extra: mismo SLA que ronda 2 del tier.

---

## 4. Rush — reglas especiales

### 4.1 Cuándo es "rush"
- Cliente pide video con <24h de turnaround normal del tier.
- O pide entrega en fin de semana / festivo.
- O pide en ventana pico (cliente Enterprise con campaña viva que bloquea la capacidad).

### 4.2 Precio del rush
- **+25% sobre el precio base del video** para el cliente (lo cobra Brian).
- **Bonus para Valentina:** 15% del fee de rush se paga como bonus directo (Alexander define en contrato laboral / prestación de servicios).

### 4.3 Ejecución rush
- Valentina confirma disponibilidad antes de que Diana lo venda al cliente. Nunca se comprometa un rush sin ok explícito.
- Si Valentina ya está en capacidad máxima: Alexander autoriza freelancer externo supervisado por Valentina.
- Rush fuera de horario (noche, fin de semana): se paga con overtime pactado + bonus.

---

## 5. Entregables incluidos por video

Cada video del tier trae, por defecto, los siguientes formatos:

| Formato | Incluido default | Cost extra si se pide después |
|---|---|---|
| 9:16 (Reels/TikTok/Shorts) 1080p | SÍ | — |
| 1:1 (Feed IG/FB) 1080p | SÍ si el brief lo indica | USD 25 |
| 16:9 (YouTube largo / web) 1080p | SÍ si el brief lo indica | USD 25 |
| 4:5 (Feed IG vertical) | NO | USD 20 |
| Subtítulos burned-in | SÍ | — |
| Subtítulos .srt aparte | NO | USD 15 |
| Versión sin música | NO | USD 20 |
| Versión con subtitle en inglés | NO | USD 40-60 |
| Master ProRes | NO (se conserva interno) | USD 30 |

Valentina NO entrega extras sin aprobación escrita de Brian o Diana (quien confirma que el cliente pagó / aceptó la adenda).

---

## 6. Casos edge y escalamiento

### 6.1 Bruto inutilizable
- Valentina lo detecta en QA de bruto (ver `01-workflow-edicion.md` etapa 3).
- Devuelve a Diana con nota específica: "Re-grabar toma [X] por [razón]. Esto extiende SLA en [n] horas".
- Nuevo SLA se comunica al cliente por Diana.

### 6.2 Brief ambiguo o contradictorio
- Valentina NO inventa interpretación. Pausa cronómetro.
- Pregunta a Diana por WhatsApp con opciones concretas: "El brief dice A pero también B. ¿Cuál priorizo?".
- Reanuda cuando Diana confirma.

### 6.3 Cliente cambia brief a mitad de edición
- No se honra el SLA original. Se recalcula.
- Si el cambio aumenta alcance: Diana cotiza como cambio de scope.
- Valentina documenta la hora de recepción del cambio y el impacto en tiempo.

### 6.4 Cliente no responde a ronda 2 en 5 días hábiles
- Se considera aprobado por silencio (regla del Pack Diana).
- Valentina marca delivery como `approved` en Supabase.
- Brian factura saldo final.

### 6.5 Valentina enferma o vacaciones
- Avisa con **≥5 días hábiles** de anticipación.
- Alexander + Diana replanifican el mes.
- Freelancer cubre si es necesario, con Valentina dando handoff escrito y sesión de sync 1h.

---

## 7. Métricas SLA (dashboard Alexander)

Valentina es medida mensualmente en:

| Métrica | Target |
|---|---|
| % entregas dentro de SLA tier | ≥95% |
| Latencia promedio ronda 1 | ≤36h |
| Latencia promedio ronda 2 | ≤20h |
| # SLAs vulnerados sin justificación | 0 |
| % rushes aceptados cuando se ofrecen | ≥80% |

Reporte se corre el día 1 de cada mes automáticamente desde Supabase (ver Pack Samuel workflow 10).

---

## 8. Política de overtime y bienestar

- UGC Colombia **no fomenta el overtime** como norma. Los SLAs están diseñados para ejecutarse en horario hábil.
- Overtime solo se activa por **rush pactado** con bonus asociado.
- Si el backlog estructural supera capacidad durante 2 semanas seguidas: Alexander obligado a contratar apoyo (freelancer o planta) o ajustar pricing/tiers.
- **Regla del founder (Alexander):** si la operación necesita que Valentina trabaje 60h/semana para cumplir SLA, el sistema está roto — no Valentina.

---

**Fuentes:** `01-PACK-ALEXANDER-CEO.md`, `02-PACK-DIANA-CREATORS.md` (sección 6 pricing y sección 8 revisión), `03-PACK-BRIAN-FINANCE.md`, `05-PACK-SAMUEL-TECH.md`.

**Próxima revisión:** 2026-05-14
